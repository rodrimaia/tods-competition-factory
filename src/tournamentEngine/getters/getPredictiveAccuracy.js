import { scoreHasValue } from '../../matchUpEngine/governors/queryGovernor/scoreHasValue';
import {
  allDrawMatchUps,
  allEventMatchUps,
  allTournamentMatchUps,
} from './matchUpsGetter';

import { COMPETITIVE, DECISIVE, ROUTINE } from '../../constants/statsConstants';
import { DOUBLES, SINGLES } from '../../constants/matchUpTypes';
import { SUCCESS } from '../../constants/resultConstants';
import {
  INVALID_VALUES,
  MISSING_TOURNAMENT_RECORD,
  MISSING_VALUE,
} from '../../constants/errorConditionConstants';

export function getPredictiveAccuracy({
  tournamentRecord,
  ascending = true,
  drawDefinition,
  excludeMargin,
  exclusionRule,
  valueAccessor,
  matchUpType,
  zoneMargin,
  scaleName,
  eventId,
  drawId,
  event,
}) {
  if (!tournamentRecord) return { error: MISSING_TOURNAMENT_RECORD };

  if (matchUpType && ![SINGLES, DOUBLES].includes(matchUpType))
    return { error: INVALID_VALUES, info: { matchUpType } };

  const contextProfile = { withScaleValues: true, withCompetitiveness: true };
  const contextFilters = {
    matchUpTypes: matchUpType ? [matchUpType] : [SINGLES, DOUBLES],
  };
  const participants = tournamentRecord.participants;

  const matchUps = drawId
    ? allDrawMatchUps({
        inContext: true,
        drawDefinition,
        contextFilters,
        contextProfile,
        participants,
      })?.matchUps || []
    : eventId
    ? allEventMatchUps({
        inContext: true,
        contextFilters,
        contextProfile,
        participants,
        event,
      })?.matchUps || []
    : allTournamentMatchUps({
        tournamentRecord,
        contextFilters,
        contextProfile,
      })?.matchUps || [];

  const relevantMatchUps = matchUps.filter(
    ({ winningSide, score, sides }) =>
      winningSide && sides?.length === 2 && scoreHasValue({ score })
  );

  const accuracy = getGroupingAccuracy({
    matchUps: relevantMatchUps,
    excludeMargin,
    exclusionRule,
    valueAccessor,
    ascending,
    scaleName,
  });

  const zoneData =
    zoneMargin &&
    relevantMatchUps
      .map(({ competitiveness, matchUpType, score, sides }) => {
        const values = getSideValues({
          valueAccessor,
          matchUpType,
          scaleName,
          score,
          sides,
        });
        const valuesGap = Math.abs(values[0].value - values[1].value);

        return { competitiveness, score, valuesGap };
      })
      .filter(({ valuesGap }) => {
        const inZone = valuesGap < zoneMargin;
        return inZone;
      });

  const zoneBands = zoneData?.length && getGroupingBands({ zoneData });
  const totalZoneMatchUps =
    zoneBands && [].concat(Object.values(zoneBands)).flat().length;

  const zoneDistribution =
    totalZoneMatchUps &&
    Object.assign(
      {},
      ...Object.keys(zoneBands).map((key) => ({
        [key]:
          Math.round((10000 * zoneBands[key].length) / totalZoneMatchUps) / 100,
      }))
    );

  const nonZone = relevantMatchUps.length - (zoneData?.length || 0);

  return {
    ...SUCCESS,
    relevantMatchUps,
    zoneDistribution,
    zoneData,
    accuracy,
    nonZone,
  };
}

function getGroupingBands({ zoneData }) {
  const bands = { [COMPETITIVE]: [], [ROUTINE]: [], [DECISIVE]: [] };
  for (const data of zoneData) {
    const { competitiveness, score, valuesGap } = data;
    if (bands[competitiveness]) {
      bands[competitiveness].push({ score, valuesGap });
    }
  }

  return bands;
}

function getSideValues({ sides, matchUpType, scaleName, valueAccessor }) {
  return sides
    .sort((a, b) => a.sideNumber - b.sideNumber)
    .map(({ participant }) => {
      const ranking = participant?.rankings?.[matchUpType]?.find(
        (ranking) => ranking.scaleName === scaleName
      );
      const rating = participant?.ratings?.[matchUpType]?.find(
        (rating) => rating.scaleName === scaleName
      );
      const scaleValue = (rating || ranking)?.scaleValue;
      const value = valueAccessor ? scaleValue?.[valueAccessor] : scaleValue;
      return { scaleValue, value };
    });
}

// given a grouping of matchUps, how accurate were the scaleValues in predicting winner
function getGroupingAccuracy({
  excludeMargin,
  exclusionRule,
  valueAccessor,
  ascending,
  scaleName,
  matchUps,
}) {
  const accuracy = { affirmative: [], negative: [], excluded: [] };

  for (const matchUp of matchUps) {
    const { matchUpType, sides, score, winningSide } = matchUp;
    if (!winningSide) continue;

    const winningIndex = winningSide - 1;

    const values = getSideValues({
      valueAccessor,
      matchUpType,
      scaleName,
      score,
      sides,
    });

    if (exclusionRule) {
      const { valueAccessor, range } = exclusionRule;
      if (!valueAccessor || !range)
        return {
          info: 'exclusionRule requires valueAccessor and range',
          error: MISSING_VALUE,
        };

      const sortedRange = range.sort();
      const exclusionValue = values.find((value) => {
        const exclusionValue = value.scaleValue?.[valueAccessor];
        const exclude =
          exclusionValue >= sortedRange[0] && exclusionValue <= sortedRange[1];
        if (exclude) return exclusionValue;
      });

      if (exclusionValue) {
        accuracy.excluded.push({
          scoreString: score?.scoreStringSide1,
          exclusionValue,
          winningSide,
          values,
        });
        continue;
      }
    }

    const excludeGap = excludeMargin && valuesGap < excludeMargin;

    if (excludeGap) {
      accuracy.excluded.push({
        scoreString: score?.scoreStringSide1,
        winningSide,
        excludeGap,
        values,
      });
      continue;
    }

    if (
      values.filter((value) => ![undefined, '', null].includes(value.value))
        .length < 2
    ) {
      accuracy.excluded.push({
        scoreString: score?.scoreStringSide1,
        missingValues: true,
        winningSide,
        values,
      });
      continue;
    }

    const valuesGap =
      values[winningIndex].value - values[1 - winningIndex].value;

    // when ascending is true winning value will be less than losing value
    const signedGap = ascending ? valuesGap * -1 : valuesGap;

    const winningScoreString =
      winningSide === 1 ? score?.scoreStringSide1 : score?.scoreStringSide2;

    if (signedGap > 0) {
      accuracy.affirmative.push({
        winningScoreString,
        winningSide,
        valuesGap,
        values,
        score,
      });
    } else {
      accuracy.negative.push({
        winningScoreString,
        winningSide,
        valuesGap,
        values,
        score,
      });
    }
  }

  const denominator = accuracy.affirmative.length + accuracy.negative.length;
  const percent =
    denominator && (accuracy.affirmative.length / denominator) * 100;

  accuracy.percent = percent ? Math.round(100 * percent) / 100 : 0;

  return accuracy;
}
