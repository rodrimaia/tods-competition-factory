import { getVenuesAndCourts } from '../../../getters/venuesAndCourtsGetter';
import { sameDay, timeStringMinutes } from '../../../../utilities/dateTime';
import { getScheduleTimes } from '../garman/getScheduleTimes';
import { generateBookings } from './generateBookings';

import { MISSING_TOURNAMENT_RECORDS } from '../../../../constants/errorConditionConstants';

/**
 *
 * @param {object[]} tournamentRecords - passed in by competitionEngine
 * @param {string[]} venueIds - optional - look for availaiblity only courts at specified venues
 * @param {boolean} calculateStartTimeFromCourts - defaults to true - will override supplied startTime
 * @param {string} startTime - military time string, time only, e.g. '08:00'
 * @param {string} endTime - military time string, time only, e.g. '18:00'
 * @param {string} scheduleDate - date string 'YYYY-MM-DD'
 *
 * NOTE: not using matchUpFormat here because time per format is defined by policy
 * @param {number} averageMatchUpMinutes - number of minutes per match
 * @param {number} periodLengh - number of minutes in a scheduling period
 * @returns
 */
export function generateScheduleTimes({
  calculateStartTimeFromCourts = true,
  defaultRecoveryMinutes = 60,
  averageMatchUpMinutes = 90,
  periodLength = 30,
  tournamentRecords,
  scheduleDate,
  startTime,
  venueIds,
  matchUps,
  endTime,

  remainingScheduleTimes,
}) {
  if (
    typeof tournamentRecords !== 'object' ||
    !Object.keys(tournamentRecords).length
  )
    return { error: MISSING_TOURNAMENT_RECORDS };

  const { courts: allCourts, venues } = getVenuesAndCourts({
    tournamentRecords,
  });

  const courts = allCourts.filter(
    (court) => !venueIds || venueIds.includes(court.venueId)
  );

  if (!startTime) {
    startTime = courts.reduce((minStartTime, court) => {
      const dateAvailability = court.dateAvailability?.find(
        // if no date is specified consider it to be default for all tournament dates
        (availability) =>
          !availability.date || sameDay(scheduleDate, availability.date)
      );
      const comparisonStartTime =
        dateAvailability?.startTime || court.startTime;

      return comparisonStartTime &&
        (!minStartTime ||
          timeStringMinutes(comparisonStartTime) <
            timeStringMinutes(minStartTime))
        ? comparisonStartTime
        : minStartTime;
    }, undefined);
  }

  if (!endTime) {
    endTime = courts.reduce((maxEndTime, court) => {
      const dateAvailability = court.dateAvailability?.find(
        // if no date is specified consider it to be default for all tournament dates
        (availability) =>
          !availability.date || sameDay(scheduleDate, availability.date)
      );
      const comparisonEndTime = dateAvailability?.endTime || court.endTime;

      return comparisonEndTime &&
        (!maxEndTime ||
          timeStringMinutes(comparisonEndTime) > timeStringMinutes(maxEndTime))
        ? comparisonEndTime
        : maxEndTime;
    }, undefined);
  }

  const { bookings, relevantMatchUps } = generateBookings({
    defaultRecoveryMinutes,
    averageMatchUpMinutes,
    tournamentRecords,
    scheduleDate,
    periodLength,
    venueIds,
    matchUps,
  });

  const timingParameters = {
    calculateStartTimeFromCourts,
    remainingScheduleTimes,
    averageMatchUpMinutes,
    periodLength,
    startTime,
    endTime,
    bookings,
    courts,
    date: scheduleDate,
  };
  const { scheduleTimes } = getScheduleTimes(timingParameters);

  // if a single venue specified, or only one venue available, return venueId
  const venueId =
    venueIds?.length === 1
      ? venueIds[0]
      : venues?.length === 1
      ? venues[0].venueId
      : undefined;

  const dateScheduledMatchUpIds = relevantMatchUps.map(
    ({ matchUpId }) => matchUpId
  );

  return { venueId, scheduleTimes, dateScheduledMatchUpIds };
}
