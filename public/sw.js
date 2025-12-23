const CACHE_NAME = 'snake-reborn-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.ico',
    '/src/main.js',
    '/src/styles/index.css',
    // Add other assets processed by Vite if reachable directly
    // In dev, Vite serves files differently. In prod build, these names change.
    // For this demo, we cache basics.
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
