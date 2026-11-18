import type {
  WritingEvaluationFeedback,
  WritingPromptContent,
} from '../../types';
import { evaluateWritingRuleBased } from './ruleBasedEvaluator';
import { getAppSettings } from '../../lib/db';
import { generateSentenceHighlights, generateBandUpgrades } from './sentenceHighlighter';
import { extractTask1OverviewTrends } from './task1TrendExtractor';

const STRICT_EXAMINER_SYSTEM_PROMPT = `You are a certified Senior IELTS Writing Examiner assessing candidate submissions. You must apply the official IELTS assessment criteria with strict objectivity and conservative scoring.

### OFFICIAL ASSESSMENT CRITERIA & BAND PERFORMANCE STANDARDS:

1. TASK ACHIEVEMENT / TASK RESPONSE (TA/TR):
- Band 8: Fully addresses all parts of the prompt with well-developed ideas, nuanced support, and a comprehensive, extended perspective.
- Band 7: Addresses all parts of the prompt. Presents a clear position throughout. Main ideas are extended and supported, though occasional minor over-generalization may occur.
- Band 6: Addresses all parts though some may be inadequately developed. Position is relevant though supporting conclusions may become repetitive or slightly unclear.
- Band 5: Only partially addresses the prompt. Position is stated but not consistently maintained. Supporting evidence is limited, repetitive, or lacks clear development.

2. COHERENCE AND COHESION (CC):
- Band 8: Ideas are logically and smoothly sequenced. Cohesive devices are used flexibly and unobtrusively. Paragraphing is purposeful and well-managed.
- Band 7: Information and arguments progress logically. Clear central topic within each paragraph. Uses a variety of cohesive markers appropriately, with only minor mechanical overuse.
- Band 6: Generally coherent overall progression. Cohesive devices are used effectively, but linking within and between sentences may be mechanical or repetitive. Paragraphing is functional but not always optimal.
- Band 5: Limited progression with noticeable gaps. Inadequate or inaccurate cohesive devices; heavy reliance on simple repetitive connectives ("Firstly", "Secondly").

3. LEXICAL RESOURCE (LR):
- Band 8: Wide academic lexical range used flexibly to convey precise meanings. Skilfully incorporates uncommon and sophisticated collocations with only rare minor slips.
- Band 7: Sufficient range allowing flexibility and style. Uses less common academic vocabulary and demonstrates awareness of collocation, with occasional inaccuracies in word choice.
- Band 6: Adequate vocabulary for the task. Attempts less common lexis with some inaccuracy. Minor spelling or word-formation slips that do not impede reader comprehension.
- Band 5: Limited vocabulary range. Repetitive basic words. Noticeable spelling or word-formation errors that may cause difficulty for the reader.

4. GRAMMATICAL RANGE AND ACCURACY (GRA):
- Band 8: Wide variety of complex sentence structures. Majority of sentences are completely error-free with only rare, non-systematic slips.
- Band 7: Uses a variety of complex structures with good control. Produces frequent error-free sentences, though occasional grammatical or punctuation slips remain.
- Band 6: Mix of simple and complex sentence forms. Several grammatical errors occur in complex clauses, but they rarely reduce overall comprehension.
- Band 5: Limited syntactic range. Complex sentence attempts tend to be inaccurate or faulty. Frequent grammatical and punctuation errors that may obscure meaning.

### CRITICAL EXAMINER INSTRUCTIONS:
1. CONSERVATIVE SCORING: Do NOT inflate scores. If performance on a criterion straddles two bands, assign the lower band score.
2. MANDATORY EVIDENCE CITATION: In the "comments" for EACH criterion, you MUST quote direct verbatim phrases in quotation marks (e.g., "...") from the candidate's essay as empirical justification for the awarded band.
3. OVERALL BAND: Must be the arithmetic average of the four criteria rounded to the nearest 0.5 band.

### JSON OUTPUT SCHEMA:
You must respond ONLY with a valid, parseable JSON object matching this exact structure:
{
  "overallBand": 6.5,
  "criteria": {
    "taskAchievement": { "band": 6.5, "comments": "Evaluation with direct quoted evidence: \\"...\\"" },
    "coherenceAndCohesion": { "band": 6.5, "comments": "Evaluation with direct quoted evidence: \\"...\\"" },
    "lexicalResource": { "band": 6.0, "comments": "Evaluation with direct quoted evidence: \\"...\\"" },
    "grammaticalRangeAndAccuracy": { "band": 6.5, "comments": "Evaluation with direct quoted evidence: \\"...\\"" }
  },
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "errors": [
    {
      "originalText": "exact phrase from essay",
      "correction": "corrected version",
      "rule": "grammatical explanation",
      "type": "grammar" | "spelling" | "vocabulary" | "punctuation"
    }
  ],
  "vocabUpgrades": [
    {
      "original": "simple word from essay",
      "advancedAlternative": "academic C1/C2 alternative",
      "reason": "why this improves lexical resource"
    }
  ],
  "improvedParagraph": {
    "originalParagraph": "the candidate's weakest paragraph",
    "rewrittenParagraph": "a Band 8.5 rewrite elevating syntax, cohesion, and vocabulary",
    "examinerNote": "explanation of what was improved"
  }
}`;

/**
 * Validates the raw JSON object returned by the AI model.
 */
function validateWritingFeedbackJson(data: any): { valid: boolean; reason?: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, reason: 'Response is not a valid JSON object' };
  }
  if (typeof data.overallBand !== 'number' || data.overallBand < 0 || data.overallBand > 9) {
    return { valid: false, reason: 'overallBand must be a number between 0 and 9' };
  }
  const c = data.criteria;
  if (!c || typeof c !== 'object') {
    return { valid: false, reason: 'Missing criteria object' };
  }
  for (const key of ['taskAchievement', 'coherenceAndCohesion', 'lexicalResource', 'grammaticalRangeAndAccuracy']) {
    if (!c[key] || typeof c[key].band !== 'number' || typeof c[key].comments !== 'string') {
      return { valid: false, reason: `Invalid or missing criterion: ${key}` };
    }
  }
  if (!Array.isArray(data.strengths) || !Array.isArray(data.weaknesses)) {
    return { valid: false, reason: 'strengths and weaknesses must be arrays' };
  }
  if (!Array.isArray(data.errors) || !Array.isArray(data.vocabUpgrades)) {
    return { valid: false, reason: 'errors and vocabUpgrades must be arrays' };
  }
  return { valid: true };
}

/**
 * Clean and parse JSON from model output, stripping markdown code blocks.
 */
function parseCleanJson(rawText: string): any {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```\s*$/i, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/i, '').replace(/```\s*$/i, '');
  }
  return JSON.parse(cleaned);
}

/**
 * Evaluates an essay using Google Gemini free tier with auto-retry validation.
 */
async function callGeminiApi(
  essayText: string,
  prompt: WritingPromptContent,
  apiKey: string,
  retryAttempt = 0
): Promise<WritingEvaluationFeedback> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const userMessage = `Prompt Title: ${prompt.title}
Task Type: ${prompt.taskType}
Minimum Required Words: ${prompt.minWordCount}
Original Question Prompt:
${prompt.promptText}

Candidate's Submission:
"""
${essayText}
"""

Evaluate this submission strictly according to the band descriptors. Quote direct evidence from the candidate's essay in each criterion's comments. Output valid JSON only.`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [{ text: `${STRICT_EXAMINER_SYSTEM_PROMPT}\n\n${userMessage}` }],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: 'application/json',
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) throw new Error('Empty response from Gemini API');

  let parsed: any;
  try {
    parsed = parseCleanJson(textOutput);
  } catch (parseErr) {
    if (retryAttempt === 0) {
      console.warn('JSON parsing failed. Auto-retrying once...');
      return callGeminiApi(essayText, prompt, apiKey, 1);
    }
    throw parseErr;
  }

  const validation = validateWritingFeedbackJson(parsed);
  if (!validation.valid) {
    if (retryAttempt === 0) {
      console.warn(`Schema validation failed (${validation.reason}). Auto-retrying once...`);
      return callGeminiApi(essayText, prompt, apiKey, 1);
    }
    throw new Error(`JSON schema validation failed: ${validation.reason}`);
  }

  const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;
  const sentenceHighlights = generateSentenceHighlights(essayText, parsed.errors, parsed.vocabUpgrades);
  const bandUpgradeSuggestions = generateBandUpgrades(essayText, prompt.taskType);
  const task1OverviewHelper = extractTask1OverviewTrends(prompt) || undefined;

  return {
    ...parsed,
    evaluationMode: 'gemini',
    wordCountAnalysis: {
      wordCount,
      minRequired: prompt.minWordCount,
      penaltyApplied: wordCount < prompt.minWordCount,
      details: `Contains ${wordCount} words. Minimum required: ${prompt.minWordCount}.`,
    },
    sentenceHighlights,
    bandUpgradeSuggestions,
    task1OverviewHelper,
  };
}

/**
 * Evaluates an essay using Groq free tier with auto-retry validation.
 */
async function callGroqApi(
  essayText: string,
  prompt: WritingPromptContent,
  apiKey: string,
  retryAttempt = 0
): Promise<WritingEvaluationFeedback> {
  const url = 'https://api.groq.com/openai/v1/chat/completions';

  const userMessage = `Prompt Title: ${prompt.title}
Task Type: ${prompt.taskType}
Minimum Required Words: ${prompt.minWordCount}
Original Question Prompt:
${prompt.promptText}

Candidate's Submission:
"""
${essayText}
"""

Evaluate this submission strictly according to the band descriptors. Quote direct evidence from the candidate's essay in each criterion's comments. Output valid JSON only.`;

  const payload = {
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: STRICT_EXAMINER_SYSTEM_PROMPT },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.2,
    response_format: { type: 'json_object' },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq API Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const textOutput = data.choices?.[0]?.message?.content;
  if (!textOutput) throw new Error('Empty response from Groq API');

  let parsed: any;
  try {
    parsed = parseCleanJson(textOutput);
  } catch (parseErr) {
    if (retryAttempt === 0) {
      console.warn('JSON parsing failed. Auto-retrying once...');
      return callGroqApi(essayText, prompt, apiKey, 1);
    }
    throw parseErr;
  }

  const validation = validateWritingFeedbackJson(parsed);
  if (!validation.valid) {
    if (retryAttempt === 0) {
      console.warn(`Schema validation failed (${validation.reason}). Auto-retrying once...`);
      return callGroqApi(essayText, prompt, apiKey, 1);
    }
    throw new Error(`JSON schema validation failed: ${validation.reason}`);
  }

  const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;
  const sentenceHighlights = generateSentenceHighlights(essayText, parsed.errors, parsed.vocabUpgrades);
  const bandUpgradeSuggestions = generateBandUpgrades(essayText, prompt.taskType);
  const task1OverviewHelper = extractTask1OverviewTrends(prompt) || undefined;

  return {
    ...parsed,
    evaluationMode: 'groq',
    wordCountAnalysis: {
      wordCount,
      minRequired: prompt.minWordCount,
      penaltyApplied: wordCount < prompt.minWordCount,
      details: `Contains ${wordCount} words. Minimum required: ${prompt.minWordCount}.`,
    },
    sentenceHighlights,
    bandUpgradeSuggestions,
    task1OverviewHelper,
  };
}

/**
 * Master evaluation orchestrator:
 * Attempts AI evaluation (Gemini -> Groq) using client-stored free keys,
 * and gracefully falls back to the local rule-based engine on any error or missing key.
 */
export async function evaluateWritingSubmission(
  essayText: string,
  prompt: WritingPromptContent
): Promise<WritingEvaluationFeedback> {
  const settings = await getAppSettings();

  const geminiKey = settings.geminiApiKey?.trim();
  const groqKey = settings.groqApiKey?.trim();
  const preferred = settings.preferredAiProvider || 'none';

  // 1. If user prefers Gemini and has key
  if (preferred === 'gemini' && geminiKey) {
    try {
      return await callGeminiApi(essayText, prompt, geminiKey);
    } catch (err) {
      console.warn('Gemini evaluation failed, checking secondary option...', err);
    }
  }

  // 2. If user prefers Groq and has key
  if (preferred === 'groq' && groqKey) {
    try {
      return await callGroqApi(essayText, prompt, groqKey);
    } catch (err) {
      console.warn('Groq evaluation failed, checking secondary option...', err);
    }
  }

  // 3. Try any available key if preferred failed or unset
  if (geminiKey) {
    try {
      return await callGeminiApi(essayText, prompt, geminiKey);
    } catch (err) {
      console.warn('Gemini evaluation failed', err);
    }
  }

  if (groqKey) {
    try {
      return await callGroqApi(essayText, prompt, groqKey);
    } catch (err) {
      console.warn('Groq evaluation failed', err);
    }
  }

  // 4. Client-side or Serverless proxy attempt
  try {
    const proxyRes = await fetch('/api/evaluate-writing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ essayText, prompt }),
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (data && data.overallBand) {
        return data;
      }
    }
  } catch (e) {
    // Serverless endpoint not present or offline
  }

  // 5. Always-available rule-based fallback
  return evaluateWritingRuleBased(essayText, prompt);
}

export const evaluateWriting = evaluateWritingSubmission;
