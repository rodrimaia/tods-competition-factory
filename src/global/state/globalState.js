import { intersection } from '../../utilities/arrays';
import syncGlobalState from './syncGlobalState';

import {
  MISSING_ASYNC_STATE_PROVIDER,
  MISSING_VALUE,
} from '../../constants/errorConditionConstants';

const globalState = {
  timers: { default: { elapsedTime: 0 } },
  iterators: { makeDeepCopy: 0 },
  devContext: undefined,
  deepCopyAttributes: {
    threshold: undefined,
    stringify: [],
    ignore: [],
    toJSON: [],
  },
  deepCopy: true,
};

let _globalStateProvider = syncGlobalState;

const requiredStateProviderMethods = [
  'addNotice',
  'callListener',
  'deleteNotice',
  'deleteNotices',
  'getNotices',
  'getTopics',
  'getTournamentId',
  'getTournamentRecord',
  'getTournamentRecords',
  'removeTournamentRecord',
  'setSubscriptions',
  'setTournamentId',
  'setTournamentRecord',
  'setTournamentRecords',
];

export function setStateProvider(globalStateProvider) {
  if (typeof globalStateProvider !== 'object') {
    throw new Error(`Global state provider can not be undefined or null`);
  } else {
    const providerMethods = intersection(
      Object.keys(globalStateProvider),
      requiredStateProviderMethods
    );
    if (providerMethods.length !== requiredStateProviderMethods.length) {
      throw new Error('Global state provider is missing required methods');
    } else {
      _globalStateProvider = globalStateProvider;
      return { success: true };
    }
  }
}

export function createInstanceState() {
  //Only applicable for async
  if (_globalStateProvider.createInstanceState) {
    try {
      _globalStateProvider.createInstanceState();
    } catch (error) {
      return { error };
    }
    return { success: true };
  } else {
    return { error: MISSING_ASYNC_STATE_PROVIDER };
  }
}

/**
 * if contextCriteria, check whether all contextCriteria keys values are equivalent with globalState.devContext object
 */
export function getDevContext(contextCriteria) {
  if (!contextCriteria || typeof contextCriteria !== 'object') {
    return globalState.devContext || false;
  } else {
    if (typeof globalState.devContext !== 'object') return false;
    return (
      Object.keys(contextCriteria).every(
        (key) => globalState.devContext[key] === contextCriteria[key]
      ) && globalState.devContext
    );
  }
}

export function timeKeeper(action = 'reset', timer = 'default') {
  const timeNow = Date.now();

  if (action === 'report') {
    if (timer === 'allTimers') {
      const timers = Object.keys(globalState.timers);
      const report = timers
        .filter(
          (timer) => timer !== 'default' || globalState.timers[timer].startTime
        )
        .map((timer) => {
          const currentTimer = globalState.timers[timer];
          const elapsedPeriod =
            currentTimer.state === 'stopped'
              ? 0
              : (timeNow - currentTimer.startTime) / 1000;
          return {
            elapsedTime: parseFloat(
              currentTimer.elapsedTime + elapsedPeriod
            ).toFixed(2),
            timer,
            state: globalState.timers[timer].state,
          };
        });
      return report;
    } else {
      const elapsedPeriod =
        globalState.timers[timer].state === 'stopped'
          ? 0
          : (timeNow - globalState.timers[timer].startTime) / 1000;
      return {
        elapsedTime: parseFloat(
          globalState.timers[timer].elapsedTime + elapsedPeriod
        ).toFixed(2),
        timer,
        state: globalState.timers[timer].state,
      };
    }
  }

  if (!globalState.timers[timer] || action === 'reset') {
    if (timer === 'allTimers') {
      globalState.timers = { default: { elapsedTime: 0 } };
      return true;
    } else {
      globalState.timers[timer] = {
        elapsedTime: 0,
        startTime: timeNow,
        state: 'active',
      };
    }
  }

  action === 'stop' &&
    globalState.timers[timer].state !== 'stopped' &&
    (globalState.timers[timer].state = 'stopped') &&
    (globalState.timers[timer].elapsedTime +=
      (timeNow - globalState.timers[timer].startTime) / 1000);
  action === 'start' &&
    (globalState.timers[timer].startTime = timeNow) &&
    (globalState.timers[timer].state = 'active');

  return globalState.timers[timer];
}

export function setDevContext(value) {
  globalState.devContext = value;
}

export function setDeepCopyIterations(value) {
  globalState.iterators.makeDeepCopy = value;
}

export function getDeepCopyIterations() {
  return globalState.iterators.makeDeepCopy;
}

export function disableNotifications() {
  _globalStateProvider.disableNotifications();
}

export function enableNotifications() {
  _globalStateProvider.enableNotifications();
}

export function setDeepCopy(value, attributes) {
  if (typeof value === 'boolean') {
    globalState.deepCopy = value;
  }
  if (typeof attributes === 'object') {
    if (Array.isArray(attributes.ignore))
      globalState.deepCopyAttributes.ignore = attributes.ignore;
    if (Array.isArray(attributes.toJSON))
      globalState.deepCopyAttributes.toJSON = attributes.toJSON;
    if (Array.isArray(attributes.stringify))
      globalState.deepCopyAttributes.stringify = attributes.stringify;
    if (attributes.threshold)
      globalState.deepCopyAttributes.threshold = attributes.threshold;
  }
}

export function deepCopyEnabled() {
  return {
    enabled: globalState.deepCopy,
    ...globalState.deepCopyAttributes,
  };
}

export function setSubscriptions({ subscriptions } = {}) {
  if (!subscriptions) return { error: MISSING_VALUE };
  return _globalStateProvider.setSubscriptions({ subscriptions });
}

export function addNotice(notice) {
  return _globalStateProvider.addNotice(notice);
}

export function getNotices(topic) {
  return _globalStateProvider.getNotices(topic);
}

export function deleteNotice({ key, topic }) {
  return _globalStateProvider.deleteNotice({ key, topic });
}

export function deleteNotices() {
  return _globalStateProvider.deleteNotices();
}

export function getTopics() {
  return _globalStateProvider.getTopics();
}

export async function callListener(payload) {
  return _globalStateProvider.callListener(payload);
}

export function getTournamentId() {
  return _globalStateProvider.getTournamentId();
}

export function getTournamentRecord(tournamentId) {
  return _globalStateProvider.getTournamentRecord(tournamentId);
}

export function getTournamentRecords() {
  return _globalStateProvider.getTournamentRecords();
}

export function setTournamentRecord(tournamentRecord) {
  return _globalStateProvider.setTournamentRecord(tournamentRecord);
}

export function setTournamentRecords(tournamentRecords) {
  return _globalStateProvider.setTournamentRecords(tournamentRecords);
}

export function setTournamentId(tournamentId) {
  return _globalStateProvider.setTournamentId(tournamentId);
}

export function removeTournamentRecord(tournamentId) {
  return _globalStateProvider.removeTournamentRecord(tournamentId);
}
