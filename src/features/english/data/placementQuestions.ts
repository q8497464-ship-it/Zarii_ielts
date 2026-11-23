import type { PlacementQuestion } from '../../../types/course';

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // -------------------------------------------------------------
  // GRAMMAR QUESTIONS (16 Questions, A1 to C1)
  // -------------------------------------------------------------
  {
    id: "pq-g-01",
    level: "A1",
    category: "grammar",
    skillTag: "verb-to-be",
    difficultyWeight: 1,
    prompt: "Choose the correct form to complete the sentence: 'Sarah and her brother _____ students at this university.'",
    options: [
      { id: "opt-1", text: "am" },
      { id: "opt-2", text: "is" },
      { id: "opt-3", text: "are" },
      { id: "opt-4", text: "be" }
    ],
    correctOptionId: "opt-3",
    explanation: "'Sarah and her brother' is a plural subject (they), requiring the plural verb form 'are'."
  },
  {
    id: "pq-g-02",
    level: "A1",
    category: "grammar",
    skillTag: "present-simple",
    difficultyWeight: 1,
    prompt: "My father _____ coffee every morning before going to work.",
    options: [
      { id: "opt-1", text: "drink" },
      { id: "opt-2", text: "drinks" },
      { id: "opt-3", text: "is drink" },
      { id: "opt-4", text: "drinking" }
    ],
    correctOptionId: "opt-2",
    explanation: "Third-person singular subjects (he/she/it) take the -s ending in the present simple: 'drinks'."
  },
  {
    id: "pq-g-03",
    level: "A2",
    category: "grammar",
    skillTag: "past-simple",
    difficultyWeight: 2,
    prompt: "We _____ to the cinema last night because we were too tired.",
    options: [
      { id: "opt-1", text: "didn't go" },
      { id: "opt-2", text: "didn't went" },
      { id: "opt-3", text: "don't go" },
      { id: "opt-4", text: "weren't go" }
    ],
    correctOptionId: "opt-1",
    explanation: "In the past simple negative, 'didn't' is followed by the base form of the verb ('go', not 'went')."
  },
  {
    id: "pq-g-04",
    level: "A2",
    category: "grammar",
    skillTag: "comparatives",
    difficultyWeight: 2,
    prompt: "This new laptop is significantly _____ than my old computer.",
    options: [
      { id: "opt-1", text: "more fast" },
      { id: "opt-2", text: "faster" },
      { id: "opt-3", text: "fastest" },
      { id: "opt-4", text: "more faster" }
    ],
    correctOptionId: "opt-2",
    explanation: "Single-syllable adjectives form comparatives with -er: 'faster than'."
  },
  {
    id: "pq-g-05",
    level: "A2",
    category: "grammar",
    skillTag: "future-plans",
    difficultyWeight: 2,
    prompt: "Look at those dark clouds! It _____ in a few minutes.",
    options: [
      { id: "opt-1", text: "will rain" },
      { id: "opt-2", text: "is going to rain" },
      { id: "opt-3", text: "rains" },
      { id: "opt-4", text: "was raining" }
    ],
    correctOptionId: "opt-2",
    explanation: "When there is immediate physical evidence in the present (dark clouds), 'be going to' is preferred for predictions."
  },
  {
    id: "pq-g-06",
    level: "B1",
    category: "grammar",
    skillTag: "present-perfect",
    difficultyWeight: 3,
    prompt: "Dr. Hamza _____ at this research institute since 2018.",
    options: [
      { id: "opt-1", text: "worked" },
      { id: "opt-2", text: "is working" },
      { id: "opt-3", text: "has worked" },
      { id: "opt-4", text: "works" }
    ],
    correctOptionId: "opt-3",
    explanation: "'Since 2018' indicates an action that began in the past and continues into the present, requiring the present perfect 'has worked'."
  },
  {
    id: "pq-g-07",
    level: "B1",
    category: "grammar",
    skillTag: "first-conditional",
    difficultyWeight: 3,
    prompt: "If the train arrives on time, we _____ the opening ceremony.",
    options: [
      { id: "opt-1", text: "catch" },
      { id: "opt-2", text: "will catch" },
      { id: "opt-3", text: "would catch" },
      { id: "opt-4", text: "caught" }
    ],
    correctOptionId: "opt-2",
    explanation: "First conditional patterns: If + present simple, will + base verb."
  },
  {
    id: "pq-g-08",
    level: "B1",
    category: "grammar",
    skillTag: "passive-voice",
    difficultyWeight: 3,
    prompt: "Millions of smartphones _____ in Asia each month.",
    options: [
      { id: "opt-1", text: "manufacture" },
      { id: "opt-2", text: "are manufactured" },
      { id: "opt-3", text: "were manufactured" },
      { id: "opt-4", text: "are manufacturing" }
    ],
    correctOptionId: "opt-2",
    explanation: "Present simple passive: subject + are + past participle ('are manufactured')."
  },
  {
    id: "pq-g-09",
    level: "B1",
    category: "grammar",
    skillTag: "modals-obligation",
    difficultyWeight: 3,
    prompt: "You _____ wear a seatbelt when driving; it is a legal requirement.",
    options: [
      { id: "opt-1", text: "must" },
      { id: "opt-2", text: "might" },
      { id: "opt-3", text: "should" },
      { id: "opt-4", text: "can" }
    ],
    correctOptionId: "opt-1",
    explanation: "'Must' expresses strict legal obligation and binding rules."
  },
  {
    id: "pq-g-10",
    level: "B2",
    category: "grammar",
    skillTag: "third-conditional",
    difficultyWeight: 4,
    prompt: "If we _____ the weather forecast earlier, we wouldn't have set off on the mountain hike.",
    options: [
      { id: "opt-1", text: "checked" },
      { id: "opt-2", text: "had checked" },
      { id: "opt-3", text: "have checked" },
      { id: "opt-4", text: "would check" }
    ],
    correctOptionId: "opt-2",
    explanation: "Third conditional formula: If + past perfect ('had checked'), would have + past participle."
  },
  {
    id: "pq-g-11",
    level: "B2",
    category: "grammar",
    skillTag: "modals-deduction",
    difficultyWeight: 4,
    prompt: "The lights in her office are off and the door is locked. She _____ home already.",
    options: [
      { id: "opt-1", text: "must have gone" },
      { id: "opt-2", text: "can't have gone" },
      { id: "opt-3", text: "should go" },
      { id: "opt-4", text: "might go" }
    ],
    correctOptionId: "opt-1",
    explanation: "'Must have gone' expresses logical deduction with high certainty about a past event."
  },
  {
    id: "pq-g-12",
    level: "B2",
    category: "grammar",
    skillTag: "gerund-infinitive",
    difficultyWeight: 4,
    prompt: "Please remember _____ the front door before you go to sleep.",
    options: [
      { id: "opt-1", text: "locking" },
      { id: "opt-2", text: "to lock" },
      { id: "opt-3", text: "lock" },
      { id: "opt-4", text: "having locked" }
    ],
    correctOptionId: "opt-2",
    explanation: "'Remember to do something' refers to a future obligation or duty, whereas 'remember doing' refers to a past memory."
  },
  {
    id: "pq-g-13",
    level: "B2",
    category: "grammar",
    skillTag: "reported-speech",
    difficultyWeight: 4,
    prompt: "The CEO _____ that the quarterly targets had exceeded expectations.",
    options: [
      { id: "opt-1", text: "told" },
      { id: "opt-2", text: "announced" },
      { id: "opt-3", text: "spoke" },
      { id: "opt-4", text: "said to" }
    ],
    correctOptionId: "opt-2",
    explanation: "'Announced that' functions without a personal object, unlike 'told' which requires an object pronoun."
  },
  {
    id: "pq-g-14",
    level: "C1",
    category: "grammar",
    skillTag: "negative-inversion",
    difficultyWeight: 5,
    prompt: "Seldom _____ such an inspiring keynote address at an academic symposium.",
    options: [
      { id: "opt-1", text: "I have heard" },
      { id: "opt-2", text: "have I heard" },
      { id: "opt-3", text: "did I heard" },
      { id: "opt-4", text: "I had heard" }
    ],
    correctOptionId: "opt-2",
    explanation: "When a sentence begins with a negative adverbial like 'Seldom', auxiliary inversion is mandatory: 'have I heard'."
  },
  {
    id: "pq-g-15",
    level: "C1",
    category: "grammar",
    skillTag: "cleft-sentences",
    difficultyWeight: 5,
    prompt: "_____ was the profound lack of communication that caused the joint venture to collapse.",
    options: [
      { id: "opt-1", text: "What" },
      { id: "opt-2", text: "It" },
      { id: "opt-3", text: "There" },
      { id: "opt-4", text: "This" }
    ],
    correctOptionId: "opt-2",
    explanation: "In an it-cleft sentence: 'It was [emphasized noun phrase] that...'"
  },
  {
    id: "pq-g-16",
    level: "C1",
    category: "grammar",
    skillTag: "subjunctive",
    difficultyWeight: 5,
    prompt: "The committee insisted that the candidate _____ given an opportunity to present his defense.",
    options: [
      { id: "opt-1", text: "was" },
      { id: "opt-2", text: "is" },
      { id: "opt-3", text: "be" },
      { id: "opt-4", text: "should being" }
    ],
    correctOptionId: "opt-3",
    explanation: "The mandative subjunctive following 'insisted that' uses the bare base form 'be' regardless of the subject."
  },

  // -------------------------------------------------------------
  // VOCABULARY QUESTIONS (14 Questions, A1 to C1)
  // -------------------------------------------------------------
  {
    id: "pq-v-01",
    level: "A1",
    category: "vocabulary",
    skillTag: "common-vocab",
    difficultyWeight: 1,
    prompt: "Which word best completes the blank: 'I need to buy a _____ to write down today's homework.'",
    options: [
      { id: "opt-1", text: "notebook" },
      { id: "opt-2", text: "spoon" },
      { id: "opt-3", text: "mirror" },
      { id: "opt-4", text: "blanket" }
    ],
    correctOptionId: "opt-1",
    explanation: "A 'notebook' is used for writing school notes and homework."
  },
  {
    id: "pq-v-02",
    level: "A1",
    category: "vocabulary",
    skillTag: "daily-vocab",
    difficultyWeight: 1,
    prompt: "What is the opposite of the adjective 'noisy'?",
    options: [
      { id: "opt-1", text: "quiet" },
      { id: "opt-2", text: "heavy" },
      { id: "opt-3", text: "narrow" },
      { id: "opt-4", text: "cloudy" }
    ],
    correctOptionId: "opt-1",
    explanation: "'Quiet' is the antonym of 'noisy'."
  },
  {
    id: "pq-v-03",
    level: "A2",
    category: "vocabulary",
    skillTag: "travel-vocab",
    difficultyWeight: 2,
    prompt: "Before boarding an international flight, passengers must show their _____ at the gate.",
    options: [
      { id: "opt-1", text: "receipt" },
      { id: "opt-2", text: "boarding pass" },
      { id: "opt-3", text: "driving license" },
      { id: "opt-4", text: "menu" }
    ],
    correctOptionId: "opt-2",
    explanation: "A 'boarding pass' is the official document permitting a passenger to board an airplane."
  },
  {
    id: "pq-v-04",
    level: "A2",
    category: "vocabulary",
    skillTag: "health-vocab",
    difficultyWeight: 2,
    prompt: "If you have a high temperature and chills, you probably have a _____.",
    options: [
      { id: "opt-1", text: "fracture" },
      { id: "opt-2", text: "fever" },
      { id: "opt-3", text: "bandage" },
      { id: "opt-4", text: "prescription" }
    ],
    correctOptionId: "opt-2",
    explanation: "A 'fever' is an abnormally high body temperature accompanied by chills."
  },
  {
    id: "pq-v-05",
    level: "B1",
    category: "vocabulary",
    skillTag: "environment-vocab",
    difficultyWeight: 3,
    prompt: "The widespread cutting down of forests is referred to in environmental studies as _____.",
    options: [
      { id: "opt-1", text: "deforestation" },
      { id: "opt-2", text: "evaporation" },
      { id: "opt-3", text: "precipitation" },
      { id: "opt-4", text: "reproduction" }
    ],
    correctOptionId: "opt-1",
    explanation: "'Deforestation' is the purposeful clearing of forested land on a large scale."
  },
  {
    id: "pq-v-06",
    level: "B1",
    category: "vocabulary",
    skillTag: "workplace-collocations",
    difficultyWeight: 3,
    prompt: "The executive was praised for her ability to _____ difficult problems under pressure.",
    options: [
      { id: "opt-1", text: "solve" },
      { id: "opt-2", text: "make" },
      { id: "opt-3", text: "do" },
      { id: "opt-4", text: "create" }
    ],
    correctOptionId: "opt-1",
    explanation: "The standard natural collocation is to 'solve problems'."
  },
  {
    id: "pq-v-07",
    level: "B1",
    category: "vocabulary",
    skillTag: "connectors",
    difficultyWeight: 3,
    prompt: "The weather was stormy; _____, the match proceeded as scheduled.",
    options: [
      { id: "opt-1", text: "furthermore" },
      { id: "opt-2", text: "nevertheless" },
      { id: "opt-3", text: "because" },
      { id: "opt-4", text: "as a result" }
    ],
    correctOptionId: "opt-2",
    explanation: "'Nevertheless' introduces a contrast meaning 'in spite of that'."
  },
  {
    id: "pq-v-08",
    level: "B2",
    category: "vocabulary",
    skillTag: "phrasal-verbs",
    difficultyWeight: 4,
    prompt: "Due to heavy snow, the university decided to _____ all evening lectures.",
    options: [
      { id: "opt-1", text: "call off" },
      { id: "opt-2", text: "call out" },
      { id: "opt-3", text: "call for" },
      { id: "opt-4", text: "call in" }
    ],
    correctOptionId: "opt-1",
    explanation: "'Call off' is a phrasal verb meaning to cancel an event."
  },
  {
    id: "pq-v-09",
    level: "B2",
    category: "vocabulary",
    skillTag: "idioms",
    difficultyWeight: 4,
    prompt: "The two negotiators finally saw _____ on the treaty terms after weeks of debate.",
    options: [
      { id: "opt-1", text: "hand in hand" },
      { id: "opt-2", text: "eye to eye" },
      { id: "opt-3", text: "ear to ear" },
      { id: "opt-4", text: "face to face" }
    ],
    correctOptionId: "opt-2",
    explanation: "The idiom 'to see eye to eye' means to agree with someone."
  },
  {
    id: "pq-v-10",
    level: "B2",
    category: "vocabulary",
    skillTag: "academic-vocab",
    difficultyWeight: 4,
    prompt: "The researchers gathered empirical evidence to _____ their central hypothesis.",
    options: [
      { id: "opt-1", text: "substantiate" },
      { id: "opt-2", text: "deteriorate" },
      { id: "opt-3", text: "exaggerate" },
      { id: "opt-4", text: "diminish" }
    ],
    correctOptionId: "opt-1",
    explanation: "'Substantiate' means to provide evidence to support or prove the truth of something."
  },
  {
    id: "pq-v-11",
    level: "C1",
    category: "vocabulary",
    skillTag: "binomials",
    difficultyWeight: 5,
    prompt: "The judge declared the disputed commercial contract _____ after uncovering forged signatures.",
    options: [
      { id: "opt-1", text: "null and void" },
      { id: "opt-2", text: "safe and sound" },
      { id: "opt-3", text: "pros and cons" },
      { id: "opt-4", text: "bits and pieces" }
    ],
    correctOptionId: "opt-1",
    explanation: "'Null and void' is a formal binomial meaning having no legal force or validity."
  },
  {
    id: "pq-v-12",
    level: "C1",
    category: "vocabulary",
    skillTag: "advanced-lexis",
    difficultyWeight: 5,
    prompt: "His sudden resignation caused an _____ upheaval throughout the entire organization.",
    options: [
      { id: "opt-1", text: "unprecedented" },
      { id: "opt-2", text: "unsatisfactory" },
      { id: "opt-3", text: "uncomfortable" },
      { id: "opt-4", text: "unfriendly" }
    ],
    correctOptionId: "opt-1",
    explanation: "'Unprecedented' means never having happened or existed in the past."
  },
  {
    id: "pq-v-13",
    level: "C1",
    category: "vocabulary",
    skillTag: "hedging-adverbs",
    difficultyWeight: 5,
    prompt: "The diplomat spoke with deliberate _____, choosing phrases that avoided committing her government.",
    options: [
      { id: "opt-1", text: "ambiguity" },
      { id: "opt-2", text: "recklessness" },
      { id: "opt-3", text: "hostility" },
      { id: "opt-4", text: "arrogance" }
    ],
    correctOptionId: "opt-1",
    explanation: "'Ambiguity' refers to the quality of being open to more than one interpretation."
  },
  {
    id: "pq-v-14",
    level: "C1",
    category: "vocabulary",
    skillTag: "collocations",
    difficultyWeight: 5,
    prompt: "The board expressed deep _____ about the aggressive expansion plan proposed by the director.",
    options: [
      { id: "opt-1", text: "reservations" },
      { id: "opt-2", text: "conditions" },
      { id: "opt-3", text: "hesitations" },
      { id: "opt-4", text: "delays" }
    ],
    correctOptionId: "opt-1",
    explanation: "'Express deep reservations' is the formal academic collocation meaning to voice doubts or concerns."
  },

  // -------------------------------------------------------------
  // READING COMPREHENSION QUESTIONS (10 Questions, A1 to C1)
  // -------------------------------------------------------------
  {
    id: "pq-r-01",
    level: "A1",
    category: "reading",
    skillTag: "reading-detail",
    difficultyWeight: 1,
    readingPassage: "Welcome to Central Library. We are open from Monday to Saturday, 9:00 AM to 6:00 PM. Books can be borrowed for up to three weeks using your membership card. The library is closed on Sundays and national holidays.",
    prompt: "According to the notice, on which day is the library NOT open?",
    options: [
      { id: "opt-1", text: "Monday" },
      { id: "opt-2", text: "Sunday" },
      { id: "opt-3", text: "Saturday" },
      { id: "opt-4", text: "Wednesday" }
    ],
    correctOptionId: "opt-2",
    explanation: "The text states explicitly: 'The library is closed on Sundays and national holidays.'"
  },
  {
    id: "pq-r-02",
    level: "A1",
    category: "reading",
    skillTag: "reading-purpose",
    difficultyWeight: 1,
    readingPassage: "Dear Students, please remember to bring your passport and student ID to the exam hall on Friday morning. Mobile phones must be turned off and placed in your bags.",
    prompt: "What is the primary purpose of this announcement?",
    options: [
      { id: "opt-1", text: "To sell new mobile phones to students" },
      { id: "opt-2", text: "To invite students to a Friday party" },
      { id: "opt-3", text: "To instruct students on exam requirements" },
      { id: "opt-4", text: "To cancel the Friday examination" }
    ],
    correctOptionId: "opt-3",
    explanation: "The note instructs students regarding required documents and phone rules for the examination."
  },
  {
    id: "pq-r-03",
    level: "A2",
    category: "reading",
    skillTag: "reading-inference",
    difficultyWeight: 2,
    readingPassage: "When Fatima arrived in Manchester, the rain was relentless. Unlike her hometown where sunny days dominated the year, she had to wear a waterproof jacket and carry an umbrella everywhere. Yet, she loved the green parks and friendly bus drivers.",
    prompt: "How does Manchester's climate compare to Fatima's hometown?",
    options: [
      { id: "opt-1", text: "Manchester is hotter and drier" },
      { id: "opt-2", text: "Manchester is rainier and less sunny" },
      { id: "opt-3", text: "Both cities have identical weather" },
      { id: "opt-4", text: "Manchester has no rainfall at all" }
    ],
    correctOptionId: "opt-2",
    explanation: "The passage notes that unlike her sunny hometown, Manchester had relentless rain requiring waterproof gear."
  },
  {
    id: "pq-r-04",
    level: "A2",
    category: "reading",
    skillTag: "reading-detail",
    difficultyWeight: 2,
    readingPassage: "Electric bicycles are becoming popular in urban centers. They allow commuters to travel without sweating, recharge overnight at minimal cost, and avoid heavy rush-hour traffic jams without emitting exhaust gases.",
    prompt: "Which benefit of electric bicycles is NOT mentioned in the text?",
    options: [
      { id: "opt-1", text: "Zero tailpipe exhaust emissions" },
      { id: "opt-2", text: "Low-cost overnight charging" },
      { id: "opt-3", text: "Free municipal parking everywhere" },
      { id: "opt-4", text: "Avoiding peak traffic delays" }
    ],
    correctOptionId: "opt-3",
    explanation: "Free municipal parking is not stated anywhere in the passage."
  },
  {
    id: "pq-r-05",
    level: "B1",
    category: "reading",
    skillTag: "reading-gist",
    difficultyWeight: 3,
    readingPassage: "Remote work arrangements expanded rapidly following technological advances in high-speed connectivity and video conferencing. While employees celebrate the elimination of daily commutes and greater schedule autonomy, organizations face novel challenges in sustaining team cohesion and preventing occupational burnout.",
    prompt: "What is the main idea of this paragraph?",
    options: [
      { id: "opt-1", text: "Remote work offers notable benefits but also introduces new organizational hurdles" },
      { id: "opt-2", text: "Remote work should be immediately banned across all industries" },
      { id: "opt-3", text: "Commuting by bus is more effective than working from home" },
      { id: "opt-4", text: "Video conferencing technology has completely failed" }
    ],
    correctOptionId: "opt-1",
    explanation: "The paragraph balances the positives (no commute, autonomy) with the negatives (team cohesion, burnout)."
  },
  {
    id: "pq-r-06",
    level: "B1",
    category: "reading",
    skillTag: "reading-vocabulary-in-context",
    difficultyWeight: 3,
    readingPassage: "The city council implemented stringent water rationing after five consecutive months without significant precipitation.",
    prompt: "In this sentence, what does the word 'stringent' mean?",
    options: [
      { id: "opt-1", text: "Flexible and optional" },
      { id: "opt-2", text: "Strict and tightly regulated" },
      { id: "opt-3", text: "Free of charge" },
      { id: "opt-4", text: "Temporary and cheerful" }
    ],
    correctOptionId: "opt-2",
    explanation: "'Stringent' means strict, precise, and exacting."
  },
  {
    id: "pq-r-07",
    level: "B2",
    category: "reading",
    skillTag: "reading-inference",
    difficultyWeight: 4,
    readingPassage: "Urban planners historically prioritized private automobile transit, designing vast multi-lane thoroughfares that severed historic pedestrian corridors. Contemporary municipal frameworks, by contrast, increasingly retro-fit bicycle boulevards and tramways, recognizing that car-centric cities inadvertently generate suburban sprawl and diminish public health.",
    prompt: "What does the author imply about past urban highway designs?",
    options: [
      { id: "opt-1", text: "They successfully solved public health crises" },
      { id: "opt-2", text: "They inadvertently damaged pedestrian connectivity and fueled sprawl" },
      { id: "opt-3", text: "They were universally praised by modern environmentalists" },
      { id: "opt-4", text: "They eradicated traffic congestion entirely" }
    ],
    correctOptionId: "opt-2",
    explanation: "The passage asserts that past designs 'severed historic pedestrian corridors' and 'inadvertently generate suburban sprawl'."
  },
  {
    id: "pq-r-08",
    level: "B2",
    category: "reading",
    skillTag: "reading-tone",
    difficultyWeight: 4,
    readingPassage: "Critics hailed the director's latest film as a visual masterpiece, praising the breathtaking cinematography and haunting score. However, many conceded that the dialogue felt contrived and the pacing during the second act dragged noticeably.",
    prompt: "What is the overall critical consensus regarding the film?",
    options: [
      { id: "opt-1", text: "Universally negative with no redeeming qualities" },
      { id: "opt-2", text: "Unquestionably flawless from start to finish" },
      { id: "opt-3", text: "Visually exceptional despite notable narrative shortcomings" },
      { id: "opt-4", text: "Focused entirely on comedy rather than drama" }
    ],
    correctOptionId: "opt-3",
    explanation: "The critics praised the visuals and score ('breathtaking') but pointed out weak dialogue and dragging pace."
  },
  {
    id: "pq-r-09",
    level: "C1",
    category: "reading",
    skillTag: "reading-argument-structure",
    difficultyWeight: 5,
    readingPassage: "Proponents of algorithmic decision-making champion its ostensible objectivity, contending that mathematical models neutralize human cognitive biases. Yet this stance blithely overlooks the reality that algorithms are trained on historical datasets inevitably reflecting systemic societal inequities. Far from eliminating prejudice, automated architectures risk codifying and perpetuating past disparities beneath a veneer of quantitative neutrality.",
    prompt: "Which statement best summarizes the author's primary argument?",
    options: [
      { id: "opt-1", text: "Algorithms guarantee complete fairness because computers cannot harbor emotional prejudice" },
      { id: "opt-2", text: "Algorithmic decision-making often entrenches existing biases by relying on skewed historical data" },
      { id: "opt-3", text: "Human decision-makers should be entirely replaced by mathematical equations" },
      { id: "opt-4", text: "Historical datasets have no influence on modern automated architectures" }
    ],
    correctOptionId: "opt-2",
    explanation: "The author argues that algorithms trained on historical datasets codify and perpetuate societal inequities."
  },
  {
    id: "pq-r-10",
    level: "C1",
    category: "reading",
    skillTag: "reading-nuance",
    difficultyWeight: 5,
    readingPassage: "While linguistic prescriptivists lament the erosion of formal grammar in digital correspondence, descriptive linguists view internet vernacular not as a degenerate dialect, but rather as an ingenious evolution of pragmatic economy. Emojis, syntactical shorthand, and punctuation variations serve as typographic surrogates for tone of voice, cadence, and facial expression in a text-dominant medium.",
    prompt: "According to the descriptive linguists cited, what function does internet vernacular serve?",
    options: [
      { id: "opt-1", text: "It irreparably destroys the grammatical foundation of human language" },
      { id: "opt-2", text: "It acts as a substitute for non-verbal cues that are missing in written digital exchanges" },
      { id: "opt-3", text: "It prevents young people from learning to read traditional literature" },
      { id: "opt-4", text: "It forces everyone to write in formal Victorian cadence" }
    ],
    correctOptionId: "opt-2",
    explanation: "The text explains that digital shorthand and emojis serve as 'typographic surrogates for tone of voice, cadence, and facial expression'."
  }
];
