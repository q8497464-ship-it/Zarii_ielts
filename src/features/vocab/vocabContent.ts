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

export const VOCAB_TOPICS = [
  'environment',
  'technology',
  'education',
  'health',
  'society',
  'work',
  'crime',
  'media',
  'globalization',
  'science',
];

export function getWordById(id: string): VocabWordContent | undefined {
  return ALL_ACADEMIC_WORDS.find((w) => w.id === id);
}

export function getWordsByTopic(topic: string): VocabWordContent[] {
  if (topic === 'all') return ALL_ACADEMIC_WORDS;
  return ALL_ACADEMIC_WORDS.filter((w) => w.topic.toLowerCase() === topic.toLowerCase());
}

export function getGrammarLessonById(id: string): GrammarLesson | undefined {
  return ALL_GRAMMAR_LESSONS.find((l) => l.id === id);
}

export function searchAcademicWords(query: string): VocabWordContent[] {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_ACADEMIC_WORDS;
  return ALL_ACADEMIC_WORDS.filter(
    (w) =>
      w.word.toLowerCase().includes(q) ||
      w.meaning.toLowerCase().includes(q) ||
      (w.urduMeaning && w.urduMeaning.includes(q)) ||
      w.topic.toLowerCase().includes(q) ||
      w.synonyms.some((s) => s.toLowerCase().includes(q))
  );
}
