// Bend math. Unit-agnostic: pass inches or mm, get the same unit back.
const rad = deg => deg * Math.PI / 180;

// Offset: distance between the two marks and how much the run shrinks.
// Exact trig, so 30° gives multiplier 2.0 and shrink 1/4" per inch like the field tables.
function offset(height, angleDeg) {
  const a = rad(angleDeg);
  return { distance: height / Math.sin(a), shrink: height * Math.tan(a / 2) };
}

if (typeof module !== "undefined") module.exports = { offset };
