import { getRoundMatchUps } from '../../accessors/matchUpAccessor/getRoundMatchUps';
import { isLucky } from '../../governors/queryGovernor/isLucky';
import { isAdHoc } from '../../governors/queryGovernor/isAdHoc';

import { POLICY_ROUND_NAMING_DEFAULT } from '../../../fixtures/policies/POLICY_ROUND_NAMING_DEFAULT';
import { POLICY_TYPE_ROUND_NAMING } from '../../../constants/policyConstants';
import { MAIN } from '../../../constants/drawDefinitionConstants';

export function getRoundContextProfile({
  roundNamingPolicy,
  structure,
  matchUps,
}) {
  const { hasOddMatchUpsCount, roundProfile, roundMatchUps } = getRoundMatchUps(
    { matchUps }
  );
  const { structureAbbreviation, stage } = structure;

  const isAdHocStructure = isAdHoc({ structure });
  const isLuckyStructure = isLucky({
    hasOddMatchUpsCount,
    roundMatchUps,
    structure,
  });

  const isRoundRobin = structure.structures;
  const roundNamingProfile = {};

  const defaultRoundNamingPolicy =
    POLICY_ROUND_NAMING_DEFAULT[POLICY_TYPE_ROUND_NAMING];

  const roundNamingMap =
    roundNamingPolicy?.roundNamingMap ||
    defaultRoundNamingPolicy.roundNamingMap ||
    {};

  const abbreviatedRoundNamingMap =
    roundNamingPolicy?.abbreviatedRoundNamingMap ||
    defaultRoundNamingPolicy.abbreviatedRoundNamingMap ||
    {};

  const roundNamePrefix =
    roundNamingPolicy?.affixes || defaultRoundNamingPolicy.affixes;

  const stageInitial = stage && stage !== MAIN && stage[0];
  const stageConstants = roundNamingPolicy?.stageConstants;
  const stageConstant =
    (stageConstants && stageConstants[stage]) || stageInitial;

  if (isRoundRobin || isAdHocStructure || isLuckyStructure) {
    Object.assign(
      roundNamingProfile,
      ...Object.keys(roundProfile).map((key) => {
        const roundName = `Round ${key}`;
        const abbreviatedRoundName = `R${key}`;
        return { [key]: { roundName, abbreviatedRoundName } };
      })
    );
  } else {
    Object.assign(
      roundNamingProfile,
      ...Object.keys(roundProfile).map((round) => {
        const { matchUpsCount, preFeedRound } = roundProfile[round];
        const participantsCount = matchUpsCount * 2;

        const sizedRoundName =
          roundNamingMap[matchUpsCount] ||
          `${roundNamePrefix.roundNumber}${participantsCount}`;
        const suffix = preFeedRound ? `-${roundNamePrefix.preFeedRound}` : '';
        const profileRoundName = `${sizedRoundName}${suffix}`;
        const roundName = [
          stageConstant,
          structureAbbreviation,
          profileRoundName,
        ]
          .filter(Boolean)
          .join('-');

        const sizedAbbreviation =
          abbreviatedRoundNamingMap[matchUpsCount] ||
          `${roundNamePrefix.roundNumber}${participantsCount}`;
        const profileAbbreviation = `${sizedAbbreviation}${suffix}`;
        const abbreviatedRoundName = [
          stageConstant,
          structureAbbreviation,
          profileAbbreviation,
        ]
          .filter(Boolean)
          .join('-');

        return { [round]: { abbreviatedRoundName, roundName } };
      })
    );
  }

  return { roundNamingProfile, roundProfile, roundMatchUps };
}
