import type { QuestionStrategyLesson } from '../../types';

export const QUESTION_STRATEGY_LESSONS: QuestionStrategyLesson[] = [
  {
    id: 'lesson-tfng',
    questionType: 'true_false_not_given',
    title: 'True / False / Not Given Mastery',
    module: 'reading',
    estimatedMinutes: 3,
    overview:
      'True/False/Not Given questions test your ability to determine whether factual statements agree with, contradict, or are simply missing from the reading text. The most common error is confusing False with Not Given.',
    keyRules: [
      'TRUE: The statement matches the passage information completely (synonyms will be used).',
      'FALSE: The passage explicitly states the opposite or contradicts the statement.',
      'NOT GIVEN: The passage neither confirms nor contradicts the statement; you cannot be 100% sure from the text alone.',
      'Rely ONLY on what is on the page. Never use outside general knowledge.',
    ],
    commonTraps: [
      {
        trap: 'Assuming Not Given means False',
        howToAvoid:
          'If a statement seems logical but is simply absent from the text, it is NOT GIVEN. Do not mark False unless the text explicitly denies or contradicts it.',
        exampleSnippet:
          'Passage says "Solar energy was adopted in 2012." Statement: "Solar energy is the cheapest form of power." -> NOT GIVEN (cost is never stated).',
      },
      {
        trap: 'Overlooking absolute qualifiers (all, only, always, never)',
        howToAvoid:
          'Check if the text says "some" or "frequently" while the statement claims "all" or "always". That qualifier turns a True into a False.',
      },
      {
        trap: 'Synonym traps & false matching',
        howToAvoid:
          'Finding the same keywords does not mean True. Focus on the relationship between subject, action, and object.',
      },
    ],
    stepByStepStrategy: [
      'Step 1: Read the statement carefully and circle key nouns and qualifying adverbs (only, mainly, primarily).',
      'Step 2: Scan the passage to locate the specific 1-2 sentences containing those concepts or their synonyms.',
      'Step 3: Compare meaning: If the text directly contradicts the statement, choose FALSE. If the text confirms every element, choose TRUE.',
      'Step 4: If information is missing or cannot be verified, choose NOT GIVEN.',
    ],
    practicePassage:
      'Urban vertical farming utilizes indoor modular towers under LED illumination to produce high-value leafy vegetables without soil. Proponents emphasize that these facilities reduce water consumption by up to 95% compared to open-field farming and eliminate the requirement for chemical pesticides. However, operational costs remain substantial due to electricity demands for 24-hour climate regulation. While commercial facilities operate in Tokyo and Singapore, researchers note that grain staples such as wheat and rice cannot currently be cultivated economically in vertical towers.',
    practiceQuestions: [
      {
        id: 'tfng-p1',
        questionNumber: 1,
        prompt: 'Vertical farming systems use significantly less water than traditional agriculture.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'TRUE',
        explanation:
          'Passage confirms: "reduce water consumption by up to 95% compared to open-field farming", which directly agrees with "significantly less water".',
      },
      {
        id: 'tfng-p2',
        questionNumber: 2,
        prompt: 'Chemical pesticides are strictly prohibited by law in vertical farming facilities.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'NOT GIVEN',
        explanation:
          'The passage states facilities "eliminate the requirement for chemical pesticides", but says nothing about whether they are legally prohibited.',
      },
      {
        id: 'tfng-p3',
        questionNumber: 3,
        prompt: 'Wheat and rice are currently grown at a profit in commercial vertical towers in Tokyo.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'FALSE',
        explanation:
          'The passage explicitly contradicts this: "grain staples such as wheat and rice cannot currently be cultivated economically in vertical towers".',
      },
    ],
  },

  {
    id: 'lesson-headings',
    questionType: 'matching_headings',
    title: 'Matching Headings Strategy',
    module: 'reading',
    estimatedMinutes: 3,
    overview:
      'Matching Headings tests your ability to identify the central idea (gist) of a paragraph and distinguish it from supporting examples, background details, or minor points.',
    keyRules: [
      'Always do Matching Headings FIRST before other questions for that passage.',
      'A heading summarizes the WHOLE paragraph, not just one sentence or example.',
      'There are always extra distractor headings (e.g. 5 paragraphs vs 8 headings).',
      'Cross off headings as you use them, but verify candidates if two look plausible.',
    ],
    commonTraps: [
      {
        trap: 'The Keyword Distractor Trap',
        howToAvoid:
          'Test writers often place an exact keyword from the paragraph into an incorrect heading. The wrong heading focuses on a single detail rather than the core message.',
      },
      {
        trap: 'Reading only the first sentence',
        howToAvoid:
          'While many topic sentences are at the start, sometimes the first sentence is merely a rhetorical transition (e.g. "However, recent findings challenge this view..."). Skim the first sentence, middle shift, and concluding thought.',
      },
      {
        trap: 'Confusing cause with effect headings',
        howToAvoid:
          'Check whether the paragraph explains WHY a problem happened (Causes) or WHAT resulted from it (Consequences).',
      },
    ],
    stepByStepStrategy: [
      'Step 1: Read the list of headings first and underline the key discriminator words in each.',
      'Step 2: Read Paragraph A quickly. Ask yourself: "What is the author\'s main purpose here?"',
      'Step 3: Match the paragraph with the best heading. If torn between two, note both and move to Paragraph B.',
      'Step 4: Use process of elimination to resolve lingering double choices.',
    ],
    practicePassage:
      'Paragraph A: In recent decades, subterranean aquifers across the Mediterranean basin have suffered severe depletion. Excessive groundwater abstraction for intensive citrus orchards, compounded by prolonged summer droughts, has lowered water tables by up to 30 meters. As a consequence, seawater has infiltrated coastal aquifers, contaminating freshwater reserves with lethal salinity that renders agricultural land barren.',
    practiceQuestions: [
      {
        id: 'mh-p1',
        questionNumber: 1,
        prompt: 'Which heading best summarizes Paragraph A?',
        options: [
          'i. Agricultural innovations in citrus production',
          'ii. The mechanisms and fallout of aquifer degradation',
          'iii. International treaties for Mediterranean water sharing',
          'iv. Measuring the depth of coastal trenches',
        ],
        correctAnswer: 'ii. The mechanisms and fallout of aquifer degradation',
        explanation:
          'The entire paragraph explains why the aquifers were depleted (mechanisms: excessive abstraction, droughts) and what resulted (fallout: lowered water table, seawater intrusion, barren land). Option i is merely a background detail.',
      },
      {
        id: 'mh-p2',
        questionNumber: 2,
        prompt: 'Why is heading "i. Agricultural innovations in citrus production" incorrect for Paragraph A?',
        options: [
          'A. Citrus orchards are never mentioned in the text',
          'B. It focuses on a supporting detail rather than the central theme',
          'C. The paragraph deals solely with government regulations',
        ],
        correctAnswer: 'B. It focuses on a supporting detail rather than the central theme',
        explanation:
          'Citrus orchards are mentioned merely as one cause of groundwater withdrawal, not as an innovation theme.',
      },
      {
        id: 'mh-p3',
        questionNumber: 3,
        prompt: 'What keyword in the heading matches the concluding sentence ("As a consequence, seawater has infiltrated...")?',
        options: ['A. fallout / consequence', 'B. citrus', 'C. innovation', 'D. trenches'],
        correctAnswer: 'A. fallout / consequence',
        explanation:
          '"Fallout" is a direct synonym and conceptual match for the consequences described in the concluding sentences.',
      },
    ],
  },

  {
    id: 'lesson-mcq',
    questionType: 'multiple_choice_single',
    title: 'Multiple Choice Strategy',
    module: 'reading',
    estimatedMinutes: 3,
    overview:
      'Multiple Choice questions present a stem and 4 options (A, B, C, D). You must locate the relevant section in the text and eliminate 3 plausible distractors.',
    keyRules: [
      'Questions follow chronological order through the passage.',
      'Underline keywords in the question STEM before reading options to avoid bias.',
      'Eliminate the 2 obviously false or irrelevant options first.',
      'The correct option paraphrases the text; distractors often lift exact words out of context.',
    ],
    commonTraps: [
      {
        trap: 'The Word-for-Word Trap',
        howToAvoid:
          'Options that repeat exact words from the text are frequently distractors that distort the author\'s original meaning.',
      },
      {
        trap: 'Too Extreme or Overspecified',
        howToAvoid:
          'Beware of options asserting something is "impossible", "proven completely", or "unprecedented" when the passage uses guarded academic language ("suggests", "may indicate").',
      },
      {
        trap: 'True in reality, but not in the passage',
        howToAvoid: 'Only choose an option if the text explicitly supports it.',
      },
    ],
    stepByStepStrategy: [
      'Step 1: Read the question stem (ignore options initially) and identify what specific fact or opinion is requested.',
      'Step 2: Locate the relevant paragraph in the passage using proper names or dates.',
      'Step 3: Formulate your own answer in your mind based on the passage.',
      'Step 4: Compare your thought with the 4 options and eliminate the mismatches.',
    ],
    practicePassage:
      'Psychological investigations into chronotypes reveal that individuals categorized as "evening types" or "night owls" frequently exhibit enhanced creative problem-solving capabilities during late evening hours. However, standard educational and corporate schedules overwhelmingly favor "morning larks," forcing evening chronotypes into chronic social jetlag. Neurologists hypothesize that this desynchronization impairs executive function during daytime work hours rather than indicating any inherent cognitive deficit.',
    practiceQuestions: [
      {
        id: 'mcq-p1',
        questionNumber: 1,
        prompt: 'According to the passage, the daytime difficulties experienced by night owls are primarily caused by:',
        options: [
          'A. An innate shortage of intellectual capability',
          'B. A mismatch between their internal biology and conventional schedules',
          'C. A complete inability to solve creative problems',
          'D. Refusing to attend corporate and educational meetings',
        ],
        correctAnswer: 'B. A mismatch between their internal biology and conventional schedules',
        explanation:
          'The passage explains that standard schedules favor morning larks, causing "chronic social jetlag" and "desynchronization", which is a mismatch between biology and schedules.',
      },
      {
        id: 'mcq-p2',
        questionNumber: 2,
        prompt: 'Why is Option A ("An innate shortage of intellectual capability") incorrect?',
        options: [
          'A. The passage explicitly states it is not an inherent cognitive deficit',
          'B. It is mentioned in another paragraph',
          'C. Evening types never work in corporations',
        ],
        correctAnswer: 'A. The passage explicitly states it is not an inherent cognitive deficit',
        explanation:
          'The passage explicitly clarifies: "rather than indicating any inherent cognitive deficit".',
      },
      {
        id: 'mcq-p3',
        questionNumber: 3,
        prompt: 'When do night owls demonstrate their highest creative performance?',
        options: [
          'A. Early in the morning before dawn',
          'B. During corporate lunch hours',
          'C. Late in the evening',
          'D. Exclusively on weekends',
        ],
        correctAnswer: 'C. Late in the evening',
        explanation:
          'The text states night owls "frequently exhibit enhanced creative problem-solving capabilities during late evening hours".',
      },
    ],
  },

  {
    id: 'lesson-sentence-comp',
    questionType: 'sentence_completion',
    title: 'Sentence Completion & Word Limits',
    module: 'reading',
    estimatedMinutes: 3,
    overview:
      'Sentence completion tests your ability to find exact words from the text to fill gaps in a set of sentences. Precision with word limits and grammar is critical.',
    keyRules: [
      'Check the word limit instruction: e.g., "NO MORE THAN TWO WORDS AND/OR A NUMBER".',
      'Take words DIRECTLY from the passage without changing their form.',
      'Check grammar: the completed sentence must make grammatical sense.',
      'Questions almost always follow passage order.',
    ],
    commonTraps: [
      {
        trap: 'Exceeding the word limit',
        howToAvoid:
          'If the limit is TWO WORDS, writing "a dense forest" will be marked WRONG if "dense forest" fits.',
      },
      {
        trap: 'Altering word endings',
        howToAvoid:
          'Do not change "photosynthesis" to "photosynthetic". Use the exact grammatical word from the text.',
      },
      {
        trap: 'Spelling mistakes',
        howToAvoid: 'Double-check spelling directly against the text. Spelling mistakes receive 0 marks.',
      },
    ],
    stepByStepStrategy: [
      'Step 1: Check the word limit (e.g. ONE WORD ONLY).',
      'Step 2: Read the gapped sentence and predict what type of word is needed (noun, verb, adjective, number).',
      'Step 3: Scan the passage for keywords or their synonyms.',
      'Step 4: Copy the exact word(s) and re-read the sentence to confirm grammatical correctness.',
    ],
    practicePassage:
      'The preservation of historical wooden structures against moisture rot requires continuous passive ventilation. Conservators in Scandinavia install specialized permeable membranes along foundation perimeters to prevent vapor buildup. Unlike modern synthetic paints that trap condensation beneath the surface, traditional pine tar coatings allow timber to breathe while repelling surface rainfall.',
    practiceQuestions: [
      {
        id: 'sc-p1',
        questionNumber: 1,
        prompt: 'Choose NO MORE THAN TWO WORDS: Historical wooden structures need continuous ___________ to prevent damage from moisture rot.',
        options: ['passive ventilation', 'synthetic paints', 'pine tar', 'permeable membranes'],
        correctAnswer: 'passive ventilation',
        explanation:
          'Passage states: "requires continuous passive ventilation". Two words, grammatically perfect.',
      },
      {
        id: 'sc-p2',
        questionNumber: 2,
        prompt: 'Choose ONE WORD ONLY: Permeable membranes are installed around foundation perimeters to stop ___________ accumulating.',
        options: ['vapor', 'moisture', 'condensation', 'rainfall'],
        correctAnswer: 'vapor',
        explanation:
          'Passage states: "to prevent vapor buildup" -> stop vapor accumulating.',
      },
      {
        id: 'sc-p3',
        questionNumber: 3,
        prompt: 'Choose NO MORE THAN TWO WORDS: Unlike synthetic paints, traditional ___________ enables timber to breathe.',
        options: ['pine tar', 'permeable membrane', 'moisture rot', 'surface rainfall'],
        correctAnswer: 'pine tar',
        explanation:
          'Passage states: "traditional pine tar coatings allow timber to breathe".',
      },
    ],
  },

  {
    id: 'lesson-matching-info',
    questionType: 'matching_information',
    title: 'Matching Information to Paragraphs',
    module: 'reading',
    estimatedMinutes: 3,
    overview:
      'You are given several statements and must identify which paragraph (A, B, C, etc.) contains that specific information. Unlike Matching Headings, this tests locating specific details.',
    keyRules: [
      'Look for types of information: a reason, an example, a comparison, a reference, a description.',
      'Check if instructions say: "NB You may use any letter more than once".',
      'Questions do NOT follow chronological order.',
      'Statements will be paraphrased heavily; do not search for whole matching sentences.',
    ],
    commonTraps: [
      {
        trap: 'Assuming one letter per statement',
        howToAvoid: 'If the NB notice is present, one paragraph could contain answers to two questions.',
      },
      {
        trap: 'Confusing matching headings with matching information',
        howToAvoid:
          'Matching information looks for a specific mention anywhere in the paragraph, not the main theme.',
      },
    ],
    stepByStepStrategy: [
      'Step 1: Read all the information prompts and circle functional cue words: "a description of...", "a comparison between...", "an explanation for why...".',
      'Step 2: Read paragraph by paragraph and see which prompts connect.',
      'Step 3: Verify the specific detail is explicitly present before committing the letter.',
    ],
    practicePassage:
      '[A] Coral bleaching occurs when seawater temperatures exceed biological thresholds, causing corals to expel symbiotic algae known as zooxanthellae. Without these organisms, corals lose both their pigmentation and primary nutrient source.\n\n[B] Marine biologists in Australia have initiated selective breeding programs to cultivate heat-resilient coral strains. Early trials suggest that these genetically resilient colonies survive water temperatures up to 2°C higher than native populations.',
    practiceQuestions: [
      {
        id: 'mi-p1',
        questionNumber: 1,
        prompt: 'Which paragraph contains: "an explanation of the biological cause of pigment loss in corals"?',
        options: ['[A]', '[B]'],
        correctAnswer: '[A]',
        explanation:
          'Paragraph [A] explains that high seawater temperatures cause corals to expel zooxanthellae, losing pigmentation.',
      },
      {
        id: 'mi-p2',
        questionNumber: 2,
        prompt: 'Which paragraph contains: "a reference to human scientific intervention aimed at increasing coral thermal tolerance"?',
        options: ['[A]', '[B]'],
        correctAnswer: '[B]',
        explanation:
          'Paragraph [B] describes selective breeding programs initiated by biologists to cultivate heat-resilient strains.',
      },
      {
        id: 'mi-p3',
        questionNumber: 3,
        prompt: 'What functional cue word in question 1 tells you to look for a process/cause rather than a person?',
        options: ['A. "an explanation of the biological cause"', 'B. "loss"', 'C. "corals"'],
        correctAnswer: 'A. "an explanation of the biological cause"',
        explanation:
          'The phrase "an explanation of the biological cause" directs you specifically to how and why the bleaching mechanism happens.',
      },
    ],
  },
];

export function getLessonByQuestionType(questionType: string): QuestionStrategyLesson | undefined {
  return QUESTION_STRATEGY_LESSONS.find(
    (l) => l.questionType.toLowerCase() === questionType.toLowerCase()
  );
}

export function getAllQuestionLessons(): QuestionStrategyLesson[] {
  return QUESTION_STRATEGY_LESSONS;
}
