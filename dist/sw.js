/**
 * Zarii IELTS Service Worker (v2)
 * Advanced Offline-First Architecture:
 * - Pre-caches application shell and critical assets
 * - Stale-While-Revalidate for test content, vocabulary, and JSON files
 * - Message-based On-Demand Download for offline tests
 * - Safe network fallback for client-side navigation
 */

const STATIC_CACHE = 'zarii-static-v3';
const DYNAMIC_CACHE = 'zarii-content-v3';
const OFFLINE_TESTS_CACHE = 'zarii-offline-tests-v3';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icons/icon.svg',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
  '/og-image.svg',
  '/robots.txt',
  '/sitemap.xml',
];

// Install Event: Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event: Clean up old versions
self.addEventListener('activate', (event) => {
  const allowedCaches = [STATIC_CACHE, DYNAMIC_CACHE, OFFLINE_TESTS_CACHE];
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (!allowedCaches.includes(key)) {
            console.log('[SW] Purging outdated cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Stale-While-Revalidate Strategy for Content JSONs
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  // Background fetch to update cache
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch((err) => {
      // Network offline or failed; silent fallback to cache
      return null;
    });

  // Return cached immediately if available, else await network
  if (cachedResponse) {
    return cachedResponse;
  }
  const networkResponse = await fetchPromise;
  if (networkResponse) {
    return networkResponse;
  }
  // Return empty JSON fallback if neither cache nor network available
  return new Response(JSON.stringify({ error: 'Offline content not cached' }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Fetch Event Handler
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests and external API endpoints (e.g. LLM APIs)
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // 1. Practice & Test Content JSONs: Stale-While-Revalidate
  if (url.pathname.includes('/content/') || url.pathname.endsWith('.json')) {
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
    return;
  }

  // 2. Static bundled assets (JS, CSS, SVGs, Fonts, Images): Cache-First
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.ttf')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 3. Navigation HTML Requests: Network-First with Offline /index.html Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match('/index.html').then((fallback) => {
            return fallback || caches.match('/');
          });
        })
    );
    return;
  }
});

// Message Listener for On-Demand Test Offline Downloads
self.addEventListener('message', async (event) => {
  const { data } = event;
  if (!data || !data.type) return;

  if (data.type === 'CACHE_TEST_ASSETS') {
    const { testId, urls } = data;
    try {
      const cache = await caches.open(OFFLINE_TESTS_CACHE);
      await Promise.all(
        urls.map(async (url) => {
          try {
            const response = await fetch(url);
            if (response.ok) {
              await cache.put(url, response);
            }
          } catch (e) {
            console.warn('[SW] Failed to prefetch test URL:', url, e);
          }
        })
      );

      // Reply back to client
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({ type: 'TEST_CACHED_SUCCESS', testId });
      }
    } catch (err) {
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({ type: 'TEST_CACHED_ERROR', testId, error: String(err) });
      }
    }
  }

  if (data.type === 'PURGE_TEST_ASSETS') {
    const { testId, urls } = data;
    try {
      const cache = await caches.open(OFFLINE_TESTS_CACHE);
      await Promise.all(urls.map((url) => cache.delete(url)));
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({ type: 'TEST_PURGED_SUCCESS', testId });
      }
    } catch (err) {
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({ type: 'TEST_PURGED_ERROR', testId, error: String(err) });
      }
    }
  }
});
