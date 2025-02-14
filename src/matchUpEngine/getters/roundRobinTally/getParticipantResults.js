import { countGames, countSets, countPoints } from './scoreCounters';
import { calculatePercentages } from './calculatePercentages';
import { intersection } from '../../../utilities';

import {
  completedMatchUpStatuses,
  DEFAULTED,
  RETIRED,
  WALKOVER,
} from '../../../constants/matchUpStatusConstants';

/*
TODO: for TEAM matchUps, what are now games won/lost should be tieMatchUps won/lost
and the games/sets of all tieMatchUps should be aggregated
*/
export function getParticipantResults({
  participantIds,
  matchUpFormat,
  tallyPolicy,
  perPlayer,
  matchUps,
}) {
  const participantResults = {};

  const filteredMatchUps = matchUps.filter((matchUp) => {
    return (
      !participantIds?.length ||
      intersection(participantIds, [
        getSideId(matchUp, 0),
        getSideId(matchUp, 1),
      ]).length === 2
    );
  });

  filteredMatchUps.forEach((matchUp) => {
    const { matchUpStatus, tieMatchUps, score, winningSide, sides } = matchUp;

    const winningParticipantId = winningSide && getWinningSideId(matchUp);
    const losingParticipantId = winningSide && getLosingSideId(matchUp);

    if (!winningParticipantId || !losingParticipantId) {
      if (completedMatchUpStatuses.includes(matchUpStatus)) {
        const participantIdSide1 = getSideId(matchUp, 0);
        const participantIdSide2 = getSideId(matchUp, 1);
        if (participantIdSide1) {
          checkInitializeParticipant(participantResults, participantIdSide1);
          participantResults[participantIdSide1].matchUpsCancelled += 1;
        }
        if (participantIdSide2) {
          checkInitializeParticipant(participantResults, participantIdSide2);
          participantResults[participantIdSide2].matchUpsCancelled += 1;
        }
        return;
      } else {
        if (tieMatchUps?.length) {
          perPlayer = 0; // if any matchUps are matchUpType: TEAM don't calculate perPlayer

          for (const tieMatchUp of tieMatchUps) {
            if (tieMatchUp.winningSide) {
              const tieWinningParticipantId = sides.find(
                ({ sideNumber }) => sideNumber === tieMatchUp.winningSide
              )?.participantId;
              const tieLosingParticipantId = sides.find(
                ({ sideNumber }) => sideNumber === tieMatchUp.winningSide
              )?.participantId;
              if (tieWinningParticipantId && tieLosingParticipantId) {
                checkInitializeParticipant(
                  participantResults,
                  tieWinningParticipantId
                );
                checkInitializeParticipant(
                  participantResults,
                  tieLosingParticipantId
                );
                participantResults[tieWinningParticipantId].tieMatchUpsWon += 1;
                participantResults[tieLosingParticipantId].tieMatchUpsLost += 1;
              }
            }

            processScore({
              score: tieMatchUp.score,
              participantResults,
              sides, // use sides from the TEAM matchUp
            });
          }
        } else {
          processScore({ score, sides, participantResults });
        }
      }
    } else {
      checkInitializeParticipant(participantResults, winningParticipantId);
      checkInitializeParticipant(participantResults, losingParticipantId);

      if (tieMatchUps?.length) {
        perPlayer = 0; // if any matchUps are matchUpType: TEAM don't calculate perPlayer

        for (const tieMatchUp of tieMatchUps) {
          if (tieMatchUp.winningSide === winningSide) {
            participantResults[winningParticipantId].tieMatchUpsWon += 1;
            participantResults[losingParticipantId].tieMatchUpsLost += 1;
          } else if (tieMatchUp.winningSide === 3 - winningSide) {
            participantResults[losingParticipantId].tieMatchUpsWon += 1;
            participantResults[winningParticipantId].tieMatchUpsLost += 1;
          }

          processMatchUp({
            matchUpFormat: tieMatchUp.matchUpFormat,
            matchUpStatus: tieMatchUp.matchUpStatus,
            score: tieMatchUp.score,
            winningParticipantId,
            losingParticipantId,
            participantResults,
            isTieMatchUp: true,
            tallyPolicy,
            winningSide,
          });
        }
        processOutcome({
          winningParticipantId,
          losingParticipantId,
          participantResults,
          matchUpStatus,
        });
      } else {
        processMatchUp({
          winningParticipantId,
          losingParticipantId,
          participantResults,
          matchUpFormat,
          matchUpStatus,
          tallyPolicy,
          winningSide,
          score,
        });
      }
    }
  });

  calculatePercentages({ participantResults, perPlayer, matchUpFormat });

  return { participantResults };
}

function getWinningSideId(matchUp) {
  const winnerIndex = matchUp.winningSide - 1;
  return getSideId(matchUp, winnerIndex);
}

function getLosingSideId(matchUp) {
  const loserIndex = 1 - (matchUp.winningSide - 1);
  return getSideId(matchUp, loserIndex);
}

function getSideId(matchUp, index) {
  if (!matchUp || !matchUp.sides) {
    console.log('no sides:', { matchUp });
    return 'foo';
  }
  const Side = matchUp.sides[index];
  if (!Side) {
    console.log('No Side', { matchUp, index });
    return 'foo';
  }
  return Side.participantId;
}

function checkInitializeParticipant(participantResults, participantId) {
  if (!participantResults[participantId])
    participantResults[participantId] = {
      allDefaults: 0,
      defaults: 0,
      defeats: [],
      gamesLost: 0,
      gamesWon: 0,
      matchUpsCancelled: 0,
      matchUpsLost: 0,
      matchUpsWon: 0,
      pointsLost: 0,
      pointsWon: 0,
      retirements: 0,
      setsLost: 0,
      setsWon: 0,
      tieMatchUpsLost: 0,
      tieMatchUpsWon: 0,
      victories: [],
      walkovers: 0,
    };
}

function processScore({ score, sides, participantResults }) {
  const { sets } = score || {};
  const gamesTally = [[], []];
  const setsTally = [0, 0];

  for (const set of sets || []) {
    const { winningSide: setWinningSide, side1Score, side2Score } = set;
    if (setWinningSide) setsTally[setWinningSide - 1] += 1;
    gamesTally[0].push(parseInt(side1Score || 0));
    gamesTally[1].push(parseInt(side2Score || 0));
  }

  const gamesTotal = [
    gamesTally[0].reduce((a, b) => a + b, 0),
    gamesTally[1].reduce((a, b) => a + b, 0),
  ];

  sides.forEach((side, i) => {
    const { participantId } = side;
    checkInitializeParticipant(participantResults, participantId);
    participantResults[participantId].setsWon += setsTally[i];
    participantResults[participantId].setsLost += setsTally[1 - i];
    participantResults[participantId].gamesWon += gamesTotal[i];
    participantResults[participantId].gamesLost += gamesTotal[1 - i];
  });
}

function processMatchUp({
  winningParticipantId,
  losingParticipantId,
  participantResults,
  matchUpFormat,
  matchUpStatus,
  isTieMatchUp,
  tallyPolicy,
  winningSide,
  score,
}) {
  const winningSideIndex = winningSide && winningSide - 1;
  const losingSideIndex = 1 - winningSideIndex;

  if (!isTieMatchUp) {
    processOutcome({
      winningParticipantId,
      losingParticipantId,
      participantResults,
      matchUpStatus,
    });
  }

  const setsTally = countSets({
    matchUpStatus,
    matchUpFormat,
    tallyPolicy,
    winningSide,
    score,
  });
  participantResults[winningParticipantId].setsWon +=
    setsTally[winningSideIndex];
  participantResults[winningParticipantId].setsLost +=
    setsTally[losingSideIndex];
  participantResults[losingParticipantId].setsWon += setsTally[losingSideIndex];
  participantResults[losingParticipantId].setsLost +=
    setsTally[winningSideIndex];

  const gamesTally = countGames({
    matchUpStatus,
    matchUpFormat,
    tallyPolicy,
    winningSide,
    score,
  });
  participantResults[winningParticipantId].gamesWon +=
    gamesTally[winningSideIndex];
  participantResults[winningParticipantId].gamesLost +=
    gamesTally[losingSideIndex];
  participantResults[losingParticipantId].gamesWon +=
    gamesTally[losingSideIndex];
  participantResults[losingParticipantId].gamesLost +=
    gamesTally[winningSideIndex];

  const pointsTally = countPoints({ score, tallyPolicy });
  participantResults[winningParticipantId].pointsWon +=
    pointsTally[winningSideIndex];
  participantResults[winningParticipantId].pointsLost +=
    pointsTally[losingSideIndex];
  participantResults[losingParticipantId].pointsWon +=
    pointsTally[losingSideIndex];
  participantResults[losingParticipantId].pointsLost +=
    pointsTally[winningSideIndex];
}

function processOutcome({
  winningParticipantId,
  losingParticipantId,
  participantResults,
  matchUpStatus,
}) {
  if (matchUpStatus === WALKOVER)
    participantResults[losingParticipantId].walkovers += 1;
  if (matchUpStatus === DEFAULTED)
    participantResults[losingParticipantId].defaults += 1;
  if (matchUpStatus === RETIRED)
    participantResults[losingParticipantId].retirements += 1;

  // attribute to catch all scenarios where participant terminated matchUp irregularly
  if ([DEFAULTED, RETIRED, WALKOVER].includes(matchUpStatus))
    participantResults[losingParticipantId].allDefaults += 1;

  participantResults[winningParticipantId].matchUpsWon += 1;
  participantResults[losingParticipantId].matchUpsLost += 1;
  participantResults[losingParticipantId].defeats.push(winningParticipantId);
  participantResults[winningParticipantId].victories.push(losingParticipantId);
}
