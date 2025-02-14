import { addMatchUpTimeItem } from '../../../drawEngine/governors/matchUpGovernor/timeItems';
import { findVenue } from '../../getters/venueGetter';

import { ASSIGN_VENUE } from '../../../constants/timeItemConstants';
import {
  MISSING_TOURNAMENT_RECORD,
  MISSING_MATCHUP_ID,
} from '../../../constants/errorConditionConstants';

export function assignMatchUpVenue({
  tournamentRecords,
  tournamentRecord,
  drawDefinition,
  disableNotice,
  matchUpId,
  venueId,
}) {
  if (!tournamentRecord) return { error: MISSING_TOURNAMENT_RECORD };
  if (!matchUpId) return { error: MISSING_MATCHUP_ID };

  if (venueId) {
    const { error } = findVenue({
      tournamentRecords,
      tournamentRecord,
      venueId,
    });
    if (error) return { error };
  }

  const timeItem = {
    itemType: ASSIGN_VENUE,
    itemValue: venueId,
  };

  return addMatchUpTimeItem({
    duplicateValues: false,
    tournamentRecord,
    drawDefinition,
    disableNotice,
    matchUpId,
    timeItem,
  });
}
