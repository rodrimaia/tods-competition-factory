import { addParticipantScaleItem } from "./scaleItems";
import { participantScaleItem } from 'competitionFactory/tournamentEngine/accessors/participantScaleItem';

import { RANKING, RATING } from "competitionFactory/constants/participantConstants";
import { SUCCESS } from "competitionFactory/constants/resultConstants";

export function rankByRatings({tournamentRecord, participantIds, category, eventType}) {
  const relevantParticipants = (tournamentRecord.participants || [])
    .filter(p => participantIds.includes(p.participantId));

  const participantRating = participant => {
    const scaleAttributes = {
      scaleType: RATING,
      scaleName: category,
      eventType: eventType
    };
    
    const { scaleItem } = participantScaleItem({participant, scaleAttributes});
    return scaleItem && scaleItem.scaleValue;
  };

  const ratingSort = (a, b) => (b.rating || 0) - (a.rating || 0);

  const sortedParticipantIds = relevantParticipants
    .map(p => ({ participantId: p.participantId, rating: participantRating(p) }))
    .filter(p=>p.rating)
    .sort(ratingSort)
    .map((p, i) => ({ [p.participantId]: i+1 }));

  const idMap = Object.assign({}, ...sortedParticipantIds);

  let modifiedParticipants = 0;
  relevantParticipants.forEach(participant => {
    const ranking = idMap[participant.participantId];
    let scaleItem = {
        scaleValue: ranking,
        scaleName: category,
        scaleType: RANKING,
        eventType: eventType,
    };

    const result = addParticipantScaleItem({participant, scaleItem});
    if (result && result.success) modifiedParticipants++;
  });

  if (modifiedParticipants) return SUCCESS;
};
