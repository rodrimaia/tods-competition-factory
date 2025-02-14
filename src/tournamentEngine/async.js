import { notifySubscribersAsync } from '../global/state/notifySubscribers';
import { newTournamentRecord } from './generators/newTournamentRecord';
import { setState, getState, paramsMiddleWare } from './stateMethods';
import { factoryVersion } from '../global/functions/factoryVersion';
import participantGovernor from './governors/participantGovernor';
import publishingGovernor from './governors/publishingGovernor';
import tournamentGovernor from './governors/tournamentGovernor';
import scheduleGovernor from './governors/scheduleGovernor';
import policyGovernor from './governors/policyGovernor';
import eventGovernor from './governors/eventGovernor';
import queryGovernor from './governors/queryGovernor';
import venueGovernor from './governors/venueGovernor';
import { makeDeepCopy } from '../utilities';
import {
  createInstanceState,
  deleteNotices,
  setDeepCopy,
  setDevContext,
  getDevContext,
  getTournamentId,
  getTournamentRecord,
  removeTournamentRecord,
  setTournamentId,
  setTournamentRecord,
} from '../global/state/globalState';

import { SUCCESS } from '../constants/resultConstants';
import {
  INVALID_VALUES,
  METHOD_NOT_FOUND,
} from '../constants/errorConditionConstants';

export function tournamentEngineAsync(test) {
  const result = createInstanceState();
  if (result.error && !test) return result;

  const engine = {
    getState: ({ convertExtensions, removeExtensions } = {}) =>
      getState({
        convertExtensions,
        removeExtensions,
        tournamentId: getTournamentId(),
      }),
    newTournamentRecord: (params = {}) => {
      const result = newTournamentRecord(params);
      if (result.error) return result;

      setTournamentRecord(result);
      setTournamentId(result.tournamentId);
      return Object.assign({ tournamentId: result.tournamentId }, SUCCESS);
    },
    setTournamentId: (newTournamentId) => setTournamentId(newTournamentId),
  };

  engine.version = () => factoryVersion();
  engine.reset = () => {
    const tournamentId = getTournamentId();
    if (!tournamentId) return processResult();
    const result = removeTournamentRecord(tournamentId);
    return processResult(result);
  };
  engine.setState = (tournament, deepCopyOption, deepCopyAttributes) => {
    setDeepCopy(deepCopyOption, deepCopyAttributes);
    const result = setState(tournament, deepCopyOption);
    return processResult(result);
  };
  engine.devContext = (contextCriteria) => {
    setDevContext(contextCriteria);
    return engine;
  };

  engine.executionQueue = (directives, rollbackOnError) =>
    executionQueueAsync(directives, rollbackOnError);

  function processResult(result) {
    if (result?.error) {
      engine.error = result.error;
      engine.success = false;
    } else {
      engine.error = undefined;
      engine.success = true;
    }
    return engine;
  }

  importGovernors([
    queryGovernor,
    eventGovernor,
    venueGovernor,
    policyGovernor,
    scheduleGovernor,
    publishingGovernor,
    tournamentGovernor,
    participantGovernor,
  ]);

  return engine;

  async function executeFunctionAsync(tournamentRecord, method, params) {
    delete engine.success;
    delete engine.error;

    const augmentedParams = paramsMiddleWare(tournamentRecord, params);

    const result = await method({
      ...augmentedParams,
      tournamentRecord,
    });

    return result;
  }

  async function engineInvoke(method, params, methodName) {
    const tournamentRecord =
      params?.sandBoxRecord ||
      params?.sandboxRecord ||
      params?.sandboxTournament ||
      getTournamentRecord(getTournamentId());

    const snapshot =
      params?.rollbackOnError && makeDeepCopy(tournamentRecord, false, true);

    const result = await executeFunctionAsync(
      tournamentRecord,
      method,
      params,
      methodName
    );

    if (result?.error && snapshot) setState(snapshot);

    const notify =
      result?.success &&
      params?.delayNotify !== true &&
      params?.doNotNotify !== true;
    if (notify) await notifySubscribersAsync();
    if (notify || !result?.success || params?.doNotNotify) deleteNotices();

    return result;
  }

  function importGovernors(governors) {
    for (const governor of governors) {
      const governorMethods = Object.keys(governor);

      for (const methodName of governorMethods) {
        engine[methodName] = async (params) => {
          if (getDevContext()) {
            const result = await engineInvoke(
              governor[methodName],
              params,
              methodName
            );

            return result;
          } else {
            const result = await engineInvoke(
              governor[methodName],
              params,
              methodName
            );

            return result;
          }
        };
      }
    }
  }

  async function executionQueueAsync(directives, rollbackOnError) {
    if (!Array.isArray(directives)) return { error: INVALID_VALUES };
    const tournamentId = getTournamentId();
    const tournamentRecord = getTournamentRecord(tournamentId);

    const snapshot =
      rollbackOnError && makeDeepCopy(tournamentRecord, false, true);

    const results = [];
    for (const directive of directives) {
      if (typeof directive !== 'object') return { error: INVALID_VALUES };

      const { method, params } = directive;
      if (!engine[method]) return { error: METHOD_NOT_FOUND };

      const result = await executeFunctionAsync(
        tournamentRecord,
        engine[method],
        params,
        method
      );

      if (result?.error) {
        if (snapshot) setState(snapshot);
        return { ...result, rolledBack: !!snapshot };
      }
      results.push(result);
    }

    await notifySubscribersAsync();
    deleteNotices();

    return { results };
  }
}

export default tournamentEngineAsync;
