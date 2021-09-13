import { getUpdatedSchedulingProfile } from '../../../competitionEngine/governors/scheduleGovernor/schedulingProfile/schedulingProfile';
import { tournamentRelevantSchedulingIds } from '../../../global/validation/validSchedulingProfile';
import { getEventIdsAndDrawIds } from '../../../competitionEngine/getters/getEventIdsAndDrawIds';
import { addTournamentExtension } from '../tournamentGovernor/addRemoveExtensions';
import { findTournamentExtension } from '../queryGovernor/extensionQueries';

import { SCHEDULING_PROFILE } from '../../../constants/extensionConstants';
import {
  INVALID_VALUES,
  MISSING_TOURNAMENT_RECORD,
} from '../../../constants/errorConditionConstants';
import { SUCCESS } from '../../../constants/resultConstants';

export function setSchedulingProfile({ tournamentRecord, schedulingProfile }) {
  if (!tournamentRecord) return { error: MISSING_TOURNAMENT_RECORD };
  if (!Array.isArray(schedulingProfile)) return { error: INVALID_VALUES };

  const extension = {
    name: SCHEDULING_PROFILE,
    value: schedulingProfile,
  };
  return addTournamentExtension({ tournamentRecord, extension });
}

export function getSchedulingProfile({ tournamentRecord }) {
  if (!tournamentRecord) return { error: MISSING_TOURNAMENT_RECORD };
  const tournamentId = tournamentRecord.tournamentId;

  const { extension } = findTournamentExtension({
    tournamentRecord,
    name: SCHEDULING_PROFILE,
  });

  let schedulingProfile = extension?.value || [];

  if (schedulingProfile.length) {
    const venueIds = tournamentRecord.venues.map(
      ({ venueId, courts }) => courts?.length && venueId
    );
    const { eventIds, drawIds } = getEventIdsAndDrawIds({
      tournamentRecords: { [tournamentId]: tournamentRecord },
    });

    const { updatedSchedulingProfile, modifications, issues } =
      getUpdatedSchedulingProfile({
        schedulingProfile,
        venueIds,
        eventIds,
        drawIds,
      });

    if (modifications) {
      schedulingProfile = updatedSchedulingProfile;
      const result = setSchedulingProfile({
        tournamentRecord,
        schedulingProfile,
      });
      if (result.error) return result;

      return { schedulingProfile, modifications, issues };
    }
  }

  return { schedulingProfile, modifications: 0 };
}

export function checkSchedulingProfile({ tournamentRecord }) {
  const { schedulingProfile } = getSchedulingProfile({ tournamentRecord });
  if (schedulingProfile) {
    const { venueIds, eventIds, drawIds } = tournamentRelevantSchedulingIds({
      tournamentRecord,
      requireCourts: true,
    });
    const { updatedSchedulingProfile, modified } = getUpdatedSchedulingProfile({
      schedulingProfile,
      venueIds,
      eventIds,
      drawIds,
    });

    if (modified) {
      return setSchedulingProfile({
        tournamentRecord,
        schedulingProfile: updatedSchedulingProfile,
      });
    }
  }

  return SUCCESS;
}
