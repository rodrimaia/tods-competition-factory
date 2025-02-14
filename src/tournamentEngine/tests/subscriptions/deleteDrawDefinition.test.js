import { setSubscriptions } from '../../../global/state/globalState';
import mocksEngine from '../../../mocksEngine';
import tournamentEngine from '../../sync';

import { SINGLE_ELIMINATION } from '../../../constants/drawDefinitionConstants';
import { AUDIT, DELETED_MATCHUP_IDS } from '../../../constants/topicConstants';
import { DRAW_DELETIONS } from '../../../constants/extensionConstants';
import {
  DRAW_DEFINITION_NOT_FOUND,
  MISSING_VALUE,
} from '../../../constants/errorConditionConstants';

it('can notify subscriber when drawDefinitions are deleted', () => {
  const drawProfiles = [
    {
      drawSize: 32,
      participantsCount: 30,
      drawType: SINGLE_ELIMINATION,
    },
  ];
  const {
    drawIds: [drawId],
    eventIds: [eventId],
    tournamentRecord,
  } = mocksEngine.generateTournamentRecord({
    drawProfiles,
    inContext: true,
  });

  let auditTrail = [];
  let notificationCounter = 0;
  const subscriptions = {
    [AUDIT]: (trail) => {
      auditTrail.push(trail);
    },
    [DELETED_MATCHUP_IDS]: (notices) => {
      notificationCounter += 1;
      expect(notices.length).toEqual(1);
      expect(notices[0].matchUpIds.length).toEqual(31);
    },
  };
  let result = setSubscriptions({ subscriptions });
  expect(result.success).toEqual(true);

  tournamentEngine.setState(tournamentRecord);

  const auditData = { userId: 'user123', reason: 'I wanted to' };

  result = tournamentEngine.deleteDrawDefinitions({
    drawIds: [],
    auditData,
  });
  expect(result.error).toEqual(MISSING_VALUE);

  result = tournamentEngine.deleteDrawDefinitions({
    eventId,
    auditData,
  });
  expect(result.success).toEqual(true);

  result = tournamentEngine.deleteDrawDefinitions({
    eventId,
    drawIds: [drawId],
    auditData,
  });
  expect(result.error).toEqual(DRAW_DEFINITION_NOT_FOUND);

  expect(notificationCounter).toEqual(1);
  expect(auditTrail.flat(Infinity)[0].payload.auditData).toEqual(auditData);

  const { event } = tournamentEngine.getEvent({ eventId });
  expect(event.extensions.length).toEqual(2);
  const deletions = event.extensions.find((x) => x.name === DRAW_DELETIONS);
  expect(deletions.value.length).toEqual(1);
});
