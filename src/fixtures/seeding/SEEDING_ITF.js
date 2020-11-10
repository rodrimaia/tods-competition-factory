import { POLICY_TYPE_SEEDING } from '../../constants/policyConstants';

export const SEEDING_ITF = {
  [POLICY_TYPE_SEEDING]: {
    policyName: 'ITF',
    duplicateSeedNumbers: true,
    seedBlocks: {
      '1': [['1', '0']],
      '2': [['0', '1']],
      '3': [
        ['1', '.250'],
        ['0', '.750'],
      ],
      '5': [
        ['0', '.250'],
        ['0', '.500'],
        ['1', '.500'],
        ['1', '.750'],
      ],
      '9': [
        ['1', '.125'],
        ['0', '.375'],
        ['1', '.625'],
        ['0', '.875'],
        ['0', '.125'],
        ['1', '.375'],
        ['0', '.625'],
        ['1', '.875'],
      ],
      '17': [
        ['1', '.0625'],
        ['0', '.1875'],
        ['1', '.3125'],
        ['0', '.4375'],
        ['1', '.5625'],
        ['0', '.6875'],
        ['1', '.8125'],
        ['0', '.9375'],
        ['0', '.0625'],
        ['1', '.1875'],
        ['0', '.3125'],
        ['1', '.4375'],
        ['0', '.5625'],
        ['1', '.6875'],
        ['0', '.8125'],
        ['1', '.9375'],
      ],
      '33': [
        ['1', '.03125'],
        ['0', '.09375'],
        ['1', '.15625'],
        ['0', '.21875'],
        ['1', '.28125'],
        ['0', '.34375'],
        ['1', '.40625'],
        ['0', '.46875'],
        ['1', '.53125'],
        ['0', '.59375'],
        ['1', '.65625'],
        ['0', '.71875'],
        ['1', '.78125'],
        ['0', '.84375'],
        ['1', '.90625'],
        ['0', '.96875'],
        ['0', '.03125'],
        ['1', '.09375'],
        ['0', '.15625'],
        ['1', '.21875'],
        ['0', '.28125'],
        ['1', '.34375'],
        ['0', '.40625'],
        ['1', '.46875'],
        ['0', '.53125'],
        ['1', '.59375'],
        ['0', '.65625'],
        ['1', '.71875'],
        ['0', '.78125'],
        ['1', '.84375'],
        ['0', '.90625'],
        ['1', '.96875'],
      ],
      '49': [],
    },
  },
};

export default SEEDING_ITF;
