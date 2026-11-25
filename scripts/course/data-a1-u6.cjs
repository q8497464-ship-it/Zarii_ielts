/**
 * Zarii English Course - Level A1, Unit 6 Content
 * Unit 6: Numbers, Calendar & Dates
 * Lessons 1 to 5
 */

module.exports = [
  // -------------------------------------------------------------------------
  // LESSON 1: Cardinal Numbers 1 to 100
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u6-l1",
    level: "A1",
    unit: "unit-6",
    order: 1,
    title: "Cardinal Numbers 1 to 100",
    description: "Count from 1 to 100, master the difference between -teen and -ty, and say phone numbers and ages.",
    objectives: [
      "Count and write cardinal numbers from 1 to 100 accurately",
      "Distinguish between -teen numbers (thirteen /Î¸ÉœË ËˆtiË n/) and -ty numbers (thirty /ËˆÎ¸ÉœË ti/)",
      "Recite phone numbers, room numbers, and ages using standard spoken conventions"
    ],
    estimatedMinutes: 10,
    prerequisites: ["eng-a1-u5-l5"],
    skillTags: ["numbers", "cardinals", "pronunciation", "daily-english"],
    vocabularyList: [
      { word: "zero", partOfSpeech: "noun", phonetic: "/ËˆzÉªÉ™rÉ™ÊŠ/", definition: "No quantity or number; 0 (often pronounced 'oh' in phone numbers).", urduMeaning: "ØµÙ Ø±", exampleSentence: "My phone number starts with zero three hundred." },
      { word: "thirteen", partOfSpeech: "numeral", phonetic: "/ËŒÎ¸ÉœË ËˆtiË n/", definition: "The number equivalent to the sum of six and seven; 13.", urduMeaning: "ØªÛŒØ±Û ", exampleSentence: "He became a teenager on his thirteenth birthday." },
      { word: "thirty", partOfSpeech: "numeral", phonetic: "/ËˆÎ¸ÉœË ti/", definition: "The number equivalent to the product of three and ten; 30.", urduMeaning: "ØªÛŒØ³", exampleSentence: "There are thirty students in our classroom." },
      { word: "fourteen", partOfSpeech: "numeral", phonetic: "/ËŒfÉ”Ë ËˆtiË n/", definition: "The number equivalent to the sum of ten and four; 14.", urduMeaning: "Ú†ÙˆØ¯Û ", exampleSentence: "She is fourteen years old." },
      { word: "forty", partOfSpeech: "numeral", phonetic: "/ËˆfÉ”Ë ti/", definition: "The number equivalent to the product of four and ten; 40 (spelled without 'u').", urduMeaning: "Ú†Ø§Ù„ÛŒØ³", exampleSentence: "The temperature reached forty degrees in Multan." },
      { word: "fifteen", partOfSpeech: "numeral", phonetic: "/ËŒfÉªfËˆtiË n/", definition: "The number equivalent to the sum of ten and five; 15.", urduMeaning: "Ù¾Ù†Ø¯Ø±Û ", exampleSentence: "The journey takes fifteen minutes." },
      { word: "fifty", partOfSpeech: "numeral", phonetic: "/ËˆfÉªfti/", definition: "The number equivalent to the product of five and ten; 50.", urduMeaning: "Ù¾Ú†Ø§Ø³", exampleSentence: "He bought a fifty-rupee bus ticket." },
      { word: "hundred", partOfSpeech: "numeral", phonetic: "/ËˆhÊŒndrÉ™d/", definition: "The number equivalent to ten times ten; 100.", urduMeaning: "Ø³Ùˆ", exampleSentence: "There are one hundred pages in this notebook." },
      { word: "number", partOfSpeech: "noun", phonetic: "/ËˆnÊŒmbÉ™r/", definition: "An arithmetical value, expressed by a word, symbol, or figure.", urduMeaning: "Ù†Ù…Ø¨Ø± / Ø¹Ø¯Ø¯", exampleSentence: "Can you give me your contact number?" },
      { word: "count", partOfSpeech: "verb", phonetic: "/kaÊŠnt/", definition: "To determine the total number of a collection of items.", urduMeaning: "Ú¯Ù†Ù†Ø§", exampleSentence: "The young boy can count up to a hundred." }
    ],
    sections: [
      {
        id: "sec-a1-u6-l1-1",
        type: "explain",
        title: "Number Building & The Teen vs. Ty Contrast",
        content: "Counting in English follows regular building blocks after 20:\n- **21 to 99**: Combine the tens word with the unit word separated by a **hyphen (-)**: *twenty-one, thirty-five, forty-eight, ninety-nine*.\n\n### The Critical Pronunciation Difference: -teen vs. -ty\nMany English learners confuse **13-19** with **30-90**. The difference is in **word stress**:\n- **-teen numbers (13, 14, 15)**: Stress is on the **SECOND syllable** and the vowel is long /iË / (*thir-TEEN*, *four-TEEN*).\n- **-ty numbers (30, 40, 50)**: Stress is on the **FIRST syllable** and the ending is short /ti/ (*THIR-ty*, *FOR-ty*).\n\n### Spelling Watch: 40 vs. 14\nNotice: **fourteen** has a 'u', but **forty** drops the 'u' (F-O-R-T-Y)!",
        tables: [
          {
            title: "Teen vs. Ty Contrast Table",
            headers: ["Teen (13-19)", "Stress & Sound", "Ty (30-90)", "Stress & Sound", "Meaning"],
            rows: [
              ["13: thirteen", "thir-TEEN /ËŒÎ¸ÉœË ËˆtiË n/", "30: thirty", "THIR-ty /ËˆÎ¸ÉœË ti/", "ØªÛŒØ±Û  Ø¨Ù…Ù‚Ø§Ø¨Ù„Û  ØªÛŒØ³"],
              ["14: fourteen", "four-TEEN /ËŒfÉ”Ë ËˆtiË n/", "40: forty (no 'u')", "FOR-ty /ËˆfÉ”Ë ti/", "Ú†ÙˆØ¯Û  Ø¨Ù…Ù‚Ø§Ø¨Ù„Û  Ú†Ø§Ù„ÛŒØ³"],
              ["15: fifteen", "fif-TEEN /ËŒfÉªfËˆtiË n/", "50: fifty", "FIF-ty /ËˆfÉªfti/", "Ù¾Ù†Ø¯Ø±Û  Ø¨Ù…Ù‚Ø§Ø¨Ù„Û  Ù¾Ú†Ø§Ø³"],
              ["16: sixteen", "six-TEEN /ËŒsÉªksËˆtiË n/", "60: sixty", "SIX-ty /ËˆsÉªksti/", "Ø³ÙˆÙ„Û  Ø¨Ù…Ù‚Ø§Ø¨Ù„Û  Ø³Ø§Ù¹Ú¾"],
              ["17: seventeen", "seven-TEEN /ËŒsevnËˆtiË n/", "70: seventy", "SEVEN-ty /Ëˆsevnti/", "Ø³ØªØ±Û  Ø¨Ù…Ù‚Ø§Ø¨Ù„Û  Ø³ØªØ±"],
              ["18: eighteen", "eigh-TEEN /ËŒeÉªËˆtiË n/", "80: eighty", "EIGH-ty /ËˆeÉªti/", "Ø§Ù¹ÚÚ¾Ø§Ø±Û  Ø¨Ù…Ù‚Ø§Ø¨Ù„Û  Ø§Ø³ÛŒ"],
              ["19: nineteen", "nine-TEEN /ËŒnaÉªnËˆtiË n/", "90: ninety", "NINE-ty /ËˆnaÉªnti/", "Ø§Ù†ÛŒØ³ Ø¨Ù…Ù‚Ø§Ø¨Ù„Û  Ù†ÙˆÛ’"]
            ]
          },
          {
            title: "Saying Contact Numbers & Ages",
            headers: ["Context", "Spoken Convention", "Example", "Notes"],
            rows: [
              ["Phone Numbers", "Read digit by digit; 0 is 'zero' or 'oh'", "0300-1234567: 'oh-three-double-oh...'", "Group into clusters of 3-4 digits."],
              ["Ages", "Number alone or 'number years old'", "She is twenty-two / twenty-two years old", "Never say 'twenty-two years' alone."],
              ["Room Numbers", "Read in pairs or digits", "Room 305: 'Room three-oh-five'", "'Oh' replaces zero in casual speech."]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Hyphen Rule for Compound Numbers",
            text: "Always put a hyphen between tens and ones: **twenty-one**, **fifty-five**, **ninety-nine**."
          },
          {
            type: "warning",
            title: "Spelling of Forty",
            text: "'Forty' is the only number whose spelling drops the 'u': four (4), fourteen (14), but **forty (40)**."
          }
        ]
      },
      {
        id: "sec-a1-u6-l1-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "There are thirty-two students in our English classroom.", phonetic: "/Ã°eÉ™r É‘Ë r ËˆÎ¸ÉœË ti tuË  ËˆstjuË dÉ™nts Éªn ËˆaÊŠÉ™r ËˆÉªÅ‹É¡lÉªÊƒ ËˆklÉ‘Ë sruË m/", urdu: "Û Ù…Ø§Ø±ÛŒ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ú©ÛŒ Ú©Ù„Ø§Ø³ Ù…ÛŒÚº Ø¨ØªÛŒØ³ Ø·Ù„Ø¨Ø§ Û ÛŒÚºÛ”", audioText: "There are thirty-two students in our English classroom." },
          { english: "My grandfather is seventy-five years old and very active.", phonetic: "/maÉª ËˆÉ¡rÃ¦nfÉ‘Ë Ã°É™r Éªz Ëˆsevnti faÉªv jÉªÉ™z É™ÊŠld Ã¦nd Ëˆveri ËˆÃ¦ktÉªv/", urdu: "Ù…ÛŒØ±Û’ Ø¯Ø§Ø¯Ø§ Ù¾Ú†Ú¾ØªØ± Ø³Ø§Ù„ Ú©Û’ Û ÛŒÚº Ø§ÙˆØ± Ø¨Û Øª Ù…ØªØ­Ø±Ú© Û ÛŒÚºÛ”", audioText: "My grandfather is seventy-five years old and very active." },
          { english: "The book costs forty-five pounds at the campus bookstore.", phonetic: "/Ã°É™ bÊŠk kÉ’sts ËˆfÉ”Ë ti faÉªv paÊŠndz Ã¦t Ã°É™ ËˆkÃ¦mpÉ™s ËˆbÊŠkstÉ”Ë r/", urdu: "Ú©ÛŒÙ…Ù¾Ø³ Ú©Û’ Ú©ØªØ§Ø¨ Ú¯Ú¾Ø± Ù¾Ø± Ú©ØªØ§Ø¨ Ú©ÛŒ Ù‚ÛŒÙ…Øª Ù¾ÛŒÙ†ØªØ§Ù„ÛŒØ³ Ù¾Ø§Ø¤Ù†Úˆ Û Û’Û”", audioText: "The book costs forty-five pounds at the campus bookstore." },
          { english: "Please call me on zero three zero zero, one two three four five six seven.", phonetic: "/pliË z kÉ”Ë l miË  É’n ËˆzÉªÉ™rÉ™ÊŠ Î¸riË  ËˆzÉªÉ™rÉ™ÊŠ ËˆzÉªÉ™rÉ™ÊŠ wÊŒn tuË  Î¸riË  fÉ”Ë  faÉªv sÉªks Ëˆsevn/", urdu: "Ø¨Ø±Ø§Û  Ú©Ø±Ù… Ù…Ø¬Ú¾Û’ 0300-1234567 Ù¾Ø± Ú©Ø§Ù„ Ú©ÛŒØ¬ÛŒÛ’Û”", audioText: "Please call me on zero three zero zero, one two three four five six seven." },
          { english: "She celebrated her fourteenth birthday with her family.", phonetic: "/ÊƒiË  ËˆselÉªbreÉªtÉªd hÉœË r ËŒfÉ”Ë ËˆtiË nÎ¸ ËˆbÉœË Î¸deÉª wÉªÃ° hÉœË r ËˆfÃ¦mÉ™li/", urdu: "Ø§Ø³ Ù†Û’ Ø§Ù¾Ù†Û’ Ú¯Ú¾Ø± ÙˆØ§Ù„ÙˆÚº Ú©Û’ Ø³Ø§ØªÚ¾ Ø§Ù¾Ù†ÛŒ Ú†ÙˆØ¯Û ÙˆÛŒÚº Ø³Ø§Ù„Ú¯Ø±Û  Ù…Ù†Ø§Ø¦ÛŒÛ”", audioText: "She celebrated her fourteenth birthday with her family." },
          { english: "The speed limit on this highway is one hundred kilometres per hour.", phonetic: "/Ã°É™ spiË d ËˆlÉªmÉªt É’n Ã°Éªs ËˆhaÉªweÉª Éªz wÊŒn ËˆhÊŒndrÉ™d kÉªËˆlÉ’mÉªtÉ™z pÉœË r ËˆaÊŠÉ™r/", urdu: "Ø§Ø³ Û Ø§Ø¦ÛŒ ÙˆÛ’ Ù¾Ø± Ø±Ù ØªØ§Ø± Ú©ÛŒ Ø­Ø¯ Ø§ÛŒÚ© Ø³Ùˆ Ú©Ù„ÙˆÙ…ÛŒÙ¹Ø± Ù ÛŒ Ú¯Ú¾Ù†Ù¹Û  Û Û’Û”", audioText: "The speed limit on this highway is one hundred kilometres per hour." },
          { english: "Room number two hundred and fifteen is down this corridor.", phonetic: "/ruË m ËˆnÊŒmbÉ™r tuË  ËˆhÊŒndrÉ™d Ã¦nd ËŒfÉªfËˆtiË n Éªz daÊŠn Ã°Éªs ËˆkÉ’rÉªdÉ”Ë r/", urdu: "Ú©Ù…Ø±Û  Ù†Ù…Ø¨Ø± 215 Ø§Ø³ Ø±Ø§Û Ø¯Ø§Ø±ÛŒ Ú©Û’ Ø¢Ø®Ø± Ù…ÛŒÚº Û Û’Û”", audioText: "Room number two hundred and fifteen is down this corridor." },
          { english: "He has eighty-eight coins from different nations in his collection.", phonetic: "/hiË  hÃ¦z ËˆeÉªti eÉªt kÉ”Éªnz frÉ™m ËˆdÉªfrÉ™nt ËˆneÉªÊƒnz Éªn hÉªz kÉ™ËˆlekÊƒn/", urdu: "Ø§Ø³ Ú©Û’ Ú©Ù„ÛŒÚ©Ø´Ù† Ù…ÛŒÚº Ù…Ø®ØªÙ„Ù  Ù…Ù…Ø§Ù„Ú© Ú©Û’ Ø§Ù¹Ú¾Ø§Ø³ÛŒ Ø³Ú©Û’ Û ÛŒÚºÛ”", audioText: "He has eighty-eight coins from different nations in his collection." }
        ]
      },
      {
        id: "sec-a1-u6-l1-3",
        type: "dialogue",
        title: "Exchanging Phone Numbers",
        dialogue: [
          { speaker: "Naveed", avatar: "N", english: "Could I have your mobile number, Haris?", urdu: "Ø­Ø§Ø±Ø«ØŒ Ú©ÛŒØ§ Ù…Ø¬Ú¾Û’ Ø¢Ù¾ Ú©Ø§ Ù…ÙˆØ¨Ø§Ø¦Ù„ Ù†Ù…Ø¨Ø± Ù…Ù„ Ø³Ú©ØªØ§ Û Û’ØŸ", audioText: "Could I have your mobile number, Haris?" },
          { speaker: "Haris", avatar: "H", english: "Sure! It's zero three two one, four five six seven eight nine zero.", urdu: "Ø¶Ø±ÙˆØ±! ÛŒÛ  Û Û’: 0321-4567890Û”", audioText: "Sure! It's zero three two one, four five six seven eight nine zero." },
          { speaker: "Naveed", avatar: "N", english: "Let me repeat that: zero three two one, four five six, seven eight nine zero. Is that right?", urdu: "Ù…ÛŒÚº Ø¯Û Ø±Ø§ Ù„ÙˆÚº: 0321-456-7890Û” Ú©ÛŒØ§ ÛŒÛ  Ø¯Ø±Ø³Øª Û Û’ØŸ", audioText: "Let me repeat that: zero three two one, four five six, seven eight nine zero. Is that right?" },
          { speaker: "Haris", avatar: "H", english: "Yes, exactly right! Save it under my name.", urdu: "Ø¬ÛŒ Û Ø§ÚºØŒ Ø¨Ø§Ù„Ú©Ù„ ØµØ­ÛŒØ­! Ø§Ø³Û’ Ù…ÛŒØ±Û’ Ù†Ø§Ù… Ø³Û’ Ù…Ø­Ù ÙˆØ¸ Ú©Ø± Ù„ÛŒÚºÛ”", audioText: "Yes, exactly right! Save it under my name." }
        ]
      },
      {
        id: "sec-a1-u6-l1-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u6-l1-1",
            type: "mcq",
            skillTag: "spelling",
            prompt: "What is the correct spelling for the number 40?",
            options: [
              { id: "opt-1", text: "forty" },
              { id: "opt-2", text: "fourty" },
              { id: "opt-3", text: "fourti" },
              { id: "opt-4", text: "fortee" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Forty' is spelled F-O-R-T-Y without a 'u'.",
            urduExplanation: "40 Ú©ÛŒ ØµØ­ÛŒØ­ Ø§Ù…Ù„Ø§ 'forty' (Ø¨ØºÛŒØ± 'u' Ú©Û’) Û Û’Û”"
          },
          {
            id: "ex-a1-u6-l1-2",
            type: "mcq",
            skillTag: "pronunciation",
            prompt: "Where is the main stress in the number 13 (thirteen)?",
            options: [
              { id: "opt-1", text: "On the first syllable (THIR-teen)" },
              { id: "opt-2", text: "On the second syllable (thir-TEEN)" },
              { id: "opt-3", text: "There is no stress" },
              { id: "opt-4", text: "Equal stress on all consonants" }
            ],
            correctOptionId: "opt-2",
            explanation: "-Teen numbers have primary stress on the second syllable: thir-TEEN.",
            urduExplanation: "-teen ÙˆØ§Ù„Û’ Ù†Ù…Ø¨Ø±ÙˆÚº Ù…ÛŒÚº Ø¯ÙˆØ³Ø±Û’ syllable Ù¾Ø± Ø²ÙˆØ± Ø¯ÛŒØ§ Ø¬Ø§ØªØ§ Û Û’: thir-TEENÛ”"
          },
          {
            id: "ex-a1-u6-l1-3",
            type: "fill_blank",
            skillTag: "cardinals",
            prompt: "Write out the compound number 25 in words with a hyphen: '_____'",
            correctAnswer: "twenty-five",
            explanation: "Compound numbers from 21 to 99 are hyphenated: 'twenty-five'.",
            urduExplanation: "25 Ú©Ùˆ hyphen Ú©Û’ Ø³Ø§ØªÚ¾ 'twenty-five' Ù„Ú©Ú¾ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u6-l1-4",
            type: "fill_blank",
            skillTag: "cardinals",
            prompt: "Complete the sentence with the word form of 100: 'There are one _____ cents in a dollar.'",
            correctAnswer: "hundred",
            explanation: "100 is written 'hundred'.",
            urduExplanation: "100 Ú©Ùˆ 'hundred' Ù„Ú©Ú¾Ø§ Ø¬Ø§ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u6-l1-5",
            type: "order_sentence",
            skillTag: "cardinals",
            prompt: "Rearrange the words to form a correct sentence:",
            sentenceTokens: ["My", "father", "is", "fifty-four", "years", "old", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Subject (My father) + verb (is) + age phrase (fifty-four years old).",
            urduExplanation: "My father is fifty-four years old."
          },
          {
            id: "ex-a1-u6-l1-6",
            type: "order_sentence",
            skillTag: "cardinals",
            prompt: "Rearrange the words to form a correct statement:",
            sentenceTokens: ["There", "are", "thirty", "days", "in", "April", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "There are + thirty days + in April.",
            urduExplanation: "There are thirty days in April."
          },
          {
            id: "ex-a1-u6-l1-7",
            type: "match_pairs",
            skillTag: "cardinals",
            prompt: "Match the numeral with its correct word form:",
            pairs: [
              { left: "15", right: "fifteen" },
              { left: "50", right: "fifty" },
              { left: "14", right: "fourteen" },
              { left: "40", right: "forty" }
            ],
            explanation: "Numerals matched accurately to word spellings.",
            urduExplanation: "Û Ù†Ø¯Ø³ÙˆÚº Ú©Ùˆ Ø§Ù† Ú©Û’ Ø§Ù„Ù Ø§Ø¸ Ø³Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u6-l1-8",
            type: "error_correction",
            skillTag: "spelling",
            prompt: "Find and correct the mistake: 'He paid fourty rupees for the ticket.'",
            correctAnswer: "He paid forty rupees for the ticket.",
            explanation: "'Forty' is spelled without a 'u': f-o-r-t-y.",
            urduExplanation: "'fourty' ØºÙ„Ø· Û Û’ØŒ ØµØ­ÛŒØ­ 'forty' Û Û’Û”"
          },
          {
            id: "ex-a1-u6-l1-9",
            type: "error_correction",
            skillTag: "cardinals",
            prompt: "Find and correct the mistake: 'She is twenty two years old.'",
            correctAnswer: "She is twenty-two years old.",
            explanation: "Compound numbers from 21 to 99 must have a hyphen: 'twenty-two'.",
            urduExplanation: "'twenty-two' Ú©Û’ Ø¯Ø±Ù…ÛŒØ§Ù† hyphen (-) Ù„Ú¯Ø§Ù†Ø§ Ù„Ø§Ø²Ù…ÛŒ Û Û’Û”"
          },
          {
            id: "ex-a1-u6-l1-10",
            type: "true_false",
            skillTag: "pronunciation",
            prompt: "In spoken phone numbers, the digit 0 is frequently pronounced like the letter 'oh'. (True or False)",
            correctAnswer: "True",
            explanation: "True. In phone numbers and room numbers, 0 is often said as 'oh'.",
            urduExplanation: "Ø¯Ø±Ø³ØªÛ” Ù ÙˆÙ† Ù†Ù…Ø¨Ø± Ù…ÛŒÚº ØµÙ Ø± Ú©Ùˆ Ø¹Ø§Ù… Ø·ÙˆØ± Ù¾Ø± 'oh' Ø¨ÙˆÙ„Ø§ Ø¬Ø§ØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u6-l1-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u6-l1-1",
            type: "mcq",
            skillTag: "spelling",
            prompt: "Which number is spelled INCORRECTLY?",
            options: [
              { id: "opt-1", text: "fourteen" },
              { id: "opt-2", text: "fifteen" },
              { id: "opt-3", text: "eighteen" },
              { id: "opt-4", text: "fourty" }
            ],
            correctOptionId: "opt-4",
            explanation: "'Fourty' is misspelled; the correct English spelling is 'forty'.",
            urduExplanation: "'fourty' ØºÙ„Ø· Ø§Ù…Ù„Ø§ Û Û’ØŒ ØµØ­ÛŒØ­ 'forty' Û Û’Û”"
          },
          {
            id: "qz-a1-u6-l1-2",
            type: "mcq",
            skillTag: "cardinals",
            prompt: "How is the number 99 written in standard English?",
            options: [
              { id: "opt-1", text: "ninety-nine" },
              { id: "opt-2", text: "ninety nine" },
              { id: "opt-3", text: "ninty-nine" },
              { id: "opt-4", text: "ninety and nine" }
            ],
            correctOptionId: "opt-1",
            explanation: "Compound numbers require a hyphen: 'ninety-nine'.",
            urduExplanation: "99 Ú©Ùˆ hyphen Ú©Û’ Ø³Ø§ØªÚ¾ 'ninety-nine' Ù„Ú©Ú¾ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "qz-a1-u6-l1-3",
            type: "mcq",
            skillTag: "pronunciation",
            prompt: "What is the key pronunciation difference between fifteen and fifty?",
            options: [
              { id: "opt-1", text: "Fifteen drops the first syllable, whereas fifty preserves both parts" },
              { id: "opt-2", text: "Fifteen stresses the second syllable, while fifty stresses the first" },
              { id: "opt-3", text: "Fifteen uses a voiced ending consonant, whereas fifty remains silent" },
              { id: "opt-4", text: "Fifteen alternates between long vowels, while fifty shortens neither" }
            ],
            correctOptionId: "opt-2",
            explanation: "fif-TEEN (second syllable stress) vs. FIF-ty (first syllable stress).",
            urduExplanation: "fif-TEEN میں دوسرے syllable پر اور FIF-ty میں پہلے syllable پر زور ہوتا ہے۔"
          },
          {
            id: "qz-a1-u6-l1-4",
            type: "mcq",
            skillTag: "cardinals",
            prompt: "How do you say someone's age naturally in English?",
            options: [
              { id: "opt-1", text: "He has twenty-five years." },
              { id: "opt-2", text: "He lives twenty-five years." },
              { id: "opt-3", text: "He is twenty-five years old." },
              { id: "opt-4", text: "He owns twenty-five years." }
            ],
            correctOptionId: "opt-3",
            explanation: "Use 'to be' + number + 'years old' (or number alone): 'He is twenty-five years old'.",
            urduExplanation: "عمر بتانے کے لیے 'He is twenty years old' کہتے ہیں۔"
          },
          {
            id: "qz-a1-u6-l1-5",
            type: "mcq",
            skillTag: "cardinals",
            prompt: "What number comes after ninety-nine?",
            options: [
              { id: "opt-1", text: "ten hundred" },
              { id: "opt-2", text: "ninety-ten" },
              { id: "opt-3", text: "thousand" },
              { id: "opt-4", text: "one hundred" }
            ],
            correctOptionId: "opt-4",
            explanation: "One hundred (100) immediately follows ninety-nine (99).",
            urduExplanation: "99 Ú©Û’ Ø¨Ø¹Ø¯ 100 (one hundred) Ø¢ØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u6-l1-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Cardinal numbers summary:",
        summaryPoints: [
          "Compound numbers 21-99 take a hyphen (twenty-one, forty-five, ninety-nine).",
          "Distinguish -teen (stress on 2nd syllable) from -ty (stress on 1st syllable).",
          "Remember forty is spelled WITHOUT 'u' (forty, NOT fourty).",
          "In phone numbers and room numbers, 0 is often read as 'oh'.",
          "State age with 'is [number] years old' or simply 'is [number]'."
        ]
      },
      {
        id: "sec-a1-u6-l1-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Ú¯Ù†ØªÛŒ Ú©Û’ Ø§Ù„Ù Ø§Ø¸ (Ø§Ú©ÛŒØ³ØŒ Ø¨Ø§Ø¦ÛŒØ³ØŒ Ø§Ú©ØªØ§Ù„ÛŒØ³ØŒ Ø§Ù†ØªØ§Ù„ÛŒØ³) Û Ø± Ø¹Ø¯Ø¯ Ú©Û’ Ù„ÛŒÛ’ Ø§Ù„Ú¯ Ø§Ù„Ú¯ Û ÙˆØªÛ’ Û ÛŒÚº Ø¬Ù†Û ÛŒÚº ÛŒØ§Ø¯ Ú©Ø±Ù†Ø§ Ù¾Ú‘ØªØ§ Û Û’Û”\n\n**Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ú©ÛŒ Ú¯Ù†ØªÛŒ Ø¨Û Øª Ø¨Ø§Ù‚Ø§Ø¹Ø¯Û  (Systematic) Û Û’:**\nØ§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº ØµØ±Ù  Ø¯Û Ø§Ø¦ÛŒ (twenty, thirty, forty...) Ú©Û’ Ø¨Ø¹Ø¯ Û Ø§Ø¦ÛŒÙ Ù† Ù„Ú¯Ø§ Ú©Ø± Ù¾Û Ù„ÛŒ Ú¯Ù†ØªÛŒ Ø¬ÙˆÚ‘ Ø¯ÛŒÚº:\n- twenty-one, twenty-two, thirty-one...\n\n**Ø¯Ùˆ Ø§Û Ù… ØºÙ„Ø·ÛŒØ§Úº Ø¬Ù† Ø³Û’ Ø¨Ú†Ù†Ø§ Û Û’:**\n1. **Teen Ø§ÙˆØ± Ty Ú©Ø§ Ù Ø±Ù‚**: Thirteen (13) Ú©Û’ Ø¢Ø®Ø± Ù…ÛŒÚº Ù„Ù…Ø¨ÛŒ Ø¢ÙˆØ§Ø² Û Û’ØŒ Ø¬Ø¨Ú©Û  Thirty (30) Ú©Û’ Ø¢Ø®Ø± Ù…ÛŒÚº Ù…Ø®ØªØµØ± Ø¢ÙˆØ§Ø² Û Û’Û”\n2. **Forty Ú©ÛŒ Ø§Ù…Ù„Ø§**: Four (4) Ù…ÛŒÚº 'u' Û ÙˆØªØ§ Û Û’ØŒ Ù„ÛŒÚ©Ù† Forty (40) Ù…ÛŒÚº 'u' **Ù†Û ÛŒÚº** Û ÙˆØªØ§Û”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 2: Days of the Week & Months
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u6-l2",
    level: "A1",
    unit: "unit-6",
    order: 2,
    title: "Days of the Week & Months",
    description: "Learn the seven days of the week, the twelve months of the year, and capitalization rules.",
    objectives: [
      "Name and spell all seven days of the week in chronological order",
      "Name and spell all twelve months of the year accurately",
      "Apply the strict English rule: Days and Months MUST always be capitalized (Monday, July)"
    ],
    estimatedMinutes: 8,
    prerequisites: ["eng-a1-u6-l1"],
    skillTags: ["calendar", "vocabulary", "days-months", "capitalization"],
    vocabularyList: [
      { word: "Monday", partOfSpeech: "noun", phonetic: "/ËˆmÊŒndeÉª/", definition: "The day of the week before Tuesday and following Sunday; the start of the working week.", urduMeaning: "Ù¾ÛŒØ±", exampleSentence: "Our new course starts on Monday morning." },
      { word: "Friday", partOfSpeech: "noun", phonetic: "/ËˆfraÉªdeÉª/", definition: "The day of the week before Saturday and following Thursday.", urduMeaning: "Ø¬Ù…Ø¹Û ", exampleSentence: "Jummah prayers take place on Friday afternoon." },
      { word: "Sunday", partOfSpeech: "noun", phonetic: "/ËˆsÊŒndeÉª/", definition: "The day of the week before Monday and following Saturday; a weekend day.", urduMeaning: "Ø§ØªÙˆØ§Ø±", exampleSentence: "Families relax together on Sunday." },
      { word: "January", partOfSpeech: "noun", phonetic: "/ËˆdÊ’Ã¦njuÉ™ri/", definition: "The first month of the year, in the northern hemisphere usually the coldest.", urduMeaning: "Ø¬Ù†ÙˆØ±ÛŒ", exampleSentence: "Winter is very cold in January in Quetta." },
      { word: "March", partOfSpeech: "noun", phonetic: "/mÉ‘Ë tÊƒ/", definition: "The third month of the year; marks the beginning of spring.", urduMeaning: "Ù…Ø§Ø±Ú†", exampleSentence: "Pakistan Day is celebrated on the 23rd of March." },
      { word: "August", partOfSpeech: "noun", phonetic: "/ËˆÉ”Ë É¡É™st/", definition: "The eighth month of the year, in the northern hemisphere usually warm.", urduMeaning: "Ø§Ú¯Ø³Øª", exampleSentence: "Independence Day is celebrated on 14th August." },
      { word: "October", partOfSpeech: "noun", phonetic: "/É’kËˆtÉ™ÊŠbÉ™r/", definition: "The tenth month of the year, in the northern hemisphere autumn.", urduMeaning: "Ø§Ú©ØªÙˆØ¨Ø±", exampleSentence: "The autumn breeze begins in October." },
      { word: "December", partOfSpeech: "noun", phonetic: "/dÉªËˆsembÉ™r/", definition: "The twelfth and final month of the year.", urduMeaning: "Ø¯Ø³Ù…Ø¨Ø±", exampleSentence: "Schools close for winter vacation in late December." },
      { word: "week", partOfSpeech: "noun", phonetic: "/wiË k/", definition: "A period of seven consecutive days, typically from Monday to Sunday.", urduMeaning: "Û Ù ØªÛ ", exampleSentence: "There are seven days in a week." },
      { word: "month", partOfSpeech: "noun", phonetic: "/mÊŒnÎ¸/", definition: "Each of the twelve named periods into which a year is divided.", urduMeaning: "Ù…Û ÛŒÙ†Û ", exampleSentence: "There are twelve months in one calendar year." }
    ],
    sections: [
      {
        id: "sec-a1-u6-l2-1",
        type: "explain",
        title: "The Calendar Framework & Capitalization",
        content: "In English, names of days and months are **proper nouns**. This means they have one inviolable rule:\n\n### The Golden Capitalization Rule\nDays and months **MUST ALWAYS BEGIN WITH A CAPITAL LETTER**, no matter where they appear in a sentence!\n- *I will see you on **M**onday.* (NEVER *monday*).\n- *My birthday is in **J**uly.* (NEVER *july*).",
        tables: [
          {
            title: "Days of the Week (Chronological Order)",
            headers: ["Day", "Abbreviation", "Category", "Preposition", "Urdu Equivalent"],
            rows: [
              ["Monday", "Mon", "Weekday", "on Monday", "Ù¾ÛŒØ±"],
              ["Tuesday", "Tue", "Weekday", "on Tuesday", "Ù…Ù†Ú¯Ù„"],
              ["Wednesday (silent 'd')", "Wed", "Weekday", "on Wednesday", "Ø¨Ø¯Ú¾"],
              ["Thursday", "Thu", "Weekday", "on Thursday", "Ø¬Ù…Ø¹Ø±Ø§Øª"],
              ["Friday", "Fri", "Weekday", "on Friday", "Ø¬Ù…Ø¹Û "],
              ["Saturday", "Sat", "Weekend", "on Saturday", "Û Ù ØªÛ "],
              ["Sunday", "Sun", "Weekend", "on Sunday", "Ø§ØªÙˆØ§Ø±"]
            ]
          },
          {
            title: "Twelve Months of the Year",
            headers: ["Month", "Days Count", "Season (Northern)", "Preposition", "Urdu Translation"],
            rows: [
              ["January, February", "31 / 28-29", "Winter", "in January", "Ø¬Ù†ÙˆØ±ÛŒØŒ Ù Ø±ÙˆØ±ÛŒ"],
              ["March, April, May", "31 / 30 / 31", "Spring", "in March", "Ù…Ø§Ø±Ú†ØŒ Ø§Ù¾Ø±ÛŒÙ„ØŒ Ù…Ø¦ÛŒ"],
              ["June, July, August", "30 / 31 / 31", "Summer", "in August", "Ø¬ÙˆÙ†ØŒ Ø¬ÙˆÙ„Ø§Ø¦ÛŒØŒ Ø§Ú¯Ø³Øª"],
              ["September, October, November", "30 / 31 / 30", "Autumn / Fall", "in October", "Ø³ØªÙ…Ø¨Ø±ØŒ Ø§Ú©ØªÙˆØ¨Ø±ØŒ Ù†ÙˆÙ…Ø¨Ø±"],
              ["December", "31", "Winter", "in December", "Ø¯Ø³Ù…Ø¨Ø±"]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Pronouncing Wednesday",
            text: "The first 'd' in **Wednesday** is completely silent! It is pronounced as two syllables: **/ËˆwenzdeÉª/** (WENZ-day)."
          },
          {
            type: "warning",
            title: "Preposition Pairings",
            text: "Always say **ON** with days (*on Friday*) and **IN** with months (*in August*)."
          }
        ]
      },
      {
        id: "sec-a1-u6-l2-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "We have our English grammar class on Monday and Wednesday.", phonetic: "/wiË  hÃ¦v ËˆaÊŠÉ™r ËˆÉªÅ‹É¡lÉªÊƒ ËˆÉ¡rÃ¦mÉ™r klÉ‘Ë s É’n ËˆmÊŒndeÉª Ã¦nd ËˆwenzdeÉª/", urdu: "Û Ù…Ø§Ø±ÛŒ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ú¯Ø±Ø§Ù…Ø± Ú©ÛŒ Ú©Ù„Ø§Ø³ Ù¾ÛŒØ± Ø§ÙˆØ± Ø¨Ø¯Ú¾ Ú©Ùˆ Û ÙˆØªÛŒ Û Û’Û”", audioText: "We have our English grammar class on Monday and Wednesday." },
          { english: "August is a momentous month in Pakistan's national history.", phonetic: "/ËˆÉ”Ë É¡É™st Éªz É™ mÉ™ÊŠËˆmentÉ™s mÊŒnÎ¸ Éªn ËŒpÉ‘Ë kÉªËˆstÉ‘Ë nz ËˆnÃ¦ÊƒnÉ™l ËˆhÉªstri/", urdu: "Ø§Ú¯Ø³Øª Ù¾Ø§Ú©Ø³ØªØ§Ù† Ú©ÛŒ Ù‚ÙˆÙ…ÛŒ ØªØ§Ø±ÛŒØ® Ù…ÛŒÚº Ø§ÛŒÚ© Ø§Ù†ØªÛ Ø§Ø¦ÛŒ Ø§Û Ù… Ù…Û ÛŒÙ†Û  Û Û’Û”", audioText: "August is a momentous month in Pakistan's national history." },
          { english: "Banks and government offices are closed on Sunday.", phonetic: "/bÃ¦Å‹ks Ã¦nd ËˆÉ¡ÊŒvnmÉ™nt ËˆÉ’fÉªsÉªz É‘Ë  klÉ™ÊŠzd É’n ËˆsÊŒndeÉª/", urdu: "Ø¨ÛŒÙ†Ú© Ø§ÙˆØ± Ø³Ø±Ú©Ø§Ø±ÛŒ Ø¯Ù Ø§ØªØ± Ø§ØªÙˆØ§Ø± Ú©Ùˆ Ø¨Ù†Ø¯ Û ÙˆØªÛ’ Û ÛŒÚºÛ”", audioText: "Banks and government offices are closed on Sunday." },
          { english: "Spring flowers bloom across Islamabad in March and April.", phonetic: "/sprÉªÅ‹ ËˆflaÊŠÉ™z bluË m É™ËˆkrÉ’s ÉªsËˆlÉ‘Ë mÉ™bÉ‘Ë d Éªn mÉ‘Ë tÊƒ Ã¦nd ËˆeÉªprÉ™l/", urdu: "Ù…Ø§Ø±Ú† Ø§ÙˆØ± Ø§Ù¾Ø±ÛŒÙ„ Ù…ÛŒÚº Ø§Ø³Ù„Ø§Ù… Ø¢Ø¨Ø§Ø¯ Ù…ÛŒÚº Ø¨Û Ø§Ø± Ú©Û’ Ù¾ÚÚ¾ÙˆÙ„ Ú©Ú¾Ù„ØªÛ’ Û ÛŒÚºÛ”", audioText: "Spring flowers bloom across Islamabad in March and April." },
          { english: "Do you have any special plans for this Friday evening?", phonetic: "/duË  juË  hÃ¦v Ëˆeni ËˆspeÊƒl plÃ¦nz fÉ”Ë r Ã°Éªs ËˆfraÉªdeÉª ËˆiË vnÉªÅ‹/", urdu: "Ú©ÛŒØ§ Ø§Ø³ Ø¬Ù…Ø¹Û’ Ú©ÛŒ Ø´Ø§Ù… Ú©Û’ Ù„ÛŒÛ’ Ø¢Ù¾ Ú©Ø§ Ú©ÙˆØ¦ÛŒ Ø®Ø§Øµ Ù¾Ø±ÙˆÚ¯Ø±Ø§Ù… Û Û’ØŸ", audioText: "Do you have any special plans for this Friday evening?" },
          { english: "December brings cold northern winds to the plains of Punjab.", phonetic: "/dÉªËˆsembÉ™r brÉªÅ‹z kÉ™ÊŠld ËˆnÉ”Ë Ã°É™n wÉªndz tuË  Ã°É™ pleÉªnz É™v pÊŒnËˆdÊ’É‘Ë b/", urdu: "Ø¯Ø³Ù…Ø¨Ø± Ù¾Ù†Ø¬Ø§Ø¨ Ú©Û’ Ù…ÛŒØ¯Ø§Ù†ÙˆÚº Ù…ÛŒÚº Ø³Ø±Ø¯ Ø´Ù…Ø§Ù„ÛŒ Û ÙˆØ§Ø¦ÛŒÚº Ù„Ø§ØªØ§ Û Û’Û”", audioText: "December brings cold northern winds to the plains of Punjab." },
          { english: "We usually visit our grandparents on Saturday afternoon.", phonetic: "/wiË  ËˆjuË Ê’uÉ™li ËˆvÉªzÉªt ËˆaÊŠÉ™r ËˆÉ¡rÃ¦npeÉ™rÉ™nts É’n ËˆsÃ¦tÉ™deÉª ËŒÉ‘Ë ftÉ™ËˆnuË n/", urdu: "Û Ù… Ø¹Ø§Ù… Ø·ÙˆØ± Ù¾Ø± Û Ù ØªÛ’ Ú©ÛŒ Ø³Û  Ù¾Û Ø± Ø§Ù¾Ù†Û’ Ø¯Ø§Ø¯Ø§ Ø¯Ø§Ø¯ÛŒ Ú©Û’ Û Ø§Úº Ø¬Ø§ØªÛ’ Û ÛŒÚºÛ”", audioText: "We usually visit our grandparents on Saturday afternoon." },
          { english: "July is usually the hottest and rainiest monsoon month.", phonetic: "/dÊ’uË ËˆlaÉª Éªz ËˆjuË Ê’uÉ™li Ã°É™ ËˆhÉ’tÉªst Ã¦nd ËˆreÉªniÉªst mÉ’nËˆsuË n mÊŒnÎ¸/", urdu: "Ø¬ÙˆÙ„Ø§Ø¦ÛŒ Ø¹Ø§Ù… Ø·ÙˆØ± Ù¾Ø± Ù…ÙˆÙ† Ø³ÙˆÙ† Ú©Ø§ Ø³Ø¨ Ø³Û’ Ú¯Ø±Ù… Ø§ÙˆØ± Ø¨Ø§Ø±Ø´ÙˆÚº ÙˆØ§Ù„Ø§ Ù…Û ÛŒÙ†Û  Û ÙˆØªØ§ Û Û’Û”", audioText: "July is usually the hottest and rainiest monsoon month." }
        ]
      },
      {
        id: "sec-a1-u6-l2-3",
        type: "dialogue",
        title: "Planning the Study Schedule",
        dialogue: [
          { speaker: "Adil", avatar: "A", english: "Which days are best for our group study sessions?", urdu: "Û Ù…Ø§Ø±Û’ Ú¯Ø±ÙˆÙ¾ Ø§Ø³Ù¹ÚˆÛŒ Ú©Û’ Ù„ÛŒÛ’ Ú©ÙˆÙ† Ø³Û’ Ø¯Ù† Ø³Ø¨ Ø³Û’ Ø§Ú†Ú¾Û’ Ø±Û ÛŒÚº Ú¯Û’ØŸ", audioText: "Which days are best for our group study sessions?" },
          { speaker: "Zubair", avatar: "Z", english: "I am free on Tuesday and Thursday after five o'clock.", urdu: "Ù…ÛŒÚº Ù…Ù†Ú¯Ù„ Ø§ÙˆØ± Ø¬Ù…Ø¹Ø±Ø§Øª Ú©Ùˆ Ù¾Ø§Ù†Ú† Ø¨Ø¬Û’ Ú©Û’ Ø¨Ø¹Ø¯ Ù Ø§Ø±Øº Û ÙˆØªØ§ Û ÙˆÚºÛ”", audioText: "I am free on Tuesday and Thursday after five o'clock." },
          { speaker: "Adil", avatar: "A", english: "Tuesday and Thursday are perfect! And when does the semester end?", urdu: "Ù…Ù†Ú¯Ù„ Ø§ÙˆØ± Ø¬Ù…Ø¹Ø±Ø§Øª Ø¨Û ØªØ±ÛŒÙ† Û ÛŒÚº! Ø§ÙˆØ± Ø³Ù…ÛŒØ³Ù¹Ø± Ú©Ø¨ Ø®ØªÙ… Û ÙˆØªØ§ Û Û’ØŸ", audioText: "Tuesday and Thursday are perfect! And when does the semester end?" },
          { speaker: "Zubair", avatar: "Z", english: "Final exams begin in late June, so we have plenty of time.", urdu: "Ø³Ø§Ù„Ø§Ù†Û  Ø§Ù…ØªØ­Ø§Ù†Ø§Øª Ø¬ÙˆÙ† Ú©Û’ Ø¢Ø®Ø± Ù…ÛŒÚº Ø´Ø±ÙˆØ¹ Û ÙˆÙ†Ú¯Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ Û Ù…Ø§Ø±Û’ Ù¾Ø§Ø³ Ú©Ø§Ù ÛŒ ÙˆÙ‚Øª Û Û’Û”", audioText: "Final exams begin in late June, so we have plenty of time." }
        ]
      },
      {
        id: "sec-a1-u6-l2-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u6-l2-1",
            type: "mcq",
            skillTag: "capitalization",
            prompt: "Which sentence has correct capitalization for days of the week?",
            options: [
              { id: "opt-1", text: "We attend class on monday afternoon." },
              { id: "opt-2", text: "They play soccer on tuesday evening." },
              { id: "opt-3", text: "We have class on Monday and Friday." },
              { id: "opt-4", text: "I visit friends on sunday morning." }
            ],
            correctOptionId: "opt-3",
            explanation: "All days of the week must begin with capital letters: 'Monday' and 'Friday'.",
            urduExplanation: "ہفتے کے تمام دنوں کے نام Capital letter سے شروع ہونے چاہیئیں۔"
          },
          {
            id: "ex-a1-u6-l2-2",
            type: "mcq",
            skillTag: "prepositions",
            prompt: "Choose the correct preposition: 'The festival takes place _____ October.'",
            options: [
              { id: "opt-1", text: "on" },
              { id: "opt-2", text: "at" },
              { id: "opt-3", text: "by" },
              { id: "opt-4", text: "in" }
            ],
            correctOptionId: "opt-4",
            explanation: "Months take the preposition 'in': 'in October'.",
            urduExplanation: "Ù…Û ÛŒÙ†ÙˆÚº Ú©Û’ Ù†Ø§Ù… Ú©Û’ Ø³Ø§ØªÚ¾ 'in' Ø¢ØªØ§ Û Û’: 'in October'Û”"
          },
          {
            id: "ex-a1-u6-l2-3",
            type: "fill_blank",
            skillTag: "days-months",
            prompt: "Which day comes between Tuesday and Thursday? '_____' (capitalize correctly).",
            correctAnswer: "Wednesday",
            explanation: "'Wednesday' comes between Tuesday and Thursday.",
            urduExplanation: "Ù…Ù†Ú¯Ù„ Ø§ÙˆØ± Ø¬Ù…Ø¹Ø±Ø§Øª Ú©Û’ Ø¯Ø±Ù…ÛŒØ§Ù† 'Wednesday' (Ø¨Ø¯Ú¾) Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u6-l2-4",
            type: "fill_blank",
            skillTag: "prepositions",
            prompt: "Complete the preposition: 'We play cricket _____ Saturday afternoon.'",
            correctAnswer: "on",
            explanation: "Days of the week take 'on': 'on Saturday'.",
            urduExplanation: "Ø¯Ù† Ú©Û’ Ù†Ø§Ù… Ú©Û’ Ø³Ø§ØªÚ¾ 'on' Ù„Ú¯ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u6-l2-5",
            type: "order_sentence",
            skillTag: "days-months",
            prompt: "Rearrange the words to form a correct statement:",
            sentenceTokens: ["Independence", "Day", "is", "celebrated", "in", "August", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Subject (Independence Day) + verb (is celebrated) + prepositional phrase (in August).",
            urduExplanation: "Independence Day is celebrated in August."
          },
          {
            id: "ex-a1-u6-l2-6",
            type: "order_sentence",
            skillTag: "days-months",
            prompt: "Rearrange the words to form a correct sentence:",
            sentenceTokens: ["The", "library", "is", "closed", "on", "Sunday", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Subject (The library) + verb (is closed) + time phrase (on Sunday).",
            urduExplanation: "The library is closed on Sunday."
          },
          {
            id: "ex-a1-u6-l2-7",
            type: "match_pairs",
            skillTag: "days-months",
            prompt: "Match the day/month with its correct preposition:",
            pairs: [
              { left: "Monday", right: "on" },
              { left: "July", right: "in" },
              { left: "Friday morning", right: "on" },
              { left: "December", right: "in" }
            ],
            explanation: "'On' for days; 'in' for months.",
            urduExplanation: "Ø¯Ù† (on) Ø§ÙˆØ± Ù…Û ÛŒÙ†Û’ (in) Ú©Û’ prepositions Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u6-l2-8",
            type: "error_correction",
            skillTag: "capitalization",
            prompt: "Find and correct the mistake: 'I will visit my uncle in rawalpindi next tuesday.'",
            correctAnswer: "I will visit my uncle in Rawalpindi next Tuesday.",
            explanation: "Proper nouns and days must be capitalized: 'Rawalpindi' and 'Tuesday'.",
            urduExplanation: "'Tuesday' Ú©Ø§ T Ø§ÙˆØ± 'Rawalpindi' Ú©Ø§ R capital Û ÙˆÚ¯Ø§Û”"
          },
          {
            id: "ex-a1-u6-l2-9",
            type: "error_correction",
            skillTag: "prepositions",
            prompt: "Find and correct the mistake: 'We travel to Murree at July.'",
            correctAnswer: "We travel to Murree in July.",
            explanation: "Months take 'in', not 'at': 'in July'.",
            urduExplanation: "Ù…Û ÛŒÙ†Û’ Ú©Û’ Ù„ÛŒÛ’ 'in July' Ù„Ú©Ú¾Ø§ Ø¬Ø§ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u6-l2-10",
            type: "true_false",
            skillTag: "capitalization",
            prompt: "In English, the months of the year can be written with lowercase initial letters if they appear in the middle of a sentence. (True or False)",
            correctAnswer: "False",
            explanation: "False. Months and days of the week MUST ALWAYS be capitalized in English.",
            urduExplanation: "ØºÙ„Ø·Û” Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ù…Û ÛŒÙ†ÙˆÚº Ø§ÙˆØ± Ø¯Ù†ÙˆÚº Ú©Û’ Ù†Ø§Ù… Û Ù…ÛŒØ´Û  Capital letter Ø³Û’ Û ÛŒ Ø´Ø±ÙˆØ¹ Û ÙˆØªÛ’ Û ÛŒÚºÛ”"
          }
        ]
      },
      {
        id: "sec-a1-u6-l2-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u6-l2-1",
            type: "mcq",
            skillTag: "capitalization",
            prompt: "Why must 'March' and 'Friday' be capitalized?",
            options: [
              { id: "opt-1", text: "Because they are proper nouns in English" },
              { id: "opt-2", text: "Because they are long words" },
              { id: "opt-3", text: "Only when they start a sentence" },
              { id: "opt-4", text: "Because they represent religious occasions" }
            ],
            correctOptionId: "opt-1",
            explanation: "Days and months are proper nouns in English and must always be capitalized.",
            urduExplanation: "Ú†ÙˆÙ†Ú©Û  ÛŒÛ  Proper Nouns Û ÛŒÚºØŒ Ø§Ø³ Ù„ÛŒÛ’ Û Ù…ÛŒØ´Û  Capital letter Ø³Û’ Ù„Ú©Ú¾Û’ Ø¬Ø§ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "qz-a1-u6-l2-2",
            type: "mcq",
            skillTag: "pronunciation",
            prompt: "Which letter is silent in the word 'Wednesday'?",
            options: [
              { id: "opt-1", text: "The letter n" },
              { id: "opt-2", text: "The first letter d" },
              { id: "opt-3", text: "The letter s" },
              { id: "opt-4", text: "The letter y" }
            ],
            correctOptionId: "opt-2",
            explanation: "The first 'd' in Wednesday is silent; it is pronounced /ËˆwenzdeÉª/.",
            urduExplanation: "'Wednesday' Ù…ÛŒÚº Ù¾Û Ù„Ø§ 'd' Ø®Ø§Ù…ÙˆØ´ (silent) Û ÙˆØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u6-l2-3",
            type: "mcq",
            skillTag: "days-months",
            prompt: "Which month comes immediately before October?",
            options: [
              { id: "opt-1", text: "November" },
              { id: "opt-2", text: "August" },
              { id: "opt-3", text: "September" },
              { id: "opt-4", text: "July" }
            ],
            correctOptionId: "opt-3",
            explanation: "September is the ninth month, preceding October (the tenth).",
            urduExplanation: "Ø§Ú©ØªÙˆØ¨Ø± Ø³Û’ Ù ÙˆØ±Ø§Ù‹ Ù¾Û Ù„Û’ 'September' (Ø³ØªÙ…Ø¨Ø±) Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u6-l2-4",
            type: "mcq",
            skillTag: "prepositions",
            prompt: "Complete the sentence: 'We have a family dinner _____ Saturday.'",
            options: [
              { id: "opt-1", text: "in" },
              { id: "opt-2", text: "at" },
              { id: "opt-3", text: "to" },
              { id: "opt-4", text: "on" }
            ],
            correctOptionId: "opt-4",
            explanation: "Specific days of the week require 'on'.",
            urduExplanation: "Ø¯Ù† Ú©Û’ Ù†Ø§Ù… Ú©Û’ Ø³Ø§ØªÚ¾ 'on' Ù„Ú¯ØªØ§ Û Û’: 'on Saturday'Û”"
          },
          {
            id: "qz-a1-u6-l2-5",
            type: "mcq",
            skillTag: "days-months",
            prompt: "How many months in the calendar year have exactly 30 days?",
            options: [
              { id: "opt-1", text: "Four months (April, June, Sept, Nov)" },
              { id: "opt-2", text: "Seven months (Jan, Mar, May, Jul...)" },
              { id: "opt-3", text: "Six months (Feb, Apr, Jun, Aug...)" },
              { id: "opt-4", text: "Five months (Feb, May, Aug, Oct...)" }
            ],
            correctOptionId: "opt-1",
            explanation: "Thirty days have September, April, June, and November (4 months).",
            urduExplanation: "چار مہینے (اپریل، جون، ستمبر، نومبر) 30 دنوں کے ہوتے ہیں۔"
          }
        ]
      },
      {
        id: "sec-a1-u6-l2-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Days and months summary:",
        summaryPoints: [
          "Seven days: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.",
          "Twelve months: January through December.",
          "CAPITALIZE all days and months always (Monday, August).",
          "Use 'on' with days (on Friday) and 'in' with months (in March).",
          "Pronounce Wednesday as 'WENZ-day' (silent 'd')."
        ]
      },
      {
        id: "sec-a1-u6-l2-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Capital ÛŒØ§ Small letters Ú©Ø§ Ú©ÙˆØ¦ÛŒ ØªØµÙˆØ± Ù†Û ÛŒÚº Û ÙˆØªØ§Û” Ø§Ø³ Ù„ÛŒÛ’ Ø§Ø±Ø¯Ùˆ Ø¨ÙˆÙ„Ù†Û’ ÙˆØ§Ù„Û’ Ø·Ù„Ø¨Ø§ Ø§Ú©Ø«Ø± Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù„Ú©Ú¾ØªÛ’ ÙˆÙ‚Øª Ø¯Ù†ÙˆÚº Ø§ÙˆØ± Ù…Û ÛŒÙ†ÙˆÚº Ú©Ùˆ small letter Ø³Û’ Ù„Ú©Ú¾ Ø¯ÛŒØªÛ’ Û ÛŒÚº (Ø¬ÛŒØ³Û’: 'monday' ÛŒØ§ 'august')Û”\n\n**ÛŒÛ  Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ú¯Ø±Ø§Ù…Ø± Ú©ÛŒ Ø§ÛŒÚ© Ø¨Û Øª Ø¨Ú‘ÛŒ ØºÙ„Ø·ÛŒ Û Û’!**\n- Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ø¯Ù† Ø§ÙˆØ± Ù…Û ÛŒÙ†Û’ **Proper Nouns** Û ÛŒÚºØŒ Ø§Ø³ Ù„ÛŒÛ’ Ø¬Ù…Ù„Û’ Ú©Û’ Ø¯Ø±Ù…ÛŒØ§Ù† Ù…ÛŒÚº Ø¨Ú¾ÛŒ Û Ù…ÛŒØ´Û  **Capital** Û ÙˆÙ†Ú¯Û’: **Monday**, **Friday**, **January**, **August**Û”\n\nØ§Ø³ Ú©Û’ Ø¹Ù„Ø§ÙˆÛ  Prepositions ÛŒØ§Ø¯ Ø±Ú©Ú¾ÛŒÚº:\n- Ø¯Ù† Ú©Û’ Ø³Ø§ØªÚ¾: **on** (on Monday)\n- Ù…Û ÛŒÙ†Û’ Ú©Û’ Ø³Ø§ØªÚ¾: **in** (in July)",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 3: Ordinal Numbers (1st, 2nd, 3rd) & Birthdays
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u6-l3",
    level: "A1",
    unit: "unit-6",
    order: 3,
    title: "Ordinal Numbers (1st, 2nd, 3rd) & Birthdays",
    description: "Form and use ordinal numbers for sequence, dates, and answering 'When is your birthday?'.",
    objectives: [
      "Distinguish between cardinal numbers (one, two, three) and ordinal numbers (first, second, third)",
      "Form ordinal numbers up to 31st using suffixes (-st, -nd, -rd, -th)",
      "State dates and birthdays accurately in spoken and written English"
    ],
    estimatedMinutes: 10,
    prerequisites: ["eng-a1-u6-l2"],
    skillTags: ["ordinals", "dates", "birthdays", "calendar"],
    vocabularyList: [
      { word: "first", partOfSpeech: "numeral", phonetic: "/fÉœË st/", definition: "Coming before all others in time or order; 1st.", urduMeaning: "Ù¾Û Ù„Ø§ / Ù¾Û Ù„ÛŒ", exampleSentence: "He won first prize in the speech contest." },
      { word: "second", partOfSpeech: "numeral", phonetic: "/ËˆsekÉ™nd/", definition: "Coming immediately after the first in order or time; 2nd.", urduMeaning: "Ø¯ÙˆØ³Ø±Ø§ / Ø¯ÙˆØ³Ø±ÛŒ", exampleSentence: "Our flat is on the second floor." },
      { word: "third", partOfSpeech: "numeral", phonetic: "/Î¸ÉœË d/", definition: "Constituting number three in a sequence; 3rd.", urduMeaning: "ØªÛŒØ³Ø±Ø§ / ØªÛŒØ³Ø±ÛŒ", exampleSentence: "The office is on the third floor." },
      { word: "fourth", partOfSpeech: "numeral", phonetic: "/fÉ”Ë Î¸/", definition: "Constituting number four in a sequence; 4th.", urduMeaning: "Ú†ÙˆØªÚ¾Ø§ / Ú†ÙˆØªÚ¾ÛŒ", exampleSentence: "Today is the fourth day of our training." },
      { word: "fifth", partOfSpeech: "numeral", phonetic: "/fÉªfÎ¸/", definition: "Constituting number five in a sequence; 5th (note spelling change from five).", urduMeaning: "Ù¾Ø§Ù†Ú†ÙˆØ§Úº", exampleSentence: "She finished in fifth position." },
      { word: "twentieth", partOfSpeech: "numeral", phonetic: "/ËˆtwentiÉ™Î¸/", definition: "Constituting number twenty in a sequence; 20th.", urduMeaning: "Ø¨ÛŒØ³ÙˆØ§Úº", exampleSentence: "They celebrated their twentieth anniversary." },
      { word: "birthday", partOfSpeech: "noun", phonetic: "/ËˆbÉœË Î¸deÉª/", definition: "The anniversary of the day on which a person was born.", urduMeaning: "Ø³Ø§Ù„Ú¯Ø±Û ", exampleSentence: "When is your birthday? It is on the fifth of May." },
      { word: "date", partOfSpeech: "noun", phonetic: "/deÉªt/", definition: "The day of the month or year as specified by a number.", urduMeaning: "ØªØ§Ø±ÛŒØ®", exampleSentence: "What is today's date? Today is the 12th of October." },
      { word: "year", partOfSpeech: "noun", phonetic: "/jÉªÉ™r/", definition: "The time taken by the earth to make one revolution around the sun (365 or 366 days).", urduMeaning: "Ø³Ø§Ù„", exampleSentence: "He was born in the year 2002." },
      { word: "celebration", partOfSpeech: "noun", phonetic: "/ËŒselÉªËˆbreÉªÊƒn/", definition: "The action of marking one's pleasure at an important event or occasion by engaging in enjoyable activity.", urduMeaning: "Ø¬Ø´Ù† / ØªÙ‚Ø±ÛŒØ¨", exampleSentence: "The Independence Day celebration was grand." }
    ],
    sections: [
      {
        id: "sec-a1-u6-l3-1",
        type: "explain",
        title: "Ordinal Numbers & Saying Dates",
        content: "While **cardinal numbers** tell *how many* (one, two, three), **ordinal numbers** tell *position or order* in a sequence (first, second, third).\n\n### Suffix Rules for Ordinals\n- Ends in 1 -> **-st** (1st = first, 21st = twenty-first, 31st = thirty-first)\n- Ends in 2 -> **-nd** (2nd = second, 22nd = twenty-second)\n- Ends in 3 -> **-rd** (3rd = third, 23rd = twenty-third)\n- All other numbers (4-20, 24-30) -> **-th** (4th = fourth, 10th = tenth, 11th = eleventh, 12th = twelfth)\n\n### Important Spelling Shifts\n- 5: five -> **fifth** (not fiveth!)\n- 8: eight -> **eighth** (only one 't')\n- 9: nine -> **ninth** (drops the 'e'!)\n- 12: twelve -> **twelfth** ('ve' becomes 'f')\n- 20: twenty -> **twentieth** ('y' becomes 'ie')",
        tables: [
          {
            title: "Calendar Dates (1st to 31st)",
            headers: ["Day Number", "Written Number", "Full Word Form", "Spoken As"],
            rows: [
              ["1", "1st", "first", "the first of..."],
              ["2", "2nd", "second", "the second of..."],
              ["3", "3rd", "third", "the third of..."],
              ["5", "5th", "fifth (spelling shift)", "the fifth of..."],
              ["9", "9th", "ninth (drops 'e')", "the ninth of..."],
              ["12", "12th", "twelfth ('f' sound)", "the twelfth of..."],
              ["21", "21st", "twenty-first", "the twenty-first of..."],
              ["31", "31st", "thirty-first", "the thirty-first of..."]
            ]
          },
          {
            title: "How to Say and Write Dates",
            headers: ["Format", "How It Is Written", "How It Is Spoken", "Preposition"],
            rows: [
              ["British Way (Day/Month)", "14 August / 14th August", "'the fourteenth of August'", "ON the 14th of August"],
              ["American Way (Month/Day)", "August 14 / August 14th", "'August fourteenth'", "ON August 14th"]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Saying 'The' and 'Of' in Spoken Dates",
            text: "Even if written simply as *14 August*, native British English speakers say aloud: **'the fourteenth of August'**."
          },
          {
            type: "warning",
            title: "Preposition for Dates",
            text: "A specific date ALWAYS takes **ON**: *He was born **on** the 5th of May* (never 'in the 5th of May')."
          }
        ]
      },
      {
        id: "sec-a1-u6-l3-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "When is your birthday? My birthday is on the fifth of May.", phonetic: "/wen Éªz jÉ”Ë r ËˆbÉœË Î¸deÉª maÉª ËˆbÉœË Î¸deÉª Éªz É’n Ã°É™ fÉªfÎ¸ É™v meÉª/", urdu: "Ø¢Ù¾ Ú©ÛŒ Ø³Ø§Ù„Ú¯Ø±Û  Ú©Ø¨ Û Û’ØŸ Ù…ÛŒØ±ÛŒ Ø³Ø§Ù„Ú¯Ø±Û  Ù¾Ø§Ù†Ú† Ù…Ø¦ÛŒ Ú©Ùˆ Û Û’Û”", audioText: "When is your birthday? My birthday is on the fifth of May." },
          { english: "Pakistan gained independence on the fourteenth of August, 1947.", phonetic: "/ËŒpÉ‘Ë kÉªËˆstÉ‘Ë n É¡eÉªnd ËŒÉªndÉªËˆpendÉ™ns É’n Ã°É™ ËŒfÉ”Ë ËˆtiË nÎ¸ É™v ËˆÉ”Ë É¡É™st ËˆnaÉªnËˆtiË n ËˆfÉ”Ë ti Ëˆsevn/", urdu: "Ù¾Ø§Ú©Ø³ØªØ§Ù† Ù†Û’ 14 Ø§Ú¯Ø³Øª 1947 Ú©Ùˆ Ø¢Ø²Ø§Ø¯ÛŒ Ø­Ø§ØµÙ„ Ú©ÛŒÛ”", audioText: "Pakistan gained independence on the fourteenth of August, 1947." },
          { english: "Our new apartment is on the third floor of the building.", phonetic: "/ËˆaÊŠÉ™r njuË  É™ËˆpÉ‘Ë tmÉ™nt Éªz É’n Ã°É™ Î¸ÉœË d flÉ”Ë r É™v Ã°É™ ËˆbÉªldÉªÅ‹/", urdu: "Û Ù…Ø§Ø±Ø§ Ù†ÛŒØ§ Ù Ù„ÛŒÙ¹ Ø¹Ù…Ø§Ø±Øª Ú©ÛŒ ØªÛŒØ³Ø±ÛŒ Ù…Ù†Ø²Ù„ Ù¾Ø± Û Û’Û”", audioText: "Our new apartment is on the third floor of the building." },
          { english: "She achieved first place in the nationwide mathematics competition.", phonetic: "/ÊƒiË  É™ËˆtÊƒiË vd fÉœË st pleÉªs Éªn Ã°É™ ËŒneÉªÊƒnËˆwaÉªd ËŒmÃ¦Î¸É™ËˆmÃ¦tÉªks ËŒkÉ’mpÉ™ËˆtÉªÊƒn/", urdu: "Ø§Ø³ Ù†Û’ Ù…Ù„Ú©ÛŒ Ø³Ø·Ø­ Ú©Û’ Ø±ÛŒØ§Ø¶ÛŒ Ú©Û’ Ù…Ù‚Ø§Ø¨Ù„Û’ Ù…ÛŒÚº Ù¾Û Ù„ÛŒ Ù¾ÙˆØ²ÛŒØ´Ù† Ø­Ø§ØµÙ„ Ú©ÛŒÛ”", audioText: "She achieved first place in the nationwide mathematics competition." },
          { english: "The meeting is scheduled for the twenty-first of September.", phonetic: "/Ã°É™ ËˆmiË tÉªÅ‹ Éªz ËˆÊƒedjuË ld fÉ”Ë r Ã°É™ Ëˆtwenti fÉœË st É™v sepËˆtembÉ™r/", urdu: "Ù…ÛŒÙ¹Ù†Ú¯ 21 Ø³ØªÙ…Ø¨Ø± Ú©Û’ Ù„ÛŒÛ’ Ø·Û’ Û Û’Û”", audioText: "The meeting is scheduled for the twenty-first of September." },
          { english: "Today is the ninth of October, two thousand and twenty-six.", phonetic: "/tÉ™ËˆdeÉª Éªz Ã°É™ naÉªnÎ¸ É™v É’kËˆtÉ™ÊŠbÉ™r tuË  ËˆÎ¸aÊŠznd Ã¦nd Ëˆtwenti sÉªks/", urdu: "Ø¢Ø¬ 9 Ø§Ú©ØªÙˆØ¨Ø± 2026 Û Û’Û”", audioText: "Today is the ninth of October, two thousand and twenty-six." },
          { english: "December thirty-first is New Year's Eve across the globe.", phonetic: "/dÉªËˆsembÉ™r ËˆÎ¸ÉœË ti fÉœË st Éªz njuË  jÉªÉ™z iË v É™ËˆkrÉ’s Ã°É™ É¡lÉ™ÊŠb/", urdu: "31 Ø¯Ø³Ù…Ø¨Ø± Ø¯Ù†ÛŒØ§ Ø¨ÚÚ¾Ø± Ù…ÛŒÚº Ù†Ø¦Û’ Ø³Ø§Ù„ Ú©ÛŒ Ø´Ø§Ù… Û ÙˆØªÛŒ Û Û’Û”", audioText: "December thirty-first is New Year's Eve across the globe." },
          { english: "They celebrated their twelfth wedding anniversary in Murree.", phonetic: "/Ã°eÉª ËˆselÉªbreÉªtÉªd Ã°eÉ™r twelfÎ¸ ËˆwedÉªÅ‹ ËŒÃ¦nÉªËˆvÉœË sÉ™ri Éªn ËˆmÊŒri/", urdu: "Ø§Ù†Û ÙˆÚº Ù†Û’ Ù…Ø±ÛŒ Ù…ÛŒÚº Ø§Ù¾Ù†ÛŒ Ø¨Ø§Ø±Û ÙˆÛŒÚº Ø´Ø§Ø¯ÛŒ Ú©ÛŒ Ø³Ø§Ù„Ú¯Ø±Û  Ù…Ù†Ø§Ø¦ÛŒÛ”", audioText: "They celebrated their twelfth wedding anniversary in Murree." }
        ]
      },
      {
        id: "sec-a1-u6-l3-3",
        type: "dialogue",
        title: "Filling Out a Registration Form",
        dialogue: [
          { speaker: "Registrar", avatar: "R", english: "Could you state your date of birth, please?", urdu: "Ú©ÛŒØ§ Ø¢Ù¾ Ø¨Ø±Ø§Û  Ú©Ø±Ù… Ø§Ù¾Ù†ÛŒ ØªØ§Ø±ÛŒØ®Ù  Ù¾ÛŒØ¯Ø§Ø¦Ø´ Ø¨ØªØ§ Ø³Ú©ØªÛ’ Û ÛŒÚºØŸ", audioText: "Could you state your date of birth, please?" },
          { speaker: "Applicant", avatar: "A", english: "I was born on the twenty-second of July, two thousand and three.", urdu: "Ù…ÛŒÚº 22 Ø¬ÙˆÙ„Ø§Ø¦ÛŒ 2003 Ú©Ùˆ Ù¾ÛŒØ¯Ø§ Û ÙˆØ§Û”", audioText: "I was born on the twenty-second of July, two thousand and three." },
          { speaker: "Registrar", avatar: "R", english: "And what is today's registration date?", urdu: "Ø§ÙˆØ± Ø¢Ø¬ Ø±Ø¬Ø³Ù¹Ø±ÛŒØ´Ù† Ú©ÛŒ Ú©ÛŒØ§ ØªØ§Ø±ÛŒØ® Û Û’ØŸ", audioText: "And what is today's registration date?" },
          { speaker: "Applicant", avatar: "A", english: "Today is the third of November.", urdu: "Ø¢Ø¬ 3 Ù†ÙˆÙ…Ø¨Ø± Û Û’Û”", audioText: "Today is the third of November." }
        ]
      },
      {
        id: "sec-a1-u6-l3-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u6-l3-1",
            type: "mcq",
            skillTag: "ordinals",
            prompt: "What is the ordinal number for 1?",
            options: [
              { id: "opt-1", text: "first (1st)" },
              { id: "opt-2", text: "one (1)" },
              { id: "opt-3", text: "once" },
              { id: "opt-4", text: "primary" }
            ],
            correctOptionId: "opt-1",
            explanation: "The ordinal number for 1 is 'first' (1st).",
            urduExplanation: "1 Ú©Ø§ ordinal number 'first' (1st) Û Û’Û”"
          },
          {
            id: "ex-a1-u6-l3-2",
            type: "mcq",
            skillTag: "spelling",
            prompt: "Which spelling of the 9th ordinal is correct?",
            options: [
              { id: "opt-1", text: "nineth" },
              { id: "opt-2", text: "ninth" },
              { id: "opt-3", text: "ninethe" },
              { id: "opt-4", text: "ninthe" }
            ],
            correctOptionId: "opt-2",
            explanation: "'Ninth' drops the 'e' from nine: N-I-N-T-H.",
            urduExplanation: "'ninth' Ù…ÛŒÚº nine Ú©Ø§ 'e' Ú¯Ø± Ø¬Ø§ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u6-l3-3",
            type: "fill_blank",
            skillTag: "ordinals",
            prompt: "Complete the date suffix: 'Today is the 22_____ of March.'",
            correctAnswer: "nd",
            explanation: "Numbers ending in 2 take 'nd' (twenty-second).",
            urduExplanation: "22 Ú©Û’ Ø³Ø§ØªÚ¾ 'nd' (22nd) Ù„Ú¯ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u6-l3-4",
            type: "fill_blank",
            skillTag: "prepositions",
            prompt: "Complete the preposition: 'My sister was born _____ the 10th of May.'",
            correctAnswer: "on",
            explanation: "Specific calendar dates take 'on': 'on the 10th of May'.",
            urduExplanation: "Ù…Ø®ØµÙˆØµ ØªØ§Ø±ÛŒØ® Ú©Û’ Ù„ÛŒÛ’ 'on' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u6-l3-5",
            type: "order_sentence",
            skillTag: "dates",
            prompt: "Rearrange the words to form a correct sentence:",
            sentenceTokens: ["My", "birthday", "is", "on", "the", "fifth", "of", "May", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            explanation: "My birthday + is + on the fifth of May.",
            urduExplanation: "My birthday is on the fifth of May."
          },
          {
            id: "ex-a1-u6-l3-6",
            type: "order_sentence",
            skillTag: "dates",
            prompt: "Rearrange the words to form a correct statement:",
            sentenceTokens: ["Pakistan", "Day", "is", "on", "the", "twenty-third", "of", "March", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            explanation: "Pakistan Day + is + on the twenty-third of March.",
            urduExplanation: "Pakistan Day is on the twenty-third of March."
          },
          {
            id: "ex-a1-u6-l3-7",
            type: "match_pairs",
            skillTag: "ordinals",
            prompt: "Match the numeral with its correct ordinal word:",
            pairs: [
              { left: "1st", right: "first" },
              { left: "2nd", right: "second" },
              { left: "3rd", right: "third" },
              { left: "5th", right: "fifth" }
            ],
            explanation: "Ordinals paired accurately.",
            urduExplanation: "Ordinal numbers Ú©Û’ ØµØ­ÛŒØ­ Ø¬ÙˆÚ‘Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u6-l3-8",
            type: "error_correction",
            skillTag: "spelling",
            prompt: "Find and correct the mistake: 'Today is the nineth of June.'",
            correctAnswer: "Today is the ninth of June.",
            explanation: "Spell 'ninth' without 'e': n-i-n-t-h.",
            urduExplanation: "'nineth' ØºÙ„Ø· Û Û’ØŒ 'ninth' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u6-l3-9",
            type: "error_correction",
            skillTag: "prepositions",
            prompt: "Find and correct the mistake: 'I was born in the 14th of August.'",
            correctAnswer: "I was born on the 14th of August.",
            explanation: "Dates take 'on', not 'in'.",
            urduExplanation: "ØªØ§Ø±ÛŒØ® Ú©Û’ Ø³Ø§ØªÚ¾ 'on' Ù„Ú¯ØªØ§ Û Û’: 'on the 14th of August'Û”"
          },
          {
            id: "ex-a1-u6-l3-10",
            type: "true_false",
            skillTag: "ordinals",
            prompt: "The ordinal form for 12 is spelled 'twelveth'. (True or False)",
            correctAnswer: "False",
            explanation: "False. It is spelled 'twelfth' (the 've' changes to 'f').",
            urduExplanation: "ØºÙ„Ø·Û” 12th Ú©ÛŒ ØµØ­ÛŒØ­ Ø§Ù…Ù„Ø§ 'twelfth' Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u6-l3-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u6-l3-1",
            type: "mcq",
            skillTag: "ordinals",
            prompt: "Which suffix is attached to the number 23 for calendar dates?",
            options: [
              { id: "opt-1", text: "23th" },
              { id: "opt-2", text: "23rd" },
              { id: "opt-3", text: "23st" },
              { id: "opt-4", text: "23nd" }
            ],
            correctOptionId: "opt-2",
            explanation: "Numbers ending in 3 take -rd: 23rd (twenty-third).",
            urduExplanation: "23 Ú©Û’ Ø³Ø§ØªÚ¾ -rd (23rd) Ù„Ú¯ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u6-l3-2",
            type: "mcq",
            skillTag: "spelling",
            prompt: "What is the correct spelling for the 12th ordinal?",
            options: [
              { id: "opt-1", text: "twelveth" },
              { id: "opt-2", text: "twelfth" },
              { id: "opt-3", text: "twelth" },
              { id: "opt-4", text: "twelfeth" }
            ],
            correctOptionId: "opt-2",
            explanation: "'Twelfth' changes 've' to 'f': T-W-E-L-F-T-H.",
            urduExplanation: "12th Ú©ÛŒ ØµØ­ÛŒØ­ Ø§Ù…Ù„Ø§ 'twelfth' Û Û’Û”"
          },
          {
            id: "qz-a1-u6-l3-3",
            type: "mcq",
            skillTag: "dates",
            prompt: "How is '1st May' typically spoken in British English?",
            options: [
              { id: "opt-1", text: "First May" },
              { id: "opt-2", text: "The first of May" },
              { id: "opt-3", text: "May one" },
              { id: "opt-4", text: "One of May" }
            ],
            correctOptionId: "opt-2",
            explanation: "In British English, 'the first of May' is the standard spoken formulation.",
            urduExplanation: "Ø¨Ø±Ø·Ø§Ù†ÙˆÛŒ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº 'the first of May' Ø¨ÙˆÙ„Ø§ Ø¬Ø§ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u6-l3-4",
            type: "mcq",
            skillTag: "dates",
            prompt: "Which preposition correctly fills the blank: 'He was born _____ October 24th'?",
            options: [
              { id: "opt-1", text: "at" },
              { id: "opt-2", text: "in" },
              { id: "opt-3", text: "on" },
              { id: "opt-4", text: "for" }
            ],
            correctOptionId: "opt-3",
            explanation: "Specific calendar dates take 'on': 'on October 24th'.",
            urduExplanation: "ØªØ§Ø±ÛŒØ® Ú©Û’ Ø³Ø§ØªÚ¾ 'on' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u6-l3-5",
            type: "mcq",
            skillTag: "ordinals",
            prompt: "What is the ordinal number for 31?",
            options: [
              { id: "opt-1", text: "thirty-oneth" },
              { id: "opt-2", text: "thirty-first (31st)" },
              { id: "opt-3", text: "thirty-firth" },
              { id: "opt-4", text: "thirty-primary" }
            ],
            correctOptionId: "opt-2",
            explanation: "31 is ordinal 'thirty-first' (31st).",
            urduExplanation: "31 Ú©Ùˆ 'thirty-first' (31st) Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          }
        ]
      },
      {
        id: "sec-a1-u6-l3-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Ordinal numbers and dates summary:",
        summaryPoints: [
          "Cardinals tell how many (1, 2, 3); Ordinals tell order (1st, 2nd, 3rd).",
          "Suffix rules: 1st, 2nd, 3rd; all others up to 20th take -th.",
          "Spelling shifts to memorize: fifth (5th), eighth (8th), ninth (9th), twelfth (12th), twentieth (20th).",
          "Speak dates as 'the [ordinal] of [month]' (the fourteenth of August).",
          "Calendar dates take preposition ON (on the 5th of May)."
        ]
      },
      {
        id: "sec-a1-u6-l3-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Û Ù… ØªØ±ØªÛŒØ¨ Ú©Û’ Ù„ÛŒÛ’ **'Ù¾Û Ù„Ø§ØŒ Ø¯ÙˆØ³Ø±Ø§ØŒ ØªÛŒØ³Ø±Ø§ØŒ Ú†ÙˆØªÚ¾Ø§ØŒ Ù¾Ø§Ù†Ú†ÙˆØ§Úº'** Ø¨ÙˆÙ„ØªÛ’ Û ÛŒÚºÛ”\n\n**Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ø¨Ú¾ÛŒ ÛŒÛ ÛŒ Ordinal Numbers Û ÙˆØªÛ’ Û ÛŒÚº:**\n- 1st = **first**\n- 2nd = **second**\n- 3rd = **third**\n- Ø¨Ø§Ù‚ÛŒ Ø³Ø¨ Ú©Û’ Ø¢Ø®Ø± Ù…ÛŒÚº Ø¹Ø§Ù… Ø·ÙˆØ± Ù¾Ø± **-th** Ø¢ØªØ§ Û Û’ (fourth, fifth, sixth...)\n\n**ØªØ§Ø±ÛŒØ® Ø¨ÙˆÙ„Ù†Û’ Ú©Ø§ Ø·Ø±ÛŒÙ‚Û :**\nØ§Ø±Ø¯Ùˆ Ù…ÛŒÚº Û Ù… Ú©Û ØªÛ’ Û ÛŒÚº: '14 Ø§Ú¯Ø³Øª'Û” Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ø§Ú¯Ø±Ú†Û  Ù„Ú©Ú¾Ø§ '14 August' Û ÙˆØªØ§ Û Û’ØŒ Ù„ÛŒÚ©Ù† Ø¨ÙˆÙ„ØªÛ’ ÙˆÙ‚Øª Ø¨Ø±Ø·Ø§Ù†ÙˆÛŒ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº **'the fourteenth of August'** Ø¨ÙˆÙ„Ø§ Ø¬Ø§ØªØ§ Û Û’ØŒ Ø§ÙˆØ± Ø§Ø³ Ú©Û’ Ø³Ø§ØªÚ¾ **ON** Ù„Ú¯ØªØ§ Û Û’ (on the 14th of August)Û”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 4: Prepositions of Time: In, On, At
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u6-l4",
    level: "A1",
    unit: "unit-6",
    order: 4,
    title: "Prepositions of Time: In, On, At",
    description: "Master the pyramid of time prepositions: AT (specific), ON (days/dates), and IN (long periods).",
    objectives: [
      "Apply 'AT' for precise clock times, night, and specific points in time",
      "Apply 'ON' for days of the week, dates, and specific day parts (on Friday night)",
      "Apply 'IN' for months, years, seasons, centuries, and parts of the day (in the morning)"
    ],
    estimatedMinutes: 12,
    prerequisites: ["eng-a1-u6-l3"],
    skillTags: ["prepositions-time", "grammar", "time-expressions", "rules"],
    vocabularyList: [
      { word: "weekend", partOfSpeech: "noun", phonetic: "/ËŒwiË kËˆend/", definition: "Saturday and Sunday, or the period from Friday evening to Sunday night.", urduMeaning: "Û Ù ØªÛ’ Ú©Ø§ Ø¢Ø®Ø± (Û Ù ØªÛ  Ùˆ Ø§ØªÙˆØ§Ø±)", exampleSentence: "We relax with friends at the weekend." },
      { word: "holiday", partOfSpeech: "noun", phonetic: "/ËˆhÉ’lÉ™deÉª/", definition: "An extended period of leisure and recreation, especially away from home.", urduMeaning: "Ú†ÚÚ¾Ù¹ÛŒ / ØªØ¹Ø·ÛŒÙ„", exampleSentence: "We are going to Swat for our summer holiday." },
      { word: "schedule", partOfSpeech: "noun", phonetic: "/ËˆÊƒedjuË l/", definition: "A plan for carrying out a process or procedure, giving lists of intended events and times.", urduMeaning: "Ø§ÙˆÙ‚Ø§Øª Ú©Ø§ Ù¹Ø§Ø¦Ù… Ù¹ÛŒØ¨Ù„", exampleSentence: "Check the train schedule before leaving." },
      { word: "future", partOfSpeech: "noun", phonetic: "/ËˆfjuË tÊƒÉ™r/", definition: "A period of time following the moment of speaking or writing; time regarded as still to come.", urduMeaning: "Ù…Ø³ØªÙ‚Ø¨Ù„", exampleSentence: "She plans to study abroad in the future." },
      { word: "past", partOfSpeech: "noun", phonetic: "/pÉ‘Ë st/", definition: "The time or a period of time before the moment of speaking or writing.", urduMeaning: "Ù…Ø§Ø¶ÛŒ", exampleSentence: "Lahore has a rich historical past." },
      { word: "moment", partOfSpeech: "noun", phonetic: "/ËˆmÉ™ÊŠmÉ™nt/", definition: "A very brief period of time.", urduMeaning: "Ù„Ù…Ø­Û  / Ù¾Ù„", exampleSentence: "Please wait for me at this moment." },
      { word: "season", partOfSpeech: "noun", phonetic: "/ËˆsiË zn/", definition: "Each of the four divisions of the year (spring, summer, autumn, and winter).", urduMeaning: "Ù…ÙˆØ³Ù…", exampleSentence: "Mangoes are in season during summer." },
      { word: "calendar", partOfSpeech: "noun", phonetic: "/ËˆkÃ¦lÉªndÉ™r/", definition: "A chart or series of pages showing the days, weeks, and months of a particular year.", urduMeaning: "Ú©ÛŒÙ„Ù†ÚˆØ± / Ø¬Ù†ØªØ±ÛŒ", exampleSentence: "Mark your exam dates on the calendar." },
      { word: "arrive", partOfSpeech: "verb", phonetic: "/É™ËˆraÉªv/", definition: "To reach a destination at a given time.", urduMeaning: "Ù¾Û Ù†Ú†Ù†Ø§", exampleSentence: "The express train will arrive at 6:00." },
      { word: "begin", partOfSpeech: "verb", phonetic: "/bÉªËˆÉ¡Éªn/", definition: "To perform or undergo the first part of an action or activity.", urduMeaning: "Ø´Ø±ÙˆØ¹ Û ÙˆÙ†Ø§", exampleSentence: "Our lectures begin in September." }
    ],
    sections: [
      {
        id: "sec-a1-u6-l4-1",
        type: "explain",
        title: "The In / On / At Pyramid of Time",
        content: "Think of time prepositions as an **inverted pyramid** that moves from the broadest, longest time periods down to the most specific points in time:\n\n### 1. IN (Broad / Long Periods)\n- **Parts of the day**: *in the morning*, *in the afternoon*, *in the evening*.\n- **Months**: *in July*, *in December*.\n- **Seasons**: *in summer*, *in winter*.\n- **Years**: *in 2026*, *in 1947*.\n- **Centuries**: *in the 21st century*.\n\n### 2. ON (Days & Dates)\n- **Days of the week**: *on Monday*, *on Friday*.\n- **Specific dates**: *on the 14th of August*, *on May 5th*.\n- **Day + part of day**: *on Friday morning*, *on Sunday evening*.\n- **Holidays with 'Day'**: *on Independence Day*, *on Eid day*.\n\n### 3. AT (Specific Precise Points)\n- **Exact clock times**: *at 5:00 PM*, *at half past two*.\n- **Fixed points**: *at noon*, *at midnight*, *at sunset*.\n- **Special expressions**: *at night*, *at the weekend* (UK).",
        tables: [
          {
            title: "Pyramid of Time Comparison",
            headers: ["Preposition", "Scope", "Time Units", "Examples"],
            rows: [
              ["IN", "General & Long", "Months, Years, Seasons, Centuries, Parts of day", "in July, in 2026, in winter, in the morning"],
              ["ON", "Specific Days", "Days of week, Specific dates, Day+part", "on Monday, on 14th August, on Sunday night"],
              ["AT", "Precise Points", "Exact clock time, Noon, Midnight, Night", "at 7:30, at noon, at midnight, at night"]
            ]
          },
          {
            title: "Common Mistakes & Traps",
            headers: ["Incorrect Phrasing", "Why It Fails", "Correct English Phrasing"],
            rows: [
              ["in Monday", "Days take 'on'.", "on Monday"],
              ["on July", "Months take 'in'.", "in July"],
              ["in night", "'Night' is an idiomatic exception taking 'at'.", "at night"],
              ["at 2026", "Years take 'in'.", "in 2026"]
            ]
          }
        ],
        callouts: [
          {
            type: "warning",
            title: "The Day + Part of Day Exception",
            text: "Even though we say *in the morning*, if you add a specific day, **ON wins**: say **on Monday morning** (never *in Monday morning*)!"
          },
          {
            type: "tip",
            title: "Weekend: At vs. On",
            text: "In British English, say **at the weekend**. In American English, say **on the weekend**. Both are understood globally."
          }
        ]
      },
      {
        id: "sec-a1-u6-l4-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "Our morning class starts at nine o'clock sharp.", phonetic: "/ËˆaÊŠÉ™r ËˆmÉ”Ë rnÉªÅ‹ klÉ‘Ë s stÉ‘Ë ts Ã¦t naÉªn É™ËˆklÉ’k ÊƒÉ‘Ë p/", urdu: "Û Ù…Ø§Ø±ÛŒ ØµØ¨Ø­ Ú©ÛŒ Ú©Ù„Ø§Ø³ Ù¾ÙˆØ±Û’ Ù†Ùˆ Ø¨Ø¬Û’ Ø´Ø±ÙˆØ¹ Û ÙˆØªÛŒ Û Û’Û”", audioText: "Our morning class starts at nine o'clock sharp." },
          { english: "We have an important project presentation on Friday morning.", phonetic: "/wiË  hÃ¦v É™n ÉªmËˆpÉ”Ë tnt ËˆprÉ’dÊ’ekt ËŒpreznËˆteÉªÊƒn É’n ËˆfraÉªdeÉª ËˆmÉ”Ë rnÉªÅ‹/", urdu: "Ø¬Ù…Ø¹Û’ Ú©ÛŒ ØµØ¨Ø­ Û Ù…Ø§Ø±Ø§ Ø§ÛŒÚ© Ø§Û Ù… Ù¾Ø±ÙˆØ¬ÛŒÚ©Ù¹ Ù¾Ø±ÛŒØ²Ù†Ù¹ÛŒØ´Ù† Û Û’Û”", audioText: "We have an important project presentation on Friday morning." },
          { english: "Pakistan celebrates its Independence Day on the fourteenth of August.", phonetic: "/ËŒpÉ‘Ë kÉªËˆstÉ‘Ë n ËˆselÉªbreÉªts Éªts ËŒÉªndÉªËˆpendÉ™ns deÉª É’n Ã°É™ ËŒfÉ”Ë ËˆtiË nÎ¸ É™v ËˆÉ”Ë É¡É™st/", urdu: "Ù¾Ø§Ú©Ø³ØªØ§Ù† Ø§Ù¾Ù†Ø§ ÛŒÙˆÙ…Ù  Ø¢Ø²Ø§Ø¯ÛŒ 14 Ø§Ú¯Ø³Øª Ú©Ùˆ Ù…Ù†Ø§ØªØ§ Û Û’Û”", audioText: "Pakistan celebrates its Independence Day on the fourteenth of August." },
          { english: "It rains heavily in northern areas in July and August.", phonetic: "/Éªt reÉªnz ËˆhevÉªli Éªn ËˆnÉ”Ë Ã°É™n ËˆeÉ™riÉ™z Éªn dÊ’uË ËˆlaÉª Ã¦nd ËˆÉ”Ë É¡É™st/", urdu: "Ø¬ÙˆÙ„Ø§Ø¦ÛŒ Ø§ÙˆØ± Ø§Ú¯Ø³Øª Ù…ÛŒÚº Ø´Ù…Ø§Ù„ÛŒ Ø¹Ù„Ø§Ù‚ÙˆÚº Ù…ÛŒÚº Ø¨Ú¾Ø§Ø±ÛŒ Ø¨Ø§Ø±Ø´ Û ÙˆØªÛŒ Û Û’Û”", audioText: "It rains heavily in northern areas in July and August." },
          { english: "He was born in 2004 during the cold winter season.", phonetic: "/hiË  wÉ’z bÉ”Ë n Éªn tuË  ËˆÎ¸aÊŠznd Ã¦nd fÉ”Ë  ËˆdjÊŠÉ™rÉªÅ‹ Ã°É™ kÉ™ÊŠld ËˆwÉªntÉ™r ËˆsiË zn/", urdu: "ÙˆÛ  2004 Ù…ÛŒÚº Ø³Ø±Ø¯ÛŒ Ú©Û’ Ù…ÙˆØ³Ù… Ù…ÛŒÚº Ù¾ÛŒØ¯Ø§ Û ÙˆØ§Û”", audioText: "He was born in 2004 during the cold winter season." },
          { english: "The entire town is silent and peaceful at midnight.", phonetic: "/Ã°i ÉªnËˆtaÉªÉ™r taÊŠn Éªz ËˆsaÉªlÉ™nt Ã¦nd ËˆpiË sfl Ã¦t ËˆmÉªdnaÉªt/", urdu: "Ø¢Ø¯Ú¾ÛŒ Ø±Ø§Øª Ú©Ùˆ Ù¾ÙˆØ±Ø§ Ù‚ØµØ¨Û  Ø®Ø§Ù…ÙˆØ´ Ø§ÙˆØ± Ù¾Ø±Ø³Ú©ÙˆÙ† Û ÙˆØªØ§ Û Û’Û”", audioText: "The entire town is silent and peaceful at midnight." },
          { english: "She always drinks a cup of warm herbal tea at night.", phonetic: "/ÊƒiË  ËˆÉ”Ë lweÉªz drÉªÅ‹ks É™ kÊŒp É™v wÉ”Ë m ËˆhÉœË bl tiË  Ã¦t naÉªt/", urdu: "ÙˆÛ  Ø±Ø§Øª Ú©Ùˆ Û Ù…ÛŒØ´Û  Ú¯Ø±Ù… Û Ø±Ø¨Ù„ Ú†Ø§Ø¦Û’ Ú©Ø§ Ú©Ù¾ Ù¾ÛŒØªÛŒ Û Û’Û”", audioText: "She always drinks a cup of warm herbal tea at night." },
          { english: "What are your plans for studying at the weekend?", phonetic: "/wÉ’t É‘Ë r jÉ”Ë r plÃ¦nz fÉ”Ë r ËˆstÊŒdiÉªÅ‹ Ã¦t Ã°É™ ËŒwiË kËˆend/", urdu: "Û Ù ØªÛ’ Ú©Û’ Ø¢Ø®Ø± Ù…ÛŒÚº Ù¾Ú‘Ú¾Ø§Ø¦ÛŒ Ú©Û’ Ù„ÛŒÛ’ Ø¢Ù¾ Ú©Ø§ Ú©ÛŒØ§ Ù¾Ù„Ø§Ù† Û Û’ØŸ", audioText: "What are your plans for studying at the weekend?" }
        ]
      },
      {
        id: "sec-a1-u6-l4-3",
        type: "dialogue",
        title: "Scheduling an Important Interview",
        dialogue: [
          { speaker: "HR Officer", avatar: "H", english: "Can you attend the job interview on Tuesday morning, Tariq?", urdu: "Ø·Ø§Ø±Ù‚ØŒ Ú©ÛŒØ§ Ø¢Ù¾ Ù…Ù†Ú¯Ù„ Ú©ÛŒ ØµØ¨Ø­ Ù…Ù„Ø§Ø²Ù…Øª Ú©Û’ Ø§Ù†Ù¹Ø±ÙˆÛŒÙˆ Ú©Û’ Ù„ÛŒÛ’ Ø¢ Ø³Ú©ØªÛ’ Û ÛŒÚºØŸ", audioText: "Can you attend the job interview on Tuesday morning, Tariq?" },
          { speaker: "Tariq", avatar: "T", english: "Yes, certainly. What time should I arrive at the office?", urdu: "Ø¬ÛŒ Ø¨Ø§Ù„Ú©Ù„Û” Ù…Ø¬Ú¾Û’ Ø¯Ù ØªØ± Ú©Ø³ ÙˆÙ‚Øª Ù¾Û Ù†Ú†Ù†Ø§ Ú†Ø§Û ÛŒÛ’ØŸ", audioText: "Yes, certainly. What time should I arrive at the office?" },
          { speaker: "HR Officer", avatar: "H", english: "Please arrive at ten o'clock sharp. We begin promptly in the conference room.", urdu: "Ø¨Ø±Ø§Û  Ú©Ø±Ù… Ù¾ÙˆØ±Û’ Ø¯Ø³ Ø¨Ø¬Û’ Ù¾Û Ù†Ú†ÛŒÚºÛ” Û Ù… Ú©Ø§Ù†Ù Ø±Ù†Ø³ Ø±ÙˆÙ… Ù…ÛŒÚº Ù ÙˆØ±Ø§Ù‹ Ø´Ø±ÙˆØ¹ Ú©Ø±ÛŒÚº Ú¯Û’Û”", audioText: "Please arrive at ten o'clock sharp. We begin promptly in the conference room." },
          { speaker: "Tariq", avatar: "T", english: "Understood! I will see you on Tuesday at ten.", urdu: "Ø³Ù…Ø¬Ú¾ Ú¯ÛŒØ§! Ù…Ù†Ú¯Ù„ Ú©Ùˆ Ø¯Ø³ Ø¨Ø¬Û’ Ù…Ù„Ø§Ù‚Ø§Øª Û ÙˆÚ¯ÛŒÛ”", audioText: "Understood! I will see you on Tuesday at ten." }
        ]
      },
      {
        id: "sec-a1-u6-l4-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u6-l4-1",
            type: "mcq",
            skillTag: "prepositions-time",
            prompt: "Choose the correct preposition: 'The lecture starts _____ 10:15 AM.'",
            options: [
              { id: "opt-1", text: "in" },
              { id: "opt-2", text: "on" },
              { id: "opt-3", text: "at" },
              { id: "opt-4", text: "to" }
            ],
            correctOptionId: "opt-3",
            explanation: "Exact clock times always take 'at': 'at 10:15 AM'.",
            urduExplanation: "Ú¯Ú¾Ú‘ÛŒ Ú©Û’ Ù…Ø®ØµÙˆØµ ÙˆÙ‚Øª Ú©Û’ Ù„ÛŒÛ’ 'at' Ù„Ú¯ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u6-l4-2",
            type: "mcq",
            skillTag: "prepositions-time",
            prompt: "Choose the correct preposition: 'She plays badminton _____ Sunday morning.'",
            options: [
              { id: "opt-1", text: "in" },
              { id: "opt-2", text: "at" },
              { id: "opt-3", text: "for" },
              { id: "opt-4", text: "on" }
            ],
            correctOptionId: "opt-4",
            explanation: "Day + part of day takes 'on': 'on Sunday morning'.",
            urduExplanation: "Ø¯Ù† Ú©Û’ Ø³Ø§ØªÚ¾ ØµØ¨Ø­ ÛŒØ§ Ø´Ø§Ù… Û Ùˆ ØªÙˆ 'on' Ø¢ØªØ§ Û Û’: 'on Sunday morning'Û”"
          },
          {
            id: "ex-a1-u6-l4-3",
            type: "fill_blank",
            skillTag: "prepositions-time",
            prompt: "Fill in the preposition: 'Pakistan was founded _____ 1947.'",
            correctAnswer: "in",
            explanation: "Calendar years take 'in': 'in 1947'.",
            urduExplanation: "Ø³Ø§Ù„ (1947) Ú©Û’ Ø³Ø§ØªÚ¾ 'in' Ù„Ú¯ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u6-l4-4",
            type: "fill_blank",
            skillTag: "prepositions-time",
            prompt: "Fill in the preposition: 'It gets very cold here _____ night.'",
            correctAnswer: "at",
            explanation: "Night takes 'at': 'at night'.",
            urduExplanation: "Ø±Ø§Øª Ú©Û’ Ù„ÛŒÛ’ 'at night' Ù„Ú©Ú¾Ø§ Ø¬Ø§ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u6-l4-5",
            type: "order_sentence",
            skillTag: "prepositions-time",
            prompt: "Rearrange the words to form a correct statement:",
            sentenceTokens: ["The", "exam", "is", "on", "Monday", "morning", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            explanation: "Subject (The exam) + verb (is) + time phrase (on Monday morning).",
            urduExplanation: "The exam is on Monday morning."
          },
          {
            id: "ex-a1-u6-l4-6",
            type: "order_sentence",
            skillTag: "prepositions-time",
            prompt: "Rearrange the words to form a correct sentence:",
            sentenceTokens: ["We", "travel", "to", "the", "hills", "in", "summer", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
            explanation: "Subject (We) + verb (travel) + location (to the hills) + season (in summer).",
            urduExplanation: "We travel to the hills in summer."
          },
          {
            id: "ex-a1-u6-l4-7",
            type: "match_pairs",
            skillTag: "prepositions-time",
            prompt: "Match the time unit with its required preposition:",
            pairs: [
              { left: "6:30 PM", right: "at" },
              { left: "Friday", right: "on" },
              { left: "July", right: "in" },
              { left: "night", right: "at" }
            ],
            explanation: "Prepositions matched accurately according to the pyramid rule.",
            urduExplanation: "ÙˆÙ‚Øª Ú©Û’ ØµØ­ÛŒØ­ prepositions Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u6-l4-8",
            type: "error_correction",
            skillTag: "prepositions-time",
            prompt: "Find and correct the mistake: 'I will see you in Monday.'",
            correctAnswer: "I will see you on Monday.",
            explanation: "Days take 'on', not 'in'.",
            urduExplanation: "Ø¯Ù† Ú©Û’ Ù„ÛŒÛ’ 'on Monday' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u6-l4-9",
            type: "error_correction",
            skillTag: "prepositions-time",
            prompt: "Find and correct the mistake: 'The train arrives on 8:00.'",
            correctAnswer: "The train arrives at 8:00.",
            explanation: "Clock times take 'at', not 'on'.",
            urduExplanation: "Ú¯Ú¾Ú‘ÛŒ Ú©Û’ ÙˆÙ‚Øª Ú©Û’ Ù„ÛŒÛ’ 'at 8:00' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u6-l4-10",
            type: "true_false",
            skillTag: "prepositions-time",
            prompt: "'In Monday morning' is correct because we say 'in the morning'. (True or False)",
            correctAnswer: "False",
            explanation: "False. When a specific day of the week is added, 'on' takes precedence: 'on Monday morning'.",
            urduExplanation: "ØºÙ„Ø·Û” Ø¬Ø¨ Ø¯Ù† Ø¢ Ø¬Ø§Ø¦Û’ ØªÙˆ 'on Monday morning' Ø¨ÙˆÙ„Ø§ Ø¬Ø§ØªØ§ Û Û’Û”"
          }
        ]
      },
      {
        id: "sec-a1-u6-l4-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u6-l4-1",
            type: "mcq",
            skillTag: "prepositions-time",
            prompt: "Which phrase correctly uses 'at'?",
            options: [
              { id: "opt-1", text: "at Monday" },
              { id: "opt-2", text: "at August" },
              { id: "opt-3", text: "at midnight" },
              { id: "opt-4", text: "at the morning" }
            ],
            correctOptionId: "opt-3",
            explanation: "Midnight is a precise fixed point in time, taking 'at midnight'.",
            urduExplanation: "Midnight Ú©Û’ Ø³Ø§ØªÚ¾ 'at' Ø¢ØªØ§ Û Û’: 'at midnight'Û”"
          },
          {
            id: "qz-a1-u6-l4-2",
            type: "mcq",
            skillTag: "prepositions-time",
            prompt: "Complete the sentence: 'We have annual exams _____ March.'",
            options: [
              { id: "opt-1", text: "on" },
              { id: "opt-2", text: "at" },
              { id: "opt-3", text: "to" },
              { id: "opt-4", text: "in" }
            ],
            correctOptionId: "opt-4",
            explanation: "Months take 'in': 'in March'.",
            urduExplanation: "Ù…Û ÛŒÙ†Û’ Ú©Û’ Ù„ÛŒÛ’ 'in March' ØµØ­ÛŒØ­ Û Û’Û”"
          },
          {
            id: "qz-a1-u6-l4-3",
            type: "mcq",
            skillTag: "prepositions-time",
            prompt: "Complete: 'I met him _____ a rainy Friday afternoon.'",
            options: [
              { id: "opt-1", text: "at" },
              { id: "opt-2", text: "in" },
              { id: "opt-3", text: "on" },
              { id: "opt-4", text: "for" }
            ],
            correctOptionId: "opt-3",
            explanation: "Whenever a specific day is named, use 'on': 'on a rainy Friday afternoon'.",
            urduExplanation: "Ø¬Ø¨ Ù†Ø§Ù… Ø´Ø§Ù…Ù„ Û Ùˆ ØªÙˆ 'on Friday afternoon' Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "qz-a1-u6-l4-4",
            type: "mcq",
            skillTag: "prepositions-time",
            prompt: "Select the sentence with INCORRECT preposition usage:",
            options: [
              { id: "opt-1", text: "The match starts at 3:00 PM." },
              { id: "opt-2", text: "We go on vacation in summer." },
              { id: "opt-3", text: "She was born at 2005." },
              { id: "opt-4", text: "We rest on Sundays." }
            ],
            correctOptionId: "opt-3",
            explanation: "'at 2005' is wrong because years take 'in': 'in 2005'.",
            urduExplanation: "'at 2005' ØºÙ„Ø· Û Û’ØŒ Ø³Ø§Ù„ Ú©Û’ Ù„ÛŒÛ’ 'in 2005' Û ÙˆÙ†Ø§ Ú†Ø§Û ÛŒÛ’Û”"
          },
          {
            id: "qz-a1-u6-l4-5",
            type: "mcq",
            skillTag: "prepositions-time",
            prompt: "Which preposition is used for centuries (e.g. the 21st century)?",
            options: [
              { id: "opt-1", text: "at" },
              { id: "opt-2", text: "in" },
              { id: "opt-3", text: "on" },
              { id: "opt-4", text: "by" }
            ],
            correctOptionId: "opt-2",
            explanation: "Centuries represent long broad periods, requiring 'in': 'in the 21st century'.",
            urduExplanation: "ØµØ¯ÛŒÙˆÚº Ú©Û’ Ù„ÛŒÛ’ 'in' Ø¢ØªØ§ Û Û’: 'in the 21st century'Û”"
          }
        ]
      },
      {
        id: "sec-a1-u6-l4-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Time prepositions summary:",
        summaryPoints: [
          "AT = specific precise times (at 5:00, at noon, at midnight, at night).",
          "ON = days and dates (on Monday, on the 14th of August, on Friday night).",
          "IN = longer periods (in July, in 2026, in summer, in the morning).",
          "Day + part of day: 'ON' always wins (on Monday morning).",
          "Remember: in 1947 (years), in the 21st century (centuries)."
        ]
      },
      {
        id: "sec-a1-u6-l4-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Û Ù… ÙˆÙ‚Øª Ú©Û’ ØªÙ‚Ø±ÛŒØ¨Ø§Ù‹ Ø³Ø¨ Ø§Ù„Ù Ø§Ø¸ Ú©Û’ Ø³Ø§ØªÚ¾ **'Ù…ÛŒÚº'** ÛŒØ§ **'Ú©Ùˆ'** Ù„Ú¯Ø§ØªÛ’ Û ÛŒÚº:\n- 'Ø¬ÙˆÙ„Ø§Ø¦ÛŒ **Ù…ÛŒÚº**' / '2026 **Ù…ÛŒÚº**'\n- 'Ù¾ÛŒØ± **Ú©Ùˆ**' / 'Ø±Ø§Øª **Ú©Ùˆ**' / '5 Ø¨Ø¬Û’'\n\n**Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº ÛŒÛ  3 Ø§Ù„Ú¯ Ø§Ù„Ú¯ Prepositions Û ÛŒÚº:**\n1. **AT** (Ù…Ø®ØµÙˆØµ Ù„Ù…Ø­Û ): at 5:00, at night, at noon\n2. **ON** (Ø¯Ù† ÛŒØ§ ØªØ§Ø±ÛŒØ®): on Monday, on 14th August\n3. **IN** (Ù„Ù…Ø¨Ø§ Ø¹Ø±ØµÛ ): in July, in summer, in 2026, in the morning\n\n**Ø³Ø¨ Ø³Û’ Ø¹Ø§Ù… ØºÙ„Ø·ÛŒ:** 'in night' Ú©Û Ù†Ø§ ØºÙ„Ø· Û Û’ØŒ Û Ù…ÛŒØ´Û  **'at night'** Ú©Û ÛŒÚºÛ”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 5: Seasons & Weather Expressions
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u6-l5",
    level: "A1",
    unit: "unit-6",
    order: 5,
    title: "Seasons & Weather Expressions",
    description: "Describe the four seasons and current weather conditions using adjectives and 'It is...'.",
    objectives: [
      "Name the four seasons (spring, summer, autumn/fall, winter)",
      "Use dummy pronoun 'It' to describe weather (It is sunny, it is raining, it is windy)",
      "Differentiate between weather nouns (rain, sun, wind) and adjectives (rainy, sunny, windy)"
    ],
    estimatedMinutes: 10,
    prerequisites: ["eng-a1-u6-l4"],
    skillTags: ["weather", "seasons", "adjectives", "vocabulary"],
    vocabularyList: [
      { word: "spring", partOfSpeech: "noun", phonetic: "/sprÉªÅ‹/", definition: "The season after winter and before summer, in which vegetation begins to grow.", urduMeaning: "Ù…ÙˆØ³Ù…Ù  Ø¨Û Ø§Ø±", exampleSentence: "Islamabad looks stunning in spring with blooming flowers." },
      { word: "summer", partOfSpeech: "noun", phonetic: "/ËˆsÊŒmÉ™r/", definition: "The warmest season of the year, in the northern hemisphere from June to August.", urduMeaning: "Ù…ÙˆØ³Ù…Ù  Ú¯Ø±Ù…Ø§", exampleSentence: "We drink cool lemon water during the hot summer." },
      { word: "autumn", partOfSpeech: "noun", phonetic: "/ËˆÉ”Ë tÉ™m/", definition: "The season after summer and before winter to which leaves turn golden; also called fall.", urduMeaning: "Ù…ÙˆØ³Ù…Ù  Ø®Ø²Ø§Úº", exampleSentence: "Leaves turn golden and drop in autumn." },
      { word: "winter", partOfSpeech: "noun", phonetic: "/ËˆwÉªntÉ™r/", definition: "The coldest season of the year, in the northern hemisphere from December to February.", urduMeaning: "Ù…ÙˆØ³Ù…Ù  Ø³Ø±Ù…Ø§", exampleSentence: "Snow covers the mountains in winter." },
      { word: "sunny", partOfSpeech: "adjective", phonetic: "/ËˆsÊŒni/", definition: "Bright with sunlight.", urduMeaning: "Ø¯Ú¾ÙˆÙ¾ ÙˆØ§Ù„Ø§ / Ø±ÙˆØ´Ù†", exampleSentence: "It is a pleasant and sunny afternoon." },
      { word: "rainy", partOfSpeech: "adjective", phonetic: "/ËˆreÉªni/", definition: "Having a great deal of rainfall.", urduMeaning: "Ø¨Ø§Ø±Ø´ ÙˆØ§Ù„Ø§", exampleSentence: "Take an umbrella on rainy days." },
      { word: "cloudy", partOfSpeech: "adjective", phonetic: "/ËˆklaÊŠdi/", definition: "Covered with or characterized by clouds.", urduMeaning: "Ø¨Ø§Ø¯Ù„ÙˆÚº ÙˆØ§Ù„Ø§ / Ø§Ø¨Ø± Ø¢Ù„ÙˆØ¯", exampleSentence: "The sky is dark and cloudy today." },
      { word: "windy", partOfSpeech: "adjective", phonetic: "/ËˆwÉªndi/", definition: "Marked by or exposed to strong winds.", urduMeaning: "ØªÛŒØ² Û ÙˆØ§ ÙˆØ§Ù„Ø§", exampleSentence: "It is too windy to play badminton outside." },
      { word: "cold", partOfSpeech: "adjective", phonetic: "/kÉ™ÊŠld/", definition: "Of or at a low or relatively low temperature.", urduMeaning: "Ù¹Ú¾Ù†ÚˆØ§ / Ø³Ø±Ø¯", exampleSentence: "The winter night is freezing cold." },
      { word: "warm", partOfSpeech: "adjective", phonetic: "/wÉ”Ë m/", definition: "Of or at a fairly or comfortably high temperature.", urduMeaning: "Ú¯Ø±Ù… / Ù…Ø¹ØªØ¯Ù„", exampleSentence: "The spring sunshine feels comfortably warm." }
    ],
    sections: [
      {
        id: "sec-a1-u6-l5-1",
        type: "explain",
        title: "Weather Grammar & The Dummy 'It'",
        content: "In English, we describe weather using the **dummy subject 'It'**:\n- *What's the weather like?*\n- *It is sunny.* / *It is cloudy.* / *It is hot.*\n\n### Noun vs. Adjective Patterns\n- **Noun (The weather feature)**: *sun, rain, cloud, wind, snow*.\n- **Adjective (-y suffix)**: *sunny, rainy, cloudy, windy, snowy*.\n- **Verb in continuous**: *It is raining*, *It is snowing*.",
        tables: [
          {
            title: "Weather Nouns, Adjectives & Verb Forms",
            headers: ["Weather Element", "Noun Form", "Adjective Form", "Sentence with 'It is...'"],
            rows: [
              ["Sun", "The sun is shining", "sunny", "It is sunny today."],
              ["Rain", "There is rain", "rainy", "It is rainy / It is raining."],
              ["Cloud", "There are clouds", "cloudy", "It is cloudy."],
              ["Wind", "The wind is blowing", "windy", "It is very windy."],
              ["Snow", "There is snow", "snowy", "It is snowy / It is snowing."]
            ]
          },
          {
            title: "Four Seasons in Pakistan",
            headers: ["Season", "Months", "Climate Traits", "Urdu Translation"],
            rows: [
              ["Spring", "March, April", "Mild, blooming flowers, pleasant", "Ù…ÙˆØ³Ù…Ù  Ø¨Û Ø§Ø±"],
              ["Summer", "May, June, July, August", "Hot, monsoon rains, mango season", "Ù…ÙˆØ³Ù…Ù  Ú¯Ø±Ù…Ø§"],
              ["Autumn / Fall", "September, October, November", "Dry, golden leaves, cool breezes", "Ù…ÙˆØ³Ù…Ù  Ø®Ø²Ø§Úº"],
              ["Winter", "December, January, February", "Cold, foggy mornings, snowfall up north", "Ù…ÙˆØ³Ù…Ù  Ø³Ø±Ù…Ø§"]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Autumn vs. Fall",
            text: "**Autumn** is standard British and Pakistani English. In American English, the same season is widely called **fall** because leaves fall from the trees."
          },
          {
            type: "warning",
            title: "Always Include 'It is'",
            text: "Never say 'Today is rainy' alone; standard natural English requires the dummy pronoun: **It is rainy today**."
          }
        ]
      },
      {
        id: "sec-a1-u6-l5-2",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "What is the weather like today? It is sunny and warm.", phonetic: "/wÉ’t Éªz Ã°É™ ËˆweÃ°É™r laÉªk tÉ™ËˆdeÉª Éªt Éªz ËˆsÊŒni Ã¦nd wÉ”Ë m/", urdu: "Ø¢Ø¬ Ù…ÙˆØ³Ù… Ú©ÛŒØ³Ø§ Û Û’ØŸ Ø¯Ú¾ÙˆÙ¾ Ù†Ú©Ù„ÛŒ Û ÙˆØ¦ÛŒ Û Û’ Ø§ÙˆØ± Ù…ÙˆØ³Ù… Ù…Ø¹ØªØ¯Ù„ Û Û’Û”", audioText: "What is the weather like today? It is sunny and warm." },
          { english: "Take an umbrella because it is raining heavily outside.", phonetic: "/teÉªk É™n ÊŒmËˆbrelÉ™ bÉªËˆkÉ’z Éªt Éªz ËˆreÉªnÉªÅ‹ ËˆhevÉªli ËŒaÊŠtËˆsaÉªd/", urdu: "Ú†Ú¾ØªØ±ÛŒ Ù„Û’ Ù„ÛŒÚº Ú©ÛŒÙˆÙ†Ú©Û  Ø¨Ø§Û Ø± ØªÛŒØ² Ø¨Ø§Ø±Ø´ Û Ùˆ Ø±Û ÛŒ Û Û’Û”", audioText: "Take an umbrella because it is raining heavily outside." },
          { english: "Spring is my favourite season because everything looks green and fresh.", phonetic: "/sprÉªÅ‹ Éªz maÉª ËˆfeÉªvÉ™rÉªt ËˆsiË zn bÉªËˆkÉ’z ËˆevriÎ¸ÉªÅ‹ lÊŠks É¡riË n Ã¦nd freÊƒ/", urdu: "Ø¨Û Ø§Ø± Ù…ÛŒØ±Ø§ Ù¾Ø³Ù†Ø¯ÛŒØ¯Û  Ù…ÙˆØ³Ù… Û Û’ Ú©ÛŒÙˆÙ†Ú©Û  Û Ø± Ú†ÛŒØ² Ø³Ø¨Ø² Ø§ÙˆØ± ØªØ§Ø²Û  Ù†Ø¸Ø± Ø¢ØªÛŒ Û Û’Û”", audioText: "Spring is my favourite season because everything looks green and fresh." },
          { english: "It is freezing cold in Quetta during January and February.", phonetic: "/Éªt Éªz ËˆfriË zÉªÅ‹ kÉ™ÊŠld Éªn ËˆkwetÉ™ ËˆdjÊŠÉ™rÉªÅ‹ ËˆdÊ’Ã¦njuÉ™ri Ã¦nd ËˆfebruÉ™ri/", urdu: "Ø¬Ù†ÙˆØ±ÛŒ Ø§ÙˆØ± Ù Ø±ÙˆØ±ÛŒ Ù…ÛŒÚº Ú©ÙˆØ¦Ù¹Û  Ù…ÛŒÚº Ø¨Ø±Ù Ù„ÛŒ Ù¹Ú¾Ù†Úˆ Û ÙˆØªÛŒ Û Û’Û”", audioText: "It is freezing cold in Quetta during January and February." },
          { english: "The sky is grey and cloudy, so it might rain later this evening.", phonetic: "/Ã°É™ skaÉª Éªz É¡reÉª Ã¦nd ËˆklaÊŠdi sÉ™ÊŠ Éªt maÉªt reÉªn ËˆleÉªtÉ™r Ã°Éªs ËˆiË vnÉªÅ‹/", urdu: "Ø¢Ø³Ù…Ø§Ù† Ø§Ø¨Ø± Ø¢Ù„ÙˆØ¯ Û Û’ØŒ Ø§Ø³ Ù„ÛŒÛ’ Ø´Ø§Ù… Ú©Ùˆ Ø¨Ø§Ø±Ø´ Û Ùˆ Ø³Ú©ØªÛŒ Û Û’Û”", audioText: "The sky is grey and cloudy, so it might rain later this evening." },
          { english: "It is too windy to set up our camping tent on the hill.", phonetic: "/Éªt Éªz tuË  ËˆwÉªndi tuË  set ÊŒp ËˆaÊŠÉ™r ËˆkÃ¦mpÉªÅ‹ tent É’n Ã°É™ hÉªl/", urdu: "Ù¾Û Ø§Ú‘ÛŒ Ù¾Ø± Û ÙˆØ§ Ø§ØªÙ†ÛŒ ØªÛŒØ² Û Û’ Ú©Û  Ø®ÛŒÙ…Û  Ù„Ú¯Ø§Ù†Ø§ Ù…Ø´Ú©Ù„ Û Û’Û”", audioText: "It is too windy to set up our camping tent on the hill." },
          { english: "In autumn, the golden leaves fall gently from the trees.", phonetic: "/Éªn ËˆÉ”Ë tÉ™m Ã°É™ ËˆÉ¡É™ÊŠldn liË vz fÉ”Ë l ËˆdÊ’entli frÉ™m Ã°É™ triË z/", urdu: "Ø®Ø²Ø§Úº Ù…ÛŒÚº Ø³Ù†Û Ø±ÛŒ Ù¾ØªÛ’ Ø¯Ø±Ø®ØªÙˆÚº Ø³Û’ Ø¢Û Ø³ØªÛ  Ø¢Û Ø³ØªÛ  Ú¯Ø±ØªÛ’ Û ÛŒÚºÛ”", audioText: "In autumn, the golden leaves fall gently from the trees." },
          { english: "Children love making snowmen during winter in Murree.", phonetic: "/ËˆtÊƒÉªldrÉ™n lÊŒv ËˆmeÉªkÉªÅ‹ ËˆsnÉ™ÊŠmen ËˆdjÊŠÉ™rÉªÅ‹ ËˆwÉªntÉ™r Éªn ËˆmÊŒri/", urdu: "Ø³Ø±Ø¯ÛŒÙˆÚº Ù…ÛŒÚº Ù…Ø±ÛŒ Ù…ÛŒÚº Ø¨Ú†Û’ Ø¨Ø±Ù  Ú©Ø§ Ù¾ØªÙ„Ø§ Ø¨Ù†Ø§Ù†Ø§ Ù¾Ø³Ù†Ø¯ Ú©Ø±ØªÛ’ Û ÛŒÚºÛ”", audioText: "Children love making snowmen during winter in Murree." }
        ]
      },
      {
        id: "sec-a1-u6-l5-3",
        type: "dialogue",
        title: "Checking the Weather Forecast",
        dialogue: [
          { speaker: "Saima", avatar: "S", english: "Are you planning to go for a walk in the park today, Hira?", urdu: "Ø­Ø±Ø§ØŒ Ú©ÛŒØ§ Ø¢Ø¬ Ø¢Ù¾ Ù¾Ø§Ø±Ú© Ù…ÛŒÚº Ø³ÛŒØ± Ú©Û’ Ù„ÛŒÛ’ Ø¬Ø§Ù†Û’ Ú©Ø§ Ø§Ø±Ø§Ø¯Û  Ø±Ú©Ú¾ØªÛŒ Û ÛŒÚºØŸ", audioText: "Are you planning to go for a walk in the park today, Hira?" },
          { speaker: "Hira", avatar: "H", english: "I wanted to, but the weather forecast says it will be very windy and rainy.", urdu: "Ù…ÛŒØ±Ø§ Ø§Ø±Ø§Ø¯Û  ØªÚ¾Ø§ Ù„ÛŒÚ©Ù† Ù…ÙˆØ³Ù… Ú©ÛŒ Ù¾ÛŒØ´ Ú¯ÙˆØ¦ÛŒ Û Û’ Ú©Û  ØªÛŒØ² Û ÙˆØ§ Ø§ÙˆØ± Ø¨Ø§Ø±Ø´ Û ÙˆÚ¯ÛŒÛ”", audioText: "I wanted to, but the weather forecast says it will be very windy and rainy." },
          { speaker: "Saima", avatar: "S", english: "Yes, the sky looks very cloudy right now.", urdu: "Ø¬ÛŒ Û Ø§ÚºØŒ Ø§Ø³ ÙˆÙ‚Øª Ø¨Ú¾ÛŒ Ø¢Ø³Ù…Ø§Ù† Ø¨Û Øª Ø§Ø¨Ø± Ø¢Ù„ÙˆØ¯ Ù†Ø¸Ø± Ø¢ Ø±Û Ø§ Û Û’Û”", audioText: "Yes, the sky looks very cloudy right now." },
          { speaker: "Hira", avatar: "H", english: "Let's stay home and have hot soup instead!", urdu: "Ú†Ù„ÛŒÚº Ú¯Ú¾Ø± Ù¾Ø± Û ÛŒ Ø±Û ØªÛ’ Û ÛŒÚº Ø§ÙˆØ± Ú¯Ø±Ù… Ø³ÙˆÙ¾ Ù¾ÛŒØªÛ’ Û ÛŒÚº!", audioText: "Let's stay home and have hot soup instead!" }
        ]
      },
      {
        id: "sec-a1-u6-l5-4",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u6-l5-1",
            type: "mcq",
            skillTag: "weather",
            prompt: "What is the natural English question to inquire about the weather?",
            options: [
              { id: "opt-1", text: "What is the weather like?" },
              { id: "opt-2", text: "How is the weather like?" },
              { id: "opt-3", text: "What weather is today happening?" },
              { id: "opt-4", text: "Which is the weather now?" }
            ],
            correctOptionId: "opt-1",
            explanation: "'What is the weather like?' (or 'How is the weather?') is standard.",
            urduExplanation: "Ù…ÙˆØ³Ù… Ú©Ø§ Ù¾ÙˆÚ†Ú¾Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ 'What is the weather like?' Ø¨ÙˆÙ„Ø§ Ø¬Ø§ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u6-l5-2",
            type: "mcq",
            skillTag: "weather",
            prompt: "Complete the sentence with the adjective form: 'It is a _____ day; the sun is shining brightly.'",
            options: [
              { id: "opt-1", text: "sun" },
              { id: "opt-2", text: "sunny" },
              { id: "opt-3", text: "sunned" },
              { id: "opt-4", text: "sunning" }
            ],
            correctOptionId: "opt-2",
            explanation: "'Sunny' is the descriptive adjective derived from sun.",
            urduExplanation: "Ø¯Ú¾ÙˆÙ¾ ÙˆØ§Ù„Û’ Ø¯Ù† Ú©Û’ Ù„ÛŒÛ’ adjective 'sunny' Ø¢Ø¦Û’ Ú¯Ø§Û”"
          },
          {
            id: "ex-a1-u6-l5-3",
            type: "fill_blank",
            skillTag: "seasons",
            prompt: "What season follows winter and brings blooming flowers? '_____' (capitalize).",
            correctAnswer: "Spring",
            explanation: "Spring follows winter.",
            urduExplanation: "Ø³Ø±Ø¯ÛŒ Ú©Û’ Ø¨Ø¹Ø¯ Ù¾ÚÚ¾ÙˆÙ„ÙˆÚº Ú©Ø§ Ù…ÙˆØ³Ù… 'Spring' (Ø¨Û Ø§Ø±) Ø¢ØªØ§ Û Û’Û”"
          },
          {
            id: "ex-a1-u6-l5-4",
            type: "fill_blank",
            skillTag: "weather",
            prompt: "Complete with the dummy pronoun: '_____ is raining heavily outside.'",
            correctAnswer: "It",
            explanation: "English uses dummy subject 'It' for weather.",
            urduExplanation: "Ù…ÙˆØ³Ù… Ú©Û’ Ø¬Ù…Ù„Û’ Ú©Û’ Ù„ÛŒÛ’ 'It' Ø§Ø³ØªØ¹Ù…Ø§Ù„ Û ÙˆØªØ§ Û Û’: 'It is raining'Û”"
          },
          {
            id: "ex-a1-u6-l5-5",
            type: "order_sentence",
            skillTag: "weather",
            prompt: "Rearrange the words to form a correct weather sentence:",
            sentenceTokens: ["It", "is", "very", "windy", "and", "cold", "today", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
            explanation: "It is + very windy and cold + today.",
            urduExplanation: "It is very windy and cold today."
          },
          {
            id: "ex-a1-u6-l5-6",
            type: "order_sentence",
            skillTag: "seasons",
            prompt: "Rearrange the words to form a correct statement:",
            sentenceTokens: ["Leaves", "fall", "from", "the", "trees", "in", "autumn", "."],
            correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
            explanation: "Subject (Leaves) + verb (fall) + location (from the trees) + season (in autumn).",
            urduExplanation: "Leaves fall from the trees in autumn."
          },
          {
            id: "ex-a1-u6-l5-7",
            type: "match_pairs",
            skillTag: "weather",
            prompt: "Match the weather noun to its corresponding descriptive adjective:",
            pairs: [
              { left: "rain", right: "rainy" },
              { left: "sun", right: "sunny" },
              { left: "wind", right: "windy" },
              { left: "cloud", right: "cloudy" }
            ],
            explanation: "Nouns matched to adjectives ending in -y.",
            urduExplanation: "Ø§Ø³Ù… Ú©Ùˆ ØµÙ Øª (adjective) Ø³Û’ Ù…Ù„Ø§Ø¦ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u6-l5-8",
            type: "error_correction",
            skillTag: "weather",
            prompt: "Find and correct the mistake: 'Today is raining.'",
            correctAnswer: "It is raining today.",
            explanation: "Use the dummy subject 'It': 'It is raining today'.",
            urduExplanation: "Ù…ÙˆØ³Ù… Ú©Û’ Ù„ÛŒÛ’ 'It is raining today' Ù„Ú©Ú¾ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u6-l5-9",
            type: "error_correction",
            skillTag: "seasons",
            prompt: "Find and correct the mistake: 'The leaves fall in the fall season of spring.'",
            correctAnswer: "The leaves fall in autumn.",
            explanation: "Leaves fall in autumn (or fall), not in spring.",
            urduExplanation: "Ù¾ØªÛ’ Ø®Ø²Ø§Úº (autumn) Ù…ÛŒÚº Ú¯Ø±ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "ex-a1-u6-l5-10",
            type: "true_false",
            skillTag: "seasons",
            prompt: "'Fall' is another widely used name for the season of autumn. (True or False)",
            correctAnswer: "True",
            explanation: "True. 'Fall' is the common American English term for autumn.",
            urduExplanation: "Ø¯Ø±Ø³ØªÛ” Ø§Ù…Ø±ÛŒÚ©ÛŒ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº autumn Ú©Ùˆ 'fall' Ø¨Ú¾ÛŒ Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          }
        ]
      },
      {
        id: "sec-a1-u6-l5-5",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u6-l5-1",
            type: "mcq",
            skillTag: "seasons",
            prompt: "What is the American English word for autumn?",
            options: [
              { id: "opt-1", text: "drop" },
              { id: "opt-2", text: "winter" },
              { id: "opt-3", text: "breeze" },
              { id: "opt-4", text: "fall" }
            ],
            correctOptionId: "opt-4",
            explanation: "'Fall' is the American English synonym for autumn.",
            urduExplanation: "Ø§Ù…Ø±ÛŒÚ©ÛŒ Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº autumn Ú©Ùˆ 'fall' Ú©Û ØªÛ’ Û ÛŒÚºÛ”"
          },
          {
            id: "qz-a1-u6-l5-2",
            type: "mcq",
            skillTag: "weather",
            prompt: "Complete the sentence: 'Take a raincoat; it is _____ heavily outside.'",
            options: [
              { id: "opt-1", text: "raining" },
              { id: "opt-2", text: "sunny" },
              { id: "opt-3", text: "wind" },
              { id: "opt-4", text: "clouds" }
            ],
            correctOptionId: "opt-1",
            explanation: "'It is raining' describes active precipitation.",
            urduExplanation: "Ø¨Ø§Ø±Ø´ Û ÙˆÙ†Û’ Ú©Û’ Ù„ÛŒÛ’ 'raining' Ø¢Ø¦Û’ Ú¯Ø§Û”"
          },
          {
            id: "qz-a1-u6-l5-3",
            type: "mcq",
            skillTag: "seasons",
            prompt: "In which season do people enjoy fresh mangoes and cold drinks in Pakistan?",
            options: [
              { id: "opt-1", text: "Winter" },
              { id: "opt-2", text: "Summer" },
              { id: "opt-3", text: "Autumn" },
              { id: "opt-4", text: "Spring" }
            ],
            correctOptionId: "opt-2",
            explanation: "Summer is the season for mangoes and hot sunny days.",
            urduExplanation: "Ø¢Ù… Ú¯Ø±Ù…ÛŒÙˆÚº (Summer) Ú©Ø§ Ù¾Ú¾Ù„ Û Û’Û”"
          },
          {
            id: "qz-a1-u6-l5-4",
            type: "mcq",
            skillTag: "weather",
            prompt: "Which dummy pronoun starts weather sentences in English?",
            options: [
              { id: "opt-1", text: "There" },
              { id: "opt-2", text: "This" },
              { id: "opt-3", text: "That" },
              { id: "opt-4", text: "It" }
            ],
            correctOptionId: "opt-4",
            explanation: "English uses 'It' (e.g. It is sunny, it is cold).",
            urduExplanation: "Ù…ÙˆØ³Ù… Ú©Û’ Ø¬Ù…Ù„Û’ 'It' Ø³Û’ Ø´Ø±ÙˆØ¹ Û ÙˆØªÛ’ Û ÛŒÚº: 'It is sunny'Û”"
          },
          {
            id: "qz-a1-u6-l5-5",
            type: "mcq",
            skillTag: "weather",
            prompt: "What does 'cloudy' mean?",
            options: [
              { id: "opt-1", text: "Strong winds blowing" },
              { id: "opt-2", text: "The sky is covered with clouds" },
              { id: "opt-3", text: "Heavy snowfall" },
              { id: "opt-4", text: "Bright direct sunshine" }
            ],
            correctOptionId: "opt-2",
            explanation: "'Cloudy' means the sky is covered with grey or white clouds.",
            urduExplanation: "'cloudy' Ú©Ø§ Ù…Ø·Ù„Ø¨ Û Û’ Ú©Û  Ø¢Ø³Ù…Ø§Ù† Ù¾Ø± Ø¨Ø§Ø¯Ù„ Ú†ÚÚ¾Ø§Ø¦Û’ Û ÙˆØ¦Û’ Û ÛŒÚºÛ”"
          }
        ]
      },
      {
        id: "sec-a1-u6-l5-6",
        type: "summary",
        title: "Lesson Summary",
        content: "Seasons and weather summary:",
        summaryPoints: [
          "Four seasons: spring, summer, autumn (or fall), winter.",
          "Use dummy pronoun 'It' for weather (It is sunny, it is raining, it is cold).",
          "Weather adjectives end in -y: sunny, rainy, cloudy, windy, snowy.",
          "Autumn is the British English term; Fall is the American English term.",
          "Seasons take preposition IN (in summer, in winter)."
        ]
      },
      {
        id: "sec-a1-u6-l5-7",
        type: "urduNote",
        title: "Urdu Linguistic Comparison (Ø§Ø±Ø¯Ùˆ Ø³Û’ Ù…ÙˆØ§Ø²Ù†Û )",
        content: "Ø§Ø±Ø¯Ùˆ Ù…ÛŒÚº Ù…ÙˆØ³Ù… Ú©Ø§ Ø­Ø§Ù„ Ø¨ØªØ§Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Û Ù… Ú©Û ØªÛ’ Û ÛŒÚº:\n- 'Ø¢Ø¬ Ø¯Ú¾ÙˆÙ¾ Û Û’'\n- 'Ø¨Ø§Ø±Ø´ Û Ùˆ Ø±Û ÛŒ Û Û’'\n- 'Ø¨Û Øª Ù¹Ú¾Ù†Úˆ Û Û’'\n\n**Ø§Ù†Ú¯Ø±ÛŒØ²ÛŒ Ù…ÛŒÚº Ù…ÙˆØ³Ù… Ú©Û’ Ù„ÛŒÛ’ Dummy Pronoun 'It' Ù„Ú¯Ø§Ù†Ø§ Ù„Ø§Ø²Ù…ÛŒ Û Û’:**\n- **It is sunny** (Ù†Û  Ú©Û  'Today is sunny' Ú©Û Ù†Ø§ Ø¬Ùˆ Ú©Û  ØºÛŒØ± Ù Ø·Ø±ÛŒ Û Û’)\n- **It is raining**\n- **It is cold**\n\nØ§Ø³ Ú©Û’ Ø¹Ù„Ø§ÙˆÛ  Ø§Ø³Ù… (Rain) Ø§ÙˆØ± ØµÙ Øª (Rainy) Ú©Ø§ Ù Ø±Ù‚ Ø³Ù…Ø¬Ú¾ÛŒÚº: 'a rainy day' Ø¨ÙˆÙ„Ø§ Ø¬Ø§ØªØ§ Û Û’Û”",
        needsNativeReview: true,
        metadata: {
          needsNativeReview: true,
          reviewStatus: "pending_native_linguist"
        }
      }
    ]
  }
];
