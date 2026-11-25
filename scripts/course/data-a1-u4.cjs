/**
 * Zarii English Course - Level A1, Unit 4 Content
 * Unit 4: Possessions & Family Relationships
 * Lessons 1 to 5
 */

module.exports = [
  // -------------------------------------------------------------------------
  // LESSON 1: Have & Has: Expressing Possession
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u4-l1",
    level: "A1",
    unit: "unit-4",
    order: 1,
    title: "Have & Has: Expressing Possession",
    description: "Learn how to express ownership, relationships, and characteristics using have and has.",
    objectives: [
      "Use 'have' with I, you, we, and they in affirmative sentences",
      "Use 'has' with he, she, and it accurately",
      "Form negative sentences using 'don't have' and 'doesn't have' (never 'doesn't has')"
    ],
    estimatedMinutes: 12,
    prerequisites: ["eng-a1-u3-l5"],
    skillTags: ["have-has", "possession", "grammar-basics", "verbs"],
    vocabularyList: [
      { word: "have", partOfSpeech: "verb", phonetic: "/hÃ¦v/", definition: "To possess, own, or hold.", urduMeaning: "Ù¾Ø§Ø³ Û ÙˆÙ†Ø§ / Ù…Ù„Ú©ÛŒØª Û ÙˆÙ†Ø§", exampleSentence: "I have a new laptop for my studies." },
      { word: "has", partOfSpeech: "verb", phonetic: "/hÃ¦z/", definition: "Third person singular present of have.", urduMeaning: "Ù¾Ø§Ø³ Û Û’ (ÙˆØ§Ø­Ø¯ Ú©Û’ Ù„ÛŒÛ’)", exampleSentence: "She has two brothers and one sister." },
      { word: "own", partOfSpeech: "verb", phonetic: "/É™ÊŠn/", definition: "To have something as one's own possession.", urduMeaning: "Ù…Ø§Ù„Ú© Û ÙˆÙ†Ø§", exampleSentence: "They own a small house near the canal." },
      { word: "smartphone", partOfSpeech: "noun", phonetic: "/ËˆsmÉ‘Ë tfÉ™ÊŠn/", definition: "A mobile phone that performs many functions of a computer.", urduMeaning: "Ø§Ø³Ù…Ø§Ø±Ù¹ Ù ÙˆÙ†", exampleSentence: "He has a modern smartphone." },
      { word: "bicycle", partOfSpeech: "noun", phonetic: "/ËˆbaÉªsÉªkl/", definition: "A vehicle consisting of two wheels held in a frame one behind the other.", urduMeaning: "Ø³Ø§Ø¦ÛŒÚ©Ù„", exampleSentence: "I ride my bicycle to the library." },
      { word: "passport", partOfSpeech: "noun", phonetic: "/ËˆpÉ‘Ë spÉ”Ë t/", definition: "An official document issued by a government certifying identity and citizenship.", urduMeaning: "Ù¾Ø§Ø³Ù¾ÙˆØ±Ù¹", exampleSentence: "Do you have your passport ready for travel?" },
      { word: "ticket", partOfSpeech: "noun", phonetic: "/ËˆtÉªkÉªt/", definition: "A piece of paper or electronic token giving the holder a right to travel or enter.", urduMeaning: "Ù¹Ú©Ù¹", exampleSentence: "She has two tickets for the cricket match." },
      { word: "room", partOfSpeech: "noun", phonetic: "/ruË m/", definition: "Space that can be occupied in a building.", urduMeaning: "Ú©Ù…Ø±Û ", exampleSentence: "Our house has four large bedrooms." },
      { word: "house", partOfSpeech: "noun", phonetic: "/haÊŠs/", definition: "A building for human habitation, especially one that consists of a ground floor and one or more upper storeys.", urduMeaning: "Ú¯Ú¾Ø± / Ù…Ú©Ø§Ù†", exampleSentence: "They have a beautiful house with a lawn." },
      { word: "pet", partOfSpeech: "noun", phonetic: "/pet/", definition: "A domestic or tamed animal kept for companionship or pleasure.", urduMeaning: "Ù¾Ø§Ù„ØªÙˆ Ø¬Ø§Ù†ÙˆØ±", exampleSentence: "We have a gentle pet cat named Snow." }
    ],
    sections: [
      {
        id: "sec-a1-u4-l1-1",
        type: "explain",
        title: "Possession with Have and Has",
        content: "We use the verb **have** (and its third-person form **has**) to describe:\n1. **Ownership**: Things you own (*I have a car*).\n2. **Family ties**: Relatives you have (*She has two sisters*).\n3. **Physical features**: Eyes, hair, height (*He has brown eyes*).\n4. **Illnesses**: Health issues (*I have a headache*).",
        tables: [
          {
            title: "Have vs. Has Matrix",
            headers: ["Subject", "Affirmative", "Negative", "Urdu Translation", "Example"],
            rows: [
              ["I / You / We / They", "have", "don't have", "Ù…ÛŒØ±Û’ / Ø¢Ù¾ Ú©Û’ Ù¾Ø§Ø³ Û Û’ / Ù†Û ÛŒÚº Û Û’", "I have a car / We don't have time."],
              ["He / She / It", "has", "doesn't have (NEVER has!)", "Ø§Ø³ Ú©Û’ Ù¾Ø§Ø³ Û Û’ / Ù†Û ÛŒÚº Û Û’", "She has a bike / He doesn't have a car."]
            ]
          },
          {
            title: "Crucial Form / Use / Common Mistakes",
            headers: ["Aspect", "Rule", "Correct Example", "Error to Avoid"],
            rows: [
              ["Negative he/she/it", "doesn't + base verb 'have'", "He doesn't have a pen", "Fatal error: 'He doesn't has a pen'."],
              ["Question form", "Do/Does + subject + have?", "Does she have a ticket?", "Never: 'Has she a ticket?' in modern standard English."],
              ["Contractions", "don't have / doesn't have", "We don't have cash", "Never say 'We haven't cash'."]
            ]
          }
        ],
        callouts: [
          {
            type: "warning",
            title: "The 'Doesn't Have' Trap",
            text: "Because **doesn't** already carries the third-person inflection, the verb MUST be **have**: **He doesn't have** (never *doesn't has*)."
          },
          {
            type: "tip",
            title: "Expressing Possession in Urdu vs English",
            text: "In Urdu, you say 'میرے پاس گاڑی ہے' (With me a car is). In English, the owner is the direct grammatical subject: **I have a car**."
          }
        ]
      },
      {
        id: "sec-a1-u4-l1-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "I have a valid Pakistani passport and a visa.", phonetic: "/aÉª hÃ¦v É™ ËˆvÃ¦lÉªd ËŒpÉ‘Ë kÉªËˆstÉ‘Ë ni ËˆpÉ‘Ë spÉ”Ë t Ã¦nd É™ ËˆviË zÉ™/", urdu: "Ù…ÛŒØ±Û’ Ù¾Ø§Ø³ Ø§ÛŒÚ© Ø¬Ø§Ø¦Ø² Ù¾Ø§Ú©Ø³ØªØ§Ù†ÛŒ Ù¾Ø§Ø³Ù¾ÙˆØ±Ù¹ Ø§ÙˆØ± ÙˆÛŒØ²Ø§ Û Û’Û”", audioText: "I have a valid Pakistani passport and a visa." },
          { english: "She has two younger brothers and one older sister.", phonetic: "/ÊƒiË  hÃ¦z tuË  ËˆjÊŒÅ‹É¡É™r ËˆbrÊŒÃ°É™rz Ã¦nd wÊŒn ËˆÉ™ÊŠldÉ™r ËˆsÉªstÉ™r/", urdu: "Ø§Ø³ Ú©Û’ Ø¯Ùˆ Ú†Ú¾ÙˆÙ¹Û’ Ø¨ÚÚ¾Ø§Ø¦ÛŒ Ø§ÙˆØ± Ø§ÛŒÚ© Ø¨Ú‘ÛŒ Ø¨Û Ù† Û Û’Û”", audioText: "She has two younger brothers and one older sister." },
          { english: "He doesn't have a driving licence yet.", phonetic: "/hiË  ËˆdÊŒznt hÃ¦v É™ ËˆdraÉªvÉªÅ‹ ËˆlaÉªsns jet/", urdu: "Ø§Ø³ Ú©Û’ Ù¾Ø§Ø³ Ø§Ø¨Ú¾ÛŒ ÚˆØ±Ø§Ø¦ÛŒÙˆÙ†Ú¯ Ù„Ø§Ø¦Ø³Ù†Ø³ Ù†Û ÛŒÚº Û Û’Û”", audioText: "He doesn't have a driving licence yet." },
          { english: "We have an important examination on Monday morning.", phonetic: "/wiË  hÃ¦v É™n ÉªmËˆpÉ”Ë tnt ÉªÉ¡ËŒzÃ¦mÉªËˆneÉªÊƒn É’n ËˆmÊŒndeÉª ËˆmÉ”Ë rnÉªÅ‹/", urdu: "Ù¾ÛŒØ± Ú©ÛŒ ØµØ¨Ø­ Û Ù…Ø§Ø±Ø§ Ø§ÛŒÚ© Ø§Û Ù… Ø§Ù…ØªØ­Ø§Ù† Û Û’Û”", audioText: "We have an important examination on Monday morning." },
          { english: "They have a lovely house with a large backyard.", phonetic: "/Ã°eÉª hÃ¦v É™ ËˆlÊŒvli haÊŠs wÉªÃ° É™ lÉ‘Ë dÊ’ ËŒbÃ¦kËˆjÉ‘Ë d/", urdu: "Ø§Ù† Ú©Ø§ Ø§ÛŒÚ© Ù¾ÛŒØ§Ø±Ø§ Ú¯Ú¾Ø± Û Û’ Ø¬Ø³ Ù…ÛŒÚº Ø¨Ú‘Ø§ ØµØ­Ù† Û Û’Û”", audioText: "They have a lovely house with a large backyard." },
          { english: "Do you have any questions about this grammar rule?", phonetic: "/duË  juË  hÃ¦v Ëˆeni ËˆkwestÊƒÉ™nz É™ËˆbaÊŠt Ã°Éªs ËˆÉ¡rÃ¦mÉ™r ruË l/", urdu: "Ú©ÛŒØ§ Ø§Ø³ Ú¯Ø±Ø§Ù…Ø± Ú©Û’ Ù‚Ø§Ø¹Ø¯Û’ Ú©Û’ Ø¨Ø§Ø±Û’ Ù…ÛŒÚº Ø¢Ù¾ Ú©Ø§ Ú©ÙˆØ¦ÛŒ Ø³ÙˆØ§Ù„ Û Û’ØŸ", audioText: "Do you have any questions about this grammar rule?" },
          { english: "Ahmed has a gentle pet cat that sleeps on his chair.", phonetic: "/ËˆÉ‘Ë mÉ™d hÃ¦z É™ ËˆdÊ’entl pet kÃ¦t Ã°Ã¦t sliË ps É’n hÉªz tÊƒeÉ™r/", urdu: "Ø§Ø­Ù…Ø¯ Ú©Û’ Ù¾Ø§Ø³ Ø§ÛŒÚ© Ù…Ø¹ØµÙˆÙ… Ù¾Ø§Ù„ØªÙˆ Ø¨Ù„ÛŒ Û Û’ Ø¬Ùˆ Ø§Ø³ Ú©ÛŒ Ú©Ø±Ø³ÛŒ Ù¾Ø± Ø³ÙˆØªÛŒ Û Û’Û”", audioText: "Ahmed has a gentle pet cat that sleeps on his chair." },
          { english: "They don't have enough money for an overseas holiday.", phonetic: "/Ã°eÉª dÉ™ÊŠnt hÃ¦v ÉªËˆnÊŒf ËˆmÊŒni fÉ”Ë r É™n ËŒÉ™ÊŠvÉ™ËˆsiË z ËˆhÉ’lÉ™deÉª/", urdu: "Ø§Ù† Ú©Û’ Ù¾Ø§Ø³ ØºÛŒØ± Ù…Ù„Ú©ÛŒ ØªØ¹Ø·ÛŒÙ„Ø§Øª Ú©Û’ Ù„ÛŒÛ’ Ú©Ø§Ù ÛŒ Ù¾ÛŒØ³Û’ Ù†Û ÛŒÚº Û ÛŒÚºÛ”", audioText: "They don't have enough money for an overseas holiday." }
        ]
      },
      {
        id: "sec-a1-u4-l1-3",
        type: "dialogue",
        title: "Checking Travel Documents",
        dialogue: [
          { speaker: "Officer", avatar: "O", english: "Good morning. Do you have your boarding pass and passport?", urdu: "ØµØ¨Ø­ Ø¨Ø®ÛŒØ±Û” Ú©ÛŒØ§ Ø¢Ù¾ Ú©Û’ Ù¾Ø§Ø³ Ø¨ÙˆØ±ÚˆÙ†Ú¯ Ù¾Ø§Ø³ Ø§ÙˆØ± Ù¾Ø§Ø³Ù¾ÙˆØ±Ù¹ Û Û’ØŸ", audioText: "Good morning. Do you have your boarding pass and passport?" },
          { speaker: "Traveler", avatar: "T", english: "Yes, I have both documents right here in my pouch.", urdu: "Ø¬ÛŒ Û Ø§ÚºØŒ Ù…ÛŒØ±Û’ Ù¾Ø§Ø³ ÛŒÛ Ø§Úº Ù¾Ø§Ø¤Ú† Ù…ÛŒÚº Ø¯ÙˆÙ†ÙˆÚº Ø¯Ø³ØªØ§ÙˆÛŒØ²Ø§Øª Ù…ÙˆØ¬ÙˆØ¯ Û ÛŒÚºÛ”", audioText: "Yes, I have both documents right here in my pouch." },
          { speaker: "Officer", avatar: "O", english: "Does your companion have his visa copy?", urdu: "Ú©ÛŒØ§ Ø¢Ù¾ Ú©Û’ Ø³Ø§ØªÚ¾ÛŒ Ú©Û’ Ù¾Ø§Ø³ Ø§Ù¾Ù†Û’ ÙˆÛŒØ²Û’ Ú©ÛŒ Ú©Ø§Ù¾ÛŒ Û Û’ØŸ", audioText: "Does your companion have his visa copy?" },
          { speaker: "Traveler", avatar: "T", english: "Yes, he has all his papers in his backpack.", urdu: "Ø¬ÛŒ Û Ø§ÚºØŒ Ø§Ø³ Ú©Û’ Ø³Ø§Ø±Û’ Ú©Ø§ØºØ°Ø§Øª Ø§Ø³ Ú©Û’ Ø¨Ø³ØªÛ’ Ù…ÛŒÚº Û ÛŒÚºÛ”", audioText: "Yes, he has all his papers in his backpack." }
        ]
      },
      {
        id: "sec-a1-u4-l1-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u4-l1-1",
            type: "mcq",
            skillTag: "have-has",
            prompt: "Choose the correct form: 'Ali _____ a new smartphone.'",
            options: [
              { id: "opt-1", text: "has" },
              { id: "opt-2", text: "have" },
              { id: "opt-3", text: "having" },
              { id: "opt-4", text: "haves" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Ali' is third-person singular (he), requiring 'has'.",
            urduExplanation: "'Ali' ÙˆØ§Ø­Ø¯ ØºØ§Ø¦Ø¨ (he) Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'has' Ø¢Ø¦Û’ Ú¯Ø§Û”"
          },
          {
            id: "ex-a1-u4-l1-2",
            type: "mcq",
            skillTag: "have-has",
            prompt: "Choose the correct negative sentence:",
            options: [
              { id: "opt-1", text: "She doesn't has a bicycle." },
              { id: "opt-2", text: "She doesn't have a bicycle." },
              { id: "opt-3", text: "She don't have a bicycle." },
              { id: "opt-4", text: "She has not a bicycle." }
            ],
            correctOptionId: "opt-2",
            explanation: "After 'doesn't', always use the base form 'have': 'She doesn't have a bicycle'.",
            urduExplanation: "'doesn't' Ú©Û’ Ø¨Ø¹Ø¯ Û Ù…ÛŒØ´Û  base verb 'have' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u4-l1-3",
            type: "fill_blank",
            skillTag: "have-has",
            prompt: "Complete with 'have' or 'has': 'We _____ two tickets for the final match.'",
            correctAnswer: "have",
            explanation: "Subject pronoun 'We' takes 'have'.",
            urduExplanation: "'We' Ú©Û’ Ø³Ø§ØªÚ¾ 'have' Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u4-l1-4",
            type: "fill_blank",
            skillTag: "have-has",
            prompt: "Complete with 'have' or 'has': 'He _____ brown eyes and dark hair.'",
            correctAnswer: "has",
            explanation: "'He' takes 'has' to describe physical characteristics.",
            urduExplanation: "'He' Ú©Û’ Ø³Ø§ØªÚ¾ 'has' Ù„Ú¯ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u4-l1-5",
            type: "order_sentence",
            skillTag: "have-has",
            prompt: "Rearrange the words to form a correct sentence:",
            sentenceTokens: ["I", "have", "a", "valid", "Pakistani", "passport", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Subject (I) + verb (have) + article + adjectives + noun (passport).",
            urduExplanation: "I have a valid Pakistani passport."
          },
          {
            id: "ex-a1-u4-l1-6",
            type: "order_sentence",
            skillTag: "have-has",
            prompt: "Rearrange the words to form a correct question:",
            sentenceTokens: ["Do", "you", "have", "an", "extra", "ticket", "?"],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Auxiliary (Do) + subject (you) + base verb (have) + noun phrase (an extra ticket)?",
            urduExplanation: "Do you have an extra ticket?"
          },
          {
            id: "ex-a1-u4-l1-7",
            type: "match_pairs",
            skillTag: "have-has",
            prompt: "Match the subject pronoun with the correct form of have/has:",
            pairs: [
              { left: "They", right: "have" },
              { left: "She", right: "has" },
              { left: "You", right: "have" },
              { left: "He", right: "has" }
            ],
            explanation: "Have/has forms correctly matched with subject pronouns.",
            urduExplanation: "Ù Ø§Ø¹Ù„ Ú©Ùˆ have ÛŒØ§ has Ø³Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u4-l1-8",
            type: "error_correction",
            skillTag: "have-has",
            prompt: "Find and correct the mistake: 'He doesn't has his student card.'",
            correctAnswer: "He doesn't have his student card.",
            explanation: "Always use base 'have' after auxiliary 'doesn't': 'He doesn't have'.",
            urduExplanation: "'doesn't has' ØºÙ„Ø· Û Û’ØŒ 'doesn't have' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u4-l1-9",
            type: "error_correction",
            skillTag: "have-has",
            prompt: "Find and correct the mistake: 'We has three rooms in our apartment.'",
            correctAnswer: "We have three rooms in our apartment.",
            explanation: "'We' is plural and takes 'have', not 'has'.",
            urduExplanation: "'We' Ú©Û’ Ø³Ø§ØªÚ¾ 'have' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u4-l1-10",
            type: "true_false",
            skillTag: "have-has",
            prompt: "The negative of 'She has a pen' is 'She doesn't has a pen'. (True or False)",
            correctAnswer: "False",
            explanation: "False. The correct negative is 'She doesn't have a pen'.",
            urduExplanation: "ØºÙ„Ø·Û” ØµØ­ÛŒØ­ Ù…Ù†Ù ÛŒ 'She doesn't have a pen' Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u4-l1-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u4-l1-1",
            type: "mcq",
            skillTag: "have-has",
            prompt: "Which sentence correctly expresses possession?",
            options: [
              { id: "opt-1", text: "He haves a fast car." },
              { id: "opt-2", text: "He has a fast car." },
              { id: "opt-3", text: "He have a fast car." },
              { id: "opt-4", text: "He is having a car habit." }
            ],
            correctOptionId: "opt-2",
            explanation: "'He has a fast car' correctly conjugates third-person singular possession.",
            urduExplanation: "'He has a fast car' Ø¨Ø§Ù„Ú©Ù„ Ø¯Ø±Ø³Øª Û Û’Û”"
          },
          {
            id: "qz-a1-u4-l1-2",
            type: "mcq",
            skillTag: "have-has",
            prompt: "Complete the sentence: 'Tariq and Asad _____ three computers between them.'",
            options: [
              { id: "opt-1", text: "has" },
              { id: "opt-2", text: "owns" },
              { id: "opt-3", text: "have" },
              { id: "opt-4", text: "is have" }
            ],
            correctOptionId: "opt-3",
            explanation: "'Tariq and Asad' make a plural subject (they), requiring 'have'.",
            urduExplanation: "Ø¯Ùˆ Ù†Ø§Ù… (Ø¬Ù…Ø¹ Ù Ø§Ø¹Ù„) Ú©Û’ Ù„ÛŒÛ’ 'have' Ø¢Ø¦Û’ Ú¯Ø§Û”"
          },
          {
            id: "qz-a1-u4-l1-3",
            type: "mcq",
            skillTag: "have-has",
            prompt: "What is the correct negative for 'My uncle has a pet parrot'?",
            options: [
              { id: "opt-1", text: "My uncle don't have a pet parrot." },
              { id: "opt-2", text: "My uncle doesn't has a pet parrot." },
              { id: "opt-3", text: "My uncle hasn't a pet parrot." },
              { id: "opt-4", text: "My uncle doesn't have a pet parrot." }
            ],
            correctOptionId: "opt-4",
            explanation: "'doesn't have' correctly pairs the singular auxiliary with base verb 'have'.",
            urduExplanation: "'doesn't have' Ø¨Ø§Ù„Ú©Ù„ ØµØ­ÛŒØ­ Ù…Ù†Ù ÛŒ ØµÙˆØ±Øª Û Û’Û”"
          },
          {
            id: "qz-a1-u4-l1-4",
            type: "mcq",
            skillTag: "have-has",
            prompt: "Complete the question: '_____ she have a spare notebook?'",
            options: [
              { id: "opt-1", text: "Does" },
              { id: "opt-2", text: "Do" },
              { id: "opt-3", text: "Has" },
              { id: "opt-4", text: "Is" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Does' is the required auxiliary for third-person singular questions with 'have'.",
            urduExplanation: "'She' Ú©Û’ Ø³ÙˆØ§Ù„ Ù…ÛŒÚº 'Does' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u4-l1-5",
            type: "mcq",
            skillTag: "have-has",
            prompt: "Which pair is matched correctly?",
            options: [
              { id: "opt-1", text: "I - has" },
              { id: "opt-2", text: "She - have" },
              { id: "opt-3", text: "We - has" },
              { id: "opt-4", text: "They - have" }
            ],
            correctOptionId: "opt-4",
            explanation: "'They' correctly pairs with 'have'.",
            urduExplanation: "'They' Ú©Û’ Ø³Ø§ØªÚ¾ 'have' Ø¯Ø±Ø³Øª Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u4-l1-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Expressing possession takeaways:",
        summaryPoints: [
          "Use 'have' with I, you, we, they (I have a passport).",
          "Use 'has' with he, she, it (She has two sisters).",
          "Form negatives with don't have (I, you, we, they) and doesn't have (he, she, it).",
          "NEVER say 'doesn't has' or 'he haves'.",
          "Ask questions with 'Do you have...?' or 'Does she have...?'."
        ]
      },
      {
        id: "sec-a1-u4-l1-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Ù…Ù„Ú©ÛŒØª (Possession) Ø¸Ø§Û Ø± Ú©Ø±Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Û Ù… **'Ú©Û’ Ù¾Ø§Ø³ Û Û’'** Ú©Ø§ Ù…Ø­Ø§ÙˆØ±Û  Ø§Ø³ØªØ¹Ù…Ø§Ù„ Ú©Ø±ØªÛ’ Û ÛŒÚº:\n- 'Ù…ÛŒØ±Û’ Ù¾Ø§Ø³ Ú¯Ø§Ú‘ÛŒ Û Û’'\n- 'Ø§Ø³ Ú©Û’ Ù¾Ø§Ø³ Ù¾Ø§Ø³Ù¾ÙˆØ±Ù¹ Û Û’'\n\nØ§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ù…Ø§Ù„Ú© Ø®ÙˆØ¯ Ø¬Ù…Ù„Û’ Ú©Ø§ Ù Ø§Ø¹Ù„ (Subject) Ø¨Ù†ØªØ§ Û Û’ Ø§ÙˆØ± Ù Ø¹Ù„ **have** ÛŒØ§ **has** Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’:\n- **I have a car**\n- **She has a passport**\n\n**Ø§Û Ù… ØºÙ„Ø·ÛŒ:** Ù…Ù†Ù ÛŒ Ø¨Ù†Ø§ØªÛ’ ÙˆÙ‚Øª 'doesn't has' Ú©Ø¨Ú¾ÛŒ Ù†Û  Ú©Û ÛŒÚºÛ” Û Ù…ÛŒØ´Û  **'doesn't have'** Ø¨ÙˆÙ„ÛŒÚºÛ”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 2: Family Tree Vocabulary
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u4-l2",
    level: "A1",
    unit: "unit-4",
    order: 2,
    title: "Family Tree Vocabulary",
    description: "Identify family members, kinship relationships, and describe immediate and extended family ties.",
    objectives: [
      "Name immediate family members (parents, mother, father, siblings, brother, sister, children, son, daughter)",
      "Name extended family members (grandparents, uncle, aunt, cousins)",
      "Introduce and describe your family members using simple present sentences"
    ],
    estimatedMinutes: 10,
    prerequisites: ["eng-a1-u4-l1"],
    skillTags: ["family", "vocabulary", "relationships", "introductions"],
    vocabularyList: [
      { word: "parent", partOfSpeech: "noun", phonetic: "/ËˆpeÉ™rÉ™nt/", definition: "A father or mother.", urduMeaning: "ÙˆØ§Ù„Ø¯ ÛŒØ§ ÙˆØ§Ù„Ø¯Û  (ÙˆØ§Ù„Ø¯ÛŒÙ†)", exampleSentence: "My parents live in Rawalpindi." },
      { word: "mother", partOfSpeech: "noun", phonetic: "/ËˆmÊŒÃ°É™r/", definition: "A female parent.", urduMeaning: "Ù…Ø§Úº / ÙˆØ§Ù„Ø¯Û ", exampleSentence: "My mother is a caring teacher." },
      { word: "father", partOfSpeech: "noun", phonetic: "/ËˆfÉ‘Ë Ã°É™r/", definition: "A male parent.", urduMeaning: "Ø¨Ø§Ù¾ / ÙˆØ§Ù„Ø¯", exampleSentence: "His father works at a government office." },
      { word: "brother", partOfSpeech: "noun", phonetic: "/ËˆbrÊŒÃ°É™r/", definition: "A man or boy in relation to other sons and daughters of his parents.", urduMeaning: "Ø¨ÚÚ¾Ø§Ø¦ÛŒ", exampleSentence: "I have an elder brother in Lahore." },
      { word: "sister", partOfSpeech: "noun", phonetic: "/ËˆsÉªstÉ™r/", definition: "A woman or girl in relation to other daughters and sons of her parents.", urduMeaning: "Ø¨Û Ù†", exampleSentence: "Her sister studies engineering." },
      { word: "son", partOfSpeech: "noun", phonetic: "/sÊŒn/", definition: "A male child or offspring.", urduMeaning: "Ø¨ÛŒÙ¹Ø§", exampleSentence: "They have a six-year-old son." },
      { word: "daughter", partOfSpeech: "noun", phonetic: "/ËˆdÉ”Ë tÉ™r/", definition: "A female child or offspring.", urduMeaning: "Ø¨ÛŒÙ¹ÛŒ", exampleSentence: "Their daughter is learning English." },
      { word: "child", partOfSpeech: "noun", phonetic: "/tÊƒaÉªld/", definition: "A young person; son or daughter.", urduMeaning: "Ø¨Ú†Û ", exampleSentence: "Every child deserves a good education." },
      { word: "uncle", partOfSpeech: "noun", phonetic: "/ËˆÊŒÅ‹kl/", definition: "The brother of one's father or mother or the husband of one's aunt.", urduMeaning: "Ú†Ú†Ø§ / Ù…Ø§Ù…ÙˆÚº / ØªØ§ÛŒØ§ / Ú©Ú¾Ø§Ù„Ùˆ", exampleSentence: "My uncle Tariq visited us yesterday." },
      { word: "aunt", partOfSpeech: "noun", phonetic: "/É‘Ë nt/", definition: "The sister of one's father or mother or the wife of one's uncle.", urduMeaning: "Ù¾Ú¾ÙˆÙ¾Ú¾ÛŒ / Ø®Ø§Ù„Û  / Ú†Ú†ÛŒ / Ù…Ù…Ø§Ù†ÛŒ", exampleSentence: "Her aunt lives in the UK." }
    ],
    sections: [
      {
        id: "sec-a1-u4-l2-1",
        type: "explain",
        title: "Immediate & Extended Family Structure",
        content: "In English, family terminology is grouped into two main circles:\n\n### 1. Immediate Family\n- **Parents**: Mother + Father\n- **Children**: Son (boy) + Daughter (girl)\n- **Siblings**: Brothers + Sisters\n- **Spouses**: Husband (male) + Wife (female)\n\n### 2. Extended Family\n- **Grandparents**: Grandfather + Grandmother\n- **Grandchildren**: Grandson + Granddaughter\n- **Parents' Siblings**: Uncle (male) + Aunt (female)\n- **Uncle/Aunt's Children**: Cousins (male or female)",
        tables: [
          {
            title: "English vs. Urdu Kinship Terms",
            headers: ["English Term", "Scope", "Urdu Equivalents", "Key Difference"],
            rows: [
              ["uncle", "Any brother of father or mother", "Ú†Ú†Ø§ØŒ Ù…Ø§Ù…ÙˆÚºØŒ ØªØ§ÛŒØ§ØŒ Ú©Ú¾Ø§Ù„Ùˆ", "English uses ONE word for all paternal and maternal uncles."],
              ["aunt", "Any sister of father or mother", "Ù¾Ú¾ÙˆÙ¾Ú¾ÛŒØŒ Ø®Ø§Ù„Û ØŒ Ú†Ú†ÛŒØŒ Ù…Ù…Ø§Ù†ÛŒ", "English uses ONE word for all paternal and maternal aunts."],
              ["cousin", "Child of any uncle or aunt", "Ú†Ú†Ø§ Ø²Ø§Ø¯ØŒ Ù…Ø§Ù…ÙˆÚº Ø²Ø§Ø¯ØŒ Ø®Ø§Ù„Û  Ø²Ø§Ø¯", "English uses 'cousin' for both boys and girls without gender distinction."],
              ["siblings", "Brothers and sisters collectively", "Ø¨Û Ù† Ø¨ÚÚ¾Ø§Ø¦ÛŒ", "A convenient collective word for all brothers and sisters."]
            ]
          },
          {
            title: "Useful Family Introduction Phrases",
            headers: ["Phrase Formula", "Example", "Urdu Translation"],
            rows: [
              ["I have [number] [members]", "I have two sisters and one brother.", "Ù…ÛŒØ±ÛŒ Ø¯Ùˆ Ø¨Û Ù†ÛŒÚº Ø§ÙˆØ± Ø§ÛŒÚ© Ø¨ÚÚ¾Ø§Ø¦ÛŒ Û Û’Û”"],
              ["This is my [relative]", "This is my mother, Mrs. Nasreen.", "ÛŒÛ  Ù…ÛŒØ±ÛŒ ÙˆØ§Ù„Ø¯Û  Ù…Ø³Ø² Ù†Ø³Ø±ÛŒÙ† Û ÛŒÚºÛ”"],
              ["We are a family of [number]", "We are a family of five.", "Û Ù… Ù¾Ø§Ù†Ú† Ø§Ù Ø±Ø§Ø¯ Ú©Ø§ Ú¯Ú¾Ø±Ø§Ù†Û  Û ÛŒÚºÛ”"]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Cousin Brother / Cousin Sister",
            text: "In standard English, never say 'cousin brother' or 'cousin sister'. Simply say **my cousin** (e.g. 'My cousin Bilal' or 'My cousin Sana')."
          },
          {
            type: "warning",
            title: "Pronunciation of Aunt",
            text: "In British English, 'aunt' is pronounced /É‘Ë nt/ (rhyming with 'plant'). In American English, it sounds like /Ã¦nt/ (like 'ant')."
          }
        ]
      },
      {
        id: "sec-a1-u4-l2-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "We are a close-knit family of five living in Islamabad.", phonetic: "/wiË  É‘Ë r É™ klÉ™ÊŠs nÉªt ËˆfÃ¦mÉ™li É™v faÉªv ËˆlÉªvÉªÅ‹ Éªn ÉªsËˆlÉ‘Ë mÉ™bÉ‘Ë d/", urdu: "Û Ù… Ø§Ø³Ù„Ø§Ù… Ø¢Ø¨Ø§Ø¯ Ù…ÛŒÚº Ø±Û Ù†Û’ ÙˆØ§Ù„Ø§ Ù¾Ø§Ù†Ú† Ø§Ù Ø±Ø§Ø¯ Ú©Ø§ Ø§ÛŒÚ© Ù¾ÛŒØ§Ø±Ø§ Ú¯Ú¾Ø±Ø§Ù†Û  Û ÛŒÚºÛ”", audioText: "We are a close-knit family of five living in Islamabad." },
          { english: "My father is a retired bank manager.", phonetic: "/maÉª ËˆfÉ‘Ë Ã°É™r Éªz É™ rÉªËˆtaÉªÉ™d bÃ¦Å‹k ËˆmÃ¦nÉªdÊ’É™r/", urdu: "Ù…ÛŒØ±Û’ ÙˆØ§Ù„Ø¯ Ø§ÛŒÚ© Ø±ÛŒÙ¹Ø§Ø¦Ø±Úˆ Ø¨ÛŒÙ†Ú© Ù…ÛŒÙ†ÛŒØ¬Ø± Û ÛŒÚºÛ”", audioText: "My father is a retired bank manager." },
          { english: "Her elder brother works as a civil engineer in Qatar.", phonetic: "/hÉœË r ËˆeldÉ™r ËˆbrÊŒÃ°É™r wÉœË ks Ã¦z É™ ËˆsÉªvl ËŒendÊ’ÉªËˆnÉªÉ™r Éªn ËˆkÃ¦tÉ‘Ë r/", urdu: "Ø§Ø³ Ú©Ø§ Ø¨Ú‘Ø§ Ø¨ÚÚ¾Ø§Ø¦ÛŒ Ù‚Ø·Ø± Ù…ÛŒÚº Ø³ÙˆÙ„ Ø§Ù†Ø¬Ù†ÛŒØ¦Ø± Ú©Û’ Ø·ÙˆØ± Ù¾Ø± Ú©Ø§Ù… Ú©Ø±ØªØ§ Û Û’Û”", audioText: "Her elder brother works as a civil engineer in Qatar." },
          { english: "How many siblings do you have? I have three siblings.", phonetic: "/haÊŠ Ëˆmeni ËˆsÉªblÉªÅ‹z duË  juË  hÃ¦v aÉª hÃ¦v Î¸riË  ËˆsÉªblÉªÅ‹z/", urdu: "Ø¢Ù¾ Ú©Û’ Ú©ØªÙ†Û’ Ø¨Û Ù† Ø¨ÚÚ¾Ø§Ø¦ÛŒ Û ÛŒÚºØŸ Ù…ÛŒØ±Û’ ØªÛŒÙ† Ø¨Û Ù† Ø¨ÚÚ¾Ø§Ø¦ÛŒ Û ÛŒÚºÛ”", audioText: "How many siblings do you have? I have three siblings." },
          { english: "My uncle Tariq and his wife have three sons.", phonetic: "/maÉª ËˆÊŒÅ‹kl ËˆtÉ‘Ë rÉªk Ã¦nd hÉªz waÉªf hÃ¦v Î¸riË  sÊŒnz/", urdu: "Ù…ÛŒØ±Û’ Ú†Ú†Ø§ Ø·Ø§Ø±Ù‚ Ø§ÙˆØ± Ø§Ù† Ú©ÛŒ Ø§Û Ù„ÛŒÛ  Ú©Û’ ØªÛŒÙ† Ø¨ÛŒÙ¹Û’ Û ÛŒÚºÛ”", audioText: "My uncle Tariq and his wife have three sons." },
          { english: "Their daughter is currently studying medicine in Karachi.", phonetic: "/Ã°eÉ™r ËˆdÉ”Ë tÉ™r Éªz ËˆkÊŒrÉ™ntli ËˆstÊŒdiÉªÅ‹ Ëˆmedsn Éªn kÉ™ËˆrÉ‘Ë tÊƒi/", urdu: "Ø§Ù† Ú©ÛŒ Ø¨ÛŒÙ¹ÛŒ Ø§Ø³ ÙˆÙ‚Øª Ú©Ø±Ø§Ú†ÛŒ Ù…ÛŒÚº Ù…ÛŒÚˆÛŒØ³Ù† Ù¾Ú‘Ú¾ Ø±Û ÛŒ Û Û’Û”", audioText: "Their daughter is currently studying medicine in Karachi." },
          { english: "My grandmother tells wonderful bedtime stories.", phonetic: "/maÉª ËˆÉ¡rÃ¦nmÊŒÃ°É™r telz ËˆwÊŒndÉ™fl ËˆbedtaÉªm ËˆstÉ”Ë riz/", urdu: "Ù…ÛŒØ±ÛŒ Ø¯Ø§Ø¯ÛŒ Ø³ÙˆÙ†Û’ Ú©Û’ ÙˆÙ‚Øª Ø´Ø§Ù†Ø¯Ø§Ø± Ú©Û Ø§Ù†ÛŒØ§Úº Ø³Ù†Ø§ØªÛŒ Û ÛŒÚºÛ”", audioText: "My grandmother tells wonderful bedtime stories." },
          { english: "All my cousins gather at our ancestral home for Eid.", phonetic: "/É”Ë l maÉª ËˆkÊŒznz ËˆÉ¡Ã¦Ã°É™r Ã¦t ËˆaÊŠÉ™r Ã¦nËˆsestrÉ™l hÉ™ÊŠm fÉ”Ë r iË d/", urdu: "Ø¹ÛŒØ¯ Ù¾Ø± Ù…ÛŒØ±Û’ ØªÙ…Ø§Ù… Ú©Ø²Ù†Ø² Û Ù…Ø§Ø±Û’ Ø¢Ø¨Ø§Ø¦ÛŒ Ú¯Ú¾Ø± Ù…ÛŒÚº Ø¬Ù…Ø¹ Û ÙˆØªÛ’ Û ÛŒÚºÛ”", audioText: "All my cousins gather at our ancestral home for Eid." }
        ]
      },
      {
        id: "sec-a1-u4-l2-3",
        type: "dialogue",
        title: "Showing Family Photos",
        dialogue: [
          { speaker: "Hassan", avatar: "H", english: "Is this a photo of your family, Usman?", urdu: "Ø¹Ø«Ù…Ø§Ù†ØŒ Ú©ÛŒØ§ ÛŒÛ  Ø¢Ù¾ Ú©Û’ Ú¯Ú¾Ø± ÙˆØ§Ù„ÙˆÚº Ú©ÛŒ ØªØµÙˆÛŒØ± Û Û’ØŸ", audioText: "Is this a photo of your family, Usman?" },
          { speaker: "Usman", avatar: "U", english: "Yes! These are my parents sitting in the front, and that is my elder brother behind them.", urdu: "Ø¬ÛŒ Û Ø§Úº! ÛŒÛ  Ø³Ø§Ù…Ù†Û’ Ù…ÛŒØ±Û’ ÙˆØ§Ù„Ø¯ÛŒÙ† Ø¨ÛŒÙ¹Ú¾Û’ Û ÛŒÚºØŒ Ø§ÙˆØ± Ø§Ù† Ú©Û’ Ù¾ÛŒÚ†Ú¾Û’ Ù…ÛŒØ±Ø§ Ø¨Ú‘Ø§ Ø¨ÚÚ¾Ø§Ø¦ÛŒ Û Û’Û”", audioText: "Yes! These are my parents sitting in the front, and that is my elder brother behind them." },
          { speaker: "Hassan", avatar: "H", english: "And who is that cheerful girl holding the cat?", urdu: "Ø§ÙˆØ± ÙˆÛ  Ø¨Ù„ÛŒ Ù¾Ú©Ú‘Û’ Û ÙˆØ¦Û’ Û Ù†Ø³Ù…Ú©Ú¾ Ù„Ú‘Ú©ÛŒ Ú©ÙˆÙ† Û Û’ØŸ", audioText: "And who is that cheerful girl holding the cat?" },
          { speaker: "Usman", avatar: "U", english: "That is my younger sister, Ayla. She loves animals.", urdu: "ÙˆÛ  Ù…ÛŒØ±ÛŒ Ú†ÚÚ¾ÙˆÙ¹ÛŒ Ø¨Û Ù† Ø¹Ø§Ø¦Ù„Û  Û Û’Û” ÙˆÛ  Ø¬Ø§Ù†ÙˆØ±ÙˆÚº Ø³Û’ Ø¨Û Øª Ù¾ÛŒØ§Ø± Ú©Ø±ØªÛŒ Û Û’Û”", audioText: "That is my younger sister, Ayla. She loves animals." }
        ]
      },
      {
        id: "sec-a1-u4-l2-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u4-l2-1",
            type: "mcq",
            skillTag: "family",
            prompt: "What word refers to your mother and father together?",
            options: [
              { id: "opt-1", text: "grandparents" },
              { id: "opt-2", text: "siblings" },
              { id: "opt-3", text: "parents" },
              { id: "opt-4", text: "cousins" }
            ],
            correctOptionId: "opt-3",
            explanation: "'Parents' collectively refers to your mother and father.",
            urduExplanation: "Ù…Ø§Úº Ø§ÙˆØ± Ø¨Ø§Ù¾ Ú©Ùˆ Ù…Ù„Ø§ Ú©Ø± 'parents' (ÙˆØ§Ù„Ø¯ÛŒÙ†) Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u4-l2-2",
            type: "mcq",
            skillTag: "family",
            prompt: "What is your father's brother called in English?",
            options: [
              { id: "opt-1", text: "nephew" },
              { id: "opt-2", text: "cousin" },
              { id: "opt-3", text: "grandfather" },
              { id: "opt-4", text: "uncle" }
            ],
            correctOptionId: "opt-4",
            explanation: "Your father's brother is your uncle.",
            urduExplanation: "ÙˆØ§Ù„Ø¯ Ú©Û’ Ø¨ÚÚ¾Ø§Ø¦ÛŒ Ú©Ùˆ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº 'uncle' (Ú†Ú†Ø§ / ØªØ§ÛŒØ§) Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u4-l2-3",
            type: "fill_blank",
            skillTag: "family",
            prompt: "Complete: 'A brother and a sister are called _____.'",
            correctAnswer: "siblings",
            explanation: "'Siblings' is the collective noun for brothers and sisters.",
            urduExplanation: "Ø¨Û Ù† Ø¨ÚÚ¾Ø§Ø¦ÛŒÙˆÚº Ú©Ùˆ Ù…Ø¬Ù…ÙˆØ¹ÛŒ Ø·ÙˆØ± Ù¾Ø± 'siblings' Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u4-l2-4",
            type: "fill_blank",
            skillTag: "family",
            prompt: "Complete: 'My mother's mother is my _____.'",
            correctAnswer: "grandmother",
            explanation: "Your mother's mother is your grandmother.",
            urduExplanation: "ÙˆØ§Ù„Ø¯Û  Ú©ÛŒ ÙˆØ§Ù„Ø¯Û  Ú©Ùˆ 'grandmother' (Ù†Ø§Ù†ÛŒ) Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u4-l2-5",
            type: "order_sentence",
            skillTag: "family",
            prompt: "Rearrange the words to form a correct sentence:",
            sentenceTokens: ["I", "have", "two", "brothers", "and", "one", "sister", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
            explanation: "Subject (I) + verb (have) + object noun phrase (two brothers and one sister).",
            urduExplanation: "I have two brothers and one sister."
          },
          {
            id: "ex-a1-u4-l2-6",
            type: "order_sentence",
            skillTag: "family",
            prompt: "Rearrange the words to introduce a family member:",
            sentenceTokens: ["This", "is", "my", "elder", "brother", "Ali", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Demonstrative (This) + verb (is) + possessive phrase (my elder brother Ali).",
            urduExplanation: "This is my elder brother Ali."
          },
          {
            id: "ex-a1-u4-l2-7",
            type: "match_pairs",
            skillTag: "family",
            prompt: "Match the male family member with the corresponding female member:",
            pairs: [
              { left: "father", right: "mother" },
              { left: "brother", right: "sister" },
              { left: "son", right: "daughter" },
              { left: "uncle", right: "aunt" }
            ],
            explanation: "Male and female kinship pairs accurately matched.",
            urduExplanation: "Ù…Ø°Ú©Ø± Ø§ÙˆØ± Ù…Ø¤Ù†Ø« Ø±Ø´ØªÙˆÚº Ú©Û’ Ø¬ÙˆÚ‘Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u4-l2-8",
            type: "error_correction",
            skillTag: "family",
            prompt: "Find and correct the mistake: 'He is my cousin brother.'",
            correctAnswer: "He is my cousin.",
            explanation: "In standard English, simply say 'He is my cousin'; never 'cousin brother'.",
            urduExplanation: "Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº 'cousin brother' ØºÙ„Ø· Û Û’ØŒ ØµØ±Ù  'He is my cousin' Ú©Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u4-l2-9",
            type: "error_correction",
            skillTag: "family",
            prompt: "Find and correct the mistake: 'They has two childs.'",
            correctAnswer: "They have two children.",
            explanation: "Plural subject 'They' takes 'have', and the irregular plural of 'child' is 'children'.",
            urduExplanation: "'They have two children' ØµØ­ÛŒØ­ Ø¬Ù…Ù„Û  Û Û’Û”"
          },
          {
            id: "ex-a1-u4-l2-10",
            type: "true_false",
            skillTag: "family",
            prompt: "The word 'cousin' in English is used for both male and female relatives. (True or False)",
            correctAnswer: "True",
            explanation: "True. 'Cousin' is completely gender-neutral in English.",
            urduExplanation: "Ø¯Ø±Ø³ØªÛ” Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº 'cousin' Ù„Ú‘Ú©Û’ Ø§ÙˆØ± Ù„Ú‘Ú©ÛŒ Ø¯ÙˆÙ†ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u4-l2-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u4-l2-1",
            type: "mcq",
            skillTag: "family",
            prompt: "What is your aunt's daughter to you?",
            options: [
              { id: "opt-1", text: "niece" },
              { id: "opt-2", text: "sister" },
              { id: "opt-3", text: "cousin" },
              { id: "opt-4", text: "daughter" }
            ],
            correctOptionId: "opt-3",
            explanation: "The child of your aunt or uncle is always your cousin.",
            urduExplanation: "Ú†Ú†ÛŒØŒ Ù¾ÚÚ¾ÙˆÙ¾ÚÚ¾ÛŒ ÛŒØ§ Ø®Ø§Ù„Û  Ú©ÛŒ Ø¨ÛŒÙ¹ÛŒ Ø¢Ù¾ Ú©ÛŒ 'cousin' Û ÙˆØªÛŒ Û Û’Û”"
          },
          {
            id: "qz-a1-u4-l2-2",
            type: "mcq",
            skillTag: "family",
            prompt: "Which term is NOT used in standard English?",
            options: [
              { id: "opt-1", text: "my sibling" },
              { id: "opt-2", text: "my cousin" },
              { id: "opt-3", text: "my parents" },
              { id: "opt-4", text: "my cousin sister" }
            ],
            correctOptionId: "opt-4",
            explanation: "'Cousin sister' is non-standard; in standard English, use 'my cousin'.",
            urduExplanation: "'cousin sister' Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº ØºÙ„Ø· Ù…Ø§Ù†Ø§ Ø¬Ø§ØªØ§ Û Û’ØŒ ØµØ±Ù  'cousin' Ú©Û ÛŒÚºÛ”"
          },
          {
            id: "qz-a1-u4-l2-3",
            type: "mcq",
            skillTag: "family",
            prompt: "What do you call your male child?",
            options: [
              { id: "opt-1", text: "son" },
              { id: "opt-2", text: "nephew" },
              { id: "opt-3", text: "brother" },
              { id: "opt-4", text: "uncle" }
            ],
            correctOptionId: "opt-1",
            explanation: "A male child of parents is their son.",
            urduExplanation: "Ù†Ø± Ø§ÙˆÙ„Ø§Ø¯ Ú©Ùˆ 'son' (Ø¨ÛŒÙ¹Ø§) Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "qz-a1-u4-l2-4",
            type: "mcq",
            skillTag: "family",
            prompt: "Complete the sentence: 'She has two sons and one _____.'",
            options: [
              { id: "opt-1", text: "aunt" },
              { id: "opt-2", text: "daughter" },
              { id: "opt-3", text: "mother" },
              { id: "opt-4", text: "niece" }
            ],
            correctOptionId: "opt-2",
            explanation: "'Sons and daughter' form natural offspring pairs.",
            urduExplanation: "Ø¨ÛŒÙ¹ÙˆÚº Ú©Û’ Ø³Ø§ØªÚ¾ Ø§ÙˆÙ„Ø§Ø¯ Ù…ÛŒÚº 'daughter' (Ø¨ÛŒÙ¹ÛŒ) Ø¢Ø¦Û’ Ú¯Ø§Û”"
          },
          {
            id: "qz-a1-u4-l2-5",
            type: "mcq",
            skillTag: "family",
            prompt: "What does 'siblings' mean?",
            options: [
              { id: "opt-1", text: "Grandparents" },
              { id: "opt-2", text: "Uncles and aunts" },
              { id: "opt-3", text: "Brothers and sisters" },
              { id: "opt-4", text: "Cousins only" }
            ],
            correctOptionId: "opt-3",
            explanation: "'Siblings' is the collective term for brothers and sisters.",
            urduExplanation: "'siblings' Ø¨Û Ù† Ø¨ÚÚ¾Ø§Ø¦ÛŒÙˆÚº Ú©Ùˆ Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          }
        ]
      },
      {
        id: "sec-a1-u4-l2-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Family vocabulary summary:",
        summaryPoints: [
          "Parents = mother and father.",
          "Children = son (male) and daughter (female).",
          "Siblings = brothers and sisters collectively.",
          "Uncle = any brother of father/mother; Aunt = any sister of father/mother.",
          "Cousin = child of uncle or aunt (never say 'cousin brother/sister')."
        ]
      },
      {
        id: "sec-a1-u4-l2-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Ø®Ø§Ù†Ø¯Ø§Ù†ÛŒ Ø±Ø´ØªÙˆÚº Ú©Û’ Ù„ÛŒÛ’ Ø¨Û Øª Ø²ÛŒØ§Ø¯Û  Ø¨Ø§Ø±ÛŒÚ© Ø§Ù„Ù Ø§Ø¸ Û ÛŒÚº:\n- Ú†Ú†Ø§ØŒ Ù…Ø§Ù…ÙˆÚºØŒ ØªØ§ÛŒØ§ØŒ Ú©Ú¾Ø§Ù„Ùˆ (Ø§Ù„Ú¯ Ø§Ù„Ú¯ Ø±Ø´ØªÛ’)\n- Ù¾Ú¾ÙˆÙ¾Ú¾ÛŒØŒ Ø®Ø§Ù„Û ØŒ Ú†Ú†ÛŒØŒ Ù…Ù…Ø§Ù†ÛŒ (Ø§Ù„Ú¯ Ø§Ù„Ú¯ Ø±Ø´ØªÛ’)\n\n**Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº ÛŒÛ  Ù†Ø¸Ø§Ù… Ø¨Û Øª Ø³Ø§Ø¯Û  Û Û’:**\n- ÙˆØ§Ù„Ø¯ ÛŒØ§ ÙˆØ§Ù„Ø¯Û  Ú©Ø§ Ú©ÙˆØ¦ÛŒ Ø¨Ú¾ÛŒ Ø¨ÚÚ¾Ø§Ø¦ÛŒ: **Uncle**\n- ÙˆØ§Ù„Ø¯ ÛŒØ§ ÙˆØ§Ù„Ø¯Û  Ú©ÛŒ Ú©ÙˆØ¦ÛŒ Ø¨Ú¾ÛŒ Ø¨Û Ù†: **Aunt**\n- Ú†Ú†Ø§ØŒ Ù…Ø§Ù…ÙˆÚºØŒ Ø®Ø§Ù„Û ØŒ Ù¾Ú¾ÙˆÙ¾Ú¾ÛŒ Ú©Ø§ Ú©ÙˆØ¦ÛŒ Ø¨Ú¾ÛŒ Ø¨Ú†Û  (Ù„Ú‘Ú©Ø§ ÛŒØ§ Ù„Ú‘Ú©ÛŒ): **Cousin**\n\n**Ø®Ø§Øµ Û Ø¯Ø§ÛŒØª:** Ø§Ø±Ø¯Ùˆ Ø¨ÙˆÙ„Ù†Û’ ÙˆØ§Ù„Û’ Ø§Ú©Ø«Ø± 'Cousin brother' ÛŒØ§ 'Cousin sister' Ú©Û ØªÛ’ Û ÛŒÚºØŒ Ø¬Ùˆ Ú©Û  Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº ØºÙ„Ø· Û Û’Û” ØµØ±Ù  **Cousin** Ú©Û ÛŒÚºÛ”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 3: The Possessive 'S (Apostrophe S)
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u4-l3",
    level: "A1",
    unit: "unit-4",
    order: 3,
    title: "The Possessive 'S (Apostrophe S)",
    description: "Show who owns what using apostrophe s ('s) for singular and plural nouns.",
    objectives: [
      "Attach 's to singular nouns to indicate possession (Ali's car, the teacher's desk)",
      "Add only an apostrophe (') to regular plural nouns ending in -s (the students' books)",
      "Attach 's to irregular plural nouns that do not end in -s (the children's toys, women's rights)"
    ],
    estimatedMinutes: 10,
    prerequisites: ["eng-a1-u4-l2"],
    skillTags: ["possessives", "apostrophe", "grammar-basics", "punctuation"],
    vocabularyList: [
      { word: "wife", partOfSpeech: "noun", phonetic: "/waÉªf/", definition: "A married woman considered in relation to her spouse.", urduMeaning: "Ø¨ÛŒÙˆÛŒ / Ø§Û Ù„ÛŒÛ ", exampleSentence: "Tariq's wife is a talented doctor." },
      { word: "husband", partOfSpeech: "noun", phonetic: "/ËˆhÊŒzbÉ™nd/", definition: "A married man considered in relation to his spouse.", urduMeaning: "Ø´ÙˆÛ Ø±", exampleSentence: "Sarah's husband works in civil service." },
      { word: "cousin", partOfSpeech: "noun", phonetic: "/ËˆkÊŒzn/", definition: "A child of one's uncle or aunt.", urduMeaning: "Ú©Ø²Ù† (Ú†Ú†Ø§ Ø²Ø§Ø¯ØŒ Ù…Ø§Ù…ÙˆÚº Ø²Ø§Ø¯)", exampleSentence: "Bilal's cousin arrived from London today." },
      { word: "nephew", partOfSpeech: "noun", phonetic: "/ËˆnefjuË /", definition: "A son of one's brother or sister.", urduMeaning: "Ø¨Ú¾ØªÛŒØ¬Ø§ / Ø¨Ú¾Ø§Ù†Ø¬Ø§", exampleSentence: "My nephew loves playing cricket." },
      { word: "niece", partOfSpeech: "noun", phonetic: "/niË s/", definition: "A daughter of one's brother or sister.", urduMeaning: "Ø¨Ú¾ØªÛŒØ¬ÛŒ / Ø¨Ú¾Ø§Ù†Ø¬ÛŒ", exampleSentence: "Her niece is five years old." },
      { word: "boss", partOfSpeech: "noun", phonetic: "/bÉ’s/", definition: "A person in charge of an employee or organization.", urduMeaning: "Ø¨Ø§Ø³ / Ø§Ù Ø³Ø±", exampleSentence: "The boss's office is on the third floor." },
      { word: "neighbour", partOfSpeech: "noun", phonetic: "/ËˆneÉªbÉ™r/", definition: "A person living next door to or very near to the speaker.", urduMeaning: "Û Ù…Ø³Ø§ÛŒÛ ", exampleSentence: "Our neighbour's garden is full of roses." },
      { word: "colleague", partOfSpeech: "noun", phonetic: "/ËˆkÉ’liË É¡/", definition: "A person with whom one works in a profession or business.", urduMeaning: "Û Ù… Ù¾ÛŒØ´Û  Ø³Ø§ØªÚ¾ÛŒ", exampleSentence: "She attended her colleague's wedding." },
      { word: "manager", partOfSpeech: "noun", phonetic: "/ËˆmÃ¦nÉªdÊ’É™r/", definition: "A person responsible for controlling or administering an organization or group of staff.", urduMeaning: "Ù…ÛŒÙ†ÛŒØ¬Ø± / Ù…Ù†ØªØ¸Ù…", exampleSentence: "The manager's signature is required here." },
      { word: "partner", partOfSpeech: "noun", phonetic: "/ËˆpÉ‘Ë tnÉ™r/", definition: "Either of a pair of people engaged in business or a shared activity.", urduMeaning: "Ø´Ø±Ø§Ú©Øª Ø¯Ø§Ø± / Ø³Ø§ØªÚ¾ÛŒ", exampleSentence: "His business partner's idea was brilliant." }
    ],
    sections: [
      {
        id: "sec-a1-u4-l3-1",
        type: "explain",
        title: "Rules for Possessive Apostrophe S",
        content: "To show that something belongs to a person or animal, English adds an **apostrophe + s ('s)**.\n\n### The Three Rules of Possessive S\n1. **Singular nouns**: Add **'s** (*Ali's book*, *the teacher's desk*, *the cat's tail*).\n2. **Regular plural nouns ending in -s**: Add **only an apostrophe (')** after the s (*the students' exam results*, *the teachers' lounge*).\n3. **Irregular plural nouns NOT ending in -s**: Add **'s** (*the children's room*, *the men's suits*, *the people's choice*).",
        tables: [
          {
            title: "Possessive Apostrophe Matrix",
            headers: ["Noun Type", "Rule", "Singular / Plural Example", "Pronunciation"],
            rows: [
              ["Singular Noun", "Add 's", "Ali's laptop / Sarah's car", "Sound: /z/ or /s/"],
              ["Regular Plural (-s)", "Add only '", "The boys' school / The students' books", "No extra syllable added"],
              ["Irregular Plural (no -s)", "Add 's", "The children's toys / Women's hospital", "Regular /z/ sound added"]
            ]
          },
          {
            title: "Contraction 's vs. Possessive 's",
            headers: ["Sentence", "'s Meaning", "Full Explanation", "Urdu Translation"],
            rows: [
              ["Ali's car is new.", "Possessive (belonging to Ali)", "The car belonging to Ali", "Ø¹Ù„ÛŒ Ú©ÛŒ Ú¯Ø§Ú‘ÛŒ Ù†Ø¦ÛŒ Û Û’Û”"],
              ["Ali's a student.", "Contraction of 'is'", "Ali is a student", "Ø¹Ù„ÛŒ Ø§ÛŒÚ© Ø·Ø§Ù„Ø¨ Ø¹Ù„Ù… Û Û’Û”"],
              ["It's hot today.", "Contraction of 'It is'", "It is hot today", "Ø¢Ø¬ Ú¯Ø±Ù…ÛŒ Û Û’Û”"],
              ["The cat licked its paw.", "Possessive pronoun (NO apostrophe!)", "Belonging to the cat", "Ø¨Ù„ÛŒ Ù†Û’ Ø§Ù¾Ù†Ø§ Ù¾Ù†Ø¬Û  Ú†Ø§Ù¹Ø§Û”"]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Its vs. It's",
            text: "**It's** with an apostrophe ALWAYS means *It is* or *It has*. The possessive pronoun **its** NEVER has an apostrophe (*The dog wagged **its** tail*)."
          },
          {
            type: "warning",
            title: "Plural vs Possessive",
            text: "Do NOT use an apostrophe to make a word plural! Say *two dogs* (plural), NOT *two dog's*."
          }
        ]
      },
      {
        id: "sec-a1-u4-l3-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "Ali's father is a respected surgeon in the city hospital.", phonetic: "/ËˆÃ¦liz ËˆfÉ‘Ë Ã°É™r Éªz É™ rÉªËˆspektÉªd ËˆsÉœË dÊ’É™n Éªn Ã°É™ ËˆsÉªti ËˆhÉ’spÉªtl/", urdu: "Ø¹Ù„ÛŒ Ú©Û’ ÙˆØ§Ù„Ø¯ Ø´Û Ø±ÛŒ Û Ø³Ù¾ØªØ§Ù„ Ù…ÛŒÚº Ø§ÛŒÚ© Ù‚Ø§Ø¨Ù„Ù  Ø§Ø­ØªØ±Ø§Ù… Ø¬Ø±Ø§Ø­ Û ÛŒÚºÛ”", audioText: "Ali's father is a respected surgeon in the city hospital." },
          { english: "The students' examination results were published online.", phonetic: "/Ã°É™ ËˆstjuË dÉ™nts ÉªÉ¡ËŒzÃ¦mÉªËˆneÉªÊƒn rÉªËˆzÊŒlts wÉœË  ËˆpÊŒblÉªÊƒt ËˆÉ’nlaÉªn/", urdu: "Ø·Ù„Ø¨Ø§ Ú©Û’ Ø§Ù…ØªØ­Ø§Ù† Ú©Û’ Ù†ØªØ§Ø¦Ø¬ Ø¢Ù† Ù„Ø§Ø¦Ù† Ø¬Ø§Ø±ÛŒ Ú©ÛŒÛ’ Ú¯Ø¦Û’Û”", audioText: "The students' examination results were published online." },
          { english: "The children's playground is safe and well maintained.", phonetic: "/Ã°É™ ËˆtÊƒÉªldrÉ™nz ËˆpleÉªÉ¡raÊŠnd Éªz seÉªf Ã¦nd wel meÉªnËˆteÉªnd/", urdu: "Ø¨Ú†ÙˆÚº Ú©Ø§ Ú©Ú¾ÛŒÙ„ Ú©Ø§ Ù…ÛŒØ¯Ø§Ù† Ù…Ø­Ù ÙˆØ¸ Ø§ÙˆØ± Ø¨Û ØªØ±ÛŒÙ† Ø­Ø§Ù„Øª Ù…ÛŒÚº Û Û’Û”", audioText: "The children's playground is safe and well maintained." },
          { english: "Sarah's new laptop has a very long battery life.", phonetic: "/ËˆseÉ™rÉ™z njuË  ËˆlÃ¦ptÉ’p hÃ¦z É™ Ëˆveri lÉ’Å‹ ËˆbÃ¦tri laÉªf/", urdu: "Ø³Ø§Ø±Û  Ú©Û’ Ù†Ø¦Û’ Ù„ÛŒÙ¾ Ù¹Ø§Ù¾ Ú©ÛŒ Ø¨ÛŒÙ¹Ø±ÛŒ Ø¨Û Øª Ø²ÛŒØ§Ø¯Û  Ú†Ù„ØªÛŒ Û Û’Û”", audioText: "Sarah's new laptop has a very long battery life." },
          { english: "My brother's car needs a thorough wash today.", phonetic: "/maÉª ËˆbrÊŒÃ°É™rz kÉ‘Ë r niË dz É™ ËˆÎ¸ÊŒrÉ™ wÉ’Êƒ tÉ™ËˆdeÉª/", urdu: "Ù…ÛŒØ±Û’ Ø¨ÚÚ¾Ø§Ø¦ÛŒ Ú©ÛŒ Ú¯Ø§Ú‘ÛŒ Ú©Ùˆ Ø¢Ø¬ Ø§Ú†Ú¾ÛŒ Ø·Ø±Ø­ Ø¯Ú¾ÙˆÙ†Û’ Ú©ÛŒ Ø¶Ø±ÙˆØ±Øª Û Û’Û”", audioText: "My brother's car needs a thorough wash today." },
          { english: "We visited our neighbour's beautiful rose garden.", phonetic: "/wiË  ËˆvÉªzÉªtÉªd ËˆaÊŠÉ™r ËˆneÉªbÉ™rz ËˆbjuË tÉªfl rÉ™ÊŠz ËˆÉ¡É‘Ë dn/", urdu: "Û Ù… Ù†Û’ Ø§Ù¾Ù†Û’ Û Ù…Ø³Ø§Ø¦Û’ Ú©Û’ Ø®ÙˆØ¨ØµÙˆØ±Øª Ú¯Ù„Ø§Ø¨ Ú©Û’ Ø¨Ø§Øº Ú©ÛŒ Ø³ÛŒØ± Ú©ÛŒÛ”", audioText: "We visited our neighbour's beautiful rose garden." },
          { english: "The doctor examined the patient's sore throat.", phonetic: "/Ã°É™ ËˆdÉ’ktÉ™r ÉªÉ¡ËˆzÃ¦mÉªnd Ã°É™ ËˆpeÉªÊƒnts sÉ”Ë r Î¸rÉ™ÊŠt/", urdu: "ÚˆØ§Ú©Ù¹Ø± Ù†Û’ Ù…Ø±ÛŒØ¶ Ú©Û’ Ø¯Ø±Ø¯ Ú©Ø±ØªÛ’ Û ÙˆØ¦Û’ Ú¯Ù„Û’ Ú©Ø§ Ù…Ø¹Ø§Ø¦Ù†Û  Ú©ÛŒØ§Û”", audioText: "The doctor examined the patient's sore throat." },
          { english: "The company's new office is in Blue Area, Islamabad.", phonetic: "/Ã°É™ ËˆkÊŒmpÉ™niz njuË  ËˆÉ’fÉªs Éªz Éªn bluË  ËˆeÉ™riÉ™ ÉªsËˆlÉ‘Ë mÉ™bÉ‘Ë d/", urdu: "Ú©Ù…Ù¾Ù†ÛŒ Ú©Ø§ Ù†ÛŒØ§ Ø¯Ù ØªØ± Ø¨Ù„Ùˆ Ø§ÛŒØ±ÛŒØ§ØŒ Ø§Ø³Ù„Ø§Ù… Ø¢Ø¨Ø§Ø¯ Ù…ÛŒÚº Û Û’Û”", audioText: "The company's new office is in Blue Area, Islamabad." }
        ]
      },
      {
        id: "sec-a1-u4-l3-3",
        type: "dialogue",
        title: "Whose Bag Is This?",
        dialogue: [
          { speaker: "Zubair", avatar: "Z", english: "Excuse me, whose leather jacket is this on the sofa?", urdu: "Ù…Ø¹Ø§Ù  Ú©ÛŒØ¬Ø¦Û’ Ú¯Ø§ØŒ ØµÙˆÙ Û’ Ù¾Ø± ÛŒÛ  Ú†Ù…Ú‘Û’ Ú©ÛŒ Ø¬ÛŒÚ©Ù¹ Ú©Ø³ Ú©ÛŒ Û Û’ØŸ", audioText: "Excuse me, whose leather jacket is this on the sofa?" },
          { speaker: "Hamza", avatar: "H", english: "That is Hamza's jacket. He left it here after our study session.", urdu: "ÙˆÛ  Ø­Ù…Ø²Û  Ú©ÛŒ Ø¬ÛŒÚ©Ù¹ Û Û’Û” ÙˆÛ  Ù¾Ú‘Ú¾Ø§Ø¦ÛŒ Ú©Û’ Ø¨Ø¹Ø¯ ÛŒÛ Ø§Úº Ø¨Ú¾ÙˆÙ„ Ú¯ÛŒØ§ ØªÚ¾Ø§Û”", audioText: "That is Hamza's jacket. He left it here after our study session." },
          { speaker: "Zubair", avatar: "Z", english: "And are these the teacher's whiteboard markers?", urdu: "Ø§ÙˆØ± Ú©ÛŒØ§ ÛŒÛ  Ø§Ø³ØªØ§Ø¯ Ú©Û’ ÙˆØ§Ø¦Ù¹ Ø¨ÙˆØ±Úˆ Ù…Ø§Ø±Ú©Ø±Ø² Û ÛŒÚºØŸ", audioText: "And are these the teacher's whiteboard markers?" },
          { speaker: "Hamza", avatar: "H", english: "Yes, please put them on the teacher's desk.", urdu: "Ø¬ÛŒ Û Ø§ÚºØŒ Ø¨Ø±Ø§Û  Ú©Ø±Ù… Ø§Ù†Û ÛŒÚº Ø§Ø³ØªØ§Ø¯ Ú©ÛŒ Ù…ÛŒØ² Ù¾Ø± Ø±Ú©Ú¾ Ø¯ÛŒÚºÛ”", audioText: "Yes, please put them on the teacher's desk." }
        ]
      },
      {
        id: "sec-a1-u4-l3-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u4-l3-1",
            type: "mcq",
            skillTag: "possessives",
            prompt: "Choose the correct phrase for 'the car belonging to Ali':",
            options: [
              { id: "opt-1", text: "Ali's car" },
              { id: "opt-2", text: "Alis' car" },
              { id: "opt-3", text: "Ali car" },
              { id: "opt-4", text: "the car of to Ali" }
            ],
            correctOptionId: "opt-1",
            explanation: "Singular proper nouns add 's to express possession: 'Ali's car'.",
            urduExplanation: "ÙˆØ§Ø­Ø¯ Ù†Ø§Ù… Ú©Û’ Ø³Ø§ØªÚ¾ 's Ù„Ú¯ØªØ§ Û Û’: 'Ali's car'Û”"
          },
          {
            id: "ex-a1-u4-l3-2",
            type: "mcq",
            skillTag: "possessives",
            prompt: "Choose the correct phrase for 'the room belonging to several boys':",
            options: [
              { id: "opt-1", text: "the boy's room" },
              { id: "opt-2", text: "the boys' room" },
              { id: "opt-3", text: "the boys's room" },
              { id: "opt-4", text: "the boies room" }
            ],
            correctOptionId: "opt-2",
            explanation: "Regular plural nouns ending in -s add only an apostrophe: 'the boys' room'.",
            urduExplanation: "Ø¬Ù…Ø¹ Ø§Ø³Ù… Ø¬Ùˆ s Ù¾Ø± Ø®ØªÙ… Û Ùˆ Ø§Ø³ Ú©Û’ Ø¨Ø¹Ø¯ ØµØ±Ù  apostrophe (') Ù„Ú¯ØªÛŒ Û Û’: 'boys' room'Û”"
          },
          {
            id: "ex-a1-u4-l3-3",
            type: "fill_blank",
            skillTag: "possessives",
            prompt: "Complete with the possessive form: 'The _____ (children) toys are scattered across the floor.'",
            correctAnswer: "children's",
            explanation: "'Children' is an irregular plural not ending in -s, so it takes 's: 'children's'.",
            urduExplanation: "'children' s Ù¾Ø± Ø®ØªÙ… Ù†Û ÛŒÚº Û ÙˆØªØ§ØŒ Ø§Ø³ Ù„ÛŒÛ’ 's Ù„Ú¯Û’ Ú¯Ø§: 'children's'Û”"
          },
          {
            id: "ex-a1-u4-l3-4",
            type: "fill_blank",
            skillTag: "possessives",
            prompt: "Complete with the possessive form of 'Sarah': 'This is _____ new mobile phone.'",
            correctAnswer: "Sarah's",
            explanation: "Singular noun 'Sarah' takes 's: 'Sarah's'.",
            urduExplanation: "'Sarah' Ú©Û’ Ø³Ø§ØªÚ¾ 's Ù„Ú¯ Ú©Ø± 'Sarah's' Ø¨Ù†ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u4-l3-5",
            type: "order_sentence",
            skillTag: "possessives",
            prompt: "Rearrange the words to form a correct statement:",
            sentenceTokens: ["My", "brother's", "car", "is", "parked", "outside", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Possessive noun phrase (My brother's car) + verb (is parked) + location adverb (outside).",
            urduExplanation: "My brother's car is parked outside."
          },
          {
            id: "ex-a1-u4-l3-6",
            type: "order_sentence",
            skillTag: "possessives",
            prompt: "Rearrange the words to form a correct statement:",
            sentenceTokens: ["The", "teacher's", "desk", "is", "very", "neat", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Subject (The teacher's desk) + verb (is) + predicate adjective (very neat).",
            urduExplanation: "The teacher's desk is very neat."
          },
          {
            id: "ex-a1-u4-l3-7",
            type: "match_pairs",
            skillTag: "possessives",
            prompt: "Match the phrase with its correct possessive construction:",
            pairs: [
              { left: "The book of the student", right: "The student's book" },
              { left: "The books of the students", right: "The students' books" },
              { left: "The toys of the children", right: "The children's toys" },
              { left: "The house of Tariq", right: "Tariq's house" }
            ],
            explanation: "Prepositional 'of' phrases matched to natural possessive forms.",
            urduExplanation: "Ù…Ù„Ú©ÛŒØª Ú©Û’ ØµØ­ÛŒØ­ Ø¬ÙˆÚ‘Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u4-l3-8",
            type: "error_correction",
            skillTag: "possessives",
            prompt: "Find and correct the mistake: 'I saw two dog's in the park.'",
            correctAnswer: "I saw two dogs in the park.",
            explanation: "A simple plural never takes an apostrophe. Say 'two dogs'.",
            urduExplanation: "Ø¬Ù…Ø¹ Ø¨Ù†Ø§Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ apostrophe Ù†Û ÛŒÚº Ù„Ú¯ØªÛŒØŒ 'two dogs' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u4-l3-9",
            type: "error_correction",
            skillTag: "possessives",
            prompt: "Find and correct the mistake: 'The cat licked it's paw.'",
            correctAnswer: "The cat licked its paw.",
            explanation: "The possessive pronoun 'its' does not take an apostrophe ('it's' means 'it is').",
            urduExplanation: "Ù…Ù„Ú©ÛŒØª Ú©Û’ Ù„ÛŒÛ’ 'its' Ø¨ØºÛŒØ± apostrophe Ú©Û’ Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u4-l3-10",
            type: "true_false",
            skillTag: "possessives",
            prompt: "In the sentence 'The students' books are heavy', 'students'' refers to more than one student. (True or False)",
            correctAnswer: "True",
            explanation: "True. An apostrophe after the s (students') indicates plural possessive.",
            urduExplanation: "Ø¯Ø±Ø³ØªÛ” 'students'' Ø§ÛŒÚ© Ø³Û’ Ø²ÛŒØ§Ø¯Û  Ø·Ù„Ø¨Ø§ Ú©ÛŒ Ù…Ù„Ú©ÛŒØª Ø¸Ø§Û Ø± Ú©Ø±ØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u4-l3-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u4-l3-1",
            type: "mcq",
            skillTag: "possessives",
            prompt: "Which sentence shows plural possessive correctly?",
            options: [
              { id: "opt-1", text: "The teachers' lounge is on the second floor." },
              { id: "opt-2", text: "The teacher's lounge have five teachers." },
              { id: "opt-3", text: "The teachers's lounge is clean." },
              { id: "opt-4", text: "The teachers lounge' is empty." }
            ],
            correctOptionId: "opt-1",
            explanation: "Plural noun 'teachers' adds only an apostrophe: 'teachers''.",
            urduExplanation: "Ø¬Ù…Ø¹ Ø§Ø³Ù… 'teachers' Ú©Û’ Ø¨Ø¹Ø¯ ØµØ±Ù  apostrophe Ù„Ú¯Û’ Ú¯ÛŒ: 'teachers''.",
          },
          {
            id: "qz-a1-u4-l3-2",
            type: "mcq",
            skillTag: "possessives",
            prompt: "What is the difference between 'the boy's dog' and 'the boys' dog'?",
            options: [
              { id: "opt-1", text: "The first has two dogs; the second has one" },
              { id: "opt-2", text: "There is no difference in meaning" },
              { id: "opt-3", text: "The first belongs to one boy; the second belongs to multiple boys" },
              { id: "opt-4", text: "The first is in the past tense; the second is present" }
            ],
            correctOptionId: "opt-3",
            explanation: "'Boy's' is singular possessive (one boy); 'boys'' is plural possessive (two or more boys).",
            urduExplanation: "'boy's' Ø§ÛŒÚ© Ù„Ú‘Ú©Û’ Ú©Û’ Ù„ÛŒÛ’ Û Û’ØŒ Ø¬Ø¨Ú©Û  'boys'' Ú©Ø¦ÛŒ Ù„Ú‘Ú©ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ Û Û’Û”"
          },
          {
            id: "qz-a1-u4-l3-3",
            type: "mcq",
            skillTag: "possessives",
            prompt: "What does 'it's' mean with an apostrophe?",
            options: [
              { id: "opt-1", text: "Belonging to it" },
              { id: "opt-2", text: "Plural of it" },
              { id: "opt-3", text: "It is or it has" },
              { id: "opt-4", text: "Negative of it" }
            ],
            correctOptionId: "opt-3",
            explanation: "'It's' is exclusively the contraction of 'it is' or 'it has'.",
            urduExplanation: "'it's' Ú©Ø§ Ù…Ø·Ù„Ø¨ 'it is' ÛŒØ§ 'it has' Û ÙˆØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u4-l3-4",
            type: "mcq",
            skillTag: "possessives",
            prompt: "Select the sentence with INCORRECT apostrophe usage:",
            options: [
              { id: "opt-1", text: "Ahmed's car is white." },
              { id: "opt-2", text: "The children's toys are new." },
              { id: "opt-3", text: "The girls' bags are heavy." },
              { id: "opt-4", text: "I bought three apple's at the bazaar." }
            ],
            correctOptionId: "opt-4",
            explanation: "'three apple's' is incorrect because plurals do not take an apostrophe ('three apples').",
            urduExplanation: "'three apple's' ØºÙ„Ø· Û Û’ØŒ Ø¬Ù…Ø¹ Ú©Û’ Ù„ÛŒÛ’ apostrophe Ù†Û ÛŒÚº Ù„Ú¯ØªÛŒÛ”"
          },
          {
            id: "qz-a1-u4-l3-5",
            type: "mcq",
            skillTag: "possessives",
            prompt: "What is the correct possessive form for 'women'?",
            options: [
              { id: "opt-1", text: "womens'" },
              { id: "opt-2", text: "women's" },
              { id: "opt-3", text: "womens's" },
              { id: "opt-4", text: "womans'" }
            ],
            correctOptionId: "opt-2",
            explanation: "Irregular plurals not ending in -s take 's: 'women's'.",
            urduExplanation: "'women' Ú©Û’ Ø³Ø§ØªÚ¾ 's Ù„Ú¯ØªØ§ Û Û’: 'women's'Û”"
          }
        ]
      },
      {
        id: "sec-a1-u4-l3-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Apostrophe S rules summary:",
        summaryPoints: [
          "Singular nouns add 's (Ali's book, the teacher's pen).",
          "Regular plural nouns ending in -s add only an apostrophe (') (the students' marks).",
          "Irregular plurals without -s add 's (the children's toys, women's college).",
          "Never use an apostrophe for regular plurals (two dogs, NOT two dog's).",
          "Remember: It's = It is; Its = belonging to it."
        ]
      },
      {
        id: "sec-a1-u4-l3-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Ù…Ù„Ú©ÛŒØª Ø¸Ø§Û Ø± Ú©Ø±Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Û Ù… **'Ú©Ø§ / Ú©Û’ / Ú©ÛŒ'** Ø§Ø³ØªØ¹Ù…Ø§Ù„ Ú©Ø±ØªÛ’ Û ÛŒÚº:\n- Ø¹Ù„ÛŒ **Ú©ÛŒ** Ú©ØªØ§Ø¨\n- Ø§Ø³ØªØ§Ø¯ **Ú©ÛŒ** Ù…ÛŒØ²\n- Ø¨Ú†ÙˆÚº **Ú©Û’** Ú©Ú¾Ù„ÙˆÙ†Û’\n\nØ§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº ÛŒÛ ÛŒ Ú©Ø§Ù… **Apostrophe S ('s)** Ú©Ø±ØªØ§ Û Û’:\n- Ali**'s** book\n- the teacher**'s** desk\n- the children**'s** toys\n\n**Ø§Û Ù… Ù Ø±Ù‚:** Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº 'Ú©Ø§ / Ú©ÛŒ' Ø¨Ø¹Ø¯ ÙˆØ§Ù„ÛŒ Ú†ÛŒØ² Ú©Û’ Ù…Ø°Ú©Ø± ÛŒØ§ Ù…Ø¤Ù†Ø« Û ÙˆÙ†Û’ Ø³Û’ Ø¨Ø¯Ù„ØªØ§ Û Û’ (Ø¹Ù„ÛŒ **Ú©Ø§** Ú¯Ú¾Ø± / Ø¹Ù„ÛŒ **Ú©ÛŒ** Ú¯Ø§Ú‘ÛŒ)Û” Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ø§ÛŒØ³Ø§ Ú©ÙˆØ¦ÛŒ Ù Ø±Ù‚ Ù†Û ÛŒÚºØŒ ØµØ±Ù  **'s** Û ÛŒ Ø±Û ØªØ§ Û Û’: Ali's house, Ali's carÛ”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 4: Describing Physical Appearance
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u4-l4",
    level: "A1",
    unit: "unit-4",
    order: 4,
    title: "Describing Physical Appearance",
    description: "Describe height, build, hair style, eye colour, and distinctive facial features accurately.",
    objectives: [
      "Use 'to be' for height, build, and age (He is tall, she is young)",
      "Use 'have/has' for hair, eyes, and facial features (He has dark hair, she has brown eyes)",
      "Avoid mixing 'is' and 'has' when describing people"
    ],
    estimatedMinutes: 12,
    prerequisites: ["eng-a1-u4-l3"],
    skillTags: ["appearance", "adjectives", "have-has", "descriptive-grammar"],
    vocabularyList: [
      { word: "tall", partOfSpeech: "adjective", phonetic: "/tÉ”Ë l/", definition: "Of great or more than average height.", urduMeaning: "Ù„Ù…Ø¨Ø§", exampleSentence: "My brother is very tall and plays basketball." },
      { word: "short", partOfSpeech: "adjective", phonetic: "/ÊƒÉ”Ë t/", definition: "Measuring a small distance from end to end in height.", urduMeaning: "Ú†Ú¾ÙˆÙ¹Ø§ / Ù¾Ø³Øª Ù‚Ø¯", exampleSentence: "She is shorter than her elder sister." },
      { word: "slim", partOfSpeech: "adjective", phonetic: "/slÉªm/", definition: "Gracefully thin; slender.", urduMeaning: "Ø¯Ø¨Ù„Ø§ Ù¾ØªÙ„Ø§ / Ø³Ù…Ø§Ø±Ù¹", exampleSentence: "He maintains a slim build through regular running." },
      { word: "curly", partOfSpeech: "adjective", phonetic: "/ËˆkÉœË li/", definition: "Made of curls or having a wavy or spiral shape.", urduMeaning: "Ú¯Ú¾Ù†Ú¯Ú¾Ø±Ø§Ù„Ø§", exampleSentence: "The little girl has curly brown hair." },
      { word: "straight", partOfSpeech: "adjective", phonetic: "/streÉªt/", definition: "Extending or moving uniformly in one direction only; without a curve.", urduMeaning: "Ø³ÛŒØ¯Ú¾Ø§", exampleSentence: "She has long, straight black hair." },
      { word: "dark", partOfSpeech: "adjective", phonetic: "/dÉ‘Ë k/", definition: "With little or no light; of a deep colour.", urduMeaning: "Ú¯Û Ø±Ø§ / Ú©Ø§Ù„Ø§", exampleSentence: "He has expressive dark eyes." },
      { word: "fair", partOfSpeech: "adjective", phonetic: "/feÉ™r/", definition: "Light, blond, or pale in colour.", urduMeaning: "Ú¯ÙˆØ±Ø§ / Ø±ÙˆØ´Ù†", exampleSentence: "She has a fair complexion." },
      { word: "beard", partOfSpeech: "noun", phonetic: "/bÉªÉ™d/", definition: "A growth of hair on the chin and lower cheeks of a man's face.", urduMeaning: "Ø¯Ø§Ú‘Ú¾ÛŒ", exampleSentence: "My grandfather has a neat white beard." },
      { word: "young", partOfSpeech: "adjective", phonetic: "/jÊŒÅ‹/", definition: "Having lived or existed for only a short time.", urduMeaning: "Ù†ÙˆØ¬ÙˆØ§Ù† / Ú†Ú¾ÙˆÙ¹ÛŒ Ø¹Ù…Ø± Ú©Ø§", exampleSentence: "He is a bright young professional." },
      { word: "elderly", partOfSpeech: "adjective", phonetic: "/ËˆeldÉ™li/", definition: "Of a person, old or aging politely.", urduMeaning: "Ø¨Ø²Ø±Ú¯ / Ù…Ø¹Ù…Ø±", exampleSentence: "We should always respect elderly people." }
    ],
    sections: [
      {
        id: "sec-a1-u4-l4-1",
        type: "explain",
        title: "The Split Rule: 'To Be' vs. 'Have / Has'",
        content: "When describing how someone looks, English makes a strict grammatical division:\n\n### 1. Use 'To Be' (am / is / are) for Overall Body & Age\n- Height: *He **is** tall / short / medium height*.\n- Build: *She **is** slim / athletic*.\n- Age: *They **are** young / elderly*.\n\n### 2. Use 'Have / Has' for Features & Parts\n- Hair: *She **has** long straight hair*.\n- Eyes: *He **has** brown eyes*.\n- Facial features: *He **has** a beard / a moustache*.",
        tables: [
          {
            title: "Appearance Grammar Matrix",
            headers: ["Feature Category", "Correct Verb", "Example Sentence", "Urdu Translation"],
            rows: [
              ["Height", "is / are", "He is tall.", "ÙˆÛ  Ù„Ù…Ø¨Ø§ Û Û’Û”"],
              ["Build", "is / are", "She is slim.", "ÙˆÛ  Ø¯Ø¨Ù„ÛŒ Ù¾ØªÙ„ÛŒ Û Û’Û”"],
              ["Hair", "has / have", "She has curly black hair.", "Ø§Ø³ Ú©Û’ Ú¯Ú¾Ù†Ú¯Ú¾Ø±Ø§Ù„Û’ Ú©Ø§Ù„Û’ Ø¨Ø§Ù„ Û ÛŒÚºÛ”"],
              ["Eyes", "has / have", "He has dark brown eyes.", "Ø§Ø³ Ú©ÛŒ Ú¯Û Ø±ÛŒ Ø¨Ú¾ÙˆØ±ÛŒ Ø¢Ù†Ú©Ú¾ÛŒÚº Û ÛŒÚºÛ”"],
              ["Beard / Moustache", "has / have", "He has a well-trimmed beard.", "Ø§Ø³ Ú©ÛŒ Ø®ÙˆØ¨ØµÙˆØ±Øª Ø¯Ø§Ú‘Ú¾ÛŒ Û Û’Û”"]
            ]
          },
          {
            title: "Common Mistakes to Avoid",
            headers: ["Incorrect Phrasing", "Why It Fails", "Correct English Phrasing"],
            rows: [
              ["He has tall.", "'Tall' is an adjective, not a possession.", "He is tall."],
              ["She is brown hair.", "She is a human, not hair!", "She has brown hair."],
              ["He has a beard on face.", "Redundant phrasing.", "He has a beard."]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Hair Order Rule",
            text: "When describing hair, order is usually: **Length -> Texture -> Colour**: *She has long (length), curly (texture), black (colour) hair*."
          },
          {
            type: "warning",
            title: "Hair is Uncountable",
            text: "In English, the hair on someone's head is uncountable! Say: 'She has dark **hair**' (NEVER 'She has dark hairs')."
          }
        ]
      },
      {
        id: "sec-a1-u4-l4-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "My elder brother is tall and has short curly hair.", phonetic: "/maÉª ËˆeldÉ™r ËˆbrÊŒÃ°É™r Éªz tÉ”Ë l Ã¦nd hÃ¦z ÊƒÉ”Ë t ËˆkÉœË li heÉ™r/", urdu: "Ù…ÛŒØ±Ø§ Ø¨Ú‘Ø§ Ø¨ÚÚ¾Ø§Ø¦ÛŒ Ù„Ù…Ø¨Ø§ Û Û’ Ø§ÙˆØ± Ø§Ø³ Ú©Û’ Ú†Ú¾ÙˆÙ¹Û’ Ú¯Ú¾Ù†Ú¯Ú¾Ø±Ø§Ù„Û’ Ø¨Ø§Ù„ Û ÛŒÚºÛ”", audioText: "My elder brother is tall and has short curly hair." },
          { english: "She is a slim young woman with bright hazel eyes.", phonetic: "/ÊƒiË  Éªz É™ slÉªm jÊŒÅ‹ ËˆwÊŠmÉ™n wÉªÃ° braÉªt ËˆheÉªzl aÉªz/", urdu: "ÙˆÛ  Ø§ÛŒÚ© Ø³Ù…Ø§Ø±Ù¹ Ù†ÙˆØ¬ÙˆØ§Ù† Ø®Ø§ØªÙˆÙ† Û Û’ Ø¬Ø³ Ú©ÛŒ Ú†Ù…Ú©Ø¯Ø§Ø± Ø´Û Ø¯ÛŒ Ø¢Ù†Ú©Ú¾ÛŒÚº Û ÛŒÚºÛ”", audioText: "She is a slim young woman with bright hazel eyes." },
          { english: "Our grandfather is elderly and has a dignified white beard.", phonetic: "/ËˆaÊŠÉ™r ËˆÉ¡rÃ¦nfÉ‘Ë Ã°É™r Éªz ËˆeldÉ™li Ã¦nd hÃ¦z É™ ËˆdÉªÉ¡nÉªfaÉªd waÉªt bÉªÉ™d/", urdu: "Û Ù…Ø§Ø±Û’ Ø¯Ø§Ø¯Ø§ Ø¨Ø²Ø±Ú¯ Û ÛŒÚº Ø§ÙˆØ± Ø§Ù† Ú©ÛŒ Ø§ÛŒÚ© Ù¾Ø±ÙˆÙ‚Ø§Ø± Ø³Ù ÛŒØ¯ Ø¯Ø§Ú‘Ú¾ÛŒ Û Û’Û”", audioText: "Our grandfather is elderly and has a dignified white beard." },
          { english: "Tariq is medium height and wears modern glasses.", phonetic: "/ËˆtÉ‘Ë rÉªk Éªz ËˆmiË diÉ™m haÉªt Ã¦nd weÉ™rz ËˆmÉ’dn ËˆÉ¡lÉ‘Ë sÉªz/", urdu: "Ø·Ø§Ø±Ù‚ Ø¯Ø±Ù…ÛŒØ§Ù†Û’ Ù‚Ø¯ Ú©Ø§ Û Û’ Ø§ÙˆØ± Ø¬Ø¯ÛŒØ¯ Ø¹ÛŒÙ†Ú© Ù¾Û Ù†ØªØ§ Û Û’Û”", audioText: "Tariq is medium height and wears modern glasses." },
          { english: "She has long, straight black hair that reaches her shoulders.", phonetic: "/ÊƒiË  hÃ¦z lÉ’Å‹ streÉªt blÃ¦k heÉ™r Ã°Ã¦t riË tÊƒÉªz hÉœË r ËˆÊƒÉ™ÊŠldÉ™rz/", urdu: "Ø§Ø³ Ú©Û’ Ù„Ù…Ø¨Û’ØŒ Ø³ÛŒØ¯Ú¾Û’ Ú©Ø§Ù„Û’ Ø¨Ø§Ù„ Û ÛŒÚº Ø¬Ùˆ Ú©Ù†Ø¯Ú¾ÙˆÚº ØªÚ© Ø¢ØªÛ’ Û ÛŒÚºÛ”", audioText: "She has long, straight black hair that reaches her shoulders." },
          { english: "Both twins have fair skin and deep blue eyes.", phonetic: "/boÊŠÎ¸ twÉªnz hÃ¦v feÉ™r skÉªn Ã¦nd diË p bluË  aÉªz/", urdu: "Ø¯ÙˆÙ†ÙˆÚº Ø¬Ú‘ÙˆØ§Úº Ø¨Ú†ÙˆÚº Ú©Ø§ Ø±Ù†Ú¯ Ú¯ÙˆØ±Ø§ Ø§ÙˆØ± Ø¢Ù†Ú©Ú¾ÛŒÚº Ú¯Û Ø±ÛŒ Ù†ÛŒÙ„ÛŒ Û ÛŒÚºÛ”", audioText: "Both twins have fair skin and deep blue eyes." },
          { english: "He is short, but he is very athletic and energetic.", phonetic: "/hiË  Éªz ÊƒÉ”Ë t bÊŒt hiË  Éªz Ëˆveri Ã¦Î¸ËˆletÉªk Ã¦nd ËŒenÉ™ËˆdÊ’etÉªk/", urdu: "ÙˆÛ  Ú†Ú¾ÙˆÙ¹Û’ Ù‚Ø¯ Ú©Ø§ Û Û’ Ù„ÛŒÚ©Ù† Ø¨Û Øª Ú†Ø³Øª Ø§ÙˆØ± Ù¾Ø±Ø¬ÙˆØ´ Û Û’Û”", audioText: "He is short, but he is very athletic and energetic." },
          { english: "Does your friend have a moustache or a clean-shaven face?", phonetic: "/dÊŒz jÉ”Ë r frend hÃ¦v É™ mÉ™ËˆstÉ‘Ë Êƒ É”Ë r É™ kliË n ËˆÊƒeÉªvn feÉªs/", urdu: "Ú©ÛŒØ§ Ø¢Ù¾ Ú©Û’ Ø¯ÙˆØ³Øª Ú©ÛŒ Ù…ÙˆÙ†Ú†Ú¾ÛŒÚº Û ÛŒÚº ÛŒØ§ Ø§Ø³ Ú©Ø§ Ú†Û Ø±Û  Ú©Ù„ÛŒÙ† Ø´ÛŒÙˆ Û Û’ØŸ", audioText: "Does your friend have a moustache or a clean-shaven face?" }
        ]
      },
      {
        id: "sec-a1-u4-l4-3",
        type: "dialogue",
        title: "Meeting Someone at the Airport",
        dialogue: [
          { speaker: "Rehan", avatar: "R", english: "I am at the arrival terminal, Daniyal. How will I recognize your uncle?", urdu: "Ø¯Ø§Ù†ÛŒØ§Ù„ØŒ Ù…ÛŒÚº Ø§Ø±Ø§Ø¦ÛŒÙˆÙ„ Ù¹Ø±Ù…Ù†Ù„ Ù¾Ø± Û ÙˆÚºÛ” Ù…ÛŒÚº Ø¢Ù¾ Ú©Û’ Ú†Ú†Ø§ Ú©Ùˆ Ú©ÛŒØ³Û’ Ù¾Û Ú†Ø§Ù†ÙˆÚº Ú¯Ø§ØŸ", audioText: "I am at the arrival terminal, Daniyal. How will I recognize your uncle?" },
          { speaker: "Daniyal", avatar: "D", english: "He is tall and elderly. He has a white beard and wears black glasses.", urdu: "ÙˆÛ  Ù„Ù…Ø¨Û’ Ø§ÙˆØ± Ø¨Ø²Ø±Ú¯ Û ÛŒÚºÛ” Ø§Ù† Ú©ÛŒ Ø³Ù ÛŒØ¯ Ø¯Ø§Ú‘Ú¾ÛŒ Û Û’ Ø§ÙˆØ± ÙˆÛ  Ú©Ø§Ù„ÛŒ Ø¹ÛŒÙ†Ú© Ù¾Û Ù†ØªÛ’ Û ÛŒÚºÛ”", audioText: "He is tall and elderly. He has a white beard and wears black glasses." },
          { speaker: "Rehan", avatar: "R", english: "What is he wearing?", urdu: "Ø§Ù†Û ÙˆÚº Ù†Û’ Ú©ÙˆÙ† Ø³Ø§ Ù„Ø¨Ø§Ø³ Ù¾Û Ù†Ø§ Û ÙˆØ§ Û Û’ØŸ", audioText: "What is he wearing?" },
          { speaker: "Daniyal", avatar: "D", english: "He is wearing a grey shalwar kameez and carrying a brown suitcase.", urdu: "Ø§Ù†Û ÙˆÚº Ù†Û’ Ø³Ù„ÛŒÙ¹ÛŒ Ø´Ù„ÙˆØ§Ø± Ù‚Ù…ÛŒØµ Ù¾Û Ù†ÛŒ Û Û’ Ø§ÙˆØ± Ø¨Ú¾ÙˆØ±Ø§ Ø³ÙˆÙ¹ Ú©ÛŒØ³ Ø§Ù¹Ú¾Ø§ÛŒØ§ Û ÙˆØ§ Û Û’Û”", audioText: "He is wearing a grey shalwar kameez and carrying a brown suitcase." }
        ]
      },
      {
        id: "sec-a1-u4-l4-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u4-l4-1",
            type: "mcq",
            skillTag: "appearance",
            prompt: "Choose the correct sentence to describe height:",
            options: [
              { id: "opt-1", text: "He has tall." },
              { id: "opt-2", text: "He does tall." },
              { id: "opt-3", text: "He is tall." },
              { id: "opt-4", text: "He tall." }
            ],
            correctOptionId: "opt-3",
            explanation: "Height is a state described with the verb 'to be': 'He is tall'.",
            urduExplanation: "Ù‚Ø¯ Ú©Û’ Ù„ÛŒÛ’ verb 'to be' (is) Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’: 'He is tall'Û”"
          },
          {
            id: "ex-a1-u4-l4-2",
            type: "mcq",
            skillTag: "appearance",
            prompt: "Choose the correct sentence to describe eyes:",
            options: [
              { id: "opt-1", text: "She is blue eyes." },
              { id: "opt-2", text: "She are blue eyes." },
              { id: "opt-3", text: "She haves blue eyes." },
              { id: "opt-4", text: "She has blue eyes." }
            ],
            correctOptionId: "opt-4",
            explanation: "Facial features belong to a person and take 'has': 'She has blue eyes'.",
            urduExplanation: "Ø¢Ù†Ú©Ú¾ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ 'has' Ø¢Ø¦Û’ Ú¯Ø§: 'She has blue eyes'Û”"
          },
          {
            id: "ex-a1-u4-l4-3",
            type: "fill_blank",
            skillTag: "appearance",
            prompt: "Complete with 'is' or 'has': 'My grandfather _____ a neat white beard.'",
            correctAnswer: "has",
            explanation: "A beard is a feature someone possesses, requiring 'has'.",
            urduExplanation: "Ø¯Ø§Ú‘Ú¾ÛŒ Ú©Û’ Ù„ÛŒÛ’ 'has' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u4-l4-4",
            type: "fill_blank",
            skillTag: "appearance",
            prompt: "Complete with 'is' or 'has': 'She _____ slim and energetic.'",
            correctAnswer: "is",
            explanation: "'Slim' is an adjective describing overall build with verb 'to be' ('is').",
            urduExplanation: "Ø¬Ø³Ø§Ù…Øª (slim) Ú©Û’ Ù„ÛŒÛ’ 'is' Ù„Ú¯ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u4-l4-5",
            type: "order_sentence",
            skillTag: "appearance",
            prompt: "Rearrange the words to form a correct description:",
            sentenceTokens: ["She", "has", "long", "curly", "black", "hair", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Subject (She) + verb (has) + length (long) + texture (curly) + colour (black) + hair.",
            urduExplanation: "She has long curly black hair."
          },
          {
            id: "ex-a1-u4-l4-6",
            type: "order_sentence",
            skillTag: "appearance",
            prompt: "Rearrange the words into a correct sentence:",
            sentenceTokens: ["He", "is", "tall", "with", "dark", "eyes", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Subject (He) + verb (is) + height (tall) + prepositional feature (with dark eyes).",
            urduExplanation: "He is tall with dark eyes."
          },
          {
            id: "ex-a1-u4-l4-7",
            type: "match_pairs",
            skillTag: "appearance",
            prompt: "Match the feature with the appropriate verb:",
            pairs: [
              { left: "tall", right: "is" },
              { left: "brown eyes", right: "has" },
              { left: "curly hair", right: "has" },
              { left: "slim", right: "is" }
            ],
            explanation: "Correctly matched between is (adjectives of build) and has (features).",
            urduExplanation: "ÙˆØµÙ  Ú©Ùˆ 'is' ÛŒØ§ 'has' Ø³Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u4-l4-8",
            type: "error_correction",
            skillTag: "appearance",
            prompt: "Find and correct the mistake: 'She has long straight hairs.'",
            correctAnswer: "She has long straight hair.",
            explanation: "Hair on someone's head is uncountable; say 'hair', never 'hairs'.",
            urduExplanation: "Ø³Ø± Ú©Û’ Ø¨Ø§Ù„ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ 'hair' (uncountable) Ø¢ØªØ§ Û Û’ØŒ 'hairs' ØºÙ„Ø· Û Û’Û”"
          },
          {
            id: "ex-a1-u4-l4-9",
            type: "error_correction",
            skillTag: "appearance",
            prompt: "Find and correct the mistake: 'He is a beard.'",
            correctAnswer: "He has a beard.",
            explanation: "A person possesses a beard; use 'has', not 'is'.",
            urduExplanation: "Ø¯Ø§Ú‘Ú¾ÛŒ Ú©Û’ Ù„ÛŒÛ’ 'He has a beard' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u4-l4-10",
            type: "true_false",
            skillTag: "appearance",
            prompt: "It is correct to say 'He is short and has brown eyes'. (True or False)",
            correctAnswer: "True",
            explanation: "True. 'Is' correctly describes height and 'has' correctly describes eye colour.",
            urduExplanation: "Ø¯Ø±Ø³ØªÛ” Ù‚Ø¯ Ú©Û’ Ù„ÛŒÛ’ 'is' Ø§ÙˆØ± Ø¢Ù†Ú©Ú¾ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ 'has' Ø¨Ø§Ù„Ú©Ù„ Ø¯Ø±Ø³Øª Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u4-l4-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u4-l4-1",
            type: "mcq",
            skillTag: "appearance",
            prompt: "Which sentence describes appearance correctly?",
            options: [
              { id: "opt-1", text: "She is tall and has brown hair." },
              { id: "opt-2", text: "She has tall and is brown hair." },
              { id: "opt-3", text: "She is tall and is brown hair." },
              { id: "opt-4", text: "She has tall and has brown hair." }
            ],
            correctOptionId: "opt-1",
            explanation: "'Is tall' (height with 'to be') and 'has brown hair' (feature with 'have') is correct.",
            urduExplanation: "'She is tall and has brown hair' Ø¯ÙˆÙ†ÙˆÚº Ù‚ÙˆØ§Ø¹Ø¯ Ù¾Ø± Ù¾ÙˆØ±Ø§ Ø§ØªØ±ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u4-l4-2",
            type: "mcq",
            skillTag: "appearance",
            prompt: "What is the natural order for describing hair?",
            options: [
              { id: "opt-1", text: "Colour -> Length -> Texture" },
              { id: "opt-2", text: "Length -> Texture -> Colour" },
              { id: "opt-3", text: "Texture -> Colour -> Length" },
              { id: "opt-4", text: "Random order" }
            ],
            correctOptionId: "opt-2",
            explanation: "Natural English order is Length -> Texture -> Colour (e.g., long curly black hair).",
            urduExplanation: "Ø¨Ø§Ù„ÙˆÚº Ú©ÛŒ ØµØ­ÛŒØ­ ØªØ±ØªÛŒØ¨: Ù„Ù…Ø¨Ø§Ø¦ÛŒ -> Ø¨Ù†Ø§ÙˆÙ¹ -> Ø±Ù†Ú¯ (long curly black hair) Û Û’Û”"
          },
          {
            id: "qz-a1-u4-l4-3",
            type: "mcq",
            skillTag: "appearance",
            prompt: "Why is 'She has dark hairs' incorrect?",
            options: [
              { id: "opt-1", text: "Because hair on the head is an uncountable noun in English" },
              { id: "opt-2", text: "Because dark cannot describe hair" },
              { id: "opt-3", text: "Because she takes have" },
              { id: "opt-4", text: "Because hairs is always spelled with an e" }
            ],
            correctOptionId: "opt-1",
            explanation: "Hair as a mass of strands on the head is uncountable: 'hair'.",
            urduExplanation: "Ø³Ø± Ú©Û’ Ø¨Ø§Ù„ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº uncountable Ù…Ø§Ù†Û’ Ø¬Ø§ØªÛ’ Û ÛŒÚºØŒ Ø§Ø³ Ù„ÛŒÛ’ 'hair' Ù„Ú©Ú¾Ø§ Ø¬Ø§ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u4-l4-4",
            type: "mcq",
            skillTag: "appearance",
            prompt: "Which adjective means politely old in age?",
            options: [
              { id: "opt-1", text: "young" },
              { id: "opt-2", text: "slim" },
              { id: "opt-3", text: "tall" },
              { id: "opt-4", text: "elderly" }
            ],
            correctOptionId: "opt-4",
            explanation: "'Elderly' is the polite, respectful term for an older person.",
            urduExplanation: "'elderly' Ø¨Ø²Ø±Ú¯ ÛŒØ§ Ù…Ø¹Ù…Ø± Ø´Ø®Øµ Ú©Û’ Ù„ÛŒÛ’ Ù…ÙˆØ¯Ø¨Ø§Ù†Û  Ù„Ù Ø¸ Û Û’Û”"
          },
          {
            id: "qz-a1-u4-l4-5",
            type: "mcq",
            skillTag: "appearance",
            prompt: "Complete the sentence: 'He is clean-shaven; he doesn't have a _____.'",
            options: [
              { id: "opt-1", text: "beard" },
              { id: "opt-2", text: "eyes" },
              { id: "opt-3", text: "tall" },
              { id: "opt-4", text: "hair" }
            ],
            correctOptionId: "opt-1",
            explanation: "A clean-shaven person does not have a beard or moustache.",
            urduExplanation: "Ú©Ù„ÛŒÙ† Ø´ÛŒÙˆ Ø´Ø®Øµ Ú©ÛŒ Ø¯Ø§Ú‘Ú¾ÛŒ (beard) Ù†Û ÛŒÚº Û ÙˆØªÛŒÛ”"
          }
        ]
      },
      {
        id: "sec-a1-u4-l4-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Appearance description takeaways:",
        summaryPoints: [
          "Use 'to be' for height, build, and age (He is tall, she is slim, they are elderly).",
          "Use 'have/has' for features (She has brown eyes, he has a beard).",
          "Hair is uncountable (say 'dark hair', never 'hairs').",
          "Hair descriptive order: Length -> Texture -> Colour (long straight black hair).",
          "Never confuse: He is tall (NOT he has tall); He has dark eyes (NOT he is dark eyes)."
        ]
      },
      {
        id: "sec-a1-u4-l4-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Û Ù… Ø¹Ø§Ù… Ø·ÙˆØ± Ù¾Ø± Ú©Û ØªÛ’ Û ÛŒÚº:\n- 'ÙˆÛ  Ù„Ù…Ø¨Ø§ Û Û’' (ØµÙ Øª)\n- 'Ø§Ø³ Ú©ÛŒ Ø¯Ø§Ú‘Ú¾ÛŒ Û Û’' / 'Ø§Ø³ Ú©Û’ Ú©Ø§Ù„Û’ Ø¨Ø§Ù„ Û ÛŒÚº'\n\nØ§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ø¨Ú¾ÛŒ ÛŒÛ ÛŒ Ø§ØµÙˆÙ„ Û Û’ Ù„ÛŒÚ©Ù† Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ø³ÛŒÚ©Ú¾Ù†Û’ ÙˆØ§Ù„Û’ Ø§Ú©Ø«Ø± **'is'** Ø§ÙˆØ± **'has'** Ú©Ùˆ Ø®Ù„Ø· Ù…Ù„Ø· Ú©Ø± Ø¯ÛŒØªÛ’ Û ÛŒÚº:\n- 'He has tall' (ØºÙ„Ø·) -> ØµØ­ÛŒØ­: **'He is tall'**\n- 'She is brown eyes' (ØºÙ„Ø·) -> ØµØ­ÛŒØ­: **'She has brown eyes'**\n\n**Ø§ÛŒÚ© Ø§ÙˆØ± Ø¨Û Øª Ø¨Ú‘ÛŒ ØºÙ„Ø·ÛŒ:** Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Û Ù… Ú©Û ØªÛ’ Û ÛŒÚº 'Ø§Ø³ Ú©Û’ Ø¨Ø§Ù„ Ú©Ø§Ù„Û’ Û ÛŒÚº' (Ø¬Ù…Ø¹)Û” Ù„ÛŒÚ©Ù† Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ø³Ø± Ú©Û’ Ø¨Ø§Ù„ **ÙˆØ§Ø­Ø¯ Ù†Ø§Ù‚Ø§Ø¨Ù„Ù  Ú¯Ù†ØªÛŒ (Uncountable)** Û ÙˆØªÛ’ Û ÛŒÚºØŒ Ø§Ø³ Ù„ÛŒÛ’ 'hairs' Ú©Ø¨Ú¾ÛŒ Ù†Û  Ú©Û ÛŒÚºØŒ ØµØ±Ù  **hair** Ú©Û ÛŒÚºÛ”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 5: Talking About Pets & Animals
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u4-l5",
    level: "A1",
    unit: "unit-4",
    order: 5,
    title: "Talking About Pets & Animals",
    description: "Build vocabulary for common domestic pets, farm animals, and verbs used to describe pet care.",
    objectives: [
      "Name common pets (cat, dog, bird, fish, rabbit) and farm animals (horse, cow, goat)",
      "Use animal action verbs (feed, walk, bark, purr, play) in the present simple",
      "Form complete sentences describing pet care routines and animal habits"
    ],
    estimatedMinutes: 8,
    prerequisites: ["eng-a1-u4-l4"],
    skillTags: ["vocabulary", "animals", "pets", "routines"],
    vocabularyList: [
      { word: "cat", partOfSpeech: "noun", phonetic: "/kÃ¦t/", definition: "A small domesticated carnivorous mammal with soft fur and retractable claws.", urduMeaning: "Ø¨Ù„ÛŒ", exampleSentence: "Our pet cat purrs when she is happy." },
      { word: "dog", partOfSpeech: "noun", phonetic: "/dÉ’É¡/", definition: "A domesticated carnivorous mammal known for loyalty and barking.", urduMeaning: "Ú©ØªØ§", exampleSentence: "He walks his pet dog every morning." },
      { word: "bird", partOfSpeech: "noun", phonetic: "/bÉœË d/", definition: "A warm-blooded egg-laying vertebrate distinguished by feathers and wings.", urduMeaning: "Ù¾Ø±Ù†Ø¯Û ", exampleSentence: "A colourful bird sings in the tree outside." },
      { word: "fish", partOfSpeech: "noun", phonetic: "/fÉªÊƒ/", definition: "A limbless cold-blooded vertebrate animal with gills and fins living wholly in water.", urduMeaning: "Ù…Ú†Ú¾Ù„ÛŒ", exampleSentence: "They have gold fish swimming in a small aquarium." },
      { word: "horse", partOfSpeech: "noun", phonetic: "/hÉ”Ë s/", definition: "A large plant-eating domesticated mammal with solid hooves and a flowing mane.", urduMeaning: "Ú¯ÚÚ¾ÙˆÚ‘Ø§", exampleSentence: "My uncle keeps a magnificent Arabian horse." },
      { word: "rabbit", partOfSpeech: "noun", phonetic: "/ËˆrÃ¦bÉªt/", definition: "A gregarious burrowing plant-eating mammal with long ears and long hind legs.", urduMeaning: "Ø®Ø±Ú¯ÙˆØ´", exampleSentence: "The white rabbit loves fresh carrots." },
      { word: "feed", partOfSpeech: "verb", phonetic: "/fiË d/", definition: "To give food to an animal or person.", urduMeaning: "Ú©Ú¾Ø§Ù†Ø§ Ú©Ú¾Ù„Ø§Ù†Ø§ / Ø®ÙˆØ±Ø§Ú© Ø¯ÛŒÙ†Ø§", exampleSentence: "I feed the birds every morning after breakfast." },
      { word: "bark", partOfSpeech: "verb", phonetic: "/bÉ‘Ë k/", definition: "The sharp explosive cry of a dog.", urduMeaning: "Ø¨Ú¾ÙˆÙ†Ú©Ù†Ø§", exampleSentence: "The guard dog barks when strangers approach." },
      { word: "tail", partOfSpeech: "noun", phonetic: "/teÉªl/", definition: "The hindmost part of an animal, especially when prolonged beyond the rest of the body.", urduMeaning: "Ø¯Ù…", exampleSentence: "The friendly dog wags its tail." },
      { word: "gentle", partOfSpeech: "adjective", phonetic: "/ËˆdÊ’entl/", definition: "Having or showing a mild, kind, or tender temperament.", urduMeaning: "Ø´Ø±ÛŒÙ  / Ù…Ø¹ØµÙˆÙ… / Ù†Ø±Ù… Ù…Ø²Ø§Ø¬", exampleSentence: "Our pet cat is very gentle with small children." }
    ],
    sections: [
      {
        id: "sec-a1-u4-l5-1",
        type: "explain",
        title: "Pet Care & Animal Descriptions",
        content: "Talking about pets combines **possession (have/has)**, **habits (present simple verbs)**, and **appearance adjectives**.\n\n### Pronouns for Animals\n- In general, animals take the neutral pronoun **it**.\n- When an animal is a cherished family pet, native speakers often use **he** or **she** (*My cat Snow... she is very playful*).",
        tables: [
          {
            title: "Common Pets & Characteristic Actions",
            headers: ["Animal", "Sound / Action Verb", "Daily Care Routine", "Urdu Translation"],
            rows: [
              ["cat", "purrs, meows, climbs", "feed twice daily, clean litter box", "Ø¨Ù„ÛŒ (Ù…ÛŒØ§Ø¤Úº Ú©Ø±ØªÛŒ Û Û’)"],
              ["dog", "barks, runs, wags tail", "walk in the park, feed meat and biscuits", "Ú©ØªØ§ (Ø¨Ú¾ÙˆÙ†Ú©ØªØ§ Û Û’ØŒ Ø¯Ù… Û Ù„Ø§ØªØ§ Û Û’)"],
              ["bird", "sings, chirps, flies", "provide clean water and seeds", "Ù¾Ø±Ù†Ø¯Û  (Ú†Û ØªØ§ Û Û’)"],
              ["rabbit", "hops, eats greens", "feed carrots, hay, fresh water", "Ø®Ø±Ú¯ÙˆØ´ (Ú†Ú¾Ù„Ø§Ù†Ú¯ Ù„Ú¯Ø§ØªØ§ Û Û’)"],
              ["fish", "swims gracefully", "clean aquarium, feed flakes", "Ù…Ú†Ú¾Ù„ÛŒ (ØªÛŒØ±ØªÛŒ Û Û’)"]
            ]
          },
          {
            title: "Plural Forms of Common Animals",
            headers: ["Singular Animal", "Plural Form", "Crucial Note"],
            rows: [
              ["cat", "cats", "Regular -s"],
              ["dog", "dogs", "Regular -s"],
              ["bird", "birds", "Regular -s"],
              ["fish", "fish", "IRREGULAR: Plural remains 'fish' (never 'fishes' for count)!"],
              ["rabbit", "rabbits", "Regular -s"]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "The Plural of Fish",
            text: "Remember: The plural of 'fish' is usually just **fish**! Say: 'I caught three **fish** yesterday'."
          },
          {
            type: "warning",
            title: "Third-Person S on Animal Verbs",
            text: "When an animal is singular, its verb needs -s: 'The dog **barks**', 'The bird **sings**'."
          }
        ]
      },
      {
        id: "sec-a1-u4-l5-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "We have a gentle white cat named Snow who loves milk.", phonetic: "/wiË  hÃ¦v É™ ËˆdÊ’entl waÉªt kÃ¦t neÉªmd snÉ™ÊŠ huË  lÊŒvz mÉªlk/", urdu: "Û Ù…Ø§Ø±Û’ Ù¾Ø§Ø³ Ø³Ù ÛŒØ¯ Ø±Ù†Ú¯ Ú©ÛŒ Ø§ÛŒÚ© Ù†Ø±Ù… Ù…Ø²Ø§Ø¬ Ø¨Ù„ÛŒ Û Û’ Ø¬Ø³ Ú©Ø§ Ù†Ø§Ù… Ø³Ù†Ùˆ Û Û’Û”", audioText: "We have a gentle white cat named Snow who loves milk." },
          { english: "He walks his German Shepherd dog in the neighbourhood every morning.", phonetic: "/hiË  wÉ”Ë ks hÉªz ËˆdÊ’ÉœË mÉ™n ËˆÊƒepÉ™d dÉ’É¡ Éªn Ã°É™ ËˆneÉªbÉ™hÊŠd Ëˆevri ËˆmÉ”Ë rnÉªÅ‹/", urdu: "ÙˆÛ  Û Ø± ØµØ¨Ø­ Ù…Ø­Ù„Û’ Ù…ÛŒÚº Ø§Ù¾Ù†Û’ Ø¬Ø±Ù…Ù† Ø´ÛŒÙ¾Ø±Úˆ Ú©ØªÛ’ Ú©Ùˆ Ù¾ÛŒØ¯Ù„ Ú¯Ú¾Ù…Ø§ØªØ§ Û Û’Û”", audioText: "He walks his German Shepherd dog in the neighbourhood every morning." },
          { english: "A colourful wild bird builds a nest in our mango tree.", phonetic: "/É™ ËˆkÊŒlÉ™rfÉ™l waÉªld bÉœË d bÉªldz É™ nest Éªn ËˆaÊŠÉ™r ËˆmÃ¦Å‹É¡É™ÊŠ triË /", urdu: "Ø§ÛŒÚ© Ø±Ù†Ú¯ Ø¨Ø±Ù†Ú¯Ø§ Ø¬Ù†Ú¯Ù„ÛŒ Ù¾Ø±Ù†Ø¯Û  Û Ù…Ø§Ø±Û’ Ø¢Ù… Ú©Û’ Ø¯Ø±Ø®Øª Ù…ÛŒÚº Ú¯Ú¾ÙˆÙ†Ø³Ù„Ø§ Ø¨Ù†Ø§ØªØ§ Û Û’Û”", audioText: "A colourful wild bird builds a nest in our mango tree." },
          { english: "My younger brother feeds his pet rabbit fresh green lettuce.", phonetic: "/maÉª ËˆjÊŒÅ‹É¡É™r ËˆbrÊŒÃ°É™r fiË dz hÉªz pet ËˆrÃ¦bÉªt freÊƒ É¡riË n ËˆletÉªs/", urdu: "Ù…ÛŒØ±Ø§ Ú†Ú¾ÙˆÙ¹Ø§ Ø¨ÚÚ¾Ø§Ø¦ÛŒ Ø§Ù¾Ù†Û’ Ù¾Ø§Ù„ØªÙˆ Ø®Ø±Ú¯ÙˆØ´ Ú©ÙÙˆ ØªØ§Ø²Û  Ø³Ù„Ø§Ø¯ Ú©Û’ Ù¾ØªÛ’ Ú©Ú¾Ù„Ø§ØªØ§ Û Û’Û”", audioText: "My younger brother feeds his pet rabbit fresh green lettuce." },
          { english: "There are six small gold fish swimming in the glass bowl.", phonetic: "/Ã°eÉ™r É‘Ë r sÉªks smÉ”Ë l É¡É™ÊŠld fÉªÊƒ ËˆswÉªmÉªÅ‹ Éªn Ã°É™ É¡lÉ‘Ë s bÉ™ÊŠl/", urdu: "Ø´ÛŒØ´Û’ Ú©Û’ Ù¾ÛŒØ§Ù„Û’ Ù…ÛŒÚº Ú†ÚÚ¾ Ú†Ú¾ÙˆÙ¹ÛŒ Ø³Ù†Û Ø±ÛŒ Ù…Ú†Ú¾Ù„ÛŒØ§Úº ØªÛŒØ± Ø±Û ÛŒ Û ÛŒÚºÛ”", audioText: "There are six small gold fish swimming in the glass bowl." },
          { english: "The guard dog barks whenever an unfamiliar car stops outside.", phonetic: "/Ã°É™ É¡É‘Ë d dÉ’É¡ bÉ‘Ë ks wenËˆevÉ™r É™n ËŒÊŒnfÉ™ËˆmÉªliÉ™r kÉ‘Ë  stÉ’ps ËŒaÊŠtËˆsaÉªd/", urdu: "Ø¬Ø¨ Ø¨Ú¾ÛŒ Ú©ÙˆØ¦ÛŒ Ø§Ø¬Ù†Ø¨ÛŒ Ú¯Ø§Ú‘ÛŒ Ø¨Ø§Û Ø± Ø±Ú©ØªÛŒ Û Û’ ØªÙˆ Ú†ÙˆÚ©ÛŒØ¯Ø§Ø± Ú©ØªØ§ Ø¨Ú¾ÙˆÙ†Ú©Ù†Û’ Ù„Ú¯ØªØ§ Û Û’Û”", audioText: "The guard dog barks whenever an unfamiliar car stops outside." },
          { english: "Horses are strong, intelligent, and loyal animals.", phonetic: "/ËˆhÉ”Ë sÉªz É‘Ë r strÉ’Å‹ ÉªnËˆtelÉªdÊ’É™nt Ã¦nd ËˆlÉ”ÉªÉ™l ËˆÃ¦nÉªmlz/", urdu: "Ú¯ÚÚ¾ÙˆÚ‘Û’ Ø·Ø§Ù‚ØªÙˆØ±ØŒ Ø°Û ÛŒÙ† Ø§ÙˆØ± ÙˆÙ Ø§Ø¯Ø§Ø± Ø¬Ø§Ù†ÙˆØ± Û ÙˆØªÛ’ Û ÛŒÚºÛ”", audioText: "Horses are strong, intelligent, and loyal animals." },
          { english: "Does your neighbour have any domestic pets at home?", phonetic: "/dÊŒz jÉ”Ë r ËˆneÉªbÉ™r hÃ¦v Ëˆeni dÉ™ËˆmestÉªk pets Ã¦t hÉ™ÊŠm/", urdu: "Ú©ÛŒØ§ Ø¢Ù¾ Ú©Û’ Û Ù…Ø³Ø§Ø¦Û’ Ú©Û’ Ù¾Ø§Ø³ Ú¯Ú¾Ø± Ù…ÛŒÚº Ú©ÙˆØ¦ÛŒ Ù¾Ø§Ù„ØªÙˆ Ø¬Ø§Ù†ÙˆØ± Û Û’ØŸ", audioText: "Does your neighbour have any domestic pets at home?" }
        ]
      },
      {
        id: "sec-a1-u4-l5-3",
        type: "dialogue",
        title: "Talking About Family Pets",
        dialogue: [
          { speaker: "Ali", avatar: "A", english: "Do you have any pets at your home, Faisal?", urdu: "Ù ÛŒØµÙ„ØŒ Ú©ÛŒØ§ Ø¢Ù¾ Ú©Û’ Ú¯Ú¾Ø± Ù…ÛŒÚº Ú©ÙˆØ¦ÛŒ Ù¾Ø§Ù„ØªÙˆ Ø¬Ø§Ù†ÙˆØ± Û Û’ØŸ", audioText: "Do you have any pets at your home, Faisal?" },
          { speaker: "Faisal", avatar: "F", english: "Yes, we have a white Persian cat. She is very fluffy and gentle.", urdu: "Ø¬ÛŒ Û Ø§ÚºØŒ Û Ù…Ø§Ø±Û’ Ù¾Ø§Ø³ Ø§ÛŒÚ© Ø³Ù ÛŒØ¯ Ø§ÛŒØ±Ø§Ù†ÛŒ Ø¨Ù„ÛŒ Û Û’Û” ÙˆÛ  Ø¨Û Øª Ù†Ø±Ù… Ø§ÙˆØ± Ù¾ÛŒØ§Ø±ÛŒ Û Û’Û”", audioText: "Yes, we have a white Persian cat. She is very fluffy and gentle." },
          { speaker: "Ali", avatar: "A", english: "Who feeds her every day?", urdu: "Ø§Ø³Û’ Ø±ÙˆØ²Ø§Ù†Û  Ú©Ú¾Ø§Ù†Ø§ Ú©ÙˆÙ† Ú©Ú¾Ù„Ø§ØªØ§ Û Û’ØŸ", audioText: "Who feeds her every day?" },
          { speaker: "Faisal", avatar: "F", english: "My younger sister feeds her cat food and gives her fresh water.", urdu: "Ù…ÛŒØ±ÛŒ Ú†ÚÚ¾ÙˆÙ¹ÛŒ Ø¨Û Ù† Ø§Ø³Û’ Ú©ÛŒÙ¹ Ù ÙˆÚˆ Ú©Ú¾Ù„Ø§ØªÛŒ Û Û’ Ø§ÙˆØ± ØªØ§Ø²Û  Ù¾Ø§Ù†ÛŒ Ø¯ÛŒØªÛŒ Û Û’Û”", audioText: "My younger sister feeds her cat food and gives her fresh water." }
        ]
      },
      {
        id: "sec-a1-u4-l5-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u4-l5-1",
            type: "mcq",
            skillTag: "animals",
            prompt: "What sound does a dog make when alert?",
            options: [
              { id: "opt-1", text: "It barks" },
              { id: "opt-2", text: "It purrs" },
              { id: "opt-3", text: "It chirps" },
              { id: "opt-4", text: "It meows" }
            ],
            correctOptionId: "opt-1",
            explanation: "Dogs bark when alert or guarding.",
            urduExplanation: "Ú©ØªØ§ Ø®Ø¨Ø±Ø¯Ø§Ø± Ú©Ø±Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Ø¨Ú¾ÙˆÙ†Ú©ØªØ§ (barks) Û Û’Û”"
          },
          {
            id: "ex-a1-u4-l5-2",
            type: "mcq",
            skillTag: "animals",
            prompt: "What is the plural form of the word 'fish' in normal counting?",
            options: [
              { id: "opt-1", text: "fishes" },
              { id: "opt-2", text: "fish" },
              { id: "opt-3", text: "fishs" },
              { id: "opt-4", text: "fishies" }
            ],
            correctOptionId: "opt-2",
            explanation: "In modern English, the plural of 'fish' remains 'fish'.",
            urduExplanation: "'fish' Ú©ÛŒ Ø¬Ù…Ø¹ Ø¨Ú¾ÛŒ 'fish' Û ÛŒ Ø±Û ØªÛŒ Û Û’Û”"
          },
          {
            id: "ex-a1-u4-l5-3",
            type: "fill_blank",
            skillTag: "animals",
            prompt: "Complete with the correct verb form: 'She _____ (feed) her rabbit every morning.'",
            correctAnswer: "feeds",
            explanation: "Third person singular 'She' requires 'feeds' with -s.",
            urduExplanation: "'She' Ú©Û’ Ø³Ø§ØªÚ¾ Ù Ø¹Ù„ Ù…ÛŒÚº -s Ù„Ú¯ Ú©Ø± 'feeds' Ø¨Ù†ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u4-l5-4",
            type: "fill_blank",
            skillTag: "animals",
            prompt: "Complete: 'A dog wags its _____ when it is excited and happy.'",
            correctAnswer: "tail",
            explanation: "Dogs wag their tail to show happiness.",
            urduExplanation: "Ú©ØªØ§ Ø®ÙˆØ´ÛŒ Ù…ÛŒÚº Ø§Ù¾Ù†ÛŒ Ø¯Ù… (tail) Û Ù„Ø§ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u4-l5-5",
            type: "order_sentence",
            skillTag: "animals",
            prompt: "Rearrange the words to form a correct sentence:",
            sentenceTokens: ["The", "white", "rabbit", "eats", "fresh", "carrots", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Subject (The white rabbit) + verb (eats) + object (fresh carrots).",
            urduExplanation: "The white rabbit eats fresh carrots."
          },
          {
            id: "ex-a1-u4-l5-6",
            type: "order_sentence",
            skillTag: "animals",
            prompt: "Rearrange the words to form a correct statement:",
            sentenceTokens: ["I", "walk", "my", "dog", "every", "evening", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Subject (I) + verb (walk) + object (my dog) + frequency phrase (every evening).",
            urduExplanation: "I walk my dog every evening."
          },
          {
            id: "ex-a1-u4-l5-7",
            type: "match_pairs",
            skillTag: "animals",
            prompt: "Match each animal with its typical sound or action:",
            pairs: [
              { left: "dog", right: "barks" },
              { left: "cat", right: "purrs" },
              { left: "bird", right: "chirps" },
              { left: "fish", right: "swims" }
            ],
            explanation: "Animals and characteristic sounds/actions paired accurately.",
            urduExplanation: "Ø¬Ø§Ù†ÙˆØ± Ú©Ùˆ Ø§Ø³ Ú©ÛŒ Ø¢ÙˆØ§Ø² ÛŒØ§ Ø­Ø±Ú©Øª Ø³Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u4-l5-8",
            type: "error_correction",
            skillTag: "animals",
            prompt: "Find and correct the mistake: 'I saw five fishes in the pond.'",
            correctAnswer: "I saw five fish in the pond.",
            explanation: "The plural form for counting fish is 'fish', not 'fishes'.",
            urduExplanation: "Ú¯Ù†ØªÛŒ Ú©Û’ Ù„ÛŒÛ’ 'five fish' Ø¢Ø¦Û’ Ú¯Ø§ØŒ 'fishes' Ù†Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u4-l5-9",
            type: "error_correction",
            skillTag: "animals",
            prompt: "Find and correct the mistake: 'The dog bark at the stranger.'",
            correctAnswer: "The dog barks at the stranger.",
            explanation: "'The dog' is singular, so the verb requires -s: 'barks'.",
            urduExplanation: "ÙˆØ§Ø­Ø¯ 'The dog' Ú©Û’ Ø³Ø§ØªÚ¾ 'barks' Ù„Ú©Ú¾Ù†Ø§ Ø¶Ø±ÙˆØ±ÛŒ Û Û’Û”"
          },
          {
            id: "ex-a1-u4-l5-10",
            type: "true_false",
            skillTag: "animals",
            prompt: "Cats make a gentle purring sound when they are content and relaxed. (True or False)",
            correctAnswer: "True",
            explanation: "True. Purring is the soft vibrating sound cats make when happy.",
            urduExplanation: "Ø¯Ø±Ø³ØªÛ” Ø¨Ù„ÛŒØ§Úº Ø®ÙˆØ´ Û ÙˆÙ†Û’ Ù¾Ø± purr Ú©Ø±ØªÛŒ Û ÛŒÚºÛ”"
          }
        ]
      },
      {
        id: "sec-a1-u4-l5-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u4-l5-1",
            type: "mcq",
            skillTag: "animals",
            prompt: "Which verb describes the sound a cat makes when relaxed?",
            options: [
              { id: "opt-1", text: "barks" },
              { id: "opt-2", text: "purrs" },
              { id: "opt-3", text: "chirps" },
              { id: "opt-4", text: "neighs" }
            ],
            correctOptionId: "opt-2",
            explanation: "Cats purr when they feel safe, affectionate, and relaxed.",
            urduExplanation: "Ø¨Ù„ÛŒ Ø³Ú©ÙˆÙ† Ù…ÛŒÚº 'purrs' Ú©Ø±ØªÛŒ Û Û’Û”"
          },
          {
            id: "qz-a1-u4-l5-2",
            type: "mcq",
            skillTag: "animals",
            prompt: "Complete the sentence: 'She has three goldfish swimming _____ the tank.'",
            options: [
              { id: "opt-1", text: "on" },
              { id: "opt-2", text: "at" },
              { id: "opt-3", text: "in" },
              { id: "opt-4", text: "under" }
            ],
            correctOptionId: "opt-3",
            explanation: "Fish swim inside an enclosed water body, requiring preposition 'in'.",
            urduExplanation: "Ù¾Ø§Ù†ÛŒ Ú©Û’ Ù¹ÛŒÙ†Ú© Ú©Û’ Ø§Ù†Ø¯Ø± Ú©Û’ Ù„ÛŒÛ’ 'in' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u4-l5-3",
            type: "mcq",
            skillTag: "animals",
            prompt: "Which animal is famous for hopping and eating carrots?",
            options: [
              { id: "opt-1", text: "The horse" },
              { id: "opt-2", text: "The dog" },
              { id: "opt-3", text: "The cat" },
              { id: "opt-4", text: "The rabbit" }
            ],
            correctOptionId: "opt-4",
            explanation: "Rabbits hop and enjoy fresh vegetables like carrots.",
            urduExplanation: "Ø®Ø±Ú¯ÙˆØ´ (rabbit) Ú†ÚÚ¾Ù„Ø§Ù†Ú¯ÛŒÚº Ù„Ú¯Ø§ØªØ§ Û Û’ Ø§ÙˆØ± Ú¯Ø§Ø¬Ø± Ú©Ú¾Ø§ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u4-l5-4",
            type: "mcq",
            skillTag: "animals",
            prompt: "Select the sentence with INCORRECT grammar:",
            options: [
              { id: "opt-1", text: "He has three pet fish." },
              { id: "opt-2", text: "The dog barks at night." },
              { id: "opt-3", text: "She feeds her birds every day." },
              { id: "opt-4", text: "He have a pet rabbit." }
            ],
            correctOptionId: "opt-4",
            explanation: "'He have' is incorrect; third-person singular requires 'He has'.",
            urduExplanation: "'He have' ØºÙ„Ø· Û Û’ØŒ 'He has' Û ÙˆÙ†Ø§ Ú†Ø§Û ÛŒÛ’Û”"
          },
          {
            id: "qz-a1-u4-l5-5",
            type: "mcq",
            skillTag: "animals",
            prompt: "What does it mean when a dog 'wags its tail'?",
            options: [
              { id: "opt-1", text: "It is angry and aggressive" },
              { id: "opt-2", text: "It is friendly, excited, or happy" },
              { id: "opt-3", text: "It is asleep" },
              { id: "opt-4", text: "It is thirsty" }
            ],
            correctOptionId: "opt-2",
            explanation: "Wagging the tail is a universal canine sign of friendliness and happiness.",
            urduExplanation: "Ú©ØªÛ’ Ú©Ø§ Ø¯Ù… Û Ù„Ø§Ù†Ø§ Ø®ÙˆØ´ÛŒ Ø§ÙˆØ± Ø¯ÙˆØ³ØªØ§Ù†Û  Ù…Ø²Ø§Ø¬ Ú©ÛŒ Ø¹Ù„Ø§Ù…Øª Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u4-l5-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Pets and animal vocabulary takeaways:",
        summaryPoints: [
          "Common domestic animals: cat, dog, bird, rabbit, fish, horse.",
          "Action verbs: feed (food), walk (exercise), bark (dog sound), purr (cat sound).",
          "The plural of fish is fish (never fishes when counting).",
          "Remember third-person singular verb rules for animals (The cat purrs, the dog barks).",
          "Use 'it' for general animals, or 'he/she' for beloved family pets."
        ]
      },
      {
        id: "sec-a1-u4-l5-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº ØªÙ…Ø§Ù… Ø¬Ø§Ù†ÙˆØ±ÙˆÚº Ú©ÛŒ Ø¬Ù†Ø³ (Gender) Û ÙˆØªÛŒ Û Û’ØŒ Ø¬ÛŒØ³Û’:\n- Ø¨Ù„ÛŒ Ø¢ Ø±Û ÛŒ Û Û’ (Ù…Ø¤Ù†Ø«)\n- Ú©ØªØ§ Ø¨ÚÚ¾ÙˆÙ†Ú© Ø±Û Ø§ Û Û’ (Ù…Ø°Ú©Ø±)\n\n**Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ø¬Ø§Ù†ÙˆØ±ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ Ø¹Ø§Ù… Ø·ÙˆØ± Ù¾Ø± 'It' Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’Û”** Ù Ø¹Ù„ Ù…Ø°Ú©Ø± ÛŒØ§ Ù…Ø¤Ù†Ø« Ú©Û’ Ù„Ø­Ø§Ø¸ Ø³Û’ Ù†Û ÛŒÚº Ø¨Ø¯Ù„ØªØ§:\n- The cat **runs**\n- The dog **runs**\n\nØ§Ù„Ø¨ØªÛ  Ø¬Ø¨ Ú¯Ú¾Ø± Ù…ÛŒÚº Ù¾Ø§Ù„Ø§ Û ÙˆØ§ Ù¾ÛŒØ§Ø±Ø§ Ø¬Ø§Ù†ÙˆØ± Û Ùˆ ØªÙˆ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ø¨ÙˆÙ„Ù†Û’ ÙˆØ§Ù„Û’ Ø¨Ú¾ÛŒ Ø§Ø³Û’ Ù¾ÛŒØ§Ø± Ø³Û’ **He** ÛŒØ§ **She** Ú©Û ØªÛ’ Û ÛŒÚºÛ” Ø§Ø³ Ú©Û’ Ø¹Ù„Ø§ÙˆÛ  ÛŒØ§Ø¯ Ø±Ú©Ú¾ÛŒÚº Ú©Û  'fish' Ú©ÛŒ Ø¬Ù…Ø¹ Ø¨Ú¾ÛŒ **fish** Û ÛŒ Ø±Û ØªÛŒ Û Û’Û”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  }
];
