// Speaking and Pronunciation Drills Library for General English
// Covers: Minimal Pairs, Syllable & Sentence Stress, Tongue-Twisters,
// Repeat-After-Me, Shadowing, and Interactive Multi-Turn Role-Play Conversations.

import type { EnglishCEFRLevel } from '../../../types';

export interface MinimalPairItem {
  id: string;
  pair: [string, string];
  ipa: [string, string];
  contrastTitle: string;
  mouthGuide: string;
  urduTip: string;
  practiceSentences: Array<{ targetWord: string; sentence: string }>;
}

export interface StressDrillItem {
  id: string;
  type: 'word-noun-verb' | 'word-family' | 'sentence-rhythm';
  title: string;
  level: EnglishCEFRLevel;
  explanation: string;
  urduExplanation: string;
  examples: Array<{
    wordOrSentence: string;
    stressedPart: string;
    ipa?: string;
    audioText: string;
    category?: string;
  }>;
}

export interface TongueTwisterItem {
  id: string;
  level: EnglishCEFRLevel;
  difficulty: 'Easy' | 'Medium' | 'Challenging' | 'Expert';
  text: string;
  focusSound: string;
  targetWpm: number;
  urduNote: string;
}

export interface ShadowingSentence {
  id: string;
  level: EnglishCEFRLevel;
  topic: string;
  sentence: string;
  targetWpm: number;
  keyPhonemes: string[];
  urduTranslation: string;
}

export interface RolePlayTurn {
  speaker: 'app' | 'user';
  name: string;
  expectedText: string;
  suggestedAlternatives?: string[];
  audioText?: string;
  feedbackTip?: string;
}

export interface RolePlayScenario {
  id: string;
  title: string;
  level: EnglishCEFRLevel;
  description: string;
  appRole: string;
  userRole: string;
  scenarioContext: string;
  turns: RolePlayTurn[];
  urduContext: string;
}

export const MINIMAL_PAIRS: MinimalPairItem[] = [
  {
    id: 'mp-short-long-i',
    pair: ['Ship', 'Sheep'],
    ipa: ['/ʃɪp/', '/ʃiːp/'],
    contrastTitle: 'Short /ɪ/ vs Long /iː/',
    mouthGuide: 'For /ɪ/ (ship, sit), keep your lips relaxed and tongue slightly lower. For /iː/ (sheep, seat), stretch your lips wide like a smile and hold the vowel slightly longer.',
    urduTip: 'چھوٹی "اِ" (جیسے دِل) اور لمبی "ای" (جیسے چیل) کا فرق۔ Ship کی آواز مختصر ہوتی ہے، جبکہ sheep میں ہونٹ مسکراہٹ کی طرح پھیلتے ہیں۔',
    practiceSentences: [
      { targetWord: 'Ship', sentence: 'The large cargo ship arrived at the harbor.' },
      { targetWord: 'Sheep', sentence: 'Three white sheep grazed peacefully on the green hill.' },
      { targetWord: 'Sit', sentence: 'Please sit down on this comfortable chair.' },
      { targetWord: 'Seat', sentence: 'Is this front window seat currently occupied?' }
    ]
  },
  {
    id: 'mp-w-v',
    pair: ['Wet', 'Vet'],
    ipa: ['/wɛt/', '/vɛt/'],
    contrastTitle: 'Bilabial /w/ vs Labiodental /v/',
    mouthGuide: 'For /w/ (wet, wine), round your lips tightly like whistling without touching your teeth. For /v/ (vet, vine), touch your top front teeth gently to your lower lip and vibrate your vocal cords.',
    urduTip: '/w/ کے لیے ہونٹ گول کریں (سیٹی بجانے کے انداز میں)، جبکہ /v/ کے لیے اوپر کے دانت نیچے کے ہونٹ پر رکھ کر آواز میں گونج پیدا کریں۔',
    practiceSentences: [
      { targetWord: 'Wet', sentence: 'My jacket got completely wet in the heavy rain.' },
      { targetWord: 'Vet', sentence: 'We took our sick kitten to the local vet.' },
      { targetWord: 'Wine', sentence: 'They served sparkling white grape juice with dinner.' },
      { targetWord: 'Vine', sentence: 'Ivy vines were growing gracefully up the stone wall.' }
    ]
  },
  {
    id: 'mp-th-s',
    pair: ['Think', 'Sink'],
    ipa: ['/θɪŋk/', '/sɪŋk/'],
    contrastTitle: 'Voiceless Dental /θ/ vs Alveolar /s/',
    mouthGuide: 'For /θ/ (think, thick), place the tip of your tongue gently between your upper and lower front teeth. For /s/ (sink, sick), keep your tongue behind closed teeth.',
    urduTip: 'انگریزی "th" کے لیے زبان کی نوک دونوں دانتوں کے درمیان رکھیں تاکہ ہوا دانتوں اور زبان کے بیچ سے نکلے۔',
    practiceSentences: [
      { targetWord: 'Think', sentence: 'I genuinely think this is the right decision.' },
      { targetWord: 'Sink', sentence: 'Please wash the plates in the kitchen sink.' },
      { targetWord: 'Thick', sentence: 'She wore a thick woolen winter coat.' },
      { targetWord: 'Sick', sentence: 'He stayed home because he was feeling sick.' }
    ]
  },
  {
    id: 'mp-voiced-th-d',
    pair: ['Then', 'Den'],
    ipa: ['/ðɛn/', '/dɛn/'],
    contrastTitle: 'Voiced Dental /ð/ vs Alveolar /d/',
    mouthGuide: 'For /ð/ (this, then), your tongue touches the front teeth with vocal cord vibration. For /d/ (den, day), your tongue taps the hard ridge behind your upper teeth.',
    urduTip: 'اردو بولنے والے اکثر "th" کو سادہ "د" بولتے ہیں۔ درست تلفظ کے لیے زبان کو دانتوں کے بالکل سرے پر رکھیں۔',
    practiceSentences: [
      { targetWord: 'Then', sentence: 'We finished our homework and then went to sleep.' },
      { targetWord: 'Den', sentence: 'The sleeping bears rested safely inside the mountain den.' },
      { targetWord: 'There', sentence: 'There are three ripe apples on the counter.' },
      { targetWord: 'Dare', sentence: 'Do not dare to touch that hot stove.' }
    ]
  },
  {
    id: 'mp-b-p',
    pair: ['Bat', 'Pat'],
    ipa: ['/bæt/', '/pæt/'],
    contrastTitle: 'Voiced /b/ vs Aspirated Voiceless /p/',
    mouthGuide: 'Both use both lips. /p/ has a burst of air (aspiration)—hold a tissue in front of your mouth to see it flutter. /b/ has vocal cord vibration with less air burst.',
    urduTip: 'انگریزی "p" میں ہلکی سی ہوا کا اخراج ہوتا ہے (پھ کے قریب)، جبکہ "b" میں گلے سے آواز نکلتی ہے۔',
    practiceSentences: [
      { targetWord: 'Bat', sentence: 'The cricket batsman swung the wooden bat with precision.' },
      { targetWord: 'Pat', sentence: 'Give the friendly dog a gentle pat on the head.' },
      { targetWord: 'Big', sentence: 'They built a big library in the town center.' },
      { targetWord: 'Pig', sentence: 'The small pig wandered around the farmyard.' }
    ]
  },
  {
    id: 'mp-l-r',
    pair: ['Light', 'Right'],
    ipa: ['/laɪt/', '/raɪt/'],
    contrastTitle: 'Lateral /l/ vs Rhotic /r/',
    mouthGuide: 'For /l/, the tip of your tongue touches the gum ridge firmly. For /r/, curl the sides of your tongue without letting the tip touch the roof of the mouth.',
    urduTip: '/l/ میں زبان تالو کے اگلے حصے کو چھوتی ہے، جبکہ /r/ میں زبان ہوا میں مڑتی ہے اور تالو کو نہیں چھوتی۔',
    practiceSentences: [
      { targetWord: 'Light', sentence: 'Turn on the overhead ceiling light, please.' },
      { targetWord: 'Right', sentence: 'Take the next right turn after the traffic signal.' },
      { targetWord: 'Load', sentence: 'Help me load these wooden boxes into the van.' },
      { targetWord: 'Road', sentence: 'The winding mountain road was scenic and quiet.' }
    ]
  }
];

export const STRESS_DRILLS: StressDrillItem[] = [
  {
    id: 'stress-noun-verb-shift',
    type: 'word-noun-verb',
    title: 'Noun vs Verb Syllable Stress Shift',
    level: 'B1',
    explanation: 'Many two-syllable words in English change stress based on part of speech. Nouns emphasize the FIRST syllable, while verbs emphasize the SECOND syllable.',
    urduExplanation: 'دو حرفی الفاظ میں اسم (Noun) کے پہلے حصے پر اور فعل (Verb) کے دوسرے حصے پر زور دیا جاتا ہے۔',
    examples: [
      {
        wordOrSentence: 'PRE-sent (Noun: gift / current moment)',
        stressedPart: 'PRE',
        ipa: '/ˈprɛz.ənt/',
        audioText: 'present',
        category: 'Noun'
      },
      {
        wordOrSentence: 'pre-SENT (Verb: to introduce or show)',
        stressedPart: 'SENT',
        ipa: '/prɪˈzɛnt/',
        audioText: 'present',
        category: 'Verb'
      },
      {
        wordOrSentence: 'RE-cord (Noun: document / vinyl disc)',
        stressedPart: 'RE',
        ipa: '/ˈrɛk.ɔːd/',
        audioText: 'record',
        category: 'Noun'
      },
      {
        wordOrSentence: 're-CORD (Verb: to capture audio or data)',
        stressedPart: 'CORD',
        ipa: '/rɪˈkɔːd/',
        audioText: 'record',
        category: 'Verb'
      },
      {
        wordOrSentence: 'OB-ject (Noun: a physical item or goal)',
        stressedPart: 'OB',
        ipa: '/ˈɒb.dʒɪkt/',
        audioText: 'object',
        category: 'Noun'
      },
      {
        wordOrSentence: 'ob-JECT (Verb: to disagree or protest)',
        stressedPart: 'JECT',
        ipa: '/əbˈdʒɛkt/',
        audioText: 'object',
        category: 'Verb'
      }
    ]
  },
  {
    id: 'stress-word-families',
    type: 'word-family',
    title: 'Word Family Suffix Stress Shift',
    level: 'B2',
    explanation: 'Adding suffixes like -er, -ic, -ical shifts the syllable stress across the word family.',
    urduExplanation: 'الفاظ کے ساتھ لاحقے (suffixes) لگانے سے زور دار حصہ آگے منتقل ہو جاتا ہے۔',
    examples: [
      {
        wordOrSentence: 'PHO-to-graph',
        stressedPart: 'PHO',
        ipa: '/ˈfoʊ.tə.ɡræf/',
        audioText: 'photograph'
      },
      {
        wordOrSentence: 'pho-TOG-ra-pher',
        stressedPart: 'TOG',
        ipa: '/fəˈtɒɡ.rə.fər/',
        audioText: 'photographer'
      },
      {
        wordOrSentence: 'pho-to-GRA-phic',
        stressedPart: 'GRA',
        ipa: '/ˌfoʊ.təˈɡræf.ɪk/',
        audioText: 'photographic'
      }
    ]
  },
  {
    id: 'stress-sentence-rhythm',
    type: 'sentence-rhythm',
    title: 'Sentence Stress & Rhythm (Content vs Function Words)',
    level: 'A2',
    explanation: 'English is a stress-timed language. Content words (nouns, main verbs, adjectives) carry stress, while function words (articles, prepositions, auxiliary verbs) are reduced.',
    urduExplanation: 'انگریزی میں بامعنی الفاظ (اسم، فعل، صفت) پر زور دیا جاتا ہے جبکہ گرامر کے چھوٹے الفاظ کو ہلکا بولا جاتا ہے۔',
    examples: [
      {
        wordOrSentence: 'I WANT to BUY a CUP of COF-fee.',
        stressedPart: 'WANT, BUY, CUP, COF',
        audioText: 'I want to buy a cup of coffee.'
      },
      {
        wordOrSentence: 'The TRAIN will ar-RIVE at SEV-en to-NIGHT.',
        stressedPart: 'TRAIN, RIVE, SEV, NIGHT',
        audioText: 'The train will arrive at seven tonight.'
      },
      {
        wordOrSentence: 'SHE has LIVED in LON-don for THREE YEARS.',
        stressedPart: 'SHE, LIVED, LON, THREE, YEARS',
        audioText: 'She has lived in London for three years.'
      }
    ]
  }
];

export const TONGUE_TWISTERS: TongueTwisterItem[] = [
  {
    id: 'tt-a1-1',
    level: 'A1',
    difficulty: 'Easy',
    text: 'Red lorry, yellow lorry, red lorry, yellow lorry.',
    focusSound: '/l/ vs /r/ distinction',
    targetWpm: 90,
    urduNote: 'ایل اور آر کی آوازوں کے درمیان فوری سوئچ کریں'
  },
  {
    id: 'tt-a2-1',
    level: 'A2',
    difficulty: 'Medium',
    text: 'She sells seashells on the seashore.',
    focusSound: '/ʃ/ (sh) vs /s/ distinction',
    targetWpm: 110,
    urduNote: 'ش اور س کا واضح اور تیز تفاوت برقرار رکھیں'
  },
  {
    id: 'tt-b1-1',
    level: 'B1',
    difficulty: 'Challenging',
    text: 'A proper copper coffee pot from the corner coffee shop.',
    focusSound: '/p/ and /k/ plosives with rhythm',
    targetWpm: 125,
    urduNote: 'پھ اور ک کی ہوا دار ادائیگی پر دھیان دیں'
  },
  {
    id: 'tt-b2-1',
    level: 'B2',
    difficulty: 'Challenging',
    text: 'Thirty-three thirsty feathers floated through the thick thermal fog.',
    focusSound: 'Voiceless /θ/ vs voiced /ð/ and /f/',
    targetWpm: 135,
    urduNote: 'ٹی ایچ کی آواز کے لیے زبان دانتوں کے بیچ رکھیں'
  },
  {
    id: 'tt-c1-1',
    level: 'C1',
    difficulty: 'Expert',
    text: 'Peter Piper picked a peck of pickled peppers; if Peter Piper picked a peck of pickled peppers, where is the peck of pickled peppers Peter Piper picked?',
    focusSound: 'Rapid breath control, consonant clusters & rhythm',
    targetWpm: 155,
    urduNote: 'سانس کے کنٹرول کے ساتھ تیز رفتاری سے پڑھیں'
  }
];

export const SHADOWING_SENTENCES: ShadowingSentence[] = [
  {
    id: 'shad-a1-1',
    level: 'A1',
    topic: 'Daily Routine',
    sentence: 'I usually wake up early, make a cup of tea, and read the morning newspaper.',
    targetWpm: 100,
    keyPhonemes: ['/juː.ʒu.ə.li/', '/kʌp/', '/mɔː.nɪŋ/'],
    urduTranslation: 'میں عموماً صبح سویرے جاگتا ہوں، چائے بناتا ہوں اور صبح کا اخبار پڑھتا ہوں۔'
  },
  {
    id: 'shad-a2-1',
    level: 'A2',
    topic: 'Travel',
    sentence: 'We booked a direct train ticket to the coast and enjoyed the scenic mountain views along the journey.',
    targetWpm: 115,
    keyPhonemes: ['/daɪˈrɛkt/', '/ˈsiː.nɪk/', '/ˈdʒɜː.ni/'],
    urduTranslation: 'ہم نے ساحل کے لیے براہ راست ٹرین ٹکٹ بک کروایا اور سفر کے دوران پہاڑی نظاروں کا لطف اٹھایا۔'
  },
  {
    id: 'shad-b1-1',
    level: 'B1',
    topic: 'Workplace Innovation',
    sentence: 'Effective team communication requires listening attentively and providing constructive feedback without hesitation.',
    targetWpm: 130,
    keyPhonemes: ['/ɪˈfɛk.tɪv/', '/əˈtɛn.tɪv.li/', '/kənˈstrʌk.tɪv/'],
    urduTranslation: 'مؤثر ٹیم مواصلات کے لیے توجہ سے سننا اور بلا جھجھک مثبت فیڈ بیک دینا ضروری ہے۔'
  },
  {
    id: 'shad-b2-1',
    level: 'B2',
    topic: 'Environmental Science',
    sentence: 'Transitioning to renewable energy resources represents a decisive step toward mitigating long-term climate vulnerabilities.',
    targetWpm: 140,
    keyPhonemes: ['/trænˈzɪʃ.ən.ɪŋ/', '/rɪˈnjuː.ə.bəl/', '/ˌvʌl.nər.əˈbɪl.ə.tiz/'],
    urduTranslation: 'قابل تجدید توانائی کے ذرائع کی طرف منتقلی ماحولیاتی خطرات کو کم کرنے کی جانب ایک اہم قدم ہے۔'
  },
  {
    id: 'shad-c1-1',
    level: 'C1',
    topic: 'Global Strategy',
    sentence: 'The intricate interplay between fiscal consolidation and macroeconomic equilibrium demands unprecedented regulatory vigilance.',
    targetWpm: 150,
    keyPhonemes: ['/ˈɪn.trɪ.kət/', '/ˌiː.kwəˈlɪb.ri.əm/', '/ˈvɪdʒ.əl.əns/'],
    urduTranslation: 'مالیاتی استحکام اور میکرو اکنامک توازن کے مابین پیچیدہ تعلق بے مثال ریگولیٹری چوکسی کا تقاضا کرتا ہے۔'
  }
];

export const ROLE_PLAY_SCENARIOS: RolePlayScenario[] = [
  {
    id: 'roleplay-cafe-a1',
    title: 'At a Neighborhood Cafe',
    level: 'A1',
    description: 'Practice ordering a drink, selecting a pastry, and paying with card.',
    appRole: 'Cafe Barista',
    userRole: 'Customer',
    scenarioContext: 'You walk into a welcoming cafe on a Sunday morning to get breakfast.',
    urduContext: 'آپ ایک کیفے میں کافی اور پیسٹری آرڈر کر رہے ہیں۔',
    turns: [
      {
        speaker: 'app',
        name: 'Barista',
        expectedText: 'Good morning! Welcome to Cafe Joy. What can I get for you today?',
        audioText: 'Good morning! Welcome to Cafe Joy. What can I get for you today?'
      },
      {
        speaker: 'user',
        name: 'You',
        expectedText: 'Hello! I would like a hot coffee and a croissant, please.',
        suggestedAlternatives: [
          'Hi, could I have a cappuccino and a muffin?',
          'Good morning. A medium coffee and a pastry, please.'
        ],
        feedbackTip: 'Polite ordering phrases: "I would like..." or "Could I please have..."'
      },
      {
        speaker: 'app',
        name: 'Barista',
        expectedText: 'Certainly! Would you prefer regular milk, or plant-based oat milk?',
        audioText: 'Certainly! Would you prefer regular milk, or plant-based oat milk?'
      },
      {
        speaker: 'user',
        name: 'You',
        expectedText: 'Regular milk is fine, thank you.',
        suggestedAlternatives: [
          'Oat milk, please.',
          'Just regular milk for me.'
        ],
        feedbackTip: 'Clear preference expression.'
      },
      {
        speaker: 'app',
        name: 'Barista',
        expectedText: 'That will be four dollars and fifty cents. Will you be paying with cash or card?',
        audioText: 'That will be four dollars and fifty cents. Will you be paying with cash or card?'
      },
      {
        speaker: 'user',
        name: 'You',
        expectedText: 'I will pay by card, please. Here is my card.',
        suggestedAlternatives: [
          'By card, please.',
          'Card, thank you.'
        ],
        feedbackTip: 'Confirming your payment method.'
      },
      {
        speaker: 'app',
        name: 'Barista',
        expectedText: 'Payment successful! Please have a seat and we will bring your order over shortly.',
        audioText: 'Payment successful! Please have a seat and we will bring your order over shortly.'
      }
    ]
  },
  {
    id: 'roleplay-hotel-a2',
    title: 'Checking into a Hotel',
    level: 'A2',
    description: 'Check in for a booked room, confirm details, and ask about amenities.',
    appRole: 'Hotel Receptionist',
    userRole: 'Guest',
    scenarioContext: 'You have just arrived at the Grand Plaza Hotel after a long flight.',
    urduContext: 'ہوٹل میں چیک ان کا عمل اور سہولیات کے بارے میں استفسار۔',
    turns: [
      {
        speaker: 'app',
        name: 'Receptionist',
        expectedText: 'Good afternoon, welcome to the Grand Plaza Hotel. How may I assist you?',
        audioText: 'Good afternoon, welcome to the Grand Plaza Hotel. How may I assist you?'
      },
      {
        speaker: 'user',
        name: 'You',
        expectedText: 'Good afternoon. I have a reservation under the name Ahmed Khan for two nights.',
        suggestedAlternatives: [
          'Hi, checking in under Ahmed Khan.',
          'Hello, I booked a room under Ahmed Khan for two nights.'
        ],
        feedbackTip: 'State your name and length of stay clearly.'
      },
      {
        speaker: 'app',
        name: 'Receptionist',
        expectedText: 'Ah yes, Mr. Khan, a non-smoking double room on the fifth floor. May I see your ID or passport, please?',
        audioText: 'Ah yes, Mr. Khan, a non-smoking double room on the fifth floor. May I see your ID or passport, please?'
      },
      {
        speaker: 'user',
        name: 'You',
        expectedText: 'Here is my passport. Also, could you please tell me what time breakfast starts?',
        suggestedAlternatives: [
          'Here is my passport. What time is breakfast served?',
          'Here is my ID. Does the room include breakfast?'
        ],
        feedbackTip: 'Polite inquiry with "could you please tell me..."'
      },
      {
        speaker: 'app',
        name: 'Receptionist',
        expectedText: 'Breakfast is served from 7:00 AM to 10:30 AM in the main dining room. Here are your room keys for room 512.',
        audioText: 'Breakfast is served from 7:00 AM to 10:30 AM in the main dining room. Here are your room keys for room 512.'
      },
      {
        speaker: 'user',
        name: 'You',
        expectedText: 'Thank you very much. Which way to the elevators?',
        suggestedAlternatives: [
          'Thank you. Where are the lifts?',
          'Thanks! Where are the elevators located?'
        ],
        feedbackTip: 'Polite closing and direction query.'
      }
    ]
  },
  {
    id: 'roleplay-doctor-b1',
    title: 'Consultation at the Doctor\'s Clinic',
    level: 'B1',
    description: 'Describe symptoms, medical duration, and ask for treatment advice.',
    appRole: 'Physician',
    userRole: 'Patient',
    scenarioContext: 'You are visiting the health center feeling under the weather.',
    urduContext: 'ڈاکٹر کے کلینک پر اپنی علامات بتانا اور مشورہ لینا',
    turns: [
      {
        speaker: 'app',
        name: 'Doctor',
        expectedText: 'Hello there. Please have a seat. What brings you in to see me today?',
        audioText: 'Hello there. Please have a seat. What brings you in to see me today?'
      },
      {
        speaker: 'user',
        name: 'You',
        expectedText: 'Doctor, I have had a severe sore throat and a persistent dry cough for the past three days.',
        suggestedAlternatives: [
          'I have been feeling feverish with a sore throat since Tuesday.',
          'I have a bad cough and difficulty swallowing for three days.'
        ],
        feedbackTip: 'Specify symptoms and time duration clearly.'
      },
      {
        speaker: 'app',
        name: 'Doctor',
        expectedText: 'I see. Have you experienced any high fever, shortness of breath, or body chills?',
        audioText: 'I see. Have you experienced any high fever, shortness of breath, or body chills?'
      },
      {
        speaker: 'user',
        name: 'You',
        expectedText: 'I had a mild fever yesterday evening, but no difficulty breathing.',
        suggestedAlternatives: [
          'Just a slight temperature, but breathing is normal.',
          'No breathing trouble, only body aches and slight fever.'
        ],
        feedbackTip: 'Answering secondary diagnostic queries.'
      },
      {
        speaker: 'app',
        name: 'Doctor',
        expectedText: 'Your chest sounds clear. It appears to be a seasonal viral infection. I will prescribe throat lozenges and recommend plenty of fluids and bed rest.',
        audioText: 'Your chest sounds clear. It appears to be a seasonal viral infection. I will prescribe throat lozenges and recommend plenty of fluids and bed rest.'
      },
      {
        speaker: 'user',
        name: 'You',
        expectedText: 'Understood. Should I schedule a follow-up appointment if symptoms persist?',
        suggestedAlternatives: [
          'Thank you. When should I return if I do not improve?',
          'Got it. How many days should I rest before returning to work?'
        ],
        feedbackTip: 'Proactive healthcare management question.'
      }
    ]
  }
];
