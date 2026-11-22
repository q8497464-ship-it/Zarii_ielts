/**
 * Offensive and Vulgar Lexical Filter
 * 
 * Flags vulgarities, slurs, and highly sensitive terms so they can be
 * respectfully hidden behind an optional candidate toggle ("Show all words").
 */

const OFFENSIVE_TERMS = new Set([
  'asshole', 'bastard', 'bitch', 'blowjob', 'bollocks', 'bullshit',
  'cock', 'crap', 'cunt', 'damn', 'dick', 'douche', 'fag', 'faggot',
  'fuck', 'fucked', 'fucker', 'fucking', 'motherfucker', 'nigger', 'nigga',
  'piss', 'pissed', 'prick', 'pussy', 'shit', 'shitty', 'slut', 'twat', 'wanker',
  'whore'
]);

function isOffensive(word, synsetGloss = '') {
  if (!word) return false;
  const clean = word.toLowerCase().trim().replace(/[^a-z]/g, '');

  if (OFFENSIVE_TERMS.has(clean)) return true;

  // Check gloss for WordNet usage labels
  const lowerGloss = synsetGloss.toLowerCase();
  if (
    lowerGloss.includes('(vulgar)') ||
    lowerGloss.includes('(taboo)') ||
    lowerGloss.includes('(offensive)') ||
    lowerGloss.includes('(pejorative)') ||
    lowerGloss.includes('(derogatory slang)')
  ) {
    return true;
  }

  return false;
}

module.exports = {
  isOffensive,
  OFFENSIVE_TERMS,
};
