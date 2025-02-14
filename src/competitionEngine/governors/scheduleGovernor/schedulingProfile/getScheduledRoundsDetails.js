import { getContainedStructures } from '../../../../tournamentEngine/governors/tournamentGovernor/getContainedStructures';
import { filterMatchUps } from '../../../../drawEngine/getters/getMatchUps/filterMatchUps';
import { getMatchUpFormat } from '../../../../tournamentEngine/getters/getMatchUpFormat';
import { findMatchUpFormatTiming } from '../matchUpFormatTiming/findMatchUpFormatTiming';
import { findEvent } from '../../../../tournamentEngine/getters/eventGetter';
import { allCompetitionMatchUps } from '../../../getters/matchUpsGetter';
import { matchUpSort } from '../../../../drawEngine/getters/matchUpSort';
import { getMatchUpId } from '../../../../global/functions/extractors';
import { isConvertableInteger } from '../../../../utilities/math';
import { isPowerOf2 } from '../../../../utilities';

import { SUCCESS } from '../../../../constants/resultConstants';
import {
  MISSING_TOURNAMENT_RECORDS,
  MISSING_VALUE,
} from '../../../../constants/errorConditionConstants';
import {
  BYE,
  completedMatchUpStatuses,
} from '../../../../constants/matchUpStatusConstants';

/**
 *
 * @param {object} tournamentRecords - passed in automatically by competitionEngine
 * @param {string[]} containedStructureIds - optional optimization - otherwise created internally
 * @param {integer} periodLength - optional - defaults to 30
 * @param {object[]} matchUps - optional optimization - otherwise created internally
 * @param {object[]} rounds - array of ordered rounds specified as part of a schedulingProfile
 * @returns
 */
export function getScheduledRoundsDetails({
  scheduleCompletedMatchUps,
  containedStructureIds, // optional to support calling method outside of scheduleProfileRounds
  tournamentRecords,
  periodLength = 30,
  matchUps, // optional to support calling method outside of scheduleProfileRounds
  rounds,
}) {
  if (typeof tournamentRecords !== 'object')
    return { error: MISSING_TOURNAMENT_RECORDS };
  if (!Array.isArray(rounds)) return { error: MISSING_VALUE };

  const hashes = [];
  const orderedMatchUpIds = [];
  const sortedRounds = rounds.sort(
    (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
  );

  // ---------------------------------------------------------
  // populate required variables if not provided by parameters
  containedStructureIds =
    containedStructureIds ||
    Object.assign(
      {},
      ...Object.values(tournamentRecords).map(
        (tournamentRecord) =>
          getContainedStructures({ tournamentRecord }).containedStructures
      )
    );

  if (!matchUps) {
    ({ matchUps } = allCompetitionMatchUps({
      tournamentRecords,
      nextMatchUps: true,
    }));
  }
  // ---------------------------------------------------------

  const minutesMap = {};
  const recoveryMinutesMap = {};
  const averageMinutesMap = {};
  let greatestAverageMinutes = 0;
  const scheduledRoundsDetails = sortedRounds.map((round) => {
    const roundPeriodLength = round.periodLength || periodLength;
    const structureIds = containedStructureIds[round.structureId] || [
      round.structureId,
    ];
    const roundMatchUpFilters = {
      tournamentIds: [round.tournamentId],
      roundNumbers: [round.roundNumber],
      matchUpIds: round.matchUpIds,
      eventIds: [round.eventId],
      drawIds: [round.drawId],
      structureIds,
    };
    let roundMatchUps = filterMatchUps({
      matchUps,
      processContext: true,
      ...roundMatchUpFilters,
    }).sort(matchUpSort);

    // filter by roundSegment
    const { segmentNumber, segmentsCount } = round.roundSegment || {};

    if (
      isConvertableInteger(segmentNumber) &&
      isPowerOf2(roundMatchUps?.length) &&
      isPowerOf2(segmentsCount) &&
      segmentNumber > 0 &&
      segmentNumber <= segmentsCount &&
      segmentsCount < roundMatchUps?.length &&
      !round.matchUpIds?.length
    ) {
      const segmentSize = roundMatchUps.length / segmentsCount;
      const firstSegmentIndex = segmentSize * (segmentNumber - 1);
      roundMatchUps = roundMatchUps.slice(
        firstSegmentIndex,
        firstSegmentIndex + segmentSize
      );
    }

    const tournamentRecord = tournamentRecords[round.tournamentId];
    const { drawDefinition, event } = findEvent({
      drawId: round.drawId,
      tournamentRecord,
    });
    const { matchUpFormat } = getMatchUpFormat({
      structureId: round.structureId,
      tournamentRecord,
      drawDefinition,
      event,
    });

    const { eventType, category } = event || {};
    const { categoryName, ageCategoryCode } = category || {};
    const {
      typeChangeRecoveryMinutes,
      recoveryMinutes,
      averageMinutes,
      error,
    } = findMatchUpFormatTiming({
      tournamentRecords,
      categoryName: categoryName || ageCategoryCode,
      tournamentId: round.tournamentId,
      eventId: round.eventId,
      matchUpFormat,
      eventType,
    });
    if (error) return { error, round };

    const matchUpIds = roundMatchUps
      .filter(
        ({ matchUpStatus }) =>
          // don't attempt to scheduled completed matchUpstatuses unless explicit override
          (scheduleCompletedMatchUps ||
            !completedMatchUpStatuses.includes(matchUpStatus)) &&
          matchUpStatus !== BYE
      )
      .map(getMatchUpId);

    matchUpIds.forEach((matchUpId) => {
      minutesMap[matchUpId] = {
        typeChangeRecoveryMinutes,
        recoveryMinutes,
        averageMinutes,
      };
      recoveryMinutesMap[matchUpId] = recoveryMinutes;
      averageMinutesMap[matchUpId] = averageMinutes;
    });
    orderedMatchUpIds.push(...matchUpIds);

    greatestAverageMinutes = Math.max(
      averageMinutes || 0,
      greatestAverageMinutes
    );
    const hash = `${averageMinutes}|${roundPeriodLength}`;
    if (!hashes.includes(hash)) hashes.push(hash);

    return {
      roundPeriodLength,
      recoveryMinutes,
      averageMinutes,
      matchUpIds,
      hash,
    };
  });

  return {
    scheduledRoundsDetails,
    greatestAverageMinutes,
    recoveryMinutesMap,
    averageMinutesMap,
    orderedMatchUpIds,
    minutesMap,
    ...SUCCESS,
  };
}
