import { competitionEngine, tournamentEngine } from '../..';
import fs from 'fs';

it('can get competitionScheduleMatchUps', () => {
  let tournamentRecordJSON = fs.readFileSync(
    './src/global/testHarness/publishState.tods.json',
    'utf-8'
  );

  let tournamentRecord = JSON.parse(tournamentRecordJSON);
  tournamentEngine.setState(tournamentRecord);

  let result = competitionEngine.competitionScheduleMatchUps();
  expect(result.dateMatchUps.length).toEqual(29);

  result = competitionEngine.competitionScheduleMatchUps({
    usePublishState: true,
  });
  expect(result.dateMatchUps.length).toEqual(0);
});
