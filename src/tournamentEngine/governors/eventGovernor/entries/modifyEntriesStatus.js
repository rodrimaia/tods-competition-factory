import { getAssignedParticipantIds } from '../../../../drawEngine/getters/getAssignedParticipantIds';
import { refreshEntryPositions } from '../../../../global/functions/producers/refreshEntryPositions';
import { modifyDrawNotice } from '../../../../drawEngine/notifications/drawNotifications';
import { findParticipant } from '../../../../global/functions/deducers/findParticipant';
import { addExtension } from '../../../../global/functions/producers/addExtension';
import { isValidExtension } from '../../../../global/validation/isValidExtension';
import { removeExtension } from '../../tournamentGovernor/addRemoveExtensions';
import { decorateResult } from '../../../../global/functions/decorateResult';
import { isUngrouped } from '../../../../global/functions/isUngrouped';
import { getFlightProfile } from '../../../getters/getFlightProfile';

import { PAIR } from '../../../../constants/participantConstants';
import { SUCCESS } from '../../../../constants/resultConstants';
import {
  ENTRY_STATUS_NOT_ALLOWED_FOR_EVENT,
  INVALID_ENTRY_STATUS,
  INVALID_PARTICIPANT_ID,
  MISSING_EVENT,
  EXISTING_PARTICIPANT_DRAW_POSITION_ASSIGNMENT,
  MISSING_VALUE,
  INVALID_VALUES,
} from '../../../../constants/errorConditionConstants';
import {
  DRAW_SPECIFIC_STATUSES,
  EQUIVALENT_ACCEPTANCE_STATUSES,
  VALID_ENTRY_STATUSES,
  WITHDRAWN,
} from '../../../../constants/entryStatusConstants';

// disallow changing entryStatus to WITHDRAWN or UNGROUPED for assignedParticipants

export function modifyEntriesStatus({
  autoEntryPositions = true,
  tournamentRecord,
  drawDefinition,
  participantIds,
  entryStatus,
  extension, // modify the specified extension (remove if value undefined)
  eventSync,
  drawId,
  stage,
  event,
}) {
  if (!participantIds || !Array.isArray(participantIds))
    return {
      error: INVALID_PARTICIPANT_ID,
      method: 'modifyEntriesStatus',
      participantIds,
    };

  if (!drawDefinition && !event) return { error: MISSING_EVENT };
  if (entryStatus && !VALID_ENTRY_STATUSES.includes(entryStatus))
    return { error: INVALID_ENTRY_STATUS };

  const stack = 'modifyEntriesStatus';
  const modifiedDrawIds = [];

  if (!entryStatus && !extension)
    return decorateResult({
      result: { error: MISSING_VALUE },
      info: 'Missing entryStatus',
      stack,
    });

  if (extension && !isValidExtension(extension))
    return decorateResult({
      result: { error: INVALID_VALUES },
      info: 'Invalid extension',
      context: { extension },
      stack,
    });

  // build up an array of participantIds which are assigned positions in structures
  const assignedParticipantIds = [];
  event.drawDefinitions?.forEach((drawDefinition) => {
    const participantIds = getAssignedParticipantIds({
      stages: stage && [stage],
      drawDefinition,
    });
    assignedParticipantIds.push(...participantIds);
  });

  const tournamentParticipants = tournamentRecord?.participants || [];

  const validEntryStatusForAllParticipantIds = participantIds.every(
    (participantId) => {
      const { participantType } = findParticipant({
        tournamentParticipants,
        participantId,
      });
      return !(participantType === PAIR && isUngrouped(entryStatus));
    }
  );

  if (!validEntryStatusForAllParticipantIds)
    return { error: INVALID_ENTRY_STATUS };

  const { flightProfile } = getFlightProfile({ event });
  const flight = flightProfile?.flights?.find(
    (flight) => flight.drawId === drawId
  );

  // ------------------------------------------------------------------------
  // reusable functions
  const updateEntryStatus = (entries = []) => {
    const filteredEntries = entries
      // filter out entries by stage (if specified)
      .filter((entry) => {
        return !stage || !entry.entryStage || stage === entry.entryStage;
      })
      // filter by specified participantIds
      .filter(({ participantId }) => participantIds.includes(participantId));

    const isAssigned = (entry) =>
      assignedParticipantIds.includes(entry.participantId) &&
      !(
        EQUIVALENT_ACCEPTANCE_STATUSES.includes(entry.entryStatus) &&
        EQUIVALENT_ACCEPTANCE_STATUSES.includes(entryStatus)
      );

    const success = filteredEntries.every((entry) => {
      if (isAssigned(entry)) return false;
      if (entryStatus) {
        entry.entryStatus = entryStatus;
        // since entryStatus has changed remove current entryPosition
        delete entry.entryPosition;
      }
      if (extension) {
        if (extension.value) {
          addExtension({ element: entry, extension });
        } else {
          removeExtension({ element: entry, name: extension.name });
        }
      }
      return true;
    });

    return success
      ? { ...SUCCESS }
      : { error: EXISTING_PARTICIPANT_DRAW_POSITION_ASSIGNMENT };
  };

  const autoPosition = ({ flight, drawDefinition }) => {
    event.entries = refreshEntryPositions({
      entries: event.entries || [],
    });
    if (flight) {
      flight.drawEntries = refreshEntryPositions({
        entries: flight.drawEntries,
      });
    }
    if (drawDefinition) {
      drawDefinition.entries = refreshEntryPositions({
        entries: drawDefinition.entries,
      });
    }
  };
  const updateDrawEntries = ({ flight, drawDefinition }) => {
    const stack = 'updateDrawEntries';
    if (flight) {
      const result = updateEntryStatus(flight.drawEntries);
      if (result.error) return decorateResult({ result, stack });
    }
    if (drawDefinition) {
      const result = updateEntryStatus(drawDefinition.entries);
      if (result.error) return decorateResult({ result, stack });

      if (!modifiedDrawIds.includes(drawDefinition.drawId))
        modifiedDrawIds.push(drawDefinition.drawId);
    }
    return { ...SUCCESS };
  };

  // ------------------------------------------------------------------------
  // before modifying, if autoEntryPositions: true, pre-assign entryPositions
  const entryPositionsExist =
    event.entries?.find(({ entryPosition }) => !isNaN(entryPosition)) ||
    flight?.drawEntries?.find(({ entryPosition }) => !isNaN(entryPosition)) ||
    drawDefinition?.entries?.find(({ entryPosition }) => !isNaN(entryPosition));

  if (autoEntryPositions && !entryPositionsExist)
    autoPosition({ flight, drawDefinition });

  // ------------------------------------------------------------------------
  // if flight or drawDefinition scope modifications
  if (flight || drawDefinition) {
    const result = updateDrawEntries({ flight, drawDefinition });
    if (result.error) return decorateResult({ result, stack });
  }

  // ------------------------------------------------------------------------
  // update any flights which have no draw generated to keep entries in sync
  const generatedDrawIds =
    event.drawDefinitions?.map(({ drawId }) => drawId) || [];
  const flightsNoDraw =
    flightProfile?.flights?.filter(
      (flight) => !generatedDrawIds.includes(flight.drawId)
    ) || [];

  for (const flight of flightsNoDraw) {
    const result = updateDrawEntries({ flight });
    if (result.error) return decorateResult({ result, stack });
  }

  // ------------------------------------------------------------------------
  const singleDraw =
    flightProfile?.flights?.length === 1 &&
    event.drawDefinitions?.length <= flightProfile?.flights?.length;

  if (
    !flight &&
    !drawDefinition &&
    DRAW_SPECIFIC_STATUSES.includes(entryStatus)
  ) {
    return { error: ENTRY_STATUS_NOT_ALLOWED_FOR_EVENT };
  }

  if (
    (!flight && !drawDefinition) ||
    entryStatus === WITHDRAWN ||
    (eventSync && singleDraw) // if there is only one draw keep event entries in sync
  ) {
    // if entryStatus is WITHDRAWN then participantIds appearing in ANY flight or drawDefinition must be removed

    const result = updateEntryStatus(event.entries);
    if (result.error) return decorateResult({ result, stack });

    let error;
    if (entryStatus === WITHDRAWN) {
      flightProfile?.flights?.every((flight) => {
        const result = updateEntryStatus(flight.drawEntries);
        if (result.error) {
          error = result.error;
          return false;
        }
        flight.drawEntries = flight.drawEntries.filter(
          ({ participantId }) => !participantIds.includes(participantId)
        );
        return true;
      });

      event.drawDefinitions?.every((drawDefinition) => {
        const result = updateEntryStatus(drawDefinition.entries);
        if (result.error) {
          error = result.error;
          return false;
        }
        drawDefinition.entries = drawDefinition.entries?.filter(
          ({ participantId }) => !participantIds.includes(participantId)
        );
        return true;
      });
    }
    if (error) return { error };
  }

  if (autoEntryPositions) autoPosition({ flight, drawDefinition });

  for (const drawDefinition of event.drawDefinitions || []) {
    if (
      modifiedDrawIds.length &&
      !modifiedDrawIds.includes(drawDefinition.drawId)
    )
      continue;

    modifyDrawNotice({
      tournamentId: tournamentRecord.tournamentId,
      eventId: event.eventId,
      drawDefinition,
    });
  }

  return { ...SUCCESS };
}
