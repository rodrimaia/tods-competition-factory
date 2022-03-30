import { getAllStructureMatchUps } from '../../../getters/getMatchUps/getAllStructureMatchUps';
import { generateCollectionMatchUps } from '../../../generators/tieMatchUps';
import { calculateWinCriteria } from './calculateWinCriteria';
import { makeDeepCopy, UUID } from '../../../../utilities';
import { getTieFormat } from './getTieFormat';
import {
  addMatchUpsNotice,
  modifyDrawNotice,
} from '../../../notifications/drawNotifications';
import {
  validateCollectionDefinition,
  validateTieFormat,
} from './tieFormatUtilities';

import { COMPLETED } from '../../../../constants/matchUpStatusConstants';
import { SUCCESS } from '../../../../constants/resultConstants';
import { TEAM } from '../../../../constants/matchUpTypes';
import {
  DUPLICATE_VALUE,
  INVALID_VALUES,
  MISSING_DRAW_DEFINITION,
} from '../../../../constants/errorConditionConstants';

/*
 * collectionDefinition will be added to an event tieFormat (if present)
 * if a matchUpId is provided, will be added to matchUp.tieFormat
 * if a structureId is provided, will be added to structure.tieFormat
 * TODO: determine whether all contained instances of tieFormat should be updated
 */
export function addCollectionDefinition({
  collectionDefinition,
  tournamentRecord,
  drawDefinition,
  tieFormatName,
  structureId,
  matchUpId,
  eventId,
  uuids,
  event,
}) {
  const { valid, errors } = validateCollectionDefinition({
    collectionDefinition,
  });
  if (!valid) return { error: INVALID_VALUES, errors };

  let result = getTieFormat({
    drawDefinition,
    structureId,
    matchUpId,
    eventId,
    event,
  });
  if (result.error) return result;

  const { matchUp, structure, tieFormat: existingTieFormat } = result;
  const tieFormat = makeDeepCopy(existingTieFormat, false, true);

  result = validateTieFormat({ tieFormat });
  if (!result.valid)
    return { error: INVALID_VALUES, errors: result.errors, tieFormat };

  const originalValueGoal = tieFormat.winCriteria.valueGoal;

  if (!collectionDefinition.collectionId) {
    collectionDefinition.collectionId = UUID();
  } else {
    const collectionIds = tieFormat.collectionDefinitions.map(
      ({ collectionId }) => collectionId
    );
    if (collectionIds.includes(collectionDefinition.collectionId))
      return {
        error: DUPLICATE_VALUE,
        collectionId: collectionDefinition.collectionId,
      };
  }

  tieFormat.collectionDefinitions.push(collectionDefinition);
  tieFormat.collectionDefinitions
    .sort((a, b) => (a.collectionOrder || 0) - (b.collectionOrder || 0))
    .forEach(
      (collectionDefinition, i) =>
        (collectionDefinition.collectionOrder = i + 1)
    );

  // calculate new winCriteria for tieFormat
  // if existing winCriteria is aggregateValue, retain
  const { aggregateValue, valueGoal } = calculateWinCriteria({
    collectionDefinitions: tieFormat.collectionDefinitions,
  });

  tieFormat.winCriteria = { aggregateValue, valueGoal };

  // if valueGoal has changed, force renaming of the tieFormat
  if (originalValueGoal && originalValueGoal !== valueGoal) {
    if (tieFormatName) {
      tieFormat.tieFormatName = tieFormatName;
    } else {
      delete tieFormat.tieFormatName;
    }
  }

  const addedMatchUps = [];

  if (eventId) {
    event.tieFormat = tieFormat;
    // all team matchUps in the event which do not have tieFormats and where draws/strucures do not have tieFormats should have matchUps added
    // TODO: implement
    console.log('support for modifying event.tieFormat not yet implemented');
  } else if (matchUpId && matchUp) {
    if (matchUp.matchUpStatus === COMPLETED)
      return { error: 'cannot modify tieFormat for completed matchUps' };

    matchUp.tieFormat = tieFormat;
    const { matchUps: newMatchUps = [] } = generateCollectionMatchUps({
      collectionDefinition,
      uuids,
    });

    if (!Array.isArray(matchUp.tieMatchUps)) matchUp.tieMatchUps = [];
    matchUp.tieMatchUps.push(...newMatchUps);

    queueNoficiations({
      addedMatchUps,
      tournamentRecord,
      drawDefinition,
    });
  } else if (structureId && structure) {
    structure.tieFormat = tieFormat;
    const { newMatchUps } = updateStructureMatchUps({
      collectionDefinition,
      structure,
      tieFormat,
      uuids,
    });
    addedMatchUps.push(...newMatchUps);

    queueNoficiations({
      structureIds: [structureId],
      addedMatchUps,
      tournamentRecord,
      drawDefinition,
    });
  } else if (drawDefinition) {
    // all team matchUps in the drawDefinition which do not have tieFormats and where strucures do not have tieFormats should have matchUps added
    drawDefinition.tieFormat = tieFormat;
    const modifiedStructureIds = [];

    for (const structure of drawDefinition.structures || []) {
      const { newMatchUps } = updateStructureMatchUps({
        collectionDefinition,
        structure,
        tieFormat,
        uuids,
      });
      modifiedStructureIds.push(structureId);
      addedMatchUps.push(...newMatchUps);
    }

    queueNoficiations({
      structureIds: modifiedStructureIds,
      addedMatchUps,
      tournamentRecord,
      drawDefinition,
    });
  } else {
    return { error: MISSING_DRAW_DEFINITION };
  }

  return { ...SUCCESS, tieFormat, addedMatchUps };
}

function updateStructureMatchUps({
  collectionDefinition,
  structure,
  tieFormat,
  uuids,
}) {
  const newMatchUps = [];
  const matchUps = getAllStructureMatchUps({
    matchUpFilters: { matchUpTypes: [TEAM] },
    structure,
  })?.matchUps;
  // all team matchUps in the structure which do not have tieFormats should have matchUps added

  const targetMatchUps = matchUps.filter(
    (matchUp) => matchUp.matchUpStatus !== COMPLETED
  );
  for (const matchUp of targetMatchUps) {
    // don't update matchUps which are already COMPLETED
    const tieMatchUps = generateCollectionMatchUps({
      collectionDefinition,
      uuids,
    });

    if (!Array.isArray(matchUp.tieMatchUps)) matchUp.tieMatchUps = [];
    matchUp.tieMatchUps.push(...tieMatchUps);

    // if a tieFormat is already present on matchUp, update
    if (matchUp.tieFormat) matchUp.tieFormat = tieFormat;

    newMatchUps.push(...tieMatchUps);
  }
  return { newMatchUps };
}

function queueNoficiations({
  tournamentRecord,
  addedMatchUps,
  drawDefinition,
  modifiedStructureIds,
}) {
  addMatchUpsNotice({
    tournamentId: tournamentRecord?.tournamentId,
    matchUps: addedMatchUps,
    drawDefinition,
  });
  modifyDrawNotice({ drawDefinition, structureIds: modifiedStructureIds });
}
