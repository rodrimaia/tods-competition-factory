// entry
export const ALTERNATE = 'ALTERNATE';
// export const QUALIFYING = 'QUALIFYNG'; // is duplicated below
export const WILDCARD = 'WILDCARD';
export const DIRECT_ACCEPTANCE = 'DIRECT_ACCEPTANCE';

// error states
export const EXISTING_PARTICIPANT = 'Participant Exists';
export const MISSING_DRAW_DEFINITION = 'Missing drawDefinition';
export const INVALID_STAGE = 'Invalid Stage';

// stage types
export const MAIN = 'MAIN';
export const QUALIFYING = 'QUALIFYING';
export const CONSOLATION = 'CONSOLATION';

// structureType
export const ITEM = 'ITEM';
export const CONTAINER = 'CONTAINER';

// Match and Link subjects
export const WINNER = 'WINNER';
export const LOSER = 'LOSER'

// draw types
export const FEED_IN = 'FEED IN';
export const COMPASS = 'COMPASS';
export const PLAYOFF = 'PLAYOFF';
export const OLYMPIC = 'OLYMPIC';
export const KNOCKOUT = 'ELIMINATION';
export const ELIMINATION = 'ELIMINATION';
export const DOUBLE_ELIMINATION = 'DOUBLE ELIMINATION';
export const FMLC = 'FIRST MATCH LOSER CONSOLATION';

export const CURTIS = 'CURTIS CONSOLATION';

export const FICSF = 'FEED IN CHAMPIONSHIP TO SF';
export const FICQF = 'FEED IN CHAMPIONSHIP TO QF';
export const FICR16 = 'FEED IN CHAMPIONSHIP TO R16';
export const MFIC = 'MODIFIED FEED IN CHAMPIONSHIP';
export const FEED_IN_CHAMPIONSHIP = 'FEED IN CHAMPIONSHIP';

export const ROUND_ROBIN = 'ROUND ROBIN';
export const ROUND_ROBIN_WITH_PLAYOFF = 'ROUND ROBIN WITH PLAYOFF';

// structure naming
export const BACKDRAW = 'BACKDRAW';
export const COMPASS_NAMING = {
  '0': 'EAST',
  '0-1': 'WEST',
  '0-2': 'NORTH',
  '0-3': 'NORTHEAST',
  '0-1-1': 'SOUTH',
  '0-1-2': 'SOUTHWEST',
  '0-2-1': 'NORTHWEST',
  '0-1-1-1': 'SOUTHEAST',
};
export const OLYMPIC_NAMING = {
  '0': 'EAST',
  '0-1': 'WEST',
  '0-2': 'NORTH',
  '0-1-1': 'SOUTH'
};

// feedProfile
export const DRAW = 'DRAW';
export const RANDOM = 'RANDOM';
export const TOP_DOWN = 'TOP_DOWN';
export const BOTTOM_UP = 'BOTTOM_UP';
export const WATERFALL = 'WATERFALL';

// finishingPosition determination
export const WIN_RATIO = 'winRatio';
export const ROUND_OUTCOME = 'roundOutcome';