/**
 * Zarii Full English Dictionary Data Pipeline Builder
 * 
 * Compiles Open English WordNet, CMU Pronouncing Dictionary, and Frequency Lists
 * into sharded, lightweight, browser-optimized JSON and gzipped packs.
 * 
 * Run with: npm run build-dictionary
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');
const { WordNetParser } = require('./wordnetParser.cjs');
const { arpabetToIpa, arpabetToRespelling } = require('./arpabet.cjs');
const { shortenDefinition } = require('./shorten.cjs');
const { isOffensive } = require('./offensive.cjs');
const { InflectionEngine } = require('./inflections.cjs');

const RAW_DIR = path.join(process.cwd(), 'data', 'raw');
const OUT_DIR = path.join(process.cwd(), 'public', 'dictionary');
const SHARDS_DIR = path.join(OUT_DIR, 'shards');
const INDEX_DIR = path.join(OUT_DIR, 'index');
const MAX_ENTRIES_PER_SHARD = 1000; // Guarantees < 100 KB gzipped per shard

// Helper to compute sha256
function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex').slice(0, 16);
}

// Ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Gzip buffer helper
function gzipBuffer(buf) {
  return zlib.gzipSync(buf, { level: 9 });
}

// ---------------------------------------------------------------------------
// 1. Download & Ensure Raw Sources
// ---------------------------------------------------------------------------
async function ensureSourceFiles() {
  ensureDir(RAW_DIR);

  const sources = [
    {
      name: 'english-wordnet-2024.zip',
      url: 'https://github.com/globalwordnet/english-wordnet/releases/download/2024-edition/english-wordnet-2024.zip',
      isZip: true,
    },
    {
      name: 'cmudict.dict',
      url: 'https://raw.githubusercontent.com/cmusphinx/cmudict/master/cmudict.dict',
    },
    {
      name: 'count_1w.txt',
      url: 'https://norvig.com/ngrams/count_1w.txt',
    },
    {
      name: 'en_50k.txt',
      url: 'https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/en/en_50k.txt',
    },
    {
      name: 'words_alpha.txt',
      url: 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt',
    },
  ];

  for (const s of sources) {
    const dest = path.join(RAW_DIR, s.name);
    if (!fs.existsSync(dest)) {
      console.log(`Downloading source: ${s.name}...`);
      const res = await fetch(s.url, { redirect: 'follow' });
      if (!res.ok) throw new Error(`Failed to download ${s.url}: ${res.statusText}`);
      const arrayBuf = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(arrayBuf));
      console.log(`Saved ${s.name} (${(arrayBuf.byteLength / 1024 / 1024).toFixed(2)} MB)`);
    }
  }

  // Extract WordNet if needed
  const oewnDir = path.join(RAW_DIR, 'oewn2024');
  if (!fs.existsSync(path.join(oewnDir, 'data.noun'))) {
    console.log('Extracting WordNet archive...');
    const AdmZip = require('child_process');
    AdmZip.execSync(`tar -xf "${path.join(RAW_DIR, 'english-wordnet-2024.zip')}" -C "${RAW_DIR}"`);
  }
}

// ---------------------------------------------------------------------------
// 2. Load Supplementary Datasets
// ---------------------------------------------------------------------------
function loadCmudict() {
  console.log('Loading CMU Pronouncing Dictionary...');
  const file = path.join(RAW_DIR, 'cmudict.dict');
  const map = new Map();
  if (!fs.existsSync(file)) return map;

  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith(';;;')) continue;
    const spaceIdx = trimmed.indexOf(' ');
    if (spaceIdx === -1) continue;

    const rawWord = trimmed.slice(0, spaceIdx);
    const arpabet = trimmed.slice(spaceIdx + 1).trim();
    const cleanWord = rawWord.replace(/\(\d+\)$/, '').toLowerCase();

    // Store first / most common pronunciation
    if (!map.has(cleanWord)) {
      map.set(cleanWord, arpabet);
    }
  }
  console.log(`Loaded ${map.size} pronunciations from CMUDict.`);
  return map;
}

function loadFrequencyRanks() {
  console.log('Loading Frequency Rankings...');
  const rankMap = new Map();
  let currentRank = 1;

  // Primary: Hermit Dave 50k (modern subtitle / spoken corpus)
  const hdFile = path.join(RAW_DIR, 'en_50k.txt');
  if (fs.existsSync(hdFile)) {
    const lines = fs.readFileSync(hdFile, 'utf-8').split('\n');
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      if (parts[0]) {
        const w = parts[0].toLowerCase();
        if (!rankMap.has(w)) {
          rankMap.set(w, currentRank++);
        }
      }
    }
  }

  // Secondary: Norvig count_1w (Google Web Trillion Word Corpus)
  const norvigFile = path.join(RAW_DIR, 'count_1w.txt');
  if (fs.existsSync(norvigFile)) {
    const lines = fs.readFileSync(norvigFile, 'utf-8').split('\n');
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      if (parts[0]) {
        const w = parts[0].toLowerCase();
        if (!rankMap.has(w)) {
          rankMap.set(w, currentRank++);
        }
      }
    }
  }

  console.log(`Loaded ${rankMap.size} frequency ranks.`);
  return rankMap;
}

function loadWordsAlphaSet() {
  console.log('Loading DWYL words_alpha verification set...');
  const file = path.join(RAW_DIR, 'words_alpha.txt');
  const set = new Set();
  if (fs.existsSync(file)) {
    const lines = fs.readFileSync(file, 'utf-8').split('\n');
    for (const line of lines) {
      const w = line.trim().toLowerCase();
      if (w) set.add(w);
    }
  }
  console.log(`Loaded ${set.size} headwords into spell verification set.`);
  return set;
}

// ---------------------------------------------------------------------------
// 3. Main Build Execution
// ---------------------------------------------------------------------------
async function buildDictionary() {
  const startTime = Date.now();
  console.log('=====================================================');
  console.log('       ZARII FULL DICTIONARY PIPELINE BUILDER        ');
  console.log('=====================================================');

  // Step 1: Ensure files
  await ensureSourceFiles();

  // Step 2: Load helpers and parsers
  const cmudict = loadCmudict();
  const freqRanks = loadFrequencyRanks();
  const validHeadwords = loadWordsAlphaSet();

  const inflectionEngine = new InflectionEngine();
  inflectionEngine.load(path.join(RAW_DIR, 'oewn2024'));

  const wnParser = new WordNetParser(path.join(RAW_DIR, 'oewn2024'));
  const lemmaMap = await wnParser.parseAll();

  // Step 3: Process and merge entries
  console.log('Merging lexical entries, inflections, and phonetics...');
  const mergedEntries = [];
  const inflectionIndex = {}; // inflectedWord -> lemma
  // Pre-seed inflectionIndex with all WordNet irregular exceptions (e.g. better->good, mice->mouse)
  for (const [inflected, info] of inflectionEngine.exceptions.entries()) {
    inflectionIndex[inflected] = info.lemma;
  }
  const rawShardBuckets = new Map(); // "aa" -> [entry]
  let totalSensesCount = 0;

  for (const [key, lemmaEntry] of lemmaMap.entries()) {
    const headword = lemmaEntry.headword.replace(/_/g, ' ').trim();
    if (!headword) continue;

    const lowerHeadword = headword.toLowerCase();
    const pos = lemmaEntry.pos;

    // Filter out numerical / non-word lemmas
    if (!/^[a-zA-Z\s'-]+$/.test(headword)) continue;

    // Check spelling / validity against DWYL words_alpha, CMUDict, or frequency list
    const tokens = lowerHeadword.split(/[\s-]+/).filter(Boolean);
    if (tokens.length > 3) continue; // Skip overly long multi-word encyclopedic phrases

    const isValidHeadword = tokens.every(t => 
      validHeadwords.has(t) || cmudict.has(t) || freqRanks.has(t) || t.length === 1
    );
    if (!isValidHeadword) continue;

    // Clean and order senses
    const cleanSenses = [];
    const seenDefs = new Set();

    for (const sense of lemmaEntry.senses) {
      const def = sense.def.trim();
      if (!def || seenDefs.has(def.toLowerCase())) continue;
      seenDefs.add(def.toLowerCase());

      const shortDef = shortenDefinition(def);
      const examples = Array.isArray(sense.examples) ? sense.examples.slice(0, 2) : [];
      const synonyms = Array.isArray(sense.synonyms) ? sense.synonyms.slice(0, 3) : [];
      const antonyms = Array.isArray(sense.antonyms) ? sense.antonyms.slice(0, 2) : [];

      const sObj = { def, shortDef };
      if (examples.length > 0) sObj.examples = examples;
      if (synonyms.length > 0) sObj.synonyms = synonyms;
      if (antonyms.length > 0) sObj.antonyms = antonyms;
      if (sense.domain && sense.domain !== 'general') sObj.domain = sense.domain;

      cleanSenses.push(sObj);
      totalSensesCount++;
    }

    if (cleanSenses.length === 0) continue;

    // Pronunciation
    const singleWord = lowerHeadword.split(/\s+/)[0];
    const arpabet = cmudict.get(singleWord) || '';
    const ipa = arpabet ? arpabetToIpa(arpabet) : `/${singleWord}/`;
    const respelling = arpabet ? arpabetToRespelling(arpabet) : singleWord;

    // Inflections & Grammatical Forms
    const forms = inflectionEngine.getForms(lowerHeadword, pos);

    // Register inflected forms into inflectionIndex
    for (const [formName, formValue] of Object.entries(forms)) {
      if (formValue && formValue !== lowerHeadword && !inflectionIndex[formValue]) {
        inflectionIndex[formValue] = lowerHeadword;
      }
    }

    // Frequency Rank & Level Estimate
    const freqRank = freqRanks.get(lowerHeadword) || 999999;
    let levelEstimate = 'rare';
    if (freqRank <= 1000) levelEstimate = 'A1';
    else if (freqRank <= 3000) levelEstimate = 'A2';
    else if (freqRank <= 6000) levelEstimate = 'B1';
    else if (freqRank <= 12000) levelEstimate = 'B2';
    else if (freqRank <= 25000) levelEstimate = 'C1';

    // Flags
    const combinedGloss = cleanSenses.map(s => s.def).join(' ');
    const offensive = isOffensive(lowerHeadword, combinedGloss);
    const archaic = /\b(archaic|obsolete|dated)\b/i.test(combinedGloss);
    const rare = levelEstimate === 'rare';
    const propername = /^[A-Z]/.test(lemmaEntry.headword);

    // Two-letter prefix shard key e.g. "ab", "th", "ru"
    const alphaOnly = lowerHeadword.replace(/[^a-z]/g, '');
    let shardBase = 'other';
    if (alphaOnly.length >= 2) {
      shardBase = alphaOnly.slice(0, 2);
    } else if (alphaOnly.length === 1) {
      shardBase = alphaOnly + '_';
    }

    const posCode = pos === 'noun' ? 'n' : pos === 'verb' ? 'v' : pos === 'adjective' ? 'a' : 'r';
    const entryId = `${lowerHeadword.replace(/\s+/g, '_')}_${posCode}`;

    const entry = {
      id: entryId,
      headword,
      pos: [pos],
      senses: cleanSenses,
      pronunciation: {
        ipa,
        respelling,
        ...(arpabet ? { arpabet } : {}),
      },
      frequencyRank: freqRank,
      levelEstimate,
    };

    if (Object.keys(forms).length > 0) {
      entry.forms = forms;
    }

    const flagObj = {};
    if (offensive) flagObj.offensive = true;
    if (archaic) flagObj.archaic = true;
    if (rare) flagObj.rare = true;
    if (propername) flagObj.propername = true;
    if (Object.keys(flagObj).length > 0) {
      entry.flags = flagObj;
    } else {
      entry.flags = { offensive: false, archaic: false, rare: false, propername: false };
    }

    entry._shardBase = shardBase;
    entry._firstLetter = alphaOnly.charAt(0) || 'other';

    mergedEntries.push(entry);

    if (!rawShardBuckets.has(shardBase)) {
      rawShardBuckets.set(shardBase, []);
    }
    rawShardBuckets.get(shardBase).push(entry);
  }

  console.log(`Generated ${mergedEntries.length} merged dictionary entries.`);

  // Step 4: Shard Splitting & Writing
  console.log('Writing sharded files to public/dictionary/shards/...');
  ensureDir(SHARDS_DIR);
  ensureDir(INDEX_DIR);

  let totalRawBytes = 0;
  let totalGzBytes = 0;
  let totalFilesCount = 0;
  const shardManifestMap = {};
  const indexBuckets = new Map(); // "a" -> [compactSearchItem]

  for (const [shardBase, entries] of rawShardBuckets.entries()) {
    entries.sort((a, b) => a.headword.localeCompare(b.headword));

    // If bucket has > MAX_ENTRIES_PER_SHARD, split into smaller sub-shards
    const chunks = [];
    if (entries.length <= MAX_ENTRIES_PER_SHARD) {
      chunks.push({ shardKey: shardBase, list: entries });
    } else {
      const numChunks = Math.ceil(entries.length / MAX_ENTRIES_PER_SHARD);
      for (let c = 0; c < numChunks; c++) {
        const start = c * MAX_ENTRIES_PER_SHARD;
        const end = start + MAX_ENTRIES_PER_SHARD;
        chunks.push({
          shardKey: `${shardBase}_${c + 1}`,
          list: entries.slice(start, end),
        });
      }
    }

    for (const chunk of chunks) {
      const { shardKey, list } = chunk;

      // Clean internal properties before stringify
      const cleanedList = list.map(item => {
        const { _shardBase, _firstLetter, ...rest } = item;
        return rest;
      });

      const jsonStr = JSON.stringify(cleanedList);
      const jsonBuf = Buffer.from(jsonStr, 'utf-8');
      const gzBuf = gzipBuffer(jsonBuf);

      const jsonPath = path.join(SHARDS_DIR, `${shardKey}.json`);
      const gzPath = path.join(SHARDS_DIR, `${shardKey}.json.gz`);

      fs.writeFileSync(jsonPath, jsonBuf);
      fs.writeFileSync(gzPath, gzBuf);

      totalRawBytes += jsonBuf.length + gzBuf.length;
      totalGzBytes += gzBuf.length;
      totalFilesCount += 2;

      shardManifestMap[shardKey] = {
        count: list.length,
        size: jsonBuf.length,
        gzSize: gzBuf.length,
        firstWord: list[0]?.headword || '',
        lastWord: list[list.length - 1]?.headword || '',
        hash: sha256(jsonBuf),
      };

      // Register items into the prefix autocomplete search index
      for (const item of list) {
        const firstLetter = item._firstLetter;
        if (!indexBuckets.has(firstLetter)) {
          indexBuckets.set(firstLetter, []);
        }
        indexBuckets.get(firstLetter).push({
          w: item.headword,
          id: item.id,
          p: item.pos[0] === 'noun' ? 'n' : item.pos[0] === 'verb' ? 'v' : item.pos[0] === 'adjective' ? 'a' : 'r',
          r: item.frequencyRank,
          s: shardKey,
        });
      }
    }
  }

  // Step 5: Write Prefix Search Autocomplete Index
  console.log('Writing search autocomplete index to public/dictionary/index/...');
  for (const [firstLetter, items] of indexBuckets.entries()) {
    items.sort((a, b) => a.r - b.r);

    const jsonStr = JSON.stringify(items);
    const jsonBuf = Buffer.from(jsonStr, 'utf-8');
    const gzBuf = gzipBuffer(jsonBuf);

    const jsonPath = path.join(INDEX_DIR, `${firstLetter}.json`);
    const gzPath = path.join(INDEX_DIR, `${firstLetter}.json.gz`);

    fs.writeFileSync(jsonPath, jsonBuf);
    fs.writeFileSync(gzPath, gzBuf);

    totalRawBytes += jsonBuf.length + gzBuf.length;
    totalGzBytes += gzBuf.length;
    totalFilesCount += 2;
  }

  // Step 6: Write Essential 20k Core Pack
  console.log('Writing Essential 20k offline pack...');
  const sortedByFreq = [...mergedEntries].sort((a, b) => a.frequencyRank - b.frequencyRank);
  const essential20k = sortedByFreq.slice(0, 20000).map(item => {
    const { _shardBase, _firstLetter, ...rest } = item;
    return {
      ...rest,
      senses: rest.senses.slice(0, 2),
    };
  });

  const essStr = JSON.stringify(essential20k);
  const essBuf = Buffer.from(essStr, 'utf-8');
  const essGzBuf = gzipBuffer(essBuf);

  fs.writeFileSync(path.join(OUT_DIR, 'essential-20k.json'), essBuf);
  fs.writeFileSync(path.join(OUT_DIR, 'essential-20k.json.gz'), essGzBuf);
  totalRawBytes += essBuf.length + essGzBuf.length;
  totalGzBytes += essGzBuf.length;
  totalFilesCount += 2;

  // Step 7: Write Inflection Index
  console.log('Writing inflections index...');
  const inflStr = JSON.stringify(inflectionIndex);
  const inflBuf = Buffer.from(inflStr, 'utf-8');
  const inflGzBuf = gzipBuffer(inflBuf);

  fs.writeFileSync(path.join(OUT_DIR, 'inflections.json'), inflBuf);
  fs.writeFileSync(path.join(OUT_DIR, 'inflections.json.gz'), inflGzBuf);
  totalRawBytes += inflBuf.length + inflGzBuf.length;
  totalGzBytes += inflGzBuf.length;
  totalFilesCount += 2;

  // Step 8: Write Manifest
  console.log('Writing manifest.json...');
  const manifest = {
    name: 'Zarii Comprehensive English Dictionary',
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    totalEntries: mergedEntries.length,
    totalSenses: totalSensesCount,
    totalShards: Object.keys(shardManifestMap).length,
    totalFiles: totalFilesCount + 1,
    totalHostedSizeBytes: totalRawBytes,
    totalCompressedSizeBytes: totalGzBytes,
    hostedSizeMB: (totalRawBytes / 1024 / 1024).toFixed(2),
    compressedSizeMB: (totalGzBytes / 1024 / 1024).toFixed(2),
    sources: {
      wordnet: 'Open English WordNet 2024 (CC BY 4.0)',
      cmudict: 'CMU Pronouncing Dictionary 0.7b (BSD/Public Domain)',
      frequency: 'Google Web N-Grams & OpenSubtitles (Public Domain & CC BY-SA 4.0)',
      spellCheck: 'DWYL english-words (Unlicense / Public Domain)',
    },
    shards: shardManifestMap,
  };

  const manifestStr = JSON.stringify(manifest, null, 2);
  fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), manifestStr);
  totalFilesCount += 1;

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('=====================================================');
  console.log('         BUILD PIPELINE SUCCESSFULLY COMPLETED       ');
  console.log('=====================================================');
  console.log(`⏱ Time Elapsed:           ${durationSec}s`);
  console.log(`📚 Total Dictionary Entries: ${mergedEntries.length}`);
  console.log(`💡 Total Distinct Senses:   ${totalSensesCount}`);
  console.log(`📦 Total Shards:            ${Object.keys(shardManifestMap).length}`);
  console.log(`📁 Total Output Files:      ${totalFilesCount}`);
  console.log(`💾 Total Hosted Disk Size:  ${(totalRawBytes / 1024 / 1024).toFixed(2)} MB (Target: < 120 MB)`);
  console.log(`🗜 Total Compressed Size:   ${(totalGzBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log('=====================================================');
}

if (require.main === module) {
  buildDictionary().catch(err => {
    console.error('Build failed with error:', err);
    process.exit(1);
  });
}

module.exports = {
  buildDictionary,
};
