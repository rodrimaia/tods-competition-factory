import { getAllStructureMatchUps } from './getMatchUps/getAllStructureMatchUps';
import { getStageEntries, getStageQualifiersCount } from './stageGetter';
import { structureAssignedDrawPositions } from './positionsGetter';

import {
  CONSOLATION,
  CONTAINER,
} from '../../constants/drawDefinitionConstants';
import {
  DIRECT_ACCEPTANCE,
  WILDCARD,
} from '../../constants/entryStatusConstants';

export function getByesData({ drawDefinition, event, matchUpsMap, structure }) {
  const matchUpFilters = { isCollectionMatchUp: false };
  const { matchUps, roundMatchUps } = getAllStructureMatchUps({
    drawDefinition,
    matchUpFilters,
    matchUpsMap,
    structure,
    event,
  });
  const firstRoundMatchUps = (roundMatchUps && roundMatchUps[1]) || [];

  // firstRoundMatchUps don't work for CONTAINER / ROUND_ROBIN structures

  const isRoundRobin = structure?.structureType === CONTAINER;
  const relevantMatchUps = isRoundRobin ? matchUps : firstRoundMatchUps;

  // maxByes for RR can only be the number of structures... no more than one bye per structure
  const maxByes = isRoundRobin
    ? structure?.structures?.length || 0
    : matchUps.length;

  // get stage/stageSequence Entries and qualifiers
  const { structureId, stage, stageSequence } = structure;
  const entryStatuses = [DIRECT_ACCEPTANCE, WILDCARD];
  const entries = getStageEntries({
    drawDefinition,
    stageSequence,
    entryStatuses,
    structureId,
    stage,
  });
  const qualifiersCount = getStageQualifiersCount({ drawDefinition, stage });
  const entriesCount = entries.length + qualifiersCount;

  // # Byes = drawSize (positionAssignments) - total entries
  // const { positionAssignments, qualifierPositions, byePositions, unassignedPositions } = structureAssignedDrawPositions({structure});
  const { positionAssignments, unassignedPositions } =
    structureAssignedDrawPositions({ structure });
  const unassignedDrawPositions = unassignedPositions.map(
    (position) => position.drawPosition
  );
  const placedByes = positionAssignments.filter(
    (assignment) => assignment.bye
  ).length;
  const placedByePositions = positionAssignments
    .filter((assignment) => assignment.bye)
    .map((assignment) => assignment.drawPosition);

  const positionsToAvoidDoubleBye = relevantMatchUps
    .map((matchUp) => matchUp.drawPositions)
    .filter((drawPositions) => {
      return (
        drawPositions &&
        drawPositions?.reduce(
          (noBye, drawPosition) =>
            !placedByePositions.includes(drawPosition) && noBye,
          true
        )
      );
    })
    .flat(Infinity)
    .filter((drawPosition) => unassignedDrawPositions.includes(drawPosition));

  const drawSize = positionAssignments.length;
  let byesCount = drawSize - entriesCount;
  if (
    byesCount > maxByes &&
    structure.stageSequence === 1 &&
    structure.stage !== CONSOLATION
  ) {
    byesCount = maxByes;
  }

  return {
    placedByes,
    byesCount,
    relevantMatchUps,
    placedByePositions,
    roundMatchUps,
    positionsToAvoidDoubleBye,
  };
}
