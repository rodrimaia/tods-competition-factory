import { getAppliedPolicies } from '../../../global/functions/deducers/getAppliedPolicies';
import { eventConstants } from '../../../constants/eventConstants';
import { drawEngine } from '../../../drawEngine/sync';
import mocksEngine from '../../../mocksEngine';
import { tournamentEngine } from '../../sync';

import { MISSING_ASSIGNMENTS } from '../../../constants/errorConditionConstants';
import SEEDING_ITF_POLICY from '../../../fixtures/policies/POLICY_SEEDING_ITF';

const { SINGLES } = eventConstants;

it('can aggrgate participant finishingPositions', () => {
  const { tournamentRecord } = mocksEngine.generateTournamentRecord({
    participantsProfile: { participantsCount: 14 },
  });

  const { participants } = tournamentRecord;
  tournamentEngine.setState(tournamentRecord);

  const event = {
    eventName: 'Test Event',
    eventType: SINGLES,
  };

  let result = tournamentEngine.addEvent({ event });
  const { event: eventResult, success } = result;
  const { eventId } = eventResult;
  expect(success).toEqual(true);

  const participantIds = participants.map((p) => p.participantId);
  result = tournamentEngine.addEventEntries({ eventId, participantIds });
  expect(result.success).toEqual(true);

  const values = {
    policyDefinitions: { ...SEEDING_ITF_POLICY },
    event: eventResult,
    automated: true,
    seedsCount: 4,
    drawSize: 16,
    eventId,
  };
  const { drawDefinition } = tournamentEngine.generateDrawDefinition(values);
  const { drawId } = drawDefinition;

  result = tournamentEngine.addDrawDefinition({ eventId, drawDefinition });
  expect(result.success).toEqual(true);

  drawEngine.setState(drawDefinition);

  const { extensions } = drawDefinition;
  expect(extensions.length).toEqual(2);
  const { appliedPolicies } = getAppliedPolicies({ drawDefinition });
  expect(appliedPolicies.seeding.policyName).toEqual('ITF SEEDING');

  // find main structureId more intelligently
  const mainStructureId = drawDefinition.structures[0].structureId;

  const { seedAssignments } = drawEngine.getStructureSeedAssignments({
    structureId: mainStructureId,
  });
  expect(seedAssignments.length).toEqual(4);

  result = tournamentEngine.assignSeedPositions({
    structureId: mainStructureId,
    eventId,
    drawId,
  });
  expect(result?.error).toEqual(MISSING_ASSIGNMENTS);

  let { matchUps } = tournamentEngine.allTournamentMatchUps();

  const outcomes = [
    [1, 2, 1],
    [1, 3, 2],
    [1, 4, 2],
    [1, 5, 1],
    [1, 6, 2],
    [1, 7, 1],
    [2, 1, 1],
    [2, 2, 1],
    [2, 3, 2],
    [2, 4, 2],
    [3, 1, 1],
    [3, 2, 1],
    [4, 1, 1],
  ];

  outcomes.forEach((outcome) => {
    const [roundNumber, roundPosition, winningSide] = outcome;
    scoreMatchUp({
      roundNumber,
      roundPosition,
      matchUps,
      winningSide,
      drawId,
    });
  });

  let idMap = tournamentEngine.getParticipantIdFinishingPositions({
    drawId,
  });

  ({ matchUps } = tournamentEngine.allTournamentMatchUps());

  const expectations = [
    { roundNumber: 1, finishingPositionRange: [9, 16] },
    { roundNumber: 2, finishingPositionRange: [5, 8] },
    { roundNumber: 3, finishingPositionRange: [3, 4] },
    { roundNumber: 4, finishingPositionRange: [2, 2] },
  ];

  expectations.forEach(({ roundNumber, finishingPositionRange }) => {
    const losingParticipantIds = getRoundLosingParticipantIds({
      matchUps,
      roundNumber,
    });
    losingParticipantIds.forEach((id) => {
      expect(idMap[id].finishingPositionRange).toEqual(finishingPositionRange);
    });
  });
});

function getRoundLosingParticipantIds({ matchUps, roundNumber }) {
  return matchUps
    .filter(
      (matchUp) => matchUp.roundNumber === roundNumber && matchUp.winningSide
    )
    .map(
      ({ winningSide, sides }) =>
        sides.find(({ sideNumber }) => sideNumber !== winningSide).participantId
    );
}

function scoreMatchUp({
  roundNumber,
  roundPosition,
  matchUps,
  drawId,
  winningSide,
}) {
  const matchUp = matchUps.find(
    (matchUp) =>
      matchUp.roundNumber === roundNumber &&
      matchUp.roundPosition === roundPosition
  );
  const { matchUpId } = matchUp || {};
  const result = tournamentEngine.setMatchUpStatus({
    drawId,
    matchUpId,
    outcome: { winningSide },
  });
  expect(result.success).toEqual(true);
}
