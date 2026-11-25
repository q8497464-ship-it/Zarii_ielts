// Client-side Rule-based Writing Evaluator ($0 Free Evaluation)
// Analyzes grammar, spelling, mechanics, checklist completion, and word counts.
// Never evaluates empty, gibberish, or < 5 words text.

import type { WritingTask } from '../data/writingLibrary';

export interface WritingIssue {
  type: 'grammar' | 'spelling' | 'punctuation' | 'style' | 'word_count';
  severity: 'warning' | 'info' | 'error';
  message: string;
  urduMessage: string;
  suggestion?: string;
}

export interface WritingEvaluationResult {
  isValid: boolean;
  error?: string;
  wordCount: number;
  characterCount: number;
  minWords: number;
  maxWords: number;
  isWithinWordRange: boolean;
  issues: WritingIssue[];
  checklistStatus: Array<{ id: string; label: string; passed: boolean }>;
  transitionWordsFound: string[];
  vocabularyVarietyScore: number; // 0 to 100
  overallAssessment: 'Excellent' | 'Good Progress' | 'Needs Revision';
  polishedExample: string;
  praiseComment: string;
}

const COMMON_CONFUSIONS: Array<{
  regex: RegExp;
  message: string;
  urdu: string;
  suggestion: string;
}> = [
  {
    regex: /\b(there)\s+(car|house|family|books|work|decision)\b/i,
    message: 'Did you mean "their" (possessive)? "There" indicates a location.',
    urdu: 'ملکیت ظاہر کرنے کے لیے "their" استعمال کریں۔ "There" جگہ کے لیے استعمال ہوتا ہے۔',
    suggestion: 'their'
  },
  {
    regex: /\b(their)\s+(is|are|was|were)\b/i,
    message: 'Did you mean "there is/are"? "Their" is possessive.',
    urdu: '"There is/are" استعمال کریں، کیونکہ "their" ملکیت ظاہر کرتا ہے۔',
    suggestion: 'there'
  },
  {
    regex: /\b(your)\s+(welcome|right|wrong|leaving|coming|invited)\b/i,
    message: 'Did you mean "you\'re" (you are)? "Your" is possessive.',
    urdu: 'یہاں "you\'re" (you are) کی ضرورت ہے، "your" ملکیت کے لیے ہوتا ہے۔',
    suggestion: "you're"
  },
  {
    regex: /\b(its)\s+(a|an|very|clear|important|obvious)\b/i,
    message: 'Did you mean "it\'s" (it is)? "Its" is possessive.',
    urdu: 'یہاں "it\'s" (it is) کی ضرورت ہے۔',
    suggestion: "it's"
  },
  {
    regex: /\b(loose)\s+(weight|my|the|a|time|money)\b/i,
    message: 'Did you mean "lose" (verb)? "Loose" means not tight.',
    urdu: 'کھونے یا وزن گھٹانے کے لیے "lose" ہوتا ہے، "loose" کا مطلب ڈھیلا ہے۔',
    suggestion: 'lose'
  }
];

const TRANSITIONS = [
  'however', 'furthermore', 'in addition', 'on the one hand', 'on the other hand',
  'therefore', 'consequently', 'moreover', 'firstly', 'secondly', 'in conclusion',
  'to summarize', 'nevertheless', 'meanwhile', 'similarly', 'conversely',
  'for example', 'for instance', 'ultimately', 'in the meantime'
];

export function evaluateStudentWriting(
  text: string,
  task: WritingTask,
  formValues?: Record<string, string>
): WritingEvaluationResult {
  const clean = text.trim();
  const words = clean.length > 0 ? clean.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const characterCount = clean.length;

  // Anti-gaming / sanity guard
  if (wordCount < 5) {
    return {
      isValid: false,
      error: 'Please write at least 5 meaningful words to receive constructive feedback.',
      wordCount,
      characterCount,
      minWords: task.minWords,
      maxWords: task.maxWords,
      isWithinWordRange: false,
      issues: [],
      checklistStatus: task.checklist.map(c => ({ id: c.id, label: c.label, passed: false })),
      transitionWordsFound: [],
      vocabularyVarietyScore: 0,
      overallAssessment: 'Needs Revision',
      polishedExample: task.modelAnswer,
      praiseComment: 'Start writing to see instant linguistic feedback.'
    };
  }

  const issues: WritingIssue[] = [];

  // 1. Word Count Range Check
  const isWithinWordRange = wordCount >= task.minWords && wordCount <= task.maxWords;
  if (wordCount < task.minWords) {
    issues.push({
      type: 'word_count',
      severity: 'warning',
      message: `Your text has ${wordCount} words, which is under the target minimum of ${task.minWords} words. Expand on your ideas.`,
      urduMessage: `آپ کی تحریر میں ${wordCount} الفاظ ہیں، کم از کم ${task.minWords} الفاظ لکھیں۔`
    });
  } else if (wordCount > task.maxWords) {
    issues.push({
      type: 'word_count',
      severity: 'info',
      message: `Your text has ${wordCount} words, which exceeds the target maximum of ${task.maxWords} words. Aim for concise phrasing.`,
      urduMessage: `آپ کی تحریر میں ${wordCount} الفاظ ہیں جو زیادہ سے زیادہ حد (${task.maxWords}) سے زائد ہیں۔`
    });
  }

  // 2. Capitalization Checks
  // Check standalone lowercase 'i'
  if (/\b(i)\b/.test(text)) {
    issues.push({
      type: 'grammar',
      severity: 'error',
      message: 'Always capitalize the standalone pronoun "I".',
      urduMessage: 'ضمیر "I" کو ہمیشہ بڑے حروف (Capital) میں لکھیں۔',
      suggestion: 'I'
    });
  }

  // Check sentence start capitalization
  const sentences = clean.split(/(?<=[.!?])\s+/);
  let uncapitalizedStarts = 0;
  sentences.forEach((sentence) => {
    const trimmed = sentence.trim();
    if (trimmed.length > 0 && /^[a-z]/.test(trimmed)) {
      uncapitalizedStarts++;
    }
  });

  if (uncapitalizedStarts > 0) {
    issues.push({
      type: 'punctuation',
      severity: 'warning',
      message: `${uncapitalizedStarts} sentence(s) do not start with a capital letter.`,
      urduMessage: `جملے کا پہلا حرف ہمیشہ کیپیٹل ہونا چاہیے۔`
    });
  }

  // 3. Repeated Words (e.g. "the the", "is is")
  const repeatedWordMatch = text.match(/\b([a-zA-Z]{2,})\s+\1\b/i);
  if (repeatedWordMatch) {
    issues.push({
      type: 'grammar',
      severity: 'warning',
      message: `Duplicate word detected: "${repeatedWordMatch[0]}". Remove the repeated word.`,
      urduMessage: `دوہرا لفظ پایا گیا: "${repeatedWordMatch[0]}"، ایک کو ختم کریں۔`
    });
  }

  // 4. Common Confusing Words
  COMMON_CONFUSIONS.forEach((rule) => {
    if (rule.regex.test(text)) {
      issues.push({
        type: 'spelling',
        severity: 'warning',
        message: rule.message,
        urduMessage: rule.urdu,
        suggestion: rule.suggestion
      });
    }
  });

  // 5. Ending Punctuation
  if (clean.length > 0 && !/[.!?]$/.test(clean)) {
    issues.push({
      type: 'punctuation',
      severity: 'info',
      message: 'Remember to end your final sentence with a period, exclamation mark, or question mark.',
      urduMessage: 'آخری جملے کے اختتام پر فل اسٹاپ یا سوالیہ نشان لازمی لگائیں۔'
    });
  }

  // 6. Transition words detection
  const lowerText = text.toLowerCase();
  const transitionWordsFound = TRANSITIONS.filter((t) => lowerText.includes(t));

  // 7. Vocabulary variety calculation
  const uniqueWords = new Set(words.map((w) => w.toLowerCase().replace(/[^a-z]/g, '')));
  const vocabularyVarietyScore = Math.min(
    100,
    Math.round((uniqueWords.size / Math.max(1, words.length)) * 100)
  );

  // 8. Form Fields Completeness
  if (task.formFields && formValues) {
    task.formFields.forEach((field) => {
      if (field.required && (!formValues[field.id] || formValues[field.id].trim() === '')) {
        issues.push({
          type: 'style',
          severity: 'error',
          message: `The required form field "${field.label}" has not been filled out.`,
          urduMessage: `مطلوبہ خانہ "${field.label}" خالی ہے، اسے پر کریں۔`
        });
      }
    });
  }

  // 9. Checklist evaluation
  const checklistStatus = task.checklist.map((item) => {
    let passed = false;
    const itemLower = item.label.toLowerCase();

    if (itemLower.includes('capital')) {
      passed = uncapitalizedStarts === 0 && !/\b(i)\b/.test(text);
    } else if (itemLower.includes('word') || itemLower.includes('sentences') || itemLower.includes('form')) {
      passed = isWithinWordRange || wordCount >= task.minWords;
    } else if (itemLower.includes('cohesive') || itemLower.includes('transition') || itemLower.includes('connect')) {
      passed = transitionWordsFound.length >= 1;
    } else if (itemLower.includes('greeting') || itemLower.includes('dear') || itemLower.includes('closing')) {
      passed = /dear|hi|hello|regards|wishes|sincerely/i.test(text);
    } else {
      passed = wordCount >= task.minWords && issues.filter((i) => i.severity === 'error').length === 0;
    }

    return { id: item.id, label: item.label, passed };
  });

  // 10. Overall Assessment
  const errorCount = issues.filter((i) => i.severity === 'error').length;
  const warningCount = issues.filter((i) => i.severity === 'warning').length;

  let overallAssessment: 'Excellent' | 'Good Progress' | 'Needs Revision' = 'Good Progress';
  if (errorCount === 0 && warningCount <= 1 && isWithinWordRange) {
    overallAssessment = 'Excellent';
  } else if (errorCount >= 2 || wordCount < task.minWords * 0.7) {
    overallAssessment = 'Needs Revision';
  }

  // 11. Praise and Encouragement
  let praiseComment = 'Well done! You expressed your thoughts clearly and followed the key structure.';
  if (overallAssessment === 'Excellent') {
    praiseComment = 'Outstanding writing! Your vocabulary variety is high and sentence mechanics are clear.';
  } else if (overallAssessment === 'Needs Revision') {
    praiseComment = 'Good effort! Review the suggestions above and check your word count to polish your draft.';
  }

  // Polished example
  const polishedExample = task.modelAnswer;

  return {
    isValid: true,
    wordCount,
    characterCount,
    minWords: task.minWords,
    maxWords: task.maxWords,
    isWithinWordRange,
    issues,
    checklistStatus,
    transitionWordsFound,
    vocabularyVarietyScore,
    overallAssessment,
    polishedExample,
    praiseComment
  };
}
