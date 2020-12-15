// import { END_TIME } from '../../../constants/timeItemConstants';

export function matchUpEndTime({ matchUp }) {
  const timeItems = matchUp.timeItems || [];

  const endTimeItem = timeItems.reduce((endTimeItem, timeItem) => {
    const endTimeCandidate = timeItem.itemType === 'SCHEDULE.TIME.END';
    // const endTimeCandidate = timeItem.itemSubject === END_TIME;
    return endTimeCandidate ? timeItem : endTimeItem;
  }, undefined);

  const endTime = endTimeItem && endTimeItem.itemValue;

  return { endTime };
}
