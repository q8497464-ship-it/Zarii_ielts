/**
 * Zarii Dictionary Client & Lookup Utilities
 * 
 * Provides client-side and testing utilities for:
 * 1. Shard determination via manifest bounds
 * 2. Morphological lemmatization via inflection index
 * 3. Prefix search autocomplete
 * 4. User overrides patch layer
 */

import type { DictionaryEntry } from './dictionaryService';
import type { DictionaryPatch } from '../../types/dictionaryPatch';

export interface ShardMeta {
  count: number;
  size: number;
  gzSize: number;
  firstWord: string;
  lastWord: string;
  hash: string;
}

export interface SearchIndexItem {
  w: string; // word
  id: string; // entry id
  p: 'n' | 'v' | 'a' | 'r'; // part of speech
  r: number; // frequency rank
  s: string; // shard key
}

/**
 * Computes the 2-letter base shard key for a given word.
 * E.g. "abandon" -> "ab", "a" -> "a_", "3D" -> "other"
 */
export function getBaseShardPrefix(word: string): string {
  if (!word) return 'other';
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (clean.length >= 2) return clean.slice(0, 2);
  if (clean.length === 1) return `${clean}_`;
  return 'other';
}

/**
 * Resolves the exact shard file name for a word using manifest shard definitions.
 * Handles single shards (e.g. "ab") and chunked shards (e.g. "co_1", "co_2").
 */
export function getShardKeyForWord(
  word: string,
  shards: Record<string, ShardMeta>
): string | null {
  if (!word || !shards) return null;
  const basePrefix = getBaseShardPrefix(word);
  const targetLower = word.toLowerCase().trim();

  // If there's an exact unchunked shard (e.g. "ab")
  if (shards[basePrefix]) {
    return basePrefix;
  }

  // Find all chunked shards matching prefix (e.g. "co_1", "co_2", ...)
  const matchingShards = Object.keys(shards)
    .filter(k => k.startsWith(`${basePrefix}_`))
    .sort((a, b) => {
      const numA = parseInt(a.split('_')[1] || '0', 10);
      const numB = parseInt(b.split('_')[1] || '0', 10);
      return numA - numB;
    });

  if (matchingShards.length === 0) {
    return null;
  }

  for (const sKey of matchingShards) {
    const meta = shards[sKey];
    if (!meta) continue;
    const first = meta.firstWord.toLowerCase();
    const last = meta.lastWord.toLowerCase();

    if (targetLower >= first && targetLower <= last) {
      return sKey;
    }
  }

  // Fallback to the closest chunk or first chunk
  return matchingShards[0];
}

/**
 * Resolves an inflected word form to its base lemma.
 * E.g. "running" -> "run", "better" -> "well", "children" -> "child"
 */
export function lemmatizeWord(
  word: string,
  inflectionIndex: Record<string, string>
): string {
  if (!word) return '';
  const lower = word.toLowerCase().trim();
  return inflectionIndex[lower] || lower;
}

/**
 * Filters and ranks prefix autocomplete items from an index shard.
 */
export function searchAutocomplete(
  query: string,
  indexItems: SearchIndexItem[],
  limit = 20
): SearchIndexItem[] {
  if (!query || !indexItems) return [];
  const clean = query.toLowerCase().trim();
  
  const matches: SearchIndexItem[] = [];
  for (const item of indexItems) {
    if (item.w.toLowerCase().startsWith(clean)) {
      matches.push(item);
    }
    if (matches.length >= limit) break;
  }

  return matches;
}

export { applyDictionaryPatch } from '../../types/dictionaryPatch';
