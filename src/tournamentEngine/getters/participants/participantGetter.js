import { findParticipant } from '../../../global/functions/deducers/findParticipant';
import { makeDeepCopy } from '../../../utilities';

import {
  MISSING_TOURNAMENT_RECORD,
  MISSING_VALUE,
} from '../../../constants/errorConditionConstants';

export function findTournamentParticipant({ tournamentRecord, participantId }) {
  const participants = tournamentRecord.participants || [];
  const participant = participants.reduce((participant, candidate) => {
    return candidate.participantId === participantId ? candidate : participant;
  }, undefined);
  return { participant };
}

export function publicFindParticipant({
  tournamentRecord,
  policyDefinitions,
  convertExtensions,
  participantId,
  inContext,
  personId,
}) {
  if (!tournamentRecord) return { error: MISSING_TOURNAMENT_RECORD };
  if (typeof participantId !== 'string' && typeof personId !== 'string')
    return { error: MISSING_VALUE };

  const tournamentParticipants = tournamentRecord.participants || [];
  const participant = findParticipant({
    tournamentParticipants,
    policyDefinitions,
    participantId,
    personId,
    inContext,
  });
  return { participant: makeDeepCopy(participant, convertExtensions, true) };
}
