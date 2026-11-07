// Bend math, using the field tables in reference-tables/. Unit-agnostic: pass inches or mm,
// get the same unit back (except take-up, which comes from the table for the chosen unit).
const rad = deg => deg * Math.PI / 180;

// 1-compensacion-curva-90: take-up (deduct) for a 90.
const TAKE_UP = {
  in: { '1/2" EMT': 5, '3/4" EMT': 6, '1/2" rigid': 6, '1" EMT': 8, '3/4" rigid': 8, '1-1/4" EMT': 11, '1" rigid': 11 },
  mm: { '1/2" EMT': 127, '3/4" EMT': 152, '1/2" rigid': 152, '1" EMT': 203, '3/4" rigid': 203, '1-1/4" EMT': 279, '1" rigid': 279 },
};

// 2-formulas-offsets: multiplier and shrink per inch of offset, by bend angle.
const OFFSET = { 10: [6, 1 / 16], 22.5: [2.6, 3 / 16], 30: [2, 1 / 4], 45: [1.4, 3 / 8], 60: [1.2, 1 / 2] };

// 3-formulas-saddle-3-curvas: per inch of obstacle, [shrink added to center, center to side mark].
const SADDLE3 = { 45: [3 / 16, 2.5], 60: [1 / 4, 2] };

// Offset: distance between the two marks and how much the run shrinks.
function offset(height, angleDeg) {
  const [mult, shrink] = OFFSET[angleDeg];
  return { distance: height * mult, shrink: height * shrink };
}

// 90° stub-up: mark measured from the conduit end, arrow on the mark.
function stub90(height, size, unit) {
  return { mark: height - TAKE_UP[unit][size] };
}

// Back-to-back 90: mark at the outside-to-outside length from the back of the first 90,
// then put the bender's star (back-of-90 mark) on it, bender facing the other way.
function backToBack(length) {
  return { mark: length };
}

// 3-point saddle, 45° center (22.5° sides) or 60° center (30° sides). dist = conduit end to obstacle center.
// length = obstacle length along the run: the pipe slopes down from the peak, so the
// center is raised by (length/2)·tan(side angle) to clear both edges.
function saddle3(obstacle, dist, length = 0, centerDeg = 45) {
  const height = obstacle + (length / 2) * Math.tan(rad(centerDeg / 2));
  const [shrink, side] = SADDLE3[centerDeg].map(k => k * height);
  const center = dist + shrink;
  return { first: center - side, center, last: center + side, shrink, height };
}

// 4-point saddle: two offsets. dist = conduit end to where the obstacle starts.
function saddle4(height, width, dist, angleDeg) {
  const o = offset(height, angleDeg);
  const m2 = dist + o.shrink;
  return { marks: [m2 - o.distance, m2, m2 + width, m2 + width + o.distance], shrink: 2 * o.shrink };
}

// Read like a tape: inches to the nearest 1/8" (29.61 → 29 5/8"), mm to the nearest whole mm.
function tape(x, unit) {
  if (unit === "mm") return `${Math.round(x)} mm`;
  const eighths = Math.round(x * 8);
  let whole = Math.floor(eighths / 8), num = eighths % 8, den = 8;
  while (num && num % 2 === 0) { num /= 2; den /= 2; }
  return num ? `${whole ? whole + " " : ""}${num}/${den}"` : `${whole}"`;
}

if (typeof module !== "undefined") module.exports = { TAKE_UP, offset, stub90, backToBack, saddle3, saddle4, tape };
