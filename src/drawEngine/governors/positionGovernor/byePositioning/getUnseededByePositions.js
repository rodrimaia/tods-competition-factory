import { getAllStructureMatchUps } from '../../../getters/getMatchUps/getAllStructureMatchUps';
import { structureAssignedDrawPositions } from '../../../getters/positionsGetter';
import { getSeedBlocks } from '../getSeedBlocks';
import {
  getSeedPattern,
  getValidSeedBlocks,
} from '../../../getters/seedGetter';
import {
  chunkArray,
  numericSort,
  shuffleArray,
  unique,
} from '../../../../utilities';

import {
  CLUSTER,
  CONTAINER,
} from '../../../../constants/drawDefinitionConstants';

export function getUnseededByePositions({
  appliedPolicies,
  drawDefinition,
  structure,
  isFeedIn,
  isLucky,
}) {
  const seedingProfile = appliedPolicies?.seeding?.seedingProfile;

  const { positionAssignments } = structureAssignedDrawPositions({ structure });
  const filledDrawPositions = positionAssignments
    .filter((assignment) => assignment.participantId)
    .map((assignment) => assignment.drawPosition);

  const matchUpFilters = { isCollectionMatchUp: false };
  const { matchUps, roundMatchUps } = getAllStructureMatchUps({
    matchUpFilters,
    structure,
  });
  const firstRoundMatchUps = (roundMatchUps && roundMatchUps[1]) || [];

  // firstRoundMatchUps don't work for CONTAINER / ROUND_ROBIN structures
  const relevantMatchUps =
    structure.structureType === CONTAINER ? matchUps : firstRoundMatchUps;
  const relevantDrawPositions = unique(
    [].concat(...relevantMatchUps.map((matchUp) => matchUp.drawPositions))
  );
  const drawPositionOffset = Math.min(...relevantDrawPositions) - 1;

  const filledRelevantDrawPositions = filledDrawPositions.filter(
    (drawPosition) => relevantDrawPositions.includes(drawPosition)
  );

  const getHalves = (chunk) => {
    const halfLength = Math.ceil(chunk.length / 2);
    const halves = [chunk.slice(0, halfLength), chunk.slice(halfLength)];
    const halfLengths = halves.map(
      (half) => [].concat(...half.flat(Infinity)).length
    );
    const shortLength = Math.min(...halfLengths.flat(Infinity));
    const longLength = Math.max(...halfLengths.flat(Infinity));
    const longIndex = halfLengths.indexOf(longLength);
    const unequalHalves = shortLength !== longLength;
    const shuffledHalves = shuffleArray(halves);
    const [greaterHalf, lesserHalf] =
      !shortLength || unequalHalves
        ? [halves[longIndex], halves[1 - longIndex]]
        : [shuffledHalves[0], shuffledHalves[1]];
    return { greaterHalf, lesserHalf };
  };
  const getNextDrawPosition = (chunks) => {
    const { greaterHalf, lesserHalf } = getHalves(chunks);
    const { greaterHalf: greaterQuarter, lesserHalf: lesserQuarter } =
      getHalves(greaterHalf);
    const shuffledQuarter = shuffleArray(greaterQuarter.flat(Infinity));
    const drawPosition = shuffledQuarter.pop();
    const diminishedQuarter = greaterQuarter
      .flat()
      .filter((position) => position !== drawPosition);
    const newlyFilteredChunks = [
      ...lesserHalf,
      ...lesserQuarter,
      diminishedQuarter,
    ];
    return { newlyFilteredChunks, drawPosition };
  };
  const unfilledDrawPosition = (drawPosition) =>
    !filledRelevantDrawPositions.includes(drawPosition);
  const quarterSeparateBlock = (block) => {
    const sortedChunked = chunkArray(
      block.sort(numericSort),
      Math.ceil(block.length / 4)
    );
    let filteredChunks = sortedChunked.map((chunk) =>
      chunk.filter(unfilledDrawPosition)
    );
    const drawPositionCount = [].concat(
      ...filteredChunks.flat(Infinity)
    ).length;
    const orderedDrawPositions = [];
    for (let i = 0; i < drawPositionCount; i++) {
      const { newlyFilteredChunks, drawPosition } =
        getNextDrawPosition(filteredChunks);
      orderedDrawPositions.push(drawPosition);
      filteredChunks = newlyFilteredChunks;
    }
    return orderedDrawPositions;
  };

  // The goal here is to get an order for assigning bye positions which is well distributed
  // setting allPositions: true returns seedBlocks for all positions
  // overriding the default which returns only seedBlocks for seedsCount
  const { validSeedBlocks } = getValidSeedBlocks({
    allPositions: true,
    appliedPolicies,
    drawDefinition,
    structure,
  });

  const validBlockDrawPositions = validSeedBlocks.map((block) =>
    block.drawPositions?.map(
      (drawPosition) => drawPosition + drawPositionOffset
    )
  );

  let unfilledSeedBlocks = validBlockDrawPositions
    .map(quarterSeparateBlock)
    .filter((block) => block.length);

  if (isFeedIn) {
    // FEED_IN structures calculate seedDrawPositions uniquely
    // and require a special case to properly calculate bye positions
    const baseDrawSize = relevantDrawPositions.length;
    const { seedBlocks } = getSeedBlocks({
      cluster: getSeedPattern(seedingProfile) === CLUSTER,
      participantsCount: baseDrawSize,
    });
    const blockDrawPositions = seedBlocks.map((seedBlock) =>
      seedBlock.map((drawPosition) => drawPosition + drawPositionOffset)
    );

    unfilledSeedBlocks = blockDrawPositions
      .map(quarterSeparateBlock)
      .filter((block) => block.length);
  } else if (isLucky) {
    // console.log({ isLucky });
  }

  // for Round Robins pairs need to be reduced to pairs in drawPosition order
  const matchUpPairedDrawPositions = relevantMatchUps
    .map((matchUp) => matchUp.drawPositions)
    .map((pair) => pair?.sort((a, b) => a - b))
    .filter((pair) => pair?.[0] + 1 === pair?.[1]);

  const findDrawPositionPair = (drawPosition) => {
    return matchUpPairedDrawPositions.reduce((pair, candidate) => {
      return candidate.includes(drawPosition)
        ? candidate.reduce((p, c) => (c !== drawPosition ? c : p), undefined)
        : pair;
    }, undefined);
  };

  const unseededByePositions = unfilledSeedBlocks
    .map((block) => block.map(findDrawPositionPair))
    .flat(Infinity)
    .filter(Boolean);

  return { unseededByePositions };
}
