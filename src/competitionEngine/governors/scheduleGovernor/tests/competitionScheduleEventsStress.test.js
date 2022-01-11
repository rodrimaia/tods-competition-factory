import { mocksEngine, tournamentEngine } from '../../../..';
import competitionEngine from '../../../sync';

test('competitionSchedule performance 30 events', () => {
  const venueId = 'venueId';
  const venueProfiles = [{ venueId, courtsCount: 40 }];
  // prettier-ignore
  const drawProfiles = [
    { drawId: 'd1', drawSize: 16, uniqueParticipants: true }, { drawId: 'd2', drawSize: 16, uniqueParticipants: true },
    { drawId: 'd3', drawSize: 16, uniqueParticipants: true }, { drawId: 'd4', drawSize: 16, uniqueParticipants: true },
    { drawId: 'd5', drawSize: 16, uniqueParticipants: true }, { drawId: 'd6', drawSize: 16, uniqueParticipants: true },
    { drawId: 'd7', drawSize: 16, uniqueParticipants: true }, { drawId: 'd8', drawSize: 16, uniqueParticipants: true },
    { drawId: 'd9', drawSize: 16, uniqueParticipants: true }, { drawId: 'd10', drawSize: 16, uniqueParticipants: true },
    { drawId: 'd11', drawSize: 16, uniqueParticipants: true }, { drawId: 'd12', drawSize: 16, uniqueParticipants: true },
    { drawId: 'd13', drawSize: 16, uniqueParticipants: true }, { drawId: 'd14', drawSize: 16, uniqueParticipants: true },
    { drawId: 'd15', drawSize: 16, uniqueParticipants: true }, { drawId: 'd16', drawSize: 16, uniqueParticipants: true },
    { drawId: 'd17', drawSize: 16, uniqueParticipants: true }, { drawId: 'd18', drawSize: 16, uniqueParticipants: true },
    { drawId: 'd19', drawSize: 16, uniqueParticipants: true }, { drawId: 'd20', drawSize: 16, uniqueParticipants: true },
    { drawId: 'd21', drawSize: 16, uniqueParticipants: true }, { drawId: 'd22', drawSize: 16, uniqueParticipants: true },
    { drawId: 'd23', drawSize: 16, uniqueParticipants: true }, { drawId: 'd24', drawSize: 16, uniqueParticipants: true },
    { drawId: 'd25', drawSize: 16, uniqueParticipants: true }, { drawId: 'd26', drawSize: 16, uniqueParticipants: true },
    { drawId: 'd27', drawSize: 16, uniqueParticipants: true }, { drawId: 'd28', drawSize: 16, uniqueParticipants: true },
    { drawId: 'd29', drawSize: 16, uniqueParticipants: true }, { drawId: 'd30', drawSize: 16, uniqueParticipants: true } ];

  const startDate = '2022-01-01';

  const schedulingProfile = [
    {
      scheduleDate: startDate,
      venues: [
        {
          venueId,
          rounds: [
            { drawId: 'd1', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd2', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd3', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd4', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd5', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd6', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd7', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd8', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd9', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd10', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd11', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd12', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd13', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd14', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd15', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd16', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd17', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd18', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd19', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd20', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd21', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd22', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd23', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd24', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd25', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd26', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd27', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd28', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd29', winnerFinishingPositionRange: '1-8' },
            { drawId: 'd30', winnerFinishingPositionRange: '1-8' },
          ],
        },
      ],
    },
  ];

  const genStart = Date.now();
  const { scheduledRounds, tournamentRecord } =
    mocksEngine.generateTournamentRecord({
      autoSchedule: true,
      schedulingProfile,
      venueProfiles,
      drawProfiles,
      startDate,
    });
  const genTime = Date.now() - genStart;

  let result = tournamentEngine.setState(tournamentRecord);
  expect(result).not.toBeUndefined();

  expect(scheduledRounds.length).toEqual(30);

  const queryStart = Date.now();
  const matchUpFilters = { scheduledDate: startDate };
  result = competitionEngine.competitionScheduleMatchUps({
    matchUpFilters,
  });
  const elapsed = Date.now() - queryStart;
  console.log({ genTime, elapsed });
  expect(result.dateMatchUps.length).toEqual(240);
});

test('competitionSchedule performance 4 events', () => {
  const venueId = 'venueId';
  const venueProfiles = [{ venueId, courtsCount: 40 }];
  // prettier-ignore
  const drawProfiles = [
    { drawId: 'd1', drawSize: 128, uniqueParticipants: true }, { drawId: 'd2', drawSize: 128, uniqueParticipants: true },
    { drawId: 'd3', drawSize: 128, uniqueParticipants: true }, { drawId: 'd4', drawSize: 128, uniqueParticipants: true }];

  const startDate = '2022-01-01';

  const schedulingProfile = [
    {
      scheduleDate: startDate,
      venues: [
        {
          venueId,
          rounds: [
            { drawId: 'd1', winnerFinishingPositionRange: '1-64' },
            { drawId: 'd2', winnerFinishingPositionRange: '1-64' },
            { drawId: 'd3', winnerFinishingPositionRange: '1-64' },
            { drawId: 'd4', winnerFinishingPositionRange: '1-64' },
          ],
        },
      ],
    },
  ];

  const genStart = Date.now();
  const { scheduledRounds, tournamentRecord } =
    mocksEngine.generateTournamentRecord({
      autoSchedule: true,
      schedulingProfile,
      venueProfiles,
      drawProfiles,
      startDate,
    });
  const genTime = Date.now() - genStart;

  let result = tournamentEngine.setState(tournamentRecord);
  expect(result).not.toBeUndefined();

  expect(scheduledRounds.length).toEqual(4);

  const queryStart = Date.now();
  const matchUpFilters = { scheduledDate: startDate };
  result = competitionEngine.competitionScheduleMatchUps({
    matchUpFilters,
  });
  const elapsed = Date.now() - queryStart;
  console.log({ genTime, elapsed });
  expect(result.dateMatchUps.length).toEqual(256);
});
