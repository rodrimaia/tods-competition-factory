import { drawEngine } from '../../sync';
import { mocksEngine } from '../../..';

import { SUCCESS } from '../../../constants/resultConstants';
import { DOUBLES } from '../../../constants/matchUpTypes';

it('can check-in and check-out matchUp participants', () => {
  const { tournamentRecord } = mocksEngine.generateTournamentRecord({
    drawProfiles: [
      { drawSize: 32, eventType: DOUBLES, matchUpFormat: 'SET3-S:6/TB7' },
    ],
  });
  const drawDefinition = tournamentRecord.events[0].drawDefinitions[0];

  drawEngine.setState(drawDefinition);
  drawEngine.setParticipants(tournamentRecord.participants);
  const { matchUps } = drawEngine.allDrawMatchUps();
  const matchUp = matchUps[0];
  const { matchUpId } = matchUp;

  const { sideParticipantIds, individualParticipantIds } =
    drawEngine.getMatchUpParticipantIds({ matchUp });
  expect(sideParticipantIds.length).toEqual(2);
  expect(individualParticipantIds.length).toEqual(4);

  let result = drawEngine.checkInParticipant({
    matchUpId,
    participantId: individualParticipantIds[0],
  });
  expect(result).toMatchObject(SUCCESS);

  let { matchUp: updatedMatchUp } = drawEngine.findMatchUp({
    matchUpId,
    inContext: true,
  });
  expect(updatedMatchUp.timeItems.length).toEqual(1);
  expect(updatedMatchUp.timeItems[0].itemValue).toEqual(
    individualParticipantIds[0]
  );

  let { allParticipantsCheckedIn, checkedInParticipantIds } =
    drawEngine.getCheckedInParticipantIds({ matchUp: updatedMatchUp });
  expect(allParticipantsCheckedIn).toEqual(false);
  expect(checkedInParticipantIds.length).toEqual(1);

  result = drawEngine.checkInParticipant({
    matchUpId,
    participantId: individualParticipantIds[1],
  });
  expect(result).toMatchObject(SUCCESS);

  // after checking in the first two individual participants the first side participant
  // should also be in checkedInParticipantIds
  ({ matchUp: updatedMatchUp } = drawEngine.findMatchUp({
    matchUpId,
    inContext: true,
  }));
  ({ allParticipantsCheckedIn, checkedInParticipantIds } =
    drawEngine.getCheckedInParticipantIds({ matchUp: updatedMatchUp }));
  expect(allParticipantsCheckedIn).toEqual(false);
  expect(checkedInParticipantIds.length).toEqual(3);

  // check in the second side (but not the individual participants)
  result = drawEngine.checkInParticipant({
    matchUpId,
    participantId: sideParticipantIds[1],
  });
  expect(result).toMatchObject(SUCCESS);

  // since the second side is checked in, individual participants for second side should be considered checked in
  ({ matchUp: updatedMatchUp } = drawEngine.findMatchUp({
    matchUpId,
    inContext: true,
  }));
  ({ allParticipantsCheckedIn, checkedInParticipantIds } =
    drawEngine.getCheckedInParticipantIds({ matchUp: updatedMatchUp }));
  expect(allParticipantsCheckedIn).toEqual(true);
  expect(checkedInParticipantIds.length).toEqual(6);

  ({ matchUp: updatedMatchUp } = drawEngine.findMatchUp({
    matchUpId,
    inContext: true,
  }));
  expect(updatedMatchUp.timeItems.length).toEqual(3);

  // attempt to check in a participant which is already checked in...
  result = drawEngine.checkInParticipant({
    matchUpId,
    participantId: sideParticipantIds[0],
  });
  expect(result).toHaveProperty('error');

  result = drawEngine.checkOutParticipant({
    matchUpId,
    participantId: sideParticipantIds[0],
  });
  expect(result).toMatchObject(SUCCESS);

  ({ matchUp: updatedMatchUp } = drawEngine.findMatchUp({
    matchUpId,
    inContext: true,
  }));
  ({ allParticipantsCheckedIn, checkedInParticipantIds } =
    drawEngine.getCheckedInParticipantIds({ matchUp: updatedMatchUp }));
  expect(allParticipantsCheckedIn).toEqual(false);
  expect(checkedInParticipantIds.length).toEqual(3);

  expect(updatedMatchUp.timeItems.length).toEqual(6);
});
