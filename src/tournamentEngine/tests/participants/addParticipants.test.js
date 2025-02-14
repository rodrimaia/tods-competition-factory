import tournamentEngine from '../../sync';

import { INDIVIDUAL, PAIR } from '../../../constants/participantConstants';
import { COMPETITOR } from '../../../constants/participantRoles';
import { UUID } from '../../../utilities';
import {
  INVALID_PARTICIPANT_TYPE,
  MISSING_PARTICIPANT_ROLE,
  MISSING_PERSON_DETAILS,
} from '../../../constants/errorConditionConstants';

it('can add multiple participants at once', () => {
  let result = tournamentEngine.newTournamentRecord();
  expect(result?.success).toEqual(true);
  const participantId = UUID();

  let participant = {
    participantId,
    participantRole: COMPETITOR,
    person: {
      standardFamilyName: 'Family',
      standardGivenName: 'Given',
    },
  };

  result = tournamentEngine.addParticipants({
    participants: [participant],
  });
  expect(result.error).toEqual(INVALID_PARTICIPANT_TYPE);

  participant = {
    participantId,
    participantType: INDIVIDUAL,
    person: {
      standardFamilyName: 'Family',
      standardGivenName: 'Given',
    },
  };

  result = tournamentEngine.addParticipants({
    participants: [participant],
  });
  expect(result.error).toEqual(MISSING_PARTICIPANT_ROLE);

  participant = {
    participantId,
    participantType: INDIVIDUAL,
    participantRole: COMPETITOR,
    person: {
      standardGivenName: 'Given',
    },
  };

  result = tournamentEngine.addParticipants({
    participants: [participant],
  });
  expect(result.error).toEqual(MISSING_PERSON_DETAILS);

  participant = {
    participantId,
    participantType: INDIVIDUAL,
    participantRole: COMPETITOR,
    person: {
      standardFamilyName: 'Family',
      standardGivenName: 'Given',
    },
  };

  result = tournamentEngine.addParticipants({
    participants: [participant],
  });
  expect(result.success).toEqual(true);

  participant = {
    participantId,
    participantType: INDIVIDUAL,
    participantRole: COMPETITOR,
    person: {
      standardFamilyName: 'Family',
      standardGivenName: 'Given',
    },
  };

  result = tournamentEngine.addParticipants({
    participants: [participant],
  });
  expect(result.success).toEqual(true);
  expect(result.info).not.toBeUndefined();

  const participant2 = {
    participantType: INDIVIDUAL,
    participantRole: COMPETITOR,
    person: {
      standardFamilyName: 'Family',
      standardGivenName: 'Given',
    },
  };

  result = tournamentEngine.addParticipants({
    participants: [participant, participant2],
  });
  expect(result.success).toEqual(true);
  expect(result.notAdded.length).toEqual(1);
  expect(result.info).not.toBeUndefined();

  let { tournamentParticipants } = tournamentEngine.getTournamentParticipants();
  expect(tournamentParticipants.length).toEqual(2);

  const individualParticipantIds = tournamentParticipants.map(
    (participant) => participant.participantId
  );

  const participant3 = {
    participantType: PAIR,
    participantRole: COMPETITOR,
    individualParticipantIds,
  };

  result = tournamentEngine.addParticipants({
    participants: [participant, participant2, participant3],
  });
  expect(result.success).toEqual(true);
  expect(result.notAdded.length).toEqual(2);

  ({ tournamentParticipants } = tournamentEngine.getTournamentParticipants());
  expect(tournamentParticipants.length).toEqual(3);
});
