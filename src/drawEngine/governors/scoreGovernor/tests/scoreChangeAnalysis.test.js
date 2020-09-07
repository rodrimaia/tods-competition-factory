import { analyzeMatchUp } from '../analyzeMatchUp';
import { FORMAT_STANDARD, FORMAT_ATP_DOUBLES } from './formatConstants';

test('can properly analyze completed standard format matchUp', () => {
  const matchUp = {
    sets: [
      { setNumber: 1, side1Score: 6, side2Score: 3, winningSide: 1 },
      { setNumber: 2, side1Score: 3, side2Score: 6, winningSide: 2 },
      { setNumber: 3, side1Score: 7, side2Score: 6, side1TiebreakScore: 7, side2TiebreakScore: 3, winningSide: 1 },
    ],
    winningSide: 1,
    matchUpFormat: FORMAT_STANDARD
  }

  let analysis = analyzeMatchUp({matchUp, sideNumber: 1, setNumber: 3});
  expect(analysis.isLastSetWithValues).toEqual(true);
  expect(analysis.isCompletedSet).toEqual(true);
  expect(analysis.existingValue).toEqual(7);
});
