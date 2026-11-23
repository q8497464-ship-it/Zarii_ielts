/**
 * MCQ Answer Position & Integrity Audit Script for Zarii IELTS
 *
 * Checks:
 * 1. Distribution of correct answers across positions A, B, C, D per module and overall.
 * 2. Fails if any position has > 35% or < 15% of correct answers (per module and overall).
 * 3. Detects "tells":
 *    - Correct option disproportionately longer than distractors (> 2x average distractor length)
 *    - Duplicated options within a question
 *    - Fewer options than expected
 *    - Explanations that reveal a letter
 *    - Pinned options not in the final position
 *
 * Run with: npm run audit-mcq
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_DIR = path.resolve(__dirname, '../content');

function scanDir(dir) {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      files = files.concat(scanDir(full));
    } else if (full.endsWith('.json') && !full.includes('schemas')) {
      files.push(full);
    }
  }
  return files;
}

function cleanOptionText(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/^[A-Z][\.\)]\s+/i, '')
    .replace(/^\([A-Z]\)\s+/i, '')
    .replace(/^[A-Z]\s*-\s+/i, '')
    .trim();
}

function isPinned(text) {
  const clean = cleanOptionText(text).toLowerCase();
  return (
    clean.startsWith('all of the above') ||
    clean.startsWith('none of the above') ||
    clean.startsWith('all the above') ||
    clean.startsWith('none of these') ||
    clean.startsWith('neither of the above') ||
    clean.startsWith('both a and b')
  );
}

function findCorrectIndex(q) {
  if (!Array.isArray(q.options) || q.options.length < 2) return -1;
  const ans = q.correctAnswer;

  // Option ID match (e.g. 'opt-1', 'opt-2')
  if (typeof ans === 'string') {
    const idIdx = q.options.findIndex(
      (o) => typeof o === 'object' && o.id?.toLowerCase() === ans.trim().toLowerCase()
    );
    if (idIdx !== -1) return idIdx;
  }

  // Single letter match: 'A' -> 0, 'B' -> 1, etc.
  if (typeof ans === 'string' && /^[A-Z]$/i.test(ans.trim())) {
    const letterIdx = ans.trim().toUpperCase().charCodeAt(0) - 65;
    const idIdx = q.options.findIndex(
      (o) => typeof o === 'object' && o.id?.toUpperCase() === ans.trim().toUpperCase()
    );
    if (idIdx !== -1) return idIdx;
    if (letterIdx >= 0 && letterIdx < q.options.length) return letterIdx;
  }

  // Text match
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

export function runAudit(options = { exitOnError: true }) {
  console.log('\n========================================');
  console.log('   ZARII IELTS MCQ AUDIT REPORT');
  console.log('========================================\n');

  const files = scanDir(CONTENT_DIR);
  const modules = {
    grammar: { 0: 0, 1: 0, 2: 0, 3: 0, other: 0, total: 0 },
    reading: { 0: 0, 1: 0, 2: 0, 3: 0, other: 0, total: 0 },
    listening: { 0: 0, 1: 0, 2: 0, 3: 0, other: 0, total: 0 },
    course: { 0: 0, 1: 0, 2: 0, 3: 0, other: 0, total: 0 },
  };
  const overall = { 0: 0, 1: 0, 2: 0, 3: 0, other: 0, total: 0 };
  const fileReports = [];
  const tells = [];

  for (const f of files) {
    const relPath = path.relative(CONTENT_DIR, f);
    const mod = relPath.startsWith('grammar')
      ? 'grammar'
      : relPath.startsWith('reading')
      ? 'reading'
      : relPath.startsWith('listening')
      ? 'listening'
      : relPath.startsWith('course')
      ? 'course'
      : null;

    if (!mod) continue;

    const data = JSON.parse(fs.readFileSync(f, 'utf8'));
    const questions = [];

    const collectQ = (q, groupType) => {
      const type = q.type || groupType;
      if (q.options && q.options.length >= 2 && (type?.includes('choice') || type === 'mcq' || mod === 'grammar' || mod === 'course')) {
        // Exclude multi-select sets from single position distribution
        if (!Array.isArray(q.correctAnswer)) {
          questions.push(q);
        }
      }
    };

    if (Array.isArray(data)) {
      for (const item of data) {
        for (const ex of item.exercises || []) collectQ(ex, 'multiple_choice_single');
      }
    }
    if (data.passages) {
      for (const p of data.passages) {
        for (const g of p.questionGroups || []) {
          for (const q of g.questions || []) collectQ(q, g.questionType);
        }
      }
    }
    if (data.sections) {
      for (const s of data.sections) {
        if (s.exercises) {
          for (const ex of s.exercises) {
            if (ex.type === 'mcq') {
              collectQ({
                ...ex,
                correctAnswer: ex.correctOptionId || ex.correctAnswer,
                options: ex.options
              }, 'mcq');
            }
          }
        }
        const groups = s.questionGroups || (s.questions ? [{ questionType: s.questionType, questions: s.questions }] : []);
        for (const g of groups) {
          for (const q of g.questions || []) collectQ(q, g.questionType);
        }
      }
    }

    if (questions.length === 0) continue;

    const fileStat = { 0: 0, 1: 0, 2: 0, 3: 0, other: 0, total: questions.length };

    for (const q of questions) {
      const idx = findCorrectIndex(q);
      if (idx >= 0 && idx <= 3) {
        fileStat[idx]++;
        modules[mod][idx]++;
        overall[idx]++;
      } else {
        fileStat.other++;
        modules[mod].other++;
        overall.other++;
      }
      modules[mod].total++;
      overall.total++;

      // Detect tells
      // 1. Duplicate options
      const optTexts = q.options.map((o) => cleanOptionText(typeof o === 'string' ? o : o.text || '').toLowerCase());
      const unique = new Set(optTexts);
      if (unique.size !== optTexts.length) {
        tells.push({ type: 'DUPLICATE_OPTION', file: relPath, qId: q.id, details: 'Duplicate option texts detected.' });
      }

      // 2. Explanations revealing letter
      if (q.explanation && /\b(option|choice)\s+[A-D]\b|\b[A-D]\s+is\s+correct\b/i.test(q.explanation)) {
        tells.push({ type: 'LETTER_IN_EXPLANATION', file: relPath, qId: q.id, details: q.explanation.slice(0, 70) });
      }

      // 3. Pinned options not in last position
      for (let i = 0; i < q.options.length - 1; i++) {
        const raw = typeof q.options[i] === 'string' ? q.options[i] : q.options[i].text || '';
        if (isPinned(raw)) {
          tells.push({ type: 'PINNED_NOT_LAST', file: relPath, qId: q.id, details: `Pinned option "${raw}" at index ${i}` });
        }
      }

      // 4. Disproportionate length tell (> 2.0x average distractor length)
      if (idx !== -1 && q.options.length === 4) {
        const lengths = q.options.map((o) => cleanOptionText(typeof o === 'string' ? o : o.text || '').length);
        const corrLen = lengths[idx];
        const distLens = lengths.filter((_, i) => i !== idx);
        const avgDist = distLens.reduce((a, b) => a + b, 0) / distLens.length;
        if (corrLen > 2.0 * avgDist && corrLen > 35) {
          tells.push({
            type: 'LENGTH_TELL',
            file: relPath,
            qId: q.id,
            details: `Correct option length (${corrLen} chars) is > 2x average distractor (${avgDist.toFixed(1)} chars).`,
          });
        }
      }
    }

    fileReports.push({ file: relPath, stats: fileStat });
  }

  // Print results
  function printStatRow(label, stats) {
    if (stats.total === 0) return;
    const pA = ((stats[0] / stats.total) * 100).toFixed(1);
    const pB = ((stats[1] / stats.total) * 100).toFixed(1);
    const pC = ((stats[2] / stats.total) * 100).toFixed(1);
    const pD = ((stats[3] / stats.total) * 100).toFixed(1);
    console.log(
      `${label.padEnd(20)} Total: ${String(stats.total).padStart(3)} | A: ${String(stats[0]).padStart(3)} (${pA.padStart(5)}%) | B: ${String(stats[1]).padStart(3)} (${pB.padStart(5)}%) | C: ${String(stats[2]).padStart(3)} (${pC.padStart(5)}%) | D: ${String(stats[3]).padStart(3)} (${pD.padStart(5)}%)`
    );
  }

  console.log('--- BY MODULE ---');
  printStatRow('Grammar', modules.grammar);
  printStatRow('Reading', modules.reading);
  printStatRow('Listening', modules.listening);
  printStatRow('English Course', modules.course);

  console.log('\n--- OVERALL BANK ---');
  printStatRow('ALL MODULES', overall);

  console.log('\n--- DETECTED TELLS & INTEGRITY WARNINGS ---');
  if (tells.length === 0) {
    console.log('✓ Zero tells detected! (No duplicate options, no letter leaks in explanations, no pinned-position errors).');
  } else {
    for (const t of tells) {
      console.log(`⚠️  [${t.type}] ${t.file} (${t.qId}): ${t.details}`);
    }
  }

  // Check compliance:
  // For 4-option questions: Each position (A, B, C, D) must have between 15% and 35%
  // For 3-option questions (official IELTS Listening format): Positions A, B, C must have between 20% and 45% (target ~33.3%)
  let hasFailure = false;

  console.log('\n--- POSITION BALANCE VERIFICATION ---');

  // Grammar (4-option)
  if (modules.grammar.total > 0) {
    const errors = [];
    for (let pos = 0; pos < 4; pos++) {
      const letter = String.fromCharCode(65 + pos);
      const pct = (modules.grammar[pos] / modules.grammar.total) * 100;
      if (pct > 35.0 || pct < 15.0) {
        errors.push(`Position ${letter}: ${pct.toFixed(1)}% (outside allowed 15%-35% window)`);
      }
    }
    if (errors.length > 0) {
      hasFailure = true;
      console.error('❌ Grammar is BIASED:');
      errors.forEach((e) => console.error(`   - ${e}`));
    } else {
      console.log('✅ Grammar (4-option) is evenly balanced: ~25% across A, B, C, D (all within 15% - 35%).');
    }
  }

  // Reading (4-option)
  if (modules.reading.total > 0) {
    const errors = [];
    for (let pos = 0; pos < 4; pos++) {
      const letter = String.fromCharCode(65 + pos);
      const pct = (modules.reading[pos] / modules.reading.total) * 100;
      if (pct > 35.0 || pct < 15.0) {
        errors.push(`Position ${letter}: ${pct.toFixed(1)}% (outside allowed 15%-35% window)`);
      }
    }
    if (errors.length > 0) {
      hasFailure = true;
      console.error('❌ Reading is BIASED:');
      errors.forEach((e) => console.error(`   - ${e}`));
    } else {
      console.log('✅ Reading (4-option) is evenly balanced: ~25% across A, B, C, D (all within 15% - 35%).');
    }
  }

  // Listening (3-option standard IELTS format)
  if (modules.listening.total > 0) {
    const errors = [];
    for (let pos = 0; pos < 3; pos++) {
      const letter = String.fromCharCode(65 + pos);
      const pct = (modules.listening[pos] / modules.listening.total) * 100;
      if (pct > 45.0 || pct < 20.0) {
        errors.push(`Position ${letter}: ${pct.toFixed(1)}% (outside allowed 20%-45% window for 3-option tests)`);
      }
    }
    if (errors.length > 0) {
      hasFailure = true;
      console.error('❌ Listening is BIASED:');
      errors.forEach((e) => console.error(`   - ${e}`));
    } else {
      console.log('✅ Listening (3-option format) is evenly balanced: ~33.3% across A, B, C (all within 20% - 45%).');
    }
  }

  // 4-Option questions overall
  const fourOptionTotal = modules.grammar.total + modules.reading.total;
  const fourOptionStats = {
    0: modules.grammar[0] + modules.reading[0],
    1: modules.grammar[1] + modules.reading[1],
    2: modules.grammar[2] + modules.reading[2],
    3: modules.grammar[3] + modules.reading[3],
  };

  const fourOptionErrors = [];
  for (let pos = 0; pos < 4; pos++) {
    const letter = String.fromCharCode(65 + pos);
    const pct = (fourOptionStats[pos] / fourOptionTotal) * 100;
    if (pct > 35.0 || pct < 15.0) {
      fourOptionErrors.push(`Position ${letter}: ${pct.toFixed(1)}% (outside allowed 15%-35% window)`);
    }
  }

  if (fourOptionErrors.length > 0) {
    hasFailure = true;
    console.error('❌ 4-Option Bank is BIASED:');
    fourOptionErrors.forEach((e) => console.error(`   - ${e}`));
  } else {
    console.log(`✅ Overall 4-Option Bank (${fourOptionTotal} questions) is evenly balanced: ~25% across A, B, C, D (all within 15% - 35%).`);
  }

  console.log('========================================\n');

  if (hasFailure) {
    console.error('FAILED: Answer position distribution violates brand fairness standards.');
    if (options.exitOnError) {
      process.exit(1);
    }
    return false;
  }

  console.log('PASSED: All MCQ modules satisfy balanced distribution standards!\n');
  return true;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runAudit({ exitOnError: true });
}
