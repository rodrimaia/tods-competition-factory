import { getAllDrawMatchUps } from '../../getters/getMatchUps/drawMatchUps';
import { directParticipants } from '../matchUpGovernor/directParticipants';
import { getAvailablePlayoffRounds } from './getAvailablePlayoffRounds';
import { matchUpIsComplete } from '../scoreGovernor/matchUpIsComplete';
import { positionTargets } from '../positionGovernor/positionTargets';
import { playoff } from '../../generators/playoffStructures';
import { findStructure } from '../../getters/findStructure';
import { getDevContext } from '../../../global/globalState';
import { addGoesTo } from '../matchUpGovernor/addGoesTo';
import { getSourceRounds } from './getSourceRounds';
import { makeDeepCopy } from '../../../utilities';

import { INVALID_VALUES } from '../../../constants/errorConditionConstants';
import { SUCCESS } from '../../../constants/resultConstants';
import {
  LOSER,
  PLAY_OFF,
  TOP_DOWN,
} from '../../../constants/drawDefinitionConstants';

/**
 *
 * @param {object} drawDefinition - passed in automatically by drawEngine
 * @param {string} structureId - id of structure to which playoff structures are to be added
 * @param {number[]} roundNumbers - source roundNumbers which will feed target structures, e.g. [1, 2]
 * @param {object[]} roundProfiles - source roundNumbers as Object.keys with depth as Object.values, e.g. [{ 1: 2}, {2: 1}]
 * @param {number[]} playoffPositions - positions to be played off
 * @param {boolean} exitProfileLimit - limit playoff rounds generated by the attributes present in playoffAttributes
 * @param {object} playoffAttributes - mapping of exitProfile to structure names, e.g. 0-1-1 for SOUTH
 * @param {string} playoffStructureNameBase - Root word for default playoff naming, e.g. 'Playoff' for 'Playoff 3-4'
 *
 */
export function addPlayoffStructures(props) {
  const {
    playoffRounds: availablePlayoffRounds,
    playoffRoundsRanges: availablePlayoffRoundsRanges,
    error: playoffRoundsError,
  } = getAvailablePlayoffRounds(props);
  if (playoffRoundsError) return { error: playoffRoundsError };

  const {
    playoffSourceRounds,
    playoffRoundsRanges,
    playoffPositionsReturned,
    error: sourceRoundsError,
  } = getSourceRounds(props);
  if (sourceRoundsError) return { error: sourceRoundsError };

  const {
    uuids,
    roundNumbers,
    roundProfiles,
    drawDefinition,
    playoffPositions,
    playoffAttributes,
    exitProfileLimit,
    playoffStructureNameBase,
    structureId: sourceStructureId,
  } = props;

  const roundProfile =
    roundProfiles?.length && Object.assign({}, ...roundProfiles);

  const targetRoundNumbers =
    roundNumbers ||
    (typeof roundProfiles === 'object' &&
      roundProfiles.map((p) => Object.keys(p)).flat());

  const validRoundNumbers =
    targetRoundNumbers &&
    targetRoundNumbers.map((p) => !isNaN(p) && parseInt(p)).filter(Boolean);

  if (validRoundNumbers) {
    if (!Array.isArray(validRoundNumbers))
      return { error: INVALID_VALUES, validRoundNumbers };
    validRoundNumbers.forEach((roundNumber) => {
      if (!availablePlayoffRounds.includes(roundNumber))
        return { error: INVALID_VALUES, roundNumber };
    });
  }

  if (playoffPositions) {
    playoffPositions.forEach((playoffPosition) => {
      if (!playoffPositionsReturned.includes(playoffPosition))
        return { error: INVALID_VALUES, playoffPosition };
    });
  }

  const { structure } = findStructure({
    drawDefinition,
    structureId: sourceStructureId,
  });

  const sourceRounds = validRoundNumbers || playoffSourceRounds;
  const roundsRanges = validRoundNumbers
    ? availablePlayoffRoundsRanges
    : playoffRoundsRanges;

  const newLinks = [];
  for (const roundNumber of sourceRounds) {
    const roundInfo = roundsRanges.find(
      (roundInfo) => roundInfo.roundNumber === roundNumber
    );
    if (!roundInfo) return { error: INVALID_VALUES, message: { roundNumber } };
    const drawSize = roundInfo.finishingPositions.length;
    const finishingPositionOffset =
      Math.min(...roundInfo.finishingPositions) - 1;

    const stageSequence = 2;
    const sequenceLimit =
      roundProfile &&
      roundProfile[roundNumber] &&
      stageSequence + roundProfile[roundNumber] - 1;
    const { structure: targetStructure } = playoff({
      uuids,
      drawSize,
      sequenceLimit,
      stageSequence,
      roundOffset: 0,
      drawDefinition,
      stage: PLAY_OFF,
      exitProfileLimit,
      playoffAttributes,
      playoffStructureNameBase,
      finishingPositionOffset,
      exitProfile: `0-${roundNumber}`,
    });

    if (targetStructure) {
      const link = {
        linkType: LOSER,
        source: {
          roundNumber,
          structureId: sourceStructureId,
        },
        target: {
          roundNumber: 1,
          feedProfile: TOP_DOWN,
          structureId: targetStructure.structureId,
        },
      };

      if (getDevContext()) {
        link.source.structureName = structure.structureName;
        link.target.structureName = targetStructure.structureName;
      }

      newLinks.push(link);
    }
  }

  drawDefinition.links = (drawDefinition.links || []).concat(...newLinks);

  const { matchUps: inContextDrawMatchUps, matchUpsMap } = getAllDrawMatchUps({
    drawDefinition,
    inContext: true,
    includeByeMatchUps: true,
  });

  // now advance any players from completed matchUps into the newly added structures
  const completedMatchUps = inContextDrawMatchUps.filter(
    (matchUp) =>
      matchUpIsComplete(matchUp) && matchUp.structureId === sourceStructureId
  );

  completedMatchUps.forEach((matchUp) => {
    const { matchUpId, score, winningSide } = matchUp;
    const targetData = positionTargets({
      matchUpId,
      structure,
      drawDefinition,
      inContextDrawMatchUps,
    });
    const result = directParticipants({
      drawDefinition,
      structure,
      targetData,
      winningSide,
      matchUpId,
      matchUp,
      score,
    });
    if (result.error) console.log(result.error);
  });

  if (props.goesTo)
    addGoesTo({
      drawDefinition,
      inContextDrawMatchUps,
      matchUpsMap,
    });

  return getDevContext()
    ? {
        ...SUCCESS,
        drawDefinition: makeDeepCopy(drawDefinition),
      }
    : SUCCESS;
}
