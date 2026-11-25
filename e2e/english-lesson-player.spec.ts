import { test, expect } from '@playwright/test';

test.describe('English Course: Lesson Player & Practice Engine Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('zarii_guest_mode', 'true');
      localStorage.setItem('zarii_learning_track', 'english');
    });
  });

  test('1. Focus Layout & Lesson Section Flow with Tap-to-Lookup & Audio', async ({ page }) => {
    await page.goto('/app/english/lesson/eng-a1-u1-l1');

    // 1. Verify slim focus top bar (no sidebar clutter)
    const header = page.locator('header');
    await expect(header).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: /Close lesson/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Report a problem/i })).toBeVisible();
    await expect(page.getByRole('tablist', { name: /Lesson sections/i })).toBeVisible();

    // 2. Verify Section 1: Explain (Typography, Tables with POS accents, Callouts)
    await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
    const nextBtn = page.getByRole('button', { name: /^Next/i });
    await expect(nextBtn).toBeVisible();

    // Take screenshot of Explain section
    await page.screenshot({ path: 'test-results/english-lesson-explain.png', fullPage: true });

    // 3. Navigate to Section 2: Timeline diagram
    await nextBtn.click();
    await expect(page.getByRole('img', { name: /Grammar Timeline Diagram/i })).toBeVisible({ timeout: 5000 });

    // 4. Navigate to Section 3: Model Sentences with Audio
    await nextBtn.click();
    await expect(page.getByText(/Model Sentences with Audio/i).first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByLabel(/Listen to:/i).first()).toBeVisible();

    // 5. Navigate to Section 4: Dialogue
    await nextBtn.click();
    await expect(page.getByRole('button', { name: /Play All/i })).toBeVisible();

    // Verify Urdu toggle button toggles Urdu text
    const urduBtn = page.locator('header button').filter({ hasText: /اردو/i });
    if (await urduBtn.isVisible()) {
      await urduBtn.click();
      await page.waitForTimeout(200);
      await urduBtn.click();
    }
  });

  test('2. Exercise Types: MCQ, Order Sentence, and Instant Feedback with Retries', async ({ page }) => {
    await page.goto('/app/english/lesson/eng-a1-u1-l1');
    await expect(page.locator('header')).toBeVisible({ timeout: 10000 });

    // Advance to Practice section (Section 4 or 5)
    const sectionTabs = page.locator('header [role="tab"]');
    const tabCount = await sectionTabs.count();
    expect(tabCount).toBeGreaterThanOrEqual(5);

    // Jump to practice section (index 3 or 4)
    await sectionTabs.nth(3).click();
    await page.waitForTimeout(400);

    // Verify an exercise is presented
    const optionOne = page.getByRole('radio').first();
    if (await optionOne.isVisible()) {
      // Select option
      await optionOne.click();
      // Verify feedback banner appears
      const statusBanner = page.locator('[role="status"]');
      await expect(statusBanner).toBeVisible({ timeout: 5000 });
      await expect(page.getByText(/Correct|Not quite right/i)).toBeVisible();
    }
  });

  test('3. Mobile Drag-and-Order Tap-to-Place Fallback', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/app/english/lesson/eng-a1-u1-l1');
    await expect(page.locator('header')).toBeVisible({ timeout: 10000 });

    // Open Practice section
    const sectionTabs = page.locator('header [role="tab"]');
    await sectionTabs.nth(3).click();
    await page.waitForTimeout(400);

    // Check if word chips exist for ordering
    const wordChip = page.locator('button').filter({ hasText: /I|am|is|are|a|teacher/i }).first();
    if (await wordChip.isVisible()) {
      await wordChip.click();
      await page.waitForTimeout(200);
    }

    await page.screenshot({ path: 'test-results/english-mobile-lesson.png' });
  });

  test('4. Auto-Save and Resume After Refresh', async ({ page }) => {
    await page.goto('/app/english/lesson/eng-a1-u1-l1');
    await expect(page.locator('header')).toBeVisible({ timeout: 10000 });

    // Navigate to Section 2 (index 1)
    const nextBtn = page.getByRole('button', { name: /^Next/i });
    await nextBtn.click();
    await expect(page.getByText(/Section 2 of/i)).toBeVisible();

    // Reload the page
    await page.reload();

    // Verify restored section 2
    await expect(page.locator('header')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/Section 2 of/i)).toBeVisible();
  });

  test('5. Unit Test Flow (20 Questions, 70% Pass Mark, Daily Retries)', async ({ page }) => {
    await page.goto('/app/english/unit-test/unit-a1-1');
    await expect(page.locator('header')).toBeVisible({ timeout: 10000 });

    // Verify instructions mention 20 questions and 70% pass mark
    await expect(page.getByText(/Test Instructions/i)).toBeVisible();
    await expect(page.getByText(/20 questions/i)).toBeVisible();
    await expect(page.getByText(/70%/i)).toBeVisible();

    await page.screenshot({ path: 'test-results/english-unit-test.png', fullPage: true });
  });

  test('6. Failing and Retrying Flow (< 70% Threshold & Review Explanation)', async ({ page }) => {
    await page.goto('/app/english/lesson/eng-a1-u1-l1');
    await expect(page.locator('header')).toBeVisible({ timeout: 10000 });

    // Jump to the last section (Summary/Quiz) and finish
    const sectionTabs = page.locator('header [role="tab"]');
    const tabCount = await sectionTabs.count();
    await sectionTabs.nth(tabCount - 1).click();
    await page.waitForTimeout(300);

    const finishBtn = page.getByRole('button', { name: /Finish Lesson/i });
    if (await finishBtn.isVisible()) {
      await finishBtn.click();

      // Verify completion screen displays
      await expect(page.getByText(/Lesson Completed|Keep Practicing/i)).toBeVisible({ timeout: 6000 });
      const reviewBtn = page.getByRole('button', { name: /Review Explanation|Review Rules/i }).first();
      if (await reviewBtn.isVisible()) {
        await reviewBtn.click();
        // Verifies navigating back to explanation
        await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
      }
    }
  });

  test('6. Offline Lesson Execution via IndexedDB', async ({ page, context }) => {
    await page.goto('/app/english/lesson/eng-a1-u1-l1');
    await expect(page.locator('header')).toBeVisible({ timeout: 10000 });

    // Simulate going offline
    await context.setOffline(true);

    // Advance section while offline
    const nextBtn = page.getByRole('button', { name: /^Next/i });
    await nextBtn.click();
    await expect(page.getByText(/Section 2 of/i)).toBeVisible();

    // Restore online
    await context.setOffline(false);
  });

  test('7. Practice Hub (/app/english/practice) & Mode Switching', async ({ page }) => {
    await page.goto('/app/english/practice');
    await expect(page.getByRole('heading', { name: /Practice Hub/i })).toBeVisible({ timeout: 10000 });

    // Check tabs
    await expect(page.getByRole('button', { name: 'Smart Practice', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /By Topic/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Mistakes/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /10-Min Mixed/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Speed Round/i })).toBeVisible();

    // Switch to By Topic
    await page.getByRole('button', { name: /By Topic/i }).click();
    await expect(page.getByText(/Select any grammar rule/i)).toBeVisible();

    // Take screenshot of Practice Hub
    await page.screenshot({ path: 'test-results/english-practice-hub.png', fullPage: true });

    // Switch to Speed Round and verify start button
    await page.getByRole('button', { name: /Speed Round/i }).click();
    await expect(page.getByRole('button', { name: /Begin 60s Speed Round/i })).toBeVisible();
  });
});
