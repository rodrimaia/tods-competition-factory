import { getMatchUpScheduleDetails as drawEngineGetMatchUpScheduleDetails } from '../../../drawEngine/accessors/matchUpAccessor/getMatchUpScheduleDetails';
import { getPolicyDefinitions } from '../../../global/functions/deducers/getAppliedPolicies';
import { getMaxEntryPosition } from '../../../global/functions/deducers/getMaxEntryPosition';
import { isValid } from '../../../matchUpEngine/governors/matchUpFormatGovernor/isValid';
import { getMatchUpCompetitiveness } from '../../getters/getMatchUpCompetitiveness';
import { participantScheduledMatchUps } from './participantScheduledMatchUps';
import { getPositionAssignments } from '../../getters/getPositionAssignments';
import { participantScaleItem } from '../../accessors/participantScaleItem';
import { getPredictiveAccuracy } from '../../getters/getPredictiveAccuracy';
import { getVenuesAndCourts, findVenue } from '../../getters/venueGetter';
import { getCourts, publicFindCourt } from '../../getters/courtGetter';
import { getParticipantScaleItem } from './getParticipantScaleItem';
import { getMatchUpFormat } from '../../getters/getMatchUpFormat';
import { getMatchUpsStats } from '../../getters/getMatchUpsStats';
import { getEvent, getEvents } from '../../getters/eventGetter';
import { matchUpActions } from '../../getters/matchUpActions';
import { bulkUpdatePublishedEventIds } from './publishState';
import { getParticipantSignInStatus } from './signInStatus';
import { getTieFormat } from '../../getters/getTieFormat';
import { getEventProperties } from './getEventProperties';
import { getRoundMatchUps } from './getRoundMatchUps';
import { credits } from '../../../fixtures/credits';
import { positionActions } from './positionQueries';
import { makeDeepCopy } from '../../../utilities';
import {
  publicFindMatchUp,
  allTournamentMatchUps,
  tournamentMatchUps,
  allEventMatchUps,
  allDrawMatchUps,
  eventMatchUps,
  drawMatchUps,
} from '../../getters/matchUpsGetter';
import {
  findEventExtension,
  findTournamentExtension,
  findParticipantExtension,
  findDrawDefinitionExtension,
} from './extensionQueries';
import {
  getEventTimeItem,
  getTournamentTimeItem,
  getParticipantTimeItem,
  getDrawDefinitionTimeItem,
} from './timeItems';

import { MISSING_TOURNAMENT_RECORD } from '../../../constants/errorConditionConstants';

function getDrawDefinition({ tournamentRecord, drawDefinition }) {
  if (!tournamentRecord) return { error: MISSING_TOURNAMENT_RECORD };
  return { drawDefinition: makeDeepCopy(drawDefinition) };
}

const queryGovernor = {
  allTournamentMatchUps,
  tournamentMatchUps,
  allEventMatchUps,
  getRoundMatchUps,
  allDrawMatchUps,
  eventMatchUps,
  drawMatchUps,
  credits,

  getEvent,
  getEvents,

  findEventExtension,
  findTournamentExtension,
  findParticipantExtension,
  findDrawDefinitionExtension,

  getTieFormat,
  getMatchUpFormat,
  getDrawDefinition,
  getEventProperties,
  getPositionAssignments,
  isValidMatchUpFormat: isValid,

  getMaxEntryPosition,
  getMatchUpCompetitiveness,

  findVenue,
  getCourts,
  getVenuesAndCourts,
  findCourt: publicFindCourt,

  getEventTimeItem,
  getTournamentTimeItem,
  getParticipantTimeItem,
  getDrawDefinitionTimeItem,

  bulkUpdatePublishedEventIds,

  matchUpActions,
  positionActions,
  findMatchUp: publicFindMatchUp,
  participantScheduledMatchUps,
  getPredictiveAccuracy,
  getMatchUpsStats,

  participantScaleItem,
  getParticipantScaleItem,
  getParticipantSignInStatus,

  getPolicyDefinitions,

  // pass through accessors
  getMatchUpScheduleDetails: drawEngineGetMatchUpScheduleDetails,
};

export default queryGovernor;
