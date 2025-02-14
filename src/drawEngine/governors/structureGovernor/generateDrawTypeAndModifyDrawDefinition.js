import { generateDrawStructuresAndLinks } from './generateDrawStructuresAndLinks';
import { getStageDrawPositionsCount } from '../../getters/getStageDrawPositions';
import { getAllDrawMatchUps } from '../../getters/getMatchUps/drawMatchUps';
import { decorateResult } from '../../../global/functions/decorateResult';
import { modifyDrawNotice } from '../../notifications/drawNotifications';
import { generateTieMatchUps } from '../../generators/tieMatchUps';
import { definedAttributes } from '../../../utilities/objects';
import { addGoesTo } from '../matchUpGovernor/addGoesTo';
import { unique } from '../../../utilities';
import {
  setStageDrawSize,
  setStageQualifiersCount,
} from '../entryGovernor/stageEntryCounts';

import {
  EXISTING_STAGE,
  MISSING_DRAW_DEFINITION,
} from '../../../constants/errorConditionConstants';
import { MAIN, QUALIFYING } from '../../../constants/drawDefinitionConstants';
import { SUCCESS } from '../../../constants/resultConstants';
import { SINGLES } from '../../../constants/matchUpTypes';

export function generateDrawTypeAndModifyDrawDefinition(params = {}) {
  const { stageSequence = 1, drawDefinition, goesTo = true, isMock } = params;

  const stack = 'generateDrawTypeAndModifyDrawDefinition';

  if (!drawDefinition)
    return decorateResult({
      result: { error: MISSING_DRAW_DEFINITION },
      stack,
    });

  let { tieFormat, matchUpType } = params;
  tieFormat = tieFormat || drawDefinition.tieFormat || undefined;
  matchUpType = matchUpType || drawDefinition.matchUpType || SINGLES;
  params.tieFormat = tieFormat;
  params.matchUpType = matchUpType;

  const mainStageDrawPositionsCount = getStageDrawPositionsCount({
    drawDefinition,
    stage: MAIN,
  });
  params.drawSize = params.drawSize || mainStageDrawPositionsCount;

  if (!mainStageDrawPositionsCount && params.drawSize) {
    setStageDrawSize({
      drawSize: params.drawSize,
      drawDefinition,
      stageSequence,
      stage: MAIN,
    });
  }

  const result = generateDrawStructuresAndLinks(params);
  if (result.error) return decorateResult({ result, stack });

  const { structures, links, qualifyingResult } = result;
  const stageHash = ({ stage, stageSequence }) => `${stage}|${stageSequence}`;
  const stageHashes = unique(drawDefinition.structures.map(stageHash));
  const stageOverlap = !!structures.find((structure) =>
    stageHashes.includes(stageHash(structure))
  );
  if (stageOverlap) return { error: EXISTING_STAGE };
  drawDefinition.structures.push(...structures);
  drawDefinition.links.push(...links);

  const qualifiersCount = Math.max(
    params.qualifiersCount || 0,
    qualifyingResult?.qualifiersCount || 0
  );

  if (qualifyingResult?.qualifyingDrawPositionsCount) {
    const qualifyingStageDrawPositionsCount = getStageDrawPositionsCount({
      stage: QUALIFYING,
      drawDefinition,
    });

    if (!qualifyingStageDrawPositionsCount) {
      const result = setStageDrawSize({
        drawSize: qualifyingResult.qualifyingDrawPositionsCount,
        stage: QUALIFYING,
        drawDefinition,
      });
      if (result.error) return result;
    }
  }

  if (qualifiersCount) {
    const result = setStageQualifiersCount({
      qualifiersCount,
      drawDefinition,
      stage: MAIN,
    });
    if (result.error) return result;
  }

  const drawSize = params.drawSize || mainStageDrawPositionsCount;

  Object.assign(
    params,
    definedAttributes({ drawSize, matchUpType, tieFormat })
  );

  const { matchUps, matchUpsMap } = getAllDrawMatchUps({ drawDefinition });

  if (tieFormat) {
    matchUps.forEach((matchUp) => {
      const { tieMatchUps } = generateTieMatchUps({ tieFormat, isMock });
      Object.assign(matchUp, { tieMatchUps, matchUpType });
    });
  }

  let inContextDrawMatchUps;
  if (goesTo)
    ({ inContextDrawMatchUps } = addGoesTo({ drawDefinition, matchUpsMap }));

  modifyDrawNotice({ drawDefinition });

  return {
    structures: drawDefinition.structures,
    links: drawDefinition.links,
    inContextDrawMatchUps,
    matchUpsMap,
    ...SUCCESS,
    matchUps,
  };
}
