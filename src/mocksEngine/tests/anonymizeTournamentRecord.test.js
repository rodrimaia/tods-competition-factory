import { findEventExtension } from '../../tournamentEngine/governors/queryGovernor/extensionQueries';
import { intersection } from '../../utilities';
import mocksEngine from '..';
import fs from 'fs';

import { FLIGHT_PROFILE } from '../../constants/extensionConstants';
import {
  COMPASS,
  CURTIS_CONSOLATION,
  FEED_IN,
  FEED_IN_CHAMPIONSHIP_TO_SF,
  FIRST_MATCH_LOSER_CONSOLATION,
  FIRST_ROUND_LOSER_CONSOLATION,
  MODIFIED_FEED_IN_CHAMPIONSHIP,
  ROUND_ROBIN,
  ROUND_ROBIN_WITH_PLAYOFF,
} from '../../constants/drawDefinitionConstants';

const mockProfiles = [
  { drawProfiles: [{ drawSize: 32, drawType: MODIFIED_FEED_IN_CHAMPIONSHIP }] },
  { drawProfiles: [{ drawSize: 32, drawType: FIRST_ROUND_LOSER_CONSOLATION }] },
  { drawProfiles: [{ drawSize: 32, drawType: FIRST_MATCH_LOSER_CONSOLATION }] },
  { drawProfiles: [{ drawSize: 32, drawType: FEED_IN_CHAMPIONSHIP_TO_SF }] },
  { drawProfiles: [{ drawSize: 32, drawType: ROUND_ROBIN_WITH_PLAYOFF }] },
  { drawProfiles: [{ drawSize: 32, drawType: CURTIS_CONSOLATION }] },
  { drawProfiles: [{ drawSize: 32, drawType: ROUND_ROBIN }] },
  { drawProfiles: [{ drawSize: 32, drawType: COMPASS }] },
  { drawProfiles: [{ drawSize: 48, drawType: FEED_IN }] },
];

test.each(mockProfiles)('it can anonymize tournamentRecords', (mockProfile) => {
  const tournamentName = 'Demo Tournament';
  const { tournamentRecord } = mocksEngine.generateTournamentRecord({
    ...mockProfile,
    tournamentName,
  });

  const originalPersons = tournamentRecord.participants.map(
    (participant) => participant.person
  );

  const originalEventEntries = tournamentRecord.events[0].entries.map(
    ({ participantId }) => participantId
  );
  const originalDrawEntries =
    tournamentRecord.events[0].drawDefinitions[0].entries.map(
      ({ participantId }) => participantId
    );

  let { extension: flightProfile } = findEventExtension({
    event: tournamentRecord.events[0],
    name: FLIGHT_PROFILE,
  });

  const originalFlightEntries = flightProfile.value.flights[0].drawEntries.map(
    ({ participantId }) => participantId
  );

  expect(tournamentRecord.tournamentName).toEqual(tournamentName);
  let result = mocksEngine.anonymizeTournamentRecord({ tournamentRecord });
  expect(result.success).toEqual(true);

  expect(tournamentRecord.tournamentName.split(':')[0]).toEqual(`Anonymized`);

  const generatedPersons = tournamentRecord.participants.map(
    (participant) => participant.person
  );

  const originalPersonIds = originalPersons.map(({ personId }) => personId);
  const generatedPersonIds = generatedPersons.map(({ personId }) => personId);
  expect(intersection(originalPersonIds, generatedPersonIds).length).toEqual(0);

  const eventEntries = tournamentRecord.events[0].entries.map(
    ({ participantId }) => participantId
  );
  expect(intersection(originalEventEntries, eventEntries).length).toEqual(0);

  const drawEntries = tournamentRecord.events[0].drawDefinitions[0].entries.map(
    ({ participantId }) => participantId
  );
  expect(intersection(originalDrawEntries, drawEntries).length).toEqual(0);

  ({ extension: flightProfile } = findEventExtension({
    event: tournamentRecord.events[0],
    name: FLIGHT_PROFILE,
  }));
  const flightEntries = flightProfile.value.flights[0].drawEntries.map(
    ({ participantId }) => participantId
  );
  expect(intersection(originalFlightEntries, flightEntries).length).toEqual(0);
});

const sourcePath = './src/global/testHarness';
const filenames = fs
  .readdirSync(sourcePath)
  .filter((filename) => filename.indexOf('.tods.json') > 0);

it.each(filenames)(
  'can validate all tods files in testHarness directory',
  (filename) => {
    const tournamentRecord = JSON.parse(
      fs.readFileSync(`./src/global/testHarness/${filename}`, 'UTF-8')
    );

    const result = mocksEngine.anonymizeTournamentRecord({ tournamentRecord });
    expect(result.success).toEqual(true);
  }
);
