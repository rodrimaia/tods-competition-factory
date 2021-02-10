import { POLICY_TYPE_POSITION_ACTIONS } from '../../constants/policyConstants';
import { MAIN, QUALIFYING } from '../../constants/drawDefinitionConstants';

export const POLICY_POSITION_ACTIONS_DEFAULT = {
  [POLICY_TYPE_POSITION_ACTIONS]: {
    policyName: POLICY_TYPE_POSITION_ACTIONS,

    // positionActions will be selectively enabled for structures matching { stages: [], stageSequences: [] }
    // enabledStructures: [] => all structures are enabled
    enabledStructures: [
      {
        stages: [QUALIFYING, MAIN], // stages to which this policy applies
        stageSequences: [1], // stageSequences to which this policy applies
        enabledActions: [], // enabledActions: [] => all actions are enabled
        disabledActions: [], // disabledActions: [] => no actions are disabled
      },
    ],

    // positionActions will be completely disabled for any structures matching { stages: [], stageSequences: [] }
    // disabledStructures: [] => no structures are disabled
    disbledStructures: [],
  },
};

export default POLICY_POSITION_ACTIONS_DEFAULT;
