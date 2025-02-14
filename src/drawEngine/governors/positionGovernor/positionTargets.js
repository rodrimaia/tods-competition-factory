import { nextRoundMatchUp } from '../../getters/getMatchUps/nextRoundMatchUp';
import { getTargetMatchUp } from '../../getters/getMatchUps/getTargetMatchUp';
import { getRoundLinks, getTargetLink } from '../../getters/linkGetter';
import { findStructure } from '../../getters/findStructure';

import {
  LOSER,
  WINNER,
  ROUND_OUTCOME,
  DRAW,
} from '../../../constants/drawDefinitionConstants';

/**
 * @param {string} matchUpId - matchUp identifier for sourceMatchUp
 * @param {object} structure - structure within which matchUp occurs
 * @param {object} drawDefinition - drawDefinition within which structure occurs
 * @param {object[]} inContextDrawMatchUps - array of all draw matchUps (for optimiation)
 * @param {object} inContextMatchUp - source matchUp with context
 * @param {boolean} useTargetMatchUpIds - whether to use { loserMatchUpId, winnerMatchUpId } to find targets
 *
 * targetMatchUpIds are used for optimization when fetching targetMatchUps for the purpose of displaying upcoming scheduling information
 * (!!) when targetMatchUpIds are used targetDrawPositions are not retrieved (!!)
 * targetDrawPositions are necessary for participant movement logic
 */
export function positionTargets({
  inContextDrawMatchUps = [],
  useTargetMatchUpIds,
  inContextMatchUp,
  drawDefinition,
  matchUpId,
}) {
  let matchUp = inContextMatchUp;
  if (inContextDrawMatchUps.length && !matchUp) {
    matchUp = inContextDrawMatchUps.find((m) => m.matchUpId === matchUpId);
  }

  const { structure } = findStructure({
    structureId: matchUp.structureId,
    drawDefinition,
  });

  const { finishingPosition } = structure;
  if (finishingPosition === ROUND_OUTCOME) {
    return targetByRoundOutcome({
      inContextDrawMatchUps,
      useTargetMatchUpIds,
      drawDefinition,
      structure,
      matchUp,
    });
  } else {
    return targetByWinRatio({ drawDefinition, matchUp, structure });
  }
}

function targetByRoundOutcome({
  inContextDrawMatchUps,
  useTargetMatchUpIds,
  drawDefinition,
  structure,
  matchUp,
}) {
  const { links } = getRoundLinks({
    roundNumber: matchUp.roundNumber,
    structureId: structure.structureId,
    drawDefinition,
  });
  const source = links?.source;
  const winnerTargetLink = getTargetLink({ source, linkType: WINNER });
  const loserTargetLink = getTargetLink({ source, linkType: LOSER });
  const { winnerMatchUpId, loserMatchUpId } = matchUp;

  const winnerFeedProfile = winnerTargetLink?.target?.feedProfile;
  const loserFeedProfile = loserTargetLink?.target?.feedProfile;

  let loserMatchUp, loserTargetDrawPosition, loserMatchUpDrawPositionIndex;
  let winnerMatchUp, winnerTargetDrawPosition, winnerMatchUpDrawPositionIndex;
  let structureMatchUps;

  if (useTargetMatchUpIds && (winnerMatchUpId || loserMatchUpId)) {
    winnerMatchUp =
      winnerMatchUpId &&
      winnerFeedProfile !== DRAW &&
      inContextDrawMatchUps.find(
        ({ matchUpId }) => matchUpId === winnerMatchUpId
      );
    loserMatchUp =
      loserMatchUpId &&
      loserFeedProfile !== DRAW &&
      inContextDrawMatchUps.find(
        ({ matchUpId }) => matchUpId === loserMatchUpId
      );

    if (winnerMatchUp || loserMatchUp) {
      return {
        matchUp,
        targetLinks: { loserTargetLink, winnerTargetLink },
        targetMatchUps: { loserMatchUp, winnerMatchUp },
      };
    }
  }

  const { roundPosition: sourceRoundPosition } = matchUp;
  structureMatchUps =
    structureMatchUps ||
    inContextDrawMatchUps.filter(
      (matchUp) => matchUp.structureId === structure.structureId
    );
  const sourceRoundMatchUpCount = structureMatchUps.reduce(
    (count, currentMatchUp) => {
      return currentMatchUp.roundNumber === matchUp.roundNumber &&
        !currentMatchUp.matchUpTieId // exclude tieMatchUps
        ? count + 1
        : count;
    },
    0
  );

  if (loserTargetLink && !loserMatchUp && loserFeedProfile !== DRAW) {
    ({
      matchUp: loserMatchUp,
      matchUpDrawPositionIndex: loserMatchUpDrawPositionIndex,
      targetDrawPosition: loserTargetDrawPosition,
    } = getTargetMatchUp({
      targetLink: loserTargetLink,
      sourceRoundMatchUpCount,
      inContextDrawMatchUps,
      sourceRoundPosition,
      drawDefinition,
    }));
  }

  if (winnerTargetLink && !winnerMatchUp && winnerFeedProfile !== DRAW) {
    ({
      matchUp: winnerMatchUp,
      matchUpDrawPositionIndex: winnerMatchUpDrawPositionIndex,
      targetDrawPosition: winnerTargetDrawPosition,
    } = getTargetMatchUp({
      drawDefinition,
      inContextDrawMatchUps,
      sourceRoundPosition,
      sourceRoundMatchUpCount,
      targetLink: winnerTargetLink,
    }));
  }

  if (!winnerMatchUp) {
    // if there is no winnerTargetLink then find targetMatchUp in next round
    structureMatchUps =
      structureMatchUps ||
      inContextDrawMatchUps.filter(
        (matchUp) => matchUp.structureId === structure.structureId
      );
    ({ matchUp: winnerMatchUp } = nextRoundMatchUp({
      structureMatchUps,
      matchUp,
    }));
  }

  return {
    matchUp,
    targetLinks: { loserTargetLink, winnerTargetLink },
    targetMatchUps: {
      loserMatchUp,
      winnerMatchUp,
      loserTargetDrawPosition,
      winnerTargetDrawPosition,
      loserMatchUpDrawPositionIndex,
      winnerMatchUpDrawPositionIndex,
    },
  };
}

function targetByWinRatio({ matchUp }) {
  return {
    matchUp,
    targetLinks: { loserTargetLink: undefined, winnerTargetLink: undefined }, // returned for testing
    targetMatchUps: { loserMatchUp: undefined, winnerMatchUp: undefined },
  };
}
