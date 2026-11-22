import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  getBaseShardPrefix,
  getShardKeyForWord,
  lemmatizeWord,
  searchAutocomplete,
  applyDictionaryPatch,
  type ShardMeta,
  type SearchIndexItem,
} from './dictionaryClient';
import type { DictionaryPatch } from '../../types/dictionaryPatch';
import type { DictionaryEntry } from './dictionaryService';

describe('Dictionary Pipeline & Lookup System', () => {
  // Load generated manifest and inflection index from disk
  const manifestPath = path.resolve(process.cwd(), 'public/dictionary/manifest.json');
  const inflectionsPath = path.resolve(process.cwd(), 'public/dictionary/inflections.json');

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  const inflections: Record<string, string> = JSON.parse(fs.readFileSync(inflectionsPath, 'utf-8'));

  describe('1. Inflection Engine & Lemmatizer (~200 Form Benchmark)', () => {
    // 200 inflected forms covering irregular plurals, irregular verbs, irregular adjectives, regular inflections
    const inflectionTestCases: Array<[string, string | string[]]> = [
      // Irregular Plurals (30)
      ['children', 'child'],
      ['geese', 'goose'],
      ['cacti', 'cactus'],
      ['mice', 'mouse'],
      ['feet', 'foot'],
      ['teeth', 'tooth'],
      ['men', 'man'],
      ['women', 'woman'],
      ['oxen', 'ox'],
      ['lives', 'life'],
      ['leaves', ['leaf', 'leave']],
      ['knives', 'knife'],
      ['wolves', 'wolf'],
      ['thieves', 'thief'],
      ['crises', 'crisis'],
      ['theses', 'thesis'],
      ['phenomena', 'phenomenon'],
      ['criteria', 'criterion'],
      ['analyses', 'analysis'],
      ['fungi', 'fungus'],
      ['foci', 'focus'],
      ['radii', 'radius'],
      ['nuclei', 'nucleus'],
      ['alumni', 'alumnus'],
      ['diagnoses', 'diagnosis'],
      ['hypotheses', 'hypothesis'],
      ['parentheses', 'parenthesis'],
      ['synopses', 'synopsis'],
      ['axes', ['axis', 'ax', 'axe']],
      ['oases', 'oasis'],

      // Irregular Verbs - Past & Participle (110)
      ['went', 'go'],
      ['swum', 'swim'],
      ['flown', 'fly'],
      ['ran', 'run'],
      ['bought', 'buy'],
      ['taught', 'teach'],
      ['caught', 'catch'],
      ['brought', 'bring'],
      ['thought', 'think'],
      ['fought', 'fight'],
      ['sought', 'seek'],
      ['drank', 'drink'],
      ['drunk', 'drink'],
      ['ate', 'eat'],
      ['eaten', 'eat'],
      ['wrote', 'write'],
      ['written', 'write'],
      ['spoke', 'speak'],
      ['spoken', 'speak'],
      ['drove', 'drive'],
      ['driven', 'drive'],
      ['broke', 'break'],
      ['broken', 'break'],
      ['chose', 'choose'],
      ['chosen', 'choose'],
      ['froze', 'freeze'],
      ['frozen', 'freeze'],
      ['stole', 'steal'],
      ['stolen', 'steal'],
      ['woke', 'wake'],
      ['woken', 'wake'],
      ['rose', 'rise'],
      ['risen', 'rise'],
      ['took', 'take'],
      ['taken', 'take'],
      ['shook', 'shake'],
      ['shaken', 'shake'],
      ['fell', ['fall', 'fell']],
      ['fallen', 'fall'],
      ['gave', 'give'],
      ['given', 'give'],
      ['forgave', 'forgive'],
      ['forgiven', 'forgive'],
      ['hid', 'hide'],
      ['hidden', 'hide'],
      ['rode', 'ride'],
      ['ridden', 'ride'],
      ['bit', ['bite', 'bit']],
      ['bitten', 'bite'],
      ['began', 'begin'],
      ['begun', 'begin'],
      ['sang', 'sing'],
      ['sung', 'sing'],
      ['sank', 'sink'],
      ['sunk', 'sink'],
      ['rang', 'ring'],
      ['rung', 'ring'],
      ['blew', 'blow'],
      ['blown', 'blow'],
      ['grew', 'grow'],
      ['grown', 'grow'],
      ['knew', 'know'],
      ['known', 'know'],
      ['threw', 'throw'],
      ['thrown', 'throw'],
      ['drew', 'draw'],
      ['drawn', 'draw'],
      ['saw', ['see', 'saw']],
      ['seen', 'see'],
      ['did', 'do'],
      ['done', 'do'],
      ['been', 'be'],
      ['had', 'have'],
      ['made', 'make'],
      ['paid', 'pay'],
      ['laid', 'lay'],
      ['said', 'say'],
      ['sold', 'sell'],
      ['told', 'tell'],
      ['felt', 'feel'],
      ['left', ['leave', 'left']],
      ['met', 'meet'],
      ['slept', 'sleep'],
      ['kept', 'keep'],
      ['crept', 'creep'],
      ['wept', 'weep'],
      ['swept', 'sweep'],
      ['built', 'build'],
      ['lent', 'lend'],
      ['sent', 'send'],
      ['spent', 'spend'],
      ['bent', ['bend', 'bent']],
      ['burnt', 'burn'],
      ['learnt', 'learn'],
      ['smelt', 'smell'],
      ['lost', 'lose'],
      ['shot', 'shoot'],
      ['stood', 'stand'],
      ['understood', 'understand'],
      ['held', 'hold'],
      ['found', ['find', 'found']],
      ['bound', ['bind', 'bound']],
      ['wound', ['wind', 'wound']],
      ['struck', 'strike'],
      ['hung', 'hang'],
      ['dug', 'dig'],
      ['spun', 'spin'],
      ['stuck', 'stick'],
      ['stung', 'sting'],
      ['swung', 'swing'],
      ['won', 'win'],
      ['shone', 'shine'],
      ['lit', 'light'],
      ['led', 'lead'],
      ['fed', 'feed'],
      ['bled', 'bleed'],
      ['fled', 'flee'],

      // Irregular Adjectives & Adverbs (12)
      ['better', ['well', 'good']],
      ['best', ['well', 'good']],
      ['worse', ['bad', 'badly', 'ill']],
      ['worst', ['bad', 'badly', 'ill']],
      ['further', 'far'],
      ['furthest', 'far'],
      ['farther', 'far'],
      ['farthest', 'far'],
      ['less', 'little'],
      ['least', 'little'],
      ['more', ['much', 'many']],
      ['most', ['much', 'many']],

      // Regular Plurals & Inflected Nouns (20)
      ['cats', 'cat'],
      ['dogs', 'dog'],
      ['books', 'book'],
      ['cars', 'car'],
      ['boxes', 'box'],
      ['watches', 'watch'],
      ['buses', 'bus'],
      ['dishes', 'dish'],
      ['cities', 'city'],
      ['babies', 'baby'],
      ['countries', 'country'],
      ['parties', 'party'],
      ['monkeys', 'monkey'],
      ['days', 'day'],
      ['apples', 'apple'],
      ['tables', 'table'],
      ['chairs', 'chair'],
      ['windows', 'window'],
      ['doors', 'door'],
      ['phones', 'phone'],

      // Regular -ing Forms (15)
      ['running', 'run'],
      ['swimming', 'swim'],
      ['stopping', 'stop'],
      ['sitting', 'sit'],
      ['making', 'make'],
      ['writing', 'write'],
      ['coming', 'come'],
      ['giving', 'give'],
      ['walking', 'walk'],
      ['reading', 'read'],
      ['studying', 'study'],
      ['playing', 'play'],
      ['trying', 'try'],
      ['carrying', 'carry'],
      ['opening', 'open'],

      // Regular -ed Forms (15)
      ['walked', 'walk'],
      ['talked', 'talk'],
      ['jumped', 'jump'],
      ['played', 'play'],
      ['stopped', 'stop'],
      ['trapped', 'trap'],
      ['loved', 'love'],
      ['smiled', 'smile'],
      ['hoped', 'hope'],
      ['carried', 'carry'],
      ['studied', 'study'],
      ['tried', 'try'],
      ['cried', 'cry'],
      ['opened', 'open'],
      ['closed', 'close'],
    ];

    it('contains over 200 benchmark test forms', () => {
      expect(inflectionTestCases.length).toBeGreaterThanOrEqual(200);
    });

    it('correctly resolves all 200 inflected forms to their expected lemma', () => {
      let passedCount = 0;
      const failures: Array<{ form: string; expected: string | string[]; actual: string }> = [];

      for (const [form, expected] of inflectionTestCases) {
        const lemma = lemmatizeWord(form, inflections);
        const isMatch = Array.isArray(expected) ? expected.includes(lemma) : lemma === expected;
        if (isMatch) {
          passedCount++;
        } else {
          failures.push({ form, expected, actual: lemma });
        }
      }

      expect(failures).toEqual([]);
      expect(passedCount).toBe(inflectionTestCases.length);
    });

    it('returns base word unchanged when already a lemma', () => {
      expect(lemmatizeWord('run', inflections)).toBe('run');
      expect(lemmatizeWord('book', inflections)).toBe('book');
      expect(lemmatizeWord('good', inflections)).toBe('good');
    });
  });

  describe('2. Shard Determination & Lookup Logic', () => {
    const shards: Record<string, ShardMeta> = manifest.shards;

    it('computes correct 2-letter base prefixes', () => {
      expect(getBaseShardPrefix('abandon')).toBe('ab');
      expect(getBaseShardPrefix('cat')).toBe('ca');
      expect(getBaseShardPrefix('a')).toBe('a_');
      expect(getBaseShardPrefix('3D')).toBe('d_');
      expect(getBaseShardPrefix('123')).toBe('other');
    });

    it('maps words in single shards to the exact shard name', () => {
      // E.g. "ab" is typically a single shard or small set
      const shard = getShardKeyForWord('abandon', shards);
      expect(shard).toBeDefined();
      expect(shard?.startsWith('ab')).toBe(true);
    });

    it('correctly maps words in split/chunked high-density shards (e.g. co_1 ... co_5)', () => {
      // "come" and "course"
      const shardCome = getShardKeyForWord('come', shards);
      expect(shardCome).toBeDefined();
      expect(shardCome?.startsWith('co_')).toBe(true);

      const shardCourse = getShardKeyForWord('course', shards);
      expect(shardCourse).toBeDefined();
      expect(shardCourse?.startsWith('co_')).toBe(true);
    });

    it('verifies target words actually exist in their mapped shard files', () => {
      const testWords = ['abandon', 'computer', 'science', 'university', 'grammar', 'vocabulary'];

      for (const word of testWords) {
        const shardKey = getShardKeyForWord(word, shards);
        expect(shardKey).toBeTruthy();

        const shardPath = path.resolve(process.cwd(), `public/dictionary/shards/${shardKey}.json`);
        expect(fs.existsSync(shardPath)).toBe(true);

        const shardContent: Array<{ headword: string }> = JSON.parse(fs.readFileSync(shardPath, 'utf-8'));
        const found = shardContent.some(e => e.headword.toLowerCase() === word.toLowerCase());
        expect(found).toBe(true);
      }
    });
  });

  describe('3. Prefix Search Autocomplete Index', () => {
    it('retrieves prefix completions accurately from index shards', () => {
      const cIndexPath = path.resolve(process.cwd(), 'public/dictionary/index/c.json');
      expect(fs.existsSync(cIndexPath)).toBe(true);

      const cIndex: SearchIndexItem[] = JSON.parse(fs.readFileSync(cIndexPath, 'utf-8'));
      expect(cIndex.length).toBeGreaterThan(100);

      const results = searchAutocomplete('comput', cIndex, 10);
      expect(results.length).toBeGreaterThan(0);
      expect(results.every(r => r.w.toLowerCase().startsWith('comput'))).toBe(true);
      expect(results.some(r => r.w.toLowerCase() === 'computer')).toBe(true);
    });

    it('returns empty array when no prefix matches', () => {
      const aIndexPath = path.resolve(process.cwd(), 'public/dictionary/index/a.json');
      const aIndex: SearchIndexItem[] = JSON.parse(fs.readFileSync(aIndexPath, 'utf-8'));
      const results = searchAutocomplete('zzzzzzz', aIndex);
      expect(results).toEqual([]);
    });
  });

  describe('4. User Overrides & Patch Layer Schema', () => {
    const baseEntry: DictionaryEntry = {
      id: 'book_n',
      word: 'book',
      headword: 'book',
      pos: ['noun'],
      partOfSpeech: 'noun',
      definition: 'A written work or composition made of pages bound together.',
      senses: [
        {
          def: 'A written work or composition made of pages bound together.',
          shortDef: 'Written work made of bound pages.',
        },
      ],
      pronunciation: {
        ipa: '/bʊk/',
        respelling: 'BUUK',
      },
      frequencyRank: 500,
      levelEstimate: 'A1',
      level: 'A1',
      topic: 'general',
      track: 'shared',
    };

    it('applies an edit patch updating Urdu meaning and level', () => {
      const patch: DictionaryPatch = {
        id: 'patch_1',
        headword: 'book',
        action: 'edit',
        urduMeaning: 'کتاب / تصنیف',
        levelOverride: 'A2',
        createdAt: '2026-11-22T00:00:00Z',
        updatedAt: '2026-11-22T00:00:00Z',
      };

      const patched = applyDictionaryPatch(baseEntry, patch);
      expect(patched).not.toBeNull();
      expect(patched?.urduMeaning).toBe('کتاب / تصنیف');
      expect(patched?.level).toBe('A2');
      expect(patched?.definition).toBe(baseEntry.definition);
    });

    it('hides an entry when action is hide', () => {
      const patch: DictionaryPatch = {
        id: 'patch_2',
        headword: 'book',
        action: 'hide',
        createdAt: '2026-11-22T00:00:00Z',
        updatedAt: '2026-11-22T00:00:00Z',
      };

      const patched = applyDictionaryPatch(baseEntry, patch);
      expect(patched).toBeNull();
    });

    it('creates a custom candidate entry when action is add and base entry is null', () => {
      const patch: DictionaryPatch = {
        id: 'patch_3',
        headword: 'chai',
        pos: 'noun',
        action: 'add',
        urduMeaning: 'چائے',
        senses: [
          {
            def: 'Spiced milk tea popular in South Asia.',
            examples: ['She drank a warm cup of chai.'],
          },
        ],
        pronunciationOverride: {
          ipa: '/tʃaɪ/',
          respelling: 'CHYE',
        },
        levelOverride: 'A2',
        createdAt: '2026-11-22T00:00:00Z',
        updatedAt: '2026-11-22T00:00:00Z',
      };

      const newEntry = applyDictionaryPatch(null, patch);
      expect(newEntry).not.toBeNull();
      expect(newEntry?.word).toBe('chai');
      expect(newEntry?.urduMeaning).toBe('چائے');
      expect(newEntry?.definition).toBe('Spiced milk tea popular in South Asia.');
      expect(newEntry?.phonetic).toBe('/tʃaɪ/');
    });
  });
});
