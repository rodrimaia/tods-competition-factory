import tournamentEngine from '../../../tournamentEngine/sync';
import mocksEngine from '../../../mocksEngine';
import { unique } from '../../../utilities';

import { COMPASS } from '../../../constants/drawDefinitionConstants';

const scenarios = [
  { drawType: COMPASS, stageSequences: [1], roundsOfPlay: [1, 2, 3, 4, 5] },
  { drawType: COMPASS, stageSequences: [2], roundsOfPlay: [2, 3, 4, 5] },
  { drawType: COMPASS, stageSequences: [3], roundsOfPlay: [3, 4, 5] },
];
it.each(scenarios)(
  'calculates roundOfPlay for inContext matchUps',
  (scenario) => {
    const { drawType, stageSequences, roundsOfPlay } = scenario;
    const { tournamentRecord } = mocksEngine.generateTournamentRecord({
      drawProfiles: [{ drawSize: 32, drawType }],
    });

    tournamentEngine.setState(tournamentRecord);

    let matchUps = tournamentEngine.allTournamentMatchUps({
      contextFilters: { stageSequences },
    }).matchUps;
    expect(unique(matchUps.map((m) => m.roundOfPlay))).toEqual(roundsOfPlay);
  }
);
