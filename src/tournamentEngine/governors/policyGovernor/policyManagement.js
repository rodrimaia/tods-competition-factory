import {
  addEventExtension,
  addTournamentExtension,
  removeEventExtension,
} from '../tournamentGovernor/addRemoveExtensions';
// import policyTemplate from './policyDefinitionTemplate';

import {
  getAppliedPolicies,
  getEventAppliedPolicies,
} from './getAppliedPolicies';

import { SUCCESS } from '../../../constants/resultConstants';
import {
  MISSING_EVENT,
  MISSING_POLICY_DEFINITION,
  MISSING_TOURNAMENT_RECORD,
  // INVALID_POLICY_DEFINITION,
  EXISTING_POLICY_TYPE,
  POLICY_NOT_ATTACHED,
  POLICY_NOT_FOUND,
  MISSING_VALUE,
  // INVALID_OBJECT,
} from '../../../constants/errorConditionConstants';
import { APPLIED_POLICIES } from '../../../constants/extensionConstants';

export function attachPolicy({
  tournamentRecord,
  policyDefinition,
  allowReplacement,
}) {
  if (!tournamentRecord) return { error: MISSING_TOURNAMENT_RECORD };
  if (!policyDefinition || typeof policyDefinition !== 'object') {
    return { error: MISSING_POLICY_DEFINITION };
  }

  if (!tournamentRecord.extensions) tournamentRecord.extensions = [];
  const { appliedPolicies } = getAppliedPolicies({ tournamentRecord });

  const applied = Object.keys(policyDefinition).every((policyType) => {
    if (!appliedPolicies[policyType]) {
      appliedPolicies[policyType] = policyDefinition[policyType];
      return true;
    } else {
      return false;
    }
  });

  if (applied) {
    const extension = {
      name: APPLIED_POLICIES,
      value: appliedPolicies,
    };
    addTournamentExtension({ tournamentRecord, extension });
  }

  return !applied && !allowReplacement
    ? { error: EXISTING_POLICY_TYPE }
    : SUCCESS;
}

export function attachEventPolicy({
  tournamentRecord,
  policyDefinition,
  event,
}) {
  if (!tournamentRecord) {
    return { error: MISSING_TOURNAMENT_RECORD };
  }
  if (!event) {
    return { error: MISSING_EVENT };
  }
  if (!policyDefinition) {
    return { error: MISSING_POLICY_DEFINITION };
  }

  let policiesApplied = 0;
  if (!event.extensions) event.extensions = [];
  const { appliedPolicies } = getEventAppliedPolicies({ event });

  Object.keys(policyDefinition).forEach((policyType) => {
    appliedPolicies[policyType] = policyDefinition[policyType];
    policiesApplied++;
  });

  if (policiesApplied) {
    const extension = { name: APPLIED_POLICIES, value: appliedPolicies };
    addEventExtension({ event, extension });
  }

  return policiesApplied ? SUCCESS : { error: POLICY_NOT_ATTACHED };
}

export function removeEventPolicy({ tournamentRecord, event, policyType }) {
  if (!tournamentRecord) return { error: MISSING_TOURNAMENT_RECORD };
  if (!policyType) return { error: MISSING_VALUE };
  if (!event) return { error: MISSING_EVENT };

  let policyRemoved;
  if (event.extensions) {
    const { appliedPolicies } = getEventAppliedPolicies({ event });
    if (appliedPolicies && appliedPolicies[policyType]) {
      delete appliedPolicies[policyType];
      policyRemoved = true;

      if (Object.keys(appliedPolicies).length) {
        const extension = { name: APPLIED_POLICIES, value: appliedPolicies };
        addEventExtension({ event, extension });
      } else {
        removeEventExtension({ event, name: APPLIED_POLICIES });
      }
    }
  }
  return policyRemoved ? SUCCESS : { error: POLICY_NOT_FOUND };
}

/*
function validDefinitionKeys(definition) {
  const definitionKeys = Object.keys(definition);
  const validKeys = Object.keys(policyTemplate());
  const valid = definitionKeys.reduce(
    (p, key) => (!validKeys.includes(key) ? false : p),
    true
  );
  return valid;
}
*/
