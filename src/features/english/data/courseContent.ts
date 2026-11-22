/**
 * General English Course Syllabus & Lesson Content
 * 
 * Comprehensive structured curriculum from CEFR A1 (Beginner) to C1 (Advanced).
 * 100% free with interactive dialogues, phonetics, Urdu explanations, and practice exercises.
 */

import type { EnglishCEFRLevel } from '../../../types';

export interface LessonExercise {
  id: string;
  type: 'mcq' | 'fill_blank' | 'order_sentence' | 'true_false';
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  urduExplanation?: string;
}

export interface LessonDialogueTurn {
  speaker: string;
  english: string;
  urdu?: string;
  audioPrompt?: string;
}

export interface CourseLesson {
  id: string;
  unitId: string;
  level: EnglishCEFRLevel;
  title: string;
  description: string;
  durationMinutes: number;
  xpReward: number;
  grammarFocus: string;
  theoryMarkdown: string;
  urduTheoryMarkdown?: string;
  vocabulary: Array<{
    word: string;
    phonetic?: string;
    partOfSpeech: string;
    meaning: string;
    urduMeaning: string;
    example: string;
  }>;
  dialogue?: LessonDialogueTurn[];
  exercises: LessonExercise[];
}

export interface CourseUnit {
  id: string;
  level: EnglishCEFRLevel;
  title: string;
  description: string;
  iconName: string;
  lessons: CourseLesson[];
}

export interface CEFRLevelInfo {
  level: EnglishCEFRLevel;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  badgeColor: string;
  units: CourseUnit[];
}

export const ALL_ENGLISH_LEVELS: CEFRLevelInfo[] = [
  // -------------------------------------------------------------
  // LEVEL A1: BEGINNER / FOUNDATIONS
  // -------------------------------------------------------------
  {
    level: 'A1',
    title: 'A1 - Beginner Foundations',
    subtitle: 'From zero to basic everyday conversations',
    description: 'Learn essential greetings, the English alphabet, numbers, time, simple present tense, and how to introduce yourself.',
    color: '#124F40',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    units: [
      {
        id: 'u-a1-1',
        level: 'A1',
        title: 'Unit 1: Introductions & Daily Greetings',
        description: 'Meeting people, saying hello and goodbye, and the verb "to be".',
        iconName: 'UserCheck',
        lessons: [
          {
            id: 'eng-a1-l1',
            unitId: 'u-a1-1',
            level: 'A1',
            title: 'Lesson 1: Saying Hello & Introducing Yourself',
            description: 'Learn how to say your name, ask where someone is from, and use "I am", "You are".',
            durationMinutes: 15,
            xpReward: 50,
            grammarFocus: 'Verb "to be" (am / is / are) in positive present statements',
            theoryMarkdown: `### The Verb "To Be" (Present Simple)
In English, the verb **to be** changes depending on the subject pronoun:
* **I am** (I'm) -> *I am Ali.*
* **You are** (You're) -> *You are a student.*
* **He / She / It is** (He's / She's) -> *She is friendly.*
* **We are** (We're) -> *We are in class.*
* **They are** (They're) -> *They are from Lahore.*

#### Introducing Yourself
1. "Hello, my name is..."
2. "Nice to meet you."
3. "I am from Pakistan."`,
            urduTheoryMarkdown: `### فعل "To Be" کا استعمال
اردو میں "ہوں، ہے، ہیں" کے لیے انگریزی میں **am, is, are** استعمال ہوتا ہے:
* **I am** (میں ہوں)
* **You are** (آپ ہیں / تم ہو)
* **He / She is** (وہ ہے)
* **They are** (وہ ہیں)`,
            vocabulary: [
              {
                word: 'greeting',
                phonetic: '/ˈɡriː.tɪŋ/',
                partOfSpeech: 'noun',
                meaning: 'A polite word or sign of welcome.',
                urduMeaning: 'سلام / خیرمقدم',
                example: 'A warm greeting makes everyone feel welcome.',
              },
              {
                word: 'introduce',
                phonetic: '/ˌɪn.trəˈduːs/',
                partOfSpeech: 'verb',
                meaning: 'To tell someone another person’s name.',
                urduMeaning: 'تعارف کروانا',
                example: 'Let me introduce my friend Sarah.',
              },
              {
                word: 'country',
                phonetic: '/ˈkʌn.tri/',
                partOfSpeech: 'noun',
                meaning: 'A nation with its own government.',
                urduMeaning: 'ملک',
                example: 'Which country are you from?',
              },
            ],
            dialogue: [
              {
                speaker: 'Ali',
                english: 'Hello! My name is Ali. What is your name?',
                urdu: 'ہیلو! میرا نام علی ہے۔ آپ کا نام کیا ہے؟',
              },
              {
                speaker: 'Emma',
                english: 'Hi Ali! I am Emma. Nice to meet you.',
                urdu: 'ہائے علی! میں ایما ہوں۔ آپ سے مل کر خوشی ہوئی۔',
              },
              {
                speaker: 'Ali',
                english: 'Nice to meet you too, Emma. Where are you from?',
                urdu: 'آپ سے مل کر بھی خوشی ہوئی، ایما۔ آپ کہاں سے ہیں؟',
              },
              {
                speaker: 'Emma',
                english: 'I am from Canada. Are you from Pakistan?',
                urdu: 'میں کینیڈا سے ہوں۔ کیا آپ پاکستان سے ہیں؟',
              },
              {
                speaker: 'Ali',
                english: 'Yes, I am from Lahore, Pakistan.',
                urdu: 'جی ہاں، میں لاہور، پاکستان سے ہوں۔',
              },
            ],
            exercises: [
              {
                id: 'ex-a1-1-1',
                type: 'mcq',
                prompt: 'Choose the correct form: "I _____ a new English student."',
                options: ['am', 'is', 'are', 'be'],
                correctAnswer: 'am',
                explanation: 'With the subject pronoun "I", we always use "am".',
                urduExplanation: '"I" کے ساتھ ہمیشہ "am" استعمال ہوتا ہے۔',
              },
              {
                id: 'ex-a1-1-2',
                type: 'mcq',
                prompt: 'Choose the correct form: "They _____ from London."',
                options: ['are', 'is', 'am', 'was'],
                correctAnswer: 'are',
                explanation: 'Plural subjects like "They" take "are" in the present simple.',
                urduExplanation: 'جمع کے ساتھ "are" آتا ہے۔',
              },
              {
                id: 'ex-a1-1-3',
                type: 'fill_blank',
                prompt: 'Complete the sentence: "Nice to _____ you."',
                options: ['meet', 'see', 'listen', 'talk'],
                correctAnswer: 'meet',
                explanation: '"Nice to meet you" is the standard polite greeting when first introduced.',
                urduExplanation: 'کسی سے پہلی بار ملتے وقت "Nice to meet you" کہا جاتا ہے۔',
              },
            ],
          },
          {
            id: 'eng-a1-l2',
            unitId: 'u-a1-1',
            level: 'A1',
            title: 'Lesson 2: Numbers, Time & Daily Routine',
            description: 'Learn telling time, numbers 1-100, and present simple habits.',
            durationMinutes: 15,
            xpReward: 50,
            grammarFocus: 'Present Simple for daily habits and routines',
            theoryMarkdown: `### Present Simple: Habits & Routines
We use the **Present Simple** for things we do regularly:
* *I wake up at 7:00 AM every day.*
* *He drinks tea in the morning.* (Remember to add **-s** or **-es** for he/she/it!)
* *We study English on Mondays.*`,
            urduTheoryMarkdown: `### روٹین اور عادات
روزمرہ کی عادات کے لیے ہم Present Simple استعمال کرتے ہیں۔ He/She/It کے ساتھ فعل کے آخر میں **-s** یا **-es** لگایا جاتا ہے۔`,
            vocabulary: [
              {
                word: 'routine',
                phonetic: '/ruːˈtiːn/',
                partOfSpeech: 'noun',
                meaning: 'A sequence of actions regularly followed.',
                urduMeaning: 'معمول / روزمرہ روٹین',
                example: 'My morning routine includes exercise and reading.',
              },
              {
                word: 'schedule',
                phonetic: '/ˈskedʒ.uːl/',
                partOfSpeech: 'noun',
                meaning: 'A plan that gives expected times for events.',
                urduMeaning: 'اوقات نامہ / ٹائم ٹیبل',
                example: 'I have a busy study schedule today.',
              },
            ],
            exercises: [
              {
                id: 'ex-a1-2-1',
                type: 'mcq',
                prompt: 'Choose the correct sentence: "She _____ coffee every morning."',
                options: ['drinks', 'drink', 'drinking', 'is drink'],
                correctAnswer: 'drinks',
                explanation: 'For third-person singular (she), add "-s" to the verb in present simple.',
                urduExplanation: '"She" کے ساتھ فعل میں "s" کا اضافہ ہوتا ہے۔',
              },
            ],
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // LEVEL A2: ELEMENTARY ENGLISH
  // -------------------------------------------------------------
  {
    level: 'A2',
    title: 'A2 - Elementary Fluency',
    subtitle: 'Everyday conversations and past storytelling',
    description: 'Master the past simple, future with "going to", shopping, travel directions, and making polite requests.',
    color: '#0F8B8D',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300',
    units: [
      {
        id: 'u-a2-1',
        level: 'A2',
        title: 'Unit 1: Talking About the Past',
        description: 'Regular and irregular past simple verbs to tell stories and describe your yesterday.',
        iconName: 'History',
        lessons: [
          {
            id: 'eng-a2-l1',
            unitId: 'u-a2-1',
            level: 'A2',
            title: 'Lesson 1: Past Simple - Regular & Irregular Verbs',
            description: 'Learn how to describe completed past events using -ed endings and common irregular verbs.',
            durationMinutes: 20,
            xpReward: 60,
            grammarFocus: 'Past Simple tense (was/were, played, went, saw)',
            theoryMarkdown: `### The Past Simple Tense
We use the **Past Simple** to talk about completed actions at a definite time in the past:
* Regular verbs add **-ed**: *work -> worked, visit -> visited*
* Irregular verbs have special forms:
  * *go -> went*
  * *see -> saw*
  * *have -> had*
  * *buy -> bought*

**Negative Form:** Subject + **did not (didn't)** + base verb.
* *I didn't go to the market yesterday.*`,
            urduTheoryMarkdown: `### ماضی قریب (Past Simple)
ماضی کے مکمل کاموں کے لیے Past Simple استعمال ہوتا ہے۔ منفی جملوں میں **did not** کے ساتھ فعل کی پہلی فارم آتی ہے۔`,
            vocabulary: [
              {
                word: 'yesterday',
                phonetic: '/ˈjes.tɚ.deɪ/',
                partOfSpeech: 'noun',
                meaning: 'On the day before today.',
                urduMeaning: 'گزشتہ کل',
                example: 'I finished my homework yesterday evening.',
              },
              {
                word: 'vacation',
                phonetic: '/veɪˈkeɪ.ʃən/',
                partOfSpeech: 'noun',
                meaning: 'A holiday or period of recreation.',
                urduMeaning: 'چھٹیاں / تفریح',
                example: 'We visited the mountains during our summer vacation.',
              },
            ],
            exercises: [
              {
                id: 'ex-a2-1-1',
                type: 'mcq',
                prompt: 'Select the past form: "Yesterday, Ahmed _____ his grandparents."',
                options: ['visited', 'visit', 'visiting', 'will visit'],
                correctAnswer: 'visited',
                explanation: 'Regular verbs take "-ed" in past simple.',
                urduExplanation: 'ماضی کے لیے "visited" درست فارم ہے۔',
              },
              {
                id: 'ex-a2-1-2',
                type: 'mcq',
                prompt: 'What is the past form of "buy"?',
                options: ['bought', 'buyed', 'buying', 'buys'],
                correctAnswer: 'bought',
                explanation: '"Buy" is an irregular verb with past form "bought".',
                urduExplanation: '"Buy" کی ماضی کی فارم "bought" ہے۔',
              },
            ],
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // LEVEL B1: INTERMEDIATE
  // -------------------------------------------------------------
  {
    level: 'B1',
    title: 'B1 - Intermediate Independence',
    subtitle: 'Connecting ideas, travel, and present perfect',
    description: 'Differentiate between Present Perfect and Past Simple, use conditionals, express opinions, and handle workplace communication.',
    color: '#1E7A62',
    badgeColor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300',
    units: [
      {
        id: 'u-b1-1',
        level: 'B1',
        title: 'Unit 1: Life Experiences & Present Perfect',
        description: 'Connecting past experiences to the present with "have you ever...".',
        iconName: 'Globe',
        lessons: [
          {
            id: 'eng-b1-l1',
            unitId: 'u-b1-1',
            level: 'B1',
            title: 'Lesson 1: Present Perfect vs. Past Simple',
            description: 'Learn when to use "have done" vs "did", using ever, never, already, and yet.',
            durationMinutes: 20,
            xpReward: 70,
            grammarFocus: 'Present Perfect (have/has + past participle) vs definite past time',
            theoryMarkdown: `### Present Perfect vs. Past Simple
* **Present Perfect** (*have/has + V3*): For life experiences when the exact time is not stated.
  * *I have visited Turkey twice.*
* **Past Simple**: For actions completed at a specific stated time.
  * *I visited Turkey in 2022.*`,
            vocabulary: [
              {
                word: 'experience',
                phonetic: '/ɪkˈspɪr.i.əns/',
                partOfSpeech: 'noun',
                meaning: 'Knowledge or practical wisdom gained over time.',
                urduMeaning: 'تجربہ',
                example: 'Traveling alone gave him valuable life experience.',
              },
            ],
            exercises: [
              {
                id: 'ex-b1-1-1',
                type: 'mcq',
                prompt: 'Choose the correct sentence: "_____ you ever visited the northern areas of Pakistan?"',
                options: ['Have', 'Did', 'Were', 'Do'],
                correctAnswer: 'Have',
                explanation: 'We use "Have you ever + V3" for life experience queries.',
                urduExplanation: 'زندگی کے تجربات پوچھنے کے لیے "Have you ever" آتا ہے۔',
              },
            ],
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // LEVEL B2: UPPER-INTERMEDIATE
  // -------------------------------------------------------------
  {
    level: 'B2',
    title: 'B2 - Upper-Intermediate Competence',
    subtitle: 'Complex discussions, passive voice, and conditionals',
    description: 'Construct cohesive arguments, master passive voice, second/third conditionals, relative clauses, and phrasal verbs.',
    color: '#5BB78D',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300',
    units: [
      {
        id: 'u-b2-1',
        level: 'B2',
        title: 'Unit 1: Passive Voice & Objective Writing',
        description: 'Writing formally for academia and reports where the action is more important than the actor.',
        iconName: 'PenTool',
        lessons: [
          {
            id: 'eng-b2-l1',
            unitId: 'u-b2-1',
            level: 'B2',
            title: 'Lesson 1: Mastering the Passive Voice',
            description: 'Transform active sentences into sophisticated passive structures.',
            durationMinutes: 25,
            xpReward: 80,
            grammarFocus: 'Passive voice across past, present, and modal constructions',
            theoryMarkdown: `### Passive Voice Construction
* **Active:** The committee approved the research proposal.
* **Passive:** The research proposal **was approved** by the committee.

**Formula:** Subject + Form of *to be* + Past Participle (*V3*).`,
            vocabulary: [
              {
                word: 'significant',
                phonetic: '/sɪɡˈnɪf.ə.kənt/',
                partOfSpeech: 'adjective',
                meaning: 'Sufficiently great or important to be worthy of attention.',
                urduMeaning: 'اہم / نمایاں',
                example: 'A significant increase in renewable energy was observed.',
              },
            ],
            exercises: [
              {
                id: 'ex-b2-1-1',
                type: 'mcq',
                prompt: 'Change to passive: "Scientists discovered a new species." -> "A new species _____."',
                options: ['was discovered', 'is discovered', 'discovered', 'has discovered'],
                correctAnswer: 'was discovered',
                explanation: 'Past simple passive uses "was/were + past participle".',
                urduExplanation: 'ماضی کے پیریو میں "was + V3" استعمال ہوتا ہے۔',
              },
            ],
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // LEVEL C1: ADVANCED PROFESSIONAL
  // -------------------------------------------------------------
  {
    level: 'C1',
    title: 'C1 - Advanced Mastery',
    subtitle: 'Nuance, inversion, and executive fluency',
    description: 'Express subtle nuances, use grammatical inversion for emphasis, master idiomatic language, and speak with near-native ease.',
    color: '#0E3D32',
    badgeColor: 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200',
    units: [
      {
        id: 'u-c1-1',
        level: 'C1',
        title: 'Unit 1: Inversion & Rhetorical Emphasis',
        description: 'Using negative adverbs at the sentence front to create dramatic emphasis.',
        iconName: 'Award',
        lessons: [
          {
            id: 'eng-c1-l1',
            unitId: 'u-c1-1',
            level: 'C1',
            title: 'Lesson 1: Inversion after Negative Adverbials',
            description: 'Master structures like "Hardly had I...", "Rarely do we...", and "Not only... but also...".',
            durationMinutes: 25,
            xpReward: 100,
            grammarFocus: 'Subject-auxiliary inversion after negative/limiting adverbs',
            theoryMarkdown: `### Grammatical Inversion
When starting with a negative adverb (Rarely, Seldom, Never, Scarcely, Not only), invert the auxiliary verb and subject:
* *Normal:* I have rarely witnessed such dedication.
* *Inverted:* **Rarely have I witnessed** such dedication.`,
            vocabulary: [
              {
                word: 'indispensable',
                phonetic: '/ˌɪn.dɪˈspen.sə.bəl/',
                partOfSpeech: 'adjective',
                meaning: 'Absolutely necessary; essential.',
                urduMeaning: 'لازمی / ناگزیر',
                example: 'Critical thinking is indispensable in higher education.',
              },
            ],
            exercises: [
              {
                id: 'ex-c1-1-1',
                type: 'mcq',
                prompt: 'Complete the inverted sentence: "Seldom _____ such exceptional academic achievement."',
                options: ['have we seen', 'we have seen', 'did we saw', 'we saw'],
                correctAnswer: 'have we seen',
                explanation: 'After negative adverbs like "Seldom", invert the auxiliary verb before the subject.',
                urduExplanation: '"Seldom" کے فوراً بعد امدادی فعل (have) پھر فاعل (we) آتا ہے۔',
              },
            ],
          },
        ],
      },
    ],
  },
];

/**
 * Helper to fetch a lesson by its unique ID
 */
export function getCourseLessonById(lessonId: string): CourseLesson | undefined {
  for (const level of ALL_ENGLISH_LEVELS) {
    for (const unit of level.units) {
      for (const lesson of unit.lessons) {
        if (lesson.id === lessonId) return lesson;
      }
    }
  }
  return undefined;
}

/**
 * Returns all lessons as a flat array
 */
export function getAllCourseLessons(): CourseLesson[] {
  const result: CourseLesson[] = [];
  for (const level of ALL_ENGLISH_LEVELS) {
    for (const unit of level.units) {
      result.push(...unit.lessons);
    }
  }
  return result;
}
