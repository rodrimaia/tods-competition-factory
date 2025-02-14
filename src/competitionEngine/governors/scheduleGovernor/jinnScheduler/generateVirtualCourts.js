import { getCourtDateAvailability } from '../garman/getCourtDateAvailability';
import { generateTimeSlots } from '../garman/generateTimeSlots';
import { makeDeepCopy } from '../../../../utilities';
import {
  isValidDateString,
  timeStringMinutes,
} from '../../../../utilities/dateTime';

import {
  INVALID_BOOKINGS,
  INVALID_DATE,
  INVALID_VALUES,
} from '../../../../constants/errorConditionConstants';

export function generateVirtualCourts({
  remainingScheduleTimes = [],
  clearScheduleDates,
  periodLength = 30,
  bookings = [],
  scheduleDate,
  courts = [],
}) {
  if (!Array.isArray(courts) || !courts.length)
    return { error: INVALID_VALUES, courts };
  if (!Array.isArray(bookings)) return { error: INVALID_BOOKINGS };
  if (!isValidDateString(scheduleDate)) return { error: INVALID_DATE };

  if (clearScheduleDates) {
    if (Array.isArray(clearScheduleDates)) {
      if (clearScheduleDates.includes(scheduleDate)) bookings = [];
    } else {
      bookings = [];
    }
  }

  const { courtBookings, unassignedBookings } = bookings.reduce(
    (accumulator, booking) => {
      const { courtId } = booking;
      if (courtId) {
        if (!accumulator.courtBookings[courtId]) {
          accumulator.courtBookings[courtId] = [booking];
        } else {
          accumulator.courtBookings[courtId].push(booking);
        }
      } else {
        accumulator.unassignedBookings.push(booking);
      }
      return accumulator;
    },
    { courtBookings: {}, unassignedBookings: [] }
  );

  const inProcessCourts = courts.map((court, index) => {
    const { courtId } = court;
    const bookingsThisCourt = courtBookings[courtId] || [];
    const availability =
      getCourtDateAvailability({ date: scheduleDate, court }) || {};
    const {
      date,
      startTime,
      endTime,
      bookings: existingBookings = [],
    } = availability;

    const allocatedTimeBooking = remainingScheduleTimes[index] && {
      startTime,
      endTime: remainingScheduleTimes[index],
    };

    const amendedBookings = [
      allocatedTimeBooking,
      ...makeDeepCopy(existingBookings, false, true),
      ...bookingsThisCourt,
    ].filter(Boolean);

    return {
      courtId,
      dateAvailability: {
        date,
        startTime,
        endTime,
        bookings: amendedBookings,
      },
    };
  });

  unassignedBookings.sort(
    (a, b) => timeStringMinutes(a.startTime) - timeStringMinutes(b.startTime)
  );

  const getCourtTimeSlots = () =>
    inProcessCourts
      .map((court) => {
        const courtDate = court.dateAvailability;
        const timeSlots = generateTimeSlots({ courtDate });
        return { courtId: court.courtId, timeSlots };
      })
      .flat();

  const assignedBookings = [];

  for (const unassignedBooking of unassignedBookings) {
    const { startTime, endTime, averageMinutes, recoveryMinutes, matchUpId } =
      unassignedBooking;
    const startMinutes = timeStringMinutes(startTime);
    const endMinutes = timeStringMinutes(endTime);
    const courtTimeSlots = getCourtTimeSlots();
    const bestCourt = courtTimeSlots.reduce(
      (best, { courtId, timeSlots }) => {
        let startDifference;
        const timeSlot = timeSlots.find(({ startTime, endTime }) => {
          startDifference = timeStringMinutes(startTime) - startMinutes;
          const startFits = startMinutes >= timeStringMinutes(startTime);
          const endFits = endMinutes <= timeStringMinutes(endTime);
          return (
            endFits &&
            best.startDifference !== 0 &&
            (((startDifference === 0 || startDifference + periodLength >= 0) &&
              (best.startDifference === undefined ||
                startDifference < best.startDifference)) ||
              startFits)
          );
        });
        return timeSlot ? { courtId, startDifference } : best;
      },
      { courtId: undefined, startDifference: undefined }
    );

    if (bestCourt.courtId) {
      const booking = {
        averageMinutes,
        recoveryMinutes,
        matchUpId,
        startTime,
        endTime,
      };
      assignedBookings.push(booking);
      const virtualCourt = inProcessCourts.find(
        ({ courtId }) => courtId === bestCourt.courtId
      );
      virtualCourt.dateAvailability.bookings.push(booking);
    } else {
      console.log({ unassignedBooking });
    }
  }

  const virtualCourts = inProcessCourts.map(
    ({ courtId, dateAvailability }) => ({
      courtId,
      dateAvailability: [dateAvailability],
    })
  );

  return { virtualCourts };
}
