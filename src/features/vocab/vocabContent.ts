import academicWordsJson from '../../../content/vocab/academic-words.json';
import grammarLessonsJson from '../../../content/grammar/lessons.json';
import phraseBankJson from '../../../content/vocab/phrase-bank.json';
import type {
  VocabWordContent,
  GrammarLesson,
  WritingPhraseCategory,
} from '../../types';

export const ALL_ACADEMIC_WORDS: VocabWordContent[] = academicWordsJson as VocabWordContent[];
export const ALL_GRAMMAR_LESSONS: GrammarLesson[] = grammarLessonsJson as GrammarLesson[];
export const ALL_PHRASE_CATEGORIES: WritingPhraseCategory[] = phraseBankJson as WritingPhraseCategory[];

export interface TopicMeta {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: 'core' | 'special';
}

export const TOPIC_METAS: TopicMeta[] = [
  { id: 'environment', name: 'Environment & Ecology', description: 'Climate, conservation, pollution & renewable energy', iconName: 'Trees', category: 'core' },
  { id: 'technology', name: 'Technology & AI', description: 'Digital transformation, automation, privacy & tech innovation', iconName: 'Cpu', category: 'core' },
  { id: 'education', name: 'Education & Pedagogy', description: 'Curriculum design, cognitive learning & university access', iconName: 'GraduationCap', category: 'core' },
  { id: 'health', name: 'Health & Medicine', description: 'Epidemiology, preventative care, diet & modern wellness', iconName: 'HeartPulse', category: 'core' },
  { id: 'society', name: 'Society & Culture', description: 'Social cohesion, demographics, heritage & cultural diversity', iconName: 'Users', category: 'core' },
  { id: 'work', name: 'Work & Careers', description: 'Telecommuting, remuneration, workplace ethics & labor markets', iconName: 'Briefcase', category: 'core' },
  { id: 'crime', name: 'Crime & Justice', description: 'Deterrence, rehabilitation, surveillance & penal systems', iconName: 'ShieldAlert', category: 'core' },
  { id: 'media', name: 'Media & Advertising', description: 'Sensationalism, mass communication, digital ads & public discourse', iconName: 'Tv', category: 'core' },
  { id: 'economy', name: 'Economy & Finance', description: 'Fiscal policies, inflation, global trade & market dynamics', iconName: 'Coins', category: 'core' },
  { id: 'travel', name: 'Travel & Tourism', description: 'Ecotourism, hospitality, cultural preservation & exploration', iconName: 'Compass', category: 'core' },
  { id: 'science', name: 'Science & Research', description: 'Empirical methodologies, scientific breakthroughs & laboratories', iconName: 'Atom', category: 'core' },
  { id: 'government', name: 'Government & Politics', description: 'Legislation, state bureaucracy, sovereignty & civic policy', iconName: 'Building2', category: 'core' },
  { id: 'family', name: 'Family & Relationships', description: 'Kinship structures, generational dynamics & parenting', iconName: 'HeartHandshake', category: 'core' },
  { id: 'urbanisation', name: 'Urbanisation & Housing', description: 'Infrastructure, urban sprawl, gentrification & transit', iconName: 'Building', category: 'core' },
  { id: 'food', name: 'Food & Agriculture', description: 'Food security, sustainable farming, agrochemicals & nutrition', iconName: 'Wheat', category: 'core' },
  { id: 'arts', name: 'Arts & Heritage', description: 'Aesthetic heritage, architectural conservation & literature', iconName: 'Palette', category: 'core' },
  { id: 'sport', name: 'Sport & Leisure', description: 'Athletic endurance, recreational health & sportsmanship', iconName: 'Trophy', category: 'core' },
  { id: 'transport', name: 'Transport & Mobility', description: 'Public transit networks, intermodal logistics & commuters', iconName: 'Bus', category: 'core' },
  { id: 'communication', name: 'Language & Rhetoric', description: 'Linguistics, articulate discourse, nuances & syntax', iconName: 'MessageSquare', category: 'core' },
  { id: 'global_issues', name: 'Global Challenges', description: 'Disparity, international treaties & humanitarian aid', iconName: 'Globe', category: 'core' },
  { id: 'academic_essentials', name: 'Academic Essentials', description: 'High-frequency analytical verbs, hedging & discourse markers', iconName: 'BookMarked', category: 'special' },
  { id: 'band7_upgrades', name: 'Band 7+ Upgrades', description: 'Precision lexical upgrades replacing basic everyday vocabulary', iconName: 'Sparkles', category: 'special' },
];

export const VOCAB_TOPICS = TOPIC_METAS.map((t) => t.id);

export function getWordById(id: string): VocabWordContent | undefined {
  return ALL_ACADEMIC_WORDS.find((w) => w.id === id || w.word.toLowerCase() === id.toLowerCase());
}

export function getWordsByTopic(topic: string): VocabWordContent[] {
  if (!topic || topic === 'all') return ALL_ACADEMIC_WORDS;
  return ALL_ACADEMIC_WORDS.filter((w) => {
    if (w.topic.toLowerCase() === topic.toLowerCase()) return true;
    if (w.topicTags && w.topicTags.some((t) => t.toLowerCase() === topic.toLowerCase())) return true;
    return false;
  });
}

export function getGrammarLessonById(id: string): GrammarLesson | undefined {
  return ALL_GRAMMAR_LESSONS.find((l) => l.id === id);
}

export function searchAcademicWords(
  query: string,
  filterTopic = 'all',
  filterLevel = 'all',
  filterSkill = 'all'
): VocabWordContent[] {
  const q = query.trim().toLowerCase();

  return ALL_ACADEMIC_WORDS.filter((w) => {
    // Topic filter
    if (filterTopic !== 'all') {
      const matchTopic =
        w.topic.toLowerCase() === filterTopic.toLowerCase() ||
        (w.topicTags && w.topicTags.some((t) => t.toLowerCase() === filterTopic.toLowerCase()));
      if (!matchTopic) return false;
    }

    // Level filter
    if (filterLevel !== 'all') {
      const wLevel = w.level || (w.bandTarget >= 7.5 ? 'C1' : w.bandTarget >= 6.5 ? 'B2' : 'B1');
      if (wLevel.toLowerCase() !== filterLevel.toLowerCase()) return false;
    }

    // Skill filter
    if (filterSkill !== 'all' && w.skillTags) {
      if (!w.skillTags.some((s) => s.toLowerCase() === filterSkill.toLowerCase())) return false;
    }

    // Query filter
    if (!q) return true;

    return (
      w.word.toLowerCase().includes(q) ||
      w.meaning.toLowerCase().includes(q) ||
      (w.urduMeaning && w.urduMeaning.includes(q)) ||
      w.topic.toLowerCase().includes(q) ||
      w.synonyms.some((s) => s.toLowerCase().includes(q)) ||
      w.collocations.some((c) => c.toLowerCase().includes(q))
    );
  });
}

/**
 * Deterministic daily Word of the Day derived from the current date.
 */
export function getWordOfTheDay(): VocabWordContent {
  const today = new Date();
  const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = Math.abs(dateSeed) % ALL_ACADEMIC_WORDS.length;
  return ALL_ACADEMIC_WORDS[index];
}

/**
 * Free browser SpeechSynthesis helper with British/American accent preference and rate control.
 */
export function playWordPronunciation(
  text: string,
  accent: 'GB' | 'US' = 'GB',
  slow = false
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = accent === 'GB' ? 'en-GB' : 'en-US';
  utterance.rate = slow ? 0.75 : 0.95;

  // Attempt to select native high-quality voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(
    (v) =>
      v.lang.startsWith(accent === 'GB' ? 'en-GB' : 'en-US') &&
      (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Online'))
  ) || voices.find((v) => v.lang.startsWith(accent === 'GB' ? 'en-GB' : 'en-US'));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  window.speechSynthesis.speak(utterance);
}
