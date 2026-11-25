import { test, expect } from '@playwright/test';

test.describe('English Progress, Study Plan & Motivation Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Set onboarded state in localStorage
    await page.addInitScript(() => {
      localStorage.setItem('zarii_onboarded', 'true');
      localStorage.setItem('zarii_product_tour_completed', 'true');
      localStorage.setItem('zarii_tour_completed', 'true');
      localStorage.setItem('zarii_primary_track', 'english');
      localStorage.setItem('zarii_candidate_name', 'Sarah Learner');
      localStorage.setItem('zarii_guest_mode', 'true');
    });
  });

  test('1. English Course Progress Page & Skill Tag Heatmap & Certificate', async ({ page }) => {
    await page.goto('/app/english/progress');
    await page.waitForLoadState('domcontentloaded');

    // Wait for the main content to load
    await expect(page.getByRole('heading', { name: 'Course Progress & Skill Map' })).toBeVisible({ timeout: 15000 });

    // Verify honest level estimate
    await expect(page.getByText('Estimated CEFR Level')).toBeVisible();

    // Verify Level Milestone Cards
    await expect(page.getByText('Level A1').first()).toBeVisible();
    await expect(page.getByText('Level A2').first()).toBeVisible();
    await expect(page.getByText('Level B1').first()).toBeVisible();

    // Verify Skill Tag Heatmap section
    await expect(page.getByText('Grammar Points Accuracy Heatmap')).toBeVisible();
    await expect(page.getByText('Mastered (≥80%)')).toBeVisible();
    await expect(page.getByText('Learning (50–79%)')).toBeVisible();
    await expect(page.getByText('Weak (<50%)')).toBeVisible();

    // Take screenshot of Progress Overview
    await page.screenshot({ path: 'test-results/english-progress-overview.png', fullPage: false });

    // Open a skill tag in the heatmap
    const tagButton = page.locator('button:has-text("Verb To Be")').first();
    if (await tagButton.isVisible()) {
      await tagButton.click();
      await expect(page.getByText('Practice This Topic')).toBeVisible();
      // Take screenshot of Skill Tag Detail
      await page.screenshot({ path: 'test-results/english-skill-heatmap.png', fullPage: false });
      // Close tag drawer
      await page.keyboard.press('Escape');
    }

    // Verify Certificate Modal
    const certButton = page.getByRole('button', { name: /preview certificate/i }).first();
    await expect(certButton).toBeVisible();
    await certButton.click();
    await expect(page.getByText('Certificate of Completion', { exact: true })).toBeVisible();
    // Verify mandatory disclaimer
    await expect(page.getByText('Zarii certificate of completion. Not an official qualification or exam result.')).toBeVisible();
    // Take screenshot of Certificate Modal
    await page.screenshot({ path: 'test-results/english-certificate-modal.png', fullPage: false });
    // Close modal
    await page.getByRole('button', { name: 'Done' }).click();
  });

  test('2. English Study Plan & Adaptive Rebalancing', async ({ page }) => {
    await page.goto('/app/english/plan');
    await page.waitForLoadState('domcontentloaded');

    // Wait for Study Plan Header
    await expect(page.getByRole('heading', { name: 'Adaptive Study Plan' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Weekly Target Completion')).toBeVisible();

    // Verify daily schedule workouts section
    await expect(page.getByText("This Week's Scheduled Workouts")).toBeVisible();

    // Trigger auto-rebalancing
    const rebalanceBtn = page.getByRole('button', { name: /auto-rebalance/i });
    await expect(rebalanceBtn).toBeVisible();
    await rebalanceBtn.click();
    await expect(page.getByText(/Schedule Rebalanced/i)).toBeVisible({ timeout: 5000 });

    // Take screenshot of Study Plan
    await page.screenshot({ path: 'test-results/english-study-plan.png', fullPage: false });
  });

  test('3. Unified "My Learning" Dashboard (No Mixing of Bands and CEFR)', async ({ page }) => {
    await page.goto('/app/progress');
    await page.waitForLoadState('domcontentloaded');

    // Verify Performance Dashboard Header in main content
    await expect(page.locator('#main-content').getByRole('heading', { name: 'Performance Dashboard' })).toBeVisible({ timeout: 15000 });

    // Verify Side-by-Side Dual-Track Overview
    await expect(page.getByText('My Learning Tracks (Side-by-Side Overview)')).toBeVisible();
    await expect(page.getByText('IELTS Academic Track (0–9 Band Scale)')).toBeVisible();
    await expect(page.getByText('General English Course (CEFR Scale A1–C1)')).toBeVisible();

    // Verify honest "Not attempted" displays without fake 0.0 or 6.5
    const notAttemptedElements = page.getByText('Not attempted');
    expect(await notAttemptedElements.count()).toBeGreaterThan(0);

    // Test track toggle buttons
    await page.getByRole('button', { name: 'IELTS Track' }).click();
    await expect(page.getByText('IELTS Academic Track (0–9 Band Scale)')).toBeVisible();
    await expect(page.getByText('General English Course (CEFR Scale A1–C1)')).not.toBeVisible();

    await page.getByRole('button', { name: 'English Course Track' }).click();
    await expect(page.getByText('General English Course (CEFR Scale A1–C1)')).toBeVisible();
    await expect(page.getByText('IELTS Academic Track (0–9 Band Scale)')).not.toBeVisible();

    await page.getByRole('button', { name: 'Both Tracks' }).click();
    await expect(page.getByText('IELTS Academic Track (0–9 Band Scale)')).toBeVisible();
    await expect(page.getByText('General English Course (CEFR Scale A1–C1)')).toBeVisible();

    // Take screenshot of Unified Dashboard
    await page.screenshot({ path: 'test-results/english-unified-dashboard.png', fullPage: false });
  });

  test('4. Track Filters in Word Bank & Flashcards', async ({ page }) => {
    // Check Word Bank
    await page.goto('/app/word-bank');
    await page.waitForLoadState('domcontentloaded');
    const trackSelect = page.locator('select[aria-label="Filter by track"]');
    await expect(trackSelect).toBeVisible({ timeout: 15000 });
    await trackSelect.selectOption('english');
    await trackSelect.selectOption('ielts');
    await trackSelect.selectOption('all');

    // Check Spaced-Repetition Flashcards
    await page.goto('/app/ielts/vocab/flashcards');
    await page.waitForLoadState('domcontentloaded');
    const flashcardTrackSelect = page.locator('select[aria-label="Filter by track"]');
    await expect(flashcardTrackSelect).toBeVisible({ timeout: 15000 });
    await flashcardTrackSelect.selectOption('english');
    await flashcardTrackSelect.selectOption('all');
  });
});
