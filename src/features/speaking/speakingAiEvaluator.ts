import type { SpeakingSessionFeedback } from '../../types';
import { evaluateSpeakingRuleBased, computeSpeakingMetrics } from './speakingAnalysis';
import { getAppSettings } from '../../lib/db';

const STRICT_SPEAKING_EXAMINER_PROMPT = `You are a certified Senior IELTS Speaking Examiner assessing an audio interview transcript. You must evaluate the candidate strictly according to official IELTS Speaking assessment criteria with conservative scoring.

### OFFICIAL ASSESSMENT CRITERIA & BAND PERFORMANCE STANDARDS:

1. FLUENCY AND COHERENCE (FC):
- Band 8: Speaks fluently with rare repetition or self-correction. Hesitations are content-driven, not language-searching. Develops topics coherently and comprehensively.
- Band 7: Speaks at length without noticeable effort. May demonstrate occasional language-related hesitation or self-correction. Uses a range of discourse markers with flexibility.
- Band 6: Willing to speak at length, though coherence may falter occasionally due to repetition, self-correction, or hesitation. Uses a range of connectives though not always naturally.
- Band 5: Maintains flow of speech but relies heavily on repetition, self-correction, or slow tempo. Over-uses simple connectives ("and", "but", "so"). Complex thoughts trigger fluency breakdowns.

2. LEXICAL RESOURCE (LR):
- Band 8: Wide, flexible vocabulary used to discuss topics with precision. Skilfully uses uncommon and idiomatic vocabulary with rare minor slips. Paraphrases effectively.
- Band 7: Vocabulary is flexible and varied. Uses less common and idiomatic words with awareness of style and collocation, though with occasional inappropriate choices. Paraphrases successfully.
- Band 6: Wide enough vocabulary to discuss topics at length and convey clear meaning despite inaccuracies. Generally paraphrases successfully when stuck.
- Band 5: Manages familiar topics with limited vocabulary flexibility. Rarely uses idiomatic collocations; attempts at paraphrase meet mixed success.

3. GRAMMATICAL RANGE AND ACCURACY (GRA):
- Band 8: Wide range of structures used flexibly. Produces a majority of error-free sentences with only very occasional basic or non-systematic slips.
- Band 7: Uses a variety of complex sentence structures with good control. Frequently produces error-free sentences, though grammatical mistakes persist in intricate clauses.
- Band 6: Mix of simple and complex structures, but with limited flexibility. Errors occur in complex sentences though they rarely impede communication.
- Band 5: Produces basic sentence forms accurately. Complex structures are limited and usually contain persistent errors that may cause comprehension difficulty.

### CRITICAL EXAMINER INSTRUCTIONS:
1. CONSERVATIVE SCORING: Do NOT inflate scores. If performance on a criterion straddles two bands, assign the lower band score.
2. MANDATORY EVIDENCE CITATION: In the "comments" for EACH criterion, you MUST quote direct verbatim phrases in quotation marks (e.g., "...") from the candidate's transcript as empirical justification.
3. OVERALL BAND: Must be the arithmetic average of FC, LR, and GRA rounded to the nearest 0.5 band.
4. EXTRAS:
   - Provide a natural context-aware IELTS examiner follow-up question based directly on what the candidate said.
   - Suggest 4 high-scoring C1/C2 topic collocations.
   - Provide a model Band 7.5 spoken answer side-by-side with key comparative takeaways.

### JSON OUTPUT SCHEMA:
You must respond ONLY with a valid, parseable JSON object matching this exact structure:
{
  "overallBand": 6.5,
  "criteria": {
    "fluencyAndCoherence": { "band": 6.5, "comments": "Evaluation with direct quoted evidence: \\"...\\"" },
    "lexicalResource": { "band": 6.0, "comments": "Evaluation with direct quoted evidence: \\"...\\"" },
    "grammaticalRangeAndAccuracy": { "band": 6.5, "comments": "Evaluation with direct quoted evidence: \\"...\\"" }
  },
  "strengths": ["...", "..."],
  "improvementTips": ["...", "..."],
  "upgradedPhrases": [
    {
      "original": "simple phrase from candidate",
      "upgraded": "Band 8+ natural idiomatic alternative",
      "explanation": "why this elevates spoken expression"
    }
  ],
  "followUpQuestion": {
    "question": "A natural examiner follow-up question based on candidate transcript",
    "rationale": "Examiner rationale for asking this question",
    "sampleAnswer": "A model 2-3 sentence Band 8 response"
  },
  "topicVocabulary": [
    {
      "wordOrPhrase": "academic collocation",
      "definition": "concise meaning",
      "collocationSnippet": "example usage snippet",
      "bandLevel": "Band 8.0+"
    }
  ],
  "modelBand7Answer": {
    "transcript": "A natural, fluent Band 7.5-8.0 spoken answer for this prompt",
    "keyDifferences": ["Difference 1", "Difference 2", "Difference 3"],
    "examinerBreakdown": "Breakdown of how this model demonstrates Band 7+ qualities"
  }
}`;

/**
 * Validates the raw JSON object returned by the AI model.
 * Enforces 0.5-step band scores in [0, 9] and verifies that quoted evidence
 * exists in candidate spoken transcript.
 */
function validateSpeakingFeedbackJson(data: any, transcript?: string): { valid: boolean; reason?: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, reason: 'Response is not a valid JSON object' };
  }
  const isValidBand = (b: any): boolean =>
    typeof b === 'number' && b >= 0 && b <= 9 && (b * 2) % 1 === 0;

  if (!isValidBand(data.overallBand)) {
    return { valid: false, reason: 'overallBand must be a valid 0.5-step score between 0 and 9' };
  }
  const c = data.criteria;
  if (!c || typeof c !== 'object') {
    return { valid: false, reason: 'Missing criteria object' };
  }

  const lowerTranscript = transcript ? transcript.toLowerCase().replace(/[\s\r\n]+/g, ' ') : '';

  for (const key of ['fluencyAndCoherence', 'lexicalResource', 'grammaticalRangeAndAccuracy']) {
    const crit = c[key];
    if (!crit || !isValidBand(crit.band) || typeof crit.comments !== 'string') {
      return { valid: false, reason: `Invalid or missing criterion: ${key}` };
    }

    if (lowerTranscript) {
      const quotes = (Array.from(crit.comments.matchAll(/["“]([^"”]{3,})["”]/g)) as RegExpMatchArray[]).map(m => m[1].toLowerCase().trim());
      if (quotes.length === 0) {
        return { valid: false, reason: `Criterion ${key} is missing direct quoted evidence in quotation marks` };
      }
      const hasVerifiedQuote = quotes.some(q => lowerTranscript.includes(q));
      if (!hasVerifiedQuote) {
        return { valid: false, reason: `Quoted evidence for ${key} does not exist in candidate transcript` };
      }
    }
  }
  if (!Array.isArray(data.strengths) || !Array.isArray(data.improvementTips)) {
    return { valid: false, reason: 'strengths and improvementTips must be arrays' };
  }
  return { valid: true };
}

function parseCleanJson(rawText: string): any {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```\s*$/i, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/i, '').replace(/```\s*$/i, '');
  }
  return JSON.parse(cleaned);
}

export async function evaluateSpeakingSubmission(
  transcript: string,
  durationSeconds: number,
  topicTitle: string,
  part: 1 | 2 | 3 | 'full'
): Promise<SpeakingSessionFeedback> {
  const minWords = part === 1 ? 20 : part === 2 ? 80 : 30;
  const wordCount = transcript ? transcript.trim().split(/\s+/).filter(Boolean).length : 0;

  const metrics = computeSpeakingMetrics(transcript || '', durationSeconds);
  const fallback = evaluateSpeakingRuleBased(transcript || '', durationSeconds, topicTitle, part);

  // Reject empty or severely insufficient input before calling AI
  if (wordCount < minWords) {
    return {
      evaluationMode: 'rule_based',
      overallBand: 0,
      criteria: {
        fluencyAndCoherence: { band: 0, comments: `Insufficient spoken sample (minimum ${minWords} words required for Part ${part}).` },
        lexicalResource: { band: 0, comments: 'Insufficient spoken sample.' },
        grammaticalRangeAndAccuracy: { band: 0, comments: 'Insufficient spoken sample.' },
      },
      metrics,
      strengths: [],
      improvementTips: [`Record a more detailed answer (at least ${minWords} words) to receive band assessment and feedback.`],
      upgradedPhrases: [],
      pronunciationGuide: fallback.pronunciationGuide,
      followUpQuestion: { question: '', rationale: '', sampleAnswer: '' },
      topicVocabulary: [],
      modelBand7Answer: { transcript: '', keyDifferences: [], examinerBreakdown: '' },
    };
  }

  const settings = await getAppSettings();
  const geminiKey = settings.geminiApiKey?.trim();
  const groqKey = settings.groqApiKey?.trim();
  const preferred = settings.preferredAiProvider || 'none';

  // 1. If user prefers Gemini
  if (preferred === 'gemini' && geminiKey) {
    try {
      const res = await callGeminiSpeaking(transcript, durationSeconds, topicTitle, part, geminiKey, metrics, fallback);
      if (res) return res;
    } catch (err) {
      console.warn('Gemini speaking evaluation error:', err);
    }
  }

  // 2. If user prefers Groq
  if (preferred === 'groq' && groqKey) {
    try {
      const res = await callGroqSpeaking(transcript, durationSeconds, topicTitle, part, groqKey, metrics, fallback);
      if (res) return res;
    } catch (err) {
      console.warn('Groq speaking evaluation error:', err);
    }
  }

  // 3. Fallback to any provided key
  if (geminiKey) {
    try {
      const res = await callGeminiSpeaking(transcript, durationSeconds, topicTitle, part, geminiKey, metrics, fallback);
      if (res) return res;
    } catch (err) {
      // ignore
    }
  }

  if (groqKey) {
    try {
      const res = await callGroqSpeaking(transcript, durationSeconds, topicTitle, part, groqKey, metrics, fallback);
      if (res) return res;
    } catch (err) {
      // ignore
    }
  }

  // 4. Default to rule-based fallback
  return fallback;
}

async function callGeminiSpeaking(
  transcript: string,
  durationSeconds: number,
  topicTitle: string,
  part: 1 | 2 | 3 | 'full',
  apiKey: string,
  metrics: any,
  fallback: SpeakingSessionFeedback,
  retryAttempt = 0
): Promise<SpeakingSessionFeedback | null> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const promptUser = `
Topic: "${topicTitle}" (Part ${part})
Spoken Duration: ${durationSeconds} seconds
Words Per Minute: ${metrics.wordsPerMinute} WPM
Total Words Spoken: ${metrics.totalWords}
Filler Words Detected: ${metrics.fillerWordsCount}

Candidate Spoken Transcript:
"${transcript}"

Evaluate strictly according to the official descriptors. Quote direct evidence in each criterion's comments. Output valid JSON only.
  `.trim();

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: `${STRICT_SPEAKING_EXAMINER_PROMPT}\n\n${promptUser}` }],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    }),
  });

  if (!response.ok) return null;
  const json = await response.json();
  const textContent = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textContent) return null;

  let parsed: any;
  try {
    parsed = parseCleanJson(textContent);
  } catch (err) {
    if (retryAttempt === 0) {
      return callGeminiSpeaking(transcript, durationSeconds, topicTitle, part, apiKey, metrics, fallback, 1);
    }
    return null;
  }

  const validation = validateSpeakingFeedbackJson(parsed, transcript);
  if (!validation.valid) {
    if (retryAttempt === 0) {
      return callGeminiSpeaking(transcript, durationSeconds, topicTitle, part, apiKey, metrics, fallback, 1);
    }
    return null;
  }

  return {
    evaluationMode: 'gemini',
    overallBand: parsed.overallBand || fallback.overallBand,
    criteria: parsed.criteria || fallback.criteria,
    metrics,
    strengths: parsed.strengths || fallback.strengths,
    improvementTips: parsed.improvementTips || fallback.improvementTips,
    upgradedPhrases: parsed.upgradedPhrases || fallback.upgradedPhrases,
    pronunciationGuide: fallback.pronunciationGuide,
    followUpQuestion: parsed.followUpQuestion || fallback.followUpQuestion,
    topicVocabulary: parsed.topicVocabulary || fallback.topicVocabulary,
    modelBand7Answer: parsed.modelBand7Answer || fallback.modelBand7Answer,
  };
}

async function callGroqSpeaking(
  transcript: string,
  durationSeconds: number,
  topicTitle: string,
  part: 1 | 2 | 3 | 'full',
  apiKey: string,
  metrics: any,
  fallback: SpeakingSessionFeedback,
  retryAttempt = 0
): Promise<SpeakingSessionFeedback | null> {
  const url = 'https://api.groq.com/openai/v1/chat/completions';

  const promptUser = `
Topic: "${topicTitle}" (Part ${part})
Spoken Duration: ${durationSeconds} seconds
Words Per Minute: ${metrics.wordsPerMinute} WPM
Total Words Spoken: ${metrics.totalWords}
Filler Words Detected: ${metrics.fillerWordsCount}

Candidate Spoken Transcript:
"${transcript}"

Evaluate strictly according to the official descriptors. Quote direct evidence in each criterion's comments. Output valid JSON only.
  `.trim();

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: STRICT_SPEAKING_EXAMINER_PROMPT },
        { role: 'user', content: promptUser },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    }),
  });

  if (!response.ok) return null;
  const json = await response.json();
  const textContent = json.choices?.[0]?.message?.content;
  if (!textContent) return null;

  let parsed: any;
  try {
    parsed = parseCleanJson(textContent);
  } catch (err) {
    if (retryAttempt === 0) {
      return callGroqSpeaking(transcript, durationSeconds, topicTitle, part, apiKey, metrics, fallback, 1);
    }
    return null;
  }

  const validation = validateSpeakingFeedbackJson(parsed, transcript);
  if (!validation.valid) {
    if (retryAttempt === 0) {
      return callGroqSpeaking(transcript, durationSeconds, topicTitle, part, apiKey, metrics, fallback, 1);
    }
    return null;
  }

  return {
    evaluationMode: 'groq',
    overallBand: parsed.overallBand || fallback.overallBand,
    criteria: parsed.criteria || fallback.criteria,
    metrics,
    strengths: parsed.strengths || fallback.strengths,
    improvementTips: parsed.improvementTips || fallback.improvementTips,
    upgradedPhrases: parsed.upgradedPhrases || fallback.upgradedPhrases,
    pronunciationGuide: fallback.pronunciationGuide,
    followUpQuestion: parsed.followUpQuestion || fallback.followUpQuestion,
    topicVocabulary: parsed.topicVocabulary || fallback.topicVocabulary,
    modelBand7Answer: parsed.modelBand7Answer || fallback.modelBand7Answer,
  };
}
