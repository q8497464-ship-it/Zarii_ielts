/**
 * MCQ Position Rebalancer & Content Fixer for Zarii IELTS
 *
 * Rebalances stored MCQ content so correct answers are evenly spread across A, B, C, D (~25% each).
 * 1. Strips baked-in prefixes ("A) ", "A. ") from options.
 * 2. Reorders options according to a round-robin target position across 0..3 (A..D).
 * 3. Keeps pinned options ("All of the above", "None of the above") in the final position.
 * 4. Updates correctAnswer (letter or text) to match the new position.
 * 5. Updates explanations that reveal letters.
 * 6. Fixes length disparity tells in specific reading questions.
 *
 * Run with: npm run fix-mcq-positions
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
    clean.startsWith('all of these') ||
    clean.startsWith('both a and b')
  );
}

function findCorrectIndex(q) {
  if (!Array.isArray(q.options) || q.options.length < 2) return -1;
  const ans = q.correctAnswer;

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

export function rebalanceAllMcqs() {
  console.log('\n========================================');
  console.log('   ZARII MCQ REBALANCING PIPELINE');
  console.log('========================================\n');

  const files = scanDir(CONTENT_DIR);
  let totalRebalanced = 0;

  // Specific length tell balance adjustments
  const lengthFixes = {
    'g4-q32': [
      'generate noticeably lower retail revenue than motorists.',
      'visit stores more frequently and spend up to 40% more monthly.',
      'restrict their purchases strictly to basic food items.',
      'repeatedly demand greater availability of parking spaces.',
    ],
    'g5-q29': [
      'feature wooden roof structures shielded from rain.',
      'resemble vertical cliff faces offering secure nesting ledges.',
      'house indoor pigeon colonies that ensure constant food.',
      'generate artificial heat that keeps them warm in winter.',
    ],
    'g5-q32': [
      'burning their feathers on lamppost fixtures.',
      'suppressing the hormone melatonin and disturbing sleep cycles.',
      'making nocturnally active insects impossible to locate.',
      'destroying their delicate retinal photoreceptors permanently.',
    ],
    'g6-q32': [
      'retains sufficient internal moisture to prevent ignition.',
      'slowly mineralizes back into non-flammable limestone.',
      'contains dense synthetic retardants blended during mixing.',
      'releases carbon monoxide that suffocates open combustion.',
    ],
  };

  // Distinct round-robin counters per module
  const moduleCounters = {
    grammar: 0,
    reading: 0,
    listening: 0,
  };

  for (const f of files) {
    const relPath = path.relative(CONTENT_DIR, f);
    const mod = relPath.startsWith('grammar')
      ? 'grammar'
      : relPath.startsWith('reading')
      ? 'reading'
      : relPath.startsWith('listening')
      ? 'listening'
      : null;

    if (!mod) continue;

    const data = JSON.parse(fs.readFileSync(f, 'utf8'));
    let fileModified = false;

    const rebalanceQuestion = (q, groupType) => {
      const type = q.type || groupType;
      if (!q.options || q.options.length < 2 || (!type?.includes('choice') && mod !== 'grammar')) {
        return;
      }
      // Skip multi-select questions
      if (Array.isArray(q.correctAnswer)) return;

      const originalCorrectIdx = findCorrectIndex(q);
      if (originalCorrectIdx === -1) return;

      // Check if this question has a length balance fix
      let cleanOpts;
      if (lengthFixes[q.id]) {
        cleanOpts = [...lengthFixes[q.id]];
      } else {
        cleanOpts = q.options.map((o) => cleanOptionText(typeof o === 'string' ? o : o.text || ''));
      }

      const correctOptionText = cleanOpts[originalCorrectIdx];

      // Separate unpinned from pinned
      const unpinned = [];
      const pinned = [];
      for (let i = 0; i < cleanOpts.length; i++) {
        if (isPinned(cleanOpts[i])) {
          pinned.push(cleanOpts[i]);
        } else {
          unpinned.push(cleanOpts[i]);
        }
      }

      // If correct option is unpinned, pick target index in unpinned
      const targetPos = moduleCounters[mod] % unpinned.length;
      moduleCounters[mod]++;

      const distractors = unpinned.filter((t) => t !== correctOptionText);
      const newUnpinned = [];

      for (let i = 0; i < unpinned.length; i++) {
        if (i === targetPos) {
          newUnpinned.push(correctOptionText);
        } else {
          newUnpinned.push(distractors.shift());
        }
      }

      const finalOptions = [...newUnpinned, ...pinned];
      const newCorrectIdx = finalOptions.indexOf(correctOptionText);

      // Update options
      q.options = finalOptions;

      // Update correctAnswer
      if (typeof q.correctAnswer === 'string' && /^[A-Z]$/i.test(q.correctAnswer.trim())) {
        q.correctAnswer = String.fromCharCode(65 + newCorrectIdx);
      } else {
        // Text-based or grammar
        q.correctAnswer = correctOptionText;
      }

      // Update explanation if it contained a hardcoded letter
      if (q.explanation) {
        q.explanation = q.explanation
          .replace(/Option [A-D] is correct/i, 'The correct answer is')
          .replace(/Option [A-D] /gi, 'This option ')
          .replace(/\b[A-D] is correct\b/i, 'The statement is correct')
          .trim();
      }

      fileModified = true;
      totalRebalanced++;
    };

    if (Array.isArray(data)) {
      for (const item of data) {
        for (const ex of item.exercises || []) rebalanceQuestion(ex, 'multiple_choice_single');
      }
    }
    if (data.passages) {
      for (const p of data.passages) {
        for (const g of p.questionGroups || []) {
          for (const q of g.questions || []) rebalanceQuestion(q, g.questionType);
        }
      }
    }
    if (data.sections) {
      for (const s of data.sections) {
        const groups = s.questionGroups || (s.questions ? [{ questionType: s.questionType, questions: s.questions }] : []);
        for (const g of groups) {
          for (const q of g.questions || []) rebalanceQuestion(q, g.questionType);
        }
      }
    }

    if (fileModified) {
      fs.writeFileSync(f, JSON.stringify(data, null, 2) + '\n', 'utf8');
      console.log(`✓ Rebalanced: ${relPath}`);
    }
  }

  console.log(`\nSuccessfully rebalanced ${totalRebalanced} MCQ questions across all content files!`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  rebalanceAllMcqs();
}
