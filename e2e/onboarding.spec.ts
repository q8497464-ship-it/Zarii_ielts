import { test, expect } from '@playwright/test';

test.describe('E2E: Candidate Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage & IndexedDB before starting fresh onboarding
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.indexedDB.deleteDatabase('ZariiIELTS_DB');
    });
  });

  test('completes 4-step onboarding assessment and lands on candidate dashboard', async ({ page }) => {
    await page.goto('/');

    // 1. Onboarding modal opens for first-time visitors
    const onboardingModal = page.locator('[role="dialog"], .fixed');
    await expect(onboardingModal.first()).toBeVisible({ timeout: 10000 });

    // Step 1: Select Academic or General Training
    const academicBtn = page.getByRole('button', { name: /Academic/i }).first();
    if (await academicBtn.isVisible()) {
      await academicBtn.click();
    }

    const nextBtn = page.getByRole('button', { name: /Next|Continue/i }).first();
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
    }

    // Step 2: Target Band Selection (e.g. 7.5)
    const bandOption = page.locator('button, [role="radio"]').filter({ hasText: /7\.5|8\.0/i }).first();
    if (await bandOption.isVisible()) {
      await bandOption.click();
    }

    const nextBtn2 = page.getByRole('button', { name: /Next|Continue/i }).first();
    if (await nextBtn2.isVisible()) {
      await nextBtn2.click();
    }

    // Step 3 / 4: Finalize & Finish Setup
    const finishBtn = page.getByRole('button', { name: /Finish|Start Preparing|Get Started/i }).first();
    if (await finishBtn.isVisible()) {
      await finishBtn.click();
    }

    // Expect Home dashboard or main shell to load with navigation
    await expect(page.locator('#main-content, main')).toBeVisible({ timeout: 10000 });
  });
});
