import { setSubscriptions } from '../../../../global/state/globalState';
import { mocksEngine, tournamentEngine } from '../../../..';

import { MAIN } from '../../../../constants/drawDefinitionConstants';
import { TEAM } from '../../../../constants/eventConstants';

it('can add collectionDefinitions to tieFormat in a drawDefinition', () => {
  const {
    drawIds: [drawId],
    eventIds: [eventId],
    tournamentRecord,
  } = mocksEngine.generateTournamentRecord({
    drawProfiles: [
      { drawSize: 2, eventType: TEAM, tieFormatName: 'COLLEGE_D3' },
    ],
  });

  tournamentEngine.setState(tournamentRecord);

  const collectionDefinition = {
    collectionName: 'Mixed Doubles',
    matchUpCount: 3,
    matchUpFormat: 'SET1-S:8/TB7@7',
    matchUpType: 'DOUBLES',
    matchUpValue: 1,
  };

  // test adding to tieFormat on drawDefinition
  let result = tournamentEngine.addCollectionDefinition({
    collectionDefinition,
    drawId,
    uuids: ['a01', 'a02', 'a03'],
  });
  expect(result.tieFormat.winCriteria.valueGoal).toEqual(7);
  expect(result.addedMatchUps.length).toEqual(3);

  const matchUpIds = result.addedMatchUps.map(({ matchUpId }) => matchUpId);
  expect(matchUpIds).toEqual(['a03', 'a02', 'a01']);

  const { drawDefinition, event } = tournamentEngine.getEvent({ drawId });
  expect(drawDefinition.tieFormat.collectionDefinitions.length).toEqual(3);
  expect(drawDefinition.tieFormat.winCriteria.valueGoal).toEqual(7);
  expect(event.tieFormat.winCriteria.valueGoal).toEqual(5);

  // test errors for invalid collectionDefinitions
  // test adding to tieFormat on event
  result = tournamentEngine.addCollectionDefinition({
    collectionDefinition,
    eventId,
  });

  expect(result.addedMatchUps.length).toEqual(0);
  expect(result.tieFormat.winCriteria.valueGoal).toEqual(7);

  const collectionOrders = result.tieFormat.collectionDefinitions.map(
    ({ collectionOrder }) => collectionOrder
  );

  expect(collectionOrders).toEqual([1, 2, 3]);
});

it('can add collectionDefinitions to tieFormat in a structure', () => {
  let matchUpAddNotices = [];

  const subscriptions = {
    addMatchUps: (payload) => {
      if (Array.isArray(payload)) {
        payload.forEach(({ matchUps }) => {
          matchUpAddNotices.push(matchUps.length);
        });
      }
    },
  };

  setSubscriptions({ subscriptions });

  const {
    drawIds: [drawId],
    tournamentRecord,
  } = mocksEngine.generateTournamentRecord({
    drawProfiles: [
      { drawSize: 4, eventType: TEAM, tieFormatName: 'COLLEGE_D3' },
    ],
  });

  tournamentEngine.setState(tournamentRecord);

  expect(matchUpAddNotices).toEqual([30]);

  let { drawDefinition, event } = tournamentEngine.getEvent({ drawId });
  expect(drawDefinition.tieFormat.collectionDefinitions.length).toEqual(2);
  const structureId = drawDefinition.structures[0].structureId;

  // 3 team matchUps
  expect(drawDefinition.structures[0].matchUps.length).toEqual(3);
  // 9 tieMatchUps within each team matchUp
  expect(drawDefinition.structures[0].matchUps[0].tieMatchUps.length).toEqual(
    9
  );

  let { matchUps: firstRoundDualMatchUps } =
    tournamentEngine.allTournamentMatchUps({
      contextFilters: {
        stages: [MAIN],
      },
      matchUpFilters: {
        matchUpTypes: [TEAM],
        roundNumbers: [1],
      },
    });

  let { matchUps: secondRoundDualMatchUps } =
    tournamentEngine.allTournamentMatchUps({
      contextFilters: {
        stages: [MAIN],
      },
      matchUpFilters: {
        matchUpTypes: [TEAM],
        roundNumbers: [2],
      },
    });
  expect(secondRoundDualMatchUps[0].drawPositions).toEqual(undefined);

  expect(firstRoundDualMatchUps.length).toEqual(2);

  let outcome = {
    winningSide: 1,
    score: {
      scoreStringSide1: '8-1',
      scoreStringSide2: '1-8',
      sets: [
        {
          setNumber: 1,
          side1Score: 8,
          side2Score: 1,
          winningSide: 1,
        },
      ],
    },
  };

  firstRoundDualMatchUps[0].tieMatchUps.forEach((matchUp) => {
    const { matchUpId } = matchUp;
    let result = tournamentEngine.setMatchUpStatus({
      matchUpId,
      outcome,
      drawId,
    });
    expect(result.success).toEqual(true);
  });

  // confirm that team participant's drawPosition has advanced
  ({ matchUps: secondRoundDualMatchUps } =
    tournamentEngine.allTournamentMatchUps({
      contextFilters: {
        stages: [MAIN],
      },
      matchUpFilters: {
        matchUpTypes: [TEAM],
        roundNumbers: [2],
      },
    }));
  expect(secondRoundDualMatchUps[0].drawPositions).toEqual([1]);

  const collectionDefinition = {
    collectionName: 'Mixed Doubles',
    matchUpCount: 3,
    matchUpFormat: 'SET1-S:8/TB7@7',
    matchUpType: 'DOUBLES',
    matchUpValue: 1,
  };

  // test adding to tieFormat on drawDefinition
  let result = tournamentEngine.addCollectionDefinition({
    collectionDefinition,
    structureId,
    drawId,
    uuids: ['a01', 'a02', 'a03', 'a04', 'a05', 'a06'],
  });
  expect(result.tieFormat.winCriteria.valueGoal).toEqual(7);
  expect(result.addedMatchUps.length).toEqual(6); // because one matchUp was completed already

  const matchUpIds = result.addedMatchUps.map(({ matchUpId }) => matchUpId);
  // prettier-ignore
  expect(matchUpIds).toEqual(['a06', 'a05', 'a04', 'a03', 'a02', 'a01']);

  ({ drawDefinition, event } = tournamentEngine.getEvent({ drawId }));
  expect(drawDefinition.tieFormat.collectionDefinitions.length).toEqual(2);
  expect(event.tieFormat.winCriteria.valueGoal).toEqual(5);

  expect(
    drawDefinition.structures[0].tieFormat.collectionDefinitions.length
  ).toEqual(3);
  expect(drawDefinition.structures[0].tieFormat.winCriteria.valueGoal).toEqual(
    7
  );

  expect(matchUpAddNotices).toEqual([30, 6]);

  firstRoundDualMatchUps[1].tieMatchUps.forEach((matchUp) => {
    const { matchUpId } = matchUp;
    let result = tournamentEngine.setMatchUpStatus({
      matchUpId,
      outcome,
      drawId,
    });
    expect(result.success).toEqual(true);
  });

  // confirm that team participant's drawPosition has advanced
  ({ matchUps: secondRoundDualMatchUps } =
    tournamentEngine.allTournamentMatchUps({
      contextFilters: {
        stages: [MAIN],
      },
      matchUpFilters: {
        matchUpTypes: [TEAM],
        roundNumbers: [2],
      },
    }));
  expect(secondRoundDualMatchUps[0].drawPositions).toEqual([1, 3]);
});

it('added collectionDefinitions do not appear in inProgress matchUps', () => {
  let matchUpAddNotices = [];

  const subscriptions = {
    addMatchUps: (payload) => {
      if (Array.isArray(payload)) {
        payload.forEach(({ matchUps }) => {
          matchUpAddNotices.push(matchUps.length);
        });
      }
    },
  };

  setSubscriptions({ subscriptions });

  const {
    drawIds: [drawId],
    tournamentRecord,
  } = mocksEngine.generateTournamentRecord({
    drawProfiles: [
      { drawSize: 4, eventType: TEAM, tieFormatName: 'COLLEGE_D3' },
    ],
  });

  tournamentEngine.setState(tournamentRecord);

  expect(matchUpAddNotices).toEqual([30]);

  let { drawDefinition, event } = tournamentEngine.getEvent({ drawId });
  expect(drawDefinition.tieFormat.collectionDefinitions.length).toEqual(2);
  const structureId = drawDefinition.structures[0].structureId;

  // 3 team matchUps
  expect(drawDefinition.structures[0].matchUps.length).toEqual(3);
  // 9 tieMatchUps within each team matchUp
  expect(drawDefinition.structures[0].matchUps[0].tieMatchUps.length).toEqual(
    9
  );

  let { matchUps: firstRoundDualMatchUps } =
    tournamentEngine.allTournamentMatchUps({
      contextFilters: {
        stages: [MAIN],
      },
      matchUpFilters: {
        matchUpTypes: [TEAM],
        roundNumbers: [1],
      },
    });

  let { matchUps: secondRoundDualMatchUps } =
    tournamentEngine.allTournamentMatchUps({
      contextFilters: {
        stages: [MAIN],
      },
      matchUpFilters: {
        matchUpTypes: [TEAM],
        roundNumbers: [2],
      },
    });
  expect(secondRoundDualMatchUps[0].drawPositions).toEqual(undefined);

  expect(firstRoundDualMatchUps.length).toEqual(2);

  let outcome = {
    winningSide: 1,
    score: {
      scoreStringSide1: '8-1',
      scoreStringSide2: '1-8',
      sets: [
        {
          setNumber: 1,
          side1Score: 8,
          side2Score: 1,
          winningSide: 1,
        },
      ],
    },
  };

  const teamMatchUpId = firstRoundDualMatchUps[0].matchUpId;
  const { matchUpId } = firstRoundDualMatchUps[0].tieMatchUps[0];
  let result = tournamentEngine.setMatchUpStatus({
    matchUpId,
    outcome,
    drawId,
  });
  expect(result.success).toEqual(true);

  const collectionDefinition = {
    collectionName: 'Mixed Doubles',
    matchUpCount: 3,
    matchUpFormat: 'SET1-S:8/TB7@7',
    matchUpType: 'DOUBLES',
    matchUpValue: 1,
  };

  // test adding to tieFormat on drawDefinition
  result = tournamentEngine.addCollectionDefinition({
    updateInProgressMatchUps: false,
    collectionDefinition,
    structureId,
    drawId,
    uuids: ['a01', 'a02', 'a03', 'a04', 'a05', 'a06'],
  });
  expect(result.tieFormat.winCriteria.valueGoal).toEqual(7);
  expect(result.addedMatchUps.length).toEqual(6); // because one matchUp was in progress

  const matchUpIds = result.addedMatchUps.map(({ matchUpId }) => matchUpId);
  // prettier-ignore
  expect(matchUpIds).toEqual(['a06', 'a05', 'a04', 'a03', 'a02', 'a01']);

  ({ drawDefinition, event } = tournamentEngine.getEvent({ drawId }));
  expect(drawDefinition.tieFormat.collectionDefinitions.length).toEqual(2);
  expect(event.tieFormat.winCriteria.valueGoal).toEqual(5);

  expect(
    drawDefinition.structures[0].tieFormat.collectionDefinitions.length
  ).toEqual(3);
  expect(drawDefinition.structures[0].tieFormat.winCriteria.valueGoal).toEqual(
    7
  );

  expect(matchUpAddNotices).toEqual([30, 6]);

  // confirm that team participant's drawPosition has advanced
  ({ matchUps: firstRoundDualMatchUps } =
    tournamentEngine.allTournamentMatchUps({
      contextFilters: {
        stages: [MAIN],
      },
      matchUpFilters: {
        matchUpTypes: [TEAM],
        roundNumbers: [1],
      },
    }));

  // the tieFormat of the in progress team matchUp should not have added a collectionDefinition
  firstRoundDualMatchUps.forEach((matchUp) => {
    if (matchUp.matchUpId === teamMatchUpId) {
      expect(matchUp.tieFormat.collectionDefinitions.length).toEqual(2);
    } else {
      expect(matchUp.tieFormat.collectionDefinitions.length).toEqual(3);
    }
  });
});
