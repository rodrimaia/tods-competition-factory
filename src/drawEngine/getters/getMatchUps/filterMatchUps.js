import { scheduledMatchUpTime } from '../../accessors/matchUpAccessor/scheduledMatchUpTime';
import { scheduledMatchUpDate } from '../../accessors/matchUpAccessor/scheduledMatchUpDate';
import { matchUpAssignedCourtId } from '../../accessors/matchUpAccessor/courtAssignment';
import { matchUpAssignedVenueId } from '../../accessors/matchUpAccessor/venueAssignment';
import { extractDate, sameDay } from '../../../utilities/dateTime';

export function filterMatchUps(params) {
  const {
    matchUps,

    isCollectionMatchUp,
    matchUpStatuses,
    hasWinningSide,
    matchUpFormats,
    roundPositions,
    matchUpFormat,
    collectionIds,
    isMatchUpTie,
    roundNumbers,
    matchUpIds,
    roundNames,

    // only applies to inContext matchUps and only when processContext boolean is true
    stageSequences,
    scheduledDates,
    scheduledDate,
    participantIds,
    processContext,
    tournamentIds,
    matchUpTypes,
    structureIds,
    courtIds,
    eventIds,
    venueIds,
    drawIds,
    stages,

    filterMatchUpIds = true,
    filterMatchUpTypes = true,
  } = params;

  const targetParticipantIds = Array.isArray(participantIds)
    ? participantIds.filter(Boolean)
    : [];
  const targetMatchUpStatuses = Array.isArray(matchUpStatuses)
    ? matchUpStatuses.filter(Boolean)
    : [];

  const targetStages = Array.isArray(stages) ? stages.filter(Boolean) : [];
  const targetStageSequences = Array.isArray(stageSequences)
    ? stageSequences.filter(Boolean)
    : [];
  const targetCollectionIds = Array.isArray(collectionIds)
    ? collectionIds.filter(Boolean)
    : [];
  const targetRoundNames = Array.isArray(roundNames)
    ? roundNames.filter(Boolean)
    : [];
  const targetRoundNumbers = Array.isArray(roundNumbers)
    ? roundNumbers.filter(Boolean)
    : [];
  const targetRoundPositions = Array.isArray(roundPositions)
    ? roundPositions.filter(Boolean)
    : [];

  const targetMatchUpIds =
    Array.isArray(matchUpIds) && filterMatchUpIds
      ? matchUpIds.filter(Boolean)
      : [];
  const targetMatchUpTypes =
    Array.isArray(matchUpTypes) && filterMatchUpTypes
      ? matchUpTypes.filter(Boolean)
      : [];
  const targetCourtIds = Array.isArray(courtIds)
    ? courtIds.filter(Boolean)
    : [];
  const targetVenueIds = Array.isArray(venueIds)
    ? venueIds.filter(Boolean)
    : [];
  const targetMatchUpFormats = Array.isArray(matchUpFormats)
    ? matchUpFormats.filter(Boolean)
    : typeof matchUpFormat === 'string'
    ? [matchUpFormat]
    : [];
  const targetScheduledDates = Array.isArray(scheduledDates)
    ? scheduledDates.filter(Boolean)
    : typeof scheduledDate === 'string' && scheduledDate.length
    ? [scheduledDate]
    : [];

  const targetTournamentIds = Array.isArray(tournamentIds)
    ? tournamentIds.filter(Boolean)
    : [];
  const targetEventIds = Array.isArray(eventIds)
    ? eventIds.filter(Boolean)
    : [];
  const targetDrawIds = Array.isArray(drawIds) ? drawIds.filter(Boolean) : [];
  const targetStructureIds = Array.isArray(structureIds)
    ? structureIds.filter(Boolean)
    : [];

  const filteredMatchUps = matchUps.filter((matchUp) => {
    if (hasWinningSide && ![1, 2].includes(matchUp.winningSide)) return false;
    if (isMatchUpTie !== undefined) {
      if (isMatchUpTie && !matchUp.tieMatchUps) {
        return false;
      }
      if (!isMatchUpTie && matchUp.tieMatchUps) {
        return false;
      }
    }
    if (isCollectionMatchUp !== undefined) {
      if (isCollectionMatchUp && !matchUp.collectionId) {
        return false;
      }
      if (!isCollectionMatchUp && matchUp.collectionId) {
        return false;
      }
    }

    if (targetStages.length && !targetStages.includes(matchUp.stage)) {
      return false;
    }
    if (
      targetStageSequences.length &&
      !targetStageSequences.includes(matchUp.stageSequence)
    ) {
      return false;
    }
    if (
      targetCollectionIds.length &&
      !targetCollectionIds.includes(matchUp.collectionId)
    ) {
      return false;
    }
    if (
      targetRoundNames.length &&
      !targetRoundNames.includes(matchUp.roundName)
    ) {
      return false;
    }
    if (
      targetRoundNumbers.length &&
      !roundNumbers.includes(matchUp.roundNumber)
    ) {
      return false;
    }
    if (
      targetRoundPositions.length &&
      !roundPositions.includes(matchUp.roundPosition)
    ) {
      return false;
    }
    if (
      targetMatchUpStatuses.length &&
      !targetMatchUpStatuses.includes(matchUp.matchUpStatus)
    ) {
      return false;
    }
    if (
      targetMatchUpIds.length &&
      !targetMatchUpIds.includes(matchUp.matchUpId)
    ) {
      return false;
    }
    if (
      targetMatchUpTypes.length &&
      !targetMatchUpTypes.includes(matchUp.matchUpType)
    ) {
      return false;
    }
    if (
      targetMatchUpFormats.length &&
      !targetMatchUpFormats.includes(matchUp.matchUpFormat)
    ) {
      return false;
    }

    if (targetScheduledDates?.length) {
      const { scheduledTime } = scheduledMatchUpTime({ matchUp });
      const { scheduledDate: matchUpDate } = scheduledMatchUpDate({ matchUp });
      const scheduledTimeDate = extractDate(scheduledTime);
      const comparisonDate = scheduledTimeDate || matchUpDate;

      if (
        !targetScheduledDates.find((scheduledDate) =>
          sameDay(scheduledDate, comparisonDate)
        )
      )
        return false;
    }

    if (targetCourtIds.length) {
      const { courtId } = matchUpAssignedCourtId({ matchUp });
      if (!courtIds.filter(Boolean).includes(courtId)) {
        return false;
      }
    }

    if (targetVenueIds.length) {
      const { venueId } = matchUpAssignedVenueId({ matchUp });
      if (!venueIds.filter(Boolean).includes(venueId)) {
        return false;
      }
    }

    if (processContext) {
      if (
        targetTournamentIds.length &&
        !targetTournamentIds.includes(matchUp.tournamentId)
      ) {
        return false;
      }

      if (targetEventIds.length && !targetEventIds.includes(matchUp.eventId)) {
        return false;
      }

      if (targetDrawIds.length && !targetDrawIds.includes(matchUp.drawId)) {
        return false;
      }

      if (
        targetStructureIds.length &&
        !targetStructureIds.includes(matchUp.structureId)
      ) {
        return false;
      }

      if (targetParticipantIds.length) {
        const matchUpParticipantIds =
          matchUp.sides
            ?.map(({ participantId }) => participantId)
            .filter(Boolean) || [];
        const containsTargetedParticipantId = targetParticipantIds.some(
          (participantId) => matchUpParticipantIds.includes(participantId)
        );
        if (!containsTargetedParticipantId) return false;
      }
    }

    return true;
  });

  return filteredMatchUps;
}
