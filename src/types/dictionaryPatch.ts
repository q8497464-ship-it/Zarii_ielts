/**
 * Zarii Dictionary Patch & Runtime Override Schema
 * 
 * Allows candidate overrides, custom annotations, Urdu translations,
 * and admin corrections to be applied seamlessly on top of static sharded dictionary files.
 */

import type { DictionaryEntry } from '../features/dictionary/dictionaryService';

export type DictionaryPatchAction = 'add' | 'edit' | 'hide';

export interface DictionarySensePatch {
  senseIndex?: number;
  def?: string;
  shortDef?: string;
  urduMeaning?: string;
  examples?: string[];
  synonyms?: string[];
  antonyms?: string[];
}

export interface DictionaryPatch {
  id: string;
  headword: string;
  pos?: string;
  action: DictionaryPatchAction;
  urduMeaning?: string;
  urduNotes?: string;
  senses?: DictionarySensePatch[];
  pronunciationOverride?: {
    ipa?: string;
    respelling?: string;
  };
  levelOverride?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'academic' | 'rare';
  isOfficial?: boolean;
  author?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Applies a patch record on top of a static dictionary entry.
 * Returns null if the entry is marked as 'hide'.
 */
export function applyDictionaryPatch(
  entry: DictionaryEntry | null,
  patch: DictionaryPatch
): DictionaryEntry | null {
  if (patch.action === 'hide') {
    return null;
  }

  if (patch.action === 'add' && !entry) {
    return {
      id: `custom_${patch.headword}_${patch.pos || 'n'}`,
      word: patch.headword,
      headword: patch.headword,
      partOfSpeech: patch.pos || 'noun',
      definition: patch.senses?.[0]?.def || '',
      urduMeaning: patch.urduMeaning || patch.senses?.[0]?.urduMeaning || '',
      exampleSentence: patch.senses?.[0]?.examples?.[0] || '',
      collocations: [],
      synonyms: patch.senses?.[0]?.synonyms || [],
      level: patch.levelOverride || 'B1',
      topic: 'general',
      track: 'shared',
      phonetic: patch.pronunciationOverride?.ipa || `/${patch.headword}/`,
    } as any;
  }

  if (!entry) return null;

  const result = { ...entry };

  if (patch.urduMeaning) {
    result.urduMeaning = patch.urduMeaning;
  }

  if (patch.pronunciationOverride?.ipa) {
    result.phonetic = patch.pronunciationOverride.ipa;
  }

  if (patch.levelOverride) {
    result.level = patch.levelOverride;
  }

  return result;
}
