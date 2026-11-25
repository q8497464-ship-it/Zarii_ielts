import { test, expect } from '@playwright/test';

test.describe('General English Skills Practice Suite (Reading, Listening, Speaking, Writing, Daily 15)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('zarii_guest_mode', 'true');
      localStorage.setItem('zarii_learning_track', 'english');
    });
  });

  test('1. Reading Library: Filters, Reader Reader View, Font Sizes, Vocab Save & Quiz', async ({ page }) => {
    await page.goto('/app/english/reading');

    // 1. Verify Header and Streak Stats
    await expect(page.getByRole('heading', { name: /Reading Library/i })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/Streak/i).first()).toBeVisible();
    await expect(page.getByText(/Words Saved/i)).toBeVisible();

    // 2. Filter by Level A1
    const a1Filter = page.getByRole('button', { name: 'A1', exact: true });
    await expect(a1Filter).toBeVisible();
    await a1Filter.click();
    await page.waitForTimeout(200);

    // 3. Open First Graded Reader
    const readBtn = page.getByText(/Read & Listen/i).first();
    await expect(readBtn).toBeVisible({ timeout: 5000 });
    await readBtn.click();

    // 4. Verify Reader Workspace
    await expect(page.getByRole('button', { name: /Back to Library/i })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('button', { name: /Listen Mode/i })).toBeVisible();

    // Take screenshot of Reading Library Reader View
    await page.screenshot({ path: 'test-results/english-reading-reader.png', fullPage: true });

    // 5. Test Font Size Toggle
    const largeFontBtn = page.getByRole('button', { name: 'A+', exact: true });
    await largeFontBtn.click();

    // 6. Test Urdu Summary Toggle
    const urduToggle = page.getByRole('button', { name: /اردو میں دیکھیں/i });
    if (await urduToggle.isVisible()) {
      await urduToggle.click();
      await page.waitForTimeout(200);
      await urduToggle.click();
    }

    // 7. Test Vocabulary Highlight Interaction
    const firstVocabChip = page.locator('button').filter({ hasText: /\(/i }).first();
    if (await firstVocabChip.isVisible()) {
      await firstVocabChip.click();
      const saveBtn = page.getByRole('button', { name: /Save to Word Bank/i });
      if (await saveBtn.isVisible()) {
        await saveBtn.click();
        await expect(page.getByText(/Saved to Word Bank/i)).toBeVisible();
      }
    }

    // 8. Answer Comprehension Questions
    const optionRadios = page.locator('button').filter({ hasText: /^[A-D]\./i });
    const count = await optionRadios.count();
    if (count >= 5) {
      // Pick first 5 options
      for (let i = 0; i < 5; i++) {
        await optionRadios.nth(i * 4).click();
      }
      const checkBtn = page.getByRole('button', { name: /Check Answers/i });
      if (await checkBtn.isVisible() && await checkBtn.isEnabled()) {
        await checkBtn.click();
        await expect(page.getByText(/Quiz Complete|Correct|Not Quite/i).first()).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test('2. Listening Studio: Playback, Speed Controls, Script Reveal & Dictation', async ({ page }) => {
    await page.goto('/app/english/listening');

    await expect(page.getByRole('heading', { name: /Listening Studio/i })).toBeVisible({ timeout: 10000 });

    // Open first track
    const listenBtn = page.getByText(/Listen Now/i).first();
    await expect(listenBtn).toBeVisible({ timeout: 5000 });
    await listenBtn.click();

    // Verify Player Controls
    await expect(page.getByRole('button', { name: /Back to Tracks/i })).toBeVisible({ timeout: 5000 });
    const speed125 = page.getByRole('button', { name: '1.25x' });
    await expect(speed125).toBeVisible();
    await speed125.click();

    // Reveal Full Script
    const revealBtn = page.getByRole('button', { name: /Reveal Full Audio Script/i });
    await expect(revealBtn).toBeVisible();
    await revealBtn.click();
    await expect(page.getByRole('button', { name: /Hide Full Script/i })).toBeVisible();

    // Take screenshot of Listening Studio
    await page.screenshot({ path: 'test-results/english-listening-studio.png', fullPage: true });

    // Dictation typing
    const dictationInput = page.getByPlaceholder(/Type word here/i).first();
    if (await dictationInput.isVisible()) {
      await dictationInput.fill('get');
    }
  });

  test('3. Speaking & Pronunciation: Minimal Pairs, Stress Drills & Role-Play', async ({ page }) => {
    await page.goto('/app/english/speaking');

    await expect(page.getByRole('heading', { name: /Speaking & Pronunciation Studio/i })).toBeVisible({ timeout: 10000 });

    // 1. Minimal Pairs Tab
    await expect(page.getByText(/Short \/ɪ\/ vs Long \/iː\//i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Listen to Ship/i })).toBeVisible();

    // 2. Stress & Rhythm Tab
    await page.getByRole('button', { name: /Stress & Rhythm/i }).click();
    await expect(page.getByRole('heading', { name: /Noun vs Verb Syllable Stress Shift/i })).toBeVisible({ timeout: 5000 });

    // 3. Tongue Twisters Tab
    await page.getByRole('button', { name: /Tongue-Twisters/i }).click();
    await expect(page.getByRole('button', { name: /Listen to Model Audio/i })).toBeVisible({ timeout: 5000 });

    // 4. Interactive Role-Play Tab
    await page.getByRole('button', { name: /Interactive Role-Play/i }).click();
    await expect(page.getByRole('button', { name: /Start Role-Play/i })).toBeVisible({ timeout: 5000 });

    // Take screenshot of Speaking Studio
    await page.screenshot({ path: 'test-results/english-speaking-studio.png', fullPage: true });
  });

  test('4. Writing Studio: Guided Tasks, Useful Phrases & Instant Rule Evaluation', async ({ page }) => {
    await page.goto('/app/english/writing');

    await expect(page.getByRole('heading', { name: /Writing Studio/i })).toBeVisible({ timeout: 10000 });

    // Open first task (A1 Registration Form & Notes)
    const taskBtn = page.getByText(/Start Task/i).first();
    await expect(taskBtn).toBeVisible({ timeout: 5000 });
    await taskBtn.click();

    await expect(page.getByRole('button', { name: /Back to Tasks/i })).toBeVisible({ timeout: 5000 });

    // Fill Form Field
    const nameInput = page.getByPlaceholder(/Tariq Mansoor/i);
    if (await nameInput.isVisible()) {
      await nameInput.fill('Ahmed Ali');
    }

    // Insert phrase from Useful Phrases Bank
    const phraseBtn = page.locator('button').filter({ hasText: /I am visiting this city/i }).first();
    if (await phraseBtn.isVisible()) {
      await phraseBtn.click();
    }

    // Type complete 3 sentences into textarea
    const textarea = page.getByPlaceholder(/Type your response here/i);
    await textarea.fill('I am visiting this city for a holiday. I am traveling with my brother. We will check out on Sunday morning.');

    // Click Check & Evaluate Draft
    const evaluateBtn = page.getByRole('button', { name: /Check & Evaluate Draft/i });
    await expect(evaluateBtn).toBeEnabled();
    await evaluateBtn.click();

    // Verify Evaluation results drawer
    await expect(page.getByText(/Vocabulary Variety/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/Polished Model Solution/i)).toBeVisible();

    // Take screenshot of Writing Studio
    await page.screenshot({ path: 'test-results/english-writing-studio.png', fullPage: true });
  });

  test('5. Daily 15 Routine: Guided Multi-Skill Flow (Grammar, Vocab, Listening, Reading, Speaking)', async ({ page }) => {
    await page.goto('/app/english/daily');

    await expect(page.getByRole('heading', { name: /Daily 15 Routine/i })).toBeVisible({ timeout: 10000 });

    // Step 1: Grammar Concept
    await expect(page.getByText(/Step 1: Grammar Concept/i)).toBeVisible({ timeout: 5000 });
    const grammarOpt = page.locator('button').filter({ hasText: /is knocking/i }).first();
    if (await grammarOpt.isVisible()) {
      await grammarOpt.click();
    }

    // Advance to Step 2
    await page.getByRole('button', { name: /Next Step/i }).click();

    // Step 2: Vocabulary Flashcards
    await expect(page.getByText(/Step 2: Vocabulary Spaced Repetition/i)).toBeVisible({ timeout: 5000 });
    // Flip flashcard
    await page.locator('.min-h-\\[180px\\]').click();
    await page.waitForTimeout(200);

    // Advance to Step 3
    await page.getByRole('button', { name: /Next Step/i }).click();

    // Step 3: Listening Mini-Drill
    await expect(page.getByText(/Step 3: Listening Comprehension/i)).toBeVisible({ timeout: 5000 });

    // Advance to Step 4
    await page.getByRole('button', { name: /Next Step/i }).click();

    // Step 4: Graded Short Reading
    await expect(page.getByText(/Step 4: Graded Short Reading/i)).toBeVisible({ timeout: 5000 });

    // Advance to Step 5
    await page.getByRole('button', { name: /Next Step/i }).click();

    // Step 5: Speaking Fluency Drill
    await expect(page.getByText(/Step 5: Speaking Fluency Drill/i)).toBeVisible({ timeout: 5000 });

    // Click Complete Daily 15
    await page.getByRole('button', { name: /Complete Daily 15/i }).click();

    // Verify Completion Screen
    await expect(page.getByRole('heading', { name: /Daily 15 Completed!/i })).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/\+25 XP Awarded/i)).toBeVisible();

    // Take screenshot of Daily 15 completion
    await page.screenshot({ path: 'test-results/english-daily-15.png', fullPage: true });
  });
});
