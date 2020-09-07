import { matchUpEndTime } from './endTime';
import { matchUpStartTime } from './startTime';
import { matchUpDuration } from './matchUpDuration';
import { scheduledMatchUpTime } from './scheduledTime';
import { matchUpAssignedCourtId } from './courtAssignment';

export function getMatchUpScheduleDetails({matchUp}) {
  const { milliseconds, time } = matchUpDuration({matchUp});
  const { scheduledTime } = scheduledMatchUpTime({matchUp});
  const { startTime } = matchUpStartTime({matchUp});
  const { endTime } = matchUpEndTime({matchUp});
  const { courtId } = matchUpAssignedCourtId({matchUp});

  const schedule = {
    time,
    courtId,
    startTime,
    endTime,
    milliseconds,
    scheduledTime
  };

  return { schedule };
}