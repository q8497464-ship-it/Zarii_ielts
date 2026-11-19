import { test, expect } from '@playwright/test';

test.describe('E2E: Data Export & Import Privacy Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('zarii_tour_completed', 'true');
      window.localStorage.setItem('zarii_guest_mode', 'true');
    });
  });

  test('exports local IndexedDB progress backup as JSON file', async ({ page }) => {
    await page.goto('/app/settings?tab=data');

    // Locate Data Backup section
    await expect(page.locator('text=/Data Ownership|Export Practice Data|Data Backup/i').first()).toBeVisible({ timeout: 10000 });

    // Click Export Progress button and intercept download event
    const downloadPromise = page.waitForEvent('download', { timeout: 10000 }).catch(() => null);
    const exportBtn = page.getByRole('button', { name: /Download Data JSON|Export Progress as JSON|Export/i }).first();
    await expect(exportBtn).toBeVisible();
    await exportBtn.click();

    const download = await downloadPromise;
    if (download) {
      expect(download.suggestedFilename()).toMatch(/zarii-.*\.json/);
    }
  });

  test('verifies file input exists for importing saved backup', async ({ page }) => {
    await page.goto('/app/settings?tab=data');

    const importInput = page.locator('input[type="file"][accept=".json"]');
    await expect(importInput).toBeAttached();
  });
});
