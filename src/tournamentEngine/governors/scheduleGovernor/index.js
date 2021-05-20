import { modifyEventMatchUpFormatTiming } from './matchUpFormatTiming/modifyEventMatchUpFormatTiming';
import { getEventMatchUpFormatTiming } from './matchUpFormatTiming/getEventMatchUpFormatTiming';
import { getModifiedMatchUpFormatTiming } from './matchUpFormatTiming/getModifiedMatchUpTiming';
import { getMatchUpFormatTimingUpdate } from './matchUpFormatTiming/getMatchUpFormatTimingUpdate';
import { modifyMatchUpFormatTiming } from './matchUpFormatTiming/modifyMatchUpFormatTiming';
import { getMatchUpFormatTiming } from './matchUpFormatTiming/getMatchUpFormatTiming';
import { removeMatchUpCourtAssignment } from './removeMatchUpCourtAssignment';
import { bulkScheduleMatchUps } from './bulkScheduleMatchUps';
import { assignMatchUpCourt } from './assignMatchUpCourt';
import { assignMatchUpVenue } from './assignMatchUpVenue';
import {
  addMatchUpScheduledDate,
  addMatchUpScheduledTime,
  addMatchUpStartTime,
  addMatchUpEndTime,
  addMatchUpStopTime,
  addMatchUpResumeTime,
  addMatchUpOfficial,
  addMatchUpScheduleItems,
} from './scheduleItems';

const scheduleGovernor = {
  assignMatchUpCourt,
  assignMatchUpVenue,

  addMatchUpScheduleItems,
  addMatchUpScheduledDate,
  addMatchUpScheduledTime,
  addMatchUpStartTime,
  addMatchUpEndTime,
  addMatchUpStopTime,
  addMatchUpResumeTime,
  addMatchUpOfficial,

  getMatchUpFormatTiming,
  modifyMatchUpFormatTiming,
  getModifiedMatchUpFormatTiming,
  getEventMatchUpFormatTiming,
  modifyEventMatchUpFormatTiming,
  getMatchUpFormatTimingUpdate,

  removeMatchUpCourtAssignment,

  bulkScheduleMatchUps,
};

export default scheduleGovernor;
