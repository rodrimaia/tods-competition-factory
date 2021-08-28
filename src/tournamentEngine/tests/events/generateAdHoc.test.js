import mocksEngine from '../../../mocksEngine';
import tournamentEngine from '../../sync';

import { AD_HOC, WIN_RATIO } from '../../../constants/drawDefinitionConstants';
import { INVALID_VALUES } from '../../../constants/errorConditionConstants';
import {
  ABANDONED,
  CANCELLED,
  DOUBLE_WALKOVER,
} from '../../../constants/matchUpStatusConstants';

it('can generate AD_HOC drawDefinitions', () => {
  const {
    tournamentRecord,
    drawIds: [drawId],
  } = mocksEngine.generateTournamentRecord({
    drawProfiles: [{ drawSize: 32, drawType: AD_HOC }],
  });

  tournamentEngine.setState(tournamentRecord);

  const { drawDefinition } = tournamentEngine.getEvent({ drawId });
  expect(drawDefinition.structures.length).toEqual(1);
  expect(drawDefinition.structures[0].finishingPosition).toEqual(WIN_RATIO);

  const structureId = drawDefinition.structures[0].structureId;

  let result = tournamentEngine.generateAdHocMatchUps({ drawId, structureId });
  expect(result.matchUps.length).toEqual(1);

  result = tournamentEngine.generateAdHocMatchUps({
    drawId,
    structureId,
    roundNumber: 2,
    matchUpsCount: 3,
  });
  expect(result.error).toEqual(INVALID_VALUES);

  result = tournamentEngine.generateAdHocMatchUps({
    drawId,
    structureId,
    roundNumber: 1,
    matchUpsCount: 3,
  });
  expect(result.matchUps.length).toEqual(3);

  result = tournamentEngine.addAdHocMatchUps({
    drawId,
    structureId,
    matchUps: result.matchUps,
  });
  expect(result.success).toEqual(true);

  result = tournamentEngine.generateAdHocMatchUps({
    drawId,
    structureId,
    roundNumber: 2,
    matchUpsCount: 4,
  });
  expect(result.success).toEqual(true);
  expect(result.matchUps.length).toEqual(4);
  expect(result.matchUps[0].roundNumber).toEqual(2);

  result = tournamentEngine.addAdHocMatchUps({
    drawId,
    structureId,
    matchUps: result.matchUps,
  });
  expect(result.success).toEqual(true);

  let { matchUps } = tournamentEngine.allTournamentMatchUps();
  expect(matchUps.length).toEqual(7);

  result = tournamentEngine.generateAdHocMatchUps({
    drawId,
    structureId,
    newRound: true,
    matchUpsCount: 5,
    addMatchUps: true,
  });
  expect(result.success).toEqual(true);
  expect(result.matchUps.length).toEqual(5);
  expect(result.matchUps[0].roundNumber).toEqual(3);

  ({ matchUps } = tournamentEngine.allTournamentMatchUps());
  expect(matchUps.length).toEqual(12);

  const drawPositions = matchUps
    .map(({ drawPositions }) => drawPositions)
    .flat();
  expect(Math.max(...drawPositions)).toEqual(24);

  result = tournamentEngine.getRoundMatchUps({ matchUps });
  expect(result.roundMatchUps[1].length).toEqual(3);
  expect(result.roundMatchUps[2].length).toEqual(4);
  expect(result.roundMatchUps[3].length).toEqual(5);

  let { outcome } = mocksEngine.generateOutcomeFromScoreString({
    matchUpStatus: CANCELLED,
  });
  result = tournamentEngine.setMatchUpStatus({
    matchUpId: matchUps[0].matchUpId,
    outcome,
    drawId,
  });
  expect(result.success).toEqual(true);

  ({ outcome } = mocksEngine.generateOutcomeFromScoreString({
    matchUpStatus: ABANDONED,
  }));
  result = tournamentEngine.setMatchUpStatus({
    matchUpId: matchUps[1].matchUpId,
    outcome,
    drawId,
  });
  expect(result.success).toEqual(true);

  ({ outcome } = mocksEngine.generateOutcomeFromScoreString({
    matchUpStatus: DOUBLE_WALKOVER,
  }));
  result = tournamentEngine.setMatchUpStatus({
    matchUpId: matchUps[1].matchUpId,
    outcome,
    drawId,
  });
  expect(result.success).toEqual(true);
});
