import { getAllStructureMatchUps } from '../../getters/getMatchUps/getAllStructureMatchUps';
import { removeSubsequentRoundsParticipant } from './removeSubsequentRoundsParticipant';
import { structureAssignedDrawPositions } from '../../getters/positionsGetter';
import { modifyMatchUpNotice } from '../../notifications/drawNotifications';
import { clearDrawPosition } from '../positionGovernor/positionClear';
import { includesMatchUpStatuses } from './includesMatchUpStatuses';
import { findStructure } from '../../getters/findStructure';
import { updateTieMatchUpScore } from './tieMatchUpScore';
import { modifyMatchUpScore } from './modifyMatchUpScore';
import { instanceCount } from '../../../utilities';
import { isAdHoc } from '../queryGovernor/isAdHoc';

import { MISSING_DRAW_POSITIONS } from '../../../constants/errorConditionConstants';
import { FIRST_MATCHUP } from '../../../constants/drawDefinitionConstants';
import { TO_BE_PLAYED } from '../../../constants/matchUpStatusConstants';
import { SUCCESS } from '../../../constants/resultConstants';

export function removeDirectedParticipants(params) {
  const {
    dualWinningSideChange,
    inContextDrawMatchUps,
    tournamentRecord,
    drawDefinition,
    matchUpStatus,
    matchUpsMap,
    dualMatchUp,
    targetData,
    structure,
    event,
  } = params;

  const isCollectionMatchUp = Boolean(params.matchUp.collectionId);
  const isAdHocMatchUp = isAdHoc({ drawDefinition, structure });

  // targetData will have team matchUp when params.matchUp is a collectionMatchUp
  const { drawPositions, winningSide } = targetData.matchUp || {};
  if (!isAdHocMatchUp && !drawPositions) {
    return { error: MISSING_DRAW_POSITIONS };
  }

  const {
    targetLinks: { loserTargetLink, winnerTargetLink },
    targetMatchUps: { loserMatchUp, winnerMatchUp },
  } = targetData;

  const result = modifyMatchUpScore({
    ...params,
    matchUpStatus: matchUpStatus || TO_BE_PLAYED,
    removeWinningSide: true,
  });
  if (result.error) return result;

  if (isCollectionMatchUp) {
    const { matchUpTieId } = params;
    const { removeWinningSide } = updateTieMatchUpScore({
      matchUpId: matchUpTieId,
      tournamentRecord,
      drawDefinition,
      event,
    });
    if (!dualWinningSideChange && !removeWinningSide) return { ...SUCCESS };
  }

  if (isAdHocMatchUp) return { ...SUCCESS };

  const { matchUps: sourceMatchUps } = getAllStructureMatchUps({
    inContext: true,
    drawDefinition,
    matchUpsMap,
    structure,
  });

  const { positionAssignments } = structureAssignedDrawPositions({ structure });

  const winningIndex = winningSide - 1;
  const losingIndex = 1 - winningIndex;
  const winningDrawPosition = drawPositions[winningIndex];
  const loserDrawPosition = drawPositions[losingIndex];

  // use reduce for single pass resolution of both
  const { winnerParticipantId, loserParticipantId } =
    positionAssignments.reduce(
      (assignments, assignment) => {
        if (assignment.drawPosition === loserDrawPosition)
          assignments.loserParticipantId = assignment.participantId;
        if (assignment.drawPosition === winningDrawPosition)
          assignments.winnerParticipantId = assignment.participantId;
        return assignments;
      },
      { winnerParticipantId: undefined, loserParticipantId: undefined }
    );

  const drawPositionMatchUps = sourceMatchUps.filter((matchUp) =>
    matchUp.drawPositions?.includes(loserDrawPosition)
  );

  if (winnerMatchUp) {
    const result = removeDirectedWinner({
      inContextDrawMatchUps,
      winningDrawPosition,
      winnerParticipantId,
      tournamentRecord,
      winnerTargetLink,
      drawDefinition,
      winnerMatchUp,
      dualMatchUp,
      matchUpsMap,
    });
    if (result.error) return result;
  }

  if (loserMatchUp) {
    const { winnerHadMatchUpStatus: winnerHadBye } = includesMatchUpStatuses({
      drawPositionMatchUps,
      loserDrawPosition,
      sourceMatchUps,
    });

    const loserLinkCondition = loserTargetLink.linkCondition;
    const firstMatchUpLoss = loserLinkCondition === FIRST_MATCHUP;

    if (winnerHadBye && firstMatchUpLoss) {
      // The fed drawPosition is always the lowest number
      const drawPosition = Math.min(...loserMatchUp.drawPositions);
      const removeByeResult = removeDirectedBye({
        targetLink: loserTargetLink,
        inContextDrawMatchUps,
        drawDefinition,
        drawPosition,
        matchUpsMap,
        event,
      });
      if (removeByeResult.error) return removeByeResult;
    }

    const removeLoserResult = removeDirectedLoser({
      inContextDrawMatchUps,
      loserParticipantId,
      tournamentRecord,
      loserTargetLink,
      drawDefinition,
      loserMatchUp,
      dualMatchUp,
      matchUpsMap,
      event,
    });
    if (removeLoserResult) return removeLoserResult;
  }

  return { ...SUCCESS };
}

export function removeDirectedWinner({
  inContextDrawMatchUps,
  winningDrawPosition,
  winnerParticipantId,
  tournamentRecord,
  winnerTargetLink,
  drawDefinition,
  winnerMatchUp,
  matchUpsMap,
  dualMatchUp,
  event,
}) {
  const { structureId, roundNumber } = winnerMatchUp;

  if (winnerTargetLink) {
    const structureId = winnerTargetLink.target.structureId;
    const { structure } = findStructure({ drawDefinition, structureId });
    const { positionAssignments } = structureAssignedDrawPositions({
      structure,
    });

    // remove participant from seedAssignments
    structure.seedAssignments = (structure.seedAssignments || []).filter(
      (assignment) => assignment.participantId !== winnerParticipantId
    );

    const relevantAssignment = positionAssignments.find(
      (assignment) => assignment.participantId === winnerParticipantId
    );
    const winnerDrawPosition = relevantAssignment?.drawPosition;

    const { matchUps } = getAllStructureMatchUps({
      drawDefinition,
      structure,
      event,
    });
    const allDrawPositionInstances = matchUps
      .map((matchUp) => matchUp.drawPositions)
      .flat(Infinity)
      .filter(Boolean);
    const drawPositionInstanceCount = instanceCount(allDrawPositionInstances);
    const winnerDrawPositionInstances =
      drawPositionInstanceCount[winnerDrawPosition];

    if (winnerDrawPositionInstances === 1) {
      // only remove position assignment if it has a single instance...
      // if there are multiple instances then a participant has been fed back into a draw
      positionAssignments.forEach((assignment) => {
        if (assignment.participantId === winnerParticipantId) {
          delete assignment.participantId;
        }
      });
    } else {
      console.log('not removing from position assignments since instances > 1');
    }

    const targetMatchUp = matchUpsMap?.drawMatchUps?.find(
      ({ matchUpId }) => matchUpId === winnerMatchUp.matchUpId
    );

    modifyMatchUpNotice({
      tournamentId: tournamentRecord?.tournamentId,
      eventId: event?.eventId,
      matchUp: targetMatchUp,
      drawDefinition,
    });
  }

  // Remove participant's drawPosition from current and subsequent round matchUps
  const result = removeSubsequentRoundsParticipant({
    targetDrawPosition: winningDrawPosition,
    inContextDrawMatchUps,
    tournamentRecord,
    drawDefinition,
    dualMatchUp,
    matchUpsMap,
    roundNumber,
    structureId,
  });

  if (result.error) return result;

  return { ...SUCCESS };
}

function removeDirectedLoser({
  loserParticipantId,
  tournamentRecord,
  loserTargetLink,
  drawDefinition,
  loserMatchUp,
  matchUpsMap,
  dualMatchUp,
  event,
}) {
  const structureId = loserTargetLink.target.structureId;
  const { structure } = findStructure({ drawDefinition, structureId });
  const { positionAssignments } = structureAssignedDrawPositions({ structure });
  const relevantDrawPosition = positionAssignments.find(
    (assignment) => assignment.participantId === loserParticipantId
  )?.drawPosition;
  positionAssignments.forEach((assignment) => {
    if (assignment.participantId === loserParticipantId) {
      delete assignment.participantId;
    }
  });

  // remove participant from seedAssignments
  structure.seedAssignments = (structure.seedAssignments || []).filter(
    (assignment) => assignment.participantId !== loserParticipantId
  );

  if (dualMatchUp) {
    // remove propagated lineUp
    const drawPositionSideIndex = loserMatchUp?.sides.reduce(
      (sideIndex, side, i) =>
        side.drawPosition === relevantDrawPosition ? i : sideIndex,
      undefined
    );
    const targetMatchUp = matchUpsMap?.drawMatchUps?.find(
      ({ matchUpId }) => matchUpId === loserMatchUp.matchUpId
    );
    const targetSide = targetMatchUp?.sides?.[drawPositionSideIndex];

    if (targetSide) {
      delete targetSide.lineUp;

      modifyMatchUpNotice({
        tournamentId: tournamentRecord?.tournamentId,
        eventId: event?.eventId,
        matchUp: targetMatchUp,
        drawDefinition,
      });
    }
  }

  return { ...SUCCESS };
}

export function removeDirectedBye({
  inContextDrawMatchUps,
  tournamentRecord,
  drawDefinition,
  drawPosition,
  matchUpsMap,
  targetLink,
  event,
}) {
  const structureId = targetLink.target.structureId;

  clearDrawPosition({
    inContextDrawMatchUps,
    tournamentRecord,
    drawDefinition,
    matchUpsMap,
    drawPosition,
    structureId,
    event,
  });

  return { ...SUCCESS };
}
