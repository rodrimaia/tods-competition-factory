import { validateTieFormat } from '../../governors/matchUpGovernor/tieFormatUtilities';

import {
  INVALID_VALUES,
  MISSING_MATCHUP,
  MISSING_TIE_FORMAT,
} from '../../../constants/errorConditionConstants';

/**
 * Calculates the number of wins per side and winningSide. When provided with `sideAdjustments`
 * will calculate prjected score and winningSide which is necessary for checking validity of score
 *
 * @param {object} matchUp - TODS matchUp: { matchUpType: 'TEAM', tieMatchUps: [] }
 * @param {object} tieFormat - TODS tieFormat which defines the winCriteria for determining a winningSide
 * @param {string} separator - used to separate the two side scores in a scoreString
 * @param {number[]} sideAdjustments - used for projecting the score of a TEAM matchUp
 *
 * @returns scoreObject: { sets, winningSide, scoreStringSide1, scoreStringSide 2 }
 */
export function generateTieMatchUpScore({
  sideAdjustments = [0, 0],
  separator = '-',
  tieFormat,
  matchUp,
}) {
  if (
    !Array.isArray(sideAdjustments) ||
    sideAdjustments.length !== 2 ||
    isNaN(sideAdjustments.reduce((a, b) => a + b))
  ) {
    return { error: INVALID_VALUES };
  }

  if (!matchUp) return { error: MISSING_MATCHUP };
  tieFormat = matchUp.tieFormat || tieFormat;
  if (!tieFormat) return { error: MISSING_TIE_FORMAT };

  const result = validateTieFormat({ tieFormat });
  if (!result.valid) return { error: INVALID_VALUES, errors: result.errors };

  const sidePoints = [0, 0];
  const tieMatchUps = matchUp?.tieMatchUps || [];
  const collectionDefinitions = tieFormat?.collectionDefinitions || [];

  for (const collectionDefinition of collectionDefinitions) {
    const collectionMatchUps = tieMatchUps.filter(
      (matchUp) => matchUp.collectionId === collectionDefinition.collectionId
    );

    if (collectionDefinition.matchUpValue) {
      const matchUpValue = collectionDefinition.matchUpValue;
      collectionMatchUps.forEach((matchUp) => {
        if (matchUp.winningSide)
          sidePoints[matchUp.winningSide - 1] += matchUpValue;
      });
    } else if (collectionDefinition.collectionValue) {
      const sideWins = [0, 0];
      const winGoal =
        Math.floor(collectionDefinition.matchUpCount / 2).floor + 1;
      collectionMatchUps.forEach((matchUp) => {
        if (matchUp.winningSide) sideWins[matchUp.winningSide - 1] += 1;
      });
      const collectionWinningSide = sideWins.reduce((winningSide, side) => {
        return side >= winGoal ? side + 1 : winningSide;
      }, undefined);
      if (collectionWinningSide)
        sidePoints[collectionWinningSide] +=
          collectionDefinition.collectionValue;
    } else if (Array.isArray(collectionDefinition.collectionValueProfile)) {
      collectionMatchUps.forEach((matchUp) => {
        if (matchUp.winningSide) {
          const collectionPosition = matchUp.collectionPosition;
          const matchUpValue = getCollectionPositionValue({
            collectionDefinition,
            collectionPosition,
          });
          sidePoints[matchUp.winningSide - 1] += matchUpValue;
        }
      });
    }
  }

  const sideScores = sidePoints.map(
    (sideValue, i) => sideValue + sideAdjustments[i]
  );

  const set = { side1Score: sideScores[0], side2Score: sideScores[1] };
  const scoreStringSide1 = sideScores.join(separator);
  const scoreStringSide2 = sideScores.slice().reverse().join(separator);

  // now calculate if there is a winningSide
  let winningSide;
  if (tieFormat) {
    const valueGoal = tieFormat.winCriteria?.valueGoal;
    if (valueGoal) {
      const sideThatWon = sideScores
        .map((points, sideIndex) => ({ sideNumber: sideIndex + 1, points }))
        .find(({ points }) => points >= valueGoal);
      winningSide = sideThatWon?.sideNumber;
    }
  }

  return {
    scoreStringSide1,
    scoreStringSide2,
    winningSide,
    set,
  };
}

function getCollectionPositionValue({
  collectionDefinition,
  collectionPosition,
}) {
  const collectionValueProfile =
    collectionDefinition.collectionValueProfile || [];
  const profile = collectionValueProfile?.find(
    (profile) => profile.collectionPosition === collectionPosition
  );
  return profile?.matchUpValue;
}
