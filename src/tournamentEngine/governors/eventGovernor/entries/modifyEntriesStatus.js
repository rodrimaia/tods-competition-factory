import { getAssignedParticipantIds } from '../../../../drawEngine/getters/getAssignedParticipantIds';
import { refreshEntryPositions } from '../../../../common/producers/refreshEntryPositions';
import { findParticipant } from '../../../../common/deducers/findParticipant';
import { getFlightProfile } from '../../../getters/getFlightProfile';

import {
  INVALID_ENTRY_STATUS,
  INVALID_PARTICIPANT_ID,
  MISSING_EVENT,
  PARTICIPANT_ASSIGNED_DRAW_POSITION,
} from '../../../../constants/errorConditionConstants';
import {
  UNPAIRED,
  VALID_ENTERED_TYPES,
  WITHDRAWN,
} from '../../../../constants/entryStatusConstants';
import { SUCCESS } from '../../../../constants/resultConstants';
import { PAIR } from '../../../../constants/participantTypes';

export function modifyEntriesStatus({
  tournamentRecord,
  drawDefinition,
  participantIds,
  entryStatus,
  drawId,
  stage,
  event,

  autoEntryPositions = true,
}) {
  if (!participantIds || !Array.isArray(participantIds))
    return {
      error: INVALID_PARTICIPANT_ID,
      method: 'modifyEntriesStatus',
      participantIds,
    };
  if (!VALID_ENTERED_TYPES.includes(entryStatus))
    return { error: INVALID_ENTRY_STATUS };

  if (!drawDefinition && !event) return { error: MISSING_EVENT };

  // build up an array of participantIds which are assigned positions in structures
  // disallow changing entryStatus to WITHDRAWN or UNPAIRED for assignedParticipants
  const assignedParticipantIds = [];
  if ([WITHDRAWN, UNPAIRED].includes(entryStatus)) {
    event.drawDefinitions?.forEach((drawDefinition) => {
      const participantIds = getAssignedParticipantIds({ drawDefinition });
      assignedParticipantIds.push(...participantIds);
    });
  }

  const tournamentParticipants = tournamentRecord?.participants || [];

  const validEntryStatusForAllParticipantIds = participantIds.every(
    (participantId) => {
      const { participantType } = findParticipant({
        tournamentParticipants,
        participantId,
      });
      return !(participantType === PAIR && entryStatus === UNPAIRED);
    }
  );

  if (!validEntryStatusForAllParticipantIds)
    return { error: INVALID_ENTRY_STATUS };

  const updateEntryStatus = (entries = []) => {
    const stageFilteredEntries = entries.filter((entry) => {
      return !stage || !entry.entryStage || stage === entry.entryStage;
    });
    let modifications = 0;
    const assigned = (entry) =>
      assignedParticipantIds.includes(entry.participantId);

    stageFilteredEntries.forEach((entry) => {
      const modify =
        participantIds.includes(entry.participantId) && !assigned(entry);
      if (modify) {
        entry.entryStatus = entryStatus;
        delete entry.entryPosition;
        modifications++;
      }
    });
    return modifications === participantIds.length
      ? SUCCESS
      : { error: PARTICIPANT_ASSIGNED_DRAW_POSITION };
  };

  const { flightProfile } = getFlightProfile({ event });
  const flight = flightProfile?.flights?.find(
    (flight) => flight.drawId === drawId
  );

  const autoPosition = () => {
    event.entries = refreshEntryPositions({
      entries: event.entries,
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

  const entryPositionsExist =
    event.entries?.find(({ entryPosition }) => entryPosition) ||
    flight?.drawEntries?.find(({ entryPosition }) => entryPosition) ||
    drawDefinition?.entries?.find(({ entryPosition }) => entryPosition);

  // before modifying, if autoEntryPositions: true, pre-assign entryPositions
  if (autoEntryPositions && !entryPositionsExist) autoPosition();

  const updateDrawEntries = ({ flight, drawDefinition }) => {
    if (flight) {
      const result = updateEntryStatus(flight.drawEntries);
      if (result.error) return result;
    }
    if (drawDefinition) {
      const result = updateEntryStatus(drawDefinition.entries);
      if (result.error) return result;
    }
  };

  // if flight or drawDefinition scope modifications
  if (flight || drawDefinition) updateDrawEntries({ flight, drawDefinition });

  if ((!flight && !drawDefinition) || entryStatus === WITHDRAWN) {
    // if entryStatus is WITHDRAWN then participantIds appearing in ANY flight or drawDefinition must be removed
    const result = updateEntryStatus(event.entries);
    if (result.error) return result;

    if (entryStatus === WITHDRAWN) {
      flightProfile?.flights?.forEach(({ drawEntries }) => {
        const result = updateEntryStatus(drawEntries);
        if (result.error) return result;
      });
      event.drawDefinitions?.forEach(({ entries }) => {
        const result = updateEntryStatus(entries);
        if (result.error) return result;
      });
    }
  }

  if (autoEntryPositions) autoPosition();

  return SUCCESS;
}
