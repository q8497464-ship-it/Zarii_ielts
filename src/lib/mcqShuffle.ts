/**
 * Seeded Fisher-Yates MCQ Option Shuffler for Zarii IELTS
 *
 * Guarantees:
 * 1. Shuffles options deterministically for a given attemptId + questionId.
 * 2. Pure uniform distribution across positions.
 * 3. Keeps pinned options ("All of the above", "None of the above") at the end.
 * 4. Strips baked-in letter prefixes ("A) ", "A. ") so letters A-D are assigned dynamically.
 * 5. Marking is based on stable option identity / text, never display position.
 */

export interface ShuffledOption {
  id: string; // Stable option ID (e.g. "opt-0", or original text)
  originalIndex: number; // Index in content data before shuffling
  text: string; // Cleaned option text without "A) " prefix
  raw: string; // Raw content string
  isPinned: boolean;
}

/**
 * 32-bit FNV-1a hash function to convert any string seed into a 32-bit unsigned integer.
 */
export function hashStringToSeed(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Mulberry32 PRNG: high quality, fast, uniform 32-bit pseudo-random generator.
 */
export function createPrng(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Strips hard-coded letter prefixes like "A) ", "A. ", "(A) ", "A - ".
 */
export function cleanOptionText(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/^[A-Z][\.\)]\s+/i, '')
    .replace(/^\([A-Z]\)\s+/i, '')
    .replace(/^[A-Z]\s*-\s+/i, '')
    .trim();
}

/**
 * Checks whether an option is a pinned option that must remain in the last position.
 */
export function isPinnedOption(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  const clean = cleanOptionText(text).toLowerCase();
  return (
    clean.startsWith('all of the above') ||
    clean.startsWith('none of the above') ||
    clean.startsWith('all the above') ||
    clean.startsWith('none of these') ||
    clean.startsWith('neither of the above') ||
    clean.startsWith('all of these') ||
    clean.startsWith('both a and b') ||
    clean.startsWith('both b and c') ||
    clean.startsWith('both a and c')
  );
}

/**
 * Shuffles an array of options deterministically using Fisher-Yates with Mulberry32.
 * Pinned options remain at the end.
 */
export function shuffleMcqOptions(
  options: Array<string | { id?: string; text?: string; label?: string }>,
  seedInput: string
): ShuffledOption[] {
  if (!Array.isArray(options) || options.length <= 1) {
    return (options || []).map((opt, idx) => {
      const raw = typeof opt === 'object' ? (opt.text || opt.label || '') : opt;
      const text = cleanOptionText(raw);
      return {
        id: typeof opt === 'object' && opt.id ? opt.id : `opt-${idx}`,
        originalIndex: idx,
        text,
        raw: String(raw),
        isPinned: isPinnedOption(raw),
      };
    });
  }

  // 1. Tag each option with its original index, stable id, and pinned status
  const normalized: ShuffledOption[] = options.map((opt, idx) => {
    const raw = typeof opt === 'object' ? (opt.text || opt.label || '') : opt;
    const text = cleanOptionText(raw);
    return {
      id: typeof opt === 'object' && opt.id ? opt.id : `opt-${idx}`,
      originalIndex: idx,
      text,
      raw: String(raw),
      isPinned: isPinnedOption(raw),
    };
  });

  // 2. Separate unpinned options from pinned options
  const unpinned = normalized.filter((o) => !o.isPinned);
  const pinned = normalized.filter((o) => o.isPinned);

  // 3. Fisher-Yates shuffle on unpinned options
  const seed = hashStringToSeed(seedInput);
  const prng = createPrng(seed);

  for (let i = unpinned.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [unpinned[i], unpinned[j]] = [unpinned[j], unpinned[i]];
  }

  // 4. Return shuffled unpinned followed by pinned options
  return [...unpinned, ...pinned];
}

/**
 * Resolves the original index of the correct option for a question.
 */
export function getCorrectOriginalIndex(
  q: { options?: Array<string | { id?: string; text?: string }>; correctAnswer: string | string[] }
): number {
  if (!q.options || !Array.isArray(q.options) || q.options.length === 0) return -1;
  const ans = q.correctAnswer;

  // Single letter match: 'A' -> 0, 'B' -> 1, etc.
  if (typeof ans === 'string' && /^[A-Z]$/i.test(ans.trim())) {
    const letterIdx = ans.trim().toUpperCase().charCodeAt(0) - 65;
    // Check if options have explicit ID matching the letter
    const idIdx = q.options.findIndex(
      (o) => typeof o === 'object' && o.id?.toUpperCase() === ans.trim().toUpperCase()
    );
    if (idIdx !== -1) return idIdx;
    if (letterIdx >= 0 && letterIdx < q.options.length) return letterIdx;
  }

  // Text match against option text
  if (typeof ans === 'string') {
    const cleanAns = cleanOptionText(ans).toLowerCase();
    const textIdx = q.options.findIndex((o) => {
      const raw = typeof o === 'object' ? (o.text || '') : o;
      return cleanOptionText(raw).toLowerCase() === cleanAns;
    });
    if (textIdx !== -1) return textIdx;
  }

  return -1;
}

/**
 * Determines if a selected option is correct based on original option indices or text.
 */
export function isShuffledSelectionCorrect(
  selectedOption: ShuffledOption | undefined,
  q: { options?: Array<string | { id?: string; text?: string }>; correctAnswer: string | string[] }
): boolean {
  if (!selectedOption || !q.options) return false;
  const correctIdx = getCorrectOriginalIndex(q);
  if (correctIdx === -1) return false;

  return selectedOption.originalIndex === correctIdx;
}
