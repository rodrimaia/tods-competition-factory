import { makeDeepCopy } from '../../../../utilities';

import {
  GROUP,
  INDIVIDUAL,
  PAIR,
  TEAM,
} from '../../../../constants/participantTypes';

export function addParticipantGroupings({ participants = [] }) {
  const participantsWithGroupings = makeDeepCopy(participants, true, true);
  const teamParticipants = participantsWithGroupings.filter(
    (participant) => participant.participantType === TEAM
  );
  const groupParticipants = participantsWithGroupings.filter(
    (participant) => participant.participantType === GROUP
  );

  // should pairParticipants only consider those that are in the same event as current draw?
  // TODO: this requires access to the parent event which is not currently in scope
  const pairParticipants = participantsWithGroupings.filter(
    (participant) => participant.participantType === PAIR
  );

  participantsWithGroupings.forEach((participant) => {
    if (participant.participantType === INDIVIDUAL) {
      const { participantId } = participant;
      participant.teams = [];
      participant.teamParticipantIds = [];
      participant.groups = [];
      participant.groupParticipantIds = [];
      participant.pairParticipantIds = [];

      teamParticipants.forEach((team) => {
        (team?.individualParticipantIds || []).forEach(
          (individualParticipantId) => {
            if (individualParticipantId === participantId) {
              participant.teamParticipantIds.push(team.participantId);
              participant.teams.push({
                participantName: team.participantName,
                participantId: team.participantId,
              });
            }
          }
        );
      });
      pairParticipants.forEach((pair) => {
        (pair?.individualParticipantIds || []).forEach(
          (individualParticipantId) => {
            if (individualParticipantId === participantId) {
              participant.pairParticipantIds.push(pair.participantId);
            }
          }
        );
      });
      groupParticipants.forEach((group) => {
        (group?.individualParticipantIds || []).forEach(
          (individualParticipantId) => {
            if (individualParticipantId === participantId) {
              participant.groupParticipantIds.push(group.participantId);
              participant.groups.push({
                participantName: group.participantName,
                participantId: group.participantId,
              });
            }
          }
        );
      });
    }
  });

  return participantsWithGroupings;
}
