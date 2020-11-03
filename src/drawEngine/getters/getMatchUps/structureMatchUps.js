import { findStructure } from '../findStructure';
import { getAllStructureMatchUps } from './getAllStructureMatchUps';
import { structureAssignedDrawPositions } from '../../getters/positionsGetter';

/*
  completedMatchUps are those matchUps where a winningSide is defined
  upcomingMatchUps are those matchUps where both drawPositions are defined
  pendingMatchUps are those matchUps where a drawPosition is undefined
  *AND* where both drawPositions map to assigned participantIds
*/
export function getStructureMatchUps({
  inContext,
  context,
  structure,
  structureId,
  drawDefinition,
  tournamentParticipants,
  requireParticipants = true,
  roundFilter,
  matchUpFilters,
  contextFilters,
}) {
  if (!structure && structureId) {
    ({ structure } = findStructure({ drawDefinition, structureId }));
  }
  const { matchUps, error } = getAllStructureMatchUps({
    structure,
    inContext,
    context,
    drawDefinition,
    matchUpFilters,
    contextFilters,
    tournamentParticipants,
  });
  if (error) return { error };
  const { assignedPositions } = structureAssignedDrawPositions({ structure });
  const participantAssignedDrawPositions = assignedPositions
    .filter(assignment => assignment.participantId)
    .map(assignment => assignment.drawPosition);

  const byeMatchUps = [];
  const pendingMatchUps = [];
  const upcomingMatchUps = [];
  const abandonedMatchUps = [];
  const completedMatchUps = [];

  matchUps
    .filter(matchUp => !matchUp.collectionId) // filter out collection matchUps
    .forEach(matchUp => {
      const isCollectionMatchUp = matchUp.collectionId;
      const collectionSidesAssigned =
        isCollectionMatchUp &&
        matchUp.sides.reduce((assigned, side) => {
          return side.participantId && assigned;
        }, true);

      const roundFilterEquality = matchUp.roundNumber === roundFilter;

      const drawPositionsFilled =
        !isCollectionMatchUp &&
        matchUp.drawPositions?.filter(f => f).length === 2;
      const drawPositionsAssigned =
        !isCollectionMatchUp &&
        matchUp.drawPositions?.reduce((assigned, drawPosition) => {
          return (
            participantAssignedDrawPositions.includes(drawPosition) && assigned
          );
        }, true);

      const byeAssignedDrawPositions = assignedPositions
        .filter(assignment => assignment.bye)
        .map(assignment => assignment.drawPosition);

      const isByeMatchUp =
        !isCollectionMatchUp &&
        matchUp.drawPositions?.reduce((isByeMatchUp, drawPosition) => {
          return (
            byeAssignedDrawPositions.includes(drawPosition) || isByeMatchUp
          );
        }, false);

      const isUpcomingMatchUp =
        collectionSidesAssigned ||
        (drawPositionsFilled &&
          (!roundFilter || roundFilterEquality) &&
          (!requireParticipants || drawPositionsAssigned));

      const isTieMatchUp = Array.isArray(matchUp.tieMatchUps);

      if (isTieMatchUp) {
        matchUp.tieMatchUps.forEach(tieMatchUp => {
          if (isByeMatchUp) return byeMatchUps.push(tieMatchUp);
          if (isUpcomingMatchUp) return upcomingMatchUps.push(tieMatchUp);
          if (matchUp.winningSide) {
            if (tieMatchUp.winningSide)
              return completedMatchUps.push(tieMatchUp);
            return abandonedMatchUps.push(tieMatchUp);
          }
          return pendingMatchUps.push(tieMatchUp);
        });
      }

      if (isByeMatchUp) return byeMatchUps.push(matchUp);
      if (matchUp.winningSide) return completedMatchUps.push(matchUp);
      if (isUpcomingMatchUp) return upcomingMatchUps.push(matchUp);
      return pendingMatchUps.push(matchUp);
    });

  const matchUpGroups = {
    completedMatchUps,
    upcomingMatchUps,
    pendingMatchUps,
    abandonedMatchUps,
    byeMatchUps,
  };

  return matchUpGroups;
}
