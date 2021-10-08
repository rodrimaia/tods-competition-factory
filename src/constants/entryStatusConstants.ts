export enum EntryStatusEnum {
  CONFIRMED = 'CONFIRMED',
  DIRECT_ACCEPTANCE = 'DIRECT_ACCEPTANCE',
  ORGANISER_ACCEPTANCE = 'ORGANISER_ACCEPTANCE',

  ALTERNATE = 'ALTERNATE',
  WITHDRAWN = 'WITHDRAWN',

  // applies only to { participantType: INDIVIDUAL } entries in { eventType: DOUBLES }
  UNPAIRED = 'UNPAIRED', // legacy - being replaced by UNGROUPED
  UNGROUPED = 'UNGROUPED',

  // These entryStatus enums apply only to draw.entries
  LUCKY_LOSER = 'LUCKY_LOSER',
  FEED_IN = 'FEED_IN',
  QUALIFIER = 'QUALIFIER',
  WILDCARD = 'WILDCARD',
}

export const ALTERNATE = EntryStatusEnum.ALTERNATE;
export const FEED_IN = EntryStatusEnum.FEED_IN;
export const QUALIFIER = EntryStatusEnum.QUALIFIER;
export const WILDCARD = EntryStatusEnum.WILDCARD;
export const DIRECT_ACCEPTANCE = EntryStatusEnum.DIRECT_ACCEPTANCE;
export const CONFIRMED = EntryStatusEnum.CONFIRMED;
export const LUCKY_LOSER = EntryStatusEnum.LUCKY_LOSER;
export const ORGANISER_ACCEPTANCE = EntryStatusEnum.ORGANISER_ACCEPTANCE;
export const WITHDRAWN = EntryStatusEnum.WITHDRAWN;
export const UNPAIRED = EntryStatusEnum.UNPAIRED;
export const UNGROUPED = EntryStatusEnum.UNGROUPED;

export const EQUIVALENT_ACCEPTANCE_STATUSES = [
  CONFIRMED,
  DIRECT_ACCEPTANCE,
  ORGANISER_ACCEPTANCE,
];
export const DRAW_ENTRY_STATUSES = [LUCKY_LOSER, FEED_IN, QUALIFIER, WILDCARD];

export const STRUCTURE_SELECTED_STATUSES = [
  FEED_IN,
  QUALIFIER,
  LUCKY_LOSER,
  WILDCARD,

  CONFIRMED,
  DIRECT_ACCEPTANCE,
  ORGANISER_ACCEPTANCE,
];

export const VALID_ENTRY_STATUSES = [
  ALTERNATE,
  WITHDRAWN,
  FEED_IN,
  UNPAIRED,
  UNGROUPED,
  QUALIFIER,
  WILDCARD,
  DIRECT_ACCEPTANCE,
  CONFIRMED,
  LUCKY_LOSER,
  ORGANISER_ACCEPTANCE,
];

// will be deprecated
export const STRUCTURE_ENTERED_TYPES = STRUCTURE_SELECTED_STATUSES;
export const VALID_ENTERED_TYPES = VALID_ENTRY_STATUSES;

export const entryStatusConstants = {
  FEED_IN,
  WILDCARD,
  UNPAIRED,
  UNGROUPED,
  ALTERNATE,
  CONFIRMED,
  QUALIFIER,
  WITHDRAWN,
  LUCKY_LOSER,
  DIRECT_ACCEPTANCE,
  ORGANISER_ACCEPTANCE,

  DRAW_ENTRY_STATUSES,
  EQUIVALENT_ACCEPTANCE_STATUSES,

  VALID_ENTERED_TYPES,
  VALID_ENTRY_STATUSES,

  STRUCTURE_ENTERED_TYPES,
  STRUCTURE_SELECTED_STATUSES,
};
