/**
 * Zarii High-Performance Offline English Dictionary Service
 * 
 * Fully sharded lexical engine with:
 * - 144,400+ headwords from Open English WordNet 2024
 * - ARPAbet & IPA phonetics from CMU Pronouncing Dictionary
 * - Real-world usage frequency rankings (A1 - C1)
 * - 144,000+ morphological inflection mappings
 * - Levenshtein spell suggestions & prefix autocomplete
 * - Stale-while-revalidate CacheStorage & offline downloads
 * - Runtime admin patch layer & Dexie persistence
 */

import academicWordsData from '../../../content/vocab/academic-words.json';
import { db } from '../../lib/db';
import type { LearningTrack, DictionaryFavorite, DictionaryHistory } from '../../types';
import { createInitialVocabProgress } from '../../shared/vocab-engine';
import {
  getBaseShardPrefix,
  getShardKeyForWord,
  type ShardMeta,
  type SearchIndexItem,
} from './dictionaryClient';
import { applyDictionaryPatch, type DictionaryPatch } from '../../types/dictionaryPatch';
import { dictionaryAdminStore } from './dictionaryAdminStore';

export interface DictionarySense {
  def: string;
  shortDef?: string;
  examples?: string[];
  synonyms?: string[];
  antonyms?: string[];
  domain?: string;
  urduMeaning?: string;
}

export interface DictionaryEntry {
  id: string;
  word: string;
  headword: string;
  pos: string[];
  partOfSpeech: string;
  definition: string;
  senses: DictionarySense[];
  pronunciation: {
    ipa: string;
    respelling: string;
    arpabet?: string;
  };
  forms?: Record<string, string>;
  frequencyRank: number;
  levelEstimate: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'rare';
  flags?: {
    offensive?: boolean;
    archaic?: boolean;
    rare?: boolean;
    propername?: boolean;
  };
  // Compatibility and enrichment fields
  phonetic?: string;
  urduMeaning?: string;
  urduNotes?: string;
  exampleSentence?: string;
  collocations?: string[];
  synonyms?: string[];
  antonyms?: string[];
  level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'academic' | 'rare';
  topic?: string;
  track?: LearningTrack | 'shared';
}

export interface SearchResultItem {
  id: string;
  word: string;
  partOfSpeech: string;
  frequencyRank: number;
  shardKey: string;
  definitionSnippet?: string;
  isInflectedForm?: boolean;
  originalForm?: string;
  lemma?: string;
}

export interface SearchOptions {
  limit?: number;
  partOfSpeech?: 'all' | 'noun' | 'verb' | 'adjective' | 'adverb';
  level?: 'all' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  commonOnly?: boolean;
  safeMode?: boolean; // if true, hide offensive
}

export interface OfflineStorageStatus {
  isDownloaded: boolean;
  type: 'none' | 'essential' | 'full';
  sizeBytes: number;
  cachedEntriesCount: number;
  updatedAt?: string;
}

const CACHE_NAME = 'zarii-dictionary-v1';
const STORAGE_STATUS_KEY = 'zarii_dictionary_offline_status_v1';

// In-memory runtime caches
let manifestCache: { shards: Record<string, ShardMeta>; totalEntries: number } | null = null;
let inflectionsCache: Record<string, string> | null = null;
const indexCache = new Map<string, SearchIndexItem[]>();
const shardCache = new Map<string, DictionaryEntry[]>();
const entryCache = new Map<string, DictionaryEntry>();
let essentialPackCache: DictionaryEntry[] | null = null;

// Urdu lookup map from academic vocab
const urduMapping = new Map<string, string>();
if (Array.isArray(academicWordsData)) {
  for (const item of academicWordsData) {
    const w = (item.word || '').trim().toLowerCase();
    const u = item.urduMeaning || (item as any).urdu || '';
    if (w && u && !urduMapping.has(w)) {
      urduMapping.set(w, u);
    }
  }
}

/**
 * Levenshtein distance for spelling suggestions
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const row = new Array(a.length + 1);
  for (let i = 0; i <= a.length; i++) row[i] = i;

  for (let j = 1; j <= b.length; j++) {
    let prev = row[0];
    row[0] = j;
    for (let i = 1; i <= a.length; i++) {
      const temp = row[i];
      if (a[i - 1] === b[j - 1]) {
        row[i] = prev;
      } else {
        row[i] = Math.min(prev, row[i], row[i - 1]) + 1;
      }
      prev = temp;
    }
  }

  return row[a.length];
}

/**
 * Fetches JSON asset with CacheStorage stale-while-revalidate fallback
 */
async function fetchCachedJson<T>(url: string): Promise<T | null> {
  try {
    // 1. Try Cache API first if in browser
    if (typeof window !== 'undefined' && 'caches' in window) {
      try {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(url);
        if (cachedResponse) {
          // Asynchronously revalidate in background
          fetch(url)
            .then(res => {
              if (res.ok) cache.put(url, res.clone());
            })
            .catch(() => {});
          return (await cachedResponse.json()) as T;
        }
      } catch (e) {
        // Fall through to regular fetch
      }
    }

    // 2. Network fetch
    const response = await fetch(url);
    if (!response.ok) return null;

    const data = await response.json();

    // Store in cache for future offline use
    if (typeof window !== 'undefined' && 'caches' in window) {
      try {
        const cache = await caches.open(CACHE_NAME);
        cache.put(url, new Response(JSON.stringify(data)));
      } catch (e) {}
    }

    return data as T;
  } catch (err) {
    console.warn(`[DictionaryService] Failed to load ${url}:`, err);
    return null;
  }
}

export class OfflineDictionaryStore {
  /**
   * Loads the global dictionary manifest
   */
  public async getManifest(): Promise<{ shards: Record<string, ShardMeta>; totalEntries: number } | null> {
    if (manifestCache) return manifestCache;
    const data = await fetchCachedJson<{ shards: Record<string, ShardMeta>; totalEntries: number }>(
      '/dictionary/manifest.json'
    );
    if (data) manifestCache = data;
    return manifestCache;
  }

  /**
   * Loads the inflections reverse index (running -> run, children -> child)
   */
  public async getInflections(): Promise<Record<string, string>> {
    if (inflectionsCache) return inflectionsCache;
    const data = await fetchCachedJson<Record<string, string>>('/dictionary/inflections.json');
    inflectionsCache = data || {};
    return inflectionsCache;
  }

  /**
   * Loads a prefix autocomplete index shard (e.g. index/c.json)
   */
  public async getIndexShard(firstLetter: string): Promise<SearchIndexItem[]> {
    const letter = firstLetter.toLowerCase().charAt(0);
    if (!letter) return [];
    if (indexCache.has(letter)) return indexCache.get(letter)!;

    const data = await fetchCachedJson<SearchIndexItem[]>(`/dictionary/index/${letter}.json`);
    const list = data || [];
    indexCache.set(letter, list);
    return list;
  }

  /**
   * Loads a full word entries shard (e.g. shards/co_2.json)
   */
  public async getShard(shardKey: string): Promise<DictionaryEntry[]> {
    if (shardCache.has(shardKey)) return shardCache.get(shardKey)!;

    const rawList = await fetchCachedJson<any[]>(`/dictionary/shards/${shardKey}.json`);
    if (!rawList) return [];

    const list: DictionaryEntry[] = rawList.map(item => this.normalizeEntry(item));
    shardCache.set(shardKey, list);

    for (const e of list) {
      entryCache.set(e.word.toLowerCase(), e);
    }

    return list;
  }

  /**
   * Normalizes raw shard data into full DictionaryEntry
   */
  private normalizeEntry(raw: any): DictionaryEntry {
    const headword = raw.headword || raw.word || '';
    const lower = headword.toLowerCase();
    const primaryPos = raw.pos?.[0] || 'noun';
    const primarySense = raw.senses?.[0];
    const def = primarySense?.shortDef || primarySense?.def || raw.definition || '';
    const ipa = raw.pronunciation?.ipa || raw.phonetic || `/${headword}/`;
    const respelling = raw.pronunciation?.respelling || headword;

    // Urdu hint from academic vocab mapping if not in entry
    const urdu = raw.urduMeaning || urduMapping.get(lower) || '';

    return {
      id: raw.id || `${lower}_${primaryPos[0]}`,
      word: headword,
      headword,
      pos: raw.pos || [primaryPos],
      partOfSpeech: primaryPos,
      definition: def,
      senses: (raw.senses || []).map((s: any) => ({
        ...s,
        urduMeaning: s.urduMeaning || urdu,
      })),
      pronunciation: {
        ipa,
        respelling,
        arpabet: raw.pronunciation?.arpabet,
      },
      forms: raw.forms || {},
      frequencyRank: raw.frequencyRank || 999999,
      levelEstimate: raw.levelEstimate || (raw.level as any) || 'rare',
      flags: raw.flags || { offensive: false, archaic: false, rare: false, propername: false },
      phonetic: ipa,
      urduMeaning: urdu,
      exampleSentence: primarySense?.examples?.[0] || raw.exampleSentence || '',
      collocations: raw.collocations || [],
      synonyms: primarySense?.synonyms || raw.synonyms || [],
      antonyms: primarySense?.antonyms || raw.antonyms || [],
      level: raw.levelEstimate || (raw.level as any) || 'rare',
      topic: primarySense?.domain || 'general',
      track: 'shared',
    };
  }

  /**
   * Looks up a full dictionary entry by headword or inflected form
   */
  public async getEntry(targetWord: string): Promise<{
    entry: DictionaryEntry | null;
    isInflected: boolean;
    originalQuery: string;
    matchedForm?: string;
  }> {
    const query = (targetWord || '').trim().toLowerCase();
    if (!query) return { entry: null, isInflected: false, originalQuery: '' };

    // 1. Check in-memory entry cache
    if (entryCache.has(query)) {
      return {
        entry: entryCache.get(query)!,
        isInflected: false,
        originalQuery: query,
      };
    }

    // 2. Check inflections mapping
    const inflections = await this.getInflections();
    let lookupWord = query;
    let isInflected = false;

    if (inflections[query]) {
      lookupWord = inflections[query];
      isInflected = true;
    }

    // 2.5 Check runtime admin patch for hidden words or overrides
    const patch = dictionaryAdminStore.getPatchForWord(lookupWord, { forStudent: true });
    if (patch?.action === 'hide') {
      return { entry: null, isInflected: false, originalQuery: query };
    }

    // Check entry cache for base lemma
    if (entryCache.has(lookupWord)) {
      const cached = entryCache.get(lookupWord)!;
      const patched = patch ? applyDictionaryPatch(cached, patch) : cached;
      return {
        entry: patched,
        isInflected,
        originalQuery: query,
        matchedForm: isInflected ? query : undefined,
      };
    }

    // 3. Resolve shard key from manifest
    const manifest = await this.getManifest();
    let shardKey: string | null = null;
    if (manifest?.shards) {
      shardKey = getShardKeyForWord(lookupWord, manifest.shards);
    } else {
      shardKey = getBaseShardPrefix(lookupWord);
    }

    let found: DictionaryEntry | undefined = undefined;

    if (shardKey) {
      const list = await this.getShard(shardKey);
      found = list.find(e => e.word.toLowerCase() === lookupWord);
    }

    // 4. Fallback: Check Essential Pack if available
    if (!found && !shardKey) {
      const essList = await this.getEssentialPack();
      found = essList.find(e => e.word.toLowerCase() === lookupWord);
    }

    if (found) {
      const finalEntry = patch ? applyDictionaryPatch(found, patch) : found;
      return {
        entry: finalEntry,
        isInflected,
        originalQuery: query,
        matchedForm: isInflected ? query : undefined,
      };
    }

    // 5. If word was added purely via patch or fallback patch
    if (patch && (patch.action === 'add' || patch.action === 'edit')) {
      const custom = applyDictionaryPatch(null, patch);
      return {
        entry: custom,
        isInflected: false,
        originalQuery: query,
      };
    }

    return { entry: null, isInflected: false, originalQuery: query };
  }

  /**
   * Fast autocomplete prefix search across sharded search index
   */
  public async search(
    query: string,
    options: SearchOptions = {}
  ): Promise<{
    results: SearchResultItem[];
    suggestions: string[];
    inflectedMatch?: { original: string; lemma: string };
  }> {
    const clean = (query || '').trim().toLowerCase();
    if (!clean) return { results: [], suggestions: [] };

    const limit = options.limit || 20;
    const firstLetter = clean.charAt(0);
    const indexItems = await this.getIndexShard(firstLetter);
    const inflections = await this.getInflections();

    let inflectedMatch: { original: string; lemma: string } | undefined;
    let baseSearchQuery = clean;

    // Check inflection
    if (inflections[clean] && inflections[clean] !== clean) {
      inflectedMatch = { original: clean, lemma: inflections[clean] };
      baseSearchQuery = inflections[clean];
    }

    // Filtering logic
    const matches: SearchResultItem[] = [];
    const seenWords = new Set<string>();

    // 1. Exact match for original or lemma
    const exactItem = indexItems.find(
      i => i.w.toLowerCase() === baseSearchQuery || i.w.toLowerCase() === clean
    );
    if (exactItem) {
      matches.push({
        id: exactItem.id,
        word: exactItem.w,
        partOfSpeech: exactItem.p === 'n' ? 'noun' : exactItem.p === 'v' ? 'verb' : exactItem.p === 'a' ? 'adjective' : 'adverb',
        frequencyRank: exactItem.r,
        shardKey: exactItem.s,
        isInflectedForm: !!inflectedMatch,
        originalForm: inflectedMatch?.original,
        lemma: exactItem.w,
      });
      seenWords.add(exactItem.w.toLowerCase());
    }

    // 2. Prefix matches
    for (const item of indexItems) {
      if (matches.length >= limit) break;
      const wLower = item.w.toLowerCase();
      if (seenWords.has(wLower)) continue;

      if (wLower.startsWith(clean) || (inflectedMatch && wLower.startsWith(baseSearchQuery))) {
        // Apply filters
        if (options.commonOnly && item.r > 12000) continue;
        if (options.partOfSpeech && options.partOfSpeech !== 'all') {
          const expectedCode = options.partOfSpeech.charAt(0);
          if (item.p !== expectedCode) continue;
        }

        matches.push({
          id: item.id,
          word: item.w,
          partOfSpeech: item.p === 'n' ? 'noun' : item.p === 'v' ? 'verb' : item.p === 'a' ? 'adjective' : 'adverb',
          frequencyRank: item.r,
          shardKey: item.s,
        });
        seenWords.add(wLower);
      }
    }

    // 3. Spelling suggestions if no results found
    const suggestions: string[] = [];
    if (matches.length === 0 && clean.length >= 3) {
      const candidates: Array<{ word: string; dist: number; rank: number; samePrefix: boolean }> = [];
      const maxDiff = clean.length > 5 ? 3 : 2;

      for (const item of indexItems) {
        const wLower = item.w.toLowerCase();
        if (Math.abs(wLower.length - clean.length) <= maxDiff) {
          const dist = levenshteinDistance(clean, wLower);
          if (dist <= maxDiff) {
            const samePrefix = wLower.slice(0, 3) === clean.slice(0, 3);
            candidates.push({ word: item.w, dist, rank: item.r, samePrefix });
          }
        }
      }

      // Sort suggestions prioritizing matching prefix, then edit distance, then frequency rank
      candidates.sort((a, b) => {
        if (a.samePrefix !== b.samePrefix) return a.samePrefix ? -1 : 1;
        if (a.dist !== b.dist) return a.dist - b.dist;
        return a.rank - b.rank;
      });

      for (const c of candidates) {
        if (!suggestions.includes(c.word)) {
          suggestions.push(c.word);
        }
        if (suggestions.length >= 5) break;
      }
    }

    return {
      results: matches,
      suggestions,
      inflectedMatch,
    };
  }

  /**
   * Loads the offline essential 20,000 words pack
   */
  public async getEssentialPack(): Promise<DictionaryEntry[]> {
    if (essentialPackCache) return essentialPackCache;
    const raw = await fetchCachedJson<any[]>('/dictionary/essential-20k.json');
    if (!raw) return [];
    essentialPackCache = raw.map(item => this.normalizeEntry(item));
    return essentialPackCache;
  }

  /**
   * Downloads offline dictionary pack (Essential 20k or Full) into CacheStorage
   */
  public async downloadOfflineDictionary(
    type: 'essential' | 'full',
    onProgress: (progressPercentage: number, downloadedBytes: number, totalBytes: number) => void,
    signal?: AbortSignal
  ): Promise<boolean> {
    try {
      if (typeof window === 'undefined' || !('caches' in window)) {
        throw new Error('CacheStorage API is not supported in this browser environment.');
      }

      const cache = await caches.open(CACHE_NAME);

      if (type === 'essential') {
        onProgress(10, 0, 2400000);
        const res = await fetch('/dictionary/essential-20k.json', { signal });
        if (!res.ok) throw new Error('Failed to fetch essential pack');

        const blob = await res.blob();
        await cache.put('/dictionary/essential-20k.json', new Response(blob));
        onProgress(100, blob.size, blob.size);

        this.setOfflineStatus({
          isDownloaded: true,
          type: 'essential',
          sizeBytes: blob.size,
          cachedEntriesCount: 20000,
          updatedAt: new Date().toISOString(),
        });
        return true;
      }

      // Full Dictionary Download
      const manifestRes = await fetch('/dictionary/manifest.json', { signal });
      if (!manifestRes.ok) throw new Error('Failed to fetch manifest');
      const manifest = await manifestRes.json();
      await cache.put('/dictionary/manifest.json', new Response(JSON.stringify(manifest)));

      const shardKeys = Object.keys(manifest.shards || {});
      const totalShards = shardKeys.length;
      let completed = 0;
      let totalBytes = manifest.totalCompressedSizeBytes || 18000000;
      let downloadedBytes = 0;

      // Download in batches of 6 shards
      const BATCH_SIZE = 6;
      for (let i = 0; i < totalShards; i += BATCH_SIZE) {
        if (signal?.aborted) throw new Error('Download aborted by user');

        const batch = shardKeys.slice(i, i + BATCH_SIZE);
        await Promise.all(
          batch.map(async sKey => {
            const url = `/dictionary/shards/${sKey}.json`;
            const sRes = await fetch(url, { signal });
            if (sRes.ok) {
              const b = await sRes.blob();
              downloadedBytes += b.size;
              await cache.put(url, new Response(b));
            }
          })
        );

        completed += batch.length;
        const pct = Math.round((completed / totalShards) * 90);
        onProgress(pct, downloadedBytes, totalBytes);
      }

      // Also cache inflections and index
      await fetchCachedJson('/dictionary/inflections.json');
      onProgress(100, downloadedBytes, downloadedBytes);

      this.setOfflineStatus({
        isDownloaded: true,
        type: 'full',
        sizeBytes: downloadedBytes,
        cachedEntriesCount: manifest.totalEntries || 144456,
        updatedAt: new Date().toISOString(),
      });

      return true;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('[DictionaryService] Download cancelled by user');
      } else {
        console.error('[DictionaryService] Download failed:', err);
      }
      return false;
    }
  }

  /**
   * Retrieves offline storage status
   */
  public getOfflineStatus(): OfflineStorageStatus {
    try {
      if (typeof localStorage === 'undefined') {
        return { isDownloaded: false, type: 'none', sizeBytes: 0, cachedEntriesCount: 0 };
      }
      const raw = localStorage.getItem(STORAGE_STATUS_KEY);
      if (!raw) return { isDownloaded: false, type: 'none', sizeBytes: 0, cachedEntriesCount: 0 };
      return JSON.parse(raw);
    } catch {
      return { isDownloaded: false, type: 'none', sizeBytes: 0, cachedEntriesCount: 0 };
    }
  }

  private setOfflineStatus(status: OfflineStorageStatus): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_STATUS_KEY, JSON.stringify(status));
      }
    } catch {}
  }

  /**
   * Removes offline dictionary cache and frees storage
   */
  public async clearOfflineStorage(): Promise<boolean> {
    try {
      if (typeof window !== 'undefined' && 'caches' in window) {
        await caches.delete(CACHE_NAME);
      }
      this.setOfflineStatus({
        isDownloaded: false,
        type: 'none',
        sizeBytes: 0,
        cachedEntriesCount: 0,
      });
      shardCache.clear();
      indexCache.clear();
      entryCache.clear();
      manifestCache = null;
      essentialPackCache = null;
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Generates a deterministic Word of the Day for any date
   */
  public async getWordOfTheDay(dateStr?: string): Promise<DictionaryEntry> {
    const today = dateStr || new Date().toISOString().slice(0, 10);
    // Curated inspiring academic & IELTS power words
    const CURATED_WOTD = [
      'resilience', 'eloquent', 'meticulous', 'innovative', 'pragmatic',
      'serendipity', 'diligent', 'perspective', 'advocate', 'lucid',
      'ambitious', 'synthesis', 'coherent', 'catalyst', 'empathy',
      'integrity', 'aesthetic', 'dynamic', 'versatile', 'thrive',
      'comprehensive', 'articulate', 'profound', 'sustainable', 'paradigm'
    ];

    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = (hash << 5) - hash + today.charCodeAt(i);
      hash |= 0;
    }
    const idx = Math.abs(hash) % CURATED_WOTD.length;
    const targetWord = CURATED_WOTD[idx];

    const { entry } = await this.getEntry(targetWord);
    if (entry) return entry;

    // Fallback default
    return {
      id: 'resilience_n',
      word: 'resilience',
      headword: 'resilience',
      pos: ['noun'],
      partOfSpeech: 'noun',
      definition: 'The capacity to recover quickly from difficulties; toughness.',
      senses: [
        {
          def: 'The capacity to recover quickly from difficulties; toughness.',
          shortDef: 'Capacity to recover quickly from difficulties.',
          examples: ['His courage and resilience in the face of adversity was remarkable.'],
          synonyms: ['flexibility', 'tenacity', 'durability'],
          antonyms: ['fragility', 'vulnerability'],
          domain: 'psychology',
          urduMeaning: 'لچک / مصیبت سے ابھرنے کی صلاحیت',
        },
      ],
      pronunciation: {
        ipa: '/rɪˈzɪliːəns/',
        respelling: 'ri-ZIL-yuhns',
      },
      forms: { plural: 'resiliences' },
      frequencyRank: 2150,
      levelEstimate: 'B2',
      phonetic: '/rɪˈzɪliːəns/',
      urduMeaning: 'لچک / مصیبت سے ابھرنے کی صلاحیت',
      exampleSentence: 'Building resilience is critical for IELTS preparation.',
      synonyms: ['flexibility', 'durability', 'toughness'],
      level: 'B2',
      topic: 'psychology',
      track: 'shared',
    };
  }
}

export const dictionaryStore = new OfflineDictionaryStore();

/**
 * Native Text-to-Speech audio pronunciation with US/UK voices and variable speeds
 */
export function playPronunciation(
  word: string,
  options: { lang?: 'en-US' | 'en-GB'; speed?: 1.0 | 0.75 } = {}
): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = options.lang || 'en-US';
    utterance.rate = options.speed || 1.0;

    // Try finding matching voice
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const targetLang = options.lang || 'en-US';
      const voice = voices.find(v => v.lang.startsWith(targetLang.slice(0, 2)) && v.lang.includes(targetLang.slice(3))) ||
                    voices.find(v => v.lang.startsWith(targetLang.slice(0, 2)));
      if (voice) utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('[DictionaryService] Speech synthesis unavailable:', err);
  }
}

/**
 * Bookmark a word to favorites in Dexie IndexedDB
 */
export async function toggleFavoriteWord(
  entry: DictionaryEntry,
  track: LearningTrack | 'shared' = 'shared'
): Promise<boolean> {
  const existing = await db.dictionaryFavorites.where('word').equalsIgnoreCase(entry.word).first();
  if (existing && existing.id) {
    await db.dictionaryFavorites.delete(existing.id);
    return false; // Removed
  }

  await db.dictionaryFavorites.add({
    word: entry.word,
    phonetic: entry.phonetic || entry.pronunciation?.ipa,
    partOfSpeech: entry.partOfSpeech,
    definition: entry.definition,
    urduMeaning: entry.urduMeaning,
    track,
    savedAt: new Date().toISOString(),
  });
  return true; // Added
}

export async function isWordFavorite(word: string): Promise<boolean> {
  const count = await db.dictionaryFavorites.where('word').equalsIgnoreCase(word.trim()).count();
  return count > 0;
}

export async function getFavoriteWords(): Promise<DictionaryFavorite[]> {
  return db.dictionaryFavorites.orderBy('savedAt').reverse().toArray();
}

/**
 * Record a search query in history
 */
export async function recordDictionarySearch(
  query: string,
  track: LearningTrack | 'shared' = 'shared'
): Promise<void> {
  const clean = query.trim();
  if (!clean || clean.length < 2) return;

  const existing = await db.dictionaryHistory.where('query').equalsIgnoreCase(clean).first();
  if (existing && existing.id) {
    await db.dictionaryHistory.update(existing.id, {
      searchedAt: new Date().toISOString(),
    });
    return;
  }

  await db.dictionaryHistory.add({
    query: clean,
    track,
    searchedAt: new Date().toISOString(),
  });
}

export async function getDictionaryHistory(limit = 20): Promise<DictionaryHistory[]> {
  return db.dictionaryHistory.orderBy('searchedAt').reverse().limit(limit).toArray();
}

export async function clearDictionaryHistory(): Promise<void> {
  await db.dictionaryHistory.clear();
}

/**
 * Save dictionary word into SM-2 review word bank
 */
export async function saveToWordBank(
  entry: DictionaryEntry,
  track: LearningTrack | 'shared' = 'shared',
  topic = 'general'
): Promise<void> {
  const existing = await db.vocabProgress.where('wordId').equals(entry.id).first();
  if (existing) return;

  const progress = createInitialVocabProgress(entry.id, true, {
    word: entry.word,
    meaning: entry.definition,
    urduMeaning: entry.urduMeaning,
    partOfSpeech: entry.partOfSpeech,
    example: entry.exampleSentence,
    source: 'manual',
    track,
    topic,
  });

  await db.vocabProgress.add(progress);
}
