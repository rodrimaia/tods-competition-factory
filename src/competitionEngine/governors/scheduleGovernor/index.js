import { modifyEventMatchUpFormatTiming } from './matchUpFormatTiming/modifyEventMatchUpFormatTiming';
import { getMatchUpFormatTimingUpdate } from './matchUpFormatTiming/getMatchUpFormatTimingUpdate';
import { getEventMatchUpFormatTiming } from './matchUpFormatTiming/getEventMatchUpFormatTiming';
import { modifyMatchUpFormatTiming } from './matchUpFormatTiming/modifyMatchUpFormatTiming';
import { findMatchUpFormatTiming } from './matchUpFormatTiming/findMatchUpFormatTiming';
import { toggleParticipantCheckInState } from './toggleParticipantCheckInState';
import { removeMatchUpCourtAssignment } from './removeMatchUpCourtAssignment';
import { getMatchUpDailyLimitsUpdate } from './getMatchUpDailyLimitsUpdate';
import { bulkUpdateCourtAssignments } from './bulkUpdateCourtAssignments';
import { reorderUpcomingMatchUps } from './reorderUpcomingMatchUps';
import { calculateScheduleTimes } from './scheduleMatchUps/calculateScheduleTimes';
import { setMatchUpDailyLimits } from './setMatchUpDailyLimits';
import { matchUpScheduleChange } from './matchUpScheduleChange';
import { scheduleProfileRounds } from './schedulingProfile/scheduleProfileRounds';
import { getMatchUpDailyLimits } from './getMatchUpDailyLimits';
import { scheduleMatchUps } from './scheduleMatchUps/scheduleMatchUps';
// import { addTimeItem } from './timeItems';
import {
  addSchedulingProfileRound,
  getSchedulingProfile,
  isValidSchedulingProfile,
  setSchedulingProfile,
} from './schedulingProfile/schedulingProfile';
import {
  addPersonRequest,
  getPersonRequests,
  removePersonRequest,
} from './scheduleMatchUps/personRequests';

const scheduleGovernor = {
  // addTimeItem,

  scheduleMatchUps,
  scheduleProfileRounds,

  matchUpScheduleChange,
  calculateScheduleTimes,
  reorderUpcomingMatchUps,
  bulkUpdateCourtAssignments,
  removeMatchUpCourtAssignment,
  toggleParticipantCheckInState,

  findMatchUpFormatTiming,
  modifyMatchUpFormatTiming,
  modifyEventMatchUpFormatTiming,
  getMatchUpFormatTimingUpdate,
  getEventMatchUpFormatTiming,

  getMatchUpDailyLimits,
  setMatchUpDailyLimits,
  getMatchUpDailyLimitsUpdate, // document

  getSchedulingProfile,
  setSchedulingProfile,
  isValidSchedulingProfile,
  addSchedulingProfileRound,

  getPersonRequests, // document
  addPersonRequest, // document
  removePersonRequest, // document
};

export default scheduleGovernor;
