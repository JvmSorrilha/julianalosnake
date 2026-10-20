/* ============================================================
   Juliana Losnake — Service Worker
   PWA instalável + funcionamento offline dos arquivos essenciais
   ============================================================ */

const CACHE_VERSION = 'jl-site-2026-10-19-4';
const FONT_CACHE = 'jl-fonts-2026-10-19-4';

const CORE_ASSETS = [
  './',
  './index.html',
  './politica-de-privacidade.html',
  './site.webmanifest',
  './assets/styles.css',
  './assets/site.js',
  './assets/contact-config.js',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-maskable-512.png',
  './assets/apple-touch-icon.png',
  './assets/favicon.png',
  './assets/logo-wordmark-ink.png',
  './assets/logo-wordmark-cream.png',
  './assets/hero-720.webp',
  './assets/hero-1100.webp',
  './assets/hero-1100.jpg',
  './assets/about-680.webp',
  './assets/about-1040.webp',
  './assets/about-1040.jpg',
  './assets/bpc-640.webp',
  './assets/bpc-1000.webp',
  './assets/bpc-1000.jpg',
  './assets/manifesto-900.webp',
  './assets/manifesto-1500.webp',
  './assets/manifesto-1500.jpg',
  './assets/og-image.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION && key !== FONT_CACHE)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Fontes externas: cache em segundo plano, servindo a versão disponível.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith((async () => {
      const cache = await caches.open(FONT_CACHE);
      const cached = await cache.match(request);
      const network = fetch(request)
        .then(async (response) => {
          if (response.ok || response.type === 'opaque') {
            await cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })());
    return;
  }

  if (url.origin !== self.location.origin) return;

  // A configuração de contato deve ser sempre a mais recente quando online.
  if (url.pathname.endsWith('/assets/contact-config.js')) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        const cache = await caches.open(CACHE_VERSION);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch (_error) {
        return (await caches.match(request)) || Response.error();
      }
    })());
    return;
  }

  // Navegação: rede primeiro; se estiver offline, entrega a página em cache.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        const cache = await caches.open(CACHE_VERSION);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch (_error) {
        return (await caches.match(request))
          || (await caches.match('./index.html'))
          || (await caches.match('./politica-de-privacidade.html'))
          || Response.error();
      }
    })());
    return;
  }

  // Arquivos estáticos: cache primeiro, com atualização em segundo plano.
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      const cache = await caches.open(CACHE_VERSION);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch (_error) {
      return Response.error();
    }
  })());
});
