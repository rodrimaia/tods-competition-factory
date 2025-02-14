import { refreshEntryPositions } from '../../../../global/functions/producers/refreshEntryPositions';
import { addExtension } from '../../../../global/functions/producers/addExtension';
import { isValidExtension } from '../../../../global/validation/isValidExtension';
import { decorateResult } from '../../../../global/functions/decorateResult';
import { isUngrouped } from '../../../../global/functions/isUngrouped';
import { addDrawEntries } from '../drawDefinitions/addDrawEntries';
import { definedAttributes } from '../../../../utilities/objects';
import { removeEventEntries } from './removeEventEntries';

import { DIRECT_ACCEPTANCE } from '../../../../constants/entryStatusConstants';
import { ROUND_TARGET } from '../../../../constants/extensionConstants';
import { DOUBLES, SINGLES } from '../../../../constants/matchUpTypes';
import { MAIN } from '../../../../constants/drawDefinitionConstants';
import { SUCCESS } from '../../../../constants/resultConstants';
import {
  EVENT_NOT_FOUND,
  INVALID_PARTICIPANT_IDS,
  INVALID_VALUES,
  MISSING_EVENT,
  MISSING_PARTICIPANT_IDS,
} from '../../../../constants/errorConditionConstants';
import {
  INDIVIDUAL,
  PAIR,
  TEAM,
} from '../../../../constants/participantConstants';

/**
 *
 * Add entries into an event; optionally add to specified drawDefinition/flightProfile, if possible.
 *
 * @param {object} tournamentRecord - passed in automatically by tournamentEngine
 * @param {string} eventId - tournamentEngine automatically retrieves event
 * @param {string} drawId - optional - also add to drawDefinition.entries & flightProfile.drawEntries (if possible)
 * @param {string[]} participantIds - ids of all participants to add to event
 * @param {string} enryStatus - entryStatus enum
 * @param {string} entryStage - entryStage enum
 *
 */
export function addEventEntries(params) {
  const {
    entryStatus = DIRECT_ACCEPTANCE,
    autoEntryPositions = true,
    participantIds = [],
    entryStageSequence,
    entryStage = MAIN,
    tournamentRecord,
    ignoreStageSpace,
    drawDefinition,
    roundTarget,
    extensions,
    extension,
    drawId,
    event,
  } = params;

  if (!event) return { error: MISSING_EVENT };
  if (!participantIds || !participantIds.length) {
    return { error: MISSING_PARTICIPANT_IDS };
  }

  if (!event || !event.eventId) return { error: EVENT_NOT_FOUND };

  const stack = 'addDrawEntry';

  if (
    (extensions &&
      (!Array.isArray(extensions) || !extensions.every(isValidExtension))) ||
    (extension && !isValidExtension(extension))
  ) {
    return decorateResult({
      result: { error: INVALID_VALUES },
      context: definedAttributes({ extension, extensions }),
      info: 'Invalid extension(s)',
      stack,
    });
  }

  const checkTypedParticipants = !!tournamentRecord;

  const typedParticipantIds =
    tournamentRecord?.participants
      ?.filter((participant) => {
        if (
          event.eventType === SINGLES &&
          participant.participantType === INDIVIDUAL
        ) {
          return true;
        }
        if (
          event.eventType === DOUBLES &&
          participant.participantType === PAIR
        ) {
          return true;
        }
        if (
          event.eventType === DOUBLES &&
          participant.participantType === INDIVIDUAL &&
          isUngrouped(entryStatus)
        ) {
          return true;
        }
        if (
          event.eventType === TEAM &&
          (participant.participantType === TEAM ||
            (isUngrouped(entryStatus) &&
              participant.participantType === INDIVIDUAL))
        ) {
          return true;
        }

        return false;
      })
      .map((participant) => participant.participantId) || [];

  const validParticipantIds = participantIds.filter(
    (participantId) =>
      !checkTypedParticipants || typedParticipantIds.includes(participantId)
  );

  if (!event.entries) event.entries = [];
  const existingIds = event.entries.map(
    (e) => e.participantId || (e.participant && e.participant.participantId)
  );

  validParticipantIds.forEach((participantId) => {
    if (!existingIds.includes(participantId)) {
      const entry = definedAttributes({
        participantId,
        entryStatus,
        entryStage,
        extensions,
      });

      if (extension) {
        addExtension({ element: entry, extension });
      }

      if (roundTarget) {
        addExtension({
          extension: { name: ROUND_TARGET, value: roundTarget },
          element: entry,
        });
      }
      if (entryStageSequence) entry.entryStageSequence = entryStageSequence;
      event.entries.push(entry);
    }
  });

  let info;
  if (drawId && !isUngrouped(entryStage)) {
    const result = addDrawEntries({
      participantIds: validParticipantIds,
      autoEntryPositions,
      entryStageSequence,
      ignoreStageSpace,
      drawDefinition,
      entryStatus,
      roundTarget,
      entryStage,
      extension,
      drawId,
      event,
    });

    // Ignore error if drawId is included but entry can't be added to drawDefinition/flightProfile
    // return error as info to client
    if (result.error) {
      info = result.error;
    }
  }

  // now remove any ungrouped participantIds which exist as part of added grouped participants
  if ([DOUBLES, TEAM].includes(event.eventType)) {
    const enteredParticipantIds = (event.entries || []).map(
      (entry) => entry.participantId
    );
    const ungroupedIndividualParticipantIds = (event.entries || [])
      .filter((entry) => isUngrouped(entry.entryStatus))
      .map((entry) => entry.participantId);
    const tournamentParticipants = tournamentRecord?.participants || [];
    const groupedIndividualParticipantIds = tournamentParticipants
      .filter(
        (participant) =>
          enteredParticipantIds.includes(participant.participantId) &&
          [PAIR, TEAM].includes(participant.participantType)
      )
      .map((participant) => participant.individualParticipantIds)
      .flat(Infinity);
    const ungroupedParticipantIdsToRemove =
      ungroupedIndividualParticipantIds.filter((participantId) =>
        groupedIndividualParticipantIds.includes(participantId)
      );
    if (ungroupedParticipantIdsToRemove.length) {
      removeEventEntries({
        participantIds: ungroupedParticipantIdsToRemove,
        autoEntryPositions: false, // because the method will be called below if necessary
        tournamentRecord,
        event,
      });
    }
  }

  const invalidParticipantIds = !!(
    validParticipantIds.length !== participantIds.length
  );

  if (autoEntryPositions) {
    event.entries = refreshEntryPositions({
      entries: event.entries || [],
    });
  }

  return !invalidParticipantIds
    ? Object.assign({ info }, SUCCESS)
    : { error: INVALID_PARTICIPANT_IDS };
}
