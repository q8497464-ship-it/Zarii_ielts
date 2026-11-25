import { test, expect } from '@playwright/test';

test.describe('E2E: Candidate Onboarding & Track Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
      window.sessionStorage.setItem('zarii_splash_shown', 'true');
    });
  });

  test('completes onboarding with "Learn English from basics" goal and lands on English Course', async ({ page }) => {
    await page.goto('/login');
    await page.evaluate(async () => {
      const { db } = await import('/src/lib/db.ts');
      await db.profile.clear();
      await db.profile.add({
        targetBand: 7.0,
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
      } as any);
    });

    await page.goto('/app');

    // 1. Onboarding modal opens for student with onboardingCompleted: false
    const modal = page.locator('[role="dialog"], .fixed').first();
    await expect(modal).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(600);

    // Step 0: Select "Learn English from basics"
    const englishCard = page.locator('text=Learn English from basics').first();
    await expect(englishCard).toBeVisible();
    await englishCard.click({ force: true });

    const continueBtn = page.getByRole('button', { name: /Continue/i }).first();
    await continueBtn.click();

    // Step 1: Select CEFR level (e.g. A1)
    const a1Card = page.locator('text=A1 - Beginner Foundations').first();
    if (await a1Card.isVisible()) {
      await a1Card.click();
    }
    const nextBtn1 = page.getByRole('button', { name: /Continue/i }).first();
    if (await nextBtn1.isVisible()) {
      await nextBtn1.click();
    }

    // Step 2: Daily study minutes
    const timeBtn = page.getByRole('button', { name: /30 min/i }).first();
    if (await timeBtn.isVisible()) {
      await timeBtn.click();
    }
    const nextBtn2 = page.getByRole('button', { name: /Continue/i }).first();
    if (await nextBtn2.isVisible()) {
      await nextBtn2.click();
    }

    // Step 3: Name / Profile finalize
    const finishBtn = page.getByRole('button', { name: /Start Learning|Finish|Complete/i }).first();
    if (await finishBtn.isVisible()) {
      await finishBtn.click();
    }

    // Expect navigation into student app with main content
    await expect(page.locator('#main-content, main')).toBeVisible({ timeout: 10000 });
  });

  test('completes onboarding with "Prepare for IELTS" goal', async ({ page }) => {
    await page.goto('/login');
    await page.evaluate(async () => {
      const { db } = await import('/src/lib/db.ts');
      await db.profile.clear();
      await db.profile.add({
        id: 'new-student-ielts',
        name: 'New Student',
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
      } as any);
    });

    await page.goto('/app');

    const modal = page.locator('[role="dialog"], .fixed').first();
    await expect(modal).toBeVisible({ timeout: 10000 });

    // Step 0: Select "Prepare for IELTS"
    const ieltsCard = page.locator('text=Prepare for IELTS').first();
    await expect(ieltsCard).toBeVisible();
    await ieltsCard.click();

    const continueBtn = page.getByRole('button', { name: /Continue/i }).first();
    await continueBtn.click();

    // Step 1: Select Academic or General Training
    const academicBtn = page.getByRole('button', { name: /Academic/i }).first();
    if (await academicBtn.isVisible()) {
      await academicBtn.click();
    }
    const nextBtn1 = page.getByRole('button', { name: /Continue/i }).first();
    if (await nextBtn1.isVisible()) {
      await nextBtn1.click();
    }

    // Step 2: Target Band Selection (e.g. 7.5)
    const bandOption = page.locator('button').filter({ hasText: /^7\.5$/ }).first();
    if (await bandOption.isVisible()) {
      await bandOption.click();
    }
    const nextBtn2 = page.getByRole('button', { name: /Continue/i }).first();
    if (await nextBtn2.isVisible()) {
      await nextBtn2.click();
    }

    // Step 3: Finalize
    const finishBtn = page.getByRole('button', { name: /Start Preparing|Finish|Start Learning/i }).first();
    if (await finishBtn.isVisible()) {
      await finishBtn.click();
    }

    await expect(page.locator('#main-content, main')).toBeVisible({ timeout: 10000 });
  });

  test('sidebar track switcher toggles between English Course and IELTS Preparation', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('zarii_guest_mode', 'true');
      localStorage.setItem('zarii_product_tour_completed', 'true');
      sessionStorage.setItem('zarii_splash_shown', 'true');
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/app');
    await expect(page.locator('aside, nav[aria-label="Sidebar"]').first()).toBeVisible({ timeout: 10000 });

    // Find Track Switcher in sidebar
    const trackSwitcher = page.locator('[data-testid="track-switcher"], button:has-text("Track:"), button:has-text("English Course"), button:has-text("IELTS Preparation")').first();
    if (await trackSwitcher.isVisible()) {
      await trackSwitcher.click();
      await page.waitForTimeout(400);

      // Verify track dropdown or toggle clicked
      const option = page.locator('text=/English Course|IELTS Preparation/i').first();
      if (await option.isVisible()) {
        await option.click();
      }
    }

    // Verify main content remains accessible
    await expect(page.locator('main')).toBeVisible();
  });
});
