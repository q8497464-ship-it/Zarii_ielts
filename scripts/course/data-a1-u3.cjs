/**
 * Zarii English Course - Level A1, Unit 3 Content
 * Unit 3: Present Simple & Daily Routines
 * Lessons 1 to 5
 */

module.exports = [
  // -------------------------------------------------------------------------
  // LESSON 1: Present Simple: Positive Statements
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u3-l1",
    level: "A1",
    unit: "unit-3",
    order: 1,
    title: "Present Simple: Positive Statements",
    description: "Express habits, universal truths, and daily repeated actions using affirmative present simple verbs.",
    objectives: [
      "Identify the communicative purposes of the present simple tense (habits, routines, facts)",
      "Form positive statements with pronouns (I, you, we, they + base verb; he, she, it + verb-s)",
      "Interpret the tense timeline illustrating repeated regular actions across past, present, and future"
    ],
    estimatedMinutes: 12,
    prerequisites: ["eng-a1-u2-l5"],
    skillTags: ["present-simple", "verbs", "routines", "grammar-tenses"],
    vocabularyList: [
      { word: "wake", partOfSpeech: "verb", phonetic: "/weÉªk/", definition: "To emerge or cause to emerge from sleep.", urduMeaning: "Ø¬Ø§Ú¯Ù†Ø§ / Ø¨ÛŒØ¯Ø§Ø± Û ÙˆÙ†Ø§", exampleSentence: "I wake up at six o'clock every morning." },
      { word: "sleep", partOfSpeech: "verb", phonetic: "/sliË p/", definition: "To rest in a natural periodic state of suspension of consciousness.", urduMeaning: "Ø³ÙˆÙ†Ø§", exampleSentence: "They sleep eight hours each night." },
      { word: "work", partOfSpeech: "verb", phonetic: "/wÉœË k/", definition: "To perform activity involving mental or physical effort.", urduMeaning: "Ú©Ø§Ù… Ú©Ø±Ù†Ø§", exampleSentence: "She works at a software company." },
      { word: "study", partOfSpeech: "verb", phonetic: "/ËˆstÊŒdi/", definition: "To apply the mind to the acquisition of knowledge.", urduMeaning: "Ù¾Ú‘Ú¾Ù†Ø§ / Ù…Ø·Ø§Ù„Ø¹Û  Ú©Ø±Ù†Ø§", exampleSentence: "We study English every evening." },
      { word: "live", partOfSpeech: "verb", phonetic: "/lÉªv/", definition: "To make one's home in a particular place.", urduMeaning: "Ø±Û Ù†Ø§ / Ø±Û Ø§Ø¦Ø´ Ø§Ø®ØªÛŒØ§Ø± Ú©Ø±Ù†Ø§", exampleSentence: "My family lives in Lahore." },
      { word: "drink", partOfSpeech: "verb", phonetic: "/drÉªÅ‹k/", definition: "To take a liquid into the mouth and swallow.", urduMeaning: "Ù¾ÛŒÙ†Ø§", exampleSentence: "He drinks a cup of green tea after lunch." },
      { word: "eat", partOfSpeech: "verb", phonetic: "/iË t/", definition: "To put food into the mouth and chew and swallow it.", urduMeaning: "Ú©Ú¾Ø§Ù†Ø§", exampleSentence: "They eat fresh fruit every day." },
      { word: "walk", partOfSpeech: "verb", phonetic: "/wÉ”Ë k/", definition: "To move at a regular pace by lifting and setting down each foot in turn.", urduMeaning: "Ù¾ÛŒØ¯Ù„ Ú†Ù„Ù†Ø§", exampleSentence: "I walk to the office every morning." },
      { word: "read", partOfSpeech: "verb", phonetic: "/riË d/", definition: "To look at and comprehend the meaning of written words.", urduMeaning: "Ù¾Ú‘Ú¾Ù†Ø§", exampleSentence: "She reads the morning newspaper daily." },
      { word: "speak", partOfSpeech: "verb", phonetic: "/spiË k/", definition: "To say something in order to convey information or feeling.", urduMeaning: "Ø¨ÙˆÙ„Ù†Ø§", exampleSentence: "They speak English and Urdu fluently." }
    ],
    sections: [
      {
        id: "sec-a1-u3-l1-1",
        type: "explain",
        title: "Mastering the Present Simple Tense",
        content: "We use the **Present Simple** tense to speak about things that happen **regularly**, **habitual actions**, or things that are **always true**.\n\nIt is not used for what is happening right this second; it describes your permanent life habits and universal realities.",
        tables: [
          {
            title: "Form / Use / Signal Words / Common Mistakes",
            headers: ["Aspect", "Rule Details", "Examples", "Crucial Note"],
            rows: [
              ["Form (I, You, We, They)", "Subject + Base Verb (V1)", "I work / You study / They live in Lahore", "No suffixes added to the verb."],
              ["Form (He, She, It)", "Subject + Verb-s / -es", "He works / She studies / It rains", "Must add -s/-es for singular third person."],
              ["Use", "Habits, general truths, scheduled routines", "The sun rises in the east / I drink coffee", "Expresses facts and permanent situations."],
              ["Signal Words", "Every day, always, usually, often, on Mondays", "I run every morning / She usually wakes early", "Time phrases indicate frequency."],
              ["Common Mistakes", "Dropping the -s on He/She/It", "Incorrect: 'He live here' -> Correct: 'He lives here'", "Subject-verb agreement is mandatory."]
            ]
          },
          {
            title: "Conjugation Table: 'To Work'",
            headers: ["Subject Pronoun", "Verb Form", "Example Sentence", "Urdu Translation"],
            rows: [
              ["I", "work", "I work at a bank.", "Ù…ÛŒÚº Ø¨ÛŒÙ†Ú© Ù…ÛŒÚº Ú©Ø§Ù… Ú©Ø±ØªØ§ Û ÙˆÚºÛ”"],
              ["You", "work", "You work very hard.", "Ø¢Ù¾ Ø¨Û Øª Ù…Ø­Ù†Øª Ø³Û’ Ú©Ø§Ù… Ú©Ø±ØªÛ’ Û ÛŒÚºÛ”"],
              ["He", "works", "He works in Karachi.", "ÙˆÛ  Ú©Ø±Ø§Ú†ÛŒ Ù…ÛŒÚº Ú©Ø§Ù… Ú©Ø±ØªØ§ Û Û’Û”"],
              ["She", "works", "She works as a teacher.", "ÙˆÛ  Ø¨Ø·ÙˆØ± Ø§Ø³ØªØ§Ù†ÛŒ Ú©Ø§Ù… Ú©Ø±ØªÛŒ Û ÛŒÚºÛ”"],
              ["It", "works", "It works smoothly.", "ÛŒÛ  Ø±ÙˆØ§Ù†ÛŒ Ø³Û’ Ú©Ø§Ù… Ú©Ø±ØªØ§ Û Û’Û”"],
              ["We", "work", "We work from home.", "Û Ù… Ú¯Ú¾Ø± Ø³Û’ Ú©Ø§Ù… Ú©Ø±ØªÛ’ Û ÛŒÚºÛ”"],
              ["They", "work", "They work at the hospital.", "ÙˆÛ  Û Ø³Ù¾ØªØ§Ù„ Ù…ÛŒÚº Ú©Ø§Ù… Ú©Ø±ØªÛ’ Û ÛŒÚºÛ”"]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Habit vs. Right Now",
            text: "Do not use Present Simple for an action happening at this exact second (that is Present Continuous). Say: 'I drink water every day' (habit) vs 'I am drinking water now'."
          },
          {
            type: "warning",
            title: "The SVO Order Rule",
            text: "English strictly follows Subject + Verb + Object. Say: 'I (S) drink (V) tea (O)', never 'I tea drink'."
          }
        ]
      },
      {
        id: "sec-a1-u3-l1-2",
        type: "timeline",
        title: "Present Simple Routine Timeline",
        timeline: {
          title: "Repeated Habit Across Time",
          past: "Habit in the past",
          present: "I drink tea every morning (Current repeating habit)",
          future: "Habit continues in future",
          activePoint: "present",
          explanation: "Present simple indicates regular repeating points over time, not a single momentary action."
        }
      },
      {
        id: "sec-a1-u3-l1-3",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "I wake up at six o'clock every morning.", phonetic: "/aÉª weÉªk ÊŒp Ã¦t sÉªks É™ËˆklÉ’k Ëˆevri ËˆmÉ”Ë rnÉªÅ‹/", urdu: "Ù…ÛŒÚº Û Ø± ØµØ¨Ø­ Ú†Ú¾Û’ Ø¨Ø¬Û’ Ø¨ÛŒØ¯Ø§Ø± Û ÙˆØªØ§ Û ÙˆÚºÛ”", audioText: "I wake up at six o'clock every morning." },
          { english: "She speaks English and Urdu with her classmates.", phonetic: "/ÊƒiË  spiË ks ËˆÉªÅ‹É¡lÉªÊƒ Ã¦nd ËˆÊŠÉ™duË  wÉªÃ° hÉœË r ËˆklÉ‘Ë smeÉªts/", urdu: "ÙˆÛ  Ø§Ù¾Ù†Û’ Û Ù… Ø¬Ù…Ø§Ø¹ØªÙˆÚº Ú©Û’ Ø³Ø§ØªÚ¾ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ø§ÙˆØ± Ø§Ø±Ø¯Ùˆ Ø¨ÙˆÙ„ØªÛŒ Û Û’Û”", audioText: "She speaks English and Urdu with her classmates." },
          { english: "My parents live in a quiet neighbourhood in Rawalpindi.", phonetic: "/maÉª ËˆpeÉ™rÉ™nts lÉªv Éªn É™ ËˆkwaÉªÉ™t ËˆneÉªbÉ™hÊŠd Éªn rÉ‘Ë wÙ„ËˆpÉªndi/", urdu: "Ù…ÛŒØ±Û’ ÙˆØ§Ù„Ø¯ÛŒÙ† Ø±Ø§ÙˆÙ„Ù¾Ù†ÚˆÛŒ Ú©Û’ Ø§ÛŒÚ© Ù¾Ø±Ø³Ú©ÙˆÙ† Ù…Ø­Ù„Û’ Ù…ÛŒÚº Ø±Û ØªÛ’ Û ÛŒÚºÛ”", audioText: "My parents live in a quiet neighbourhood in Rawalpindi." },
          { english: "He drinks a warm cup of tea after dinner.", phonetic: "/hiË  drÉªÅ‹ks É™ wÉ”Ë m kÊŒp É™v tiË  ËˆÉ‘Ë ftÉ™r ËˆdÉªnÉ™r/", urdu: "ÙˆÛ  Ø±Ø§Øª Ú©Û’ Ú©Ú¾Ø§Ù†Û’ Ú©Û’ Ø¨Ø¹Ø¯ Ú¯Ø±Ù… Ú†Ø§Ø¦Û’ Ú©Ø§ Ú©Ù¾ Ù¾ÛŒØªØ§ Û Û’Û”", audioText: "He drinks a warm cup of tea after dinner." },
          { english: "We study English grammar for thirty minutes every day.", phonetic: "/wiË  ËˆstÊŒdi ËˆÉªÅ‹É¡lÉªÊƒ ËˆÉ¡rÃ¦mÉ™r fÉ”Ë r ËˆÎ¸ÉœË ti ËˆmÉªnÉªts Ëˆevri deÉª/", urdu: "Û Ù… Û Ø± Ø±ÙˆØ² ØªÛŒØ³ Ù…Ù†Ù¹ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ú¯Ø±Ø§Ù…Ø± Ù¾Ú‘Ú¾ØªÛ’ Û ÛŒÚºÛ”", audioText: "We study English grammar for thirty minutes every day." },
          { english: "The sun rises in the east every day.", phonetic: "/Ã°É™ sÊŒn ËˆraÉªzÉªz Éªn Ã°i iË st Ëˆevri deÉª/", urdu: "Ø³ÙˆØ±Ø¬ Û Ø± Ø±ÙˆØ² Ù…Ø´Ø±Ù‚ Ø³Û’ Ù†Ú©Ù„ØªØ§ Û Û’Û”", audioText: "The sun rises in the east every day." },
          { english: "They walk in the park near their home every evening.", phonetic: "/Ã°eÉª wÉ”Ë k Éªn Ã°É™ pÉ‘Ë k nÉªÉ™r Ã°eÉ™r hÉ™ÊŠm Ëˆevri ËˆiË vnÉªÅ‹/", urdu: "ÙˆÛ  Û Ø± Ø´Ø§Ù… Ø§Ù¾Ù†Û’ Ú¯Ú¾Ø± Ú©Û’ Ù‚Ø±ÛŒØ¨ Ù¾Ø§Ø±Ú© Ù…ÛŒÚº Ù¾ÛŒØ¯Ù„ Ú†Ù„ØªÛ’ Û ÛŒÚºÛ”", audioText: "They walk in the park near their home every evening." },
          { english: "Tariq works at an international trading firm.", phonetic: "/ËˆtÉ‘Ë rÉªk wÉœË ks Ã¦t É™n ËŒÉªntÉ™ËˆnÃ¦ÊƒnÉ™l ËˆtreÉªdÉªÅ‹ fÉœË m/", urdu: "Ø·Ø§Ø±Ù‚ Ø§ÛŒÚ© Ø¨ÛŒÙ† Ø§Ù„Ø§Ù‚ÙˆØ§Ù…ÛŒ ØªØ¬Ø§Ø±ØªÛŒ Ú©Ù…Ù¾Ù†ÛŒ Ù…ÛŒÚº Ú©Ø§Ù… Ú©Ø±ØªØ§ Û Û’Û”", audioText: "Tariq works at an international trading firm." }
        ]
      },
      {
        id: "sec-a1-u3-l1-4",
        type: "dialogue",
        title: "Discussing Daily Habits",
        dialogue: [
          { speaker: "Usman", avatar: "U", english: "What time do you usually wake up, Bilal?", urdu: "Ø¨Ù„Ø§Ù„ØŒ Ø¢Ù¾ Ø¹Ø§Ù… Ø·ÙˆØ± Ù¾Ø± Ú©Ø³ ÙˆÙ‚Øª Ø¨ÛŒØ¯Ø§Ø± Û ÙˆØªÛ’ Û ÛŒÚºØŸ", audioText: "What time do you usually wake up, Bilal?" },
          { speaker: "Bilal", avatar: "B", english: "I wake up at Fajr prayer, around five o'clock. Then I walk in the garden.", urdu: "Ù…ÛŒÚº Ù†Ù…Ø§Ø²Ù  Ù Ø¬Ø± Ú©Û’ ÙˆÙ‚Øª Ù¾Ø§Ù†Ú† Ø¨Ø¬Û’ Ø¨ÛŒØ¯Ø§Ø± Û ÙˆØªØ§ Û ÙˆÚºÛ” Ù¾Ú¾Ø± Ù…ÛŒÚº Ø¨Ø§Øº Ù…ÛŒÚº Ù¾ÛŒØ¯Ù„ Ú†Ù„ØªØ§ Û ÙˆÚºÛ”", audioText: "I wake up at Fajr prayer, around five o'clock. Then I walk in the garden." },
          { speaker: "Usman", avatar: "U", english: "That sounds healthy! Do you eat breakfast before work?", urdu: "ÛŒÛ  Ø¨Û Øª ØµØ­Øª Ù…Ù†Ø¯Ø§Ù†Û  Ø¹Ø§Ø¯Øª Û Û’! Ú©ÛŒØ§ Ø¢Ù¾ Ú©Ø§Ù… Ù¾Ø± Ø¬Ø§Ù†Û’ Ø³Û’ Ù¾Û Ù„Û’ Ù†Ø§Ø´ØªÛ  Ú©Ø±ØªÛ’ Û ÛŒÚºØŸ", audioText: "That sounds healthy! Do you eat breakfast before work?" },
          { speaker: "Bilal", avatar: "B", english: "Yes, I eat two eggs and drink tea with my family.", urdu: "Ø¬ÛŒ Û Ø§ÚºØŒ Ù…ÛŒÚº Ø§Ù¾Ù†Û’ Ú¯Ú¾Ø± ÙˆØ§Ù„ÙˆÚº Ú©Û’ Ø³Ø§ØªÚ¾ Ø¯Ùˆ Ø§Ù†ÚˆÛ’ Ú©Ú¾Ø§ØªØ§ Û ÙˆÚº Ø§ÙˆØ± Ú†Ø§Ø¦Û’ Ù¾ÛŒØªØ§ Û ÙˆÚºÛ”", audioText: "Yes, I eat two eggs and drink tea with my family." }
        ]
      },
      {
        id: "sec-a1-u3-l1-5",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u3-l1-1",
            type: "mcq",
            skillTag: "present-simple",
            prompt: "Choose the correct verb form: 'My sister _____ in a hospital.'",
            options: [
              { id: "opt-1", text: "working" },
              { id: "opt-2", text: "work" },
              { id: "opt-3", text: "works" },
              { id: "opt-4", text: "is work" }
            ],
            correctOptionId: "opt-3",
            explanation: "'My sister' is singular third-person (she), requiring the verb with -s: 'works'.",
            urduExplanation: "'My sister' ÙˆØ§Ø­Ø¯ ØºØ§Ø¦Ø¨ (she) Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ Ù Ø¹Ù„ Ú©Û’ Ø³Ø§ØªÚ¾ -s Ù„Ú¯ Ú©Ø± 'works' Ø¢Ø¦Û’ Ú¯Ø§Û”"
          },
          {
            id: "ex-a1-u3-l1-2",
            type: "mcq",
            skillTag: "present-simple",
            prompt: "Choose the correct verb form: 'They _____ English very well.'",
            options: [
              { id: "opt-1", text: "speaks" },
              { id: "opt-2", text: "are speak" },
              { id: "opt-3", text: "speaking" },
              { id: "opt-4", text: "speak" }
            ],
            correctOptionId: "opt-4",
            explanation: "With the plural subject 'They', the base verb 'speak' is used without any suffix.",
            urduExplanation: "Ø¬Ù…Ø¹ Ù Ø§Ø¹Ù„ 'They' Ú©Û’ Ø³Ø§ØªÚ¾ Ø¨ØºÛŒØ± Ú©Ø³ÛŒ Ø§Ø¶Ø§Ù Û’ Ú©Û’ 'speak' Ù„Ú¯ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u3-l1-3",
            type: "fill_blank",
            skillTag: "present-simple",
            prompt: "Complete the sentence with the correct form of 'live': 'We _____ in Multan.'",
            correctAnswer: "live",
            explanation: "'We' takes the base verb 'live' without -s.",
            urduExplanation: "'We' Ú©Û’ Ø³Ø§ØªÚ¾ base verb 'live' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u3-l1-4",
            type: "fill_blank",
            skillTag: "present-simple",
            prompt: "Complete with the correct form of 'drink': 'He _____ a glass of milk before bed.'",
            correctAnswer: "drinks",
            explanation: "Third-person singular 'He' requires 'drinks' with -s.",
            urduExplanation: "'He' Ú©Û’ Ø³Ø§ØªÚ¾ Ù Ø¹Ù„ Ù…ÛŒÚº -s Ú©Ø§ Ø§Ø¶Ø§Ù Û  Û ÙˆÚ©Ø± 'drinks' Ø¨Ù†ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u3-l1-5",
            type: "order_sentence",
            skillTag: "present-simple",
            prompt: "Rearrange the words to form a correct affirmative sentence:",
            sentenceTokens: ["I", "walk", "to", "work", "every", "morning", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Subject (I) + verb (walk) + prepositional phrase (to work) + frequency phrase (every morning).",
            urduExplanation: "I walk to work every morning."
          },
          {
            id: "ex-a1-u3-l1-6",
            type: "order_sentence",
            skillTag: "present-simple",
            prompt: "Rearrange the words to form a correct sentence:",
            sentenceTokens: ["She", "reads", "the", "newspaper", "daily", "."],
            correctOrder: [0, 1, 2, 3, 4, 5],
            explanation: "Subject (She) + verb (reads) + object (the newspaper) + adverb (daily).",
            urduExplanation: "She reads the newspaper daily."
          },
          {
            id: "ex-a1-u3-l1-7",
            type: "match_pairs",
            skillTag: "present-simple",
            prompt: "Match each subject pronoun with its correct verb form of 'play':",
            pairs: [
              { left: "He", right: "plays" },
              { left: "They", right: "play" },
              { left: "She", right: "plays" },
              { left: "We", right: "play" }
            ],
            explanation: "Third-person singular takes 'plays'; plural and I/you take 'play'.",
            urduExplanation: "Ù Ø§Ø¹Ù„ Ú©Û’ Ù„Ø­Ø§Ø¸ Ø³Û’ Ù Ø¹Ù„ Ú©Ø§ ØµØ­ÛŒØ­ Ø¬ÙˆÚ‘Ø§ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u3-l1-8",
            type: "error_correction",
            skillTag: "present-simple",
            prompt: "Find and correct the mistake: 'My brother live in Peshawar.'",
            correctAnswer: "My brother lives in Peshawar.",
            explanation: "'My brother' is singular third-person, so the verb must be 'lives'.",
            urduExplanation: "'My brother' ÙˆØ§Ø­Ø¯ Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'lives' Ù„Ú©Ú¾Ù†Ø§ Ø¶Ø±ÙˆØ±ÛŒ Û Û’Û”"
          },
          {
            id: "ex-a1-u3-l1-9",
            type: "error_correction",
            skillTag: "present-simple",
            prompt: "Find and correct the mistake: 'They works at the local bank.'",
            correctAnswer: "They work at the local bank.",
            explanation: "'They' is a plural subject and takes the base verb 'work' without -s.",
            urduExplanation: "'They' Ú©Û’ Ø³Ø§ØªÚ¾ -s Ù†Û ÛŒÚº Ù„Ú¯ØªØ§ØŒ 'work' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u3-l1-10",
            type: "true_false",
            skillTag: "present-simple",
            prompt: "Present simple is used to talk about actions happening right now at this second. (True or False)",
            correctAnswer: "False",
            explanation: "False. Present Simple is for routines, habits, and permanent facts. Actions happening now use Present Continuous.",
            urduExplanation: "ØºÙ„Ø·Û” Ù…ÙˆØ¬ÙˆØ¯Û  Ù„Ù…Ø­Û’ Ù…ÛŒÚº Û ÙˆÙ†Û’ ÙˆØ§Ù„Û’ Ú©Ø§Ù… Ú©Û’ Ù„ÛŒÛ’ Present Continuous Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u3-l1-6",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u3-l1-1",
            type: "mcq",
            skillTag: "present-simple",
            prompt: "Which sentence expresses a general fact using present simple correctly?",
            options: [
              { id: "opt-1", text: "Water boils at 100 degrees Celsius." },
              { id: "opt-2", text: "Water is boil at 100 degrees Celsius." },
              { id: "opt-3", text: "Water boiling at 100 degrees Celsius." },
              { id: "opt-4", text: "Water boil at 100 degrees Celsius." }
            ],
            correctOptionId: "opt-1",
            explanation: "'Water' is an uncountable singular noun, so the verb takes -s: 'boils'.",
            urduExplanation: "'Water' ÙˆØ§Ø­Ø¯ Û Û’ Ø§Ø³ Ù„ÛŒÛ’ 'boils' ØµØ­ÛŒØ­ Û Û’Û”"
          },
          {
            id: "qz-a1-u3-l1-2",
            type: "mcq",
            skillTag: "present-simple",
            prompt: "Complete the sentence: 'Ali and Ahmed _____ cricket every Sunday.'",
            options: [
              { id: "opt-1", text: "plays" },
              { id: "opt-2", text: "play" },
              { id: "opt-3", text: "playing" },
              { id: "opt-4", text: "are play" }
            ],
            correctOptionId: "opt-2",
            explanation: "'Ali and Ahmed' form a plural subject (they), requiring the base form 'play'.",
            urduExplanation: "Ø¹Ù„ÛŒ Ø§ÙˆØ± Ø§Ø­Ù…Ø¯ Ù…Ù„ Ú©Ø± Ø¬Ù…Ø¹ Ù Ø§Ø¹Ù„ Ø¨Ù†ØªÛ’ Û ÛŒÚºØŒ Ø§Ø³ Ù„ÛŒÛ’ 'play' Ø¢Ø¦Û’ Ú¯Ø§Û”"
          },
          {
            id: "qz-a1-u3-l1-3",
            type: "mcq",
            skillTag: "present-simple",
            prompt: "Which pronoun requires the verb to end in -s or -es in present simple?",
            options: [
              { id: "opt-1", text: "I" },
              { id: "opt-2", text: "We" },
              { id: "opt-3", text: "She" },
              { id: "opt-4", text: "They" }
            ],
            correctOptionId: "opt-3",
            explanation: "'She' is third-person singular and always requires the -s or -es suffix.",
            urduExplanation: "'She' Ú©Û’ Ø³Ø§ØªÚ¾ Ù Ø¹Ù„ Ù…ÛŒÚº -s/-es Ú©Ø§ Ø§Ø¶Ø§Ù Û  Ù„Ø§Ø²Ù…ÛŒ Û Û’Û”"
          },
          {
            id: "qz-a1-u3-l1-4",
            type: "mcq",
            skillTag: "present-simple",
            prompt: "Select the sentence with INCORRECT grammar:",
            options: [
              { id: "opt-1", text: "He works late on Tuesdays." },
              { id: "opt-2", text: "I speak three languages." },
              { id: "opt-3", text: "She live in a new flat." },
              { id: "opt-4", text: "They drink green tea daily." }
            ],
            correctOptionId: "opt-3",
            explanation: "'She live' is incorrect because third-person singular requires 'lives'.",
            urduExplanation: "'She live' ØºÙ„Ø· Û Û’ØŒ ØµØ­ÛŒØ­ 'She lives' Û ÙˆÙ†Ø§ Ú†Ø§Û ÛŒÛ’Û”"
          },
          {
            id: "qz-a1-u3-l1-5",
            type: "mcq",
            skillTag: "present-simple",
            prompt: "What does the sentence 'I wake up at 7 AM' express?",
            options: [
              { id: "opt-1", text: "A daily habit or routine" },
              { id: "opt-2", text: "An action completed yesterday" },
              { id: "opt-3", text: "A temporary plan for next month" },
              { id: "opt-4", text: "An action happening at this exact second" }
            ],
            correctOptionId: "opt-1",
            explanation: "Present simple expresses regular daily habits and routines.",
            urduExplanation: "ÛŒÛ  Ø¬Ù…Ù„Û  Ø±ÙˆØ²Ù…Ø±Û  Ú©ÛŒ Ø¹Ø§Ø¯Øª ÛŒØ§ Ù…Ø¹Ù…ÙˆÙ„ Ú©Ùˆ Ø¸Ø§Û Ø± Ú©Ø±ØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u3-l1-7",
        type: "summary",
        title: "Lesson Summary",
        content: "Mastery points for Present Simple affirmative:",
        summaryPoints: [
          "Use Present Simple for habits, routines, and universal truths.",
          "I, You, We, They + Base Verb (I work, we study).",
          "He, She, It + Verb-s / -es (He works, she studies).",
          "Follow SVO word order: Subject + Verb + Object (I drink tea).",
          "Signal words include: every day, always, usually, on Mondays."
        ]
      },
      {
        id: "sec-a1-u3-l1-8",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Û Ù… Ø¹Ø§Ø¯Øª ÛŒØ§ Ø±ÙˆØ²Ù…Ø±Û  Ú©Û’ Ù…Ø¹Ù…ÙˆÙ„ Ú©Û’ Ù„ÛŒÛ’ Ù„Ù Ø¸ Ú©Û’ Ø³Ø§ØªÚ¾ **'ØªØ§ Û Û’ / ØªÛŒ Û Û’ / ØªÛ’ Û ÛŒÚº'** Ù„Ú¯Ø§ØªÛ’ Û ÛŒÚº:\n- 'Ù…ÛŒÚº Ú†Ø§Ø¦Û’ Ù¾ÛŒ**ØªØ§ Û ÙˆÚº**'\n- 'ÙˆÛ  Ø§Ø³Ú©ÙˆÙ„ Ø¬Ø§**ØªÛŒ Û Û’**'\n\nØ§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ø¨Ú¾ÛŒ Ø¹Ø§Ø¯Øª Ú©Û’ Ù„ÛŒÛ’ Û ÛŒ Present Simple Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’Û” Ù„ÛŒÚ©Ù† Ø¯Ùˆ Ø§Û Ù… Ø¨Ø§ØªÛŒÚº ÛŒØ§Ø¯ Ø±Ú©Ú¾ÛŒÚº:\n1. **Ø¬Ù…Ù„Û’ Ú©ÛŒ ØªØ±ØªÛŒØ¨ (Word Order)**: Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Ù Ø¹Ù„ Ø¢Ø®Ø± Ù…ÛŒÚº Ø¢ØªØ§ Û Û’ (Ù…ÛŒÚº + Ú†Ø§Ø¦Û’ + Ù¾ÛŒØªØ§ Û ÙˆÚº = SOV)ØŒ Ø¬Ø¨Ú©Û  Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ù Ø¹Ù„ Ø¯Ø±Ù…ÛŒØ§Ù† Ù…ÛŒÚº Ø¢ØªØ§ Û Û’: **'I (S) drink (V) tea (O)'** (SVO)Û”\n2. **He/She/It Ú©Û’ Ø³Ø§ØªÚ¾ -s**: Ø¬Ø¨ Ù Ø§Ø¹Ù„ ÙˆØ§Ø­Ø¯ ØºØ§Ø¦Ø¨ Û Ùˆ ØªÙˆ Ù Ø¹Ù„ Ú©Û’ Ø³Ø§ØªÚ¾ **-s** Ù„Ú¯Ø§Ù†Ø§ Ù„Ø§Ø²Ù…ÛŒ Û Û’ØŒ Ø¬ÛŒØ³Û’: **'He works'** (He work Ú©Û Ù†Ø§ ØºÙ„Ø· Û Û’)Û”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 2: Third-Person -s / -es Spelling Rules
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u3-l2",
    level: "A1",
    unit: "unit-3",
    order: 2,
    title: "Third-Person -s / -es Spelling Rules",
    description: "Master the spelling rules for he/she/it verb forms: -s, -es, -ies, and irregulars.",
    objectives: [
      "Add -es correctly to verbs ending in -ch, -sh, -ss, -x, -z, and -o",
      "Apply the consonant + y -> -ies rule accurately in verbs like 'study' and 'carry'",
      "Identify key irregular third-person verbs (have -> has, go -> goes, do -> does)"
    ],
    estimatedMinutes: 10,
    prerequisites: ["eng-a1-u3-l1"],
    skillTags: ["present-simple", "spelling", "verbs", "third-person"],
    vocabularyList: [
      { word: "watch", partOfSpeech: "verb", phonetic: "/wÉ’tÊƒ/", definition: "To look at or observe attentively over a period of time.", urduMeaning: "Ø¯ÛŒÚ©Ú¾Ù†Ø§", exampleSentence: "He watches the evening news every day." },
      { word: "teach", partOfSpeech: "verb", phonetic: "/tiË tÊƒ/", definition: "To impart knowledge to or instruct someone.", urduMeaning: "Ù¾Ú‘Ú¾Ø§Ù†Ø§ / ØªØ¹Ù„ÛŒÙ… Ø¯ÛŒÙ†Ø§", exampleSentence: "She teaches mathematics at college." },
      { word: "wash", partOfSpeech: "verb", phonetic: "/wÉ’Êƒ/", definition: "To clean with water and typically soap or detergent.", urduMeaning: "Ø¯Ú¾ÙˆÙ†Ø§", exampleSentence: "He washes his car on Saturdays." },
      { word: "fix", partOfSpeech: "verb", phonetic: "/fÉªks/", definition: "To repair or mend something that is broken.", urduMeaning: "Ù¹Ú¾ÛŒÚ© Ú©Ø±Ù†Ø§ / Ù…Ø±Ù…Øª Ú©Ø±Ù†Ø§", exampleSentence: "The technician fixes computers quickly." },
      { word: "go", partOfSpeech: "verb", phonetic: "/É¡É™ÊŠ/", definition: "To move from one place to another; travel.", urduMeaning: "Ø¬Ø§Ù†Ø§", exampleSentence: "She goes to the gym three times a week." },
      { word: "do", partOfSpeech: "verb", phonetic: "/duË /", definition: "To perform or carry out an action or task.", urduMeaning: "Ú©Ø±Ù†Ø§", exampleSentence: "He does his homework before dinner." },
      { word: "fly", partOfSpeech: "verb", phonetic: "/flaÉª/", definition: "To move through the air using wings or an aircraft.", urduMeaning: "Ø§Ú‘Ù†Ø§", exampleSentence: "The pilot flies international routes." },
      { word: "carry", partOfSpeech: "verb", phonetic: "/ËˆkÃ¦ri/", definition: "To support and move someone or something from one place to another.", urduMeaning: "Ø§Ù¹Ú¾Ø§Ù†Ø§ / Ù„Û’ Ø¬Ø§Ù†Ø§", exampleSentence: "She carries a heavy bag of books." },
      { word: "cry", partOfSpeech: "verb", phonetic: "/kraÉª/", definition: "To shed tears, typically as an expression of pain or sorrow.", urduMeaning: "Ø±ÙˆÙ†Ø§", exampleSentence: "The baby cries when he is hungry." },
      { word: "catch", partOfSpeech: "verb", phonetic: "/kÃ¦tÊƒ/", definition: "To intercept and hold something moving through the air.", urduMeaning: "Ù¾Ú©Ú‘Ù†Ø§", exampleSentence: "He catches the morning train at 8:00." }
    ],
    sections: [
      {
        id: "sec-a1-u3-l2-1",
        type: "explain",
        title: "Spelling Transformations for He, She, and It",
        content: "When the subject is **he**, **she**, or **it**, we must modify the verb. While most verbs simply add **-s**, English phonetic rules require special spelling endings.",
        tables: [
          {
            title: "Spelling Rules Matrix",
            headers: ["Verb Ending", "Rule", "Base Form", "He/She/It Form", "Pronunciation"],
            rows: [
              ["Most verbs", "Add -s", "speak, eat, read", "speaks, eats, reads", "/s/ or /z/"],
              ["-ch, -sh, -ss, -x, -z", "Add -es", "watch, wash, kiss, fix", "watches, washes, kisses, fixes", "Extra syllable /Éªz/"],
              ["-o", "Add -es", "go, do", "goes, does", "goes /É¡É™ÊŠz/, does /dÊŒz/"],
              ["Consonant + y", "Change -y to -ies", "study, fly, carry", "studies, flies, carries", "/aÉªz/ or /iz/"],
              ["Vowel + y", "Just add -s", "play, buy, pay", "plays, buys, pays", "Regular /z/ sound"],
              ["Irregular", "Irregular change", "have", "has", "/hÃ¦z/"]
            ]
          },
          {
            title: "Crucial Form / Use / Common Mistakes",
            headers: ["Aspect", "Rule", "Correct Example", "Common Error"],
            rows: [
              ["Form", "Apply exact rule according to spelling", "He watches TV / She studies law", "Don't write 'watchs' or 'studys'."],
              ["Pronunciation", "Add syllable after sibilants (-ch, -sh, -x)", "catch -> catches (2 syllables)", "Don't swallow the /Éªz/ ending."],
              ["Irregular 'have'", "Changes completely to 'has'", "He has a sister", "Never say 'he haves'."]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Vowel + Y Alert",
            text: "Remember: 'play' -> 'plays' (vowel a + y); 'study' -> 'studies' (consonant d + y). Only change the y when a consonant comes before it!"
          },
          {
            type: "warning",
            title: "Irregular 'Have'",
            text: "The verb 'have' becomes **has** with he/she/it: 'She **has** a car' (never 'She haves')."
          }
        ]
      },
      {
        id: "sec-a1-u3-l2-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "Mr. Ahmad teaches physics at the national academy.", phonetic: "/ËˆmÉªstÉ™r ËˆÉ‘Ë mÉ™d ËˆtiË tÊƒÉªz ËˆfÉªzÉªks Ã¦t Ã°É™ ËˆnÃ¦ÊƒnÉ™l É™ËˆkÃ¦dÉ™mi/", urdu: "Ù…Ø³Ù¹Ø± Ø§Ø­Ù…Ø¯ Ù‚ÙˆÙ…ÛŒ Ø§Ú©ÛŒÚˆÙ…ÛŒ Ù…ÛŒÚº Ù Ø²Ú©Ø³ Ù¾Ú‘Ú¾Ø§ØªÛ’ Û ÛŒÚºÛ”", audioText: "Mr. Ahmad teaches physics at the national academy." },
          { english: "She watches educational documentaries in the evening.", phonetic: "/ÊƒiË  ËˆwÉ’tÊƒÉªz ËŒedÊ’uË ËˆkeÉªÊƒÉ™nl ËŒdÉ’kjuË Ëˆmentriz Éªn Ã°i ËˆiË vnÉªÅ‹/", urdu: "ÙˆÛ  Ø´Ø§Ù… Ú©Ùˆ ØªØ¹Ù„ÛŒÙ…ÛŒ ÚˆØ§Ú©ÛŒÙˆÙ…Ù†Ù¹Ø±ÛŒØ² Ø¯ÛŒÚ©Ú¾ØªÛŒ Û Û’Û”", audioText: "She watches educational documentaries in the evening." },
          { english: "He goes to the office by metro bus every morning.", phonetic: "/hiË  É¡É™ÊŠz tuË  Ã°i ËˆÉ’fÉªs baÉª ËˆmetrÉ™ÊŠ bÊŒs Ëˆevri ËˆmÉ”Ë rnÉªÅ‹/", urdu: "ÙˆÛ  Û Ø± ØµØ¨Ø­ Ù…ÛŒÙ¹Ø±Ùˆ Ø¨Ø³ Ú©Û’ Ø°Ø±ÛŒØ¹Û’ Ø¯Ù ØªØ± Ø¬Ø§ØªØ§ Û Û’Û”", audioText: "He goes to the office by metro bus every morning." },
          { english: "Zainab studies medicine at King Edward Medical University.", phonetic: "/ËˆzeÉªnÃ¦b ËˆstÊŒdiz Ëˆmedsn Ã¦t kÉªÅ‹ ËˆedwÉ™d ËˆmedÉªkl ËŒjuË nÉªËˆvÉœË sÉ™ti/", urdu: "Ø²ÛŒÙ†Ø¨ Ú©Ù†Ú¯ Ø§ÛŒÚˆÙˆØ±Úˆ Ù…ÛŒÚˆÛŒÚ©Ù„ ÛŒÙˆÙ†ÛŒÙˆØ±Ø³Ù¹ÛŒ Ù…ÛŒÚº Ø·Ø¨ Ú©ÛŒ ØªØ¹Ù„ÛŒÙ… Ø­Ø§ØµÙ„ Ú©Ø±ØªÛŒ Û Û’Û”", audioText: "Zainab studies medicine at King Edward Medical University." },
          { english: "The mechanic fixes complex engine problems with ease.", phonetic: "/Ã°É™ mÉªËˆkÃ¦nÉªk ËˆfÉªksÉªz ËˆkÉ’mpleks ËˆendÊ’Éªn ËˆprÉ’blÉ™mz wÉªÃ° iË z/", urdu: "Ù…ÛŒÚ©Ù†Ú© Ø§Ù†Ø¬Ù† Ú©Û’ Ù¾ÛŒÚ†ÛŒØ¯Û  Ù…Ø³Ø§Ø¦Ù„ Ø¢Ø³Ø§Ù†ÛŒ Ø³Û’ Ù¹Ú¾ÛŒÚ© Ú©Ø±ØªØ§ Û Û’Û”", audioText: "The mechanic fixes complex engine problems with ease." },
          { english: "He washes his hands thoroughly before every meal.", phonetic: "/hiË  ËˆwÉ’ÊƒÉªz hÉªz hÃ¦ndz ËˆÎ¸ÊŒrÉ™li bÉªËˆfÉ”Ë r Ëˆevri miË l/", urdu: "ÙˆÛ  Û Ø± Ú©Ú¾Ø§Ù†Û’ Ø³Û’ Ù¾Û Ù„Û’ Ø§Ù¾Ù†Û’ Û Ø§ØªÚ¾ Ø§Ú†Ú¾ÛŒ Ø·Ø±Ø­ Ø¯Ú¾ÙˆØªØ§ Û Û’Û”", audioText: "He washes his hands thoroughly before every meal." },
          { english: "The airline flies direct flights between Lahore and Dubai.", phonetic: "/Ã°i ËˆeÉ™laÉªn flaÉªz daÉªËˆrekt flaÉªts bÉªËˆtwiË n lÉ™ËˆhÉ”Ë r Ã¦nd duË ËˆbaÉª/", urdu: "Û ÙˆØ§Ø¦ÛŒ Ú©Ù…Ù¾Ù†ÛŒ Ù„Ø§Û ÙˆØ± Ø§ÙˆØ± Ø¯Ø¨Ø¦ÛŒ Ú©Û’ Ø¯Ø±Ù…ÛŒØ§Ù† Ø¨Ø±Ø§Û  Ø±Ø§Ø³Øª Ù¾Ø±ÙˆØ§Ø²ÛŒÚº Ú†Ù„Ø§ØªÛŒ Û Û’Û”", audioText: "The airline flies direct flights between Lahore and Dubai." },
          { english: "He does his daily exercises right after sunrise.", phonetic: "/hiË  dÊŒz hÉªz ËˆdeÉªli ËˆeksÉ™saÉªzÉªz raÉªt ËˆÉ‘Ë ftÉ™r ËˆsÊŒnraÉªz/", urdu: "ÙˆÛ  Ø·Ù„ÙˆØ¹Ù  Ø¢Ù ØªØ§Ø¨ Ú©Û’ Ù ÙˆØ±Ø§Ù‹ Ø¨Ø¹Ø¯ Ø§Ù¾Ù†ÛŒ Ø±ÙˆØ²Ù…Ø±Û  Ú©ÛŒ ÙˆØ±Ø²Ø´ Ú©Ø±ØªØ§ Û Û’Û”", audioText: "He does his daily exercises right after sunrise." }
        ]
      },
      {
        id: "sec-a1-u3-l2-3",
        type: "dialogue",
        title: "Talking About a Dedicated Colleague",
        dialogue: [
          { speaker: "Rashid", avatar: "R", english: "How does Fatima manage her busy schedule?", urdu: "Ù Ø§Ø·Ù…Û  Ø§Ù¾Ù†Û’ Ù…ØµØ±ÙˆÙ  Ø§ÙˆÙ‚Ø§Øª Ú©ÛŒØ³Û’ Ø³Ù†Ø¨Ú¾Ø§Ù„ØªÛŒ Û ÛŒÚºØŸ", audioText: "How does Fatima manage her busy schedule?" },
          { speaker: "Hira", avatar: "H", english: "She teaches in the morning, and then she studies for her Master's degree.", urdu: "ÙˆÛ  ØµØ¨Ø­ Ù¾Ú‘Ú¾Ø§ØªÛŒ Û ÛŒÚºØŒ Ø§ÙˆØ± Ù¾Ú¾Ø± Ø§Ù¾Ù†ÛŒ Ù…Ø§Ø³Ù¹Ø±Ø² Ú©ÛŒ ÚˆÚ¯Ø±ÛŒ Ú©Û’ Ù„ÛŒÛ’ Ù¾Ú‘Ú¾ØªÛŒ Û ÛŒÚºÛ”", audioText: "She teaches in the morning, and then she studies for her Master's degree." },
          { speaker: "Rashid", avatar: "R", english: "Does she catch the bus to university?", urdu: "Ú©ÛŒØ§ ÙˆÛ  ÛŒÙˆÙ†ÛŒÙˆØ±Ø³Ù¹ÛŒ Ú©Û’ Ù„ÛŒÛ’ Ø¨Ø³ Ù¾Ú©Ú‘ØªÛŒ Û ÛŒÚºØŸ", audioText: "Does she catch the bus to university?" },
          { speaker: "Hira", avatar: "H", english: "Yes, she catches the express bus right outside her house.", urdu: "Ø¬ÛŒ Û Ø§ÚºØŒ ÙˆÛ  Ø§Ù¾Ù†Û’ Ú¯Ú¾Ø± Ú©Û’ Ø¨Ø§Û Ø± Û ÛŒ Ø³Û’ Ø§ÛŒÚ©Ø³Ù¾Ø±ÛŒØ³ Ø¨Ø³ Ù¾Ú©Ú‘ØªÛŒ Û ÛŒÚºÛ”", audioText: "Yes, she catches the express bus right outside her house." }
        ]
      },
      {
        id: "sec-a1-u3-l2-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u3-l2-1",
            type: "mcq",
            skillTag: "spelling",
            prompt: "What is the correct third-person form of the verb 'watch'?",
            options: [
              { id: "opt-1", text: "watches" },
              { id: "opt-2", text: "watchs" },
              { id: "opt-3", text: "watchies" },
              { id: "opt-4", text: "watching" }
            ],
            correctOptionId: "opt-1",
            explanation: "Verbs ending in -ch add '-es', producing 'watches'.",
            urduExplanation: "-ch Ù¾Ø± Ø®ØªÙ… Û ÙˆÙ†Û’ ÙˆØ§Ù„Û’ Ù Ø¹Ù„ Ú©Û’ Ø¢Ø®Ø± Ù…ÛŒÚº '-es' Ù„Ú¯ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u3-l2-2",
            type: "mcq",
            skillTag: "spelling",
            prompt: "What is the correct third-person form of the verb 'study'?",
            options: [
              { id: "opt-1", text: "studys" },
              { id: "opt-2", text: "studies" },
              { id: "opt-3", text: "studyes" },
              { id: "opt-4", text: "studyies" }
            ],
            correctOptionId: "opt-2",
            explanation: "'Study' ends in consonant + y, so 'y' becomes 'ies': 'studies'.",
            urduExplanation: "consonant + y Ù¾Ø± Ø®ØªÙ… Û ÙˆÙ†Û’ ÙˆØ§Ù„Û’ Ù Ø¹Ù„ Ù…ÛŒÚº y Ú©Ùˆ Û Ù¹Ø§ Ú©Ø± 'ies' Ù„Ú¯Ø§ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u3-l2-3",
            type: "fill_blank",
            skillTag: "spelling",
            prompt: "Fill in the blank with the correct form of 'go': 'He _____ to school by foot.'",
            correctAnswer: "goes",
            explanation: "The verb 'go' adds -es for third person, becoming 'goes'.",
            urduExplanation: "'go' Ù…ÛŒÚº -es Ù„Ú¯ Ú©Ø± 'goes' Ø¨Ù†ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u3-l2-4",
            type: "fill_blank",
            skillTag: "spelling",
            prompt: "Fill in the blank with the correct form of 'have': 'She _____ a lovely garden.'",
            correctAnswer: "has",
            explanation: "'Have' is irregular and becomes 'has' with she.",
            urduExplanation: "'have' Ú©ÛŒ third-person singular Ø´Ú©Ù„ 'has' Û Û’Û”"
          },
          {
            id: "ex-a1-u3-l2-5",
            type: "order_sentence",
            skillTag: "spelling",
            prompt: "Rearrange the words to form a correct sentence:",
            sentenceTokens: ["She", "teaches", "English", "at", "the", "school", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Subject (She) + verb (teaches) + object (English) + prepositional phrase (at the school).",
            urduExplanation: "She teaches English at the school."
          },
          {
            id: "ex-a1-u3-l2-6",
            type: "order_sentence",
            skillTag: "spelling",
            prompt: "Rearrange the words to form a correct sentence:",
            sentenceTokens: ["He", "catches", "the", "early", "train", "."],
            correctOrder: [0, 1, 2, 3, 4, 5],
            explanation: "Subject (He) + verb (catches) + object (the early train).",
            urduExplanation: "He catches the early train."
          },
          {
            id: "ex-a1-u3-l2-7",
            type: "match_pairs",
            skillTag: "spelling",
            prompt: "Match the base verb with its correct third-person form:",
            pairs: [
              { left: "fly", right: "flies" },
              { left: "wash", right: "washes" },
              { left: "fix", right: "fixes" },
              { left: "play", right: "plays" }
            ],
            explanation: "Spelling rules correctly matched.",
            urduExplanation: "Ù Ø¹Ù„ Ú©ÛŒ Ø§ØµÙ„ Ø´Ú©Ù„ Ú©Ùˆ third-person Ø´Ú©Ù„ Ø³Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u3-l2-8",
            type: "error_correction",
            skillTag: "spelling",
            prompt: "Find and correct the mistake: 'He haves two brothers in Karachi.'",
            correctAnswer: "He has two brothers in Karachi.",
            explanation: "'Have' is irregular; say 'He has', never 'He haves'.",
            urduExplanation: "'He haves' ØºÙ„Ø· Û Û’ØŒ ØµØ­ÛŒØ­ 'He has' Û Û’Û”"
          },
          {
            id: "ex-a1-u3-l2-9",
            type: "error_correction",
            skillTag: "spelling",
            prompt: "Find and correct the mistake: 'She plaies badminton on Sundays.'",
            correctAnswer: "She plays badminton on Sundays.",
            explanation: "'Play' ends in a vowel + y (a + y), so it simply adds -s: 'plays'.",
            urduExplanation: "'play' Ù…ÛŒÚº y Ø³Û’ Ù¾Û Ù„Û’ vowel (a) Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ ØµØ±Ù  -s Ù„Ú¯ØªØ§ Û Û’: 'plays'Û”"
          },
          {
            id: "ex-a1-u3-l2-10",
            type: "true_false",
            skillTag: "spelling",
            prompt: "The third-person form of 'do' is spelled 'dos'. (True or False)",
            correctAnswer: "False",
            explanation: "False. 'Do' adds -es to become 'does' /dÊŒz/.",
            urduExplanation: "ØºÙ„Ø·Û” 'do' Ú©ÛŒ third-person Ø´Ú©Ù„ 'does' Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u3-l2-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u3-l2-1",
            type: "mcq",
            skillTag: "spelling",
            prompt: "Which third-person verb form is spelled INCORRECTLY?",
            options: [
              { id: "opt-1", text: "goes" },
              { id: "opt-2", text: "cryes" },
              { id: "opt-3", text: "teaches" },
              { id: "opt-4", text: "carries" }
            ],
            correctOptionId: "opt-2",
            explanation: "'Cry' ends in consonant + y, so it must be spelled 'cries', not 'cryes'.",
            urduExplanation: "'cry' Ú©ÛŒ ØµØ­ÛŒØ­ Ø§Ù…Ù„Ø§ 'cries' Û Û’Û”"
          },
          {
            id: "qz-a1-u3-l2-2",
            type: "mcq",
            skillTag: "spelling",
            prompt: "What is the third-person form of the verb 'fix'?",
            options: [
              { id: "opt-1", text: "fixs" },
              { id: "opt-2", text: "fixes" },
              { id: "opt-3", text: "fixies" },
              { id: "opt-4", text: "fixed" }
            ],
            correctOptionId: "opt-2",
            explanation: "Verbs ending in -x add -es, making 'fixes'.",
            urduExplanation: "-x Ù¾Ø± Ø®ØªÙ… Û ÙˆÙ†Û’ Ù¾Ø± '-es' Ù„Ú¯ Ú©Ø± 'fixes' Ø¨Ù†ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u3-l2-3",
            type: "mcq",
            skillTag: "spelling",
            prompt: "Complete the sentence: 'Ali _____ football with his friends every evening.'",
            options: [
              { id: "opt-1", text: "plaies" },
              { id: "opt-2", text: "play" },
              { id: "opt-3", text: "playing" },
              { id: "opt-4", text: "plays" }
            ],
            correctOptionId: "opt-4",
            explanation: "Vowel + y takes -s: 'plays'.",
            urduExplanation: "Vowel + y Ú©Û’ Ø¨Ø¹Ø¯ ØµØ±Ù  -s Ù„Ú¯ØªØ§ Û Û’: 'plays'Û”"
          },
          {
            id: "qz-a1-u3-l2-4",
            type: "mcq",
            skillTag: "spelling",
            prompt: "What happens to the verb 'have' when used with 'he' or 'she'?",
            options: [
              { id: "opt-1", text: "It becomes 'has'" },
              { id: "opt-2", text: "It becomes 'haves'" },
              { id: "opt-3", text: "It stays 'have'" },
              { id: "opt-4", text: "It becomes 'having'" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Have' irregularly changes to 'has' for third-person singular.",
            urduExplanation: "'have' Ø¨Ø¯Ù„ Ú©Ø± 'has' Û Ùˆ Ø¬Ø§ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u3-l2-5",
            type: "mcq",
            skillTag: "spelling",
            prompt: "Which verb adds an extra syllable when -es is added?",
            options: [
              { id: "opt-1", text: "goes" },
              { id: "opt-2", text: "washes" },
              { id: "opt-3", text: "plays" },
              { id: "opt-4", text: "drinks" }
            ],
            correctOptionId: "opt-2",
            explanation: "'Wash' (1 syllable) becomes 'washes' (2 syllables, ending in /Éªz/).",
            urduExplanation: "'washes' Ù…ÛŒÚº Ø§Ø¶Ø§Ù ÛŒ syllable (/Éªz/) Ø¨ÙˆÙ„Ø§ Ø¬Ø§ØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u3-l2-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Core third-person spelling rules:",
        summaryPoints: [
          "General rule: Add -s (eat -> eats, read -> reads).",
          "Verbs ending in -ch, -sh, -ss, -x, -z: Add -es (watches, washes, kisses, fixes).",
          "Verbs ending in -o: Add -es (goes, does).",
          "Consonant + y: Change y to -ies (study -> studies, carry -> carries).",
          "Vowel + y: Just add -s (play -> plays, buy -> buys).",
          "Irregular: have -> has."
        ]
      },
      {
        id: "sec-a1-u3-l2-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Ø¨Ú¾ÛŒ ÙˆØ§Ø­Ø¯ ØºØ§Ø¦Ø¨ Ú©Û’ Ù„ÛŒÛ’ Ù Ø¹Ù„ Ú©ÛŒ Ø´Ú©Ù„ Ø¨Ø¯Ù„ØªÛŒ Û Û’ØŒ Ù„ÛŒÚ©Ù† Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Ù Ø¹Ù„ Ù…Ø°Ú©Ø± Ø§ÙˆØ± Ù…Ø¤Ù†Ø« Ú©Û’ Ù„Ø­Ø§Ø¸ Ø³Û’ Ù Ø±Ù‚ Ú©Ø±ØªØ§ Û Û’ (ÙˆÛ  Ú©Ø±ØªØ§ Û Û’ / ÙˆÛ  Ú©Ø±ØªÛŒ Û Û’)Û”\n\n**Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ù…Ø°Ú©Ø± Ø§ÙˆØ± Ù…Ø¤Ù†Ø« Ú©Û’ Ù„ÛŒÛ’ Ù Ø¹Ù„ Ù…ÛŒÚº Ú©ÙˆØ¦ÛŒ Ù Ø±Ù‚ Ù†Û ÛŒÚº Û ÙˆØªØ§!**\n- He **watches** / She **watches** (Ø¯ÙˆÙ†ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ Ø§ÛŒÚ© Û ÛŒ Ù„Ù Ø¸ Û Û’)\n- He **studies** / She **studies**\nØ§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº ØµØ±Ù  Ø§Ù…Ù„Ø§ (Spelling) Ú©Û’ Ù‚ÙˆØ§Ø¹Ø¯ Ø³Ù…Ø¬Ú¾Ù†Ø§ Ø¶Ø±ÙˆØ±ÛŒ Û ÛŒÚº Ú©Û  Ú©Û Ø§Úº -s Ù„Ú¯Û’ Ú¯Ø§ØŒ Ú©Û Ø§Úº -es Ø§ÙˆØ± Ú©Û Ø§Úº -iesÛ”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 3: Present Simple Negatives (Don't / Doesn't)
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u3-l3",
    level: "A1",
    unit: "unit-3",
    order: 3,
    title: "Present Simple Negatives (Don't / Doesn't)",
    description: "Form negative statements in the present simple using do not (don't) and does not (doesn't).",
    objectives: [
      "Use 'do not / don't' with I, you, we, and they + base verb",
      "Use 'does not / doesn't' with he, she, and it + base verb (never adding -s to the main verb!)",
      "Correct the common error of double-marking ('He doesn't works' -> 'He doesn't work')"
    ],
    estimatedMinutes: 12,
    prerequisites: ["eng-a1-u3-l2"],
    skillTags: ["present-simple", "negatives", "auxiliary-verbs", "grammar-tenses"],
    vocabularyList: [
      { word: "know", partOfSpeech: "verb", phonetic: "/nÉ™ÊŠ/", definition: "To be aware of through observation, inquiry, or information.", urduMeaning: "Ø¬Ø§Ù†Ù†Ø§ / Ù…Ø¹Ù„ÙˆÙ… Û ÙˆÙ†Ø§", exampleSentence: "I do not know the answer to this question." },
      { word: "understand", partOfSpeech: "verb", phonetic: "/ËŒÊŒndÉ™ËˆstÃ¦nd/", definition: "To perceive the intended meaning of words or ideas.", urduMeaning: "Ø³Ù…Ø¬Ú¾Ù†Ø§", exampleSentence: "He does not understand French." },
      { word: "smoke", partOfSpeech: "verb", phonetic: "/smÉ™ÊŠk/", definition: "To inhale and exhale the smoke of tobacco or similar substances.", urduMeaning: "Ø³Ú¯Ø±ÛŒÙ¹ Ù¾ÛŒÙ†Ø§", exampleSentence: "Doctors do not smoke cigarettes." },
      { word: "drive", partOfSpeech: "verb", phonetic: "/draÉªv/", definition: "To operate and control the direction and speed of a motor vehicle.", urduMeaning: "Ú¯Ø§Ú‘ÛŒ Ú†Ù„Ø§Ù†Ø§", exampleSentence: "She does not drive at night." },
      { word: "travel", partOfSpeech: "verb", phonetic: "/ËˆtrÃ¦vl/", definition: "To make a journey, typically of some length.", urduMeaning: "Ø³Ù Ø± Ú©Ø±Ù†Ø§", exampleSentence: "They do not travel during winter." },
      { word: "like", partOfSpeech: "verb", phonetic: "/laÉªk/", definition: "To find agreeable, enjoyable, or satisfactory.", urduMeaning: "Ù¾Ø³Ù†Ø¯ Ú©Ø±Ù†Ø§", exampleSentence: "We do not like spicy food." },
      { word: "hate", partOfSpeech: "verb", phonetic: "/heÉªt/", definition: "To feel intense dislike for someone or something.", urduMeaning: "Ù†Ù Ø±Øª Ú©Ø±Ù†Ø§", exampleSentence: "He does not hate studying; he is just tired." },
      { word: "cook", partOfSpeech: "verb", phonetic: "/kÊŠk/", definition: "To prepare food, a dish, or a meal by combining and heating ingredients.", urduMeaning: "Ú©Ú¾Ø§Ù†Ø§ Ù¾Ú©Ø§Ù†Ø§", exampleSentence: "My brother does not cook on weekdays." },
      { word: "play", partOfSpeech: "verb", phonetic: "/pleÉª/", definition: "To engage in activity for enjoyment and recreation.", urduMeaning: "Ú©Ú¾ÛŒÙ„Ù†Ø§", exampleSentence: "I do not play computer games." },
      { word: "listen", partOfSpeech: "verb", phonetic: "/ËˆlÉªsn/", definition: "To give one's attention to a sound.", urduMeaning: "Ø³Ù†Ù†Ø§", exampleSentence: "She does not listen to loud music." }
    ],
    sections: [
      {
        id: "sec-a1-u3-l3-1",
        type: "explain",
        title: "Forming Negatives with Auxiliary 'Do' & 'Does'",
        content: "To make a present simple statement negative, English uses the **auxiliary verb (helping verb)** **do / does** combined with **not**.\n\n### The Golden Rule of Negatives\nWhen **does** or **doesn't** appears in a sentence, it carries the third-person marker. Therefore, the main verb **REVERTS TO ITS BARE BASE FORM (V1)**!\n- Affirmative: *He works.*\n- Negative: *He **does not work**.* (NEVER *'He doesn't works'*!).",
        tables: [
          {
            title: "Present Simple Negative Matrix",
            headers: ["Subject", "Auxiliary + Not", "Contraction", "Main Verb (Base Form)", "Example"],
            rows: [
              ["I", "do not", "don't", "work", "I don't work on Sundays."],
              ["You", "do not", "don't", "know", "You don't know the address."],
              ["He", "does not", "doesn't", "smoke (no -s!)", "He doesn't smoke."],
              ["She", "does not", "doesn't", "drive (no -s!)", "She doesn't drive to work."],
              ["It", "does not", "doesn't", "matter", "It doesn't matter at all."],
              ["We", "do not", "don't", "like", "We don't like cold weather."],
              ["They", "do not", "don't", "travel", "They don't travel by plane."]
            ]
          },
          {
            title: "Form / Use / Signal Words / Common Mistakes",
            headers: ["Aspect", "Formula / Rule", "Correct Example", "Common Error to Avoid"],
            rows: [
              ["Form (I/You/We/They)", "Subject + don't + Base Verb", "They don't understand", "Don't say: 'They not understand'."],
              ["Form (He/She/It)", "Subject + doesn't + Base Verb", "She doesn't live here", "Fatal mistake: 'She doesn't lives here'."],
              ["Contractions", "don't / doesn't standard in speech", "I don't know / He doesn't go", "Full form 'do not' used for formal writing."]
            ]
          }
        ],
        callouts: [
          {
            type: "warning",
            title: "The S-Theft Rule",
            text: "Think of **doesn't** as a thief that steals the '-s' from the main verb! Once **doesn't** takes the -s, the main verb must remain bare: **He doesn't eat** (not eats)."
          },
          {
            type: "tip",
            title: "Never Use 'No' Before a Verb",
            text: "Urdu speakers sometimes say *'I no like'* or *'He no work'*. In English, you MUST use **don't** or **doesn't** before action verbs."
          }
        ]
      },
      {
        id: "sec-a1-u3-l3-2",
        type: "timeline",
        title: "Negative Habit Timeline",
        timeline: {
          title: "Absence of Habit Across Time",
          past: "Did not do in past",
          present: "He does not smoke (Ongoing non-action / habit)",
          future: "Will not do in future",
          activePoint: "present",
          explanation: "Present simple negative describes an ongoing refusal, habit absence, or state of untruth."
        }
      },
      {
        id: "sec-a1-u3-l3-3",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "I don't drink sugary drinks with my meals.", phonetic: "/aÉª dÉ™ÊŠnt drÉªÅ‹k ËˆÊƒÊŠÉ¡É™ri drÉªÅ‹ks wÉªÃ° maÉª miË lz/", urdu: "Ù…ÛŒÚº Ú©Ú¾Ø§Ù†Û’ Ú©Û’ Ø³Ø§ØªÚ¾ Ù…ÛŒÙ¹Ú¾Û’ Ù…Ø´Ø±ÙˆØ¨Ø§Øª Ù†Û ÛŒÚº Ù¾ÛŒØªØ§Û”", audioText: "I don't drink sugary drinks with my meals." },
          { english: "She doesn't drive to work because the traffic is heavy.", phonetic: "/ÊƒiË  ËˆdÊŒznt draÉªv tuË  wÉœË k bÉªËˆkÉ’z Ã°É™ ËˆtrÃ¦fÉªk Éªz Ëˆhevi/", urdu: "ÙˆÛ  Ú¯Ø§Ú‘ÛŒ Ú†Ù„Ø§ Ú©Ø± Ú©Ø§Ù… Ù¾Ø± Ù†Û ÛŒÚº Ø¬Ø§ØªÛŒÚº Ú©ÛŒÙˆÙ†Ú©Û  Ù¹Ø±ÛŒÙ Ú© Ø¨Û Øª Ø²ÛŒØ§Ø¯Û  Û ÙˆØªÛŒ Û Û’Û”", audioText: "She doesn't drive to work because the traffic is heavy." },
          { english: "My grandfather doesn't watch television at night.", phonetic: "/maÉª ËˆÉ¡rÃ¦nfÉ‘Ë Ã°É™r ËˆdÊŒznt wÉ’tÊƒ ËˆtelÉªvÉªÊ’n Ã¦t naÉªt/", urdu: "Ù…ÛŒØ±Û’ Ø¯Ø§Ø¯Ø§ Ø±Ø§Øª Ú©Ùˆ Ù¹ÛŒÙ„ÛŒ ÙˆÛŒÚ˜Ù† Ù†Û ÛŒÚº Ø¯ÛŒÚ©Ú¾ØªÛ’Û”", audioText: "My grandfather doesn't watch television at night." },
          { english: "They don't live in a big house; they live in a flat.", phonetic: "/Ã°eÉª dÉ™ÊŠnt lÉªv Éªn É™ bÉªÉ¡ haÊŠs Ã°eÉª lÉªv Éªn É™ flÃ¦t/", urdu: "ÙˆÛ  Ú©Ø³ÛŒ Ø¨Ú‘Û’ Ú¯Ú¾Ø± Ù…ÛŒÚº Ù†Û ÛŒÚº Ø±Û ØªÛ’ØŒ ÙˆÛ  Ø§ÛŒÚ© Ù Ù„ÛŒÙ¹ Ù…ÛŒÚº Ø±Û ØªÛ’ Û ÛŒÚºÛ”", audioText: "They don't live in a big house; they live in a flat." },
          { english: "He doesn't smoke cigarettes or cigars.", phonetic: "/hiË  ËˆdÊŒznt smÉ™ÊŠk ËŒsÉªÉ¡É™Ëˆrets É”Ë r sÉªËˆÉ¡É‘Ë z/", urdu: "ÙˆÛ  Ø³Ú¯Ø±ÛŒÙ¹ ÛŒØ§ Ø³Ú¯Ø§Ø± Ù†Û ÛŒÚº Ù¾ÛŒØªØ§Û”", audioText: "He doesn't smoke cigarettes or cigars." },
          { english: "We don't understand this technical explanation.", phonetic: "/wiË  dÉ™ÊŠnt ËŒÊŒndÉ™ËˆstÃ¦nd Ã°Éªs ËˆteknÉªkl ËŒeksplÉ™ËˆneÉªÊƒn/", urdu: "Û Ù… ÛŒÛ  ØªÚ©Ù†ÛŒÚ©ÛŒ ÙˆØ¶Ø§Ø­Øª Ù†Û ÛŒÚº Ø³Ù…Ø¬Ú¾ØªÛ’Û”", audioText: "We don't understand this technical explanation." },
          { english: "Bilal doesn't eat fast food during the week.", phonetic: "/bÉªËˆlÉ‘Ë l ËˆdÊŒznt iË t fÉ‘Ë st fuË d ËˆdjÊŠÉ™rÉªÅ‹ Ã°É™ wiË k/", urdu: "Ø¨Ù„Ø§Ù„ Û Ù ØªÛ’ Ú©Û’ Ø¯ÙˆØ±Ø§Ù† Ù Ø§Ø³Ù¹ Ù ÙˆÚˆ Ù†Û ÛŒÚº Ú©Ú¾Ø§ØªØ§Û”", audioText: "Bilal doesn't eat fast food during the week." },
          { english: "It doesn't rain very often in this desert region.", phonetic: "/Éªt ËˆdÊŒznt reÉªn Ëˆveri ËˆÉ’fn Éªn Ã°Éªs ËˆdezÉ™t ËˆriË dÊ’É™n/", urdu: "Ø§Ø³ ØµØ­Ø±Ø§Ø¦ÛŒ Ø®Ø·Û’ Ù…ÛŒÚº Ø¨Ø§Ø±Ø´ Ø§Ú©Ø«Ø± Ù†Û ÛŒÚº Û ÙˆØªÛŒÛ”", audioText: "It doesn't rain very often in this desert region." }
        ]
      },
      {
        id: "sec-a1-u3-l3-4",
        type: "dialogue",
        title: "Comparing Food Preferences",
        dialogue: [
          { speaker: "Kamran", avatar: "K", english: "Do you want to order spicy biryani, Tariq?", urdu: "Ø·Ø§Ø±Ù‚ØŒ Ú©ÛŒØ§ Ø¢Ù¾ Ù…Ø³Ø§Ù„Ø­Û’ Ø¯Ø§Ø± Ø¨Ø±ÛŒØ§Ù†ÛŒ Ù…Ù†Ú¯ÙˆØ§Ù†Ø§ Ú†Ø§Û ØªÛ’ Û ÛŒÚºØŸ", audioText: "Do you want to order spicy biryani, Tariq?" },
          { speaker: "Tariq", avatar: "T", english: "Actually, I don't eat very spicy food. It upsets my stomach.", urdu: "Ø¯Ø±Ø§ØµÙ„ Ù…ÛŒÚº Ø²ÛŒØ§Ø¯Û  Ù…Ø³Ø§Ù„Ø­Û’ Ø¯Ø§Ø± Ú©Ú¾Ø§Ù†Ø§ Ù†Û ÛŒÚº Ú©Ú¾Ø§ØªØ§Û” Ø§Ø³ Ø³Û’ Ù…ÛŒØ±Ø§ Ù…Ø¹Ø¯Û  Ø®Ø±Ø§Ø¨ Û Ùˆ Ø¬Ø§ØªØ§ Û Û’Û”", audioText: "Actually, I don't eat very spicy food. It upsets my stomach." },
          { speaker: "Kamran", avatar: "K", english: "Does your brother like chicken pulao?", urdu: "Ú©ÛŒØ§ Ø¢Ù¾ Ú©Û’ Ø¨ÚÚ¾Ø§Ø¦ÛŒ Ú†Ú©Ù† Ù¾Ù„Ø§Ø¤ Ù¾Ø³Ù†Ø¯ Ú©Ø±ØªÛ’ Û ÛŒÚºØŸ", audioText: "Does your brother like chicken pulao?" },
          { speaker: "Tariq", avatar: "T", english: "Yes, he loves pulao. He doesn't like red meat at all.", urdu: "Ø¬ÛŒ Û Ø§ÚºØŒ ÙˆÛ  Ù¾Ù„Ø§Ø¤ Ø¨Û Øª Ù¾Ø³Ù†Ø¯ Ú©Ø±ØªØ§ Û Û’Û” ÙˆÛ  Ø¨Ú‘Ø§ Ú¯ÙˆØ´Øª Ø¨Ø§Ù„Ú©Ù„ Ù†Û ÛŒÚº Ú©Ú¾Ø§ØªØ§Û”", audioText: "Yes, he loves pulao. He doesn't like red meat at all." }
        ]
      },
      {
        id: "sec-a1-u3-l3-5",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u3-l3-1",
            type: "mcq",
            skillTag: "negatives",
            prompt: "Choose the correct negative form: 'He _____ coffee in the evening.'",
            options: [
              { id: "opt-1", text: "don't drink" },
              { id: "opt-2", text: "no drinks" },
              { id: "opt-3", text: "doesn't drink" },
              { id: "opt-4", text: "doesn't drinks" }
            ],
            correctOptionId: "opt-3",
            explanation: "'He' takes 'doesn't' followed strictly by the base verb 'drink' without -s.",
            urduExplanation: "'He' Ú©Û’ Ø³Ø§ØªÚ¾ 'doesn't' Ø§ÙˆØ± base verb 'drink' Ù„Ú¯ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u3-l3-2",
            type: "mcq",
            skillTag: "negatives",
            prompt: "Choose the correct negative form: 'My parents _____ live in a noisy area.'",
            options: [
              { id: "opt-1", text: "doesn't" },
              { id: "opt-2", text: "not" },
              { id: "opt-3", text: "is not" },
              { id: "opt-4", text: "don't" }
            ],
            correctOptionId: "opt-4",
            explanation: "'My parents' is plural (they), requiring the auxiliary contraction 'don't'.",
            urduExplanation: "Ø¬Ù…Ø¹ Ù Ø§Ø¹Ù„ (My parents) Ú©Û’ Ù„ÛŒÛ’ 'don't' Ù„Ú¯Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u3-l3-3",
            type: "fill_blank",
            skillTag: "negatives",
            prompt: "Fill in the blank with 'don't' or 'doesn't': 'She _____ understand the technical terms.'",
            correctAnswer: "doesn't",
            explanation: "Third-person singular 'She' takes 'doesn't'.",
            urduExplanation: "'She' Ú©Û’ Ø³Ø§ØªÚ¾ 'doesn't' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u3-l3-4",
            type: "fill_blank",
            skillTag: "negatives",
            prompt: "Fill in the blank: 'We _____ speak German.'",
            correctAnswer: "don't",
            explanation: "'We' takes the negative auxiliary 'don't'.",
            urduExplanation: "'We' Ú©Û’ Ø³Ø§ØªÚ¾ 'don't' Ù„Ú¯ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u3-l3-5",
            type: "order_sentence",
            skillTag: "negatives",
            prompt: "Rearrange the words to form a correct negative statement:",
            sentenceTokens: ["He", "does", "not", "smoke", "cigarettes", "."],
            correctOrder: [0, 1, 2, 3, 4, 5],
            explanation: "Subject (He) + auxiliary (does not) + base verb (smoke) + object (cigarettes).",
            urduExplanation: "He does not smoke cigarettes."
          },
          {
            id: "ex-a1-u3-l3-6",
            type: "order_sentence",
            skillTag: "negatives",
            prompt: "Rearrange the words to make a correct negative sentence:",
            sentenceTokens: ["They", "don't", "work", "on", "Saturdays", "."],
            correctOrder: [0, 1, 2, 3, 4, 5],
            explanation: "Subject (They) + negative contraction (don't) + base verb (work) + time phrase (on Saturdays).",
            urduExplanation: "They don't work on Saturdays."
          },
          {
            id: "ex-a1-u3-l3-7",
            type: "match_pairs",
            skillTag: "negatives",
            prompt: "Match the subject pronoun with its correct negative auxiliary:",
            pairs: [
              { left: "He", right: "doesn't" },
              { left: "They", right: "don't" },
              { left: "She", right: "doesn't" },
              { left: "I", right: "don't" }
            ],
            explanation: "Subject pronouns accurately paired with don't/doesn't.",
            urduExplanation: "Ù Ø§Ø¹Ù„ Ú©Ùˆ don't ÛŒØ§ doesn't Ø³Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u3-l3-8",
            type: "error_correction",
            skillTag: "negatives",
            prompt: "Find and correct the mistake: 'She doesn't works at the clinic.'",
            correctAnswer: "She doesn't work at the clinic.",
            explanation: "After 'doesn't', the main verb must be in its base form 'work', without -s.",
            urduExplanation: "'doesn't' Ú©Û’ Ø¨Ø¹Ø¯ Ù Ø¹Ù„ Ù…ÛŒÚº -s Ù†Û ÛŒÚº Ù„Ú¯ØªØ§ØŒ 'work' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u3-l3-9",
            type: "error_correction",
            skillTag: "negatives",
            prompt: "Find and correct the mistake: 'I no like bitter coffee.'",
            correctAnswer: "I don't like bitter coffee.",
            explanation: "Use 'don't' to negate present simple verbs, not 'no'.",
            urduExplanation: "Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº 'I no like' ØºÙ„Ø· Û Û’ØŒ 'I don't like' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u3-l3-10",
            type: "true_false",
            skillTag: "negatives",
            prompt: "The sentence 'He doesn't drives' is grammatically correct. (True or False)",
            correctAnswer: "False",
            explanation: "False. The main verb must be in base form: 'He doesn't drive'.",
            urduExplanation: "ØºÙ„Ø·Û” 'doesn't' Ú©Û’ Ø¨Ø¹Ø¯ base verb 'drive' Ø¢Ø¦Û’ Ú¯Ø§Û”"
          }
        ]
      },
      {
        id: "sec-a1-u3-l3-6",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u3-l3-1",
            type: "mcq",
            skillTag: "negatives",
            prompt: "Which sentence correctly negates the statement 'She lives in Multan'?",
            options: [
              { id: "opt-1", text: "She not live in Multan." },
              { id: "opt-2", text: "She doesn't lives in Multan." },
              { id: "opt-3", text: "She doesn't live in Multan." },
              { id: "opt-4", text: "She don't live in Multan." }
            ],
            correctOptionId: "opt-3",
            explanation: "'She doesn't live in Multan' correctly uses 'doesn't' + base verb 'live'.",
            urduExplanation: "'She doesn't live in Multan' Ø¨Ø§Ù„Ú©Ù„ Ø¯Ø±Ø³Øª Ø¬Ù…Ù„Û  Û Û’Û”"
          },
          {
            id: "qz-a1-u3-l3-2",
            type: "mcq",
            skillTag: "negatives",
            prompt: "Complete the sentence: 'We _____ have enough time to finish today.'",
            options: [
              { id: "opt-1", text: "doesn't" },
              { id: "opt-2", text: "hasn't" },
              { id: "opt-3", text: "aren't" },
              { id: "opt-4", text: "don't" }
            ],
            correctOptionId: "opt-4",
            explanation: "Subject 'We' takes 'don't' before base verb 'have'.",
            urduExplanation: "'We' Ú©Û’ Ø³Ø§ØªÚ¾ 'don't' Ù„Ú¯ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u3-l3-3",
            type: "mcq",
            skillTag: "negatives",
            prompt: "Why is 'He doesn't speaks English' grammatically wrong?",
            options: [
              { id: "opt-1", text: "Because 'doesn't' already takes third-person marking, requiring a base verb" },
              { id: "opt-2", text: "Because the contraction 'doesn't' can only ever be paired with plural nouns" },
              { id: "opt-3", text: "Because the verb 'speaks' functions as an independent adjective in a clause" },
              { id: "opt-4", text: "Because negative clauses in English always require an apostrophe on the verb" }
            ],
            correctOptionId: "opt-1",
            explanation: "The auxiliary 'doesn't' takes the third-person inflection, leaving the main verb in its bare base form.",
            urduExplanation: "چونکہ 'doesn't' میں third-person marker آ چکا ہے، اس لیے فعل base form (speak) میں ہونا چاہیے۔"
          },
          {
            id: "qz-a1-u3-l3-4",
            type: "mcq",
            skillTag: "negatives",
            prompt: "Select the sentence with INCORRECT grammar:",
            options: [
              { id: "opt-1", text: "They don't understand the rules." },
              { id: "opt-2", text: "My brother doesn't drives a motorcycle." },
              { id: "opt-3", text: "I don't know his phone number." },
              { id: "opt-4", text: "She doesn't drink cow's milk." }
            ],
            correctOptionId: "opt-2",
            explanation: "'doesn't drives' is incorrect; it must be 'doesn't drive'.",
            urduExplanation: "'doesn't drives' ØºÙ„Ø· Û Û’ØŒ ØµØ­ÛŒØ­ 'doesn't drive' Û ÙˆÚ¯Ø§Û”"
          },
          {
            id: "qz-a1-u3-l3-5",
            type: "mcq",
            skillTag: "negatives",
            prompt: "Which pair shows affirmative and negative correctly matching?",
            options: [
              { id: "opt-1", text: "I like tea -> I not like tea" },
              { id: "opt-2", text: "He works here -> He doesn't works here" },
              { id: "opt-3", text: "She drives -> She doesn't drive" },
              { id: "opt-4", text: "They live here -> They doesn't live here" }
            ],
            correctOptionId: "opt-3",
            explanation: "'She drives -> She doesn't drive' accurately removes -s from the main verb after doesn't.",
            urduExplanation: "'She drives -> She doesn't drive' Ù…Ø«Ø¨Øª Ø³Û’ Ù…Ù†Ù ÛŒ Ú©ÛŒ Ø¨Ø§Ù„Ú©Ù„ ØµØ­ÛŒØ­ ØªØ¨Ø¯ÛŒÙ„ÛŒ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u3-l3-7",
        type: "summary",
        title: "Lesson Summary",
        content: "What you learned about Present Simple negatives:",
        summaryPoints: [
          "Use don't (do not) with I, you, we, they + base verb.",
          "Use doesn't (does not) with he, she, it + base verb.",
          "NEVER keep the -s on the main verb after doesn't (He doesn't work, NOT doesn't works).",
          "Never say 'I no like' or 'He no work' in English.",
          "Contractions (don't, doesn't) are standard in natural speaking."
        ]
      },
      {
        id: "sec-a1-u3-l3-8",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Ù…Ù†Ù ÛŒ Ø¬Ù…Ù„Û  Ø¨Ù†Ø§Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Û Ù… ØµØ±Ù  **'Ù†Û ÛŒÚº'** Ú©Ø§ Ù„Ù Ø¸ Ø´Ø§Ù…Ù„ Ú©Ø± Ø¯ÛŒØªÛ’ Û ÛŒÚº:\n- 'Ù…ÛŒÚº Ú©Ø§Ù… Ú©Ø±ØªØ§ Û ÙˆÚº' -> 'Ù…ÛŒÚº Ú©Ø§Ù… **Ù†Û ÛŒÚº** Ú©Ø±ØªØ§'\n- 'ÙˆÛ  Ú¯Ø§Ú‘ÛŒ Ú†Ù„Ø§ØªÛŒ Û Û’' -> 'ÙˆÛ  Ú¯Ø§Ú‘ÛŒ **Ù†Û ÛŒÚº** Ú†Ù„Ø§ØªÛŒ'\n\nÙ„ÛŒÚ©Ù† Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº ØµØ±Ù  'not' Ù†Û ÛŒÚº Ù„Ú¯ Ø³Ú©ØªØ§ØŒ Ø¨Ù„Ú©Û  **do not (don't)** ÛŒØ§ **does not (doesn't)** Ù„Ú¯Ø§Ù†Ø§ Ù¾Ú‘ØªØ§ Û Û’Û”\n\n**Ø³Ø¨ Ø³Û’ Ø¨Ú‘ÛŒ ØºÙ„Ø·ÛŒ Ø¬Ø³ Ø³Û’ Ø¨Ú†Ù†Ø§ Û Û’:**\nØ¬Ø¨ **doesn't** Ø¢ Ø¬Ø§Ø¦Û’ ØªÙˆ Ù Ø¹Ù„ Ú©Ø§ **-s Ø®ØªÙ…** Û Ùˆ Ø¬Ø§ØªØ§ Û Û’Û” Ø§Ø±Ø¯Ùˆ Ø¨ÙˆÙ„Ù†Û’ ÙˆØ§Ù„Û’ Ø§Ú©Ø«Ø± 'He doesn't works' Ú©Û ØªÛ’ Û ÛŒÚº Ø¬Ùˆ Ú©Û  ØºÙ„Ø· Û Û’Û” ØµØ­ÛŒØ­ Ø¬Ù…Ù„Û  **'He doesn't work'** Û Û’Û”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 4: Daily Morning & Evening Routines
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u3-l4",
    level: "A1",
    unit: "unit-3",
    order: 4,
    title: "Daily Morning & Evening Routines",
    description: "Describe your everyday schedule from dawn to night using adverbs of frequency and sequence words.",
    objectives: [
      "Sequence daily activities using connectors (first, then, after that, finally)",
      "Express frequency of habits using adverbs (always, usually, often, sometimes, never)",
      "Position adverbs of frequency correctly before main verbs and after 'to be'"
    ],
    estimatedMinutes: 10,
    prerequisites: ["eng-a1-u3-l3"],
    skillTags: ["routines", "vocabulary", "adverbs-frequency", "communication"],
    vocabularyList: [
      { word: "shower", partOfSpeech: "noun", phonetic: "/ËˆÊƒaÊŠÉ™r/", definition: "A cubicle or bath in which a person stands under a spray of water to wash.", urduMeaning: "ØºØ³Ù„ / Ø´Ø§ÙˆØ±", exampleSentence: "I take a quick shower every morning." },
      { word: "breakfast", partOfSpeech: "noun", phonetic: "/ËˆbrekfÉ™st/", definition: "The first meal of the day, typically eaten in the morning.", urduMeaning: "Ù†Ø§Ø´ØªÛ ", exampleSentence: "We have breakfast together at 7:30." },
      { word: "dinner", partOfSpeech: "noun", phonetic: "/ËˆdÉªnÉ™r/", definition: "The main meal of the day, taken either around midday or in the evening.", urduMeaning: "Ø±Ø§Øª Ú©Ø§ Ú©Ú¾Ø§Ù†Ø§", exampleSentence: "They eat dinner at eight o'clock." },
      { word: "brush", partOfSpeech: "verb", phonetic: "/brÊŒÊƒ/", definition: "To clean or smooth with a brush.", urduMeaning: "Ø¨Ø±Ø´ Ú©Ø±Ù†Ø§ / ØµØ§Ù  Ú©Ø±Ù†Ø§", exampleSentence: "Brush your teeth twice every day." },
      { word: "leave", partOfSpeech: "verb", phonetic: "/liË v/", definition: "To go away from a place.", urduMeaning: "Ø±ÙˆØ§Ù†Û  Û ÙˆÙ†Ø§ / Ú†Ú¾ÙˆÚ‘Ù†Ø§", exampleSentence: "He leaves home for work at 8:15." },
      { word: "arrive", partOfSpeech: "verb", phonetic: "/É™ËˆraÉªv/", definition: "To reach a destination.", urduMeaning: "Ù¾Û Ù†Ú†Ù†Ø§", exampleSentence: "We arrive at the academy before nine." },
      { word: "relax", partOfSpeech: "verb", phonetic: "/rÉªËˆlÃ¦ks/", definition: "To rest from work or engage in an enjoyable activity.", urduMeaning: "Ø³Ú©ÙˆÙ† Ú©Ø±Ù†Ø§ / Ø¢Ø±Ø§Ù… Ú©Ø±Ù†Ø§", exampleSentence: "I relax with a book in the evening." },
      { word: "exercise", partOfSpeech: "verb", phonetic: "/ËˆeksÉ™saÉªz/", definition: "To engage in physical activity to sustain or improve health.", urduMeaning: "ÙˆØ±Ø²Ø´ Ú©Ø±Ù†Ø§", exampleSentence: "She exercises for forty minutes daily." },
      { word: "pray", partOfSpeech: "verb", phonetic: "/preÉª/", definition: "To address a prayer to God.", urduMeaning: "Ù†Ù…Ø§Ø² Ù¾Ú‘Ú¾Ù†Ø§ / Ø¯Ø¹Ø§ Ú©Ø±Ù†Ø§", exampleSentence: "We pray Fajr early in the morning." },
      { word: "prepare", partOfSpeech: "verb", phonetic: "/prÉªËˆpeÉ™r/", definition: "To make something ready for use or consideration.", urduMeaning: "ØªÛŒØ§Ø± Ú©Ø±Ù†Ø§", exampleSentence: "He prepares his uniform the night before." }
    ],
    sections: [
      {
        id: "sec-a1-u3-l4-1",
        type: "explain",
        title: "Connecting Actions & Expressing Frequency",
        content: "To describe your daily routine smoothly, you need two linguistic tools:\n1. **Adverbs of Frequency**: How often you do an action.\n2. **Sequence Words**: The chronological order of your actions.",
        tables: [
          {
            title: "Scale of Frequency Adverbs",
            headers: ["Adverb", "Frequency Percentage", "Position Rule", "Example Sentence"],
            rows: [
              ["always", "100%", "Before main verb / After 'to be'", "I always brush my teeth before bed."],
              ["usually", "80-90%", "Before main verb / After 'to be'", "He usually wakes up early."],
              ["often", "60-70%", "Before main verb / After 'to be'", "We often walk in the park."],
              ["sometimes", "40-50%", "Before main verb / Start of sentence", "She sometimes drinks green tea."],
              ["never", "0%", "Before main verb (already negative!)", "They never arrive late for class."]
            ]
          },
          {
            title: "Daily Sequence Markers",
            headers: ["Connector", "Chronological Stage", "Sample Usage", "Urdu Translation"],
            rows: [
              ["First", "Beginning of day", "First, I wake up and pray.", "Ù¾Û Ù„Û’Û”"],
              ["Then", "Next step", "Then, I take a shower.", "Ù¾Ú¾Ø±Û”"],
              ["After that", "Subsequent activity", "After that, I have breakfast.", "Ø§Ø³ Ú©Û’ Ø¨Ø¹Ø¯Û”"],
              ["Finally", "Concluding activity", "Finally, I go to bed at ten.", "Ø¢Ø®Ø± Ú©Ø§Ø±Û”"]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Word Order of Frequency Adverbs",
            text: "Put the frequency adverb **before normal action verbs** (*I **always** wake*), but **after the verb to be** (*He is **always** polite*)."
          },
          {
            type: "warning",
            title: "Never Use 'Never' with 'Don't'",
            text: "'Never' is already negative. Never say 'I don't never go'. Say: 'I **never** go'."
          }
        ]
      },
      {
        id: "sec-a1-u3-l4-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "First, I wake up at 5:30 AM and pray Fajr.", phonetic: "/fÉœË st aÉª weÉªk ÊŒp Ã¦t faÉªv ËˆÎ¸ÉœË ti eÉª em Ã¦nd preÉª ËˆfÃ¦dÊ’É™r/", urdu: "Ù¾Û Ù„Û’ØŒ Ù…ÛŒÚº ØµØ¨Ø­ 5:30 Ø¨Ø¬Û’ Ø¨ÛŒØ¯Ø§Ø± Û ÙˆØªØ§ Û ÙˆÚº Ø§ÙˆØ± Ù†Ù…Ø§Ø²Ù  Ù Ø¬Ø± Ø§Ø¯Ø§ Ú©Ø±ØªØ§ Û ÙˆÚºÛ”", audioText: "First, I wake up at 5:30 AM and pray Fajr." },
          { english: "Then, I brush my teeth and take a quick shower.", phonetic: "/Ã°en aÉª brÊŒÊƒ maÉª tiË Î¸ Ã¦nd teÉªk É™ kwÉªk ËˆÊƒaÊŠÉ™r/", urdu: "Ù¾Ú¾Ø±ØŒ Ù…ÛŒÚº Ø¯Ø§Ù†Øª Ø¨Ø±Ø´ Ú©Ø±ØªØ§ Û ÙˆÚº Ø§ÙˆØ± Ø¬Ù„Ø¯ÛŒ Ø³Û’ ØºØ³Ù„ Ú©Ø±ØªØ§ Û ÙˆÚºÛ”", audioText: "Then, I brush my teeth and take a quick shower." },
          { english: "She always prepares a healthy breakfast for her children.", phonetic: "/ÊƒiË  ËˆÉ”Ë lweÉªz prÉªËˆpeÉ™rz É™ ËˆhelÎ¸i ËˆbrekfÉ™st fÉ”Ë r hÉœË r ËˆtÊƒÉªldrÉ™n/", urdu: "ÙˆÛ  Û Ù…ÛŒØ´Û  Ø§Ù¾Ù†Û’ Ø¨Ú†ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ ØµØ­Øª Ø¨Ø®Ø´ Ù†Ø§Ø´ØªÛ  ØªÛŒØ§Ø± Ú©Ø±ØªÛŒ Û Û’Û”", audioText: "She always prepares a healthy breakfast for her children." },
          { english: "He usually leaves home for the office around 8:00 AM.", phonetic: "/hiË  ËˆjuË Ê’uÉ™li liË vz hÉ™ÊŠm fÉ”Ë r Ã°i ËˆÉ’fÉªs É™ËˆraÊŠnd eÉªt eÉª em/", urdu: "ÙˆÛ  Ø¹Ø§Ù… Ø·ÙˆØ± Ù¾Ø± ØµØ¨Ø­ 8:00 Ø¨Ø¬Û’ Ú©Û’ Ù‚Ø±ÛŒØ¨ Ø¯Ù ØªØ± Ú©Û’ Ù„ÛŒÛ’ Ú¯Ú¾Ø± Ø³Û’ Ù†Ú©Ù„ØªØ§ Û Û’Û”", audioText: "He usually leaves home for the office around 8:00 AM." },
          { english: "We often walk in the family park after dinner.", phonetic: "/wiË  ËˆÉ’fn wÉ”Ë k Éªn Ã°É™ ËˆfÃ¦mÉ™li pÉ‘Ë k ËˆÉ‘Ë ftÉ™r ËˆdÉªnÉ™r/", urdu: "Û Ù… Ø±Ø§Øª Ú©Û’ Ú©Ú¾Ø§Ù†Û’ Ú©Û’ Ø¨Ø¹Ø¯ Ø§Ú©Ø«Ø± Ù ÛŒÙ…Ù„ÛŒ Ù¾Ø§Ø±Ú© Ù…ÛŒÚº Ù¾ÛŒØ¯Ù„ Ú†Ù„ØªÛ’ Û ÛŒÚºÛ”", audioText: "We often walk in the family park after dinner." },
          { english: "I sometimes read an English book before going to sleep.", phonetic: "/aÉª ËˆsÊŒmtaÉªmz riË d É™n ËˆÉªÅ‹É¡lÉªÊƒ bÊŠk bÉªËˆfÉ”Ë r ËˆÉ¡É™ÊŠÉªÅ‹ tuË  sliË p/", urdu: "Ù…ÛŒÚº Ú©Ø¨Ú¾ÛŒ Ú©Ø¨Ú¾Ø§Ø± Ø³ÙˆÙ†Û’ Ø³Û’ Ù¾Û Ù„Û’ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ú©ØªØ§Ø¨ Ù¾Ú‘Ú¾ØªØ§ Û ÙˆÚºÛ”", audioText: "I sometimes read an English book before going to sleep." },
          { english: "He is never late for his morning classes.", phonetic: "/hiË  Éªz ËˆnevÉ™r leÉªt fÉ”Ë r hÉªz ËˆmÉ”Ë rnÉªÅ‹ ËˆklÉ‘Ë sÉªz/", urdu: "ÙˆÛ  ØµØ¨Ø­ Ú©ÛŒ Ú©Ù„Ø§Ø³ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ Ú©Ø¨Ú¾ÛŒ Ø¯ÛŒØ± Ù†Û ÛŒÚº Ú©Ø±ØªØ§Û”", audioText: "He is never late for his morning classes." },
          { english: "Finally, I turn off the study lamp and sleep at ten.", phonetic: "/ËˆfaÉªnÉ™li aÉª tÉœË n É’f Ã°É™ ËˆstÊŒdi lÃ¦mp Ã¦nd sliË p Ã¦t ten/", urdu: "Ø¢Ø®Ø± Ú©Ø§Ø±ØŒ Ù…ÛŒÚº Ù¾Ú‘Ú¾Ù†Û’ ÙˆØ§Ù„Ø§ Ù„ÛŒÙ…Ù¾ Ø¨Ù†Ø¯ Ú©Ø±ØªØ§ Û ÙˆÚº Ø§ÙˆØ± Ø¯Ø³ Ø¨Ø¬Û’ Ø³Ùˆ Ø¬Ø§ØªØ§ Û ÙˆÚºÛ”", audioText: "Finally, I turn off the study lamp and sleep at ten." }
        ]
      },
      {
        id: "sec-a1-u3-l4-3",
        type: "dialogue",
        title: "A Typical Sunday Routine",
        dialogue: [
          { speaker: "Nida", avatar: "N", english: "What do you usually do on Sundays, Ayesha?", urdu: "Ø¹Ø§Ø¦Ø´Û ØŒ Ø¢Ù¾ Ø¹Ø§Ù… Ø·ÙˆØ± Ù¾Ø± Ø§ØªÙˆØ§Ø± Ú©Ùˆ Ú©ÛŒØ§ Ú©Ø±ØªÛŒ Û ÛŒÚºØŸ", audioText: "What do you usually do on Sundays, Ayesha?" },
          { speaker: "Ayesha", avatar: "A", english: "I usually wake up late, around eight. Then I prepare a special breakfast for the family.", urdu: "Ù…ÛŒÚº Ø¹Ø§Ù… Ø·ÙˆØ± Ù¾Ø± Ø°Ø±Ø§ Ø¯ÛŒØ± Ø³Û’ Ø¢Ù¹Ú¾ Ø¨Ø¬Û’ Ø¨ÛŒØ¯Ø§Ø± Û ÙˆØªÛŒ Û ÙˆÚºÛ” Ù¾Ú¾Ø± Ú¯Ú¾Ø± ÙˆØ§Ù„ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ Ø®Ø§Øµ Ù†Ø§Ø´ØªÛ  Ø¨Ù†Ø§ØªÛŒ Û ÙˆÚºÛ”", audioText: "I usually wake up late, around eight. Then I prepare a special breakfast for the family." },
          { speaker: "Nida", avatar: "N", english: "Do you exercise on the weekend?", urdu: "Ú©ÛŒØ§ Ø¢Ù¾ Û Ù ØªÛ’ Ú©Û’ Ø¢Ø®Ø± Ù…ÛŒÚº ÙˆØ±Ø²Ø´ Ú©Ø±ØªÛŒ Û ÛŒÚºØŸ", audioText: "Do you exercise on the weekend?" },
          { speaker: "Ayesha", avatar: "A", english: "Yes, I always go for a long walk in the afternoon, and then I relax.", urdu: "Ø¬ÛŒ Û Ø§ÚºØŒ Ù…ÛŒÚº Ø¯ÙˆÙ¾Û Ø± Ú©Ùˆ Û Ù…ÛŒØ´Û  Ù„Ù…Ø¨ÛŒ Ø³ÛŒØ± Ú©Û’ Ù„ÛŒÛ’ Ø¬Ø§ØªÛŒ Û ÙˆÚºØŒ Ø§ÙˆØ± Ù¾Ú¾Ø± Ø³Ú©ÙˆÙ† Ú©Ø±ØªÛŒ Û ÙˆÚºÛ”", audioText: "Yes, I always go for a long walk in the afternoon, and then I relax." }
        ]
      },
      {
        id: "sec-a1-u3-l4-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u3-l4-1",
            type: "mcq",
            skillTag: "adverbs-frequency",
            prompt: "Where does the frequency adverb go: 'He (always / is / polite).'?",
            options: [
              { id: "opt-1", text: "He always is polite." },
              { id: "opt-2", text: "He is always polite." },
              { id: "opt-3", text: "Always he is polite." },
              { id: "opt-4", text: "He is polite always." }
            ],
            correctOptionId: "opt-2",
            explanation: "Adverbs of frequency come AFTER the verb 'to be': 'He is always polite'.",
            urduExplanation: "Verb 'to be' (is) Ú©Û’ Ø¨Ø¹Ø¯ frequency adverb Ø¢ØªØ§ Û Û’: 'He is always polite'Û”"
          },
          {
            id: "ex-a1-u3-l4-2",
            type: "mcq",
            skillTag: "adverbs-frequency",
            prompt: "Which sentence has the correct word order with a regular verb?",
            options: [
              { id: "opt-1", text: "I drink usually tea in the morning." },
              { id: "opt-2", text: "I usually drink tea in the morning." },
              { id: "opt-3", text: "Usually I drink in the morning tea." },
              { id: "opt-4", text: "I drink tea usually in the morning." }
            ],
            correctOptionId: "opt-2",
            explanation: "Frequency adverbs precede normal action verbs: 'I usually drink'.",
            urduExplanation: "Ø¹Ø§Ù… Ù Ø¹Ù„ Ø³Û’ Ù¾Û Ù„Û’ frequency adverb Ø¢ØªØ§ Û Û’: 'I usually drink'Û”"
          },
          {
            id: "ex-a1-u3-l4-3",
            type: "fill_blank",
            skillTag: "routines",
            prompt: "Complete the morning sequence: 'First I pray. _____ I have breakfast.'",
            correctAnswer: "Then",
            explanation: "'Then' is the standard transition word for the immediate subsequent step.",
            urduExplanation: "'Then' (Ù¾Ú¾Ø±) Ø§Ú¯Ù„Û’ Ù…Ø±Ø­Ù„Û’ Ú©Ùˆ Ø¸Ø§Û Ø± Ú©Ø±ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u3-l4-4",
            type: "fill_blank",
            skillTag: "adverbs-frequency",
            prompt: "Which adverb means 0% of the time? Complete: 'She _____ drinks soda; she hates it.'",
            correctAnswer: "never",
            explanation: "'Never' indicates zero percent occurrence.",
            urduExplanation: "0% Ù Ø±ÛŒÚ©ÙˆÙ†Ø³ÛŒ Ú©Û’ Ù„ÛŒÛ’ 'never' (Ú©Ø¨Ú¾ÛŒ Ù†Û ÛŒÚº) Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u3-l4-5",
            type: "order_sentence",
            skillTag: "routines",
            prompt: "Rearrange the words to form a correct routine sentence:",
            sentenceTokens: ["I", "always", "brush", "my", "teeth", "at", "night", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
            explanation: "Subject (I) + adverb (always) + verb (brush) + object (my teeth) + time phrase (at night).",
            urduExplanation: "I always brush my teeth at night."
          },
          {
            id: "ex-a1-u3-l4-6",
            type: "order_sentence",
            skillTag: "routines",
            prompt: "Rearrange the words to form a correct sequence:",
            sentenceTokens: ["First", ",", "I", "take", "a", "quick", "shower", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
            explanation: "Sequence marker (First,) + subject (I) + verb phrase (take a quick shower).",
            urduExplanation: "First, I take a quick shower."
          },
          {
            id: "ex-a1-u3-l4-7",
            type: "match_pairs",
            skillTag: "adverbs-frequency",
            prompt: "Match the adverb of frequency with its approximate percentage:",
            pairs: [
              { left: "always", right: "100%" },
              { left: "usually", right: "80-90%" },
              { left: "sometimes", right: "40-50%" },
              { left: "never", right: "0%" }
            ],
            explanation: "Percentages accurately matched.",
            urduExplanation: "Ù Ø±ÛŒÚ©ÙˆÙ†Ø³ÛŒ Ú©Û’ ØµØ­ÛŒØ­ ØªÙ†Ø§Ø³Ø¨ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u3-l4-8",
            type: "error_correction",
            skillTag: "adverbs-frequency",
            prompt: "Find and correct the mistake: 'He doesn't never smoke.'",
            correctAnswer: "He never smokes.",
            explanation: "'Never' is already negative; double negation is incorrect in standard English. Say: 'He never smokes'.",
            urduExplanation: "'doesn't never' ØºÙ„Ø· Û Û’ØŒ ØµØ­ÛŒØ­ 'He never smokes' Û Û’Û”"
          },
          {
            id: "ex-a1-u3-l4-9",
            type: "error_correction",
            skillTag: "adverbs-frequency",
            prompt: "Find and correct the mistake: 'She always is happy.'",
            correctAnswer: "She is always happy.",
            explanation: "With the verb 'to be', the frequency adverb must follow the verb: 'is always'.",
            urduExplanation: "Verb 'to be' Ú©Û’ Ø¨Ø¹Ø¯ adverb Ø¢ØªØ§ Û Û’: 'is always'Û”"
          },
          {
            id: "ex-a1-u3-l4-10",
            type: "true_false",
            skillTag: "routines",
            prompt: "'First', 'then', and 'finally' are connectors used to show the time order of events. (True or False)",
            correctAnswer: "True",
            explanation: "True. These transition words sequence actions chronologically.",
            urduExplanation: "Ø¯Ø±Ø³ØªÛ” ÛŒÛ  Ø§Ù„Ù Ø§Ø¸ Ú©Ø§Ù…ÙˆÚº Ú©ÛŒ ØªØ±ØªÛŒØ¨ Ø¸Ø§Û Ø± Ú©Ø±ØªÛ’ Û ÛŒÚºÛ”"
          }
        ]
      },
      {
        id: "sec-a1-u3-l4-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u3-l4-1",
            type: "mcq",
            skillTag: "adverbs-frequency",
            prompt: "Which sentence shows the correct position of 'often'?",
            options: [
              { id: "opt-1", text: "We walk often in the park." },
              { id: "opt-2", text: "Often we walk in the park." },
              { id: "opt-3", text: "We walk in the park often." },
              { id: "opt-4", text: "We often walk in the park." }
            ],
            correctOptionId: "opt-4",
            explanation: "'We often walk' places the frequency adverb directly before the main action verb.",
            urduExplanation: "Ù Ø¹Ù„ 'walk' Ø³Û’ Ù¾Û Ù„Û’ 'often' Ø¢Ø¦Û’ Ú¯Ø§: 'We often walk'Û”"
          },
          {
            id: "qz-a1-u3-l4-2",
            type: "mcq",
            skillTag: "adverbs-frequency",
            prompt: "What does the sentence 'He never arrives late' mean?",
            options: [
              { id: "opt-1", text: "He is always on time" },
              { id: "opt-2", text: "He is late sometimes" },
              { id: "opt-3", text: "He is usually late" },
              { id: "opt-4", text: "He was late once yesterday" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Never late' means zero percent tardiness, indicating he is always punctual.",
            urduExplanation: "'Never late' Ú©Ø§ Ù…Ø·Ù„Ø¨ Û Û’ Ú©Û  ÙˆÛ  Û Ù…ÛŒØ´Û  ÙˆÙ‚Øª Ù¾Ø± Ù¾Û Ù†Ú†ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u3-l4-3",
            type: "mcq",
            skillTag: "routines",
            prompt: "Which connector is best to conclude a sequence of morning events?",
            options: [
              { id: "opt-1", text: "First" },
              { id: "opt-2", text: "Finally" },
              { id: "opt-3", text: "Next" },
              { id: "opt-4", text: "Then" }
            ],
            correctOptionId: "opt-2",
            explanation: "'Finally' signals the last action in a sequential routine.",
            urduExplanation: "Ø¢Ø®Ø±ÛŒ Ú©Ø§Ù… Ú©Û’ Ù„ÛŒÛ’ 'Finally' Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u3-l4-4",
            type: "mcq",
            skillTag: "adverbs-frequency",
            prompt: "Complete the sentence: 'Tariq is _____ cheerful in the morning.'",
            options: [
              { id: "opt-1", text: "always" },
              { id: "opt-2", text: "every day" },
              { id: "opt-3", text: "always is" },
              { id: "opt-4", text: "daily is" }
            ],
            correctOptionId: "opt-1",
            explanation: "After linking verb 'is', place the frequency adverb 'always': 'is always cheerful'.",
            urduExplanation: "'is' Ú©Û’ Ø¨Ø¹Ø¯ 'always' Ø¢Ø¦Û’ Ú¯Ø§Û”"
          },
          {
            id: "qz-a1-u3-l4-5",
            type: "mcq",
            skillTag: "routines",
            prompt: "What meal do people eat in the morning?",
            options: [
              { id: "opt-1", text: "Dinner" },
              { id: "opt-2", text: "Supper" },
              { id: "opt-3", text: "Lunch" },
              { id: "opt-4", text: "Breakfast" }
            ],
            correctOptionId: "opt-4",
            explanation: "Breakfast is the traditional first meal eaten in the morning.",
            urduExplanation: "ØµØ¨Ø­ Ú©Û’ Ú©Ú¾Ø§Ù†Û’ Ú©Ùˆ 'Breakfast' (Ù†Ø§Ø´ØªÛ ) Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          }
        ]
      },
      {
        id: "sec-a1-u3-l4-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Routine description mastery:",
        summaryPoints: [
          "Use frequency adverbs: always (100%), usually (80%), often (60%), sometimes (40%), never (0%).",
          "Adverb position: BEFORE normal action verbs (I always pray); AFTER the verb to be (She is always kind).",
          "Use sequence words to tell your day: First -> Then -> After that -> Finally.",
          "Never double-negate with 'never' (say 'He never smokes', not 'doesn't never')."
        ]
      },
      {
        id: "sec-a1-u3-l4-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Û Ù… ØªÙˆØ§ØªØ± Ú©Û’ Ø§Ù„Ù Ø§Ø¸ (Û Ù…ÛŒØ´Û ØŒ Ø¹Ø§Ù… Ø·ÙˆØ± Ù¾Ø±ØŒ Ú©Ø¨Ú¾ÛŒ Ú©Ø¨Ú¾Ø§Ø±ØŒ Ú©Ø¨Ú¾ÛŒ Ù†Û ÛŒÚº) Ø¬Ù…Ù„Û’ Ù…ÛŒÚº Ú©Û ÛŒÚº Ø¨Ú¾ÛŒ Ø¢Ú¯Û’ Ù¾ÛŒÚ†Ú¾Û’ Ø±Ú©Ú¾ Ø³Ú©ØªÛ’ Û ÛŒÚº:\n- 'Ù…ÛŒÚº **Û Ù…ÛŒØ´Û ** ØµØ¨Ø­ Ø¬Ù„Ø¯ÛŒ Ø§Ù¹Ú¾ØªØ§ Û ÙˆÚº'\n- '**Û Ù…ÛŒØ´Û ** Ù…ÛŒÚº ØµØ¨Ø­ Ø¬Ù„Ø¯ÛŒ Ø§Ù¹Ú¾ØªØ§ Û ÙˆÚº'\n\nÙ„ÛŒÚ©Ù† Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ø§Ù† Ú©ÛŒ Ø¬Ú¯Û  **Ø¨Ø§Ù„Ú©Ù„ Ù…Ø®ØµÙˆØµ** Û Û’:\n1. Ø¹Ø§Ù… Ù Ø¹Ù„ Ø³Û’ **Ù¾Û Ù„Û’**: *I **always** wake up* (I wake up always Ú©Û Ù†Ø§ ØºÛŒØ± Ù Ø·Ø±ÛŒ Û Û’)\n2. Verb 'to be' Ú©Û’ **Ø¨Ø¹Ø¯**: *He is **always** on time*\nØ§Ø³ ØªØ±ØªÛŒØ¨ Ú©ÛŒ Ù…Ø´Ù‚ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ø±ÙˆØ§Ù†ÛŒ Ú©Û’ Ù„ÛŒÛ’ Ù†Û Ø§ÛŒØª Ù…Ù ÛŒØ¯ Û Û’Û”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 5: Telling Time & Parts of the Day
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u3-l5",
    level: "A1",
    unit: "unit-3",
    order: 5,
    title: "Telling Time & Parts of the Day",
    description: "Read the clock, ask the time, and pair time expressions with accurate prepositions (at, in).",
    objectives: [
      "Ask and tell the time using 'o'clock', 'half past', 'quarter past', and 'quarter to'",
      "Use prepositions of time accurately: 'at' with specific times/night, 'in' with parts of the day",
      "Differentiate between AM (morning) and PM (afternoon/evening)"
    ],
    estimatedMinutes: 10,
    prerequisites: ["eng-a1-u3-l4"],
    skillTags: ["time", "prepositions", "daily-life", "vocabulary"],
    vocabularyList: [
      { word: "morning", partOfSpeech: "noun", phonetic: "/ËˆmÉ”Ë rnÉªÅ‹/", definition: "The period of time between dawn and noon.", urduMeaning: "ØµØ¨Ø­", exampleSentence: "I have the most energy in the morning." },
      { word: "afternoon", partOfSpeech: "noun", phonetic: "/ËŒÉ‘Ë ftÉ™ËˆnuË n/", definition: "The time from noon or lunchtime to evening.", urduMeaning: "Ø³Û  Ù¾Û Ø± / Ø¯ÙˆÙ¾Û Ø±", exampleSentence: "We have an English lesson in the afternoon." },
      { word: "evening", partOfSpeech: "noun", phonetic: "/ËˆiË vnÉªÅ‹/", definition: "The period of time at the end of the day, usually from about 6 PM to bedtime.", urduMeaning: "Ø´Ø§Ù…", exampleSentence: "They walk together in the evening." },
      { word: "night", partOfSpeech: "noun", phonetic: "/naÉªt/", definition: "The period of darkness in each twenty-four hours.", urduMeaning: "Ø±Ø§Øª", exampleSentence: "It gets pleasantly cool at night." },
      { word: "midnight", partOfSpeech: "noun", phonetic: "/ËˆmÉªdnaÉªt/", definition: "Twelve o'clock at night.", urduMeaning: "Ø¢Ø¯Ú¾ÛŒ Ø±Ø§Øª", exampleSentence: "The airport bus arrives at midnight." },
      { word: "noon", partOfSpeech: "noun", phonetic: "/nuË n/", definition: "Twelve o'clock in the middle of the day; midday.", urduMeaning: "Ø¯ÙˆÙ¾Û Ø± Ú©Û’ 12 Ø¨Ø¬Û’", exampleSentence: "The office cafeteria opens at noon." },
      { word: "minute", partOfSpeech: "noun", phonetic: "/ËˆmÉªnÉªt/", definition: "A period of time equal to sixty seconds.", urduMeaning: "Ù…Ù†Ù¹", exampleSentence: "The bus arrives in ten minutes." },
      { word: "hour", partOfSpeech: "noun", phonetic: "/ËˆaÊŠÉ™r/", definition: "A period of time equal to sixty minutes.", urduMeaning: "Ú¯Ú¾Ù†Ù¹Û ", exampleSentence: "We study for one hour every evening." },
      { word: "early", partOfSpeech: "adverb", phonetic: "/ËˆÉœË li/", definition: "Happening or done before the usual or expected time.", urduMeaning: "Ø¬Ù„Ø¯ÛŒ / ÙˆÙ‚Øª Ø³Û’ Ù¾Û Ù„Û’", exampleSentence: "He arrives early for all his interviews." },
      { word: "late", partOfSpeech: "adverb", phonetic: "/leÉªt/", definition: "Doing something or taking place after the expected or usual time.", urduMeaning: "Ø¯ÛŒØ± Ø³Û’", exampleSentence: "Please do not be late for class." }
    ],
    sections: [
      {
        id: "sec-a1-u3-l5-1",
        type: "explain",
        title: "Telling the Time & Prepositions",
        content: "To ask the time in English, say:\n- **What time is it?** or **What's the time?**\n- Always start the answer with: **It is... (It's...)**\n\n### Clock Expressions\n- Exact hour: *It's seven o'clock (7:00)*\n- 15 minutes after: *It's quarter past seven (7:15)*\n- 30 minutes after: *It's half past seven (7:30)*\n- 15 minutes before the next hour: *It's quarter to eight (7:45)*",
        tables: [
          {
            title: "Prepositions with Time Expressions",
            headers: ["Preposition", "When to Use", "Examples", "Urdu Translation"],
            rows: [
              ["AT", "Exact clock times, noon, midnight, night", "at 5:00 / at noon / at night", "5 Ø¨Ø¬Û’ / Ø±Ø§Øª Ú©Ùˆ"],
              ["IN", "Parts of the day (morning, afternoon, evening)", "in the morning / in the evening", "ØµØ¨Ø­ Ú©Ùˆ / Ø´Ø§Ù… Ú©Ùˆ"],
              ["ON", "Days of the week and specific dates", "on Monday / on Friday morning", "Ù¾ÛŒØ± Ú©Ùˆ / Ø¬Ù…Ø¹Û  Ú©Ùˆ"]
            ]
          },
          {
            title: "Digital vs. Analogue Clock Sayings",
            headers: ["Digital Time", "Traditional Analogue Way", "Modern Digital Way", "Notes"],
            rows: [
              ["8:00", "Eight o'clock", "Eight AM / PM", "Only exact hours use 'o'clock'."],
              ["8:15", "Quarter past eight", "Eight fifteen", "15 minutes = quarter."],
              ["8:30", "Half past eight", "Eight thirty", "30 minutes = half."],
              ["8:45", "Quarter to nine", "Eight forty-five", "Count minutes to the next hour."]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "The Special Exception: Night",
            text: "Notice: We say **in the morning**, **in the afternoon**, and **in the evening**, BUT we say **at night** (never 'in the night' for general time)."
          },
          {
            type: "warning",
            title: "Never Use 'O'clock' with Minutes",
            text: "Never say 'eight thirty o'clock'. O'clock is ONLY used for exact on-the-hour times (8:00)."
          }
        ]
      },
      {
        id: "sec-a1-u3-l5-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "What time is it right now? It is exactly half past seven.", phonetic: "/wÉ’t taÉªm Éªz Éªt raÉªt naÊŠ Éªt Éªz ÉªÉ¡ËˆzÃ¦ktli hÉ‘Ë f pÉ‘Ë st Ëˆsevn/", urdu: "Ø§Ø³ ÙˆÙ‚Øª Ú©ÛŒØ§ Ù¹Ø§Ø¦Ù… Û Û’ØŸ Ø¨Ø§Ù„Ú©Ù„ Ø³Ø§Ú‘Ú¾Û’ Ø³Ø§Øª Ø¨Ø¬Û’ Û ÛŒÚºÛ”", audioText: "What time is it right now? It is exactly half past seven." },
          { english: "The morning train leaves at quarter past eight.", phonetic: "/Ã°É™ ËˆmÉ”Ë rnÉªÅ‹ treÉªn liË vz Ã¦t ËˆkwÉ”Ë tÉ™r pÉ‘Ë st eÉªt/", urdu: "ØµØ¨Ø­ Ú©ÛŒ Ø±ÛŒÙ„ Ú¯Ø§Ú‘ÛŒ Ø³ÙˆØ§ Ø¢Ù¹Ú¾ Ø¨Ø¬Û’ Ø±ÙˆØ§Ù†Û  Û ÙˆØªÛŒ Û Û’Û”", audioText: "The morning train leaves at quarter past eight." },
          { english: "I always drink green tea in the afternoon.", phonetic: "/aÉª ËˆÉ”Ë lweÉªz drÉªÅ‹k É¡riË n tiË  Éªn Ã°i ËŒÉ‘Ë ftÉ™ËˆnuË n/", urdu: "Ù…ÛŒÚº Ø³Û  Ù¾Û Ø± Ú©Ùˆ Û Ù…ÛŒØ´Û  Ø³Ø¨Ø² Ú†Ø§Ø¦Û’ Ù¾ÛŒØªØ§ Û ÙˆÚºÛ”", audioText: "I always drink green tea in the afternoon." },
          { english: "The library closes at ten o'clock at night.", phonetic: "/Ã°É™ ËˆlaÉªbrÉ™ri ËˆklÉ™ÊŠzÉªz Ã¦t ten É™ËˆklÉ’k Ã¦t naÉªt/", urdu: "Ù„Ø§Ø¦Ø¨Ø±ÛŒØ±ÛŒ Ø±Ø§Øª Ø¯Ø³ Ø¨Ø¬Û’ Ø¨Ù†Ø¯ Û ÙˆØªÛŒ Û Û’Û”", audioText: "The library closes at ten o'clock at night." },
          { english: "We have an important team meeting at noon.", phonetic: "/wiË  hÃ¦v É™n ÉªmËˆpÉ”Ë tnt tiË m ËˆmiË tÉªÅ‹ Ã¦t nuË n/", urdu: "Ø¯ÙˆÙ¾Û Ø± Ø¨Ø§Ø±Û  Ø¨Ø¬Û’ Û Ù…Ø§Ø±ÛŒ Ù¹ÛŒÙ… Ú©ÛŒ Ø§ÛŒÚ© Ø§Û Ù… Ù…ÛŒÙ¹Ù†Ú¯ Û Û’Û”", audioText: "We have an important team meeting at noon." },
          { english: "The class begins at quarter to nine in the morning.", phonetic: "/Ã°É™ klÉ‘Ë s bÉªËˆÉ¡Éªnz Ã¦t ËˆkwÉ”Ë tÉ™r tuË  naÉªn Éªn Ã°É™ ËˆmÉ”Ë rnÉªÅ‹/", urdu: "Ú©Ù„Ø§Ø³ ØµØ¨Ø­ Ù¾ÙˆÙ†Û’ Ù†Ùˆ Ø¨Ø¬Û’ Ø´Ø±ÙˆØ¹ Û ÙˆØªÛŒ Û Û’Û”", audioText: "The class begins at quarter to nine in the morning." },
          { english: "He arrives early so that he can prepare his notes.", phonetic: "/hiË  É™ËˆraÉªvz ËˆÉœË li sÉ™ÊŠ Ã°Ã¦t hiË  kÃ¦n prÉªËˆpeÉ™r hÉªz nÉ™ÊŠts/", urdu: "ÙˆÛ  Ø¬Ù„Ø¯ÛŒ Ù¾Û Ù†Ú†ØªØ§ Û Û’ ØªØ§Ú©Û  Ø§Ù¾Ù†Û’ Ù†ÙˆÙ¹Ø³ ØªÛŒØ§Ø± Ú©Ø± Ø³Ú©Û’Û”", audioText: "He arrives early so that he can prepare his notes." },
          { english: "It is quiet and peaceful in our town at midnight.", phonetic: "/Éªt Éªz ËˆkwaÉªÉ™t Ã¦nd ËˆpiË sfl Éªn ËˆaÊŠÉ™r taÊŠn Ã¦t ËˆmÉªdnaÉªt/", urdu: "Ø¢Ø¯Ú¾ÛŒ Ø±Ø§Øª Ú©Ùˆ Û Ù…Ø§Ø±Û’ Ù‚ØµØ¨Û’ Ù…ÛŒÚº Ù¾Ø±Ø³Ú©ÙˆÙ† Ø®Ø§Ù…ÙˆØ´ÛŒ Û ÙˆØªÛŒ Û Û’Û”", audioText: "It is quiet and peaceful in our town at midnight." }
        ]
      },
      {
        id: "sec-a1-u3-l5-3",
        type: "dialogue",
        title: "Catching the Morning Train",
        dialogue: [
          { speaker: "Passenger", avatar: "P", english: "Excuse me, what time is the next train to Rawalpindi?", urdu: "Ù…Ø¹Ø§Ù  Ú©ÛŒØ¬Ø¦Û’ Ú¯Ø§ØŒ Ø±Ø§ÙˆÙ„Ù¾Ù†ÚˆÛŒ Ú©Û’ Ù„ÛŒÛ’ Ø§Ú¯Ù„ÛŒ Ú¯Ø§Ú‘ÛŒ Ú©Ø³ ÙˆÙ‚Øª Û Û’ØŸ", audioText: "Excuse me, what time is the next train to Rawalpindi?" },
          { speaker: "Station Master", avatar: "S", english: "It leaves at quarter to ten, in about twenty minutes.", urdu: "ÙˆÛ  Ù¾ÙˆÙ†Û’ Ø¯Ø³ Ø¨Ø¬Û’ Ø±ÙˆØ§Ù†Û  Û ÙˆØªÛŒ Û Û’ØŒ ØªÙ‚Ø±ÛŒØ¨Ø§Ù‹ Ø¨ÛŒØ³ Ù…Ù†Ù¹ Ù…ÛŒÚºÛ”", audioText: "It leaves at quarter to ten, in about twenty minutes." },
          { speaker: "Passenger", avatar: "P", english: "And what time does it arrive there?", urdu: "Ø§ÙˆØ± ÙˆÛ  ÙˆÛ Ø§Úº Ú©Ø³ ÙˆÙ‚Øª Ù¾Û Ù†Ú†ØªÛŒ Û Û’ØŸ", audioText: "And what time does it arrive there?" },
          { speaker: "Station Master", avatar: "S", english: "It arrives at half past two in the afternoon.", urdu: "ÙˆÛ  Ø¯ÙˆÙ¾Û Ø± ÚˆÚ¾Ø§Ø¦ÛŒ Ø¨Ø¬Û’ Ù¾Û Ù†Ú†ØªÛŒ Û Û’Û”", audioText: "It arrives at half past two in the afternoon." }
        ]
      },
      {
        id: "sec-a1-u3-l5-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u3-l5-1",
            type: "mcq",
            skillTag: "prepositions",
            prompt: "Choose the correct preposition: 'The flight lands _____ 6:30 PM.'",
            options: [
              { id: "opt-1", text: "in" },
              { id: "opt-2", text: "on" },
              { id: "opt-3", text: "at" },
              { id: "opt-4", text: "for" }
            ],
            correctOptionId: "opt-3",
            explanation: "Specific clock times always take the preposition 'at'.",
            urduExplanation: "Ú¯Ú¾Ú‘ÛŒ Ú©Û’ Ù…Ø®ØµÙˆØµ ÙˆÙ‚Øª Ú©Û’ Ù„ÛŒÛ’ 'at' Ù„Ú¯Ø§ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u3-l5-2",
            type: "mcq",
            skillTag: "time",
            prompt: "How do you say 9:15 in traditional English?",
            options: [
              { id: "opt-1", text: "Quarter to nine" },
              { id: "opt-2", text: "Nine quarter" },
              { id: "opt-3", text: "Half past nine" },
              { id: "opt-4", text: "Quarter past nine" }
            ],
            correctOptionId: "opt-4",
            explanation: "15 minutes after nine is 'quarter past nine'.",
            urduExplanation: "9:15 Ú©Ùˆ 'quarter past nine' (Ø³ÙˆØ§ Ù†Ùˆ) Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u3-l5-3",
            type: "fill_blank",
            skillTag: "time",
            prompt: "How do you say 4:30? Complete: 'It is half _____ four.'",
            correctAnswer: "past",
            explanation: "30 minutes past four is 'half past four'.",
            urduExplanation: "4:30 Ú©Û’ Ù„ÛŒÛ’ 'half past four' (Ø³Ø§Ú‘Ú¾Û’ Ú†Ø§Ø±) Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u3-l5-4",
            type: "fill_blank",
            skillTag: "prepositions",
            prompt: "Fill in the preposition: 'We sleep _____ night.'",
            correctAnswer: "at",
            explanation: "Night is paired with 'at': 'at night'.",
            urduExplanation: "night Ú©Û’ Ø³Ø§ØªÚ¾ 'at' Ø¢ØªØ§ Û Û’: 'at night'Û”"
          },
          {
            id: "ex-a1-u3-l5-5",
            type: "order_sentence",
            skillTag: "time",
            prompt: "Rearrange the words to form a correct statement:",
            sentenceTokens: ["The", "class", "starts", "at", "ten", "o'clock", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Subject (The class) + verb (starts) + preposition (at) + time (ten o'clock).",
            urduExplanation: "The class starts at ten o'clock."
          },
          {
            id: "ex-a1-u3-l5-6",
            type: "order_sentence",
            skillTag: "time",
            prompt: "Rearrange the words to form a correct question:",
            sentenceTokens: ["What", "time", "is", "it", "right", "now", "?"],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Question phrase (What time) + verb (is) + pronoun (it) + adverb (right now)?",
            urduExplanation: "What time is it right now?"
          },
          {
            id: "ex-a1-u3-l5-7",
            type: "match_pairs",
            skillTag: "prepositions",
            prompt: "Match the time phrase with its correct preposition:",
            pairs: [
              { left: "the morning", right: "in" },
              { left: "7:00 PM", right: "at" },
              { left: "night", right: "at" },
              { left: "the afternoon", right: "in" }
            ],
            explanation: "Prepositions 'at' and 'in' accurately paired.",
            urduExplanation: "ÙˆÙ‚Øª Ú©Û’ ØµØ­ÛŒØ­ prepositions Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u3-l5-8",
            type: "error_correction",
            skillTag: "time",
            prompt: "Find and correct the mistake: 'The meeting starts at two thirty o'clock.'",
            correctAnswer: "The meeting starts at two thirty.",
            explanation: "'O'clock' can only be used with full hours (two o'clock). Say 'two thirty' or 'half past two'.",
            urduExplanation: "Ù…Ù†Ù¹ÙˆÚº Ú©Û’ Ø³Ø§ØªÚ¾ 'o'clock' Ù†Û ÛŒÚº Ù„Ú¯ØªØ§ØŒ ØµØ±Ù  'two thirty' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u3-l5-9",
            type: "error_correction",
            skillTag: "prepositions",
            prompt: "Find and correct the mistake: 'I drink warm milk in night.'",
            correctAnswer: "I drink warm milk at night.",
            explanation: "Use 'at night', not 'in night'.",
            urduExplanation: "'at night' ØµØ­ÛŒØ­ Û Û’ØŒ 'in night' ØºÙ„Ø· Û Û’Û”"
          },
          {
            id: "ex-a1-u3-l5-10",
            type: "true_false",
            skillTag: "time",
            prompt: "'Quarter to six' means 5:45. (True or False)",
            correctAnswer: "True",
            explanation: "True. 'Quarter to six' means 15 minutes before 6:00, which is 5:45.",
            urduExplanation: "Ø¯Ø±Ø³ØªÛ” 'Quarter to six' Ú©Ø§ Ù…Ø·Ù„Ø¨ Ù¾ÙˆÙ†Û’ Ú†Ú¾Û’ (5:45) Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u3-l5-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u3-l5-1",
            type: "mcq",
            skillTag: "time",
            prompt: "What time is 'quarter to eight' in digital format?",
            options: [
              { id: "opt-1", text: "7:45" },
              { id: "opt-2", text: "8:15" },
              { id: "opt-3", text: "8:45" },
              { id: "opt-4", text: "7:15" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Quarter to eight' means 15 minutes before 8:00, which is 7:45.",
            urduExplanation: "'quarter to eight' Ú©Ø§ Ù…Ø·Ù„Ø¨ Ù¾ÙˆÙ†Û’ Ø¢Ù¹Ú¾ (7:45) Û Û’Û”"
          },
          {
            id: "qz-a1-u3-l5-2",
            type: "mcq",
            skillTag: "prepositions",
            prompt: "Which expression takes 'in' instead of 'at'?",
            options: [
              { id: "opt-1", text: "noon" },
              { id: "opt-2", text: "the morning" },
              { id: "opt-3", text: "midnight" },
              { id: "opt-4", text: "4:00 PM" }
            ],
            correctOptionId: "opt-2",
            explanation: "Parts of the day take 'in' ('in the morning'), while noon, midnight, and clock times take 'at'.",
            urduExplanation: "'in the morning' Ù…ÛŒÚº 'in' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u3-l5-3",
            type: "mcq",
            skillTag: "time",
            prompt: "What is twelve o'clock in the middle of the day called?",
            options: [
              { id: "opt-1", text: "midnight" },
              { id: "opt-2", text: "evening" },
              { id: "opt-3", text: "noon" },
              { id: "opt-4", text: "morning" }
            ],
            correctOptionId: "opt-3",
            explanation: "12:00 PM midday is specifically called 'noon'.",
            urduExplanation: "Ø¯ÙˆÙ¾Û Ø± Ú©Û’ 12 Ø¨Ø¬Û’ Ú©Ùˆ 'noon' Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "qz-a1-u3-l5-4",
            type: "mcq",
            skillTag: "time",
            prompt: "Select the sentence with INCORRECT grammar:",
            options: [
              { id: "opt-1", text: "The movie starts at eight o'clock." },
              { id: "opt-2", text: "The movie starts at eight thirty." },
              { id: "opt-3", text: "The movie starts at half past eight." },
              { id: "opt-4", text: "The movie starts at eight thirty o'clock." }
            ],
            correctOptionId: "opt-4",
            explanation: "'eight thirty o'clock' is wrong because 'o'clock' can only be used on the exact hour.",
            urduExplanation: "'eight thirty o'clock' ØºÙ„Ø· Û Û’ Ú©ÛŒÙˆÙ†Ú©Û  o'clock Ù…Ù†Ù¹ÙˆÚº Ú©Û’ Ø³Ø§ØªÚ¾ Ù†Û ÛŒÚº Ù„Ú¯ØªØ§Û”"
          },
          {
            id: "qz-a1-u3-l5-5",
            type: "mcq",
            skillTag: "time",
            prompt: "What does 'AM' indicate?",
            options: [
              { id: "opt-1", text: "Morning (midnight to midday)" },
              { id: "opt-2", text: "Afternoon and evening" },
              { id: "opt-3", text: "Night only" },
              { id: "opt-4", text: "All Month" }
            ],
            correctOptionId: "opt-1",
            explanation: "AM (Ante Meridiem) covers the twelve hours between midnight and midday.",
            urduExplanation: "AM Ø¢Ø¯Ú¾ÛŒ Ø±Ø§Øª Ø³Û’ Ø¯ÙˆÙ¾Û Ø± ØªÚ© Ú©Ø§ ÙˆÙ‚Øª (ØµØ¨Ø­) Û ÙˆØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u3-l5-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Time expression takeaways:",
        summaryPoints: [
          "Use 'at' for specific times: at 7:00, at half past eight, at noon, at midnight, at night.",
          "Use 'in' for periods of the day: in the morning, in the afternoon, in the evening.",
          "15 min past = quarter past; 30 min = half past; 15 min to = quarter to.",
          "Only use 'o'clock' on the exact hour (7:00 -> 7 o'clock; never 7:30 o'clock).",
          "AM = morning (midnight to noon); PM = afternoon/evening (noon to midnight)."
        ]
      },
      {
        id: "sec-a1-u3-l5-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Û Ù… ÙˆÙ‚Øª Ú©Û’ Ù„ÛŒÛ’ Ø¹Ø§Ù… Ø·ÙˆØ± Ù¾Ø± **'Ú©Ùˆ'** ÛŒØ§ **'Ù¾Ø±'** Ú©Û ØªÛ’ Û ÛŒÚº:\n- 'Ø³Ø§Øª Ø¨Ø¬Û’'\n- 'ØµØ¨Ø­ **Ú©Ùˆ**'\n- 'Ø±Ø§Øª **Ú©Ùˆ**'\n\nÙ„ÛŒÚ©Ù† Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Û Ù…ÛŒÚº Ø¯Ùˆ Ø§Ù„Ú¯ Prepositions Ø§Ø³ØªØ¹Ù…Ø§Ù„ Ú©Ø±Ù†Û’ Ù¾Ú‘ØªÛ’ Û ÛŒÚº:\n- Ú¯Ú¾Ú‘ÛŒ Ú©Û’ ÙˆÙ‚Øª Ø§ÙˆØ± Ø±Ø§Øª Ú©Û’ Ù„ÛŒÛ’: **at** (at 7:00, at night)\n- Ø¯Ù† Ú©Û’ Ø­ØµÙˆÚº Ú©Û’ Ù„ÛŒÛ’: **in** (in the morning, in the afternoon)\nÛŒÛ Ø§Úº 'in night' Ú©Û Ù†Ø§ Ø§ÛŒÚ© Ø¹Ø§Ù… ØºÙ„Ø·ÛŒ Û Û’ Ø¬Ø³ Ø³Û’ Ø¨Ú†Ù†Ø§ Ú†Ø§Û ÛŒÛ’Û” Û Ù…ÛŒØ´Û  **'at night'** Ú©Û ÛŒÚºÛ”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  }
];
