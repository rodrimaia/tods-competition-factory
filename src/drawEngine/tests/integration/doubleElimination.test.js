import { verifyStructure } from '../../tests/primitives/verifyStructure';
import { verifyLinks } from '../../tests/primitives/verifyLinks';
import { completeMatchUp } from '../primitives/verifyMatchUps';
import tournamentEngine from '../../../tournamentEngine/sync';
import { generateRange } from '../../../utilities';
import mocksEngine from '../../../mocksEngine';
import { drawEngine } from '../../sync';

import SEEDING_POLICY from '../../../fixtures/policies/POLICY_SEEDING_ITF';
import {
  MAIN,
  DOUBLE_ELIMINATION,
  LOSER,
  WINNER,
  BOTTOM_UP,
  TOP_DOWN,
} from '../../../constants/drawDefinitionConstants';

it('can complete double elimination draw', () => {
  const drawProfiles = [{ drawSize: 12, drawType: DOUBLE_ELIMINATION }];
  const { tournamentRecord } = mocksEngine.generateTournamentRecord({
    completeAllMatchUps: true,
    drawProfiles,
  });
  tournamentEngine.setState(tournamentRecord);

  const matchUps = tournamentEngine.allTournamentMatchUps().matchUps;
  expect(matchUps.length).toEqual(23);

  const result = tournamentEngine.tournamentMatchUps();
  const { upcomingMatchUps } = result;
  expect(upcomingMatchUps.length).toEqual(1);
});

it('can generate and verify double elimination', () => {
  const { mainStructureId, consolationStructureId, deciderStructureId } =
    generateDouble({
      drawSize: 12,
      seedsCount: 0,
      assignSeeds: 0,
      participantsCount: 12,
    });

  verifyStructure({
    structureId: mainStructureId,
    expectedSeeds: 0,
    expectedSeedsWithByes: 0,
    expectedByeAssignments: 0,
    expectedSeedValuesWithBye: [],
    expectedPositionsAssignedCount: 12,
    expectedRoundMatchUpsCounts: [4, 4, 2, 1, 1],
  });

  verifyStructure({
    structureId: consolationStructureId,
    expectedSeeds: 0,
    expectedSeedsWithByes: 0,
    expectedByeAssignments: 0,
    expectedSeedValuesWithBye: [],
    expectedPositionsAssignedCount: 0,
    expectedRoundMatchUpsCounts: [4, 2, 2, 1],
  });

  verifyStructure({
    structureId: deciderStructureId,
    expectedSeeds: 0,
    expectedSeedsWithByes: 0,
    expectedByeAssignments: 0,
    expectedSeedValuesWithBye: [],
    expectedPositionsAssignedCount: 0,
    expectedRoundMatchUpsCounts: [1],
  });

  verifyLinks({
    linksProfiles: [
      {
        sourceStructureId: mainStructureId,
        targetStructureId: consolationStructureId,
        linkProfiles: [
          { linkType: LOSER, feedProfile: TOP_DOWN, linkedRounds: [1, 1] },
          { linkType: LOSER, feedProfile: BOTTOM_UP, linkedRounds: [2, 1] },
          { linkType: LOSER, feedProfile: TOP_DOWN, linkedRounds: [3, 3] },
          { linkType: LOSER, feedProfile: BOTTOM_UP, linkedRounds: [4, 5] },
        ],
      },
      {
        sourceStructureId: consolationStructureId,
        targetStructureId: mainStructureId,
        linkProfiles: [
          { linkType: WINNER, feedProfile: TOP_DOWN, linkedRounds: [5, 5] },
        ],
      },
      {
        sourceStructureId: mainStructureId,
        targetStructureId: deciderStructureId,
        linkProfiles: [
          { linkType: WINNER, feedProfile: TOP_DOWN, linkedRounds: [5, 1] },
          { linkType: LOSER, feedProfile: TOP_DOWN, linkedRounds: [5, 1] },
        ],
      },
    ],
  });

  let { success } = completeMatchUp({
    structureId: mainStructureId,
    roundNumber: 1,
    roundPosition: 1,
    winningSide: 1,
  });
  expect(success).toEqual(true);
  ({ success } = completeMatchUp({
    structureId: mainStructureId,
    roundNumber: 1,
    roundPosition: 2,
    winningSide: 2,
  }));
  expect(success).toEqual(true);
  ({ success } = completeMatchUp({
    structureId: mainStructureId,
    roundNumber: 1,
    roundPosition: 3,
    winningSide: 2,
  }));
  expect(success).toEqual(true);
  ({ success } = completeMatchUp({
    structureId: mainStructureId,
    roundNumber: 1,
    roundPosition: 4,
    winningSide: 1,
  }));
  expect(success).toEqual(true);

  let { matchUps } = drawEngine.allStructureMatchUps({
    structureId: consolationStructureId,
  });

  // expect that sideNumber: 1 of all target roundNumber: 1 matchUps have been filled
  expect(matchUps[0].sides[0].sideNumber).toEqual(1);
  expect(matchUps[1].sides[0].sideNumber).toEqual(1);
  expect(matchUps[2].sides[0].sideNumber).toEqual(1);
  expect(matchUps[3].sides[0].sideNumber).toEqual(1);
  expect(matchUps[0].sides[0].participantId).not.toBeUndefined();
  expect(matchUps[0].sides[1].participantId).toBeUndefined();
  expect(matchUps[1].sides[0].participantId).not.toBeUndefined();
  expect(matchUps[0].sides[1].participantId).toBeUndefined();
  expect(matchUps[2].sides[0].participantId).not.toBeUndefined();
  expect(matchUps[0].sides[1].participantId).toBeUndefined();
  expect(matchUps[3].sides[0].participantId).not.toBeUndefined();
  expect(matchUps[3].sides[1].participantId).toBeUndefined();

  ({ success } = completeMatchUp({
    structureId: mainStructureId,
    roundNumber: 2,
    roundPosition: 1,
    winningSide: 1,
  }));
  expect(success).toEqual(true);

  ({ matchUps } = drawEngine.allStructureMatchUps({
    structureId: consolationStructureId,
  }));

  expect(matchUps[3].sides[1].participantId).not.toBeUndefined();
});

function generateDouble({
  drawSize,
  seedsCount,
  assignSeeds,
  participantsCount,
  seedAssignmentProfile = {},
}) {
  const drawType = DOUBLE_ELIMINATION;

  drawEngine.reset();
  drawEngine.newDrawDefinition();
  drawEngine.setStageDrawSize({ stage: MAIN, drawSize });
  drawEngine.generateDrawTypeAndModifyDrawDefinition({
    drawType,
    feedPolicy: { roundGroupedOrder: [] },
  });

  const {
    structures: [mainStructure],
  } = drawEngine.getDrawStructures({ stage: MAIN, stageSequence: 1 });
  const { structureId: mainStructureId } = mainStructure;

  const {
    structures: [consolationStructure],
  } = drawEngine.getDrawStructures({ stage: MAIN, stageSequence: 2 });
  const { structureId: consolationStructureId } = { ...consolationStructure };

  const {
    structures: [deciderStructure],
  } = drawEngine.getDrawStructures({ stage: MAIN, stageSequence: 3 });
  const { structureId: deciderStructureId } = { ...deciderStructure };

  drawEngine.attachPolicies({ policyDefinitions: SEEDING_POLICY });

  const participants = generateRange(0, participantsCount).map((i) => ({
    participantId: `ko-uuid${i + 1}`,
  }));
  const participantIds = participants.map((p) => p.participantId);

  drawEngine.addDrawEntries({ stage: MAIN, participantIds });
  drawEngine.initializeStructureSeedAssignments({
    structureId: mainStructureId,
    seedsCount,
  });

  assignSeeds = assignSeeds || seedsCount;
  if (assignSeeds > participantsCount) assignSeeds = participantsCount;
  generateRange(1, assignSeeds + 1).forEach((seedNumber) => {
    const participantId = participants[seedNumber - 1].participantId;
    const seedValue = seedAssignmentProfile[seedNumber] || seedNumber;
    drawEngine.assignSeed({
      structureId: mainStructureId,
      seedNumber,
      seedValue,
      participantId,
    });
  });

  drawEngine.automatedPositioning({ structureId: mainStructureId });

  return { mainStructureId, consolationStructureId, deciderStructureId };
}
