import { drawEngine } from '../../../drawEngine';
import { chunkArray, generateRange } from '../../../utilities';
import { getAllStructureMatchUps } from '../../getters/getMatchUps';
import { structureAssignedDrawPositions } from '../../getters/positionsGetter';
import { verifyDrawHierarchy } from '../../tests/primitives/verifyDrawHierarchy';
import {
  findStructure,
  getStructureSeedAssignments,
} from '../../getters/structureGetter';
import { getStructurePositionedSeeds } from '../../governors/positionGovernor/positionSeeds';

export function verifyStructure({
  structureId,
  expectedSeeds,
  hierarchyVerification,
  expectedSeedsWithByes,
  expectedByeAssignments,
  expectedSeedValuesWithBye,
  expectedRoundMatchUpsCounts,
  expectedQualifierAssignments,
  expectedPositionsAssignedCount,
}) {
  const drawDefinition = drawEngine.getState();
  const { structure } = findStructure({ drawDefinition, structureId });
  const { positionAssignments } = structureAssignedDrawPositions({ structure });
  const { seedAssignments } = getStructureSeedAssignments({ structure });

  const positionsAssignedCount = positionAssignments.reduce(
    (count, candidate) => {
      return (
        count +
        (candidate.participantId || candidate.bye || candidate.qualifier
          ? 1
          : 0)
      );
    },
    0
  );

  if (expectedPositionsAssignedCount !== undefined) {
    expect(positionsAssignedCount).toEqual(expectedPositionsAssignedCount);
  }

  const byeAssignedDrawPositions = positionAssignments
    .filter(assignment => assignment.bye)
    .map(assignment => assignment.drawPosition);

  const qualifierAssignedDrawPositions = positionAssignments
    .filter(assignment => assignment.qualifier)
    .map(assignment => assignment.drawPosition);

  if (expectedByeAssignments !== undefined) {
    expect(byeAssignedDrawPositions.length).toEqual(expectedByeAssignments);
  }

  if (expectedQualifierAssignments !== undefined) {
    expect(qualifierAssignedDrawPositions.length).toEqual(
      expectedQualifierAssignments
    );
  }

  const seededParticipantIds = seedAssignments
    .map(assignment => assignment.participantId)
    .filter(f => f);
  const seedAssignedDrawPositions = positionAssignments
    .filter(assignment =>
      seededParticipantIds.includes(assignment.participantId)
    )
    .map(assignment => assignment.drawPosition);
  if (expectedSeeds !== undefined)
    expect(seedAssignedDrawPositions.length).toEqual(expectedSeeds);

  const { matchUps, roundMatchUps } = getAllStructureMatchUps({
    structure,
    inContext: true,
  });
  if (hierarchyVerification)
    verifyDrawHierarchy({ matchUps, hierarchyVerification });
  if (expectedRoundMatchUpsCounts) {
    expectedRoundMatchUpsCounts.forEach((expectation, index) => {
      const roundNumber = index + 1;
      const roundMatchUpsCount =
        (roundMatchUps[roundNumber] && roundMatchUps[roundNumber].length) || 0;
      expect(roundMatchUpsCount).toEqual(expectation);
    });
  }

  const pairedDrawPositions = matchUps
    .filter(matchUp => matchUp.roundNumber === 1)
    .map(matchUp => matchUp.drawPositions);
  const getPairedDrawPosition = drawPosition =>
    pairedDrawPositions.reduce((pairedDrawPosition, candidate) => {
      return candidate.includes(drawPosition)
        ? candidate.reduce((p, c) => (c !== drawPosition ? c : p), undefined)
        : pairedDrawPosition;
    }, undefined);

  const seedPairedDrawPositions = seedAssignedDrawPositions
    .map(getPairedDrawPosition)
    .filter(f => f);
  const seedPairedDrawPositionsWithBye = seedPairedDrawPositions.filter(
    drawPosition => byeAssignedDrawPositions.includes(drawPosition)
  );
  if (expectedSeedsWithByes !== undefined) {
    expect(seedPairedDrawPositionsWithBye.length).toEqual(
      expectedSeedsWithByes
    );
  }

  const positionedSeeds = getStructurePositionedSeeds({ structure });
  const seedDrawPositionsWithBye = seedPairedDrawPositionsWithBye.map(
    getPairedDrawPosition
  );
  const seedValuesOfSeedsWithBye = positionedSeeds
    .filter(assignment =>
      seedDrawPositionsWithBye.includes(assignment.drawPosition)
    )
    .map(assignment => assignment.seedValue)
    .sort((a, b) => a - b);

  if (expectedSeedValuesWithBye !== undefined) {
    expect(expectedSeedValuesWithBye).toMatchObject(seedValuesOfSeedsWithBye);
  }

  const drawSize = pairedDrawPositions.length;
  const { filteredQuarters } = verifyByeDistribution({
    drawSize,
    byeAssignedDrawPositions,
  });

  return { byeAssignedDrawPositions, filteredQuarters };
}

function verifyByeDistribution({ drawSize, byeAssignedDrawPositions }) {
  const quarterSize = Math.ceil(drawSize / 4);
  const quarters = chunkArray(generateRange(1, drawSize + 1), quarterSize);
  const filteredQuarters = quarters.map(quarter =>
    quarter.filter(drawPosition =>
      byeAssignedDrawPositions.includes(drawPosition)
    )
  );
  const quarterLengths = filteredQuarters.map(
    filteredQuarter => filteredQuarter.length
  );
  const maxLength = Math.max(...quarterLengths);
  const minLength = Math.min(...quarterLengths);
  const lengthDifference = maxLength - minLength;
  expect(lengthDifference).toBeLessThanOrEqual(1);
  return { filteredQuarters };
}
