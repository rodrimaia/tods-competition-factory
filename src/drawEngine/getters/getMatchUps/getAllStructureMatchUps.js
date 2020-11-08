import { filterMatchUps } from './filterMatchUps';

import { getCheckedInParticipantIds } from '../matchUpTimeItems';
import { structureAssignedDrawPositions } from '../positionsGetter';
import { getStructureSeedAssignments } from '../getStructureSeedAssignments';
import {
  getRoundMatchUps,
  getCollectionPositionMatchUps,
} from '../../accessors/matchUpAccessor/matchUps';
import { getMatchUpType } from '../../accessors/matchUpAccessor/getMatchUpType';
import { getMatchUpScheduleDetails } from '../../accessors/matchUpAccessor/matchUpScheduleDetails';

import { makeDeepCopy, numericSort } from '../../../utilities';
import { BYE } from '../../../constants/matchUpStatusConstants';
import { getAppliedPolicies } from '../../governors/policyGovernor/getAppliedPolicies';
import { generateScoreString } from '../../governors/scoreGovernor/generateScoreString';
import { MISSING_STRUCTURE } from '../../../constants/errorConditionConstants';

/*
  return all matchUps within a structure and its child structures
  context is used to pass in additional parameters to be assigned to each matchUp
*/
export function getAllStructureMatchUps({
  structure,
  inContext,
  roundFilter,
  context = {},
  drawDefinition,
  contextFilters,
  matchUpFilters,
  tournamentParticipants,
}) {
  let matchUps = [],
    collectionPositionMatchUps = {},
    roundMatchUps = {};
  if (!structure) {
    return {
      matchUps,
      collectionPositionMatchUps,
      roundMatchUps,
      error: MISSING_STRUCTURE,
    };
  }

  // TODO: code is shared with matchUpActions.js
  // TODO: extend testing to restrict for MAIN while leaving consolation unrestricted
  const { appliedPolicies } = getAppliedPolicies({ drawDefinition });
  const structureScoringPolicies = appliedPolicies?.scoring?.structures;
  const stageSpecificPolicies =
    structureScoringPolicies?.stage &&
    structureScoringPolicies?.stage[structure.stage];
  const sequenceSpecificPolicies =
    stageSpecificPolicies?.stageSequence &&
    stageSpecificPolicies.stageSequence[structure.stageSequence];
  const requireAllPositionsAssigned =
    appliedPolicies?.scoring?.requireAllPositionsAssigned ||
    stageSpecificPolicies?.requireAllPositionsAssigned ||
    sequenceSpecificPolicies?.requireAllPositionsAssigned;

  const {
    positionAssignments,
    allPositionsAssigned,
  } = structureAssignedDrawPositions({ structure });
  const scoringActive = !requireAllPositionsAssigned || allPositionsAssigned;
  const { seedAssignments } = getStructureSeedAssignments({
    drawDefinition,
    structure,
  });
  const { structureId, structureName } = structure;
  const { drawId } = drawDefinition || {};

  // a collectionDefinition can be found as a propery of tieFormat
  // which can be found as a property of either a structure or a drawDefinition
  const tieFormat = structure.tieFormat || drawDefinition?.tieFormat;
  const collectionDefinitions = tieFormat && tieFormat.collectionDefinitions;

  if (structure.matchUps) {
    matchUps = structure.matchUps;
  } else if (structure.structures) {
    if (inContext) {
      // Round Robin structures are nested so the accurate structureId when in context must be assigned here
      matchUps = [].concat(
        ...structure.structures.map(structure => {
          const { structureId } = structure;
          return structure.matchUps.map(matchUp => {
            return Object.assign(makeDeepCopy(matchUp), { structureId });
          });
        })
      );
    } else {
      matchUps = [].concat(
        ...structure.structures.map(structure => {
          return structure.matchUps;
        })
      );
    }
  }

  const matchUpTies = matchUps.filter(matchUp =>
    Array.isArray(matchUp.tieMatchUps)
  );
  matchUpTies.forEach(matchUpTie => {
    const tieMatchUps = matchUpTie.tieMatchUps;
    matchUps = matchUps.concat(...tieMatchUps);
  });

  if (matchUpFilters) {
    matchUps = filterMatchUps({ matchUps, ...matchUpFilters });
  }

  if (inContext) {
    matchUps = matchUps.map(matchUp => addMatchUpContext({ matchUp }));
    if (contextFilters) {
      matchUps = filterMatchUps({ matchUps, ...contextFilters });
    }
  }

  ({ roundMatchUps } = getRoundMatchUps({ matchUps }));
  ({ collectionPositionMatchUps } = getCollectionPositionMatchUps({
    matchUps,
  }));

  if (roundFilter)
    matchUps = matchUps.filter(matchUp => matchUp.roundNumber === roundFilter);

  return { matchUps, roundMatchUps, collectionPositionMatchUps };

  function findParticipant({ tournamentParticipants = [], participantId }) {
    const participant = tournamentParticipants.reduce(
      (participant, candidate) => {
        return candidate.participantId === participantId
          ? candidate
          : participant;
      },
      undefined
    );
    return makeDeepCopy(participant);
  }

  // isCollectionBye is an attempt to embed BYE status in matchUp.tieMatchUps
  function addMatchUpContext({ matchUp, isCollectionBye, matchUpTieId }) {
    const matchUpStatus = isCollectionBye ? BYE : matchUp.matchUpStatus;
    const { schedule } = getMatchUpScheduleDetails({ matchUp });

    // order is important here as Round Robin matchUps already have inContext structureId
    const matchUpWithContext = Object.assign(
      {
        drawId,
        structureId,
        schedule,
        structureName,
        matchUpStatus,
        matchUpTieId,
      },
      makeDeepCopy(matchUp),
      context
    );

    if (matchUpWithContext.tieMatchUps) {
      const isCollectionBye = matchUpWithContext.matchUpStatus === BYE;
      matchUpWithContext.tieMatchUps = matchUpWithContext.tieMatchUps.map(
        matchUp => {
          const matchUpTieId = matchUpWithContext.matchUpId;
          return addMatchUpContext({ matchUp, isCollectionBye, matchUpTieId });
        }
      );
    }

    const { drawPositions } = matchUp;
    if (Array.isArray(drawPositions)) {
      const sides = drawPositions
        .sort(numericSort)
        .map((drawPosition, index) => {
          const sideNumber = index + 1;
          return getSide({ drawPosition, sideNumber });
        });
      Object.assign(matchUpWithContext, makeDeepCopy({ sides }));

      if (!matchUp.matchUpFormat) {
        const matchUpFormat =
          structure.matchUpFormat || drawDefinition?.matchUpFormat;
        if (matchUpFormat) Object.assign(matchUpWithContext, { matchUpFormat });
      }
      if (!matchUp.matchUpType) {
        const matchUpType =
          structure.matchUpType || drawDefinition?.matchUpType;
        if (matchUpType) Object.assign(matchUpWithContext, { matchUpType });
      }
    } else if (matchUp.collectionId && !matchUp.matchUpFormat) {
      // the default matchUpFormat for atchUps that are part of Dual Matches / Ties
      // can be found in the collectionDefinition
      const collectionDefinition = collectionDefinitions.reduce(
        (definition, candidate) => {
          return candidate.collectionId === matchUp.colectionId
            ? candidate
            : definition;
        },
        undefined
      );
      const matchUpFormat =
        collectionDefinition && collectionDefinition.matchUpFormat;
      const matchUpType =
        collectionDefinition && collectionDefinition.matchUpType;
      if (matchUpFormat)
        Object.assign(matchUpWithContext, { matchUpFormat, matchUpType });
    }

    if (tournamentParticipants && matchUpWithContext.sides) {
      const sets = matchUpWithContext.sets;
      matchUpWithContext.sides
        .filter(f => f)
        .forEach(side => {
          if (side.participantId) {
            const participant = findParticipant({
              tournamentParticipants,
              participantId: side.participantId,
            });
            if (participant) {
              Object.assign(side, { participant });
            }
          }
          if (sets && side.sideNumber) {
            const reversed = side.sideNumber === 2;
            const scoreString = generateScoreString({ sets, reversed });
            Object.assign(side, { score: scoreString });
          }
          if (side.participant && side.participant.individualParticipants) {
            const individualParticipants = side.participant.individualParticipants.map(
              participant => {
                return (
                  participant &&
                  findParticipant({
                    tournamentParticipants,
                    participantId: participant.participantId,
                  })
                );
              }
            );
            Object.assign(side.participant, { individualParticipants });
          }
        });

      if (!matchUpWithContext.matchUpType) {
        const matchUpType = getMatchUpType({ matchUp: matchUpWithContext });
        if (matchUpType) Object.assign(matchUpWithContext, { matchUpType });
      }
    }

    const hasParticipants =
      matchUpWithContext.sides &&
      matchUpWithContext.sides.filter(side => side && side.participantId)
        .length === 2;
    const hasNoWinner = !matchUpWithContext.winningSide;
    const readyToScore = scoringActive && hasParticipants && hasNoWinner;
    Object.assign(matchUpWithContext, { readyToScore, hasContext: true });

    if (hasParticipants) {
      const {
        allParticipantsCheckedIn,
        checkedInParticipantIds,
      } = getCheckedInParticipantIds({ matchUp: matchUpWithContext });

      Object.assign(matchUpWithContext, {
        allParticipantsCheckedIn,
        checkedInParticipantIds,
      });
    }

    return matchUpWithContext;
  }

  function getSide({ drawPosition, sideNumber }) {
    return positionAssignments.reduce((side, assignment) => {
      const participantId = assignment.participantId;
      const sideValue =
        assignment.drawPosition === drawPosition
          ? getSideValue({ assignment, sideNumber, participantId })
          : side;
      return sideValue;
    }, undefined);
  }

  function getSideValue({ assignment, participantId, sideNumber }) {
    const side = { sideNumber };
    if (participantId) {
      const seeding = getSeeding({ participantId });
      Object.assign(side, seeding, { participantId });
    } else if (assignment.bye) {
      Object.assign(side, { bye: true });
    } else if (assignment.qualifier) {
      Object.assign(side, { qualifier: true });
    }
    return side;
  }

  function getSeeding({ participantId }) {
    return seedAssignments.reduce((seeding, assignment) => {
      // seedProxy is used for playoff positioning only and should not be displayed as seeding
      return !assignment.seedProxy && assignment.participantId === participantId
        ? assignment
        : seeding;
    }, undefined);
  }
}
