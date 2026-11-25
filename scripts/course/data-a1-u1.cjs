/**
 * Zarii English Course - Level A1, Unit 1 Content
 * Unit 1: Foundations & The Verb 'To Be'
 * Lessons 1 to 5
 */

module.exports = [
  // -------------------------------------------------------------------------
  // LESSON 1: To Be: I am, You are, He/She/It is
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u1-l1",
    level: "A1",
    unit: "unit-1",
    order: 1,
    title: "To Be: I am, You are, He/She/It is",
    description: "Learn the foundation of English sentences: the verb 'to be' in positive statements.",
    objectives: [
      "Introduce yourself and others using 'am', 'is', and 'are'",
      "Form affirmative statements with personal pronouns (I, you, he, she, it, we, they)",
      "Use common contractions (I'm, you're, he's, she's, they're) naturally in speech"
    ],
    estimatedMinutes: 12,
    prerequisites: [],
    skillTags: ["verb-to-be", "pronouns", "introductions"],
    vocabularyList: [
      { word: "student", partOfSpeech: "noun", phonetic: "/ˈstjuːdənt/", definition: "A person who is studying at a school, college, or university.", urduMeaning: "طالب علم", exampleSentence: "I am an English student." },
      { word: "teacher", partOfSpeech: "noun", phonetic: "/ˈtiːtʃər/", definition: "A person who teaches, especially in a school.", urduMeaning: "استاد", exampleSentence: "She is our English teacher." },
      { word: "doctor", partOfSpeech: "noun", phonetic: "/ˈdɒktər/", definition: "A person who is qualified to treat people who are ill.", urduMeaning: "ڈاکٹر / طبیب", exampleSentence: "He is a doctor at the hospital." },
      { word: "friend", partOfSpeech: "noun", phonetic: "/frend/", definition: "A person whom one knows and with whom one has a bond of affection.", urduMeaning: "دوست", exampleSentence: "You are my best friend." },
      { word: "happy", partOfSpeech: "adjective", phonetic: "/ˈhæpi/", definition: "Feeling or showing pleasure or contentment.", urduMeaning: "خوش", exampleSentence: "We are very happy today." },
      { word: "ready", partOfSpeech: "adjective", phonetic: "/ˈredi/", definition: "In a suitable state for an action or situation.", urduMeaning: "تیار", exampleSentence: "They are ready for class." },
      { word: "name", partOfSpeech: "noun", phonetic: "/neɪm/", definition: "A word or set of words by which a person or thing is known.", urduMeaning: "نام", exampleSentence: "My name is Bilal." },
      { word: "city", partOfSpeech: "noun", phonetic: "/ˈsɪti/", definition: "A large town.", urduMeaning: "شہر", exampleSentence: "Lahore is an ancient city." },
      { word: "school", partOfSpeech: "noun", phonetic: "/skuːl/", definition: "An institution for educating children or adults.", urduMeaning: "اسکول / مدرسہ", exampleSentence: "It is a new school." },
      { word: "welcome", partOfSpeech: "adjective", phonetic: "/ˈwelkəm/", definition: "Gladly received or accepted.", urduMeaning: "خوش آمدید", exampleSentence: "You are always welcome here." }
    ],
    sections: [
      {
        id: "sec-a1-u1-l1-1",
        type: "explain",
        title: "Understanding the Verb 'To Be'",
        content: "The verb **to be** is the most essential verb in the English language. It connects the subject of a sentence to a description, profession, identity, or location.\n\nIn the simple present tense, 'to be' has three forms: **am**, **is**, and **are**.",
        tables: [
          {
            title: "Present Tense Conjugation & Contractions",
            headers: ["Subject", "Full Form", "Contraction", "Urdu Translation", "Example"],
            rows: [
              ["I", "I am", "I'm", "میں ہوں", "I am a student."],
              ["You", "You are", "You're", "آپ ہیں / تم ہو", "You are kind."],
              ["He", "He is", "He's", "وہ ہے (مرد)", "He is a doctor."],
              ["She", "She is", "She's", "وہ ہے (عورت)", "She is a teacher."],
              ["It", "It is", "It's", "یہ ہے (بے جان/جانور)", "It is a cat."],
              ["We", "We are", "We're", "ہم ہیں", "We are ready."],
              ["They", "They are", "They're", "وہ ہیں (جمع)", "They are friends."]
            ]
          },
          {
            title: "Form / Use / Common Mistakes",
            headers: ["Aspect", "Rule", "Examples", "Common Error to Avoid"],
            rows: [
              ["Form", "Subject + am/is/are + Complement", "I am Bilal / She is happy", "Don't say: 'I Bilal' (verb cannot be dropped)."],
              ["Use", "Identity, feeling, job, location", "We are in London / He is tired", "Don't confuse: 'He is' with 'They is'."],
              ["Pronouns", "Match singular and plural", "He/She/It = is; We/You/They = are", "Never say: 'You is my friend'."]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Contractions in Daily Speech",
            text: "Native English speakers almost always contract the verb in speech: say **I'm**, **you're**, and **they're** for natural flow."
          },
          {
            type: "warning",
            title: "No Dropping the Verb",
            text: "In Urdu, you can sometimes drop the linking verb in short answers, but in English, a complete sentence **must** have a verb: 'She is a doctor' (never 'She a doctor')."
          }
        ]
      },
      {
        id: "sec-a1-u1-l1-2",
        type: "timeline",
        title: "Present State Timeline",
        timeline: {
          title: "State of Fact in the Present",
          past: "Past State",
          present: "I am a student (Current ongoing fact)",
          future: "Future State",
          activePoint: "present",
          explanation: "The verb 'to be' in the simple present expresses a current permanent or temporary state of fact."
        }
      },
      {
        id: "sec-a1-u1-l1-3",
        type: "examples",
        title: "Model Sentences with Audio",
        examples: [
          { english: "I am a dedicated student.", phonetic: "/aɪ æm ə ˈdedɪkeɪtɪd ˈstjuːdənt/", urdu: "میں ایک محنتی طالب علم ہوں۔", audioText: "I am a dedicated student." },
          { english: "She is our new English teacher.", phonetic: "/ʃiː ɪz ˈaʊər njuː ˈɪŋɡlɪʃ ˈtiːtʃər/", urdu: "وہ ہماری نئی انگریزی کی استانی ہیں۔", audioText: "She is our new English teacher." },
          { english: "Ali and Bilal are good friends.", phonetic: "/ˈæli ænd bɪˈlɑːl ɑːr ɡʊd frendz/", urdu: "علی اور بلال اچھے دوست ہیں۔", audioText: "Ali and Bilal are good friends." },
          { english: "We are very happy with our test scores.", phonetic: "/wiː ɑːr ˈveri ˈhæpi wɪð ˈaʊər test skɔːrz/", urdu: "ہم اپنے ٹیسٹ کے نمبروں سے بہت خوش ہیں۔", audioText: "We are very happy with our test scores." },
          { english: "It is an exciting day for the school.", phonetic: "/ɪt ɪz ən ɪkˈsaɪtɪŋ deɪ fɔːr ðə skuːl/", urdu: "یہ اسکول کے لیے ایک پرجوش دن ہے۔", audioText: "It is an exciting day for the school." },
          { english: "You are welcome to join our study group.", phonetic: "/juː ɑːr ˈwelkəm tuː dʒɔɪn ˈaʊər ˈstʌdi ɡruːp/", urdu: "ہمارے اسٹڈی گروپ میں آپ کا خیرمقدم ہے۔", audioText: "You are welcome to join our study group." },
          { english: "He is a doctor at the community clinic.", phonetic: "/hiː ɪz ə ˈdɒktər æt ðə kəˈmjuːnəti ˈklɪnɪk/", urdu: "وہ کمیونٹی کلینک میں ڈاکٹر ہیں۔", audioText: "He is a doctor at the community clinic." },
          { english: "They are ready for the morning lesson.", phonetic: "/ðeɪ ɑːr ˈredi fɔːr ðə ˈmɔːrnɪŋ ˈlesn/", urdu: "وہ صبح کے سبق کے لیے تیار ہیں۔", audioText: "They are ready for the morning lesson." }
        ]
      },
      {
        id: "sec-a1-u1-l1-4",
        type: "dialogue",
        title: "First Day at the Academy",
        dialogue: [
          { speaker: "Hamza", avatar: "H", english: "Hello! I am Hamza. Are you in Level A1?", urdu: "ہیلو! میں حمزہ ہوں۔ کیا آپ لیول A1 میں ہیں؟", audioText: "Hello! I am Hamza. Are you in Level A1?" },
          { speaker: "Zainab", avatar: "Z", english: "Yes, I am! My name is Zainab. I am a new student.", urdu: "جی ہاں! میرا نام زینب ہے۔ میں نئی طالب علم ہوں۔", audioText: "Yes, I am! My name is Zainab. I am a new student." },
          { speaker: "Hamza", avatar: "H", english: "Nice to meet you, Zainab. Mr. Usman is our teacher. He is fantastic.", urdu: "آپ سے مل کر خوشی ہوئی، زینب۔ مسٹر عثمان ہمارے استاد ہیں۔ وہ بہت شاندار ہیں۔", audioText: "Nice to meet you, Zainab. Mr. Usman is our teacher. He is fantastic." },
          { speaker: "Zainab", avatar: "Z", english: "We are in the right classroom then. Let's get started!", urdu: "پھر تو ہم بالکل صحیح کلاس روم میں ہیں۔ چلیے شروع کرتے ہیں!", audioText: "We are in the right classroom then. Let's get started!" }
        ]
      },
      {
        id: "sec-a1-u1-l1-5",
        type: "practice",
        title: "Interactive Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u1-l1-1",
            type: "mcq",
            skillTag: "verb-to-be",
            prompt: "Choose the correct verb: 'My brother and I _____ ready for school.'",
            options: [
              { id: "opt-1", text: "are" },
              { id: "opt-2", text: "am" },
              { id: "opt-3", text: "is" },
              { id: "opt-4", text: "be" }
            ],
            correctOptionId: "opt-1",
            explanation: "'My brother and I' is a plural subject equal to 'we', which requires the verb 'are'.",
            urduExplanation: "'My brother and I' جمع فاعل (ہم / we) ہے، اس لیے فعل 'are' استعمال ہوگا۔"
          },
          {
            id: "ex-a1-u1-l1-2",
            type: "mcq",
            skillTag: "verb-to-be",
            prompt: "Select the correct form: 'The doctor _____ in her office.'",
            options: [
              { id: "opt-1", text: "am" },
              { id: "opt-2", text: "is" },
              { id: "opt-3", text: "are" },
              { id: "opt-4", text: "be" }
            ],
            correctOptionId: "opt-2",
            explanation: "'The doctor' is third-person singular (she or he), so the correct verb is 'is'.",
            urduExplanation: "ڈاکٹر واحد غائب (he/she) ہے، اس کے ساتھ فعل 'is' آتا ہے۔"
          },
          {
            id: "ex-a1-u1-l1-3",
            type: "mcq",
            skillTag: "verb-to-be",
            prompt: "Which contraction represents 'They are'?",
            options: [
              { id: "opt-1", text: "They're" },
              { id: "opt-2", text: "Their" },
              { id: "opt-3", text: "There" },
              { id: "opt-4", text: "They's" }
            ],
            correctOptionId: "opt-1",
            explanation: "'They're' is the contraction of 'They are'. 'Their' is possessive and 'There' refers to place.",
            urduExplanation: "'They are' کا اختصار 'They're' ہے۔"
          },
          {
            id: "ex-a1-u1-l1-4",
            type: "fill_blank",
            skillTag: "verb-to-be",
            prompt: "I _____ very glad to meet you today.",
            correctAnswer: "am",
            acceptableAnswers: ["am", "'m"],
            explanation: "The first-person singular pronoun 'I' always pairs with 'am' in the present tense.",
            urduExplanation: "ضمیر 'I' کے ساتھ ہمیشہ 'am' آتا ہے۔"
          },
          {
            id: "ex-a1-u1-l1-5",
            type: "fill_blank",
            skillTag: "verb-to-be",
            prompt: "The students _____ excited about the field trip.",
            correctAnswer: "are",
            acceptableAnswers: ["are"],
            explanation: "'The students' is plural, requiring 'are'.",
            urduExplanation: "'The students' جمع اسم ہے، اس لیے 'are' آئے گا۔"
          },
          {
            id: "ex-a1-u1-l1-6",
            type: "order_sentence",
            skillTag: "verb-to-be",
            prompt: "Arrange the words to form a correct English sentence:",
            sentenceTokens: ["She", "is", "a", "talented", "teacher", "."],
            correctOrder: ["She", "is", "a", "talented", "teacher", "."],
            explanation: "English word order follows Subject (She) + Verb (is) + Complement (a talented teacher).",
            urduExplanation: "انگریزی کا بنیادی اصول: فاعل (She) + فعل (is) + مفعول/تکملہ (a talented teacher)۔"
          },
          {
            id: "ex-a1-u1-l1-7",
            type: "order_sentence",
            skillTag: "verb-to-be",
            prompt: "Put the words in order:",
            sentenceTokens: ["We", "are", "happy", "to", "learn", "."],
            correctOrder: ["We", "are", "happy", "to", "learn", "."],
            explanation: "Subject (We) + Verb (are) + Adjective (happy) + Infinitive (to learn).",
            urduExplanation: "فاعل (We) + فعل (are) + صفت (happy) + مصدر (to learn)۔"
          },
          {
            id: "ex-a1-u1-l1-8",
            type: "match_pairs",
            skillTag: "pronouns",
            prompt: "Match each subject pronoun with its correct form of 'to be':",
            pairs: [
              { left: "I", right: "am" },
              { left: "He / She / It", right: "is" },
              { left: "You / We / They", right: "are" }
            ],
            explanation: "'I' takes 'am'; third-person singular takes 'is'; second person and plural take 'are'.",
            urduExplanation: "I کے ساتھ am، واحد غائب کے ساتھ is، اور جمع/آپ کے ساتھ are آتا ہے۔"
          },
          {
            id: "ex-a1-u1-l1-9",
            type: "error_correction",
            skillTag: "verb-to-be",
            prompt: "Correct the grammatical mistake in this sentence: 'They is very friendly.'",
            correctAnswer: "They are very friendly.",
            acceptableAnswers: ["They are very friendly.", "They're very friendly.", "are"],
            explanation: "The plural subject 'They' must take 'are', never 'is'.",
            urduExplanation: "فاعل 'They' جمع ہے، اس لیے 'is' کی جگہ 'are' آئے گا۔"
          },
          {
            id: "ex-a1-u1-l1-10",
            type: "true_false",
            skillTag: "verb-to-be",
            prompt: "True or False: In English, you can say 'I doctor' without using the verb 'am'.",
            correctAnswer: "False",
            acceptableAnswers: ["False", "false", "F"],
            explanation: "False. English sentences require a finite verb; you must say 'I am a doctor'.",
            urduExplanation: "غلط۔ انگریزی جملے میں فعل کو چھوڑا نہیں جا سکتا، 'I am a doctor' کہنا ضروری ہے۔"
          }
        ]
      },
      {
        id: "sec-a1-u1-l1-6",
        type: "quiz",
        title: "Lesson Mastery Quiz",
        exercises: [
          {
            id: "qz-a1-u1-l1-1",
            type: "mcq",
            skillTag: "verb-to-be",
            prompt: "Complete the sentence: 'Karachi and Lahore _____ major cities in Pakistan.'",
            options: [
              { id: "opt-1", text: "am" },
              { id: "opt-2", text: "is" },
              { id: "opt-3", text: "are" },
              { id: "opt-4", text: "be" }
            ],
            correctOptionId: "opt-3",
            explanation: "Two cities joined by 'and' form a plural subject requiring 'are'.",
            urduExplanation: "دو شہر مل کر جمع بنتے ہیں، اس لیے 'are' آئے گا۔"
          },
          {
            id: "qz-a1-u1-l1-2",
            type: "mcq",
            skillTag: "verb-to-be",
            prompt: "Which sentence is grammatically correct?",
            options: [
              { id: "opt-1", text: "He are my friend." },
              { id: "opt-2", text: "She is a doctor." },
              { id: "opt-3", text: "I is ready." },
              { id: "opt-4", text: "They is students." }
            ],
            correctOptionId: "opt-2",
            explanation: "'She is a doctor' has matching third-person singular subject and verb.",
            urduExplanation: "'She is a doctor' بالکل درست جملہ ہے۔"
          },
          {
            id: "qz-a1-u1-l1-3",
            type: "mcq",
            skillTag: "verb-to-be",
            prompt: "What is the contracted form of 'It is'?",
            options: [
              { id: "opt-1", text: "It's" },
              { id: "opt-2", text: "Its" },
              { id: "opt-3", text: "It'are" },
              { id: "opt-4", text: "Its'" }
            ],
            correctOptionId: "opt-1",
            explanation: "'It's' (with an apostrophe) is the contraction of 'It is'. 'Its' is a possessive determiner.",
            urduExplanation: "'It is' کا اختصار 'It's' ہے۔"
          },
          {
            id: "qz-a1-u1-l1-4",
            type: "fill_blank",
            skillTag: "verb-to-be",
            prompt: "You _____ always a welcome guest in our home.",
            correctAnswer: "are",
            acceptableAnswers: ["are", "'re"],
            explanation: "The pronoun 'you' (singular or plural) always takes 'are'.",
            urduExplanation: "ضمیر 'you' کے ساتھ ہمیشہ 'are' آتا ہے۔"
          },
          {
            id: "qz-a1-u1-l1-5",
            type: "mcq",
            skillTag: "verb-to-be",
            prompt: "Which pair is correctly matched?",
            options: [
              { id: "opt-1", text: "I - are" },
              { id: "opt-2", text: "We - is" },
              { id: "opt-3", text: "They - are" },
              { id: "opt-4", text: "He - am" }
            ],
            correctOptionId: "opt-3",
            explanation: "'They' correctly pairs with the plural verb 'are'.",
            urduExplanation: "'They' کے ساتھ 'are' کا جوڑا بالکل درست ہے۔"
          }
        ]
      },
      {
        id: "sec-a1-u1-l1-7",
        type: "urduNote",
        title: "اردو بولنے والوں کے لیے اہم لسانی موازنہ",
        needsNativeReview: true,
        metadata: { needsNativeReview: true, reviewStatus: "pending_native_linguist" },
        urduText: "اردو اور انگریزی کی ساخت میں سب سے بڑا فرق جملے کی ترتیب (Word Order) کا ہے:\n\n1. اردو کی ترتیب SOV ہے: فاعل (Subject) + مفعول (Object) + فعل (Verb)۔ مثلاً: 'میں (S) طالب علم (O) ہوں (V)'۔\n2. انگریزی کی ترتیب SVO ہے: فاعل (Subject) + فعل (Verb) + مفعول (Object)۔ مثلاً: 'I (S) am (V) a student (O)'۔\n\nاردو بولنے والے اکثر فعل 'am/is/are' کو چھوڑ دیتے ہیں اور 'I student' یا 'He doctor' کہہ دیتے ہیں۔ یاد رکھیں کہ انگریزی میں فعل کا موجود ہونا ناگزیر ہے!"
      },
      {
        id: "sec-a1-u1-l1-8",
        type: "summary",
        title: "Lesson 1 Summary Box",
        summaryPoints: [
          "The verb 'to be' has three simple present forms: am (I), is (he/she/it), are (you/we/they).",
          "English word order is SVO (Subject + Verb + Object/Complement). Never omit the verb.",
          "Use contractions in conversation: I'm, you're, he's, she's, it's, we're, they're.",
          "Singular nouns take 'is'; plural nouns and compound subjects take 'are'."
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 2: Personal Pronouns & Possessive Adjectives
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u1-l2",
    level: "A1",
    unit: "unit-1",
    order: 2,
    title: "Personal Pronouns & Possessive Adjectives",
    description: "Master subject pronouns and show ownership using my, your, his, her, its, our, and their.",
    objectives: [
      "Distinguish subject pronouns (I, you, he...) from possessive adjectives (my, your, his...)",
      "Express ownership of everyday items accurately",
      "Avoid confusing contractions with possessives (it's vs. its; you're vs. your)"
    ],
    estimatedMinutes: 12,
    prerequisites: ["eng-a1-u1-l1"],
    skillTags: ["pronouns", "possessives", "grammar"],
    vocabularyList: [
      { word: "book", partOfSpeech: "noun", phonetic: "/bʊk/", definition: "A written or printed work consisting of pages glued or sewn together.", urduMeaning: "کتاب", exampleSentence: "This is my English book." },
      { word: "pen", partOfSpeech: "noun", phonetic: "/pen/", definition: "An instrument for writing or drawing with ink.", urduMeaning: "قلم", exampleSentence: "Her pen is on the desk." },
      { word: "car", partOfSpeech: "noun", phonetic: "/kɑːr/", definition: "A road vehicle powered by an engine.", urduMeaning: "گاڑی / کار", exampleSentence: "His car is outside." },
      { word: "house", partOfSpeech: "noun", phonetic: "/haʊs/", definition: "A building for human habitation.", urduMeaning: "گھر / مکان", exampleSentence: "Our house is near the park." },
      { word: "family", partOfSpeech: "noun", phonetic: "/ˈfæməli/", definition: "A group of one or more parents and their children living together.", urduMeaning: "خاندان / کنبہ", exampleSentence: "My family lives in Islamabad." },
      { word: "phone", partOfSpeech: "noun", phonetic: "/fəʊn/", definition: "A telephone or mobile device.", urduMeaning: "فون", exampleSentence: "Your phone is ringing." },
      { word: "bag", partOfSpeech: "noun", phonetic: "/bæɡ/", definition: "A container made of flexible material with an opening at the top.", urduMeaning: "بیگ / بستہ", exampleSentence: "Their bag is heavy." },
      { word: "key", partOfSpeech: "noun", phonetic: "/kiː/", definition: "A small piece of shaped metal used to open a lock.", urduMeaning: "چابی", exampleSentence: "This is the car key." },
      { word: "desk", partOfSpeech: "noun", phonetic: "/desk/", definition: "A piece of furniture with a flat table-style work surface.", urduMeaning: "ڈیسک / میز", exampleSentence: "The laptop is on our desk." },
      { word: "room", partOfSpeech: "noun", phonetic: "/ruːm/", definition: "Space that can be occupied in a building.", urduMeaning: "کمرہ", exampleSentence: "Its room is clean." }
    ],
    sections: [
      {
        id: "sec-a1-u1-l2-1",
        type: "explain",
        title: "Subject Pronouns vs. Possessive Adjectives",
        content: "A **subject pronoun** performs the action in a sentence (I, you, he, she, it, we, they).\n\nA **possessive adjective** comes before a noun to show who owns or possesses that noun (**my**, **your**, **his**, **her**, **its**, **our**, **their**).",
        tables: [
          {
            title: "Pronoun to Possessive Adjective Correspondence",
            headers: ["Subject Pronoun", "Possessive Adjective", "Urdu Meaning", "Example Sentence"],
            rows: [
              ["I", "my", "میرا / میری", "This is my book."],
              ["You", "your", "آپ کا / تمہارا", "Is this your pen?"],
              ["He", "his", "اس کا (مرد کا)", "His car is blue."],
              ["She", "her", "اس کا (عورت کا)", "Her name is Fatima."],
              ["It", "its", "اس کا (بے جان/جانور)", "The cat drank its milk."],
              ["We", "our", "ہمارا / ہماری", "Our classroom is spacious."],
              ["They", "their", "ان کا / ان کی", "Their house is large."]
            ]
          },
          {
            title: "Crucial Distinctions (Sound-Alike Words)",
            headers: ["Possessive Adjective", "Contraction with 'To Be'", "How to Test the Difference"],
            rows: [
              ["its (belonging to it)", "it's (it is)", "If you can replace it with 'it is', use it's."],
              ["your (belonging to you)", "you're (you are)", "If you can replace it with 'you are', use you're."],
              ["their (belonging to them)", "they're (they are)", "If you can replace it with 'they are', use they're."]
            ]
          }
        ],
        callouts: [
          {
            type: "tip",
            title: "Always Followed by a Noun",
            text: "A possessive adjective **cannot stand alone**. It must be followed directly by a noun: 'my book', 'his coat', 'our room'."
          },
          {
            type: "warning",
            title: "No Apostrophe in 'its'",
            text: "The possessive form 'its' has **no apostrophe**: 'The dog wagged its tail'. 'It's' means 'it is'."
          }
        ]
      },
      {
        id: "sec-a1-u1-l2-2",
        type: "examples",
        title: "Real-World Possessive Examples",
        examples: [
          { english: "My new book is very interesting.", phonetic: "/maɪ njuː bʊk ɪz ˈveri ˈɪntrəstɪŋ/", urdu: "میری نئی کتاب بہت دلچسپ ہے۔", audioText: "My new book is very interesting." },
          { english: "What is your telephone number?", phonetic: "/wɒt ɪz jɔːr ˈtelɪfəʊn ˈnʌmbər/", urdu: "آپ کا ٹیلیفون نمبر کیا ہے؟", audioText: "What is your telephone number?" },
          { english: "His father is an experienced engineer.", phonetic: "/hɪz ˈfɑːðər ɪz ən ɪkˈspɪəriənst ˌendʒɪˈnɪər/", urdu: "ان کے والد ایک تجربہ کار انجینئر ہیں۔", audioText: "His father is an experienced engineer." },
          { english: "Her daughter is a student at the medical college.", phonetic: "/hɜːr ˈdɔːtər ɪz ə ˈstjuːdənt æt ðə ˈmedɪkl ˈkɒlɪdʒ/", urdu: "ان کی بیٹی میڈیکل کالج میں طالب علم ہے۔", audioText: "Her daughter is a student at the medical college." },
          { english: "Our family lives in a quiet neighborhood.", phonetic: "/ˈaʊər ˈfæməli lɪvz ɪn ə ˈkwaɪət ˈneɪbəhʊd/", urdu: "ہمارا خاندان ایک پرسکون محلے میں رہتا ہے۔", audioText: "Our family lives in a quiet neighborhood." },
          { english: "Their bags are packed for the journey.", phonetic: "/ðeər bæɡz ɑːr pækt fɔːr ðə ˈdʒɜːni/", urdu: "ان کے بستے سفر کے لیے تیار ہیں۔", audioText: "Their bags are packed for the journey." },
          { english: "The bird returned to its nest before dark.", phonetic: "/ðə bɜːrd rɪˈtɜːnd tuː ɪts nest bɪˈfɔːr dɑːrk/", urdu: "پرندہ اندھیرا ہونے سے پہلے اپنے گھونسلے میں واپس آگیا۔", audioText: "The bird returned to its nest before dark." },
          { english: "Is this your key on the kitchen counter?", phonetic: "/ɪz ðɪs jɔːr kiː ɒn ðə ˈkɪtʃɪn ˈkaʊntər/", urdu: "کیا کچن کے کاؤنٹر پر یہ آپ کی چابی ہے؟", audioText: "Is this your key on the kitchen counter?" }
        ]
      },
      {
        id: "sec-a1-u1-l2-3",
        type: "dialogue",
        title: "Lost Property at the Library",
        dialogue: [
          { speaker: "Librarian", avatar: "L", english: "Excuse me, is this your backpack?", urdu: "معاف کیجیے گا، کیا یہ آپ کا بستہ ہے؟", audioText: "Excuse me, is this your backpack?" },
          { speaker: "Student", avatar: "S", english: "No, that is not my backpack. My bag is blue, not black.", urdu: "نہیں، وہ میرا بستہ نہیں ہے۔ میرا بیگ نیلا ہے، کالا نہیں۔", audioText: "No, that is not my backpack. My bag is blue, not black." },
          { speaker: "Librarian", avatar: "L", english: "Ah, I see. What about these glasses? Are they his?", urdu: "اچھا۔ ان چشموں کے بارے میں کیا خیال ہے؟ کیا یہ اس کے ہیں؟", audioText: "Ah, I see. What about these glasses? Are they his?" },
          { speaker: "Student", avatar: "S", english: "Yes! Those are his glasses. His name is Tariq.", urdu: "جی ہاں! وہ اس کا چشمہ ہے۔ اس کا نام طارق ہے۔", audioText: "Yes! Those are his glasses. His name is Tariq." }
        ]
      },
      {
        id: "sec-a1-u1-l2-4",
        type: "practice",
        title: "Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u1-l2-1",
            type: "mcq",
            skillTag: "possessives",
            prompt: "Fill in the blank: 'Sarah loves reading. _____ favorite author is Charles Dickens.'",
            options: [
              { id: "opt-1", text: "Her" },
              { id: "opt-2", text: "His" },
              { id: "opt-3", text: "She" },
              { id: "opt-4", text: "Its" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Sarah' is female singular, so the possessive adjective is 'Her'.",
            urduExplanation: "سارہ مؤنث ہے، اس لیے 'Her' استعمال ہوگا۔"
          },
          {
            id: "ex-a1-u1-l2-2",
            type: "mcq",
            skillTag: "possessives",
            prompt: "Choose the correct sentence:",
            options: [
              { id: "opt-1", text: "The cat licked it's paw." },
              { id: "opt-2", text: "The cat licked its paw." },
              { id: "opt-3", text: "The cat licked his paw." },
              { id: "opt-4", text: "The cat licked their paw." }
            ],
            correctOptionId: "opt-2",
            explanation: "'its' (without an apostrophe) is the possessive adjective for animals and objects.",
            urduExplanation: "جانوروں اور بے جان چیزوں کے لیے ملکیتی صفت بغیر اپوسٹروفی کے 'its' ہے۔"
          },
          {
            id: "ex-a1-u1-l2-3",
            type: "mcq",
            skillTag: "possessives",
            prompt: "'We are proud of _____ school.' Which word fits best?",
            options: [
              { id: "opt-1", text: "our" },
              { id: "opt-2", text: "we" },
              { id: "opt-3", text: "us" },
              { id: "opt-4", text: "ours" }
            ],
            correctOptionId: "opt-1",
            explanation: "The possessive adjective matching the subject 'We' is 'our'.",
            urduExplanation: "فاعل 'We' کے لیے ملکیتی لفظ 'our' (ہمارا) ہے۔"
          },
          {
            id: "ex-a1-u1-l2-4",
            type: "fill_blank",
            skillTag: "possessives",
            prompt: "I have a new laptop. _____ screen is crystal clear.",
            correctAnswer: "Its",
            acceptableAnswers: ["Its", "its"],
            explanation: "The laptop is an object, so we refer to its screen using possessive 'Its'.",
            urduExplanation: "لیپ ٹاپ کی اسکرین کے لیے 'Its' استعمال ہوگا۔"
          },
          {
            id: "ex-a1-u1-l2-5",
            type: "fill_blank",
            skillTag: "possessives",
            prompt: "Ali forgot _____ keys on the dining table.",
            correctAnswer: "his",
            acceptableAnswers: ["his", "His"],
            explanation: "Ali is male singular, so the possessive adjective is 'his'.",
            urduExplanation: "علی مذکر ہے، اس کے لیے 'his' استعمال ہوگا۔"
          },
          {
            id: "ex-a1-u1-l2-6",
            type: "order_sentence",
            skillTag: "possessives",
            prompt: "Put the words in order:",
            sentenceTokens: ["This", "is", "my", "favorite", "book", "."],
            correctOrder: ["This", "is", "my", "favorite", "book", "."],
            explanation: "Demonstrative (This) + Verb (is) + Possessive (my) + Adjective (favorite) + Noun (book).",
            urduExplanation: "یہ میری پسندیدہ کتاب ہے۔"
          },
          {
            id: "ex-a1-u1-l2-7",
            type: "match_pairs",
            skillTag: "possessives",
            prompt: "Match the subject pronoun with its possessive adjective:",
            pairs: [
              { left: "You", right: "your" },
              { left: "He", right: "his" },
              { left: "They", right: "their" }
            ],
            explanation: "You -> your; He -> his; They -> their.",
            urduExplanation: "You کا your، He کا his، اور They کا their ہے۔"
          },
          {
            id: "ex-a1-u1-l2-8",
            type: "error_correction",
            skillTag: "possessives",
            prompt: "Find and fix the mistake: 'You're coat is hanging on the door.'",
            correctAnswer: "Your coat is hanging on the door.",
            acceptableAnswers: ["Your coat is hanging on the door.", "Your"],
            explanation: "Use possessive 'Your', not contraction 'You're' (you are).",
            urduExplanation: "یہاں ملکیت ظاہر کرنے کے لیے 'Your' آئے گا، نہ کہ 'You're' (You are)۔"
          },
          {
            id: "ex-a1-u1-l2-9",
            type: "true_false",
            skillTag: "possessives",
            prompt: "True or False: 'Their' refers to possession by more than one person.",
            correctAnswer: "True",
            acceptableAnswers: ["True", "true", "T"],
            explanation: "True. 'Their' is the third-person plural possessive adjective.",
            urduExplanation: "درست۔ 'Their' جمع کی ملکیت ظاہر کرتا ہے۔"
          },
          {
            id: "ex-a1-u1-l2-10",
            type: "fill_blank",
            skillTag: "possessives",
            prompt: "We love _____ country very much.",
            correctAnswer: "our",
            acceptableAnswers: ["our", "Our"],
            explanation: "'We' pairs with possessive 'our'.",
            urduExplanation: "'We' کے لیے 'our' آئے گا۔"
          }
        ]
      },
      {
        id: "sec-a1-u1-l2-5",
        type: "quiz",
        title: "Lesson 2 Check Quiz",
        exercises: [
          {
            id: "qz-a1-u1-l2-1",
            type: "mcq",
            skillTag: "possessives",
            prompt: "Which word correctly completes: 'The doctor parked _____ vehicle outside.'?",
            options: [
              { id: "opt-1", text: "his" },
              { id: "opt-2", text: "he" },
              { id: "opt-3", text: "him" },
              { id: "opt-4", text: "himself" }
            ],
            correctOptionId: "opt-1",
            explanation: "Before the noun 'vehicle', use the possessive adjective 'his'.",
            urduExplanation: "اسم 'vehicle' سے پہلے ملکیتی لفظ 'his' آئے گا۔"
          },
          {
            id: "qz-a1-u1-l2-2",
            type: "mcq",
            skillTag: "possessives",
            prompt: "'_____ house is painted white.' Choose the correct word for 'they':",
            options: [
              { id: "opt-1", text: "They're" },
              { id: "opt-2", text: "Their" },
              { id: "opt-3", text: "There" },
              { id: "opt-4", text: "Them" }
            ],
            correctOptionId: "opt-2",
            explanation: "'Their' is the possessive adjective indicating ownership by 'they'.",
            urduExplanation: "ان کے گھر کے لیے 'Their house' آئے گا۔"
          },
          {
            id: "qz-a1-u1-l2-3",
            type: "mcq",
            skillTag: "possessives",
            prompt: "Identify the sentence that has NO error:",
            options: [
              { id: "opt-1", text: "Is this you're phone?" },
              { id: "opt-2", text: "Is this your phone?" },
              { id: "opt-3", text: "Is this yours phone?" },
              { id: "opt-4", text: "Is this you phone?" }
            ],
            correctOptionId: "opt-2",
            explanation: "'your' directly precedes the noun 'phone' without an apostrophe.",
            urduExplanation: "'Is this your phone?' بالکل درست جملہ ہے۔"
          },
          {
            id: "qz-a1-u1-l2-4",
            type: "fill_blank",
            skillTag: "possessives",
            prompt: "Aisha showed me _____ new art drawings.",
            correctAnswer: "her",
            acceptableAnswers: ["her", "Her"],
            explanation: "Aisha is female singular, so use 'her'.",
            urduExplanation: "عائشہ کے لیے 'her' استعمال ہوگا۔"
          },
          {
            id: "qz-a1-u1-l2-5",
            type: "mcq",
            skillTag: "possessives",
            prompt: "Complete the sentence: 'The baby cried for _____ mother.'",
            options: [
              { id: "opt-1", text: "it's" },
              { id: "opt-2", text: "its" },
              { id: "opt-3", text: "their" },
              { id: "opt-4", text: "they" }
            ],
            correctOptionId: "opt-2",
            explanation: "'its' is the possessive form with no apostrophe.",
            urduExplanation: "بغیر اپوسٹروفی کے 'its' درست ہے۔"
          }
        ]
      },
      {
        id: "sec-a1-u1-l2-6",
        type: "urduNote",
        title: "اردو بولنے والوں کے لیے لسانی نکتہ",
        needsNativeReview: true,
        metadata: { needsNativeReview: true, reviewStatus: "pending_native_linguist" },
        urduText: "اردو میں ہم مذکر اور مؤنث کے لیے الگ الفاظ استعمال کرتے ہیں جیسے 'اس کا بھائی' اور 'اس کی بہن'۔\nانگریزی میں ملکیتی صفت کا انحصار مالک (Owner) کی جنس پر ہوتا ہے، نہ کہ چیز کی جنس پر!\n- اگر مالک مرد ہے تو ہمیشہ **his** آئے گا: 'his brother', 'his sister'۔\n- اگر مالک عورت ہے تو ہمیشہ **her** آئے گا: 'her brother', 'her sister'۔\nاردو بولنے والے اکثر مالک کے بجائے چیز کی جنس دیکھ کر کنفیوز ہو جاتے ہیں، اس لیے اس اصول کو ذہن نشین رکھیں۔"
      },
      {
        id: "sec-a1-u1-l2-7",
        type: "summary",
        title: "Lesson 2 Summary Box",
        summaryPoints: [
          "Subject pronouns (I, you, he...) act as sentence subjects.",
          "Possessive adjectives (my, your, his, her, its, our, their) precede nouns to show ownership.",
          "Possessive form determines gender based on the owner (his = male, her = female).",
          "Never confuse possessive 'its' with the contraction 'it's' (it is)."
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 3: Negative Statements & Questions with 'To Be'
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u1-l3",
    level: "A1",
    unit: "unit-1",
    order: 3,
    title: "Negative Statements & Questions with 'To Be'",
    description: "Form negative sentences using 'not' and ask yes/no questions by inverting subject and verb.",
    objectives: [
      "Form negative sentences with 'am not', 'is not (isn't)', and 'are not (aren't)'",
      "Ask questions with 'to be' by placing the verb before the subject",
      "Give natural short affirmative and negative answers (Yes, I am / No, he isn't)"
    ],
    estimatedMinutes: 14,
    prerequisites: ["eng-a1-u1-l1"],
    skillTags: ["verb-to-be", "negatives", "questions"],
    vocabularyList: [
      { word: "tired", partOfSpeech: "adjective", phonetic: "/ˈtaɪəd/", definition: "In need of sleep or rest; weary.", urduMeaning: "تھکا ہوا", exampleSentence: "I am not tired." },
      { word: "hungry", partOfSpeech: "adjective", phonetic: "/ˈhʌŋɡri/", definition: "Feeling or displaying the need for food.", urduMeaning: "بھوکا", exampleSentence: "Are you hungry?" },
      { word: "late", partOfSpeech: "adjective", phonetic: "/leɪt/", definition: "Doing something or taking place after the expected time.", urduMeaning: "دیر سے / تاخیر سے", exampleSentence: "He is not late." },
      { word: "busy", partOfSpeech: "adjective", phonetic: "/ˈbɪzi/", definition: "Having a great deal to do.", urduMeaning: "مصروف", exampleSentence: "She isn't busy right now." },
      { word: "cold", partOfSpeech: "adjective", phonetic: "/kəʊld/", definition: "Of or at a low temperature.", urduMeaning: "سرد / ٹھنڈا", exampleSentence: "It isn't cold today." },
      { word: "here", partOfSpeech: "adverb", phonetic: "/hɪər/", definition: "In, at, or to this place or position.", urduMeaning: "یہاں", exampleSentence: "Is the manager here?" },
      { word: "there", partOfSpeech: "adverb", phonetic: "/ðeər/", definition: "In, at, or to that place or position.", urduMeaning: "وہاں", exampleSentence: "They aren't there." },
      { word: "right", partOfSpeech: "adjective", phonetic: "/raɪt/", definition: "Morally good, justified, or acceptable; correct.", urduMeaning: "صحیح / درست", exampleSentence: "Am I right?" },
      { word: "wrong", partOfSpeech: "adjective", phonetic: "/rɒŋ/", definition: "Not correct or true; incorrect.", urduMeaning: "غلط", exampleSentence: "You are not wrong." },
      { word: "sure", partOfSpeech: "adjective", phonetic: "/ʃɔːr/", definition: "Confident in what one thinks or knows.", urduMeaning: "یقین رکھنے والا", exampleSentence: "Are you sure about this?" }
    ],
    sections: [
      {
        id: "sec-a1-u1-l3-1",
        type: "explain",
        title: "Negatives and Inverted Questions",
        content: "To make a sentence **negative**, add **not** immediately after the verb 'to be':\n- I am **not**\n- He is **not** (He **isn't**)\n- They are **not** (They **aren't**)\n\nTo ask a **question**, invert the subject and the verb (place the verb first):\n- Affirmative: *You are ready.*\n- Question: ***Are you** ready?*",
        tables: [
          {
            title: "Negative Forms & Contractions",
            headers: ["Subject", "Full Negative", "Contracted Form", "Urdu Meaning"],
            rows: [
              ["I", "I am not", "I'm not", "میں نہیں ہوں"],
              ["You", "You are not", "You aren't / You're not", "آپ نہیں ہیں"],
              ["He", "He is not", "He isn't / He's not", "وہ نہیں ہے (مرد)"],
              ["She", "She is not", "She isn't / She's not", "وہ نہیں ہے (عورت)"],
              ["It", "It is not", "It isn't / It's not", "یہ نہیں ہے"],
              ["We", "We are not", "We aren't / We're not", "ہم نہیں ہیں"],
              ["They", "They are not", "They aren't / They're not", "وہ نہیں ہیں"]
            ]
          },
          {
            title: "Questions & Natural Short Answers",
            headers: ["Question", "Short Answer (Yes)", "Short Answer (No)", "Urdu Meaning"],
            rows: [
              ["Are you ready?", "Yes, I am.", "No, I'm not.", "کیا آپ تیار ہیں؟"],
              ["Is he at home?", "Yes, he is.", "No, he isn't.", "کیا وہ گھر پر ہے؟"],
              ["Is she a doctor?", "Yes, she is.", "No, she isn't.", "کیا وہ ڈاکٹر ہیں؟"],
              ["Are they late?", "Yes, they are.", "No, they aren't.", "کیا وہ دیر سے ہیں؟"]
            ]
          }
        ],
        callouts: [
          {
            type: "warning",
            title: "No Contractions in Positive Short Answers",
            text: "Never contract affirmative short answers: say **Yes, I am** (NOT *Yes, I'm*); say **Yes, he is** (NOT *Yes, he's*)."
          },
          {
            type: "tip",
            title: "'Ain't' is Non-Standard",
            text: "You might hear 'ain't' in movies or music, but it is slang. In formal English, always use **am not**, **isn't**, or **aren't**."
          }
        ]
      },
      {
        id: "sec-a1-u1-l3-2",
        type: "examples",
        title: "Negative and Question Sentence Examples",
        examples: [
          { english: "I am not tired after the long journey.", phonetic: "/aɪ æm nɒt ˈtaɪəd ˈɑːftər ðə lɒŋ ˈdʒɜːni/", urdu: "طویل سفر کے بعد میں تھکا ہوا نہیں ہوں۔", audioText: "I am not tired after the long journey." },
          { english: "Are you hungry? There is food on the table.", phonetic: "/ɑːr juː ˈhʌŋɡri ðeər ɪz fuːd ɒn ðə ˈteɪbl/", urdu: "کیا آپ کو بھوک لگی ہے؟ میز پر کھانا موجود ہے۔", audioText: "Are you hungry? There is food on the table." },
          { english: "She isn't busy; she can speak with you now.", phonetic: "/ʃiː ˈɪznt ˈbɪzi ʃiː kæn spiːk wɪð juː naʊ/", urdu: "وہ مصروف نہیں ہیں؛ وہ ابھی آپ سے بات کر سکتی ہیں۔", audioText: "She isn't busy; she can speak with you now." },
          { english: "Is the bank open on Saturday mornings?", phonetic: "/ɪz ðə bæŋk ˈəʊpən ɒn ˈsætədeɪ ˈmɔːrnɪŋz/", urdu: "کیا ہفتے کی صبح بینک کھلا ہوتا ہے؟", audioText: "Is the bank open on Saturday mornings?" },
          { english: "We aren't late for the train.", phonetic: "/wiː ˈɑːnt leɪt fɔːr ðə treɪn/", urdu: "ہماری ٹرین کے لیے دیر نہیں ہوئی ہے۔", audioText: "We aren't late for the train." },
          { english: "They are not at home right now.", phonetic: "/ðeɪ ɑːr nɒt æt həʊm raɪt naʊ/", urdu: "وہ اس وقت گھر پر نہیں ہیں۔", audioText: "They are not at home right now." },
          { english: "Is it cold outside this evening?", phonetic: "/ɪz ɪt kəʊld ˌaʊtˈsaɪd ðɪs ˈiːvnɪŋ/", urdu: "کیا آج شام باہر سردی ہے؟", audioText: "Is it cold outside this evening?" },
          { english: "Are you sure about your decision?", phonetic: "/ɑːr juː ʃɔːr əˈbaʊt jɔːr dɪˈsɪʒn/", urdu: "کیا آپ کو اپنے فیصلے پر یقین ہے؟", audioText: "Are you sure about your decision?" }
        ]
      },
      {
        id: "sec-a1-u1-l3-3",
        type: "dialogue",
        title: "Checking In at Reception",
        dialogue: [
          { speaker: "Receptionist", avatar: "R", english: "Good morning! Are you Mr. Kamal?", urdu: "صبح بخیر! کیا آپ مسٹر کمال ہیں؟", audioText: "Good morning! Are you Mr. Kamal?" },
          { speaker: "Visitor", avatar: "V", english: "No, I am not. I am Tariq Aziz. Is Mr. Bilal in his office?", urdu: "نہیں، میں نہیں۔ میں طارق عزیز ہوں۔ کیا مسٹر بلال اپنے دفتر میں ہیں؟", audioText: "No, I am not. I am Tariq Aziz. Is Mr. Bilal in his office?" },
          { speaker: "Receptionist", avatar: "R", english: "Yes, he is. He isn't in a meeting right now. Please go in.", urdu: "جی ہاں، وہ ہیں۔ وہ اس وقت کسی میٹنگ میں نہیں ہیں۔ تشریف لے جائیے۔", audioText: "Yes, he is. He isn't in a meeting right now. Please go in." },
          { speaker: "Visitor", avatar: "V", english: "Thank you very much!", urdu: "آپ کا بہت شکریہ!", audioText: "Thank you very much!" }
        ]
      },
      {
        id: "sec-a1-u1-l3-4",
        type: "practice",
        title: "Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u1-l3-1",
            type: "mcq",
            skillTag: "questions",
            prompt: "Turn this into a question: 'You are an engineer.'",
            options: [
              { id: "opt-1", text: "Are you an engineer?" },
              { id: "opt-2", text: "You are an engineer?" },
              { id: "opt-3", text: "Is you an engineer?" },
              { id: "opt-4", text: "Be you an engineer?" }
            ],
            correctOptionId: "opt-1",
            explanation: "Invert the subject and verb: 'Are' precedes 'you'.",
            urduExplanation: "سوال بنانے کے لیے فعل 'Are' کو فاعل 'you' سے پہلے لائیں۔"
          },
          {
            id: "ex-a1-u1-l3-2",
            type: "mcq",
            skillTag: "negatives",
            prompt: "Choose the correct negative sentence:",
            options: [
              { id: "opt-1", text: "She not is a teacher." },
              { id: "opt-2", text: "She isn't a teacher." },
              { id: "opt-3", text: "She no is a teacher." },
              { id: "opt-4", text: "She aren't a teacher." }
            ],
            correctOptionId: "opt-2",
            explanation: "'isn't' is the correct negative contraction for 'is not'.",
            urduExplanation: "'isn't' درست منفی شکل ہے۔"
          },
          {
            id: "ex-a1-u1-l3-3",
            type: "fill_blank",
            skillTag: "negatives",
            prompt: "We _____ (not be) ready to leave yet.",
            correctAnswer: "aren't",
            acceptableAnswers: ["aren't", "are not"],
            explanation: "The plural subject 'We' takes 'aren't' or 'are not'.",
            urduExplanation: "'We' کے ساتھ منفی شکل 'aren't' یا 'are not' بنتی ہے۔"
          },
          {
            id: "ex-a1-u1-l3-4",
            type: "fill_blank",
            skillTag: "questions",
            prompt: "_____ (be) your sister at the library today?",
            correctAnswer: "Is",
            acceptableAnswers: ["Is", "is"],
            explanation: "'Your sister' is singular, so the question begins with 'Is'.",
            urduExplanation: "'Your sister' واحد ہے، اس لیے سوال 'Is' سے شروع ہوگا۔"
          },
          {
            id: "ex-a1-u1-l3-5",
            type: "order_sentence",
            skillTag: "questions",
            prompt: "Arrange the words to form a question:",
            sentenceTokens: ["Is", "the", "train", "on", "time", "?"],
            correctOrder: ["Is", "the", "train", "on", "time", "?"],
            explanation: "Verb (Is) + Subject (the train) + Prepositional phrase (on time)?",
            urduExplanation: "کیا ٹرین وقت پر ہے؟"
          },
          {
            id: "ex-a1-u1-l3-6",
            type: "error_correction",
            skillTag: "negatives",
            prompt: "Correct the sentence: 'I aren't tired.'",
            correctAnswer: "I am not tired.",
            acceptableAnswers: ["I am not tired.", "I'm not tired.", "am not"],
            explanation: "The pronoun 'I' must take 'am not' (or 'I'm not'), never 'aren't'.",
            urduExplanation: "'I' کے ساتھ 'am not' آتا ہے، 'aren't' نہیں۔"
          },
          {
            id: "ex-a1-u1-l3-7",
            type: "match_pairs",
            skillTag: "questions",
            prompt: "Match the question with the natural short answer:",
            pairs: [
              { left: "Are you hungry?", right: "Yes, I am." },
              { left: "Is he at work?", right: "No, he isn't." },
              { left: "Are they Pakistani?", right: "Yes, they are." }
            ],
            explanation: "Match the subject pronoun in the answer to the subject in the question.",
            urduExplanation: "سوال کے فاعل کے مطابق مختصر جواب ملاؤ۔"
          },
          {
            id: "ex-a1-u1-l3-8",
            type: "true_false",
            skillTag: "questions",
            prompt: "True or False: In a positive short answer, you can contract the verb: 'Yes, I'm.'",
            correctAnswer: "False",
            acceptableAnswers: ["False", "false", "F"],
            explanation: "False. In affirmative short answers, always use the full form: 'Yes, I am.'",
            urduExplanation: "غلط۔ مثبت مختصر جواب میں مکمل فارم 'Yes, I am' کہنا لازمی ہے۔"
          },
          {
            id: "ex-a1-u1-l3-9",
            type: "mcq",
            skillTag: "questions",
            prompt: "Complete the response: 'Is your father a doctor?' - 'No, _____.'",
            options: [
              { id: "opt-1", text: "he isn't" },
              { id: "opt-2", text: "he aren't" },
              { id: "opt-3", text: "he not is" },
              { id: "opt-4", text: "he doesn't" }
            ],
            correctOptionId: "opt-1",
            explanation: "'he isn't' is the grammatically correct negative short answer.",
            urduExplanation: "مختصر منفی جواب 'No, he isn't' ہوگا۔"
          },
          {
            id: "ex-a1-u1-l3-10",
            type: "fill_blank",
            skillTag: "negatives",
            prompt: "The keys _____ (not be) on the kitchen table.",
            correctAnswer: "aren't",
            acceptableAnswers: ["aren't", "are not"],
            explanation: "Plural subject 'keys' takes 'aren't'.",
            urduExplanation: "جمع اسم 'keys' کے ساتھ 'aren't' آئے گا۔"
          }
        ]
      },
      {
        id: "sec-a1-u1-l3-5",
        type: "quiz",
        title: "Lesson 3 Check Quiz",
        exercises: [
          {
            id: "qz-a1-u1-l3-1",
            type: "mcq",
            skillTag: "questions",
            prompt: "Which question is formed correctly?",
            options: [
              { id: "opt-1", text: "Where you are?" },
              { id: "opt-2", text: "Are you from Lahore?" },
              { id: "opt-3", text: "You are happy?" },
              { id: "opt-4", text: "Is they ready?" }
            ],
            correctOptionId: "opt-2",
            explanation: "'Are you from Lahore?' properly inverts the verb 'Are' before subject 'you'.",
            urduExplanation: "'Are you from Lahore?' سوالیہ جملے کی درست ساخت ہے۔"
          },
          {
            id: "qz-a1-u1-l3-2",
            type: "mcq",
            skillTag: "negatives",
            prompt: "What is the negative of 'He is in London'?",
            options: [
              { id: "opt-1", text: "He isn't in London." },
              { id: "opt-2", text: "He not is in London." },
              { id: "opt-3", text: "He aren't in London." },
              { id: "opt-4", text: "He am not in London." }
            ],
            correctOptionId: "opt-1",
            explanation: "'He isn't in London' is the correct contracted negative.",
            urduExplanation: "'He isn't in London' درست منفی جملہ ہے۔"
          },
          {
            id: "qz-a1-u1-l3-3",
            type: "mcq",
            skillTag: "questions",
            prompt: "Answer: 'Are your parents teachers?' - 'Yes, _____.'",
            options: [
              { id: "opt-1", text: "they're" },
              { id: "opt-2", text: "they are" },
              { id: "opt-3", text: "we are" },
              { id: "opt-4", text: "they is" }
            ],
            correctOptionId: "opt-2",
            explanation: "Affirmative short answers must use the full form: 'Yes, they are.'",
            urduExplanation: "مثبت جواب میں اختصار نہیں ہو سکتا، 'Yes, they are' درست ہے۔"
          },
          {
            id: "qz-a1-u1-l3-4",
            type: "fill_blank",
            skillTag: "questions",
            prompt: "_____ you sure about the address?",
            correctAnswer: "Are",
            acceptableAnswers: ["Are", "are"],
            explanation: "Questions with 'you' begin with 'Are'.",
            urduExplanation: "'you' کے سوال کے لیے شروع میں 'Are' آئے گا۔"
          },
          {
            id: "qz-a1-u1-l3-5",
            type: "mcq",
            skillTag: "negatives",
            prompt: "Which sentence expresses negative correctly?",
            options: [
              { id: "opt-1", text: "I'm not hungry." },
              { id: "opt-2", text: "I amn't hungry." },
              { id: "opt-3", text: "I are not hungry." },
              { id: "opt-4", text: "I is not hungry." }
            ],
            correctOptionId: "opt-1",
            explanation: "'I'm not' is the only standard contracted negative for the first person.",
            urduExplanation: "'I'm not hungry' درست جملہ ہے۔"
          }
        ]
      },
      {
        id: "sec-a1-u1-l3-6",
        type: "urduNote",
        title: "اردو بولنے والوں کے لیے اہم ہدایت",
        needsNativeReview: true,
        metadata: { needsNativeReview: true, reviewStatus: "pending_native_linguist" },
        urduText: "اردو میں سوال بنانے کے لیے ہم صرف لفظ 'کیا' کا اضافہ کرتے ہیں، مثلاً: 'آپ تیار ہیں' سے 'کیا آپ تیار ہیں؟'۔ جملے کے باقی الفاظ کی ترتیب نہیں بدلتی۔\nلیکن انگریزی میں 'Inversion' (ترتیب کی تبدیلی) لازمی ہے! آپ کو فعل (Are/Is) کو فاعل سے پہلے لانا ہوتا ہے: 'You are ready' تبدیل ہو کر '**Are you** ready?' بن جاتا ہے۔\nبول چال میں سر ہلا کر یا لہجہ اونچا کر کے 'You are ready?' کہنا عام فہم تو ہو سکتا ہے، لیکن معیاری انگریزی میں فعل کو پہلے لانا لازمی ہے۔"
      },
      {
        id: "sec-a1-u1-l3-7",
        type: "summary",
        title: "Lesson 3 Summary Box",
        summaryPoints: [
          "Negatives are formed by adding 'not' after am/is/are (I'm not, he isn't, they aren't).",
          "Yes/No questions invert the subject and verb (Am I?, Is he?, Are you?).",
          "Never contract affirmative short answers (always 'Yes, I am' or 'Yes, they are').",
          "Contracted negative short answers are natural: 'No, he isn't' or 'No, we aren't'."
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 4: Everyday Greetings & Farewells
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u1-l4",
    level: "A1",
    unit: "unit-1",
    order: 4,
    title: "Everyday Greetings, Introductions & Farewells",
    description: "Learn formal and informal greetings, asking how someone is, and polite farewells.",
    objectives: [
      "Greet people appropriately depending on the time of day and level of formality",
      "Ask 'How are you?' and respond with polite conversational phrases",
      "Say goodbye formally and casually"
    ],
    estimatedMinutes: 10,
    prerequisites: ["eng-a1-u1-l1"],
    skillTags: ["greetings", "communication", "introductions"],
    vocabularyList: [
      { word: "morning", partOfSpeech: "noun", phonetic: "/ˈmɔːnɪŋ/", definition: "The period of time between midnight and noon, especially from sunrise to noon.", urduMeaning: "صبح", exampleSentence: "Good morning, everyone!" },
      { word: "afternoon", partOfSpeech: "noun", phonetic: "/ˌɑːftəˈnuːn/", definition: "The time from noon or lunchtime to evening.", urduMeaning: "دوپہر / سہ پہر", exampleSentence: "Good afternoon, sir." },
      { word: "evening", partOfSpeech: "noun", phonetic: "/ˈiːvnɪŋ/", definition: "The period of time at the end of the day.", urduMeaning: "شام", exampleSentence: "Good evening, ladies and gentlemen." },
      { word: "night", partOfSpeech: "noun", phonetic: "/naɪt/", definition: "The period from sunset to sunrise in each twenty-four hours.", urduMeaning: "رات", exampleSentence: "Good night, sleep well." },
      { word: "fine", partOfSpeech: "adjective", phonetic: "/faɪn/", definition: "In good health and spirits.", urduMeaning: "ٹھیک / خیریت سے", exampleSentence: "I am fine, thank you." },
      { word: "great", partOfSpeech: "adjective", phonetic: "/ɡreɪt/", definition: "Of an extent, amount, or intensity considerably above normal; wonderful.", urduMeaning: "بہترین / زبردست", exampleSentence: "Everything is great." },
      { word: "please", partOfSpeech: "adverb", phonetic: "/pliːz/", definition: "Used in polite requests or questions.", urduMeaning: "براہ کرم / مہربانی فرما کر", exampleSentence: "Please come in." },
      { word: "thank", partOfSpeech: "verb", phonetic: "/θæŋk/", definition: "Express gratitude to someone.", urduMeaning: "شکریہ ادا کرنا", exampleSentence: "Thank you for your help." },
      { word: "sorry", partOfSpeech: "adjective", phonetic: "/ˈsɒri/", definition: "Feeling regret or sorrow.", urduMeaning: "معذرت خواہ", exampleSentence: "I am sorry for the delay." },
      { word: "tomorrow", partOfSpeech: "noun", phonetic: "/təˈmɒrəʊ/", definition: "On the day after today.", urduMeaning: "کل (آنے والا)", exampleSentence: "See you tomorrow!" }
    ],
    sections: [
      {
        id: "sec-a1-u1-l4-1",
        type: "explain",
        title: "Greeting Conventions by Time of Day",
        content: "In English, greetings vary depending on whether you are in a formal setting (e.g. at an interview, office, or university) or an informal setting (with friends or family).\n\nAdditionally, greetings change according to the **time of day**.",
        tables: [
          {
            title: "Time-Based Formal Greetings",
            headers: ["Time Window", "Greeting", "Typical Context", "Urdu Meaning"],
            rows: [
              ["Sunrise to 12:00 PM", "Good morning", "Offices, classes, formal meetings", "صبح بخیر"],
              ["12:00 PM to ~5:00 PM", "Good afternoon", "Workplaces, shops, clinics", "دوپہر بخیر"],
              ["5:00 PM onwards", "Good evening", "Dinner gatherings, arrivals", "شام بخیر"],
              ["Departure / Bedtime only", "Good night", "Saying goodbye before sleep", "شب بخیر (صرف رخصتی پر)"]
            ]
          },
          {
            title: "Asking 'How are you?' & Polite Replies",
            headers: ["Question", "Formality", "Natural Replies", "Urdu Meaning"],
            rows: [
              ["How are you?", "Neutral / Formal", "I am fine, thank you. And you?", "آپ کیسے ہیں؟"],
              ["How's it going?", "Informal", "Great, thanks! / Not bad.", "سب کیسا چل رہا ہے؟"],
              ["Nice to meet you.", "First meeting", "Nice to meet you too.", "آپ سے مل کر خوشی ہوئی۔"]
            ]
          }
        ],
        callouts: [
          {
            type: "warning",
            title: "Never Greet with 'Good night'",
            text: "'Good night' is **only** used when leaving or going to bed, never when meeting someone in the evening! When arriving at 8:00 PM, always say **Good evening**."
          },
          {
            type: "tip",
            title: "Polite Return Question",
            text: "When someone asks 'How are you?', it is customary to answer and then return the courtesy: 'I'm very well, thank you. **How about you?**'"
          }
        ]
      },
      {
        id: "sec-a1-u1-l4-2",
        type: "examples",
        title: "Dialogue & Conversational Examples",
        examples: [
          { english: "Good morning, Mr. David. How are you today?", phonetic: "/ɡʊd ˈmɔːnɪŋ ˈmɪstər ˈdeɪvɪd haʊ ɑːr juː təˈdeɪ/", urdu: "صبح بخیر مسٹر ڈیوڈ، آج آپ کیسے ہیں؟", audioText: "Good morning, Mr. David. How are you today?" },
          { english: "I am doing very well, thank you for asking.", phonetic: "/aɪ æm ˈduːɪŋ ˈveri wel θæŋk juː fɔːr ˈɑːskɪŋ/", urdu: "میں بالکل خیریت سے ہوں، پوچھنے کا شکریہ۔", audioText: "I am doing very well, thank you for asking." },
          { english: "Good afternoon, ladies and gentlemen. Welcome to the conference.", phonetic: "/ɡʊd ˌɑːftəˈnuːn ˈleɪdiz ænd ˈdʒentlmen ˈwelkəm tuː ðə ˈkɒnfərəns/", urdu: "سہ پہر بخیر، کانفرنس میں آپ سب کو خوش آمدید۔", audioText: "Good afternoon, ladies and gentlemen. Welcome to the conference." },
          { english: "See you tomorrow morning at nine o'clock.", phonetic: "/siː juː təˈmɒrəʊ ˈmɔːnɪŋ æt naɪn əˈklɒk/", urdu: "کل صبح نو بجے ملاقات ہوگی۔", audioText: "See you tomorrow morning at nine o'clock." },
          { english: "Good night, have a restful sleep.", phonetic: "/ɡʊd naɪt hæv ə ˈrestfl sliːp/", urdu: "شب بخیر، پرسکون نیند لیں۔", audioText: "Good night, have a restful sleep." },
          { english: "It was a pleasure meeting you today.", phonetic: "/ɪt wɒz ə ˈpleʒər ˈmiːtɪŋ juː təˈdeɪ/", urdu: "آج آپ سے مل کر بہت خوشی ہوئی۔", audioText: "It was a pleasure meeting you today." }
        ]
      },
      {
        id: "sec-a1-u1-l4-3",
        type: "dialogue",
        title: "Meeting a New Colleague",
        dialogue: [
          { speaker: "Adnan", avatar: "A", english: "Good morning! My name is Adnan. I'm the new accounts officer.", urdu: "صبح بخیر! میرا نام عدنان ہے۔ میں نیا اکاؤنٹس آفیسر ہوں۔", audioText: "Good morning! My name is Adnan. I'm the new accounts officer." },
          { speaker: "Farah", avatar: "F", english: "Welcome to the team, Adnan! I'm Farah. Pleased to meet you.", urdu: "ٹیم میں خوش آمدید، عدنان! میں فرح ہوں۔ آپ سے مل کر خوشی ہوئی۔", audioText: "Welcome to the team, Adnan! I'm Farah. Pleased to meet you." },
          { speaker: "Adnan", avatar: "A", english: "Pleased to meet you too, Farah. Have a wonderful day!", urdu: "مجھے بھی آپ سے مل کر خوشی ہوئی، فرح۔ آپ کا دن اچھا گزرے!", audioText: "Pleased to meet you too, Farah. Have a wonderful day!" }
        ]
      },
      {
        id: "sec-a1-u1-l4-4",
        type: "practice",
        title: "Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u1-l4-1",
            type: "mcq",
            skillTag: "greetings",
            prompt: "You arrive at an office meeting at 7:00 PM. What is the correct greeting?",
            options: [
              { id: "opt-1", text: "Good evening" },
              { id: "opt-2", text: "Good night" },
              { id: "opt-3", text: "Good morning" },
              { id: "opt-4", text: "Goodbye" }
            ],
            correctOptionId: "opt-1",
            explanation: "When arriving in the evening, say 'Good evening'. 'Good night' is only for departure or sleep.",
            urduExplanation: "شام کے وقت پہنچنے پر 'Good evening' کہتے ہیں، 'Good night' صرف رخصت ہونے کے لیے ہے۔"
          },
          {
            id: "ex-a1-u1-l4-2",
            type: "mcq",
            skillTag: "greetings",
            prompt: "Someone says: 'How do you do?' What is the traditional polite reply?",
            options: [
              { id: "opt-1", text: "How do you do?" },
              { id: "opt-2", text: "I do fine." },
              { id: "opt-3", text: "Yes, I do." },
              { id: "opt-4", text: "At home." }
            ],
            correctOptionId: "opt-1",
            explanation: "In formal English, the traditional reply to 'How do you do?' is 'How do you do?' or 'Pleasure to meet you.'",
            urduExplanation: "رسمی تعارف میں 'How do you do?' کا روایتی جواب 'How do you do?' ہی ہوتا ہے۔"
          },
          {
            id: "ex-a1-u1-l4-3",
            type: "fill_blank",
            skillTag: "greetings",
            prompt: "Nice to _____ you, Mr. Khan.",
            correctAnswer: "meet",
            acceptableAnswers: ["meet"],
            explanation: "'Nice to meet you' is standard polite social convention upon meeting someone.",
            urduExplanation: "'Nice to meet you' آپ سے مل کر خوشی ہوئی۔"
          },
          {
            id: "ex-a1-u1-l4-4",
            type: "order_sentence",
            skillTag: "greetings",
            prompt: "Arrange the words to form a polite farewell:",
            sentenceTokens: ["See", "you", "tomorrow", "afternoon", "."],
            correctOrder: ["See", "you", "tomorrow", "afternoon", "."],
            explanation: "'See you tomorrow afternoon' is a natural friendly farewell.",
            urduExplanation: "کل دوپہر آپ سے ملاقات ہوگی۔"
          },
          {
            id: "ex-a1-u1-l4-5",
            type: "match_pairs",
            skillTag: "greetings",
            prompt: "Match the greeting with the appropriate time of day:",
            pairs: [
              { left: "8:00 AM", right: "Good morning" },
              { left: "2:00 PM", right: "Good afternoon" },
              { left: "6:30 PM", right: "Good evening" }
            ],
            explanation: "Time of day dictates morning (AM), afternoon (early PM), and evening (late PM).",
            urduExplanation: "وقت کے مطابق سلام کا انتخاب کریں۔"
          },
          {
            id: "ex-a1-u1-l4-6",
            type: "true_false",
            skillTag: "greetings",
            prompt: "True or False: 'Good night' can be used to say hello to someone after dark.",
            correctAnswer: "False",
            acceptableAnswers: ["False", "false", "F"],
            explanation: "False. 'Good night' is strictly a farewell.",
            urduExplanation: "غلط۔ 'Good night' کبھی بھی سلام کے طور پر استعمال نہیں ہوتا، صرف رخصتی پر بولا جاتا ہے۔"
          },
          {
            id: "ex-a1-u1-l4-7",
            type: "error_correction",
            skillTag: "greetings",
            prompt: "Correct the greeting at 9:00 AM: 'Good afternoon, teacher.'",
            correctAnswer: "Good morning, teacher.",
            acceptableAnswers: ["Good morning, teacher.", "Good morning"],
            explanation: "At 9:00 AM, the correct greeting is 'Good morning'.",
            urduExplanation: "صبح 9 بجے 'Good morning' کہا جاتا ہے۔"
          },
          {
            id: "ex-a1-u1-l4-8",
            type: "fill_blank",
            skillTag: "greetings",
            prompt: "I am fine, thank you. How _____ you?",
            correctAnswer: "about",
            acceptableAnswers: ["about", "are"],
            explanation: "'How about you?' or 'How are you?' politely returns the inquiry.",
            urduExplanation: "'How about you?' آپ اپنے بارے میں بتائیے۔"
          },
          {
            id: "ex-a1-u1-l4-9",
            type: "mcq",
            skillTag: "greetings",
            prompt: "Which phrase means 'I am sorry'?",
            options: [
              { id: "opt-1", text: "Excuse me / My apologies" },
              { id: "opt-2", text: "You are welcome" },
              { id: "opt-3", text: "Good afternoon" },
              { id: "opt-4", text: "Nice to see you" }
            ],
            correctOptionId: "opt-1",
            explanation: "'My apologies' or 'Excuse me' expresses regret or polite apology.",
            urduExplanation: "معذرت کے لیے 'Excuse me' یا 'My apologies' بولا جاتا ہے۔"
          },
          {
            id: "ex-a1-u1-l4-10",
            type: "fill_blank",
            skillTag: "greetings",
            prompt: "Have a _____ weekend!",
            correctAnswer: "great",
            acceptableAnswers: ["great", "good", "nice", "wonderful"],
            explanation: "'Have a great weekend' is a typical Friday farewell.",
            urduExplanation: "'Have a great weekend' اچھا ویک اینڈ گزرے۔"
          }
        ]
      },
      {
        id: "sec-a1-u1-l4-5",
        type: "quiz",
        title: "Lesson 4 Check Quiz",
        exercises: [
          {
            id: "qz-a1-u1-l4-1",
            type: "mcq",
            skillTag: "greetings",
            prompt: "Which greeting is used at 1:30 PM?",
            options: [
              { id: "opt-1", text: "Good morning" },
              { id: "opt-2", text: "Good afternoon" },
              { id: "opt-3", text: "Good night" },
              { id: "opt-4", text: "Goodbye" }
            ],
            correctOptionId: "opt-2",
            explanation: "1:30 PM is between 12:00 PM and evening, so 'Good afternoon' is correct.",
            urduExplanation: "دوپہر 1:30 بجے 'Good afternoon' کہتے ہیں۔"
          },
          {
            id: "qz-a1-u1-l4-2",
            type: "mcq",
            skillTag: "greetings",
            prompt: "When parting company at the end of the day, which phrase is appropriate?",
            options: [
              { id: "opt-1", text: "Have a good evening!" },
              { id: "opt-2", text: "Good morning!" },
              { id: "opt-3", text: "Nice to meet you" },
              { id: "opt-4", text: "How are you?" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Have a good evening!' is a polite farewell upon leaving.",
            urduExplanation: "'Have a good evening!' رخصت ہوتے وقت ایک شائستہ جملہ ہے۔"
          },
          {
            id: "qz-a1-u1-l4-3",
            type: "fill_blank",
            skillTag: "greetings",
            prompt: "See you _____ Friday!",
            correctAnswer: "on",
            acceptableAnswers: ["on"],
            explanation: "Days of the week take the preposition 'on': 'on Friday'.",
            urduExplanation: "ہفتے کے دنوں کے ساتھ 'on' آتا ہے۔"
          },
          {
            id: "qz-a1-u1-l4-4",
            type: "mcq",
            skillTag: "greetings",
            prompt: "What is the polite reply to 'Thank you very much'?",
            options: [
              { id: "opt-1", text: "You're welcome." },
              { id: "opt-2", text: "Yes, I am." },
              { id: "opt-3", text: "Good night." },
              { id: "opt-4", text: "I'm fine." }
            ],
            correctOptionId: "opt-1",
            explanation: "'You're welcome' is the standard polite response to thanks.",
            urduExplanation: "شکریے کا جواب 'You're welcome' دیا جاتا ہے۔"
          },
          {
            id: "qz-a1-u1-l4-5",
            type: "mcq",
            skillTag: "greetings",
            prompt: "Choose the correct phrase for introducing yourself to a crowd:",
            options: [
              { id: "opt-1", text: "My name is Bilal, and I am glad to meet everyone." },
              { id: "opt-2", text: "Me is Bilal, and I am here for the evening event." },
              { id: "opt-3", text: "I name Bilal, and I came from the downtown area." },
              { id: "opt-4", text: "Mine name is Bilal, and I want to say hello here." }
            ],
            correctOptionId: "opt-1",
            explanation: "'My name is Bilal...' follows proper grammar and formal tone.",
            urduExplanation: "اپنا تعارف کروانے کے لیے 'My name is...' درست طریقہ ہے۔"
          }
        ]
      },
      {
        id: "sec-a1-u1-l4-6",
        type: "urduNote",
        title: "اردو بولنے والوں کے لیے سماجی و لسانی رہنمائی",
        needsNativeReview: true,
        metadata: { needsNativeReview: true, reviewStatus: "pending_native_linguist" },
        urduText: "ہماری ثقافت میں دن کے ہر وقت 'السلام علیکم' کہا جاتا ہے، جو دن اور رات دونوں کے لیے موزوں ہے۔\nانگریزی میں وقت کے لحاظ سے سلام بدلتا ہے: صبح 12 بجے تک **Good morning**، 12 سے 5 بجے تک **Good afternoon**، اور شام کے وقت **Good evening**۔\nایک عام غلطی یہ ہوتی ہے کہ لوگ رات کو کسی سے ملتے ہی 'Good night' کہہ دیتے ہیں۔ یاد رکھیں، Good night صرف الوداع (رخصتی) کے لیے بولا جاتا ہے!"
      },
      {
        id: "sec-a1-u1-l4-7",
        type: "summary",
        title: "Lesson 4 Summary Box",
        summaryPoints: [
          "Use time-appropriate greetings: Good morning (AM), Good afternoon (12-5 PM), Good evening (PM).",
          "Never say 'Good night' when arriving; reserve it exclusively for departure or bedtime.",
          "When asked 'How are you?', answer politely ('I'm fine, thank you') and ask in return.",
          "Standard farewells: Goodbye, See you tomorrow, Have a nice day."
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // LESSON 5: Countries, Nationalities & Languages
  // -------------------------------------------------------------------------
  {
    id: "eng-a1-u1-l5",
    level: "A1",
    unit: "unit-1",
    order: 5,
    title: "Countries, Nationalities & Languages",
    description: "Learn how to ask where someone is from and state countries, nationalities, and spoken languages.",
    objectives: [
      "Ask 'Where are you from?' and answer with 'I am from... / I am...'",
      "Distinguish between a country (noun) and a nationality (adjective)",
      "Always capitalize country names, nationalities, and languages in writing"
    ],
    estimatedMinutes: 12,
    prerequisites: ["eng-a1-u1-l1"],
    skillTags: ["countries", "nationalities", "vocabulary"],
    vocabularyList: [
      { word: "country", partOfSpeech: "noun", phonetic: "/ˈkʌntri/", definition: "A nation with its own government, occupying a particular territory.", urduMeaning: "ملک / وطن", exampleSentence: "Pakistan is a beautiful country." },
      { word: "language", partOfSpeech: "noun", phonetic: "/ˈlæŋɡwɪdʒ/", definition: "The method of human communication, either spoken or written.", urduMeaning: "زبان", exampleSentence: "English is a global language." },
      { word: "world", partOfSpeech: "noun", phonetic: "/wɜːld/", definition: "The earth, together with all of its countries and peoples.", urduMeaning: "دنیا / عالم", exampleSentence: "People from all over the world learn English." },
      { word: "speak", partOfSpeech: "verb", phonetic: "/spiːk/", definition: "Say something in order to convey information or express a feeling.", urduMeaning: "بولنا", exampleSentence: "I speak Urdu and English." },
      { word: "live", partOfSpeech: "verb", phonetic: "/lɪv/", definition: "Remain alive; make one's home in a particular place.", urduMeaning: "رہنا / سکونت اختیار کرنا", exampleSentence: "They live in London." },
      { word: "from", partOfSpeech: "preposition", phonetic: "/frɒm/", definition: "Indicating the point in space at which a journey or motion starts.", urduMeaning: "سے", exampleSentence: "Where are you from?" },
      { word: "capital", partOfSpeech: "noun", phonetic: "/ˈkæpɪtl/", definition: "The most important city or town of a country or region.", urduMeaning: "دارالحکومت", exampleSentence: "Islamabad is the capital of Pakistan." },
      { word: "people", partOfSpeech: "noun", phonetic: "/ˈpiːpl/", definition: "Human beings in general or considered collectively.", urduMeaning: "لوگ / قوم", exampleSentence: "The people are hospitable." },
      { word: "travel", partOfSpeech: "verb", phonetic: "/ˈtrævl/", definition: "Make a journey, typically of some length.", urduMeaning: "سفر کرنا", exampleSentence: "We love to travel abroad." },
      { word: "visit", partOfSpeech: "verb", phonetic: "/ˈvɪzɪt/", definition: "Go to see and spend time with someone socially.", urduMeaning: "ملاقات کرنا / سیر کرنا", exampleSentence: "I want to visit Turkey." }
    ],
    sections: [
      {
        id: "sec-a1-u1-l5-1",
        type: "explain",
        title: "Country vs. Nationality vs. Language",
        content: "When discussing origins, notice the difference between three categories:\n1. **Country**: The name of the nation (e.g. *Pakistan, Canada, Turkey*).\n2. **Nationality**: The adjective describing the person (e.g. *Pakistani, Canadian, Turkish*).\n3. **Language**: What people speak (e.g. *Urdu, English, Turkish*).\n\n**Always capitalize** countries, nationalities, and languages in English!",
        tables: [
          {
            title: "Common Countries, Nationalities & Languages",
            headers: ["Country", "Nationality (Person)", "Main Language", "Example Sentence"],
            rows: [
              ["Pakistan", "Pakistani", "Urdu", "I am from Pakistan; I am Pakistani."],
              ["United Kingdom", "British", "English", "She is British; she speaks English."],
              ["United States", "American", "English", "He is from the US; he is American."],
              ["Canada", "Canadian", "English & French", "They are Canadian."],
              ["Turkey", "Turkish", "Turkish", "Istanbul is a Turkish city."],
              ["Saudi Arabia", "Saudi", "Arabic", "They speak Arabic in Saudi Arabia."],
              ["China", "Chinese", "Mandarin", "Beijing is in China; she is Chinese."]
            ]
          },
          {
            title: "Asking About Origins",
            headers: ["Question", "Grammar Structure", "Sample Answer"],
            rows: [
              ["Where are you from?", "Where + are + you + from?", "I am from Lahore, Pakistan."],
              ["What is your nationality?", "What + is + possessive + nationality?", "I am Pakistani."],
              ["What languages do you speak?", "What languages + do + you + speak?", "I speak Urdu, Punjabi, and English."]
            ]
          }
        ],
        callouts: [
          {
            type: "warning",
            title: "Capitalization is Mandatory",
            text: "Never write 'english' or 'pakistan' with a lower-case letter. In English, proper nouns are strictly capitalized: **English**, **Pakistan**, **Urdu**."
          },
          {
            type: "tip",
            title: "Preposition 'from'",
            text: "Use **from** with the country name: 'I am **from** Pakistan'. With nationality, omit 'from': 'I am Pakistani'."
          }
        ]
      },
      {
        id: "sec-a1-u1-l5-2",
        type: "examples",
        title: "Country and Nationality Sentences",
        examples: [
          { english: "I am from Pakistan, and I am proud of my heritage.", phonetic: "/aɪ æm frɒm ˌpækɪˈstæn ænd aɪ æm praʊd ɒv maɪ ˈherɪtɪdʒ/", urdu: "میں پاکستان سے ہوں، اور مجھے اپنے ورثے پر فخر ہے۔", audioText: "I am from Pakistan, and I am proud of my heritage." },
          { english: "Where are your grandparents from?", phonetic: "/weər ɑːr jɔːr ˈɡrænpeərənts frɒm/", urdu: "آپ کے دادا دادی کہاں سے ہیں؟", audioText: "Where are your grandparents from?" },
          { english: "She speaks fluent English and conversational Arabic.", phonetic: "/ʃiː spiːks ˈfluːənt ˈɪŋɡlɪʃ ænd ˌkɒnvəˈseɪʃənl ˈærəbɪk/", urdu: "وہ روانی سے انگریزی اور بول چال کی حد تک عربی بولتی ہیں۔", audioText: "She speaks fluent English and conversational Arabic." },
          { english: "Our teacher is Canadian, but he lives in Islamabad.", phonetic: "/ˈaʊər ˈtiːtʃər ɪz kəˈneɪdiən bʌt hiː lɪvz ɪn ɪsˈlɑːməbɑːd/", urdu: "ہمارے استاد کینیڈین ہیں، لیکن وہ اسلام آباد میں رہتے ہیں۔", audioText: "Our teacher is Canadian, but he lives in Islamabad." },
          { english: "Turkish cuisine is famous around the world.", phonetic: "/ˈtɜːkɪʃ kwɪˈziːn ɪz ˈfeɪməs əˈraʊnd ðə wɜːld/", urdu: "ترکش کھانا دنیا بھر میں مشہور ہے۔", audioText: "Turkish cuisine is famous around the world." },
          { english: "Are they from the United Kingdom?", phonetic: "/ɑːr ðeɪ frɒm ðə juːˈnaɪtɪd ˈkɪŋdəm/", urdu: "کیا وہ برطانیہ سے ہیں؟", audioText: "Are they from the United Kingdom?" }
        ]
      },
      {
        id: "sec-a1-u1-l5-3",
        type: "dialogue",
        title: "International Student Orientation",
        dialogue: [
          { speaker: "Adviser", avatar: "A", english: "Welcome to university! Where are you from?", urdu: "یونیورسٹی میں خوش آمدید! آپ کہاں سے ہیں؟", audioText: "Welcome to university! Where are you from?" },
          { speaker: "Student", avatar: "S", english: "I am from Faisalabad, Pakistan.", urdu: "میں فیصل آباد، پاکستان سے ہوں۔", audioText: "I am from Faisalabad, Pakistan." },
          { speaker: "Adviser", avatar: "A", english: "Wonderful! And what languages do you speak?", urdu: "شاندار! اور آپ کون سی زبانیں بولتے ہیں؟", audioText: "Wonderful! And what languages do you speak?" },
          { speaker: "Student", avatar: "S", english: "I speak Urdu, Punjabi, and English.", urdu: "میں اردو، پنجابی اور انگریزی بولتا ہوں۔", audioText: "I speak Urdu, Punjabi, and English." }
        ]
      },
      {
        id: "sec-a1-u1-l5-4",
        type: "practice",
        title: "Practice Exercises",
        exercises: [
          {
            id: "ex-a1-u1-l5-1",
            type: "mcq",
            skillTag: "nationalities",
            prompt: "Complete the sentence: 'He is from Turkey; he is _____.'",
            options: [
              { id: "opt-1", text: "Turkish" },
              { id: "opt-2", text: "Turkey" },
              { id: "opt-3", text: "Turkian" },
              { id: "opt-4", text: "Turkese" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Turkish' is the correct nationality adjective for someone from Turkey.",
            urduExplanation: "ترکی سے تعلق رکھنے والے شخص کی قومیت 'Turkish' ہے۔"
          },
          {
            id: "ex-a1-u1-l5-2",
            type: "mcq",
            skillTag: "nationalities",
            prompt: "Which sentence has all language names correctly capitalized?",
            options: [
              { id: "opt-1", text: "I speak fluent urdu every day." },
              { id: "opt-2", text: "I speak fluent Urdu and English." },
              { id: "opt-3", text: "I study english grammar at night." },
              { id: "opt-4", text: "We write arabic letters in pencil." }
            ],
            correctOptionId: "opt-2",
            explanation: "All languages (Urdu, English) must be capitalized.",
            urduExplanation: "زبانوں کے ناموں کے پہلے حروف ہمیشہ کیپیٹل ہوتے ہیں: Urdu and English۔"
          },
          {
            id: "ex-a1-u1-l5-3",
            type: "fill_blank",
            skillTag: "nationalities",
            prompt: "Where are you _____? - I am from Islamabad.",
            correctAnswer: "from",
            acceptableAnswers: ["from"],
            explanation: "The preposition 'from' asks about origin.",
            urduExplanation: "کہاں سے تعلق ہے؟ پوچھنے کے لیے 'from' آتا ہے۔"
          },
          {
            id: "ex-a1-u1-l5-4",
            type: "order_sentence",
            skillTag: "nationalities",
            prompt: "Put the words in order:",
            sentenceTokens: ["She", "is", "a", "Pakistani", "doctor", "."],
            correctOrder: ["She", "is", "a", "Pakistani", "doctor", "."],
            explanation: "Subject (She) + Verb (is) + Article & Nationality Adjective (a Pakistani) + Noun (doctor).",
            urduExplanation: "وہ ایک پاکستانی ڈاکٹر ہیں۔"
          },
          {
            id: "ex-a1-u1-l5-5",
            type: "match_pairs",
            skillTag: "nationalities",
            prompt: "Match the country with its nationality:",
            pairs: [
              { left: "Canada", right: "Canadian" },
              { left: "Pakistan", right: "Pakistani" },
              { left: "United Kingdom", right: "British" }
            ],
            explanation: "Match each country name with the corresponding nationality adjective.",
            urduExplanation: "ملک کے نام کے ساتھ اس کی قومیت کا لفظ ملاؤ۔"
          },
          {
            id: "ex-a1-u1-l5-6",
            type: "error_correction",
            skillTag: "nationalities",
            prompt: "Correct the sentence: 'I am from Pakistani.'",
            correctAnswer: "I am Pakistani.",
            acceptableAnswers: ["I am Pakistani.", "I am from Pakistan.", "I am from Pakistan"],
            explanation: "Say 'I am Pakistani' (nationality) OR 'I am from Pakistan' (country). Never combine 'from' with nationality.",
            urduExplanation: "یا تو 'I am Pakistani' کہیں یا 'I am from Pakistan'۔ 'from' کے بعد ملک کا نام آتا ہے۔"
          },
          {
            id: "ex-a1-u1-l5-7",
            type: "true_false",
            skillTag: "nationalities",
            prompt: "True or False: In English, languages like Arabic and English are written with a capital letter.",
            correctAnswer: "True",
            acceptableAnswers: ["True", "true", "T"],
            explanation: "True. All language names are proper nouns and must be capitalized.",
            urduExplanation: "درست۔ زبانوں کے تمام نام کیپیٹل لیٹر سے شروع ہوتے ہیں۔"
          },
          {
            id: "ex-a1-u1-l5-8",
            type: "fill_blank",
            skillTag: "nationalities",
            prompt: "People who live in China are _____.",
            correctAnswer: "Chinese",
            acceptableAnswers: ["Chinese", "chinese"],
            explanation: "'Chinese' is the nationality adjective for China.",
            urduExplanation: "چین کے باشندوں کو 'Chinese' کہا جاتا ہے۔"
          },
          {
            id: "ex-a1-u1-l5-9",
            type: "mcq",
            skillTag: "nationalities",
            prompt: "Complete the sentence: 'Tokyo is the capital of _____.'",
            options: [
              { id: "opt-1", text: "Japan" },
              { id: "opt-2", text: "Japanese" },
              { id: "opt-3", text: "Japans" },
              { id: "opt-4", text: "Japonese" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Japan' is the country noun.",
            urduExplanation: "'Japan' ملک کا نام ہے۔"
          },
          {
            id: "ex-a1-u1-l5-10",
            type: "fill_blank",
            skillTag: "nationalities",
            prompt: "Islamabad is the capital of _____.",
            correctAnswer: "Pakistan",
            acceptableAnswers: ["Pakistan"],
            explanation: "Pakistan is the country noun.",
            urduExplanation: "پاکستان ملک کا نام ہے۔"
          }
        ]
      },
      {
        id: "sec-a1-u1-l5-5",
        type: "quiz",
        title: "Lesson 5 Check Quiz",
        exercises: [
          {
            id: "qz-a1-u1-l5-1",
            type: "mcq",
            skillTag: "nationalities",
            prompt: "Which pair shows Country and Nationality correctly?",
            options: [
              { id: "opt-1", text: "France - French" },
              { id: "opt-2", text: "Canada - Canada" },
              { id: "opt-3", text: "British - United Kingdom" },
              { id: "opt-4", text: "Turkey - Turkian" }
            ],
            correctOptionId: "opt-1",
            explanation: "'France' is the country; 'French' is the nationality.",
            urduExplanation: "فرانس ملک اور فرینچ قومیت ہے۔"
          },
          {
            id: "qz-a1-u1-l5-2",
            type: "mcq",
            skillTag: "nationalities",
            prompt: "Which sentence is accurate?",
            options: [
              { id: "opt-1", text: "I am from Canada." },
              { id: "opt-2", text: "I am from Canadian." },
              { id: "opt-3", text: "I from Canada." },
              { id: "opt-4", text: "I am Canada." }
            ],
            correctOptionId: "opt-1",
            explanation: "'I am from Canada' correctly pairs 'from' with the country noun.",
            urduExplanation: "'I am from Canada' درست جملہ ہے۔"
          },
          {
            id: "qz-a1-u1-l5-3",
            type: "fill_blank",
            skillTag: "nationalities",
            prompt: "What _____ do you speak at home?",
            correctAnswer: "language",
            acceptableAnswers: ["language", "languages"],
            explanation: "The noun 'language' fits the question.",
            urduExplanation: "آپ گھر میں کون سی زبان بولتے ہیں؟"
          },
          {
            id: "qz-a1-u1-l5-4",
            type: "mcq",
            skillTag: "nationalities",
            prompt: "How do you ask someone's nationality politely?",
            options: [
              { id: "opt-1", text: "Where are you from?" },
              { id: "opt-2", text: "Who you are?" },
              { id: "opt-3", text: "What country is?" },
              { id: "opt-4", text: "Are you person?" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Where are you from?' is the universal polite question regarding origins.",
            urduExplanation: "شائستہ سوال: 'Where are you from?'"
          },
          {
            id: "qz-a1-u1-l5-5",
            type: "mcq",
            skillTag: "nationalities",
            prompt: "Which of these is a language name?",
            options: [
              { id: "opt-1", text: "Arabic" },
              { id: "opt-2", text: "Saudi Arabia" },
              { id: "opt-3", text: "London" },
              { id: "opt-4", text: "Asia" }
            ],
            correctOptionId: "opt-1",
            explanation: "'Arabic' is a language (Saudi Arabia is a country; London is a city).",
            urduExplanation: "'Arabic' (عربی) زبان کا نام ہے۔"
          }
        ]
      },
      {
        id: "sec-a1-u1-l5-6",
        type: "urduNote",
        title: "اردو بولنے والوں کے لیے لسانی نکتہ",
        needsNativeReview: true,
        metadata: { needsNativeReview: true, reviewStatus: "pending_native_linguist" },
        urduText: "اردو میں ہم کہتے ہیں: 'میں پاکستان سے ہوں' اور 'میں پاکستانی ہوں'۔\nانگریزی میں طلبہ اکثر دونوں کو ملا کر **'I am from Pakistani'** بول دیتے ہیں جو کہ بالکل غلط ہے!\nاصول یاد رکھیں:\n- اگر 'from' لگائیں گے تو ملک کا نام آئے گا: **I am from Pakistan**۔\n- اگر قومیت بتائیں گے تو 'from' نہیں آئے گا: **I am Pakistani**۔\nاسی طرح تمام ممالک اور زبانوں کے نام ہمیشہ بڑے حرف (Capital letter) سے شروع کریں، جیسے Urdu, English, Pakistan وغیرہ۔"
      },
      {
        id: "sec-a1-u1-l5-7",
        type: "summary",
        title: "Lesson 5 Summary Box",
        summaryPoints: [
          "Country = Noun (Pakistan, Turkey, Canada). Use with 'from': I am from Pakistan.",
          "Nationality = Adjective (Pakistani, Turkish, Canadian). Use without 'from': I am Pakistani.",
          "Always capitalize countries, nationalities, and languages (English, Urdu, Chinese).",
          "Ask origins with 'Where are you from?' and languages with 'What languages do you speak?'."
        ]
      }
    ]
  }
];
