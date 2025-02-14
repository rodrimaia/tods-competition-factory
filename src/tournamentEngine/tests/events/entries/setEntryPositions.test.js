import mocksEngine from '../../../../mocksEngine';
import tournamentEngine from '../../../sync';

import {
  INVALID_VALUES,
  MISSING_PARTICIPANT_ID,
} from '../../../../constants/errorConditionConstants';
import {
  ALTERNATE,
  DIRECT_ACCEPTANCE,
} from '../../../../constants/entryStatusConstants';

it('can set entryPositions', () => {
  const drawProfiles = [
    {
      drawSize: 32,
      participantsCount: 30,
    },
  ];
  const {
    drawIds: [drawId],
    eventIds: [eventId],
    tournamentRecord,
  } = mocksEngine.generateTournamentRecord({
    inContext: true,
    drawProfiles,
  });

  tournamentEngine.setState(tournamentRecord);

  let {
    event: { entries },
  } = tournamentEngine.getEvent({ eventId });
  let alternates = entries.filter((entry) => entry.entryStatus === ALTERNATE);
  expect(alternates.length).toEqual(2);

  // don't accept non-integer values
  let entryPositions = [
    { participantId: alternates[0].participantId, entryPosition: 'x' },
    { participantId: alternates[1].participantId, entryPosition: 'y' },
  ];
  let result = tournamentEngine.setEntryPositions({
    tournamentEngine,
    entryPositions,
    eventId,
  });
  expect(result.error).toEqual(INVALID_VALUES);

  result = tournamentEngine.setEntryPositions({
    tournamentEngine,
    eventId,
    drawId,
  });
  expect(result.error).toEqual(INVALID_VALUES);

  // code coverage for single participant
  result = tournamentEngine.setEntryPosition({
    tournamentEngine,
    eventId,
    drawId,
  });
  expect(result.error).toEqual(MISSING_PARTICIPANT_ID);

  // expect success
  entryPositions = [
    { participantId: alternates[0].participantId, entryPosition: 1 },
    { participantId: alternates[1].participantId, entryPosition: 2 },
  ];
  result = tournamentEngine.setEntryPositions({
    tournamentEngine,
    entryPositions,
    eventId,
  });
  expect(result.success).toEqual(true);

  ({
    event: { entries },
  } = tournamentEngine.getEvent({ eventId }));
  alternates = entries.filter((entry) => entry.entryStatus === ALTERNATE);
  expect(alternates[0].entryPosition).toEqual(1);
  expect(alternates[1].entryPosition).toEqual(2);

  const [firstAlternate, secondAlternate] = alternates;

  result = tournamentEngine.promoteAlternate({
    tournamentEngine,
    eventId,
  });
  expect(result.success).toEqual(true);

  ({
    event: { entries },
  } = tournamentEngine.getEvent({ eventId }));
  alternates = entries.filter((entry) => entry.entryStatus === ALTERNATE);
  expect(alternates[0].entryPosition).toEqual(1);
  expect(secondAlternate.participantId).toEqual(alternates[0].participantId);

  const directAcceptanceParticipantIds = entries
    .filter((entry) => entry.entryStatus === DIRECT_ACCEPTANCE)
    .map((entry) => entry.participantId);
  expect(
    directAcceptanceParticipantIds.includes(firstAlternate.participantId)
  ).toEqual(true);

  // be able to set entryPosition to undefined
  entryPositions = [
    { participantId: alternates[0].participantId, entryPosition: undefined },
  ];
  result = tournamentEngine.setEntryPositions({
    tournamentEngine,
    entryPositions,
    eventId,
  });
  expect(result.success).toEqual(true);

  entryPositions = [
    { participantId: alternates[0].participantId, entryPosition: 0 },
  ];
  result = tournamentEngine.setEntryPositions({
    tournamentEngine,
    entryPositions,
    eventId,
  });
  expect(result.success).toEqual(true);
});
