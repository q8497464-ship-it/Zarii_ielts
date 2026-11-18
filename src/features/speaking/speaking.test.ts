import { describe, it, expect } from 'vitest';
import {
  ALL_PART1_TOPICS,
  ALL_PART2_CUE_CARDS,
  getPart1TopicById,
  getPart2CueCardById,
  getRandomPart1Topic,
  getRandomPart2CueCard,
} from './speakingContent';
import {
  computeSpeakingMetrics,
  evaluateSpeakingRuleBased,
} from './speakingAnalysis';

describe('Speaking Module Content', () => {
  it('loads all 20 Part 1 topics with exactly 6 questions each (120 questions total)', () => {
    expect(ALL_PART1_TOPICS.length).toBe(20);

    let totalQCount = 0;
    ALL_PART1_TOPICS.forEach((t) => {
      expect(t.id).toBeTruthy();
      expect(t.topic).toBeTruthy();
      expect(t.questions.length).toBe(6);
      t.questions.forEach((q) => {
        expect(q.id).toBeTruthy();
        expect(q.text.length).toBeGreaterThan(10);
        expect(q.sampleOutline.length).toBeGreaterThan(15);
        totalQCount++;
      });
    });

    expect(totalQCount).toBe(120);
  });

  it('loads all 90 Part 2 cue cards with bullet points, model answers, and Part 3 questions', () => {
    expect(ALL_PART2_CUE_CARDS.length).toBe(90);

    ALL_PART2_CUE_CARDS.forEach((c) => {
      expect(c.id).toBeTruthy();
      expect(c.topic).toBeTruthy();
      expect(c.cueCard.bulletPoints.length).toBeGreaterThanOrEqual(4);
      expect(c.cueCard.prepTimeSeconds).toBe(60);
      expect(c.cueCard.speakTimeSeconds).toBe(120);

      // Model answer
      expect(c.sampleAnswer.length).toBeGreaterThan(100);
      expect(c.keyCollocations.length).toBeGreaterThanOrEqual(4);

      // Linked Part 3 questions (2 to 3)
      expect(c.part3Questions.length).toBeGreaterThanOrEqual(2);
      expect(c.part3Questions.length).toBeLessThanOrEqual(4);
      c.part3Questions.forEach((p3) => {
        expect(p3.question.length).toBeGreaterThan(15);
        expect(p3.sampleOutline.length).toBeGreaterThan(15);
      });
    });
  });

  it('correctly retrieves topics and cards by id and supports random selection', () => {
    const topic = getPart1TopicById('p1-01');
    expect(topic).toBeDefined();
    expect(topic?.topic).toBe('Hometown & Neighborhood');

    const card = getPart2CueCardById('p2-01');
    expect(card).toBeDefined();
    expect(card?.topic).toBe('An Environmental Problem in Your Area');

    const randTopic = getRandomPart1Topic();
    expect(randTopic).toBeDefined();
    expect(randTopic.questions.length).toBe(6);

    const randCard = getRandomPart2CueCard();
    expect(randCard).toBeDefined();
    expect(randCard.part3Questions.length).toBeGreaterThanOrEqual(2);
  });
});

describe('Speaking Acoustic & Linguistic Analysis Engine', () => {
  it('accurately computes WPM, word count, and filler words from transcript', () => {
    const sampleSpeech = `
      Well, um, I believe that technology is, you know, actually very important for daily life. 
      Uh, for instance, we use smartphones for work, study, and, like, keeping in touch with our friends.
    `;
    const durationSeconds = 30; // 0.5 minutes

    const metrics = computeSpeakingMetrics(sampleSpeech, durationSeconds);

    expect(metrics.totalWords).toBeGreaterThan(20);
    // WPM should be ~ (wordCount / 0.5)
    expect(metrics.wordsPerMinute).toBeGreaterThan(40);
    expect(metrics.fillerWordsCount).toBeGreaterThanOrEqual(4); // um, you know, actually, uh, like
    expect(metrics.fillerWordsList.some((f) => f.word.toLowerCase() === 'um')).toBe(true);
    expect(metrics.uniqueWordRatio).toBeGreaterThan(0.3);
  });

  it('evaluates fluency and coherence, lexical resource, and grammar range in 0.5 band steps', () => {
    const fluentSpeech = `
      In my view, metropolitan transportation systems are indispensable for economic growth.
      However, rapid urban expansion has generated acute traffic congestion along arterial highways.
      Consequently, municipal authorities must invest heavily in electrified rail infrastructure and dedicated bicycle corridors.
      Although these projects require substantial capital expenditure, they yield immense environmental dividends in the long term.
    `.trim();
    const durationSeconds = 45;

    const result = evaluateSpeakingRuleBased(fluentSpeech, durationSeconds, 'Urban Transportation', 3);

    expect(result.evaluationMode).toBe('rule_based');
    expect(result.overallBand).toBeGreaterThanOrEqual(6.0);
    expect(result.overallBand % 0.5).toBe(0);

    // Criteria bands
    expect(result.criteria.fluencyAndCoherence.band % 0.5).toBe(0);
    expect(result.criteria.lexicalResource.band % 0.5).toBe(0);
    expect(result.criteria.grammaticalRangeAndAccuracy.band % 0.5).toBe(0);

    // Feedback content
    expect(result.strengths.length).toBeGreaterThan(0);
    expect(result.upgradedPhrases.length).toBeGreaterThan(0);
    expect(result.pronunciationGuide.disclaimer).toBeTruthy();
    expect(result.pronunciationGuide.selfAssessmentChecklist.length).toBeGreaterThanOrEqual(4);
  });

  it('penalizes severe underlength speech in Part 2 long turn', () => {
    const tooShortPart2 = 'I want to talk about my hometown. It is a nice city with many parks and good food.';
    const durationSeconds = 15; // only 15 seconds instead of 120s!

    const result = evaluateSpeakingRuleBased(tooShortPart2, durationSeconds, 'Hometown', 2);

    expect(result.criteria.fluencyAndCoherence.band).toBeLessThanOrEqual(5.5);
    expect(result.overallBand).toBeLessThanOrEqual(5.5);
  });

  it('generates examiner follow-up questions, topic lexicon, and model Band 7 comparison', () => {
    const speech = `
      From my perspective, environmental degradation is primarily driven by industrial emissions.
      Consequently, state authorities ought to implement strict carbon taxation on multinational corporations.
      Moreover, individual citizens can make a tangible difference through active recycling and energy conservation.
    `.trim();

    const result = evaluateSpeakingRuleBased(speech, 50, 'Environmental Protection', 3);

    // Follow-up question
    expect(result.followUpQuestion).toBeDefined();
    expect(result.followUpQuestion?.question).toBeTruthy();
    expect(result.followUpQuestion?.rationale).toBeTruthy();

    // Topic vocabulary
    expect(result.topicVocabulary).toBeDefined();
    expect(result.topicVocabulary!.length).toBeGreaterThanOrEqual(3);

    // Model Band 7 answer
    expect(result.modelBand7Answer).toBeDefined();
    expect(result.modelBand7Answer?.transcript).toBeTruthy();
    expect(result.modelBand7Answer?.keyDifferences.length).toBeGreaterThanOrEqual(2);

    // Quoted evidence in criteria comments
    expect(result.criteria.fluencyAndCoherence.comments).toContain('"');
    expect(result.criteria.lexicalResource.comments).toContain('"');
    expect(result.criteria.grammaticalRangeAndAccuracy.comments).toContain('"');
  });
});
