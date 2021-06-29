import { firstRoundLoserConsolation } from '../../generators/firstRoundLoserConsolation';
import { generateDoubleElimination } from '../../generators/doubleEliminattion';
import { treeMatchUps, feedInMatchUps } from '../../generators/eliminationTree';
import { generateCurtisConsolation } from '../../generators/curtisConsolation';
import { getAllDrawMatchUps } from '../../getters/getMatchUps/drawMatchUps';
import { feedInChampionship } from '../../generators/feedInChampionShip';
import { getStageDrawPositionsCount } from '../../getters/stageGetter';
import { generateTieMatchUps } from '../../generators/tieMatchUps';
import structureTemplate from '../../generators/structureTemplate';
import { getDrawStructures } from '../../getters/structureGetter';
import { playoff } from '../../generators/playoffStructures';
import { addGoesTo } from '../matchUpGovernor/addGoesTo';
import { powerOf2 } from '../../../utilities';
import {
  generateRoundRobin,
  generateRoundRobinWithPlayOff,
} from '../../generators/roundRobin';

import {
  MAIN,
  FICQF,
  FICSF,
  MFIC,
  CURTIS,
  FICR16,
  COMPASS,
  PLAY_OFF,
  OLYMPIC,
  FEED_IN,
  QUALIFYING,
  ROUND_ROBIN,
  SINGLE_ELIMINATION,
  DOUBLE_ELIMINATION,
  FEED_IN_CHAMPIONSHIP,
  FIRST_ROUND_LOSER_CONSOLATION,
  ROUND_ROBIN_WITH_PLAYOFF,
  COMPASS_ATTRIBUTES,
  OLYMPIC_ATTRIBUTES,
  MULTI_STRUCTURE_DRAWS,
  FIRST_MATCH_LOSER_CONSOLATION,
} from '../../../constants/drawDefinitionConstants';
import {
  INVALID_DRAW_SIZE,
  STAGE_SEQUENCE_LIMIT,
  UNRECOGNIZED_DRAW_TYPE,
} from '../../../constants/errorConditionConstants';

import { MISSING_DRAW_DEFINITION } from '../../../constants/errorConditionConstants';
import { SUCCESS } from '../../../constants/resultConstants';

/**
 *
 * Generates matchUps and pushes structures into drawDefiniton.structures
 *
 * @param {object} drawDefinition
 */
// TODO: consider refactoring to return structures rather than pushing them into drawDefinition
export function generateDrawType(props = {}) {
  const {
    uuids,
    goesTo = true,
    stage = MAIN,
    structureName,
    staggeredEntry,
    stageSequence = 1,
    drawType = SINGLE_ELIMINATION,
    // qualifyingPositions, => passed through in props to treeMatchUps
    // qualifyingRound, => passed through in props to treeMatchUps
    // TODO: description => is this passed on?
    drawDefinition,
  } = props;

  if (!drawDefinition) return { error: MISSING_DRAW_DEFINITION };

  const { tieFormat, matchUpType } = drawDefinition || {};

  const drawSize = getStageDrawPositionsCount({ stage, drawDefinition });
  Object.assign(props, { drawSize, matchUpType, tieFormat });

  const validDoubleEliminationSize = powerOf2((drawSize * 2) / 3);

  // check that drawSize is a valid value
  const invalidDrawSize =
    drawSize < 2 ||
    (!staggeredEntry &&
      drawType !== FEED_IN &&
      ((drawType === ROUND_ROBIN && drawSize < 3) ||
        (drawType === DOUBLE_ELIMINATION && !validDoubleEliminationSize) ||
        (![ROUND_ROBIN, DOUBLE_ELIMINATION, ROUND_ROBIN_WITH_PLAYOFF].includes(
          drawType
        ) &&
          !powerOf2(drawSize))));

  if (invalidDrawSize) {
    return { error: INVALID_DRAW_SIZE };
  }

  const multiStructure = MULTI_STRUCTURE_DRAWS.includes(drawType);
  if (parseInt(drawSize) < 4 && multiStructure) {
    return { error: INVALID_DRAW_SIZE };
  }

  // there can be no existing main structure
  const sequenceLimit = stageSequence === 1 ? 1 : undefined;
  const { structures: stageStructures } = getDrawStructures({
    stage,
    stageSequence,
    drawDefinition,
  });
  const structureCount = stageStructures.length;
  if (structureCount >= sequenceLimit) return { error: STAGE_SEQUENCE_LIMIT };

  const generators = {
    [SINGLE_ELIMINATION]: () => {
      const { matchUps, roundLimit: derivedRoundLimit } = treeMatchUps(props);
      const qualifyingRound = stage === QUALIFYING && derivedRoundLimit;
      const structure = structureTemplate({
        stage,
        matchUps,
        stageSequence,
        qualifyingRound,
        structureId: uuids?.pop(),
        roundLimit: derivedRoundLimit,
        structureName: structureName || stage,
      });

      drawDefinition.structures.push(structure);
      return Object.assign({ structure }, SUCCESS);
    },
    [DOUBLE_ELIMINATION]: () => generateDoubleElimination(props),
    [COMPASS]: () =>
      playoff(
        Object.assign(props, {
          roundOffsetLimit: 3,
          playoffAttributes: COMPASS_ATTRIBUTES,
        })
      ),
    [OLYMPIC]: () =>
      playoff(
        Object.assign(props, {
          roundOffsetLimit: 2,
          playoffAttributes: OLYMPIC_ATTRIBUTES,
        })
      ),
    [PLAY_OFF]: () => playoff(props),

    [FEED_IN]: () => {
      const { matchUps } = feedInMatchUps({ drawSize, uuids, matchUpType });

      const structure = structureTemplate({
        structureName: structureName || stage,
        structureId: uuids?.pop(),
        stageSequence,
        matchUps,
        stage,
      });

      drawDefinition.structures.push(structure);
      return Object.assign({ structure }, SUCCESS);
    },

    [FIRST_ROUND_LOSER_CONSOLATION]: () => firstRoundLoserConsolation(props),
    [FIRST_MATCH_LOSER_CONSOLATION]: () =>
      feedInChampionship(Object.assign(props, { feedRounds: 1, fmlc: true })),
    [MFIC]: () => feedInChampionship(Object.assign(props, { feedRounds: 1 })),
    [FICQF]: () =>
      feedInChampionship(Object.assign(props, { feedsFromFinal: 2 })),
    [FICSF]: () =>
      feedInChampionship(Object.assign(props, { feedsFromFinal: 1 })),
    [FICR16]: () =>
      feedInChampionship(Object.assign(props, { feedsFromFinal: 3 })),
    [FEED_IN_CHAMPIONSHIP]: () => feedInChampionship(props),

    [CURTIS]: () => generateCurtisConsolation(props),

    [ROUND_ROBIN]: () => generateRoundRobin(props),
    [ROUND_ROBIN_WITH_PLAYOFF]: () => generateRoundRobinWithPlayOff(props),
  };

  const generator = generators[drawType];
  const generatorResult = generator && generator();
  if (!generatorResult?.success) {
    return { error: UNRECOGNIZED_DRAW_TYPE };
  }

  const { matchUps, matchUpsMap } = getAllDrawMatchUps({
    drawDefinition,
  });

  if (tieFormat) {
    matchUps.forEach((matchUp) => {
      const { tieMatchUps } = generateTieMatchUps({ tieFormat });
      Object.assign(matchUp, { tieMatchUps, tieFormat, matchUpType });
    });
  }

  let inContextDrawMatchUps;
  if (goesTo)
    ({ inContextDrawMatchUps } = addGoesTo({ drawDefinition, matchUpsMap }));

  const result = Object.assign({}, SUCCESS, { matchUps });

  Object.assign(result, generatorResult, {
    matchUpsMap,
    inContextDrawMatchUps,
  });

  return result;
}
