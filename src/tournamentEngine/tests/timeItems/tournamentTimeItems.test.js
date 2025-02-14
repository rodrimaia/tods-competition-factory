import mocksEngine from '../../../mocksEngine';
import tournamentEngine from '../../sync';

import { MODIFICATION } from '../../../constants/timeItemConstants';
import {
  INVALID_TIME_ITEM,
  MISSING_TIME_ITEM,
  NOT_FOUND,
} from '../../../constants/errorConditionConstants';

it('can add and read timeItems from events', () => {
  const { tournamentRecord } = mocksEngine.generateTournamentRecord({
    startDate: '2021-01-01',
    endDate: '2021-01-06',
  });

  tournamentEngine.setState(tournamentRecord);

  let timeItem = undefined;
  let result = tournamentEngine.addTournamentTimeItem({ timeItem });
  expect(result.error).toEqual(MISSING_TIME_ITEM);

  timeItem = {
    itemType: MODIFICATION,
  };
  result = tournamentEngine.addTournamentTimeItem({ timeItem });
  expect(result.error).toEqual(INVALID_TIME_ITEM);

  timeItem = {
    itemType: 'MODIFICATION.CONTENT',
  };
  result = tournamentEngine.addTournamentTimeItem({ timeItem });
  expect(result.error).toEqual(INVALID_TIME_ITEM);

  let itemValue = '2021-01-01T00:00';
  timeItem = {
    itemType: 'MODIFICATION.CONTENT',
    itemValue,
  };
  result = tournamentEngine.addTournamentTimeItem({ timeItem });
  expect(result.success).toEqual(true);

  timeItem = {
    itemType: 'MODIFICATION.CONTENT',
    itemValue,
  };
  result = tournamentEngine.addTournamentTimeItem({
    timeItem,
  });
  expect(result.success).toEqual(true);

  itemValue = '2021-01-02T00:00';
  timeItem = {
    itemType: 'MODIFICATION.CONTENT',
    itemValue,
  };
  result = tournamentEngine.addTournamentTimeItem({ timeItem });
  expect(result.success).toEqual(true);

  let {
    timeItem: retrievedTimeItem,
    previousItems,
    info,
  } = tournamentEngine.getTournamentTimeItem({
    itemType: 'MODIFICATION.CONTENT',
    returnPreviousValues: true,
  });
  expect(retrievedTimeItem.itemValue).toEqual(itemValue);
  expect(previousItems.length).toEqual(2);
  expect(info).toEqual(undefined);

  ({
    timeItem: retrievedTimeItem,
    info,
    previousItems,
  } = tournamentEngine.getTournamentTimeItem({
    itemType: 'MODIFICATION.OTHER',
  }));
  expect(retrievedTimeItem).toEqual(undefined);
  expect(info).toEqual(NOT_FOUND);
});

it('can prevent duplicates when equialent to existing itemValue', () => {
  const { tournamentRecord } = mocksEngine.generateTournamentRecord({
    startDate: '2021-01-01',
    endDate: '2021-01-06',
  });

  tournamentEngine.setState(tournamentRecord);

  let timeItem = undefined;
  let itemValue = '2021-01-01T00:00';
  timeItem = {
    itemType: 'MODIFICATION.CONTENT',
    itemValue,
  };
  let result = tournamentEngine.addTournamentTimeItem({ timeItem });
  expect(result.success).toEqual(true);

  timeItem = {
    itemType: 'MODIFICATION.CONTENT',
    itemValue,
  };
  result = tournamentEngine.addTournamentTimeItem({
    timeItem,
    duplicateValues: false,
  });
  expect(result.success).toEqual(true);

  itemValue = '2021-01-02T00:00';
  timeItem = {
    itemType: 'MODIFICATION.CONTENT',
    itemValue,
  };
  result = tournamentEngine.addTournamentTimeItem({ timeItem });
  expect(result.success).toEqual(true);

  let {
    timeItem: retrievedTimeItem,
    previousItems,
    info,
  } = tournamentEngine.getTournamentTimeItem({
    itemType: 'MODIFICATION.CONTENT',
    returnPreviousValues: true,
  });
  expect(retrievedTimeItem.itemValue).toEqual(itemValue);
  expect(previousItems.length).toEqual(1);
  expect(info).toEqual(undefined);

  // now test where the duplicate values are not sequential
  // should add the duplicate value because it is not the "current" value at the time of addition
  itemValue = '2021-01-01T00:00';
  timeItem = {
    itemType: 'MODIFICATION.OTHER',
    itemValue,
  };
  result = tournamentEngine.addTournamentTimeItem({ timeItem });
  expect(result.success).toEqual(true);

  itemValue = '2021-01-02T00:00';
  timeItem = {
    itemType: 'MODIFICATION.OTHER',
    itemValue,
  };
  result = tournamentEngine.addTournamentTimeItem({
    timeItem,
    duplicateValues: false,
  });
  expect(result.success).toEqual(true);

  itemValue = '2021-01-01T00:00';
  timeItem = {
    itemType: 'MODIFICATION.OTHER',
    itemValue,
  };
  result = tournamentEngine.addTournamentTimeItem({ timeItem });
  expect(result.success).toEqual(true);

  ({
    timeItem: retrievedTimeItem,
    previousItems,
    info,
  } = tournamentEngine.getTournamentTimeItem({
    itemType: 'MODIFICATION.OTHER',
    returnPreviousValues: true,
  }));
  expect(retrievedTimeItem.itemValue).toEqual(itemValue);
  expect(previousItems.length).toEqual(2);
  expect(info).toEqual(undefined);

  // expect the retrieved itemValue to equal the initial itemValue
  expect(retrievedTimeItem.itemValue).toEqual(previousItems[0].itemValue);
  // expect the retrieved itemValue NOT to equal the latest itemValue
  expect(retrievedTimeItem.itemValue).not.toEqual(previousItems[1].itemValue);
});
