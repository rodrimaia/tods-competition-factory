import { removeParticipantsScaleItems } from '../../participantGovernor/removeScaleItems';
import { decorateResult } from '../../../../global/functions/decorateResult';
import { getParticipantId } from '../../../../global/functions/extractors';
import { getFlightProfile } from '../../../getters/getFlightProfile';

import {
  INVALID_VALUES,
  MISSING_EVENT,
} from '../../../../constants/errorConditionConstants';

/**
 *
 * @param {object} tournamentRecord - passed automatically if tournamentEngine.setState()
 * @param {string} eventId - resolves to event
 * @param {string} drawId - OPTIONAL - resolves drawDefinition - scopes participants to clear to drawDefinition.entries or flightProfile.flight.drawEntries
 * @param {string} scaleAttributes - { scaleType, scaleName, eventType }
 * @param {string} stage - OPTIONAL - filter event or draw entries by stage
 * @returns {boolean} { success: true } or { error }
 */
export function removeScaleValues({
  tournamentRecord,
  scaleAttributes,
  drawDefinition,
  entryStatuses,
  drawId,
  event,
  stage,
}) {
  if (!event) return { error: MISSING_EVENT };
  if (entryStatuses && !Array.isArray(entryStatuses))
    return decorateResult({
      result: { error: INVALID_VALUES },
      info: 'entryStatus must be an array',
      stack: 'removeScaleValues',
    });

  let entries = event.entries;

  if (drawId) {
    const { flightProfile } = getFlightProfile({ event });
    const flight = flightProfile?.flights?.find(
      (flight) => flight.drawId === drawId
    );
    if (flight) {
      entries = flight.drawEntries;
    } else {
      entries = drawDefinition?.entries;
    }
  }

  const stageEntries = (entries || []).filter(
    (entry) =>
      (!stage || !entry.entryStage || entry.entryStage === stage) &&
      (!entryStatuses || entryStatuses.includes(entry.entryStatus))
  );

  const participantIds = stageEntries.map(getParticipantId);

  const result = removeParticipantsScaleItems({
    tournamentRecord,
    scaleAttributes,
    participantIds,
  });

  return result;
}
