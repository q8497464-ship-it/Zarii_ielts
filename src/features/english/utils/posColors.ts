/**
 * Part of speech color accents and badges for English Course UI
 * Used consistently across grammar tables, vocabulary chips, and explanations
 */

export interface PosColorTokens {
  bg: string;
  text: string;
  border: string;
  badge: string;
  lightBg: string;
}

export function getPosColorClasses(pos?: string): PosColorTokens {
  const p = (pos || '').toLowerCase().trim();

  // Noun: Blue
  if (p.includes('noun')) {
    return {
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-800',
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200',
      lightBg: 'bg-blue-50/60 dark:bg-blue-950/20',
    };
  }

  // Verb: Emerald / Green
  if (p.includes('verb')) {
    return {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-200 dark:border-emerald-800',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
      lightBg: 'bg-emerald-50/60 dark:bg-emerald-950/20',
    };
  }

  // Adjective: Amber / Warm Gold
  if (p.includes('adj')) {
    return {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-200 dark:border-amber-800',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
      lightBg: 'bg-amber-50/60 dark:bg-amber-950/20',
    };
  }

  // Adverb: Purple / Violet
  if (p.includes('adv')) {
    return {
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      text: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-200 dark:border-purple-800',
      badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
      lightBg: 'bg-purple-50/60 dark:bg-purple-950/20',
    };
  }

  // Pronoun: Indigo
  if (p.includes('pron')) {
    return {
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      text: 'text-indigo-700 dark:text-indigo-300',
      border: 'border-indigo-200 dark:border-indigo-800',
      badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200',
      lightBg: 'bg-indigo-50/60 dark:bg-indigo-950/20',
    };
  }

  // Preposition: Teal
  if (p.includes('prep')) {
    return {
      bg: 'bg-teal-50 dark:bg-teal-950/40',
      text: 'text-teal-700 dark:text-teal-300',
      border: 'border-teal-200 dark:border-teal-800',
      badge: 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200',
      lightBg: 'bg-teal-50/60 dark:bg-teal-950/20',
    };
  }

  // Default: Gray / Neutral
  return {
    bg: 'bg-gray-50 dark:bg-gray-800/40',
    text: 'text-gray-700 dark:text-gray-300',
    border: 'border-gray-200 dark:border-gray-700',
    badge: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    lightBg: 'bg-gray-50/60 dark:bg-gray-800/20',
  };
}
