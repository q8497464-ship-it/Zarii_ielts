/**
 * Content Validation Script for Zarii IELTS
 * Validates every JSON test and resource in /content for schema compliance.
 * Run with: npm run validate-content
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { runAudit } from './audit-mcq.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_DIR = path.resolve(__dirname, '../content');

let errorsFound = 0;
let filesChecked = 0;
let questionsChecked = 0;

function logError(file, message) {
  console.error(`❌ [${path.relative(CONTENT_DIR, file)}] ${message}`);
  errorsFound += 1;
}

function logSuccess(file, detail) {
  console.log(`✓ [${path.relative(CONTENT_DIR, file)}] ${detail}`);
  filesChecked += 1;
}

// 1. Validate Reading Tests
function validateReadingFiles() {
  const dir = path.join(CONTENT_DIR, 'reading');
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  for (const file of files) {
    const fullPath = path.join(dir, file);
    try {
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      if (!data.id) logError(fullPath, 'Missing root "id"');
      if (!data.title) logError(fullPath, 'Missing root "title"');
      if (!Array.isArray(data.passages) || data.passages.length === 0) {
        logError(fullPath, 'Missing or empty "passages" array');
        continue;
      }

      let qCount = 0;
      for (const p of data.passages) {
        if (!p.title) logError(fullPath, `Passage ${p.passageNumber} missing title`);
        if (!p.text || p.text.length < 100) logError(fullPath, `Passage ${p.passageNumber} text is too short or missing`);
        if (!Array.isArray(p.questionGroups)) {
          logError(fullPath, `Passage ${p.passageNumber} missing questionGroups`);
          continue;
        }

        for (const g of p.questionGroups) {
          for (const q of g.questions || []) {
            qCount += 1;
            questionsChecked += 1;
            if (!q.id) logError(fullPath, `Question #${q.questionNumber || qCount} missing id`);
            if (!q.prompt) logError(fullPath, `Question ${q.id} missing prompt`);
            if (q.correctAnswer === undefined || q.correctAnswer === null || q.correctAnswer === '') {
              logError(fullPath, `Question ${q.id} missing correctAnswer`);
            }
          }
        }
      }
      logSuccess(fullPath, `Valid reading test (${data.passages.length} passages, ${qCount} questions)`);
    } catch (e) {
      logError(fullPath, `JSON parse error: ${e.message}`);
    }
  }
}

// 2. Validate Listening Tests
function validateListeningFiles() {
  const dir = path.join(CONTENT_DIR, 'listening');
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  for (const file of files) {
    const fullPath = path.join(dir, file);
    try {
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      if (!data.id) logError(fullPath, 'Missing root "id"');
      if (!data.title) logError(fullPath, 'Missing root "title"');
      if (!Array.isArray(data.sections) || data.sections.length === 0) {
        logError(fullPath, 'Missing or empty "sections" array');
        continue;
      }

      let qCount = 0;
      for (const s of data.sections) {
        if (!s.title) logError(fullPath, `Section ${s.sectionNumber} missing title`);
        const scriptLines = s.audioScript || s.script;
        if (!Array.isArray(scriptLines) || scriptLines.length === 0) {
          logError(fullPath, `Section ${s.sectionNumber} missing script lines`);
        }

        // Support both direct questions or questionGroups
        const groups = s.questionGroups || (s.questions ? [{ questions: s.questions }] : []);
        if (groups.length === 0) {
          logError(fullPath, `Section ${s.sectionNumber} missing questionGroups or questions`);
          continue;
        }

        for (const g of groups) {
          for (const q of g.questions || []) {
            qCount += 1;
            questionsChecked += 1;
            if (!q.id) logError(fullPath, `Question #${q.questionNumber || qCount} missing id`);
            if (!q.prompt) logError(fullPath, `Question ${q.id} missing prompt`);
            if (q.correctAnswer === undefined || q.correctAnswer === null || q.correctAnswer === '') {
              logError(fullPath, `Question ${q.id} missing correctAnswer`);
            }
          }
        }
      }
      logSuccess(fullPath, `Valid listening test (${data.sections.length} sections, ${qCount} questions)`);
    } catch (e) {
      logError(fullPath, `JSON parse error: ${e.message}`);
    }
  }
}

// 3. Validate Writing Prompts
function validateWritingFiles() {
  const dir = path.join(CONTENT_DIR, 'writing');
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  for (const file of files) {
    const fullPath = path.join(dir, file);
    try {
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (!item.id) logError(fullPath, 'Prompt missing id');
        if (!item.title) logError(fullPath, `Prompt ${item.id} missing title`);
        const promptText = item.promptText || item.prompt;
        if (!promptText) logError(fullPath, `Prompt ${item.id} missing promptText or prompt`);
        
        const sample = item.sampleAnswers?.[0]?.text || item.modelAnswer;
        if (!sample || sample.length < 50) {
          logError(fullPath, `Prompt ${item.id} missing or incomplete sample answer`);
        }
      }
      logSuccess(fullPath, `Valid writing prompts (${items.length} prompts)`);
    } catch (e) {
      logError(fullPath, `JSON parse error: ${e.message}`);
    }
  }
}

// 4. Validate Vocabulary & Phrases
function validateVocabFiles() {
  const dir = path.join(CONTENT_DIR, 'vocab');
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  for (const file of files) {
    const fullPath = path.join(dir, file);
    try {
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      if (file === 'academic-words.json') {
        if (!Array.isArray(data) || data.length < 200) {
          logError(fullPath, `academic-words.json expected at least 200 words, found ${data?.length}`);
        }
        for (const w of data) {
          if (!w.word || !w.meaning || !w.exampleSentence || !w.urduMeaning) {
            logError(fullPath, `Word ${w.id || w.word} missing required definitions or Urdu`);
          }
        }
        logSuccess(fullPath, `Valid academic vocabulary (${data.length} words with Urdu & collocations)`);
      } else if (file === 'phrase-bank.json') {
        let count = 0;
        for (const cat of data) {
          count += cat.phrases?.length || 0;
        }
        logSuccess(fullPath, `Valid writing phrase bank (${data.length} categories, ${count} phrases)`);
      }
    } catch (e) {
      logError(fullPath, `JSON parse error: ${e.message}`);
    }
  }
}

// 5. Validate Grammar
function validateGrammarFiles() {
  const file = path.join(CONTENT_DIR, 'grammar', 'lessons.json');
  if (!fs.existsSync(file)) return;

  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!Array.isArray(data) || data.length < 15) {
      logError(file, `lessons.json expected at least 15 lessons, found ${data?.length}`);
    }
    let totalExercises = 0;
    for (const l of data) {
      if (!l.id || !l.title || !l.explanation) logError(file, `Lesson ${l.id} missing title or explanation`);
      if (!Array.isArray(l.exercises) || l.exercises.length < 10) {
        logError(file, `Lesson ${l.id} has fewer than 10 exercises`);
      }
      totalExercises += l.exercises?.length || 0;
      for (const ex of l.exercises || []) {
        if (!ex.prompt || !ex.correctAnswer || !ex.explanation) {
          logError(file, `Exercise ${ex.id} missing prompt, answer, or explanation`);
        }
      }
    }
    logSuccess(file, `Valid grammar lessons (${data.length} lessons, ${totalExercises} interactive exercises)`);
  } catch (e) {
    logError(file, `JSON parse error: ${e.message}`);
  }
}

console.log('\n--- Zarii IELTS Content Validator ---');
validateReadingFiles();
validateListeningFiles();
validateWritingFiles();
validateVocabFiles();
validateGrammarFiles();

// Execute MCQ Position and Balance Audit
const isMcqBalanced = runAudit({ exitOnError: false });
if (!isMcqBalanced) {
  errorsFound += 1;
}

console.log('\n----------------------------------------');
if (errorsFound === 0) {
  console.log(`✅ All content files validated successfully!`);
  console.log(`   Checked ${filesChecked} files and verified ${questionsChecked} individual exam questions.\n`);
  process.exit(0);
} else {
  console.error(`❌ Validation failed with ${errorsFound} errors.\n`);
  process.exit(1);
}
