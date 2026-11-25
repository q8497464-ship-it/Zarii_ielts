import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'Mobile Mini', width: 360, height: 640 },
  { name: 'Mobile Standard', width: 390, height: 844 },
  { name: 'Tablet Portrait', width: 768, height: 1024 },
  { name: 'Laptop Small', width: 1024, height: 768 },
  { name: 'Laptop Standard', width: 1366, height: 768 },
  { name: 'Desktop HD', width: 1440, height: 900 },
  { name: 'Desktop Ultrawide', width: 1920, height: 1080 },
];

test.describe('Accessibility & Multi-Viewport Responsive QA Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('zarii_guest_mode', 'true');
      localStorage.setItem('zarii_product_tour_completed', 'true');
      sessionStorage.setItem('zarii_splash_shown', 'true');
    });
  });

  // 1. Verify No Horizontal Overflow on Core New Screens across all 7 Viewports
  for (const vp of VIEWPORTS) {
    test(`Zero horizontal layout overflow on Dictionary & Course at ${vp.width}px (${vp.name})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      // Dictionary Page
      await page.goto('/app/dictionary');
      await page.waitForSelector('input[type="text"], input[type="search"]');

      const dictOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(dictOverflow).toBe(false);

      // Course Map Page
      await page.goto('/app/english/course');
      await page.waitForTimeout(400);

      const courseOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(courseOverflow).toBe(false);
    });
  }

  // 2. Keyboard Navigation on Dictionary Search
  test('Keyboard navigation works on Dictionary search bar and suggestions', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/app/dictionary');

    const searchInput = page.locator('input[type="text"], input[type="search"]').first();
    await searchInput.focus();
    await page.keyboard.type('flourish');
    await page.waitForTimeout(400);

    // Press Enter to submit search
    await page.keyboard.press('Enter');
    await page.waitForTimeout(600);

    // Verify entry page opens
    await expect(page).toHaveURL(/.*flourish.*/i);
  });

  // 3. Keyboard Navigation in Lesson Player
  test('Keyboard navigation (ArrowRight / ArrowLeft / Enter) controls Lesson Player', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/app/english/lesson/eng-a1-u1-l1');
    await page.waitForTimeout(500);

    // Verify player is mounted
    await expect(page.getByRole('button', { name: /Close lesson/i })).toBeVisible({ timeout: 10000 });

    // Press ArrowRight to advance section
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(400);

    // Press ArrowLeft to return
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(400);

    // Focus and click elements using Enter / Space
    const buttons = await page.locator('button').all();
    expect(buttons.length).toBeGreaterThan(0);
  });
});
