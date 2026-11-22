/**
 * Morphological Inflection & Lemmatization Engine
 * 
 * Maps inflected forms (running, children, went, better) to their base lemmas,
 * and derives full principal inflected forms (plural, past, participle, -ing, etc.)
 * using WordNet exception tables plus deterministic linguistic rules.
 */

const fs = require('fs');
const path = require('path');

class InflectionEngine {
  constructor() {
    this.exceptions = new Map(); // inflected -> { lemma, pos }
    this.reverseExceptions = new Map(); // lemma_pos -> [inflections]
    this.isLoaded = false;
  }

  load(rawDir) {
    if (this.isLoaded) return;
    const baseDir = rawDir || path.join(process.cwd(), 'data', 'raw', 'oewn2024');

    const files = [
      { name: 'noun.exc', pos: 'noun' },
      { name: 'verb.exc', pos: 'verb' },
      { name: 'adj.exc', pos: 'adj' },
      { name: 'adv.exc', pos: 'adv' }
    ];

    for (const f of files) {
      const filePath = path.join(baseDir, f.name);
      if (!fs.existsSync(filePath)) continue;

      const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const parts = trimmed.split(/\s+/);
        if (parts.length >= 2) {
          const inflected = parts[0].toLowerCase();
          const lemma = parts[1].toLowerCase();
          this.exceptions.set(inflected, { lemma, pos: f.pos });

          const revKey = `${lemma}_${f.pos}`;
          if (!this.reverseExceptions.has(revKey)) {
            this.reverseExceptions.set(revKey, []);
          }
          this.reverseExceptions.get(revKey).push(inflected);
        }
      }
    }

    const CORE_IRREGULARS = [
      ['women', 'woman', 'noun'],
      ['leaves', 'leaf', 'noun'],
      ['furthest', 'far', 'adj'],
      ['farthest', 'far', 'adj'],
      ['less', 'little', 'adj'],
      ['least', 'little', 'adj'],
      ['more', 'much', 'adj'],
      ['most', 'much', 'adj'],
    ];

    for (const [inflected, lemma, pos] of CORE_IRREGULARS) {
      if (!this.exceptions.has(inflected)) {
        this.exceptions.set(inflected, { lemma, pos });
      }
      const revKey = `${lemma}_${pos}`;
      if (!this.reverseExceptions.has(revKey)) {
        this.reverseExceptions.set(revKey, []);
      }
      if (!this.reverseExceptions.get(revKey).includes(inflected)) {
        this.reverseExceptions.get(revKey).push(inflected);
      }
    }

    this.isLoaded = true;
  }

  /**
   * Lemmatizes any inflected word form to its base lemma.
   * E.g. "children" -> "child", "running" -> "run", "better" -> "good"
   */
  lemmatize(word, validHeadwordsSet = null) {
    if (!word || typeof word !== 'string') return word;
    const lower = word.toLowerCase().trim();

    // 1. Direct WordNet exception check
    if (this.exceptions.has(lower)) {
      return this.exceptions.get(lower).lemma;
    }

    // If word is already a valid base headword
    if (validHeadwordsSet && validHeadwordsSet.has(lower)) {
      return lower;
    }

    // 2. Rule-based morphological detachment
    // -ies -> -y (cities -> city, carries -> carry)
    if (lower.endsWith('ies') && lower.length > 4) {
      const candidate = lower.slice(0, -3) + 'y';
      if (!validHeadwordsSet || validHeadwordsSet.has(candidate)) return candidate;
    }

    // -ying -> -ie (dying -> die, tying -> tie)
    if (lower.endsWith('ying') && lower.length > 4) {
      const candidate = lower.slice(0, -4) + 'ie';
      if (!validHeadwordsSet || validHeadwordsSet.has(candidate)) return candidate;
    }

    // -ing (running -> run, making -> make, walking -> walk)
    if (lower.endsWith('ing') && lower.length > 4) {
      const stem = lower.slice(0, -3);
      // Double consonant (running -> run, stopping -> stop)
      if (stem.length > 2 && stem[stem.length - 1] === stem[stem.length - 2]) {
        const undoubled = stem.slice(0, -1);
        if (!validHeadwordsSet || validHeadwordsSet.has(undoubled)) return undoubled;
      }
      // Silent e drop (making -> make, writing -> write)
      const withE = stem + 'e';
      if (!validHeadwordsSet || validHeadwordsSet.has(withE)) return withE;
      // Direct stem (walking -> walk)
      if (!validHeadwordsSet || validHeadwordsSet.has(stem)) return stem;
    }

    // -ied -> -y (carried -> carry, tried -> try)
    if (lower.endsWith('ied') && lower.length > 4) {
      const candidate = lower.slice(0, -3) + 'y';
      if (!validHeadwordsSet || validHeadwordsSet.has(candidate)) return candidate;
    }

    // -ed (stopped -> stop, loved -> love, walked -> walk)
    if (lower.endsWith('ed') && lower.length > 3) {
      const stem = lower.slice(0, -2);
      // Double consonant (stopped -> stop)
      if (stem.length > 2 && stem[stem.length - 1] === stem[stem.length - 2]) {
        const undoubled = stem.slice(0, -1);
        if (!validHeadwordsSet || validHeadwordsSet.has(undoubled)) return undoubled;
      }
      // loved -> love
      const withE = stem + 'e';
      if (!validHeadwordsSet || validHeadwordsSet.has(withE)) return withE;
      // walked -> walk
      if (!validHeadwordsSet || validHeadwordsSet.has(stem)) return stem;
    }

    // -es (boxes -> box, watches -> watch, buses -> bus)
    if (lower.endsWith('es') && lower.length > 3) {
      const stem = lower.slice(0, -2);
      if (!validHeadwordsSet || validHeadwordsSet.has(stem)) return stem;
      const stemWithE = lower.slice(0, -1); // e.g. bites -> bite
      if (!validHeadwordsSet || validHeadwordsSet.has(stemWithE)) return stemWithE;
    }

    // -s (cats -> cat, dogs -> dog)
    if (lower.endsWith('s') && !lower.endsWith('ss') && lower.length > 2) {
      const stem = lower.slice(0, -1);
      if (!validHeadwordsSet || validHeadwordsSet.has(stem)) return stem;
    }

    // -er (faster -> fast, bigger -> big)
    if (lower.endsWith('er') && lower.length > 3) {
      const stem = lower.slice(0, -2);
      if (stem.length > 2 && stem[stem.length - 1] === stem[stem.length - 2]) {
        const undoubled = stem.slice(0, -1);
        if (!validHeadwordsSet || validHeadwordsSet.has(undoubled)) return undoubled;
      }
      if (!validHeadwordsSet || validHeadwordsSet.has(stem)) return stem;
      if (!validHeadwordsSet || validHeadwordsSet.has(stem + 'e')) return stem + 'e';
    }

    // -est (fastest -> fast, biggest -> big)
    if (lower.endsWith('est') && lower.length > 4) {
      const stem = lower.slice(0, -3);
      if (stem.length > 2 && stem[stem.length - 1] === stem[stem.length - 2]) {
        const undoubled = stem.slice(0, -1);
        if (!validHeadwordsSet || validHeadwordsSet.has(undoubled)) return undoubled;
      }
      if (!validHeadwordsSet || validHeadwordsSet.has(stem)) return stem;
      if (!validHeadwordsSet || validHeadwordsSet.has(stem + 'e')) return stem + 'e';
    }

    return lower;
  }

  /**
   * Derives grammatical forms for a given lemma and part of speech.
   */
  getForms(lemma, pos) {
    const forms = {};
    const lower = lemma.toLowerCase();
    const normalizedPos = pos === 'adjective' ? 'adj' : pos === 'adverb' ? 'adv' : pos;
    const revKey = `${lower}_${normalizedPos}`;
    const excList = this.reverseExceptions.get(revKey) || [];

    if (normalizedPos === 'noun') {
      if (excList.length > 0) {
        forms.plural = excList[0];
      } else {
        // Standard plural rule
        if (/[sxz]$|[sc]h$/i.test(lower)) {
          forms.plural = lower + 'es';
        } else if (/[bcdfghjklmnpqrstvwxyz]y$/i.test(lower)) {
          forms.plural = lower.slice(0, -1) + 'ies';
        } else {
          forms.plural = lower + 's';
        }
      }
    } else if (normalizedPos === 'verb') {
      // 1. Third person singular present
      if (/[sxz]$|[sc]h$/i.test(lower)) {
        forms.thirdPerson = lower + 'es';
      } else if (/[bcdfghjklmnpqrstvwxyz]y$/i.test(lower)) {
        forms.thirdPerson = lower.slice(0, -1) + 'ies';
      } else {
        forms.thirdPerson = lower + 's';
      }

      // 2. Continuous / -ing form
      const ingExc = excList.find(e => e.endsWith('ing'));
      const vowelCount = (lower.match(/[aeiouy]/gi) || []).length;
      const isMonosyllabicCvc = vowelCount === 1 && /[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz]$/i.test(lower) && !/[wxy]$/i.test(lower);

      if (ingExc) {
        forms.ingForm = ingExc;
      } else if (lower.endsWith('ie')) {
        forms.ingForm = lower.slice(0, -2) + 'ying';
      } else if (lower.endsWith('e') && !lower.endsWith('ee') && lower !== 'be') {
        forms.ingForm = lower.slice(0, -1) + 'ing';
      } else if (isMonosyllabicCvc) {
        // CVC double consonant (stop -> stopping, run -> running)
        forms.ingForm = lower + lower[lower.length - 1] + 'ing';
      } else {
        forms.ingForm = lower + 'ing';
      }

      // 3. Past tense & past participle
      const pastForms = excList.filter(e => !e.endsWith('ing') && !e.endsWith('s'));
      if (pastForms.length === 1) {
        forms.past = pastForms[0];
        forms.pastParticiple = pastForms[0];
      } else if (pastForms.length >= 2) {
        forms.past = pastForms[0];
        forms.pastParticiple = pastForms[1];
      } else {
        // Regular past
        if (lower.endsWith('e')) {
          forms.past = lower + 'd';
          forms.pastParticiple = lower + 'd';
        } else if (/[bcdfghjklmnpqrstvwxyz]y$/i.test(lower)) {
          forms.past = lower.slice(0, -1) + 'ied';
          forms.pastParticiple = lower.slice(0, -1) + 'ied';
        } else if (isMonosyllabicCvc) {
          forms.past = lower + lower[lower.length - 1] + 'ed';
          forms.pastParticiple = lower + lower[lower.length - 1] + 'ed';
        } else {
          forms.past = lower + 'ed';
          forms.pastParticiple = lower + 'ed';
        }
      }
    } else if (normalizedPos === 'adj') {
      const compForms = excList.filter(e => e.endsWith('er'));
      const supForms = excList.filter(e => e.endsWith('est'));

      if (compForms.length > 0) forms.comparative = compForms[0];
      if (supForms.length > 0) forms.superlative = supForms[0];

      if (!forms.comparative && lower.length <= 6) {
        if (lower.endsWith('e')) {
          forms.comparative = lower + 'r';
          forms.superlative = lower + 'st';
        } else if (lower.endsWith('y')) {
          forms.comparative = lower.slice(0, -1) + 'ier';
          forms.superlative = lower.slice(0, -1) + 'iest';
        } else if (/[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz]$/i.test(lower) && lower.length <= 4) {
          forms.comparative = lower + lower[lower.length - 1] + 'er';
          forms.superlative = lower + lower[lower.length - 1] + 'est';
        } else {
          forms.comparative = lower + 'er';
          forms.superlative = lower + 'est';
        }
      }
    }

    return forms;
  }
}

module.exports = {
  InflectionEngine,
};
