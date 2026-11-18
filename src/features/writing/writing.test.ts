import { describe, it, expect } from 'vitest';
import {
  getAllWritingPrompts,
  getWritingPromptsByType,
  getWritingPromptById,
} from './writingContent';
import { evaluateWritingRuleBased } from './ruleBasedEvaluator';

describe('Writing Module Content', () => {
  it('loads all 120 original prompts across Academic and General Training', () => {
    const all = getAllWritingPrompts();
    expect(all.length).toBe(120);

    const acadTask1 = getWritingPromptsByType('task1_academic');
    expect(acadTask1.length).toBe(30);

    const genTask1 = getWritingPromptsByType('task1_general');
    expect(genTask1.length).toBe(15);

    const task2 = getWritingPromptsByType('task2');
    expect(task2.length).toBe(75);
  });

  it('ensures each prompt has required IELTS attributes and a Band 8+ model answer', () => {
    const all = getAllWritingPrompts();
    all.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.promptText).toBeTruthy();
      expect(p.recommendedMinutes).toBeGreaterThan(0);
      expect(p.minWordCount).toBeGreaterThanOrEqual(150);

      // Model answer requirements
      expect(p.sampleAnswers).toBeDefined();
      expect(p.sampleAnswers!.length).toBeGreaterThan(0);
      expect(p.sampleAnswers![0].text.trim().length).toBeGreaterThan(100);
      expect(p.sampleAnswers![0].band).toBeGreaterThanOrEqual(7.5);
      expect(p.sampleAnswers![0].examinerCommentary).toBeTruthy();

      // Planning guide requirements
      expect(p.planningGuide).toBeDefined();
      expect(p.planningGuide!.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('retrieves prompt by id and returns undefined for invalid id', () => {
    const prompt = getWritingPromptById('acad-t1-01');
    expect(prompt).toBeDefined();
    expect(prompt?.id).toBe('acad-t1-01');

    const task2Prompt = getWritingPromptById('t2-01');
    expect(task2Prompt).toBeDefined();
    expect(task2Prompt?.id).toBe('t2-01');

    const invalid = getWritingPromptById('non-existent-prompt');
    expect(invalid).toBeUndefined();
  });
});

describe('Writing Rule-Based Evaluator', () => {
  const samplePrompt = getWritingPromptById('t2-01')!;

  it('applies word count penalty when essay is severely underlength', () => {
    const shortEssay = 'In modern life, university is very important for many young people because it helps them get good jobs. However, some people think practical skills are better.';
    const result = evaluateWritingRuleBased(shortEssay, samplePrompt);

    expect(result.evaluationMode).toBe('rule_based');
    expect(result.wordCountAnalysis.penaltyApplied).toBe(true);
    expect(result.wordCountAnalysis.wordCount).toBeLessThan(150);
    expect(result.criteria.taskAchievement.band).toBeLessThanOrEqual(5.0);
    expect(result.overallBand).toBeLessThanOrEqual(5.5);
  });

  it('evaluates a full essay and produces structured IELTS feedback with 4 criteria', () => {
    const fullEssay = `
In contemporary society, higher education has become a central prerequisite for career advancement in numerous specialized professions across the globe. While some individuals contend that tertiary degrees guarantee vocational security, others argue that pragmatic experience and technical vocational capabilities are considerably more advantageous in today's fast-paced labor market. This essay will critically examine both perspectives before presenting a balanced, reasoned conclusion.

On the one hand, university education imparts rigorous theoretical knowledge and cultivates indispensable analytical skills. For instance, disciplines such as medicine, engineering, architecture, and jurisprudence necessitate accredited academic foundations that cannot be acquired solely through informal apprenticeships or short online courses. Furthermore, university campuses foster diverse intellectual environments where students develop critical reasoning, peer collaboration, and intercultural competencies. Consequently, degree holders often enjoy superior initial recruitment prospects, enhanced career mobility, and significantly higher lifetime earnings in international corporate sectors.

On the other hand, rapid technological disruption has elevated the importance of practical, hands-on competence. In dynamic industries such as digital marketing and software development, real-world project portfolios and proven adaptability frequently outweigh theoretical classroom knowledge. Moreover, individuals who enter the workforce immediately gain early commercial experience, avoid substantial student loan debt, and build professional industry networks several years earlier than traditional university graduates. In addition, vocational trade specialists such as electricians and mechanics frequently earn lucrative salaries without tertiary degrees.

In conclusion, while practical vocational proficiency provides rapid access into flexible labor markets, university education remains irreplaceable for high-level technical, medical, and scholarly careers. Therefore, the optimal solution involves integrating hands-on industrial internships into tertiary academic curricula to maximize graduate employability and meet contemporary economic demands effectively.
    `.trim();

    const result = evaluateWritingRuleBased(fullEssay, samplePrompt);

    expect(result.evaluationMode).toBe('rule_based');
    expect(result.wordCountAnalysis.penaltyApplied).toBe(false);
    expect(result.wordCountAnalysis.wordCount).toBeGreaterThanOrEqual(250);

    // Verify all 4 criteria
    expect(result.criteria.taskAchievement.band).toBeGreaterThanOrEqual(6.0);
    expect(result.criteria.coherenceAndCohesion.band).toBeGreaterThanOrEqual(6.5);
    expect(result.criteria.lexicalResource.band).toBeGreaterThanOrEqual(6.0);
    expect(result.criteria.grammaticalRangeAndAccuracy.band).toBeGreaterThanOrEqual(6.0);

    // Overall band must be half-band step (e.g. 6.0, 6.5, 7.0, etc.)
    expect(result.overallBand % 0.5).toBe(0);

    // Strengths and weaknesses
    expect(result.strengths.length).toBeGreaterThan(0);
    expect(result.weaknesses.length).toBeGreaterThan(0);

    // Improved paragraph and examiner notes
    expect(result.improvedParagraph.originalParagraph).toBeTruthy();
    expect(result.improvedParagraph.rewrittenParagraph).toBeTruthy();
    expect(result.improvedParagraph.examinerNote).toBeTruthy();
  });

  it('detects common mechanical errors and suggests vocabulary upgrades', () => {
    const essayWithSlips = `
Nowadays a lot of people think that university degree is very good and very important. They beleive it gives more money in life. I think this is totally true because every students must learn.
    `.trim();

    const result = evaluateWritingRuleBased(essayWithSlips, samplePrompt);

    // Should detect errors (e.g., misspelled 'beleive', subject-verb agreement 'every students')
    expect(result.errors.length).toBeGreaterThan(0);

    // Should suggest vocabulary upgrades for common words like 'very' / 'good'
    expect(result.vocabUpgrades.length).toBeGreaterThan(0);
  });

  it('generates sentence-level highlights, band upgrades, and quotes verbatim evidence', () => {
    const essayWithMix = `
Many people think that university degree is very good. In addition, studying at college helps students learn a lot of things. However, if governments do not support education, poor families cannot afford it.
    `.trim();

    const result = evaluateWritingRuleBased(essayWithMix, samplePrompt);

    // Sentence highlights
    expect(result.sentenceHighlights).toBeDefined();
    expect(result.sentenceHighlights!.length).toBeGreaterThanOrEqual(2);

    // Band upgrade suggestions
    expect(result.bandUpgradeSuggestions).toBeDefined();
    expect(result.bandUpgradeSuggestions!.length).toBeGreaterThanOrEqual(1);

    // Verbatim evidence quotation in comments
    expect(result.criteria.taskAchievement.comments).toContain('"');
    expect(result.criteria.coherenceAndCohesion.comments).toContain('"');
    expect(result.criteria.grammaticalRangeAndAccuracy.comments).toContain('"');
  });

  it('verifies the 6 calibration essays dataset covers bands 5.0 to 8.0', async () => {
    const { CALIBRATION_ESSAYS } = await import('./calibrationEssays');
    expect(CALIBRATION_ESSAYS.length).toBe(6);

    const bands = CALIBRATION_ESSAYS.map((e) => e.targetBand);
    expect(bands).toContain(5.0);
    expect(bands).toContain(5.5);
    expect(bands).toContain(6.0);
    expect(bands).toContain(6.5);
    expect(bands).toContain(7.0);
    expect(bands).toContain(8.0);
  });
});
