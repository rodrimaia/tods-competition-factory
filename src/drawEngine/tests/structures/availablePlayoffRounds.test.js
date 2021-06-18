import { getAvailablePlayoffRounds } from '../../governors/structureGovernor/getAvailablePlayoffRounds';
import { reset, initialize, mainDrawPositions } from '../primitives/primitives';
import tournamentEngine from '../../../tournamentEngine/sync';
import mocksEngine from '../../../mocksEngine';
import { drawEngine } from '../../sync';

import {
  CONSOLATION,
  FEED_IN,
  FEED_IN_CHAMPIONSHIP,
  FIRST_MATCH_LOSER_CONSOLATION,
  MAIN,
} from '../../../constants/drawDefinitionConstants';

it('can correctly determine positions playedOff for STANDARD_ELIMINATION', () => {
  reset();
  initialize();
  mainDrawPositions({ drawSize: 16 });
  const result = drawEngine.devContext(true).generateDrawType();
  expect(result.success).toEqual(true);

  const { drawDefinition } = drawEngine.getState();

  const {
    structure: { structureId },
  } = result;

  const { playoffRounds, playoffRoundsRanges } = getAvailablePlayoffRounds({
    drawDefinition,
    structureId,
  });
  expect(playoffRounds).toEqual([1, 2, 3]);
  expect(playoffRoundsRanges[0]).toEqual({
    roundNumber: 1,
    finishingPositionRange: '9-16',
    finishingPositions: [9, 10, 11, 12, 13, 14, 15, 16],
  });
  expect(playoffRoundsRanges[1]).toEqual({
    roundNumber: 2,
    finishingPositionRange: '5-8',
    finishingPositions: [5, 6, 7, 8],
  });
  expect(playoffRoundsRanges[2]).toEqual({
    roundNumber: 3,
    finishingPositionRange: '3-4',
    finishingPositions: [3, 4],
  });
});

it('can correctly determine positions playedOff for FIRST_MATCH_LOSER_CONSOLATION', () => {
  reset();
  initialize();
  mainDrawPositions({ drawSize: 16 });
  const result = drawEngine.devContext(true).generateDrawType({
    drawType: FIRST_MATCH_LOSER_CONSOLATION,
  });
  expect(result.success).toEqual(true);

  const {
    mainStructure: { structureId },
  } = result;

  const { drawDefinition } = drawEngine.getState();

  const { playoffRounds, playoffRoundsRanges, positionsPlayedOff } =
    getAvailablePlayoffRounds({
      drawDefinition,
      structureId,
    });

  expect(positionsPlayedOff).toEqual([1, 2, 9, 10]);

  // NOTE: Change was made to allow FMLC playoff round from 2nd round MAIN
  expect(playoffRounds).toEqual([2, 3]);
  expect(playoffRoundsRanges).toEqual([
    {
      roundNumber: 2,
      finishingPositions: [5, 6, 7, 8],
      finishingPositionRange: '5-8',
    },
    {
      roundNumber: 3,
      finishingPositions: [3, 4],
      finishingPositionRange: '3-4',
    },
  ]);
  /*
  expect(playoffRoundsRanges[0]).toEqual({
    roundNumber: 3,
    finishingPositionRange: '3-4',
    finishingPositions: [3, 4],
  });
  */
});

it('can accurately determine no playoff rounds available for MAIN draw of FIC', () => {
  const drawProfiles = [
    {
      drawSize: 64,
      drawType: FEED_IN_CHAMPIONSHIP,
    },
  ];
  const {
    drawIds: [drawId],
    tournamentRecord,
  } = mocksEngine.generateTournamentRecord({ drawProfiles });

  const { drawDefinition } = tournamentEngine
    .setState(tournamentRecord)
    .getEvent({ drawId });

  const {
    structures: [mainStructure],
  } = drawEngine
    .setState(drawDefinition)
    .getDrawStructures({ stage: MAIN, stageSequence: 1 });

  const { structureId } = mainStructure;
  const result = tournamentEngine.getAvailablePlayoffRounds({
    drawDefinition,
    structureId,
  });
  expect(result.playoffRounds).toEqual([]);
});

it('can accurately determine available playoff rounds for CONSOLATION draw of FIC', () => {
  const drawProfiles = [
    {
      drawSize: 64,
      drawType: FEED_IN_CHAMPIONSHIP,
    },
  ];
  const {
    drawIds: [drawId],
    tournamentRecord,
  } = mocksEngine.generateTournamentRecord({ drawProfiles });

  const { drawDefinition } = tournamentEngine
    .setState(tournamentRecord)
    .getEvent({ drawId });

  const {
    structures: [consolationStructure],
  } = drawEngine
    .setState(drawDefinition)
    .getDrawStructures({ stage: CONSOLATION, stageSequence: 1 });

  const { structureId } = consolationStructure;
  const result = tournamentEngine.getAvailablePlayoffRounds({
    drawDefinition,
    structureId,
  });
  expect(result.playoffRounds).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});

it('can generate only specified playoff rounds and give them custom names', () => {
  const drawProfiles = [
    {
      drawSize: 64,
      drawType: FEED_IN_CHAMPIONSHIP,
    },
  ];
  const {
    drawIds: [drawId],
    tournamentRecord,
  } = mocksEngine.devContext(true).generateTournamentRecord({ drawProfiles });

  const { drawDefinition } = tournamentEngine
    .setState(tournamentRecord)
    .getEvent({ drawId });

  const {
    structures: [consolationStructure],
  } = drawEngine
    .setState(drawDefinition)
    .getDrawStructures({ stage: CONSOLATION, stageSequence: 1 });

  const { structureId } = consolationStructure;

  const playoffAttributes = {
    '0-2': { name: 'BRONZE', abbreviation: 'B' },
  };
  const result = tournamentEngine.devContext(true).addPlayoffStructures({
    drawId,
    structureId,
    exitProfileLimit: true,
    roundNumbers: [2],
    playoffAttributes,
  });
  const structureNames = result.drawDefinition.structures.map(
    (s) => s.structureName
  );
  expect(structureNames).toEqual(['MAIN', 'CONSOLATION', 'BRONZE']);
  expect(result.drawDefinition.links.length).toEqual(7);
});

it('can use roundProfiles to specify depth of playoff structures', () => {
  const drawProfiles = [
    {
      drawSize: 64,
      drawType: FEED_IN_CHAMPIONSHIP,
    },
  ];
  const {
    drawIds: [drawId],
    tournamentRecord,
  } = mocksEngine.devContext(true).generateTournamentRecord({ drawProfiles });

  const { drawDefinition } = tournamentEngine
    .setState(tournamentRecord)
    .getEvent({ drawId });

  const {
    structures: [consolationStructure],
  } = drawEngine
    .setState(drawDefinition)
    .getDrawStructures({ stage: CONSOLATION, stageSequence: 1 });

  const { structureId } = consolationStructure;

  // in this case a playoff structure is being added to a consolstion structure
  const result = tournamentEngine.devContext(true).addPlayoffStructures({
    drawId,
    structureId,
    exitProfileLimit: true,
    roundProfiles: [{ 2: 1 }],
  });
  expect(result.drawDefinition.structures.length).toEqual(3);
  expect(result.drawDefinition.links.length).toEqual(7);
});

it('can determine playoff structures available from playoff structures', () => {
  // generate a standard elimination draw
  const drawProfiles = [
    {
      drawSize: 64,
    },
  ];
  const {
    drawIds: [drawId],
    tournamentRecord,
  } = mocksEngine.generateTournamentRecord({ drawProfiles });

  tournamentEngine.setState(tournamentRecord);

  let { drawDefinition } = tournamentEngine.getEvent({ drawId });

  const mainStructure = drawDefinition.structures[0];
  let { structureId } = mainStructure;

  let { playoffRoundsRanges } = tournamentEngine.getAvailablePlayoffRounds({
    drawId,
    structureId,
  });

  const fourthRound = playoffRoundsRanges.find(
    ({ roundNumber }) => roundNumber === 4
  );
  expect(fourthRound.finishingPositionRange).toEqual('5-8');

  const result = tournamentEngine.addPlayoffStructures({
    drawId,
    structureId,
    exitProfileLimit: true,
    roundProfiles: [{ 4: 1 }],
  });
  expect(result.success).toEqual(true);

  ({ drawDefinition } = tournamentEngine.getEvent({ drawId }));
  expect(drawDefinition.structures.length).toEqual(2);
  expect(drawDefinition.structures[1].structureName).toEqual('5-8');

  ({ structureId } = drawDefinition.structures[1]);

  ({ playoffRoundsRanges } = tournamentEngine
    .devContext(true)
    .getAvailablePlayoffRounds({
      drawId,
      structureId,
    }));

  expect(playoffRoundsRanges.length).toEqual(1);
  expect(playoffRoundsRanges[0].finishingPositionRange).toEqual('7-8');
});

it('can determine available playoff rounds for CONSOLATION draw of FEED_IN', () => {
  const drawProfiles = [
    {
      drawSize: 56,
      drawType: FEED_IN,
    },
  ];
  const {
    drawIds: [drawId],
    tournamentRecord,
  } = mocksEngine.generateTournamentRecord({ drawProfiles });

  const { drawDefinition } = tournamentEngine
    .setState(tournamentRecord)
    .getEvent({ drawId });

  const {
    structures: [mainStructure],
  } = drawEngine
    .setState(drawDefinition)
    .getDrawStructures({ stage: MAIN, stageSequence: 1 });

  const { structureId } = mainStructure;
  const { playoffRounds } = tournamentEngine.getAvailablePlayoffRounds({
    drawDefinition,
    structureId,
  });
  expect(playoffRounds).toEqual([1, 2, 3, 4, 5, 6]);
});
