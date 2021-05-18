import mocksEngine from '../../../mocksEngine';
import tournamentEngineSync from '../../sync';
import tournamentEngineAsync from '../../async';

import { INDIVIDUAL } from '../../../constants/participantTypes';

const asyncTournamentEngine = tournamentEngineAsync();

test.each([tournamentEngineSync, asyncTournamentEngine])(
  'can create flightProfile on addDrawDefinition',
  async (tournamentEngine) => {
    await mocksEngine.generateTournamentRecord({ tournamentEngine });
    const eventName = 'Test Event';
    const event = { eventName };
    let result = await tournamentEngine.addEvent({ event });
    let { event: eventResult } = result;
    expect(result.success).toEqual(true);

    const { eventId } = eventResult;

    const { tournamentParticipants } =
      await tournamentEngine.getTournamentParticipants({
        participantFilters: { participantTypes: [INDIVIDUAL] },
      });
    const participantIds = tournamentParticipants.map((p) => p.participantId);
    result = await tournamentEngine.addEventEntries({
      eventId,
      participantIds,
    });
    expect(result.success).toEqual(true);

    const { drawDefinition } = await tournamentEngine.generateDrawDefinition({
      eventId,
    });
    result = await tournamentEngine.addDrawDefinition({
      eventId,
      drawDefinition,
    });
    expect(result.success).toEqual(true);

    let { flightProfile } = await tournamentEngine.getFlightProfile({
      eventId,
    });
    expect(flightProfile.flights.length).toEqual(1);
  }
);
