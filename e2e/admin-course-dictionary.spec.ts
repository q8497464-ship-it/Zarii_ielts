import { test, expect } from '@playwright/test';

test.describe('Admin Course Manager, Dictionary & Smart Links Suite', () => {
  const initAdminSession = async (page: any) => {
    await page.addInitScript(() => {
      sessionStorage.setItem(
        'zarii_admin_session',
        JSON.stringify({
          role: 'admin',
          email: 'admin@zarii.app',
          name: 'Zarii Administrator',
          loginTime: Date.now(),
        })
      );
      sessionStorage.setItem('zarii_admin_last_activity', String(Date.now()));
      sessionStorage.setItem('zarii_splash_shown', 'true');
      localStorage.setItem('zarii_onboarded', 'true');
      localStorage.setItem('zarii_product_tour_completed', 'true');
      localStorage.setItem('zarii_tour_completed', 'true');
    });
  };

  const initStudentSession = async (page: any) => {
    await page.addInitScript(() => {
      localStorage.setItem('zarii_onboarded', 'true');
      localStorage.setItem('zarii_guest_mode', 'true');
      localStorage.setItem('zarii_primary_track', 'english');
      localStorage.setItem('zarii_english_level', 'B2');
      localStorage.setItem('zarii_candidate_name', 'Sarah Learner');
      localStorage.setItem('zarii_product_tour_completed', 'true');
      localStorage.setItem('zarii_tour_completed', 'true');
      sessionStorage.setItem('zarii_splash_shown', 'true');
    });
  };

  test('1. Admin Course Manager: Curriculum, Validation & Quality Insights', async ({ page }) => {
    await initAdminSession(page);
    await page.goto('/admin/content?tab=course');
    await page.waitForLoadState('domcontentloaded');

    // Header & Subtabs
    await expect(page.getByText('General English Course & Curriculum Manager')).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('button', { name: /Curriculum & Lessons/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Quality Insights/i })).toBeVisible();

    // Verify Lessons list table
    await expect(page.getByText('Lesson Title')).toBeVisible();

    // Switch to Quality Insights subtab
    await page.getByRole('button', { name: /Quality Insights/i }).click();
    await expect(page.getByText('Unfinished Drafts')).toBeVisible();
    await expect(page.getByText('Questions Most Students Get Wrong')).toBeVisible();
    await page.screenshot({ path: 'test-results/admin-course-quality.png', fullPage: false });

    // Switch back to Curriculum subtab
    await page.getByRole('button', { name: /Curriculum & Lessons/i }).click();

    // Open Lesson Editor for New Lesson
    await page.getByRole('button', { name: /New Course Lesson/i }).click();
    await expect(page.getByText('Pre-Publish Validation')).toBeVisible();

    // Switch to Student Preview mode in editor
    await page.getByRole('button', { name: /Student Preview/i }).click();
    await expect(page.getByText('Student View Mode')).toBeVisible();
    await page.screenshot({ path: 'test-results/admin-lesson-editor-preview.png', fullPage: false });

    // Close Editor
    await page.getByRole('button', { name: /Cancel/i }).first().click();
  });

  test('2. Admin Dictionary Manager: Patches, Reports, CSV Dry-Run & Release', async ({ page }) => {
    await initAdminSession(page);
    await page.goto('/admin/content?tab=dictionary');
    await page.waitForLoadState('domcontentloaded');

    // Header & Tabs
    await expect(page.getByText('English Dictionary & Lexical Patch Manager')).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('button', { name: /Active Patches/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Reported Issues/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Bulk Import Urdu/i })).toBeVisible();

    // Check Reported Issues tab
    await page.getByRole('button', { name: /Reported Issues/i }).click();
    await expect(page.getByText('Candidate Reported Issues & Triage')).toBeVisible();

    // Check Bulk Import Urdu CSV Dry-Run
    await page.getByRole('button', { name: /Bulk Import Urdu/i }).click();
    await expect(page.getByRole('button', { name: /Perform Dry-Run Validation/i })).toBeVisible();
    await page.getByRole('button', { name: /Perform Dry-Run Validation/i }).click();
    await expect(page.getByText('Dry-Run Report Summary')).toBeVisible();
    await page.screenshot({ path: 'test-results/admin-dictionary-dryrun.png', fullPage: false });

    // Check Build Info & Licenses
    await page.getByRole('button', { name: /Build & Licenses/i }).click();
    await expect(page.getByText('Open English WordNet')).toBeVisible();
    await expect(page.getByText('CMU Pronouncing Dictionary')).toBeVisible();
    await page.screenshot({ path: 'test-results/admin-dictionary-build-info.png', fullPage: false });
  });

  test('3. Admin Settings & Analytics: Track Feature Flags and Drop-off Progression', async ({ page }) => {
    await initAdminSession(page);

    // 1. Feature Flags by Track
    await page.goto('/admin/settings?tab=flags');
    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('button', { name: /Feature Flags/i }).click();
    await expect(page.getByText('Student Application Feature Switches')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('IELTS Academic & General Track')).toBeVisible();
    await expect(page.getByText('General English Course Track')).toBeVisible();
    await expect(page.getByText('Tap-to-Lookup Word Popover')).toBeVisible();
    await page.screenshot({ path: 'test-results/admin-track-feature-flags.png', fullPage: false });

    // 2. Track Analytics
    await page.goto('/admin/analytics');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { name: 'Platform Analytics & Insights' })).toBeVisible({ timeout: 15000 });

    // Switch Track Filter to English Course Track
    await page.getByRole('button', { name: 'English Course Track' }).click();
    await expect(page.getByText('General English Course & Dictionary Analytics')).toBeVisible();
    await expect(page.getByText('Top Searched Dictionary Headwords')).toBeVisible();
    await expect(page.getByText('Unit Progression & Drop-off Retention')).toBeVisible();
    await page.screenshot({ path: 'test-results/admin-track-analytics.png', fullPage: false });
  });

  test('4. Cross-Track Smart Links: B2 IELTS Suggestion & Word Bank Dictionary Lookup', async ({ page }) => {
    await initStudentSession(page);

    // 1. Verify B2+ Gentle Suggestion on English Progress Page
    await page.goto('/app/english/progress');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { name: 'Course Progress & Skill Map' })).toBeVisible({ timeout: 15000 });

    await expect(page.getByText('Ready for IELTS? Take the diagnostic test')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('link', { name: /Take Diagnostic Test/i })).toBeVisible();
    await page.screenshot({ path: 'test-results/cross-track-b2-suggestion.png', fullPage: false });

    // 2. Verify Dictionary Lookup link in Word Bank
    await page.goto('/app/word-bank');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { name: 'Personal Word Bank', exact: true })).toBeVisible({ timeout: 15000 });
    await page.screenshot({ path: 'test-results/cross-track-word-bank.png', fullPage: false });
  });
});
