import { drawEngine } from 'competitionFactory/drawEngine';
import { findMatchUp } from 'competitionFactory/drawEngine/getters/getMatchUps';
import { findStructure } from 'competitionFactory/drawEngine/getters/structureGetter';
import { structureMatchUps } from 'competitionFactory/drawEngine/getters/getMatchUps';
import { getRoundMatchUps, getAllStructureMatchUps, } from 'competitionFactory/drawEngine/getters/getMatchUps';

export function completeMatchUp({structureId, roundNumber, roundPosition, matchUpStatus, winningSide, score, sets}) {
  const { matchUp } = findMatchUpByRoundNumberAndPosition({structureId, roundNumber, roundPosition});
  const { matchUpId } = matchUp;
  const { errors } =  drawEngine.setMatchUpStatus({ matchUpId, matchUpStatus, winningSide, score, sets });
  return { errors, matchUpId };
}

export function findMatchUpByRoundNumberAndPosition({structureId, roundNumber, roundPosition, inContext}) {
  const drawDefinition = drawEngine.getState();
  const { structure } = findStructure({drawDefinition, structureId});
  const { matchUps } = getAllStructureMatchUps({structure, inContext});
  const matchUp = matchUps.reduce((matchUp, candidate) => {
    return candidate.roundNumber === roundNumber && candidate.roundPosition === roundPosition ? candidate : matchUp;
  }, undefined);
  return { matchUp };
}

export function verifyMatchUps({
  structureId,
  requireParticipants,
  expectedRoundPending,
  expectedRoundUpcoming,
  expectedRoundCompleted,
}) {
  const drawDefinition = drawEngine.getState();
  const { structure } = findStructure({drawDefinition, structureId});
  const {
    completedMatchUps, pendingMatchUps, upcomingMatchUps
  } = structureMatchUps({structure, requireParticipants});

  const { roundMatchUps: pendingRoundMatchUps } = getRoundMatchUps({matchUps: pendingMatchUps});
  const { roundMatchUps: upcomingRoundMatchUps } = getRoundMatchUps({matchUps: upcomingMatchUps});
  const { roundMatchUps: completedRoundMatchUps } = getRoundMatchUps({matchUps: completedMatchUps});

  if (expectedRoundPending) {
    verifyRoundCounts({roundMatchUps: pendingRoundMatchUps, expectedRounds: expectedRoundPending});
  }
  if (expectedRoundUpcoming) {
    verifyRoundCounts({roundMatchUps: upcomingRoundMatchUps, expectedRounds: expectedRoundUpcoming});
  }
  if (expectedRoundCompleted) {
    verifyRoundCounts({roundMatchUps: completedRoundMatchUps, expectedRounds: expectedRoundCompleted});
  }
}

function verifyRoundCounts({roundMatchUps, expectedRounds}) {
  expectedRounds.forEach((count, i) => {
    const roundNumber = i + 1;
    if (!count) {
      const matchUpCount = roundMatchUps[roundNumber] && roundMatchUps[roundNumber].length;
      expect(matchUpCount).toEqual(undefined);
    } else {
      const matchUpCount = roundMatchUps[roundNumber] && roundMatchUps[roundNumber].length;
      expect(matchUpCount).toEqual(count);   
    }
  })
}

export function getMatchUpWinnerLoserIds({drawDefinition, matchUpId}) {
  const { matchUp } = findMatchUp({drawDefinition, matchUpId, inContext: true});
  const { Sides, winningSide } = matchUp;
  
  const sideWinning = winningSide && Sides.reduce((sideWinning, side) => {
    return side.sideNumber === winningSide ? side : sideWinning;
  }, undefined);
  const sideLosing = winningSide && Sides.reduce((sideLosing, side) => {
    return side.sideNumber === 3 - winningSide ? side : sideLosing;
  }, undefined);

  const winningParticipantId = sideWinning && sideWinning.participantId;
  const losingParticipantId = sideLosing && sideLosing.participantId;

  return { winningParticipantId, losingParticipantId };
}