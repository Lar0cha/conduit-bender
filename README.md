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
- Take-up uses common EMT values (1/2" = 5", 3/4" = 6", 1" = 8"). Change `TAKE_UP` in `bend.js` if your bender is stamped differently.
- Saddles use exact geometry, so side marks come out a bit wider than the 2.5× field rule (2.61×).
- Live at https://lar0cha.github.io/conduit-bender/

## Open questions
- Show results as decimals or as fractions (1/16")?
