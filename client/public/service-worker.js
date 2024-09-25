self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/index.html',
                '/manifest.json',
                '/referee.png',
                '/icon-192x192.png',
                '/icon-512x512.png',
                '/comingsoon.mp4',
                '/football-bg.mp4',
                '/Football_SVG.svg',
                '/football-texture.svg',
                '/PSP-Logo-cutout.png',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});