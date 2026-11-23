import type { EnglishCEFRLevel } from '../../../types';
import type {
  CourseLevelMetadata,
  CourseUnitMetadata,
  CourseLessonSummary,
} from '../../../types/course';

interface UnitDefinition {
  num: number;
  title: string;
  desc: string;
  icon: string;
  hours: number;
  lessons: Array<{ title: string; desc: string; minutes: number; tags: string[] }>;
}

function createLevelUnits(level: EnglishCEFRLevel, unitsDef: UnitDefinition[]): CourseUnitMetadata[] {
  return unitsDef.map((def) => {
    const unitId = `unit-${level.toLowerCase()}-${def.num}`;

    const lessons: CourseLessonSummary[] = def.lessons.map((l, idx) => ({
      id: `eng-${level.toLowerCase()}-u${def.num}-l${idx + 1}`,
      unitId,
      order: idx + 1,
      title: l.title,
      description: l.desc,
      estimatedMinutes: l.minutes,
      type: 'lesson',
      skillTags: l.tags,
      prerequisites: idx > 0 ? [`eng-${level.toLowerCase()}-u${def.num}-l${idx}`] : [],
    }));

    const reviewLesson: CourseLessonSummary = {
      id: `eng-${level.toLowerCase()}-u${def.num}-review`,
      unitId,
      order: lessons.length + 1,
      title: `Unit ${def.num} Comprehensive Review`,
      description: `Review grammar, vocabulary, and phrases covered in Unit ${def.num}.`,
      estimatedMinutes: 15,
      type: 'review',
      skillTags: [`unit-${def.num}-review`],
    };

    const unitTest: CourseLessonSummary = {
      id: `eng-${level.toLowerCase()}-u${def.num}-test`,
      unitId,
      order: lessons.length + 2,
      title: `Unit ${def.num} Mastery Test`,
      description: `Demonstrate 70%+ mastery (or 85%+ to test out) to complete Unit ${def.num}.`,
      estimatedMinutes: 20,
      type: 'test',
      skillTags: [`unit-${def.num}-test`],
    };

    return {
      id: unitId,
      unitNumber: def.num,
      level,
      title: def.title,
      description: def.desc,
      topicIcon: def.icon,
      estimatedHours: def.hours,
      lessons,
      reviewLesson,
      unitTest,
    };
  });
}

// ---------------------------------------------------------------------------
// 1. CEFR A1: BEGINNER (8 Units)
// ---------------------------------------------------------------------------
const A1_UNITS_DEF: UnitDefinition[] = [
  {
    num: 1,
    title: "Foundations & The Verb 'To Be'",
    desc: "Greetings, alphabet, introductions, and mastering am/is/are.",
    icon: "Compass",
    hours: 2.5,
    lessons: [
      { title: "To Be: I am, You are, He/She/It is", desc: "Form statements with the verb to be.", minutes: 12, tags: ["verb-to-be", "pronouns", "introductions"] },
      { title: "Personal Pronouns & Possessive Adjectives", desc: "My, your, his, her, our, their.", minutes: 10, tags: ["possessives", "pronouns"] },
      { title: "Negative Statements & Questions with 'To Be'", desc: "Isn't, aren't, Are you, Is she.", minutes: 12, tags: ["verb-to-be", "questions"] },
      { title: "Everyday Greetings & Farewells", desc: "Formal and informal ways to greet people.", minutes: 8, tags: ["greetings", "communication"] },
      { title: "Countries, Nationalities & Languages", desc: "Where are you from? I am from Pakistan.", minutes: 10, tags: ["nationalities", "vocabulary"] }
    ]
  },
  {
    num: 2,
    title: "Nouns, Plurals & Everyday Objects",
    desc: "Singular, plural, articles a/an, this/that/these/those.",
    icon: "Layers",
    hours: 2.0,
    lessons: [
      { title: "Singular & Plural Nouns (-s, -es, irregulars)", desc: "Book to books, child to children.", minutes: 12, tags: ["nouns", "plurals"] },
      { title: "Indefinite Articles: A vs. An", desc: "Rules for vowel and consonant sounds.", minutes: 10, tags: ["articles", "phonetics"] },
      { title: "Demonstratives: This, That, These, Those", desc: "Talking about objects near and far.", minutes: 10, tags: ["demonstratives"] },
      { title: "Classroom & Study Objects", desc: "Pen, notebook, eraser, desk, laptop.", minutes: 8, tags: ["vocabulary", "objects"] },
      { title: "Colours & Common Sizes", desc: "Describing items by appearance.", minutes: 10, tags: ["adjectives", "colors"] }
    ]
  },
  {
    num: 3,
    title: "Present Simple & Daily Routines",
    desc: "Talking about habits, schedules, and daily routines.",
    icon: "Clock",
    hours: 2.8,
    lessons: [
      { title: "Present Simple: Positive Statements", desc: "I wake up, she works, they study.", minutes: 12, tags: ["present-simple", "verbs"] },
      { title: "Third-Person -s / -es Spelling Rules", desc: "He goes, she watches, it fixes.", minutes: 10, tags: ["present-simple", "spelling"] },
      { title: "Present Simple Negatives (Don't / Doesn't)", desc: "I don't know, he doesn't work.", minutes: 12, tags: ["present-simple", "negatives"] },
      { title: "Daily Morning & Evening Routines", desc: "Brush teeth, catch bus, prepare meals.", minutes: 10, tags: ["routines", "vocabulary"] },
      { title: "Telling Time & Parts of the Day", desc: "At 7 o'clock, in the morning, at night.", minutes: 10, tags: ["time", "prepositions"] }
    ]
  },
  {
    num: 4,
    title: "Possessions & Family Relationships",
    desc: "Have got / have, family members, possessive 's.",
    icon: "Heart",
    hours: 2.2,
    lessons: [
      { title: "Have & Has: Expressing Possession", desc: "I have a car, she has two sisters.", minutes: 12, tags: ["have-has", "possession"] },
      { title: "Family Tree Vocabulary", desc: "Parents, siblings, cousins, relatives.", minutes: 10, tags: ["family", "vocabulary"] },
      { title: "The Possessive 'S (Apostrophe S)", desc: "Ali's book, Sarah's family.", minutes: 10, tags: ["possessives", "grammar"] },
      { title: "Describing Physical Appearance", desc: "Tall, short, dark hair, blue eyes.", minutes: 12, tags: ["appearance", "adjectives"] },
      { title: "Talking About Pets & Animals", desc: "Common domestic animals and habits.", minutes: 8, tags: ["vocabulary", "animals"] }
    ]
  },
  {
    num: 5,
    title: "Food, Drink & Ordering at a Cafe",
    desc: "Countable and uncountable food items, polite requests.",
    icon: "Coffee",
    hours: 2.4,
    lessons: [
      { title: "Countable vs Uncountable Food Nouns", desc: "Apples vs water, rice vs sandwiches.", minutes: 12, tags: ["countable-uncountable", "food"] },
      { title: "Some and Any in Food Contexts", desc: "There is some milk; is there any bread?", minutes: 12, tags: ["quantifiers", "some-any"] },
      { title: "Polite Requests: Can I have...? / I'd like...", desc: "Ordering tea, coffee, and food politely.", minutes: 10, tags: ["requests", "dialogue"] },
      { title: "Meals of the Day & Traditional Dishes", desc: "Breakfast, lunch, dinner, snacks.", minutes: 8, tags: ["meals", "vocabulary"] },
      { title: "Understanding Menus & Prices", desc: "How much is this? Pounds, dollars, rupees.", minutes: 10, tags: ["prices", "shopping"] }
    ]
  },
  {
    num: 6,
    title: "Numbers, Calendar & Dates",
    desc: "Cardinal and ordinal numbers, days, months, and years.",
    icon: "Calendar",
    hours: 2.0,
    lessons: [
      { title: "Cardinal Numbers 1 to 100", desc: "Counting, prices, phone numbers.", minutes: 10, tags: ["numbers", "listening"] },
      { title: "Days of the Week & Months", desc: "Monday through Sunday; January to December.", minutes: 8, tags: ["calendar", "vocabulary"] },
      { title: "Ordinal Numbers (1st, 2nd, 3rd) & Birthdays", desc: "When is your birthday? On the 5th of May.", minutes: 10, tags: ["ordinals", "dates"] },
      { title: "Prepositions of Time: In, On, At", desc: "At 5:00, on Monday, in July.", minutes: 12, tags: ["prepositions-time", "grammar"] },
      { title: "Seasons & Weather Expressions", desc: "It is sunny, it is raining, cold winters.", minutes: 10, tags: ["weather", "vocabulary"] }
    ]
  },
  {
    num: 7,
    title: "Places in Town & Giving Directions",
    desc: "Town locations, prepositions of place, asking directions.",
    icon: "MapPin",
    hours: 2.5,
    lessons: [
      { title: "Places Around Town (Hospital, Bank, Station)", desc: "Essential urban vocabulary.", minutes: 10, tags: ["places", "vocabulary"] },
      { title: "There is & There are", desc: "Describing what exists in a town.", minutes: 12, tags: ["there-is-are", "grammar"] },
      { title: "Prepositions of Place: Next to, Opposite, Between", desc: "Precise spatial location.", minutes: 10, tags: ["prepositions-place"] },
      { title: "Asking for & Giving Directions", desc: "Turn left, go straight, cross the road.", minutes: 12, tags: ["directions", "dialogue"] },
      { title: "Public Transport Vocabulary", desc: "Ticket, platform, bus stop, schedule.", minutes: 8, tags: ["transport", "vocabulary"] }
    ]
  },
  {
    num: 8,
    title: "Feelings, Adjectives & Basic Conversations",
    desc: "Expressing emotions, likes/dislikes, everyday small talk.",
    icon: "Smile",
    hours: 2.2,
    lessons: [
      { title: "Expressing Feelings & Emotions", desc: "Tired, excited, nervous, relaxed.", minutes: 10, tags: ["emotions", "adjectives"] },
      { title: "Likes and Dislikes (Like, Love, Hate + -ing)", desc: "I like reading, I love travelling.", minutes: 12, tags: ["likes-dislikes", "gerunds"] },
      { title: "Basic Question Words: Who, What, Where, When, Why", desc: "Wh- questions in daily dialogue.", minutes: 12, tags: ["wh-questions", "grammar"] },
      { title: "Connecting Words: And, But, Because", desc: "Joining ideas into compound sentences.", minutes: 10, tags: ["connectors", "writing"] },
      { title: "Level A1 Graduation Capstone", desc: "Full conversation synthesizing Level A1.", minutes: 15, tags: ["capstone", "fluency"] }
    ]
  }
];

// ---------------------------------------------------------------------------
// 2. CEFR A2: ELEMENTARY (8 Units)
// ---------------------------------------------------------------------------
const A2_UNITS_DEF: UnitDefinition[] = [
  {
    num: 1,
    title: "Past Simple: Regular Verbs & Finished Time",
    desc: "Past regular verbs, spelling rules, and -ed pronunciations.",
    icon: "Clock",
    hours: 2.5,
    lessons: [
      { title: "Past Simple: Regular Verbs (-ed)", desc: "Form statements with regular past verbs.", minutes: 15, tags: ["past-simple", "regular-verbs", "ed-pronunciation"] },
      { title: "The 3 Pronunciations of -ed: /t/, /d/, /ɪd/", desc: "Pronunciation drills and phonetic distinctions.", minutes: 12, tags: ["ed-pronunciation", "phonetics"] },
      { title: "Past Simple Negatives with 'Didn't'", desc: "I didn't work, she didn't call.", minutes: 12, tags: ["past-simple", "negatives"] },
      { title: "Time Markers for the Past", desc: "Yesterday, last night, two days ago, in 2020.", minutes: 10, tags: ["time-expressions", "past-simple"] },
      { title: "Weekend Activities & Past Dialogues", desc: "What did you do last weekend?", minutes: 10, tags: ["past-simple", "dialogue"] }
    ]
  },
  {
    num: 2,
    title: "Past Simple: Irregular Verbs & Stories",
    desc: "High-frequency irregular verbs, past questions, and narration.",
    icon: "BookOpen",
    hours: 2.8,
    lessons: [
      { title: "Top 30 Common Irregular Verbs (Go -> Went, Have -> Had)", desc: "Memorization patterns and usage.", minutes: 15, tags: ["irregular-verbs", "past-simple"] },
      { title: "Did You...? Questions & Short Answers", desc: "Forming questions in the past simple.", minutes: 12, tags: ["past-simple", "questions"] },
      { title: "Irregular Verbs Group 2: See, Buy, Meet, Eat", desc: "Expanding past vocabulary in stories.", minutes: 12, tags: ["irregular-verbs", "vocabulary"] },
      { title: "Telling a Short Past Story", desc: "Sequencing with first, then, after that, finally.", minutes: 14, tags: ["storytelling", "sequencing"] },
      { title: "A Day to Remember", desc: "Reading and listening comprehension of a journey.", minutes: 12, tags: ["reading", "listening"] }
    ]
  },
  {
    num: 3,
    title: "Comparatives & Superlatives",
    desc: "Comparing people, places, gadgets, and qualities.",
    icon: "TrendingUp",
    hours: 2.2,
    lessons: [
      { title: "Comparative Adjectives (-er / more than)", desc: "Taller than, more expensive than.", minutes: 12, tags: ["comparatives", "adjectives"] },
      { title: "Superlative Adjectives (the -est / the most)", desc: "The fastest, the most famous.", minutes: 12, tags: ["superlatives", "adjectives"] },
      { title: "Irregular Comparisons: Good, Bad, Far", desc: "Better, best; worse, worst; farther/further.", minutes: 10, tags: ["comparatives", "irregular-adjectives"] },
      { title: "Comparing Cities & Countries", desc: "Lahore is hotter than London; Tokyo is cleaner.", minutes: 12, tags: ["comparatives", "geography"] },
      { title: "As... As for Equal Comparisons", desc: "Not as expensive as, as big as.", minutes: 10, tags: ["comparatives", "grammar"] }
    ]
  },
  {
    num: 4,
    title: "Quantifiers & Uncountable Items",
    desc: "Much, many, a lot of, a few, a little, containers.",
    icon: "Package",
    hours: 2.0,
    lessons: [
      { title: "Much vs Many with Questions and Negatives", desc: "How much water? How many chairs?", minutes: 12, tags: ["much-many", "quantifiers"] },
      { title: "A Lot Of & Lots Of in Positive Statements", desc: "Natural conversational quantity.", minutes: 10, tags: ["quantifiers"] },
      { title: "A Few vs A Little", desc: "Small quantities of countable vs uncountable.", minutes: 12, tags: ["quantifiers", "distinctions"] },
      { title: "Containers & Portions: A bottle of, a cup of", desc: "Measuring food, drink, and commodities.", minutes: 10, tags: ["containers", "food"] },
      { title: "Grocery Shopping Dialogue", desc: "Market negotiation and basket check.", minutes: 10, tags: ["shopping", "dialogue"] }
    ]
  },
  {
    num: 5,
    title: "Future Plans with 'Going To' & 'Will'",
    desc: "Intentions, predictions, spontaneous decisions, promises.",
    icon: "Compass",
    hours: 2.4,
    lessons: [
      { title: "Be Going To for Future Plans & Intentions", desc: "I am going to visit my uncle tomorrow.", minutes: 14, tags: ["future", "going-to"] },
      { title: "Will for Instant Decisions, Offers & Promises", desc: "I'll help you carry that bag.", minutes: 12, tags: ["future", "will"] },
      { title: "Future Predictions with Will & Going To", desc: "It will rain / Look at those dark clouds!", minutes: 12, tags: ["predictions", "future"] },
      { title: "Future Time Markers: Next week, tomorrow, soon", desc: "Placing plans accurately in time.", minutes: 8, tags: ["time-expressions", "future"] },
      { title: "Holiday & Vacation Planning", desc: "Booking flights, hotels, and packing bags.", minutes: 12, tags: ["travel", "vocabulary"] }
    ]
  },
  {
    num: 6,
    title: "Travel, Transport & Asking Advice",
    desc: "Airports, stations, modal verbs should/shouldn't.",
    icon: "Navigation",
    hours: 2.2,
    lessons: [
      { title: "Giving Advice with Should & Shouldn't", desc: "You should see a doctor; you shouldn't worry.", minutes: 12, tags: ["should", "modals", "advice"] },
      { title: "At the Airport & Security Check", desc: "Boarding pass, gate, passport control.", minutes: 12, tags: ["airport", "travel"] },
      { title: "Hotels & Accommodation Problems", desc: "The air conditioner is broken; extra towels.", minutes: 10, tags: ["hotel", "problems"] },
      { title: "Asking for Tourist Recommendations", desc: "What should I visit in this city?", minutes: 10, tags: ["recommendations", "dialogue"] },
      { title: "Travel Emergencies & Assistance", desc: "I lost my passport; calling emergency.", minutes: 10, tags: ["emergencies", "travel"] }
    ]
  },
  {
    num: 7,
    title: "Health, Body & Illnesses",
    desc: "Symptoms, doctor visits, parts of the body.",
    icon: "Activity",
    hours: 2.0,
    lessons: [
      { title: "Parts of the Body Vocabulary", desc: "Head, shoulder, knee, ankle, throat.", minutes: 10, tags: ["body", "vocabulary"] },
      { title: "Describing Symptoms: Have a headache, feel dizzy", desc: "Explaining ailments clearly.", minutes: 12, tags: ["symptoms", "health"] },
      { title: "At the Doctor's Clinic Dialogue", desc: "Answering diagnostic questions.", minutes: 12, tags: ["doctor", "dialogue"] },
      { title: "Medicine & Pharmacy Phrases", desc: "Painkillers, dosage, prescription.", minutes: 10, tags: ["pharmacy", "medicine"] },
      { title: "Healthy Lifestyle Tips", desc: "Diet, exercise, sleep, and hydration.", minutes: 10, tags: ["wellness", "reading"] }
    ]
  },
  {
    num: 8,
    title: "Jobs, Abilities & Level A2 Capstone",
    desc: "Can/could for ability, professions, career vocabulary.",
    icon: "Briefcase",
    hours: 2.4,
    lessons: [
      { title: "Modern Professions & Workplaces", desc: "Engineer, programmer, nurse, accountant.", minutes: 10, tags: ["jobs", "vocabulary"] },
      { title: "Can & Could: Present & Past Abilities", desc: "I can speak Urdu; I couldn't swim at age 5.", minutes: 12, tags: ["can-could", "abilities"] },
      { title: "Describing Job Responsibilities", desc: "I am responsible for, my duties include.", minutes: 12, tags: ["work", "writing"] },
      { title: "Applying for an Entry-Level Job", desc: "Basic CV phrases and interview answers.", minutes: 12, tags: ["job-interview", "careers"] },
      { title: "Level A2 Elementary Graduation Capstone", desc: "Integrated multi-skill synthesis test.", minutes: 15, tags: ["capstone", "fluency"] }
    ]
  }
];

// ---------------------------------------------------------------------------
// 3. CEFR B1: INTERMEDIATE (8 Units)
// ---------------------------------------------------------------------------
const B1_UNITS_DEF: UnitDefinition[] = [
  {
    num: 1,
    title: "Present Perfect vs Past Simple",
    desc: "Life experiences, for/since, already/yet/just.",
    icon: "Sparkles",
    hours: 3.0,
    lessons: [
      { title: "Present Perfect: Experiences with Ever & Never", desc: "Have you ever visited Turkey?", minutes: 14, tags: ["present-perfect", "experiences"] },
      { title: "Present Perfect with For and Since", desc: "I have lived here for five years / since 2019.", minutes: 14, tags: ["for-since", "present-perfect"] },
      { title: "Present Perfect vs Past Simple Contrast", desc: "Specific finished time vs ongoing relevance.", minutes: 15, tags: ["present-perfect-vs-past"] },
      { title: "Already, Just, and Yet in Context", desc: "I have already finished; haven't called yet.", minutes: 12, tags: ["already-yet-just"] },
      { title: "Job Interview: Talking About Accomplishments", desc: "What achievements have you completed?", minutes: 14, tags: ["careers", "present-perfect"] }
    ]
  },
  {
    num: 2,
    title: "Modals of Obligation & Prohibition",
    desc: "Must, have to, mustn't, don't have to, should.",
    icon: "ShieldAlert",
    hours: 2.5,
    lessons: [
      { title: "Must vs Have To: Internal vs External Obligation", desc: "Rules, laws, and personal determinations.", minutes: 14, tags: ["must-have-to", "modals"] },
      { title: "Mustn't vs Don't Have To", desc: "Strict prohibition vs lack of necessity.", minutes: 12, tags: ["prohibition", "necessity"] },
      { title: "Workplace Rules & Safety Guidelines", desc: "Safety helmets, confidentiality, arrival times.", minutes: 12, tags: ["rules", "vocabulary"] },
      { title: "Can, Allowed To, Permitted To", desc: "Expressing formal permission.", minutes: 10, tags: ["permission", "modals"] },
      { title: "Debating Driving & Traffic Regulations", desc: "Legal requirements and opinions.", minutes: 12, tags: ["regulations", "speaking"] }
    ]
  },
  {
    num: 3,
    title: "First & Second Conditionals",
    desc: "Real future conditions and hypothetical dreams.",
    icon: "GitBranch",
    hours: 2.8,
    lessons: [
      { title: "First Conditional: Real Future Possibilities", desc: "If it rains tomorrow, we will stay home.", minutes: 14, tags: ["first-conditional", "conditionals"] },
      { title: "Second Conditional: Hypothetical Scenarios", desc: "If I won a million dollars, I would travel.", minutes: 14, tags: ["second-conditional", "conditionals"] },
      { title: "If I were you... Giving Advice", desc: "Second conditional for empathetic counsel.", minutes: 12, tags: ["advice", "second-conditional"] },
      { title: "Unless, As long as, In case", desc: "Alternative conditional conjunctions.", minutes: 12, tags: ["conjunctions", "conditionals"] },
      { title: "Dream Inventions & Ideal Careers Discussion", desc: "Hypothetical future scenarios.", minutes: 12, tags: ["discussion", "fluency"] }
    ]
  },
  {
    num: 4,
    title: "Passive Voice: Present & Past",
    desc: "Focusing on the action and result rather than the agent.",
    icon: "Repeat",
    hours: 2.5,
    lessons: [
      { title: "Present Simple Passive (is/are + past participle)", desc: "English is spoken worldwide.", minutes: 14, tags: ["passive-voice", "grammar"] },
      { title: "Past Simple Passive (was/were + past participle)", desc: "The internet was invented in the 20th century.", minutes: 14, tags: ["passive-voice", "history"] },
      { title: "When to Use By + Agent", desc: "Deciding when mentioning the doer matters.", minutes: 10, tags: ["passive-voice", "agent"] },
      { title: "Manufacturing & Industrial Processes", desc: "How cars, phones, and fabrics are made.", minutes: 12, tags: ["processes", "vocabulary"] },
      { title: "News Bulletins & Crime Reports", desc: "The museum was broken into last night.", minutes: 12, tags: ["news", "passive-voice"] }
    ]
  },
  {
    num: 5,
    title: "Relative Clauses: Defining & Non-Defining",
    desc: "Who, which, that, where, whose to join ideas.",
    icon: "Link",
    hours: 2.6,
    lessons: [
      { title: "Defining Relative Clauses (Who, Which, That)", desc: "The man who called you is my manager.", minutes: 14, tags: ["relative-clauses", "defining"] },
      { title: "Whose for Possession & Where for Locations", desc: "The student whose bag was found.", minutes: 12, tags: ["whose-where", "relative-clauses"] },
      { title: "Non-Defining Clauses with Commas", desc: "Karachi, which is the largest city, is busy.", minutes: 14, tags: ["non-defining", "punctuation"] },
      { title: "Omitting Relative Pronouns (Contact Clauses)", desc: "The book (that) I read yesterday.", minutes: 10, tags: ["omission", "style"] },
      { title: "Biographies & Influential Leaders", desc: "Writing profiles of historical figures.", minutes: 14, tags: ["biographies", "writing"] }
    ]
  },
  {
    num: 6,
    title: "Work, Education & Career Ambitions",
    desc: "Workplace terminology, higher education, and meetings.",
    icon: "GraduationCap",
    hours: 2.4,
    lessons: [
      { title: "University Degrees & Academic Disciplines", desc: "Undergraduate, postgraduate, thesis, faculty.", minutes: 12, tags: ["academia", "vocabulary"] },
      { title: "Participating in Professional Meetings", desc: "Agreeing, disagreeing politely, taking turns.", minutes: 14, tags: ["meetings", "communication"] },
      { title: "Writing Professional Business Emails", desc: "Salutations, attachments, formal requests.", minutes: 14, tags: ["email-writing", "business"] },
      { title: "Describing Trends with Graphs & Charts", desc: "Increase steadily, drop sharply, fluctuate.", minutes: 14, tags: ["ielts-task1-prep", "trends"] },
      { title: "Workplace Culture & Remote Work", desc: "Productivity, work-life balance, flexibility.", minutes: 12, tags: ["workplace", "discussion"] }
    ]
  },
  {
    num: 7,
    title: "Environment, Climate & Modern Tech",
    desc: "Sustainability, renewable energy, AI, and social media.",
    icon: "Globe",
    hours: 2.5,
    lessons: [
      { title: "Environmental Challenges & Pollution", desc: "Deforestation, global warming, emissions.", minutes: 12, tags: ["environment", "vocabulary"] },
      { title: "Renewable Energy & Eco-Friendly Habits", desc: "Solar, wind power, recycling, reduction.", minutes: 12, tags: ["sustainability", "reading"] },
      { title: "The Impact of Artificial Intelligence", desc: "Automation, algorithms, future careers.", minutes: 14, tags: ["technology", "debate"] },
      { title: "Social Media: Pros and Cons", desc: "Connectivity vs distraction and mental health.", minutes: 12, tags: ["social-media", "writing"] },
      { title: "Structuring a Balanced Opinion Essay", desc: "Introduction, body paragraphs, conclusion.", minutes: 15, tags: ["essay-writing", "ielts-task2-prep"] }
    ]
  },
  {
    num: 8,
    title: "Culture, Art & Level B1 Capstone",
    desc: "Traditions, storytelling, and Intermediate synthesis.",
    icon: "Award",
    hours: 2.8,
    lessons: [
      { title: "Festivals & Cultural Traditions", desc: "Eid, weddings, historical celebrations.", minutes: 12, tags: ["culture", "vocabulary"] },
      { title: "Film & Literature Critique", desc: "Plot, characters, climax, soundtrack review.", minutes: 14, tags: ["reviews", "art"] },
      { title: "Expressing Complex Opinions & Speculation", desc: "In my perspective, it seems likely that.", minutes: 12, tags: ["opinions", "fluency"] },
      { title: "Idiomatic Everyday Expressions", desc: "Piece of cake, hit the nail on the head.", minutes: 12, tags: ["idioms", "vocabulary"] },
      { title: "Level B1 Intermediate Graduation Capstone", desc: "Full assessment evaluating B1 independent user.", minutes: 15, tags: ["capstone", "mastery"] }
    ]
  }
];

// ---------------------------------------------------------------------------
// 4. CEFR B2: UPPER-INTERMEDIATE (8 Units)
// ---------------------------------------------------------------------------
const B2_UNITS_DEF: UnitDefinition[] = [
  {
    num: 1,
    title: "Advanced Conditionals & Regrets",
    desc: "Third conditional, mixed conditionals, and wish/if only.",
    icon: "RotateCcw",
    hours: 3.0,
    lessons: [
      { title: "Third Conditional: Past Impossibility", desc: "If I had known, I would have warned you.", minutes: 15, tags: ["third-conditional", "grammar"] },
      { title: "Mixed Conditionals (Past Condition -> Present Result)", desc: "If he had taken the job, he would live in Dubai.", minutes: 15, tags: ["mixed-conditionals"] },
      { title: "Wish & If Only for Past Regrets & Present Desires", desc: "I wish I had studied harder.", minutes: 14, tags: ["wish-if-only"] },
      { title: "Inverted Conditionals (Had I known...)", desc: "Formal literary style without 'if'.", minutes: 12, tags: ["inversion", "style"] },
      { title: "Historical 'What Ifs' Debate", desc: "Discussing alternate historical turning points.", minutes: 14, tags: ["debate", "speaking"] }
    ]
  },
  {
    num: 2,
    title: "Passive Voice & Causatives",
    desc: "Complex passive forms, reporting passives, have/get done.",
    icon: "Cpu",
    hours: 2.8,
    lessons: [
      { title: "Impersonal Reporting Passives (It is said that...)", desc: "He is believed to be in hiding.", minutes: 14, tags: ["reporting-passive"] },
      { title: "Causative Verbs: Have / Get Something Done", desc: "I had my car repaired; got my hair cut.", minutes: 14, tags: ["causative", "grammar"] },
      { title: "Continuous & Modal Passives", desc: "The bridge is being rebuilt; should be checked.", minutes: 12, tags: ["passive-voice"] },
      { title: "Academic Journal Analysis", desc: "Reading passive structures in scientific research.", minutes: 15, tags: ["academic-reading", "ielts-prep"] },
      { title: "Writing a Formal Executive Summary", desc: "Concise objective reporting for business.", minutes: 14, tags: ["business-writing", "summary"] }
    ]
  },
  {
    num: 3,
    title: "Reported Speech & Nuanced Verbs",
    desc: "Tense backshifting, reporting verbs (insist, urge, admit).",
    icon: "MessageSquare",
    hours: 2.6,
    lessons: [
      { title: "Advanced Backshifting & Modal Changes", desc: "Could, would, might, should in reported speech.", minutes: 14, tags: ["reported-speech"] },
      { title: "Nuanced Reporting Verbs: Accuse, Congratulate, Warn", desc: "Verb patterns: verb + prep + -ing / verb + to + inf.", minutes: 14, tags: ["reporting-verbs"] },
      { title: "Reporting Questions & Orders", desc: "She asked if I had arrived; ordered him to stop.", minutes: 12, tags: ["reported-questions"] },
      { title: "Courtroom & Journalism Transcription", desc: "Documenting witness testimonies accurately.", minutes: 14, tags: ["journalism", "reading"] },
      { title: "Press Conference Roleplay", desc: "Interviewing a spokesperson and summarizing remarks.", minutes: 14, tags: ["speaking", "roleplay"] }
    ]
  },
  {
    num: 4,
    title: "Gerunds vs Infinitives with Meaning Shift",
    desc: "Remember, stop, regret, try, forget in dual forms.",
    icon: "Sliders",
    hours: 2.5,
    lessons: [
      { title: "Verbs Changing Meaning: Stop to talk vs Stop talking", desc: "Crucial grammatical distinctions.", minutes: 15, tags: ["gerund-infinitive"] },
      { title: "Remember & Forget: Future Duty vs Past Memory", desc: "Remember to lock vs Remember locking.", minutes: 14, tags: ["gerunds", "infinitives"] },
      { title: "Preposition + Gerund Patterns", desc: "Accused of cheating, looking forward to meeting.", minutes: 12, tags: ["prepositions", "gerunds"] },
      { title: "Bare Infinitives after Make, Let, Help", desc: "He made me do it; let them speak.", minutes: 10, tags: ["bare-infinitive"] },
      { title: "Psychological Self-Reflection Essay", desc: "Writing about past habits and changed behaviors.", minutes: 14, tags: ["writing", "reflection"] }
    ]
  },
  {
    num: 5,
    title: "Modals of Deduction & Speculation",
    desc: "Must have, can't have, might have, could have.",
    icon: "Search",
    hours: 2.8,
    lessons: [
      { title: "Past Speculation: Must Have vs Can't Have", desc: "He must have left his keys; can't have forgotten.", minutes: 15, tags: ["past-modals", "deduction"] },
      { title: "Could have & Might have for Past Possibilities", desc: "They might have missed the announcement.", minutes: 14, tags: ["speculation", "modals"] },
      { title: "Should have & Ought to have for Past Criticism", desc: "You should have double-checked the documents.", minutes: 12, tags: ["criticism", "should-have"] },
      { title: "Solving a Mystery: Detective Analysis", desc: "Deducing what occurred at a crime scene.", minutes: 14, tags: ["mystery", "deduction"] },
      { title: "Scientific Hypotheses Formation", desc: "Using tentative language to state scientific findings.", minutes: 12, tags: ["academic-english", "science"] }
    ]
  },
  {
    num: 6,
    title: "Discourse Markers & Sentence Cohesion",
    desc: "Furthermore, nonetheless, whereas, in spite of, consequently.",
    icon: "AlignLeft",
    hours: 2.6,
    lessons: [
      { title: "Contrast Connectors: In spite of, Despite, Although", desc: "Concession clauses and prepositional clauses.", minutes: 14, tags: ["contrast", "cohesion"] },
      { title: "Addition & Cause Connectors: Furthermore, Therefore", desc: "Building convincing paragraph flow.", minutes: 14, tags: ["cohesion", "writing"] },
      { title: "Balancing Views: On the one hand, Whereas, While", desc: "Essential for IELTS Writing Task 2.", minutes: 12, tags: ["task2-prep", "discourse"] },
      { title: "Elevating Lexical Resource with Academic Synonyms", desc: "Replacing basic words with sophisticated vocabulary.", minutes: 14, tags: ["lexical-resource", "vocabulary"] },
      { title: "Academic Editorial Essay Drafting", desc: "Writing an 300-word cohesive critique.", minutes: 15, tags: ["essay-writing", "writing"] }
    ]
  },
  {
    num: 7,
    title: "Phrasal Verbs in Professional Domains",
    desc: "Separable vs inseparable phrasals, three-part verbs.",
    icon: "Zap",
    hours: 2.8,
    lessons: [
      { title: "Transitive vs Intransitive & Separable Phrasal Verbs", desc: "Turn off the light / turn it off.", minutes: 15, tags: ["phrasal-verbs", "syntax"] },
      { title: "Three-Part Phrasal Verbs (Put up with, Look forward to)", desc: "Run out of, cut down on, come up with.", minutes: 14, tags: ["three-part-phrasals"] },
      { title: "Business Phrasal Verbs: Call off, Carry out, Wrap up", desc: "Natural workplace idioms.", minutes: 12, tags: ["business-phrasals"] },
      { title: "Financial & Economic Phrasal Verbs: Pay off, Bail out", desc: "Fiscal policy and company budgets.", minutes: 12, tags: ["economics", "vocabulary"] },
      { title: "Corporate Strategy Negotiation Dialogue", desc: "Executing contracts and team consensus.", minutes: 14, tags: ["negotiation", "dialogue"] }
    ]
  },
  {
    num: 8,
    title: "Persuasion, Rhetoric & Level B2 Capstone",
    desc: "Debating, nuanced negotiation, and B2 graduation.",
    icon: "Award",
    hours: 3.0,
    lessons: [
      { title: "Rhetorical Devices & Persuasive Techniques", desc: "Rule of three, rhetorical questions, parallel structures.", minutes: 15, tags: ["rhetoric", "persuasion"] },
      { title: "Constructive Disagreement in Professional Settings", desc: "I see your point, however; with respect.", minutes: 12, tags: ["diplomacy", "speaking"] },
      { title: "Delivering an Impromptu Presentation", desc: "Signposting, hook, overview, conclusion.", minutes: 15, tags: ["presentations", "speaking"] },
      { title: "Critical Reading of Editorial Biases", desc: "Identifying tone, slant, and unstated assumptions.", minutes: 15, tags: ["critical-reading", "analysis"] },
      { title: "Level B2 Upper-Intermediate Graduation Capstone", desc: "Full rigorous synthesis test verifying B2 competence.", minutes: 15, tags: ["capstone", "mastery"] }
    ]
  }
];

// ---------------------------------------------------------------------------
// 5. CEFR C1: ADVANCED (8 Units)
// ---------------------------------------------------------------------------
const C1_UNITS_DEF: UnitDefinition[] = [
  {
    num: 1,
    title: "Inversion & Dramatic Emphasis",
    desc: "Negative adverbials, limiting expressions, dramatic fronting.",
    icon: "Flame",
    hours: 3.2,
    lessons: [
      { title: "Negative Inversion: Seldom, Rarely, Never before", desc: "Rarely have I witnessed such dedication.", minutes: 15, tags: ["negative-inversion", "syntax"] },
      { title: "Limiting Expressions: Not only... but also, No sooner... than", desc: "No sooner had we arrived than it poured.", minutes: 15, tags: ["inversion", "emphasis"] },
      { title: "Only when & Under no circumstances Inversion", desc: "Under no circumstances should this valve be opened.", minutes: 14, tags: ["inversion", "formal-style"] },
      { title: "Dramatic Narrative Fronting (Down rushed the rain)", desc: "Literary inversion in classical prose.", minutes: 12, tags: ["literary-style"] },
      { title: "Keynote Speech Writing with Inversion", desc: "Crafting memorable speeches for executive audiences.", minutes: 15, tags: ["speeches", "writing"] }
    ]
  },
  {
    num: 2,
    title: "Cleft Sentences & Focus Structures",
    desc: "It-clefts, wh-clefts (pseudo-clefts), all-clefts, reversed clefts.",
    icon: "Target",
    hours: 3.0,
    lessons: [
      { title: "It-Cleft Sentences: It was John who broke the silence", desc: "Focusing attention on specific elements.", minutes: 15, tags: ["it-clefts", "grammar"] },
      { title: "Wh-Clefts (Pseudo-Clefts): What we need is decisive action", desc: "Highlighting requirements and desires.", minutes: 15, tags: ["wh-clefts"] },
      { title: "All-Clefts & The Thing That: All I ask for is honesty", desc: "Isolating essential components of arguments.", minutes: 12, tags: ["cleft-sentences"] },
      { title: "Reversed Clefts: A new approach is what is required", desc: "Academic elegance and cohesion.", minutes: 12, tags: ["advanced-syntax"] },
      { title: "Deconstructing Political Speeches", desc: "Analyzing how leaders manipulate focus.", minutes: 15, tags: ["speech-analysis", "rhetoric"] }
    ]
  },
  {
    num: 3,
    title: "Subjunctive Mood & Hypothetical Stances",
    desc: "Mandative subjunctive, formulaic expressions, unreal past.",
    icon: "Command",
    hours: 2.8,
    lessons: [
      { title: "Mandative Subjunctive: It is vital that he be informed", desc: "Demands, recommendations, and official decrees.", minutes: 15, tags: ["subjunctive", "grammar"] },
      { title: "Formulaic Subjunctive: Come what may, Be that as it may", desc: "Fixed idiomatic subjunctive relics.", minutes: 12, tags: ["idiomatic-subjunctive"] },
      { title: "Unreal Past with As though & As if", desc: "He speaks as if he were an authority on the topic.", minutes: 14, tags: ["unreal-past", "hypotheticals"] },
      { title: "It is high time / It is about time + Past Tense", desc: "Expressing urgent delayed action.", minutes: 10, tags: ["high-time", "syntax"] },
      { title: "Drafting Official Legal & Policy Declarations", desc: "Using subjunctive clarity in formal bylaws.", minutes: 15, tags: ["legal-english", "writing"] }
    ]
  },
  {
    num: 4,
    title: "Hedging, Nuance & Academic Caution",
    desc: "Epistemic stance, modal approximations, avoiding dogmatism.",
    icon: "Shield",
    hours: 3.0,
    lessons: [
      { title: "Hedging Principles in Academic Writing", desc: "It appears to indicate; the evidence suggests.", minutes: 15, tags: ["hedging", "academic-style"] },
      { title: "Lexical Hedges: Arguably, Conceivably, Ostensibly", desc: "Calibrating confidence and objectivity.", minutes: 14, tags: ["lexical-hedges"] },
      { title: "Modal Verbs as Softeners in High-Stakes Negotiations", desc: "We might want to consider alternative avenues.", minutes: 12, tags: ["diplomacy", "negotiation"] },
      { title: "Critiquing Research Papers: Identifying Overstatements", desc: "Detecting unsubstantiated generalizations.", minutes: 15, tags: ["critical-analysis", "reading"] },
      { title: "Publishing a Peer-Reviewed Literature Review", desc: "Drafting an excerpt synthesising conflicting studies.", minutes: 15, tags: ["academic-publishing", "writing"] }
    ]
  },
  {
    num: 5,
    title: "Complex Narrative Tenses & Aspectual Distinctions",
    desc: "Past perfect continuous, future perfect continuous, narrative framing.",
    icon: "FastForward",
    hours: 3.0,
    lessons: [
      { title: "Past Perfect Continuous: Cumulative Past Duration", desc: "They had been negotiating for six months before agreement.", minutes: 15, tags: ["past-perfect-continuous"] },
      { title: "Future Perfect & Future Perfect Continuous", desc: "By 2030, we will have been operating for a decade.", minutes: 14, tags: ["future-perfect-continuous"] },
      { title: "Aspectual Distinctions: State vs Dynamic Multi-layered Tenses", desc: "Stative verbs in progressive aspect.", minutes: 14, tags: ["aspect", "verbs"] },
      { title: "Literary Flashbacks & Time-Shifting Narratives", desc: "Orchestrating non-linear storylines.", minutes: 15, tags: ["narrative", "creative-writing"] },
      { title: "Documentary Voiceover Scripting", desc: "Writing historical scripts with dramatic temporal flow.", minutes: 15, tags: ["scriptwriting", "listening"] }
    ]
  },
  {
    num: 6,
    title: "Advanced Collocations, Binomials & Idiomatic Register",
    desc: "Binomial pairs, tricolons, register clash, socio-linguistics.",
    icon: "Puzzle",
    hours: 3.0,
    lessons: [
      { title: "Binomial & Trinomial Pairs: Null and void, By and large", desc: "Fixed word pairings in high-register English.", minutes: 14, tags: ["binomials", "collocations"] },
      { title: "Avoiding Register Clash: Formal vs Colloquial Juxtaposition", desc: "Maintaining consistent stylistic register.", minutes: 14, tags: ["register", "style"] },
      { title: "Delexical Verbs: Make, Take, Have, Give + Abstract Nouns", desc: "Take exception to, have reservations about.", minutes: 14, tags: ["delexical-verbs"] },
      { title: "Figurative Language: Extended Metaphors & Analogies", desc: "Using vivid conceptual imagery in essays.", minutes: 15, tags: ["metaphor", "writing"] },
      { title: "High-Level Editorial Columnist Challenge", desc: "Writing a piece worthy of The Economist or Guardian.", minutes: 15, tags: ["journalism", "writing"] }
    ]
  },
  {
    num: 7,
    title: "Persuasive Rhetoric, Debate & Philosophical Inquiry",
    desc: "Logical fallacies, debating strategies, philosophical thought.",
    icon: "HelpCircle",
    hours: 3.2,
    lessons: [
      { title: "Identifying Logical Fallacies in Arguments", desc: "Straw man, ad hominem, false dilemma, post hoc.", minutes: 15, tags: ["logic", "fallacies"] },
      { title: "Refutation & Rebuttal Formulations in Debates", desc: "Countering opponent premises systematically.", minutes: 15, tags: ["debate", "speaking"] },
      { title: "Philosophical Inquiry: Ethics, AI & Bio-Technology", desc: "Discussing trolley problems and genetic engineering.", minutes: 15, tags: ["philosophy", "discussion"] },
      { title: "Structuring a C1 Band 8.5+ IELTS Essay", desc: "Flawless cohesion, lexical range, and task achievement.", minutes: 15, tags: ["ielts-mastery", "task2-c1"] },
      { title: "The Oxford Union Style Debate Simulation", desc: "Delivering opening and closing floor motions.", minutes: 15, tags: ["debate", "capstone"] }
    ]
  },
  {
    num: 8,
    title: "Mastery Synthesis & Level C1 Capstone",
    desc: "Near-native competence, comprehensive evaluation, graduation.",
    icon: "GraduationCap",
    hours: 3.5,
    lessons: [
      { title: "Nuance in Cultural Subtext & British/American Wit", desc: "Understatement, sarcasm, double entendres.", minutes: 15, tags: ["subtext", "cultural-nuance"] },
      { title: "Simultaneous Listening & Note-taking in Academic Lectures", desc: "Extracting core thesis from rapid speeches.", minutes: 15, tags: ["listening-c1", "note-taking"] },
      { title: "High-Stakes Crisis Communication Management", desc: "Executive press releases under public scrutiny.", minutes: 15, tags: ["crisis-management", "writing"] },
      { title: "Refining Your Personal English Voice", desc: "Developing cadence, tone, and rhetorical maturity.", minutes: 15, tags: ["voice", "style"] },
      { title: "Level C1 Advanced Master Graduation Capstone", desc: "Rigorous 50-minute multi-skill examination.", minutes: 15, tags: ["capstone", "mastery"] }
    ]
  }
];

export const ALL_COURSE_LEVELS: CourseLevelMetadata[] = [
  {
    level: 'A1',
    title: 'A1 - Beginner Foundations',
    subtitle: 'From zero to basic everyday conversations',
    description: 'Learn the English alphabet, numbers, greetings, the verb to be, daily routines, and essential basic vocabulary.',
    totalUnits: 8,
    badge: 'Beginner',
    themeColor: '#124F40',
    units: createLevelUnits('A1', A1_UNITS_DEF),
  },
  {
    level: 'A2',
    title: 'A2 - Elementary Proficiency',
    subtitle: 'Past experiences, comparisons, and holiday plans',
    description: 'Master the past simple, regular and irregular verbs, comparatives, future intentions, and travel dialogues.',
    totalUnits: 8,
    badge: 'Elementary',
    themeColor: '#1A6855',
    units: createLevelUnits('A2', A2_UNITS_DEF),
  },
  {
    level: 'B1',
    title: 'B1 - Intermediate Fluency',
    subtitle: 'Present perfect, conditionals, and independent communication',
    description: 'Connect ideas smoothly with relative clauses, passive voice, conditionals, and workplace conversations.',
    totalUnits: 8,
    badge: 'Intermediate',
    themeColor: '#25826A',
    units: createLevelUnits('B1', B1_UNITS_DEF),
  },
  {
    level: 'B2',
    title: 'B2 - Upper-Intermediate Competence',
    subtitle: 'Complex grammar, speculation, and professional fluency',
    description: 'Third conditionals, modals of deduction, cohesive devices, phrasal verbs, and fluent academic debates.',
    totalUnits: 8,
    badge: 'Upper-Int',
    themeColor: '#2F9C80',
    units: createLevelUnits('B2', B2_UNITS_DEF),
  },
  {
    level: 'C1',
    title: 'C1 - Advanced Mastery',
    subtitle: 'Inversion, cleft sentences, nuanced rhetoric, and near-native flow',
    description: 'Subjunctive mood, negative inversion, hedging, academic caution, and executive-level argumentation.',
    totalUnits: 8,
    badge: 'Advanced',
    themeColor: '#39B696',
    units: createLevelUnits('C1', C1_UNITS_DEF),
  },
];

export function getLevelMetadata(level: EnglishCEFRLevel): CourseLevelMetadata {
  const found = ALL_COURSE_LEVELS.find((l) => l.level === level);
  return found || ALL_COURSE_LEVELS[0];
}

export function getUnitMetadata(unitId: string): CourseUnitMetadata | undefined {
  for (const lvl of ALL_COURSE_LEVELS) {
    const unit = lvl.units.find((u) => u.id === unitId);
    if (unit) return unit;
  }
  return undefined;
}

export function getLessonSummary(lessonId: string): CourseLessonSummary | undefined {
  for (const lvl of ALL_COURSE_LEVELS) {
    for (const unit of lvl.units) {
      const lesson = unit.lessons.find((l) => l.id === lessonId);
      if (lesson) return lesson;
      if (unit.reviewLesson.id === lessonId) return unit.reviewLesson;
      if (unit.unitTest.id === lessonId) return unit.unitTest;
    }
  }
  return undefined;
}
