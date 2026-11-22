/**
 * Rule-Based Learner-Friendly Definition Shortener
 * 
 * Generates concise (first clause under 18 words) definitions for ESL/IELTS learners
 * purely using deterministic linguistic rules with 0 paid AI.
 */

function shortenDefinition(fullDef) {
  if (!fullDef || typeof fullDef !== 'string') return '';

  let clean = fullDef.trim();

  // 1. Remove leading domain or usage tags e.g. "(zoology)", "(often followed by 'to')"
  clean = clean.replace(/^\([^)]+\)\s*/g, '');

  // 2. Split on major clause separators
  const clauses = clean.split(/;|—|\s+--\s+|\s+-\s+|,?\s+(?:especially|particularly|specifically|such as|for example)\b/i);
  let firstClause = (clauses[0] || clean).trim();

  // 3. Remove trailing parenthetical remarks from the clause
  firstClause = firstClause.replace(/\s*\([^)]*\)$/g, '').trim();

  // 4. Tokenize and truncate to max 17 words if still verbose
  const words = firstClause.split(/\s+/);
  if (words.length > 17) {
    firstClause = words.slice(0, 16).join(' ') + '...';
  }

  // 5. Ensure capital initial letter and clean punctuation
  firstClause = firstClause.charAt(0).toUpperCase() + firstClause.slice(1);
  if (!/[.!?]$/.test(firstClause) && !firstClause.endsWith('...')) {
    firstClause += '.';
  }

  return firstClause;
}

module.exports = {
  shortenDefinition,
};
