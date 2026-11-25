/**
 * Zarii English Course - Level A1, Unit 5 Content
 * Unit 5: Food, Drink & Ordering at a Cafe
 * Lessons 1 to 5
 */

module.exports = [
  // -------------------------------------------------------------------------
  // LESSON 1: Countable vs Uncountable Food Nouns
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u5-l1",
    level: "A1",
    unit: "unit-5",
    order: 1,
    title: "Countable vs Uncountable Food Nouns",
    description: "Distinguish between countable items (apples, eggs) and uncountable food/drink (water, rice, bread).",
    objectives: [
      "Categorize everyday food items into countable and uncountable nouns",
      "Use 'a/an' and plural numbers with countable nouns, avoiding them with uncountable nouns",
      "Apply container/measurement counters to uncountable foods (a glass of water, a slice of bread)"
    ],
    estimatedMinutes: 12,
    prerequisites: ["eng-a1-u4-l5"],
    skillTags: ["countable-uncountable", "food", "grammar-basics", "quantifiers"],
    vocabularyList: [
      { word: "water", partOfSpeech: "noun", phonetic: "/ËˆwÉ”Ë tÉ™r/", definition: "A colourless, transparent, odourless liquid essential for plant and animal life.", urduMeaning: "Ù¾Ø§Ù†ÛŒ", exampleSentence: "Please drink a glass of fresh water." },
      { word: "milk", partOfSpeech: "noun", phonetic: "/mÉªlk/", definition: "An opaque white fluid rich in fat and protein, secreted by female mammals.", urduMeaning: "Ø¯ÙˆØ¯Ú¾", exampleSentence: "He adds a little milk to his black tea." },
      { word: "bread", partOfSpeech: "noun", phonetic: "/bred/", definition: "Food made of flour, water, and yeast or another leavening agent, mixed and baked.", urduMeaning: "Ø±ÙˆÙ¹ÛŒ / ÚˆØ¨Ù„ Ø±ÙˆÙ¹ÛŒ", exampleSentence: "We bought fresh bread from the bakery." },
      { word: "rice", partOfSpeech: "noun", phonetic: "/raÉªs/", definition: "A swamp grass which is widely cultivated as a source of food, especially in Asia.", urduMeaning: "Ú†Ø§ÙˆÙ„", exampleSentence: "Basmati rice is famous for its natural aroma." },
      { word: "cheese", partOfSpeech: "noun", phonetic: "/tÊƒiË z/", definition: "A food made from the pressed curds of milk.", urduMeaning: "Ù¾Ù†ÛŒØ±", exampleSentence: "She likes melted cheese on her sandwich." },
      { word: "egg", partOfSpeech: "noun", phonetic: "/eÉ¡/", definition: "An oval or round object laid by a female bird, reptile, or fish.", urduMeaning: "Ø§Ù†ÚˆØ§", exampleSentence: "I boil two eggs for breakfast every morning." },
      { word: "apple", partOfSpeech: "noun", phonetic: "/ËˆÃ¦pl/", definition: "The round fruit of a tree of the rose family, which typically has thin red or green skin.", urduMeaning: "Ø³ÛŒØ¨", exampleSentence: "She packed a crisp red apple in her lunchbox." },
      { word: "sugar", partOfSpeech: "noun", phonetic: "/ËˆÊƒÊŠÉ¡É™r/", definition: "A sweet crystalline substance obtained from various plants, especially sugar cane.", urduMeaning: "Ú†ÛŒÙ†ÛŒ", exampleSentence: "Do you take sugar in your tea?" },
      { word: "coffee", partOfSpeech: "noun", phonetic: "/ËˆkÉ’fi/", definition: "A hot drink made from the roasted and ground seeds of a tropical shrub.", urduMeaning: "Ú©Ø§Ù ÛŒ", exampleSentence: "He orders hot black coffee in the morning." },
      { word: "tea", partOfSpeech: "noun", phonetic: "/tiË /", definition: "A hot drink made by infusing dried, crushed tea leaves in boiling water.", urduMeaning: "Ú†Ø§Ø¦Û’", exampleSentence: "Karak chai is a beloved hot drink in Pakistan." }
    ],
    sections: [
      {
        id: "sec-a1-u5-l1-1",
        type: "explain",
        title: "The Logic of Countable vs. Uncountable",
        content: "In English, nouns are fundamentally divided into **Countable (C)** and **Uncountable (U)**:\n\n### 1. Countable Nouns\n- Things we can count as individual units: *one apple, two apples, three apples*.\n- Can be singular or plural.\n- Take **a / an** in singular (*an egg, a sandwich*).\n\n### 2. Uncountable Nouns\n- Liquids, grains, powders, masses, and concepts: *water, milk, rice, sugar, bread, cheese*.\n- Cannot be counted directly (*never 'two rices' or 'three milks'*).\n- Have **no plural form** (-s is not added).\n- Never take **a / an** directly (*never 'a bread' or 'a water'*).\n\n### Using Partitive Counters\nTo measure uncountable items, we use a container or measurement counter:\n- *a glass of water* / *two bottles of water*\n- *a slice of bread* / *two loaves of bread*\n- *a cup of tea* / *two cups of tea*\n- *a bowl of rice* / *a kilo of sugar*",
        tables: [
          {
            title: "Countable vs. Uncountable Comparison",
            headers: ["Category", "Grammar Rules", "Countable Examples", "Uncountable Examples"],
            rows: [
              ["Counting", "C: 1, 2, 3... / U: Needs counter", "one egg, three apples", "a cup of rice, a bowl of soup"],
              ["Indefinite Article", "C: Takes a / an / U: No a / an", "a sandwich, an apple", "bread (NOT a bread), milk"],
              ["Plural Form", "C: Adds -s / U: Always singular verb", "apples, eggs, tomatoes", "rice is healthy, water is pure"],
              ["Questions", "C: How many? / U: How much?", "How many eggs do we need?", "How much water do you drink?"]
            ]
          },
          {
            title: "Essential Partitive Measurement Expressions",
            headers: ["Counter Phrase", "Used With Uncountable Food", "Urdu Translation", "Example"],
            rows: [
              ["a cup of...", "tea, coffee, hot soup", "Ø§ÛŒÚ© Ú©Ù¾", "A cup of hot green tea."],
              ["a glass of...", "water, milk, orange juice", "Ø§ÛŒÚ© Ú¯Ù„Ø§Ø³", "A glass of cold water."],
              ["a slice of...", "bread, cheese, cake", "Ø§ÛŒÚ© Ù¹Ú©Ú‘Ø§ / Ø³Ù„Ø§Ø¦Ø³", "A slice of toasted bread."],
              ["a bowl of...", "rice, curry, soup", "Ø§ÛŒÚ© Ù¾ÛŒØ§Ù„Û ", "A bowl of boiled basmati rice."],
              ["a bottle of...", "water, oil, vinegar", "Ø§ÛŒÚ© Ø¨ÙˆØªÙ„", "A bottle of mineral water."]
            ]
          }
        ],
        callouts: [
          {
            type: "warning",
            title: "The 'Bread' False Friend",
            text: "In Urdu, 'روٹی' is easily counted ('دو روٹیاں'). But in English, **bread** is strictly UNCOUNTABLE! Say: **a slice of bread** or **two pieces of bread**, never *'two breads'*."
          },
          {
            type: "tip",
            title: "Verb Agreement with Uncountable Nouns",
            text: "Uncountable nouns always take a SINGULAR verb: **Water is essential**, **Rice is delicious**."
          }
        ]
      },
      {
        id: "sec-a1-u5-l1-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "Please bring me a glass of cold water.", phonetic: "/pliË z brÉªÅ‹ miË  É™ É¡lÉ‘Ë s É™v kÉ™ÊŠld ËˆwÉ”Ë tÉ™r/", urdu: "Ø¨Ø±Ø§Û  Ú©Ø±Ù… Ù…Ø¬Ú¾Û’ Ø§ÛŒÚ© Ú¯Ù„Ø§Ø³ Ù¹Ú¾Ù†ÚˆØ§ Ù¾Ø§Ù†ÛŒ Ù„Ø§ Ø¯ÛŒÚºÛ”", audioText: "Please bring me a glass of cold water." },
          { english: "She eats two boiled eggs and a banana for breakfast.", phonetic: "/ÊƒiË  iË ts tuË  bÉ”Éªld eÉ¡z Ã¦nd É™ bÉ™ËˆnÉ‘Ë nÉ™ fÉ”Ë r ËˆbrekfÉ™st/", urdu: "ÙˆÛ  Ù†Ø§Ø´ØªÛ’ Ù…ÛŒÚº Ø¯Ùˆ Ø§Ø¨Ù„Û’ Û ÙˆØ¦Û’ Ø§Ù†ÚˆÛ’ Ø§ÙˆØ± Ø§ÛŒÚ© Ú©ÛŒÙ„Ø§ Ú©Ú¾Ø§ØªÛŒ Û Û’Û”", audioText: "She eats two boiled eggs and a banana for breakfast." },
          { english: "How much rice is left in the container?", phonetic: "/haÊŠ mÊŒtÊƒ raÉªs Éªz left Éªn Ã°É™ kÉ™nËˆteÉªnÉ™r/", urdu: "ÚˆØ¨Û’ Ù…ÛŒÚº Ú©ØªÙ†Ø§ Ú†Ø§ÙˆÙ„ Ø¨Ø§Ù‚ÛŒ Û Û’ØŸ", audioText: "How much rice is left in the container?" },
          { english: "How many apples did you buy from the fruit vendor?", phonetic: "/haÊŠ Ëˆmeni ËˆÃ¦plz dÉªd juË  baÉª frÉ™m Ã°É™ fruË t ËˆvendÉ”Ë r/", urdu: "Ø¢Ù¾ Ù†Û’ Ù¾Ú¾Ù„ Ù Ø±ÙˆØ´ Ø³Û’ Ú©ØªÙ†Û’ Ø³ÛŒØ¨ Ø®Ø±ÛŒØ¯Û’ØŸ", audioText: "How many apples did you buy from the fruit vendor?" },
          { english: "He spread butter on two slices of wholemeal bread.", phonetic: "/hiË  spred ËˆbÊŒtÉ™r É’n tuË  ËˆslaÉªsÉªz É™v ËˆhÉ™ÊŠlmiË l bred/", urdu: "Ø§Ø³ Ù†Û’ Ø®Ø§Ù„Øµ Ú¯Ù†Ø¯Ù… Ú©ÛŒ ÚˆØ¨Ù„ Ø±ÙˆÙ¹ÛŒ Ú©Û’ Ø¯Ùˆ Ø³Ù„Ø§Ø¦Ø³ÙˆÚº Ù¾Ø± Ù…Ú©Ú¾Ù† Ù„Ú¯Ø§ÛŒØ§Û”", audioText: "He spread butter on two slices of wholemeal bread." },
          { english: "Green tea is very popular throughout Pakistan.", phonetic: "/É¡riË n tiË  Éªz Ëˆveri ËˆpÉ’pjÉ™lÉ™r Î¸ruË ËˆaÊŠt ËŒpÉ‘Ë kÉªËˆstÉ‘Ë n/", urdu: "Ø³Ø¨Ø² Ú†Ø§Ø¦Û’ Ù¾ÙˆØ±Û’ Ù¾Ø§Ú©Ø³ØªØ§Ù† Ù…ÛŒÚº Ø¨Û Øª Ù…Ù‚Ø¨ÙˆÙ„ Û Û’Û”", audioText: "Green tea is very popular throughout Pakistan." },
          { english: "Would you like a cup of hot coffee with milk?", phonetic: "/wÊŠd juË  laÉªk É™ kÊŒp É™v hÉ’t ËˆkÉ’fi wÉªÃ° mÉªlk/", urdu: "Ú©ÛŒØ§ Ø¢Ù¾ Ø¯ÙˆØ¯Ú¾ Ú©Û’ Ø³Ø§ØªÚ¾ Ú¯Ø±Ù… Ú©Ø§Ù ÛŒ Ú©Ø§ Ú©Ù¾ Ù¾Ø³Ù†Ø¯ Ú©Ø±ÛŒÚº Ú¯Û’ØŸ", audioText: "Would you like a cup of hot coffee with milk?" },
          { english: "Pure honey is a natural source of energy.", phonetic: "/pjÊŠÉ™r ËˆhÊŒni Éªz É™ ËˆnÃ¦tÊƒrÉ™l sÉ”Ë s É™v ËˆenÉ™dÊ’i/", urdu: "Ø®Ø§Ù„Øµ Ø´Û Ø¯ ØªÙˆØ§Ù†Ø§Ø¦ÛŒ Ú©Ø§ Ù‚Ø¯Ø±ØªÛŒ Ø°Ø±ÛŒØ¹Û  Û Û’Û”", audioText: "Pure honey is a natural source of energy." }
        ]
      },
      {
        id: "sec-a1-u5-l1-3",
        type: "dialogue",
        title: "At the Grocery Shop",
        dialogue: [
          { speaker: "Customer", avatar: "C", english: "Good afternoon. I need some groceries for dinner tonight.", urdu: "Ø³Û  Ù¾Û Ø± Ø¨Ø®ÛŒØ±Û” Ù…Ø¬Ú¾Û’ Ø¢Ø¬ Ø±Ø§Øª Ú©Û’ Ú©Ú¾Ø§Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Ú©Ú†Ú¾ Ø³ÙˆØ¯Ø§ Ø³Ù„Ù  Ú†Ø§Û ÛŒÛ’Û”", audioText: "Good afternoon. I need some groceries for dinner tonight." },
          { speaker: "Grocer", avatar: "G", english: "Certainly! How many eggs and how much rice would you like?", urdu: "Ø¶Ø±ÙˆØ±! Ø¢Ù¾ Ú©Ùˆ Ú©ØªÙ†Û’ Ø§Ù†ÚˆÛ’ Ø§ÙˆØ± Ú©ØªÙ†Ø§ Ú†Ø§ÙˆÙ„ Ú†Ø§Û ÛŒÛ’ØŸ", audioText: "Certainly! How many eggs and how much rice would you like?" },
          { speaker: "Customer", avatar: "C", english: "I would like one dozen eggs and two kilograms of basmati rice.", urdu: "Ù…Ø¬Ú¾Û’ Ø§ÛŒÚ© Ø¯Ø±Ø¬Ù† Ø§Ù†ÚˆÛ’ Ø§ÙˆØ± Ø¯Ùˆ Ú©Ù„Ùˆ Ø¨Ø§Ø³Ù…ØªÛŒ Ú†Ø§ÙˆÙ„ Ú†Ø§Û ÛŒÛŒÚºÛ”", audioText: "I would like one dozen eggs and two kilograms of basmati rice." },
          { speaker: "Grocer", avatar: "G", english: "And do you need any bread or milk today?", urdu: "Ø§ÙˆØ± Ú©ÛŒØ§ Ø¢Ø¬ Ø¢Ù¾ Ú©Ùˆ ÚˆØ¨Ù„ Ø±ÙˆÙ¹ÛŒ ÛŒØ§ Ø¯ÙˆØ¯Ú¾ Ú©ÛŒ Ø¶Ø±ÙˆØ±Øª Û Û’ØŸ", audioText: "And do you need any bread or milk today?" }
        ]
      },
      {
        id: "sec-a1-u5-l1-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u5-l1-1",
            type: "mcq",
            skillTag: "countable-uncountable",
            prompt: "Which of the following is an UNCOUNTABLE food noun in English?",
            options: [
              { id: "opt-1", text: "apple" },
              { id: "opt-2", text: "rice" },
              { id: "opt-3", text: "sandwich" },
              { id: "opt-4", text: "egg" }
            ],
            correctOptionId: "opt-2",
            explanation: "'Rice' is an uncountable mass grain noun; you cannot say 'three rices'.",
            urduExplanation: "'rice' Ù†Ø§Ù‚Ø§Ø¨Ù„Ù  Ú¯Ù†ØªÛŒ (uncountable) Û Û’ØŒ Ø§Ø³ Ú©Û’ Ø³Ø§ØªÚ¾ 'three rices' Ù†Û ÛŒÚº Ú©Û ØªÛ’Û”"
          },
          {
            id: "ex-a1-u5-l1-2",
            type: "mcq",
            skillTag: "quantifiers",
            prompt: "What is the correct question to ask about water quantity?",
            options: [
              { id: "opt-1", text: "How many waters do you drink?" },
              { id: "opt-2", text: "How much waters do you drink?" },
              { id: "opt-3", text: "How much water do you drink?" },
              { id: "opt-4", text: "How many water do you drink?" }
            ],
            correctOptionId: "opt-3",
            explanation: "Uncountable nouns take 'How much' and remain in singular: 'How much water do you drink?'.",
            urduExplanation: "Ù†Ø§Ù‚Ø§Ø¨Ù„Ù  Ú¯Ù†ØªÛŒ Ø§Ø³Ù… Ú©Û’ Ù„ÛŒÛ’ 'How much water' Ù¾ÙˆÚ†Ú¾Ø§ Ø¬Ø§ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u5-l1-3",
            type: "fill_blank",
            skillTag: "countable-uncountable",
            prompt: "Complete the counter phrase: 'She ate two _____ of wholemeal bread.'",
            correctAnswer: "slices",
            explanation: "Bread is counted by 'slices' or 'loaves'.",
            urduExplanation: "ÚˆØ¨Ù„ Ø±ÙˆÙ¹ÛŒ Ú©Û’ Ù¹Ú©Ú‘ÙˆÚº Ú©Ùˆ 'slices' Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l1-4",
            type: "fill_blank",
            skillTag: "quantifiers",
            prompt: "Fill in 'How many' or 'How much': '_____ eggs are in the fridge?'",
            correctAnswer: "How many",
            explanation: "'Eggs' is a plural countable noun, so use 'How many'.",
            urduExplanation: "Eggs Ù‚Ø§Ø¨Ù„Ù  Ú¯Ù†ØªÛŒ Ø¬Ù…Ø¹ Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'How many' Ø¢Ø¦Û’ Ú¯Ø§Û”"
          },
          {
            id: "ex-a1-u5-l1-5",
            type: "order_sentence",
            skillTag: "countable-uncountable",
            prompt: "Rearrange the words to form a polite request:",
            sentenceTokens: ["Can", "I", "have", "a", "glass", "of", "water", "?"],
            correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
            explanation: "Modal (Can) + subject (I) + verb (have) + partitive phrase (a glass of water)?",
            urduExplanation: "Can I have a glass of water?"
          },
          {
            id: "ex-a1-u5-l1-6",
            type: "order_sentence",
            skillTag: "countable-uncountable",
            prompt: "Rearrange the words to form a correct statement:",
            sentenceTokens: ["Fresh", "milk", "is", "good", "for", "health", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Uncountable subject (Fresh milk) + singular verb (is) + complement (good for health).",
            urduExplanation: "Fresh milk is good for health."
          },
          {
            id: "ex-a1-u5-l1-7",
            type: "match_pairs",
            skillTag: "countable-uncountable",
            prompt: "Match the food item to its noun classification:",
            pairs: [
              { left: "apple", right: "Countable (an apple / two apples)" },
              { left: "water", right: "Uncountable (a glass of water)" },
              { left: "egg", right: "Countable (an egg / two eggs)" },
              { left: "bread", right: "Uncountable (a slice of bread)" }
            ],
            explanation: "Nouns matched accurately to countable vs uncountable.",
            urduExplanation: "Ù‚Ø§Ø¨Ù„Ù  Ú¯Ù†ØªÛŒ Ø§ÙˆØ± Ù†Ø§Ù‚Ø§Ø¨Ù„Ù  Ú¯Ù†ØªÛŒ Ú©Û’ ØµØ­ÛŒØ­ Ø¬ÙˆÚ‘Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l1-8",
            type: "error_correction",
            skillTag: "countable-uncountable",
            prompt: "Find and correct the mistake: 'I would like two breads, please.'",
            correctAnswer: "I would like two slices of bread, please.",
            explanation: "Bread is uncountable; say 'two slices of bread' or 'two pieces of bread', never 'two breads'.",
            urduExplanation: "'two breads' ØºÙ„Ø· Û Û’ØŒ 'two slices of bread' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l1-9",
            type: "error_correction",
            skillTag: "quantifiers",
            prompt: "Find and correct the mistake: 'How many sugar do you want in your tea?'",
            correctAnswer: "How much sugar do you want in your tea?",
            explanation: "'Sugar' is uncountable and requires 'How much', not 'How many'.",
            urduExplanation: "Ú†ÛŒÙ†ÛŒ (sugar) Ú©Û’ Ù„ÛŒÛ’ 'How much sugar' Ø¢Ø¦Û’ Ú¯Ø§Û”"
          },
          {
            id: "ex-a1-u5-l1-10",
            type: "true_false",
            skillTag: "countable-uncountable",
            prompt: "In English, 'water' can be made plural as 'waters' when asking for two cups. (True or False)",
            correctAnswer: "False",
            explanation: "False. Water is uncountable; you must say 'two glasses of water' or 'two bottles of water'.",
            urduExplanation: "ØºÙ„Ø·Û” Ù¾Ø§Ù†ÛŒ uncountable Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'two glasses of water' Ú©Û Ù†Ø§ Ù¾Ú‘ØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u5-l1-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u5-l1-1",
            type: "mcq",
            skillTag: "countable-uncountable",
            prompt: "Which pair contains ONE countable and ONE uncountable noun?",
            options: [
              { id: "opt-1", text: "apple and banana" },
              { id: "opt-2", text: "milk and water" },
              { id: "opt-3", text: "egg and rice" },
              { id: "opt-4", text: "tea and coffee" }
            ],
            correctOptionId: "opt-3",
            explanation: "'Egg' is countable (an egg / two eggs), while 'rice' is uncountable.",
            urduExplanation: "'egg' Ù‚Ø§Ø¨Ù„Ù  Ú¯Ù†ØªÛŒ Û Û’ Ø§ÙˆØ± 'rice' Ù†Ø§Ù‚Ø§Ø¨Ù„Ù  Ú¯Ù†ØªÛŒ Û Û’Û”"
          },
          {
            id: "qz-a1-u5-l1-2",
            type: "mcq",
            skillTag: "quantifiers",
            prompt: "Complete the question: '_____ cups of coffee do you drink every day?'",
            options: [
              { id: "opt-1", text: "How much" },
              { id: "opt-2", text: "How many" },
              { id: "opt-3", text: "How lot" },
              { id: "opt-4", text: "How few" }
            ],
            correctOptionId: "opt-2",
            explanation: "'Cups' is a countable plural noun, so it takes 'How many'.",
            urduExplanation: "'Cups' Ú¯Ù†Û’ Ø¬Ø§ Ø³Ú©ØªÛ’ Û ÛŒÚºØŒ Ø§Ø³ Ù„ÛŒÛ’ 'How many' Ø¢Ø¦Û’ Ú¯Ø§Û”"
          },
          {
            id: "qz-a1-u5-l1-3",
            type: "mcq",
            skillTag: "countable-uncountable",
            prompt: "Select the sentence with INCORRECT grammar:",
            options: [
              { id: "opt-1", text: "She bought a fresh bread at the bakery." },
              { id: "opt-2", text: "She bought a loaf of bread at the bakery." },
              { id: "opt-3", text: "She bought some bread at the bakery." },
              { id: "opt-4", text: "She bought two slices of bread at the bakery." }
            ],
            correctOptionId: "opt-1",
            explanation: "'a fresh bread' is incorrect because uncountable bread cannot take 'a'. Say 'a loaf of bread'.",
            urduExplanation: "'a fresh bread' ØºÙ„Ø· Û Û’ Ú©ÛŒÙˆÙ†Ú©Û  bread Ù†Ø§Ù‚Ø§Ø¨Ù„Ù  Ú¯Ù†ØªÛŒ Û Û’Û”"
          },
          {
            id: "qz-a1-u5-l1-4",
            type: "mcq",
            skillTag: "countable-uncountable",
            prompt: "What is the correct counter phrase for hot tea?",
            options: [
              { id: "opt-1", text: "a slice of tea" },
              { id: "opt-2", text: "a cup of tea" },
              { id: "opt-3", text: "a piece of tea" },
              { id: "opt-4", text: "a kilo of tea" }
            ],
            correctOptionId: "opt-2",
            explanation: "Hot tea is served in a cup: 'a cup of tea'.",
            urduExplanation: "Ú†Ø§Ø¦Û’ Ú©Û’ Ù„ÛŒÛ’ 'a cup of tea' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u5-l1-5",
            type: "mcq",
            skillTag: "countable-uncountable",
            prompt: "Which verb correctly completes: 'The rice _____ ready to serve.'?",
            options: [
              { id: "opt-1", text: "are" },
              { id: "opt-2", text: "were" },
              { id: "opt-3", text: "is" },
              { id: "opt-4", text: "be" }
            ],
            correctOptionId: "opt-3",
            explanation: "Uncountable nouns take the singular verb 'is'.",
            urduExplanation: "Ù†Ø§Ù‚Ø§Ø¨Ù„Ù  Ú¯Ù†ØªÛŒ Ø§Ø³Ù… Ú©Û’ Ø³Ø§ØªÚ¾ ÙˆØ§Ø­Ø¯ Ù Ø¹Ù„ 'is' Ø¢ØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u5-l1-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Countable vs Uncountable food summary:",
        summaryPoints: [
          "Countable nouns can be counted individually (an apple, two apples; an egg, three eggs).",
          "Uncountable nouns are masses or liquids (water, milk, bread, rice, sugar, tea).",
          "Uncountable nouns have no plural and take singular verbs (Rice is delicious).",
          "Measure uncountables with counters: a glass of water, a slice of bread, a cup of tea.",
          "Use 'How many' for countables; use 'How much' for uncountables."
        ]
      },
      {
        id: "sec-a1-u5-l1-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Û Ù… 'Ø±ÙˆÙ¹ÛŒ' Ú©Ùˆ Ø¨Ø§Ø¢Ø³Ø§Ù†ÛŒ Ú¯Ù†ØªÛ’ Û ÛŒÚº: 'Ø¯Ùˆ Ø±ÙˆÙ¹ÛŒØ§Úº'ØŒ 'ØªÛŒÙ† Ø±ÙˆÙ¹ÛŒØ§Úº'Û”\n\n**Ù„ÛŒÚ©Ù† Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Bread Ù†Ø§Ù‚Ø§Ø¨Ù„Ù  Ú¯Ù†ØªÛŒ (Uncountable) Û Û’!**\n- Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº 'two breads' Ú©Û Ù†Ø§ Ø¨Û Øª Ø¨Ú‘ÛŒ ØºÙ„Ø·ÛŒ Ù…Ø§Ù†Ø§ Ø¬Ø§ØªØ§ Û Û’Û”\n- ØµØ­ÛŒØ­ Ø·Ø±ÛŒÙ‚Û  ÛŒÛ  Û Û’ Ú©Û  Û Ù… Ú©Û ÛŒÚº: **two slices of bread** ÛŒØ§ **two pieces of bread**Û”\n\nØ§Ø³ÛŒ Ø·Ø±Ø­ Ù¾Ø§Ù†ÛŒØŒ Ú†Ø§Ø¦Û’ØŒ Ø¯ÙˆØ¯Ú¾ Ø§ÙˆØ± Ú†Ø§ÙˆÙ„ Ú©Û’ Ù„ÛŒÛ’ Ø¨Ú¾ÛŒ Û Ù…ÛŒØ´Û  Ù¾ÛŒÙ…Ø§Ù†Û  Ù„Ú¯Ø§Ù†Ø§ Ù¾Ú‘ØªØ§ Û Û’ (a glass of water, a cup of tea, a bowl of rice)Û”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 2: Some and Any in Food Contexts
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u5-l2",
    level: "A1",
    unit: "unit-5",
    order: 2,
    title: "Some and Any in Food Contexts",
    description: "Master the rules of 'some' and 'any' across affirmative, negative, questions, and polite offers.",
    objectives: [
      "Use 'some' in affirmative statements with plural countable and uncountable nouns",
      "Use 'any' in negative statements and general questions",
      "Apply the crucial exception: use 'some' in polite offers and requests (Would you like some tea?)"
    ],
    estimatedMinutes: 12,
    prerequisites: ["eng-a1-u5-l1"],
    skillTags: ["quantifiers", "some-any", "grammar-basics", "food"],
    vocabularyList: [
      { word: "butter", partOfSpeech: "noun", phonetic: "/ËˆbÊŒtÉ™r/", definition: "A pale yellow fatty substance made by churning cream.", urduMeaning: "Ù…Ú©Ú¾Ù†", exampleSentence: "There is some fresh butter in the fridge." },
      { word: "juice", partOfSpeech: "noun", phonetic: "/dÊ’uË s/", definition: "The liquid part that can be extracted from plant or animal tissue, especially fruit.", urduMeaning: "Ø¬ÙˆØ³ / Ø¹Ø±Ù‚", exampleSentence: "Do you have any fresh orange juice?" },
      { word: "fruit", partOfSpeech: "noun", phonetic: "/fruË t/", definition: "The sweet and fleshy product of a tree or other plant containing seed.", urduMeaning: "Ù¾Ú¾Ù„", exampleSentence: "We eat some fresh fruit after lunch." },
      { word: "vegetable", partOfSpeech: "noun", phonetic: "/ËˆvedÊ’tÉ™bl/", definition: "A plant or part of a plant used as food, typically as an accompaniment to meat or fish.", urduMeaning: "Ø³Ø¨Ø²ÛŒ", exampleSentence: "There are some green vegetables in the basket." },
      { word: "meat", partOfSpeech: "noun", phonetic: "/miË t/", definition: "The flesh of an animal as food.", urduMeaning: "Ú¯ÙˆØ´Øª", exampleSentence: "He does not eat any red meat." },
      { word: "chicken", partOfSpeech: "noun", phonetic: "/ËˆtÊƒÉªkÉªn/", definition: "A domestic fowl kept for its eggs or meat.", urduMeaning: "Ù…Ø±ØºÛŒ", exampleSentence: "We ordered some chicken biryani for dinner." },
      { word: "soup", partOfSpeech: "noun", phonetic: "/suË p/", definition: "A liquid dish, typically made by boiling meat, fish, or vegetables in stock or water.", urduMeaning: "Ø³ÙˆÙ¾ / ÛŒØ®Ù†ÛŒ", exampleSentence: "Would you like some hot chicken soup?" },
      { word: "salad", partOfSpeech: "noun", phonetic: "/ËˆsÃ¦lÉ™d/", definition: "A cold dish of various raw or cooked vegetables.", urduMeaning: "Ø³Ù„Ø§Ø¯", exampleSentence: "She prepared some fresh cucumber salad." },
      { word: "salt", partOfSpeech: "noun", phonetic: "/sÉ”Ë lt/", definition: "A white crystalline substance, sodium chloride, used for seasoning food.", urduMeaning: "Ù†Ù…Ú©", exampleSentence: "Is there any salt on the dining table?" },
      { word: "pepper", partOfSpeech: "noun", phonetic: "/ËˆpepÉ™r/", definition: "A pungent hot-tasting powder prepared from dried peppercorns.", urduMeaning: "Ú©Ø§Ù„ÛŒ Ù…Ø±Ú†", exampleSentence: "Add some black pepper to the soup." }
    ],
    sections: [
      {
        id: "sec-a1-u5-l2-1",
        type: "explain",
        title: "The Standard Rules for Some & Any",
        content: "Both **some** and **any** mean an unspecified amount or number. They are used with **plural countable nouns** (*apples*) and **uncountable nouns** (*milk*).\n\n### 1. Affirmative Statements: Use SOME\n- *There is **some** milk in the fridge.*\n- *We have **some** fresh apples on the table.*\n\n### 2. Negative Statements: Use ANY\n- *There isn't **any** milk left.*\n- *We don't have **any** apples today.*\n\n### 3. General Questions: Use ANY\n- *Is there **any** tea in the pot?*\n- *Do you have **any** brothers?*\n\n### 4. The Polite Offer / Request Exception: Use SOME\nWhen offering something politely or asking for something where you expect a 'yes', use **SOME**, not any:\n- *Would you like **some** tea?* (Offer)\n- *Can I have **some** water, please?* (Request)",
        tables: [
          {
            title: "Some vs. Any Decision Matrix",
            headers: ["Sentence Type", "Word to Use", "Example with Uncountable", "Example with Plural Countable"],
            rows: [
              ["Affirmative (+)", "SOME", "There is some butter.", "There are some oranges."],
              ["Negative (-)", "ANY", "There isn't any butter.", "There aren't any oranges."],
              ["General Question (?)", "ANY", "Is there any butter?", "Are there any oranges?"],
              ["Polite Offer / Request", "SOME", "Would you like some tea?", "Can I take some apples?"]
            ]
          },
          {
            title: "Summary of Troublemakers",
            headers: ["Incorrect Utterance", "Why It Fails", "Correct Natural English"],
            rows: [
              ["I don't have some money.", "Negatives require 'any'.", "I don't have any money."],
              ["Would you like any tea?", "Offers require 'some' for hospitality.", "Would you like some tea?"],
              ["Do you have some salt?", "General questions use 'any'.", "Do you have any salt?"]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Hospitality Rule",
            text: "When serving guests, always say: **Would you like some tea / some biscuits?** Using 'any' in an offer can sound cold or skeptical."
          },
          {
            type: "warning",
            title: "Never with Singular Countable Nouns",
            text: "Do NOT use some/any for one countable item. Say **an apple**, NOT *'some apple'*."
          }
        ]
      },
      {
        id: "sec-a1-u5-l2-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "There is some fresh butter on the kitchen counter.", phonetic: "/Ã°eÉ™r Éªz sÊŒm freÊƒ ËˆbÊŒtÉ™r É’n Ã°É™ ËˆkÉªtÊƒÉªn ËˆkaÊŠntÉ™r/", urdu: "Ø¨Ø§ÙˆØ±Ú†ÛŒ Ø®Ø§Ù†Û’ Ú©Û’ Ú©Ø§Ø¤Ù†Ù¹Ø± Ù¾Ø± Ú©Ú†ÚÚ¾ ØªØ§Ø²Û  Ù…Ú©Ú¾Ù† Û Û’Û”", audioText: "There is some fresh butter on the kitchen counter." },
          { english: "We don't have any milk left for tomorrow's breakfast.", phonetic: "/wiË  dÉ™ÊŠnt hÃ¦v Ëˆeni mÉªlk left fÉ”Ë r tÉ™ËˆmÉ’rÉ™ÊŠz ËˆbrekfÉ™st/", urdu: "Ú©Ù„ Ú©Û’ Ù†Ø§Ø´ØªÛ’ Ú©Û’ Ù„ÛŒÛ’ Û Ù…Ø§Ø±Û’ Ù¾Ø§Ø³ Ø¨Ø§Ù„Ú©Ù„ Ø¯ÙˆØ¯Ú¾ Ù†Û ÛŒÚº Ø¨Ú†Ø§Û”", audioText: "We don't have any milk left for tomorrow's breakfast." },
          { english: "Do you have any questions about this grammar lesson?", phonetic: "/duË  juË  hÃ¦v Ëˆeni ËˆkwestÊƒÉ™nz É™ËˆbaÊŠt Ã°Éªs ËˆÉ¡rÃ¦mÉ™r Ëˆlesn/", urdu: "Ú©ÛŒØ§ Ø§Ø³ Ú¯Ø±Ø§Ù…Ø± Ú©Û’ Ø³Ø¨Ù‚ Ú©Û’ Ø¨Ø§Ø±Û’ Ù…ÛŒÚº Ø¢Ù¾ Ú©Ø§ Ú©ÙˆØ¦ÛŒ Ø³ÙˆØ§Ù„ Û Û’ØŸ", audioText: "Do you have any questions about this grammar lesson?" },
          { english: "Would you like some hot green tea after dinner?", phonetic: "/wÊŠd juË  laÉªk sÊŒm hÉ’t É¡riË n tiË  ËˆÉ‘Ë ftÉ™r ËˆdÉªnÉ™r/", urdu: "Ú©ÛŒØ§ Ø¢Ù¾ Ø±Ø§Øª Ú©Û’ Ú©Ú¾Ø§Ù†Û’ Ú©Û’ Ø¨Ø¹Ø¯ Ú©Ú†Ú¾ Ú¯Ø±Ù… Ø³Ø¨Ø² Ú†Ø§Ø¦Û’ Ù¾Ø³Ù†Ø¯ Ú©Ø±ÛŒÚº Ú¯Û’ØŸ", audioText: "Would you like some hot green tea after dinner?" },
          { english: "Can I have some more water, please?", phonetic: "/kÃ¦n aÉª hÃ¦v sÊŒm mÉ”Ë r ËˆwÉ”Ë tÉ™r pliË z/", urdu: "Ú©ÛŒØ§ Ù…Ø¬Ú¾Û’ ØªÚ¾ÙˆÚ‘Ø§ Ø§ÙˆØ± Ù¾Ø§Ù†ÛŒ Ù…Ù„ Ø³Ú©ØªØ§ Û Û’ØŒ Ø¨Ø±Ø§Û  Ú©Ø±Ù…ØŸ", audioText: "Can I have some more water, please?" },
          { english: "There aren't any eggs in the refrigerator.", phonetic: "/Ã°eÉ™r É‘Ë nt Ëˆeni eÉ¡z Éªn Ã°É™ rÉªËˆfrÉªdÊ’É™reÉªtÉ™r/", urdu: "Ù Ø±Ø¬ Ù…ÛŒÚº Ø¨Ø§Ù„Ú©Ù„ Ø§Ù†ÚˆÛ’ Ù†Û ÛŒÚº Û ÛŒÚºÛ”", audioText: "There aren't any eggs in the refrigerator." },
          { english: "She prepared some fresh cucumber salad for the guests.", phonetic: "/ÊƒiË  prÉªËˆpeÉ™d sÊŒm freÊƒ ËˆkjuË kÊŒmbÉ™r ËˆsÃ¦lÉ™d fÉ”Ë r Ã°É™ É¡ests/", urdu: "Ø§Ø³ Ù†Û’ Ù…Û Ù…Ø§Ù†ÙˆÚº Ú©Û’ Ù„ÛŒÛ’ Ú©Ú†Ú¾ ØªØ§Ø²Û  Ú©Ú¾ÛŒØ±Û’ Ú©Ø§ Ø³Ù„Ø§Ø¯ ØªÛŒØ§Ø± Ú©ÛŒØ§Û”", audioText: "She prepared some fresh cucumber salad for the guests." },
          { english: "Is there any salt on the dining table?", phonetic: "/Éªz Ã°eÉ™r Ëˆeni sÉ”Ë lt É’n Ã°É™ ËˆdaÉªnÉªÅ‹ ËˆteÉªbl/", urdu: "Ú©ÛŒØ§ Ú©Ú¾Ø§Ù†Û’ Ú©ÛŒ Ù…ÛŒØ² Ù¾Ø± Ú©Ú†Ú¾ Ù†Ù…Ú© Ù…ÙˆØ¬ÙˆØ¯ Û Û’ØŸ", audioText: "Is there any salt on the dining table?" }
        ]
      },
      {
        id: "sec-a1-u5-l2-3",
        type: "dialogue",
        title: "Offering Refreshments to Guests",
        dialogue: [
          { speaker: "Host", avatar: "H", english: "Welcome, brother Tariq! Would you like some tea or cold juice?", urdu: "Ø®ÙˆØ´ Ø¢Ù…Ø¯ÛŒØ¯ Ø¨ÚÚ¾Ø§Ø¦ÛŒ Ø·Ø§Ø±Ù‚! Ú©ÛŒØ§ Ø¢Ù¾ Ú©Ú†Ú¾ Ú†Ø§Ø¦Û’ ÛŒØ§ Ù¹Ú¾Ù†ÚˆØ§ Ø¬ÙˆØ³ Ù¾Ø³Ù†Ø¯ Ú©Ø±ÛŒÚº Ú¯Û’ØŸ", audioText: "Welcome, brother Tariq! Would you like some tea or cold juice?" },
          { speaker: "Guest", avatar: "G", english: "Hot tea would be wonderful, thank you very much.", urdu: "Ú¯Ø±Ù… Ú†Ø§Ø¦Û’ Ø¨Û Øª Ø§Ú†Ú¾ÛŒ Ø±Û Û’ Ú¯ÛŒØŒ Ø¢Ù¾ Ú©Ø§ Ø¨Û Øª Ø´Ú©Ø±ÛŒÛ Û”", audioText: "Hot tea would be wonderful, thank you very much." },
          { speaker: "Host", avatar: "H", english: "Do you take any sugar in your tea?", urdu: "Ú©ÛŒØ§ Ø¢Ù¾ Ú†Ø§Ø¦Û’ Ù…ÛŒÚº Ú†ÛŒÙ†ÛŒ Ù„ÛŒØªÛ’ Û ÛŒÚºØŸ", audioText: "Do you take any sugar in your tea?" },
          { speaker: "Guest", avatar: "G", english: "Just one spoon of sugar, please. And could I have some water too?", urdu: "Ø¨Ø±Ø§Û  Ú©Ø±Ù… ØµØ±Ù  Ø§ÛŒÚ© Ú†Ù…Ú† Ú†ÛŒÙ†ÛŒÛ” Ø§ÙˆØ± Ú©ÛŒØ§ Ù…Ø¬Ú¾Û’ ØªÚ¾ÙˆÚ‘Ø§ Ù¾Ø§Ù†ÛŒ Ø¨Ú¾ÛŒ Ù…Ù„ Ø³Ú©ØªØ§ Û Û’ØŸ", audioText: "Just one spoon of sugar, please. And could I have some water too?" }
        ]
      },
      {
        id: "sec-a1-u5-l2-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u5-l2-1",
            type: "mcq",
            skillTag: "some-any",
            prompt: "Choose the correct word: 'We don't have _____ bread left in the kitchen.'",
            options: [
              { id: "opt-1", text: "some" },
              { id: "opt-2", text: "a" },
              { id: "opt-3", text: "an" },
              { id: "opt-4", text: "any" }
            ],
            correctOptionId: "opt-4",
            explanation: "Negative statements take 'any': 'We don't have any bread'.",
            urduExplanation: "Ù…Ù†Ù ÛŒ Ø¬Ù…Ù„ÙˆÚº Ù…ÛŒÚº 'any' Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u5-l2-2",
            type: "mcq",
            skillTag: "some-any",
            prompt: "Choose the correct word for a polite offer: 'Would you like _____ tea?'",
            options: [
              { id: "opt-1", text: "some" },
              { id: "opt-2", text: "any" },
              { id: "opt-3", text: "a" },
              { id: "opt-4", text: "no" }
            ],
            correctOptionId: "opt-1",
            explanation: "Polite offers use 'some' for hospitality: 'Would you like some tea?'.",
            urduExplanation: "Ø§Ø®Ù„Ø§Ù‚ÛŒ Ù¾ÛŒØ´Ú©Ø´ Ù…ÛŒÚº 'some' Ø¢ØªØ§ Û Û’: 'Would you like some tea?'Û”"
          },
          {
            id: "ex-a1-u5-l2-3",
            type: "fill_blank",
            skillTag: "some-any",
            prompt: "Fill in 'some' or 'any': 'There is _____ fresh butter on the plate.'",
            correctAnswer: "some",
            explanation: "Affirmative statements use 'some'.",
            urduExplanation: "Ù…Ø«Ø¨Øª Ø¬Ù…Ù„Û’ Ù…ÛŒÚº 'some' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u5-l2-4",
            type: "fill_blank",
            skillTag: "some-any",
            prompt: "Fill in 'some' or 'any': 'Are there _____ eggs in the basket?'",
            correctAnswer: "any",
            explanation: "General questions use 'any'.",
            urduExplanation: "Ø¹Ø§Ù… Ø³ÙˆØ§Ù„ Ù…ÛŒÚº 'any' Ù„Ú¯Ø§ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l2-5",
            type: "order_sentence",
            skillTag: "some-any",
            prompt: "Rearrange the words to make a polite offer:",
            sentenceTokens: ["Would", "you", "like", "some", "hot", "coffee", "?"],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Polite offer formula: Would you like + some + hot coffee?",
            urduExplanation: "Would you like some hot coffee?"
          },
          {
            id: "ex-a1-u5-l2-6",
            type: "order_sentence",
            skillTag: "some-any",
            prompt: "Rearrange the words to form a correct negative sentence:",
            sentenceTokens: ["There", "isn't", "any", "milk", "in", "the", "jug", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
            explanation: "There + isn't + any + milk + in the jug.",
            urduExplanation: "There isn't any milk in the jug."
          },
          {
            id: "ex-a1-u5-l2-7",
            type: "match_pairs",
            skillTag: "some-any",
            prompt: "Match the sentence context to whether it typically uses 'some' or 'any':",
            pairs: [
              { left: "Affirmative statement", right: "some" },
              { left: "Negative statement", right: "any" },
              { left: "Polite tea offer", right: "some" },
              { left: "General inquiry question", right: "any" }
            ],
            explanation: "Standard rules matched accurately.",
            urduExplanation: "Ø¬Ù…Ù„Û’ Ú©ÛŒ Ù‚Ø³Ù… Ú©Ùˆ some ÛŒØ§ any Ø³Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l2-8",
            type: "error_correction",
            skillTag: "some-any",
            prompt: "Find and correct the mistake: 'I don't have some money today.'",
            correctAnswer: "I don't have any money today.",
            explanation: "Negatives require 'any': 'I don't have any money'.",
            urduExplanation: "Ù…Ù†Ù ÛŒ Ù…ÛŒÚº 'any' Ø¢Ø¦Û’ Ú¯Ø§: 'I don't have any money'Û”"
          },
          {
            id: "ex-a1-u5-l2-9",
            type: "error_correction",
            skillTag: "some-any",
            prompt: "Find and correct the mistake: 'Would you like any cake?'",
            correctAnswer: "Would you like some cake?",
            explanation: "Polite offers of hospitality take 'some': 'Would you like some cake?'.",
            urduExplanation: "Ù¾ÛŒØ´Ú©Ø´ Ú©Û’ Ù„ÛŒÛ’ 'some cake' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l2-10",
            type: "true_false",
            skillTag: "some-any",
            prompt: "'Can I have some water, please?' is correct because it is a polite request. (True or False)",
            correctAnswer: "True",
            explanation: "True. Polite requests expecting an affirmative response take 'some'.",
            urduExplanation: "Ø¯Ø±Ø³ØªÛ” Ù…ÙˆØ¯Ø¨Ø§Ù†Û  Ø¯Ø±Ø®ÙˆØ§Ø³Øª Ù…ÛŒÚº 'some' Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u5-l2-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u5-l2-1",
            type: "mcq",
            skillTag: "some-any",
            prompt: "Complete the sentence: 'Are there _____ clean glasses in the cupboard?'",
            options: [
              { id: "opt-1", text: "some" },
              { id: "opt-2", text: "a" },
              { id: "opt-3", text: "much" },
              { id: "opt-4", text: "any" }
            ],
            correctOptionId: "opt-4",
            explanation: "General questions use 'any': 'Are there any clean glasses?'.",
            urduExplanation: "Ø¹Ø§Ù… Ø³ÙˆØ§Ù„ Ù…ÛŒÚº 'any' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u5-l2-2",
            type: "mcq",
            skillTag: "some-any",
            prompt: "Why do we say 'Would you like some tea?' instead of 'any tea'?",
            options: [
              { id: "opt-1", text: "Because tea is uncountable" },
              { id: "opt-2", text: "Because it is a polite offer of hospitality" },
              { id: "opt-3", text: "Because any is never used in questions" },
              { id: "opt-4", text: "Because some is always for liquids" }
            ],
            correctOptionId: "opt-2",
            explanation: "In polite offers and requests, English speakers use 'some'.",
            urduExplanation: "Ú†ÙˆÙ†Ú©Û  ÛŒÛ  Ø§Ø®Ù„Ø§Ù‚ÛŒ Ù¾ÛŒØ´Ú©Ø´ Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ 'some' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u5-l2-3",
            type: "mcq",
            skillTag: "some-any",
            prompt: "Select the sentence with INCORRECT usage:",
            options: [
              { id: "opt-1", text: "She has some fresh apples." },
              { id: "opt-2", text: "We don't have some sugar." },
              { id: "opt-3", text: "Is there any juice left?" },
              { id: "opt-4", text: "Can I have some sugar?" }
            ],
            correctOptionId: "opt-2",
            explanation: "'We don't have some sugar' is incorrect; negatives take 'any sugar'.",
            urduExplanation: "Ù…Ù†Ù ÛŒ Ù…ÛŒÚº 'any sugar' Û ÙˆÙ†Ø§ Ú†Ø§Û ÛŒÛ’Û”"
          },
          {
            id: "qz-a1-u5-l2-4",
            type: "mcq",
            skillTag: "some-any",
            prompt: "Complete: 'There is _____ delicious biryani left in the pot.'",
            options: [
              { id: "opt-1", text: "any" },
              { id: "opt-2", text: "an" },
              { id: "opt-3", text: "some" },
              { id: "opt-4", text: "many" }
            ],
            correctOptionId: "opt-3",
            explanation: "Affirmative statements take 'some'.",
            urduExplanation: "Ù…Ø«Ø¨Øª Ø¬Ù…Ù„Û’ Ù…ÛŒÚº 'some' ØµØ­ÛŒØ­ Û Û’Û”"
          },
          {
            id: "qz-a1-u5-l2-5",
            type: "mcq",
            skillTag: "some-any",
            prompt: "Which pair shows statement and negative correctly using some and any?",
            options: [
              { id: "opt-1", text: "I have some money -> I don't have some money" },
              { id: "opt-2", text: "I have any money -> I don't have any money" },
              { id: "opt-3", text: "I have some money -> I don't have any money" },
              { id: "opt-4", text: "I have some money -> I don't have none money" }
            ],
            correctOptionId: "opt-3",
            explanation: "Affirmative 'some' switches to 'any' in negative.",
            urduExplanation: "Ù…Ø«Ø¨Øª (some) Ù…Ù†Ù ÛŒ Ù…ÛŒÚº (any) Ø¨Ù† Ø¬Ø§ØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u5-l2-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Some and Any takeaways:",
        summaryPoints: [
          "Use 'some' in positive statements (There is some milk).",
          "Use 'any' in negative statements (There isn't any milk).",
          "Use 'any' in general questions (Is there any milk?).",
          "EXCEPTION: Use 'some' for polite offers (Would you like some tea?) and requests (Can I have some water?).",
          "Both words work with uncountable nouns and plural countable nouns."
        ]
      },
      {
        id: "sec-a1-u5-l2-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Û Ù… **'Ú©Ú†Ú¾'** ÛŒØ§ **'Ú©ÙˆØ¦ÛŒ'** Ø¯ÙˆÙ†ÙˆÚº Ø·Ø±Ø­ Ú©Û’ Ø¬Ù…Ù„ÙˆÚº Ù…ÛŒÚº Ø¨ÙˆÙ„ Ø¯ÛŒØªÛ’ Û ÛŒÚº:\n- 'Ù…ÛŒØ±Û’ Ù¾Ø§Ø³ Ú©Ú†Ú¾ Ù¾ÛŒØ³Û’ Û ÛŒÚº'\n- 'Ù…ÛŒØ±Û’ Ù¾Ø§Ø³ Ú©ÙˆØ¦ÛŒ Ù¾ÛŒØ³Û  Ù†Û ÛŒÚº Û Û’'\n\nØ§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ù‚Ø§Ø¹Ø¯Û  Ø¨Û Øª ÙˆØ§Ø¶Ø­ Û Û’:\n- Ù…Ø«Ø¨Øª (+) Ø¬Ù…Ù„Û’ Ù…ÛŒÚº: **Some** (I have some money)\n- Ù…Ù†Ù ÛŒ (-) Ø¬Ù…Ù„Û’ Ù…ÛŒÚº: **Any** (I don't have any money)\n- Ø¹Ø§Ù… Ø³ÙˆØ§Ù„ (?) Ù…ÛŒÚº: **Any** (Do you have any money?)\n\n**Ø§Û Ù… Ø§Ø³ØªØ«Ù†ÛŒÙ°:** Ø¬Ø¨ Ù…Û Ù…Ø§Ù† Ú©Ùˆ Ú†Ø§Ø¦Û’ ÛŒØ§ Ú©Ú¾Ø§Ù†Û’ Ú©ÛŒ Ù¾ÛŒØ´Ú©Ø´ Ú©Ø±ÛŒÚº ØªÙˆ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ø¨Ú¾ÛŒ Ø§Ø¯Ø¨ Ú©Û’ Ù„Ø­Ø§Ø¸ Ø³Û’ **Some** Ù„Ú¯ØªØ§ Û Û’: **'Would you like some tea?'** (ÛŒÛ Ø§Úº 'any' Ù†Û ÛŒÚº Ø¨ÙˆÙ„Ù†Ø§)Û”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 3: Polite Requests: Can I have...? / I'd like...
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u5-l3",
    level: "A1",
    unit: "unit-5",
    order: 3,
    title: "Polite Requests: Can I have...? / I'd like...",
    description: "Learn how to order food and drink politely in a cafe or restaurant using standard formulas.",
    objectives: [
      "Use 'Can I have...?' and 'Could I have...?' for courteous requests",
      "Use 'I would like...' and its contraction 'I'd like...' naturally",
      "Include polite markers ('please', 'thank you', 'excuse me') at appropriate stages of service"
    ],
    estimatedMinutes: 10,
    prerequisites: ["eng-a1-u5-l2"],
    skillTags: ["requests", "dialogue", "politeness", "cafe-ordering"],
    vocabularyList: [
      { word: "cup", partOfSpeech: "noun", phonetic: "/kÊŒp/", definition: "A small bowl-shaped container for drinking from, typically with a handle.", urduMeaning: "Ú©Ù¾ / Ù¾ÛŒØ§Ù„ÛŒ", exampleSentence: "Can I have a cup of black coffee, please?" },
      { word: "glass", partOfSpeech: "noun", phonetic: "/É¡lÉ‘Ë s/", definition: "A drinking container made of glass.", urduMeaning: "Ú¯Ù„Ø§Ø³", exampleSentence: "She ordered a tall glass of freshly squeezed orange juice." },
      { word: "bottle", partOfSpeech: "noun", phonetic: "/ËˆbÉ’tl/", definition: "A glass or plastic container with a narrow neck, used for storing drinks.", urduMeaning: "Ø¨ÙˆØªÙ„", exampleSentence: "Please bring a bottle of still mineral water." },
      { word: "order", partOfSpeech: "verb", phonetic: "/ËˆÉ”Ë dÉ™r/", definition: "To request something to be made, supplied, or served.", urduMeaning: "Ø¢Ø±ÚˆØ± Ú©Ø±Ù†Ø§ / Ù…Ù†Ú¯ÙˆØ§Ù†Ø§", exampleSentence: "Are you ready to order your meal?" },
      { word: "menu", partOfSpeech: "noun", phonetic: "/ËˆmenjuË /", definition: "A list of the food and drink options available in a restaurant.", urduMeaning: "Ù…ÛŒÙ†ÛŒÙˆ / Ú©Ú¾Ø§Ù†ÙˆÚº Ú©ÛŒ Ù Û Ø±Ø³Øª", exampleSentence: "Could we see the dessert menu, please?" },
      { word: "bill", partOfSpeech: "noun", phonetic: "/bÉªl/", definition: "A printed or written statement of the money owed for goods or services.", urduMeaning: "Ø¨Ù„ / Ø­Ø³Ø§Ø¨", exampleSentence: "Excuse me, can we have the bill, please?" },
      { word: "please", partOfSpeech: "adverb", phonetic: "/pliË z/", definition: "Used in polite requests or questions.", urduMeaning: "Ø¨Ø±Ø§Û  Ú©Ø±Ù… / Ù„Ø·Ù Ø§Ù‹", exampleSentence: "A bottle of water, please." },
      { word: "thank", partOfSpeech: "verb", phonetic: "/Î¸Ã¦Å‹k/", definition: "To express gratitude to someone.", urduMeaning: "Ø´Ú©Ø±ÛŒÛ  Ø§Ø¯Ø§ Ú©Ø±Ù†Ø§", exampleSentence: "Thank you for the excellent service." },
      { word: "delicious", partOfSpeech: "adjective", phonetic: "/dÉªËˆlÉªÊƒÉ™s/", definition: "Highly pleasant to the taste.", urduMeaning: "Ù„Ø°ÛŒØ° / Ù…Ø²Û’ Ø¯Ø§Ø±", exampleSentence: "The chicken karahi was absolutely delicious." },
      { word: "hot", partOfSpeech: "adjective", phonetic: "/hÉ’t/", definition: "Having a high degree of heat or a high temperature.", urduMeaning: "Ú¯Ø±Ù…", exampleSentence: "Be careful; the soup is very hot." }
    ],
    sections: [
      {
        id: "sec-a1-u5-l3-1",
        type: "explain",
        title: "Polite Cafe Ordering Formulas",
        content: "In English-speaking culture, asking for food bluntly (*'I want tea'*) sounds rude or demanding. Instead, use these **polite formulas**:\n\n### 1. 'Can I have...?' / 'Could I have...?'\n- *Can I have a cup of tea, please?*\n- *Could I have a bottle of water, please?* (Even more polite)\n\n### 2. 'I would like...' -> 'I'd like...'\n- *I'd like a chicken sandwich, please.*\n- *I'd like two coffees to take away.*\n\n### 3. Paying the Bill\n- *Can we have the bill, please?* (UK) / *Check, please.* (US)",
        tables: [
          {
            title: "From Blunt to Courteous",
            headers: ["Too Blunt / Rude", "Polite Everyday English", "Extra Courteous / Formal"],
            rows: [
              ["Give me tea.", "Can I have a cup of tea, please?", "Could I please have a cup of tea?"],
              ["I want a sandwich.", "I'd like a chicken sandwich, please.", "I would like a chicken sandwich, please."],
              ["Bring the bill.", "Can we have the bill, please?", "Could we get the bill when you have a moment?"]
            ]
          },
          {
            title: "Crucial Service Interactions",
            headers: ["Waiter Says", "You Answer", "Urdu Translation"],
            rows: [
              ["Are you ready to order?", "Yes, I'd like the biryani, please.", "Ø¬ÛŒ Û Ø§ÚºØŒ Ù…ÛŒÚº Ø¨Ø±ÛŒØ§Ù†ÛŒ Ù„ÙˆÚº Ú¯Ø§Û”"],
              ["Anything to drink?", "Just a glass of water, please.", "Ø¨Ø±Ø§Û  Ú©Ø±Ù… ØµØ±Ù  Ø§ÛŒÚ© Ú¯Ù„Ø§Ø³ Ù¾Ø§Ù†ÛŒÛ”"],
              ["Still or sparkling water?", "Still water, please.", "Ø³Ø§Ø¯Û  Ù¾Ø§Ù†ÛŒØŒ Ø¨Ø±Ø§Û  Ú©Ø±Ù…Û”"]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Always Include 'Please'",
            text: "In English service encounters, adding **please** at the end of every order is not just polite—it is expected social etiquette."
          },
          {
            type: "warning",
            title: "Avoid 'I Want'",
            text: "Never say 'I want' to a waiter. Say **I would like** or **Can I have**."
          }
        ]
      },
      {
        id: "sec-a1-u5-l3-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "Can I have a cup of hot English tea, please?", phonetic: "/kÃ¦n aÉª hÃ¦v É™ kÊŒp É™v hÉ’t ËˆÉªÅ‹É¡lÉªÊƒ tiË  pliË z/", urdu: "Ú©ÛŒØ§ Ù…Ø¬Ú¾Û’ Ø§ÛŒÚ© Ú©Ù¾ Ú¯Ø±Ù… Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ú†Ø§Ø¦Û’ Ù…Ù„ Ø³Ú©ØªÛŒ Û Û’ØŒ Ø¨Ø±Ø§Û  Ú©Ø±Ù…ØŸ", audioText: "Can I have a cup of hot English tea, please?" },
          { english: "I'd like a chicken sandwich with extra cheese, please.", phonetic: "/aÉªd laÉªk É™ ËˆtÊƒÉªkÉªn ËˆsÃ¦nwÉªdÊ’ wÉªÃ° ËˆekstrÉ™ tÊƒiË z pliË z/", urdu: "Ù…ÛŒÚº Ø§Ø¶Ø§Ù ÛŒ Ú†ÛŒØ² Ú©Û’ Ø³Ø§ØªÚ¾ Ú†Ú©Ù† Ø³ÛŒÙ†ÚˆÙˆÚ† Ù¾Ø³Ù†Ø¯ Ú©Ø±ÙˆÚº Ú¯Ø§Û”", audioText: "I'd like a chicken sandwich with extra cheese, please." },
          { english: "Could we have the menu for drinks, please?", phonetic: "/kÊŠd wiË  hÃ¦v Ã°É™ ËˆmenjuË  fÉ”Ë r drÉªÅ‹ks pliË z/", urdu: "Ú©ÛŒØ§ Û Ù…ÛŒÚº Ù…Ø´Ø±ÙˆØ¨Ø§Øª Ú©Ø§ Ù…ÛŒÙ†ÛŒÙˆ Ù…Ù„ Ø³Ú©ØªØ§ Û Û’ØŸ", audioText: "Could we have the menu for drinks, please?" },
          { english: "Excuse me, can we have the bill when you have a moment?", phonetic: "/ÉªkËˆskjuË z miË  kÃ¦n wiË  hÃ¦v Ã°É™ bÉªl wen juË  hÃ¦v É™ ËˆmÉ™ÊŠmÉ™nt/", urdu: "Ù…Ø¹Ø§Ù  Ú©ÛŒØ¬Ø¦Û’ Ú¯Ø§ØŒ ÙˆÙ‚Øª Ù…Ù„Ù†Û’ Ù¾Ø± Ú©ÛŒØ§ Û Ù…ÛŒÚº Ø¨Ù„ Ù…Ù„ Ø³Ú©ØªØ§ Û Û’ØŸ", audioText: "Excuse me, can we have the bill when you have a moment?" },
          { english: "Would you like that for here or to take away?", phonetic: "/wÊŠd juË  laÉªk Ã°Ã¦t fÉ”Ë r hÉªÉ™r É”Ë r tuË  teÉªk É™ËˆweÉª/", urdu: "Ú©ÛŒØ§ Ø¢Ù¾ ÛŒÛ Ø§Úº Ú©Ú¾Ø§Ø¦ÛŒÚº Ú¯Û’ ÛŒØ§ Ø³Ø§ØªÚ¾ Ù„Û’ Ú©Ø± Ø¬Ø§Ø¦ÛŒÚº Ú¯Û’ØŸ", audioText: "Would you like that for here or to take away?" },
          { english: "To take away, please. Thank you very much.", phonetic: "/tuË  teÉªk É™ËˆweÉª pliË z Î¸Ã¦Å‹k juË  Ëˆveri mÊŒtÊƒ/", urdu: "Ø³Ø§ØªÚ¾ Ù„Û’ Ø¬Ø§Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ØŒ Ø¨Ø±Ø§Û  Ú©Ø±Ù…Û” Ø¨Û Øª Ø´Ú©Ø±ÛŒÛ Û”", audioText: "To take away, please. Thank you very much." },
          { english: "The mutton biryani was truly delicious and flavourful.", phonetic: "/Ã°É™ ËˆmÊŒtn ËŒbÉªriË ËˆÉ‘Ë ni wÉ’z ËˆtruË li dÉªËˆlÉªÊƒÉ™s Ã¦nd ËˆfleÉªvÉ™fl/", urdu: "Ù…Ù¹Ù† Ø¨Ø±ÛŒØ§Ù†ÛŒ ÙˆØ§Ù‚Ø¹ÛŒ Ø¨Û Øª Ù„Ø°ÛŒØ° Ø§ÙˆØ± Ø°Ø§Ø¦Ù‚Û’ Ø¯Ø§Ø± ØªÚ¾ÛŒÛ”", audioText: "The mutton biryani was truly delicious and flavourful." },
          { english: "Could you bring two extra glasses of tap water?", phonetic: "/kÊŠd juË  brÉªÅ‹ tuË  ËˆekstrÉ™ ËˆÉ¡lÉ‘Ë sÉªz É™v tÃ¦p ËˆwÉ”Ë tÉ™r/", urdu: "Ú©ÛŒØ§ Ø¢Ù¾ Ù†Ù„ Ú©Û’ Ù¾Ø§Ù†ÛŒ Ú©Û’ Ø¯Ùˆ Ø§Ø¶Ø§Ù ÛŒ Ú¯Ù„Ø§Ø³ Ù„Ø§ Ø³Ú©ØªÛ’ Û ÛŒÚºØŸ", audioText: "Could you bring two extra glasses of tap water?" }
        ]
      },
      {
        id: "sec-a1-u5-l3-3",
        type: "dialogue",
        title: "Ordering at a Coffee Shop",
        dialogue: [
          { speaker: "Barista", avatar: "B", english: "Hi there! What can I get for you today?", urdu: "Û ÛŒÙ„Ùˆ! Ø¢Ø¬ Ù…ÛŒÚº Ø¢Ù¾ Ú©Û’ Ù„ÛŒÛ’ Ú©ÛŒØ§ Ù„Ø§Ø¤ÚºØŸ", audioText: "Hi there! What can I get for you today?" },
          { speaker: "Customer", avatar: "C", english: "Hello! Could I have a medium cappuccino and a chocolate muffin, please?", urdu: "Û ÛŒÙ„Ùˆ! Ú©ÛŒØ§ Ù…Ø¬Ú¾Û’ Ø§ÛŒÚ© Ø¯Ø±Ù…ÛŒØ§Ù†Ø§ Ú©ÛŒÙ¾ÙˆÚ†ÛŒÙ†Ùˆ Ø§ÙˆØ± Ú†Ø§Ú©Ù„ÛŒÙ¹ Ù…Ù Ù† Ù…Ù„ Ø³Ú©ØªØ§ Û Û’ØŸ", audioText: "Hello! Could I have a medium cappuccino and a chocolate muffin, please?" },
          { speaker: "Barista", avatar: "B", english: "Sure thing! Full fat milk or oat milk?", urdu: "Ø¨Ø§Ù„Ú©Ù„! Ø¹Ø§Ù… Ø¯ÙˆØ¯Ú¾ ÛŒØ§ Ø§ÙˆÙ¹ Ù…Ù„Ú©ØŸ", audioText: "Sure thing! Full fat milk or oat milk?" },
          { speaker: "Customer", avatar: "C", english: "Full fat milk, please. And for here, thank you.", urdu: "Ø¹Ø§Ù… Ø¯ÙˆØ¯Ú¾ØŒ Ø¨Ø±Ø§Û  Ú©Ø±Ù…Û” Ø§ÙˆØ± ÛŒÛ Ø§Úº Û ÛŒ Ø¨ÛŒÙ¹Ú¾ Ú©Ø± Ù¾ÛŒÙ†Ø§ Û Û’ØŒ Ø´Ú©Ø±ÛŒÛ Û”", audioText: "Full fat milk, please. And for here, thank you." }
        ]
      },
      {
        id: "sec-a1-u5-l3-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u5-l3-1",
            type: "mcq",
            skillTag: "requests",
            prompt: "What is the polite way to ask for a coffee?",
            options: [
              { id: "opt-1", text: "Give me coffee." },
              { id: "opt-2", text: "Can I have a coffee, please?" },
              { id: "opt-3", text: "I want coffee now." },
              { id: "opt-4", text: "Coffee is my need." }
            ],
            correctOptionId: "opt-2",
            explanation: "'Can I have a coffee, please?' is courteous, natural, and culturally standard.",
            urduExplanation: "'Can I have a coffee, please?' Ù…ÙˆØ¯Ø¨Ø§Ù†Û  Ø§ÙˆØ± Ø¨Ø§Ù„Ú©Ù„ Ø¯Ø±Ø³Øª Ø·Ø±ÛŒÙ‚Û  Û Û’Û”"
          },
          {
            id: "ex-a1-u5-l3-2",
            type: "mcq",
            skillTag: "requests",
            prompt: "What contraction does 'I would like' become?",
            options: [
              { id: "opt-1", text: "I'll like" },
              { id: "opt-2", text: "I've like" },
              { id: "opt-3", text: "I'd like" },
              { id: "opt-4", text: "I'm like" }
            ],
            correctOptionId: "opt-3",
            explanation: "'I would like' contracts to 'I'd like'.",
            urduExplanation: "'I would like' Ù…Ø®ØªØµØ± Û Ùˆ Ú©Ø± 'I'd like' Ø¨Ù†ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u5-l3-3",
            type: "fill_blank",
            skillTag: "requests",
            prompt: "Complete the polite request: '_____ I have the bill, please?'",
            correctAnswer: "Can",
            explanation: "'Can I have the bill, please?' is the standard polite formula.",
            urduExplanation: "'Can I have the bill, please?' Ø¨Ù„ Ù…Ø§Ù†Ú¯Ù†Û’ Ú©Ø§ Ù…ÙˆØ¯Ø¨Ø§Ù†Û  Ø·Ø±ÛŒÙ‚Û  Û Û’Û”"
          },
          {
            id: "ex-a1-u5-l3-4",
            type: "fill_blank",
            skillTag: "politeness",
            prompt: "What polite word should always be added when making an order? 'A bottle of water, _____.'",
            correctAnswer: "please",
            explanation: "'Please' is the essential courtesy marker.",
            urduExplanation: "Ø¢Ø±ÚˆØ± Ú©Û’ Ø³Ø§ØªÚ¾ Û Ù…ÛŒØ´Û  'please' (Ø¨Ø±Ø§Û  Ú©Ø±Ù…) Ù„Ú¯Ø§ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l3-5",
            type: "order_sentence",
            skillTag: "requests",
            prompt: "Rearrange the words to form a polite order:",
            sentenceTokens: ["I'd", "like", "a", "cup", "of", "tea", ",", "please", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            explanation: "I'd like + a cup of tea + , please.",
            urduExplanation: "I'd like a cup of tea, please."
          },
          {
            id: "ex-a1-u5-l3-6",
            type: "order_sentence",
            skillTag: "requests",
            prompt: "Rearrange the words to ask for the bill:",
            sentenceTokens: ["Could", "we", "have", "the", "bill", ",", "please", "?"],
            correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
            explanation: "Could we have + the bill + , please?",
            urduExplanation: "Could we have the bill, please?"
          },
          {
            id: "ex-a1-u5-l3-7",
            type: "match_pairs",
            skillTag: "requests",
            prompt: "Match the request with the expected customer intention:",
            pairs: [
              { left: "Can I have the menu?", right: "Wants to see the list of food" },
              { left: "I'd like to order now.", right: "Ready to tell waiter meal choices" },
              { left: "To take away, please.", right: "Wants to carry food outside" },
              { left: "Can we have the bill?", right: "Ready to pay for the meal" }
            ],
            explanation: "Restaurant phrases matched accurately to intentions.",
            urduExplanation: "Ø±ÛŒØ³Ù¹ÙˆØ±Ù†Ù¹ Ú©Û’ Ø¬Ù…Ù„ÙˆÚº Ú©Ùˆ Ø§Ù† Ú©Û’ Ù…Ù‚Ø§ØµØ¯ Ø³Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l3-8",
            type: "error_correction",
            skillTag: "requests",
            prompt: "Find and correct the mistake: 'I want a bottle of water please.'",
            correctAnswer: "Can I have a bottle of water, please?",
            explanation: "'I want' is too blunt in customer service. Use 'Can I have' or 'I'd like'.",
            urduExplanation: "'I want' Ú©ÛŒ Ø¬Ú¯Û  'Can I have a bottle of water, please?' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l3-9",
            type: "error_correction",
            skillTag: "requests",
            prompt: "Find and correct the mistake: 'I would liking a coffee.'",
            correctAnswer: "I would like a coffee.",
            explanation: "After modal 'would', the base verb 'like' must be used: 'I would like'.",
            urduExplanation: "'would' Ú©Û’ Ø¨Ø¹Ø¯ base verb 'like' Ø¢ØªØ§ Û Û’: 'I would like'Û”"
          },
          {
            id: "ex-a1-u5-l3-10",
            type: "true_false",
            skillTag: "requests",
            prompt: "'Could I have...' is more polite and formal than 'Give me...'. (True or False)",
            correctAnswer: "True",
            explanation: "True. 'Could I have' is extremely courteous and appropriate.",
            urduExplanation: "Ø¯Ø±Ø³ØªÛ” 'Could I have' Ø§Ù†ØªÛ Ø§Ø¦ÛŒ Ù…ÙˆØ¯Ø¨Ø§Ù†Û  Ø·Ø±ÛŒÙ‚Û  Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u5-l3-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u5-l3-1",
            type: "mcq",
            skillTag: "requests",
            prompt: "Which phrasing is the most polite way to order chicken biryani?",
            options: [
              { id: "opt-1", text: "I'd like the chicken biryani, please." },
              { id: "opt-2", text: "Bring me the chicken biryani." },
              { id: "opt-3", text: "Give me the chicken biryani." },
              { id: "opt-4", text: "I want the chicken biryani now." }
            ],
            correctOptionId: "opt-1",
            explanation: "'I'd like the chicken biryani, please' is respectful and courteous.",
            urduExplanation: "'I'd like... please' Ø¨Ø§Ù„Ú©Ù„ Ø´Ø§Ø¦Ø³ØªÛ  Ø§ÙˆØ± Ù…ÙˆØ¯Ø¨Ø§Ù†Û  Ø¬Ù…Ù„Û  Û Û’Û”"
          },
          {
            id: "qz-a1-u5-l3-2",
            type: "mcq",
            skillTag: "requests",
            prompt: "What does a customer say when they want to eat at the restaurant?",
            options: [
              { id: "opt-1", text: "To take away" },
              { id: "opt-2", text: "For here" },
              { id: "opt-3", text: "On the road" },
              { id: "opt-4", text: "To go" }
            ],
            correctOptionId: "opt-2",
            explanation: "'For here' tells the staff you intend to sit and eat inside.",
            urduExplanation: "ÛŒÛ Ø§Úº Ø¨ÛŒÙ¹Ú¾ Ú©Ø± Ú©Ú¾Ø§Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ 'For here' Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "qz-a1-u5-l3-3",
            type: "mcq",
            skillTag: "requests",
            prompt: "What is the British English word for the payment slip at a restaurant?",
            options: [
              { id: "opt-1", text: "check" },
              { id: "opt-2", text: "coupon" },
              { id: "opt-3", text: "bill" },
              { id: "opt-4", text: "ticket" }
            ],
            correctOptionId: "opt-3",
            explanation: "In British and Pakistani English, the document is called the 'bill'.",
            urduExplanation: "Ø±ÛŒØ³Ù¹ÙˆØ±Ù†Ù¹ Ù…ÛŒÚº Ø­Ø³Ø§Ø¨ Ú©Û’ Ù¾Ø±Ú†Û’ Ú©Ùˆ 'bill' Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "qz-a1-u5-l3-4",
            type: "mcq",
            skillTag: "requests",
            prompt: "Which modal verb makes requests softer and more polite?",
            options: [
              { id: "opt-1", text: "Must" },
              { id: "opt-2", text: "Should" },
              { id: "opt-3", text: "Could" },
              { id: "opt-4", text: "Shall" }
            ],
            correctOptionId: "opt-3",
            explanation: "'Could' (e.g. Could I have...?) is recognized for politeness.",
            urduExplanation: "'Could' Ø¯Ø±Ø®ÙˆØ§Ø³Øª Ù…ÛŒÚº Ù†Ø±Ù…ÛŒ Ø§ÙˆØ± Ø§Ø¯Ø¨ Ù¾ÛŒØ¯Ø§ Ú©Ø±ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u5-l3-5",
            type: "mcq",
            skillTag: "requests",
            prompt: "What should you say if you need a waiter's attention politely?",
            options: [
              { id: "opt-1", text: "Excuse me, please." },
              { id: "opt-2", text: "Hey you!" },
              { id: "opt-3", text: "Listen!" },
              { id: "opt-4", text: "Come here!" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Excuse me, please' is the universal polite way to gain attention.",
            urduExplanation: "ÙˆÛŒÙ¹Ø± Ú©Ùˆ Ù…ØªÙˆØ¬Û  Ú©Ø±Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ 'Excuse me, please' Ú©Û ÛŒÚºÛ”"
          }
        ]
      },
      {
        id: "sec-a1-u5-l3-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Cafe and restaurant polite ordering summary:",
        summaryPoints: [
          "Use 'Can I have...?' or 'Could I have...?' for courteous requests.",
          "Use 'I'd like...' (I would like) instead of 'I want'.",
          "Always add 'please' to orders and 'thank you' when receiving items.",
          "Know the options: 'For here' (eat in) vs 'To take away' (carry out).",
          "Ask for the check/bill with: 'Can we have the bill, please?'."
        ]
      },
      {
        id: "sec-a1-u5-l3-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Û Ù… Ø¹Ø§Ù… Ø·ÙˆØ± Ù¾Ø± Ú©Û ØªÛ’ Û ÛŒÚº: 'Ø§ÛŒÚ© Ú†Ø§Ø¦Û’ Ù„Ø§Ù†Ø§' ÛŒØ§ 'Ø¨Ù„ Ù„Û’ Ø¢Ø¤'Û” Ù„ÛŒÚ©Ù† Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ø³ÛŒØ¯Ú¾Ø§ Ø­Ú©Ù… Ø¯ÛŒÙ†Ø§ (Give me / Bring me) Ø¨Û Øª **ØºÛŒØ± Ù…Û Ø°Ø¨ (Rude)** Ø³Ù…Ø¬Ú¾Ø§ Ø¬Ø§ØªØ§ Û Û’Û”\n\n**Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Û Ù…ÛŒØ´Û  Ø³ÙˆØ§Ù„ÛŒÛ  ÛŒØ§ Ø®ÙˆØ§Û Ø´ Ú©Û’ Ø§Ù†Ø¯Ø§Ø² Ù…ÛŒÚº Ø¢Ø±ÚˆØ± Ú©ÛŒØ§ Ø¬Ø§ØªØ§ Û Û’:**\n- **'Can I have a cup of tea, please?'** (Ú©ÛŒØ§ Ù…Ø¬Ú¾Û’ Ø§ÛŒÚ© Ú©Ù¾ Ú†Ø§Ø¦Û’ Ù…Ù„ Ø³Ú©ØªÛŒ Û Û’ØŸ)\n- **'I'd like a chicken sandwich, please.'** (Ù…ÛŒÚº Ú†Ú©Ù† Ø³ÛŒÙ†ÚˆÙˆÚ† Ù¾Ø³Ù†Ø¯ Ú©Ø±ÙˆÚº Ú¯Ø§)\nØ§ÙˆØ± Ø¢Ø®Ø± Ù…ÛŒÚº **Please** Ø§ÙˆØ± **Thank you** Ú©Û Ù†Ø§ Ù†Û Ø§ÛŒØª Ø¶Ø±ÙˆØ±ÛŒ Û Û’Û”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 4: Meals of the Day & Traditional Dishes
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u5-l4",
    level: "A1",
    unit: "unit-5",
    order: 4,
    title: "Meals of the Day & Traditional Dishes",
    description: "Discuss daily meal times, describe traditional dishes, and express flavours and tastes.",
    objectives: [
      "Identify the four main eating occasions (breakfast, lunch, dinner, snack)",
      "Use taste and texture adjectives (spicy, sweet, savoury, fresh, bitter)",
      "Describe famous South Asian and international dishes in simple present sentences"
    ],
    estimatedMinutes: 8,
    prerequisites: ["eng-a1-u5-l3"],
    skillTags: ["meals", "vocabulary", "taste-adjectives", "culture"],
    vocabularyList: [
      { word: "breakfast", partOfSpeech: "noun", phonetic: "/ËˆbrekfÉ™st/", definition: "A meal eaten in the morning, the first of the day.", urduMeaning: "Ù†Ø§Ø´ØªÛ ", exampleSentence: "We have breakfast together at 7:30 AM." },
      { word: "lunch", partOfSpeech: "noun", phonetic: "/lÊŒntÊƒ/", definition: "A meal eaten in the middle of the day, typically one that is lighter than an evening meal.", urduMeaning: "Ø¯ÙˆÙ¾Û Ø± Ú©Ø§ Ú©Ú¾Ø§Ù†Ø§", exampleSentence: "I bring a homemade lunch to the office." },
      { word: "dinner", partOfSpeech: "noun", phonetic: "/ËˆdÉªnÉ™r/", definition: "The main meal of the day, taken in the evening.", urduMeaning: "Ø±Ø§Øª Ú©Ø§ Ú©Ú¾Ø§Ù†Ø§", exampleSentence: "The whole family gathers for dinner at eight." },
      { word: "meal", partOfSpeech: "noun", phonetic: "/miË l/", definition: "Any of the regular occasions in a day when a reasonably large amount of food is eaten.", urduMeaning: "Ú©Ú¾Ø§Ù†Ø§ / ÙˆÙ‚ØªÙ  Ø·Ø¹Ø§Ù…", exampleSentence: "Breakfast is the most important meal of the day." },
      { word: "snack", partOfSpeech: "noun", phonetic: "/snÃ¦k/", definition: "A small amount of food eaten between meals.", urduMeaning: "Û Ù„Ú©Ø§ Ù¾ÚÚ¾Ù„Ú©Ø§ Ú©Ú¾Ø§Ù†Ø§ / Ø³Ù†ÛŒÚ©", exampleSentence: "He eats fresh almonds as an afternoon snack." },
      { word: "dessert", partOfSpeech: "noun", phonetic: "/dÉªËˆzÉœË t/", definition: "The sweet course eaten at the end of a meal.", urduMeaning: "Ù…ÛŒÙ¹Ú¾Ø§ / Ø³ÙˆØ¦ÛŒÙ¹ ÚˆØ´", exampleSentence: "Kheer is a traditional Pakistani dessert." },
      { word: "spicy", partOfSpeech: "adjective", phonetic: "/ËˆspaÉªsi/", definition: "Flavoured with or fragrant with spice; pungent or hot.", urduMeaning: "Ù…Ø³Ø§Ù„Ø­Û’ Ø¯Ø§Ø± / Ú†Ù¹Ù¾Ù¹Ø§", exampleSentence: "Lahori street food is wonderfully spicy." },
      { word: "sweet", partOfSpeech: "adjective", phonetic: "/swiË t/", definition: "Having the pleasant taste characteristic of sugar or honey.", urduMeaning: "Ù…ÛŒÙ¹Ú¾Ø§", exampleSentence: "Pakistani mangoes are incredibly sweet." },
      { word: "fresh", partOfSpeech: "adjective", phonetic: "/freÊƒ/", definition: "Recently made or obtained; not canned, frozen, or stale.", urduMeaning: "ØªØ§Ø²Û ", exampleSentence: "We buy fresh vegetables from the local market." },
      { word: "hungry", partOfSpeech: "adjective", phonetic: "/ËˆhÊŒÅ‹É¡ri/", definition: "Feeling or displaying the need for food.", urduMeaning: "Ø¨ÚÚ¾ÙˆÚ©Ø§", exampleSentence: "I am hungry after a long day at university." }
    ],
    sections: [
      {
        id: "sec-a1-u5-l4-1",
        type: "explain",
        title: "Daily Meals & Describing Flavours",
        content: "In English, we use specific verbs with meals:\n- **have breakfast / eat breakfast** (never *'drink breakfast'* or *'take breakfast'* in modern native English).\n- **have lunch / have dinner / have a snack**.\n\n### Flavour Adjectives\n- **spicy**: hot with chillies and spices (*spicy biryani*)\n- **sweet**: containing sugar or honey (*sweet halwa*)\n- **savoury**: salty and rich in flavour, not sweet (*savoury samosas*)\n- **sour**: sharp acidic taste (*sour lemon juice*)\n- **bitter**: harsh, non-sweet taste (*bitter black coffee*)",
        tables: [
          {
            title: "Meal Times & Traditional Dishes",
            headers: ["Meal Occasion", "Typical Timing", "Popular Traditional Dishes", "Sample Sentence"],
            rows: [
              ["Breakfast", "7:00 AM - 9:00 AM", "Paratha, eggs, halwa puri, chai", "I have a paratha and chai for breakfast."],
              ["Lunch", "1:00 PM - 2:30 PM", "Daal chawal, chicken karahi, roti", "She eats daal chawal for lunch."],
              ["Afternoon Snack", "4:30 PM - 5:30 PM", "Samosas, biscuits, green tea", "We enjoy savoury samosas with evening tea."],
              ["Dinner", "8:00 PM - 9:30 PM", "Biryani, kebabs, sajji, salad", "They eat chicken biryani for dinner."]
            ]
          },
          {
            title: "Taste & Texture Descriptors",
            headers: ["Taste Adjective", "Opposite", "Typical Food", "Urdu Meaning"],
            rows: [
              ["spicy", "mild", "nihari, chicken karahi", "Ù…Ø³Ø§Ù„Ø­Û’ Ø¯Ø§Ø± / Û Ù„Ú©Ø§"],
              ["sweet", "sour / bitter", "gulab jamun, mangoes", "Ù…ÛŒÙ¹Ú¾Ø§ / Ú©Ú¾Ù¹Ø§"],
              ["crisp / crunchy", "soft", "fresh chips, salad", "Ú©Ø±Ú©Ø±Ø§ / Ù†Ø±Ù…"],
              ["hot", "cold", "fresh tea, soup", "Ú¯Ø±Ù… / Ù¹Ú¾Ù†ÚˆØ§"]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Have vs. Take",
            text: "In British and American English, native speakers say **have breakfast**, **have lunch**, or **have dinner**. Saying *'I take dinner'* sounds old-fashioned or unnatural."
          },
          {
            type: "warning",
            title: "Dessert vs. Desert",
            text: "**Dessert** (two s's, /dÉªËˆzÉœË t/) is sweet food! **Desert** (one s, /ËˆdezÉ™t/) is a dry, sandy region with little rain."
          }
        ]
      },
      {
        id: "sec-a1-u5-l4-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "We always have breakfast together before eight o'clock.", phonetic: "/wiË  ËˆÉ”Ë lweÉªz hÃ¦v ËˆbrekfÉ™st tÉ™ËˆÉ¡eÃ°É™r bÉªËˆfÉ”Ë r eÉªt É™ËˆklÉ’k/", urdu: "Û Ù… Û Ù…ÛŒØ´Û  ØµØ¨Ø­ Ø¢Ù¹Ú¾ Ø¨Ø¬Û’ Ø³Û’ Ù¾Û Ù„Û’ Ù…Ù„ Ú©Ø± Ù†Ø§Ø´ØªÛ  Ú©Ø±ØªÛ’ Û ÛŒÚºÛ”", audioText: "We always have breakfast together before eight o'clock." },
          { english: "Chicken biryani is a famous and spicy South Asian dish.", phonetic: "/ËˆtÊƒÉªkÉªn ËŒbÉªriË ËˆÉ‘Ë ni Éªz É™ ËˆfeÉªmÉ™s Ã¦nd ËˆspaÉªsi saÊŠÎ¸ ËˆeÉªÊƒn dÉªÊƒ/", urdu: "Ú†Ú©Ù† Ø¨Ø±ÛŒØ§Ù†ÛŒ Ø¬Ù†ÙˆØ¨ÛŒ Ø§ÛŒØ´ÛŒØ§ Ú©Ø§ Ø§ÛŒÚ© Ù…Ø´Û ÙˆØ± Ø§ÙˆØ± Ù…Ø³Ø§Ù„Ø­Û’ Ø¯Ø§Ø± Ú©Ú¾Ø§Ù†Ø§ Û Û’Û”", audioText: "Chicken biryani is a famous and spicy South Asian dish." },
          { english: "I am feeling hungry because I skipped lunch today.", phonetic: "/aÉª Ã¦m ËˆfiË lÉªÅ‹ ËˆhÊŒÅ‹É¡ri bÉªËˆkÉ’z aÉª skÉªpt lÊŒntÊƒ tÉ™ËˆdeÉª/", urdu: "Ù…Ø¬Ú¾Û’ Ø¨ÚÚ¾ÙˆÚ© Ù„Ú¯ Ø±Û ÛŒ Û Û’ Ú©ÛŒÙˆÙ†Ú©Û  Ù…ÛŒÚº Ù†Û’ Ø¢Ø¬ Ø¯ÙˆÙ¾Û Ø± Ú©Ø§ Ú©Ú¾Ø§Ù†Ø§ Ù†Û ÛŒÚº Ú©Ú¾Ø§ÛŒØ§Û”", audioText: "I am feeling hungry because I skipped lunch today." },
          { english: "We ordered sweet kheer for dessert after our meal.", phonetic: "/wiË  ËˆÉ”Ë dÉ™d swiË t kÉªÉ™r fÉ”Ë r dÉªËˆzÉœË t ËˆÉ‘Ë ftÉ™r ËˆaÊŠÉ™r miË l/", urdu: "Û Ù… Ù†Û’ Ú©Ú¾Ø§Ù†Û’ Ú©Û’ Ø¨Ø¹Ø¯ Ù…ÛŒÙ¹Ú¾Û’ Ù…ÛŒÚº Ù…ÛŒÙ¹Ú¾ÛŒ Ú©Ú¾ÛŒØ± Ù…Ù†Ú¯ÙˆØ§Ø¦ÛŒÛ”", audioText: "We ordered sweet kheer for dessert after our meal." },
          { english: "Pakistani mangoes are sweet, juicy, and world-renowned.", phonetic: "/ËŒpÉ‘Ë kÉªËˆstÉ‘Ë ni ËˆmÃ¦Å‹É¡É™ÊŠz É‘Ë r swiË t ËˆdÊ’uË si Ã¦nd wÉœË ld rÉªËˆnaÊŠnd/", urdu: "Ù¾Ø§Ú©Ø³ØªØ§Ù†ÛŒ Ø¢Ù… Ù…ÛŒÙ¹Ú¾Û’ØŒ Ø±Ø³ Ø¨ÚÚ¾Ø±Û’ Ø§ÙˆØ± Ø¯Ù†ÛŒØ§ Ø¨ÚÚ¾Ø± Ù…ÛŒÚº Ù…Ø¹Ø±ÙˆÙ  Û ÛŒÚºÛ”", audioText: "Pakistani mangoes are sweet, juicy, and world-renowned." },
          { english: "Do you prefer spicy curries or mild vegetable dishes?", phonetic: "/duË  juË  prÉªËˆfÉœË  ËˆspaÉªsi ËˆkÊŒriz É”Ë r maÉªld ËˆvedÊ’tÉ™bl ËˆdÉªÊƒÉªz/", urdu: "Ú©ÛŒØ§ Ø¢Ù¾ Ù…Ø³Ø§Ù„Ø­Û’ Ø¯Ø§Ø± Ø³Ø§Ù„Ù† Ù¾Ø³Ù†Ø¯ Ú©Ø±ØªÛ’ Û ÛŒÚº ÛŒØ§ Û Ù„Ú©ÛŒ Ø³Ø¨Ø²ÛŒØ§ÚºØŸ", audioText: "Do you prefer spicy curries or mild vegetable dishes?" },
          { english: "They have a light afternoon snack with biscuits and chai.", phonetic: "/Ã°eÉª hÃ¦v É™ laÉªt ËŒÉ‘Ë ftÉ™ËˆnuË n snÃ¦k wÉªÃ° ËˆbÉªskÉªts Ã¦nd tÊƒaÉª/", urdu: "ÙˆÛ  Ø³Û  Ù¾Û Ø± Ú©Ùˆ Ø¨Ø³Ú©Ù¹ Ø§ÙˆØ± Ú†Ø§Ø¦Û’ Ú©Û’ Ø³Ø§ØªÚ¾ Û Ù„Ú©Ø§ Ù¾ÚÚ¾Ù„Ú©Ø§ Ø³Ù†ÛŒÚ© Ú©Ú¾Ø§ØªÛ’ Û ÛŒÚºÛ”", audioText: "They have a light afternoon snack with biscuits and chai." },
          { english: "Fresh cucumber and tomato salad is very healthy.", phonetic: "/freÊƒ ËˆkjuË kÊŒmbÉ™r Ã¦nd tÉ™ËˆmÉ‘Ë tÉ™ÊŠ ËˆsÃ¦lÉ™d Éªz Ëˆveri ËˆhelÎ¸i/", urdu: "ØªØ§Ø²Û  Ú©Ú¾ÛŒØ±Û’ Ø§ÙˆØ± Ù¹Ù…Ø§Ù¹Ø± Ú©Ø§ Ø³Ù„Ø§Ø¯ Ø¨Û Øª ØµØ­Øª Ø¨Ø®Ø´ Û ÙˆØªØ§ Û Û’Û”", audioText: "Fresh cucumber and tomato salad is very healthy." }
        ]
      },
      {
        id: "sec-a1-u5-l4-3",
        type: "dialogue",
        title: "Recommending Traditional Pakistani Food",
        dialogue: [
          { speaker: "Tourist", avatar: "T", english: "What traditional dish should I try for dinner in Lahore?", urdu: "Ù„Ø§Û ÙˆØ± Ù…ÛŒÚº Ø±Ø§Øª Ú©Û’ Ú©Ú¾Ø§Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Ù…Ø¬Ú¾Û’ Ú©ÙˆÙ† Ø³Ø§ Ø±ÙˆØ§ÛŒØªÛŒ Ú©Ú¾Ø§Ù†Ø§ Ú©Ú¾Ø§Ù†Ø§ Ú†Ø§Û ÛŒÛ’ØŸ", audioText: "What traditional dish should I try for dinner in Lahore?" },
          { speaker: "Guide", avatar: "G", english: "You must try mutton karahi with fresh tandoori roti. It is rich and spicy.", urdu: "Ø¢Ù¾ Ú©Ùˆ ØªØ§Ø²Û  ØªÙ†Ø¯ÙˆØ±ÛŒ Ø±ÙˆÙ¹ÛŒ Ú©Û’ Ø³Ø§ØªÚ¾ Ù…Ù¹Ù† Ú©Ú‘Ø§Û ÛŒ Ø¶Ø±ÙˆØ± Ú©Ú¾Ø§Ù†ÛŒ Ú†Ø§Û ÛŒÛ’Û” ÛŒÛ  Ù„Ø°ÛŒØ° Ø§ÙˆØ± Ù…Ø³Ø§Ù„Ø­Û’ Ø¯Ø§Ø± Û ÙˆØªÛŒ Û Û’Û”", audioText: "You must try mutton karahi with fresh tandoori roti. It is rich and spicy." },
          { speaker: "Tourist", avatar: "T", english: "Is there any dessert you recommend afterwards?", urdu: "Ú©ÛŒØ§ Ø§Ø³ Ú©Û’ Ø¨Ø¹Ø¯ Ú©ÙˆØ¦ÛŒ Ù…ÛŒÙ¹Ú¾Ø§ Ø¨Ú¾ÛŒ Ø¢Ù¾ ØªØ¬ÙˆÛŒØ² Ú©Ø±ÛŒÚº Ú¯Û’ØŸ", audioText: "Is there any dessert you recommend afterwards?" },
          { speaker: "Guide", avatar: "G", english: "Yes! Order warm gulab jamun or traditional kulfi. They are wonderfully sweet.", urdu: "Ø¬ÛŒ Û Ø§Úº! Ú¯Ø±Ù… Ú¯Ù„Ø§Ø¨ Ø¬Ø§Ù…Ù† ÛŒØ§ Ø±ÙˆØ§ÛŒØªÛŒ Ú©Ù„Ù ÛŒ Ù…Ù†Ú¯ÙˆØ§Ø¦ÛŒÚºÛ” ÙˆÛ  Ø¨Û Øª Ù…ÛŒÙ¹Ú¾Û’ Û ÙˆØªÛ’ Û ÛŒÚºÛ”", audioText: "Yes! Order warm gulab jamun or traditional kulfi. They are wonderfully sweet." }
        ]
      },
      {
        id: "sec-a1-u5-l4-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u5-l4-1",
            type: "mcq",
            skillTag: "meals",
            prompt: "What is the natural English verb collocation for the morning meal?",
            options: [
              { id: "opt-1", text: "drink breakfast" },
              { id: "opt-2", text: "do breakfast" },
              { id: "opt-3", text: "make breakfast eating" },
              { id: "opt-4", text: "have breakfast" }
            ],
            correctOptionId: "opt-4",
            explanation: "Native speakers use 'have breakfast' (or 'eat breakfast').",
            urduExplanation: "Ù†Ø§Ø´ØªÛ  Ú©Ø±Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ 'have breakfast' Ù„Ú©Ú¾Ø§ Ø¬Ø§ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u5-l4-2",
            type: "mcq",
            skillTag: "taste-adjectives",
            prompt: "What adjective describes food with chillies and rich spices?",
            options: [
              { id: "opt-1", text: "spicy" },
              { id: "opt-2", text: "sweet" },
              { id: "opt-3", text: "bitter" },
              { id: "opt-4", text: "sour" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Spicy' describes food with hot spices and chillies.",
            urduExplanation: "Ù…Ø³Ø§Ù„Ø­Û’ Ø¯Ø§Ø± Ú©Ú¾Ø§Ù†Û’ Ú©Ùˆ 'spicy' Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l4-3",
            type: "fill_blank",
            skillTag: "meals",
            prompt: "Complete: 'A sweet dish eaten at the end of a meal is called _____.'",
            correctAnswer: "dessert",
            explanation: "'Dessert' (with two s's) is the sweet course at the end of a meal.",
            urduExplanation: "Ú©Ú¾Ø§Ù†Û’ Ú©Û’ Ø¢Ø®Ø± Ù…ÛŒÚº Ù…ÛŒÙ¹Ú¾Û’ Ú©Ùˆ 'dessert' Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l4-4",
            type: "fill_blank",
            skillTag: "taste-adjectives",
            prompt: "What is the opposite of sweet? 'Lemons are not sweet; they are _____.'",
            correctAnswer: "sour",
            explanation: "Lemons have a sour, acidic taste.",
            urduExplanation: "Ù„ÛŒÙ…ÙˆÚº Ú©Ú¾Ù¹Û’ (sour) Û ÙˆØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l4-5",
            type: "order_sentence",
            skillTag: "meals",
            prompt: "Rearrange the words to form a correct sentence:",
            sentenceTokens: ["We", "have", "dinner", "at", "eight", "every", "evening", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
            explanation: "Subject (We) + verb (have) + meal (dinner) + time phrase (at eight every evening).",
            urduExplanation: "We have dinner at eight every evening."
          },
          {
            id: "ex-a1-u5-l4-6",
            type: "order_sentence",
            skillTag: "taste-adjectives",
            prompt: "Rearrange the words into a correct statement:",
            sentenceTokens: ["This", "chicken", "karahi", "is", "very", "spicy", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Subject (This chicken karahi) + verb (is) + adjective phrase (very spicy).",
            urduExplanation: "This chicken karahi is very spicy."
          },
          {
            id: "ex-a1-u5-l4-7",
            type: "match_pairs",
            skillTag: "meals",
            prompt: "Match the meal with its typical time of day:",
            pairs: [
              { left: "Breakfast", right: "Morning (7:00 AM - 9:00 AM)" },
              { left: "Lunch", right: "Midday (1:00 PM - 2:00 PM)" },
              { left: "Snack", right: "Afternoon (4:30 PM - 5:30 PM)" },
              { left: "Dinner", right: "Evening (8:00 PM - 9:30 PM)" }
            ],
            explanation: "Meals matched to standard times.",
            urduExplanation: "Ú©Ú¾Ø§Ù†Û’ Ú©Ùˆ Ø§Ø³ Ú©Û’ Ù…Ù†Ø§Ø³Ø¨ ÙˆÙ‚Øª Ø³Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l4-8",
            type: "error_correction",
            skillTag: "meals",
            prompt: "Find and correct the mistake: 'I take breakfast at seven.'",
            correctAnswer: "I have breakfast at seven.",
            explanation: "Use natural collocation 'have breakfast', not 'take breakfast'.",
            urduExplanation: "Ù Ø·Ø±ÛŒ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº 'have breakfast' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l4-9",
            type: "error_correction",
            skillTag: "meals",
            prompt: "Find and correct the mistake: 'We ordered sweet desert after dinner.'",
            correctAnswer: "We ordered sweet dessert after dinner.",
            explanation: "'Dessert' (two s's) is sweet food; 'desert' (one s) is a dry arid land.",
            urduExplanation: "Ù…ÛŒÙ¹Ú¾Û’ Ú©Û’ Ù„ÛŒÛ’ 'dessert' (Ø¯Ùˆ s) Ù„Ú©Ú¾Ø§ Ø¬Ø§ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u5-l4-10",
            type: "true_false",
            skillTag: "taste-adjectives",
            prompt: "Honey and ripe mangoes are classified as spicy foods. (True or False)",
            correctAnswer: "False",
            explanation: "False. Honey and ripe mangoes are sweet, not spicy.",
            urduExplanation: "ØºÙ„Ø·Û” Ø´Û Ø¯ Ø§ÙˆØ± Ø¢Ù… Ù…ÛŒÙ¹Ú¾Û’ (sweet) Û ÙˆØªÛ’ Û ÛŒÚºÛ”"
          }
        ]
      },
      {
        id: "sec-a1-u5-l4-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u5-l4-1",
            type: "mcq",
            skillTag: "meals",
            prompt: "What do we call food eaten between meals when feeling slightly hungry?",
            options: [
              { id: "opt-1", text: "Dinner" },
              { id: "opt-2", text: "A snack" },
              { id: "opt-3", text: "Breakfast" },
              { id: "opt-4", text: "A feast" }
            ],
            correctOptionId: "opt-2",
            explanation: "A snack is a light amount of food eaten between primary meals.",
            urduExplanation: "Ú©Ú¾Ø§Ù†ÙˆÚº Ú©Û’ Ø¯Ø±Ù…ÛŒØ§Ù† Û Ù„Ú©ÛŒ Ù¾ÚÚ¾Ù„Ú©ÛŒ Ú†ÛŒØ² Ú©Ùˆ 'snack' Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "qz-a1-u5-l4-2",
            type: "mcq",
            skillTag: "taste-adjectives",
            prompt: "Which pair shows opposite taste flavours?",
            options: [
              { id: "opt-1", text: "sweet and sour" },
              { id: "opt-2", text: "hot and warm" },
              { id: "opt-3", text: "spicy and flavourful" },
              { id: "opt-4", text: "fresh and crisp" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Sweet' (sugary) and 'sour' (acidic) are contrasting taste flavours.",
            urduExplanation: "'sweet' (Ù…ÛŒÙ¹Ú¾Ø§) Ø§ÙˆØ± 'sour' (Ú©Ú¾Ù¹Ø§) Ù…Ø®Ø§Ù„Ù  Ø°Ø§Ø¦Ù‚Û’ Û ÛŒÚºÛ”"
          },
          {
            id: "qz-a1-u5-l4-3",
            type: "mcq",
            skillTag: "meals",
            prompt: "Complete the sentence: 'She is _____ so she ordered a full chicken biryani.'",
            options: [
              { id: "opt-1", text: "early" },
              { id: "opt-2", text: "late" },
              { id: "opt-3", text: "hungry" },
              { id: "opt-4", text: "thirsty" }
            ],
            correctOptionId: "opt-3",
            explanation: "A person needing food is 'hungry'.",
            urduExplanation: "Ú©Ú¾Ø§Ù†Û’ Ú©ÛŒ Ø·Ù„Ø¨ Ú©Û’ Ù„ÛŒÛ’ 'hungry' (Ø¨ÚÚ¾ÙˆÚ©Ø§) Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u5-l4-4",
            type: "mcq",
            skillTag: "meals",
            prompt: "What is the correct spelling for the sweet dish served after dinner?",
            options: [
              { id: "opt-1", text: "dessert" },
              { id: "opt-2", text: "desert" },
              { id: "opt-3", text: "desertt" },
              { id: "opt-4", text: "desart" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Dessert' with double 's' refers to the sweet course.",
            urduExplanation: "Ù…ÛŒÙ¹Ú¾Û’ Ú©Û’ Ù„ÛŒÛ’ ØµØ­ÛŒØ­ Ø§Ù…Ù„Ø§ 'dessert' Û Û’Û”"
          },
          {
            id: "qz-a1-u5-l4-5",
            type: "mcq",
            skillTag: "meals",
            prompt: "Which meal is eaten in the middle of the day around 1:30 PM?",
            options: [
              { id: "opt-1", text: "Breakfast" },
              { id: "opt-2", text: "Lunch" },
              { id: "opt-3", text: "Dinner" },
              { id: "opt-4", text: "Supper" }
            ],
            correctOptionId: "opt-2",
            explanation: "Lunch is the midday meal.",
            urduExplanation: "Ø¯ÙˆÙ¾Û Ø± Ú©Û’ Ú©Ú¾Ø§Ù†Û’ Ú©Ùˆ 'Lunch' Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          }
        ]
      },
      {
        id: "sec-a1-u5-l4-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Meals and food vocabulary takeaways:",
        summaryPoints: [
          "Four meal occasions: breakfast (morning), lunch (midday), snack (light bite), dinner (evening).",
          "Use the collocation 'have breakfast / have lunch / have dinner'.",
          "Taste adjectives: spicy, sweet, savoury, sour, bitter.",
          "Dessert (double s) = sweet course; Desert (single s) = sandy region.",
          "Hungry = needs food; Thirsty = needs drink."
        ]
      },
      {
        id: "sec-a1-u5-l4-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Û Ù… Ú©Û ØªÛ’ Û ÛŒÚº: 'Ù†Ø§Ø´ØªÛ  Ú©Ø±Ù†Ø§'ØŒ 'Ø¯ÙˆÙ¾Û Ø± Ú©Ø§ Ú©Ú¾Ø§Ù†Ø§ Ú©Ú¾Ø§Ù†Ø§'Û” Ø§Ø±Ø¯Ùˆ Ø¨ÙˆÙ„Ù†Û’ ÙˆØ§Ù„Û’ Ø§Ú©Ø«Ø± Ø§Ø³ Ú©Ø§ Ù„Ù Ø¸ÛŒ ØªØ±Ø¬Ù…Û  Ú©Ø± Ú©Û’ 'take breakfast' Ú©Û  Ø¯ÛŒØªÛ’ Û ÛŒÚºÛ”\n\n**Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ù Ø·Ø±ÛŒ Ø§Ù„Ù Ø§Ø¸ ÛŒÛ  Û ÛŒÚº:**\n- **have breakfast** (never 'take breakfast')\n- **have lunch**\n- **have dinner**\n\nØ§Ø³ Ú©Û’ Ø¹Ù„Ø§ÙˆÛ  **Dessert** (Ù…ÛŒÙ¹Ú¾Ø§ - Ø¯Ùˆ 's') Ø§ÙˆØ± **Desert** (ØµØ­Ø±Ø§ - Ø§ÛŒÚ© 's') Ú©Û’ Ø§Ù…Ù„Ø§ Ø§ÙˆØ± ØªÙ„Ù Ø¸ Ú©Ø§ Ù Ø±Ù‚ ÛŒØ§Ø¯ Ø±Ú©Ú¾Ù†Ø§ Ø§Ù…ØªØ­Ø§Ù†Ø§Øª Ú©Û’ Ù„ÛŒÛ’ Ø¨Û Øª Ø§Û Ù… Û Û’Û”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 5: Understanding Menus & Prices
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u5-l5",
    level: "A1",
    unit: "unit-5",
    order: 5,
    title: "Understanding Menus & Prices",
    description: "Navigate restaurant menus, ask prices using 'How much is/are...', and understand bills.",
    objectives: [
      "Ask prices using 'How much is this?' (singular) and 'How much are these?' (plural)",
      "Interpret common menu sections (Starters/Appetizers, Mains, Sides, Drinks, Desserts)",
      "Handle payments, cash, change, and check total calculations comfortably"
    ],
    estimatedMinutes: 10,
    prerequisites: ["eng-a1-u5-l4"],
    skillTags: ["prices", "shopping", "menus", "numbers", "money"],
    vocabularyList: [
      { word: "price", partOfSpeech: "noun", phonetic: "/praÉªs/", definition: "The amount of money expected, required, or given in payment for something.", urduMeaning: "Ù‚ÛŒÙ…Øª", exampleSentence: "The menu clearly lists the price of each item." },
      { word: "cost", partOfSpeech: "verb", phonetic: "/kÉ’st/", definition: "To require the payment of a specified sum of money before it can be acquired.", urduMeaning: "Ù‚ÛŒÙ…Øª Û ÙˆÙ†Ø§ / Ù„Ø§Ú¯Øª Ø¢Ù†Ø§", exampleSentence: "How much does this chicken burger cost?" },
      { word: "cheap", partOfSpeech: "adjective", phonetic: "/tÊƒiË p/", definition: "Low in price, especially in relation to similar items or value.", urduMeaning: "Ø³Ø³ØªØ§", exampleSentence: "Street food in Lahore is delicious and cheap." },
      { word: "expensive", partOfSpeech: "adjective", phonetic: "/ÉªkËˆspensÉªv/", definition: "Costing a lot of money.", urduMeaning: "Ù…Û Ù†Ú¯Ø§", exampleSentence: "Five-star hotel restaurants are quite expensive." },
      { word: "dollar", partOfSpeech: "noun", phonetic: "/ËˆdÉ’lÉ™r/", definition: "The basic monetary unit of the US, Canada, Australia, and other countries.", urduMeaning: "ÚˆØ§Ù„Ø±", exampleSentence: "The meal costs fifteen dollars." },
      { word: "pound", partOfSpeech: "noun", phonetic: "/paÊŠnd/", definition: "The basic monetary unit of the UK and some other countries.", urduMeaning: "Ù¾Ø§Ø¤Ù†Úˆ", exampleSentence: "A cup of coffee in London costs three pounds." },
      { word: "coin", partOfSpeech: "noun", phonetic: "/kÉ”Éªn/", definition: "A flat, typically round piece of metal with an official stamp, used as money.", urduMeaning: "Ø³Ú©Û ", exampleSentence: "He paid with a ten-rupee coin." },
      { word: "cash", partOfSpeech: "noun", phonetic: "/kÃ¦Êƒ/", definition: "Money in coins or notes, as distinct from credit cards or cheques.", urduMeaning: "Ù†Ù‚Ø¯ / Ú©ÛŒØ´", exampleSentence: "Do you accept card payments or only cash?" },
      { word: "change", partOfSpeech: "noun", phonetic: "/tÊƒeÉªndÊ’/", definition: "Coins or smaller notes given back when the payment exceeds the price.", urduMeaning: "Ø¨Ù‚Ø§ÛŒØ§ / Ú†Ú¾Ù¹Û’ Ù¾ÛŒØ³Û’", exampleSentence: "Here is your receipt and five hundred rupees change." },
      { word: "total", partOfSpeech: "noun", phonetic: "/ËˆtÉ™ÊŠtl/", definition: "The whole number or amount.", urduMeaning: "Ú©Ù„ ØªØ¹Ø¯Ø§Ø¯ / Ú©Ù„ Ø±Ù‚Ù…", exampleSentence: "The total comes to two thousand rupees." }
    ],
    sections: [
      {
        id: "sec-a1-u5-l5-1",
        type: "explain",
        title: "Asking Prices & Navigating Menus",
        content: "To ask the price of items in English:\n- **Singular**: *How much **is** this sandwich?* -> *It is $5 (five dollars).*\n- **Plural**: *How much **are** these samosas?* -> *They are $3 (three dollars).*\n- **Using verb 'cost'**: *How much does this burger cost?* -> *It costs $8.*",
        tables: [
          {
            title: "Standard Menu Categories",
            headers: ["Menu Section", "What It Contains", "Typical Items", "Urdu Translation"],
            rows: [
              ["Starters / Appetizers", "Small light dishes before the meal", "Soup, spring rolls, samosas", "Ø§Ø¨ØªØ¯Ø§Ø¦ÛŒ Ú©Ú¾Ø§Ù†Ø§"],
              ["Mains / Entrees", "The principal heavy dishes", "Biryani, karahi, steak, pasta", "Ø¨Ù†ÛŒØ§Ø¯ÛŒ Ú©Ú¾Ø§Ù†Ø§"],
              ["Sides", "Accompaniments served alongside", "Roti, naan, rice, raita, salad", "Ø³Ø§ØªÚ¾ Ù…Ù„Ù†Û’ ÙˆØ§Ù„ÛŒ Ø§Ø´ÛŒØ§"],
              ["Beverages / Drinks", "Hot and cold refreshments", "Tea, coffee, fresh juice, mineral water", "Ù…Ø´Ø±ÙˆØ¨Ø§Øª"],
              ["Desserts", "Sweet final treats", "Kheer, ice cream, gulab jamun", "Ù…ÛŒÙ¹Ú¾Ø§"]
            ]
          },
          {
            title: "Handling the Bill & Payment Phrases",
            headers: ["Phrase / Question", "Who Says It", "Meaning", "Urdu Translation"],
            rows: [
              ["How would you like to pay?", "Cashier / Waiter", "Cash or card?", "Ø¢Ù¾ Ú©ÛŒØ³Û’ Ø§Ø¯Ø§Ø¦ÛŒÚ¯ÛŒ Ú©Ø±ÛŒÚº Ú¯Û’ØŸ"],
              ["I'll pay by card.", "Customer", "Using debit/credit card", "Ù…ÛŒÚº Ú©Ø§Ø±Úˆ Ø³Û’ Ø§Ø¯Ø§ Ú©Ø±ÙˆÚº Ú¯Ø§Û”"],
              ["Keep the change.", "Customer", "Leave remainder as tip", "Ø¨Ù‚Ø§ÛŒØ§ Ø±Ù‚Ù… Ø±Ú©Ú¾ Ù„ÛŒÚºÛ”"],
              ["Here is your receipt.", "Cashier", "Proof of purchase paper", "ÛŒÛ  Ø±Û ÛŒ Ø¢Ù¾ Ú©ÛŒ Ø±Ø³ÛŒØ¯Û”"]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Reading Prices Aloud",
            text: "Prices like **$4.50** are read aloud as: *'Four dollars and fifty cents'* or simply *'Four fifty'*."
          },
          {
            type: "warning",
            title: "Match Singular and Plural with Prices",
            text: "Remember: 'How much **is** the coffee?' (singular), but 'How much **are** the drinks?' (plural)."
          }
        ]
      },
      {
        id: "sec-a1-u5-l5-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "Excuse me, how much is this chicken roll?", phonetic: "/ÉªkËˆskjuË z miË  haÊŠ mÊŒtÊƒ Éªz Ã°Éªs ËˆtÊƒÉªkÉªn rÉ™ÊŠl/", urdu: "Ù…Ø¹Ø§Ù  Ú©ÛŒØ¬Ø¦Û’ Ú¯Ø§ØŒ ÛŒÛ  Ú†Ú©Ù† Ø±ÙˆÙ„ Ú©ØªÙ†Û’ Ú©Ø§ Û Û’ØŸ", audioText: "Excuse me, how much is this chicken roll?" },
          { english: "It costs two hundred and fifty rupees.", phonetic: "/Éªt kÉ’sts tuË  ËˆhÊŒndrÉ™d Ã¦nd ËˆfÉªfti ruË ËˆpiË z/", urdu: "Ø§Ø³ Ú©ÛŒ Ù‚ÛŒÙ…Øª Ø¯Ú¾Ø§Ø¦ÛŒ Ø³Ùˆ Ø±ÙˆÙ¾Û’ Û Û’Û”", audioText: "It costs two hundred and fifty rupees." },
          { english: "How much are these fresh mango pastries?", phonetic: "/haÊŠ mÊŒtÊƒ É‘Ë r Ã°iË z freÊƒ ËˆmÃ¦Å‹É¡É™ÊŠ ËˆpeÉªstriz/", urdu: "ÛŒÛ  ØªØ§Ø²Û  Ø¢Ù… Ú©ÛŒ Ù¾ÛŒØ³Ù¹Ø±ÛŒØ§Úº Ú©ØªÙ†Û’ Ú©ÛŒ Û ÛŒÚºØŸ", audioText: "How much are these fresh mango pastries?" },
          { english: "They are four dollars each.", phonetic: "/Ã°eÉª É‘Ë r fÉ”Ë r ËˆdÉ’lÉ™rz iË tÊƒ/", urdu: "ÙˆÛ  Ú†Ø§Ø± ÚˆØ§Ù„Ø± Ù ÛŒ Ù¾ÛŒØ³ Û ÛŒÚºÛ”", audioText: "They are four dollars each." },
          { english: "The total for your meal comes to eighteen pounds.", phonetic: "/Ã°É™ ËˆtÉ™ÊŠtl fÉ”Ë r jÉ”Ë r miË l kÊŒmz tuË  ËŒeÉªËˆtiË n paÊŠndz/", urdu: "Ø¢Ù¾ Ú©Û’ Ú©Ú¾Ø§Ù†Û’ Ú©ÛŒ Ú©Ù„ Ø±Ù‚Ù… Ø§Ù¹ÚÚ¾Ø§Ø±Û  Ù¾Ø§Ø¤Ù†Úˆ Ø¨Ù†ØªÛŒ Û Û’Û”", audioText: "The total for your meal comes to eighteen pounds." },
          { english: "Do you accept credit cards or do you only take cash?", phonetic: "/duË  juË  É™kËˆsept ËˆkredÉªt kÉ‘Ë dz É”Ë r duË  juË  ËˆÉ™ÊŠnli teÉªk kÃ¦Êƒ/", urdu: "Ú©ÛŒØ§ Ø¢Ù¾ Ú©Ø±ÛŒÚˆÙ¹ Ú©Ø§Ø±Úˆ Ù‚Ø¨ÙˆÙ„ Ú©Ø±ØªÛ’ Û ÛŒÚº ÛŒØ§ ØµØ±Ù  Ù†Ù‚Ø¯ Ù„ÛŒØªÛ’ Û ÛŒÚºØŸ", audioText: "Do you accept credit cards or do you only take cash?" },
          { english: "Here is your change and your printed receipt.", phonetic: "/hÉªÉ™r Éªz jÉ”Ë r tÊƒeÉªndÊ’ Ã¦nd jÉ”Ë r ËˆprÉªntÉªd rÉªËˆsiË t/", urdu: "ÛŒÛ  Ø±Û Û’ Ø¢Ù¾ Ú©Û’ Ø¨Ù‚Ø§ÛŒØ§ Ù¾ÛŒØ³Û’ Ø§ÙˆØ± Ø¢Ù¾ Ú©ÛŒ Ù¾Ø±Ù†Ù¹ Ø´Ø¯Û  Ø±Ø³ÛŒØ¯Û”", audioText: "Here is your change and your printed receipt." },
          { english: "Keep the change as a tip for your friendly service.", phonetic: "/kiË p Ã°É™ tÊƒeÉªndÊ’ Ã¦z É™ tÉªp fÉ”Ë r jÉ”Ë r Ëˆfrendli ËˆsÉœË vÉªs/", urdu: "Ø§Ù¾Ù†ÛŒ Ø¹Ù…Ø¯Û  Ø®Ø¯Ù…Ø§Øª Ú©Û’ Ù„ÛŒÛ’ Ø¨Ù‚Ø§ÛŒØ§ Ø±Ù‚Ù… Ø¨Ø·ÙˆØ± Ø¨Ø®Ø´ÛŒØ´ Ø±Ú©Ú¾ Ù„ÛŒÚºÛ”", audioText: "Keep the change as a tip for your friendly service." }
        ]
      },
      {
        id: "sec-a1-u5-l5-3",
        type: "dialogue",
        title: "Paying at the Cafe Cash Desk",
        dialogue: [
          { speaker: "Cashier", avatar: "C", english: "That is one chicken biryani, one salad, and two mineral waters. That comes to fifteen hundred rupees.", urdu: "Ø§ÛŒÚ© Ú†Ú©Ù† Ø¨Ø±ÛŒØ§Ù†ÛŒØŒ Ø§ÛŒÚ© Ø³Ù„Ø§Ø¯ Ø§ÙˆØ± Ø¯Ùˆ Ù…Ù†Ø±Ù„ ÙˆØ§Ù¹Ø±Û” Ú©Ù„ Ù¾Ù†Ø¯Ø±Û  Ø³Ùˆ Ø±ÙˆÙ¾Û’ Ø¨Ù†Û’Û”", audioText: "That is one chicken biryani, one salad, and two mineral waters. That comes to fifteen hundred rupees." },
          { speaker: "Customer", avatar: "P", english: "Here is a two-thousand-rupee note.", urdu: "ÛŒÛ  Ø¯Ùˆ Û Ø²Ø§Ø± Ú©Ø§ Ù†ÙˆÙ¹ Ù„ÛŒÚºÛ”", audioText: "Here is a two-thousand-rupee note." },
          { speaker: "Cashier", avatar: "C", english: "Thank you. And here is five hundred rupees change, with your receipt.", urdu: "Ø´Ú©Ø±ÛŒÛ Û” Ø§ÙˆØ± ÛŒÛ  Ù¾Ø§Ù†Ú† Ø³Ùˆ Ø±ÙˆÙ¾Û’ Ø¨Ù‚Ø§ÛŒØ§ Ø¢Ù¾ Ú©ÛŒ Ø±Ø³ÛŒØ¯ Ú©Û’ Ø³Ø§ØªÚ¾Û”", audioText: "Thank you. And here is five hundred rupees change, with your receipt." },
          { speaker: "Customer", avatar: "P", english: "Thank you very much. The meal was delicious!", urdu: "Ø¨Û Øª Ø´Ú©Ø±ÛŒÛ Û” Ú©Ú¾Ø§Ù†Ø§ ÙˆØ§Ù‚Ø¹ÛŒ Ø¨Û Øª Ù„Ø°ÛŒØ° ØªÚ¾Ø§!", audioText: "Thank you very much. The meal was delicious!" }
        ]
      },
      {
        id: "sec-a1-u5-l5-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u5-l5-1",
            type: "mcq",
            skillTag: "prices",
            prompt: "What is the correct question to ask the price of one single sandwich?",
            options: [
              { id: "opt-1", text: "How much are this sandwich?" },
              { id: "opt-2", text: "How much is this sandwich?" },
              { id: "opt-3", text: "How many is this sandwich?" },
              { id: "opt-4", text: "How many cost this sandwich?" }
            ],
            correctOptionId: "opt-2",
            explanation: "Singular items use 'How much is this sandwich?'.",
            urduExplanation: "ÙˆØ§Ø­Ø¯ Ú†ÛŒØ² Ú©ÛŒ Ù‚ÛŒÙ…Øª Ù¾ÙˆÚ†Ú¾Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ 'How much is this sandwich?' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u5-l5-2",
            type: "mcq",
            skillTag: "prices",
            prompt: "What is the correct question to ask the price of several samosas?",
            options: [
              { id: "opt-1", text: "How much is these samosas?" },
              { id: "opt-2", text: "How many is these samosas?" },
              { id: "opt-3", text: "How much are these samosas?" },
              { id: "opt-4", text: "How much does cost these samosas?" }
            ],
            correctOptionId: "opt-3",
            explanation: "Plural items take 'How much are these samosas?'.",
            urduExplanation: "Ø¬Ù…Ø¹ Ø§Ø´ÛŒØ§ Ú©ÛŒ Ù‚ÛŒÙ…Øª Ú©Û’ Ù„ÛŒÛ’ 'How much are these samosas?' Ù¾ÙˆÚ†Ú¾ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l5-3",
            type: "fill_blank",
            skillTag: "menus",
            prompt: "Complete the menu section name: 'Light dishes eaten before the main course are called _____.'",
            correctAnswer: "Starters",
            explanation: "'Starters' (or Appetizers) are light dishes served before mains.",
            urduExplanation: "Ø¨Ù†ÛŒØ§Ø¯ÛŒ Ú©Ú¾Ø§Ù†Û’ Ø³Û’ Ù¾Û Ù„Û’ Ú©ÛŒ Ø§Ø´ÛŒØ§ Ú©Ùˆ 'Starters' Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l5-4",
            type: "fill_blank",
            skillTag: "money",
            prompt: "Complete: 'When you give $20 for a $15 meal, you get $5 _____.'",
            correctAnswer: "change",
            explanation: "'Change' is the money returned when payment exceeds the price.",
            urduExplanation: "Ø¨Ù‚Ø§ÛŒØ§ Ù¾ÛŒØ³ÙˆÚº Ú©Ùˆ 'change' Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l5-5",
            type: "order_sentence",
            skillTag: "prices",
            prompt: "Rearrange the words to form a correct price question:",
            sentenceTokens: ["How", "much", "does", "this", "coffee", "cost", "?"],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "How much + does + this coffee + cost?",
            urduExplanation: "How much does this coffee cost?"
          },
          {
            id: "ex-a1-u5-l5-6",
            type: "order_sentence",
            skillTag: "prices",
            prompt: "Rearrange the words to form a statement:",
            sentenceTokens: ["The", "total", "comes", "to", "fifteen", "pounds", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Subject (The total) + verb (comes) + prepositional phrase (to fifteen pounds).",
            urduExplanation: "The total comes to fifteen pounds."
          },
          {
            id: "ex-a1-u5-l5-7",
            type: "match_pairs",
            skillTag: "money",
            prompt: "Match the currency name with its country:",
            pairs: [
              { left: "Rupee", right: "Pakistan" },
              { left: "Pound", right: "United Kingdom" },
              { left: "Dollar", right: "United States" },
              { left: "Euro", right: "European Union" }
            ],
            explanation: "Currencies accurately paired with regions.",
            urduExplanation: "Ú©Ø±Ù†Ø³ÛŒ Ú©Ùˆ Ø§Ø³ Ú©Û’ Ù…Ù„Ú© Ø³Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u5-l5-8",
            type: "error_correction",
            skillTag: "prices",
            prompt: "Find and correct the mistake: 'How much are this burger?'",
            correctAnswer: "How much is this burger?",
            explanation: "'This burger' is singular and requires 'is', not 'are'.",
            urduExplanation: "ÙˆØ§Ø­Ø¯ Ú©Û’ Ù„ÛŒÛ’ 'is' Ù„Ú©Ú¾ÛŒÚº: 'How much is this burger?'Û”"
          },
          {
            id: "ex-a1-u5-l5-9",
            type: "error_correction",
            skillTag: "prices",
            prompt: "Find and correct the mistake: 'How many does this book cost?'",
            correctAnswer: "How much does this book cost?",
            explanation: "Price inquiries always use 'How much', not 'How many'.",
            urduExplanation: "Ù‚ÛŒÙ…Øª Ù¾ÙˆÚ†Ú¾Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ 'How much' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u5-l5-10",
            type: "true_false",
            skillTag: "money",
            prompt: "'Keep the change' means the customer wants the waiter to return all coins. (True or False)",
            correctAnswer: "False",
            explanation: "False. 'Keep the change' means the customer is giving the remaining money as a tip.",
            urduExplanation: "ØºÙ„Ø·Û” 'Keep the change' Ú©Ø§ Ù…Ø·Ù„Ø¨ Û Û’ Ú©Û  Ø¨Ù‚Ø§ÛŒØ§ Ù¾ÛŒØ³Û’ Ø¨Ø·ÙˆØ± Ø¨Ø®Ø´ÛŒØ´ Ø±Ú©Ú¾ Ù„ÛŒÚºÛ”"
          }
        ]
      },
      {
        id: "sec-a1-u5-l5-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u5-l5-1",
            type: "mcq",
            skillTag: "menus",
            prompt: "Where on a menu would you look to find mineral water or tea?",
            options: [
              { id: "opt-1", text: "Starters" },
              { id: "opt-2", text: "Mains" },
              { id: "opt-3", text: "Beverages / Drinks" },
              { id: "opt-4", text: "Desserts" }
            ],
            correctOptionId: "opt-3",
            explanation: "Water and tea are listed under 'Beverages' or 'Drinks'.",
            urduExplanation: "Ù¾Ø§Ù†ÛŒ Ø§ÙˆØ± Ú†Ø§Ø¦Û’ 'Beverages' (Ù…Ø´Ø±ÙˆØ¨Ø§Øª) Ú©Û’ Ø³ÛŒÚ©Ø´Ù† Ù…ÛŒÚº Û ÙˆØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "qz-a1-u5-l5-2",
            type: "mcq",
            skillTag: "prices",
            prompt: "How is the price '$7.50' typically spoken in everyday English?",
            options: [
              { id: "opt-1", text: "Seven dollars and fifteen cents" },
              { id: "opt-2", text: "Fifty dollars and seven cents" },
              { id: "opt-3", text: "Seven dollars point fifty cents" },
              { id: "opt-4", text: "Seven dollars and fifty cents" }
            ],
            correctOptionId: "opt-4",
            explanation: "Standard spoken form is 'Seven dollars and fifty cents' (or 'Seven fifty').",
            urduExplanation: "$7.50 کو 'Seven dollars and fifty cents' بولا جاتا ہے۔"
          },
          {
            id: "qz-a1-u5-l5-3",
            type: "mcq",
            skillTag: "money",
            prompt: "What is the opposite of 'expensive'?",
            options: [
              { id: "opt-1", text: "cheap" },
              { id: "opt-2", text: "sweet" },
              { id: "opt-3", text: "costly" },
              { id: "opt-4", text: "rich" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Cheap' is the direct antonym of expensive.",
            urduExplanation: "expensive (Ù…Û Ù†Ú¯Ø§) Ú©Ø§ Ø§Ù„Ù¹ cheap (Ø³Ø³ØªØ§) Û Û’Û”"
          },
          {
            id: "qz-a1-u5-l5-4",
            type: "mcq",
            skillTag: "prices",
            prompt: "Complete the question: 'How much _____ these two cups of tea?'",
            options: [
              { id: "opt-1", text: "is" },
              { id: "opt-2", text: "are" },
              { id: "opt-3", text: "does" },
              { id: "opt-4", text: "costs" }
            ],
            correctOptionId: "opt-2",
            explanation: "'These two cups of tea' is plural, requiring 'are'.",
            urduExplanation: "Ø¬Ù…Ø¹ 'two cups' Ú©Û’ Ù„ÛŒÛ’ 'are' Ù„Ú¯Û’ Ú¯Ø§Û”"
          },
          {
            id: "qz-a1-u5-l5-5",
            type: "mcq",
            skillTag: "money",
            prompt: "What piece of paper confirms what you paid at a restaurant?",
            options: [
              { id: "opt-1", text: "A menu" },
              { id: "opt-2", text: "A napkin" },
              { id: "opt-3", text: "A receipt" },
              { id: "opt-4", text: "A poster" }
            ],
            correctOptionId: "opt-3",
            explanation: "A receipt is the formal printed proof of purchase.",
            urduExplanation: "Ø±Ø³ÛŒØ¯ Ú©Ùˆ 'receipt' Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          }
        ]
      },
      {
        id: "sec-a1-u5-l5-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Menus, prices, and payments summary:",
        summaryPoints: [
          "Ask prices: 'How much is this...?' (singular) / 'How much are these...?' (plural).",
          "Menu sections: Starters (appetizers), Mains (entrees), Sides, Beverages (drinks), Desserts.",
          "Payment options: Cash (coins/notes) or Card (debit/credit).",
          "Change = money returned when you overpay.",
          "Say 'Keep the change' when leaving a friendly tip."
        ]
      },
      {
        id: "sec-a1-u5-l5-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Û Ù… Ù‚ÛŒÙ…Øª Ù¾ÙˆÚ†Ú¾Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Ú©Û ØªÛ’ Û ÛŒÚº:\n- 'ÛŒÛ  Ú©ØªÙ†Û’ Ú©Ø§ Û Û’ØŸ'\n- 'ÛŒÛ  Ú†ÛŒØ²ÛŒÚº Ú©ØªÙ†Û’ Ú©ÛŒ Û ÛŒÚºØŸ'\n\nØ§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ù‚ÛŒÙ…Øª Ù¾ÙˆÚ†Ú¾ØªÛ’ ÙˆÙ‚Øª Û Ù…ÛŒØ´Û  **'How much'** Ø¢ØªØ§ Û Û’ (Ú©Ø¨Ú¾ÛŒ 'How many' Ù†Û  Ú©Û ÛŒÚº):\n- ÙˆØ§Ø­Ø¯ Ú©Û’ Ù„ÛŒÛ’: **How much is this?**\n- Ø¬Ù…Ø¹ Ú©Û’ Ù„ÛŒÛ’: **How much are these?**\n\nØ§Ø³ Ú©Û’ Ø¹Ù„Ø§ÙˆÛ  Ø¨Ù‚Ø§ÛŒØ§ Ù¾ÛŒØ³ÙˆÚº Ú©Ùˆ **Change** Ø§ÙˆØ± Ù¾Ø±Ù†Ù¹ Ø´Ø¯Û  Ø±Ø³ÛŒØ¯ Ú©Ùˆ **Receipt** (/rÉªËˆsiË t/ - ÛŒÛ Ø§Úº 'p' Ø®Ø§Ù…ÙˆØ´ Û Û’) Ú©Û ØªÛ’ Û ÛŒÚºÛ”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  }
];
