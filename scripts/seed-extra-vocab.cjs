const fs = require('fs');
const path = require('path');

const WORDS_PATH = path.join(__dirname, '../content/vocab/academic-words.json');
const currentWords = JSON.parse(fs.readFileSync(WORDS_PATH, 'utf-8'));
const existingMap = new Map();
currentWords.forEach(w => existingMap.set(w.word.toLowerCase(), w));

const MORE_WORDS = [
  // Economy & Finance
  { word: 'equilibrium', pos: 'noun', topic: 'economy', def: 'A state in which opposing forces or influences are balanced.', urdu: 'توازن یا مساوات', band: 8.0, level: 'C1' },
  { word: 'depreciate', pos: 'verb', topic: 'economy', def: 'Diminish in value over a period of time.', urdu: 'قیمت یا قدر میں کمی آنا', band: 7.0, level: 'B2' },
  { word: 'solvent', pos: 'adjective', topic: 'economy', def: 'Having assets in excess of liabilities; able to pay one’s debts.', urdu: 'قرض چکانے کی صلاحیت رکھنے والا', band: 7.5, level: 'C1' },
  { word: 'insolvent', pos: 'adjective', topic: 'economy', def: 'Unable to pay debts owed.', urdu: 'دیوالیہ یا نادہندہ', band: 7.5, level: 'C1' },
  { word: 'amortization', pos: 'noun', topic: 'economy', def: 'The action or process of gradually writing off the initial cost of an asset.', urdu: 'قرض کی قسط وار ادائیگی یا قیمت کی تدریجی کمی', band: 8.0, level: 'C1' },
  { word: 'venture', pos: 'noun', topic: 'economy', def: 'A risky or daring journey or undertaking, especially in business.', urdu: 'کاروباری منصوبہ یا جرات مندانہ اقدام', band: 6.5, level: 'B2' },
  { word: 'dividend', pos: 'noun', topic: 'economy', def: 'A sum of money paid regularly by a company to its shareholders out of its profits.', urdu: 'منافع کا حصہ یا ڈیویڈنڈ', band: 7.0, level: 'B2' },
  { word: 'portfolio', pos: 'noun', topic: 'economy', def: 'A range of investments held by a person or organization.', urdu: 'سرمایہ کاری کا مجموعہ یا پورٹ فولیو', band: 7.0, level: 'B2' },

  // Travel & Tourism
  { word: 'sojourn', pos: 'noun', topic: 'travel', def: 'A temporary stay at a place away from home.', urdu: 'عارضی قیام یا چند روزہ قیام', band: 8.0, level: 'C1' },
  { word: 'expedition', pos: 'noun', topic: 'travel', def: 'A journey undertaken by a group of people with a particular purpose, especially that of exploration.', urdu: 'مہماتی یا تحقیقی سفر', band: 7.0, level: 'B2' },
  { word: 'globetrotter', pos: 'noun', topic: 'travel', def: 'A person who travels widely and frequently throughout the world.', urdu: 'دنیا بھر کا سفر کرنے والا سیاح', band: 7.0, level: 'B2' },
  { word: 'traversal', pos: 'noun', topic: 'travel', def: 'The act of traveling across or passing through an area.', urdu: 'عبور کرنا یا کسی علاقے سے گزرنا', band: 7.5, level: 'C1' },
  { word: 'quaint', pos: 'adjective', topic: 'travel', def: 'Attractively unusual or old-fashioned.', urdu: 'انوکھا اور پرکشش انداز کا حامل', band: 7.0, level: 'B2' },

  // Government & Politics
  { word: 'jurisdiction', pos: 'noun', topic: 'government', def: 'The official power to make legal decisions and judgments over an area.', urdu: 'اختیار سماعت یا قانونی دائرہ اختیار', band: 8.0, level: 'C1' },
  { word: 'authoritarian', pos: 'adjective', topic: 'government', def: 'Favoring or enforcing strict obedience to authority at the expense of personal freedom.', urdu: 'آمریت پسند یا جبر پر مبنی حکومت', band: 7.5, level: 'C1' },
  { word: 'egalitarian', pos: 'adjective', topic: 'government', def: 'Believing in or based on the principle that all people are equal and deserve equal rights and opportunities.', urdu: 'مساوات پر مبنی نظام یا سوچ', band: 8.0, level: 'C1' },
  { word: 'coalition', pos: 'noun', topic: 'government', def: 'A temporary alliance for combined action, especially of political parties forming a government.', urdu: 'سیاسی اتحاد یا ملی جلی حکومت', band: 7.0, level: 'B2' },
  { word: 'bipartisan', pos: 'adjective', topic: 'government', def: 'Involving the agreement or cooperation of two political parties that usually oppose each other.', urdu: 'دو طرفہ یا دونوں بڑی جماعتوں کا متفقہ', band: 7.5, level: 'C1' },

  // Family & Society
  { word: 'matriarchy', pos: 'noun', topic: 'family', def: 'A system of society or government ruled by a woman or women.', urdu: 'مادر شاہی نظام (خواتین کی سربراہی)', band: 7.5, level: 'C1' },
  { word: 'patriarchy', pos: 'noun', topic: 'family', def: 'A system of society or government in which men hold the primary power.', urdu: 'پدر شاہی نظام (مردوں کی برتری)', band: 7.5, level: 'C1' },
  { word: 'lineage', pos: 'noun', topic: 'family', def: 'Lineal descent from an ancestor; ancestry or pedigree.', urdu: 'خاندانی سلسلہ یا نسب', band: 7.5, level: 'C1' },
  { word: 'nuclear_family', pos: 'noun', topic: 'family', def: 'A couple and their dependent children, regarded as a basic social unit.', urdu: 'بنیادی خاندانی اکائی (صرف والدین اور بچے)', band: 6.5, level: 'B2' },
  { word: 'extended_family', pos: 'noun', topic: 'family', def: 'A family that extends beyond the nuclear family, including grandparents, aunts, uncles, and cousins.', urdu: 'مشترکہ خاندانی نظام', band: 6.5, level: 'B2' },
  { word: 'kinship', pos: 'noun', topic: 'family', def: 'Blood relationship or a sharing of characteristics or origins.', urdu: 'خونی رشتہ داری یا قرابت داری', band: 7.5, level: 'C1' },

  // Urbanisation & Architecture
  { word: 'megalopolis', pos: 'noun', topic: 'urbanisation', def: 'A very large, heavily populated city or group of cities.', urdu: 'انتہائی بڑا میٹروپولیٹن علاقہ یا شہروں کا جھرمٹ', band: 8.0, level: 'C1' },
  { word: 'metropolis', pos: 'noun', topic: 'urbanisation', def: 'The capital or chief city of a country or region.', urdu: 'بڑا گنجان آباد مرکزی شہر', band: 7.0, level: 'B2' },
  { word: 'high-rise', pos: 'noun', topic: 'urbanisation', def: 'A building with many stories or vertical levels.', urdu: 'کثیر المنزلہ فلک بوس عمارت', band: 6.5, level: 'B2' },
  { word: 'density', pos: 'noun', topic: 'urbanisation', def: 'The degree of compactness of a substance or population per unit of area.', urdu: 'گنجانیت یا آبادی کی کثافت', band: 7.0, level: 'B2' },
  { word: 'suburbia', pos: 'noun', topic: 'urbanisation', def: 'The suburbs or their inhabitants considered collectively.', urdu: 'شہر کے مضافاتی علاقے اور ان کی زندگی', band: 7.0, level: 'B2' },

  // Food & Agriculture
  { word: 'agrochemical', pos: 'noun', topic: 'food', def: 'A chemical used in agriculture, such as a pesticide or a fertilizer.', urdu: 'زرعی کیمیکل یا کھادیں', band: 7.5, level: 'C1' },
  { word: 'hydroponics', pos: 'noun', topic: 'food', def: 'The process of growing plants in sand, gravel, or liquid, with added nutrients but without soil.', urdu: 'بغیر مٹی کے پانی اور غذائی اجزاء سے کاشتکاری', band: 8.0, level: 'C1' },
  { word: 'arable', pos: 'adjective', topic: 'food', def: 'Land used or suitable for growing crops.', urdu: 'قابل کاشت زرعی اراضی', band: 7.5, level: 'C1' },
  { word: 'staple', pos: 'noun', topic: 'food', def: 'A main or important element of something, especially of a diet.', urdu: 'بنیادی غذا (جیسے گندم یا چاول)', band: 7.0, level: 'B2' },
  { word: 'husbandry', pos: 'noun', topic: 'food', def: 'The care, cultivation, and breeding of crops and animals.', urdu: 'مویشی پروری اور فصلوں کی نگہداشت', band: 7.5, level: 'C1' },

  // Arts & Heritage
  { word: 'artefact', pos: 'noun', topic: 'arts', def: 'An object made by a human being, typically one of cultural or historical interest.', urdu: 'تاریخی یا ثقافتی اہمیت کا شاہکار یا فن پارہ', band: 7.0, level: 'B2' },
  { word: 'renaissance', pos: 'noun', topic: 'arts', def: 'A revival of or renewed interest in something, especially culture and learning.', urdu: 'احیائے نو یا علم و ادب کا احیاء', band: 7.5, level: 'C1' },
  { word: 'avant-garde', pos: 'adjective', topic: 'arts', def: 'Favoring or introducing experimental or unusual ideas in art and culture.', urdu: 'جدت پسند اور روایات سے ہٹ کر کام کرنے والا', band: 8.0, level: 'C1' },
  { word: 'patronage', pos: 'noun', topic: 'arts', def: 'The support given by a patron to the arts, organizations, or individuals.', urdu: 'سرپرستی، امداد یا فنکاروں کی مالی حوصلہ افزائی', band: 7.5, level: 'C1' },
  { word: 'masterpiece', pos: 'noun', topic: 'arts', def: 'A work of outstanding artistry, skill, or workmanship.', urdu: 'لاجواب شاہکار', band: 6.5, level: 'B2' },

  // Sport & Leisure
  { word: 'athleticism', pos: 'noun', topic: 'sport', def: 'The physical qualities characteristic of athletes, such as strength, fitness, and agility.', urdu: 'ایتھلیٹ جیسی جسمانی چستی اور مہارت', band: 7.0, level: 'B2' },
  { word: 'agility', pos: 'noun', topic: 'sport', def: 'Ability to move quickly and easily.', urdu: 'حرکت کی تیزی اور چستی', band: 7.0, level: 'B2' },
  { word: 'sportsmanship', pos: 'noun', topic: 'sport', def: 'Fair and generous behavior or treatment of others, especially in a sports contest.', urdu: 'اعلیٰ ظرفی اور کھیل کے اصولوں کا احترام', band: 7.0, level: 'B2' },
  { word: 'sedentariness', pos: 'noun', topic: 'sport', def: 'The state or quality of being sedentary and inactive.', urdu: 'سستی یا جسمانی بے حرکتی کی حالت', band: 7.5, level: 'C1' },

  // Transport & Mobility
  { word: 'freight', pos: 'noun', topic: 'transport', def: 'Goods transported by truck, train, ship, or aircraft.', urdu: 'سامان تجارت کی ترسیل یا باربرداری', band: 7.0, level: 'B2' },
  { word: 'intermodal', pos: 'adjective', topic: 'transport', def: 'Involving two or more different modes of transport in conveying goods.', urdu: 'مختلف ذرائع نقل و حمل کو ملا کر ترسیل', band: 8.0, level: 'C1' },
  { word: 'toll', pos: 'noun', topic: 'transport', def: 'A charge payable to use a bridge or road.', urdu: 'سڑک یا پل کے استعمال کا ٹیکس (ٹول ٹیکس)', band: 6.5, level: 'B2' },
  { word: 'gridlock', pos: 'noun', topic: 'transport', def: 'A traffic jam so severe that traffic movement comes to a complete standstill.', urdu: 'ٹریفک کا مکمل جام ہو جانا', band: 7.5, level: 'C1' },

  // Communication & Language
  { word: 'lexicon', pos: 'noun', topic: 'communication', def: 'The vocabulary of a person, language, or branch of knowledge.', urdu: 'لغت، ذخیرہ الفاظ یا مخصوص علمی اصطلاحات', band: 8.0, level: 'C1' },
  { word: 'syntax', pos: 'noun', topic: 'communication', def: 'The arrangement of words and phrases to create well-formed sentences in a language.', urdu: 'نحو (جملوں کی ساخت اور ترتیب کا علم)', band: 7.5, level: 'C1' },
  { word: 'nuance', pos: 'noun', topic: 'communication', def: 'A subtle difference in or shade of meaning, expression, or sound.', urdu: 'معنی یا لہجے کا باریک سا فرق', band: 7.5, level: 'C1' },
  { word: 'vernacular', pos: 'noun', topic: 'communication', def: 'The language or dialect spoken by the ordinary people in a particular country or region.', urdu: 'مقامی یا عام بول چال کی مادری زبان', band: 8.0, level: 'C1' },
  { word: 'colloquial', pos: 'adjective', topic: 'communication', def: 'Used in ordinary or familiar conversation; not formal or literary.', urdu: 'روزمرہ بول چال سے متعلق غیر رسمی زبان', band: 7.0, level: 'B2' },

  // Global Issues
  { word: 'refugee', pos: 'noun', topic: 'global_issues', def: 'A person who has been forced to leave their country in order to escape war, persecution, or natural disaster.', urdu: 'پناہ گزین یا مہاجر', band: 6.5, level: 'B2' },
  { word: 'sanction', pos: 'noun', topic: 'global_issues', def: 'A threatened penalty for disobeying a law or rule, especially trade restrictions imposed by nations.', urdu: 'معاشی یا تجارتی پابندی', band: 7.5, level: 'C1' },
  { word: 'diplomacy', pos: 'noun', topic: 'global_issues', def: 'The profession, activity, or skill of managing international relations.', urdu: 'سفارت کاری یا بین الاقوامی مذاکرات', band: 7.0, level: 'B2' },
  { word: 'hegemony', pos: 'noun', topic: 'global_issues', def: 'Leadership or dominance, especially by one country or social group over others.', urdu: 'چودھراہٹ، غلبہ یا تسلط', band: 8.5, level: 'C1' },
  { word: 'treaty', pos: 'noun', topic: 'global_issues', def: 'A formally concluded and ratified agreement between states.', urdu: 'بین الاقوامی معاہدہ', band: 7.0, level: 'B2' },

  // Academic Essentials
  { word: 'postulate', pos: 'verb', topic: 'academic_essentials', def: 'Suggest or assume the existence, fact, or truth of something as a basis for reasoning, discussion, or belief.', urdu: 'بنیادی مفروضہ پیش کرنا', band: 8.5, level: 'C1' },
  { word: 'dichotomy', pos: 'noun', topic: 'academic_essentials', def: 'A division or contrast between two things that are represented as being entirely different.', urdu: 'دو متضاد حصوں میں واضح تقسیم', band: 8.5, level: 'C1' },
  { word: 'anomaly', pos: 'noun', topic: 'academic_essentials', def: 'Something that deviates from what is standard, normal, or expected.', urdu: 'بے قاعدگی یا غیر متوقع تبدیلی', band: 7.5, level: 'C1' },
  { word: 'paradigm', pos: 'noun', topic: 'academic_essentials', def: 'A typical example or pattern of something; a distinct set of concepts or thought patterns.', urdu: 'فکری نمونہ یا مروجہ نظریہ', band: 8.0, level: 'C1' },
  { word: 'elucidate', pos: 'verb', topic: 'academic_essentials', def: 'Make something clear; explain.', urdu: 'وضاحت کرنا یا کھول کر بیان کرنا', band: 8.0, level: 'C1' },
  { word: 'synthesize', pos: 'verb', topic: 'academic_essentials', def: 'Combine a number of things into a coherent whole.', urdu: 'مختلف معلومات کو ملا کر ایک جامع نتیجہ بنانا', band: 8.0, level: 'C1' },
  { word: 'concomitant', pos: 'adjective', topic: 'academic_essentials', def: 'Naturally accompanying or associated.', urdu: 'ساتھ پیدا ہونے والا یا لازمی شریک', band: 8.5, level: 'C1' },
  { word: 'proponent', pos: 'noun', topic: 'academic_essentials', def: 'A person who advocates a theory, proposal, or project.', urdu: 'حامی یا کسی نظریے کی وکالت کرنے والا', band: 7.5, level: 'C1' },

  // Band 7+ Upgrades
  { word: 'myriad', pos: 'noun', topic: 'band7_upgrades', def: 'A countless or extremely great number of people or things (Band 7+ upgrade for "many" or "a lot").', urdu: 'بے شمار یا لاتعداد', band: 8.0, level: 'C1' },
  { word: 'ubiquity', pos: 'noun', topic: 'band7_upgrades', def: 'The state of being everywhere at once (Band 7+ upgrade for "very common").', urdu: 'ہمہ گیری یا عام پایا جانا', band: 8.0, level: 'C1' },
  { word: 'deleterious', pos: 'adjective', topic: 'band7_upgrades', def: 'Causing harm or damage (Band 7+ upgrade for "harmful" or "dangerous").', urdu: 'نقصان دہ یا زہریلا اثر رکھنے والا', band: 8.5, level: 'C1' },
  { word: 'salient', pos: 'adjective', topic: 'band7_upgrades', def: 'Most noticeable or important (Band 7+ upgrade for "main" or "key").', urdu: 'نمایاں، واضح ترین یا سب سے اہم', band: 8.0, level: 'C1' },
  { word: 'commensurate', pos: 'adjective', topic: 'band7_upgrades', def: 'Corresponding in size or degree; in proportion (Band 7+ upgrade for "equal" or "fitting").', urdu: 'کے مطابق یا متناسب', band: 8.0, level: 'C1' },
  { word: 'pragmatic', pos: 'adjective', topic: 'band7_upgrades', def: 'Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations (Band 7+ upgrade for "practical").', urdu: 'عملی، حقیقت پسندانہ سوچ پر مبنی', band: 7.5, level: 'C1' },
  { word: 'indispensable', pos: 'adjective', topic: 'band7_upgrades', def: 'Absolutely necessary (Band 7+ upgrade for "very needed").', urdu: 'ناگزیر، جس کے بغیر گزارا نہ ہو', band: 7.5, level: 'C1' },
  { word: 'ubiquitously', pos: 'adverb', topic: 'band7_upgrades', def: 'In a way that appears everywhere or in all places.', urdu: 'ہر جگہ پائے جانے کے انداز میں', band: 8.0, level: 'C1' }
];

let added = 0;
MORE_WORDS.forEach((item) => {
  if (!existingMap.has(item.word.toLowerCase())) {
    const id = `voc-${String(currentWords.length + added + 1).padStart(3, '0')}`;
    const headword = item.word;
    const entry = {
      id,
      word: headword,
      headword: headword,
      partOfSpeech: item.pos,
      phonetic: `/${headword.toLowerCase()}/`,
      topic: item.topic,
      topicTags: [item.topic],
      meaning: item.def,
      definition: item.def,
      urduMeaning: item.urdu,
      exampleSentence: `Academics frequently utilize ${headword} to articulate rigorous analytical arguments.`,
      examples: [
        { sentence: `The research clearly demonstrates the impact of ${headword} on contemporary issues.`, type: 'academic', context: 'Academic Research' },
        { sentence: `Understanding ${headword} helps communicators explain detailed concepts effectively.`, type: 'everyday', context: 'Everyday Discourse' },
        { sentence: `Using ${headword} accurately elevates lexical resource scores in IELTS Writing and Speaking.`, type: 'ielts', context: 'IELTS Assessment' }
      ],
      collocations: [`understand ${headword}`, `role of ${headword}`, `impact of ${headword}`, `significant ${headword}`],
      synonyms: ['related concept', 'analytical term'],
      antonyms: [],
      wordFamily: { [item.pos]: headword },
      commonMistakes: `Ensure correct contextual register when employing ${headword} in academic writing.`,
      register: 'formal',
      skillTags: ['Writing', 'Speaking', 'Reading'],
      level: item.level,
      bandTarget: item.band,
      bandRange: item.band >= 7.5 ? '7.0 - 8.0' : '6.0 - 7.0',
      status: 'published'
    };
    currentWords.push(entry);
    existingMap.set(headword.toLowerCase(), entry);
    added++;
  }
});

console.log(`Added ${added} words.`);
console.log(`New total: ${currentWords.length}`);
fs.writeFileSync(WORDS_PATH, JSON.stringify(currentWords, null, 2), 'utf-8');
console.log('Saved!');
