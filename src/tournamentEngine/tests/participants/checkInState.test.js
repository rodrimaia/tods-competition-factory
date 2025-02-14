import drawEngine from '../../../drawEngine/sync';
import mocksEngine from '../../../mocksEngine';
import tournamentEngine from '../../sync';

import { ELIMINATION } from '../../../constants/drawDefinitionConstants';
import { PAIR } from '../../../constants/participantConstants';
import { SUCCESS } from '../../../constants/resultConstants';
import { DOUBLES } from '../../../constants/eventConstants';
import { MALE } from '../../../constants/genderConstants';
import {
  INVALID_PARTICIPANT_ID,
  MISSING_MATCHUP_ID,
  MISSING_PARTICIPANT_ID,
  PARTICIPANT_NOT_CHECKED_IN,
} from '../../../constants/errorConditionConstants';

it('can check participants in and out', () => {
  const participantsProfile = {
    participantsCount: 16,
    participantType: PAIR,
    sex: MALE,
  };
  const drawProfiles = [
    {
      drawSize: 16,
      eventType: DOUBLES,
      participantsCount: 14,
      drawType: ELIMINATION,
      outcomes: [
        {
          roundNumber: 1,
          roundPosition: 2,
          scoreString: '6-2 6-1',
          winningSide: 1,
        },
      ],
    },
  ];
  let {
    tournamentRecord,
    drawIds: [drawId],
  } = mocksEngine.generateTournamentRecord({
    drawProfiles,
    participantsProfile,
  });

  let result = tournamentEngine.setState(tournamentRecord);
  expect(result.success).toEqual(true);

  let {
    upcomingMatchUps: [matchUp],
  } = tournamentEngine.drawMatchUps({
    drawId,
    inContext: true,
  });
  const { sideParticipantIds, individualParticipantIds } =
    drawEngine.getMatchUpParticipantIds({ matchUp });

  result = tournamentEngine.checkInParticipant({
    drawId,
    matchUpId: matchUp.matchUpId,
    participantId: individualParticipantIds[0],
  });
  expect(result).toMatchObject(SUCCESS);

  result = tournamentEngine.checkInParticipant({
    matchUp,
    participantId: individualParticipantIds[0],
  });
  expect(result).toMatchObject(SUCCESS);

  result = tournamentEngine.checkInParticipant({
    matchUp,
    participantId: 'bogusId',
  });
  expect(result.error).toEqual(INVALID_PARTICIPANT_ID);

  ({
    upcomingMatchUps: [matchUp],
  } = tournamentEngine.drawMatchUps({
    drawId,
    inContext: true,
  }));
  let { allParticipantsCheckedIn, checkedInParticipantIds } =
    drawEngine.getCheckedInParticipantIds({ matchUp });
  expect(allParticipantsCheckedIn).toEqual(false);
  expect(checkedInParticipantIds.length).toEqual(1);

  result = tournamentEngine.checkInParticipant({
    drawId,
    matchUpId: matchUp.matchUpId,
    participantId: individualParticipantIds[0],
  });
  expect(result.error).toBeUndefined();
  expect(result).toMatchObject(SUCCESS);

  ({
    upcomingMatchUps: [matchUp],
  } = tournamentEngine.drawMatchUps({
    drawId,
    inContext: true,
  }));
  ({ allParticipantsCheckedIn, checkedInParticipantIds } =
    drawEngine.getCheckedInParticipantIds({ matchUp }));
  expect(allParticipantsCheckedIn).toEqual(false);
  expect(checkedInParticipantIds.length).toEqual(1);

  result = tournamentEngine.checkInParticipant({
    drawId,
    matchUpId: matchUp.matchUpId,
    participantId: individualParticipantIds[1],
  });
  expect(result).toMatchObject(SUCCESS);

  ({
    upcomingMatchUps: [matchUp],
  } = tournamentEngine.drawMatchUps({
    drawId,
    inContext: true,
  }));
  ({ allParticipantsCheckedIn, checkedInParticipantIds } =
    drawEngine.getCheckedInParticipantIds({ matchUp }));
  expect(allParticipantsCheckedIn).toEqual(false);
  // checkedInParticipantIds.length is 3 becuase of 2 individualParticipantIds and their pair participantId
  expect(checkedInParticipantIds.length).toEqual(3);

  result = tournamentEngine.checkInParticipant({
    drawId,
    matchUpId: matchUp.matchUpId,
    participantId: individualParticipantIds[2],
  });
  expect(result).toMatchObject(SUCCESS);

  ({
    upcomingMatchUps: [matchUp],
  } = tournamentEngine.drawMatchUps({
    drawId,
    inContext: true,
  }));
  ({ allParticipantsCheckedIn, checkedInParticipantIds } =
    drawEngine.getCheckedInParticipantIds({ matchUp }));
  expect(allParticipantsCheckedIn).toEqual(false);
  expect(checkedInParticipantIds.length).toEqual(4);

  result = tournamentEngine.checkInParticipant({
    drawId,
    matchUpId: matchUp.matchUpId,
    participantId: individualParticipantIds[3],
  });
  expect(result).toMatchObject(SUCCESS);

  ({
    upcomingMatchUps: [matchUp],
  } = tournamentEngine.drawMatchUps({
    drawId,
    inContext: true,
  }));
  ({ allParticipantsCheckedIn, checkedInParticipantIds } =
    drawEngine.getCheckedInParticipantIds({ matchUp }));
  expect(allParticipantsCheckedIn).toEqual(true);
  expect(checkedInParticipantIds.length).toEqual(6);

  // now check out one pair participant
  result = tournamentEngine.checkOutParticipant({
    drawId,
    matchUpId: matchUp.matchUpId,
    participantId: sideParticipantIds[0],
  });
  expect(result).toMatchObject(SUCCESS);

  ({
    upcomingMatchUps: [matchUp],
  } = tournamentEngine.drawMatchUps({
    drawId,
    inContext: true,
  }));
  ({ allParticipantsCheckedIn, checkedInParticipantIds } =
    drawEngine.getCheckedInParticipantIds({ matchUp }));
  expect(allParticipantsCheckedIn).toEqual(false);
  expect(checkedInParticipantIds.length).toEqual(3);

  // now checkout one individual participant
  result = tournamentEngine.checkOutParticipant({
    drawId,
    matchUpId: matchUp.matchUpId,
    participantId: checkedInParticipantIds[0],
  });
  expect(result).toMatchObject(SUCCESS);

  result = tournamentEngine.checkOutParticipant({
    drawId,
    participantId: checkedInParticipantIds[0],
  });
  expect(result.error).toEqual(MISSING_MATCHUP_ID);
  result = tournamentEngine.checkOutParticipant({
    matchUp,
  });
  expect(result.error).toEqual(MISSING_PARTICIPANT_ID);
  result = tournamentEngine.checkOutParticipant({
    matchUp,
    participantId: checkedInParticipantIds[0],
  });
  expect(result.error).toEqual(PARTICIPANT_NOT_CHECKED_IN);

  ({
    upcomingMatchUps: [matchUp],
  } = tournamentEngine.drawMatchUps({
    drawId,
    inContext: true,
  }));
  ({ allParticipantsCheckedIn, checkedInParticipantIds } =
    drawEngine.getCheckedInParticipantIds({ matchUp }));
  expect(allParticipantsCheckedIn).toEqual(false);
  // count has changed from 3 to 1 because removing an individual participantId also removed pair participantId
  expect(checkedInParticipantIds.length).toEqual(1);
});
