import { MISSING_MATCHUP } from '../../../constants/errorConditionConstants';

export function generateTieMatchUpScore({
  matchUp,
  tieFormat,
  separator = '-',
}) {
  if (!matchUp) return { error: MISSING_MATCHUP };

  const sidePoints = [0, 0];
  const tieMatchUps = matchUp?.tieMatchUps || [];
  const collectionDefinitions = matchUp?.tieFormat?.collectionDefinitions || [];
  collectionDefinitions.forEach((collectionDefinition) => {
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
    } else if (collectionDefinition.collectionValueProfile) {
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
  });

  const scoreStringSide1 = sidePoints.join(separator);
  const scoreStringSide2 = sidePoints.reverse().join(separator);
  const set = { side1Score: sidePoints[0], side2Score: sidePoints[1] };

  // now calculate if there is a winningSide
  let winningSide;
  const format = matchUp.tieFormat || tieFormat;
  if (format) {
    const valueGoal = format.winCriteria?.valueGoal;
    if (valueGoal) {
      const sideThatWon = sidePoints
        .map((points, sideIndex) => ({ sideNumber: sideIndex + 1, points }))
        .find(({ points }) => points >= valueGoal);
      winningSide = sideThatWon?.sideNumber;
    }
  }

  return {
    set,
    winningSide,
    scoreStringSide1,
    scoreStringSide2,
  };
}

function getCollectionPositionValue({
  collectionDefinition,
  collectionPosition,
}) {
  const collectionValueProfile =
    collectionDefinition.collectionValueProfile || [];
  const matchUpValue = collectionValueProfile.reduce((value, profile) => {
    return profile.collectionPosition === collectionPosition
      ? profile.matchUpValue
      : value;
  }, 0);
  return matchUpValue;
}
