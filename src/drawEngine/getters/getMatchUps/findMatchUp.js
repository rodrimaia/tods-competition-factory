import { getAllStructureMatchUps } from './getAllStructureMatchUps';
import { getMatchUp } from '../../accessors/matchUpAccessor/matchUps';
import { getDrawStructures } from '../findStructure';
import { makeDeepCopy } from '../../../utilities';

/*
  public version of findMatchUp
*/
export function publicFindMatchUp(props) {
  Object.assign(props, { inContext: true });
  return { matchUp: makeDeepCopy(findMatchUp(props).matchUp) };
}

/*
  function to find a matchUp within a draw
*/
export function findMatchUp({
  drawDefinition,
  tournamentParticipants,
  matchUpId,
  inContext,
  // nextMatchUps,
}) {
  // TODO: remove requirement to return { structure }
  // use allDrawMatchUps so that { nextMatchUps } option can be added;

  const { structures } = getDrawStructures({ drawDefinition });
  const { matchUp, structure } = structures.reduce((result, structure) => {
    const { matchUps } = getAllStructureMatchUps({
      tournamentParticipants,
      drawDefinition,
      inContext,
      structure,
    });
    const { matchUp } = getMatchUp({ matchUps, matchUpId });
    return matchUp ? { matchUp, structure } : result;
  }, {});

  return { matchUp, structure };
}
