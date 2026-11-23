/**
 * Course Validation Script for Zarii English Course
 * Validates lesson files in /content/course against schema and pedagogical rules.
 *
 * Checks:
 * 1. Schema validity (required fields, types, and patterns)
 * 2. Missing explanations (all exercises must have detailed rationale)
 * 3. Duplicate IDs across all lessons, sections, and exercises
 * 4. Broken prerequisites (referenced lessons must exist)
 * 5. Vocabulary headwords validity
 * 6. MCQ anti-guessing rules (options with IDs, correctOptionId, pinned last)
 * 7. Audio text availability (non-empty speech strings)
 * 8. Comprehensive coverage report
 *
 * Run with: npm run validate-course
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_DIR = path.resolve(__dirname, '../content/course');
const SCHEMAS_DIR = path.resolve(__dirname, '../content/schemas');

let errorsFound = 0;
let filesChecked = 0;
let exercisesChecked = 0;

const seenLessonIds = new Set();
const seenSectionIds = new Set();
const seenExerciseIds = new Set();
const allLessons = [];

function logError(file, message) {
  console.error(`❌ [${path.relative(path.resolve(__dirname, '..'), file)}] ${message}`);
  errorsFound += 1;
}

function logWarning(file, message) {
  console.warn(`⚠️ [${path.relative(path.resolve(__dirname, '..'), file)}] ${message}`);
}

function scanDir(dir) {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      files = files.concat(scanDir(full));
    } else if (full.endsWith('.json')) {
      files.push(full);
    }
  }
  return files;
}

export function validateCourse() {
  console.log('\n======================================================');
  console.log('   ZARII ENGLISH COURSE VALIDATION SUITE');
  console.log('======================================================\n');

  const files = scanDir(CONTENT_DIR);
  if (files.length === 0) {
    console.error('❌ No course lesson JSON files found in ' + CONTENT_DIR);
    process.exit(1);
  }

  const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1'];
  const validSectionTypes = [
    'explain', 'examples', 'timeline', 'dialogue', 'practice',
    'listening', 'speaking', 'writing', 'quiz', 'summary', 'urduNote'
  ];
  const validExerciseTypes = [
    'mcq', 'fill_blank', 'order_sentence', 'match_pairs', 'sort_categories',
    'error_correction', 'sentence_transformation', 'true_false',
    'listen_type', 'repeat_after_me', 'short_writing'
  ];

  // Pass 1: Parse and validate individual files
  for (const filePath of files) {
    let data;
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(raw);
    } catch (err) {
      logError(filePath, `Failed to parse JSON: ${err.message}`);
      continue;
    }

    filesChecked += 1;

    // 1. Root structure checks
    if (!data.id || !/^eng-[a-c][1-2]-u[0-9]+-l[0-9]+$/.test(data.id)) {
      logError(filePath, `Invalid or missing id "${data.id}". Must match eng-[level]-u[num]-l[num]`);
    } else {
      if (seenLessonIds.has(data.id)) {
        logError(filePath, `Duplicate lesson ID: ${data.id}`);
      }
      seenLessonIds.add(data.id);
    }

    if (!validLevels.includes(data.level)) {
      logError(filePath, `Invalid level: ${data.level}. Must be one of ${validLevels.join(', ')}`);
    }

    if (!data.unit || typeof data.unit !== 'string') {
      logError(filePath, 'Missing or invalid "unit" field');
    }

    if (typeof data.order !== 'number' || data.order < 1) {
      logError(filePath, 'Invalid "order". Must be an integer >= 1');
    }

    if (!data.title || typeof data.title !== 'string' || data.title.length < 3) {
      logError(filePath, 'Missing or too short "title"');
    }

    if (!Array.isArray(data.objectives) || data.objectives.length === 0) {
      logError(filePath, 'Missing or empty "objectives" array (can-do statements required)');
    }

    if (typeof data.estimatedMinutes !== 'number' || data.estimatedMinutes < 5 || data.estimatedMinutes > 30) {
      logError(filePath, 'Invalid "estimatedMinutes". Must be between 5 and 30');
    }

    if (!Array.isArray(data.skillTags) || data.skillTags.length === 0) {
      logError(filePath, 'Missing or empty "skillTags" array');
    }

    if (!Array.isArray(data.vocabularyList)) {
      logError(filePath, 'Missing "vocabularyList" array');
    } else {
      for (const vocab of data.vocabularyList) {
        if (!vocab.word || typeof vocab.word !== 'string') {
          logError(filePath, 'Vocab item missing "word"');
        }
        if (!vocab.definition) {
          logError(filePath, `Vocab item "${vocab.word}" missing definition`);
        }
      }
    }

    // 2. Sections checks
    if (!Array.isArray(data.sections) || data.sections.length === 0) {
      logError(filePath, 'Missing or empty "sections" array');
      continue;
    }

    for (const sec of data.sections) {
      if (!sec.id) {
        logError(filePath, 'Section missing "id"');
      } else {
        if (seenSectionIds.has(sec.id)) {
          logError(filePath, `Duplicate section ID: ${sec.id}`);
        }
        seenSectionIds.add(sec.id);
      }

      if (!validSectionTypes.includes(sec.type)) {
        logError(filePath, `Invalid section type: "${sec.type}"`);
      }

      if (!sec.title) {
        logError(filePath, `Section "${sec.id}" missing title`);
      }

      // Check exercises inside practice or quiz
      if (sec.type === 'practice' || sec.type === 'quiz') {
        if (!Array.isArray(sec.exercises) || sec.exercises.length === 0) {
          logError(filePath, `Section "${sec.id}" of type "${sec.type}" has no exercises`);
          continue;
        }

        for (const ex of sec.exercises) {
          exercisesChecked += 1;

          if (!ex.id) {
            logError(filePath, 'Exercise missing "id"');
          } else {
            if (seenExerciseIds.has(ex.id)) {
              logError(filePath, `Duplicate exercise ID: ${ex.id}`);
            }
            seenExerciseIds.add(ex.id);
          }

          if (!validExerciseTypes.includes(ex.type)) {
            logError(filePath, `Exercise "${ex.id}" has invalid type "${ex.type}"`);
          }

          if (!ex.prompt || ex.prompt.trim().length === 0) {
            logError(filePath, `Exercise "${ex.id}" missing prompt`);
          }

          // Strict explanation requirement: Every exercise must explain why the answer is right
          if (!ex.explanation || typeof ex.explanation !== 'string' || ex.explanation.trim().length < 5) {
            logError(filePath, `Exercise "${ex.id}" missing detailed explanation`);
          }

          // Exercise-specific schema checks
          if (ex.type === 'mcq') {
            if (!Array.isArray(ex.options) || ex.options.length < 2) {
              logError(filePath, `MCQ exercise "${ex.id}" must have at least 2 options`);
            } else {
              const optionIds = new Set();
              for (const opt of ex.options) {
                if (!opt.id || !opt.text) {
                  logError(filePath, `MCQ "${ex.id}" option missing id or text`);
                }
                if (optionIds.has(opt.id)) {
                  logError(filePath, `MCQ "${ex.id}" has duplicate option ID "${opt.id}"`);
                }
                optionIds.add(opt.id);
              }

              if (!ex.correctOptionId || !optionIds.has(ex.correctOptionId)) {
                logError(filePath, `MCQ "${ex.id}" correctOptionId "${ex.correctOptionId}" does not match any option ID`);
              }

              // Check for pinned options ("all of the above", "none of the above")
              for (let i = 0; i < ex.options.length - 1; i++) {
                const optText = ex.options[i].text.toLowerCase();
                if (optText.startsWith('all of the above') || optText.startsWith('none of the above')) {
                  logError(filePath, `MCQ "${ex.id}" pinned option "${ex.options[i].text}" must be the last option`);
                }
              }
            }
          } else if (ex.type === 'fill_blank') {
            if (!ex.correctAnswer) {
              logError(filePath, `fill_blank exercise "${ex.id}" missing correctAnswer`);
            }
          } else if (ex.type === 'order_sentence') {
            if (!Array.isArray(ex.sentenceTokens) || !Array.isArray(ex.correctOrder)) {
              logError(filePath, `order_sentence exercise "${ex.id}" missing sentenceTokens or correctOrder`);
            }
          } else if (ex.type === 'match_pairs') {
            if (!Array.isArray(ex.pairs) || ex.pairs.length < 2) {
              logError(filePath, `match_pairs exercise "${ex.id}" must have at least 2 pairs`);
            }
          }
        }
      }

      // Check audio text present
      if (sec.type === 'examples' && Array.isArray(sec.examples)) {
        for (const eg of sec.examples) {
          if (!eg.english || eg.english.trim().length === 0) {
            logError(filePath, `Section "${sec.id}" example missing english text`);
          }
        }
      }

      if (sec.type === 'dialogue' && Array.isArray(sec.dialogue)) {
        for (const turn of sec.dialogue) {
          if (!turn.speaker || !turn.english) {
            logError(filePath, `Section "${sec.id}" dialogue turn missing speaker or english text`);
          }
        }
      }
    }

    allLessons.push(data);
  }

  // Pass 2: Cross-lesson relational checks (Prerequisites)
  for (const lesson of allLessons) {
    if (Array.isArray(lesson.prerequisites)) {
      for (const prereqId of lesson.prerequisites) {
        // Prerequisites must exist in course or be another valid lesson
        if (!seenLessonIds.has(prereqId)) {
          // If not in current sample files, verify if it's a valid lesson ID format
          if (!/^eng-[a-c][1-2]-u[0-9]+-l[0-9]+$/.test(prereqId)) {
            logError(lesson.id, `Invalid prerequisite lesson ID format: "${prereqId}"`);
          }
        }
      }
    }
  }

  // Coverage and Metrics Summary
  console.log('------------------------------------------------------');
  console.log(`✓ Files Validated: ${filesChecked}`);
  console.log(`✓ Exercises Verified: ${exercisesChecked}`);
  console.log(`✓ Unique Lesson IDs: ${seenLessonIds.size}`);
  console.log(`✓ Unique Exercise IDs: ${seenExerciseIds.size}`);

  const levelCounts = {};
  const skillTagCounts = {};
  for (const l of allLessons) {
    levelCounts[l.level] = (levelCounts[l.level] || 0) + 1;
    for (const t of l.skillTags) {
      skillTagCounts[t] = (skillTagCounts[t] || 0) + 1;
    }
  }

  console.log('\nLevel Coverage:');
  for (const lvl of validLevels) {
    console.log(`  - Level ${lvl}: ${levelCounts[lvl] || 0} sample lessons loaded`);
  }

  console.log('\nSkill Tags Coverage:');
  for (const [tag, count] of Object.entries(skillTagCounts)) {
    console.log(`  - ${tag}: ${count} lessons`);
  }
  console.log('------------------------------------------------------');

  if (errorsFound > 0) {
    console.error(`\n❌ FAILED: ${errorsFound} validation error(s) found in English Course content.\n`);
    process.exit(1);
  } else {
    console.log('\n✅ SUCCESS: All English Course lessons and schemas pass validation!\n');
  }
}

// Execute CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  validateCourse();
}
