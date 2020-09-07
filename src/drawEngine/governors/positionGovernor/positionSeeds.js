import { drawEngine } from 'src/drawEngine';
import { generateRange } from 'src/utilities';
import { findStructure } from 'src/drawEngine/getters/structureGetter';
import { structureAssignedDrawPositions } from 'src/drawEngine/getters/positionsGetter';
import { getStructureSeedAssignments } from 'src/drawEngine/getters/structureGetter';
import { getValidSeedBlocks, getNextSeedBlock } from 'src/drawEngine/getters/seedGetter';

import { SUCCESS } from 'src/constants/resultConstants';

export function getStructurePositionedSeeds({structure}) {
  const { positionAssignments } = structureAssignedDrawPositions({structure});
  const { seedAssignments } = getStructureSeedAssignments({structure});
  const seedMap = Object.assign({}, ...seedAssignments
    .filter(assignment => assignment.participantId)
    .map(assignment => ({ [assignment.participantId]: assignment })));
  const positionedSeeds = positionAssignments
    .map(assignment => {
      return !seedMap[assignment.participantId] ? '' :
        Object.assign(assignment, {
          seedNumber: seedMap[assignment.participantId].seedNumber,
          seedValue: seedMap[assignment.participantId].seedValue
        });
    }).filter(f=>f);
  return positionedSeeds;
}

export function positionSeedBlocks({ drawDefinition, structure, structureId, groupsCount }) {
  let errors = [];
  let placedSeedBlocks = 0;
  
  if (!structure) ({ structure } = findStructure({drawDefinition, structureId}));
  if (!structureId) ({structureId} = structure);
  
  const { validSeedBlocks, error } = getValidSeedBlocks({structure});
  if (error) errors.push(error);

  groupsCount = groupsCount || validSeedBlocks.length;

  generateRange(0, groupsCount).forEach(i => {
    if (placedSeedBlocks < groupsCount) {
      const result = positionSeedBlock({ drawDefinition, structureId });
      if (result && result.success) placedSeedBlocks++;
      if (result.error) { errors.push({ seedPositionError: result.error }); }
    }
  });
  return { errors };
}

function positionSeedBlock({drawDefinition, structureId}) {
  let {
    unplacedSeedParticipantIds,
    unfilledPositions
  } = getNextSeedBlock({drawDefinition, structureId, randomize: true});

  for (const participantId of unplacedSeedParticipantIds) {
    const drawPosition = unfilledPositions.pop();
    if (!drawPosition) return { error: 'Missing drawPosition' };
    const result = drawEngine.assignDrawPosition({structureId, drawPosition, participantId});
    if (!result.success) return result;
  }
  
  return SUCCESS;
}
