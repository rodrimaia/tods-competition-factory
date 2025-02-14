import { getAppliedPolicies } from '../../../global/functions/deducers/getAppliedPolicies';
import { getStructureSeedAssignments } from '../../getters/getStructureSeedAssignments';
import { findStructure, getDrawStructures } from '../../getters/findStructure';
import { getValidSeedBlocks } from '../../getters/seedGetter';
import { getStageEntries } from '../../getters/stageGetter';
import { mocksEngine, setSubscriptions } from '../../..';
import { numericSort } from '../../../utilities';
import { drawEngine } from '../../sync';

import SEEDING_NATIONAL from '../../../fixtures/policies/POLICY_SEEDING_NATIONAL';
import { MODIFY_DRAW_DEFINITION } from '../../../constants/topicConstants';
import SEEDING_USTA from '../../../fixtures/policies/POLICY_SEEDING_USTA';
import SEEDING_ITF from '../../../fixtures/policies/POLICY_SEEDING_ITF';
import { MAIN } from '../../../constants/drawDefinitionConstants';
import { ERROR } from '../../../constants/resultConstants';
import {
  INVALID_VALUES,
  MISSING_STRUCTURE_ID,
  STRUCTURE_NOT_FOUND,
} from '../../../constants/errorConditionConstants';
import {
  DIRECT_ACCEPTANCE,
  WILDCARD,
} from '../../../constants/entryStatusConstants';

it('can define seedAssignments', () => {
  const drawSize = 8;
  let seedsCount = 16;
  const stage = MAIN;

  const { drawDefinition } = mocksEngine.generateEventWithDraw({
    drawProfile: {
      enforcePolicyLimits: false,
      automated: false,
      seedsCount,
      drawSize,
    },
  });
  drawEngine.setState(drawDefinition);

  const { structures: stageStructures } = getDrawStructures({
    stageSequence: 1,
    drawDefinition,
    stage,
  });
  const { structureId } = stageStructures[0];

  // generates error if seedsCount is greater than drawSize
  let result = drawEngine.initializeStructureSeedAssignments({
    structureId,
    seedsCount,
  });
  expect(result).toHaveProperty(ERROR);

  seedsCount = 4;
  result = drawEngine.initializeStructureSeedAssignments({
    structureId,
    seedsCount,
  });
  expect(result.success).toEqual(true);

  const { drawDefinition: drawDefinitionAfterAssignments } =
    drawEngine.getState();
  const { seedAssignments } = getStructureSeedAssignments({
    drawDefinition: drawDefinitionAfterAssignments,
    structureId,
  });
  expect(seedAssignments.length).toEqual(seedsCount);
});

it('generates valild seedBlocks given different policies', () => {
  const ITF32expectedBlocks = [
    { seedNumbers: [1], drawPositions: [1] },
    { seedNumbers: [2], drawPositions: [32] },
    { seedNumbers: [3, 4], drawPositions: [9, 24] },
    { seedNumbers: [5, 6, 7, 8], drawPositions: [8, 16, 17, 25] },
    {
      seedNumbers: [9, 10, 11, 12, 13, 14, 15, 16],
      drawPositions: [4, 5, 12, 13, 20, 21, 28, 29],
    },
  ];
  checkSeedBlocks({
    drawSize: 32,
    policy: SEEDING_ITF,
    expectedBlocks: ITF32expectedBlocks,
  });

  const ITF64expectedBlocks = [
    { seedNumbers: [1], drawPositions: [1] },
    { seedNumbers: [2], drawPositions: [64] },
    { seedNumbers: [3, 4], drawPositions: [17, 48] },
    { seedNumbers: [5, 6, 7, 8], drawPositions: [16, 32, 33, 49] },
    {
      seedNumbers: [9, 10, 11, 12, 13, 14, 15, 16],
      drawPositions: [8, 9, 24, 25, 40, 41, 56, 57],
    },
  ];
  checkSeedBlocks({
    drawSize: 64,
    policy: SEEDING_ITF,
    expectedBlocks: ITF64expectedBlocks,
  });

  const USTA16expectedBlocks = [
    { seedNumbers: [1], drawPositions: [1] },
    { seedNumbers: [2], drawPositions: [16] },
    { seedNumbers: [3, 4], drawPositions: [5, 12] },
    { seedNumbers: [5, 6, 7, 8], drawPositions: [3, 7, 10, 14] },
  ];
  checkSeedBlocks({
    drawSize: 16,
    policy: SEEDING_USTA,
    expectedBlocks: USTA16expectedBlocks,
  });

  const USTA32expectedBlocks = [
    { seedNumbers: [1], drawPositions: [1] },
    { seedNumbers: [2], drawPositions: [32] },
    { seedNumbers: [3, 4], drawPositions: [9, 24] },
    { seedNumbers: [5, 6, 7, 8], drawPositions: [5, 13, 20, 28] },
    {
      seedNumbers: [9, 10, 11, 12, 13, 14, 15, 16],
      drawPositions: [3, 7, 11, 15, 18, 22, 26, 30],
    },
  ];
  checkSeedBlocks({
    drawSize: 32,
    policy: SEEDING_USTA,
    expectedBlocks: USTA32expectedBlocks,
  });

  const USTA64expectedBlocks = [
    { seedNumbers: [1], drawPositions: [1] },
    { seedNumbers: [2], drawPositions: [64] },
    { seedNumbers: [3, 4], drawPositions: [17, 48] },
    { seedNumbers: [5, 6, 7, 8], drawPositions: [9, 25, 40, 56] },
    {
      seedNumbers: [9, 10, 11, 12, 13, 14, 15, 16],
      drawPositions: [5, 13, 21, 29, 36, 44, 52, 60],
    },
  ];
  checkSeedBlocks({
    drawSize: 64,
    policy: SEEDING_USTA,
    expectedBlocks: USTA64expectedBlocks,
  });

  const USTA128expectedBlocks = [
    { seedNumbers: [1], drawPositions: [1] },
    { seedNumbers: [2], drawPositions: [128] },
    { seedNumbers: [3, 4], drawPositions: [33, 96] },
    { seedNumbers: [5, 6, 7, 8], drawPositions: [17, 49, 80, 112] },
    {
      seedNumbers: [9, 10, 11, 12, 13, 14, 15, 16],
      drawPositions: [9, 25, 41, 57, 72, 88, 104, 120],
    },
    {
      seedNumbers: [
        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
      ],
      drawPositions: [
        5, 13, 21, 29, 37, 45, 53, 61, 68, 76, 84, 92, 100, 108, 116, 124,
      ],
    },
  ];
  checkSeedBlocks({
    drawSize: 128,
    policy: SEEDING_USTA,
    expectedBlocks: USTA128expectedBlocks,
  });

  const USTA256expectedBlocks = [
    { seedNumbers: [1], drawPositions: [1] },
    { seedNumbers: [2], drawPositions: [256] },
    { seedNumbers: [3, 4], drawPositions: [65, 192] },
    { seedNumbers: [5, 6, 7, 8], drawPositions: [33, 97, 160, 224] },
    {
      seedNumbers: [9, 10, 11, 12, 13, 14, 15, 16],
      drawPositions: [17, 49, 81, 113, 144, 176, 208, 240],
    },
    {
      seedNumbers: [
        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
      ],
      drawPositions: [
        9, 25, 41, 57, 73, 89, 105, 121, 136, 152, 168, 184, 200, 216, 232, 248,
      ],
    },
    {
      seedNumbers: [
        33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64,
      ],
      drawPositions: [
        5, 13, 21, 29, 37, 45, 53, 61, 69, 77, 85, 93, 101, 109, 117, 125, 132,
        140, 148, 156, 164, 172, 180, 188, 196, 204, 212, 220, 228, 236, 244,
        252,
      ],
    },
  ];
  checkSeedBlocks({
    drawSize: 256,
    policy: SEEDING_USTA,
    expectedBlocks: USTA256expectedBlocks,
  });
});

it('can assign seedNumbers and drawPositions to seeded participants', () => {
  let updatedAt = 0;
  let drawModifications = 0;
  let result = setSubscriptions({
    subscriptions: {
      [MODIFY_DRAW_DEFINITION]: ([{ drawDefinition }]) => {
        drawModifications += 1;
        if (drawDefinition.updatedAt < updatedAt) {
          // processing order
        } else {
          expect(new Date(drawDefinition.updatedAt).getTime()).toBeGreaterThan(
            new Date(updatedAt).getTime()
          );
        }
        updatedAt = drawDefinition.updatedAt;
      },
    },
  });
  expect(result.success).toEqual(true);
  const drawSize = 64;
  const seedsCount = 16;
  const stage = MAIN;

  const { drawDefinition } = mocksEngine.generateEventWithDraw({
    drawProfile: {
      enforcePolicyLimits: false,
      policyDefinitions: SEEDING_NATIONAL,
      automated: false,
      seedsCount,
      drawSize,
    },
  });
  drawEngine.setState(drawDefinition);

  const { structures: stageStructures } = getDrawStructures({
    drawDefinition,
    stage,
    stageSequence: 1,
  });
  const { structureId } = stageStructures[0];
  result = drawEngine.initializeStructureSeedAssignments({
    structureId,
    seedsCount,
  });
  expect(result.success).toEqual(true);

  const entryStatuses = [DIRECT_ACCEPTANCE, WILDCARD];
  const participants = getStageEntries({
    drawDefinition,
    entryStatuses,
    stage,
  });
  const participantId = participants[0].participantId;
  const participantId2 = participants[1].participantId;
  const participantId3 = participants[2].participantId;

  // attempt to assign a seedNumber higher than seedsCount for structure
  // NOTE: this boundary was abandoned
  /*
  result = drawEngine.assignSeed({
    seedNumber: 17,
    participantId,
    structureId,
  });
  expect(result).toHaveProperty(ERROR);
  */

  let { unplacedSeedNumbers, unfilledPositions } = drawEngine.getNextSeedBlock({
    structureId,
  });
  const seedNumber = unplacedSeedNumbers.pop();
  let drawPosition = unfilledPositions.pop();
  expect(seedNumber).toEqual(1);
  expect(drawPosition).toEqual(1);

  // attempt to assign a valid seedNumber to a participantId
  result = drawEngine.assignSeed({ structureId, seedNumber, participantId });
  expect(result.success).toEqual(true);

  // attempt to assign an invalid position to a seeded participant
  result = drawEngine.assignDrawPosition({
    structureId,
    drawPosition: 2,
    participantId,
  });
  expect(result).toHaveProperty(ERROR);

  // attempt to assign a valid position to a seeded participant
  result = drawEngine.assignDrawPosition({
    structureId,
    drawPosition,
    participantId,
  });
  expect(result.success).toEqual(true);

  // assign an unseeded participant to a drawPosition which is not a seed position
  result = drawEngine.assignDrawPosition({
    structureId,
    drawPosition: 2,
    participantId: participantId2,
  });
  expect(result.success).toEqual(true);

  // attempt to assign a seedNumber to a participant already in a non-seed drawPosition
  result = drawEngine.assignSeed({
    structureId,
    seedNumber: 2,
    participantId: participantId2,
  });
  expect(result).toHaveProperty(ERROR);

  // assign an unseeded participant to a drawPosition which *is* a seed position
  result = drawEngine.assignDrawPosition({
    structureId,
    drawPosition: 64,
    participantId: participantId2,
  });
  // expect ERROR as this participantId is already assigned to another position
  expect(result).toHaveProperty(ERROR);

  // clear draw position by specifying the participantId to derive the drawPosition
  result = drawEngine.clearDrawPosition({
    structureId,
    participantId: participantId2,
  });
  expect(result.success).toEqual(true);

  // nominate participant as 2nd seed
  result = drawEngine.assignSeed({
    structureId,
    seedNumber: 2,
    participantId: participantId2,
  });
  expect(result.success).toEqual(true);

  result = drawEngine.assignDrawPosition({
    structureId,
    drawPosition: 64,
    participantId: participantId2,
  });
  expect(result.success).toEqual(true);

  ({ unplacedSeedNumbers, unfilledPositions } = drawEngine.getNextSeedBlock({
    structureId,
  }));
  expect(unplacedSeedNumbers).toMatchObject([3, 4]);
  expect(unfilledPositions).toMatchObject([17, 48]);

  // nominate participant as 4th seed
  result = drawEngine.assignSeed({
    structureId,
    seedNumber: 4,
    participantId: participantId3,
  });
  expect(result.success).toEqual(true);

  const { drawDefinition: snapShotBefore } = drawEngine.getState();

  // modify the seedValue for an existing seed assignment
  result = drawEngine.modifySeedAssignment({
    participantId: participantId3,
  });
  expect(result.error).toEqual(MISSING_STRUCTURE_ID);

  result = drawEngine.modifySeedAssignment({
    participantId: participantId3,
    structureId: 'bogusId',
  });
  expect(result.error).toEqual(STRUCTURE_NOT_FOUND);

  result = drawEngine.modifySeedAssignment({
    participantId: participantId3,
    structureId,
    seedValue: 'xxx',
  });
  expect(result.error).toEqual(INVALID_VALUES);

  result = drawEngine.modifySeedAssignment({
    participantId: participantId3,
    seedValue: '5-8',
    structureId,
  });
  expect(result.success).toEqual(true);

  const { drawDefinition: snapShotAfter } = drawEngine.getState();
  expect(new Date(snapShotAfter.updatedAt).getTime()).toBeGreaterThan(
    new Date(snapShotBefore.updatedAt).getTime()
  );

  let { seedAssignments } = drawEngine.getStructureSeedAssignments({
    structureId,
  });
  expect(seedAssignments[3].seedValue).toEqual('5-8');

  result = drawEngine.modifySeedAssignment({
    participantId: participantId3,
    seedValue: '0',
    structureId,
  });
  expect(result.success).toEqual(true);

  result = drawEngine.modifySeedAssignment({
    participantId: participantId3,
    seedValue: undefined,
    structureId,
  });
  expect(result.success).toEqual(true);

  result = drawEngine.modifySeedAssignment({
    participantId: participantId3,
    seedValue: '',
    structureId,
  });
  expect(result.success).toEqual(true);

  drawPosition = unfilledPositions.pop();
  expect(drawPosition).toEqual(48);
  result = drawEngine.assignDrawPosition({
    structureId,
    drawPosition,
    participantId: participantId3,
  });
  expect(result.success).toEqual(true);

  ({ unplacedSeedNumbers, unfilledPositions } = drawEngine.getNextSeedBlock({
    structureId,
  }));
  expect(unplacedSeedNumbers).toMatchObject([3]);
  expect(unfilledPositions).toMatchObject([17]);

  ({ seedAssignments } = drawEngine.getStructureSeedAssignments({
    structureId,
  }));
  expect(seedAssignments.length).toEqual(16);
  const assignedSeedPositions = seedAssignments.filter(
    (assignment) => assignment.participantId
  );
  expect(assignedSeedPositions.length).toEqual(3);

  // validation can be disabled
  result = drawEngine.modifySeedAssignment({
    participantId: 'additional participant',
    validation: false,
    seedValue: 'yyy',
    structureId,
  });
  expect(result.success).toEqual(true);

  // will add a seedNumber and new seedAssignment if participantId is not recognized
  // drawEngine does not have access to participants and cannot verify validity of participantId
  result = drawEngine.modifySeedAssignment({
    participantId: 'additional participant',
    seedValue: '99',
    structureId,
  });
  expect(result.success).toEqual(true);

  ({ seedAssignments } = drawEngine.getStructureSeedAssignments({
    structureId,
  }));

  expect(seedAssignments.length).toEqual(17);
  expect(seedAssignments[16].seedValue).toEqual(99);
  expect(drawModifications).toEqual(16);
});

function checkSeedBlocks({ drawSize, policy, expectedBlocks }) {
  let { drawDefinition } = mocksEngine.generateEventWithDraw({
    drawProfile: {
      automated: false,
      drawSize,
    },
  });
  drawEngine.setState(drawDefinition);
  const structureId = drawDefinition.structures[0].structureId;

  const seedsCount = Math.max(
    ...[].concat(...expectedBlocks.map((b) => b.seedNumbers))
  );

  drawEngine.attachPolicies({ policyDefinitions: policy });
  drawEngine.initializeStructureSeedAssignments({ structureId, seedsCount });

  // const { drawDefinition } = drawEngine.getState();
  const { structure } = findStructure({ drawDefinition, structureId });

  const { appliedPolicies } = getAppliedPolicies({ drawDefinition });
  const { validSeedBlocks } = getValidSeedBlocks({
    appliedPolicies,
    drawDefinition,
    structure,
  });

  validSeedBlocks.forEach((seedBlock, i) => {
    expect(seedBlock.seedNumbers.sort(numericSort)).toMatchObject(
      expectedBlocks[i].seedNumbers.sort(numericSort)
    );
    expect(seedBlock.drawPositions.sort(numericSort)).toMatchObject(
      expectedBlocks[i].drawPositions.sort(numericSort)
    );
  });
}
