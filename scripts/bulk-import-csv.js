/**
 * Bulk CSV Importer for Zarii IELTS
 * Converts CSV rows into Zarii-compatible JSON for vocabulary and questions.
 *
 * Usage:
 *   node scripts/bulk-import-csv.js vocab input_words.csv output_words.json
 *   node scripts/bulk-import-csv.js questions input_questions.csv output_questions.json
 */

import fs from 'fs';
import path from 'path';

const [,, mode, inputFile, outputFile] = process.argv;

if (!mode || !inputFile) {
  console.log(`
Usage:
  node scripts/bulk-import-csv.js vocab <input.csv> [output.json]
  node scripts/bulk-import-csv.js questions <input.csv> [output.json]

CSV Headers Expected:
  Vocab:     word,partOfSpeech,topic,meaning,urduMeaning,exampleSentence,collocations,synonyms,bandTarget
             (collocations & synonyms separated by semicolon ;)

  Questions: questionNumber,type,prompt,options,correctAnswer,explanation,evidence
             (options separated by semicolon ;)
`);
  process.exit(1);
}

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    // Basic CSV token parser handling quotes
    const line = lines[i];
    const values = [];
    let inQuotes = false;
    let currentToken = '';

    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentToken.trim());
        currentToken = '';
      } else {
        currentToken += char;
      }
    }
    values.push(currentToken.trim());

    const obj = {};
    headers.forEach((header, idx) => {
      obj[header] = (values[idx] || '').replace(/^"|"$/g, '');
    });
    rows.push(obj);
  }

  return rows;
}

try {
  const fullInputPath = path.resolve(process.cwd(), inputFile);
  if (!fs.existsSync(fullInputPath)) {
    console.error(`❌ Input file not found: ${fullInputPath}`);
    process.exit(1);
  }

  const rawCsv = fs.readFileSync(fullInputPath, 'utf8');
  const rows = parseCSV(rawCsv);

  let outputData;

  if (mode === 'vocab') {
    outputData = rows.map((r, idx) => ({
      id: `voc_import_${Date.now()}_${idx + 1}`,
      word: r.word || '',
      partOfSpeech: r.partOfSpeech || 'noun',
      topic: r.topic || 'general',
      meaning: r.meaning || '',
      urduMeaning: r.urduMeaning || '',
      exampleSentence: r.exampleSentence || '',
      collocations: (r.collocations || '').split(';').map((s) => s.trim()).filter(Boolean),
      synonyms: (r.synonyms || '').split(';').map((s) => s.trim()).filter(Boolean),
      bandTarget: parseFloat(r.bandTarget) || 7.5,
    }));
  } else if (mode === 'questions') {
    outputData = rows.map((r, idx) => {
      const q: any = {
        id: `q_import_${Date.now()}_${idx + 1}`,
        questionNumber: parseInt(r.questionNumber, 10) || idx + 1,
        type: r.type || 'multiple_choice_single',
        prompt: r.prompt || '',
        correctAnswer: (r.correctAnswer || '').includes(';')
          ? r.correctAnswer.split(';').map((a) => a.trim())
          : r.correctAnswer || '',
        explanation: r.explanation || '',
        evidence: r.evidence || '',
      };
      if (r.options) {
        q.options = r.options.split(';').map((o) => o.trim()).filter(Boolean);
      }
      return q;
    });
  } else {
    console.error(`❌ Unknown mode: ${mode}. Use "vocab" or "questions".`);
    process.exit(1);
  }

  const destFile = outputFile || `imported_${mode}_${Date.now()}.json`;
  const destPath = path.resolve(process.cwd(), destFile);
  fs.writeFileSync(destPath, JSON.stringify(outputData, null, 2), 'utf8');

  console.log(`✅ Successfully converted ${outputData.length} ${mode} records to:`);
  console.log(`   ${destPath}`);
} catch (err) {
  console.error('❌ Error during CSV import:', err.message);
  process.exit(1);
}
