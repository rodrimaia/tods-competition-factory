import ratingsParameters from '../../../fixtures/ratings/ratingsParameters';

import { MISSING_VALUE } from '../../../constants/errorConditionConstants';
import { ELO } from '../../../constants/ratingConstants';

// see footnote #3 here:
// http://fivethirtyeight.com/features/serena-williams-and-the-difference-between-all-time-great-and-greatest-of-all-time/
const k538 = (countables) => 250 / Math.pow(countables + 5, 0.4);
const kDefault = () => 1;

// win multipier is scaled by % countables won
// https://www.stat.berkeley.edu/~aldous/157/Old_Projects/huang.pdf
function kSet(maxCountables = 3, counted = 2) {
  let kset = maxCountables / counted;
  return isNaN(kset) ? eloConfig.kDefault() : kset;
}

const eloConfig = {
  nSpread: 400, // determines the 'spread' of the scale
  diffThreshold: 0.125,

  kCalc: k538, // use calculation defined by FiveThirtyEight.com
  kMultiplier: kSet, // change to kDefault for value of 1
  kDefault,
};

export function getRatingDelta({
  ratings = ratingsParameters,
  ratingType,
  rating,
  delta,
}) {
  const ratingParameters = ratings?.[ratingType];
  let decimalPlaces = ratingParameters.decimalsCount || 0;
  let newRating = (parseFloat(rating) + parseFloat(delta)).toFixed(
    decimalPlaces
  );
  if (newRating < 0) newRating = rating;
  return newRating;
}

export function calculateNewRatings({
  ratings = ratingsParameters,
  winnerCountables = 1,
  loserCountables = 0,
  ratingType = ELO,
  maxCountables,
  winnerRating,
  loserRating,
  ratingRange,
  countables,
} = {}) {
  const ratingParameters = ratings?.[ratingType];
  if (!ratingParameters) return { error: MISSING_VALUE };

  ratingRange = ratingParameters.range || ratingRange;
  winnerRating = winnerRating || ratingParameters.defaultInitialization;
  loserRating = loserRating || ratingParameters.defaultInitialization;

  const invertedScale = ratingRange[0] > ratingRange[1];

  const decimalPlaces = ratingParameters.decimalsCount || 0;
  // const consideredValue = invertedScale ? ratingRange[0] - value : value;
  const consideredRange = invertedScale
    ? ratingRange.slice().reverse()
    : ratingRange;

  const inRange = (range, value) =>
    parseFloat(value) >= Math.min(...range) &&
    parseFloat(value) <= Math.max(...range);
  if (
    !inRange(ratingRange, winnerRating) ||
    !inRange(ratingRange, loserRating)
  ) {
    if (!inRange(ratingRange, winnerRating))
      winnerRating = ratingParameters.defaultInitialization;
    if (!inRange(ratingRange, loserRating))
      loserRating = ratingParameters.defaultInitialization;
  }

  // convert one rating range to another rating range
  const convertRange = ({ value, sourceRange, targetRange }) =>
    ((value - sourceRange[0]) * (targetRange[1] - targetRange[0])) /
      (sourceRange[1] - sourceRange[0]) +
    targetRange[0];

  // convert inbound ratings from ratingType into ELO
  const convertedWinnerRating = convertRange({
    targetRange: ratingsParameters[ELO].range,
    sourceRange: consideredRange,
    value: invertedScale ? ratingRange[0] - winnerRating : winnerRating,
  });
  const convertedLoserRating = convertRange({
    targetRange: ratingsParameters[ELO].range,
    sourceRange: consideredRange,
    value: invertedScale ? ratingRange[0] - loserRating : loserRating,
  });

  const getExpectation = (playerRating, opponentRating) =>
    1 / (1 + Math.pow(10, (opponentRating - playerRating) / eloConfig.nSpread));

  let winnerExpectation = getExpectation(
    convertedWinnerRating,
    convertedLoserRating
  );
  let loserExpectation = getExpectation(
    convertedLoserRating,
    convertedWinnerRating
  );

  let winnerKValue = eloConfig.kCalc(winnerCountables);
  let loserKValue = eloConfig.kCalc(loserCountables);
  let k = eloConfig.kMultiplier(maxCountables, countables);

  let winnerUpdatedConvertedRating =
    convertedWinnerRating + k * winnerKValue * (1 - winnerExpectation);
  let loserUpdatedConvertedRating =
    convertedLoserRating + k * loserKValue * (0 - loserExpectation);

  // convert calculated new ratings from ELO into ratingType
  let convertedUpdatedWinnerRating = convertRange({
    sourceRange: ratingsParameters[ELO].range,
    value: winnerUpdatedConvertedRating,
    targetRange: consideredRange,
  });
  let convertedUpdatedLoserRating = convertRange({
    sourceRange: ratingsParameters[ELO].range,
    value: loserUpdatedConvertedRating,
    targetRange: consideredRange,
  });

  const updatedWinnerRating = invertedScale
    ? ratingRange[0] - convertedUpdatedWinnerRating
    : convertedUpdatedWinnerRating;
  let newWinnerRating = parseFloat(updatedWinnerRating).toFixed(decimalPlaces);
  const updatedLoserRating = invertedScale
    ? ratingRange[0] - convertedUpdatedLoserRating
    : convertedUpdatedLoserRating;
  let newLoserRating = parseFloat(updatedLoserRating).toFixed(decimalPlaces);

  //  if expected winner && percentageDifference > threshold don't change ratings
  const percentageDifference = Math.max(...ratingRange)
    ? Math.abs(winnerRating - loserRating) / Math.max(...ratingRange)
    : 0;

  if (
    (convertedUpdatedWinnerRating > convertedUpdatedLoserRating &&
      percentageDifference > eloConfig.diffThreshold) ||
    newWinnerRating < 0 ||
    newLoserRating < 0
  ) {
    newWinnerRating = winnerRating;
    newLoserRating = loserRating;
  }

  return { newWinnerRating, newLoserRating };
}
