import { test, expect } from '@playwright/test';

test.describe('Zarii Dictionary & Tap-to-Lookup Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Set guest mode and english track in localStorage for frictionless testing
    await page.addInitScript(() => {
      localStorage.setItem('zarii_guest_mode', 'true');
      localStorage.setItem('zarii_learning_track', 'english');
    });
  });

  test('1. Search "run", "running" (inflection), and "mispelled" (spelling suggestion)', async ({ page }) => {
    await page.goto('/app/dictionary');
    await expect(page.getByRole('heading', { name: /English Dictionary/i })).toBeVisible({ timeout: 10000 });

    const searchInput = page.getByRole('combobox');
    await expect(searchInput).toBeVisible();

    // 1. Search "run"
    await searchInput.fill('run');
    const resultRun = page.locator('#dictionary-search-results').getByText('run', { exact: true }).first();
    await expect(resultRun).toBeVisible({ timeout: 8000 });

    // 2. Search "running" (inflection form detection)
    await searchInput.fill('running');
    const inflectionBanner = page.locator('#dictionary-search-results').filter({ hasText: /Form detected/i });
    await expect(inflectionBanner).toBeVisible({ timeout: 8000 });
    await expect(inflectionBanner).toContainText(/running/i);
    await expect(inflectionBanner).toContainText(/run/i);

    // 3. Search "mispelled" (spelling suggestion)
    await searchInput.fill('mispelled');
    const didYouMean = page.locator('#dictionary-search-results').getByText(/Did you mean/i);
    await expect(didYouMean).toBeVisible({ timeout: 8000 });
    const suggestionBtn = page.locator('#dictionary-search-results button').filter({ hasText: /misspell/i }).first();
    await expect(suggestionBtn).toBeVisible();
  });

  test('2. Open entry, view pronunciation & senses, and save to Word Bank', async ({ page }) => {
    await page.goto('/app/dictionary/run');

    // Header checks
    await expect(page.getByRole('heading', { name: 'run', exact: true })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/Estimated:/i)).toBeVisible();
    await expect(page.getByTitle(/Play US Pronunciation/i)).toBeVisible();
    await expect(page.getByTitle(/Play UK Pronunciation/i)).toBeVisible();

    // Senses and examples
    await expect(page.getByText(/Definitions & Examples/i)).toBeVisible();

    // Word forms table
    await expect(page.getByText(/Inflections & Word Forms/i)).toBeVisible();

    // Save to Word Bank
    const wordBankBtn = page.getByRole('button', { name: /Word Bank/i });
    await expect(wordBankBtn).toBeVisible();
    await wordBankBtn.click();

    // Verify toast confirmation
    await expect(page.getByText(/Saved to Word Bank/i)).toBeVisible({ timeout: 5000 });
  });

  test('3. Tap-to-lookup works inside lessons', async ({ page }) => {
    await page.goto('/app/english/course/lesson/eng-a1-u1-l1', { waitUntil: 'domcontentloaded' });

    // Find lesson text inside main and double-click a word
    const lessonText = page.locator('main').locator('h1, h2, p').filter({ hasText: /Verb|Understanding|English/i }).first();
    await expect(lessonText).toBeVisible({ timeout: 12000 });

    // Double-click to trigger lookup
    await lessonText.dblclick();

    // Verify TapToLookupPopover appears
    const popover = page.locator('div.fixed.z-50').filter({ hasText: /Open Full Entry|Save/i });
    await expect(popover).toBeVisible({ timeout: 5000 });
  });

  test('4. EXAM-MODE PROTECTION: Tap-to-lookup is strictly disabled in timed Reading exam', async ({ page }) => {
    // Navigate to timed Reading exam mode
    await page.goto('/app/ielts/practice/reading?mode=exam&testId=test-1');

    // Wait for passage text
    const passageText = page.locator('div').filter({ hasText: /Passage|Reading|The/i }).first();
    await expect(passageText).toBeVisible({ timeout: 10000 });

    // Attempt double-click inside exam
    await passageText.dblclick();

    // Ensure popover does NOT appear
    const popover = page.locator('div.fixed.z-50').filter({ hasText: /Open Full Entry/i });
    await expect(popover).not.toBeVisible();
  });

  test('5. Offline mode after downloading essential pack', async ({ page }) => {
    test.setTimeout(45000);
    await page.goto('/app/dictionary', { waitUntil: 'domcontentloaded' });

    // Click "Download for Offline" button
    const downloadBtn = page.getByRole('button', { name: /Download for Offline|Offline:/i });
    await expect(downloadBtn).toBeVisible({ timeout: 12000 });
    await downloadBtn.click();

    // Offline download modal appears
    await expect(page.getByText(/Offline Dictionary Storage/i)).toBeVisible();
    await expect(page.getByText(/Essential 20,000 Words/i)).toBeVisible();

    // Start download
    const startBtn = page.getByRole('button', { name: /Start Download/i });
    await startBtn.click();

    // Verify success toast or status update
    await expect(page.getByText(/Offline Dictionary Ready|Installed/i)).toBeVisible({ timeout: 20000 });
  });

  test('6. Public Credits page renders open-source corpora attribution', async ({ page }) => {
    await page.goto('/credits');

    await expect(page.getByRole('heading', { name: /Credits & Attribution/i })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: /Open English WordNet/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /CMU Pronouncing Dictionary/i })).toBeVisible();
    await expect(page.getByText(/Non-Infringement/i)).toBeVisible();
  });
});
