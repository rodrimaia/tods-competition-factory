import { formatDate } from '../../../../utilities/dateTime';
import competitionEngineAsync from '../../../async';
import competitionEngineSync from '../../../sync';
import mocksEngine from '../../../../mocksEngine';

import { DOUBLES, TEAM } from '../../../../constants/eventConstants';
import { FEMALE, MALE } from '../../../../constants/genderConstants';
import {
  COMPASS,
  CURTIS_CONSOLATION,
  FEED_IN_CHAMPIONSHIP,
  FIRST_MATCH_LOSER_CONSOLATION,
} from '../../../../constants/drawDefinitionConstants';
import tournamentEngine from '../../../../tournamentEngine/sync';

const asyncCompetitionEngine = competitionEngineAsync(true);

const venueProfiles = [
  {
    venueId: 'cc-venue-id', // ensure consistent venueId for courts shared across tournaments
    venueName: 'Club Courts',
    venueAbbreviation: 'CC',
    startTime: '08:00',
    endTime: '20:00',
    courtsCount: 6,
    idPrefix: 'cc-court',
  },
];
const startDate = formatDate(new Date());
const mockProfiles = [
  {
    tournamentAttributes: {
      tournamentId: 'id-challenger',
    },
    tournamentName: 'Challenger',
    drawProfiles: [
      {
        eventType: DOUBLES,
        eventName: 'U18 Boys Doubles',
        category: { categoryName: 'U18' },
        timeItems: [
          { itemType: 'RETRIEVAL.RANKING.SINGLES.U18', itemValue: startDate },
        ],
        gender: MALE,
        drawSize: 16,
      },
      {
        eventName: 'U16 Girls Singles',
        category: { categoryName: 'U16' },
        timeItems: [
          { itemType: 'RETRIEVAL.RANKING.SINGLES.U16', itemValue: startDate },
        ],
        drawType: FIRST_MATCH_LOSER_CONSOLATION,
        gender: FEMALE,
        drawSize: 32,
      },
      {
        eventName: `WTN 5-8 SINGLES`,
        category: { ratingType: 'WTN', ratingMin: 5, ratingMax: 8 },
        timeItems: [
          { itemType: 'RETRIEVAL.RATING.SINGLES.WTN', itemValue: startDate },
        ],
        generate: false,
        drawSize: 32,
      },
    ],
    venueProfiles,
  },
  {
    tournamentAttributes: {
      tournamentId: 'id-championships',
    },
    tournamentName: 'Championships',
    drawProfiles: [
      {
        eventName: 'U18 Girls Singles',
        category: { categoryName: 'U18' },
        timeItems: [
          { itemType: 'RETRIEVAL.RANKING.SINGLES.U18', itemValue: startDate },
        ],
        drawType: FEED_IN_CHAMPIONSHIP,
        gender: FEMALE,
        drawSize: 32,
      },
      {
        eventName: 'U16 Boys Singles',
        category: { categoryName: 'U16' },
        timeItems: [
          { itemType: 'RETRIEVAL.RANKING.SINGLES.U16', itemValue: startDate },
        ],
        drawType: COMPASS,
        gender: MALE,
        drawSize: 16,
      },
    ],
    venueProfiles,
  },
  {
    tournamentAttributes: {
      tournamentId: 'id-dominant-duo',
    },
    tournamentName: 'Dominant Duo',
    drawProfiles: [
      {
        eventName: 'Duo Draw',
        tieFormatName: 'DOMINANT_DUO',
        eventType: TEAM,
        drawSize: 8,
      },
    ],
    venueProfiles,
  },
  {
    tournamentAttributes: {
      tournamentId: 'id-dual',
    },
    tournamentName: 'Dual Match',
    drawProfiles: [{ eventName: 'Team Event', eventType: TEAM, drawSize: 2 }],
    venueProfiles,
  },
  {
    tournamentAttributes: {
      tournamentId: 'id-advanced-scheduling',
    },
    tournamentName: 'Advanced Scheduling',
    drawProfiles: [
      {
        eventName: 'U18 Girls Singles',
        category: { categoryName: 'U18' },
        timeItems: [
          { itemType: 'RETRIEVAL.RANKING.SINGLES.U18', itemValue: startDate },
        ],
        drawType: CURTIS_CONSOLATION,
        participantsCount: 58,
        gender: FEMALE,
        drawSize: 64,
      },
      {
        eventName: 'U18 Boys Singles',
        category: { categoryName: 'U18' },
        timeItems: [
          { itemType: 'RETRIEVAL.RANKING.SINGLES.U18', itemValue: startDate },
        ],
        drawType: CURTIS_CONSOLATION,
        participantsCount: 58,
        gender: MALE,
        drawSize: 64,
      },
      {
        eventName: 'U16 Girls Singles',
        category: { categoryName: 'U16' },
        timeItems: [
          { itemType: 'RETRIEVAL.RANKING.SINGLES.U16', itemValue: startDate },
        ],
        participantsCount: 58,
        drawType: COMPASS,
        gender: FEMALE,
        drawSize: 64,
      },
      {
        eventName: 'U16 Boys Singles',
        category: { categoryName: 'U16' },
        timeItems: [
          { itemType: 'RETRIEVAL.RANKING.SINGLES.U16', itemValue: startDate },
        ],
        participantsCount: 58,
        drawType: COMPASS,
        gender: MALE,
        drawSize: 64,
      },
    ],
    venueProfiles: [
      {
        venueId: 'cc-venue-id',
        venueName: 'Club Courts',
        venueAbbreviation: 'CLB',
        startTime: '08:00',
        endTime: '20:00',
        courtsCount: 6,
        idPrefix: 'cc-court',
      },
      {
        venueId: 'cty-venue-id',
        venueName: 'City Courts',
        venueAbbreviation: 'CTY',
        startTime: '08:00',
        endTime: '20:00',
        courtsCount: 12,
        idPrefix: 'cty-court',
      },
      {
        venueId: 'cps-venue-id',
        venueName: 'Campus Courts',
        venueAbbreviation: 'CPS',
        startTime: '08:00',
        endTime: '20:00',
        courtsCount: 10,
        idPrefix: 'cps-court',
      },
    ],
  },
];

test.each([competitionEngineSync, asyncCompetitionEngine])(
  'will add venue to linked tournament when scheduling courts which are not present on both tournaments',
  async (competitionEngine) => {
    for (const mockProfile of mockProfiles) {
      const { tournamentRecord } =
        mocksEngine.generateTournamentRecord(mockProfile);
      await competitionEngine.setTournamentRecord(tournamentRecord);
    }
    await competitionEngine.linkTournaments();
    tournamentEngine.setTournamentId('id-challenger');
    let { venues } = tournamentEngine.getVenuesAndCourts();
    expect(venues.length).toEqual(1);

    const { courts } = await competitionEngine.getVenuesAndCourts();
    const court = courts.find(({ courtId }) => courtId === 'cps-court-1');
    expect(court).not.toBeUndefined();

    const { upcomingMatchUps } = await competitionEngine.competitionMatchUps({
      contextFilters: { tournamentIds: ['id-challenger'] },
    });
    let courtMatchUps = upcomingMatchUps.filter(
      (matchUp) => matchUp.schedule?.courtId === 'cps-court-1'
    );
    expect(courtMatchUps.length).toEqual(0);

    const targetMatchUp = upcomingMatchUps[0];
    const { drawId, eventId, matchUpId, structureId, tournamentId } =
      targetMatchUp;
    const sourceMatchUpContextIds = {
      tournamentId,
      structureId,
      matchUpId,
      eventId,
      drawId,
    };

    let result = await competitionEngine.matchUpScheduleChange({
      targetCourtId: 'cps-court-1',
      sourceMatchUpContextIds,
    });
    expect(result.success).toEqual(true);

    tournamentEngine.setTournamentId('id-challenger');
    venues = tournamentEngine.getVenuesAndCourts().venues;
    expect(venues.length).toEqual(2);

    result = await competitionEngine.competitionMatchUps({
      contextFilters: { tournamentIds: ['id-challenger'] },
    });
    courtMatchUps = result.upcomingMatchUps.filter(
      (matchUp) => matchUp.schedule?.courtId === 'cps-court-1'
    );
    expect(courtMatchUps.length).toEqual(1);
  }
);
