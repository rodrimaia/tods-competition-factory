import { generateTieMatchUpScore } from '../../generators/generateTieMatchUpScore';
import { tallyParticipantResults } from './roundRobinTally/roundRobinTally';
import { getSetComplement, getTiebreakComplement } from './getComplement';
import { validateTieFormat } from './tieFormats/tieFormatUtilities';
import { checkSetIsComplete, keyValueScore } from './keyValueScore';
import { generateScoreString } from './generateScoreString';
import { stringify } from './matchUpFormatCode/stringify';
import { isValid } from './matchUpFormatCode/isValid';
import { analyzeMatchUp } from './analyzeMatchUp';
import { parse } from './matchUpFormatCode/parse';
import { analyzeSet } from './analyzeSet';

export const scoreGovernor = {
  stringifyMatchUpFormat: stringify,
  isValidMatchUpFormat: isValid,
  parseMatchUpFormat: parse,
  generateTieMatchUpScore,
  tallyParticipantResults,
  getTiebreakComplement,
  generateScoreString,
  checkSetIsComplete,
  validateTieFormat,
  getSetComplement,
  analyzeMatchUp,
  keyValueScore,
  analyzeSet,
};

export default scoreGovernor;
