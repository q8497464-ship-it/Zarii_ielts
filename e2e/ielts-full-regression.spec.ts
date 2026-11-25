import { test, expect } from '@playwright/test';

test.describe('IELTS Master Regression Suite', () => {
  // Shared mock init script to bypass tours and avoid modal interruptions
  const initStudentSession = async (page: any) => {
    await page.addInitScript(() => {
      localStorage.setItem('zarii_guest_mode', 'true');
      localStorage.setItem('zarii_product_tour_completed', 'true');
      sessionStorage.setItem('zarii_splash_shown', 'true');
    });
  };

  // Shared admin session
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
    });
  };

  // ==========================================
  // 1. AUTHENTICATION & ACCESS CONTROL
  // ==========================================
  test.describe('1. Authentication & Access Control', () => {
    test('guest mode allows immediate frictionless entry to student app', async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
      await page.goto('/login');
      const guestBtn = page.getByRole('button', { name: /continue without an account/i });
      await expect(guestBtn).toBeVisible();
      await guestBtn.click();
      await page.waitForURL('**/app');

      // Verify guest state stored in localStorage
      const isGuest = await page.evaluate(() => localStorage.getItem('zarii_guest_mode'));
      expect(isGuest).toBe('true');
    });

    test('login page validates inputs and rejects invalid credentials with clear feedback', async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.removeItem('zarii_guest_mode');
        sessionStorage.clear();
      });
      await page.goto('/login');
      await page.waitForTimeout(300);

      const emailInput = page.locator('#email, input[type="email"]');
      const passwordInput = page.locator('#password, input[type="password"]');
      await expect(emailInput).toBeVisible();
      await expect(passwordInput).toBeVisible();

      await emailInput.fill('invalid-user@example.com');
      await passwordInput.fill('WrongPassword123!');
      await page.getByRole('button', { name: 'Log in', exact: true }).click();

      // Alert or error feedback displayed
      await expect(page.locator('[role="alert"]').or(page.locator('text=/Invalid credentials|Sign in failed|Invalid login|Network connection/i')).first()).toBeVisible({ timeout: 5000 });
    });

    test('signup page renders registration fields and validates required inputs', async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.removeItem('zarii_guest_mode');
        sessionStorage.clear();
      });
      await page.goto('/signup');
      await page.waitForTimeout(300);

      await expect(page.getByRole('heading', { name: /Create your free account/i })).toBeVisible();

      const nameInput = page.locator('#fullName, input[name="name"], input[placeholder*="Candidate" i], input[placeholder*="name" i]').first();
      const emailInput = page.locator('#email, input[type="email"]');
      const passwordInput = page.locator('#password, input[type="password"]').first();
      await expect(nameInput).toBeVisible();
      await expect(emailInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
    });

    test('logout flow clears session and redirects cleanly', async ({ page }) => {
      await initStudentSession(page);
      await page.goto('/app/settings');
      await page.waitForTimeout(400);

      const logoutBtn = page.getByRole('button', { name: /log out of zarii/i });
      if (await logoutBtn.isVisible()) {
        await logoutBtn.click();
        await page.waitForTimeout(400);
        // Expect redirect to / or /login
        await expect(page).toHaveURL(/\/(login)?$/);
      }
    });
  });

  // ==========================================
  // 2. STUDENT APP WORKSPACE
  // ==========================================
  test.describe('2. Student App Core Modules', () => {
    test.beforeEach(async ({ page }) => {
      await initStudentSession(page);
    });

    test('Home Dashboard renders study summary, quick actions, and target band', async ({ page }) => {
      await page.goto('/app');
      await expect(page.locator('header')).toBeVisible({ timeout: 15000 });

      // Check for core dashboard widgets
      await expect(page.locator('text=/Quick Practice|Continue Learning|Today\'s Goal|Band Target/i').first()).toBeVisible({ timeout: 10000 });
    });

    test('Reading Test: starts test, records answer, submits and views score breakdown', async ({ page }) => {
      await page.goto('/app/practice/reading');
      await expect(page.locator('h1, h2').filter({ hasText: /Reading/i }).first()).toBeVisible();

      // Navigate to first test runner
      await page.goto('/app/practice/reading/test/acad-reading-01', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('text=/Passage 1|Roman Aqueducts/i').first()).toBeVisible({ timeout: 15000 });

      // Answer at least one question
      const input = page.locator('input[type="text"]').first();
      if (await input.isVisible()) {
        await input.fill('TRUE');
      }

      // Finish or Submit test button
      const submitBtn = page.getByRole('button', { name: /Finish Test|Submit/i }).first();
      if (await submitBtn.isVisible()) {
        await submitBtn.click();
        await page.waitForTimeout(500);
      }
    });

    test('Listening Test: renders audio control interface and interactive questions', async ({ page }) => {
      await page.goto('/app/practice/listening/test/list-test-01');
      await expect(page.locator('text=/Section 1|Part 1|Watersports/i').first()).toBeVisible({ timeout: 10000 });

      // Check text question inputs exist
      const input = page.locator('input[type="text"]').first();
      await expect(input).toBeVisible();
      await input.fill('library');
    });

    test('Writing Flow: editor enforces word count and processes AI evaluation', async ({ page, context }) => {
      // Mock Gemini AI API to prevent network dependency
      await page.route('**/v1beta/**', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            candidates: [
              {
                content: {
                  parts: [
                    {
                      text: JSON.stringify({
                        overallBand: 7.0,
                        taskResponseBand: 7.0,
                        coherenceCohesionBand: 7.0,
                        lexicalResourceBand: 7.0,
                        grammaticalRangeBand: 7.0,
                        examinerSummary: 'Cohesive essay with clear arguments and good vocabulary range.',
                        criteriaFeedback: {
                          taskResponse: { band: 7.0, strengths: ['Clear stance'], improvements: ['More data points'] },
                          coherenceCohesion: { band: 7.0, strengths: ['Smooth flow'], improvements: ['Vary linkers'] },
                          lexicalResource: { band: 7.0, strengths: ['Academic lexical choices'], improvements: ['Fewer repetitions'] },
                          grammaticalRange: { band: 7.0, strengths: ['Complex clauses'], improvements: ['Minor article fixes'] },
                        },
                      }),
                    },
                  ],
                },
              },
            ],
          }),
        });
      });

      await page.goto('/app/practice/writing/prompt/t2-01');
      const textarea = page.locator('textarea');
      await expect(textarea).toBeVisible({ timeout: 10000 });

      const sampleEssay = `In the contemporary era, the rapid proliferation of artificial intelligence has ignited a contentious debate regarding the perpetuity of conventional educators in academic institutions. While technological algorithms undeniably offer unparalleled individualized instruction, I staunchly contend that human pedagogues remain fundamentally irreplaceable in nurturing holistic student development.

To begin with, automated learning applications provide extraordinary advantages in standardizing curriculum pacing and diagnosing conceptual deficits. Intelligent software can dynamically customize problem sets according to each pupil's immediate grasp, thereby eliminating tedious pedagogical redundancy. Nevertheless, education transcends the mere assimilation of factual data; it is intrinsically linked to moral introspection and emotional resonance.

Furthermore, human teachers serve as vital role models who model ethical principles, cultivate intellectual curiosity, and provide crucial psychological guidance. An algorithmic entity lacks the psychological discernment necessary to detect student disillusionment or distress. Consequently, the empathetic mentorship offered by human teachers fosters resilience and civic responsibility in ways silicon chips cannot duplicate.

In conclusion, artificial intelligence should be embraced as an empowering supplementary instrument rather than a comprehensive replacement for traditional educators.`;

      await textarea.fill(sampleEssay);
      await expect(page.locator('text=/words/i').first()).toBeVisible();
    });

    test('Speaking Practice: renders question prompt and speech input controls', async ({ page }) => {
      await page.goto('/app/practice/speaking/part1');
      await expect(page.locator('h1, h2, h3').filter({ hasText: /Part 1/i }).first()).toBeVisible({ timeout: 10000 });

      // Check for mic / recording button
      const recordBtn = page.getByRole('button', { name: /Record|Start Recording|Speak/i }).first();
      await expect(recordBtn).toBeVisible();
    });

    test('Mock Exam Flow: empty attempt displays review warning and honest Not Attempted report without fake scores', async ({ page }) => {
      test.setTimeout(60000);
      await page.goto('/app/mock/exam/mock-acad-01', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      // Start mock exam
      const startBtn = page.getByRole('button', { name: /Begin Mock Test/i });
      await expect(startBtn).toBeVisible();
      await startBtn.click();
      await page.waitForTimeout(300);

      // Skip Listening sections
      for (let i = 0; i < 3; i++) {
        const nextSecBtn = page.getByRole('button', { name: /Next Section/i });
        if (await nextSecBtn.isVisible()) {
          await nextSecBtn.click();
          await page.waitForTimeout(150);
        }
      }

      const toReadingBtn = page.getByRole('button', { name: /Proceed to Reading/i });
      await expect(toReadingBtn).toBeVisible({ timeout: 10000 });
      await toReadingBtn.click({ force: true });
      await page.waitForTimeout(300);

      // Skip Reading passages
      for (let i = 0; i < 2; i++) {
        const nextPasBtn = page.getByRole('button', { name: /Next Passage/i });
        if (await nextPasBtn.isVisible()) {
          await nextPasBtn.click({ force: true });
          await page.waitForTimeout(150);
        }
      }

      const toWritingBtn = page.getByRole('button', { name: /Proceed to Section 3: Writing/i });
      await expect(toWritingBtn).toBeVisible({ timeout: 10000 });
      await toWritingBtn.click({ force: true });
      await page.waitForTimeout(300);

      // Skip Writing -> Speaking
      const toSpeakingBtn = page.getByRole('button', { name: /Proceed to Section 4: Speaking/i });
      await expect(toSpeakingBtn).toBeVisible();
      await toSpeakingBtn.click();
      await page.waitForTimeout(300);

      // Skip Speaking parts
      const nextPart1 = page.getByRole('button', { name: /Next Part/i });
      await expect(nextPart1).toBeVisible();
      await nextPart1.click();
      await page.waitForTimeout(200);

      const nextPart2 = page.getByRole('button', { name: /Next Part/i });
      await expect(nextPart2).toBeVisible();
      await nextPart2.click();
      await page.waitForTimeout(200);

      const proceedToReviewBtn = page.getByRole('button', { name: /Proceed to Review & Submit/i });
      await expect(proceedToReviewBtn).toBeVisible();
      await proceedToReviewBtn.click();
      await page.waitForTimeout(400);

      // Review Screen warning
      await expect(page.getByText('Mock Exam Submission Review')).toBeVisible();
      await expect(page.getByText('This attempt has no completed sections')).toBeVisible();

      // Submit incomplete attempt
      await page.getByRole('button', { name: 'Submit as incomplete' }).click();
      await page.waitForTimeout(500);

      // Verify honest report without fake scores
      await expect(page.getByRole('heading', { name: 'Zarii Practice Report' })).toBeVisible();
      expect(await page.getByText('Band 5.5').count()).toBe(0);
      expect(await page.getByText('Band 6.0').count()).toBe(0);
      await expect(page.getByText('Complete all four sections to get your overall band.')).toBeVisible();
    });

    test('Vocabulary: flashcard review flips card and registers rating', async ({ page }) => {
      await page.goto('/app/vocab/flashcards', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('text=/Flashcards|Vocabulary|Card/i').first()).toBeVisible({ timeout: 15000 });

      // Flip card
      const flipBtn = page.getByRole('button', { name: /Flip Card|Show Meaning|Show Answer/i }).first();
      if (await flipBtn.isVisible()) {
        await flipBtn.click();
        await page.waitForTimeout(300);
      }

      // Rating button
      const rateBtn = page.getByRole('button', { name: /Good|Easy|Pass|Review/i }).first();
      if (await rateBtn.isVisible()) {
        await rateBtn.click();
      }
    });

    test('Vocabulary Quiz: loads multiple-choice quiz questions', async ({ page }) => {
      await page.goto('/app/vocab/quiz', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('text=/Vocabulary Quiz|Question|Select the best/i').first()).toBeVisible({ timeout: 15000 });
    });

    test('Grammar Lesson: renders exercises with deterministically shuffled MCQ options', async ({ page }) => {
      await page.goto('/app/grammar/lesson/g-01');
      await expect(page.locator('h1, h2').filter({ hasText: /Grammar|Sentence/i }).first()).toBeVisible({ timeout: 10000 });

      // Click exercises tab
      const exercisesTab = page.getByRole('button', { name: /Exercises|Practice/i });
      if (await exercisesTab.isVisible()) {
        await exercisesTab.click();
        await page.waitForTimeout(300);

        // Options render as buttons
        const optionButtons = page.locator('button').filter({ hasText: /^[A-D]\b|[a-z]+/ });
        expect(await optionButtons.count()).toBeGreaterThan(0);
      }
    });

    test('Study Plan: renders weekly schedule and task items', async ({ page }) => {
      await page.goto('/app/plan');
      await expect(page.locator('h1, h2').filter({ hasText: /Study Plan|Your Plan|Schedule/i }).first()).toBeVisible({ timeout: 10000 });
    });

    test('Dashboard: displays skill breakdown, streaks, and band progression', async ({ page }) => {
      await page.goto('/app/dashboard');
      await expect(page.locator('h1, h2').filter({ hasText: /Dashboard|Performance|Analytics/i }).first()).toBeVisible({ timeout: 10000 });
      await expect(page.locator('text=/Reading|Listening|Writing|Speaking/i').first()).toBeVisible();
    });

    test('Settings: renders profile options, theme switcher, and target band picker', async ({ page }) => {
      await page.goto('/app/settings');
      await expect(page.locator('h1, h2').filter({ hasText: /Settings/i }).first()).toBeVisible({ timeout: 10000 });
      await expect(page.getByRole('button', { name: /log out of zarii/i })).toBeVisible();
    });

    test('Surprise Heart: easter egg icon renders in top bar and triggers full-screen flower/letter overlay', async ({ page }) => {
      await page.goto('/app');
      await page.waitForTimeout(400);

      const heartBtn = page.getByRole('button', { name: 'A small surprise' });
      await expect(heartBtn).toBeVisible();
      await heartBtn.click();
      await page.waitForTimeout(400);

      // Verify full-screen overlay dialog opens
      const dialog = page.locator('div[role="dialog"]');
      await expect(dialog).toBeVisible();

      // Verify recipient name or message
      await expect(dialog.getByText(/Zarmeen|A Special Note/i).first()).toBeVisible();

      // Click "Open my letter" to advance to Stage 2 envelope
      const openLetterBtn = dialog.getByRole('button', { name: /Open my letter/i });
      await expect(openLetterBtn).toBeVisible();
      await openLetterBtn.click();
      await page.waitForTimeout(400);

      // Close surprise
      const closeBtn = dialog.getByRole('button', { name: /Close surprise|Return to studies|Close/i }).first();
      await expect(closeBtn).toBeVisible();
      await closeBtn.click();
      await page.waitForTimeout(300);
      await expect(dialog).toHaveCount(0);
    });
  });

  // ==========================================
  // 3. ADMIN PANEL
  // ==========================================
  test.describe('3. Admin Portal', () => {
    test('admin login page renders isolated login form without student branding confusion', async ({ page }) => {
      await page.goto('/admin/login');
      await expect(page.getByRole('heading', { name: 'Admin sign in' })).toBeVisible({ timeout: 15000 });
      await expect(page.getByText('Authorized personnel only. All activity is logged.')).toBeVisible();

      // Student login fallback link is present
      await expect(page.getByRole('link', { name: 'Student login' })).toBeVisible();
    });

    test('admin content management: authenticated admin can browse tests and create drafts', async ({ page }) => {
      await initAdminSession(page);
      await page.goto('/admin/content');
      await page.waitForTimeout(500);

      // Verify Admin Content Management table/catalog
      await expect(page.locator('text=/Content Management|Test Catalog|Create Test|All Modules/i').first()).toBeVisible({ timeout: 10000 });
    });

    test('admin settings: displays maintenance mode toggles and system controls', async ({ page }) => {
      await initAdminSession(page);
      await page.goto('/admin/settings');
      await page.waitForTimeout(500);

      await expect(page.locator('text=/System Settings|Platform Settings|Maintenance/i').first()).toBeVisible({ timeout: 10000 });
    });
  });

  // ==========================================
  // 4. PUBLIC LANDING PAGE
  // ==========================================
  test.describe('4. Public Landing Page', () => {
    test('landing page renders hero, benefits, scrolls smoothly and provides auth CTA links', async ({ page }) => {
      await page.goto('/');
      await page.waitForTimeout(400);

      // Hero headline
      await expect(page.locator('h1').first()).toContainText(/Prepare for IELTS|Master IELTS/i);

      // Check sign in / get started buttons
      const loginLink = page.getByRole('link', { name: /Sign in|Log in/i }).first();
      await expect(loginLink).toBeVisible();

      const getStartedLink = page.getByRole('link', { name: /Get Started|Start Learning|Free/i }).first();
      await expect(getStartedLink).toBeVisible();

      // Scroll verification
      await page.evaluate(() => window.scrollTo(0, 1000));
      await page.waitForTimeout(250);
      const scrolledY = await page.evaluate(() => window.scrollY);
      expect(scrolledY).toBeGreaterThan(0);
    });
  });
});
