# Conduit Bender

Personal iPhone app that does the math for bending electrical conduit (EMT) with a hand bender: where to put the marks, what angle to use, and how much the run shrinks. It's a home-screen web app: no Mac, no App Store, works offline once installed.

## Version 1 covers
- [x] Offset: height + angle → distance between marks, shrink
- [x] 90° stub-up: stub height → mark (minus take-up)
- [x] Back-to-back 90: second mark from the first
- [x] 3-point saddle: obstacle height → center mark, side marks, shrink
- [x] 4-point saddle: two offsets → four marks
- [x] Inches / mm switch (the math is unit-agnostic)

## Run
On the PC: open `index.html` in a browser. Tests: `node bend.test.js`.

## Put it on the iPhone
1. Host the folder on https (e.g. GitHub Pages, free). Offline mode only works over https.
2. On the iPhone, open the link in **Safari** → Share → **Add to Home Screen**.
3. With signal the app always loads the latest version; without signal it uses the last copy it saw.

## Files
- `bend.js` — all bend math, no UI
- `bend.test.js` — checks against known field numbers
- `index.html` — the screen
- `manifest.json`, `icon.png` — home-screen name and icon
- `sw.js` — offline cache

## Notes
- All numbers come from the field tables in `reference-tables/`: 90° take-up (EMT and rigid), offset multipliers and shrink, and the 3-point saddle table (45° and 60° center). They live at the top of `bend.js`.
- Only the obstacle-length raise on the 3-point saddle uses trig (the tables don't cover it).
- Live at https://lar0cha.github.io/conduit-bender/

## Open questions
- Show results as decimals or as fractions (1/16")?
