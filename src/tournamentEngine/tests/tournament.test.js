import { tournamentRecordWithParticipants } from './primitives/generateTournament';
import { tournamentEngine } from '../../tournamentEngine';
import { drawEngine } from '../../drawEngine';

import { eventConstants } from '../../constants/eventConstants';
import { resultConstants } from '../../constants/resultConstants';

const { SINGLES } = eventConstants;
const { SUCCESS } = resultConstants;

it('can generate a tournament with events and draws', () => {
  const { tournamentRecord, participants } = tournamentRecordWithParticipants({
    startDate: '2020-01-01',
    endDate: '2020-01-06',
    participantsCount: 32,
  });

  tournamentEngine.setState(tournamentRecord);

  const event = {
    eventName: 'Test Event',
    eventType: SINGLES,
  };

  let result = tournamentEngine.addEvent({ event });
  const { event: eventResult, success } = result;
  const { eventId } = eventResult;
  expect(success).toEqual(true);

  const participantIds = participants.map(p => p.participantId);
  result = tournamentEngine.addEventEntries({ eventId, participantIds });
  expect(result).toEqual(SUCCESS);

  const values = {
    automated: true,
    drawSize: 32,
    eventId,
    seedsCount: 8,
    event: eventResult,
  };
  const { drawDefinition } = tournamentEngine.generateDrawDefinition(values);
  const { drawId } = drawDefinition;

  result = tournamentEngine.addDrawDefinition({ eventId, drawDefinition });
  expect(result).toEqual(SUCCESS);

  drawEngine.setState(drawDefinition);
  const structureSeedAssignments = drawEngine.getSeedAssignments({});
  expect(structureSeedAssignments.length).toEqual(1);
  expect(structureSeedAssignments[0].seedAssignments.length).toEqual(8);

  result = tournamentEngine.assignSeedPositions({
    eventId,
    drawId,
  });
  expect(result?.error).toEqual('Missing assignments');

  const assignments = [
    { seedNumber: 1, seedValue: 1, participantId: participantIds[0] },
  ];
  result = tournamentEngine.assignSeedPositions({
    assignments,
    eventId,
    drawId,
  });
  expect(result?.success).toEqual(true);
});

it('can set tournament names', () => {
  let result = tournamentEngine.newTournamentRecord();
  expect(result?.success).toEqual(true);

  const tournamentName = 'CourtHive Challenge';
  result = tournamentEngine.setTournamentName({ name: tournamentName });
  expect(result?.success).toEqual(true);

  let tournamentRecord = tournamentEngine.getState();
  expect(tournamentRecord.name).toEqual(tournamentName);

  result = tournamentEngine.setTournamentName({ formalName: tournamentName });
  expect(result?.success).toEqual(true);

  tournamentRecord = tournamentEngine.getState();
  expect(tournamentRecord.formalName).toBeUndefined();

  result = tournamentEngine.setTournamentName({ formalName: 'Formal Name' });
  expect(result?.success).toEqual(true);

  tournamentRecord = tournamentEngine.getState();
  expect(tournamentRecord.formalName).toEqual('Formal Name');

  result = tournamentEngine.setTournamentName({
    promotionalName: tournamentName,
  });
  expect(result?.success).toEqual(true);

  tournamentRecord = tournamentEngine.getState();
  expect(tournamentRecord.promotionalName).toBeUndefined();

  result = tournamentEngine.setTournamentName({
    formalName: 'Promotional Name',
  });
  expect(result?.success).toEqual(true);

  tournamentRecord = tournamentEngine.getState();
  expect(tournamentRecord.formalName).toEqual('Promotional Name');
});

it('can set tournament categories', () => {
  let result = tournamentEngine.newTournamentRecord();
  expect(result?.success).toEqual(true);

  const categories = [
    {
      categoryName: 'U18',
      type: eventConstants.AGE,
    },
    {
      categoryName: 'U16',
      type: eventConstants.AGE,
    },
    {
      categoryName: 'WTN',
      type: eventConstants.RATING,
    },
    {
      categoryName: 'FAILURE',
    },
  ];
  result = tournamentEngine.setTournamentCategories({ categories });
  expect(result?.success).toEqual(true);

  const tournamentRecord = tournamentEngine.getState();
  expect(tournamentRecord.tournamentCategories.length).toEqual(3);
});
