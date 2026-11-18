import type {
  QuestionType,
  BaseQuestion,
  DiagnosticResult,
  DiagnosticWeaknessItem,
  DiagnosticSkillBand,
  DiagnosticQuestionResult,
  IELTSModule,
} from '../../types';
import { convertRawToBand as convertReadingBand, isAnswerCorrect as isReadingAnswerCorrect } from '../reading/marking';
import { convertListeningRawToBand as convertListeningBand, isListeningAnswerCorrect } from '../listening/marking';

export interface DiagnosticReadingQuestion extends BaseQuestion {
  passageText: string;
}

export interface DiagnosticListeningQuestion extends BaseQuestion {
  scriptTurn: {
    speaker: string;
    text: string;
  };
}

export const DIAGNOSTIC_READING_PASSAGE = {
  title: 'The Urban Microclimate & The Heat Island Effect',
  text: `As global populations increasingly migrate into metropolitan centers, cities encounter unprecedented climatic transformations. Among the most documented phenomena is the Urban Heat Island (UHI) effect, wherein metropolitan regions experience substantially higher ambient temperatures than adjacent rural surroundings.

Several architectural and structural determinants explain this temperature divergence. In conventional rural terrain, vegetation and permeable soils absorb solar radiation while facilitating evapotranspiration—a natural cooling process whereby plants release water vapor. Conversely, urban environments substitute lush greenery with impermeable asphalt, bitumen, and dense concrete. These architectural materials possess exceptionally high thermal mass and low solar reflectance (albedo), absorbing solar heat throughout daylight hours and re-radiating it long after twilight.

Furthermore, anthropogenic waste heat compounds thermal loads. Exhaust from automotive combustion, industrial cooling towers, and commercial air conditioning infrastructure expels immense thermal energy directly into the urban canopy. The resultant microclimatic modification increases peak electrical cooling demand, exacerbates tropospheric ozone formation, and significantly heightens heat-related mortality among vulnerable demographics.

Urban climatologists advocate multifaceted mitigation blueprints. Foremost among these is the widespread integration of vegetative infrastructure, specifically green roofs, urban forest corridors, and reflective 'cool pavements'. Computerized fluid dynamics simulations demonstrate that increasing tree canopy density by just twenty percent can depress city-wide surface temperatures by up to two point five degrees Celsius.`,
  questions: [
    {
      id: 'diag_r_01',
      questionNumber: 1,
      type: 'true_false_not_given' as QuestionType,
      prompt: 'Rural areas stay cooler partly because plant life releases moisture into the atmosphere.',
      correctAnswer: 'TRUE',
      explanation: 'Paragraph 2 mentions that vegetation facilitates evapotranspiration—a natural cooling process where plants release water vapor.',
      evidence: 'vegetation and permeable soils absorb solar radiation while facilitating evapotranspiration—a natural cooling process whereby plants release water vapor.',
    },
    {
      id: 'diag_r_02',
      questionNumber: 2,
      type: 'true_false_not_given' as QuestionType,
      prompt: 'Asphalt and bitumen have higher solar reflectance than natural grasslands.',
      correctAnswer: 'FALSE',
      explanation: 'Paragraph 2 notes that urban materials possess "low solar reflectance (albedo)", which is lower than natural terrain.',
      evidence: 'urban environments substitute lush greenery with impermeable asphalt, bitumen, and dense concrete. These architectural materials possess exceptionally high thermal mass and low solar reflectance (albedo)...',
    },
    {
      id: 'diag_r_03',
      questionNumber: 3,
      type: 'true_false_not_given' as QuestionType,
      prompt: 'City councils in tropical nations are legally mandated to install green roofs.',
      correctAnswer: 'NOT GIVEN',
      explanation: 'While urban climatologists advocate green roofs, no legal mandate in tropical nations is mentioned in the text.',
      evidence: 'Urban climatologists advocate multifaceted mitigation blueprints. Foremost among these is the widespread integration of vegetative infrastructure, specifically green roofs...',
    },
    {
      id: 'diag_r_04',
      questionNumber: 4,
      type: 'multiple_choice_single' as QuestionType,
      prompt: 'According to paragraph 2, what causes concrete and asphalt to keep cities warm at night?',
      options: [
        'A) Their capacity to store heat during the day and radiate it after sunset',
        'B) Their rapid reflection of direct solar energy into the sky',
        'C) Their ability to absorb atmospheric moisture',
        'D) Their porous composition that traps hot air underground',
      ],
      correctAnswer: 'A',
      explanation: 'These materials have high thermal mass, absorbing heat during daylight and re-radiating it after twilight.',
      evidence: 'absorbing solar heat throughout daylight hours and re-radiating it long after twilight.',
    },
    {
      id: 'diag_r_05',
      questionNumber: 5,
      type: 'multiple_choice_single' as QuestionType,
      prompt: 'Which of the following is cited as an anthropogenic factor contributing to the UHI effect?',
      options: [
        'A) Natural subterranean geothermal venting',
        'B) Exhaust emissions from motor vehicles and cooling equipment',
        'C) Elevated cloud cover over urban centers',
        'D) High agricultural irrigation along city outskirts',
      ],
      correctAnswer: 'B',
      explanation: 'Exhaust from automotive combustion and commercial air conditioning infrastructure is explicitly cited as waste heat.',
      evidence: 'Exhaust from automotive combustion, industrial cooling towers, and commercial air conditioning infrastructure expels immense thermal energy...',
    },
    {
      id: 'diag_r_06',
      questionNumber: 6,
      type: 'matching_information' as QuestionType,
      prompt: 'Which paragraph discusses the public health and power consumption risks of elevated city temperatures?',
      options: ['Paragraph 1', 'Paragraph 2', 'Paragraph 3', 'Paragraph 4'],
      correctAnswer: 'Paragraph 3',
      explanation: 'Paragraph 3 describes increased peak electrical cooling demand and heat-related mortality.',
      evidence: 'The resultant microclimatic modification increases peak electrical cooling demand... and significantly heightens heat-related mortality...',
    },
    {
      id: 'diag_r_07',
      questionNumber: 7,
      type: 'matching_headings' as QuestionType,
      prompt: 'What is the most appropriate heading for Paragraph 4?',
      options: [
        'A) Strategies and solutions to diminish metropolitan heat',
        'B) The historical origin of urban development',
        'C) Economic failure of green infrastructure',
        'D) Measuring ozone pollution in rural towns',
      ],
      correctAnswer: 'A',
      explanation: 'Paragraph 4 outlines mitigation blueprints including green roofs, urban corridors, and cool pavements.',
      evidence: 'Urban climatologists advocate multifaceted mitigation blueprints...',
    },
    {
      id: 'diag_r_08',
      questionNumber: 8,
      type: 'sentence_completion' as QuestionType,
      prompt: 'Metropolitan areas develop higher temperatures than the surrounding ________ regions.',
      correctAnswer: 'rural',
      explanation: 'Paragraph 1 contrasts metropolitan regions with "adjacent rural surroundings".',
      evidence: 'metropolitan regions experience substantially higher ambient temperatures than adjacent rural surroundings.',
    },
    {
      id: 'diag_r_09',
      questionNumber: 9,
      type: 'sentence_completion' as QuestionType,
      prompt: 'The scientific term for the cooling process wherein plants release water vapor is ________.',
      correctAnswer: 'evapotranspiration',
      explanation: 'Paragraph 2 defines evapotranspiration as the natural cooling process where plants release water vapor.',
      evidence: 'evapotranspiration—a natural cooling process whereby plants release water vapor.',
    },
    {
      id: 'diag_r_10',
      questionNumber: 10,
      type: 'sentence_completion' as QuestionType,
      prompt: 'Simulations demonstrate that expanding tree canopy by twenty percent can lower surface temperatures by ________ degrees Celsius.',
      correctAnswer: '2.5',
      explanation: 'Paragraph 4 notes that tree canopy density can depress city-wide surface temperatures by up to two point five (2.5) degrees.',
      evidence: 'increasing tree canopy density by just twenty percent can depress city-wide surface temperatures by up to two point five degrees Celsius.',
    },
  ],
};

export const DIAGNOSTIC_LISTENING_SECTION = {
  title: 'City University Student Housing Services',
  context: 'A university housing officer speaks with an incoming international student regarding on-campus and private accommodations.',
  script: [
    { speaker: 'Officer', text: 'Good morning! Welcome to the City University International Accommodation Office. How can I help you today?' },
    { speaker: 'Student', text: 'Hello! My name is Tariq Mansoor, and I am starting my Master of Environmental Engineering course this October. I need help finding accommodation.' },
    { speaker: 'Officer', text: 'Delighted to meet you, Tariq. Let me pull up your student file. Could you give me your student identification number?' },
    { speaker: 'Student', text: 'Yes, it is STU-84920.' },
    { speaker: 'Officer', text: 'Got it. Now, we have two primary options: on-campus halls of residence or private catered flats in the university quarter. Do you have a weekly budget in mind?' },
    { speaker: 'Student', text: 'My maximum budget is 180 pounds per week, and that must include utility bills and high-speed internet.' },
    { speaker: 'Officer', text: 'Well, our postgraduate halls on Elmfield Road cost exactly 165 pounds per week with all utilities, Wi-Fi, and 24-hour campus security included. The tenancy contract runs for 44 weeks.' },
    { speaker: 'Student', text: 'That sounds suitable. What cooking facilities are provided?' },
    { speaker: 'Officer', text: 'Each floor has a shared communal kitchen with four induction hobs, two microwaves, and personal lockable cupboards. There is also an on-site laundry room in the basement.' },
    { speaker: 'Student', text: 'Splendid. When is the deposit due?' },
    { speaker: 'Officer', text: 'You need to pay a refundable security deposit of 250 pounds before the 15th of August to guarantee your room.' },
  ],
  questions: [
    {
      id: 'diag_l_01',
      questionNumber: 1,
      type: 'form_completion' as QuestionType,
      prompt: 'Student Full Name: Tariq ________',
      correctAnswer: 'Mansoor',
      explanation: 'The student states his name as Tariq Mansoor.',
    },
    {
      id: 'diag_l_02',
      questionNumber: 2,
      type: 'form_completion' as QuestionType,
      prompt: 'Degree program: Master of ________ Engineering',
      correctAnswer: 'Environmental',
      explanation: 'Tariq states he is starting his Master of Environmental Engineering course.',
    },
    {
      id: 'diag_l_03',
      questionNumber: 3,
      type: 'form_completion' as QuestionType,
      prompt: 'Student ID Number: STU-________',
      correctAnswer: '84920',
      explanation: 'The student confirms his ID is STU-84920.',
    },
    {
      id: 'diag_l_04',
      questionNumber: 4,
      type: 'multiple_choice_single' as QuestionType,
      prompt: 'What is the student’s maximum weekly budget?',
      options: ['A) £150', 'B) £165', 'C) £180', 'D) £250'],
      correctAnswer: 'C',
      explanation: 'Tariq says: "My maximum budget is 180 pounds per week".',
    },
    {
      id: 'diag_l_05',
      questionNumber: 5,
      type: 'form_completion' as QuestionType,
      prompt: 'Name of accommodation hall: ________ Road Halls',
      correctAnswer: 'Elmfield',
      explanation: 'The officer mentions the postgraduate halls on Elmfield Road.',
    },
    {
      id: 'diag_l_06',
      questionNumber: 6,
      type: 'form_completion' as QuestionType,
      prompt: 'Weekly rent of Elmfield halls: £________',
      correctAnswer: '165',
      explanation: 'The officer states they cost exactly 165 pounds per week.',
    },
    {
      id: 'diag_l_07',
      questionNumber: 7,
      type: 'multiple_choice_single' as QuestionType,
      prompt: 'How long is the standard postgraduate tenancy contract?',
      options: ['A) 36 weeks', 'B) 40 weeks', 'C) 44 weeks', 'D) 52 weeks'],
      correctAnswer: 'C',
      explanation: 'The officer notes: "The tenancy contract runs for 44 weeks."',
    },
    {
      id: 'diag_l_08',
      questionNumber: 8,
      type: 'form_completion' as QuestionType,
      prompt: 'Kitchen facility provided on each floor: personal lockable ________',
      correctAnswer: 'cupboards',
      explanation: 'The officer notes shared kitchens have personal lockable cupboards.',
    },
    {
      id: 'diag_l_09',
      questionNumber: 9,
      type: 'multiple_choice_single' as QuestionType,
      prompt: 'Where is the laundry room located?',
      options: ['A) Ground floor', 'B) In the basement', 'C) Next to the reception', 'D) Outside the courtyard'],
      correctAnswer: 'B',
      explanation: 'The officer says: "There is also an on-site laundry room in the basement."',
    },
    {
      id: 'diag_l_10',
      questionNumber: 10,
      type: 'form_completion' as QuestionType,
      prompt: 'Refundable security deposit amount: £________',
      correctAnswer: '250',
      explanation: 'The officer instructs: "You need to pay a refundable security deposit of 250 pounds".',
    },
  ],
};

export const DIAGNOSTIC_WRITING_TASK = {
  title: 'Diagnostic Essay Prompt (Task 2)',
  prompt: 'Some people argue that technological automation will cause widespread unemployment, while others believe it will create new, higher-value career opportunities. Discuss both views and give your own opinion.',
  instructions: 'Write a concise diagnostic response (minimum 120 words). You have approximately 15 minutes.',
  sampleBand8Snippet: 'While industrial automation undeniably displaces routine manual labor, history indicates that technological progress consistently cultivates novel economic sectors that require cognitive dexterity and specialized technical oversight.',
};

export const DIAGNOSTIC_SPEAKING_QUESTIONS = [
  {
    part: 1,
    prompt: 'What kind of work or study do you do, and what do you find most interesting about it?',
    prepSeconds: 5,
    speakSeconds: 45,
    sampleOutline: 'State profession or degree, explain core daily tasks, and mention a personal passion like problem solving or working with people.',
  },
  {
    part: 2,
    prompt: 'Describe a memorable journey or trip you took that taught you something valuable. You should say where you went, who you were with, what happened, and explain what you learned.',
    prepSeconds: 30,
    speakSeconds: 90,
    sampleOutline: 'Identify destination (e.g. northern mountains, historic city), narrate an unexpected event or hurdle, and reflect on personal resilience or cultural appreciation.',
  },
  {
    part: 3,
    prompt: 'Do you believe modern technology has made international travel more superficial, or has it enriched cultural understanding?',
    prepSeconds: 5,
    speakSeconds: 60,
    sampleOutline: 'Acknowledge both sides (social media photo-taking vs instant translation and direct interaction with local communities), and state a clear nuanced conclusion.',
  },
];

/**
 * Evaluates the full diagnostic test, converting raw marks to estimated bands and generating
 * a question-type weakness breakdown.
 */
export function evaluateDiagnostic(
  readingAnswers: Record<string, string>,
  listeningAnswers: Record<string, string>,
  writingText: string,
  speakingTranscripts: string[]
): DiagnosticResult {
  // 1. Reading Evaluation
  let readingScore = 0;
  const readingResults: DiagnosticQuestionResult[] = DIAGNOSTIC_READING_PASSAGE.questions.map((q) => {
    const userAns = readingAnswers[q.id] || '';
    const isCorrect = isReadingAnswerCorrect(userAns, q.correctAnswer, q.type, (q as any).options);
    if (isCorrect) readingScore += 1;
    return {
      questionId: q.id,
      module: 'reading',
      questionType: q.type,
      userAnswer: userAns,
      correctAnswer: q.correctAnswer,
      isCorrect,
      prompt: q.prompt,
      explanation: q.explanation,
    };
  });

  // Scale 10 questions to 40 questions to use official conversion
  const scaledReadingScore = Math.round((readingScore / 10) * 40);
  const readingBand = convertReadingBand(scaledReadingScore, 'academic');

  // 2. Listening Evaluation
  let listeningScore = 0;
  const listeningResults: DiagnosticQuestionResult[] = DIAGNOSTIC_LISTENING_SECTION.questions.map((q) => {
    const userAns = listeningAnswers[q.id] || '';
    const isCorrect = isListeningAnswerCorrect(userAns, q.correctAnswer, q.type, (q as any).options);
    if (isCorrect) listeningScore += 1;
    return {
      questionId: q.id,
      module: 'listening',
      questionType: q.type,
      userAnswer: userAns,
      correctAnswer: q.correctAnswer,
      isCorrect,
      prompt: q.prompt,
      explanation: q.explanation,
    };
  });

  const scaledListeningScore = Math.round((listeningScore / 10) * 40);
  const listeningBand = convertListeningBand(scaledListeningScore);

  // 3. Writing Diagnostic Heuristic
  const words = writingText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  let writingBand = 5.0;

  if (wordCount >= 180) {
    writingBand = 7.0;
  } else if (wordCount >= 140) {
    writingBand = 6.5;
  } else if (wordCount >= 100) {
    writingBand = 6.0;
  } else if (wordCount >= 60) {
    writingBand = 5.5;
  }

  // Bonus for paragraphing & cohesive words
  const lowerText = writingText.toLowerCase();
  const cohesiveCount = ['however', 'furthermore', 'moreover', 'consequently', 'in contrast', 'therefore', 'while'].filter(
    (w) => lowerText.includes(w)
  ).length;

  if (cohesiveCount >= 3 && writingBand < 8.0) {
    writingBand = Math.min(8.0, writingBand + 0.5);
  }

  // 4. Speaking Diagnostic Heuristic
  const combinedSpeaking = speakingTranscripts.join(' ');
  const speakWords = combinedSpeaking.trim().split(/\s+/).filter(Boolean);
  const totalSpeakWords = speakWords.length;
  let speakingBand = 5.5;

  if (totalSpeakWords >= 220) {
    speakingBand = 7.0;
  } else if (totalSpeakWords >= 150) {
    speakingBand = 6.5;
  } else if (totalSpeakWords >= 90) {
    speakingBand = 6.0;
  }

  // Overall Band calculation (Average of 4 skills rounded to nearest 0.5)
  const rawAverage = (readingBand + listeningBand + writingBand + speakingBand) / 4;
  const overallBand = Math.round(rawAverage * 2) / 2;

  // 5. Weakness Breakdown by Question Type
  const questionTypeStats = new Map<
    string,
    { type: string; module: IELTSModule; correct: number; total: number }
  >();

  const allResponses = [...readingResults, ...listeningResults];
  for (const resp of allResponses) {
    const key = `${resp.module}_${resp.questionType}`;
    const existing = questionTypeStats.get(key) || {
      type: resp.questionType,
      module: resp.module,
      correct: 0,
      total: 0,
    };
    if (resp.isCorrect) existing.correct += 1;
    existing.total += 1;
    questionTypeStats.set(key, existing);
  }

  const weaknesses: DiagnosticWeaknessItem[] = [];
  questionTypeStats.forEach((stat) => {
    const accuracy = Math.round((stat.correct / stat.total) * 100);
    let severity: 'critical' | 'moderate' | 'good' = 'good';
    let advice = 'Good mastery demonstrated. Maintain accuracy during full timed tests.';

    if (accuracy < 50) {
      severity = 'critical';
      advice = `Significant revision required in ${stat.type.replace(/_/g, ' ')}. Focus on keyword matching and distractor elimination.`;
    } else if (accuracy < 75) {
      severity = 'moderate';
      advice = `Consistent practice recommended in ${stat.type.replace(/_/g, ' ')} to eliminate minor errors.`;
    }

    const typeLabel = stat.type
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    weaknesses.push({
      questionType: stat.type,
      questionTypeLabel: `${stat.module === 'reading' ? 'Reading' : 'Listening'}: ${typeLabel}`,
      module: stat.module,
      correct: stat.correct,
      total: stat.total,
      accuracy,
      severity,
      advice,
    });
  });

  // Sort weaknesses with lowest accuracy first
  weaknesses.sort((a, b) => a.accuracy - b.accuracy);

  return {
    completedAt: new Date().toISOString(),
    overallBand,
    skills: {
      reading: {
        rawScore: readingScore,
        totalQuestions: 10,
        estimatedBand: readingBand,
        accuracy: Math.round((readingScore / 10) * 100),
      },
      listening: {
        rawScore: listeningScore,
        totalQuestions: 10,
        estimatedBand: listeningBand,
        accuracy: Math.round((listeningScore / 10) * 100),
      },
      writing: {
        rawScore: Math.round(writingBand * 10),
        totalQuestions: 1,
        estimatedBand: writingBand,
        accuracy: Math.round((writingBand / 9.0) * 100),
      },
      speaking: {
        rawScore: Math.round(speakingBand * 10),
        totalQuestions: 3,
        estimatedBand: speakingBand,
        accuracy: Math.round((speakingBand / 9.0) * 100),
      },
    },
    weaknesses,
    readingResponses: readingResults,
    listeningResponses: listeningResults,
    writingSubmission: {
      prompt: DIAGNOSTIC_WRITING_TASK.prompt,
      text: writingText,
      wordCount,
      bandEstimate: writingBand,
      feedbackSummary: `Diagnostic response analyzed (${wordCount} words). Cohesive indicators and argument structure evaluated.`,
    },
    speakingSession: {
      answers: DIAGNOSTIC_SPEAKING_QUESTIONS.map((q, i) => ({
        question: q.prompt,
        transcript: speakingTranscripts[i] || '',
        bandEstimate: speakingBand,
      })),
      bandEstimate: speakingBand,
    },
  };
}
