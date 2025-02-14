import competitionEngine from '../../../competitionEngine/sync';
import drawEngine from '../../../drawEngine/sync';
import mocksEngine from '../../../mocksEngine';
import tournamentEngine from '../../sync';

import POLICY_AVOIDANCE_COUNTRY from '../../../fixtures/policies/POLICY_AVOIDANCE_COUNTRY';
import SEEDING_USTA from '../../../fixtures/policies/POLICY_SEEDING_USTA';
import { QUALIFYING } from '../../../constants/drawDefinitionConstants';
import { SPLIT_WATERFALL } from '../../../constants/flightConstants';
import { INDIVIDUAL } from '../../../constants/participantConstants';
import { SEEDING } from '../../../constants/scaleConstants';
import { SINGLES } from '../../../constants/eventConstants';
import {
  MISSING_DRAW_SIZE,
  UNRECOGNIZED_DRAW_TYPE,
} from '../../../constants/errorConditionConstants';

it('can sort entries by scaleAttributes when generatingflighProfiles', () => {
  const { tournamentRecord } = mocksEngine.generateTournamentRecord();
  const eventName = 'Test Event';
  const event = { eventName, category: { categoryName: 'U18' } };
  let result = tournamentEngine.setState(tournamentRecord).addEvent({ event });
  let { event: eventResult } = result;
  const { eventId } = eventResult;
  expect(result.success).toEqual(true);

  let { tournamentParticipants } = tournamentEngine.getTournamentParticipants({
    participantFilters: { participantTypes: [INDIVIDUAL] },
  });
  const participantIds = tournamentParticipants.map((p) => p.participantId);
  result = tournamentEngine.addEventEntries({ eventId, participantIds });
  expect(result.success).toEqual(true);

  const scaleValues = [1, 2, 3, 4, 5, 6, 7, 8];
  scaleValues.forEach((scaleValue, index) => {
    let scaleItem = {
      scaleValue,
      scaleName: 'U18',
      scaleType: SEEDING,
      eventType: SINGLES,
      scaleDate: '2020-06-06',
    };
    const participantId = participantIds[index];
    let result = tournamentEngine.setParticipantScaleItem({
      participantId,
      scaleItem,
    });
    expect(result.success).toEqual(true);
  });

  const scaleAttributes = {
    scaleType: SEEDING,
    eventType: SINGLES,
    scaleName: 'U18',
  };
  participantIds.forEach((participantId, index) => {
    const { scaleItem } = tournamentEngine.getParticipantScaleItem({
      scaleAttributes,
      participantId,
    });
    if (scaleValues[index])
      expect(scaleItem.scaleValue).toEqual(scaleValues[index]);

    const result = competitionEngine.getParticipantScaleItem({
      scaleAttributes,
      participantId,
    });

    expect(result.tournamentId).toEqual(tournamentRecord.tournamentId);

    if (scaleValues[index])
      expect(result.scaleItem.scaleValue).toEqual(scaleValues[index]);
  });

  let { flightProfile } = tournamentEngine.generateFlightProfile({
    splitMethod: SPLIT_WATERFALL,
    attachFlightProfile: true,
    scaleAttributes,
    flightsCount: 2,
    eventId,
  });

  flightProfile.flights?.forEach((flight) => {
    const participantCount = flight.drawEntries.length;
    const { drawSize } = drawEngine.getEliminationDrawSize({
      participantCount,
    });
    const { seedsCount } = tournamentEngine.getSeedsCount({
      policyDefinitions: SEEDING_USTA,
      participantCount,
      drawSize,
    });
    result = tournamentEngine.generateDrawDefinition({
      drawEntries: flight.drawEntries,
      drawId: flight.drawId,
      seedsCount,
      eventId,
    });
    const drawDefinition = result.drawDefinition;
    expect(drawDefinition.structures[0].seedLimit).toEqual(seedsCount);
    expect(drawDefinition.structures[0].seedAssignments.length).toEqual(
      seedsCount
    );
    expect(
      drawDefinition.structures[0].seedAssignments.map(
        ({ seedValue }) => seedValue
      )
    ).toEqual([1, 2, 3, 4]);

    result = tournamentEngine.getEntriesAndSeedsCount({
      policyDefinitions: SEEDING_USTA,
      drawId: flight.drawId,
      eventId,
    });
    expect(result.seedsCount).toEqual(seedsCount);
    expect(result.entries.length).toEqual(drawSize);
    expect(result.stageEntries.length).toEqual(drawSize);

    result = tournamentEngine.getEntriesAndSeedsCount({
      policyDefinitions: SEEDING_USTA,
      drawId: flight.drawId,
    });
    expect(result.entries.length).toEqual(16);

    result = tournamentEngine.getEntriesAndSeedsCount({
      policyDefinitions: SEEDING_USTA,
      eventId,
    });
    expect(result.entries.length).toEqual(32);

    result = tournamentEngine.getEntriesAndSeedsCount({
      policyDefinitions: SEEDING_USTA,
      stage: QUALIFYING,
      eventId,
    });
    expect(result.error).toEqual(MISSING_DRAW_SIZE);
  });

  ({ tournamentParticipants } = tournamentEngine.getTournamentParticipants({
    withDraws: true,
  }));

  const seedValues = tournamentParticipants
    .map((participant) => participant.draws && participant.draws[0].seedValue)
    .filter(Boolean)
    .sort();

  expect(seedValues).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});

it('can constrain seedsCount by policyDefinitions', () => {
  const { tournamentRecord } = mocksEngine.generateTournamentRecord();
  const eventName = 'Test Event';
  const ageCategoryCode = 'U18';
  const event = { eventName, category: { ageCategoryCode } };
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
  result = tournamentEngine.addEventEntries({ eventId, participantIds });
  expect(result.success).toEqual(true);

  const scaleValues = [1, 2, 3, 4, 5, 6, 7, 8];
  scaleValues.forEach((scaleValue, index) => {
    let scaleItem = {
      scaleValue,
      scaleName: ageCategoryCode,
      scaleType: SEEDING,
      eventType: SINGLES,
      scaleDate: '2020-06-06',
    };
    const participantId = participantIds[index];
    let result = tournamentEngine.setParticipantScaleItem({
      participantId,
      scaleItem,
    });
    expect(result.success).toEqual(true);
  });

  const participantCount = 32;
  const drawSize = 32;

  const { seedsCount } = tournamentEngine.getSeedsCount({
    policyDefinitions: SEEDING_USTA,
    participantCount,
    drawSize,
  });

  let { drawDefinition } = tournamentEngine.generateDrawDefinition({
    seedingProfile: { groupSeedingThreshold: 5 },
    seedsCount: 100, // this is in excess of policy limit and above drawSize and stageEntries #
    drawSize,
    eventId,
  });

  expect(
    drawDefinition.structures[0].seedAssignments.map(
      ({ seedValue }) => seedValue
    )
  ).toEqual([1, 2, 3, 4, 5, 5, 5, 5]);
  expect(drawDefinition.structures[0].seedLimit).toEqual(seedsCount);

  drawDefinition = tournamentEngine.generateDrawDefinition({
    seedingProfile: { groupSeedingThreshold: 3 },
    seedsCount: 100, // this is in excess of policy limit and above drawSize and stageEntries #
    drawSize,
    eventId,
  }).drawDefinition;

  expect(
    drawDefinition.structures[0].seedAssignments.map(
      ({ seedValue }) => seedValue
    )
  ).toEqual([1, 2, 3, 3, 5, 5, 5, 5]);
  expect(drawDefinition.structures[0].seedLimit).toEqual(seedsCount);
});

it('can constrain seedsCount by policyDefinitions', () => {
  const { tournamentRecord } = mocksEngine.generateTournamentRecord();
  const eventName = 'Test Event';
  const ageCategoryCode = 'U18';
  const event = { eventName, category: { ageCategoryCode } };
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
  result = tournamentEngine.addEventEntries({ eventId, participantIds });
  expect(result.success).toEqual(true);

  const scaleValues = [1, 2, 3, 3, 5, 5, 5, 5];
  scaleValues.forEach((scaleValue, index) => {
    let scaleItem = {
      scaleValue,
      scaleName: ageCategoryCode,
      scaleType: SEEDING,
      eventType: SINGLES,
      scaleDate: '2020-06-06',
    };
    const participantId = participantIds[index];
    let result = tournamentEngine.setParticipantScaleItem({
      participantId,
      scaleItem,
    });
    expect(result.success).toEqual(true);
  });

  const drawSize = 32;
  const participantCount = 32;

  const { seedsCount } = tournamentEngine.getSeedsCount({
    policyDefinitions: SEEDING_USTA,
    participantCount,
    drawSize,
  });

  const { drawDefinition } = tournamentEngine.generateDrawDefinition({
    seedsCount: 100, // this is in excess of policy limit and above drawSize and stageEntries #
    drawSize,
    eventId,
  });

  expect(
    drawDefinition.structures[0].seedAssignments.map(
      ({ seedValue }) => seedValue
    )
  ).toEqual([1, 2, 3, 3, 5, 5, 5, 5]);
  expect(drawDefinition.structures[0].seedLimit).toEqual(seedsCount);
});

it('can define seeds using seededParticipants', () => {
  const { tournamentRecord } = mocksEngine.generateTournamentRecord();
  const eventName = 'Test Event';
  const ageCategoryCode = 'U18';
  const event = { eventName, category: { ageCategoryCode } };
  let result = tournamentEngine.setState(tournamentRecord).addEvent({ event });
  let { event: eventResult } = result;
  const { eventId } = eventResult;
  expect(result.success).toEqual(true);

  const policyDefinitions = POLICY_AVOIDANCE_COUNTRY;
  result = tournamentEngine.attachEventPolicies({ policyDefinitions, eventId });
  expect(result.success).toEqual(true);

  const { tournamentParticipants } = tournamentEngine.getTournamentParticipants(
    {
      participantFilters: { participantTypes: [INDIVIDUAL] },
    }
  );
  const participantIds = tournamentParticipants.map((p) => p.participantId);
  result = tournamentEngine.addEventEntries({ eventId, participantIds });
  expect(result.success).toEqual(true);

  const seededParticipants = participantIds
    .slice(0, 8)
    .map((participantId, i) => ({
      participantId,
      seedNumber: 8 - i,
      seedValue: 8 - i,
    }));

  let { drawDefinition } = tournamentEngine.generateDrawDefinition({
    seededParticipants,
    drawSize: 32,
    eventId,
  });
  expect(drawDefinition.structures[0].seedLimit).toEqual(8);

  // code coverage
  result = tournamentEngine.generateDrawDefinition({
    drawType: 'Bogus Draw Type',
    drawSize: 32,
    eventId,
  });
  expect(result.error).toEqual(UNRECOGNIZED_DRAW_TYPE);
});
