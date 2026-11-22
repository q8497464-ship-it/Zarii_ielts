/**
 * ARPAbet to IPA and Readable Phonetic Respelling Converter
 * 
 * Maps Carnegie Mellon University (CMU) ARPAbet phoneme sequences
 * into standard International Phonetic Alphabet (IPA) and intuitive English respellings.
 */

const ARPABET_TO_IPA = {
  // Monophthongs & Diphthongs
  'AA': 'ɑː',
  'AE': 'æ',
  'AH0': 'ə',
  'AH1': 'ʌ',
  'AH2': 'ʌ',
  'AH': 'ʌ',
  'AO': 'ɔː',
  'AW': 'aʊ',
  'AY': 'aɪ',
  'EH': 'ɛ',
  'ER0': 'ər',
  'ER1': 'ɜːr',
  'ER2': 'ɜːr',
  'ER': 'ɜːr',
  'EY': 'eɪ',
  'IH0': 'ɪ',
  'IH1': 'ɪ',
  'IH2': 'ɪ',
  'IH': 'ɪ',
  'IY': 'iː',
  'OW': 'oʊ',
  'OY': 'ɔɪ',
  'UH': 'ʊ',
  'UW': 'uː',

  // Consonants
  'B': 'b',
  'CH': 'tʃ',
  'D': 'd',
  'DH': 'ð',
  'F': 'f',
  'G': 'ɡ',
  'HH': 'h',
  'JH': 'dʒ',
  'K': 'k',
  'L': 'l',
  'M': 'm',
  'N': 'n',
  'NG': 'ŋ',
  'P': 'p',
  'R': 'r',
  'S': 's',
  'SH': 'ʃ',
  'T': 't',
  'TH': 'θ',
  'V': 'v',
  'W': 'w',
  'WH': 'hw',
  'Y': 'j',
  'Z': 'z',
  'ZH': 'ʒ',
};

const ARPABET_TO_RESPELLING = {
  // Vowels
  'AA': { unstressed: 'ah', stressed: 'AH' },
  'AE': { unstressed: 'a', stressed: 'A' },
  'AH0': { unstressed: 'uh', stressed: 'UH' },
  'AH1': { unstressed: 'uh', stressed: 'UH' },
  'AH2': { unstressed: 'uh', stressed: 'UH' },
  'AH': { unstressed: 'uh', stressed: 'UH' },
  'AO': { unstressed: 'aw', stressed: 'AW' },
  'AW': { unstressed: 'ow', stressed: 'OW' },
  'AY': { unstressed: 'eye', stressed: 'EYE' },
  'EH': { unstressed: 'eh', stressed: 'EH' },
  'ER0': { unstressed: 'er', stressed: 'ER' },
  'ER1': { unstressed: 'er', stressed: 'ER' },
  'ER2': { unstressed: 'er', stressed: 'ER' },
  'ER': { unstressed: 'er', stressed: 'ER' },
  'EY': { unstressed: 'ay', stressed: 'AY' },
  'IH': { unstressed: 'ih', stressed: 'IH' },
  'IY': { unstressed: 'ee', stressed: 'EE' },
  'OW': { unstressed: 'oh', stressed: 'OH' },
  'OY': { unstressed: 'oy', stressed: 'OY' },
  'UH': { unstressed: 'oo', stressed: 'OO' },
  'UW': { unstressed: 'oo', stressed: 'OO' },

  // Consonants
  'B': 'b',
  'CH': 'ch',
  'D': 'd',
  'DH': 'th',
  'F': 'f',
  'G': 'g',
  'HH': 'h',
  'JH': 'j',
  'K': 'k',
  'L': 'l',
  'M': 'm',
  'N': 'n',
  'NG': 'ng',
  'P': 'p',
  'R': 'r',
  'S': 's',
  'SH': 'sh',
  'T': 't',
  'TH': 'th',
  'V': 'v',
  'W': 'w',
  'WH': 'wh',
  'Y': 'y',
  'Z': 'z',
  'ZH': 'zh',
};

/**
 * Converts a sequence of ARPAbet tokens into standard IPA.
 * E.g. "AH0 B AE1 N D AH0 N" -> "/əˈbændən/"
 */
function arpabetToIpa(arpabetString) {
  if (!arpabetString || typeof arpabetString !== 'string') return '';
  const tokens = arpabetString.trim().split(/\s+/);
  let ipa = '';

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].toUpperCase();
    const stressMatch = token.match(/[012]$/);
    const stress = stressMatch ? stressMatch[0] : null;
    const base = stress ? token.slice(0, -1) : token;

    if (stress === '1') {
      ipa += 'ˈ';
    } else if (stress === '2') {
      ipa += 'ˌ';
    }

    const mapped = ARPABET_TO_IPA[token] || ARPABET_TO_IPA[base] || base.toLowerCase();
    ipa += mapped;
  }

  return `/${ipa}/`;
}

/**
 * Converts a sequence of ARPAbet tokens into a learner-friendly English respelling.
 * E.g. "AH0 B AE1 N D AH0 N" -> "uh-BAN-duhn"
 */
function arpabetToRespelling(arpabetString) {
  if (!arpabetString || typeof arpabetString !== 'string') return '';
  const tokens = arpabetString.trim().split(/\s+/);

  // Group tokens into syllables based on vowels
  const syllables = [];
  let currentSyllable = [];
  let currentStressed = false;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].toUpperCase();
    const stressMatch = token.match(/[012]$/);
    const isVowel = !!stressMatch || ['AA', 'AE', 'AH', 'AO', 'AW', 'AY', 'EH', 'ER', 'EY', 'IH', 'IY', 'OW', 'OY', 'UH', 'UW'].includes(token.replace(/[0-9]/, ''));
    const stress = stressMatch ? stressMatch[0] : '0';

    if (isVowel) {
      if (stress === '1') currentStressed = true;
      const base = token.replace(/[0-9]/, '');
      const map = ARPABET_TO_RESPELLING[token] || ARPABET_TO_RESPELLING[base] || { unstressed: base.toLowerCase(), stressed: base.toUpperCase() };
      currentSyllable.push(stress === '1' ? map.stressed : map.unstressed);

      // Check next tokens for trailing consonant or boundary
      syllables.push({ text: currentSyllable.join(''), stressed: currentStressed });
      currentSyllable = [];
      currentStressed = false;
    } else {
      const char = ARPABET_TO_RESPELLING[token] || token.toLowerCase();
      currentSyllable.push(char);
    }
  }

  if (currentSyllable.length > 0) {
    if (syllables.length > 0) {
      // Append leftover consonants to last syllable
      syllables[syllables.length - 1].text += currentSyllable.join('');
    } else {
      syllables.push({ text: currentSyllable.join(''), stressed: false });
    }
  }

  return syllables.map(s => s.stressed ? s.text.toUpperCase() : s.text.toLowerCase()).join('-');
}

module.exports = {
  arpabetToIpa,
  arpabetToRespelling,
  ARPABET_TO_IPA,
  ARPABET_TO_RESPELLING,
};
