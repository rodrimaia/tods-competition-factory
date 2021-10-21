import { DOUBLES, SINGLES } from '../../constants/matchUpTypes';
import { UUID } from '../../utilities';

const namedFormats = {
  STANDARD: {
    doubles: { matchUpCount: 3, matchUpValue: 1 },
    singles: { matchUpCount: 6, matchUpValue: 1 },
    valueGoal: 5,
  },
  COLLEGE7: {
    doubles: { matchUpCount: 3, collectionValue: 1 },
    singles: { matchUpCount: 6, matchUpValue: 1 },
    valueGoal: 4,
  },
  COLLEGE9: {
    doubles: { matchUpCount: 3, matchUpValue: 1 },
    singles: { matchUpCount: 6, matchUpValue: 1 },
    valueGoal: 5,
  },
};

export const tieFormatDefaults = ({ namedFormat, uuids = [] } = {}) => {
  if (!Object.keys(namedFormats).includes(namedFormat))
    namedFormat = 'STANDARD';
  if (!Array.isArray(uuids)) uuids = [];

  const template = namedFormats[namedFormat];

  return {
    winCriteria: {
      valueGoal: template.valueGoal,
    },
    collectionDefinitions: [
      {
        collectionId: uuids?.pop() || UUID(),
        collectionName: 'Doubles',
        matchUpType: DOUBLES,
        matchUpFormat: 'SET3-S:6/TB7-F:TB10',
        ...template.doubles,
      },
      {
        collectionId: uuids?.pop() || UUID(),
        collectionName: 'Singles',
        matchUpType: SINGLES,
        matchUpFormat: 'SET3-S:6/TB7',
        ...template.singles,
      },
    ],
  };
};

export default tieFormatDefaults;
