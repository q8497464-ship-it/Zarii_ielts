import { test, expect } from '@playwright/test';

test.describe('E2E: Listening Test Execution', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('zarii_tour_completed', 'true');
      window.localStorage.setItem('zarii_guest_mode', 'true');
    });
  });

  test('navigates to listening catalog, enters practice test, verifies audio bar and questions', async ({ page }) => {
    await page.goto('/app/practice/listening');

    // Verify Listening Catalog
    await expect(page.locator('h1, h2').filter({ hasText: /Listening/i }).first()).toBeVisible();

    // Launch practice mode
    const practiceBtn = page.getByRole('button', { name: /Practice Mode|Start/i }).first();
    await expect(practiceBtn).toBeVisible();
    await practiceBtn.click();

    // Verify test runner audio engine or instructions
    await expect(page.locator('text=/Section 1|Part 1/i').first()).toBeVisible({ timeout: 10000 });

    // Verify questions inputs exist
    const inputs = page.locator('input[type="text"]');
    await expect(inputs.first()).toBeVisible();
    await inputs.first().fill('park');
  });
});
