import type {
  WritingEvaluationFeedback,
  WritingErrorItem,
  WritingVocabUpgrade,
  WritingPromptContent,
} from '../../types';
import { generateSentenceHighlights, generateBandUpgrades } from './sentenceHighlighter';
import { extractTask1OverviewTrends } from './task1TrendExtractor';

// Common stop words to exclude when analyzing repetitive vocabulary
const STOP_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not',
  'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from',
  'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would',
  'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which',
  'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
  'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see',
  'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think',
  'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is', 'are', 'was', 'were'
]);

// Cohesive transition devices by function
const COHESIVE_MARKERS = {
  contrast: ['however', 'on the other hand', 'in contrast', 'conversely', 'nevertheless', 'nonetheless', 'whereas', 'while', 'despite', 'in spite of'],
  addition: ['furthermore', 'moreover', 'in addition', 'additionally', 'not only', 'besides', 'what is more'],
  causeEffect: ['therefore', 'consequently', 'as a result', 'thus', 'hence', 'accordingly', 'leading to'],
  exemplification: ['for example', 'for instance', 'such as', 'specifically', 'to illustrate'],
  sequencing: ['firstly', 'secondly', 'furthermore', 'finally', 'initially', 'subsequently', 'in the preliminary stage'],
  summary: ['in conclusion', 'overall', 'to summarize', 'in summary', 'to conclude', 'ultimately'],
};

// Common word upgrade dictionary
const VOCAB_UPGRADES: Record<string, { advanced: string; reason: string }> = {
  'good': { advanced: 'beneficial / advantageous', reason: 'Provides higher academic precision than generic "good".' },
  'bad': { advanced: 'detrimental / adverse', reason: 'More formal and analytical in academic discourse.' },
  'big': { advanced: 'substantial / considerable / monumental', reason: 'Better conveys magnitude in quantitative contexts.' },
  'small': { advanced: 'negligible / marginal / minimal', reason: 'Accurately denotes minute scales.' },
  'important': { advanced: 'paramount / indispensable / vital', reason: 'Elevates emphasis and vocabulary range.' },
  'show': { advanced: 'delineate / illustrate / demonstrate', reason: 'Standard IELTS Academic Task 1 formal reporting verb.' },
  'help': { advanced: 'facilitate / expedite / bolster', reason: 'Demonstrates active academic agency.' },
  'make': { advanced: 'generate / cultivate / foster', reason: 'Replaces colloquial "make" with specific verbs.' },
  'get': { advanced: 'acquire / attain / secure', reason: 'Avoids informal conversational verb "get".' },
  'thing': { advanced: 'phenomenon / factor / element / facet', reason: '"Thing" is too vague for academic writing.' },
  'lot': { advanced: 'plethora / substantial proportion / myriad', reason: 'Replaces informal "a lot of".' },
  'very': { advanced: 'profoundly / exceedingly / acute', reason: 'Stronger modifier than "very".' },
};

/**
 * Perform rule-based linguistic evaluation of an essay or letter.
 */
export function evaluateWritingRuleBased(
  essayText: string,
  prompt: WritingPromptContent
): WritingEvaluationFeedback {
  const text = essayText.trim();
  const minRequired = prompt.minWordCount;

  // 1. Word Count & Length Penalty
  const rawWords = text.length > 0 ? text.split(/\s+/).filter(Boolean) : [];
  const wordCount = rawWords.length;
  const underlength = wordCount < minRequired;
  const penaltyApplied = underlength;

  let wordCountDetails = `Your submission contains ${wordCount} words. Minimum required: ${minRequired} words.`;
  if (underlength) {
    wordCountDetails += ` Warning: Submissions under ${minRequired} words incur a direct penalty in Task Achievement.`;
  }

  // 2. Paragraph Structure
  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  const paragraphCount = paragraphs.length;

  // 3. Cohesive Devices
  const lowerText = text.toLowerCase();
  const foundCohesive = new Set<string>();
  let cohesiveCount = 0;

  for (const group of Object.values(COHESIVE_MARKERS)) {
    for (const marker of group) {
      if (lowerText.includes(marker)) {
        foundCohesive.add(marker);
        cohesiveCount++;
      }
    }
  }

  // 4. Repeated Words & Vocabulary Density
  const wordFrequency: Record<string, number> = {};
  for (const w of rawWords) {
    const clean = w.toLowerCase().replace(/[^a-z]/g, '');
    if (clean.length > 3 && !STOP_WORDS.has(clean)) {
      wordFrequency[clean] = (wordFrequency[clean] || 0) + 1;
    }
  }

  const repeatedWords = Object.entries(wordFrequency)
    .filter(([_, count]) => count >= 4)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  // Suggested Vocab Upgrades
  const vocabUpgrades: WritingVocabUpgrade[] = [];
  for (const [simple, upgrade] of Object.entries(VOCAB_UPGRADES)) {
    const regex = new RegExp(`\\b${simple}\\b`, 'i');
    if (regex.test(text)) {
      vocabUpgrades.push({
        original: simple,
        advancedAlternative: upgrade.advanced,
        reason: upgrade.reason,
      });
    }
  }

  // 5. Sentence Variety & Complexity
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const sentenceCount = Math.max(1, sentences.length);
  const avgSentenceLength = Math.round(wordCount / sentenceCount);

  const complexMarkers = ['although', 'because', 'whereas', 'while', 'which', 'who', 'if', 'unless', 'since', 'despite'];
  let complexCount = 0;
  for (const m of complexMarkers) {
    const matches = lowerText.match(new RegExp(`\\b${m}\\b`, 'g'));
    if (matches) complexCount += matches.length;
  }
  const complexRatio = Math.min(1.0, complexCount / sentenceCount);

  // 6. Spelling & Error Detection
  const errors: WritingErrorItem[] = [];

  // Common spelling/grammar heuristic slips
  const heuristicRules: Array<{ regex: RegExp; correction: string; rule: string; type: WritingErrorItem['type'] }> = [
    { regex: /\b(alot)\b/i, correction: 'a lot', rule: '"Alot" is not a word; write "a lot" or "a great deal".', type: 'spelling' },
    { regex: /\b(beleive|beleives)\b/i, correction: 'believe / believes', rule: 'Spelling error: "i before e except after c" (believe).', type: 'spelling' },
    { regex: /\b(goverment)\b/i, correction: 'government', rule: 'Spelling error: do not omit the "n" in "government".', type: 'spelling' },
    { regex: /\b(environemnt|enviroment)\b/i, correction: 'environment', rule: 'Spelling error: "environment" contains an "n" after "o".', type: 'spelling' },
    { regex: /\b(neccessary|necessery)\b/i, correction: 'necessary', rule: 'Spelling error: one "c", double "s" (necessary).', type: 'spelling' },
    { regex: /\b(definately)\b/i, correction: 'definitely', rule: 'Spelling error: write "definitely" with an "i".', type: 'spelling' },
    { regex: /\b(untill)\b/i, correction: 'until', rule: 'Spelling error: "until" ends with a single "l".', type: 'spelling' },
    { regex: /\b(succesful)\b/i, correction: 'successful', rule: 'Spelling error: double "c" and double "s" (successful).', type: 'spelling' },
    { regex: /\b(conclution)\b/i, correction: 'conclusion', rule: 'Spelling error: write "conclusion" with "s", not "t".', type: 'spelling' },
    { regex: /\b(every students?)\b/i, correction: 'every student', rule: '"Every" must be followed by a singular countable noun ("every student").', type: 'grammar' },
    { regex: /\b(in my opinion I think)\b/i, correction: 'in my opinion', rule: 'Redundancy: "in my opinion" already conveys "I think".', type: 'vocabulary' },
    { regex: /\b(every people)\b/i, correction: 'everyone / all people', rule: '"Every" precedes singular nouns; use "everyone" or "all people".', type: 'grammar' },
    { regex: /\b(discuss about)\b/i, correction: 'discuss', rule: 'The verb "discuss" is transitive; do not insert the preposition "about".', type: 'grammar' },
    { regex: /\b(more better)\b/i, correction: 'better / much better', rule: 'Double comparative error. Use "better" or "much better".', type: 'grammar' },
    { regex: /\b(informations)\b/i, correction: 'information', rule: '"Information" is an uncountable noun with no plural "s".', type: 'grammar' },
    { regex: /\b(advices)\b/i, correction: 'advice / pieces of advice', rule: '"Advice" is uncountable.', type: 'grammar' },
  ];

  for (const h of heuristicRules) {
    const match = text.match(h.regex);
    if (match) {
      errors.push({
        originalText: match[0],
        correction: h.correction,
        rule: h.rule,
        type: h.type,
      });
    }
  }

  // 7. Calculate Bands per Criterion
  // Criterion 1: Task Achievement / Response
  let trBand = 6.0;
  if (wordCount >= minRequired + 30) trBand += 0.5;
  if (wordCount >= minRequired + 80) trBand += 0.5;
  if (underlength) trBand = Math.max(4.0, trBand - 1.5);
  if (paragraphCount >= 3 && paragraphCount <= 5) trBand += 0.5;
  else if (paragraphCount < 2) trBand -= 1.0;
  trBand = Math.min(9.0, Math.max(3.0, Math.round(trBand * 2) / 2));

  // Criterion 2: Coherence and Cohesion
  let ccBand = 5.5;
  if (paragraphCount >= 3 && paragraphCount <= 5) ccBand += 0.5;
  if (foundCohesive.size >= 4) ccBand += 0.5;
  if (foundCohesive.size >= 7) ccBand += 0.5;
  if (sentences.some((s) => s.split(' ').length > 45)) ccBand -= 0.5; // run-on sentence penalty
  ccBand = Math.min(9.0, Math.max(3.0, Math.round(ccBand * 2) / 2));

  // Criterion 3: Lexical Resource
  let lrBand = 5.5;
  const uniqueWordCount = Object.keys(wordFrequency).length;
  const lexicalRatio = wordCount > 0 ? uniqueWordCount / wordCount : 0;
  if (lexicalRatio > 0.45) lrBand += 0.5;
  if (lexicalRatio > 0.55) lrBand += 0.5;
  if (repeatedWords.length >= 3) lrBand -= 0.5;
  if (errors.filter((e) => e.type === 'spelling').length > 3) lrBand -= 0.5;
  lrBand = Math.min(9.0, Math.max(3.0, Math.round(lrBand * 2) / 2));

  // Criterion 4: Grammatical Range and Accuracy
  let graBand = 5.5;
  if (avgSentenceLength >= 15 && avgSentenceLength <= 28) graBand += 0.5;
  if (complexRatio >= 0.3) graBand += 0.5;
  if (complexRatio >= 0.5) graBand += 0.5;
  if (errors.filter((e) => e.type === 'grammar').length >= 3) graBand -= 0.5;
  graBand = Math.min(9.0, Math.max(3.0, Math.round(graBand * 2) / 2));

  // Overall Band (average of the 4 rounded to nearest 0.5)
  const average = (trBand + ccBand + lrBand + graBand) / 4;
  const overallBand = Math.round(average * 2) / 2;

  // Strengths and Weaknesses
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (wordCount >= minRequired) {
    strengths.push(`Sufficient length: Produced ${wordCount} words (exceeds ${minRequired}-word requirement).`);
  } else {
    weaknesses.push(`Underlength: Only ${wordCount} words written (penalty applied for falling below ${minRequired}).`);
  }

  if (paragraphCount >= 3 && paragraphCount <= 5) {
    strengths.push(`Clear structural layout across ${paragraphCount} distinct paragraphs.`);
  } else {
    weaknesses.push(`Suboptimal paragraphing (${paragraphCount} paragraphs found). Aim for 4 paragraphs with clear topic sentences.`);
  }

  if (foundCohesive.size >= 5) {
    strengths.push(`Varied cohesive transitions used effectively (e.g. ${Array.from(foundCohesive).slice(0, 3).join(', ')}).`);
  } else {
    weaknesses.push('Limited transitional linking phrases. Incorporate more contrasting and causal connectives.');
  }

  if (complexRatio >= 0.3) {
    strengths.push(`Good syntactic range with compound and complex subordinate clauses.`);
  } else {
    weaknesses.push('Over-reliance on simple sentence structures. Practice subordinating conjunctions (e.g. "although", "whereas").');
  }

  // Rewrite / Improved Paragraph
  const sampleParagraph = paragraphs.length > 1 ? paragraphs[1] : (paragraphs[0] || '');
  const improvedParagraph = {
    originalParagraph: sampleParagraph,
    rewrittenParagraph: sampleParagraph
      ? sampleParagraph
          .replace(/\b(good|very good)\b/gi, 'highly advantageous')
          .replace(/\b(bad)\b/gi, 'severely detrimental')
          .replace(/\b(a lot of|lots of)\b/gi, 'a substantial volume of')
          .replace(/\b(also)\b/gi, 'moreover')
      : 'In addition to technological innovations, institutional policies must provide targeted economic support.',
    examinerNote: 'This rewrite enhances lexical variety and strengthens linking cohesion to reach Band 8 standards.',
  };

  // Extract candidate sentence snippets for evidence quotation
  const sampleSentence = sentences[0] ? `"${sentences[0].slice(0, 75)}..."` : 'the candidate response';
  const midSentence = sentences.length > 2 ? `"${sentences[Math.floor(sentences.length / 2)].slice(0, 75)}..."` : sampleSentence;

  const sentenceHighlights = generateSentenceHighlights(essayText, errors, vocabUpgrades);
  const bandUpgradeSuggestions = generateBandUpgrades(essayText, prompt.taskType);
  const task1OverviewHelper = extractTask1OverviewTrends(prompt) || undefined;

  return {
    evaluationMode: 'rule_based',
    overallBand,
    criteria: {
      taskAchievement: {
        band: trBand,
        comments: underlength
          ? `Word count fell short of the ${minRequired}-word requirement. As evidenced in ${sampleSentence}, the discussion requires deeper development.`
          : `Addresses the prompt requirements with sufficient word volume (${wordCount} words). Key premise outlined in ${sampleSentence}.`,
      },
      coherenceAndCohesion: {
        band: ccBand,
        comments: `Organized into ${paragraphCount} paragraphs with ${foundCohesive.size} distinct cohesive transitions identified (e.g., ${Array.from(foundCohesive).slice(0, 3).map((c) => `"${c}"`).join(', ')}). Central idea supported in ${midSentence}.`,
      },
      lexicalResource: {
        band: lrBand,
        comments: `Lexical diversity ratio is ${(lexicalRatio * 100).toFixed(0)}%. ${
          repeatedWords.length > 0
            ? `Evidence shows repeated usage of terms like ${repeatedWords.slice(0, 3).map((r) => `"${r[0]}"`).join(', ')}. Expand synonyms.`
            : `Evidence shows controlled academic vocabulary across the body paragraphs.`
        }`,
      },
      grammaticalRangeAndAccuracy: {
        band: graBand,
        comments: `Average sentence length is ${avgSentenceLength} words per sentence with complex clause density of ${(complexRatio * 100).toFixed(0)}%. Syntactic structures examined in clauses such as ${midSentence}.`,
      },
    },
    strengths,
    weaknesses,
    errors,
    vocabUpgrades: vocabUpgrades.slice(0, 5),
    improvedParagraph,
    wordCountAnalysis: {
      wordCount,
      minRequired,
      penaltyApplied,
      details: wordCountDetails,
    },
    sentenceHighlights,
    bandUpgradeSuggestions,
    task1OverviewHelper,
  };
}
