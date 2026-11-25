/**
 * Zarii English Course - Level A1, Unit 2 Content
 * Unit 2: Nouns, Plurals & Everyday Objects
 * Lessons 1 to 5
 */

module.exports = [
  // -------------------------------------------------------------------------
  // LESSON 1: Singular & Plural Nouns (-s, -es, irregulars)
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u2-l1",
    level: "A1",
    unit: "unit-2",
    order: 1,
    title: "Singular & Plural Nouns (-s, -es, irregulars)",
    description: "Learn how to turn singular nouns into plural nouns using regular and irregular rules.",
    objectives: [
      "Convert regular singular nouns to plural by adding -s or -es",
      "Apply spelling rules for words ending in -ch, -sh, -ss, -x, and consonant + y",
      "Identify and use essential irregular plural nouns (child/children, man/men, person/people)"
    ],
    estimatedMinutes: 12,
    prerequisites: ["eng-a1-u1-l5"],
    skillTags: ["nouns", "plurals", "grammar-rules"],
    vocabularyList: [
      { word: "book", partOfSpeech: "noun", phonetic: "/bÊŠk/", definition: "A written or printed work consisting of pages.", urduMeaning: "Ú©ØªØ§Ø¨", exampleSentence: "She has an interesting book on her desk." },
      { word: "box", partOfSpeech: "noun", phonetic: "/bÉ’ks/", definition: "A container with a flat base and sides.", urduMeaning: "ÚˆØ¨Û ", exampleSentence: "There are two wooden boxes in the room." },
      { word: "watch", partOfSpeech: "noun", phonetic: "/wÉ’tÊƒ/", definition: "A small timepiece worn on the wrist.", urduMeaning: "Ú¯Ú¾Ú‘ÛŒ", exampleSentence: "My grandfather gave me this beautiful watch." },
      { word: "city", partOfSpeech: "noun", phonetic: "/ËˆsÉªti/", definition: "A large human settlement or town.", urduMeaning: "Ø´Û Ø±", exampleSentence: "Many large cities have modern transport." },
      { word: "child", partOfSpeech: "noun", phonetic: "/tÊƒaÉªld/", definition: "A young human being below the age of puberty.", urduMeaning: "Ø¨Ú†Û ", exampleSentence: "The young child is playing in the park." },
      { word: "person", partOfSpeech: "noun", phonetic: "/ËˆpÉœË sn/", definition: "A human being regarded as an individual.", urduMeaning: "Ø´Ø®Øµ / Ù Ø±Ø¯", exampleSentence: "Each person must show an entrance ticket." },
      { word: "key", partOfSpeech: "noun", phonetic: "/kiË /", definition: "A small piece of shaped metal used to open a lock.", urduMeaning: "Ú†Ø§Ø¨ÛŒ", exampleSentence: "He keeps his house keys in his pocket." },
      { word: "table", partOfSpeech: "noun", phonetic: "/ËˆteÉªbl/", definition: "A piece of furniture with a flat top and legs.", urduMeaning: "Ù…ÛŒØ²", exampleSentence: "The books are on the dining table." },
      { word: "chair", partOfSpeech: "noun", phonetic: "/tÊƒeÉ™r/", definition: "A separate seat for one person.", urduMeaning: "Ú©Ø±Ø³ÛŒ", exampleSentence: "Please take a comfortable chair." },
      { word: "bag", partOfSpeech: "noun", phonetic: "/bÃ¦É¡/", definition: "A flexible container with an opening at the top.", urduMeaning: "Ø¨Ø³ØªÛ  / ØªÚ¾ÛŒÙ„Ø§", exampleSentence: "Her school bag is heavy with notebooks." }
    ],
    sections: [
      {
        id: "sec-a1-u2-l1-1",
        type: "explain",
        title: "Rules for Forming Plural Nouns",
        content: "A **singular noun** refers to one person, place, or thing. A **plural noun** refers to two or more.\n\nMost English nouns form their plural simply by adding **-s**. However, certain endings require **-es**, spelling alterations, or completely irregular forms.",
        tables: [
          {
            title: "Regular Plural Rules",
            headers: ["Rule", "Ending", "Singular Example", "Plural Example", "Spelling Note"],
            rows: [
              ["Add -s", "General consonant / vowel", "book, chair", "books, chairs", "Standard rule for most English nouns."],
              ["Add -es", "-ch, -sh, -ss, -x, -z", "watch, box, glass", "watches, boxes, glasses", "Adds an extra syllable /Éªz/ for easy pronunciation."],
              ["Change -y to -ies", "Consonant + -y", "city, baby", "cities, babies", "Drop the y, add -ies. Vowel+y just takes -s (keys, days)."],
              ["Change -f/-fe to -ves", "-f or -fe", "leaf, life", "leaves, lives", "The voiceless /f/ shifts to voiced /v/."]
            ]
          },
          {
            title: "Crucial Irregular Plurals",
            headers: ["Singular Form", "Plural Form", "Urdu Meaning", "Common Error to Avoid"],
            rows: [
              ["child", "children", "Ø¨Ú†Û’", "Never say 'childs' or 'childrens'."],
              ["person", "people", "Ù„ÙˆÚ¯", "Say 'three people', not 'three persons' in daily speech."],
              ["man", "men", "Ù…Ø±Ø¯", "Change vowel sound from /Ã¦/ to /e/."],
              ["woman", "women", "Ø¹ÙˆØ±ØªÛŒÚº", "Singular /ËˆwÊŠmÉ™n/, plural /ËˆwÉªmÉªn/."],
              ["foot", "feet", "Ù¾Ø§Ø¤Úº", "Double 'oo' becomes double 'ee'."],
              ["tooth", "teeth", "Ø¯Ø§Ù†Øª", "Never say 'tooths'."]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Vowel + Y vs. Consonant + Y",
            text: "Look at the letter before 'y': if it is a vowel (a, e, i, o, u), just add **-s** (boy -> boys, key -> keys). If it is a consonant, change to **-ies** (baby -> babies, story -> stories)."
          },
          {
            type: "warning",
            title: "Verb Agreement with Plural Nouns",
            text: "Plural nouns take plural verbs: 'The child **is** playing' -> 'The children **are** playing'."
          }
        ]
      },
      {
        id: "sec-a1-u2-l1-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "There are four books on the wooden desk.", phonetic: "/Ã°eÉ™r É‘Ë r fÉ”Ë r bÊŠks É’n Ã°É™ ËˆwÊŠdn desk/", urdu: "Ù„Ú©Ú‘ÛŒ Ú©ÛŒ Ù…ÛŒØ² Ù¾Ø± Ú†Ø§Ø± Ú©ØªØ§Ø¨ÛŒÚº Û ÛŒÚºÛ”", audioText: "There are four books on the wooden desk." },
          { english: "The children are laughing in the playground.", phonetic: "/Ã°É™ ËˆtÊƒÉªldrÉ™n É‘Ë r ËˆlÉ‘Ë fÉªÅ‹ Éªn Ã°É™ ËˆpleÉªÉ¡raÊŠnd/", urdu: "Ø¨Ú†Û’ Ú©Ú¾ÛŒÙ„ Ú©Û’ Ù…ÛŒØ¯Ø§Ù† Ù…ÛŒÚº Û Ù†Ø³ Ø±Û Û’ Û ÛŒÚºÛ”", audioText: "The children are laughing in the playground." },
          { english: "She bought three colourful watches as gifts.", phonetic: "/ÊƒiË  bÉ”Ë t Î¸riË  ËˆkÊŒlÉ™rfÉ™l ËˆwÉ’tÊƒÉªz Ã¦z É¡Éªfts/", urdu: "Ø§Ø³ Ù†Û’ ØªØ­Ù Û’ Ú©Û’ Ø·ÙˆØ± Ù¾Ø± ØªÛŒÙ† Ø±Ù†Ú¯ Ø¨Ø±Ù†Ú¯ÛŒ Ú¯Ú¾Ú‘ÛŒØ§Úº Ø®Ø±ÛŒØ¯ÛŒÚºÛ”", audioText: "She bought three colourful watches as gifts." },
          { english: "Many people travel between these two cities every day.", phonetic: "/Ëˆmeni ËˆpiË pl ËˆtrÃ¦vl bÉªËˆtwiË n Ã°iË z tuË  ËˆsÉªtiz Ëˆevri deÉª/", urdu: "Ø¨Û Øª Ø³Û’ Ù„ÙˆÚ¯ Û Ø± Ø±ÙˆØ² Ø§Ù† Ø¯Ùˆ Ø´Û Ø±ÙˆÚº Ú©Û’ Ø¯Ø±Ù…ÛŒØ§Ù† Ø³Ù Ø± Ú©Ø±ØªÛ’ Û ÛŒÚºÛ”", audioText: "Many people travel between these two cities every day." },
          { english: "He has two house keys in his jacket pocket.", phonetic: "/hiË  hÃ¦z tuË  haÊŠs kiË z Éªn hÉªz ËˆdÊ’Ã¦kÉªt ËˆpÉ’kÉªt/", urdu: "Ø§Ø³ Ú©ÛŒ Ø¬ÛŒÚ©Ù¹ Ú©ÛŒ Ø¬ÛŒØ¨ Ù…ÛŒÚº Ú¯Ú¾Ø± Ú©ÛŒ Ø¯Ùˆ Ú†Ø§Ø¨ÛŒØ§Úº Û ÛŒÚºÛ”", audioText: "He has two house keys in his jacket pocket." },
          { english: "We need five more chairs for the guests.", phonetic: "/wiË  niË d faÉªv mÉ”Ë r tÊƒeÉ™rz fÉ”Ë r Ã°É™ É¡ests/", urdu: "Û Ù…ÛŒÚº Ù…Û Ù…Ø§Ù†ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ Ù¾Ø§Ù†Ú† Ù…Ø²ÛŒØ¯ Ú©Ø±Ø³ÛŒÙˆÚº Ú©ÛŒ Ø¶Ø±ÙˆØ±Øª Û Û’Û”", audioText: "We need five more chairs for the guests." },
          { english: "Both men are skilled computer engineers.", phonetic: "/boÊŠÎ¸ men É‘Ë r skÉªld kÉ™mËˆpjuË tÉ™r ËŒendÊ’ÉªËˆnÉªÉ™rz/", urdu: "Ø¯ÙˆÙ†ÙˆÚº Ù…Ø±Ø¯ Ù…Ø§Û Ø± Ú©Ù…Ù¾ÛŒÙˆÙ¹Ø± Ø§Ù†Ø¬Ù†ÛŒØ¦Ø± Û ÛŒÚºÛ”", audioText: "Both men are skilled computer engineers." },
          { english: "The heavy boxes are stacked near the exit door.", phonetic: "/Ã°É™ Ëˆhevi ËˆbÉ’ksÉªz É‘Ë r stÃ¦kt nÉªÉ™r Ã°i ËˆeksÉªt dÉ”Ë r/", urdu: "Ø¨Ú¾Ø§Ø±ÛŒ ÚˆØ¨Û’ Ø¨Ø§Û Ø± Ù†Ú©Ù„Ù†Û’ Ú©Û’ Ø¯Ø±ÙˆØ§Ø²Û’ Ú©Û’ Ù‚Ø±ÛŒØ¨ Ø±Ú©Ú¾Û’ Û ÙˆØ¦Û’ Û ÛŒÚºÛ”", audioText: "The heavy boxes are stacked near the exit door." }
        ]
      },
      {
        id: "sec-a1-u2-l1-3",
        type: "dialogue",
        title: "Organizing the Study Room",
        dialogue: [
          { speaker: "Rashid", avatar: "R", english: "How many boxes do we need for these books?", urdu: "Ø§Ù† Ú©ØªØ§Ø¨ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ Û Ù…ÛŒÚº Ú©ØªÙ†Û’ ÚˆØ¨ÙˆÚº Ú©ÛŒ Ø¶Ø±ÙˆØ±Øª Û Û’ØŸ", audioText: "How many boxes do we need for these books?" },
          { speaker: "Amina", avatar: "A", english: "We need three large boxes. Put the English books on these shelves.", urdu: "Û Ù…ÛŒÚº ØªÛŒÙ† Ø¨Ú‘Û’ ÚˆØ¨ÙˆÚº Ú©ÛŒ Ø¶Ø±ÙˆØ±Øª Û Û’Û” Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ú©ÛŒ Ú©ØªØ§Ø¨ÛŒÚº Ø§Ù† Ø§Ù„Ù…Ø§Ø±ÛŒÙˆÚº Ù¾Ø± Ø±Ú©Ú¾ Ø¯ÛŒÚºÛ”", audioText: "We need three large boxes. Put the English books on these shelves." },
          { speaker: "Rashid", avatar: "R", english: "Where are the room keys?", urdu: "Ú©Ù…Ø±Û’ Ú©ÛŒ Ú†Ø§Ø¨ÛŒØ§Úº Ú©Û Ø§Úº Û ÛŒÚºØŸ", audioText: "Where are the room keys?" },
          { speaker: "Amina", avatar: "A", english: "The keys are right on the table next to the watches.", urdu: "Ú†Ø§Ø¨ÛŒØ§Úº Ù…ÛŒØ² Ù¾Ø± Ú¯Ú¾Ú‘ÛŒÙˆÚº Ú©Û’ Ø¨Ø±Ø§Ø¨Ø± Ù…ÛŒÚº Û ÛŒ Û ÛŒÚºÛ”", audioText: "The keys are right on the table next to the watches." }
        ]
      },
      {
        id: "sec-a1-u2-l1-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u2-l1-1",
            type: "mcq",
            skillTag: "plurals",
            prompt: "What is the correct plural form of the noun 'watch'?",
            options: [
              { id: "opt-1", text: "watches" },
              { id: "opt-2", text: "watchs" },
              { id: "opt-3", text: "watchies" },
              { id: "opt-4", text: "watchis" }
            ],
            correctOptionId: "opt-1",
            explanation: "Nouns ending in -ch add '-es' to form their plural, making 'watches'.",
            urduExplanation: "Ø¬Ùˆ Ø§Ø³Ù… -ch Ù¾Ø± Ø®ØªÙ… Û ÙˆØªÛ’ Û ÛŒÚº Ø§Ù† Ú©ÛŒ Ø¬Ù…Ø¹ Ø¨Ù†Ø§Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ '-es' Ú©Ø§ Ø§Ø¶Ø§Ù Û  Ú©ÛŒØ§ Ø¬Ø§ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l1-2",
            type: "mcq",
            skillTag: "plurals",
            prompt: "Choose the correct sentence featuring an irregular plural:",
            options: [
              { id: "opt-1", text: "The childs are playing." },
              { id: "opt-2", text: "The children are playing." },
              { id: "opt-3", text: "The childrens are playing." },
              { id: "opt-4", text: "The child are playing." }
            ],
            correctOptionId: "opt-2",
            explanation: "The plural of 'child' is irregularly 'children'. It does not take an 's'.",
            urduExplanation: "'child' Ú©ÛŒ ØµØ­ÛŒØ­ Ø¬Ù…Ø¹ 'children' Û Û’ØŒ Ø§Ø³ Ú©Û’ Ø³Ø§ØªÚ¾ 's' Ù†Û ÛŒÚº Ù„Ú¯ØªØ§Û”"
          },
          {
            id: "ex-a1-u2-l1-3",
            type: "fill_blank",
            skillTag: "plurals",
            prompt: "Complete with the plural of 'city': 'Islamabad and Lahore are modern _____.'",
            correctAnswer: "cities",
            explanation: "'City' ends in a consonant + y, so the 'y' changes to 'ies' to form 'cities'.",
            urduExplanation: "'city' Ú©Û’ Ø¢Ø®Ø± Ù…ÛŒÚº consonant + y Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ y Ú©Ùˆ Û Ù¹Ø§ Ú©Ø± ies Ù„Ú¯Ø§ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u2-l1-4",
            type: "fill_blank",
            skillTag: "plurals",
            prompt: "Complete with the plural of 'person': 'There are twenty _____ in the conference room.'",
            correctAnswer: "people",
            explanation: "The normal plural for 'person' in modern English is 'people'.",
            urduExplanation: "'person' Ú©ÛŒ Ø¹Ø§Ù… Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ø¬Ù…Ø¹ 'people' (Ù„ÙˆÚ¯) Û ÙˆØªÛŒ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l1-5",
            type: "order_sentence",
            skillTag: "plurals",
            prompt: "Rearrange the words to form a correct sentence:",
            sentenceTokens: ["Three", "women", "are", "waiting", "outside", "."],
            correctOrder: [0, 1, 2, 3, 4, 5],
            explanation: "Subject (Three women) + verb (are waiting) + adverbial phrase (outside).",
            urduExplanation: "Ù Ø§Ø¹Ù„ (Three women) Ø§ÙˆØ± Ø¬Ù…Ø¹ Ù Ø¹Ù„ (are waiting) Ú©Û’ Ø³Ø§ØªÚ¾ Ø¬Ù…Ù„Û  Ø¨Ù†Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u2-l1-6",
            type: "order_sentence",
            skillTag: "plurals",
            prompt: "Rearrange the words to form a correct statement:",
            sentenceTokens: ["The", "wooden", "boxes", "are", "very", "heavy", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "The noun phrase 'The wooden boxes' functions as the plural subject.",
            urduExplanation: "'The wooden boxes' Ø¨Ø·ÙˆØ± Ø¬Ù…Ø¹ Ù Ø§Ø¹Ù„ Ù¾Û Ù„Û’ Ø¢Ø¦Û’ Ú¯Ø§Û”"
          },
          {
            id: "ex-a1-u2-l1-7",
            type: "match_pairs",
            skillTag: "plurals",
            prompt: "Match the singular noun with its correct plural form:",
            pairs: [
              { left: "man", right: "men" },
              { left: "box", right: "boxes" },
              { left: "key", right: "keys" },
              { left: "baby", right: "babies" }
            ],
            explanation: "Regular and irregular plurals correctly paired.",
            urduExplanation: "ÙˆØ§Ø­Ø¯ Ø§ÙˆØ± Ø¬Ù…Ø¹ Ú©Û’ ØµØ­ÛŒØ­ Ø¬ÙˆÚ‘Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u2-l1-8",
            type: "error_correction",
            skillTag: "plurals",
            prompt: "Find and correct the mistake: 'He has three tooths that hurt.'",
            correctAnswer: "He has three teeth that hurt.",
            explanation: "The plural of 'tooth' is the irregular noun 'teeth', not 'tooths'.",
            urduExplanation: "'tooth' Ú©ÛŒ Ø¬Ù…Ø¹ 'teeth' Û ÙˆØªÛŒ Û Û’ØŒ 'tooths' ØºÙ„Ø· Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l1-9",
            type: "error_correction",
            skillTag: "plurals",
            prompt: "Find and correct the mistake: 'The babys are crying loudly.'",
            correctAnswer: "The babies are crying loudly.",
            explanation: "For 'baby' (consonant + y), replace 'y' with 'ies' to write 'babies'.",
            urduExplanation: "'baby' Ú©Û’ Ø¢Ø®Ø± Ù…ÛŒÚº consonant + y Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'babies' Ù„Ú©Ú¾Ø§ Ø¬Ø§ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l1-10",
            type: "true_false",
            skillTag: "plurals",
            prompt: "The plural of 'key' is spelled 'keies'. (True or False)",
            correctAnswer: "False",
            explanation: "False. 'Key' has a vowel before 'y' (e + y), so it simply adds -s: 'keys'.",
            urduExplanation: "ØºÙ„Ø·Û” 'key' Ù…ÛŒÚº y Ø³Û’ Ù¾Û Ù„Û’ vowel (e) Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ ØµØ±Ù  -s Ù„Ú¯ Ú©Ø± 'keys' Ø¨Ù†ØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u2-l1-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u2-l1-1",
            type: "mcq",
            skillTag: "plurals",
            prompt: "Which plural form is spelled INCORRECTLY?",
            options: [
              { id: "opt-1", text: "countrys" },
              { id: "opt-2", text: "cities" },
              { id: "opt-3", text: "watches" },
              { id: "opt-4", text: "tables" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Country' ends in consonant + y, so its correct plural is 'countries', not 'countrys'.",
            urduExplanation: "'country' Ú©ÛŒ ØµØ­ÛŒØ­ Ø¬Ù…Ø¹ 'countries' Û ÙˆØªÛŒ Û Û’Û”"
          },
          {
            id: "qz-a1-u2-l1-2",
            type: "mcq",
            skillTag: "plurals",
            prompt: "What is the plural of 'foot'?",
            options: [
              { id: "opt-1", text: "foots" },
              { id: "opt-2", text: "feet" },
              { id: "opt-3", text: "feets" },
              { id: "opt-4", text: "footen" }
            ],
            correctOptionId: "opt-2",
            explanation: "'Foot' changes its vowel to become 'feet' in the plural.",
            urduExplanation: "'foot' Ú©ÛŒ Ø¬Ù…Ø¹ 'feet' Û Û’Û”"
          },
          {
            id: "qz-a1-u2-l1-3",
            type: "mcq",
            skillTag: "plurals",
            prompt: "Select the sentence with correct subject-verb agreement:",
            options: [
              { id: "opt-1", text: "The children is here." },
              { id: "opt-2", text: "The people was happy." },
              { id: "opt-3", text: "The boxes are ready." },
              { id: "opt-4", text: "The women is working." }
            ],
            correctOptionId: "opt-3",
            explanation: "'The boxes are ready' correctly matches plural subject 'boxes' with plural verb 'are'.",
            urduExplanation: "Ø¬Ù…Ø¹ Ù Ø§Ø¹Ù„ 'boxes' Ú©Û’ Ø³Ø§ØªÚ¾ Ø¬Ù…Ø¹ Ù Ø¹Ù„ 'are' ØµØ­ÛŒØ­ Û Û’Û”"
          },
          {
            id: "qz-a1-u2-l1-4",
            type: "mcq",
            skillTag: "plurals",
            prompt: "What is the plural of 'life'?",
            options: [
              { id: "opt-1", text: "lifes" },
              { id: "opt-2", text: "lifies" },
              { id: "opt-3", text: "lifess" },
              { id: "opt-4", text: "lives" }
            ],
            correctOptionId: "opt-4",
            explanation: "Nouns ending in -fe like 'life' shift to -ves in the plural: 'lives'.",
            urduExplanation: "-fe Ù¾Ø± Ø®ØªÙ… Û ÙˆÙ†Û’ ÙˆØ§Ù„Û’ Ø§Ø³Ù… Ú©ÛŒ Ø¬Ù…Ø¹ 'lives' Û ÙˆØªÛŒ Û Û’Û”"
          },
          {
            id: "qz-a1-u2-l1-5",
            type: "mcq",
            skillTag: "plurals",
            prompt: "Which pair shows singular and plural correctly?",
            options: [
              { id: "opt-1", text: "man - men" },
              { id: "opt-2", text: "person - persons" },
              { id: "opt-3", text: "bus - buss" },
              { id: "opt-4", text: "day - daies" }
            ],
            correctOptionId: "opt-1",
            explanation: "'man - men' is the correct vowel-shift irregular plural pair.",
            urduExplanation: "'man - men' Ø¨Ø§Ù„Ú©Ù„ Ø¯Ø±Ø³Øª ÙˆØ§Ø­Ø¯ Ø¬Ù…Ø¹ Ú©Ø§ Ø¬ÙˆÚ‘Ø§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u2-l1-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Here is what you mastered in this lesson:",
        summaryPoints: [
          "Most nouns become plural by adding -s (book -> books, desk -> desks).",
          "Nouns ending in -ch, -sh, -ss, -x, -z add -es (watch -> watches, box -> boxes).",
          "Consonant + y changes to -ies (city -> cities); Vowel + y just adds -s (key -> keys).",
          "Memorize irregular plurals: child -> children, man -> men, woman -> women, person -> people, foot -> feet.",
          "Plural nouns always require plural verbs (e.g. 'The books are...')."
        ]
      },
      {
        id: "sec-a1-u2-l1-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº ÙˆØ§Ø­Ø¯ Ø³Û’ Ø¬Ù…Ø¹ Ø¨Ù†Ø§Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Û Ù… Ù„Ù Ø¸ Ú©Û’ Ø¢Ø®Ø± Ù…ÛŒÚº 'ÛŒÚº'، 'ÙˆÚº' ÛŒØ§ 'Û’' Ú©Ø§ Ø§Ø¶Ø§Ù Û  Ú©Ø±ØªÛ’ Û ÛŒÚº (Ø¬ÛŒØ³Û’: Ú©ØªØ§Ø¨ Ø³Û’ Ú©ØªØ§Ø¨ÛŒÚºØŒ Ù„Ú‘Ú©Ø§ Ø³Û’ Ù„Ú‘Ú©Û’)Û”\n\nØ§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ø¨Ú¾ÛŒ Ø§Ú©Ø«Ø± Ø§ÙˆÙ‚Ø§Øª ØµØ±Ù  **-s** ÛŒØ§ **-es** Ù„Ú¯ØªØ§ Û Û’Û” Ù„ÛŒÚ©Ù† Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ú©Ú†Ú¾ Ø§Û Ù… Ø¨Û’ Ù‚Ø§Ø¹Ø¯Û  (Irregular) Ø§Ù„Ù Ø§Ø¸ Û ÛŒÚº Ø¬Ù† Ú©Û’ Ø³Ø§ØªÚ¾ 's' Ù†Û ÛŒÚº Ù„Ú¯ØªØ§ØŒ Ø¨Ù„Ú©Û  Ù¾ÙˆØ±Ø§ Ù„Ù Ø¸ Û ÛŒ Ø¨Ø¯Ù„ Ø¬Ø§ØªØ§ Û Û’ØŒ Ø¬ÛŒØ³Û’ **child** Ø³Û’ **children** Ø§ÙˆØ± **person** Ø³Û’ **people**Û” Ø§Ù† Ø¨Û’ Ù‚Ø§Ø¹Ø¯Û  Ø§Ù„Ù Ø§Ø¸ Ú©Ùˆ Ø®Ø§Øµ Ø·ÙˆØ± Ù¾Ø± ÛŒØ§Ø¯ Ø±Ú©Ú¾Ù†Ø§ Ø¶Ø±ÙˆØ±ÛŒ Û Û’Û”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 2: Indefinite Articles: A vs. An
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u2-l2",
    level: "A1",
    unit: "unit-2",
    order: 2,
    title: "Indefinite Articles: A vs. An",
    description: "Master the rules of sound-based indefinite articles (a vs an) before singular countable nouns.",
    objectives: [
      "Distinguish between consonant sounds and vowel sounds in English pronunciation",
      "Use 'a' before consonant sounds and 'an' before vowel sounds correctly",
      "Identify tricky sound-based words like 'an hour', 'a university', and 'an honest person'"
    ],
    estimatedMinutes: 10,
    prerequisites: ["eng-a1-u2-l1"],
    skillTags: ["articles", "phonetics", "determiners"],
    vocabularyList: [
      { word: "apple", partOfSpeech: "noun", phonetic: "/ËˆÃ¦pl/", definition: "A round fruit with red, green, or yellow skin and firm white flesh.", urduMeaning: "Ø³ÛŒØ¨", exampleSentence: "She eats an apple every afternoon." },
      { word: "orange", partOfSpeech: "noun", phonetic: "/ËˆÉ’rÉªndÊ’/", definition: "A round juicy citrus fruit with a tough bright reddish-yellow rind.", urduMeaning: "Ù…Ø§Ù„Ù¹Ø§ / Ú©Ù†Ùˆ", exampleSentence: "He ordered an orange juice at breakfast." },
      { word: "umbrella", partOfSpeech: "noun", phonetic: "/ÊŒmËˆbrelÉ™/", definition: "A folding canopy supported by ribs, used for protection against rain.", urduMeaning: "Ú†Ú¾ØªØ±ÛŒ", exampleSentence: "Take an umbrella because it might rain." },
      { word: "university", partOfSpeech: "noun", phonetic: "/ËŒjuË nÉªËˆvÉœË sÉ™ti/", definition: "A high-level educational institution offering degrees.", urduMeaning: "ÛŒÙˆÙ†ÛŒÙˆØ±Ø³Ù¹ÛŒ", exampleSentence: "Oxford is a famous ancient university." },
      { word: "hour", partOfSpeech: "noun", phonetic: "/ËˆaÊŠÉ™r/", definition: "A period of time equal to sixty minutes.", urduMeaning: "Ú¯Ú¾Ù†Ù¹Û ", exampleSentence: "The exam lasts for an hour." },
      { word: "honest", partOfSpeech: "adjective", phonetic: "/ËˆÉ’nÉªst/", definition: "Free of deceit; truthful and sincere.", urduMeaning: "Ø§ÛŒÙ…Ø§Ù†Ø¯Ø§Ø±", exampleSentence: "He is an honest police officer." },
      { word: "doctor", partOfSpeech: "noun", phonetic: "/ËˆdÉ’ktÉ™r/", definition: "A qualified medical practitioner.", urduMeaning: "ÚˆØ§Ú©Ù¹Ø±", exampleSentence: "She wants to become a doctor." },
      { word: "student", partOfSpeech: "noun", phonetic: "/ËˆstjuË dÉ™nt/", definition: "A person formally engaged in learning.", urduMeaning: "Ø·Ø§Ù„Ø¨ Ø¹Ù„Ù…", exampleSentence: "Bilal is a bright university student." },
      { word: "car", partOfSpeech: "noun", phonetic: "/kÉ‘Ë r/", definition: "A road vehicle powered by an engine, with four wheels.", urduMeaning: "Ú¯Ø§Ú‘ÛŒ", exampleSentence: "My uncle drives a blue car." },
      { word: "hotel", partOfSpeech: "noun", phonetic: "/hÉ™ÊŠËˆtel/", definition: "An establishment providing accommodation and meals for travelers.", urduMeaning: "Û ÙˆÙ¹Ù„", exampleSentence: "They stayed at a quiet hotel near the lake." }
    ],
    sections: [
      {
        id: "sec-a1-u2-l2-1",
        type: "explain",
        title: "The Sound Rule for A vs. An",
        content: "In English, **a** and **an** are indefinite articles. We use them **only before singular countable nouns** when mentioning something general or for the first time.\n\n### The Cardinal Rule\nThe choice between **a** and **an** is determined by **SOUND**, not by the written letter:\n- Use **a** before a **consonant sound** (e.g. /b/, /d/, /k/, /j/).\n- Use **an** before a **vowel sound** (e.g. /Ã¦/, /e/, /Éª/, /É’/, /ÊŒ/, /aÊŠ/).",
        tables: [
          {
            title: "Sound-Based Comparison",
            headers: ["Article", "Sound Type", "Regular Examples", "Surprising Examples", "Reason"],
            rows: [
              ["A", "Consonant Sound", "a book, a doctor, a car", "a university, a European country", "Begins with the consonant /j/ sound ('yoo-ni-ver-si-ty')."],
              ["An", "Vowel Sound", "an apple, an egg, an island", "an hour, an honest man, an MBA", "'H' is silent (/aÊŠÉ™r/, /ËˆÉ’nÉªst/); 'M' starts with /e/ ('em-bee-ay')."]
            ]
          },
          {
            title: "Summary of Common Trouble Words",
            headers: ["Word", "Spelling Starts With", "Pronunciation Sound", "Correct Article", "Why"],
            rows: [
              ["university", "Vowel (u)", "Consonant /j/", "a university", "Pronounced like 'yoo'."],
              ["umbrella", "Vowel (u)", "Vowel /ÊŒ/", "an umbrella", "Pronounced like 'uh'."],
              ["hour", "Consonant (h)", "Vowel /aÊŠ/", "an hour", "Silent 'h'."],
              ["house", "Consonant (h)", "Consonant /h/", "a house", "Pronounced 'h' sound."]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Say It Out Loud",
            text: "If your tongue or lips catch when saying the word, it's a consonant sound (use 'a'). If your throat is open and vowels flow smoothly, use 'an' to create a smooth bridge."
          },
          {
            type: "warning",
            title: "Never Use with Plural or Uncountable Nouns",
            text: "Never say 'a books' or 'a water'. Articles 'a' and 'an' literally mean 'one'!"
          }
        ]
      },
      {
        id: "sec-a1-u2-l2-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "She bought an umbrella for the rainy season.", phonetic: "/ÊƒiË  bÉ”Ë t É™n ÊŒmËˆbrelÉ™ fÉ”Ë r Ã°É™ ËˆreÉªni ËˆsiË zn/", urdu: "Ø§Ø³ Ù†Û’ Ø¨Ø§Ø±Ø´ Ú©Û’ Ù…ÙˆØ³Ù… Ú©Û’ Ù„ÛŒÛ’ Ø§ÛŒÚ© Ú†Ú¾ØªØ±ÛŒ Ø®Ø±ÛŒØ¯ÛŒÛ”", audioText: "She bought an umbrella for the rainy season." },
          { english: "He waited for an hour at the bus station.", phonetic: "/hiË  ËˆweÉªtÉªd fÉ”Ë r É™n ËˆaÊŠÉ™r Ã¦t Ã°É™ bÊŒs ËˆsteÉªÊƒn/", urdu: "Ø§Ø³ Ù†Û’ Ø¨Ø³ Ø§Ø³Ù¹ÛŒØ´Ù† Ù¾Ø± Ø§ÛŒÚ© Ú¯Ú¾Ù†Ù¹Û  Ø§Ù†ØªØ¸Ø§Ø± Ú©ÛŒØ§Û”", audioText: "He waited for an hour at the bus station." },
          { english: "Lahore is an ancient and vibrant city.", phonetic: "/lÉ™ËˆhÉ”Ë r Éªz É™n ËˆeÉªnÊƒÉ™nt Ã¦nd ËˆvaÉªbrÉ™nt ËˆsÉªti/", urdu: "Ù„Ø§Û ÙˆØ± Ø§ÛŒÚ© Ù‚Ø¯ÛŒÙ… Ø§ÙˆØ± Ø²Ù†Ø¯Û  Ø¯Ù„ Ø´Û Ø± Û Û’Û”", audioText: "Lahore is an ancient and vibrant city." },
          { english: "My brother studies at a university in Islamabad.", phonetic: "/maÉª ËˆbrÊŒÃ°É™r ËˆstÊŒdiz Ã¦t É™ ËŒjuË nÉªËˆvÉœË sÉ™ti Éªn ÉªsËˆlÉ‘Ë mÉ™bÉ‘Ë d/", urdu: "Ù…ÛŒØ±Ø§ Ø¨ÚÚ¾Ø§Ø¦ÛŒ Ø§Ø³Ù„Ø§Ù… Ø¢Ø¨Ø§Ø¯ Ú©ÛŒ Ø§ÛŒÚ© ÛŒÙˆÙ†ÛŒÙˆØ±Ø³Ù¹ÛŒ Ù…ÛŒÚº Ù¾Ú‘Ú¾ØªØ§ Û Û’Û”", audioText: "My brother studies at a university in Islamabad." },
          { english: "She is an honest and hardworking doctor.", phonetic: "/ÊƒiË  Éªz É™n ËˆÉ’nÉªst Ã¦nd ËˆhÉ‘Ë dËŒwÉœË kÉªÅ‹ ËˆdÉ’ktÉ™r/", urdu: "ÙˆÛ  Ø§ÛŒÚ© Ø§ÛŒÙ…Ø§Ù†Ø¯Ø§Ø± Ø§ÙˆØ± Ù…Ø­Ù†ØªÛŒ ÚˆØ§Ú©Ù¹Ø± Û ÛŒÚºÛ”", audioText: "She is an honest and hardworking doctor." },
          { english: "We booked a room at a clean hotel downtown.", phonetic: "/wiË  bÊŠkt É™ ruË m Ã¦t É™ kliË n hÉ™ÊŠËˆtel ËŒdaÊŠnËˆtaÊŠn/", urdu: "Û Ù… Ù†Û’ Ø´Û Ø± Ú©Û’ ÙˆØ³Ø· Ù…ÛŒÚº Ø§ÛŒÚ© ØµØ§Ù  Û ÙˆÙ¹Ù„ Ù…ÛŒÚº Ú©Ù…Ø±Û  Ø¨Ú© Ú©ÛŒØ§Û”", audioText: "We booked a room at a clean hotel downtown." },
          { english: "Would you like an apple or an orange?", phonetic: "/wÊŠd juË  laÉªk É™n ËˆÃ¦pl É”Ë r É™n ËˆÉ’rÉªndÊ’/", urdu: "Ú©ÛŒØ§ Ø¢Ù¾ Ø³ÛŒØ¨ Ù¾Ø³Ù†Ø¯ Ú©Ø±ÛŒÚº Ú¯Û’ ÛŒØ§ Ù…Ø§Ù„Ù¹Ø§ØŸ", audioText: "Would you like an apple or an orange?" },
          { english: "He drives a new car to work every day.", phonetic: "/hiË  draÉªvz É™ njuË  kÉ‘Ë r tuË  wÉœË k Ëˆevri deÉª/", urdu: "ÙˆÛ  Û Ø± Ø±ÙˆØ² Ú©Ø§Ù… Ù¾Ø± Ø§ÛŒÚ© Ù†Ø¦ÛŒ Ú¯Ø§Ú‘ÛŒ Ú†Ù„Ø§ Ú©Ø± Ø¬Ø§ØªØ§ Û Û’Û”", audioText: "He drives a new car to work every day." }
        ]
      },
      {
        id: "sec-a1-u2-l2-3",
        type: "dialogue",
        title: "At the University Information Desk",
        dialogue: [
          { speaker: "Adnan", avatar: "A", english: "Excuse me, is this an information desk?", urdu: "Ù…Ø¹Ø§Ù  Ú©ÛŒØ¬Ø¦Û’ Ú¯Ø§ØŒ Ú©ÛŒØ§ ÛŒÛ  Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ú©ÛŒ Ù…ÛŒØ² Û Û’ØŸ", audioText: "Excuse me, is this an information desk?" },
          { speaker: "Clerk", avatar: "C", english: "Yes, it is! Are you a new university student?", urdu: "Ø¬ÛŒ Û Ø§Úº! Ú©ÛŒØ§ Ø¢Ù¾ ÛŒÙˆÙ†ÛŒÙˆØ±Ø³Ù¹ÛŒ Ú©Û’ Ù†Ø¦Û’ Ø·Ø§Ù„Ø¨ Ø¹Ù„Ù… Û ÛŒÚºØŸ", audioText: "Yes, it is! Are you a new university student?" },
          { speaker: "Adnan", avatar: "A", english: "Yes, I am. I need a campus map and an ID card application.", urdu: "Ø¬ÛŒ Û Ø§ÚºÛ” Ù…Úrandom Û Ù…ÛŒÚº Ú©ÛŒÙ…Ù¾Ø³ Ú©Ø§ Ù†Ù‚Ø´Û  Ø§ÙˆØ± Ø¢Ø¦ÛŒ ÚˆÛŒ Ú©Ø§Ø±Úˆ Ú©ÛŒ Ø¯Ø±Ø®ÙˆØ§Ø³Øª Ú†Ø§Û ÛŒÛ’Û”", audioText: "Yes, I am. I need a campus map and an ID card application." },
          { speaker: "Clerk", avatar: "C", english: "Here is a map. Please wait an hour for your official card.", urdu: "ÛŒÛ  Ø±Û Ø§ Ù†Ù‚Ø´Û Û” Ø¨Ø±Ø§Û  Ú©Ø±Ù… Ø§Ù¾Ù†Û’ Ø³Ø±Ú©Ø§Ø±ÛŒ Ú©Ø§Ø±Úˆ Ú©Û’ Ù„ÛŒÛ’ Ø§ÛŒÚ© Ú¯Ú¾Ù†Ù¹Û  Ø§Ù†ØªØ¸Ø§Ø± Ú©ÛŒØ¬ÛŒÛ’Û”", audioText: "Here is a map. Please wait an hour for your official card." }
        ]
      },
      {
        id: "sec-a1-u2-l2-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u2-l2-1",
            type: "mcq",
            skillTag: "articles",
            prompt: "Choose the correct article: 'She has _____ interview at ten o'clock.'",
            options: [
              { id: "opt-1", text: "the a" },
              { id: "opt-2", text: "a" },
              { id: "opt-3", text: "an" },
              { id: "opt-4", text: "no article" }
            ],
            correctOptionId: "opt-3",
            explanation: "'Interview' begins with the short vowel sound /Éª/, so we use 'an'.",
            urduExplanation: "'interview' Ú©ÛŒ Ø§Ø¨ØªØ¯Ø§ vowel sound (/Éª/) Ø³Û’ Û ÙˆØªÛŒ Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'an' Ø¢Ø¦Û’ Ú¯Ø§Û”"
          },
          {
            id: "ex-a1-u2-l2-2",
            type: "mcq",
            skillTag: "articles",
            prompt: "Which phrase uses 'a' or 'an' correctly?",
            options: [
              { id: "opt-1", text: "an university" },
              { id: "opt-2", text: "a honest person" },
              { id: "opt-3", text: "an house" },
              { id: "opt-4", text: "a university" }
            ],
            correctOptionId: "opt-4",
            explanation: "'University' begins with a consonant /j/ sound ('yoo'), so it correctly takes 'a'.",
            urduExplanation: "'university' Ù…ÛŒÚº Ø´Ø±ÙˆØ¹ Ú©ÛŒ Ø¢ÙˆØ§Ø² 'yoo' (consonant) Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'a university' ØµØ­ÛŒØ­ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l2-3",
            type: "fill_blank",
            skillTag: "articles",
            prompt: "Fill in the blank with 'a' or 'an': 'We arrived half _____ hour ago.'",
            correctAnswer: "an",
            explanation: "'Hour' has a silent 'h' and starts with the vowel diphthong /aÊŠ/, requiring 'an'.",
            urduExplanation: "'hour' Ù…ÛŒÚº 'h' Ø®Ø§Ù…ÙˆØ´ Û Û’ Ø§ÙˆØ± Ø¢ÙˆØ§Ø² vowel Ø³Û’ Ø´Ø±ÙˆØ¹ Û ÙˆØªÛŒ Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'an' Ù„Ú¯ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l2-4",
            type: "fill_blank",
            skillTag: "articles",
            prompt: "Fill in the blank with 'a' or 'an': 'He wants to become _____ pilot.'",
            correctAnswer: "a",
            explanation: "'Pilot' begins with the consonant sound /p/, so we use 'a'.",
            urduExplanation: "'pilot' Ú©Ø§ Ù¾Û Ù„Ø§ Ø­Ø±Ù  consonant sound (/p/) Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'a' Ù„Ú¯ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l2-5",
            type: "order_sentence",
            skillTag: "articles",
            prompt: "Rearrange the words to form a correct sentence:",
            sentenceTokens: ["She", "is", "an", "honest", "student", "."],
            correctOrder: [0, 1, 2, 3, 4, 5],
            explanation: "Subject (She) + verb (is) + article phrase (an honest student).",
            urduExplanation: "Ù Ø§Ø¹Ù„ + Ù Ø¹Ù„ + Ù…Ù Ø¹ÙˆÙ„ Ú©Û’ Ø³Ø§ØªÚ¾ Ø¬Ù…Ù„Û  Ø¨Ù†Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u2-l2-6",
            type: "order_sentence",
            skillTag: "articles",
            prompt: "Rearrange the words to make a correct sentence:",
            sentenceTokens: ["I", "need", "an", "umbrella", "today", "."],
            correctOrder: [0, 1, 2, 3, 4, 5],
            explanation: "Subject (I) + verb (need) + object with article (an umbrella) + time adverb (today).",
            urduExplanation: "Ù Ø§Ø¹Ù„ + Ù Ø¹Ù„ + an umbrella + time Ø¨Ø§Ù„ØªØ±ØªÛŒØ¨ Ø±Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u2-l2-7",
            type: "match_pairs",
            skillTag: "articles",
            prompt: "Match each noun with its correct indefinite article:",
            pairs: [
              { left: "orange", right: "an" },
              { left: "university", right: "a" },
              { left: "hour", right: "an" },
              { left: "doctor", right: "a" }
            ],
            explanation: "Sound rules correctly matched to 'a' or 'an'.",
            urduExplanation: "ØµØ­ÛŒØ­ article Ú©Ùˆ Ù„Ù Ø¸ Ú©Û’ Ø³Ø§ØªÚ¾ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u2-l2-8",
            type: "error_correction",
            skillTag: "articles",
            prompt: "Find and correct the mistake: 'He has an unique talent for painting.'",
            correctAnswer: "He has a unique talent for painting.",
            explanation: "'Unique' begins with the consonant /j/ sound ('yoo-neek'), so it must take 'a', not 'an'.",
            urduExplanation: "'unique' Ú©ÛŒ Ø¢ÙˆØ§Ø² 'yoo' (consonant) Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'a unique' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u2-l2-9",
            type: "error_correction",
            skillTag: "articles",
            prompt: "Find and correct the mistake: 'I am reading a interesting book.'",
            correctAnswer: "I am reading an interesting book.",
            explanation: "'Interesting' begins with the vowel sound /Éª/, requiring 'an'.",
            urduExplanation: "'interesting' vowel sound Ø³Û’ Ø´Ø±ÙˆØ¹ Û ÙˆØªØ§ Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'an interesting' Û ÙˆÚ¯Ø§Û”"
          },
          {
            id: "ex-a1-u2-l2-10",
            type: "true_false",
            skillTag: "articles",
            prompt: "The phrase 'an European country' is grammatically correct. (True or False)",
            correctAnswer: "False",
            explanation: "False. 'European' begins with the consonant /j/ sound ('yoo-ro-pe-an'), so it takes 'a European country'.",
            urduExplanation: "ØºÙ„Ø·Û” 'European' Ú©ÛŒ Ø¢ÙˆØ§Ø² /j/ (yoo) Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'a European' Ø¢ØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u2-l2-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u2-l2-1",
            type: "mcq",
            skillTag: "articles",
            prompt: "Which noun takes 'an' instead of 'a'?",
            options: [
              { id: "opt-1", text: "hospital" },
              { id: "opt-2", text: "hotel" },
              { id: "opt-3", text: "honest person" },
              { id: "opt-4", text: "helicopter" }
            ],
            correctOptionId: "opt-3",
            explanation: "In 'honest person', the 'h' is silent and starts with the vowel sound /É’/, so it takes 'an'.",
            urduExplanation: "'honest' Ù…ÛŒÚº 'h' Ø®Ø§Ù…ÙˆØ´ Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'an' Ù„Ú¯ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u2-l2-2",
            type: "mcq",
            skillTag: "articles",
            prompt: "Complete the sentence: 'She studies at _____ European academy.'",
            options: [
              { id: "opt-1", text: "an" },
              { id: "opt-2", text: "a" },
              { id: "opt-3", text: "any" },
              { id: "opt-4", text: "the a" }
            ],
            correctOptionId: "opt-2",
            explanation: "'European' starts with the consonant /j/ sound ('yoo'), so 'a' is correct.",
            urduExplanation: "'European' Ú©ÛŒ Ø¢ÙˆØ§Ø² 'yoo' Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'a' Ù„Ú¯Û’ Ú¯Ø§Û”"
          },
          {
            id: "qz-a1-u2-l2-3",
            type: "mcq",
            skillTag: "articles",
            prompt: "Why do we say 'an umbrella' but 'a university'?",
            options: [
              { id: "opt-1", text: "Because university is a longer word" },
              { id: "opt-2", text: "Because umbrella is an object and university is a place" },
              { id: "opt-3", text: "Because umbrella starts with a vowel sound /ÊŒ/ and university starts with consonant /j/" },
              { id: "opt-4", text: "Because English grammar allows random choice for words starting with u" }
            ],
            correctOptionId: "opt-3",
            explanation: "The article depends strictly on sound: /ÊŒ/ is a vowel sound, while /j/ is a consonant sound.",
            urduExplanation: "Ú†ÙˆÙ†Ú©Û  umbrella Ú©ÛŒ Ø¢ÙˆØ§Ø² vowel Û Û’ Ø¬Ø¨Ú©Û  university Ú©ÛŒ Ø¢ÙˆØ§Ø² consonant /j/ Û Û’Û”"
          },
          {
            id: "qz-a1-u2-l2-4",
            type: "mcq",
            skillTag: "articles",
            prompt: "Which sentence is completely correct?",
            options: [
              { id: "opt-1", text: "He waited for a hour at the station." },
              { id: "opt-2", text: "He waited for an hour at the station." },
              { id: "opt-3", text: "He waited for hour at the station." },
              { id: "opt-4", text: "He waited for one hours at the station." }
            ],
            correctOptionId: "opt-2",
            explanation: "'An hour' correctly pairs the indefinite article with the silent 'h' noun.",
            urduExplanation: "'An hour' Ø¨Ø§Ù„Ú©Ù„ Ø¯Ø±Ø³Øª Ø¬Ù…Ù„Û  Û Û’Û”"
          },
          {
            id: "qz-a1-u2-l2-5",
            type: "mcq",
            skillTag: "articles",
            prompt: "Which word requires 'an' before it?",
            options: [
              { id: "opt-1", text: "engineer" },
              { id: "opt-2", text: "pilot" },
              { id: "opt-3", text: "lawyer" },
              { id: "opt-4", text: "dentist" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Engineer' begins with the vowel sound /e/, requiring 'an'.",
            urduExplanation: "'engineer' vowel sound Ø³Û’ Ø´Ø±ÙˆØ¹ Û ÙˆØªØ§ Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'an' Ù„Ú¯ØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u2-l2-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Key takeaways regarding indefinite articles:",
        summaryPoints: [
          "Use 'a' and 'an' ONLY with singular countable nouns.",
          "Choose 'a' before consonant SOUNDS (a cat, a doctor, a university).",
          "Choose 'an' before vowel SOUNDS (an apple, an egg, an hour).",
          "Remember silent 'h' words take 'an' (an hour, an honest man).",
          "Remember 'u' words that sound like 'yoo' take 'a' (a university, a unique style)."
        ]
      },
      {
        id: "sec-a1-u2-l2-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ø²Ø¨Ø§Ù† Ù…ÛŒÚº 'a' ÛŒØ§ 'an' Ø¬ÛŒØ³Ø§ Ú©ÙˆØ¦ÛŒ Article Ù†Û ÛŒÚº Û ÙˆØªØ§Û” Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Û Ù… Ø¹Ø§Ù… Ø·ÙˆØ± Ù¾Ø± Ú©Û ØªÛ’ Û ÛŒÚº: 'Ù…ÛŒÚº Ù†Û’ Ø³ÛŒØ¨ Ú©Ú¾Ø§ÛŒØ§' ÛŒØ§ 'ÙˆÛ  ÚˆØ§Ú©Ù¹Ø± Û Û’'Û”\n\nÙ„ÛŒÚ©Ù† Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº ÙˆØ§Ø­Ø¯ Ù‚Ø§Ø¨Ù„Ù  Ú¯Ù†ØªÛŒ Ø§Ø³Ù… (Singular Countable Noun) Ø³Û’ Ù¾Û Ù„Û’ **a** ÛŒØ§ **an** Ù„Ú¯Ø§Ù†Ø§ Ù„Ø§Ø²Ù…ÛŒ Û Û’Û” 'I ate apple' Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ø¨Ù„Ú©Ù„ ØºÙ„Ø· Û Û’ØŒ ØµØ­ÛŒØ­ Ø¬Ù…Ù„Û  **'I ate an apple'** Û ÙˆÚ¯Ø§Û” Ø§Ø³ Ø¨Ø§Øª Ú©Ø§ Ø®Ø§Øµ Ø®ÛŒØ§Ù„ Ø±Ú©Ú¾ÛŒÚº Ú©Û  Ù ÛŒØµÙ„Û  Ø­Ø±Ù  Ú©Û’ Ù„Ú©Ú¾Ù†Û’ Ù¾Ø± Ù†Û ÛŒÚºØŒ Ø¨Ù„Ú©Û  **Ø¨ÙˆÙ„Ù†Û’ Ú©ÛŒ Ø¢ÙˆØ§Ø² (Sound)** Ù¾Ø± Û ÙˆØªØ§ Û Û’Û”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 3: Demonstratives: This, That, These, Those
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u2-l3",
    level: "A1",
    unit: "unit-2",
    order: 3,
    title: "Demonstratives: This, That, These, Those",
    description: "Point to objects near and far in both singular and plural forms with confidence.",
    objectives: [
      "Distinguish between near (this/these) and far (that/those) demonstratives",
      "Correctly match singular (this/that) and plural (these/those) with appropriate nouns and verbs",
      "Form questions and answers pointing to objects in everyday situations"
    ],
    estimatedMinutes: 10,
    prerequisites: ["eng-a1-u2-l2"],
    skillTags: ["demonstratives", "determiners", "grammar-basics"],
    vocabularyList: [
      { word: "this", partOfSpeech: "pronoun", phonetic: "/Ã°Éªs/", definition: "Used to identify a specific person or thing close at hand.", urduMeaning: "ÛŒÛ  (ÙˆØ§Ø­Ø¯ØŒ Ù‚Ø±ÛŒØ¨)", exampleSentence: "This is my English notebook." },
      { word: "that", partOfSpeech: "pronoun", phonetic: "/Ã°Ã¦t/", definition: "Used to identify a specific person or thing at a distance.", urduMeaning: "ÙˆÛ  (ÙˆØ§Ø­Ø¯ØŒ Ø¯ÙˆØ±)", exampleSentence: "That is a very tall building over there." },
      { word: "these", partOfSpeech: "pronoun", phonetic: "/Ã°iË z/", definition: "Plural form of this, referring to items close at hand.", urduMeaning: "ÛŒÛ  (Ø¬Ù…Ø¹ØŒ Ù‚Ø±ÛŒØ¨)", exampleSentence: "These keys belong to my father." },
      { word: "those", partOfSpeech: "pronoun", phonetic: "/Ã°É™ÊŠz/", definition: "Plural form of that, referring to items at a distance.", urduMeaning: "ÙˆÛ  (Ø¬Ù…Ø¹ØŒ Ø¯ÙˆØ±)", exampleSentence: "Those birds are flying south." },
      { word: "here", partOfSpeech: "adverb", phonetic: "/hÉªÉ™r/", definition: "In, at, or to this place or position.", urduMeaning: "ÛŒÛ Ø§Úº", exampleSentence: "Please come and sit here." },
      { word: "there", partOfSpeech: "adverb", phonetic: "/Ã°eÉ™r/", definition: "In, at, or to that place or position.", urduMeaning: "ÙˆÛ Ø§Úº", exampleSentence: "The pharmacy is right over there." },
      { word: "picture", partOfSpeech: "noun", phonetic: "/ËˆpÉªktÊƒÉ™r/", definition: "A painting, drawing, or photograph.", urduMeaning: "ØªØµÙˆÛŒØ±", exampleSentence: "This picture on the wall is very old." },
      { word: "window", partOfSpeech: "noun", phonetic: "/ËˆwÉªndÉ™ÊŠ/", definition: "An opening in a wall fitted with glass.", urduMeaning: "Ú©Ú¾Ú‘Ú©ÛŒ", exampleSentence: "Please close that window; it is windy." },
      { word: "door", partOfSpeech: "noun", phonetic: "/dÉ”Ë r/", definition: "A hinged, sliding, or revolving barrier.", urduMeaning: "Ø¯Ø±ÙˆØ§Ø²Û ", exampleSentence: "Keep these doors unlocked during the day." },
      { word: "computer", partOfSpeech: "noun", phonetic: "/kÉ™mËˆpjuË tÉ™r/", definition: "An electronic device for storing and processing data.", urduMeaning: "Ú©Ù…Ù¾ÛŒÙˆÙ¹Ø±", exampleSentence: "That computer on the back desk is new." }
    ],
    sections: [
      {
        id: "sec-a1-u2-l3-1",
        type: "explain",
        title: "The 2x2 Grid of Demonstratives",
        content: "Demonstratives point to specific things or people. In English, we choose the word based on **two factors**:\n1. **Distance**: Is the item **near** (here) or **far** (there)?\n2. **Number**: Is the item **singular** (one) or **plural** (two or more)?",
        tables: [
          {
            title: "Demonstratives Matrix",
            headers: ["Distance", "Singular (1 item)", "Plural (2+ items)", "Linking Verb"],
            rows: [
              ["Near (Here)", "THIS ('This is a pen')", "THESE ('These are pens')", "This is / These are"],
              ["Far (There)", "THAT ('That is a car')", "THOSE ('Those are cars')", "That is / Those are"]
            ]
          },
          {
            title: "Pronunciation Guide for This vs. These",
            headers: ["Word", "Vowel Sound", "Final Sound", "Urdu Meaning", "Practice Contrast"],
            rows: [
              ["This", "Short /Éª/ (like 'hit')", "Voiceless /s/", "ÛŒÛ  (ÙˆØ§Ø­Ø¯)", "This pen /Ã°Éªs pen/"],
              ["These", "Long /iË / (like 'feet')", "Voiced /z/", "ÛŒÛ  (Ø¬Ù…Ø¹)", "These pens /Ã°iË z penz/"],
              ["That", "Short /Ã¦/ (like 'cat')", "Voiceless /t/", "ÙˆÛ  (ÙˆØ§Ø­Ø¯)", "That car /Ã°Ã¦t kÉ‘Ë r/"],
              ["Those", "Diphthong /É™ÊŠ/", "Voiced /z/", "ÙˆÛ  (Ø¬Ù…Ø¹)", "Those cars /Ã°É™ÊŠz kÉ‘Ë rz/"]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Pronoun vs. Determiner",
            text: "Demonstratives can stand alone as pronouns (**This is great**) or attach to a noun as determiners (**This book is great**)."
          },
          {
            type: "warning",
            title: "Never Mix Singular and Plural",
            text: "Never say 'These book' or 'That books'. Match strictly: 'This book' (singular) and 'These books' (plural)."
          }
        ]
      },
      {
        id: "sec-a1-u2-l3-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "This is my new English dictionary.", phonetic: "/Ã°Éªs Éªz maÉª njuË  ËˆÉªÅ‹É¡lÉªÊƒ ËˆdÉªkÊƒÉ™nri/", urdu: "ÛŒÛ  Ù…ÛŒØ±ÛŒ Ù†Ø¦ÛŒ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ú©ÛŒ Ù„ØºØª Û Û’Û”", audioText: "This is my new English dictionary." },
          { english: "That building across the street is the national library.", phonetic: "/Ã°Ã¦t ËˆbÉªldÉªÅ‹ É™ËˆkrÉ’s Ã°É™ striË t Éªz Ã°É™ ËˆnÃ¦ÊƒnÉ™l ËˆlaÉªbrÉ™ri/", urdu: "Ø³Ú‘Ú© Ú©Û’ Ø§Ù Ø³ Ù¾Ø§Ø± ÙˆÛ  Ø¹Ù…Ø§Ø±Øª Ù‚ÙˆÙ…ÛŒ Ù„Ø§Ø¦Ø¨Ø±ÛŒØ±ÛŒ Û Û’Û”", audioText: "That building across the street is the national library." },
          { english: "These are delicious fresh apples from Swat.", phonetic: "/Ã°iË z É‘Ë r dÉªËˆlÉªÊƒÉ™s freÊƒ ËˆÃ¦plz frÉ™m swÉ‘Ë t/", urdu: "ÛŒÛ  Ø³ÙˆØ§Øª Ú©Û’ Ù„Ø°ÛŒØ° ØªØ§Ø²Û  Ø³ÛŒØ¨ Û ÛŒÚºÛ”", audioText: "These are delicious fresh apples from Swat." },
          { english: "Those students over there are preparing for their exam.", phonetic: "/Ã°É™ÊŠz ËˆstjuË dÉ™nts ËˆÉ™ÊŠvÉ™r Ã°eÉ™r É‘Ë r prÉªËˆpeÉ™rÉªÅ‹ fÉ”Ë r Ã°eÉ™r ÉªÉ¡ËˆzÃ¦m/", urdu: "ÙˆÛ Ø§Úº ÙˆÛ  Ø·Ù„Ø¨Ø§ Ø§Ù¾Ù†Û’ Ø§Ù…ØªØ­Ø§Ù† Ú©ÛŒ ØªÛŒØ§Ø±ÛŒ Ú©Ø± Ø±Û Û’ Û ÛŒÚºÛ”", audioText: "Those students over there are preparing for their exam." },
          { english: "Is this your car key on the counter?", phonetic: "/Éªz Ã°Éªs jÉ”Ë r kÉ‘Ë r kiË  É’n Ã°É™ ËˆkaÊŠntÉ™r/", urdu: "Ú©ÛŒØ§ Ú©Ø§Ø¤Ù†Ù¹Ø± Ù¾Ø± ÛŒÛ  Ø¢Ù¾ Ú©ÛŒ Ú¯Ø§Ú‘ÛŒ Ú©ÛŒ Ú†Ø§Ø¨ÛŒ Û Û’ØŸ", audioText: "Is this your car key on the counter?" },
          { english: "What are those strange lights in the sky?", phonetic: "/wÉ’t É‘Ë r Ã°É™ÊŠz streÉªndÊ’ laÉªts Éªn Ã°É™ skaÉª/", urdu: "Ø¢Ø³Ù…Ø§Ù† Ù…ÛŒÚº ÙˆÛ  Ø¹Ø¬ÛŒØ¨ Ø±ÙˆØ´Ù†ÛŒØ§Úº Ú©ÛŒØ§ Û ÛŒÚºØŸ", audioText: "What are those strange lights in the sky?" },
          { english: "These chairs are very comfortable to sit on.", phonetic: "/Ã°iË z tÊƒeÉ™rz É‘Ë r Ëˆveri ËˆkÊŒmftÉ™bl tuË  sÉªt É’n/", urdu: "ÛŒÛ  Ú©Ø±Ø³ÛŒØ§Úº Ø¨ÛŒÙ¹Ú¾Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Ø¨Û Øª Ø¢Ø±Ø§Ù… Ø¯Û  Û ÛŒÚºÛ”", audioText: "These chairs are very comfortable to sit on." },
          { english: "That was an unforgettable experience for all of us.", phonetic: "/Ã°Ã¦t wÉ’z É™n ËŒÊŒnfÉ™ËˆÉ¡etÉ™bl ÉªkËˆspÉªÉ™riÉ™ns fÉ”Ë r É”Ë l É™v ÊŒs/", urdu: "ÙˆÛ  Û Ù… Ø³Ø¨ Ú©Û’ Ù„ÛŒÛ’ Ø§ÛŒÚ© Ù†Ø§Ù‚Ø§Ø¨Ù„Ù  Ù Ø±Ø§Ù…ÙˆØ´ ØªØ¬Ø±Ø¨Û  ØªÚ¾Ø§Û”", audioText: "That was an unforgettable experience for all of us." }
        ]
      },
      {
        id: "sec-a1-u2-l3-3",
        type: "dialogue",
        title: "Looking at Family Photos",
        dialogue: [
          { speaker: "Farhan", avatar: "F", english: "Who is that man in the black suit in that photo?", urdu: "Ø§Ù Ø³ ØªØµÙˆÛŒØ± Ù…ÛŒÚº Ú©Ø§Ù„Û’ Ø³ÙˆÙ¹ Ù…ÛŒÚº ÙˆÛ  Ø´Ø®Øµ Ú©ÙˆÙ† Û Û’ØŸ", audioText: "Who is that man in the black suit in that photo?" },
          { speaker: "Naveed", avatar: "N", english: "That is my uncle Tariq. And look at this picture here.", urdu: "ÙˆÛ  Ù…ÛŒØ±Û’ Ú†Ú†Ø§ Ø·Ø§Ø±Ù‚ Û ÛŒÚºÛ” Ø§ÙˆØ± ÛŒÛ Ø§Úº ÛŒÛ  ØªØµÙˆÛŒØ± Ø¯ÛŒÚ©Ú¾ÙˆÛ”", audioText: "That is my uncle Tariq. And look at this picture here." },
          { speaker: "Farhan", avatar: "F", english: "Are these your cousins playing cricket?", urdu: "Ú©ÛŒØ§ ÛŒÛ  Ø¢Ù¾ Ú©Û’ Ú©Ø²Ù†Ø² Ú©Ø±Ú©Ù¹ Ú©Ú¾ÛŒÙ„ Ø±Û Û’ Û ÛŒÚºØŸ", audioText: "Are these your cousins playing cricket?" },
          { speaker: "Naveed", avatar: "N", english: "Yes, these are my cousins, and those kids over there are their neighbours.", urdu: "Ø¬ÛŒ Û Ø§ÚºØŒ ÛŒÛ  Ù…ÛŒØ±Û’ Ú©Ø²Ù†Ø² Û ÛŒÚºØŒ Ø§ÙˆØ± ÙˆÛ Ø§Úº Ù¾Ø± ÙˆÛ  Ø¨Ú†Û’ Ø§Ù† Ú©Û’ Û Ù…Ø³Ø§Ø¦Û’ Û ÛŒÚºÛ”", audioText: "Yes, these are my cousins, and those kids over there are their neighbours." }
        ]
      },
      {
        id: "sec-a1-u2-l3-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u2-l3-1",
            type: "mcq",
            skillTag: "demonstratives",
            prompt: "Choose the correct demonstrative for an object in your hand: '_____ is my mobile phone.'",
            options: [
              { id: "opt-1", text: "This" },
              { id: "opt-2", text: "Those" },
              { id: "opt-3", text: "These" },
              { id: "opt-4", text: "That" }
            ],
            correctOptionId: "opt-1",
            explanation: "An object held in your hand is singular and near, requiring 'This'.",
            urduExplanation: "Û Ø§ØªÚ¾ Ù…ÛŒÚº Ù…ÙˆØ¬ÙˆØ¯ ÙˆØ§Ø­Ø¯ Ú†ÛŒØ² Ú©Û’ Ù„ÛŒÛ’ 'This' Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l3-2",
            type: "mcq",
            skillTag: "demonstratives",
            prompt: "Choose the correct demonstrative for plural trees across the road: '_____ trees are very tall.'",
            options: [
              { id: "opt-1", text: "This" },
              { id: "opt-2", text: "Those" },
              { id: "opt-3", text: "These" },
              { id: "opt-4", text: "That" }
            ],
            correctOptionId: "opt-2",
            explanation: "Trees across the road are plural and far, requiring 'Those'.",
            urduExplanation: "Ø¯ÙˆØ± Ú©ÛŒ Ø¬Ù…Ø¹ Ú†ÛŒØ²ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ 'Those' Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l3-3",
            type: "fill_blank",
            skillTag: "demonstratives",
            prompt: "Complete with the correct demonstrative: 'Look at _____ picture here in my hands.'",
            correctAnswer: "this",
            explanation: "The picture is singular and close ('here in my hands'), so 'this' is correct.",
            urduExplanation: "Ù‚Ø±ÛŒØ¨ Ú©ÛŒ ÙˆØ§Ø­Ø¯ Ú†ÛŒØ² Ú©Û’ Ù„ÛŒÛ’ 'this' Ù„Ú¯ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l3-4",
            type: "fill_blank",
            skillTag: "demonstratives",
            prompt: "Complete with the correct demonstrative: '_____ shoes right here fit me perfectly.'",
            correctAnswer: "These",
            explanation: "The shoes are plural and right here (near), so 'These' is correct.",
            urduExplanation: "Ù‚Ø±ÛŒØ¨ Ú©ÛŒ Ø¬Ù…Ø¹ Ú†ÛŒØ²ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ 'These' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l3-5",
            type: "order_sentence",
            skillTag: "demonstratives",
            prompt: "Rearrange the words to form a correct question:",
            sentenceTokens: ["Is", "that", "your", "laptop", "over", "there", "?"],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Verb (Is) + demonstrative (that) + noun phrase (your laptop) + adverbial phrase (over there).",
            urduExplanation: "Ø³ÙˆØ§Ù„ÛŒÛ  ØªØ±ØªÛŒØ¨: Is + that + your laptop + over there?"
          },
          {
            id: "ex-a1-u2-l3-6",
            type: "order_sentence",
            skillTag: "demonstratives",
            prompt: "Rearrange the words to make a correct sentence:",
            sentenceTokens: ["These", "are", "my", "favourite", "books", "."],
            correctOrder: [0, 1, 2, 3, 4, 5],
            explanation: "Demonstrative (These) + verb (are) + complement (my favourite books).",
            urduExplanation: "These + are + my favourite books ØªØ±ØªÛŒØ¨ Ø¨Ù†Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u2-l3-7",
            type: "match_pairs",
            skillTag: "demonstratives",
            prompt: "Match the demonstrative to its location and number category:",
            pairs: [
              { left: "This", right: "Near, Singular" },
              { left: "These", right: "Near, Plural" },
              { left: "That", right: "Far, Singular" },
              { left: "Those", right: "Far, Plural" }
            ],
            explanation: "Matrix categories correctly matched.",
            urduExplanation: "Ù‚Ø±ÛŒØ¨ Ùˆ Ø¯ÙˆØ± Ø§ÙˆØ± ÙˆØ§Ø­Ø¯ Ùˆ Ø¬Ù…Ø¹ Ú©Û’ ØµØ­ÛŒØ­ Ø¬ÙˆÚ‘Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u2-l3-8",
            type: "error_correction",
            skillTag: "demonstratives",
            prompt: "Find and correct the mistake: 'These book is very interesting.'",
            correctAnswer: "This book is very interesting.",
            explanation: "The noun 'book' is singular, so it must take singular 'This', not plural 'These'.",
            urduExplanation: "'book' ÙˆØ§Ø­Ø¯ Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'This book' Ù„Ú©Ú¾Ù†Ø§ Ø¶Ø±ÙˆØ±ÛŒ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l3-9",
            type: "error_correction",
            skillTag: "demonstratives",
            prompt: "Find and correct the mistake: 'Those is a very expensive car.'",
            correctAnswer: "That is a very expensive car.",
            explanation: "'a very expensive car' is singular with verb 'is', so use 'That', not 'Those'.",
            urduExplanation: "ÙˆØ§Ø­Ø¯ Ú¯Ø§Ú‘ÛŒ Ú©Û’ Ù„ÛŒÛ’ 'That is' Ù„Ú¯Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u2-l3-10",
            type: "true_false",
            skillTag: "demonstratives",
            prompt: "'These' is used for items that are far away. (True or False)",
            correctAnswer: "False",
            explanation: "False. 'These' is used for items that are close (near). For far items, we use 'those'.",
            urduExplanation: "ØºÙ„Ø·Û” 'These' Ù‚Ø±ÛŒØ¨ Ú©ÛŒ Ú†ÛŒØ²ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’ØŒ Ø¯ÙˆØ± Ú©Û’ Ù„ÛŒÛ’ 'Those' Ø¢ØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u2-l3-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u2-l3-1",
            type: "mcq",
            skillTag: "demonstratives",
            prompt: "Select the sentence with correct demonstrative agreement:",
            options: [
              { id: "opt-1", text: "These shoes is dirty." },
              { id: "opt-2", text: "That houses are old." },
              { id: "opt-3", text: "These books are helpful." },
              { id: "opt-4", text: "Those window is open." }
            ],
            correctOptionId: "opt-3",
            explanation: "'These books are helpful' matches plural demonstrative 'These' with plural noun 'books' and plural verb 'are'.",
            urduExplanation: "'These books are helpful' Ù…ÛŒÚº demonstrativeØŒ noun Ø§ÙˆØ± verb ØªÛŒÙ†ÙˆÚº Ø¬Ù…Ø¹ Û ÛŒÚºÛ”"
          },
          {
            id: "qz-a1-u2-l3-2",
            type: "mcq",
            skillTag: "demonstratives",
            prompt: "What is the correct question pointing to distant mountains?",
            options: [
              { id: "opt-1", text: "What is this?" },
              { id: "opt-2", text: "What are this?" },
              { id: "opt-3", text: "What are these?" },
              { id: "opt-4", text: "What are those?" }
            ],
            correctOptionId: "opt-4",
            explanation: "Distant mountains are plural and far, so the correct question is 'What are those?'.",
            urduExplanation: "Ø¯ÙˆØ± Ú©Û’ Ù¾Û Ø§Ú‘ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ 'What are those?' Ù¾ÙˆÚ†Ú¾Ø§ Ø¬Ø§Ø¦Û’ Ú¯Ø§Û”"
          },
          {
            id: "qz-a1-u2-l3-3",
            type: "mcq",
            skillTag: "demonstratives",
            prompt: "Complete the sentence: '_____ pen in my pocket belongs to the teacher.'",
            options: [
              { id: "opt-1", text: "This" },
              { id: "opt-2", text: "These" },
              { id: "opt-3", text: "Those" },
              { id: "opt-4", text: "That" }
            ],
            correctOptionId: "opt-1",
            explanation: "The pen is singular and in your own pocket (near), so 'This' is correct.",
            urduExplanation: "Ø¬ÛŒØ¨ Ù…ÛŒÚº Ù…ÙˆØ¬ÙˆØ¯ Ù‚Ø±ÛŒØ¨ Ú©Û’ Ù‚Ù„Ù… Ú©Û’ Ù„ÛŒÛ’ 'This' Ù„Ú¯Û’ Ú¯Ø§Û”"
          },
          {
            id: "qz-a1-u2-l3-4",
            type: "mcq",
            skillTag: "demonstratives",
            prompt: "Which pair shows opposites in distance?",
            options: [
              { id: "opt-1", text: "this - these" },
              { id: "opt-2", text: "this - that" },
              { id: "opt-3", text: "these - those" },
              { id: "opt-4", text: "that - those" }
            ],
            correctOptionId: "opt-2",
            explanation: "'This' (near singular) and 'that' (far singular) contrast in physical distance.",
            urduExplanation: "'this' (Ù‚Ø±ÛŒØ¨) Ø§ÙˆØ± 'that' (Ø¯ÙˆØ±) Ù Ø§ØµÙ„Û’ Ú©Û’ Ù„Ø­Ø§Ø¸ Ø³Û’ Ø§Ù„Ù¹ Û ÛŒÚºÛ”"
          },
          {
            id: "qz-a1-u2-l3-5",
            type: "mcq",
            skillTag: "demonstratives",
            prompt: "Complete: '_____ are the students who won the trophy.'",
            options: [
              { id: "opt-1", text: "That" },
              { id: "opt-2", text: "This" },
              { id: "opt-3", text: "Those" },
              { id: "opt-4", text: "It" }
            ],
            correctOptionId: "opt-3",
            explanation: "With plural verb 'are' and plural noun 'students', use plural demonstrative 'Those'.",
            urduExplanation: "Ø¬Ù…Ø¹ 'are' Ú©Û’ Ø³Ø§ØªÚ¾ 'Those' Ø¯Ø±Ø³Øª Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u2-l3-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Core principles of demonstratives:",
        summaryPoints: [
          "This = Singular, Near (This book here).",
          "That = Singular, Far (That car over there).",
          "These = Plural, Near (These keys in my hand).",
          "Those = Plural, Far (Those birds in the sky).",
          "Singular demonstratives take 'is'; plural demonstratives take 'are'."
        ]
      },
      {
        id: "sec-a1-u2-l3-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Û Ù… Ù‚Ø±ÛŒØ¨ Ú©Û’ Ù„ÛŒÛ’ **'ÛŒÛ '** Ø§ÙˆØ± Ø¯ÙˆØ± Ú©Û’ Ù„ÛŒÛ’ **'ÙˆÛ '** Ø¨ÙˆÙ„ØªÛ’ Û ÛŒÚºÛ” ØºÙˆØ± Ú©Ø±ÛŒÚº Ú©Û  Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº ÙˆØ§Ø­Ø¯ Ø§ÙˆØ± Ø¬Ù…Ø¹ Ú©Û’ Ù„ÛŒÛ’ Ù„Ù Ø¸ Ù†Û ÛŒÚº Ø¨Ø¯Ù„ØªØ§:\n- 'ÛŒÛ  Ú©ØªØ§Ø¨' (ÙˆØ§Ø­Ø¯) -> 'ÛŒÛ  Ú©ØªØ§Ø¨ÛŒÚº' (Ø¬Ù…Ø¹) [Ø¯ÙˆÙ†ÙˆÚº Ù…ÛŒÚº 'ÛŒÛ ' Û ÛŒ Ø±Û ØªØ§ Û Û’]\n- 'ÙˆÛ  Ù„Ú‘Ú©Ø§' (ÙˆØ§Ø­Ø¯) -> 'ÙˆÛ  Ù„Ú‘Ú©Û’' (Ø¬Ù…¹) [Ø¯ÙˆÙ†ÙˆÚº Ù…ÛŒÚº 'ÙˆÛ ' Û ÛŒ Ø±Û ØªØ§ Û Û’]\n\nÙ„ÛŒÚ©Ù† Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº ÙˆØ§Ø­Ø¯ Ø§ÙˆØ± Ø¬Ù…Ø¹ Ú©Û’ Ù„Ù Ø¸ Ø¨Ø§Ù„Ú©Ù„ Ø§Ù„Ú¯ Û ÛŒÚº:\n- Ù‚Ø±ÛŒØ¨: **This** (ÙˆØ§Ø­Ø¯) Ø§ÙˆØ± **These** (Ø¬Ù…¹)\n- Ø¯ÙˆØ±: **That** (ÙˆØ§Ø­Ø¯) Ø§ÙˆØ± **Those** (Ø¬Ù…¹)\nÛŒÛ Ø§Úº Ø§Ø±Ø¯Ùˆ Ø¨ÙˆÙ„Ù†Û’ ÙˆØ§Ù„ÙˆÚº Ø³Û’ Ø§Ú©Ø«Ø± ØºÙ„Ø·ÛŒ Û ÙˆØªÛŒ Û Û’ Ú©Û  ÙˆÛ  'This books' Ú©Û  Ø¯ÛŒØªÛ’ Û ÛŒÚºØŒ Ø¬Ø¨Ú©Û  ØµØ­ÛŒØ­ **'These books'** Û Û’Û”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 4: Classroom & Study Objects
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u2-l4",
    level: "A1",
    unit: "unit-2",
    order: 4,
    title: "Classroom & Study Objects",
    description: "Build essential vocabulary for study tools and master simple prepositions of place.",
    objectives: [
      "Identify common stationery and classroom equipment by name",
      "Ask and answer 'What is this/that?' and 'What are these/those?' fluently",
      "Describe object locations using basic prepositions (on, in, under, next to)"
    ],
    estimatedMinutes: 8,
    prerequisites: ["eng-a1-u2-l3"],
    skillTags: ["vocabulary", "objects", "classroom", "prepositions"],
    vocabularyList: [
      { word: "pencil", partOfSpeech: "noun", phonetic: "/Ëˆpensl/", definition: "An instrument for writing or drawing, consisting of a thin stick of graphite.", urduMeaning: "Ù¾Ù†Ø³Ù„", exampleSentence: "You can write your notes with a pencil." },
      { word: "pen", partOfSpeech: "noun", phonetic: "/pen/", definition: "An instrument for writing or drawing with ink.", urduMeaning: "Ù‚Ù„Ù… / Ù¾ÛŒÙ†", exampleSentence: "Sign the registration form with a blue pen." },
      { word: "notebook", partOfSpeech: "noun", phonetic: "/ËˆnÉ™ÊŠtbÊŠk/", definition: "A book of blank or ruled pages for writing notes.", urduMeaning: "Ú©Ø§Ù¾ÛŒ / Ù†ÙˆÙ¹ Ø¨Ú©", exampleSentence: "Keep your grammar notes in this notebook." },
      { word: "eraser", partOfSpeech: "noun", phonetic: "/ÉªËˆreÉªzÉ™r/", definition: "A piece of rubber used for rubbing out pencil marks.", urduMeaning: "Ø±Ø¨Ú‘ / Ø§Ø±ÛŒØ²Ø±", exampleSentence: "Use an eraser if you make a mistake." },
      { word: "ruler", partOfSpeech: "noun", phonetic: "/ËˆruË lÉ™r/", definition: "A straight strip used to measure distance or draw straight lines.", urduMeaning: "Ù Ù¹Û  / Ù¾ÛŒÙ…Ø§Ù†Û ", exampleSentence: "Draw a straight line with your ruler." },
      { word: "desk", partOfSpeech: "noun", phonetic: "/desk/", definition: "A piece of furniture with a flat surface used for working or studying.", urduMeaning: "ÚˆÛŒØ³Ú© / Ù…ÛŒØ²", exampleSentence: "Every student has their own desk in class." },
      { word: "whiteboard", partOfSpeech: "noun", phonetic: "/ËˆwaÉªtbÉ”Ë d/", definition: "A smooth white surface for writing on with dry-wipe markers.", urduMeaning: "ÙˆØ§Ø¦Ù¹ Ø¨ÙˆØ±Úˆ", exampleSentence: "The teacher wrote the new words on the whiteboard." },
      { word: "backpack", partOfSpeech: "noun", phonetic: "/ËˆbÃ¦kpÃ¦k/", definition: "A bag carried on one's back with two straps.", urduMeaning: "Ø¨Ø³ØªÛ  / Ø¨ÛŒÚ© Ù¾ÛŒÚ©", exampleSentence: "Put your books inside your backpack." },
      { word: "marker", partOfSpeech: "noun", phonetic: "/ËˆmÉ‘Ë kÉ™r/", definition: "A felt-tipped pen used for bold writing or drawing.", urduMeaning: "Ù…Ø§Ø±Ú©Ø±", exampleSentence: "We need a black marker for the whiteboard." },
      { word: "dictionary", partOfSpeech: "noun", phonetic: "/ËˆdÉªkÊƒÉ™nri/", definition: "A reference book listing words and their meanings.", urduMeaning: "Ù„ØºØª / ÚˆÚ©Ø´Ù†Ø±ÛŒ", exampleSentence: "Look up unfamiliar vocabulary in the dictionary." }
    ],
    sections: [
      {
        id: "sec-a1-u2-l4-1",
        type: "explain",
        title: "Study Objects & Locational Phrases",
        content: "To describe your study environment, pair object names with **prepositions of place**:\n- **on**: resting on top of a surface (*on the desk*)\n- **in**: located inside a container (*in the backpack*)\n- **under**: below something (*under the chair*)\n- **next to**: by the side of (*next to the computer*)",
        tables: [
          {
            title: "Common Classroom Objects",
            headers: ["Object", "Article", "Plural Form", "Typical Location", "Urdu Meaning"],
            rows: [
              ["pen", "a pen", "pens", "in the pencil case", "Ù‚Ù„Ù…"],
              ["notebook", "a notebook", "notebooks", "on the desk", "Ú©Ø§Ù¾ÛŒ"],
              ["eraser", "an eraser", "erasers", "next to the ruler", "Ø±Ø¨Ú‘"],
              ["whiteboard", "a whiteboard", "whiteboards", "on the classroom wall", "ÙˆØ§Ø¦Ù¹ Ø¨ÙˆØ±Úˆ"],
              ["dictionary", "a dictionary", "dictionaries", "on the bookshelf", "Ù„ØºØª"]
            ]
          },
          {
            title: "Useful Question & Answer Patterns",
            headers: ["Question", "Expected Answer (Near)", "Expected Answer (Far)", "Urdu Translation"],
            rows: [
              ["What is this/that?", "This is a pen.", "That is a whiteboard.", "ÛŒÛ /ÙˆÛ  Ú©ÛŒØ§ Û Û’ØŸ"],
              ["What are these/those?", "These are markers.", "Those are backpacks.", "ÛŒÛ /ÙˆÛ  Ú©ÛŒØ§ Û ÛŒÚºØŸ"],
              ["Where is the ruler?", "It is on the desk.", "It is under the notebook.", "Ù¾ÛŒÙ…Ø§Ù†Û  Ú©Û Ø§Úº Û Û’ØŸ"]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Question Contractions",
            text: "Native speakers often say **What's this?** and **Where's the pen?** in everyday speech."
          },
          {
            type: "warning",
            title: "Preposition Accuracy",
            text: "Say **on the desk** (surface), not **in the desk** (unless it is inside a drawer)."
          }
        ]
      },
      {
        id: "sec-a1-u2-l4-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "My English notebook is on the wooden desk.", phonetic: "/maÉª ËˆÉªÅ‹É¡lÉªÊƒ ËˆnÉ™ÊŠtbÊŠk Éªz É’n Ã°É™ ËˆwÊŠdn desk/", urdu: "Ù…ÛŒØ±ÛŒ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ú©ÛŒ Ú©Ø§Ù¾ÛŒ Ù„Ú©Ú‘ÛŒ Ú©ÛŒ Ù…ÛŒØ² Ù¾Ø± Û Û’Û”", audioText: "My English notebook is on the wooden desk." },
          { english: "The teacher wrote three sentences on the whiteboard.", phonetic: "/Ã°É™ ËˆtiË tÊƒÉ™r rÉ™ÊŠt Î¸riË  ËˆsentÉ™nsÉªz É’n Ã°É™ ËˆwaÉªtbÉ”Ë d/", urdu: "Ø§Ø³ØªØ§Ø¯ Ù†Û’ ÙˆØ§Ø¦Ù¹ Ø¨ÙˆØ±Úˆ Ù¾Ø± ØªÛŒÙ† Ø¬Ù…Ù„Û’ Ù„Ú©Ú¾Û’Û”", audioText: "The teacher wrote three sentences on the whiteboard." },
          { english: "Can you pass me that blue marker?", phonetic: "/kÃ¦n juË  pÉ‘Ë s miË  Ã°Ã¦t bluË  ËˆmÉ‘Ë kÉ™r/", urdu: "Ú©ÛŒØ§ Ø¢Ù¾ Ù…Ø¬Ú¾Û’ ÙˆÛ  Ù†ÛŒÙ„Ø§ Ù…Ø§Ø±Ú©Ø± Ù¾Ú©Ú‘Ø§ Ø³Ú©ØªÛ’ Û ÛŒÚºØŸ", audioText: "Can you pass me that blue marker?" },
          { english: "His heavy backpack is under the classroom chair.", phonetic: "/hÉªz Ëˆhevi ËˆbÃ¦kpÃ¦k Éªz ËˆÊŒndÉ™r Ã°É™ ËˆklÉ‘Ë sruË m tÊƒeÉ™r/", urdu: "Ø§Ø³ Ú©Ø§ Ø¨Ú¾Ø§Ø±ÛŒ Ø¨Ø³ØªÛ  Ú©Ù„Ø§Ø³ Ú©ÛŒ Ú©Ø±Ø³ÛŒ Ú©Û’ Ù†ÛŒÚ†Û’ Û Û’Û”", audioText: "His heavy backpack is under the classroom chair." },
          { english: "We keep a good bilingual dictionary in our library.", phonetic: "/wiË  kiË p É™ É¡ÊŠd baÉªËˆlÉªÅ‹É¡wÉ™l ËˆdÉªkÊƒÉ™nri Éªn ËˆaÊŠÉ™r ËˆlaÉªbrÉ™ri/", urdu: "Û Ù… Ø§Ù¾Ù†ÛŒ Ù„Ø§Ø¦Ø¨Ø±ÛŒØ±ÛŒ Ù…ÛŒÚº Ø§ÛŒÚ© Ø§Ú†Ú¾ÛŒ Ø¯Ùˆ Ù„Ø³Ø§Ù†ÛŒ Ù„ØºØª Ø±Ú©Ú¾ØªÛ’ Û ÛŒÚºÛ”", audioText: "We keep a good bilingual dictionary in our library." },
          { english: "Draw a straight margin with your ruler and pencil.", phonetic: "/drÉ”Ë  É™ streÉªt ËˆmÉ‘Ë dÊ’Éªn wÉªÃ° jÉ”Ë r ËˆruË lÉ™r Ã¦nd Ëˆpensl/", urdu: "Ø§Ù¾Ù†Û’ Ù¾ÛŒÙ…Ø§Ù†Û’ Ø§ÙˆØ± Ù¾Ù†Ø³Ù„ Ø³Û’ Ø³ÛŒØ¯Ú¾Ø§ Ø­Ø§Ø´ÛŒÛ  Ù„Ú¯Ø§Ø¦ÛŒÚºÛ”", audioText: "Draw a straight margin with your ruler and pencil." },
          { english: "There is an eraser next to the computer keyboard.", phonetic: "/Ã°eÉ™r Éªz É™n ÉªËˆreÉªzÉ™r nekst tuË  Ã°É™ kÉ™mËˆpjuË tÉ™r ËˆkiË bÉ”Ë d/", urdu: "Ú©Ù…Ù¾ÛŒÙˆÙ¹Ø± Ú©ÛŒ Ø¨ÙˆØ±Úˆ Ú©Û’ Ø¨Ø±Ø§Ø¨Ø± Ù…ÛŒÚº Ø§ÛŒÚ© Ø§Ø±ÛŒØ²Ø± Û Û’Û”", audioText: "There is an eraser next to the computer keyboard." },
          { english: "These pens write very smoothly on paper.", phonetic: "/Ã°iË z penz raÉªt Ëˆveri ËˆsmuË Ã°li É’n ËˆpeÉªpÉ™r/", urdu: "ÛŒÛ  Ù‚Ù„Ù… Ú©Ø§ØºØ° Ù¾Ø± Ø¨Û Øª Ø±ÙˆØ§Ù†ÛŒ Ø³Û’ Ù„Ú©Ú¾ØªÛ’ Û ÛŒÚºÛ”", audioText: "These pens write very smoothly on paper." }
        ]
      },
      {
        id: "sec-a1-u2-l4-3",
        type: "dialogue",
        title: "Borrowing Stationery in Class",
        dialogue: [
          { speaker: "Bilal", avatar: "B", english: "Excuse me, Sana, do you have an extra pen?", urdu: "Ù…Ø¹Ø§Ù  Ú©ÛŒØ¬Ø¦Û’ Ú¯Ø§ Ø«Ù†Ø§ØŒ Ú©ÛŒØ§ Ø¢Ù¾ Ú©Û’ Ù¾Ø§Ø³ Ø§Ø¶Ø§Ù ÛŒ Ù¾ÛŒÙ† Û Û’ØŸ", audioText: "Excuse me, Sana, do you have an extra pen?" },
          { speaker: "Sana", avatar: "S", english: "Yes, I do. There are two pens in my pencil case.", urdu: "Ø¬ÛŒ Û Ø§Úº! Ù…ÛŒØ±Û’ Ù¾Ù†Ø³Ù„ Ø¨Ø§Ú©Ø³ Ù…ÛŒÚº Ø¯Ùˆ Ù‚Ù„Ù… Û ÛŒÚºÛ”", audioText: "Yes, I do. There are two pens in my pencil case." },
          { speaker: "Bilal", avatar: "B", english: "Can I borrow this blue one, please?", urdu: "Ú©ÛŒØ§ Ù…ÛŒÚº ÛŒÛ  Ù†ÛŒÙ„Ø§ Ù‚Ù„Ù… Ø§Ø¯Ú¾Ø§Ø± Ù„Û’ Ø³Ú©ØªØ§ Û ÙˆÚºØŸ", audioText: "Can I borrow this blue one, please?" },
          { speaker: "Sana", avatar: "S", english: "Sure, here you go. And here is an eraser too if you need it.", urdu: "Ø¨Ø§Ù„Ú©Ù„ØŒ ÛŒÛ  Ù„ÛŒÚºÛ” Ø§ÙˆØ± Ø§Ú¯Ø± Ø¶Ø±ÙˆØ±Øª Û Ùˆ ØªÙˆ ÛŒÛ  Ø§Ø±ÛŒØ²Ø± Ø¨Ú¾ÛŒ Û Û’Û”", audioText: "Sure, here you go. And here is an eraser too if you need it." }
        ]
      },
      {
        id: "sec-a1-u2-l4-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u2-l4-1",
            type: "mcq",
            skillTag: "objects",
            prompt: "What study object is used to rub out pencil mistakes?",
            options: [
              { id: "opt-1", text: "a ruler" },
              { id: "opt-2", text: "a whiteboard" },
              { id: "opt-3", text: "an eraser" },
              { id: "opt-4", text: "a marker" }
            ],
            correctOptionId: "opt-3",
            explanation: "An eraser (rubber) is specifically used to remove pencil marks.",
            urduExplanation: "Ù¾Ù†Ø³Ù„ Ú©ÛŒ ØºÙ„Ø·ÛŒØ§Úº Ù…Ù¹Ø§Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ 'eraser' Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l4-2",
            type: "mcq",
            skillTag: "prepositions",
            prompt: "Choose the correct preposition: 'The dictionary is _____ the study desk.'",
            options: [
              { id: "opt-1", text: "between" },
              { id: "opt-2", text: "into" },
              { id: "opt-3", text: "at" },
              { id: "opt-4", text: "on" }
            ],
            correctOptionId: "opt-4",
            explanation: "Objects rest on the flat top surface of furniture, so 'on the desk' is correct.",
            urduExplanation: "Ù…ÛŒØ² Ú©ÛŒ Ø³Ø·Ø­ Ù¾Ø± Ú©ÙˆØ¦ÛŒ Ú†ÛŒØ² Û Ùˆ ØªÙˆ 'on' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l4-3",
            type: "fill_blank",
            skillTag: "objects",
            prompt: "Fill in the blank with the correct study tool: 'Draw a straight line with a _____.'",
            correctAnswer: "ruler",
            explanation: "A ruler is the tool used for measuring and drawing straight lines.",
            urduExplanation: "Ø³ÛŒØ¯Ú¾ÛŒ Ù„Ø§Ø¦Ù† Ú©Ú¾ÛŒÙ†Ú†Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ 'ruler' (Ù¾ÛŒÙ…Ø§Ù†Û ) Ú†Ø§Û ÛŒÛ’ Û ÙˆØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l4-4",
            type: "fill_blank",
            skillTag: "objects",
            prompt: "Fill in the blank: 'Put your notebooks inside your _____.'",
            correctAnswer: "backpack",
            explanation: "A backpack is the bag used by students to carry books and study items.",
            urduExplanation: "Ú©ØªØ§Ø¨ÛŒÚº Ø¨Ø³ØªÛ’ (backpack) Ù…ÛŒÚº Ø±Ú©Ú¾ÛŒ Ø¬Ø§ØªÛŒ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u2-l4-5",
            type: "order_sentence",
            skillTag: "objects",
            prompt: "Rearrange the words to form a correct statement:",
            sentenceTokens: ["The", "marker", "is", "next", "to", "the", "notebook", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
            explanation: "Subject (The marker) + verb (is) + prepositional phrase (next to the notebook).",
            urduExplanation: "The marker is next to the notebook."
          },
          {
            id: "ex-a1-u2-l4-6",
            type: "order_sentence",
            skillTag: "objects",
            prompt: "Rearrange the words to form a correct question:",
            sentenceTokens: ["Where", "is", "my", "English", "dictionary", "?"],
            correctOrder: [0, 1, 2, 3, 4, 5],
            explanation: "Question word (Where) + verb (is) + subject (my English dictionary).",
            urduExplanation: "Where is my English dictionary?"
          },
          {
            id: "ex-a1-u2-l4-7",
            type: "match_pairs",
            skillTag: "objects",
            prompt: "Match the study object to its primary function:",
            pairs: [
              { left: "whiteboard", right: "Writing notes for the whole class" },
              { left: "dictionary", right: "Looking up definitions of words" },
              { left: "pencil", right: "Writing and drawing erasable text" },
              { left: "backpack", right: "Carrying school books and materials" }
            ],
            explanation: "Functions accurately paired with study tools.",
            urduExplanation: "Ø§Ø´ÛŒØ§ Ú©Ùˆ Ø§Ù† Ú©Û’ Ú©Ø§Ù…ÙˆÚº Ø³Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u2-l4-8",
            type: "error_correction",
            skillTag: "prepositions",
            prompt: "Find and correct the mistake: 'My pen is in the desk surface.'",
            correctAnswer: "My pen is on the desk surface.",
            explanation: "Objects sit 'on' a surface, not 'in' it.",
            urduExplanation: "Ø³Ø·Ø­ Ú©Û’ Ù„ÛŒÛ’ 'on' Ù„Ú©Ú¾Ø§ Ø¬Ø§ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l4-9",
            type: "error_correction",
            skillTag: "objects",
            prompt: "Find and correct the mistake: 'The teacher writes on the chalkboard with marker.'",
            correctAnswer: "The teacher writes on the whiteboard with a marker.",
            explanation: "Dry-erase markers are used on a whiteboard, and singular countable 'marker' needs article 'a'.",
            urduExplanation: "Ù…Ø§Ø±Ú©Ø± ÙˆØ§Ø¦Ù¹ Ø¨ÙˆØ±Úˆ Ù¾Ø± Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l4-10",
            type: "true_false",
            skillTag: "objects",
            prompt: "A notebook is used to rub out pen ink. (True or False)",
            correctAnswer: "False",
            explanation: "False. A notebook is for writing notes; an eraser is for rubbing out pencil marks.",
            urduExplanation: "ØºÙ„Ø·Û” Ù†ÙˆÙ¹ Ø¨Ú© Ù„Ú©Ú¾Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Û ÙˆØªÛŒ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u2-l4-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u2-l4-1",
            type: "mcq",
            skillTag: "objects",
            prompt: "Where do students typically carry their books to school?",
            options: [
              { id: "opt-1", text: "In a drawer" },
              { id: "opt-2", text: "In an envelope" },
              { id: "opt-3", text: "In a pocket" },
              { id: "opt-4", text: "In a backpack" }
            ],
            correctOptionId: "opt-4",
            explanation: "Students use a backpack to carry textbooks and notebooks comfortably.",
            urduExplanation: "Ø·Ù„Ø¨Ø§ Ú©ØªØ§Ø¨ÛŒÚº Ø¨Ø³ØªÛ’ (backpack) Ù…ÛŒÚº Ù„Û’ Ú©Ø± Ø¬Ø§ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "qz-a1-u2-l4-2",
            type: "mcq",
            skillTag: "prepositions",
            prompt: "Choose the preposition: 'The cat is sleeping _____ the table on the rug.'",
            options: [
              { id: "opt-1", text: "under" },
              { id: "opt-2", text: "between" },
              { id: "opt-3", text: "on" },
              { id: "opt-4", text: "into" }
            ],
            correctOptionId: "opt-1",
            explanation: "Below the table resting on the floor is 'under the table'.",
            urduExplanation: "Ù…ÛŒØ² Ú©Û’ Ù†ÛŒÚ†Û’ Ú©Û’ Ù„ÛŒÛ’ 'under' Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u2-l4-3",
            type: "mcq",
            skillTag: "objects",
            prompt: "Which pair of tools is best for drawing a measured rectangle?",
            options: [
              { id: "opt-1", text: "whiteboard and marker" },
              { id: "opt-2", text: "ruler and pencil" },
              { id: "opt-3", text: "dictionary and pen" },
              { id: "opt-4", text: "desk and chair" }
            ],
            correctOptionId: "opt-2",
            explanation: "A ruler measures straight lines and a pencil draws them accurately.",
            urduExplanation: "Ù¾ÛŒÙ…Ø§Ù†Û  (ruler) Ø§ÙˆØ± Ù¾Ù†Ø³Ù„ (pencil) Ù†Ø§Ù¾ Ú©Ø± Ù„Ø§Ø¦Ù†ÛŒÚº Ú©Ú¾ÛŒÙ†Ú†Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Ø¶Ø±ÙˆØ±ÛŒ Û ÛŒÚºÛ”"
          },
          {
            id: "qz-a1-u2-l4-4",
            type: "mcq",
            skillTag: "objects",
            prompt: "What is written on the wall at the front of a modern classroom?",
            options: [
              { id: "opt-1", text: "The whiteboard" },
              { id: "opt-2", text: "The desk" },
              { id: "opt-3", text: "The backpack" },
              { id: "opt-4", text: "The eraser" }
            ],
            correctOptionId: "opt-1",
            explanation: "The whiteboard hangs at the front of the classroom for instructional notes.",
            urduExplanation: "Ú©Ù„Ø§Ø³ Ú©Û’ Ø³Ø§Ù…Ù†Û’ ÙˆØ§Ø¦Ù¹ Ø¨ÙˆØ±Úˆ Û ÙˆØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u2-l4-5",
            type: "mcq",
            skillTag: "prepositions",
            prompt: "Complete the sentence: 'Keep these pens _____ your pencil case.'",
            options: [
              { id: "opt-1", text: "on" },
              { id: "opt-2", text: "at" },
              { id: "opt-3", text: "under" },
              { id: "opt-4", text: "in" }
            ],
            correctOptionId: "opt-4",
            explanation: "To place something inside an enclosed holder, use the preposition 'in'.",
            urduExplanation: "Ú©Ø³ÛŒ ÚˆØ¨Û’ ÛŒØ§ Ú©ÛŒØ³ Ú©Û’ Ø§Ù†Ø¯Ø± Ú©Û’ Ù„ÛŒÛ’ 'in' Ø¢ØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u2-l4-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Everyday classroom English takeaways:",
        summaryPoints: [
          "Master common study items: pen, pencil, notebook, eraser, ruler, whiteboard, backpack.",
          "Use 'on' for flat surfaces (on the desk, on the whiteboard).",
          "Use 'in' for containers (in the bag, in the pencil case).",
          "Use 'under' for below an object (under the chair).",
          "Ask 'What is this/that?' for singular items and 'What are these/those?' for plurals."
        ]
      },
      {
        id: "sec-a1-u2-l4-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Û Ù… Ù„Ù Ø¸ Ú©Û’ **Ø¨Ø¹Ø¯** Ø­Ø±Ù Ù  Ø±Ø¨Ø· Ù„Ú¯Ø§ØªÛ’ Û ÛŒÚº (Postpositions)ØŒ Ø¬ÛŒØ³Û’: 'Ù…ÛŒØ² **Ù¾Ø±**'، 'Ø¨Ø³ØªÛ’ **Ù…ÛŒÚº**'ØŒ 'Ú©Ø±Ø³ÛŒ Ú©Û’ **Ù†ÛŒÚ†Û’**'Û”\n\nÙ„ÛŒÚ©Ù† Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº ÛŒÛ  Ø§Ù„Ù Ø§Ø¸ Ù„Ù Ø¸ Ø³Û’ **Ù¾Û Ù„Û’** Ø¢ØªÛ’ Û ÛŒÚº (Prepositions)ØŒ Ø¬ÛŒØ³Û’: **on** the desk, **in** the bag, **under** the chairÛ” ØªØ±ØªÛŒØ¨ Ú©Ø§ ÛŒÛ  Ù Ø±Ù‚ ÛŒØ§Ø¯ Ø±Ú©Ú¾Ù†Ø§ Ø¨Û Øª Ø§Û Ù… Û Û’Û”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 5: Colours & Common Sizes
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u2-l5",
    level: "A1",
    unit: "unit-2",
    order: 5,
    title: "Colours & Common Sizes",
    description: "Describe everyday items by colour, size, and appearance with accurate English adjectives.",
    objectives: [
      "Name primary and common secondary colours fluently",
      "Use basic size adjectives (big, small, heavy, light, long, short)",
      "Apply the crucial rule of English adjective word order: Adjective before Noun (never inflected for plural)"
    ],
    estimatedMinutes: 10,
    prerequisites: ["eng-a1-u2-l4"],
    skillTags: ["adjectives", "colors", "descriptive-grammar"],
    vocabularyList: [
      { word: "red", partOfSpeech: "adjective", phonetic: "/red/", definition: "Of a colour at the end of the visible spectrum, like blood or a ripe ruby.", urduMeaning: "Ø³Ø±Ø® / Ù„Ø§Ù„", exampleSentence: "She bought a bright red coat." },
      { word: "blue", partOfSpeech: "adjective", phonetic: "/bluË /", definition: "Of a colour intermediate between green and violet, like a clear sky.", urduMeaning: "Ù†ÛŒÙ„Ø§", exampleSentence: "The sky is clear and blue today." },
      { word: "green", partOfSpeech: "adjective", phonetic: "/É¡riË n/", definition: "Of the colour between blue and yellow, like fresh grass or emeralds.", urduMeaning: "Ø³Ø¨Ø²", exampleSentence: "Pakistan's national flag is green and white." },
      { word: "yellow", partOfSpeech: "adjective", phonetic: "/ËˆjelÉ™ÊŠ/", definition: "Of the colour between green and orange, like ripe lemons.", urduMeaning: "Ù¾ÛŒÙ„Ø§", exampleSentence: "He highlighted the rule with a yellow marker." },
      { word: "black", partOfSpeech: "adjective", phonetic: "/blÃ¦k/", definition: "Of the very darkest colour owing to the absence of light.", urduMeaning: "Ú©Ø§Ù„Ø§ / Ø³ÛŒØ§Û ", exampleSentence: "He wore smart black shoes to the interview." },
      { word: "white", partOfSpeech: "adjective", phonetic: "/waÉªt/", definition: "Of the colour of milk or fresh snow.", urduMeaning: "Ø³Ù ÛŒØ¯", exampleSentence: "The classroom has clean white walls." },
      { word: "big", partOfSpeech: "adjective", phonetic: "/bÉªÉ¡/", definition: "Of considerable size or extent; large.", urduMeaning: "Ø¨Ú‘Ø§", exampleSentence: "They live in a big house with a garden." },
      { word: "small", partOfSpeech: "adjective", phonetic: "/smÉ”Ë l/", definition: "Of a size that is less than normal or usual.", urduMeaning: "Ú†Ú¾ÙˆÙ¹Ø§", exampleSentence: "He lives in a small apartment." },
      { word: "heavy", partOfSpeech: "adjective", phonetic: "/Ëˆhevi/", definition: "Of great weight; difficult to lift or move.", urduMeaning: "Ø¨Ú¾Ø§Ø±ÛŒ / ÙˆØ²Ù†ÛŒ", exampleSentence: "This suitcase is too heavy for one person." },
      { word: "light", partOfSpeech: "adjective", phonetic: "/laÉªt/", definition: "Of little weight; not heavy.", urduMeaning: "Û Ù„Ú©Ø§", exampleSentence: "Modern laptops are very light to carry." }
    ],
    sections: [
      {
        id: "sec-a1-u2-l5-1",
        type: "explain",
        title: "Position and Invariance of English Adjectives",
        content: "An **adjective** describes a noun. In English, adjectives follow two vital structural rules:\n\n### 1. Position Before Noun or After 'To Be'\n- **Before the noun**: *a red car*, *a big room*, *heavy boxes*.\n- **After 'to be'**: *The car is red*, *The room is big*, *The boxes are heavy*.\n\n### 2. English Adjectives NEVER Have Plural Forms\nUnlike many languages, English adjectives never change for plural nouns! You say **big houses**, NEVER *'bigs houses'*.",
        tables: [
          {
            title: "Colour & Size Pairs",
            headers: ["Adjective", "Opposite", "Sample Phrase (Singular)", "Sample Phrase (Plural)", "Urdu Meaning"],
            rows: [
              ["big", "small", "a big city", "big cities (no -s on big!)", "Ø¨Ú‘Ø§ / Ú†Ú¾ÙˆÙ¹Ø§"],
              ["heavy", "light", "a heavy bag", "heavy bags", "Ø¨Ú¾Ø§Ø±ÛŒ / Û Ù„Ú©Ø§"],
              ["black", "white", "a black pen", "black pens", "Ú©Ø§Ù„Ø§ / Ø³Ù ÛŒØ¯"],
              ["long", "short", "a long ruler", "long rulers", "Ù„Ù…Ø¨Ø§ / Ú†Ú¾ÙˆÙ¹Ø§"]
            ]
          },
          {
            title: "Two Syntactic Positions",
            headers: ["Structure Pattern", "Formula", "Example Sentence", "Urdu Translation"],
            rows: [
              ["Attributive (Before Noun)", "Article + Adjective + Noun", "She has a blue backpack.", "Ø§Ø³ Ú©Û’ Ù¾Ø§Ø³ Ù†ÛŒÙ„Ø§ Ø¨Ø³ØªÛ  Û Û’Û”"],
              ["Predicative (After Verb)", "Subject + To Be + Adjective", "Her backpack is blue.", "Ø§Ø³ Ú©Ø§ Ø¨Ø³ØªÛ  Ù†ÛŒÙ„Ø§ Û Û’Û”"]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Size Before Colour",
            text: "When using both size and colour together, size normally comes first: **a big red ball**, **a small green apple**."
          },
          {
            type: "warning",
            title: "No Plural Suffix on Adjectives",
            text: "Remember: nouns can be plural (*books*), but adjectives never can (*red books*, never *reds books*)."
          }
        ]
      },
      {
        id: "sec-a1-u2-l5-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "She bought a big blue umbrella for the walk.", phonetic: "/ÊƒiË  bÉ”Ë t É™ bÉªÉ¡ bluË  ÊŒmËˆbrelÉ™ fÉ”Ë r Ã°É™ wÉ”Ë k/", urdu: "Ø§Ø³ Ù†Û’ Ø³ÛŒØ± Ú©Û’ Ù„ÛŒÛ’ Ø§ÛŒÚ© Ø¨Ú‘ÛŒ Ù†ÛŒÙ„ÛŒ Ú†Ú¾ØªØ±ÛŒ Ø®Ø±ÛŒØ¯ÛŒÛ”", audioText: "She bought a big blue umbrella for the walk." },
          { english: "The national flag of Pakistan has a green background.", phonetic: "/Ã°É™ ËˆnÃ¦ÊƒnÉ™l flÃ¦É¡ É™v ËŒpÉ‘Ë kÉªËˆstÉ‘Ë n hÃ¦z É™ É¡riË n ËˆbÃ¦kÉ¡raÊŠnd/", urdu: "Ù¾Ø§Ú©Ø³ØªØ§Ù† Ú©Û’ Ù‚ÙˆÙ…ÛŒ Ù¾Ø±Ú†Ù… Ú©Ø§ Ù¾Ø³ Ù…Ù†Ø¸Ø± Ø³Ø¨Ø² Û Û’Û”", audioText: "The national flag of Pakistan has a green background." },
          { english: "These two heavy boxes contain new dictionaries.", phonetic: "/Ã°iË z tuË  Ëˆhevi ËˆbÉ’ksÉªz kÉ™nËˆteÉªn njuË  ËˆdÉªkÊƒÉ™nriz/", urdu: "Ø§Ù† Ø¯Ùˆ Ø¨Ú¾Ø§Ø±ÛŒ ÚˆØ¨ÙˆÚº Ù…ÛŒÚº Ù†Ø¦ÛŒ Ù„ØºØ§Øª Û ÛŒÚºÛ”", audioText: "These two heavy boxes contain new dictionaries." },
          { english: "His new mobile phone is remarkably light and fast.", phonetic: "/hÉªz njuË  ËˆmÉ™ÊŠbaÉªl fÉ™ÊŠn Éªz rÉªËˆmÉ‘Ë kÉ™bli laÉªt Ã¦nd fÉ‘Ë st/", urdu: "Ø§Ø³ Ú©Ø§ Ù†ÛŒØ§ Ù…ÙˆØ¨Ø§Ø¦Ù„ Ù ÙˆÙ† ØºÛŒØ± Ù…Ø¹Ù…ÙˆÙ„ÛŒ Ø·ÙˆØ± Ù¾Ø± Û Ù„Ú©Ø§ Ø§ÙˆØ± ØªÛŒØ² Û Û’Û”", audioText: "His new mobile phone is remarkably light and fast." },
          { english: "She wears a smart black coat in winter.", phonetic: "/ÊƒiË  weÉ™rz É™ smÉ‘Ë t blÃ¦k kÉ™ÊŠt Éªn ËˆwÉªntÉ™r/", urdu: "ÙˆÛ  Ø³Ø±Ø¯ÛŒÙˆÚº Ù…ÛŒÚº Ø§ÛŒÚ© Ø´Ø§Ù†Ø¯Ø§Ø± Ú©Ø§Ù„Ø§ Ú©ÙˆÙ¹ Ù¾Û Ù†ØªÛŒ Û Û’Û”", audioText: "She wears a smart black coat in winter." },
          { english: "The children play with a small yellow tennis ball.", phonetic: "/Ã°É™ ËˆtÊƒÉªldrÉ™n pleÉª wÉªÃ° É™ smÉ”Ë l ËˆjelÉ™ÊŠ ËˆtenÉªs bÉ”Ë l/", urdu: "Ø¨Ú†Û’ Ø§ÛŒÚ© Ú†Ú¾ÙˆÙ¹ÛŒ Ù¾ÛŒÙ„ÛŒ Ù¹ÛŒÙ†Ø³ Ø¨Ø§Ù„ Ø³Û’ Ú©Ú¾ÛŒÙ„ØªÛ’ Û ÛŒÚºÛ”", audioText: "The children play with a small yellow tennis ball." },
          { english: "Lahore has many beautiful green parks.", phonetic: "/lÉ™ËˆhÉ”Ë r hÃ¦z Ëˆmeni ËˆbjuË tÉªfl É¡riË n pÉ‘Ë ks/", urdu: "Ù„Ø§Û ÙˆØ± Ù…ÛŒÚº Ú©Ø¦ÛŒ Ø®ÙˆØ¨ØµÙˆØ±Øª Ø³Ø¨Ø² Ù¾Ø§Ø±Ú© Û ÛŒÚºÛ”", audioText: "Lahore has many beautiful green parks." },
          { english: "Are those white sneakers easy to keep clean?", phonetic: "/É‘Ë r Ã°É™ÊŠz waÉªt ËˆsniË kÉ™rz ËˆiË zi tuË  kiË p kliË n/", urdu: "Ú©ÛŒØ§ ÙˆÛ  Ø³Ù ÛŒØ¯ Ø¬ÙˆØªÛ’ ØµØ§Ù  Ø±Ú©Ú¾Ù†Ø§ Ø¢Ø³Ø§Ù† Û Û’ØŸ", audioText: "Are those white sneakers easy to keep clean?" }
        ]
      },
      {
        id: "sec-a1-u2-l5-3",
        type: "dialogue",
        title: "Choosing a Backpack at the Store",
        dialogue: [
          { speaker: "Customer", avatar: "C", english: "Hello! I am looking for a backpack for university.", urdu: "Û ÛŒÙ„Ùˆ! Ù…ÛŒÚº ÛŒÙˆÙ†ÛŒÙˆØ±Ø³Ù¹ÛŒ Ú©Û’ Ù„ÛŒÛ’ Ø§ÛŒÚ© Ø¨Ø³ØªÛ  ØªÙ„Ø§Ø´ Ú©Ø± Ø±Û Ø§ Û ÙˆÚºÛ”", audioText: "Hello! I am looking for a backpack for university." },
          { speaker: "Shopkeeper", avatar: "S", english: "Do you prefer a big backpack or a light, compact one?", urdu: "Ú©ÛŒØ§ Ø¢Ù¾ Ø¨Ú‘Ø§ Ø¨Ø³ØªÛ  Ù¾Ø³Ù†Ø¯ Ú©Ø±ÛŒÚº Ú¯Û’ ÛŒØ§ Û Ù„Ú©Ø§ Ø§ÙˆØ± Ú†Ú¾ÙˆÙ¹Ø§ØŸ", audioText: "Do you prefer a big backpack or a light, compact one?" },
          { speaker: "Customer", avatar: "C", english: "I need a light one. What colours do you have?", urdu: "Ù…Ø¬Ú¾Û’ Û Ù„Ú©Ø§ Ú†Ø§Û ÛŒÛ’Û” Ø¢Ù¾ Ú©Û’ Ù¾Ø§Ø³ Ú©ÙˆÙ† Ø³Û’ Ø±Ù†Ú¯ Û ÛŒÚºØŸ", audioText: "I need a light one. What colours do you have?" },
          { speaker: "Shopkeeper", avatar: "S", english: "We have black, dark blue, and olive green.", urdu: "Û Ù…Ø§Ø±Û’ Ù¾Ø§Ø³ Ú©Ø§Ù„Ø§ØŒ Ú¯Û Ø±Ø§ Ù†ÛŒÙ„Ø§ Ø§ÙˆØ± Ø²ÛŒØªÙˆÙ†ÛŒ Ø³Ø¨Ø² Ø±Ù†Ú¯ Û Û’Û”", audioText: "We have black, dark blue, and olive green." }
        ]
      },
      {
        id: "sec-a1-u2-l5-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u2-l5-1",
            type: "mcq",
            skillTag: "adjectives",
            prompt: "Choose the correct phrase describing several large buildings:",
            options: [
              { id: "opt-1", text: "big buildings" },
              { id: "opt-2", text: "bigs buildings" },
              { id: "opt-3", text: "buildings big" },
              { id: "opt-4", text: "building bigs" }
            ],
            correctOptionId: "opt-1",
            explanation: "Adjectives come before the noun and NEVER take an '-s' for plural.",
            urduExplanation: "ØµÙ Øª (adjective) Ø§Ø³Ù… Ø³Û’ Ù¾Û Ù„Û’ Ø¢ØªÛŒ Û Û’ Ø§ÙˆØ± Ø§Ø³ Ù¾Ø± 's' Ù†Û ÛŒÚº Ù„Ú¯ØªØ§Û”"
          },
          {
            id: "ex-a1-u2-l5-2",
            type: "mcq",
            skillTag: "adjectives",
            prompt: "What is the natural order when combining size and colour?",
            options: [
              { id: "opt-1", text: "a red big apple" },
              { id: "opt-2", text: "a big red apple" },
              { id: "opt-3", text: "an apple big red" },
              { id: "opt-4", text: "an red big apple" }
            ],
            correctOptionId: "opt-2",
            explanation: "Size normally precedes colour in English: 'a big red apple'.",
            urduExplanation: "Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ø¬Ø³Ø§Ù…Øª (Size) Ø¹Ø§Ù… Ø·ÙˆØ± Ù¾Ø± Ø±Ù†Ú¯ (Colour) Ø³Û’ Ù¾Û Ù„Û’ Ø¢ØªÛŒ Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l5-3",
            type: "fill_blank",
            skillTag: "colors",
            prompt: "Complete the sentence with the opposite colour: 'The board is white, but the ink is _____.'",
            correctAnswer: "black",
            explanation: "'Black' is the traditional opposite colour to white for marker text.",
            urduExplanation: "white Ú©Ø§ Ù…Ø®Ø§Ù„Ù  black Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l5-4",
            type: "fill_blank",
            skillTag: "adjectives",
            prompt: "Complete with the opposite of heavy: 'This feather is very _____.'",
            correctAnswer: "light",
            explanation: "'Light' is the direct antonym of heavy.",
            urduExplanation: "heavy (Ø¨Ú¾Ø§Ø±ÛŒ) Ú©Ø§ Ø§Ù„Ù¹ light (Û Ù„Ú©Ø§) Û Û’Û”"
          },
          {
            id: "ex-a1-u2-l5-5",
            type: "order_sentence",
            skillTag: "adjectives",
            prompt: "Rearrange the words to form a correct sentence:",
            sentenceTokens: ["She", "has", "a", "small", "blue", "car", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Subject (She) + verb (has) + article + size (small) + colour (blue) + noun (car).",
            urduExplanation: "She has a small blue car."
          },
          {
            id: "ex-a1-u2-l5-6",
            type: "order_sentence",
            skillTag: "adjectives",
            prompt: "Rearrange the words into a correct statement:",
            sentenceTokens: ["These", "heavy", "books", "are", "expensive", "."],
            correctOrder: [0, 1, 2, 3, 4, 5],
            explanation: "Demonstrative + adjective + plural noun + linking verb + predicate adjective.",
            urduExplanation: "These heavy books are expensive."
          },
          {
            id: "ex-a1-u2-l5-7",
            type: "match_pairs",
            skillTag: "adjectives",
            prompt: "Match each adjective with its opposite:",
            pairs: [
              { left: "big", right: "small" },
              { left: "heavy", right: "light" },
              { left: "black", right: "white" },
              { left: "long", right: "short" }
            ],
            explanation: "Antonym pairs correctly matched.",
            urduExplanation: "Ù…ØªØ¶Ø§Ø¯ Ø§Ù„Ù Ø§Ø¸ Ú©Û’ Ø¬ÙˆÚ‘Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u2-l5-8",
            type: "error_correction",
            skillTag: "adjectives",
            prompt: "Find and correct the mistake: 'They bought three reds chairs.'",
            correctAnswer: "They bought three red chairs.",
            explanation: "Adjectives cannot be pluralized; say 'red chairs', never 'reds chairs'.",
            urduExplanation: "Adjective Ù¾Ø± 's' Ù†Û ÛŒÚº Ù„Ú¯ØªØ§ØŒ 'red chairs' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u2-l5-9",
            type: "error_correction",
            skillTag: "adjectives",
            prompt: "Find and correct the mistake: 'She drives a car blue.'",
            correctAnswer: "She drives a blue car.",
            explanation: "In English, descriptive adjectives come before the noun: 'a blue car'.",
            urduExplanation: "Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº ØµÙ Øª Ù¾Û Ù„Û’ Ø¢ØªÛŒ Û Û’: 'a blue car'Û”"
          },
          {
            id: "ex-a1-u2-l5-10",
            type: "true_false",
            skillTag: "adjectives",
            prompt: "In English, adjectives change their form depending on whether the noun is masculine or feminine. (True or False)",
            correctAnswer: "False",
            explanation: "False. English adjectives are completely invariant; they never change for gender or number.",
            urduExplanation: "ØºÙ„Ø·Û” Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº adjectives Ù…Ø°Ú©Ø± ÛŒØ§ Ù…Ø¤Ù†Ø« Ú©Û’ Ù„Ø­Ø§Ø¸ Ø³Û’ Ù†Û ÛŒÚº Ø¨Ø¯Ù„ØªÛ’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u2-l5-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u2-l5-1",
            type: "mcq",
            skillTag: "adjectives",
            prompt: "Which sentence has the correct adjective order and form?",
            options: [
              { id: "opt-1", text: "He has a big black dog." },
              { id: "opt-2", text: "He has a black big dog." },
              { id: "opt-3", text: "He has a bigs black dog." },
              { id: "opt-4", text: "He has a dog big black." }
            ],
            correctOptionId: "opt-1",
            explanation: "Size precedes colour (big before black), and the adjective is placed before the noun.",
            urduExplanation: "Size Ù¾Û Ù„Û’ Ø§ÙˆØ± colour Ø¨Ø¹Ø¯ Ù…ÛŒÚº: 'a big black dog'Û”"
          },
          {
            id: "qz-a1-u2-l5-2",
            type: "mcq",
            skillTag: "adjectives",
            prompt: "Select the sentence with INCORRECT grammar:",
            options: [
              { id: "opt-1", text: "The cars are fast." },
              { id: "opt-2", text: "These are fasts cars." },
              { id: "opt-3", text: "She bought a fast car." },
              { id: "opt-4", text: "Fast cars are exciting." }
            ],
            correctOptionId: "opt-2",
            explanation: "'These are fasts cars' is incorrect because adjectives can never take the plural '-s'.",
            urduExplanation: "'fasts cars' ØºÙ„Ø· Û Û’ Ú©ÛŒÙˆÙ†Ú©Û  adjective Ù¾Ø± 's' Ù†Û ÛŒÚº Ù„Ú¯ØªØ§Û”"
          },
          {
            id: "qz-a1-u2-l5-3",
            type: "mcq",
            skillTag: "colors",
            prompt: "What colour do you get by mixing blue and yellow?",
            options: [
              { id: "opt-1", text: "purple" },
              { id: "opt-2", text: "orange" },
              { id: "opt-3", text: "green" },
              { id: "opt-4", text: "red" }
            ],
            correctOptionId: "opt-3",
            explanation: "Mixing blue and yellow produces green.",
            urduExplanation: "Ù†ÛŒÙ„Ø§ Ø§ÙˆØ± Ù¾ÛŒÙ„Ø§ Ù…Ù„Ø§Ù†Û’ Ø³Û’ Ø³Ø¨Ø² (green) Ø±Ù†Ú¯ Ø¨Ù†ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u2-l5-4",
            type: "mcq",
            skillTag: "adjectives",
            prompt: "Which pair are antonyms (opposites)?",
            options: [
              { id: "opt-1", text: "big - large" },
              { id: "opt-2", text: "light - heavy" },
              { id: "opt-3", text: "blue - green" },
              { id: "opt-4", text: "small - tiny" }
            ],
            correctOptionId: "opt-2",
            explanation: "'Light' and 'heavy' are direct opposites in weight.",
            urduExplanation: "'light' (Û Ù„Ú©Ø§) Ø§ÙˆØ± 'heavy' (Ø¨Ú¾Ø§Ø±ÛŒ) Ø§ÛŒÚ© Ø¯ÙˆØ³Ø±Û’ Ú©Û’ Ù…Ø®Ø§Ù„Ù  Û ÛŒÚºÛ”"
          },
          {
            id: "qz-a1-u2-l5-5",
            type: "mcq",
            skillTag: "adjectives",
            prompt: "Where does an adjective go in the sentence 'The tea is hot'?",
            options: [
              { id: "opt-1", text: "After the verb 'to be'" },
              { id: "opt-2", text: "Before the subject noun" },
              { id: "opt-3", text: "At the beginning of the question" },
              { id: "opt-4", text: "Before the definite article" }
            ],
            correctOptionId: "opt-1",
            explanation: "In predicative position, the adjective 'hot' follows the linking verb 'is'.",
            urduExplanation: "Ù Ø¹Ù„ 'is' Ú©Û’ Ø¨Ø¹Ø¯ adjective 'hot' Ø¢ÛŒØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u2-l5-6",
        type: "summary",
        title: "Lesson Summary",
        content: "What you learned about colours, sizes, and adjectives:",
        summaryPoints: [
          "English adjectives are placed BEFORE nouns (a blue pen) or AFTER the verb to be (The pen is blue).",
          "Adjectives NEVER change for singular vs plural (red books, not reds books).",
          "Adjectives do not change for gender in English.",
          "Natural descriptive order: Size before Colour (a big green apple).",
          "Master common opposites: big/small, heavy/light, black/white, long/short."
        ]
      },
      {
        id: "sec-a1-u2-l5-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº ØµÙ Øª (Adjective) Ø§Ø³Ù… Ú©ÛŒ Ø¬Ù†Ø³ (Gender) Ø§ÙˆØ± ØªØ¹Ø¯Ø§Ø¯ (Number) Ú©Û’ Ù„Ø­Ø§Ø¸ Ø³Û’ Ø¨Ø¯Ù„ØªÛŒ Û Û’:\n- Ø¨Ú‘**Ø§** Ú¯Ú¾Ø± (Ù…Ø°Ú©Ø± ÙˆØ§Ø­Ø¯)\n- Ø¨Ú‘**ÛŒ** Ú¯Ø§Ú‘ÛŒ (Ù…Ø¤Ù†Ø« ÙˆØ§Ø­Ø¯)\n- Ø¨Ú‘**Û’** Ù…Ú©Ø§Ù†Ø§Øª (Ù…Ø°Ú©Ø± Ø¬Ù…¹)\n\n**Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº ØµÙ Øª Ú©Ø¨Ú¾ÛŒ Ù†Û ÛŒÚº Ø¨Ø¯Ù„ØªÛŒ!**\n- a **big** house\n- a **big** car\n- **big** houses (Ú©Ø¨Ú¾ÛŒ 'bigs' Ù†Û ÛŒÚº Ú©Û Ù†Ø§)\nÛŒÛ  Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ú©ÛŒ Ø§ÛŒÚ© Ø¨Û Øª Ø¨Ú‘ÛŒ Ø¢Ø³Ø§Ù†ÛŒ Û Û’ Ø¬Ø³ Ú©Ùˆ ÛŒØ§Ø¯ Ø±Ú©Ú¾Ù†Ø§ Ø¶Ø±ÙˆØ±ÛŒ Û Û’Û”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  }
];
