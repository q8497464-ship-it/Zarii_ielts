import type {
  WritingSentenceHighlight,
  BandUpgradeItem,
  WritingErrorItem,
  WritingVocabUpgrade,
} from '../../types';

// Academic C1/C2 vocabulary tokens for lexical detection
const ACADEMIC_LEXIS = new Set([
  'exacerbate',
  'exacerbates',
  'exacerbated',
  'mitigate',
  'mitigates',
  'mitigated',
  'proliferation',
  'proliferate',
  'proliferating',
  'detrimental',
  'paramount',
  'imperative',
  'substantiate',
  'substantiated',
  'unprecedented',
  'ubiquitous',
  'disproportionate',
  'disproportionately',
  'paradigm',
  'consequently',
  'predominantly',
  'fundamental',
  'catalyst',
  'comprehensive',
  'facilitate',
  'facilitates',
  'facilitated',
  'sustainable',
  'sustainability',
  'advent',
  'feasible',
  'feasibility',
  'inevitable',
  'inevitably',
  'counterpart',
  'counterparts',
  'exponential',
  'exponentially',
  'salient',
  'manifest',
  'manifests',
  'manifested',
  'correlation',
  'repercussion',
  'repercussions',
  'divergence',
  'underscores',
  'underscore',
  'encompasses',
  'holistic',
  'pivotal',
  'pragmatic',
  'allocation',
]);

// Cohesive transition devices
const COHESIVE_MARKERS = [
  'furthermore',
  'moreover',
  'consequently',
  'in addition',
  'nevertheless',
  'nonetheless',
  'conversely',
  'on the contrary',
  'in contrast',
  'by contrast',
  'subsequently',
  'as a consequence',
  'as a result',
  'in spite of',
  'despite',
  'notwithstanding',
  'on the one hand',
  'on the other hand',
  'it is widely argued that',
  'with respect to',
  'in light of',
  'whereas',
  'whilst',
];

/**
 * Splits text into sentences while respecting abbreviations.
 */
export function splitIntoSentences(text: string): string[] {
  if (!text) return [];
  // Match sentence endings (. ! ?) followed by whitespace or quote
  const raw = text.split(/(?<=[.!?])\s+(?=[A-Z0-9"“])/);
  return raw.map((s) => s.trim()).filter((s) => s.length > 0);
}

/**
 * Analyzes candidate essay text and maps each sentence to a diagnostic highlight category:
 * - grammar: contains identified grammatical or syntactic errors
 * - vocabulary: demonstrates sophisticated academic lexis (Band 7+)
 * - cohesion: utilizes cohesive devices or logical transitions
 * - standard: functional basic sentence
 */
export function generateSentenceHighlights(
  essayText: string,
  errors: WritingErrorItem[] = [],
  vocabUpgrades: WritingVocabUpgrade[] = []
): WritingSentenceHighlight[] {
  const sentences = splitIntoSentences(essayText);
  const highlights: WritingSentenceHighlight[] = [];

  for (const sentence of sentences) {
    const sLower = sentence.toLowerCase();

    // 1. Check for grammar errors matching this sentence
    const matchingError = errors.find((e) =>
      sentence.toLowerCase().includes(e.originalText.toLowerCase().trim())
    );

    if (matchingError) {
      highlights.push({
        sentence,
        type: 'grammar',
        message: `Grammar issue detected: "${matchingError.originalText}" -> Suggested fix: "${matchingError.correction}".`,
        suggestion: matchingError.correction,
        highlightSnippet: matchingError.originalText,
      });
      continue;
    }

    // 2. Check for advanced vocabulary usage
    const words = sLower.replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter(Boolean);
    const advancedFound = words.filter((w) => ACADEMIC_LEXIS.has(w));

    if (advancedFound.length > 0) {
      highlights.push({
        sentence,
        type: 'vocabulary',
        message: `Advanced academic lexis detected: [${advancedFound.join(', ')}]. Enhances Lexical Resource to Band 7+.`,
        highlightSnippet: advancedFound[0],
      });
      continue;
    }

    // 3. Check for cohesive devices
    const foundMarker = COHESIVE_MARKERS.find((m) => sLower.includes(m));
    if (foundMarker) {
      highlights.push({
        sentence,
        type: 'cohesion',
        message: `Cohesive transition used: "${foundMarker}". Signals logical progression and inter-clause cohesion.`,
        highlightSnippet: foundMarker,
      });
      continue;
    }

    // 4. Standard functional sentence
    highlights.push({
      sentence,
      type: 'standard',
      message: 'Standard declarative sentence structure.',
    });
  }

  return highlights;
}

/**
 * Generates concrete Band 6 to Band 7+ sentence upgrades tailored to the student's text.
 */
export function generateBandUpgrades(
  essayText: string,
  taskType: string
): BandUpgradeItem[] {
  const sentences = splitIntoSentences(essayText);
  const upgrades: BandUpgradeItem[] = [];

  // Patterns to upgrade
  const patterns: Array<{
    match: RegExp;
    criterion: 'lexical' | 'grammar' | 'cohesion' | 'general';
    rewrite: (s: string) => string;
    explanation: string;
  }> = [
    {
      match: /\b(i think that|in my opinion i think)\b/i,
      criterion: 'cohesion',
      rewrite: (s) =>
        s.replace(
          /\b(i think that|in my opinion i think)\b/gi,
          'It is my considered view that'
        ),
      explanation:
        'Elevates conversational first-person phrasing into formal academic stance markers.',
    },
    {
      match: /\b(many people think that|some people say)\b/i,
      criterion: 'grammar',
      rewrite: (s) =>
        s.replace(
          /\b(many people think that|some people say)\b/gi,
          'It is widely contended that'
        ),
      explanation:
        'Uses an impersonal passive construction ("It is widely contended that...") to demonstrate Band 7+ grammatical range.',
    },
    {
      match: /\b(a lot of|lots of)\b/i,
      criterion: 'lexical',
      rewrite: (s) =>
        s.replace(/\b(a lot of|lots of)\b/gi, 'a substantial proportion of'),
      explanation:
        'Replaces vague colloquial quantifiers with precise academic vocabulary.',
    },
    {
      match: /\b(good and bad|advantages and disadvantages)\b/i,
      criterion: 'lexical',
      rewrite: (s) =>
        s.replace(
          /\b(good and bad|advantages and disadvantages)\b/gi,
          'salient benefits alongside potential drawbacks'
        ),
      explanation:
        'Replaces elementary binary terms with nuanced C1 academic collocations.',
    },
    {
      match: /\b(make things worse|makes it worse)\b/i,
      criterion: 'lexical',
      rewrite: (s) =>
        s.replace(/\b(make things worse|makes it worse)\b/gi, 'exacerbate the situation'),
      explanation:
        'Substitutes phrasal vocabulary with high-level academic lexis ("exacerbate").',
    },
    {
      match: /\b(firstly|first of all)\b/i,
      criterion: 'cohesion',
      rewrite: (s) =>
        s.replace(
          /\b(firstly|first of all)\b/gi,
          'To begin with, the foremost consideration is that'
        ),
      explanation:
        'Replaces mechanical enumeration with sophisticated topic sentence framing.',
    },
  ];

  for (const s of sentences) {
    if (upgrades.length >= 4) break;
    for (const pat of patterns) {
      if (pat.match.test(s)) {
        upgrades.push({
          original: s,
          upgraded: pat.rewrite(s),
          explanation: pat.explanation,
          criterion: pat.criterion,
          bandFrom: 6.0,
          bandTo: 7.5,
        });
        break;
      }
    }
  }

  // Fallback defaults if essay already avoided common Band 6 pitfalls
  if (upgrades.length < 3) {
    if (taskType === 'task2') {
      upgrades.push({
        original: 'Technology is helping people work from home and it saves a lot of travel time every day.',
        upgraded: 'The advent of digital telecommuting facilitates remote professional engagement, significantly mitigating daily commuting burdens.',
        explanation: 'Transforms coordinate clauses ("and it saves") into nominalized C1 clauses ("The advent of... mitigating...").',
        criterion: 'grammar',
        bandFrom: 6.0,
        bandTo: 8.0,
      });
      upgrades.push({
        original: 'If governments ban private cars in cities, air pollution will get much better soon.',
        upgraded: 'Should municipal authorities implement comprehensive restrictions on private vehicular transit, urban atmospheric quality would undoubtedly undergo rapid amelioration.',
        explanation: 'Applies inverted conditional structure ("Should municipal authorities...") and precise lexical substitutions.',
        criterion: 'grammar',
        bandFrom: 6.0,
        bandTo: 8.5,
      });
      upgrades.push({
        original: 'There are many reasons for this problem like lack of money and poor education.',
        upgraded: 'This prevailing dilemma is primarily attributable to fiscal constraints compounded by substandard educational infrastructure.',
        explanation: 'Replaces weak listing ("like lack of...") with academic attribution ("is primarily attributable to...").',
        criterion: 'lexical',
        bandFrom: 6.0,
        bandTo: 7.5,
      });
    } else {
      upgrades.push({
        original: 'The sales of cars went up a lot from 2010 to 2020.',
        upgraded: 'Automobile sales underwent a marked upward trajectory over the ten-year period between 2010 and 2020.',
        explanation: 'Replaces simple verb-adverb ("went up a lot") with academic collocation noun-phrase ("underwent a marked upward trajectory").',
        criterion: 'lexical',
        bandFrom: 6.0,
        bandTo: 7.5,
      });
      upgrades.push({
        original: 'China had the highest number while North America was the lowest in the chart.',
        upgraded: 'China consistently commanded the dominant market share, whereas North America occupied the lowest tier throughout the surveyed timeframe.',
        explanation: 'Employs complex subordinating conjunction ("whereas") and precise academic collocations ("commanded the dominant market share").',
        criterion: 'cohesion',
        bandFrom: 6.0,
        bandTo: 8.0,
      });
    }
  }

  return upgrades;
}
