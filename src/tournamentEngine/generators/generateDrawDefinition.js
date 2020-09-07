import { tieFormatDefaults } from './tieFormatDefaults';
import { getParticipantScaleItem } from '../governors/queryGovernor/scaleValue';

import {
  MAIN,
  ROUND_ROBIN_WITH_PLAYOFF,
  QUALIFYING,
  ROUND_ROBIN,
} from 'competitionFactory/constants/drawDefinitionConstants';

import SEEDING_POLICY from 'competitionFactory/fixtures/SEEDING_USTA';
import AVOIDANCE_POLICY from 'competitionFactory/fixtures/AVOIDANCE_COUNTRY';
import { RANKING } from 'competitionFactory/constants/participantConstants';

export function generateDrawDefinition(props) {
  const {
    tournamentRecord,
    drawEngine,
    event
  } = props;

  let {
    category,
    groupSize,
    customName,
    seedsCount,
    drawSize=32,
    automated=true,
    qualifyingRound,
    qualifyingPositions,
    drawType='ELIMINATION',

    tieFormat,
    matchUpFormat,
    matchUpType,

  } = props;

  if (tieFormat || (matchUpType === 'TEAM' && !tieFormat)) {
    tieFormat = tieFormatDefaults();
    matchUpFormat = undefined;
  } else if (!matchUpFormat) {
    tieFormat = undefined;
    matchUpFormat = 'SET3-S:6/TB7';
  }

  const drawProfile = {
    category, groupSize, customName,
    seedsCount, drawSize, qualifyingRound,
    qualifyingPositions, automated, drawType,
    tieFormat, matchUpFormat, matchUpType
  }

  const entries = event.entries || [];
  const drawIsRRWP = drawType === ROUND_ROBIN_WITH_PLAYOFF;
  const stage = drawIsRRWP ? QUALIFYING : MAIN;
  const stageEntries = entries.filter(entry => entry.entryStage === stage);
  if ([ROUND_ROBIN, ROUND_ROBIN_WITH_PLAYOFF].includes(drawType)) drawSize = stageEntries.length;

  const structureOptions = drawIsRRWP
    ?  {
        playOffGroups: [
          { finishingPositions: [1, 2], structureName: 'Playoffs' },
        ]
      }
    : drawType === ROUND_ROBIN
    ? { groupSize, groupSizeLimit: 8 }
    : undefined;

  drawEngine.reset();
  drawEngine.newDrawDefinition({ drawProfile });
  drawEngine.setStageDrawSize({ stage, drawSize });
  drawEngine.setMatchUpFormat({ matchUpFormat, tieFormat, matchUpType });
  drawEngine.generateDrawType({ stage, drawType, structureOptions, qualifyingRound, qualifyingPositions });
  
  const { structures } = drawEngine.getDrawStructures({ stage, stageSequence: 1});
  const [structure] = structures;
  const { structureId } = structure || {};
  
  drawEngine.loadPolicy(SEEDING_POLICY);
  drawEngine.loadPolicy(AVOIDANCE_POLICY);

  entries.forEach(entry => {
    // TODO: attach participant scaleValues to entry information (if relevant?)
    const entryData = Object.assign({}, entry, { stage: entry.entryStage });
    drawEngine.addEntry(entryData); 
  });

  if (seedsCount > drawSize) seedsCount = drawSize;
  if (seedsCount > stageEntries.length) seedsCount = stageEntries.length;

  if (category) {
    const scaleAttributes = {
        scaleType: RANKING,
        scaleName: category,
        eventType: event.eventType
    };

    const scaledEntries = entries
      .map(entry => {
        const { participantId } = entry;
        const { scaleItem } = getParticipantScaleItem({tournamentRecord, participantId, scaleAttributes});
        return Object.assign({}, entry, scaleItem);
      })
      .filter(scaledEntry => scaledEntry.scaleValue)
      .sort(scaleValueSort)

    if (scaledEntries.length < seedsCount) seedsCount = scaledEntries.length;

    drawEngine.initializeStructureSeedAssignments({ structureId, seedsCount });

    scaledEntries
      .slice(0, seedsCount)
      .forEach((scaledEntry, index) => {
        const seedNumber = index + 1;
        const seedValue = seedNumber;
        // const scaleValue = scaledEntry.scaleValue;
        // TODO: attach basis of seeding information to seedAssignment
        const { participantId } = scaledEntry;
        let result = drawEngine.assignSeed({structureId, seedNumber, seedValue, participantId});
        if (!result.success) console.log(`%c ${result.error}`, 'color: red');
      });
  }

  if (automated !== false) drawEngine.automatedPositioning({structureId});
  
  const drawDefinition = drawEngine.getState();

  let drawName = customName || drawType;
  if (drawDefinition) Object.assign(drawDefinition, { drawName });
  
  return { structureId, drawDefinition };
}

function scaleValueSort(a, b) { return parseFloat(a.scaleValue || 9999) - parseFloat(b.scaleValue || 9999); }