const CACHE_NAME = 'nour-al-iman-v1';

const STATIC_ASSETS = ['/', '/azkar', '/quran', '/about', '/offline'];

// Install — cache static pages
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
  );
  self.clients.claim();
});

// Fetch — network first, fall back to cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests except CDN images/audio
  if (request.method !== 'GET') return;

  // Cache-first for CDN Quran images
  if (url.hostname === 'cdn.islamic.network' && url.pathname.includes('/images/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (response.ok) cache.put(request, response.clone());
        return response;
      })
    );
    return;
  }

  // Skip other cross-origin requests
  if (url.origin !== self.location.origin) return;

  // Network-first for same-origin pages
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        // Fallback to offline page for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('/offline') ?? new Response('Offline', { status: 503 });
        }
        return new Response('Offline', { status: 503 });
      })
  );
});
