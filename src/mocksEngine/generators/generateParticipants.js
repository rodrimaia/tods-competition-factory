import { cityMocks, stateMocks, postalCodeMocks } from '../utilities/address';
import { randomInt, skewedDistribution } from '../../utilities/math';
import { generateRange, shuffleArray, UUID } from '../../utilities';
import { isValidDateString } from '../../utilities/dateTime';
import { definedAttributes } from '../../utilities/objects';
import { countries } from '../../fixtures/countryData';
import { generateAddress } from './generateAddress';
import { generatePersons } from './generatePersons';
import { nameMocks } from '../utilities/nameMocks';

import defaultRatingsParameters from '../../fixtures/ratings/ratingsParameters';
import { RANKING, RATING, SCALE } from '../../constants/scaleConstants';
import { COMPETITOR } from '../../constants/participantRoles';
import { SINGLES } from '../../constants/eventConstants';
import { DOUBLES } from '../../constants/matchUpTypes';
import {
  GROUP,
  INDIVIDUAL,
  PAIR,
  TEAM,
} from '../../constants/participantConstants';

/**
 *
 * Generate mock participants
 *
 * @param {string[]} nationalityCodes - an array of ISO codes to randomly assign to participants
 * @param {number} nationalityCodesCount - number of nationality codes to use when generating participants
 * @param {number} participantsCount - number of participants to generate
 * @param {string} participantType - [INDIVIDUAL, PAIR, TEAM]
 * @param {number[]} personIds - optional array of pre-defined personIds
 * @param {string} matchUpType - optional - [SINGLES, DOUBLES] - forces PAIR participant generation if DOUBLES
 * @param {string} sex - optional - [MALE, FEMALE]
 * @param {number} valuesInstanceLimit - maximum number of values which can be the same
 * @param {number} valuesCount - number of values to generate
 * @param {boolean} inContext - whether to expand PAIR and TEAM individualParticipantIds => individualParticipant objects
 * @param {object[]} personData - optional array of persons to seed generator [{ firstName, lastName, sex, nationalityCode }]
 * @param {object} personExtensions - optional array of extentsions to apply to all persons
 * @param {string} consideredDate - date from which category ageMaxDate and ageMinDate should be calculated (typically tournament.startDate or .endDate)
 * @param {object} category - optional - { categoryName, ageCategoryCode, ratingType, ratingMax, ratingMin }
 * @param {number[]} rankingRankge - optional - range within which ranking numbers should be generated for specified category (non-rating)
 * @param {number} scaledParticipantsCount - optional - number of participants to assign rankings/ratings - defaults to ~25
 *
 */
export function generateParticipants({
  ratingsParameters = defaultRatingsParameters,
  valuesInstanceLimit,
  consideredDate,
  category,

  nationalityCodesCount,
  nationalityCodeType,
  nationalityCodes,

  participantsCount = 32,
  participantType,
  personIds,
  idPrefix,
  uuids,

  personExtensions,
  addressProps,
  matchUpType,
  personData,
  sex,

  inContext,
  withISO2,
  withIOC,

  rankingRange = [1, 100], // range of ranking positions to generate
  scaledParticipantsCount, // number of participants to assign rankings/ratings
}) {
  const doubles = participantType === PAIR || matchUpType === DOUBLES;
  const team = participantType === TEAM || matchUpType === TEAM;

  rankingRange[1] += 1; // so that behavior is as expected

  const individualParticipantsCount =
    participantsCount * (doubles ? 2 : team ? 8 : 1);

  const {
    nationalityCodes: personNationalityCodes,
    persons: mockedPersons,
    error,
  } = generatePersons({
    count: individualParticipantsCount,
    personExtensions,
    consideredDate,
    personData,
    category,
    sex,
  });
  if (error) return { error };

  // generated arrays of rankings and ratings to be attached as scaleItems
  let doublesRankings = [],
    singlesRankings = [],
    singlesRatings = [],
    doublesRatings = [];

  if (typeof category === 'object') {
    const { categoryName, ageCategoryCode, ratingType } = category;
    if ((categoryName || ageCategoryCode) && !ratingType) {
      singlesRankings = shuffleArray(generateRange(...rankingRange)).slice(
        0,
        scaledParticipantsCount || randomInt(20, 30)
      );
      if ([PAIR, TEAM].includes(participantType))
        doublesRankings = shuffleArray(generateRange(...rankingRange)).slice(
          0,
          scaledParticipantsCount || randomInt(20, 30)
        );
    }

    if (ratingType && ratingsParameters[ratingType]) {
      // ratingAttributes allows selected attributes of ratingParameters to be overridden
      let { ratingMax, ratingMin, ratingAttributes } = category;

      const ratingParameters = Object.assign(
        {},
        ratingsParameters[ratingType],
        ratingAttributes || {}
      );

      const {
        attributes = {},
        decimalsCount,
        accessors,
        range,
        step,
      } = ratingParameters;

      const getAttributes = (attributes) => {
        const generatedAttributes = {};

        for (const attribute of Object.keys(attributes) || {}) {
          const attributeValue = attributes[attribute];

          if (typeof attributeValue === 'object' && attributeValue.generator) {
            const { range } = attributeValue;
            const [min, max] = range.slice().sort();

            generatedAttributes[attribute] = randomInt(min, max);
          } else {
            generatedAttributes[attribute] = attributeValue;
          }
        }

        return generatedAttributes;
      };

      const inverted = range[0] > range[1];
      const skew = inverted ? 2 : 0.5;
      const [min, max] = range.slice().sort();
      const generateRatings = () =>
        generateRange(0, 1000)
          .map(() => skewedDistribution(min, max, skew, decimalsCount, step))
          .filter(
            (rating) =>
              (!ratingMax || rating <= ratingMax) &&
              (!ratingMin || rating >= ratingMin)
          )
          .slice(0, scaledParticipantsCount || randomInt(20, 30))
          .map((scaleValue) => {
            return !accessors
              ? scaleValue
              : Object.assign(
                  {},
                  ...accessors.map((accessor) => ({ [accessor]: scaleValue })),
                  getAttributes(attributes)
                );
          });

      singlesRatings = generateRatings();
      if ([PAIR, TEAM].includes(participantType)) {
        doublesRatings = generateRatings();
      }
    }
  }

  const countryCodes = countries.filter((country) =>
    nationalityCodeType === 'IOC' ? country.ioc || country.iso : country.iso
  );
  const { citiesCount, statesCount, postalCodesCount } = addressProps || {};

  function getMin(count) {
    const instances = Math.ceil(individualParticipantsCount / count);
    if (valuesInstanceLimit && instances > valuesInstanceLimit)
      return Math.ceil(individualParticipantsCount / valuesInstanceLimit);
    return count;
  }

  const { cities } = cityMocks({
    count: citiesCount || individualParticipantsCount,
    participantsCount: individualParticipantsCount,
  });
  const { states } = stateMocks({
    count: statesCount || individualParticipantsCount,
    participantsCount: individualParticipantsCount,
  });
  const { postalCodes } = postalCodeMocks({
    count: postalCodesCount || individualParticipantsCount,
    participantsCount: individualParticipantsCount,
  });
  const addressValues = { cities, states, postalCodes };

  const isoMin = getMin(nationalityCodesCount);
  const isoList = isoMin
    ? shuffleArray(countryCodes).slice(0, nationalityCodesCount)
    : nationalityCodes
    ? countryCodes.filter((isoCountry) =>
        nationalityCodes.includes(isoCountry.key)
      )
    : countryCodes;

  const countriesList = shuffleArray(
    generateRange(0, Math.ceil(individualParticipantsCount / (isoMin || 1)))
      .map(() => isoList)
      .flat(Infinity)
  );

  const teamNames = nameMocks({ count: participantsCount }).names;
  const participants = generateRange(0, participantsCount)
    .map((i) => {
      const sideParticipantsCount = doubles ? 2 : team ? 8 : 1;
      const individualParticipants = generateRange(
        0,
        sideParticipantsCount
      ).map((j) => {
        const participantIndex = i * sideParticipantsCount + j;
        return generateIndividualParticipant(participantIndex);
      });

      const individualParticipantIds = individualParticipants.map(
        (participant) => participant.participantId
      );

      const pairName = individualParticipants
        .map((i) => i.person.standardFamilyName)
        .join('/');

      const participantType = doubles ? PAIR : TEAM;
      const groupParticipant = {
        participantId: genParticipantId({
          participantType,
          idPrefix,
          index: i,
          uuids,
        }),
        participantRole: COMPETITOR,
        participantName: doubles ? pairName : teamNames[i],
        individualParticipantIds,
        participantType,
      };

      if (inContext)
        groupParticipant.individualParticipants = individualParticipants;

      return doubles || team
        ? [groupParticipant, ...individualParticipants]
        : individualParticipants;
    })
    .flat();

  return { participants };

  function generateIndividualParticipant(participantIndex) {
    const person = mockedPersons[participantIndex];
    const {
      nationalityCode: personNationalityCode,
      participantExtensions,
      participantTimeItems,
      extensions,
      firstName,
      birthDate,
      lastName,
      personId,
      sex,
    } = person || {};
    const standardGivenName = firstName || 'GivenName';
    const standardFamilyName = lastName || 'FamilyName';
    const participantName = `${standardGivenName} ${standardFamilyName}`;
    const country = countriesList[participantIndex];
    const nationalityCode =
      (personNationalityCodes?.length && personNationalityCode) ||
      (country &&
        (nationalityCodeType === 'IOC'
          ? country.ioc || country.iso
          : country.iso || country.ioc)) ||
      personNationalityCode;

    if (countriesList?.length && !nationalityCode && !personNationalityCode) {
      console.log('%c Invalid Nationality Code', { participantIndex, country });
    }
    const address = generateAddress({
      ...addressValues,
      participantIndex,
      nationalityCode,
    });

    const participant = definedAttributes({
      participantId: genParticipantId({
        participantType: INDIVIDUAL,
        index: participantIndex,
        idPrefix,
        uuids,
      }),
      extensions: participantExtensions,
      timeItems: participantTimeItems,
      participantRole: COMPETITOR,
      participantType: INDIVIDUAL,
      participantName,
      person: {
        addresses: [address],
        personId:
          personId ||
          (personIds?.length && personIds[participantIndex]) ||
          UUID(),
        standardFamilyName,
        standardGivenName,
        nationalityCode,
        extensions,
        birthDate: isValidDateString(birthDate) ? birthDate : undefined,
        sex,
      },
    });

    if (withIOC && nationalityCode) {
      const country = countries.find(({ iso }) => iso === nationalityCode);
      if (country?.ioc) participant.person.iocNationalityCode = country.ioc;
      if (country?.label) participant.person.countryName = country.label;
    }
    if (withISO2 && nationalityCode) {
      const country = countries.find(({ iso }) => iso === nationalityCode);
      if (country?.iso2) participant.person.iso2NationalityCode = country.iso2;
      if (country?.label) participant.person.countryName = country.label;
    }

    if (category) {
      const singlesRanking = singlesRankings[participantIndex];
      const doublesRanking = doublesRankings[participantIndex];

      addScaleItem({
        scaleValue: singlesRanking,
        eventType: SINGLES,
        scaleType: RANKING,
        participant,
        category,
      });
      addScaleItem({
        scaleValue: doublesRanking,
        eventType: DOUBLES,
        scaleType: RANKING,
        participant,
        category,
      });

      const singlesRating = singlesRatings[participantIndex];
      const doublesRating = doublesRatings[participantIndex];

      addScaleItem({
        scaleValue: singlesRating,
        eventType: SINGLES,
        scaleType: RATING,
        participant,
        category,
      });
      addScaleItem({
        scaleValue: doublesRating,
        eventType: DOUBLES,
        scaleType: RATING,
        participant,
        category,
      });
    }

    return participant;
  }
}

function addScaleItem({
  scaleValue: itemValue,
  participant,
  eventType,
  scaleType,
  category,
}) {
  const scaleName =
    category.categoryName || category.ratingType || category.ageCategoryCode;
  const itemType = [SCALE, scaleType, eventType, scaleName].join('.');
  const timeItem = { itemValue, itemType };
  if (scaleName && itemValue) {
    if (!participant.timeItems) participant.timeItems = [];
    participant.timeItems.push(timeItem);
  }
}

function genParticipantId({ idPrefix, participantType, index, uuids }) {
  const type =
    participantType === INDIVIDUAL
      ? 'I'
      : PAIR
      ? 'P'
      : TEAM
      ? 'T'
      : GROUP
      ? 'G'
      : 'X';
  return idPrefix ? `${idPrefix}-${type}-${index}` : uuids?.pop() || UUID();
}
