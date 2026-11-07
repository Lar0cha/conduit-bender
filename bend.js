// Bend math. Unit-agnostic: pass inches or mm, get the same unit back
// (except take-up, which comes from the table for the chosen unit).
const rad = deg => deg * Math.PI / 180;

// Common EMT hand-bender take-up (deduct). Check against the numbers stamped on your bender.
const TAKE_UP = {
  in: { '1/2"': 5, '3/4"': 6, '1"': 8 },
  mm: { '1/2"': 127, '3/4"': 152, '1"': 203 },
};

// Offset: distance between the two marks and how much the run shrinks.
// Exact trig, so 30° gives multiplier 2.0 and shrink 1/4" per inch like the field tables.
function offset(height, angleDeg) {
  const a = rad(angleDeg);
  return { distance: height / Math.sin(a), shrink: height * Math.tan(a / 2) };
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

// 3-point saddle, 45° center and 22.5° sides. dist = conduit end to obstacle center.
function saddle3(height, dist) {
  const center = dist + height * Math.tan(rad(11.25));
  const side = height / Math.sin(rad(22.5));
  return { first: center - side, center, last: center + side, shrink: 2 * height * Math.tan(rad(11.25)) };
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
