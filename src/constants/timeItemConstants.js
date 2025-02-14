export const CHECK_IN = 'CHECK_IN';
export const CHECK_OUT = 'CHECK_OUT';

export const SCHEDULE = 'SCHEDULE';
export const ASSIGN_COURT = 'SCHEDULE.ASSIGNMENT.COURT';
export const ASSIGN_VENUE = 'SCHEDULE.ASSIGNMENT.VENUE';
export const SCHEDULED_DATE = 'SCHEDULE.DATE';
export const COMPLETED_DATE = 'COMPLETED.DATE'; // considering adding this timeItem on completed score entry provided date is between tournament startDate/endDate

export const ASSIGN_OFFICIAL = 'SCHEDULE.ASSIGN.OFFICIAL';
export const SCHEDULED_TIME = 'SCHEDULE.TIME.SCHEDULED';
export const START_TIME = 'SCHEDULE.TIME.START';
export const STOP_TIME = 'SCHEDULE.TIME.STOP';
export const RESUME_TIME = 'SCHEDULE.TIME.RESUME';
export const END_TIME = 'SCHEDULE.TIME.END';

export const ELIGIBILITY = 'ELIGIBILITY';
export const REGISTRATION = 'REGISTRATION';
export const SUSPENSION = 'SUSPENSION';
export const MEDICAL = 'MEDICAL';
export const PENALTY = 'PENALTY';

export const SCALE = 'SCALE';
export const RATING = 'RATING'; // 'SCALE.RATING'
export const RANKING = 'RANKING'; // 'SCALE.RANKING'
export const SEEDING = 'SEEDING'; // 'SCALE.SEEDING'

export const PUBLISH = 'PUBLISH';
export const PUBLIC = 'PUBLIC';
export const STATUS = 'STATUS';

export const MODIFICATION = 'MODIFICATION';
export const RETRIEVAL = 'RETRIEVAL';
export const OTHER = 'other';

export const timeItemConstants = {
  ASSIGN_COURT,
  ASSIGN_OFFICIAL,
  ASSIGN_VENUE,
  CHECK_IN,
  CHECK_OUT,
  ELIGIBILITY,
  END_TIME,
  MEDICAL,
  OTHER,
  PENALTY,
  PUBLIC,
  PUBLISH,
  RANKING,
  RATING,
  REGISTRATION,
  RESUME_TIME,
  RETRIEVAL,
  SCALE,
  SCHEDULED_DATE,
  SCHEDULED_TIME,
  SEEDING,
  START_TIME,
  STATUS,
  STOP_TIME,
  SUSPENSION,
};
