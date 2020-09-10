import drawEngine from '../../../../drawEngine';
import {
  reset,
  initialize,
  qualifyingDrawPositions,
  mainDrawPositions,
} from '../../../tests/primitives/primitives';

import {
  INVALID_STAGE,
  EXISTING_PARTICIPANT,
  MAIN,
  QUALIFYING,
} from '../../../../constants/drawDefinitionConstants';
import { ERROR, SUCCESS } from '../../../../constants/resultConstants';

let result;

it('rejects adding participants when stage drawSize undefined', () => {
  initialize();
  result = drawEngine.addEntry({
    participant: { participantId: '123' },
    stage: QUALIFYING,
  });
  expect(result).toMatchObject({ error: INVALID_STAGE });
});

it('will not allow duplicate entries', () => {
  reset();
  initialize();
  qualifyingDrawPositions();
  result = drawEngine.addEntry({
    participant: { participantId: 'uuid1' },
    stage: QUALIFYING,
  });
  expect(result).toMatchObject(SUCCESS);
  result = drawEngine.addEntry({
    participant: { participantId: 'uuid1' },
    stage: QUALIFYING,
  });
  expect(result).toMatchObject({ error: EXISTING_PARTICIPANT });

  reset();
  initialize();
  mainDrawPositions();
  result = drawEngine.addEntry({
    participant: { participantId: 'uuid1' },
    stage: MAIN,
  });
  expect(result).toMatchObject(SUCCESS);
  result = drawEngine.addEntry({
    participant: { participantId: 'uuid1' },
    stage: MAIN,
  });
  expect(result).toMatchObject({ error: EXISTING_PARTICIPANT });

  // now test to insure participant cannot be added to two stages
  qualifyingDrawPositions();
  result = drawEngine.addEntry({
    participant: { participantId: 'uuid1' },
    stage: QUALIFYING,
  });
  expect(result).toMatchObject({ error: EXISTING_PARTICIPANT });
});

it('adds partitipants to stage until stage drawPositions filled', () => {
  reset();
  initialize({ drawId: 'uuid-abc' });

  qualifyingDrawPositions();
  result = drawEngine.addEntry({
    participant: { participantId: 'uuid0' },
    stage: QUALIFYING,
  });
  expect(result).toMatchObject(SUCCESS);
  result = drawEngine.addEntry({
    participant: { participantId: 'uuid2' },
    stage: QUALIFYING,
  });
  expect(result).toMatchObject(SUCCESS);
  result = drawEngine.addEntry({
    participant: { participantId: 'uuid3' },
    stage: QUALIFYING,
  });
  expect(result).toMatchObject(SUCCESS);
  result = drawEngine.addEntry({
    participant: { participantId: 'uuid4' },
    stage: QUALIFYING,
  });
  expect(result).toMatchObject(SUCCESS);
  result = drawEngine.addEntry({
    participant: { participantId: 'uuid5' },
    stage: QUALIFYING,
  });
  expect(result).toHaveProperty(ERROR);

  mainDrawPositions();
  result = drawEngine.addEntry({
    participant: { participantId: 'uuid6' },
    stage: MAIN,
  });
  expect(result).toMatchObject(SUCCESS);
  result = drawEngine.addEntry({
    participant: { participantId: 'uuid7' },
    stage: MAIN,
  });
  expect(result).toMatchObject(SUCCESS);
  result = drawEngine.addEntry({
    participant: { participantId: 'uuid8' },
    stage: MAIN,
  });
  expect(result).toMatchObject(SUCCESS);
  result = drawEngine.addEntry({
    participant: { participantId: 'uuid9' },
    stage: MAIN,
  });
  expect(result).toMatchObject(SUCCESS);
  result = drawEngine.addEntry({
    participant: { participantId: 'uuid10' },
    stage: MAIN,
  });
  expect(result).toHaveProperty(ERROR);
});

it('can add bulk entries', () => {
  reset();
  initialize({ drawId: 'uuid-abc' });
  mainDrawPositions({ drawSize: 8 });
  const participants = [
    { participantId: 'uuid1' },
    { participantId: 'uuid2' },
    { participantId: 'uuid3' },
    { participantId: 'uuid4' },
    { participantId: 'uuid5' },
    { participantId: 'uuid6' },
    { participantId: 'uuid7' },
    { participantId: 'uuid8' },
  ];
  const participantIds = participants.map(p => p.participantId);
  result = drawEngine.addDrawEntries({ participantIds, stage: MAIN });
  expect(result).toMatchObject(SUCCESS);
});

it('rejects bulk entries if there is insufficient space', () => {
  reset();
  initialize({ drawId: 'uuid-abc' });
  mainDrawPositions({ drawSize: 4 });
  const participants = [
    { participantId: 'uuid1' },
    { participantId: 'uuid2' },
    { participantId: 'uuid3' },
    { participantId: 'uuid4' },
    { participantId: 'uuid5' },
    { participantId: 'uuid6' },
    { participantId: 'uuid7' },
    { participantId: 'uuid8' },
  ];
  const participantIds = participants.map(p => p.participantId);
  result = drawEngine.addDrawEntries({ participantIds, stage: MAIN });
  expect(result).toHaveProperty(ERROR);
});
