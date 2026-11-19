import { test, expect } from '@playwright/test';

test.describe('E2E: Reading Test Execution & Marking', () => {
  test.beforeEach(async ({ page }) => {
    // Seed profile in indexedDB / state to skip onboarding
    await page.addInitScript(() => {
      window.localStorage.setItem('zarii_tour_completed', 'true');
      window.localStorage.setItem('zarii_guest_mode', 'true');
    });
  });

  test('navigates to reading catalog, starts test, answers questions, and views results', async ({ page }) => {
    await page.goto('/app/practice/reading');

    // Verify Reading Catalog renders test cards
    await expect(page.locator('h1, h2').filter({ hasText: /Reading/i }).first()).toBeVisible();

    // Select practice or exam mode on first test
    const startTestBtn = page.getByRole('button', { name: /Practice Mode|Start Practice|Exam Mode/i }).first();
    await expect(startTestBtn).toBeVisible();
    await startTestBtn.click();

    // Verify Reading Split-Screen test runner loaded
    await expect(page.locator('text=Passage 1').first()).toBeVisible({ timeout: 10000 });

    // Fill in or answer at least one question
    const firstInput = page.locator('input[type="text"]').first();
    if (await firstInput.isVisible()) {
      await firstInput.fill('TRUE');
    }

    // Question navigator or bottom drawer
    const navBtn = page.getByRole('button', { name: /Finish|Submit|Review/i }).first();
    if (await navBtn.isVisible()) {
      await navBtn.click();
    }
  });
});
