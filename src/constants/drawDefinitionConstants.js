// stage types
export const MAIN = 'MAIN';
export const QUALIFYING = 'QUALIFYING';
export const CONSOLATION = 'CONSOLATION';
export const VOLUNTARY_CONSOLATION = 'VOLUNTARY_CONSOLATION';
export const PLAY_OFF = 'PLAY_OFF';

export const validStages = [
  MAIN,
  QUALIFYING,
  CONSOLATION,
  PLAY_OFF,
  VOLUNTARY_CONSOLATION,
];

export const stageOrder = {
  [QUALIFYING]: 1,
  [MAIN]: 2,
  [PLAY_OFF]: 3,
  [CONSOLATION]: 3,
  [VOLUNTARY_CONSOLATION]: 4,
};

// seedingProfile.positioning
export const CLUSTER = 'CLUSTER';
export const SEPARATE = 'SEPARATE';
export const WATERFALL = 'WATERFALL';

// structureType
export const ITEM = 'ITEM';
export const CONTAINER = 'CONTAINER';

// positioningProfile
export const DRAW = 'DRAW';
export const RANDOM = 'RANDOM';
export const TOP_DOWN = 'TOP_DOWN';
export const BOTTOM_UP = 'BOTTOM_UP';

// Match and Link types
export const POSITION = 'POSITION'; // participant advances based on their finishing position
export const WINNER = 'WINNER'; // participant advances based on winning a matchUp
export const LOSER = 'LOSER'; // partticipant advances based on losing a matchUp
export const FIRST_MATCHUP = 'FIRST_MATCHUP'; // condition for valididty of link

// draw types
// PLAY_OFF is also a stage type
export const AD_HOC = 'AD_HOC';
export const FEED_IN = 'FEED_IN';
export const COMPASS = 'COMPASS';
export const OLYMPIC = 'OLYMPIC';
export const KNOCKOUT = 'SINGLE_ELIMINATION';
export const ELIMINATION = 'SINGLE_ELIMINATION';
export const SINGLE_ELIMINATION = 'SINGLE_ELIMINATION';
export const DOUBLE_ELIMINATION = 'DOUBLE_ELIMINATION';
export const FIRST_MATCH_LOSER_CONSOLATION = 'FIRST_MATCH_LOSER_CONSOLATION';
export const FIRST_ROUND_LOSER_CONSOLATION = 'FIRST_ROUND_LOSER_CONSOLATION';

export const LUCKY_DRAW = 'LUCKY_DRAW';
export const CURTIS = 'CURTIS_CONSOLATION';
export const CURTIS_CONSOLATION = 'CURTIS_CONSOLATION';

export const FICSF = 'FEED_IN_CHAMPIONSHIP_TO_SF';
export const FEED_IN_CHAMPIONSHIP_TO_SF = 'FEED_IN_CHAMPIONSHIP_TO_SF';
export const FICQF = 'FEED_IN_CHAMPIONSHIP_TO_QF';
export const FEED_IN_CHAMPIONSHIP_TO_QF = 'FEED_IN_CHAMPIONSHIP_TO_QF';
export const FICR16 = 'FEED_IN_CHAMPIONSHIP_TO_R16';
export const FEED_IN_CHAMPIONSHIP_TO_R16 = 'FEED_IN_CHAMPIONSHIP_TO_R16';
export const MFIC = 'MODIFIED_FEED_IN_CHAMPIONSHIP';
export const MODIFIED_FEED_IN_CHAMPIONSHIP = 'MODIFIED_FEED_IN_CHAMPIONSHIP';
export const FEED_IN_CHAMPIONSHIP = 'FEED_IN_CHAMPIONSHIP';

export const ROUND_ROBIN = 'ROUND_ROBIN';
export const ROUND_ROBIN_WITH_PLAYOFF = 'ROUND_ROBIN_WITH_PLAYOFF';

// structure naming
export const DECIDER = 'DECIDER';
export const BACKDRAW = 'BACKDRAW';
export const COMPASS_ATTRIBUTES = {
  0: { name: 'EAST', abbreviation: 'E' },
  '0-1': { name: 'WEST', abbreviation: 'W' },
  '0-2': { name: 'NORTH', abbreviation: 'N' },
  '0-3': { name: 'NORTHEAST', abbreviation: 'NE' },
  '0-1-1': { name: 'SOUTH', abbreviation: 'S' },
  '0-1-2': { name: 'SOUTHWEST', abbreviation: 'SW' },
  '0-2-1': { name: 'NORTHWEST', abbreviation: 'NW' },
  '0-1-1-1': { name: 'SOUTHEAST', abbreviation: 'SE' },
};
export const OLYMPIC_ATTRIBUTES = {
  0: { name: 'EAST', abbreviation: 'E' },
  '0-1': { name: 'WEST', abbreviation: 'W' },
  '0-2': { name: 'NORTH', abbreviation: 'N' },
  '0-1-1': { name: 'SOUTH', abbreviation: 'S' },
};

// finishingPosition determination
export const WIN_RATIO = 'WIN_RATIO';
export const ROUND_OUTCOME = 'ROUND_OUTCOME';

export const MULTI_STRUCTURE_DRAWS = [
  COMPASS,
  CURTIS,
  FEED_IN_CHAMPIONSHIP_TO_QF,
  FEED_IN_CHAMPIONSHIP_TO_R16,
  FEED_IN_CHAMPIONSHIP_TO_SF,
  FEED_IN_CHAMPIONSHIP,
  FICQF,
  FICR16,
  FICSF,
  FIRST_MATCH_LOSER_CONSOLATION,
  FIRST_ROUND_LOSER_CONSOLATION,
  LUCKY_DRAW,
  MODIFIED_FEED_IN_CHAMPIONSHIP,
  OLYMPIC,
  PLAY_OFF,
  ROUND_ROBIN_WITH_PLAYOFF,
];

export const generatedDrawTypes = [
  AD_HOC,
  COMPASS,
  CURTIS,
  DOUBLE_ELIMINATION,
  FEED_IN_CHAMPIONSHIP_TO_QF,
  FEED_IN_CHAMPIONSHIP_TO_R16,
  FEED_IN_CHAMPIONSHIP_TO_SF,
  FEED_IN_CHAMPIONSHIP,
  FEED_IN,
  FIRST_MATCH_LOSER_CONSOLATION,
  FIRST_ROUND_LOSER_CONSOLATION,
  LUCKY_DRAW,
  MODIFIED_FEED_IN_CHAMPIONSHIP,
  OLYMPIC,
  PLAY_OFF,
  ROUND_ROBIN,
  ROUND_ROBIN_WITH_PLAYOFF,
  SINGLE_ELIMINATION,
];

export const drawDefinitionConstants = {
  MAIN,
  QUALIFYING,
  CONSOLATION,

  ITEM,
  CONTAINER,

  FIRST_MATCHUP,
  WINNER,
  LOSER,

  AD_HOC,
  FEED_IN,
  COMPASS,
  PLAY_OFF,
  OLYMPIC,
  KNOCKOUT,
  SINGLE_ELIMINATION,
  DOUBLE_ELIMINATION,

  CURTIS,
  FICSF,
  FICQF,
  FICR16,
  MFIC,

  VOLUNTARY_CONSOLATION,
  FIRST_MATCH_LOSER_CONSOLATION,
  FIRST_ROUND_LOSER_CONSOLATION,
  MODIFIED_FEED_IN_CHAMPIONSHIP,
  FEED_IN_CHAMPIONSHIP_TO_R16,
  FEED_IN_CHAMPIONSHIP_TO_QF,
  FEED_IN_CHAMPIONSHIP_TO_SF,
  FEED_IN_CHAMPIONSHIP,

  ROUND_ROBIN_WITH_PLAYOFF,
  ROUND_ROBIN,

  DECIDER,
  BACKDRAW,
  COMPASS_ATTRIBUTES,
  OLYMPIC_ATTRIBUTES,

  DRAW,
  RANDOM,
  TOP_DOWN,
  BOTTOM_UP,
  WATERFALL,

  WIN_RATIO,
  ROUND_OUTCOME,

  MULTI_STRUCTURE_DRAWS,
  generatedDrawTypes,

  stageOrder,
};

export default drawDefinitionConstants;
