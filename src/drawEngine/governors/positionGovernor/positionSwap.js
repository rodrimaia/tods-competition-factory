import { removeDrawPositionAssignment } from '../../../tournamentEngine/governors/eventGovernor/drawDefinitions/removeDrawPositionAssignment';
import { conditionallyDisableLinkPositioning } from './conditionallyDisableLinkPositioning';
import { assignDrawPositionBye } from './byePositioning/assignDrawPositionBye';
import { getAllDrawMatchUps } from '../../getters/getMatchUps/drawMatchUps';
import { getMatchUpsMap } from '../../getters/getMatchUps/getMatchUpsMap';
import { addPositionActionTelemetry } from './addPositionActionTelemetry';
import { findStructure } from '../../getters/findStructure';
import { assignDrawPosition } from './positionAssignment';

import { CONTAINER } from '../../../constants/drawDefinitionConstants';
import { SUCCESS } from '../../../constants/resultConstants';
import {
  INVALID_VALUES,
  MISSING_DRAW_DEFINITION,
  MISSING_STRUCTURE_ID,
  STRUCTURE_NOT_FOUND,
} from '../../../constants/errorConditionConstants';

export function swapDrawPositionAssignments({
  drawDefinition,
  drawPositions,
  structureId,
}) {
  if (!drawDefinition) return { error: MISSING_DRAW_DEFINITION };
  if (!structureId) return { error: MISSING_STRUCTURE_ID };
  if (drawPositions?.length !== 2) {
    return { error: INVALID_VALUES, drawPositions };
  }

  const matchUpsMap = getMatchUpsMap({ drawDefinition });

  const { matchUps: inContextDrawMatchUps } = getAllDrawMatchUps({
    drawDefinition,
    inContext: true,
    includeByeMatchUps: true,
  });

  const { structure } = findStructure({ drawDefinition, structureId });
  if (!structure) return { error: STRUCTURE_NOT_FOUND };

  let result;
  if (structure.structureType === CONTAINER) {
    // { structureType: CONTAINER } indicates that the swap is within a ROUND ROBIN structure
    result = roundRobinSwap({
      drawDefinition,
      structure,
      drawPositions,

      matchUpsMap,
      inContextDrawMatchUps,
    });
  } else {
    // if not a CONTAINER then swap occurs within elimination structure
    result = eliminationSwap({
      drawDefinition,
      structure,
      drawPositions,
      matchUpsMap,
      inContextDrawMatchUps,
    });
  }

  if (!result?.error) {
    conditionallyDisableLinkPositioning({ structure, drawPositions });
    const positionAction = {
      name: 'swapDrawPositionAssignments',
      drawPositions,
      structureId,
    };
    addPositionActionTelemetry({ drawDefinition, positionAction });
  }

  return result;
}

function eliminationSwap({
  drawDefinition,
  structure,
  drawPositions,

  matchUpsMap,
  inContextDrawMatchUps,
}) {
  // if not a CONTAINER then swap occurs within elimination structure
  const assignments = structure?.positionAssignments.filter((assignment) =>
    drawPositions.includes(assignment.drawPosition)
  );

  if (!assignments) {
    return {
      error: INVALID_VALUES,
      structure,
      message: 'Missing positionAssignments',
    };
  }

  // if both positions are BYE no need to do anything
  if (assignments.filter(({ bye }) => bye).length === 2) return SUCCESS;
  const isByeSwap = assignments.some(({ bye }) => bye);

  if (isByeSwap) {
    return swapParticipantIdWithBYE({
      drawDefinition,
      structure,
      assignments,

      matchUpsMap,
      inContextDrawMatchUps,
    });
  } else {
    return eliminationParticipantSwap({
      structure,
      assignments,

      matchUpsMap,
      inContextDrawMatchUps,
    });
  }
}

function swapParticipantIdWithBYE({
  drawDefinition,
  structure,
  assignments,

  matchUpsMap,
  inContextDrawMatchUps,
}) {
  // remove the assignment that has a participantId
  const originalByeAssignment = assignments.find(({ bye }) => bye);
  const originalParticipantIdAssignment = assignments.find(
    ({ participantId }) => participantId
  );
  const originalByeDrawPosition = originalByeAssignment.drawPosition;
  const { participantId, drawPosition: originalParticipantIdDrawPosition } =
    originalParticipantIdAssignment;
  const { structureId } = structure;

  // remove both drawPosition assignments
  let result = removeDrawPositionAssignment({
    drawDefinition,
    structureId,
    drawPosition: originalByeDrawPosition,

    matchUpsMap,
    inContextDrawMatchUps,
  });
  if (result.error) return result;

  result = removeDrawPositionAssignment({
    drawDefinition,
    structureId,
    drawPosition: originalParticipantIdDrawPosition,

    matchUpsMap,
    inContextDrawMatchUps,
  });
  if (result.error) return result;

  result = assignDrawPositionBye({
    drawDefinition,
    structureId,
    drawPosition: originalParticipantIdDrawPosition,

    matchUpsMap,
    inContextDrawMatchUps,
  });

  // replace the original byeAssignment with participantId
  result = assignDrawPosition({
    drawDefinition,
    structureId,
    drawPosition: originalByeDrawPosition,
    participantId,

    matchUpsMap,
    inContextDrawMatchUps,
  });
  if (result.error) return result;

  return result.error ? result : SUCCESS;
}

function eliminationParticipantSwap({ structure, assignments }) {
  // preserves order of drawPositions in original positionAssignments array
  // while insuring that all attributes are faithfully copied over and only drawPosition is swapped
  const newAssignments = Object.assign(
    {},
    ...assignments.map((assignment, index) => {
      const { drawPosition } = assignment;
      const newAssignment = { ...assignments[1 - index], drawPosition };
      return { [drawPosition]: newAssignment };
    })
  );
  structure.positionAssignments = structure.positionAssignments.map(
    (assignment) => newAssignments[assignment.drawPosition] || assignment
  );

  return SUCCESS;
}

function roundRobinSwap({
  drawDefinition,
  drawPositions,
  structure,

  matchUpsMap,
  inContextDrawMatchUps,
}) {
  const assignments = structure.structures?.reduce((assignments, structure) => {
    const structureAssignments = structure?.positionAssignments.filter(
      (assignment) => drawPositions.includes(assignment.drawPosition)
    );
    if (structureAssignments) assignments.push(...structureAssignments);
    return assignments;
  }, []);

  // if both positions are BYE no need to do anything
  if (assignments.filter(({ bye }) => bye).length === 2) return SUCCESS;
  const isByeSwap = assignments.some(({ bye }) => bye);

  if (isByeSwap) {
    swapParticipantIdWithBYE({
      drawDefinition,
      assignments,
      structure,

      matchUpsMap,
      inContextDrawMatchUps,
    });
  } else {
    const participantIds = assignments.map(
      ({ participantId }) => participantId
    );
    assignments.forEach(
      (assignment, index) =>
        (assignment.participantId = participantIds[1 - index])
    );
  }

  return SUCCESS;
}
