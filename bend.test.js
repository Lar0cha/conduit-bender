// Run: node bend.test.js
// Expected values come straight from the tables in reference-tables/.
const assert = require("assert");
const { offset, stub90, backToBack, saddle3, saddle4, tape } = require("./bend");

const near = (a, b) => assert.ok(Math.abs(a - b) < 0.01, `${a} != ${b}`);
const o = offset(6, 30); // 6" offset at 30°: multiplier 2, shrink 1/4" per inch
near(o.distance, 12);
near(o.shrink, 1.5);
near(offset(10, 45).distance, 14);
near(offset(4, 22.5).shrink, 0.75);

near(stub90(12, '1/2" EMT', "in").mark, 7); // 12" stub, take-up 5"
near(stub90(12, '1-1/4" EMT', "in").mark, 1);
near(stub90(12, '3/4" rigid', "in").mark, 4);
near(stub90(300, '3/4" EMT', "mm").mark, 148);
near(backToBack(48).mark, 48);

// 3-point table rows: 6" obstacle at 45° = shrink 1-1/8", side 15"; at 60° = 1-1/2", 12".
const s3 = saddle3(6, 30);
near(s3.shrink, 1.125);
near(s3.center, 31.125);
near(s3.last - s3.center, 15);
near(s3.center - s3.first, 15);
const s60 = saddle3(6, 30, 0, 60);
near(s60.shrink, 1.5);
near(s60.last - s60.center, 12);
near(saddle3(3, 30).shrink, 9 / 16);
// 4" long obstacle at 45°: center raised by 2·tan(22.5°) = 0.83"
near(saddle3(2, 30, 4).height, 2.83);

// 4-point: 4" high, 10" wide, starts 40" in, 30° offsets.
const s4 = saddle4(4, 10, 40, 30);
near(s4.marks[1] - s4.marks[0], 8);
near(s4.marks[2] - s4.marks[1], 10);
near(s4.marks[1], 41);
near(s4.shrink, 2);

assert.strictEqual(tape(29.61, "in"), '29 5/8"');
assert.strictEqual(tape(12, "in"), '12"');
assert.strictEqual(tape(1.61, "in"), '1 5/8"');
assert.strictEqual(tape(0.4, "in"), '3/8"');
assert.strictEqual(tape(3.22, "in"), '3 1/4"'); // no sixteenths: 3 3/16 rounds to 3 1/4
assert.strictEqual(tape(0.69, "in"), '3/4"');
assert.strictEqual(tape(7.99, "in"), '8"'); // rounds up across the whole inch
assert.strictEqual(tape(147.6, "mm"), "148 mm");
console.log("ok");
