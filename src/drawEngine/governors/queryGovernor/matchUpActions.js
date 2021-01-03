import { findMatchUp } from '../../getters/getMatchUps';
import { structureAssignedDrawPositions } from '../../getters/positionsGetter';
import { getRoundLinks, getTargetLink } from '../../getters/linkGetter';
import { positionActions } from './positionActions/positionActions';
import { isDirectingMatchUpStatus } from '../matchUpGovernor/checkStatusType';
import { getAppliedPolicies } from '../policyGovernor/getAppliedPolicies';

import {
  ADD_PENALTY,
  ADD_PENALTY_METHOD,
} from '../../../constants/positionActionConstants';
import {
  MISSING_DRAW_DEFINITION,
  MISSING_MATCHUP_ID,
} from '../../../constants/errorConditionConstants';
import { BYE } from '../../../constants/matchUpStatusConstants';
import { LOSER, WINNER } from '../../../constants/drawDefinitionConstants';

/*
  return an array of all possible validActions for a given matchUp
*/
export function matchUpActions({ drawDefinition, matchUpId }) {
  if (!drawDefinition) return { error: MISSING_DRAW_DEFINITION };
  if (!matchUpId) return { error: MISSING_MATCHUP_ID };

  const { matchUp, structure } = findMatchUp({
    drawDefinition,
    matchUpId,
  });
  const {
    assignedPositions,
    allPositionsAssigned,
  } = structureAssignedDrawPositions({ structure });
  const { drawPositions } = matchUp || {};
  const { structureId } = structure || {};

  const validActions = [];
  if (!structureId) return { validActions };

  const participantAssignedDrawPositions = assignedPositions
    .filter((assignment) => assignment.participantId)
    .map((assignment) => assignment.drawPosition);

  const byeAssignedDrawPositions = assignedPositions
    .filter((assignment) => assignment.bye)
    .map((assignment) => assignment.drawPosition);

  const isCollectionMatchUp = matchUp.collectionId;
  const isByeMatchUp =
    matchUp.matchUpStatus === BYE ||
    (!isCollectionMatchUp &&
      matchUp.drawPositions?.reduce((isByeMatchUp, drawPosition) => {
        return byeAssignedDrawPositions.includes(drawPosition) || isByeMatchUp;
      }, false));

  const matchUpDrawPositionsAreAssigned = drawPositions?.reduce(
    (assignedBoolean, drawPosition) =>
      participantAssignedDrawPositions.includes(drawPosition) &&
      assignedBoolean,
    true
  );

  const {
    links: { source },
  } = getRoundLinks({
    drawDefinition,
    roundNumber: matchUp.roundNumber,
    structureId,
  });
  const loserTargetLink = getTargetLink({ source, subject: LOSER });
  const winnerTargetLink = getTargetLink({ source, subject: WINNER });

  if (loserTargetLink || winnerTargetLink) {
    // console.log({ source, loserTargetLink, winnerTargetLink });
  }

  if (isByeMatchUp) {
    const nonByeDrawPosition = matchUp.drawPositions?.reduce(
      (nonByeDrawPosition, drawPosition) => {
        return !byeAssignedDrawPositions.includes(drawPosition)
          ? drawPosition
          : nonByeDrawPosition;
      },
      undefined
    );

    const participantId = assignedPositions.reduce(
      (participantId, assignment) => {
        return assignment.drawPosition === nonByeDrawPosition
          ? assignment.participantId
          : participantId;
      },
      undefined
    );

    if (participantId) {
      return positionActions({
        drawDefinition,
        participantId,
        structureId,
        drawPosition: nonByeDrawPosition,
      });
    } else {
      return { validActions, isByeMatchUp };
    }
  } else {
    validActions.push({ type: 'REFEREE' });
    const isInComplete = !isDirectingMatchUpStatus({
      matchUpStatus: matchUp.matchUpStatus,
    });
    const { appliedPolicies } = getAppliedPolicies({ drawDefinition });
    const structureScoringPolicies = appliedPolicies?.scoring?.structures;
    const stageSpecificPolicies =
      structureScoringPolicies?.stage &&
      structureScoringPolicies?.stage[structure.stage];
    const sequenceSpecificPolicies =
      stageSpecificPolicies?.stageSequence &&
      stageSpecificPolicies.stageSequence[structure.stageSequence];
    const requireAllPositionsAssigned =
      appliedPolicies?.scoring?.requireAllPositionsAssigned ||
      stageSpecificPolicies?.requireAllPositionsAssigned ||
      sequenceSpecificPolicies?.requireAllPositionsAssigned;
    const scoringActive = !requireAllPositionsAssigned || allPositionsAssigned;

    const hasParticipants =
      matchUp.sides &&
      matchUp.sides.filter((side) => side && side.participantId).length === 2;

    const readyToScore = matchUpDrawPositionsAreAssigned || hasParticipants;

    const { drawId } = drawDefinition;
    const addPenaltyAction = {
      type: ADD_PENALTY,
      method: ADD_PENALTY_METHOD,
      payload: {
        drawId,
        matchUpId,
        penaltyCode: undefined,
        penaltyType: undefined,
        participantIds: [],
        notes: undefined,
      },
    };
    if (isInComplete && !isByeMatchUp) {
      validActions.push({ type: 'SCHEDULE' });
    }
    if (readyToScore && !isByeMatchUp) {
      validActions.push(addPenaltyAction);
    }
    if (isInComplete && readyToScore && !isByeMatchUp) {
      validActions.push({ type: 'STATUS' });
    }
    if (scoringActive && readyToScore && !isByeMatchUp) {
      validActions.push({ type: 'SCORE' });
      validActions.push({ type: 'START' });
      validActions.push({ type: 'END' });
    }
  }
  return { validActions, isByeMatchUp };
}
