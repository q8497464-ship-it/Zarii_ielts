/**
 * Typo-tolerant answer evaluation for English course fill-in-the-blank,
 * listen-and-type, and sentence transformation exercises.
 */

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, '')
    .replace(/\s+/g, ' ');
}

function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

export function evaluateTextAnswer(
  userAnswer: string,
  correctAnswer: string,
  acceptableAnswers: string[] = []
): { isCorrect: boolean; isTypo: boolean; matchedAnswer: string } {
  const cleanUser = normalizeText(userAnswer);
  if (!cleanUser) {
    return { isCorrect: false, isTypo: false, matchedAnswer: correctAnswer };
  }

  const allCandidates = [correctAnswer, ...acceptableAnswers];

  // 1. Direct exact match (after normalization)
  for (const candidate of allCandidates) {
    if (cleanUser === normalizeText(candidate)) {
      return { isCorrect: true, isTypo: false, matchedAnswer: candidate };
    }
  }

  // 2. Normalizing common contractions
  const contractionMap: Record<string, string> = {
    "dont": "do not",
    "doesnt": "does not",
    "isnt": "is not",
    "arent": "are not",
    "wasnt": "was not",
    "werent": "were not",
    "havent": "have not",
    "hasnt": "has not",
    "cant": "cannot",
    "wont": "will not",
    "im": "i am",
    "youre": "you are",
    "hes": "he is",
    "shes": "she is",
    "its": "it is",
    "were": "we are",
    "theyre": "they are",
  };

  const expandUser = cleanUser.split(' ').map(w => contractionMap[w] || w).join(' ');
  for (const candidate of allCandidates) {
    const cleanCand = normalizeText(candidate);
    const expandCand = cleanCand.split(' ').map(w => contractionMap[w] || w).join(' ');
    if (expandUser === expandCand) {
      return { isCorrect: true, isTypo: false, matchedAnswer: candidate };
    }
  }

  // 3. Typo tolerance: single word with length >= 5 characters allows distance of 1
  if (!cleanUser.includes(' ')) {
    for (const candidate of allCandidates) {
      const cleanCand = normalizeText(candidate);
      if (!cleanCand.includes(' ') && cleanCand.length >= 5) {
        if (levenshteinDistance(cleanUser, cleanCand) <= 1) {
          return { isCorrect: true, isTypo: true, matchedAnswer: candidate };
        }
      }
    }
  }

  return { isCorrect: false, isTypo: false, matchedAnswer: correctAnswer };
}
