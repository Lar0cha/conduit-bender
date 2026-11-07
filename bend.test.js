// Run: node bend.test.js
const assert = require("assert");
const { offset, stub90, backToBack, saddle3, saddle4, tape } = require("./bend");

const near = (a, b) => assert.ok(Math.abs(a - b) < 0.01, `${a} != ${b}`);
const o = offset(6, 30); // 6" offset at 30°: marks 12" apart, shrink 1.5"
near(o.distance, 12);
near(o.shrink, 1.61); // exact tan(15°)*6; the 1/4"-per-inch table rounds this to 1.5
near(offset(10, 45).distance, 14.14);

near(stub90(12, '1/2"', "in").mark, 7); // 12" stub, 1/2" EMT: mark at 12 - 5
near(stub90(300, '3/4"', "mm").mark, 148);
near(backToBack(48).mark, 48);

// 3-point: 2" obstacle centered 30" in. Field rule: center +3/16"/in, sides 2.5x height.
const s3 = saddle3(2, 30);
near(s3.center, 30.40); // field: 30.375
near(s3.last - s3.center, 5.23); // field: 5
near(s3.center - s3.first, s3.last - s3.center);

// 3-point with a 4" long obstacle: center raised by 2·tan(22.5°) = 0.83"
near(saddle3(2, 30, 4).height, 2.83);
near(saddle3(2, 30, 0).center, s3.center);

// 4-point: 4" high, 10" wide, starts 40" in, 30° offsets.
const s4 = saddle4(4, 10, 40, 30);
near(s4.marks[1] - s4.marks[0], 8);
near(s4.marks[2] - s4.marks[1], 10);
near(s4.marks[1], 40 + offset(4, 30).shrink);
near(s4.shrink, 2 * offset(4, 30).shrink);
assert.strictEqual(tape(29.61, "in"), '29 5/8"');
assert.strictEqual(tape(12, "in"), '12"');
assert.strictEqual(tape(1.61, "in"), '1 5/8"');
assert.strictEqual(tape(0.4, "in"), '3/8"');
assert.strictEqual(tape(3.22, "in"), '3 1/4"'); // no sixteenths: 3 3/16 rounds to 3 1/4
assert.strictEqual(tape(0.69, "in"), '3/4"');
assert.strictEqual(tape(7.99, "in"), '8"'); // rounds up across the whole inch
assert.strictEqual(tape(147.6, "mm"), "148 mm");
console.log("ok");
