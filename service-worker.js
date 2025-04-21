const CACHE_NAME = 'pwa-cache-v2';
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/img/logoCNC.png',
    '/audio/Amo o Senhor - Salmo 116 (114-115).mp3',
    '/audio/Como são amáveis tuas moradas - Salmo 84 (83).mp3',
    '/audio/Eu venho Reunir (Is 66, 18-21).mp3',
    '/audio/Jesus percorria todas as Cidades (Mt 9, 35).mp3',
    '/audio/Ronão.mp3',
    '/audio/seOsenhor.mp3',
    '/audio/O senhor é minha luz e salvação - Salmo 27 (26).mp3',
    '/audio/WhatsApp-Audio-2024-07-19-at-15.26.14.mp3'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
