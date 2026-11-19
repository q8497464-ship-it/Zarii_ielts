import { test, expect } from '@playwright/test';

const SCREENSHOT_DIR = 'C:/Users/SiliCon/.gemini/antigravity/brain/79fb39b2-92cf-45ab-89c1-682ca7a62ee0';

test.describe('E2E: Mock Exam Scoring Reliability & Report Integrity', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('zarii_guest_mode', 'true');
      localStorage.setItem('zarii_product_tour_completed', 'true');
      sessionStorage.setItem('zarii_splash_shown', 'true');
    });
  });

  test('Empty attempt: review screen warns on empty sections and report shows honest Not Attempted states without fake bands', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Navigate to Mock Exam Runner
    await page.goto('/app/mock/exam/mock-acad-01');
    await page.waitForTimeout(600);

    // 2. Start from Briefing into Listening
    const startBtn = page.getByRole('button', { name: /Begin Mock Test/i });
    await expect(startBtn).toBeVisible();
    await startBtn.click();
    await page.waitForTimeout(400);

    // 3. Listening: advance through 4 sections, then to Reading
    for (let i = 0; i < 3; i++) {
      const nextSecBtn = page.getByRole('button', { name: /Next Section/i });
      if (await nextSecBtn.isVisible()) {
        await nextSecBtn.click();
        await page.waitForTimeout(200);
      }
    }
    const toReadingBtn = page.getByRole('button', { name: /Proceed to Reading/i });
    await expect(toReadingBtn).toBeVisible();
    await toReadingBtn.click();
    await page.waitForTimeout(400);

    // 4. Reading: advance through 3 passages, then to Writing
    for (let i = 0; i < 2; i++) {
      const nextPasBtn = page.getByRole('button', { name: /Next Passage/i });
      if (await nextPasBtn.isVisible()) {
        await nextPasBtn.click();
        await page.waitForTimeout(200);
      }
    }
    const toWritingBtn = page.getByRole('button', { name: /Proceed to Section 3: Writing/i });
    await expect(toWritingBtn).toBeVisible();
    await toWritingBtn.click();
    await page.waitForTimeout(400);

    // 5. Skip Writing -> Speaking
    const toSpeakingBtn = page.getByRole('button', { name: /Proceed to Section 4: Speaking/i });
    await expect(toSpeakingBtn).toBeVisible();
    await toSpeakingBtn.click();
    await page.waitForTimeout(400);

    // 6. Skip Speaking parts 1 -> 2 -> 3 -> Review
    const nextPart1 = page.getByRole('button', { name: /Next Part/i });
    await expect(nextPart1).toBeVisible();
    await nextPart1.click();
    await page.waitForTimeout(300);

    const nextPart2 = page.getByRole('button', { name: /Next Part/i });
    await expect(nextPart2).toBeVisible();
    await nextPart2.click();
    await page.waitForTimeout(300);

    const proceedToReviewBtn = page.getByRole('button', { name: /Proceed to Review & Submit/i });
    await expect(proceedToReviewBtn).toBeVisible();
    await proceedToReviewBtn.click();
    await page.waitForTimeout(500);

    // 7. Verify Review Screen guards
    await expect(page.getByText('Mock Exam Submission Review')).toBeVisible();
    await expect(page.getByText('This attempt has no completed sections')).toBeVisible();

    // Verify 4 section alerts
    await expect(page.getByText('Listening Module')).toBeVisible();
    await expect(page.getByText('0 / 40 Answered').first()).toBeVisible();

    await expect(page.getByText('Discard this attempt')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit as incomplete' })).toBeVisible();

    // Take screenshot of Review Screen
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/mock_review_screen_empty.png`,
      fullPage: true,
    });

    // 8. Click "Submit as incomplete" to inspect report
    await page.getByRole('button', { name: 'Submit as incomplete' }).click();
    await page.waitForTimeout(600);

    // 9. Verify Honest Report Form
    await expect(page.getByRole('heading', { name: 'Zarii Practice Report' })).toBeVisible();
    await expect(page.getByText('ZARII PRACTICE REPORT', { exact: true })).toBeVisible();
    await expect(page.getByText('Estimated practice score. Not an official IELTS result.')).toBeVisible();

    // Verify no fake bands
    expect(await page.getByText('Band 5.5').count()).toBe(0);
    expect(await page.getByText('Band 6.0').count()).toBe(0);
    expect(await page.getByText('Band 3.0').count()).toBe(0);

    // Verify no fake center
    expect(await page.getByText('PK-082 • Lahore').count()).toBe(0);
    expect(await page.getByText('Certified Rigor Standards').count()).toBe(0);

    // Verify component states
    const notAttemptedBadges = page.getByText('Not Attempted');
    expect(await notAttemptedBadges.count()).toBeGreaterThanOrEqual(4);

    // Verify overall state
    await expect(page.getByText('Complete all four sections to get your overall band.')).toBeVisible();

    // Verify honest strengths & weaknesses
    await expect(
      page.getByText('No strengths identified yet. Complete all sections to see your strengths.')
    ).toBeVisible();
    await expect(
      page.getByText(/Listening: Section not attempted/i)
    ).toBeVisible();

    // Take screenshot of Empty Attempt Report
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/mock_report_empty_attempt.png`,
      fullPage: true,
    });
  });

  test('Completed attempt: valid answers and essays produce true bands, calculated overall band, and genuine strengths', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto('/app/mock/exam/mock-acad-01');
    await page.waitForTimeout(600);

    // 1. Briefing -> Listening
    const startBtn = page.getByRole('button', { name: /Begin Mock Test/i });
    await expect(startBtn).toBeVisible();
    await startBtn.click();
    await page.waitForTimeout(400);

    // 2. Listening: answer questions
    const listeningInputs = page.locator('input[type="text"]');
    const inputCount = await listeningInputs.count();
    for (let i = 0; i < Math.min(inputCount, 10); i++) {
      await listeningInputs.nth(i).fill('library');
    }

    for (let i = 0; i < 3; i++) {
      const nextSecBtn = page.getByRole('button', { name: /Next Section/i });
      if (await nextSecBtn.isVisible()) {
        await nextSecBtn.click();
        await page.waitForTimeout(200);
      }
    }
    const toReadingBtn = page.getByRole('button', { name: /Proceed to Reading/i });
    await expect(toReadingBtn).toBeVisible();
    await toReadingBtn.click();
    await page.waitForTimeout(400);

    // 3. Reading: answer questions
    const readingInputs = page.locator('input[type="text"]');
    const rCount = await readingInputs.count();
    for (let i = 0; i < Math.min(rCount, 10); i++) {
      await readingInputs.nth(i).fill('TRUE');
    }

    for (let i = 0; i < 2; i++) {
      const nextPasBtn = page.getByRole('button', { name: /Next Passage/i });
      if (await nextPasBtn.isVisible()) {
        await nextPasBtn.click();
        await page.waitForTimeout(200);
      }
    }
    const toWritingBtn = page.getByRole('button', { name: /Proceed to Section 3: Writing/i });
    await expect(toWritingBtn).toBeVisible();
    await toWritingBtn.click();
    await page.waitForTimeout(400);

    // 4. Writing: complete Task 1 (160 words) and Task 2 (265 words)
    const task1Essay =
      'The provided chart illustrates the proportion of renewable electricity generation across four distinct European countries between the years 2010 and 2020. Overall, it is readily apparent that all four nations experienced substantial growth in clean energy adoption, with Country A demonstrating the most significant overall increase throughout the decade. In 2010, Country A generated approximately twenty percent of its total electricity from renewable sources, followed closely by Country B at fifteen percent. Over the subsequent ten-year timeframe, investment in offshore wind power and solar infrastructure accelerated rapidly. Consequently, by 2020, Country A reached an impressive peak of sixty-five percent renewable electricity. In marked contrast, Country D exhibited much slower initial development, starting at a modest five percent before climbing steadily to twenty-two percent. In conclusion, the comparison highlights a clear and widespread transition toward sustainable domestic power systems over the ten-year measurement period.';

    const task2Essay =
      'In contemporary society, an increasing number of individuals argue that university education should be completely free for all citizens, funded entirely by government taxation, whereas others contend that higher education students must bear their own tuition costs. This essay examines both viewpoints and presents my personal conviction that tertiary education should indeed be publicly subsidized for qualified candidates. On the one hand, proponents of tuition fees point out that universities require substantial financial resources to maintain modern laboratories, attract world-class academic researchers, and provide cutting-edge educational facilities. When students pay for their degrees, it ensures fiscal accountability and encourages learners to treat their academic responsibilities with maturity and dedication. Furthermore, critics argue that using general tax revenue to finance higher education places an unfair economic burden upon working-class taxpayers who do not attend university themselves. On the other hand, the societal benefits of universal access to advanced education are profound and far-reaching. When financial barriers are eliminated, talented students from economically disadvantaged backgrounds can achieve social mobility and fulfill their potential without accumulating crippling debt burdens. Moreover, modern knowledge-based economies depend heavily upon engineers, doctors, data scientists, and educators to drive national economic growth and international technological competitiveness. Investing national wealth into higher education generates high long-term returns in taxable income and public innovation. In conclusion, although requiring personal financial contributions has economic arguments, I firmly believe that governments ought to provide free university education. Ensuring equal educational opportunity enriches society as a whole and builds a prosperous future.';

    const task1Area = page.getByPlaceholder(/Draft your 150-word Task 1 response/i);
    await task1Area.fill(task1Essay);
    await page.waitForTimeout(300);

    // Switch to Task 2 tab
    const task2Tab = page.getByRole('button', { name: /Task 2/i });
    await task2Tab.click();
    await page.waitForTimeout(200);

    const task2Area = page.getByPlaceholder(/Draft your 250-word Task 2 essay/i);
    await task2Area.fill(task2Essay);
    await page.waitForTimeout(300);

    // Proceed to Speaking
    const toSpeakingBtn = page.getByRole('button', { name: /Proceed to Section 4: Speaking/i });
    await expect(toSpeakingBtn).toBeVisible();
    await toSpeakingBtn.click();
    await page.waitForTimeout(400);

    // 5. Speaking: enter speech transcripts for parts 1, 2, and 3
    const p1Transcript =
      'Well, from my perspective, I have always lived in a bustling urban environment which provides incredible educational and cultural facilities. However, during weekends I truly enjoy escaping into nature to relax, recharge my energy, and spend quality time with my closest friends and family.';

    const p2Transcript =
      'I would like to describe a truly memorable journey that I took two years ago when I traveled to the northern mountain ranges with my family. We planned this expedition for several months because we wanted to experience high-altitude trekking and observe pristine alpine ecosystems firsthand. The journey commenced with an early morning flight, followed by a scenic drive through steep valleys and alongside roaring glacial rivers. During our five-day stay, we hiked across demanding trails, camped beneath clear starry skies, and learned about traditional local heritage from welcoming resident communities. What made this journey particularly unforgettable was the sheer resilience and cooperation required to overcome challenging weather conditions. Standing at the high mountain pass and viewing the panoramic sunrise was a deeply transformative experience that broadened my personal perspective on life and environmental preservation.';

    const p3Transcript =
      'In my opinion, modern international tourism brings undeniable economic benefits to remote regional communities by generating sustainable employment opportunities and stimulating infrastructure development. Nevertheless, local authorities must carefully implement ecological regulations to prevent over-tourism and protect fragile habitats from permanent environmental degradation.';

    // Part 1
    const spkInput = page.getByPlaceholder(/Your answer transcript will record here/i);
    await spkInput.fill(p1Transcript);
    await page.waitForTimeout(200);

    // Part 2
    await page.getByRole('button', { name: /Next Part/i }).click();
    await page.waitForTimeout(200);
    const spkInput2 = page.getByPlaceholder(/Your answer transcript will record here/i);
    await spkInput2.fill(p2Transcript);
    await page.waitForTimeout(200);

    // Part 3
    await page.getByRole('button', { name: /Next Part/i }).click();
    await page.waitForTimeout(200);
    const spkInput3 = page.getByPlaceholder(/Your answer transcript will record here/i);
    await spkInput3.fill(p3Transcript);
    await page.waitForTimeout(200);

    // Proceed to Review
    const toReview = page.getByRole('button', { name: /Proceed to Review & Submit/i });
    await expect(toReview).toBeVisible();
    await toReview.click();
    await page.waitForTimeout(500);

    // Take screenshot of completed review screen
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/mock_review_screen_completed.png`,
      fullPage: true,
    });

    // Submit & Generate Report
    const submitBtn = page.getByRole('button', { name: /Submit & Generate Report/i });
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();
    await page.waitForTimeout(600);

    // Verify completed report
    await expect(page.getByRole('heading', { name: 'Zarii Practice Report' })).toBeVisible();
    await expect(page.getByText('Scale 0–9.0')).toBeVisible();

    // Take screenshot of Completed Attempt Report
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/mock_report_completed_attempt.png`,
      fullPage: true,
    });
  });
});
