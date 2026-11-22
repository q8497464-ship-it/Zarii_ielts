/**
 * WordNet 2024 Database Parser
 * 
 * High-performance parser for Princeton/Open English WordNet WNDB format.
 * Extracts synsets, definitions, examples, domains, synonyms, and antonyms.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

class WordNetParser {
  constructor(oewnDir) {
    this.oewnDir = oewnDir || path.join(process.cwd(), 'data', 'raw', 'oewn2024');
    this.lexnames = new Map(); // id -> category domain string
    this.synsets = new Map(); // "offset_pos" -> synset
    this.lemmaMap = new Map(); // "word_pos" -> { word, pos, senses: [] }
  }

  loadLexnames() {
    const file = path.join(this.oewnDir, 'lexnames');
    if (!fs.existsSync(file)) return;
    const lines = fs.readFileSync(file, 'utf-8').split('\n');
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 2) {
        const num = parts[0].padStart(2, '0');
        const name = parts[1].replace(/^(?:noun|verb|adj|adv)\./, '');
        this.lexnames.set(num, name);
      }
    }
  }

  async parseDataFile(filename, posName, ssType) {
    const file = path.join(this.oewnDir, filename);
    if (!fs.existsSync(file)) {
      console.warn(`WordNet data file missing: ${file}`);
      return;
    }

    const fileStream = fs.createReadStream(file);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const trimmed = line.trim();
      // Skip license headers (must start with 8-digit offset and 2-digit lex file)
      if (!trimmed || trimmed.startsWith('  ') || !/^\d{8}\s+\d{2}\s+[nvasr]\b/.test(trimmed)) {
        continue;
      }

      const pipeIndex = trimmed.indexOf('|');
      if (pipeIndex === -1) continue;

      const meta = trimmed.slice(0, pipeIndex).trim();
      const gloss = trimmed.slice(pipeIndex + 1).trim();

      const parts = meta.split(/\s+/);
      if (parts.length < 5) continue;

      const offset = parts[0];
      const lexFile = parts[1];
      const type = parts[2];
      const wCnt = parseInt(parts[3], 16);

      if (isNaN(wCnt) || wCnt <= 0) continue;

      let idx = 4;
      const words = [];
      for (let i = 0; i < wCnt; i++) {
        if (parts[idx]) {
          words.push(parts[idx].replace(/_/g, ' '));
        }
        idx += 2; // skip lex_id
      }

      const pCnt = parseInt(parts[idx], 10);
      idx += 1;

      const antonymOffsets = [];
      const hypernymOffsets = [];

      if (!isNaN(pCnt)) {
        for (let i = 0; i < pCnt; i++) {
          const sym = parts[idx];
          const targetOffset = parts[idx + 1];
          const targetPos = parts[idx + 2];
          if (sym === '!') {
            antonymOffsets.push(`${targetOffset}_${targetPos}`);
          } else if (sym === '@') {
            hypernymOffsets.push(`${targetOffset}_${targetPos}`);
          }
          idx += 4;
        }
      }

      // Parse gloss into definitions and example sentences
      // Examples in WordNet glosses are delimited in double quotes e.g. "a simple task"
      const defParts = [];
      const examples = [];
      const rawClauses = gloss.split(';');

      for (const clause of rawClauses) {
        const cTrimmed = clause.trim();
        if (cTrimmed.startsWith('"') && cTrimmed.endsWith('"')) {
          examples.push(cTrimmed.slice(1, -1));
        } else if (cTrimmed.startsWith('"')) {
          // In case quotes contain internal punctuation
          examples.push(cTrimmed.replace(/^"|"$/g, ''));
        } else if (cTrimmed) {
          defParts.push(cTrimmed);
        }
      }

      const definition = defParts.join('; ').trim();
      const domain = this.lexnames.get(lexFile) || 'general';

      const synsetObj = {
        offset,
        pos: posName,
        ssType: type,
        words,
        definition,
        examples,
        domain,
        antonymOffsets,
        hypernymOffsets,
        gloss,
      };

      const synsetKey = `${offset}_${ssType}`;
      this.synsets.set(synsetKey, synsetObj);

      // Map to lemma entries
      for (const w of words) {
        const lowerWord = w.toLowerCase();
        const key = `${lowerWord}_${posName}`;

        if (!this.lemmaMap.has(key)) {
          this.lemmaMap.set(key, {
            headword: w,
            pos: posName,
            senses: [],
          });
        }

        const lemmaEntry = this.lemmaMap.get(key);
        // Synonyms in this sense are other words in the synset
        const synonyms = words.filter(sw => sw.toLowerCase() !== lowerWord);

        lemmaEntry.senses.push({
          def: definition,
          examples,
          synonyms,
          antonyms: [], // resolved in second pass
          antonymOffsets,
          domain,
          gloss,
        });
      }
    }
  }

  async parseAll() {
    this.loadLexnames();
    console.log('Parsing WordNet data.noun...');
    await this.parseDataFile('data.noun', 'noun', 'n');
    console.log('Parsing WordNet data.verb...');
    await this.parseDataFile('data.verb', 'verb', 'v');
    console.log('Parsing WordNet data.adj...');
    await this.parseDataFile('data.adj', 'adjective', 'a');
    console.log('Parsing WordNet data.adv...');
    await this.parseDataFile('data.adv', 'adverb', 'r');

    console.log(`Loaded ${this.synsets.size} synsets and ${this.lemmaMap.size} lemma-POS pairings.`);

    // Second pass: resolve antonym words from offsets
    for (const lemmaEntry of this.lemmaMap.values()) {
      for (const sense of lemmaEntry.senses) {
        if (sense.antonymOffsets && sense.antonymOffsets.length > 0) {
          const antonymWords = [];
          for (const aKey of sense.antonymOffsets) {
            const targetSyn = this.synsets.get(aKey);
            if (targetSyn && targetSyn.words) {
              antonymWords.push(...targetSyn.words);
            }
          }
          sense.antonyms = Array.from(new Set(antonymWords));
        }
        delete sense.antonymOffsets;
      }
    }

    return this.lemmaMap;
  }
}

module.exports = {
  WordNetParser,
};
