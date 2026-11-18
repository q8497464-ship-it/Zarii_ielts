import type { SpeakingSessionFeedback } from '../../types';

export const COMMON_FILLER_WORDS = [
  'um',
  'uh',
  'er',
  'like',
  'you know',
  'actually',
  'basically',
  'sort of',
  'kind of',
  'i mean',
  'you see',
];

const STOP_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it',
  'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this',
  'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
  'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
  'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could',
  'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come',
  'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how',
  'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because',
  'any', 'these', 'give', 'day', 'most', 'us', 'is', 'was', 'are', 'were',
]);

export interface SpeakingMetrics {
  wordsPerMinute: number;
  totalWords: number;
  durationSeconds: number;
  fillerWordsCount: number;
  fillerWordsList: Array<{ word: string; count: number }>;
  uniqueWordRatio: number;
  repeatedWords: Array<{ word: string; count: number }>;
}

export function computeSpeakingMetrics(
  transcript: string,
  durationSeconds: number
): SpeakingMetrics {
  const text = transcript.trim();
  const rawWords = text.length > 0 ? text.split(/\s+/).filter(Boolean) : [];
  const totalWords = rawWords.length;

  const validDurationMinutes = Math.max(0.1, durationSeconds / 60);
  const wordsPerMinute = totalWords > 0 ? Math.round(totalWords / validDurationMinutes) : 0;

  // Filler words counting
  const lowerText = text.toLowerCase();
  const fillerCounts: Record<string, number> = {};
  let totalFillers = 0;

  for (const filler of COMMON_FILLER_WORDS) {
    // Regex matching word boundary
    const regex = new RegExp(`\\b${filler}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches && matches.length > 0) {
      fillerCounts[filler] = matches.length;
      totalFillers += matches.length;
    }
  }

  const fillerWordsList = Object.entries(fillerCounts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);

  // Vocabulary density & repeated words
  const wordFrequency: Record<string, number> = {};
  for (const w of rawWords) {
    const clean = w.toLowerCase().replace(/[^a-z]/g, '');
    if (clean.length > 3 && !STOP_WORDS.has(clean)) {
      wordFrequency[clean] = (wordFrequency[clean] || 0) + 1;
    }
  }

  const uniqueWords = Object.keys(wordFrequency).length;
  const uniqueWordRatio = totalWords > 0 ? Math.round((uniqueWords / totalWords) * 100) / 100 : 0;

  const repeatedWords = Object.entries(wordFrequency)
    .filter(([_, count]) => count >= 3)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    wordsPerMinute,
    totalWords,
    durationSeconds,
    fillerWordsCount: totalFillers,
    fillerWordsList,
    uniqueWordRatio,
    repeatedWords,
  };
}

export function evaluateSpeakingRuleBased(
  transcript: string,
  durationSeconds: number,
  topicTitle: string,
  part: 1 | 2 | 3 | 'full'
): SpeakingSessionFeedback {
  const metrics = computeSpeakingMetrics(transcript, durationSeconds);
  const { wordsPerMinute, totalWords, fillerWordsCount, uniqueWordRatio } = metrics;

  // 1. Fluency & Coherence Score
  let fcBand = 6.0;

  // WPM adjustments (IELTS benchmark 110 - 150 WPM)
  if (wordsPerMinute >= 110 && wordsPerMinute <= 155) {
    fcBand += 0.5;
  } else if (wordsPerMinute < 85 && totalWords > 20) {
    fcBand -= 0.5;
  } else if (wordsPerMinute > 175) {
    fcBand -= 0.5; // rushed speech can impair clarity
  }

  // Answer length / duration adequacy
  if (part === 2 && durationSeconds >= 100 && totalWords >= 150) {
    fcBand += 0.5;
  } else if (part === 2 && (durationSeconds < 60 || totalWords < 90)) {
    fcBand -= 1.0; // severe Part 2 under-speaking
  }

  // Filler word impact
  const fillerRatio = totalWords > 0 ? fillerWordsCount / totalWords : 0;
  if (fillerRatio > 0.08) {
    fcBand -= 0.5;
  } else if (fillerRatio <= 0.02 && totalWords >= 60) {
    fcBand += 0.5;
  }

  // Discourse markers check
  const discourseMarkers = ['however', 'furthermore', 'for example', 'on the other hand', 'in addition', 'personally speaking', 'consequently', 'as a result'];
  const lower = transcript.toLowerCase();
  const markerCount = discourseMarkers.filter((m) => lower.includes(m)).length;
  if (markerCount >= 3) fcBand += 0.5;

  fcBand = Math.min(9.0, Math.max(4.0, Math.round(fcBand * 2) / 2));

  // 2. Lexical Resource Score
  let lrBand = 6.0;
  if (uniqueWordRatio >= 0.45) lrBand += 0.5;
  if (uniqueWordRatio >= 0.58) lrBand += 0.5;
  if (metrics.repeatedWords.length >= 3) lrBand -= 0.5;

  // C1/C2 vocabulary heuristic check
  const advancedSpokenVocab = ['fascinating', 'indispensable', 'profound', 'crucial', 'significant', 'phenomenon', 'perspective', 'resilience', 'sustainable', 'demanding', 'remarkable'];
  const advancedCount = advancedSpokenVocab.filter((v) => lower.includes(v)).length;
  if (advancedCount >= 2) lrBand += 0.5;

  lrBand = Math.min(9.0, Math.max(4.0, Math.round(lrBand * 2) / 2));

  // 3. Grammatical Range and Accuracy Score
  let graBand = 5.5;
  // Complex structures check: although, because, while, which, who, if, since
  const complexMarkers = ['although', 'because', 'while', 'which', 'who', 'if', 'since', 'whereas', 'even though'];
  const complexCount = complexMarkers.filter((m) => lower.includes(m)).length;
  if (complexCount >= 2) graBand += 0.5;
  if (complexCount >= 4) graBand += 0.5;
  if (totalWords >= 80) graBand += 0.5;

  graBand = Math.min(9.0, Math.max(4.0, Math.round(graBand * 2) / 2));

  // Overall Speaking Band (Average of the 3 criteria rounded to 0.5)
  const average = (fcBand + lrBand + graBand) / 3;
  const overallBand = Math.round(average * 2) / 2;

  // Generate Strengths and Improvement Tips
  const strengths: string[] = [];
  const improvementTips: string[] = [];

  if (wordsPerMinute >= 110 && wordsPerMinute <= 155) {
    strengths.push(`Natural, steady conversational tempo of ${wordsPerMinute} words per minute.`);
  } else if (wordsPerMinute < 95) {
    improvementTips.push(`Speaking pace is somewhat slow (${wordsPerMinute} WPM). Practice chunking words into thought groups to reduce hesitation pauses.`);
  } else {
    improvementTips.push(`Speaking pace is quite rapid (${wordsPerMinute} WPM). Ensure you enunciate consonant endings clearly and pause at commas.`);
  }

  if (fillerRatio <= 0.03) {
    strengths.push(`Controlled delivery with minimal reliance on verbal fillers (${fillerWordsCount} detected).`);
  } else {
    improvementTips.push(`Noticed frequent hesitations (${fillerWordsCount} filler words like "${metrics.fillerWordsList[0]?.word || 'um'}"). Replace fillers with a brief silent breath.`);
  }

  if (markerCount >= 2) {
    strengths.push(`Good use of connective discourse markers to signpost thoughts.`);
  } else {
    improvementTips.push(`Integrate more conversational discourse markers (e.g., "From my perspective...", "On top of that...", "To be fair...").`);
  }

  // Upgraded phrases
  const upgradedPhrases = [
    {
      original: 'I think it is very good',
      upgraded: 'In my view, it is exceptionally beneficial and rewarding',
      explanation: 'Replaces generic "good" with precise evaluative academic adjectives.',
    },
    {
      original: 'I like it a lot',
      upgraded: 'I have developed a genuine passion and appreciation for it',
      explanation: 'Upgrades informal conversational expression into Band 8+ idiomatic phrasing.',
    },
    {
      original: 'It has a lot of problems',
      upgraded: 'It poses significant logistical and environmental hurdles',
      explanation: 'Enhances specificity and lexical sophistication.',
    },
  ];

  // Quoted candidate excerpt for empirical evidence citation
  const wordsList = transcript.trim().split(/\s+/).filter(Boolean);
  const samplePhrase = wordsList.length > 5 ? `"${wordsList.slice(0, 7).join(' ')}..."` : `"${transcript.trim()}"`;
  const midPhrase = wordsList.length > 14 ? `"${wordsList.slice(Math.floor(wordsList.length / 2), Math.floor(wordsList.length / 2) + 6).join(' ')}..."` : samplePhrase;

  // Follow-up Question generation
  const followUpQuestion = {
    question: `You mentioned that ${samplePhrase.replace(/^"|"$/g, '')}. Looking ahead, how do you think that might change or develop over the next five to ten years?`,
    rationale: 'IELTS examiners regularly ask speculative future follow-up questions in Part 3 to test your ability to use conditional structures and express hypotheses.',
    sampleAnswer: 'That is a compelling question. If current social patterns persist, I anticipate we will witness a marked transition toward more digital and flexible approaches, which could fundamentally transform how people interact.',
  };

  // Curated Topic Vocabulary
  const topicVocabulary = [
    {
      wordOrPhrase: 'profoundly transformative',
      definition: 'having a deep, widespread and permanent effect',
      collocationSnippet: 'has proven profoundly transformative for my personal outlook',
      bandLevel: 'Band 8.0+',
    },
    {
      wordOrPhrase: 'striking disparity',
      definition: 'a noticeable or significant difference',
      collocationSnippet: 'there is a striking disparity between urban and rural opportunities',
      bandLevel: 'Band 7.5+',
    },
    {
      wordOrPhrase: 'integral component',
      definition: 'an essential, indispensable part of something',
      collocationSnippet: 'has become an integral component of modern daily life',
      bandLevel: 'Band 7.5+',
    },
    {
      wordOrPhrase: 'from a personal standpoint',
      definition: 'speaking from one’s own viewpoint or experience',
      collocationSnippet: 'from a personal standpoint, I find it immensely rewarding',
      bandLevel: 'Band 7.0+',
    },
  ];

  // Model Band 7.5 Answer
  const modelBand7Answer = {
    transcript: `Well, speaking from personal experience regarding ${topicTitle}, I would argue that it plays an integral role in everyday life. To be completely honest, while there are certainly logistical challenges associated with it, the overarching benefits—particularly in terms of personal development and broadening one's horizons—are substantial. Over the coming years, I suspect we will observe even greater advancements in this area, which will inevitably open up fascinating opportunities.`,
    keyDifferences: [
      'Discourse Signposting: Uses conversational discourse markers ("Well, speaking from personal experience...", "To be completely honest...") instead of abrupt starts.',
      'Idiomatic Lexis: Employs C1/C2 collocations ("integral role", "broadening one\'s horizons", "inevitably open up").',
      'Complex Grammar: Features compound-complex clauses with embedded relative clauses and speculative conditional forms.',
    ],
    examinerBreakdown:
      'The model demonstrates natural rhythmic tempo (approx 140 WPM), zero awkward hesitation pauses, and sophisticated lexical substitution without sounding scripted.',
  };

  return {
    evaluationMode: 'rule_based',
    overallBand,
    criteria: {
      fluencyAndCoherence: {
        band: fcBand,
        comments: `Spoke at ${wordsPerMinute} WPM with ${fillerWordsCount} verbal hesitations. Key spoken segment observed in ${samplePhrase}. ${
          fcBand >= 7.0
            ? 'Demonstrated smooth, sustained discourse with cohesive sequencing.'
            : 'Able to sustain conversation, though occasionally hindered by mid-sentence pauses and searching for expressions.'
        }`,
      },
      lexicalResource: {
        band: lrBand,
        comments: `Achieved a ${Math.round(uniqueWordRatio * 100)}% unique vocabulary ratio. Expressions evaluated in utterances such as ${midPhrase}. ${
          lrBand >= 7.0
            ? 'Effectively employed topic-specific collocations and uncommon lexical expressions.'
            : 'Vocabulary is adequate for everyday topics; expand synonyms to avoid repeating basic descriptors.'
        }`,
      },
      grammaticalRangeAndAccuracy: {
        band: graBand,
        comments: `Produced ${totalWords} words with ${complexCount} subordinate markers. Syntactic control evidenced in clauses like ${midPhrase}. ${
          graBand >= 7.0
            ? 'Frequently utilizes a mix of complex conditional and subordinate structures with strong accuracy.'
            : 'Relies predominantly on simple compound clauses. Incorporate more relative clauses and contrasting conjunctions.'
        }`,
      },
    },
    metrics,
    strengths,
    improvementTips,
    upgradedPhrases,
    pronunciationGuide: {
      disclaimer:
        'Official IELTS pronunciation cannot be scientifically scored for free by client-side browser speech engines. In official exams, examiners assess your individual sound clarity, stress patterns, and connected speech.',
      practicalTips: [
        'Master Thought Groups: Group related words together and pause naturally at logical phrase boundaries rather than between every word.',
        'Word & Sentence Stress: Emphasize content words (nouns, main verbs, adjectives) and pronounce grammatical function words with weak vowels (/ə/).',
        'Connected Speech & Linking: Practice linking final consonant sounds to initial vowel sounds (e.g. "pick_it_up", "not_at_all").',
        'Shadowing Technique: Listen to native speaker audio recordings and repeat immediately in synchrony to absorb natural intonation curves.',
      ],
      selfAssessmentChecklist: [
        {
          criterion: 'Individual Sound Enunciation',
          description: 'Are tricky phonemes (such as /θ/ vs /s/, /r/ vs /l/, /v/ vs /w/) pronounced distinctly without causing misunderstandings?',
        },
        {
          criterion: 'Syllable Stress Placement',
          description: 'Is the stress placed on the correct syllable in multi-syllable words (e.g., pho-TO-gra-phy vs PHO-to-graph)?',
        },
        {
          criterion: 'Intonation Movement',
          description: 'Do your pitch contours rise naturally on questions/lists and fall decisively at the end of declarative statements?',
        },
        {
          criterion: 'Smooth Rhythm & Chunking',
          description: 'Does your speech maintain an even, rhythmic flow rather than a staccato syllable-by-syllable delivery?',
        },
      ],
    },
    followUpQuestion,
    topicVocabulary,
    modelBand7Answer,
  };
}
