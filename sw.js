// Keep a copy so the app opens with no signal on the job site.
// Network first: with signal you always get the latest version; the cache is only the fallback.
const CACHE = "bender-v8";
const FILES = ["./", "index.html", "bend.js", "manifest.json", "icon.png",
  "reference-tables/1-compensacion-curva-90.jpg", "reference-tables/2-formulas-offsets.jpg", "reference-tables/3-formulas-saddle-3-curvas.jpg"];

self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); });
self.addEventListener("activate", e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));
self.addEventListener("fetch", e => e.respondWith(
  fetch(e.request)
    .then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request))
));
