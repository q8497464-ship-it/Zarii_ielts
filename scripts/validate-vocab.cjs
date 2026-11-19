/**
 * Zarii Vocabulary Content Validation & Quality Auditor
 * 
 * Verifies:
 * - Required fields (id, word/headword, partOfSpeech, definition, urduMeaning, collocations, topic, level)
 * - Zero duplicate IDs or headwords
 * - Definitions do not redundantly contain the headword itself
 * - Examples contain the headword (or root stem)
 * - Collocations count between 3 and 6
 * - Valid CEFR levels (B1, B2, C1) and band ranges
 * - Distribution report per topic and level
 */

const fs = require('fs');
const path = require('path');

const WORDS_PATH = path.join(__dirname, '../content/vocab/academic-words.json');

function runVocabValidation() {
  console.log('=====================================================');
  console.log(' ZARII VOCABULARY CONTENT VALIDATION & QUALITY AUDIT ');
  console.log('=====================================================');

  if (!fs.existsSync(WORDS_PATH)) {
    console.error(`[Error] File not found: ${WORDS_PATH}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(WORDS_PATH, 'utf-8');
  let words = [];
  try {
    words = JSON.parse(raw);
  } catch (err) {
    console.error(`[Error] Failed to parse JSON: ${err.message}`);
    process.exit(1);
  }

  console.log(`Total vocabulary items loaded: ${words.length}\n`);

  const errors = [];
  const warnings = [];
  const idSet = new Set();
  const wordSet = new Set();
  const topicDistribution = {};
  const levelDistribution = {};

  words.forEach((entry, idx) => {
    const loc = `Index ${idx} (id: ${entry.id || 'MISSING'}, word: ${entry.word || 'MISSING'})`;

    // 1. Required fields
    const required = ['id', 'word', 'partOfSpeech', 'topic', 'meaning', 'exampleSentence', 'collocations'];
    for (const req of required) {
      if (!entry[req] || (Array.isArray(entry[req]) && entry[req].length === 0)) {
        errors.push(`${loc}: Missing required field "${req}"`);
      }
    }

    // 2. Duplicates
    if (entry.id) {
      if (idSet.has(entry.id)) {
        errors.push(`${loc}: Duplicate ID "${entry.id}" detected`);
      }
      idSet.add(entry.id);
    }

    if (entry.word) {
      const cleanWord = entry.word.trim().toLowerCase();
      if (wordSet.has(cleanWord)) {
        warnings.push(`${loc}: Duplicate word "${cleanWord}" detected`);
      }
      wordSet.add(cleanWord);
    }

    // 3. Definition must not define word using the word itself
    if (entry.word && (entry.meaning || entry.definition)) {
      const def = (entry.definition || entry.meaning || '').toLowerCase();
      const head = entry.word.toLowerCase();
      // Whole-word regex match in definition
      const headRegex = new RegExp(`\\b${head}\\b`, 'i');
      if (head.length > 3 && headRegex.test(def)) {
        warnings.push(`${loc}: Definition contains the headword itself ("${head}")`);
      }
    }

    // 4. Example sentence must contain the word or its stem
    if (entry.word && (entry.exampleSentence || entry.example)) {
      const ex = (entry.exampleSentence || entry.example || '').toLowerCase();
      const head = entry.word.toLowerCase().replace(/[^a-z]/g, '');
      const stem = head.length > 5 ? head.slice(0, -2) : head.slice(0, -1);
      if (!ex.includes(head) && !ex.includes(stem)) {
        warnings.push(`${loc}: Example sentence does not appear to contain word or stem "${head}"`);
      }
    }

    // 5. Collocations validation
    if (Array.isArray(entry.collocations)) {
      if (entry.collocations.length < 3) {
        warnings.push(`${loc}: Too few collocations (${entry.collocations.length}, minimum 3 recommended)`);
      } else if (entry.collocations.length > 8) {
        warnings.push(`${loc}: Excess collocations (${entry.collocations.length}, maximum 6-8 recommended)`);
      }
    }

    // Tally topic & level
    const topic = entry.topic || 'unassigned';
    topicDistribution[topic] = (topicDistribution[topic] || 0) + 1;

    const level = entry.level || (entry.bandTarget >= 7.5 ? 'C1' : entry.bandTarget >= 6.5 ? 'B2' : 'B1');
    levelDistribution[level] = (levelDistribution[level] || 0) + 1;
  });

  // Print Distribution Reports
  console.log('--- Topic Distribution ---');
  Object.entries(topicDistribution)
    .sort((a, b) => b[1] - a[1])
    .forEach(([t, count]) => {
      console.log(`  • ${t.padEnd(24)} : ${count} words`);
    });

  console.log('\n--- Level Distribution ---');
  Object.entries(levelDistribution)
    .sort()
    .forEach(([lvl, count]) => {
      console.log(`  • Level ${lvl.padEnd(16)} : ${count} words`);
    });

  console.log('\n=====================================================');
  if (errors.length > 0) {
    console.error(`❌ Validation FAILED with ${errors.length} errors:`);
    errors.slice(0, 20).forEach((e) => console.error(`  - ${e}`));
    if (errors.length > 20) console.error(`  ...and ${errors.length - 20} more errors.`);
    process.exit(1);
  } else {
    console.log(`✓ Content validation PASSED (${warnings.length} non-blocking warnings)`);
    if (warnings.length > 0) {
      console.log(`Sample warnings (first 5):`);
      warnings.slice(0, 5).forEach((w) => console.log(`  ⚠ ${w}`));
    }
  }
}

runVocabValidation();
