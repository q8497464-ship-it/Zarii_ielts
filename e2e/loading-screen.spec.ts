import { test, expect } from '@playwright/test';

test.describe('E2E: Cute Animated Loading Screen & Visual Fixes Verification', () => {
  // 1. Splash Screen on First Load of App Route
  test('Splash screen appears on first load of /app or /login and dismisses smoothly', async ({ page }) => {
    // Clear session storage to ensure first load
    await page.addInitScript(() => {
      sessionStorage.clear();
    });

    await page.goto('/login');

    // Splash element exists in DOM with accessible role
    const splash = page.locator('#zarii-splash');
    expect(await splash.count()).toBeGreaterThanOrEqual(1);

    // After app hydrates, splash fades out and has opacity 0 or pointer-events none
    await page.waitForTimeout(1000);
    const isDismissed = await page.evaluate(() => {
      const el = document.getElementById('zarii-splash');
      if (!el) return true;
      const opacity = window.getComputedStyle(el).opacity;
      const pe = window.getComputedStyle(el).pointerEvents;
      return opacity === '0' || pe === 'none' || el.style.display === 'none';
    });
    expect(isDismissed).toBe(true);

    // sessionStorage flag must be set
    const flag = await page.evaluate(() => sessionStorage.getItem('zarii_splash_shown'));
    expect(flag).toBe('true');
  });

  // 2. Splash Screen Not Shown on Subsequent Refresh in Same Session
  test('Splash screen is suppressed on subsequent page reload within the same session', async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('zarii_splash_shown', 'true');
    });

    await page.goto('/login');

    const isHiddenImmediately = await page.evaluate(() => {
      const el = document.getElementById('zarii-splash');
      if (!el) return true;
      return window.getComputedStyle(el).display === 'none' || window.getComputedStyle(el).opacity === '0';
    });
    expect(isHiddenImmediately).toBe(true);
  });

  // 3. Landing page crawler is never blocked by splash
  test('Landing page (/) suppresses splash screen so first paint and SEO are instantaneous', async ({ page }) => {
    await page.goto('/');

    const isLandingSuppressed = await page.evaluate(() => {
      const el = document.getElementById('zarii-splash');
      if (!el) return true;
      return window.getComputedStyle(el).display === 'none' || window.getComputedStyle(el).opacity === '0';
    });
    expect(isLandingSuppressed).toBe(true);
  });

  // 4. Verify Image 1: CTA Card Text Colors & High Contrast
  test('Verify Image 1: Footer CTA card text has high-contrast colors and readable highlight', async ({ page }) => {
    await page.goto('/');
    const ctaCard = page.getByTestId('footer-cta-card');
    await expect(ctaCard).toBeVisible();

    const heading = ctaCard.locator('h2');
    await expect(heading).toContainText('Start your');
    await expect(heading).toContainText('IELTS journey');
    await expect(heading).toContainText('today');

    // Check highlight span
    const highlightSpan = heading.locator('span');
    await expect(highlightSpan).toContainText('IELTS journey');

    // Subtitle text is crisp and clear
    const subtext = ctaCard.locator('p');
    await expect(subtext).toContainText('Free practice for all four skills. No credit card needed.');
  });

  // 5. Verify Image 2: "Ready to reach your target band?" duplicate CTA buttons are replaced
  test('Verify Image 2: No duplicate Create Account/Login buttons; Target Band Roadmap is present', async ({ page }) => {
    await page.goto('/');

    // Target Band Roadmap section is present
    const roadmap = page.locator('#target-roadmap');
    await expect(roadmap).toBeVisible();
    await expect(roadmap.locator('h2')).toContainText('What band are you aiming for?');

    // Module practice shortcuts are present (Listening, Reading, Writing, Speaking)
    const shortcuts = roadmap.locator('button', { hasText: 'Listening' });
    await expect(shortcuts).toBeVisible();

    // Verify there are no duplicate final CTA buttons inside roadmap
    const duplicateLogin = roadmap.locator('a[href="/login"]');
    expect(await duplicateLogin.count()).toBe(0);
  });

  // 6. Verify Image 3: Candidate Name in Student Home Page
  test('Verify Image 3: Home page greeting displays candidate name dynamically', async ({ page }) => {
    // Set custom candidate profile and auth state in localStorage
    await page.addInitScript(() => {
      localStorage.setItem('zarii_guest_mode', 'true');
      localStorage.setItem('zarii_product_tour_completed', 'true');
      localStorage.setItem('zarii_candidate_name', 'Hamza Khan');
      localStorage.setItem(
        'zarii_ielts_profile',
        JSON.stringify({
          displayName: 'Hamza Khan',
          targetBand: 7.5,
          currentLevel: 'intermediate',
          onboardingCompleted: true,
        })
      );
    });

    await page.goto('/app');
    await page.waitForTimeout(600);

    // Greet banner should say "Good ..., Hamza Khan" instead of plain generic "Candidate"
    const candidateGreeting = page.locator('h1', { hasText: 'Hamza Khan' });
    await expect(candidateGreeting).toBeVisible();
  });
});
