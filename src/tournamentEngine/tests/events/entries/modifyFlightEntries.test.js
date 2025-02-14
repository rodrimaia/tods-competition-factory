import mocksEngine from '../../../../mocksEngine';
import tournamentEngine from '../../../sync';
import {
  getParticipantId,
  getParticipantIds,
} from '../../../../global/functions/extractors';

import { ALTERNATE } from '../../../../constants/entryStatusConstants';
import { INDIVIDUAL } from '../../../../constants/participantConstants';
import {
  EVENT_NOT_FOUND,
  EXISTING_PARTICIPANT_DRAW_POSITION_ASSIGNMENT,
  MISSING_DRAW_ID,
  MISSING_PARTICIPANT_IDS,
} from '../../../../constants/errorConditionConstants';

it('will modify flight.drawEntries when no drawDefinition is present', () => {
  const participantsProfile = {
    participantsCount: 40,
  };
  const { tournamentRecord } = mocksEngine.generateTournamentRecord({
    participantsProfile,
  });

  const eventName = 'Test Event';
  const event = { eventName };
  let result = tournamentEngine.setState(tournamentRecord).addEvent({ event });
  let { event: eventResult } = result;
  const { eventId } = eventResult;
  expect(result.success).toEqual(true);

  const { tournamentParticipants } = tournamentEngine.getTournamentParticipants(
    {
      participantFilters: { participantTypes: [INDIVIDUAL] },
    }
  );
  const participantIds = tournamentParticipants.map((p) => p.participantId);

  // taking 36 of 40 participants to generate 3 flights of 12
  result = tournamentEngine.addEventEntries({
    eventId,
    participantIds: participantIds.slice(0, 36),
  });
  expect(result.success).toEqual(true);

  let { flightProfile } = tournamentEngine.generateFlightProfile({
    attachFlightProfile: true,
    flightsCount: 3,
    eventId,
  });
  expect(flightProfile.flights.length).toEqual(3);
  expect(
    flightProfile.flights.map(({ drawEntries }) => drawEntries.length)
  ).toEqual([12, 12, 12]);
  expect(flightProfile.flights.every(({ drawId }) => drawId));

  const drawIds = flightProfile.flights.map(({ drawId }) => drawId);
  const drawId = drawIds[0];

  const participantIdsToAdd = participantIds.slice(36, 38);

  // adding draw entries will fail becuase the participantIds are not in event.entries
  result = tournamentEngine.addDrawEntries({
    eventId,
    drawId,
    participantIds: participantIdsToAdd,
  });
  expect(result.error).not.toBeUndefined();

  // participants can be added to the event and draw at the same time
  result = tournamentEngine.addEventEntries({
    eventId,
    drawId,
    participantIds: participantIdsToAdd,
  });
  expect(result.success).toEqual(true);

  result = tournamentEngine.addDrawEntries({
    drawId: 'bogusId',
    participantIds: participantIdsToAdd,
  });
  expect(result.error).toEqual(EVENT_NOT_FOUND);

  ({ flightProfile } = tournamentEngine.getFlightProfile({ eventId }));
  expect(flightProfile.flights[0].drawEntries.length).toEqual(14);

  let firstFlightParticipantIds = flightProfile.flights[0].drawEntries.map(
    ({ participantId }) => participantId
  );
  const participantIdsToRemove = firstFlightParticipantIds.slice(0, 2);
  result = tournamentEngine.removeDrawEntries({
    eventId,
    drawId,
    participantIds: participantIdsToRemove,
  });
  expect(result.success).toEqual(true);

  ({ flightProfile } = tournamentEngine.getFlightProfile({ eventId }));
  const firstFlightEntries = flightProfile.flights[0].drawEntries;
  expect(firstFlightEntries.length).toEqual(12);

  const maxEntryPosition = tournamentEngine.getMaxEntryPosition({
    entries: firstFlightEntries,
  });
  expect(maxEntryPosition).toEqual(12);

  flightProfile.flights?.forEach((flight) => {
    const { drawDefinition } = tournamentEngine.generateDrawDefinition({
      drawEntries: flight.drawEntries,
      drawId: flight.drawId,
      eventId,
    });
    result = tournamentEngine.addDrawDefinition({ eventId, drawDefinition });
    expect(result.success).toEqual(true);
  });

  firstFlightParticipantIds = getParticipantIds(firstFlightEntries);

  // confirm error when missing { drawId }
  result = tournamentEngine.removeDrawEntries({
    eventId,
    participantIds: firstFlightParticipantIds,
  });
  expect(result.error).toEqual(MISSING_DRAW_ID);

  // confirm error when missing { participantIds }
  result = tournamentEngine.removeDrawEntries({
    eventId,
    drawId,
  });
  expect(result.error).toEqual(MISSING_PARTICIPANT_IDS);

  result = tournamentEngine.removeDrawEntries({
    eventId,
    drawId,
    participantIds: firstFlightParticipantIds,
  });
  expect(result.error).toEqual(EXISTING_PARTICIPANT_DRAW_POSITION_ASSIGNMENT);
});

it('can remove entries from drawDefinitions if they are not positioned', () => {
  const {
    tournamentRecord,
    eventIds: [eventId],
    drawIds: [drawId],
  } = mocksEngine.generateTournamentRecord({
    drawProfiles: [{ drawSize: 32, participantsCount: 20 }],
  });

  tournamentEngine.setState(tournamentRecord);

  let { drawDefinition, event } = tournamentEngine.getEvent({ drawId });
  const eventAlternateIds = event.entries
    .filter(({ entryStatus }) => entryStatus === ALTERNATE)
    .map(getParticipantId);
  expect(eventAlternateIds.length).toEqual(12);

  let result = tournamentEngine.addDrawEntries({
    participantIds: eventAlternateIds,
    entryStatus: ALTERNATE,
    drawId,
  });
  expect(result.success).toEqual(true);

  drawDefinition = tournamentEngine.getEvent({ drawId }).drawDefinition;
  const drawAlternateIds = drawDefinition.entries
    .filter(({ entryStatus }) => entryStatus === ALTERNATE)
    .map(getParticipantId);
  expect(drawAlternateIds.length).toEqual(12);

  result = tournamentEngine.removeDrawEntries({
    participantIds: drawAlternateIds,
    eventId,
    drawId,
  });
  expect(result.success).toEqual(true);
});
