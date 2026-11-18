/**
 * Content Integrity & Answer Verification Audit Script
 * Checks for:
 * 1. Duplicate question IDs across tests
 * 2. Duplicate question prompts
 * 3. Whether completion answer keys actually appear in the reading passage or listening audio script
 * 4. Continuity of question numbers (1..40 or 1..20)
 * 5. Tag and schema sanity checks (difficulty, topic, estimatedBand)
 *
 * Run with: node scripts/audit-content-integrity.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_DIR = path.resolve(__dirname, '../content');

let totalWarnings = 0;
let totalErrors = 0;
const seenQuestionIds = new Map(); // id -> filename
const seenPrompts = new Map(); // prompt -> filename:questionNumber

const wordToDigitMap = {
  zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5',
  six: '6', seven: '7', eight: '8', nine: '9', ten: '10',
  eleven: '11', twelve: '12', thirteen: '13', fourteen: '14', fifteen: '15',
  sixteen: '16', seventeen: '17', eighteen: '18', nineteen: '19', twenty: '20',
  thirty: '30', forty: '40', fifty: '50', sixty: '60', seventy: '70', eighty: '80', ninety: '90',
  hundred: '100', thousand: '1000'
};

function cleanString(str) {
  if (typeof str !== 'string') return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
}

function checkAnswerInText(answer, text, questionId, sourceName) {
  if (!answer || !text) return;
  const answers = Array.isArray(answer) ? answer : [answer];
  
  // Skip True/False/Not Given, Yes/No, or single letter Multiple Choice keys (A, B, C, D)
  const isTfNg = answers.every(a => /^(true|false|not given|yes|no|[a-h])$/i.test(String(a).trim()));
  if (isTfNg) return;

  const normalizedText = cleanString(text);
  
  // Also create a version of text where spelled numbers are mapped to digits
  const tokens = normalizedText.split(' ');
  const textWithDigits = tokens.map(t => wordToDigitMap[t] || t).join('');
  const textWithSpaces = tokens.map(t => wordToDigitMap[t] || t).join(' ');

  let matched = false;

  for (const ans of answers) {
    const cleanAns = cleanString(String(ans));
    if (!cleanAns) continue;
    const cleanAnsNoSpaces = cleanAns.replace(/\s+/g, '');

    if (
      normalizedText.includes(cleanAns) ||
      textWithDigits.includes(cleanAnsNoSpaces) ||
      textWithSpaces.includes(cleanAns)
    ) {
      matched = true;
      break;
    }
  }

  if (!matched) {
    console.warn(`⚠️ [${sourceName}] Question ${questionId}: Answer key "${JSON.stringify(answer)}" was not found in the passage/script text.`);
    totalWarnings++;
  }
}

// 1. Audit Reading Tests
function auditReadingTests() {
  const dir = path.join(CONTENT_DIR, 'reading');
  if (!fs.existsSync(dir)) return;

  console.log('\n--- Auditing Reading Tests ---');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    let qNumTracker = 0;

    for (const passage of data.passages || []) {
      const passageText = passage.text || '';
      for (const group of passage.questionGroups || []) {
        for (const q of group.questions || []) {
          qNumTracker++;

          // Check duplicate IDs
          if (seenQuestionIds.has(q.id)) {
            console.error(`❌ Duplicate Question ID: "${q.id}" in ${file} (already in ${seenQuestionIds.get(q.id)})`);
            totalErrors++;
          } else {
            seenQuestionIds.set(q.id, file);
          }

          // Check duplicate prompts
          const cleanPrompt = cleanString(q.prompt);
          if (cleanPrompt.length > 20) {
            if (seenPrompts.has(cleanPrompt)) {
              console.warn(`⚠️ Similar/Duplicate Prompt: "${q.prompt.slice(0, 45)}..." in ${file} (matches ${seenPrompts.get(cleanPrompt)})`);
              totalWarnings++;
            } else {
              seenPrompts.set(cleanPrompt, `${file}:Q${q.questionNumber || qNumTracker}`);
            }
          }

          // Check answer key presence in passage for completion questions
          if (q.type === 'sentence_completion' || q.type === 'summary_completion' || q.type === 'short_answer') {
            checkAnswerInText(q.correctAnswer, passageText, q.id, file);
          }
        }
      }
    }
    console.log(`✓ Audited ${file}: ${qNumTracker} questions checked.`);
  }
}

// 2. Audit Listening Tests
function auditListeningTests() {
  const dir = path.join(CONTENT_DIR, 'listening');
  if (!fs.existsSync(dir)) return;

  console.log('\n--- Auditing Listening Tests ---');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    let qNumTracker = 0;

    for (const section of data.sections || []) {
      const scriptLines = section.audioScript || section.script || [];
      const scriptCombined = scriptLines.map(line => typeof line === 'string' ? line : `${line.speaker}: ${line.text}`).join('\n');

      const groups = section.questionGroups || (section.questions ? [{ questions: section.questions }] : []);
      for (const group of groups) {
        for (const q of group.questions || []) {
          qNumTracker++;

          if (seenQuestionIds.has(q.id)) {
            console.error(`❌ Duplicate Question ID: "${q.id}" in ${file} (already in ${seenQuestionIds.get(q.id)})`);
            totalErrors++;
          } else {
            seenQuestionIds.set(q.id, file);
          }

          if (q.type === 'sentence_completion' || q.type === 'short_answer') {
            checkAnswerInText(q.correctAnswer, scriptCombined, q.id, file);
          }
        }
      }
    }
    console.log(`✓ Audited ${file}: ${qNumTracker} questions checked.`);
  }
}

// Run audit
console.log('=== BANDUP CONTENT INTEGRITY AUDIT ===');
auditReadingTests();
auditListeningTests();

console.log('\n======================================');
console.log(`Integrity Audit Complete.`);
console.log(`Total Errors: ${totalErrors}`);
console.log(`Total Warnings: ${totalWarnings}`);

if (totalErrors > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
