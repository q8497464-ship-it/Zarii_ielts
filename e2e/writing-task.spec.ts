import { test, expect } from '@playwright/test';

test.describe('E2E: Writing Task & AI Evaluator', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('zarii_tour_completed', 'true');
      window.localStorage.setItem('zarii_guest_mode', 'true');
    });

    // Mock external Gemini / Groq API endpoints if invoked
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
                      overallBand: 7.5,
                      taskResponseBand: 7.5,
                      coherenceCohesionBand: 7.5,
                      lexicalResourceBand: 7.5,
                      grammaticalRangeBand: 7.5,
                      examinerSummary: 'Strong response with comprehensive arguments and clear progression.',
                      criteriaFeedback: {
                        taskResponse: { band: 7.5, strengths: ['Clear stance throughout'], improvements: ['Deepen second example'] },
                        coherenceCohesion: { band: 7.5, strengths: ['Logical paragraphing'], improvements: ['Use more subtle transitions'] },
                        lexicalResource: { band: 7.5, strengths: ['Academic vocabulary'], improvements: ['Vary collocations'] },
                        grammaticalRange: { band: 7.5, strengths: ['Complex sentence structures'], improvements: ['Eliminate minor punctuation slips'] },
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
  });

  test('types essay in WritingEditor, verifies live word counter and submits for evaluation', async ({ page }) => {
    await page.goto('/app/practice/writing/prompt/t2-01');

    // Verify prompt and textarea exist
    const editor = page.locator('textarea');
    await expect(editor).toBeVisible({ timeout: 10000 });

    const sampleEssay = `In the contemporary era, the rapid proliferation of artificial intelligence has ignited a contentious debate regarding the perpetuity of conventional educators in academic institutions. While technological algorithms undeniably offer unparalleled individualized instruction, I staunchly contend that human pedagogues remain fundamentally irreplaceable in nurturing holistic student development.

To begin with, automated learning applications provide extraordinary advantages in standardizing curriculum pacing and diagnosing conceptual deficits. Intelligent software can dynamically customize problem sets according to each pupil's immediate grasp, thereby eliminating tedious pedagogical redundancy. Nevertheless, education transcends the mere assimilation of factual data; it is intrinsically linked to moral introspection and emotional resonance.

Furthermore, human teachers serve as vital role models who model ethical principles, cultivate intellectual curiosity, and provide crucial psychological guidance. An algorithmic entity lacks the psychological discernment necessary to detect student disillusionment or distress. Consequently, the empathetic mentorship offered by human teachers fosters resilience and civic responsibility in ways silicon chips cannot duplicate.

In conclusion, artificial intelligence should be embraced as an empowering supplementary instrument rather than a comprehensive replacement for traditional educators.`;

    await editor.fill(sampleEssay);

    // Verify word count updates (sample is ~180+ words)
    await expect(page.locator('text=/Words:\\s*\\d+|\\d+\\s*\\/|\\d+\\s+words/i').first()).toBeVisible();

    // Verify autosave status
    await expect(page.locator('text=/saved/i').first()).toBeVisible();

    // Submit for evaluation
    const submitBtn = page.getByRole('button', { name: /Submit for AI Evaluation|Submit Essay/i }).first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();

      // Expect either evaluation loader or feedback results
      await expect(
        page.locator('text=/Band Score|Examiner Feedback|Evaluation Results/i').first()
      ).toBeVisible({ timeout: 15000 });
    }
  });
});
