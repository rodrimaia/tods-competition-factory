import { stageDrawPositionsCount } from 'competitionFactory/drawEngine/getters/stageGetter';
import { treeMatchUps } from 'competitionFactory/drawEngine/generators/eliminationTree';

import structureTemplate from 'competitionFactory/drawEngine/generators/structureTemplate';
import {
  MAIN, CONSOLATION, TOP_DOWN, LOSER
} from 'competitionFactory/constants/drawDefinitionConstants';
import { SUCCESS } from 'competitionFactory/constants/resultConstants';

export function firstMatchLoserConsolation(props) {
  let { 
    stage=MAIN,
    structureName,
    drawDefinition,
    stageSequence=1,
    finishingPositionOffset
  } = props;
  
  const drawSize = stageDrawPositionsCount({stage, drawDefinition});
  const { matchUps } = treeMatchUps({ drawSize, finishingPositionOffset });
  const mainStructure = structureTemplate({
    stage: MAIN,
    matchUps,
    stageSequence,
    structureName: structureName || MAIN
  });

  drawDefinition.structures.push(mainStructure);
  
  const consolationDrawPositions = drawSize / 2;

  const { matchUps: consolationMatchUps } = treeMatchUps({ 
    drawSize: consolationDrawPositions,
    finishingPositionOffset: consolationDrawPositions
  });
  
  const consolationStructure = structureTemplate({
    stage: CONSOLATION,
    matchUps: consolationMatchUps,
    stageSequence: 1,
    structureName: CONSOLATION
  });

  drawDefinition.structures.push(consolationStructure);
  
  const link = {
    linkSubject: LOSER,
    source: {
      roundNumber: 1,
      structureId: mainStructure.structureId,
    },
    target: {
      roundNumber: 1,
      feedProfile: TOP_DOWN,
      structureId: consolationStructure.structureId
    }
  };
  
  drawDefinition.links.push(link); 
  
  return Object.assign({ mainStructure, consolationStructure, links: drawDefinition.links }, SUCCESS);
}
