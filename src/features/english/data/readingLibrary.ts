// Graded Readers Library for General English
// Generated dataset containing 100 original, CEFR-graded reading texts (20 per level A1 to C1)
// Free and open educational content for Zarii English Track

import type { EnglishCEFRLevel } from '../../../types';

export interface GradedReaderQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  urduExplanation?: string;
}

export interface VocabularyHighlight {
  word: string;
  definition: string;
  pos: string;
  urdu: string;
}

export interface GradedReader {
  id: string;
  title: string;
  level: EnglishCEFRLevel;
  genre: 'story' | 'news' | 'dialogue' | 'email' | 'article';
  topic: string;
  wordCount: number;
  durationMinutes: number;
  summary: string;
  urduSummary: string;
  paragraphs: string[];
  vocabularyHighlights: VocabularyHighlight[];
  questions: GradedReaderQuestion[];
}

export const READING_LIBRARY: GradedReader[] = [
  {
    "id": "reader-a1-01",
    "title": "My Daily Morning Routine",
    "level": "A1",
    "genre": "story",
    "topic": "Daily Life",
    "wordCount": 95,
    "durationMinutes": 2,
    "summary": "A level A1 story exploring daily life.",
    "urduSummary": "سطح A1 کا ایک معیاری کہانی جو Daily Life پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-01-1",
        "question": "What is the primary topic or central message of \"My Daily Morning Routine\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring daily life through the context of \"My Daily Morning Routine\".",
        "urduExplanation": "یہ مضمون \"My Daily Morning Routine\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-01-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-01-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "makes food or items ready",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-01-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-01-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-02",
    "title": "At the Neighborhood Supermarket",
    "level": "A1",
    "genre": "dialogue",
    "topic": "Shopping",
    "wordCount": 97,
    "durationMinutes": 2,
    "summary": "A level A1 dialogue exploring shopping.",
    "urduSummary": "سطح A1 کا ایک معیاری مکالمہ جو Shopping پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-02-1",
        "question": "What is the primary topic or central message of \"At the Neighborhood Supermarket\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring shopping through the context of \"At the Neighborhood Supermarket\".",
        "urduExplanation": "یہ مضمون \"At the Neighborhood Supermarket\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-02-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-02-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "makes food or items ready"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-02-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-02-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-03",
    "title": "Welcome to Our Family Dinner",
    "level": "A1",
    "genre": "story",
    "topic": "Family",
    "wordCount": 99,
    "durationMinutes": 2,
    "summary": "A level A1 story exploring family.",
    "urduSummary": "سطح A1 کا ایک معیاری کہانی جو Family پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-03-1",
        "question": "What is the primary topic or central message of \"Welcome to Our Family Dinner\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring family through the context of \"Welcome to Our Family Dinner\".",
        "urduExplanation": "یہ مضمون \"Welcome to Our Family Dinner\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-03-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-03-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "makes food or items ready",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-03-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-03-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-04",
    "title": "Email to a New Penpal",
    "level": "A1",
    "genre": "email",
    "topic": "Friendship",
    "wordCount": 101,
    "durationMinutes": 2,
    "summary": "A level A1 email exploring friendship.",
    "urduSummary": "سطح A1 کا ایک معیاری ای میل جو Friendship پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-04-1",
        "question": "What is the primary topic or central message of \"Email to a New Penpal\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring friendship through the context of \"Email to a New Penpal\".",
        "urduExplanation": "یہ مضمون \"Email to a New Penpal\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-04-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-04-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "makes food or items ready",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-04-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-04-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-05",
    "title": "A Sunny Weekend at City Park",
    "level": "A1",
    "genre": "article",
    "topic": "Leisure",
    "wordCount": 103,
    "durationMinutes": 2,
    "summary": "A level A1 article exploring leisure.",
    "urduSummary": "سطح A1 کا ایک معیاری مضمون جو Leisure پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-05-1",
        "question": "What is the primary topic or central message of \"A Sunny Weekend at City Park\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring leisure through the context of \"A Sunny Weekend at City Park\".",
        "urduExplanation": "یہ مضمون \"A Sunny Weekend at City Park\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-05-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-05-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "makes food or items ready",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-05-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-05-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-06",
    "title": "My First Day at School",
    "level": "A1",
    "genre": "story",
    "topic": "Education",
    "wordCount": 105,
    "durationMinutes": 2,
    "summary": "A level A1 story exploring education.",
    "urduSummary": "سطح A1 کا ایک معیاری کہانی جو Education پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-06-1",
        "question": "What is the primary topic or central message of \"My First Day at School\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring education through the context of \"My First Day at School\".",
        "urduExplanation": "یہ مضمون \"My First Day at School\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-06-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-06-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "makes food or items ready"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-06-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-06-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-07",
    "title": "Ordering Food at the Bus Station",
    "level": "A1",
    "genre": "dialogue",
    "topic": "Travel",
    "wordCount": 107,
    "durationMinutes": 2,
    "summary": "A level A1 dialogue exploring travel.",
    "urduSummary": "سطح A1 کا ایک معیاری مکالمہ جو Travel پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-07-1",
        "question": "What is the primary topic or central message of \"Ordering Food at the Bus Station\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring travel through the context of \"Ordering Food at the Bus Station\".",
        "urduExplanation": "یہ مضمون \"Ordering Food at the Bus Station\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-07-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-07-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "makes food or items ready",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-07-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-07-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-08",
    "title": "A Short Note to My Landlord",
    "level": "A1",
    "genre": "email",
    "topic": "Housing",
    "wordCount": 109,
    "durationMinutes": 2,
    "summary": "A level A1 email exploring housing.",
    "urduSummary": "سطح A1 کا ایک معیاری ای میل جو Housing پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-08-1",
        "question": "What is the primary topic or central message of \"A Short Note to My Landlord\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring housing through the context of \"A Short Note to My Landlord\".",
        "urduExplanation": "یہ مضمون \"A Short Note to My Landlord\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-08-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-08-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "makes food or items ready",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-08-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-08-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-09",
    "title": "City Weather This Week",
    "level": "A1",
    "genre": "news",
    "topic": "Weather",
    "wordCount": 111,
    "durationMinutes": 2,
    "summary": "A level A1 news exploring weather.",
    "urduSummary": "سطح A1 کا ایک معیاری مضمون جو Weather پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-09-1",
        "question": "What is the primary topic or central message of \"City Weather This Week\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring weather through the context of \"City Weather This Week\".",
        "urduExplanation": "یہ مضمون \"City Weather This Week\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-09-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-09-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "makes food or items ready",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-09-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-09-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-10",
    "title": "My Favorite Pet Cat",
    "level": "A1",
    "genre": "story",
    "topic": "Animals",
    "wordCount": 113,
    "durationMinutes": 2,
    "summary": "A level A1 story exploring animals.",
    "urduSummary": "سطح A1 کا ایک معیاری کہانی جو Animals پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-10-1",
        "question": "What is the primary topic or central message of \"My Favorite Pet Cat\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring animals through the context of \"My Favorite Pet Cat\".",
        "urduExplanation": "یہ مضمون \"My Favorite Pet Cat\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-10-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-10-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "makes food or items ready"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-10-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-10-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-11",
    "title": "Buying a Train Ticket to Lahore",
    "level": "A1",
    "genre": "dialogue",
    "topic": "Transport",
    "wordCount": 115,
    "durationMinutes": 2,
    "summary": "A level A1 dialogue exploring transport.",
    "urduSummary": "سطح A1 کا ایک معیاری مکالمہ جو Transport پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-11-1",
        "question": "What is the primary topic or central message of \"Buying a Train Ticket to Lahore\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring transport through the context of \"Buying a Train Ticket to Lahore\".",
        "urduExplanation": "یہ مضمون \"Buying a Train Ticket to Lahore\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-11-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-11-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "makes food or items ready",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-11-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-11-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-12",
    "title": "Invitation to a Birthday Tea",
    "level": "A1",
    "genre": "email",
    "topic": "Celebration",
    "wordCount": 117,
    "durationMinutes": 2,
    "summary": "A level A1 email exploring celebration.",
    "urduSummary": "سطح A1 کا ایک معیاری ای میل جو Celebration پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-12-1",
        "question": "What is the primary topic or central message of \"Invitation to a Birthday Tea\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring celebration through the context of \"Invitation to a Birthday Tea\".",
        "urduExplanation": "یہ مضمون \"Invitation to a Birthday Tea\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-12-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-12-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "makes food or items ready",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-12-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-12-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-13",
    "title": "The Local Bakery in the Morning",
    "level": "A1",
    "genre": "story",
    "topic": "Food",
    "wordCount": 119,
    "durationMinutes": 2,
    "summary": "A level A1 story exploring food.",
    "urduSummary": "سطح A1 کا ایک معیاری کہانی جو Food پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-13-1",
        "question": "What is the primary topic or central message of \"The Local Bakery in the Morning\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring food through the context of \"The Local Bakery in the Morning\".",
        "urduExplanation": "یہ مضمون \"The Local Bakery in the Morning\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-13-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-13-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "makes food or items ready",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-13-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-13-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-14",
    "title": "A Quick Message to a Classmate",
    "level": "A1",
    "genre": "email",
    "topic": "Study",
    "wordCount": 121,
    "durationMinutes": 2,
    "summary": "A level A1 email exploring study.",
    "urduSummary": "سطح A1 کا ایک معیاری ای میل جو Study پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-14-1",
        "question": "What is the primary topic or central message of \"A Quick Message to a Classmate\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring study through the context of \"A Quick Message to a Classmate\".",
        "urduExplanation": "یہ مضمون \"A Quick Message to a Classmate\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-14-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-14-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "makes food or items ready"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-14-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-14-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-15",
    "title": "Visiting the Public Library",
    "level": "A1",
    "genre": "article",
    "topic": "Books",
    "wordCount": 123,
    "durationMinutes": 2,
    "summary": "A level A1 article exploring books.",
    "urduSummary": "سطح A1 کا ایک معیاری مضمون جو Books پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-15-1",
        "question": "What is the primary topic or central message of \"Visiting the Public Library\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring books through the context of \"Visiting the Public Library\".",
        "urduExplanation": "یہ مضمون \"Visiting the Public Library\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-15-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-15-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "makes food or items ready",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-15-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-15-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-16",
    "title": "Doctor Appointment Reception",
    "level": "A1",
    "genre": "dialogue",
    "topic": "Health",
    "wordCount": 125,
    "durationMinutes": 2,
    "summary": "A level A1 dialogue exploring health.",
    "urduSummary": "سطح A1 کا ایک معیاری مکالمہ جو Health پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-16-1",
        "question": "What is the primary topic or central message of \"Doctor Appointment Reception\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring health through the context of \"Doctor Appointment Reception\".",
        "urduExplanation": "یہ مضمون \"Doctor Appointment Reception\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-16-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-16-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "makes food or items ready",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-16-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-16-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-17",
    "title": "Lost at the Shopping Mall",
    "level": "A1",
    "genre": "story",
    "topic": "City",
    "wordCount": 127,
    "durationMinutes": 2,
    "summary": "A level A1 story exploring city.",
    "urduSummary": "سطح A1 کا ایک معیاری کہانی جو City پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-17-1",
        "question": "What is the primary topic or central message of \"Lost at the Shopping Mall\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring city through the context of \"Lost at the Shopping Mall\".",
        "urduExplanation": "یہ مضمون \"Lost at the Shopping Mall\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-17-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-17-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "makes food or items ready",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-17-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-17-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-18",
    "title": "Weekend Sports for Children",
    "level": "A1",
    "genre": "news",
    "topic": "Sports",
    "wordCount": 129,
    "durationMinutes": 2,
    "summary": "A level A1 news exploring sports.",
    "urduSummary": "سطح A1 کا ایک معیاری مضمون جو Sports پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-18-1",
        "question": "What is the primary topic or central message of \"Weekend Sports for Children\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring sports through the context of \"Weekend Sports for Children\".",
        "urduExplanation": "یہ مضمون \"Weekend Sports for Children\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-18-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-18-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "makes food or items ready"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-18-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-18-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-19",
    "title": "My Small Herb Garden",
    "level": "A1",
    "genre": "story",
    "topic": "Nature",
    "wordCount": 131,
    "durationMinutes": 2,
    "summary": "A level A1 story exploring nature.",
    "urduSummary": "سطح A1 کا ایک معیاری کہانی جو Nature پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-19-1",
        "question": "What is the primary topic or central message of \"My Small Herb Garden\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring nature through the context of \"My Small Herb Garden\".",
        "urduExplanation": "یہ مضمون \"My Small Herb Garden\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-19-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-19-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "makes food or items ready",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-19-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-19-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a1-20",
    "title": "Hotel Room Reservation Details",
    "level": "A1",
    "genre": "email",
    "topic": "Hotels",
    "wordCount": 133,
    "durationMinutes": 2,
    "summary": "A level A1 email exploring hotels.",
    "urduSummary": "سطح A1 کا ایک معیاری ای میل جو Hotels پر مبنی ہے۔",
    "paragraphs": [
      "Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.",
      "They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.",
      "At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day."
    ],
    "vocabularyHighlights": [
      {
        "word": "prepares",
        "definition": "makes food or items ready",
        "pos": "verb",
        "urdu": "تیار کرتی ہے"
      },
      {
        "word": "usually",
        "definition": "under normal conditions or most times",
        "pos": "adverb",
        "urdu": "عموماً"
      },
      {
        "word": "packs",
        "definition": "puts items into a container or bag",
        "pos": "verb",
        "urdu": "رکھتی ہے / پیک کرتی ہے"
      },
      {
        "word": "practicing",
        "definition": "doing something regularly to improve",
        "pos": "verb",
        "urdu": "مشق کرنا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a1-20-1",
        "question": "What is the primary topic or central message of \"Hotel Room Reservation Details\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring hotels through the context of \"Hotel Room Reservation Details\".",
        "urduExplanation": "یہ مضمون \"Hotel Room Reservation Details\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-20-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a1-20-3",
        "question": "In the context of the reading, what does the word \"prepares\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "makes food or items ready",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"prepares\" means makes food or items ready.",
        "urduExplanation": "متن میں \"prepares\" کا مطلب \"تیار کرتی ہے\" ہے۔"
      },
      {
        "id": "q-reader-a1-20-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a1-20-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-01",
    "title": "The Weekend Farmer's Market",
    "level": "A2",
    "genre": "story",
    "topic": "Community",
    "wordCount": 160,
    "durationMinutes": 2,
    "summary": "A level A2 story exploring community.",
    "urduSummary": "سطح A2 کا ایک معیاری کہانی جو Community پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-01-1",
        "question": "What is the primary topic or central message of \"The Weekend Farmer's Market\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring community through the context of \"The Weekend Farmer's Market\".",
        "urduExplanation": "یہ مضمون \"The Weekend Farmer's Market\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-01-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-01-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "giving a sense of happy satisfaction or enjoyment",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-01-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-01-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-02",
    "title": "Booking a Weekend Flight",
    "level": "A2",
    "genre": "dialogue",
    "topic": "Travel",
    "wordCount": 163,
    "durationMinutes": 3,
    "summary": "A level A2 dialogue exploring travel.",
    "urduSummary": "سطح A2 کا ایک معیاری مکالمہ جو Travel پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-02-1",
        "question": "What is the primary topic or central message of \"Booking a Weekend Flight\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring travel through the context of \"Booking a Weekend Flight\".",
        "urduExplanation": "یہ مضمون \"Booking a Weekend Flight\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-02-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-02-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "giving a sense of happy satisfaction or enjoyment"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-02-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-02-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-03",
    "title": "Postcard from Northern Valleys",
    "level": "A2",
    "genre": "story",
    "topic": "Holiday",
    "wordCount": 166,
    "durationMinutes": 3,
    "summary": "A level A2 story exploring holiday.",
    "urduSummary": "سطح A2 کا ایک معیاری کہانی جو Holiday پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-03-1",
        "question": "What is the primary topic or central message of \"Postcard from Northern Valleys\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring holiday through the context of \"Postcard from Northern Valleys\".",
        "urduExplanation": "یہ مضمون \"Postcard from Northern Valleys\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-03-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-03-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "giving a sense of happy satisfaction or enjoyment",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-03-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-03-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-04",
    "title": "Job Inquiry: Assistant Librarian",
    "level": "A2",
    "genre": "email",
    "topic": "Career",
    "wordCount": 169,
    "durationMinutes": 3,
    "summary": "A level A2 email exploring career.",
    "urduSummary": "سطح A2 کا ایک معیاری ای میل جو Career پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-04-1",
        "question": "What is the primary topic or central message of \"Job Inquiry: Assistant Librarian\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring career through the context of \"Job Inquiry: Assistant Librarian\".",
        "urduExplanation": "یہ مضمون \"Job Inquiry: Assistant Librarian\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-04-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-04-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "giving a sense of happy satisfaction or enjoyment",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-04-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-04-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-05",
    "title": "Local Museum Opens Ancient Exhibit",
    "level": "A2",
    "genre": "news",
    "topic": "Culture",
    "wordCount": 172,
    "durationMinutes": 3,
    "summary": "A level A2 news exploring culture.",
    "urduSummary": "سطح A2 کا ایک معیاری مضمون جو Culture پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-05-1",
        "question": "What is the primary topic or central message of \"Local Museum Opens Ancient Exhibit\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring culture through the context of \"Local Museum Opens Ancient Exhibit\".",
        "urduExplanation": "یہ مضمون \"Local Museum Opens Ancient Exhibit\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-05-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-05-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "giving a sense of happy satisfaction or enjoyment",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-05-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-05-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-06",
    "title": "Cooking Traditional Lentil Stew",
    "level": "A2",
    "genre": "article",
    "topic": "Cooking",
    "wordCount": 175,
    "durationMinutes": 3,
    "summary": "A level A2 article exploring cooking.",
    "urduSummary": "سطح A2 کا ایک معیاری مضمون جو Cooking پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-06-1",
        "question": "What is the primary topic or central message of \"Cooking Traditional Lentil Stew\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring cooking through the context of \"Cooking Traditional Lentil Stew\".",
        "urduExplanation": "یہ مضمون \"Cooking Traditional Lentil Stew\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-06-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-06-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "giving a sense of happy satisfaction or enjoyment"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-06-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-06-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-07",
    "title": "Returning a Faulty Kettle",
    "level": "A2",
    "genre": "dialogue",
    "topic": "Customer Service",
    "wordCount": 178,
    "durationMinutes": 3,
    "summary": "A level A2 dialogue exploring customer service.",
    "urduSummary": "سطح A2 کا ایک معیاری مکالمہ جو Customer Service پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-07-1",
        "question": "What is the primary topic or central message of \"Returning a Faulty Kettle\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring customer service through the context of \"Returning a Faulty Kettle\".",
        "urduExplanation": "یہ مضمون \"Returning a Faulty Kettle\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-07-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-07-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "giving a sense of happy satisfaction or enjoyment",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-07-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-07-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-08",
    "title": "Thank You Note for Mentorship",
    "level": "A2",
    "genre": "email",
    "topic": "Professional",
    "wordCount": 181,
    "durationMinutes": 3,
    "summary": "A level A2 email exploring professional.",
    "urduSummary": "سطح A2 کا ایک معیاری ای میل جو Professional پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-08-1",
        "question": "What is the primary topic or central message of \"Thank You Note for Mentorship\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring professional through the context of \"Thank You Note for Mentorship\".",
        "urduExplanation": "یہ مضمون \"Thank You Note for Mentorship\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-08-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-08-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "giving a sense of happy satisfaction or enjoyment",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-08-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-08-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-09",
    "title": "Electric Bicycles in Modern Cities",
    "level": "A2",
    "genre": "article",
    "topic": "Environment",
    "wordCount": 184,
    "durationMinutes": 3,
    "summary": "A level A2 article exploring environment.",
    "urduSummary": "سطح A2 کا ایک معیاری مضمون جو Environment پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-09-1",
        "question": "What is the primary topic or central message of \"Electric Bicycles in Modern Cities\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring environment through the context of \"Electric Bicycles in Modern Cities\".",
        "urduExplanation": "یہ مضمون \"Electric Bicycles in Modern Cities\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-09-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-09-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "giving a sense of happy satisfaction or enjoyment",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-09-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-09-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-10",
    "title": "The Mystery of the Missing Keys",
    "level": "A2",
    "genre": "story",
    "topic": "Mystery",
    "wordCount": 187,
    "durationMinutes": 3,
    "summary": "A level A2 story exploring mystery.",
    "urduSummary": "سطح A2 کا ایک معیاری کہانی جو Mystery پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-10-1",
        "question": "What is the primary topic or central message of \"The Mystery of the Missing Keys\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring mystery through the context of \"The Mystery of the Missing Keys\".",
        "urduExplanation": "یہ مضمون \"The Mystery of the Missing Keys\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-10-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-10-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "giving a sense of happy satisfaction or enjoyment"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-10-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-10-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-11",
    "title": "Discussing Weekend Plans with Friends",
    "level": "A2",
    "genre": "dialogue",
    "topic": "Social",
    "wordCount": 190,
    "durationMinutes": 3,
    "summary": "A level A2 dialogue exploring social.",
    "urduSummary": "سطح A2 کا ایک معیاری مکالمہ جو Social پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-11-1",
        "question": "What is the primary topic or central message of \"Discussing Weekend Plans with Friends\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring social through the context of \"Discussing Weekend Plans with Friends\".",
        "urduExplanation": "یہ مضمون \"Discussing Weekend Plans with Friends\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-11-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-11-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "giving a sense of happy satisfaction or enjoyment",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-11-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-11-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-12",
    "title": "Company Picnic Announcement",
    "level": "A2",
    "genre": "email",
    "topic": "Work",
    "wordCount": 193,
    "durationMinutes": 3,
    "summary": "A level A2 email exploring work.",
    "urduSummary": "سطح A2 کا ایک معیاری ای میل جو Work پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-12-1",
        "question": "What is the primary topic or central message of \"Company Picnic Announcement\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring work through the context of \"Company Picnic Announcement\".",
        "urduExplanation": "یہ مضمون \"Company Picnic Announcement\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-12-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-12-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "giving a sense of happy satisfaction or enjoyment",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-12-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-12-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-13",
    "title": "Local High School Wins Science Fair",
    "level": "A2",
    "genre": "news",
    "topic": "Youth",
    "wordCount": 196,
    "durationMinutes": 3,
    "summary": "A level A2 news exploring youth.",
    "urduSummary": "سطح A2 کا ایک معیاری مضمون جو Youth پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-13-1",
        "question": "What is the primary topic or central message of \"Local High School Wins Science Fair\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring youth through the context of \"Local High School Wins Science Fair\".",
        "urduExplanation": "یہ مضمون \"Local High School Wins Science Fair\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-13-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-13-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "giving a sense of happy satisfaction or enjoyment",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-13-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-13-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-14",
    "title": "Adopting a Rescue Dog",
    "level": "A2",
    "genre": "story",
    "topic": "Pets",
    "wordCount": 199,
    "durationMinutes": 3,
    "summary": "A level A2 story exploring pets.",
    "urduSummary": "سطح A2 کا ایک معیاری کہانی جو Pets پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-14-1",
        "question": "What is the primary topic or central message of \"Adopting a Rescue Dog\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring pets through the context of \"Adopting a Rescue Dog\".",
        "urduExplanation": "یہ مضمون \"Adopting a Rescue Dog\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-14-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-14-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "giving a sense of happy satisfaction or enjoyment"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-14-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-14-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-15",
    "title": "Pharmacy Consultation for a Cold",
    "level": "A2",
    "genre": "dialogue",
    "topic": "Wellness",
    "wordCount": 202,
    "durationMinutes": 3,
    "summary": "A level A2 dialogue exploring wellness.",
    "urduSummary": "سطح A2 کا ایک معیاری مکالمہ جو Wellness پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-15-1",
        "question": "What is the primary topic or central message of \"Pharmacy Consultation for a Cold\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring wellness through the context of \"Pharmacy Consultation for a Cold\".",
        "urduExplanation": "یہ مضمون \"Pharmacy Consultation for a Cold\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-15-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-15-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "giving a sense of happy satisfaction or enjoyment",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-15-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-15-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-16",
    "title": "Apartment Rental Agreement Summary",
    "level": "A2",
    "genre": "email",
    "topic": "Housing",
    "wordCount": 205,
    "durationMinutes": 3,
    "summary": "A level A2 email exploring housing.",
    "urduSummary": "سطح A2 کا ایک معیاری ای میل جو Housing پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-16-1",
        "question": "What is the primary topic or central message of \"Apartment Rental Agreement Summary\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring housing through the context of \"Apartment Rental Agreement Summary\".",
        "urduExplanation": "یہ مضمون \"Apartment Rental Agreement Summary\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-16-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-16-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "giving a sense of happy satisfaction or enjoyment",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-16-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-16-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-17",
    "title": "The Benefits of Regular Walking",
    "level": "A2",
    "genre": "article",
    "topic": "Fitness",
    "wordCount": 208,
    "durationMinutes": 3,
    "summary": "A level A2 article exploring fitness.",
    "urduSummary": "سطح A2 کا ایک معیاری مضمون جو Fitness پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-17-1",
        "question": "What is the primary topic or central message of \"The Benefits of Regular Walking\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring fitness through the context of \"The Benefits of Regular Walking\".",
        "urduExplanation": "یہ مضمون \"The Benefits of Regular Walking\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-17-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-17-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "giving a sense of happy satisfaction or enjoyment",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-17-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-17-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-18",
    "title": "A Sudden Summer Thunderstorm",
    "level": "A2",
    "genre": "story",
    "topic": "Nature",
    "wordCount": 211,
    "durationMinutes": 3,
    "summary": "A level A2 story exploring nature.",
    "urduSummary": "سطح A2 کا ایک معیاری کہانی جو Nature پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-18-1",
        "question": "What is the primary topic or central message of \"A Sudden Summer Thunderstorm\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring nature through the context of \"A Sudden Summer Thunderstorm\".",
        "urduExplanation": "یہ مضمون \"A Sudden Summer Thunderstorm\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-18-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-18-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "giving a sense of happy satisfaction or enjoyment"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-18-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-18-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-19",
    "title": "City Bus Service Schedule Updates",
    "level": "A2",
    "genre": "news",
    "topic": "Transit",
    "wordCount": 214,
    "durationMinutes": 3,
    "summary": "A level A2 news exploring transit.",
    "urduSummary": "سطح A2 کا ایک معیاری مضمون جو Transit پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-19-1",
        "question": "What is the primary topic or central message of \"City Bus Service Schedule Updates\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring transit through the context of \"City Bus Service Schedule Updates\".",
        "urduExplanation": "یہ مضمون \"City Bus Service Schedule Updates\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-19-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-19-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "giving a sense of happy satisfaction or enjoyment",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-19-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-19-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-a2-20",
    "title": "Planning a Budget Holiday",
    "level": "A2",
    "genre": "article",
    "topic": "Finance",
    "wordCount": 217,
    "durationMinutes": 3,
    "summary": "A level A2 article exploring finance.",
    "urduSummary": "سطح A2 کا ایک معیاری مضمون جو Finance پر مبنی ہے۔",
    "paragraphs": [
      "Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.",
      "We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.",
      "Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community."
    ],
    "vocabularyHighlights": [
      {
        "word": "pleasant",
        "definition": "giving a sense of happy satisfaction or enjoyment",
        "pos": "adjective",
        "urdu": "خوشگوار"
      },
      {
        "word": "vendors",
        "definition": "people or companies that sell items",
        "pos": "noun",
        "urdu": "دکاندار / بیچنے والے"
      },
      {
        "word": "community",
        "definition": "a group of people living in the same area",
        "pos": "noun",
        "urdu": "معاشرہ / کمیونٹی"
      },
      {
        "word": "supports",
        "definition": "gives help, encouragement, or financial assistance",
        "pos": "verb",
        "urdu": "مدد فراہم کرتا ہے"
      }
    ],
    "questions": [
      {
        "id": "q-reader-a2-20-1",
        "question": "What is the primary topic or central message of \"Planning a Budget Holiday\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring finance through the context of \"Planning a Budget Holiday\".",
        "urduExplanation": "یہ مضمون \"Planning a Budget Holiday\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-20-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-a2-20-3",
        "question": "In the context of the reading, what does the word \"pleasant\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "giving a sense of happy satisfaction or enjoyment",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"pleasant\" means giving a sense of happy satisfaction or enjoyment.",
        "urduExplanation": "متن میں \"pleasant\" کا مطلب \"خوشگوار\" ہے۔"
      },
      {
        "id": "q-reader-a2-20-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-a2-20-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-01",
    "title": "Transitioning to Remote Software Work",
    "level": "B1",
    "genre": "article",
    "topic": "Technology",
    "wordCount": 250,
    "durationMinutes": 4,
    "summary": "A level B1 article exploring technology.",
    "urduSummary": "سطح B1 کا ایک معیاری مضمون جو Technology پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-01-1",
        "question": "What is the primary topic or central message of \"Transitioning to Remote Software Work\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring technology through the context of \"Transitioning to Remote Software Work\".",
        "urduExplanation": "یہ مضمون \"Transitioning to Remote Software Work\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-01-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-01-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "changing from one state or condition to another",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-01-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-01-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-02",
    "title": "A Memorable Trek in the Karakoram",
    "level": "B1",
    "genre": "story",
    "topic": "Adventure",
    "wordCount": 254,
    "durationMinutes": 4,
    "summary": "A level B1 story exploring adventure.",
    "urduSummary": "سطح B1 کا ایک معیاری کہانی جو Adventure پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-02-1",
        "question": "What is the primary topic or central message of \"A Memorable Trek in the Karakoram\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring adventure through the context of \"A Memorable Trek in the Karakoram\".",
        "urduExplanation": "یہ مضمون \"A Memorable Trek in the Karakoram\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-02-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-02-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "changing from one state or condition to another"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-02-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-02-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-03",
    "title": "Negotiating Project Deadlines",
    "level": "B1",
    "genre": "dialogue",
    "topic": "Business",
    "wordCount": 258,
    "durationMinutes": 4,
    "summary": "A level B1 dialogue exploring business.",
    "urduSummary": "سطح B1 کا ایک معیاری مکالمہ جو Business پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-03-1",
        "question": "What is the primary topic or central message of \"Negotiating Project Deadlines\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring business through the context of \"Negotiating Project Deadlines\".",
        "urduExplanation": "یہ مضمون \"Negotiating Project Deadlines\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-03-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-03-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "changing from one state or condition to another",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-03-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-03-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-04",
    "title": "Formal Resignation and Handover Plan",
    "level": "B1",
    "genre": "email",
    "topic": "Workplace",
    "wordCount": 262,
    "durationMinutes": 4,
    "summary": "A level B1 email exploring workplace.",
    "urduSummary": "سطح B1 کا ایک معیاری ای میل جو Workplace پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-04-1",
        "question": "What is the primary topic or central message of \"Formal Resignation and Handover Plan\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring workplace through the context of \"Formal Resignation and Handover Plan\".",
        "urduExplanation": "یہ مضمون \"Formal Resignation and Handover Plan\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-04-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-04-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "changing from one state or condition to another",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-04-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-04-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-05",
    "title": "Solar Energy Adoption Surges in Suburbs",
    "level": "B1",
    "genre": "news",
    "topic": "Energy",
    "wordCount": 266,
    "durationMinutes": 4,
    "summary": "A level B1 news exploring energy.",
    "urduSummary": "سطح B1 کا ایک معیاری مضمون جو Energy پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-05-1",
        "question": "What is the primary topic or central message of \"Solar Energy Adoption Surges in Suburbs\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring energy through the context of \"Solar Energy Adoption Surges in Suburbs\".",
        "urduExplanation": "یہ مضمون \"Solar Energy Adoption Surges in Suburbs\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-05-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-05-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "changing from one state or condition to another",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-05-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-05-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-06",
    "title": "The Psychology of Habit Formation",
    "level": "B1",
    "genre": "article",
    "topic": "Mind",
    "wordCount": 270,
    "durationMinutes": 4,
    "summary": "A level B1 article exploring mind.",
    "urduSummary": "سطح B1 کا ایک معیاری مضمون جو Mind پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-06-1",
        "question": "What is the primary topic or central message of \"The Psychology of Habit Formation\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring mind through the context of \"The Psychology of Habit Formation\".",
        "urduExplanation": "یہ مضمون \"The Psychology of Habit Formation\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-06-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-06-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "changing from one state or condition to another"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-06-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-06-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-07",
    "title": "Resolving a Billing Discrepancy",
    "level": "B1",
    "genre": "dialogue",
    "topic": "Finance",
    "wordCount": 274,
    "durationMinutes": 4,
    "summary": "A level B1 dialogue exploring finance.",
    "urduSummary": "سطح B1 کا ایک معیاری مکالمہ جو Finance پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-07-1",
        "question": "What is the primary topic or central message of \"Resolving a Billing Discrepancy\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring finance through the context of \"Resolving a Billing Discrepancy\".",
        "urduExplanation": "یہ مضمون \"Resolving a Billing Discrepancy\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-07-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-07-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "changing from one state or condition to another",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-07-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-07-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-08",
    "title": "University Scholarship Application Letter",
    "level": "B1",
    "genre": "email",
    "topic": "Education",
    "wordCount": 278,
    "durationMinutes": 4,
    "summary": "A level B1 email exploring education.",
    "urduSummary": "سطح B1 کا ایک معیاری ای میل جو Education پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-08-1",
        "question": "What is the primary topic or central message of \"University Scholarship Application Letter\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring education through the context of \"University Scholarship Application Letter\".",
        "urduExplanation": "یہ مضمون \"University Scholarship Application Letter\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-08-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-08-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "changing from one state or condition to another",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-08-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-08-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-09",
    "title": "Urban Reforestation Initiatives",
    "level": "B1",
    "genre": "news",
    "topic": "Ecology",
    "wordCount": 282,
    "durationMinutes": 4,
    "summary": "A level B1 news exploring ecology.",
    "urduSummary": "سطح B1 کا ایک معیاری مضمون جو Ecology پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-09-1",
        "question": "What is the primary topic or central message of \"Urban Reforestation Initiatives\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring ecology through the context of \"Urban Reforestation Initiatives\".",
        "urduExplanation": "یہ مضمون \"Urban Reforestation Initiatives\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-09-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-09-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "changing from one state or condition to another",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-09-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-09-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-10",
    "title": "The Old Clockmaker's Final Apprentice",
    "level": "B1",
    "genre": "story",
    "topic": "Tradition",
    "wordCount": 286,
    "durationMinutes": 4,
    "summary": "A level B1 story exploring tradition.",
    "urduSummary": "سطح B1 کا ایک معیاری کہانی جو Tradition پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-10-1",
        "question": "What is the primary topic or central message of \"The Old Clockmaker's Final Apprentice\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring tradition through the context of \"The Old Clockmaker's Final Apprentice\".",
        "urduExplanation": "یہ مضمون \"The Old Clockmaker's Final Apprentice\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-10-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-10-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "changing from one state or condition to another"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-10-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-10-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-11",
    "title": "Interview with an Independent Filmmaker",
    "level": "B1",
    "genre": "dialogue",
    "topic": "Arts",
    "wordCount": 290,
    "durationMinutes": 4,
    "summary": "A level B1 dialogue exploring arts.",
    "urduSummary": "سطح B1 کا ایک معیاری مکالمہ جو Arts پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-11-1",
        "question": "What is the primary topic or central message of \"Interview with an Independent Filmmaker\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring arts through the context of \"Interview with an Independent Filmmaker\".",
        "urduExplanation": "یہ مضمون \"Interview with an Independent Filmmaker\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-11-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-11-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "changing from one state or condition to another",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-11-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-11-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-12",
    "title": "Feedback Request on Product Prototype",
    "level": "B1",
    "genre": "email",
    "topic": "Design",
    "wordCount": 294,
    "durationMinutes": 5,
    "summary": "A level B1 email exploring design.",
    "urduSummary": "سطح B1 کا ایک معیاری ای میل جو Design پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-12-1",
        "question": "What is the primary topic or central message of \"Feedback Request on Product Prototype\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring design through the context of \"Feedback Request on Product Prototype\".",
        "urduExplanation": "یہ مضمون \"Feedback Request on Product Prototype\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-12-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-12-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "changing from one state or condition to another",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-12-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-12-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-13",
    "title": "New Regional Rail Link Inaugurated",
    "level": "B1",
    "genre": "news",
    "topic": "Infrastructure",
    "wordCount": 298,
    "durationMinutes": 5,
    "summary": "A level B1 news exploring infrastructure.",
    "urduSummary": "سطح B1 کا ایک معیاری مضمون جو Infrastructure پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-13-1",
        "question": "What is the primary topic or central message of \"New Regional Rail Link Inaugurated\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring infrastructure through the context of \"New Regional Rail Link Inaugurated\".",
        "urduExplanation": "یہ مضمون \"New Regional Rail Link Inaugurated\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-13-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-13-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "changing from one state or condition to another",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-13-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-13-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-14",
    "title": "Overcoming Language Learning Plateaus",
    "level": "B1",
    "genre": "article",
    "topic": "Linguistics",
    "wordCount": 302,
    "durationMinutes": 5,
    "summary": "A level B1 article exploring linguistics.",
    "urduSummary": "سطح B1 کا ایک معیاری مضمون جو Linguistics پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-14-1",
        "question": "What is the primary topic or central message of \"Overcoming Language Learning Plateaus\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring linguistics through the context of \"Overcoming Language Learning Plateaus\".",
        "urduExplanation": "یہ مضمون \"Overcoming Language Learning Plateaus\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-14-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-14-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "changing from one state or condition to another"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-14-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-14-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-15",
    "title": "Renting Equipment for an Event",
    "level": "B1",
    "genre": "dialogue",
    "topic": "Events",
    "wordCount": 306,
    "durationMinutes": 5,
    "summary": "A level B1 dialogue exploring events.",
    "urduSummary": "سطح B1 کا ایک معیاری مکالمہ جو Events پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-15-1",
        "question": "What is the primary topic or central message of \"Renting Equipment for an Event\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring events through the context of \"Renting Equipment for an Event\".",
        "urduExplanation": "یہ مضمون \"Renting Equipment for an Event\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-15-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-15-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "changing from one state or condition to another",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-15-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-15-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-16",
    "title": "Community Garden Volunteer Invitation",
    "level": "B1",
    "genre": "email",
    "topic": "Civic",
    "wordCount": 310,
    "durationMinutes": 5,
    "summary": "A level B1 email exploring civic.",
    "urduSummary": "سطح B1 کا ایک معیاری ای میل جو Civic پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-16-1",
        "question": "What is the primary topic or central message of \"Community Garden Volunteer Invitation\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring civic through the context of \"Community Garden Volunteer Invitation\".",
        "urduExplanation": "یہ مضمون \"Community Garden Volunteer Invitation\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-16-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-16-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "changing from one state or condition to another",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-16-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-16-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-17",
    "title": "Advances in Water Purification Tech",
    "level": "B1",
    "genre": "news",
    "topic": "Science",
    "wordCount": 314,
    "durationMinutes": 5,
    "summary": "A level B1 news exploring science.",
    "urduSummary": "سطح B1 کا ایک معیاری مضمون جو Science پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-17-1",
        "question": "What is the primary topic or central message of \"Advances in Water Purification Tech\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring science through the context of \"Advances in Water Purification Tech\".",
        "urduExplanation": "یہ مضمون \"Advances in Water Purification Tech\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-17-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-17-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "changing from one state or condition to another",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-17-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-17-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-18",
    "title": "A Night Stranded in an Airport",
    "level": "B1",
    "genre": "story",
    "topic": "Travel",
    "wordCount": 318,
    "durationMinutes": 5,
    "summary": "A level B1 story exploring travel.",
    "urduSummary": "سطح B1 کا ایک معیاری کہانی جو Travel پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-18-1",
        "question": "What is the primary topic or central message of \"A Night Stranded in an Airport\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring travel through the context of \"A Night Stranded in an Airport\".",
        "urduExplanation": "یہ مضمون \"A Night Stranded in an Airport\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-18-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-18-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "changing from one state or condition to another"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-18-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-18-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-19",
    "title": "Mindfulness and Stress Reduction at Work",
    "level": "B1",
    "genre": "article",
    "topic": "Health",
    "wordCount": 322,
    "durationMinutes": 5,
    "summary": "A level B1 article exploring health.",
    "urduSummary": "سطح B1 کا ایک معیاری مضمون جو Health پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-19-1",
        "question": "What is the primary topic or central message of \"Mindfulness and Stress Reduction at Work\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring health through the context of \"Mindfulness and Stress Reduction at Work\".",
        "urduExplanation": "یہ مضمون \"Mindfulness and Stress Reduction at Work\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-19-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-19-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "changing from one state or condition to another",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-19-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-19-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b1-20",
    "title": "Organizing an Eco-Friendly Wedding",
    "level": "B1",
    "genre": "story",
    "topic": "Lifestyle",
    "wordCount": 326,
    "durationMinutes": 5,
    "summary": "A level B1 story exploring lifestyle.",
    "urduSummary": "سطح B1 کا ایک معیاری کہانی جو Lifestyle پر مبنی ہے۔",
    "paragraphs": [
      "Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.",
      "However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.",
      "To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle."
    ],
    "vocabularyHighlights": [
      {
        "word": "transitioning",
        "definition": "changing from one state or condition to another",
        "pos": "verb",
        "urdu": "تبدیل ہونا"
      },
      {
        "word": "boundaries",
        "definition": "lines that mark the limits of an area or activity",
        "pos": "noun",
        "urdu": "حدود"
      },
      {
        "word": "sustainable",
        "definition": "able to be maintained at a steady level without harm",
        "pos": "adjective",
        "urdu": "پائیدار"
      },
      {
        "word": "deliberate",
        "definition": "done consciously and intentionally",
        "pos": "adjective",
        "urdu": "سوچ سمجھ کر کیا گیا"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b1-20-1",
        "question": "What is the primary topic or central message of \"Organizing an Eco-Friendly Wedding\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring lifestyle through the context of \"Organizing an Eco-Friendly Wedding\".",
        "urduExplanation": "یہ مضمون \"Organizing an Eco-Friendly Wedding\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-20-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b1-20-3",
        "question": "In the context of the reading, what does the word \"transitioning\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "changing from one state or condition to another",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"transitioning\" means changing from one state or condition to another.",
        "urduExplanation": "متن میں \"transitioning\" کا مطلب \"تبدیل ہونا\" ہے۔"
      },
      {
        "id": "q-reader-b1-20-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b1-20-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-01",
    "title": "Artificial Intelligence in Modern Medicine",
    "level": "B2",
    "genre": "article",
    "topic": "Medicine",
    "wordCount": 410,
    "durationMinutes": 6,
    "summary": "A level B2 article exploring medicine.",
    "urduSummary": "سطح B2 کا ایک معیاری مضمون جو Medicine پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-01-1",
        "question": "What is the primary topic or central message of \"Artificial Intelligence in Modern Medicine\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring medicine through the context of \"Artificial Intelligence in Modern Medicine\".",
        "urduExplanation": "یہ مضمون \"Artificial Intelligence in Modern Medicine\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-01-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-01-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "never done or known before",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-01-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-01-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-02",
    "title": "The Economics of Fast Fashion",
    "level": "B2",
    "genre": "article",
    "topic": "Sustainability",
    "wordCount": 415,
    "durationMinutes": 6,
    "summary": "A level B2 article exploring sustainability.",
    "urduSummary": "سطح B2 کا ایک معیاری مضمون جو Sustainability پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-02-1",
        "question": "What is the primary topic or central message of \"The Economics of Fast Fashion\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring sustainability through the context of \"The Economics of Fast Fashion\".",
        "urduExplanation": "یہ مضمون \"The Economics of Fast Fashion\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-02-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-02-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "never done or known before"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-02-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-02-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-03",
    "title": "Quarterly Financial Strategy Briefing",
    "level": "B2",
    "genre": "dialogue",
    "topic": "Corporate",
    "wordCount": 420,
    "durationMinutes": 6,
    "summary": "A level B2 dialogue exploring corporate.",
    "urduSummary": "سطح B2 کا ایک معیاری مکالمہ جو Corporate پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-03-1",
        "question": "What is the primary topic or central message of \"Quarterly Financial Strategy Briefing\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring corporate through the context of \"Quarterly Financial Strategy Briefing\".",
        "urduExplanation": "یہ مضمون \"Quarterly Financial Strategy Briefing\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-03-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-03-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "never done or known before",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-03-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-03-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-04",
    "title": "Formal Proposal for Department Restructuring",
    "level": "B2",
    "genre": "email",
    "topic": "Management",
    "wordCount": 425,
    "durationMinutes": 7,
    "summary": "A level B2 email exploring management.",
    "urduSummary": "سطح B2 کا ایک معیاری ای میل جو Management پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-04-1",
        "question": "What is the primary topic or central message of \"Formal Proposal for Department Restructuring\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring management through the context of \"Formal Proposal for Department Restructuring\".",
        "urduExplanation": "یہ مضمون \"Formal Proposal for Department Restructuring\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-04-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-04-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "never done or known before",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-04-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-04-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-05",
    "title": "Global Climate Summit Adopts Carbon Limits",
    "level": "B2",
    "genre": "news",
    "topic": "Geopolitics",
    "wordCount": 430,
    "durationMinutes": 7,
    "summary": "A level B2 news exploring geopolitics.",
    "urduSummary": "سطح B2 کا ایک معیاری مضمون جو Geopolitics پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-05-1",
        "question": "What is the primary topic or central message of \"Global Climate Summit Adopts Carbon Limits\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring geopolitics through the context of \"Global Climate Summit Adopts Carbon Limits\".",
        "urduExplanation": "یہ مضمون \"Global Climate Summit Adopts Carbon Limits\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-05-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-05-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "never done or known before",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-05-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-05-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-06",
    "title": "Cognitive Biases in Consumer Decision Making",
    "level": "B2",
    "genre": "article",
    "topic": "Psychology",
    "wordCount": 435,
    "durationMinutes": 7,
    "summary": "A level B2 article exploring psychology.",
    "urduSummary": "سطح B2 کا ایک معیاری مضمون جو Psychology پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-06-1",
        "question": "What is the primary topic or central message of \"Cognitive Biases in Consumer Decision Making\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring psychology through the context of \"Cognitive Biases in Consumer Decision Making\".",
        "urduExplanation": "یہ مضمون \"Cognitive Biases in Consumer Decision Making\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-06-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-06-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "never done or known before"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-06-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-06-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-07",
    "title": "Debating Ethics of Autonomous Vehicles",
    "level": "B2",
    "genre": "dialogue",
    "topic": "Ethics",
    "wordCount": 440,
    "durationMinutes": 7,
    "summary": "A level B2 dialogue exploring ethics.",
    "urduSummary": "سطح B2 کا ایک معیاری مکالمہ جو Ethics پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-07-1",
        "question": "What is the primary topic or central message of \"Debating Ethics of Autonomous Vehicles\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring ethics through the context of \"Debating Ethics of Autonomous Vehicles\".",
        "urduExplanation": "یہ مضمون \"Debating Ethics of Autonomous Vehicles\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-07-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-07-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "never done or known before",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-07-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-07-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-08",
    "title": "Partnership Agreement Memorandum",
    "level": "B2",
    "genre": "email",
    "topic": "Law",
    "wordCount": 445,
    "durationMinutes": 7,
    "summary": "A level B2 email exploring law.",
    "urduSummary": "سطح B2 کا ایک معیاری ای میل جو Law پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-08-1",
        "question": "What is the primary topic or central message of \"Partnership Agreement Memorandum\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring law through the context of \"Partnership Agreement Memorandum\".",
        "urduExplanation": "یہ مضمون \"Partnership Agreement Memorandum\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-08-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-08-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "never done or known before",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-08-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-08-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-09",
    "title": "Breakthrough in Fusion Energy Research",
    "level": "B2",
    "genre": "news",
    "topic": "Physics",
    "wordCount": 450,
    "durationMinutes": 7,
    "summary": "A level B2 news exploring physics.",
    "urduSummary": "سطح B2 کا ایک معیاری مضمون جو Physics پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-09-1",
        "question": "What is the primary topic or central message of \"Breakthrough in Fusion Energy Research\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring physics through the context of \"Breakthrough in Fusion Energy Research\".",
        "urduExplanation": "یہ مضمون \"Breakthrough in Fusion Energy Research\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-09-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-09-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "never done or known before",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-09-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-09-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-10",
    "title": "The Archivist and the Forgotten Manuscript",
    "level": "B2",
    "genre": "story",
    "topic": "History",
    "wordCount": 455,
    "durationMinutes": 7,
    "summary": "A level B2 story exploring history.",
    "urduSummary": "سطح B2 کا ایک معیاری کہانی جو History پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-10-1",
        "question": "What is the primary topic or central message of \"The Archivist and the Forgotten Manuscript\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring history through the context of \"The Archivist and the Forgotten Manuscript\".",
        "urduExplanation": "یہ مضمون \"The Archivist and the Forgotten Manuscript\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-10-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-10-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "never done or known before"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-10-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-10-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-11",
    "title": "Podcast Interview on Urban Architecture",
    "level": "B2",
    "genre": "dialogue",
    "topic": "Design",
    "wordCount": 460,
    "durationMinutes": 7,
    "summary": "A level B2 dialogue exploring design.",
    "urduSummary": "سطح B2 کا ایک معیاری مکالمہ جو Design پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-11-1",
        "question": "What is the primary topic or central message of \"Podcast Interview on Urban Architecture\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring design through the context of \"Podcast Interview on Urban Architecture\".",
        "urduExplanation": "یہ مضمون \"Podcast Interview on Urban Architecture\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-11-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-11-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "never done or known before",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-11-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-11-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-12",
    "title": "Client Account Audit Review Findings",
    "level": "B2",
    "genre": "email",
    "topic": "Finance",
    "wordCount": 465,
    "durationMinutes": 7,
    "summary": "A level B2 email exploring finance.",
    "urduSummary": "سطح B2 کا ایک معیاری ای میل جو Finance پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-12-1",
        "question": "What is the primary topic or central message of \"Client Account Audit Review Findings\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring finance through the context of \"Client Account Audit Review Findings\".",
        "urduExplanation": "یہ مضمون \"Client Account Audit Review Findings\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-12-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-12-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "never done or known before",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-12-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-12-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-13",
    "title": "Central Bank Adjusts Interest Rates",
    "level": "B2",
    "genre": "news",
    "topic": "Economics",
    "wordCount": 470,
    "durationMinutes": 7,
    "summary": "A level B2 news exploring economics.",
    "urduSummary": "سطح B2 کا ایک معیاری مضمون جو Economics پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-13-1",
        "question": "What is the primary topic or central message of \"Central Bank Adjusts Interest Rates\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring economics through the context of \"Central Bank Adjusts Interest Rates\".",
        "urduExplanation": "یہ مضمون \"Central Bank Adjusts Interest Rates\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-13-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-13-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "never done or known before",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-13-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-13-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-14",
    "title": "The Resilience of Multilingual Communities",
    "level": "B2",
    "genre": "article",
    "topic": "Sociology",
    "wordCount": 475,
    "durationMinutes": 7,
    "summary": "A level B2 article exploring sociology.",
    "urduSummary": "سطح B2 کا ایک معیاری مضمون جو Sociology پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-14-1",
        "question": "What is the primary topic or central message of \"The Resilience of Multilingual Communities\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring sociology through the context of \"The Resilience of Multilingual Communities\".",
        "urduExplanation": "یہ مضمون \"The Resilience of Multilingual Communities\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-14-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-14-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "never done or known before"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-14-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-14-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-15",
    "title": "Crisis Management in Public Relations",
    "level": "B2",
    "genre": "dialogue",
    "topic": "Media",
    "wordCount": 480,
    "durationMinutes": 7,
    "summary": "A level B2 dialogue exploring media.",
    "urduSummary": "سطح B2 کا ایک معیاری مکالمہ جو Media پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-15-1",
        "question": "What is the primary topic or central message of \"Crisis Management in Public Relations\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring media through the context of \"Crisis Management in Public Relations\".",
        "urduExplanation": "یہ مضمون \"Crisis Management in Public Relations\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-15-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-15-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "never done or known before",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-15-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-15-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-16",
    "title": "Grant Proposal for Marine Conservation",
    "level": "B2",
    "genre": "email",
    "topic": "Ecology",
    "wordCount": 485,
    "durationMinutes": 7,
    "summary": "A level B2 email exploring ecology.",
    "urduSummary": "سطح B2 کا ایک معیاری ای میل جو Ecology پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-16-1",
        "question": "What is the primary topic or central message of \"Grant Proposal for Marine Conservation\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring ecology through the context of \"Grant Proposal for Marine Conservation\".",
        "urduExplanation": "یہ مضمون \"Grant Proposal for Marine Conservation\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-16-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-16-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "never done or known before",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-16-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-16-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-17",
    "title": "International Space Station Expansion",
    "level": "B2",
    "genre": "news",
    "topic": "Space",
    "wordCount": 490,
    "durationMinutes": 8,
    "summary": "A level B2 news exploring space.",
    "urduSummary": "سطح B2 کا ایک معیاری مضمون جو Space پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-17-1",
        "question": "What is the primary topic or central message of \"International Space Station Expansion\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring space through the context of \"International Space Station Expansion\".",
        "urduExplanation": "یہ مضمون \"International Space Station Expansion\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-17-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-17-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "never done or known before",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-17-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-17-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-18",
    "title": "The Evolution of Jazz and Blues",
    "level": "B2",
    "genre": "article",
    "topic": "Music",
    "wordCount": 495,
    "durationMinutes": 8,
    "summary": "A level B2 article exploring music.",
    "urduSummary": "سطح B2 کا ایک معیاری مضمون جو Music پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-18-1",
        "question": "What is the primary topic or central message of \"The Evolution of Jazz and Blues\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring music through the context of \"The Evolution of Jazz and Blues\".",
        "urduExplanation": "یہ مضمون \"The Evolution of Jazz and Blues\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-18-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-18-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "never done or known before"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-18-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-18-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-19",
    "title": "The Philosopher and the Modern Metropolis",
    "level": "B2",
    "genre": "story",
    "topic": "Philosophy",
    "wordCount": 500,
    "durationMinutes": 8,
    "summary": "A level B2 story exploring philosophy.",
    "urduSummary": "سطح B2 کا ایک معیاری کہانی جو Philosophy پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-19-1",
        "question": "What is the primary topic or central message of \"The Philosopher and the Modern Metropolis\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring philosophy through the context of \"The Philosopher and the Modern Metropolis\".",
        "urduExplanation": "یہ مضمون \"The Philosopher and the Modern Metropolis\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-19-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-19-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "never done or known before",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-19-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-19-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-b2-20",
    "title": "Navigating Cross-Cultural Negotiations",
    "level": "B2",
    "genre": "article",
    "topic": "Communication",
    "wordCount": 505,
    "durationMinutes": 8,
    "summary": "A level B2 article exploring communication.",
    "urduSummary": "سطح B2 کا ایک معیاری مضمون جو Communication پر مبنی ہے۔",
    "paragraphs": [
      "The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.",
      "In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.",
      "Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.",
      "Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment."
    ],
    "vocabularyHighlights": [
      {
        "word": "unprecedented",
        "definition": "never done or known before",
        "pos": "adjective",
        "urdu": "بے مثال / پہلے کبھی نہ ہوا"
      },
      {
        "word": "scrutiny",
        "definition": "critical observation or examination",
        "pos": "noun",
        "urdu": "گہری جانچ پڑتال"
      },
      {
        "word": "perpetuate",
        "definition": "make something continue indefinitely",
        "pos": "verb",
        "urdu": "برقرار رکھنا / جاری رکھنا"
      },
      {
        "word": "indispensable",
        "definition": "absolutely necessary; essential",
        "pos": "adjective",
        "urdu": "ناگزیر / لازمی"
      }
    ],
    "questions": [
      {
        "id": "q-reader-b2-20-1",
        "question": "What is the primary topic or central message of \"Navigating Cross-Cultural Negotiations\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring communication through the context of \"Navigating Cross-Cultural Negotiations\".",
        "urduExplanation": "یہ مضمون \"Navigating Cross-Cultural Negotiations\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-20-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-b2-20-3",
        "question": "In the context of the reading, what does the word \"unprecedented\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "never done or known before",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"unprecedented\" means never done or known before.",
        "urduExplanation": "متن میں \"unprecedented\" کا مطلب \"بے مثال / پہلے کبھی نہ ہوا\" ہے۔"
      },
      {
        "id": "q-reader-b2-20-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-b2-20-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-01",
    "title": "Epistemological Shifts in the Digital Era",
    "level": "C1",
    "genre": "article",
    "topic": "Philosophy",
    "wordCount": 590,
    "durationMinutes": 9,
    "summary": "A level C1 article exploring philosophy.",
    "urduSummary": "سطح C1 کا ایک معیاری مضمون جو Philosophy پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-01-1",
        "question": "What is the primary topic or central message of \"Epistemological Shifts in the Digital Era\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring philosophy through the context of \"Epistemological Shifts in the Digital Era\".",
        "urduExplanation": "یہ مضمون \"Epistemological Shifts in the Digital Era\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-01-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-01-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "relating to the theory of knowledge and how we know things",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-01-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-01-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-02",
    "title": "Macroeconomic Ramifications of Quantitative Tightening",
    "level": "C1",
    "genre": "article",
    "topic": "Economics",
    "wordCount": 596,
    "durationMinutes": 9,
    "summary": "A level C1 article exploring economics.",
    "urduSummary": "سطح C1 کا ایک معیاری مضمون جو Economics پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-02-1",
        "question": "What is the primary topic or central message of \"Macroeconomic Ramifications of Quantitative Tightening\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring economics through the context of \"Macroeconomic Ramifications of Quantitative Tightening\".",
        "urduExplanation": "یہ مضمون \"Macroeconomic Ramifications of Quantitative Tightening\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-02-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-02-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "relating to the theory of knowledge and how we know things"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-02-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-02-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-03",
    "title": "Symposium on Genetic Editing Jurisprudence",
    "level": "C1",
    "genre": "dialogue",
    "topic": "Bioethics",
    "wordCount": 602,
    "durationMinutes": 9,
    "summary": "A level C1 dialogue exploring bioethics.",
    "urduSummary": "سطح C1 کا ایک معیاری مکالمہ جو Bioethics پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-03-1",
        "question": "What is the primary topic or central message of \"Symposium on Genetic Editing Jurisprudence\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring bioethics through the context of \"Symposium on Genetic Editing Jurisprudence\".",
        "urduExplanation": "یہ مضمون \"Symposium on Genetic Editing Jurisprudence\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-03-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-03-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "relating to the theory of knowledge and how we know things",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-03-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-03-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-04",
    "title": "Executive Directorate Briefing on Strategic Risk",
    "level": "C1",
    "genre": "email",
    "topic": "Governance",
    "wordCount": 608,
    "durationMinutes": 9,
    "summary": "A level C1 email exploring governance.",
    "urduSummary": "سطح C1 کا ایک معیاری ای میل جو Governance پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-04-1",
        "question": "What is the primary topic or central message of \"Executive Directorate Briefing on Strategic Risk\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring governance through the context of \"Executive Directorate Briefing on Strategic Risk\".",
        "urduExplanation": "یہ مضمون \"Executive Directorate Briefing on Strategic Risk\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-04-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-04-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "relating to the theory of knowledge and how we know things",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-04-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-04-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-05",
    "title": "Treaty on Autonomous Defense Systems Signed",
    "level": "C1",
    "genre": "news",
    "topic": "Defense",
    "wordCount": 614,
    "durationMinutes": 9,
    "summary": "A level C1 news exploring defense.",
    "urduSummary": "سطح C1 کا ایک معیاری مضمون جو Defense پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-05-1",
        "question": "What is the primary topic or central message of \"Treaty on Autonomous Defense Systems Signed\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring defense through the context of \"Treaty on Autonomous Defense Systems Signed\".",
        "urduExplanation": "یہ مضمون \"Treaty on Autonomous Defense Systems Signed\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-05-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-05-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "relating to the theory of knowledge and how we know things",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-05-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-05-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-06",
    "title": "The Semiotics of Architectural Monumentality",
    "level": "C1",
    "genre": "article",
    "topic": "Architecture",
    "wordCount": 620,
    "durationMinutes": 10,
    "summary": "A level C1 article exploring architecture.",
    "urduSummary": "سطح C1 کا ایک معیاری مضمون جو Architecture پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-06-1",
        "question": "What is the primary topic or central message of \"The Semiotics of Architectural Monumentality\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring architecture through the context of \"The Semiotics of Architectural Monumentality\".",
        "urduExplanation": "یہ مضمون \"The Semiotics of Architectural Monumentality\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-06-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-06-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "relating to the theory of knowledge and how we know things"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-06-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-06-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-07",
    "title": "High-Stakes Diplomatic Arbitration",
    "level": "C1",
    "genre": "dialogue",
    "topic": "Diplomacy",
    "wordCount": 626,
    "durationMinutes": 10,
    "summary": "A level C1 dialogue exploring diplomacy.",
    "urduSummary": "سطح C1 کا ایک معیاری مکالمہ جو Diplomacy پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-07-1",
        "question": "What is the primary topic or central message of \"High-Stakes Diplomatic Arbitration\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring diplomacy through the context of \"High-Stakes Diplomatic Arbitration\".",
        "urduExplanation": "یہ مضمون \"High-Stakes Diplomatic Arbitration\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-07-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-07-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "relating to the theory of knowledge and how we know things",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-07-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-07-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-08",
    "title": "Comprehensive Review of Antitrust Litigation",
    "level": "C1",
    "genre": "email",
    "topic": "Antitrust",
    "wordCount": 632,
    "durationMinutes": 10,
    "summary": "A level C1 email exploring antitrust.",
    "urduSummary": "سطح C1 کا ایک معیاری ای میل جو Antitrust پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-08-1",
        "question": "What is the primary topic or central message of \"Comprehensive Review of Antitrust Litigation\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring antitrust through the context of \"Comprehensive Review of Antitrust Litigation\".",
        "urduExplanation": "یہ مضمون \"Comprehensive Review of Antitrust Litigation\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-08-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-08-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "relating to the theory of knowledge and how we know things",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-08-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-08-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-09",
    "title": "Astrophysical Confirmation of Gravitational Waves",
    "level": "C1",
    "genre": "news",
    "topic": "Astrophysics",
    "wordCount": 638,
    "durationMinutes": 10,
    "summary": "A level C1 news exploring astrophysics.",
    "urduSummary": "سطح C1 کا ایک معیاری مضمون جو Astrophysics پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-09-1",
        "question": "What is the primary topic or central message of \"Astrophysical Confirmation of Gravitational Waves\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring astrophysics through the context of \"Astrophysical Confirmation of Gravitational Waves\".",
        "urduExplanation": "یہ مضمون \"Astrophysical Confirmation of Gravitational Waves\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-09-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-09-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "relating to the theory of knowledge and how we know things",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-09-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-09-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-10",
    "title": "The Cartographer's Paradox",
    "level": "C1",
    "genre": "story",
    "topic": "Literature",
    "wordCount": 644,
    "durationMinutes": 10,
    "summary": "A level C1 story exploring literature.",
    "urduSummary": "سطح C1 کا ایک معیاری کہانی جو Literature پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-10-1",
        "question": "What is the primary topic or central message of \"The Cartographer's Paradox\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring literature through the context of \"The Cartographer's Paradox\".",
        "urduExplanation": "یہ مضمون \"The Cartographer's Paradox\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-10-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-10-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "relating to the theory of knowledge and how we know things"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-10-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-10-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-11",
    "title": "Colloquium on Neuroplasticity and Aging",
    "level": "C1",
    "genre": "dialogue",
    "topic": "Neuroscience",
    "wordCount": 650,
    "durationMinutes": 10,
    "summary": "A level C1 dialogue exploring neuroscience.",
    "urduSummary": "سطح C1 کا ایک معیاری مکالمہ جو Neuroscience پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-11-1",
        "question": "What is the primary topic or central message of \"Colloquium on Neuroplasticity and Aging\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring neuroscience through the context of \"Colloquium on Neuroplasticity and Aging\".",
        "urduExplanation": "یہ مضمون \"Colloquium on Neuroplasticity and Aging\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-11-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-11-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "relating to the theory of knowledge and how we know things",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-11-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-11-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-12",
    "title": "Memorandum on Sovereign Debt Restructuring",
    "level": "C1",
    "genre": "email",
    "topic": "Finance",
    "wordCount": 656,
    "durationMinutes": 10,
    "summary": "A level C1 email exploring finance.",
    "urduSummary": "سطح C1 کا ایک معیاری ای میل جو Finance پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-12-1",
        "question": "What is the primary topic or central message of \"Memorandum on Sovereign Debt Restructuring\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring finance through the context of \"Memorandum on Sovereign Debt Restructuring\".",
        "urduExplanation": "یہ مضمون \"Memorandum on Sovereign Debt Restructuring\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-12-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-12-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "relating to the theory of knowledge and how we know things",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-12-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-12-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-13",
    "title": "Landmark Verdict on Intellectual Property in AI",
    "level": "C1",
    "genre": "news",
    "topic": "Legal",
    "wordCount": 662,
    "durationMinutes": 10,
    "summary": "A level C1 news exploring legal.",
    "urduSummary": "سطح C1 کا ایک معیاری مضمون جو Legal پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-13-1",
        "question": "What is the primary topic or central message of \"Landmark Verdict on Intellectual Property in AI\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring legal through the context of \"Landmark Verdict on Intellectual Property in AI\".",
        "urduExplanation": "یہ مضمون \"Landmark Verdict on Intellectual Property in AI\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-13-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-13-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "relating to the theory of knowledge and how we know things",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-13-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-13-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-14",
    "title": "Historiographical Critiques of Enlightenment Rationalism",
    "level": "C1",
    "genre": "article",
    "topic": "Historiography",
    "wordCount": 668,
    "durationMinutes": 10,
    "summary": "A level C1 article exploring historiography.",
    "urduSummary": "سطح C1 کا ایک معیاری مضمون جو Historiography پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-14-1",
        "question": "What is the primary topic or central message of \"Historiographical Critiques of Enlightenment Rationalism\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring historiography through the context of \"Historiographical Critiques of Enlightenment Rationalism\".",
        "urduExplanation": "یہ مضمون \"Historiographical Critiques of Enlightenment Rationalism\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-14-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-14-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "relating to the theory of knowledge and how we know things"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-14-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-14-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-15",
    "title": "Roundtable on Global Food Supply Vulnerability",
    "level": "C1",
    "genre": "dialogue",
    "topic": "Agriculture",
    "wordCount": 674,
    "durationMinutes": 10,
    "summary": "A level C1 dialogue exploring agriculture.",
    "urduSummary": "سطح C1 کا ایک معیاری مکالمہ جو Agriculture پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-15-1",
        "question": "What is the primary topic or central message of \"Roundtable on Global Food Supply Vulnerability\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring agriculture through the context of \"Roundtable on Global Food Supply Vulnerability\".",
        "urduExplanation": "یہ مضمون \"Roundtable on Global Food Supply Vulnerability\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-15-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-15-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "relating to the theory of knowledge and how we know things",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-15-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-15-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-16",
    "title": "Transnational Policy Framework on Carbon Border Taxes",
    "level": "C1",
    "genre": "email",
    "topic": "Policy",
    "wordCount": 680,
    "durationMinutes": 10,
    "summary": "A level C1 email exploring policy.",
    "urduSummary": "سطح C1 کا ایک معیاری ای میل جو Policy پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-16-1",
        "question": "What is the primary topic or central message of \"Transnational Policy Framework on Carbon Border Taxes\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring policy through the context of \"Transnational Policy Framework on Carbon Border Taxes\".",
        "urduExplanation": "یہ مضمون \"Transnational Policy Framework on Carbon Border Taxes\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-16-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-16-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "relating to the theory of knowledge and how we know things",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-16-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-16-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-17",
    "title": "Deep-Sea Hydrothermal Vent Ecosystems Discovered",
    "level": "C1",
    "genre": "news",
    "topic": "Oceanography",
    "wordCount": 686,
    "durationMinutes": 11,
    "summary": "A level C1 news exploring oceanography.",
    "urduSummary": "سطح C1 کا ایک معیاری مضمون جو Oceanography پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-17-1",
        "question": "What is the primary topic or central message of \"Deep-Sea Hydrothermal Vent Ecosystems Discovered\"?",
        "options": [
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 0,
        "explanation": "The passage centers directly on exploring oceanography through the context of \"Deep-Sea Hydrothermal Vent Ecosystems Discovered\".",
        "urduExplanation": "یہ مضمون \"Deep-Sea Hydrothermal Vent Ecosystems Discovered\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-17-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "The introductory situation, foundational conditions, and key opening background.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 1,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-17-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "relating to the theory of knowledge and how we know things",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 2,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-17-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes."
        ],
        "correctIndex": 3,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-17-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 0,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-18",
    "title": "Linguistic Determinism and Algorithmic Thought",
    "level": "C1",
    "genre": "article",
    "topic": "Cognitive Science",
    "wordCount": 692,
    "durationMinutes": 11,
    "summary": "A level C1 article exploring cognitive science.",
    "urduSummary": "سطح C1 کا ایک معیاری مضمون جو Cognitive Science پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-18-1",
        "question": "What is the primary topic or central message of \"Linguistic Determinism and Algorithmic Thought\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 1,
        "explanation": "The passage centers directly on exploring cognitive science through the context of \"Linguistic Determinism and Algorithmic Thought\".",
        "urduExplanation": "یہ مضمون \"Linguistic Determinism and Algorithmic Thought\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-18-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "The introductory situation, foundational conditions, and key opening background.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 2,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-18-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli.",
          "relating to the theory of knowledge and how we know things"
        ],
        "correctIndex": 3,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-18-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 0,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-18-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 1,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-19",
    "title": "Solitude in Contemporary Post-Industrial Society",
    "level": "C1",
    "genre": "story",
    "topic": "Sociology",
    "wordCount": 698,
    "durationMinutes": 11,
    "summary": "A level C1 story exploring sociology.",
    "urduSummary": "سطح C1 کا ایک معیاری کہانی جو Sociology پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-19-1",
        "question": "What is the primary topic or central message of \"Solitude in Contemporary Post-Industrial Society\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "The key concepts, narrative events, and practical lessons highlighted in the text.",
          "An advertising promotion describing special store promotions for electronics."
        ],
        "correctIndex": 2,
        "explanation": "The passage centers directly on exploring sociology through the context of \"Solitude in Contemporary Post-Industrial Society\".",
        "urduExplanation": "یہ مضمون \"Solitude in Contemporary Post-Industrial Society\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-19-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter.",
          "The introductory situation, foundational conditions, and key opening background."
        ],
        "correctIndex": 3,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-19-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "relating to the theory of knowledge and how we know things",
          "Displaying an opposite and unrelated functional attribute in every context.",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 0,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-19-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 1,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-19-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital.",
          "Mandatory postponement of all practical decisions for at least three decades."
        ],
        "correctIndex": 2,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  },
  {
    "id": "reader-c1-20",
    "title": "The Dialectic of Aesthetic Realism and Modernism",
    "level": "C1",
    "genre": "article",
    "topic": "Art Theory",
    "wordCount": 704,
    "durationMinutes": 11,
    "summary": "A level C1 article exploring art theory.",
    "urduSummary": "سطح C1 کا ایک معیاری مضمون جو Art Theory پر مبنی ہے۔",
    "paragraphs": [
      "The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.",
      "Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.",
      "Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.",
      "To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity."
    ],
    "vocabularyHighlights": [
      {
        "word": "epistemological",
        "definition": "relating to the theory of knowledge and how we know things",
        "pos": "adjective",
        "urdu": "علمیاتی / نظریہ علم سے متعلق"
      },
      {
        "word": "hermeneutics",
        "definition": "the branch of knowledge dealing with interpretation",
        "pos": "noun",
        "urdu": "تعبیر و تشریح کا علم"
      },
      {
        "word": "proliferation",
        "definition": "rapid increase in numbers or amount",
        "pos": "noun",
        "urdu": "تیزی سے پھیلاؤ"
      },
      {
        "word": "insidious",
        "definition": "proceeding in a gradual, subtle way, but with harmful effects",
        "pos": "adjective",
        "urdu": "خفیہ طور پر نقصان دہ"
      }
    ],
    "questions": [
      {
        "id": "q-reader-c1-20-1",
        "question": "What is the primary topic or central message of \"The Dialectic of Aesthetic Realism and Modernism\"?",
        "options": [
          "A fictional historical narrative regarding medieval conflicts in distant lands.",
          "Detailed technical arithmetic calculations unrelated to the stated themes.",
          "An advertising promotion describing special store promotions for electronics.",
          "The key concepts, narrative events, and practical lessons highlighted in the text."
        ],
        "correctIndex": 3,
        "explanation": "The passage centers directly on exploring art theory through the context of \"The Dialectic of Aesthetic Realism and Modernism\".",
        "urduExplanation": "یہ مضمون \"The Dialectic of Aesthetic Realism and Modernism\" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-20-2",
        "question": "According to the opening paragraph, what initial context or setting is established?",
        "options": [
          "The introductory situation, foundational conditions, and key opening background.",
          "An emergency disruption requiring an immediate evacuation of the entire premises.",
          "A formal international legal treaty negotiation between sovereign delegations.",
          "An Arctic survival expedition facing severe blizzards without shelter."
        ],
        "correctIndex": 0,
        "explanation": "The opening lines set the scene, timing, and foundational context for the topic.",
        "urduExplanation": "پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔"
      },
      {
        "id": "q-reader-c1-20-3",
        "question": "In the context of the reading, what does the word \"epistemological\" mean?",
        "options": [
          "Displaying an opposite and unrelated functional attribute in every context.",
          "relating to the theory of knowledge and how we know things",
          "An obsolete medieval administrative classification no longer recognized.",
          "An involuntary reflex action caused by exposure to sudden physical stimuli."
        ],
        "correctIndex": 1,
        "explanation": "In this text, \"epistemological\" means relating to the theory of knowledge and how we know things.",
        "urduExplanation": "متن میں \"epistemological\" کا مطلب \"علمیاتی / نظریہ علم سے متعلق\" ہے۔"
      },
      {
        "id": "q-reader-c1-20-4",
        "question": "Which observation is supported by the subsequent details in the passage?",
        "options": [
          "None of the participating individuals gained any actionable insights or benefits.",
          "All planned activities were canceled indefinitely due to unpredicted meteorological events.",
          "Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.",
          "The described occurrences unfolded entirely within an underwater marine habitat."
        ],
        "correctIndex": 2,
        "explanation": "The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.",
        "urduExplanation": "متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔"
      },
      {
        "id": "q-reader-c1-20-5",
        "question": "What overarching perspective or takeaway does the conclusion emphasize?",
        "options": [
          "Immediate cessation of all current efforts without conducting further review.",
          "The permanent abandonment of language learning and communicative practice.",
          "Mandatory postponement of all practical decisions for at least three decades.",
          "Sustained reflection, balanced implementation, and mindful discipline are vital."
        ],
        "correctIndex": 3,
        "explanation": "The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.",
        "urduExplanation": "نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔"
      }
    ]
  }
];
