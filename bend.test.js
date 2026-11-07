// Run: node bend.test.js
const assert = require("assert");
const { offset } = require("./bend");

const near = (a, b) => assert.ok(Math.abs(a - b) < 0.01, `${a} != ${b}`);
const o = offset(6, 30); // 6" offset at 30°: marks 12" apart, shrink 1.5"
near(o.distance, 12);
near(o.shrink, 1.61); // exact tan(15°)*6; the 1/4"-per-inch table rounds this to 1.5
near(offset(10, 45).distance, 14.14);
console.log("ok");
