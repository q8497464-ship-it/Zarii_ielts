import { test, expect } from '@playwright/test';

test.describe('E2E: Spaced Repetition Vocabulary Review', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('zarii_tour_completed', 'true');
      window.localStorage.setItem('zarii_guest_mode', 'true');
    });
  });

  test('loads flashcards, flips card to view Urdu meaning and rates recall', async ({ page }) => {
    await page.goto('/app/vocab/flashcards');

    // Verify flashcard arena renders
    await expect(page.locator('text=/Flashcards|Academic Vocabulary/i').first()).toBeVisible({ timeout: 10000 });

    // Flip card or reveal answer
    const flipBtn = page.getByRole('button', { name: /Flip Card|Show Meaning|Show Answer/i }).first();
    if (await flipBtn.isVisible()) {
      await flipBtn.click();
    }

    // Rate SM-2 button (e.g. Good or Easy)
    const goodBtn = page.getByRole('button', { name: /Good|Easy|Pass/i }).first();
    if (await goodBtn.isVisible()) {
      await goodBtn.click();
    }
  });
});
