import fs from 'fs';
import { drawEngine } from 'competitionFactory/drawEngine';
import { generateRange } from 'competitionFactory/utilities';
import {
  MAIN, DOUBLE_ELIMINATION,
  LOSER, WINNER,
  BOTTOM_UP, TOP_DOWN
} from 'competitionFactory/constants/drawDefinitionConstants';

import { verifyStructure } from 'competitionFactory/drawEngine/tests/primitives/verifyStructure';
import { verifyLinks } from 'competitionFactory/drawEngine/tests/primitives/verifyLinks';

import SEEDING_POLICY from 'competitionFactory/fixtures/SEEDING_ITF';
import AVOIDANCE_POLICY from 'competitionFactory/fixtures/AVOIDANCE_COUNTRY';

it('can generate and verify double elimination', () => {
  let mainStructureId, consolationStructureId, deciderStructureId;
 
  ({
    mainStructureId,
    consolationStructureId,
    deciderStructureId
  } = generateDouble({
    drawSize: 12,
    seedsCount: 0,
    assignSeeds: 0,
    participantsCount: 12
  }));

  verifyStructure({
    structureId: mainStructureId,
    expectedSeeds: 0,
    expectedSeedsWithByes: 0,
    expectedByeAssignments: 0,
    expectedSeedValuesWithBye: [],
    expectedPositionsAssignedCount: 12,
    expectedRoundMatchUpsCounts: [4,4,2,1,1]
  });
 
  verifyStructure({
    structureId: consolationStructureId,
    expectedSeeds: 0,
    expectedSeedsWithByes: 0,
    expectedByeAssignments: 0,
    expectedSeedValuesWithBye: [],
    expectedPositionsAssignedCount: 0,
    expectedRoundMatchUpsCounts: [4,2,2,1]
  });
 
  verifyStructure({
    structureId: deciderStructureId,
    expectedSeeds: 0,
    expectedSeedsWithByes: 0,
    expectedByeAssignments: 0,
    expectedSeedValuesWithBye: [],
    expectedPositionsAssignedCount: 0,
    expectedRoundMatchUpsCounts: [1]
  });

  verifyLinks({
    linksProfiles: [
      {
        sourceStructureId: mainStructureId,
        targetStructureId: consolationStructureId,
        linkProfiles: [
          { linkSubject: LOSER, feedProfile: BOTTOM_UP, linkedRounds: [1,1] },
          { linkSubject: LOSER, feedProfile: TOP_DOWN, linkedRounds: [2,1] },
          { linkSubject: LOSER, feedProfile: TOP_DOWN, linkedRounds: [3,3] },
          { linkSubject: LOSER, feedProfile: BOTTOM_UP, linkedRounds: [4,5] }
        ]
      },
      {
        sourceStructureId: consolationStructureId,
        targetStructureId: mainStructureId,
        linkProfiles: [
          { linkSubject: WINNER, feedProfile: TOP_DOWN, linkedRounds: [5,5]},
        ]
      },
      {
        sourceStructureId: mainStructureId,
        targetStructureId: deciderStructureId,
        linkProfiles: [
          { linkSubject: WINNER, feedProfile: TOP_DOWN, linkedRounds: [5,1]},
          { linkSubject: LOSER, feedProfile: TOP_DOWN, linkedRounds: [5,1]}
        ]
      }
    ]
  });

  // TODO: implement and test participant movement across double elmination links

});

it('can write to the file system', () => {
  const writeFile = process.env.TMX_TEST_FILES;
  const drawDefinition = drawEngine.getState();
  
  const drawType = DOUBLE_ELIMINATION;
  const fileName = `${drawType}.json`;
  const dirPath = './src/engines/drawEngine/documentation/generated/';
  const output = `${dirPath}${fileName}`;
  if (writeFile) fs.writeFileSync(output, JSON.stringify(drawDefinition, null, 2));
})

function generateDouble({
  drawSize,
  seedsCount,
  assignSeeds,
  participantsCount,
  seedAssignmentProfile={},
}) {
  const drawType = DOUBLE_ELIMINATION;
  
  drawEngine.reset();
  drawEngine.newDrawDefinition();
  drawEngine.setStageDrawSize({ stage: MAIN, drawSize });
  drawEngine.generateDrawType({ drawType });
  
  const { structures: [mainStructure] } = drawEngine.getDrawStructures({ stage: MAIN, stageSequence: 1});
  const { structureId: mainStructureId } = mainStructure;

  const { structures: [consolationStructure] } = drawEngine.getDrawStructures({ stage: MAIN, stageSequence: 2});
  const { structureId: consolationStructureId } = { ...consolationStructure };
  
  const { structures: [deciderStructure] } = drawEngine.getDrawStructures({ stage: MAIN, stageSequence: 3});
  const { structureId: deciderStructureId } = { ...deciderStructure };
  
  drawEngine.loadPolicy(SEEDING_POLICY);
  drawEngine.loadPolicy(AVOIDANCE_POLICY);
  
  const participants = generateRange(0, participantsCount)
    .map(i => ({participantId: `ko-uuid${i+1}`}));
  const participantIds = participants.map(p=>p.participantId);
    
  drawEngine.addDrawEntries({ stage: MAIN, participantIds })
  drawEngine.initializeStructureSeedAssignments({ structureId: mainStructureId, seedsCount });
  
  assignSeeds = assignSeeds || seedsCount;
  if (assignSeeds > participantsCount) assignSeeds = participantsCount;
  generateRange(1, assignSeeds + 1).forEach(seedNumber => {
    const participantId = participants[seedNumber - 1].participantId;
    const seedValue = seedAssignmentProfile[seedNumber] || seedNumber;
    drawEngine.assignSeed({structureId: mainStructureId, seedNumber, seedValue, participantId});
  });

  drawEngine.automatedPositioning({ structureId: mainStructureId });
  
  return { mainStructureId, consolationStructureId, deciderStructureId };
};

