const CACHE_NAME = 'mindstash-e186a96'; // bump on any static asset change
const ASSETS = [
  './index.html',
  './extract.js',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-maskable.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const { request } = e;
  // Never cache API calls — always hit the network.
  if (new URL(request.url).hostname === 'api.anthropic.com') return;
  // App shell: cache-first.
  e.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(res => {
      if (res.ok && request.method === 'GET') {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(request, clone));
      }
      return res;
    }))
  );
});
