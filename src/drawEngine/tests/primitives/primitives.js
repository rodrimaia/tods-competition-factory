import { generateRange } from '../../../utilities';
import { getDrawDefinition, drawEngine } from '../../../drawEngine';
import { stageEntries } from '../../getters/stageGetter';
import { structureMatchUps } from '../../getters/getMatchUps';
import { drawStructures } from '../../getters/structureGetter';

import { structureAssignedDrawPositions, } from '../../getters/positionsGetter';

import {
  MAIN, QUALIFYING, DIRECT_ACCEPTANCE, WILDCARD
} from '../../../constants/drawDefinitionConstants';
import { SUCCESS } from '../../../constants/resultConstants';

let result;

export function reset() {
  result = drawEngine.reset()
  expect(result).toMatchObject(SUCCESS);
  let state = drawEngine.getState();
  expect(state).toEqual(null);
}

export function initialize({drawId='uuid-default'}={}) {
  result = drawEngine.newDrawDefinition({drawId});
  expect(result).toMatchObject(SUCCESS)
  return result;
}

export function qualifyingDrawPositions({drawSize=4}={}) {
  result = drawEngine.setStageDrawSize({ stage: QUALIFYING, drawSize });
  expect(result).toMatchObject(SUCCESS);
}

export function mainDrawPositions({drawSize=4}={}) {
  result = drawEngine.setStageDrawSize({ stage: MAIN, drawSize });
  expect(result).toMatchObject(SUCCESS);
}

export function mainDrawWithEntries({drawType, drawSize=4, byesCount=0}={}) {
  reset();
  initialize();
  result = drawEngine.setStageDrawSize({ stage: MAIN, drawSize });
  expect(result).toMatchObject(SUCCESS);
  const participantsToAdd = drawSize - byesCount;
  const participants = generateRange(0, participantsToAdd)
    .map(i => ({participantId: `uuid${i}`}));
  const participantIds = participants.map(p=>p.participantId);
  result = drawEngine.addDrawEntries({participantIds, stage: MAIN})
  expect(result).toMatchObject(SUCCESS);
  result = drawEngine.generateDrawType({drawType});
  return result;
}

export function knockoutMatchUpsWithParticipants({drawSize}) {
  const stage = MAIN;
  mainDrawWithEntries({drawSize});
  const { drawDefinition } = getDrawDefinition();
  const { structures: [structure]} = drawStructures({drawDefinition, stage});
  const { structureId } = structure;
  
  const getDrawMatchUps = drawEngine.drawMatchUps();
  expect(getDrawMatchUps.upcomingMatchUps.length).toEqual(0);
  expect(getDrawMatchUps.pendingMatchUps.length).toEqual(drawSize - 1);
 
  const entryTypes = [DIRECT_ACCEPTANCE, WILDCARD];
  const mainDrawEntries = stageEntries({stage, drawDefinition, entryTypes});
  const participantIds = mainDrawEntries.map(e => e.participantId);
  
  const { unassignedPositions } = structureAssignedDrawPositions({ drawDefinition, structureId });
  expect(unassignedPositions.length).toEqual(participantIds.length);

  participantIds.forEach((participantId, i) => {
    const drawPosition = unassignedPositions[i].drawPosition;
    const result = drawEngine.assignDrawPosition({structureId, drawPosition, participantId});
    expect(result).toMatchObject(SUCCESS);
    const { unassignedPositions: stillUnassigned } = structureAssignedDrawPositions({ drawDefinition, structureId });
    expect(stillUnassigned.length).toEqual(participantIds.length - 1 - i);
  });
  
  const { assignedPositions } = structureAssignedDrawPositions({ drawDefinition, structureId });
  expect(assignedPositions.length).toEqual(drawSize);
  const { upcomingMatchUps: upcomingStructureMatchUps } = structureMatchUps({structure, requireParticipants: true});
  expect(upcomingStructureMatchUps.length).toEqual(drawSize/2);

  const { upcomingMatchUps, pendingMatchUps, completedMatchUps } = drawEngine.drawMatchUps();
  expect(upcomingMatchUps.length).toEqual(drawSize/2);
  expect(pendingMatchUps.length).toEqual(drawSize/2 - 1);
  expect(completedMatchUps.length).toEqual(0);
  return { drawDefinition, matchUps: { upcomingMatchUps, pendingMatchUps, completedMatchUps } };
}