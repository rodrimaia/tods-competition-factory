import { findTournamentParticipant } from '../../getters/participantGetter';
import {
  SIGNED_IN,
  SIGN_IN_STATUS,
} from '../../../constants/participantConstants';

export function getParticipantSignInStatus({
  tournamentRecord,
  participantId,
}) {
  const { participant } = findTournamentParticipant({
    tournamentRecord,
    participantId,
  });
  if (participant && Array.isArray(participant.timeItems)) {
    const signInStatusItems = participant.timeItems
      .filter((timeItem) => timeItem.itemType === SIGN_IN_STATUS)
      // .filter((timeItem) => timeItem.itemSubject === SIGN_IN_STATUS)
      .filter((timeItem) => timeItem.createdAt)
      .sort(
        (a, b) =>
          new Date(a.createdAt || undefined) -
          new Date(b.createdAt || undefined)
      );
    const latestStatus = signInStatusItems[signInStatusItems.length - 1];
    const signedIn = latestStatus && latestStatus.itemValue === SIGNED_IN;
    return signedIn;
  }
}
