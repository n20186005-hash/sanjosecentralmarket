// sw.js — Service Worker para sanjosecentralmarket.com (sitio estático).
// Estrategia: network-first para GET del propio origen con caché de respaldo;
// fuera del origen (Google Maps, Open-Meteo, etc.) no se intercepta.
const CACHE_NAME = 'mc-sj-guide-v1';
const PRECACHE_URLS = [
  '/',
  '/privacidad/',
  '/terminos/',
  '/configuracion-de-cookies/',
  '/creditos-fotograficos/'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // Sólo manejamos navegación y activos del mismo origen con estrategia network-first.
  event.respondWith(
    fetch(req)
      .then((response) => {
        const copy = response.clone();
        if (response.ok) caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match('/')))
  );
});