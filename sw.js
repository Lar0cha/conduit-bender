// Cache the app so it opens with no signal on the job site.
// Bump the version when files change, or phones keep the old copy.
const CACHE = "bender-v3";
const FILES = ["./", "index.html", "bend.js", "manifest.json", "icon.png"];

self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))));
self.addEventListener("activate", e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
));
self.addEventListener("fetch", e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
