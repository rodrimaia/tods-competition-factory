import tournamentEngine from '../../sync';
import mocksEngine from '../../../mocksEngine';

import { SINGLE_ELIMINATION } from '../../../constants/drawDefinitionConstants';
import { setSubscriptions } from '../../../global/globalState';

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

  const subscriptions = {
    deletedMatchUpIds: (notices) => {
      expect(notices.length).toEqual(1);
      expect(notices[0].matchUpIds.length).toEqual(31);
    },
  };

  setSubscriptions(subscriptions);
  tournamentEngine.setState(tournamentRecord);

  let result = tournamentEngine.deleteDrawDefinitions({
    eventId,
    drawIds: [drawId],
  });
  expect(result.success).toEqual(true);

  let { timeItem } = tournamentEngine.getEventTimeItem({
    itemType: 'deleteDrawDefinitions',
    eventId,
  });
  expect(timeItem.itemValue.length).toEqual(1);
  expect(timeItem.itemValue[0].drawId).toEqual(drawId);
});
