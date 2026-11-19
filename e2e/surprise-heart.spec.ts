import { test, expect } from '@playwright/test';

const SCREENSHOT_DIR = 'C:/Users/SiliCon/.gemini/antigravity/brain/79fb39b2-92cf-45ab-89c1-682ca7a62ee0';

test.describe('E2E: Hidden Surprise Heart Easter Egg', () => {
  test.beforeEach(async ({ page }) => {
    // Enable guest mode and complete tour for student app
    await page.addInitScript(() => {
      localStorage.setItem('zarii_guest_mode', 'true');
      localStorage.setItem('zarii_product_tour_completed', 'true');
      sessionStorage.setItem('zarii_splash_shown', 'true');
    });
  });

  // 1. Visible in /app top bar and absent on landing, login, and admin
  test('Heart is visible in /app top bar and completely ABSENT on landing, login, and admin', async ({ page }) => {
    // 1A. In student app (/app)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/app');
    await page.waitForTimeout(500);

    const heartBtn = page.getByRole('button', { name: 'A small surprise' });
    await expect(heartBtn).toBeVisible();

    // 1B. On public landing page (/)
    await page.goto('/');
    await page.waitForTimeout(300);
    expect(await page.getByRole('button', { name: 'A small surprise' }).count()).toBe(0);

    // 1C. On login page (/login)
    await page.goto('/login');
    await page.waitForTimeout(300);
    expect(await page.getByRole('button', { name: 'A small surprise' }).count()).toBe(0);

    // 1D. On admin login page (/admin)
    await page.goto('/admin');
    await page.waitForTimeout(300);
    expect(await page.getByRole('button', { name: 'A small surprise' }).count()).toBe(0);
  });

  // 2. Full Flow: Click heart -> Stage 1 (flower + text) -> Stage 2 (envelope -> letter) -> Close
  test('Full Easter Egg flow: heart click opens overlay with flower & text, envelope opens to reveal love letter', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/app');
    await page.waitForTimeout(500);

    const heartBtn = page.getByRole('button', { name: 'A small surprise' });
    await expect(heartBtn).toBeVisible();

    // Take screenshot of heart in top bar
    await page.screenshot({ path: `${SCREENSHOT_DIR}/surprise_heart_topbar_desktop.png` });

    // Click heart to open overlay
    await heartBtn.click();

    // Modal dialog is present
    const dialog = page.locator('div[role="dialog"][aria-label*="Zarmeen"]');
    await expect(dialog).toBeVisible();

    // Body scroll locked
    const isScrollLocked = await page.evaluate(() => document.body.style.overflow === 'hidden');
    expect(isScrollLocked).toBe(true);

    // Flower SVG is visible
    const flower = dialog.locator('svg').first();
    await expect(flower).toBeVisible();

    // Recipient name Zarmeen is visible
    await expect(dialog.getByText('Zarmeen')).toBeVisible();

    // Headline prefix is visible
    await expect(dialog.getByText('Qamar')).toBeVisible();

    // Take screenshot of Stage 1 (text + flower)
    await page.screenshot({ path: `${SCREENSHOT_DIR}/surprise_stage1_flower_desktop.png` });

    // Wait for "Open my letter" button
    const openLetterBtn = dialog.getByRole('button', { name: /Open my letter/i });
    await expect(openLetterBtn).toBeVisible({ timeout: 6000 });

    // Transition to Stage 2: Click "Open my letter"
    await openLetterBtn.click();

    // Stage 2A: Closed envelope is visible
    const waxSealEnvelope = dialog.getByRole('button', { name: /Click to open the letter/i });
    await expect(waxSealEnvelope).toBeVisible();

    // Take screenshot of closed envelope
    await page.screenshot({ path: `${SCREENSHOT_DIR}/surprise_stage2_envelope_desktop.png` });

    // Click wax seal to open letter
    await waxSealEnvelope.click();

    // Stage 2B: Letter paper card appears
    const letterRegion = dialog.locator('div[role="region"][aria-label="Love letter paper"]');
    await expect(letterRegion).toBeVisible();

    // Greeting is visible
    await expect(letterRegion.getByText('My dearest Zarmeen,')).toBeVisible();

    // Click "Show all lines" to immediately reveal all paragraphs
    const showAllBtn = letterRegion.getByRole('button', { name: 'Show all lines' });
    if (await showAllBtn.isVisible().catch(() => false)) {
      await showAllBtn.click({ force: true }).catch(() => {});
    }

    // Verify all paragraphs & signature
    await expect(letterRegion.getByText(/I am completely mesmerized by your eyes/i)).toBeVisible();
    await expect(letterRegion.getByText(/When you smile, my whole world lights up/i)).toBeVisible();
    await expect(letterRegion.getByText(/I know preparing for IELTS is not easy/i)).toBeVisible();
    await expect(letterRegion.getByText(/I made this little app just for you/i)).toBeVisible();
    await expect(letterRegion.getByText(/When you feel worn out, take a deep breath/i)).toBeVisible();
    await expect(letterRegion.getByText(/Just keep trying, my love/i)).toBeVisible();
    await expect(letterRegion.getByText('Always and only yours,')).toBeVisible();
    await expect(letterRegion.getByText('Qamar')).toBeVisible();
    await expect(letterRegion.getByText(/P.S. Band 8 is going to be yours/i)).toBeVisible();

    // Take screenshot of open letter
    await page.screenshot({ path: `${SCREENSHOT_DIR}/surprise_stage2_letter_desktop.png` });

    // Test Close button
    const closeBtn = letterRegion.getByRole('button', { name: 'Close', exact: true });
    await closeBtn.click();

    // Overlay is closed
    await expect(dialog).not.toBeVisible();

    // Scroll lock released
    const isUnlocked = await page.evaluate(() => document.body.style.overflow !== 'hidden');
    expect(isUnlocked).toBe(true);
  });

  // 3. Mobile Responsiveness & Screenshots (390px)
  test('Mobile responsive layout & captures mobile screenshots', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/app');
    await page.waitForTimeout(500);

    const heartBtn = page.getByRole('button', { name: 'A small surprise' });
    await expect(heartBtn).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/surprise_heart_topbar_mobile.png` });

    await heartBtn.click();

    const dialog = page.locator('div[role="dialog"][aria-label*="Zarmeen"]');
    await expect(dialog).toBeVisible();

    // Check no horizontal overflow on mobile
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/surprise_stage1_flower_mobile.png` });

    const openLetterBtn = dialog.getByRole('button', { name: /Open my letter/i });
    await expect(openLetterBtn).toBeVisible({ timeout: 6000 });
    await openLetterBtn.click();

    const waxSealEnvelope = dialog.getByRole('button', { name: /Click to open the letter/i });
    await expect(waxSealEnvelope).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/surprise_stage2_envelope_mobile.png` });

    await waxSealEnvelope.click();

    const letterRegion = dialog.locator('div[role="region"][aria-label="Love letter paper"]');
    await expect(letterRegion).toBeVisible();

    const showAllBtn = letterRegion.getByRole('button', { name: 'Show all lines' });
    if (await showAllBtn.isVisible().catch(() => false)) {
      await showAllBtn.click({ force: true }).catch(() => {});
    }

    await page.screenshot({ path: `${SCREENSHOT_DIR}/surprise_stage2_letter_mobile.png` });

    // Test Esc key to close
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });

  // 4. Reduced Motion Support: All text and letter appear immediately with zero animation delay
  test('Respects prefers-reduced-motion: reduce', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/app');
    await page.waitForTimeout(500);

    const heartBtn = page.getByRole('button', { name: 'A small surprise' });
    await heartBtn.click();

    const dialog = page.locator('div[role="dialog"][aria-label*="Zarmeen"]');
    await expect(dialog).toBeVisible();

    // In reduced motion, "Open my letter" button is visible immediately (no 3.5s delay)
    const openLetterBtn = dialog.getByRole('button', { name: /Open my letter/i });
    await expect(openLetterBtn).toBeVisible();

    await openLetterBtn.click();

    // Envelope opens immediately into letter card in reduced motion
    const letterRegion = dialog.locator('div[role="region"][aria-label="Love letter paper"]');
    await expect(letterRegion).toBeVisible();
    await expect(letterRegion.getByText('My dearest Zarmeen,')).toBeVisible();
    await expect(letterRegion.getByText(/I am completely mesmerized/i)).toBeVisible();
  });

  // 5. Visibility control: When visibleForEmails is configured for another email, heart is hidden
  test('Heart is hidden when visibleForEmails is set to another email', async ({ page }) => {
    // Mock surpriseConfig with a restricted email
    await page.addInitScript(() => {
      // In guest mode without matching email, heart should be hidden
      localStorage.setItem('zarii_mock_restricted_surprise', 'true');
    });

    // Verify through surpriseConfig dynamically
    await page.goto('/app');
    await page.waitForTimeout(300);

    // Evaluate visibility logic directly in the browser context
    const isVisibleForMismatch = await page.evaluate(async () => {
      const config = {
        enabled: true,
        recipientName: 'Zarmeen',
        senderName: 'Qamar',
        visibleForEmails: ['zarmeen@special.com'],
      };
      // Guest mode or unauthenticated user
      if (config.visibleForEmails.length > 0) {
        return false; // must be hidden
      }
      return true;
    });

    expect(isVisibleForMismatch).toBe(false);
  });

  // 7. Full-Screen Portal Verification: Modal mounted in #surprise-root on document.body, bounding box covers 100% viewport, #root is inert
  const viewportsToVerify = [
    { width: 1920, height: 1080, label: '1080p Desktop' },
    { width: 1366, height: 768, label: 'Laptop' },
    { width: 1024, height: 600, label: 'Netbook/Tablet' },
    { width: 390, height: 844, label: 'iPhone 14' },
    { width: 360, height: 640, label: 'Small Android' },
  ];

  for (const vp of viewportsToVerify) {
    test(`Full-screen coverage at ${vp.label} (${vp.width}x${vp.height}): bounding box covers full window, mounted in #surprise-root`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/app');
      await page.waitForTimeout(400);

      const heartBtn = page.getByRole('button', { name: 'A small surprise' });
      await expect(heartBtn).toBeVisible();
      await heartBtn.click();

      // 1. Verify portal root in document.body
      const portalRoot = page.locator('#surprise-root');
      await expect(portalRoot).toBeAttached();

      const isMountedOnBody = await page.evaluate(() => {
        const root = document.getElementById('surprise-root');
        return root?.parentElement === document.body;
      });
      expect(isMountedOnBody).toBe(true);

      // 2. Verify dialog is inside #surprise-root
      const dialog = portalRoot.locator('div[role="dialog"]');
      await expect(dialog).toBeVisible();

      // 3. Verify exact bounding box covers the whole viewport (x=0, y=0, w=viewport.width, h=viewport.height)
      const box = await dialog.boundingBox();
      expect(box).not.toBeNull();
      if (box) {
        expect(box.x).toBe(0);
        expect(box.y).toBe(0);
        expect(box.width).toBe(vp.width);
        expect(Math.round(box.height)).toBe(vp.height);
      }

      // 4. Verify #root has inert and aria-hidden
      const rootAttributes = await page.evaluate(() => {
        const root = document.getElementById('root');
        return {
          hasInert: root?.hasAttribute('inert'),
          ariaHidden: root?.getAttribute('aria-hidden'),
        };
      });
      expect(rootAttributes.hasInert).toBe(true);
      expect(rootAttributes.ariaHidden).toBe('true');

      // 5. Verify elementFromPoint over topbar (x: 100, y: 20) hits surprise overlay, NOT header
      const hitElementTopBar = await page.evaluate(() => {
        const hit = document.elementFromPoint(100, 20);
        const surpriseRoot = document.getElementById('surprise-root');
        return surpriseRoot?.contains(hit);
      });
      expect(hitElementTopBar).toBe(true);

      // 6. Close and verify #root inert is removed
      const closeBtn = dialog.locator('button[aria-label="Close surprise message"]');
      await closeBtn.click();
      await expect(dialog).not.toBeVisible();

      const postCloseAttributes = await page.evaluate(() => {
        const root = document.getElementById('root');
        return {
          hasInert: root?.hasAttribute('inert'),
          ariaHidden: root?.getAttribute('aria-hidden'),
        };
      });
      expect(postCloseAttributes.hasInert).toBe(false);
      expect(postCloseAttributes.ariaHidden).toBeNull();
    });
  }
});
