# Zarii IELTS Content Schemas

All practice tests, questions, prompts, and vocabulary items in Zarii are stored as offline-first static JSON files in `/content`.

---

## 1. Reading Tests (`/content/reading/*.json`)
```json
{
  "id": "read-test-01",
  "title": "Academic Reading Practice Test 1",
  "testType": "academic",
  "difficulty": "standard",
  "timeLimitMinutes": 60,
  "passages": [
    {
      "passageNumber": 1,
      "title": "Biomimicry: Engineering Inspired by Nature",
      "text": "Full markdown or raw passage paragraphs...",
      "wordCount": 850,
      "questionGroups": [
        {
          "groupInstruction": "Do the following statements agree with the information given in Reading Passage 1?",
          "questionType": "true_false_not_given",
          "questions": [
            {
              "id": "r1-q1",
              "questionNumber": 1,
              "type": "true_false_not_given",
              "prompt": "Velcro was invented after George de Mestral observed burrs clinging to dog fur.",
              "correctAnswer": "TRUE",
              "explanation": "Paragraph 1 explains de Mestral's observation...",
              "evidence": "In 1941, Swiss engineer George de Mestral..."
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 2. Listening Tests (`/content/listening/*.json`)
```json
{
  "id": "list-test-01",
  "title": "Listening Practice Test 1",
  "difficulty": "standard",
  "timeLimitMinutes": 40,
  "sections": [
    {
      "sectionNumber": 1,
      "title": "Community Watersports Center Membership Enquiry",
      "contextDescription": "A phone conversation between a resident and a receptionist.",
      "audioScript": [
        { "speaker": "Receptionist", "text": "Good morning! West Bay Watersports..." },
        { "speaker": "Mark", "text": "Hello there! I recently moved to the coast..." }
      ],
      "questionGroups": [
        {
          "groupInstruction": "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.",
          "questionType": "sentence_completion",
          "questions": [
            {
              "id": "l1-q1",
              "questionNumber": 1,
              "prompt": "Discounted Annual Pass fee: £____",
              "correctAnswer": ["420", "four hundred and twenty"],
              "explanation": "Receptionist mentions £420 if paid early."
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 3. Writing Prompts (`/content/writing/*.json`)
```json
[
  {
    "id": "acad-t1-01",
    "taskType": "task1_academic",
    "title": "Global Electric Vehicle Sales (2015–2025)",
    "chartType": "line",
    "promptText": "The line graph below shows...",
    "minWordCount": 150,
    "recommendedMinutes": 20,
    "chartData": [
      { "year": "2015", "China": 0.2, "Europe": 0.15, "NorthAmerica": 0.1 }
    ],
    "sampleAnswers": [
      {
        "band": 8.5,
        "text": "The line graph delineates...",
        "examinerCommentary": "Task Achievement: Covers key trends..."
      }
    ]
  }
]
```

---

## 4. Academic Vocabulary (`/content/vocab/academic-words.json`)
```json
[
  {
    "id": "voc-001",
    "word": "biodiversity",
    "partOfSpeech": "noun",
    "topic": "environment",
    "meaning": "The variety of plant and animal life in a particular habitat or in the world.",
    "urduMeaning": "حیاتیاتی تنوع",
    "exampleSentence": "Industrial deforestation poses an existential threat to biodiversity.",
    "collocations": ["preserve biodiversity", "loss of biodiversity"],
    "synonyms": ["ecological diversity", "biological variety"],
    "bandTarget": 7.5
  }
]
```

---

## 5. Grammar Lessons (`/content/grammar/lessons.json`)
```json
[
  {
    "id": "grammar_01",
    "title": "Present & Past Narrative Tenses",
    "focus": "Contrasting past simple, continuous, and perfect",
    "explanation": "In IELTS Writing Task 1 and Speaking Part 2...",
    "bandTips": "Examiners look for accurate narrative shifts...",
    "exercises": [
      {
        "id": "g01_ex1",
        "prompt": "By the time the new environmental policy was ratified in 2022, carbon emissions ________ by 14%.",
        "options": ["A) have already decreased", "B) had already decreased", "C) was decreasing", "D) decreased"],
        "correctAnswer": "B",
        "explanation": "The past perfect 'had already decreased' is required..."
      }
    ]
  }
]
```
