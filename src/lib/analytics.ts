/**
 * Privacy-Friendly Cookieless Web Analytics Helper
 * 100% Free & GDPR / CCPA compliant.
 * - No tracking cookies
 * - No personal data or IP collection
 * - Strictly respects Do-Not-Track (DNT) header
 * - Optional Cloudflare Web Analytics beacon injection if configured
 */

const DNT = typeof navigator !== 'undefined' && (navigator.doNotTrack === '1' || (window as any).doNotTrack === '1');

export function initPrivacyAnalytics(): void {
  if (typeof window === 'undefined') return;

  // If candidate enabled Do Not Track, honor it immediately
  if (DNT) {
    console.log('[Analytics] Do-Not-Track flag detected; cookieless analytics disabled.');
    return;
  }

  // Check if disabled by candidate in local settings
  const userDisabled = localStorage.getItem('zarii_analytics_enabled') === 'false';
  if (userDisabled) {
    return;
  }

  // Optional Cloudflare Web Analytics beacon token from environment
  const cfToken = (import.meta as any).env?.VITE_CLOUDFLARE_BEACON_TOKEN;
  if (cfToken && !document.getElementById('cloudflare-analytics-beacon')) {
    const script = document.createElement('script');
    script.id = 'cloudflare-analytics-beacon';
    script.defer = true;
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.setAttribute('data-cf-beacon', JSON.stringify({ token: cfToken }));
    document.head.appendChild(script);
    console.log('✓ Privacy-friendly cookieless Cloudflare Web Analytics initialized.');
  }
}

export function trackPageView(path: string): void {
  // Cookieless local diagnostic counter for user study habits
  if (typeof window === 'undefined' || DNT) return;
  try {
    const key = `zarii_pv_${path.replace(/[/]/g, '_')}`;
    const prev = parseInt(localStorage.getItem(key) || '0', 10);
    localStorage.setItem(key, String(prev + 1));
  } catch {
    // Ignore quota errors
  }
}
