import mocksEngine from '../../../../mocksEngine';
import tournamentEngine from '../../../../tournamentEngine/sync';
import {
  getOrderedDrawPositionPairs,
  removeAssignment,
} from '../../testingUtilities';

it('can advance participants when double BYEs are created', () => {
  const drawProfiles = [
    {
      drawSize: 8,
      participantsCount: 6,
    },
  ];
  const { drawIds, tournamentRecord } = mocksEngine.generateTournamentRecord({
    participantsProfile: { participantsCount: 32 },
    inContext: true,
    drawProfiles,
  });

  tournamentEngine.setState(tournamentRecord);
  const drawId = drawIds[0];

  let {
    drawDefinition: { structures },
  } = tournamentEngine.getEvent({ drawId });
  const structureId = structures[0].structureId;

  let { filteredOrderedPairs } = getOrderedDrawPositionPairs({ structureId });
  expect(filteredOrderedPairs.filter((p) => p && p.length)).toEqual([
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
    [1], // drawPosition 1 is BYE-advanced
    [8], // drawPosition 8 is BYE-advanced
  ]);

  removeAssignment({
    drawId,
    structureId,
    drawPosition: 3,
    replaceWithBye: true,
  });
  ({ filteredOrderedPairs } = getOrderedDrawPositionPairs({ structureId }));

  expect(filteredOrderedPairs.filter((p) => p && p.length)).toEqual([
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
    [1, 4], // drawPositions 1 and 4 are both BYE-advanced
    [8], // drawPosition 8 is BYE-advanced
  ]);

  removeAssignment({
    drawId,
    structureId,
    drawPosition: 4,
    replaceWithBye: true,
  });

  ({ filteredOrderedPairs } = getOrderedDrawPositionPairs({ structureId }));
  expect(filteredOrderedPairs).toEqual([
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
    [1, 3],
    [8],
    [1], // drawPosition 4 is now a BYE, advancing 1
  ]);

  // now remove assignment for { drawPosition: 2 }
  // expect { drawPosition: 1 } to be removed from all advanced positions
  let result = tournamentEngine.removeDrawPositionAssignment({
    drawId,
    drawPosition: 2,
    structureId,
  });
  expect(result.success).toEqual(true);
  ({ filteredOrderedPairs } = getOrderedDrawPositionPairs({ structureId }));
  expect(filteredOrderedPairs.filter((p) => p && p.length)).toEqual([
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
    [3],
    [8],
  ]);
});
