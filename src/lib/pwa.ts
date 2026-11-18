/**
 * PWA Service Worker Registration & Offline Download Manager
 */

const OFFLINE_TESTS_KEY = 'zarii_downloaded_tests';

export function registerServiceWorker(): void {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          // Check for worker updates periodically
          reg.onupdatefound = () => {
            const installing = reg.installing;
            if (installing) {
              installing.onstatechange = () => {
                if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('✓ New Zarii service worker installed and ready.');
                }
              };
            }
          };
        })
        .catch((err) => {
          console.warn('PWA Service Worker registration skipped:', err);
        });
    });
  }
}

export function subscribeToOnlineStatus(callback: (isOnline: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

/**
 * Get the set of test IDs marked as downloaded for offline use
 */
export function getOfflineTestIds(): string[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(OFFLINE_TESTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Check if a specific test is downloaded
 */
export function isTestDownloaded(testId: string): boolean {
  const list = getOfflineTestIds();
  return list.includes(testId);
}

/**
 * Download test resources for offline execution.
 * Dispatches a message to SW if available and updates local offline registry.
 */
export async function downloadTestForOffline(testId: string, urls: string[]): Promise<boolean> {
  try {
    // 1. Fetch URLs directly using Cache API if accessible
    if (typeof caches !== 'undefined') {
      const cache = await caches.open('zarii-offline-tests-v2');
      await Promise.all(
        urls.map(async (url) => {
          try {
            const response = await fetch(url);
            if (response.ok) {
              await cache.put(url, response);
            }
          } catch (e) {
            console.warn('[PWA] Direct fetch failed for', url, e);
          }
        })
      );
    }

    // 2. Also notify Service Worker if active
    if (typeof navigator !== 'undefined' && navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_TEST_ASSETS',
        testId,
        urls,
      });
    }

    // 3. Mark in localStorage registry
    if (typeof localStorage !== 'undefined') {
      const current = getOfflineTestIds();
      if (!current.includes(testId)) {
        current.push(testId);
        localStorage.setItem(OFFLINE_TESTS_KEY, JSON.stringify(current));
      }
    }

    // Dispatch custom event if in DOM environment
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('zarii:offline-tests-changed', { detail: { testId, downloaded: true } }));
    }
    return true;
  } catch (err) {
    console.error('Failed to download test for offline:', err);
    return false;
  }
}

/**
 * Remove an offline test from cache
 */
export async function removeOfflineTest(testId: string, urls: string[]): Promise<boolean> {
  try {
    if (typeof caches !== 'undefined') {
      const cache = await caches.open('zarii-offline-tests-v2');
      await Promise.all(urls.map((url) => cache.delete(url)));
    }

    if (typeof navigator !== 'undefined' && navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'PURGE_TEST_ASSETS',
        testId,
        urls,
      });
    }

    if (typeof localStorage !== 'undefined') {
      const current = getOfflineTestIds().filter((id) => id !== testId);
      localStorage.setItem(OFFLINE_TESTS_KEY, JSON.stringify(current));
    }

    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('zarii:offline-tests-changed', { detail: { testId, downloaded: false } }));
    }
    return true;
  } catch (err) {
    console.error('Failed to remove offline test:', err);
    return false;
  }
}
