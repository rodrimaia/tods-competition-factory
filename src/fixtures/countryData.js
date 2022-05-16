// ISO- 3166-1 alpha-2

export function countryToFlag(isoCode) {
  return isoCode && typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

export function flagIOC(ioc) {
  const ioc2iso = Object.assign(
    {},
    ...countries.filter((c) => c.ioc).map((c) => ({ [c.ioc]: c.iso }))
  );
  return countryToFlag(ioc2iso[ioc]);
}

export const countries = [
  {
    ioc: '',
    iso2: '',
    iso: '',
    label: 'NONE',
    phone: '',
  },
  {
    ioc: 'AND',
    iso2: 'AD',
    iso: 'AND',
    label: 'Andorra',
    phone: '376',
  },
  {
    ioc: 'UAE',
    iso2: 'AE',
    iso: 'ARE',
    label: 'United Arab Emirates',
    phone: '971',
  },
  {
    ioc: 'AFG',
    iso2: 'AF',
    iso: 'AFG',
    label: 'Afghanistan',
    phone: '93',
  },
  {
    ioc: 'ANT',
    iso2: 'AG',
    iso: 'ATG',
    label: 'Antigua and Barbuda',
    phone: '1-268',
  },
  {
    ioc: 'AIA',
    iso2: 'AI',
    iso: 'AIA',
    label: 'Anguilla',
    phone: '1-264',
  },
  {
    ioc: 'ALB',
    iso2: 'AL',
    iso: 'ALB',
    label: 'Albania',
    phone: '355',
  },
  {
    ioc: 'ARM',
    iso2: 'AM',
    iso: 'ARM',
    label: 'Armenia',
    phone: '374',
  },
  {
    ioc: 'ANG',
    iso2: 'AO',
    iso: 'AGO',
    label: 'Angola',
    phone: '244',
  },
  {
    ioc: '',
    iso2: 'AQ',
    iso: 'ATA',
    label: 'Antarctica',
    phone: '672',
  },
  {
    ioc: 'ARG',
    iso2: 'AR',
    iso: 'ARG',
    label: 'Argentina',
    phone: '54',
  },
  {
    ioc: 'ASA',
    iso2: 'AS',
    iso: 'ASM',
    label: 'American Samoa',
    phone: '1-684',
  },
  {
    ioc: 'AUT',
    iso2: 'AT',
    iso: 'AUT',
    label: 'Austria',
    phone: '43',
  },
  {
    ioc: 'AUS',
    iso2: 'AU',
    iso: 'AUS',
    label: 'Australia',
    phone: '61',
    suggested: true,
  },
  {
    ioc: 'ARU',
    iso2: 'AW',
    iso: 'ABW',
    label: 'Aruba',
    phone: '297',
  },
  {
    ioc: 'AZE',
    iso2: 'AZ',
    iso: 'AZE',
    label: 'Azerbaijan',
    phone: '994',
  },
  {
    ioc: 'BIH',
    iso2: 'BA',
    iso: 'BIH',
    label: 'Bosnia and Herzegovina',
    phone: '387',
  },
  {
    ioc: 'BAR',
    iso2: 'BB',
    iso: 'BRB',
    label: 'Barbados',
    phone: '1-246',
  },
  {
    ioc: 'BAN',
    iso2: 'BD',
    iso: 'BGD',
    label: 'Bangladesh',
    phone: '880',
  },
  {
    ioc: 'BEL',
    iso2: 'BE',
    iso: 'BEL',
    label: 'Belgium',
    phone: '32',
  },
  {
    ioc: 'BUR',
    iso2: 'BF',
    iso: 'BFA',
    label: 'Burkina Faso',
    phone: '226',
  },
  {
    ioc: 'BUL',
    iso2: 'BG',
    iso: 'BGR',
    label: 'Bulgaria',
    phone: '359',
  },
  {
    ioc: 'BRN',
    iso2: 'BH',
    iso: 'BHR',
    label: 'Bahrain',
    phone: '973',
  },
  {
    ioc: 'BDI',
    iso2: 'BI',
    iso: 'BDI',
    label: 'Burundi',
    phone: '257',
  },
  {
    ioc: 'BEN',
    iso2: 'BJ',
    iso: 'BEN',
    label: 'Benin',
    phone: '229',
  },
  {
    ioc: '',
    iso2: 'BL',
    iso: 'BLM',
    label: 'Saint Barthelemy',
    phone: '590',
  },
  {
    ioc: 'BER',
    iso2: 'BM',
    iso: 'BMU',
    label: 'Bermuda',
    phone: '1-441',
  },
  {
    ioc: 'BRU',
    iso2: 'BN',
    iso: 'BRN',
    label: 'Brunei Darussalam',
    phone: '673',
  },
  {
    ioc: 'BOL',
    iso2: 'BO',
    iso: 'BOL',
    label: 'Bolivia',
    phone: '591',
  },
  {
    ioc: 'BRA',
    iso2: 'BR',
    iso: 'BRA',
    label: 'Brazil',
    phone: '55',
  },
  {
    ioc: 'BAH',
    iso2: 'BS',
    iso: 'BHS',
    label: 'Bahamas',
    phone: '1-242',
  },
  {
    ioc: 'BHU',
    iso2: 'BT',
    iso: 'BTN',
    label: 'Bhutan',
    phone: '975',
  },
  {
    ioc: '',
    iso2: 'BV',
    iso: 'BVT',
    label: 'Bouvet Island',
    phone: '47',
  },
  {
    ioc: 'BOT',
    iso2: 'BW',
    iso: 'BWA',
    label: 'Botswana',
    phone: '267',
  },
  {
    ioc: 'BLR',
    iso2: 'BY',
    iso: 'BLR',
    label: 'Belarus',
    phone: '375',
  },
  {
    ioc: 'BIZ',
    iso2: 'BZ',
    iso: 'BLZ',
    label: 'Belize',
    phone: '501',
  },
  {
    ioc: 'CAN',
    iso2: 'CA',
    iso: 'CAN',
    label: 'Canada',
    phone: '1',
    suggested: true,
  },
  {
    ioc: '',
    iso2: 'CC',
    iso: 'CCK',
    label: 'Cocos (Keeling) Islands',
    phone: '61',
  },
  {
    ioc: 'CGO',
    iso2: 'CD',
    iso: 'COG',
    label: 'Congo, Republic of the',
    phone: '242',
  },
  {
    ioc: 'CAF',
    iso2: 'CF',
    iso: 'CAF',
    label: 'Central African Republic',
    phone: '236',
  },
  {
    ioc: 'COD',
    iso2: 'CG',
    iso: 'CGD',
    label: 'Congo, Democratic Republic of the',
    phone: '243',
  },
  {
    ioc: 'SUI',
    iso2: 'CH',
    iso: 'CHE',
    label: 'Switzerland',
    phone: '41',
  },
  {
    ioc: 'CIV',
    iso2: 'CI',
    iso: 'CIV',
    label: "Cote d'Ivoire",
    phone: '225',
  },
  {
    ioc: 'COK',
    iso2: 'CK',
    iso: 'COK',
    label: 'Cook Islands',
    phone: '682',
  },
  {
    ioc: 'CHI',
    iso2: 'CL',
    iso: 'CHL',
    label: 'Chile',
    phone: '56',
  },
  {
    ioc: 'CMR',
    iso2: 'CM',
    iso: 'CMR',
    label: 'Cameroon',
    phone: '237',
  },
  {
    ioc: 'CHN',
    iso2: 'CN',
    iso: 'CHN',
    label: 'China',
    phone: '86',
  },
  {
    ioc: 'COL',
    iso2: 'CO',
    iso: 'COL',
    label: 'Colombia',
    phone: '57',
  },
  {
    ioc: 'CRC',
    iso2: 'CR',
    iso: 'CRI',
    label: 'Costa Rica',
    phone: '506',
  },
  {
    ioc: 'CUB',
    iso2: 'CU',
    iso: 'CUB',
    label: 'Cuba',
    phone: '53',
  },
  {
    ioc: 'CPV',
    iso2: 'CV',
    iso: 'CPV',
    label: 'Cape Verde',
    phone: '238',
  },
  {
    ioc: 'CUW',
    iso2: 'CW',
    iso: 'CUW',
    label: 'Curacao',
    phone: '599',
  },
  {
    ioc: 'CXR',
    iso2: 'CX',
    iso: 'CXR',
    label: 'Christmas Island',
    phone: '61',
  },
  {
    ioc: 'CYP',
    iso2: 'CY',
    iso: 'CYP',
    label: 'Cyprus',
    phone: '357',
  },
  {
    ioc: 'CZE',
    iso2: 'CZ',
    iso: 'CZE',
    label: 'Czech Republic',
    phone: '420',
  },
  {
    ioc: 'GER',
    iso2: 'DE',
    iso: 'DEU',
    label: 'Germany',
    phone: '49',
    suggested: true,
  },
  {
    ioc: 'DJI',
    iso2: 'DJ',
    iso: 'DJI',
    label: 'Djibouti',
    phone: '253',
  },
  {
    ioc: 'DEN',
    iso2: 'DK',
    iso: 'DNK',
    label: 'Denmark',
    phone: '45',
  },
  {
    ioc: 'DMA',
    iso2: 'DM',
    iso: 'DMA',
    label: 'Dominica',
    phone: '1-767',
  },
  {
    ioc: 'DOM',
    iso2: 'DO',
    iso: 'DOM',
    label: 'Dominican Republic',
    phone: '1-809',
  },
  {
    ioc: 'ALG',
    iso2: 'DZ',
    iso: 'DZA',
    label: 'Algeria',
    phone: '213',
  },
  {
    ioc: 'ECU',
    iso2: 'EC',
    iso: 'ECU',
    label: 'Ecuador',
    phone: '593',
  },
  {
    ioc: 'EST',
    iso2: 'EE',
    iso: 'ESE',
    label: 'Estonia',
    phone: '372',
  },
  {
    ioc: 'EGY',
    iso2: 'EG',
    iso: 'EGY',
    label: 'Egypt',
    phone: '20',
  },
  {
    ioc: '',
    iso2: 'EH',
    iso: 'ESH',
    label: 'Western Sahara',
    phone: '212',
  },
  {
    ioc: 'ERI',
    iso2: 'ER',
    iso: 'ERI',
    label: 'Eritrea',
    phone: '291',
  },
  {
    ioc: 'ESP',
    iso2: 'ES',
    iso: 'ESP',
    label: 'Spain',
    phone: '34',
  },
  {
    ioc: 'ETH',
    iso2: 'ET',
    iso: 'ETH',
    label: 'Ethiopia',
    phone: '251',
  },
  {
    ioc: 'FIN',
    iso2: 'FI',
    iso: 'FIN',
    label: 'Finland',
    phone: '358',
  },
  {
    ioc: 'FIJ',
    iso2: 'FJ',
    iso: 'FJI',
    label: 'Fiji',
    phone: '679',
  },
  {
    ioc: 'FLK',
    iso2: 'FK',
    iso: 'FLK',
    label: 'Falkland Islands (Malvinas)',
    phone: '500',
  },
  {
    ioc: 'FSM',
    iso2: 'FM',
    iso: 'FSM',
    label: 'Micronesia, Federated States of',
    phone: '691',
  },
  {
    ioc: 'FAR',
    iso2: 'FO',
    iso: 'FRO',
    label: 'Faroe Islands',
    phone: '298',
  },
  {
    ioc: 'FRA',
    iso2: 'FR',
    iso: 'FRA',
    label: 'France',
    phone: '33',
    suggested: true,
  },
  {
    ioc: 'GAB',
    iso2: 'GA',
    iso: 'GAB',
    label: 'Gabon',
    phone: '241',
  },
  {
    ioc: 'GBR',
    iso2: 'GB',
    iso: 'GBR',
    label: 'United Kingdom',
    phone: '44',
  },
  {
    ioc: 'GRN',
    iso2: 'GD',
    iso: 'GRD',
    label: 'Grenada',
    phone: '1-473',
  },
  {
    ioc: 'GEO',
    iso2: 'GE',
    iso: 'GEO',
    label: 'Georgia',
    phone: '995',
  },
  {
    ioc: 'FGU',
    iso2: 'GF',
    iso: 'GUF',
    label: 'French Guiana',
    phone: '594',
  },
  {
    ioc: '',
    iso2: 'GG',
    iso: 'GGY',
    label: 'Guernsey',
    phone: '44',
  },
  {
    ioc: '',
    iso2: 'GH',
    iso: 'GHA',
    label: 'Ghana',
    phone: '233',
  },
  {
    ioc: 'GIB',
    iso2: 'GI',
    iso: 'GIB',
    label: 'Gibraltar',
    phone: '350',
  },
  {
    ioc: 'GRL',
    iso2: 'GL',
    iso: 'GRL',
    label: 'Greenland',
    phone: '299',
  },
  {
    ioc: 'GAM',
    iso2: 'GM',
    iso: 'GMB',
    label: 'Gambia',
    phone: '220',
  },
  {
    ioc: 'GUI',
    iso2: 'GN',
    iso: 'GIN',
    label: 'Guinea',
    phone: '224',
  },
  {
    ioc: 'GUD',
    iso2: 'GP',
    iso: 'GLP',
    label: 'Guadeloupe',
    phone: '590',
  },
  {
    ioc: 'GEQ',
    iso2: 'GQ',
    iso: 'GNQ',
    label: 'Equatorial Guinea',
    phone: '240',
  },
  {
    ioc: 'GRE',
    iso2: 'GR',
    iso: 'GRC',
    label: 'Greece',
    phone: '30',
  },
  {
    ioc: '',
    iso2: 'GS',
    iso: 'SGS',
    label: 'South Georgia and the South Sandwich Islands',
    phone: '500',
  },
  {
    ioc: 'GUA',
    iso2: 'GT',
    iso: 'GTM',
    label: 'Guatemala',
    phone: '502',
  },
  {
    ioc: 'GUM',
    iso2: 'GU',
    iso: 'GUM',
    label: 'Guam',
    phone: '1-671',
  },
  {
    ioc: 'GBS',
    iso2: 'GW',
    iso: 'GNB',
    label: 'Guinea-Bissau',
    phone: '245',
  },
  {
    ioc: 'GUY',
    iso2: 'GY',
    iso: 'GUY',
    label: 'Guyana',
    phone: '592',
  },
  {
    ioc: 'HKG',
    iso2: 'HK',
    iso: 'HKG',
    label: 'Hong Kong',
    phone: '852',
  },
  {
    ioc: '',
    iso2: 'HM',
    iso: 'HMD',
    label: 'Heard Island and McDonald Islands',
    phone: '672',
  },
  {
    ioc: 'HON',
    iso2: 'HN',
    iso: 'HND',
    label: 'Honduras',
    phone: '504',
  },
  {
    ioc: 'CRO',
    iso2: 'HR',
    iso: 'HRV',
    label: 'Croatia',
    phone: '385',
  },
  {
    ioc: 'HAI',
    iso2: 'HT',
    iso: 'HTI',
    label: 'Haiti',
    phone: '509',
  },
  {
    ioc: 'HUN',
    iso2: 'HU',
    iso: 'HUN',
    label: 'Hungary',
    phone: '36',
  },
  {
    ioc: 'INA',
    iso2: 'ID',
    iso: 'IDN',
    label: 'Indonesia',
    phone: '62',
  },
  {
    ioc: 'IRL',
    iso2: 'IE',
    iso: 'IRL',
    label: 'Ireland',
    phone: '353',
  },
  {
    ioc: 'ISR',
    iso2: 'IL',
    iso: 'ISR',
    label: 'Israel',
    phone: '972',
  },
  {
    ioc: '',
    iso2: 'IM',
    iso: 'IMN',
    label: 'Isle of Man',
    phone: '44',
  },
  {
    ioc: 'IND',
    iso2: 'IN',
    iso: 'IND',
    label: 'India',
    phone: '91',
  },
  {
    ioc: '',
    iso2: 'IO',
    iso: 'IOT',
    label: 'British Indian Ocean Territory',
    phone: '246',
  },
  {
    ioc: 'IRQ',
    iso2: 'IQ',
    iso: 'IRQ',
    label: 'Iraq',
    phone: '964',
  },
  {
    ioc: 'IRI',
    iso2: 'IR',
    iso: 'IRN',
    label: 'Iran, Islamic Republic of',
    phone: '98',
  },
  {
    ioc: 'ISL',
    iso2: 'IS',
    iso: 'ISL',
    label: 'Iceland',
    phone: '354',
  },
  {
    ioc: 'ITA',
    iso2: 'IT',
    iso: 'ITA',
    label: 'Italy',
    phone: '39',
  },
  {
    ioc: '',
    iso2: 'JE',
    iso: 'JEY',
    label: 'Jersey',
    phone: '44',
  },
  {
    ioc: 'JAM',
    iso2: 'JM',
    iso: 'JAM',
    label: 'Jamaica',
    phone: '1-876',
  },
  {
    ioc: 'JOR',
    iso2: 'JO',
    iso: 'JOR',
    label: 'Jordan',
    phone: '962',
  },
  {
    ioc: 'JPN',
    iso2: 'JP',
    iso: 'JPN',
    label: 'Japan',
    phone: '81',
    suggested: true,
  },
  {
    ioc: 'KEN',
    iso2: 'KE',
    iso: 'KEN',
    label: 'Kenya',
    phone: '254',
  },
  {
    ioc: 'KGZ',
    iso2: 'KG',
    iso: 'KGZ',
    label: 'Kyrgyzstan',
    phone: '996',
  },
  {
    ioc: 'CAM',
    iso2: 'KH',
    iso: 'KHM',
    label: 'Cambodia',
    phone: '855',
  },
  {
    ioc: 'KIR',
    iso2: 'KI',
    iso: 'KIR',
    label: 'Kiribati',
    phone: '686',
  },
  {
    ioc: 'COM',
    iso2: 'KM',
    iso: 'COM',
    label: 'Comoros',
    phone: '269',
  },
  {
    ioc: 'SKN',
    iso2: 'KN',
    iso: 'KNA',
    label: 'Saint Kitts and Nevis',
    phone: '1-869',
  },
  {
    ioc: 'KOR',
    iso2: 'KP',
    iso: 'KOR',
    label: "Korea, Democratic People's Republic of",
    phone: '850',
  },
  {
    ioc: 'PRK',
    iso2: 'KR',
    iso: 'PRK',
    label: 'Korea, Republic of',
    phone: '82',
  },
  {
    ioc: 'KUW',
    iso2: 'KW',
    iso: 'KWT',
    label: 'Kuwait',
    phone: '965',
  },
  {
    ioc: 'CAY',
    iso2: 'KY',
    iso: 'CYM',
    label: 'Cayman Islands',
    phone: '1-345',
  },
  {
    ioc: 'KAZ',
    iso2: 'KZ',
    iso: 'KAZ',
    label: 'Kazakhstan',
    phone: '7',
  },
  {
    ioc: 'LAO',
    iso2: 'LA',
    iso: 'LAO',
    label: "Lao People's Democratic Republic",
    phone: '856',
  },
  {
    ioc: 'LIB',
    iso2: 'LB',
    iso: 'LBN',
    label: 'Lebanon',
    phone: '961',
  },
  {
    ioc: 'LCA',
    iso2: 'LC',
    iso: 'LCA',
    label: 'Saint Lucia',
    phone: '1-758',
  },
  {
    ioc: 'LIE',
    iso2: 'LI',
    iso: 'LIE',
    label: 'Liechtenstein',
    phone: '423',
  },
  {
    ioc: 'SRI',
    iso2: 'LK',
    iso: 'LKA',
    label: 'Sri Lanka',
    phone: '94',
  },
  {
    ioc: 'LBR',
    iso2: 'LR',
    iso: 'LBR',
    label: 'Liberia',
    phone: '231',
  },
  {
    ioc: 'LES',
    iso2: 'LS',
    iso: 'LSO',
    label: 'Lesotho',
    phone: '266',
  },
  {
    ioc: 'LTU',
    iso2: 'LT',
    iso: 'LTU',
    label: 'Lithuania',
    phone: '370',
  },
  {
    ioc: 'LUX',
    iso2: 'LU',
    iso: 'LUX',
    label: 'Luxembourg',
    phone: '352',
  },
  {
    ioc: 'LAT',
    iso2: 'LV',
    iso: 'LVA',
    label: 'Latvia',
    phone: '371',
  },
  {
    ioc: 'LBA',
    iso2: 'LY',
    iso: 'LBY',
    label: 'Libya',
    phone: '218',
  },
  {
    ioc: 'MAR',
    iso2: 'MA',
    iso: 'MAR',
    label: 'Morocco',
    phone: '212',
  },
  {
    ioc: 'MON',
    iso2: 'MC',
    iso: 'MCO',
    label: 'Monaco',
    phone: '377',
  },
  {
    ioc: 'MDA',
    iso2: 'MD',
    iso: 'MDA',
    label: 'Moldova, Republic of',
    phone: '373',
  },
  {
    ioc: 'MNE',
    iso2: 'ME',
    iso: 'MNE',
    label: 'Montenegro',
    phone: '382',
  },
  {
    ioc: '',
    iso2: 'MF',
    iso: 'MAF',
    label: 'Saint Martin (French part)',
    phone: '590',
  },
  {
    ioc: 'MAD',
    iso2: 'MG',
    iso: 'MDG',
    label: 'Madagascar',
    phone: '261',
  },
  {
    ioc: 'MSH',
    iso2: 'MH',
    iso: 'MHL',
    label: 'Marshall Islands',
    phone: '692',
  },
  {
    ioc: 'MKD',
    iso2: 'MK',
    iso: 'MKD',
    label: 'Macedonia, the Former Yugoslav Republic of',
    phone: '389',
  },
  {
    ioc: 'MLI',
    iso2: 'ML',
    iso: 'MLI',
    label: 'Mali',
    phone: '223',
  },
  {
    ioc: 'MYA',
    iso2: 'MM',
    iso: 'MMR',
    label: 'Myanmar',
    phone: '95',
  },
  {
    ioc: 'MGL',
    iso2: 'MN',
    iso: 'MNG',
    label: 'Mongolia',
    phone: '976',
  },
  {
    ioc: 'MAC',
    iso2: 'MO',
    iso: 'MAC',
    label: 'Macao',
    phone: '853',
  },
  {
    ioc: 'NMA',
    iso2: 'MP',
    iso: 'NMP',
    label: 'Northern Mariana Islands',
    phone: '1-670',
  },
  {
    ioc: 'MRT',
    iso2: 'MQ',
    iso: 'MTQ',
    label: 'Martinique',
    phone: '596',
  },
  {
    ioc: 'MTN',
    iso2: 'MR',
    iso: 'MRT',
    label: 'Mauritania',
    phone: '222',
  },
  {
    ioc: 'MNT',
    iso2: 'MS',
    iso: 'MSR',
    label: 'Montserrat',
    phone: '1-664',
  },
  {
    ioc: 'MLT',
    iso2: 'MT',
    iso: 'MLT',
    label: 'Malta',
    phone: '356',
  },
  {
    ioc: 'MRI',
    iso2: 'MU',
    iso: 'MUS',
    label: 'Mauritius',
    phone: '230',
  },
  {
    ioc: 'MDV',
    iso2: 'MV',
    iso: 'MDV',
    label: 'Maldives',
    phone: '960',
  },
  {
    ioc: 'MAW',
    iso2: 'MW',
    iso: 'MWI',
    label: 'Malawi',
    phone: '265',
  },
  {
    ioc: 'MEX',
    iso2: 'MX',
    iso: 'MEX',
    label: 'Mexico',
    phone: '52',
  },
  {
    ioc: 'MAS',
    iso2: 'MY',
    iso: 'MYS',
    label: 'Malaysia',
    phone: '60',
  },
  {
    ioc: 'MOZ',
    iso2: 'MZ',
    iso: 'MOZ',
    label: 'Mozambique',
    phone: '258',
  },
  {
    ioc: 'NAM',
    iso2: 'NA',
    iso: 'NAM',
    label: 'Namibia',
    phone: '264',
  },
  {
    ioc: 'NCL',
    iso2: 'NC',
    iso: 'NCL',
    label: 'New Caledonia',
    phone: '687',
  },
  {
    ioc: 'NIG',
    iso2: 'NE',
    iso: 'NER',
    label: 'Niger',
    phone: '227',
  },
  {
    ioc: 'NFI',
    iso2: 'NF',
    iso: 'NFK',
    label: 'Norfolk Island',
    phone: '672',
  },
  {
    ioc: 'NGR',
    iso2: 'NG',
    iso: 'NGA',
    label: 'Nigeria',
    phone: '234',
  },
  {
    ioc: 'NCA',
    iso2: 'NI',
    iso: 'NIC',
    label: 'Nicaragua',
    phone: '505',
  },
  {
    ioc: 'NED',
    iso2: 'NL',
    iso: 'NLD',
    label: 'Netherlands',
    phone: '31',
  },
  {
    ioc: 'NOR',
    iso2: 'NO',
    iso: 'NOR',
    label: 'Norway',
    phone: '47',
  },
  {
    ioc: 'NEP',
    iso2: 'NP',
    iso: 'NPL',
    label: 'Nepal',
    phone: '977',
  },
  {
    ioc: 'NRU',
    iso2: 'NR',
    iso: 'NRU',
    label: 'Nauru',
    phone: '674',
  },
  {
    ioc: 'NIU',
    iso2: 'NU',
    iso: 'NIU',
    label: 'Niue',
    phone: '683',
  },
  {
    ioc: 'NZL',
    iso2: 'NZ',
    iso: 'NZL',
    label: 'New Zealand',
    phone: '64',
  },
  {
    ioc: 'OMA',
    iso2: 'OM',
    iso: 'OMN',
    label: 'Oman',
    phone: '968',
  },
  {
    ioc: 'PAN',
    iso2: 'PA',
    iso: 'PAN',
    label: 'Panama',
    phone: '507',
  },
  {
    ioc: 'PER',
    iso2: 'PE',
    iso: 'PER',
    label: 'Peru',
    phone: '51',
  },
  {
    ioc: 'FPO',
    iso2: 'PF',
    iso: 'PYF',
    label: 'French Polynesia',
    phone: '689',
  },
  {
    ioc: 'PNG',
    iso2: 'PG',
    iso: 'PNG',
    label: 'Papua New Guinea',
    phone: '675',
  },
  {
    ioc: 'PHI',
    iso2: 'PH',
    iso: 'PHL',
    label: 'Philippines',
    phone: '63',
  },
  {
    ioc: 'PAK',
    iso2: 'PK',
    iso: 'PAK',
    label: 'Pakistan',
    phone: '92',
  },
  {
    ioc: 'POL',
    iso2: 'PL',
    iso: 'POL',
    label: 'Poland',
    phone: '48',
  },
  {
    ioc: 'SPM',
    iso2: 'PM',
    iso: 'SPM',
    label: 'Saint Pierre and Miquelon',
    phone: '508',
  },
  {
    ioc: '',
    iso2: 'PN',
    iso: 'PCN',
    label: 'Pitcairn',
    phone: '870',
  },
  {
    ioc: 'PUR',
    iso2: 'PR',
    iso: 'PRI',
    label: 'Puerto Rico',
    phone: '1',
  },
  {
    ioc: 'PLE',
    iso2: 'PS',
    iso: 'PSE',
    label: 'Palestine, State of',
    phone: '970',
  },
  {
    ioc: 'POR',
    iso2: 'PT',
    iso: 'PRT',
    label: 'Portugal',
    phone: '351',
  },
  {
    ioc: 'PLW',
    iso2: 'PW',
    iso: 'PLW',
    label: 'Palau',
    phone: '680',
  },
  {
    ioc: 'PAR',
    iso2: 'PY',
    iso: 'PRY',
    label: 'Paraguay',
    phone: '595',
  },
  {
    ioc: 'QAT',
    iso2: 'QA',
    iso: 'QAT',
    label: 'Qatar',
    phone: '974',
  },
  {
    ioc: 'REU',
    iso2: 'RE',
    iso: 'REU',
    label: 'Reunion',
    phone: '262',
  },
  {
    ioc: 'ROU',
    iso2: 'RO',
    iso: 'ROU',
    label: 'Romania',
    phone: '40',
  },
  {
    ioc: 'SRB',
    iso2: 'RS',
    iso: 'SRB',
    label: 'Serbia',
    phone: '381',
  },
  {
    ioc: 'RUS',
    iso2: 'RU',
    iso: 'RUS',
    label: 'Russia',
    phone: '7',
  },
  {
    ioc: 'RWA',
    iso2: 'RW',
    iso: 'RWA',
    label: 'Rwanda',
    phone: '250',
  },
  {
    ioc: 'KSA',
    iso2: 'SA',
    iso: 'SAU',
    label: 'Saudi Arabia',
    phone: '966',
  },
  {
    ioc: 'SOL',
    iso2: 'SB',
    iso: 'SLB',
    label: 'Solomon Islands',
    phone: '677',
  },
  {
    ioc: 'SEY',
    iso2: 'SC',
    iso: 'SYC',
    label: 'Seychelles',
    phone: '248',
  },
  {
    ioc: 'SUD',
    iso2: 'SD',
    iso: 'SDN',
    label: 'Sudan',
    phone: '249',
  },
  {
    ioc: 'SWE',
    iso2: 'SE',
    iso: 'SWE',
    label: 'Sweden',
    phone: '46',
  },
  {
    ioc: 'SIN',
    iso2: 'SG',
    iso: 'SGP',
    label: 'Singapore',
    phone: '65',
  },
  {
    ioc: 'HEL',
    iso2: 'SH',
    iso: 'SHN',
    label: 'Saint Helena',
    phone: '290',
  },
  {
    ioc: 'SLO',
    iso2: 'SI',
    iso: 'SVN',
    label: 'Slovenia',
    phone: '386',
  },
  {
    ioc: '',
    iso2: 'SJ',
    iso: 'SJM',
    label: 'Svalbard and Jan Mayen',
    phone: '47',
  },
  {
    ioc: 'SVK',
    iso2: 'SK',
    iso: 'SVK',
    label: 'Slovakia',
    phone: '421',
  },
  {
    ioc: 'SLE',
    iso2: 'SL',
    iso: 'SLE',
    label: 'Sierra Leone',
    phone: '232',
  },
  {
    ioc: 'SMR',
    iso2: 'SM',
    iso: 'SMR',
    label: 'San Marino',
    phone: '378',
  },
  {
    ioc: 'SEN',
    iso2: 'SN',
    iso: 'SEN',
    label: 'Senegal',
    phone: '221',
  },
  {
    ioc: 'SOM',
    iso2: 'SO',
    iso: 'SOM',
    label: 'Somalia',
    phone: '252',
  },
  {
    ioc: 'SUR',
    iso2: 'SR',
    iso: 'SUR',
    label: 'Suriname',
    phone: '597',
  },
  {
    ioc: '',
    iso2: 'SS',
    iso: 'SSD',
    label: 'South Sudan',
    phone: '211',
  },
  {
    ioc: 'STP',
    iso2: 'ST',
    iso: 'STP',
    label: 'Sao Tome and Principe',
    phone: '239',
  },
  {
    ioc: 'ESA',
    iso2: 'SV',
    iso: 'SLV',
    label: 'El Salvador',
    phone: '503',
  },
  {
    ioc: '',
    iso2: 'SX',
    iso: 'SMX',
    label: 'Sint Maarten',
    phone: '1-721',
  },
  {
    ioc: 'SYR',
    iso2: 'SY',
    iso: 'SYR',
    label: 'Syria',
    phone: '963',
  },
  {
    ioc: '',
    iso2: 'SZ',
    iso: 'SWZ',
    label: 'Swaziland',
    phone: '268',
  },
  {
    ioc: 'TKS',
    iso2: 'TC',
    iso: 'TCA',
    label: 'Turks and Caicos Islands',
    phone: '1-649',
  },
  {
    ioc: 'CHA',
    iso2: 'TD',
    iso: 'TCD',
    label: 'Chad',
    phone: '235',
  },
  {
    ioc: '',
    iso2: 'TF',
    iso: 'ATF',
    label: 'French Southern Territories',
    phone: '262',
  },
  {
    ioc: 'TOG',
    iso2: 'TG',
    iso: 'TGO',
    label: 'Togo',
    phone: '228',
  },
  {
    ioc: 'THA',
    iso2: 'TH',
    iso: 'THA',
    label: 'Thailand',
    phone: '66',
  },
  {
    ioc: 'TJK',
    iso2: 'TJ',
    iso: 'TJK',
    label: 'Tajikistan',
    phone: '992',
  },
  {
    ioc: '',
    iso2: 'TK',
    iso: 'TKL',
    label: 'Tokelau',
    phone: '690',
  },
  {
    ioc: 'TLS',
    iso2: 'TL',
    iso: 'TLS',
    label: 'Timor-Leste',
    phone: '670',
  },
  {
    ioc: 'TKM',
    iso2: 'TM',
    iso: 'TKM',
    label: 'Turkmenistan',
    phone: '993',
  },
  {
    ioc: 'TUN',
    iso2: 'TN',
    iso: 'TUN',
    label: 'Tunisia',
    phone: '216',
  },
  {
    ioc: 'TGA',
    iso2: 'TO',
    iso: 'TON',
    label: 'Tonga',
    phone: '676',
  },
  {
    ioc: 'TUR',
    iso2: 'TR',
    iso: 'TUR',
    label: 'Turkey',
    phone: '90',
  },
  {
    ioc: 'TTO',
    iso2: 'TT',
    iso: 'TTO',
    label: 'Trinidad and Tobago',
    phone: '1-868',
  },
  {
    ioc: 'TUV',
    iso2: 'TV',
    iso: 'TUV',
    label: 'Tuvalu',
    phone: '688',
  },
  {
    ioc: 'TPE',
    iso2: 'TW',
    iso: 'TWN',
    label: 'Taiwan',
    phone: '886',
  },
  {
    ioc: 'TAN',
    iso2: 'TZ',
    iso: 'TZA',
    label: 'United Republic of Tanzania',
    phone: '255',
  },
  {
    ioc: 'UKR',
    iso2: 'UA',
    iso: 'UKR',
    label: 'Ukraine',
    phone: '380',
  },
  {
    ioc: 'UGA',
    iso2: 'UG',
    iso: 'UGA',
    label: 'Uganda',
    phone: '256',
  },
  {
    ioc: 'USA',
    iso2: 'US',
    label: 'United States',
    phone: '1',
    suggested: true,
    iso: 'USA',
  },
  {
    ioc: 'URU',
    iso2: 'UY',
    iso: 'URY',
    label: 'Uruguay',
    phone: '598',
  },
  {
    ioc: 'UZB',
    iso2: 'UZ',
    iso: 'UZB',
    label: 'Uzbekistan',
    phone: '998',
  },
  {
    ioc: '',
    iso2: 'VA',
    iso: 'VAT',
    label: 'Holy See (Vatican City State)',
    phone: '379',
  },
  {
    ioc: 'VIN',
    iso2: 'VC',
    iso: 'VCT',
    label: 'Saint Vincent and the Grenadines',
    phone: '1-784',
  },
  {
    ioc: 'VEN',
    iso2: 'VE',
    iso: 'VEN',
    label: 'Venezuela',
    phone: '58',
  },
  {
    ioc: 'IVB',
    iso2: 'VG',
    iso: 'VGB',
    label: 'British Virgin Islands',
    phone: '1-284',
  },
  {
    ioc: 'ISV',
    iso2: 'VI',
    iso: 'VIR',
    label: 'US Virgin Islands',
    phone: '1-340',
  },
  {
    ioc: 'VIE',
    iso2: 'VN',
    iso: 'VNM',
    label: 'Vietnam',
    phone: '84',
  },
  {
    ioc: 'VAN',
    iso2: 'VU',
    iso: 'VUT',
    label: 'Vanuatu',
    phone: '678',
  },
  {
    ioc: 'WAF',
    iso2: 'WF',
    iso: 'WLF',
    label: 'Wallis and Futuna',
    phone: '681',
  },
  {
    ioc: 'SAM',
    iso2: 'WS',
    iso: 'WSM',
    label: 'Samoa',
    phone: '685',
  },
  {
    ioc: 'KOS',
    iso2: 'XK',
    iso: 'KOS',
    label: 'Kosovo',
    phone: '383',
  },
  {
    ioc: 'YEM',
    iso2: 'YE',
    iso: 'YEM',
    label: 'Yemen',
    phone: '967',
  },
  {
    ioc: 'MAY',
    iso2: 'YT',
    iso: 'MYT',
    label: 'Mayotte',
    phone: '262',
  },
  {
    ioc: 'RSA',
    iso2: 'ZA',
    iso: 'ZAF',
    label: 'South Africa',
    phone: '27',
  },
  {
    ioc: 'ZAM',
    iso2: 'ZM',
    iso: 'ZMB',
    label: 'Zambia',
    phone: '260',
  },
  {
    ioc: 'ZIM',
    iso2: 'ZW',
    iso: 'ZWE',
    label: 'Zimbabwe',
    phone: '263',
  },
];
