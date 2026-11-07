# Conduit Bender

Personal iPhone app that does the math for bending electrical conduit (EMT) with a hand bender: where to put the marks, what angle to use, and how much the run shrinks. It's a home-screen web app: no Mac, no App Store, works offline once installed.

## Version 1 covers
- [x] Offset: height + angle → distance between marks, shrink
- [ ] 90° stub-up: stub height → mark (minus take-up)
- [ ] Back-to-back 90: second mark from the first
- [ ] 3-point saddle: obstacle height → center mark, side marks, shrink
- [ ] 4-point saddle: two offsets → four marks
- [x] Inches / mm switch (the math is unit-agnostic)

## Run
On the PC: open `index.html` in a browser. Tests: `node bend.test.js`.

## Put it on the iPhone
1. Host the folder on https (e.g. GitHub Pages, free). Offline mode only works over https.
2. On the iPhone, open the link in **Safari** → Share → **Add to Home Screen**.
3. After changing files, bump `CACHE` in `sw.js` so the phone picks up the new version.

## Files
- `bend.js` — all bend math, no UI
- `bend.test.js` — checks against known field numbers
- `index.html` — the screen
- `manifest.json`, `icon.png` — home-screen name and icon
- `sw.js` — offline cache

## Open questions
- Take-up (deduct) depends on your bender and conduit size (common EMT: 1/2" = 5", 3/4" = 6", 1" = 8"). Which bender do you use?
- Show results as decimals or as fractions (1/16")?
