export function isPowerOf2(n) {
  if (isNaN(n)) return false;
  return n && (n & (n - 1)) === 0;
}

export function deriveExponent(n) {
  if (!isPowerOf2(n)) return false;
  let m = n;
  let i = 1;
  while (m !== 2) {
    i += 1;
    m = m / 2;
  }
  return i;
}

export function nearestPowerOf2(val) {
  return Math.pow(2, Math.round(Math.log(val) / Math.log(2)));
}

export function isNumeric(value) {
  return !isNaN(parseFloat(value));
}

export function isOdd(num) {
  const numInt = parseInt(num);
  if (isNaN(numInt)) return undefined;
  if (numInt === 0) return false;
  return (numInt & -numInt) === 1;
}

export function nextPowerOf2(n) {
  if (isNaN(n)) return false;
  while (!isPowerOf2(n)) {
    n++;
  }
  return n;
}

export function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// does accept e.e. '1.0'
export function isConvertableInteger(n) {
  return Number.isSafeInteger(typeof n === 'string' ? +n : n);
}

// produces an approximated normal distribution between 0 and max
export function weightedRandom(max = 1, weight = 3, round = true) {
  let num = 0;
  for (let i = 0; i < weight; i++) {
    num += Math.random() * (max / weight);
  }
  return round && max > 1 ? Math.round(num) : num;
}

// round to nearest step, e.g. 0.25
function stepRound(value, step) {
  step || (step = 1.0);
  var inv = 1.0 / step;
  return Math.round(value * inv) / inv;
}

export function skewedDistribution(
  min,
  max,
  skew,
  significantDecimals = 2,
  step
) {
  const u = 1 - Math.random();
  const v = 1 - Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5;

  if (num > 1 || num < 0) {
    num = skewedDistribution(min, max, skew);
  } else {
    num = Math.pow(num, skew);
    num *= max - min;
    num += min;
  }

  if (step) num = stepRound(num, step);

  const fixedDecimals = parseFloat(num.toFixed(significantDecimals));
  return fixedDecimals;
}
