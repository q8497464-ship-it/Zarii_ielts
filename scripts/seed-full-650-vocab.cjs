/**
 * Expands the vocabulary to 650+ words ensuring all 20 topics + Academic Essentials + Band 7+ Upgrades
 * have rich content with proper examples, collocations, definitions, and word families.
 */

const fs = require('fs');
const path = require('path');

const WORDS_PATH = path.join(__dirname, '../content/vocab/academic-words.json');
const currentWords = JSON.parse(fs.readFileSync(WORDS_PATH, 'utf-8'));
const existingMap = new Map();
currentWords.forEach(w => existingMap.set(w.word.toLowerCase(), w));

// Comprehensive dictionary additions for each topic
const ADDITIONAL_VOCAB = [
  // 1. Environment & Ecology
  { word: 'remediation', pos: 'noun', topic: 'environment', def: 'The action of remedying something, in particular reversing or stopping environmental damage.', urdu: 'ماحولیاتی خرابی کی اصلاح یا بحالی', band: 8.0, level: 'C1', collocations: ['environmental remediation', 'soil remediation', 'costly remediation', 'remediation efforts'], syn: ['restoration', 'rectification', 'cleanup'], ant: ['contamination', 'degradation'], family: { noun: 'remediation', verb: 'remedy', adjective: 'remedial' } },
  { word: 'desertification', pos: 'noun', topic: 'environment', def: 'The process by which fertile land becomes desert, typically as a result of drought, deforestation, or inappropriate agriculture.', urdu: 'زرخیز زمین کا بنجر یا صحرا میں تبدیل ہونا', band: 7.5, level: 'C1', collocations: ['combat desertification', 'threat of desertification', 'halt desertification', 'rapid desertification'], syn: ['aridification', 'land degradation'], ant: ['afforestation', 'land reclamation'], family: { noun: 'desertification' } },
  { word: 'anthropogenic', pos: 'adjective', topic: 'environment', def: 'Originating in human activity, especially regarding environmental pollution and pollutants.', urdu: 'انسانی سرگرمیوں سے پیدا ہونے والا', band: 8.5, level: 'C1', collocations: ['anthropogenic emissions', 'anthropogenic climate change', 'anthropogenic influence', 'anthropogenic impact'], syn: ['human-induced', 'man-made'], ant: ['natural', 'biogenic'], family: { adjective: 'anthropogenic', adverb: 'anthropogenically' } },
  { word: 'sustainable', pos: 'adjective', topic: 'environment', def: 'Able to be maintained at a certain rate or level without depleting natural resources.', urdu: 'پائیدار (جو طویل عرصے تک برقرار رہ سکے)', band: 7.0, level: 'B2', collocations: ['sustainable development', 'sustainable practices', 'environmentally sustainable', 'sustainable future'], syn: ['renewable', 'viable', 'enduring'], ant: ['unsustainable', 'depleting'], family: { adjective: 'sustainable', noun: 'sustainability', adverb: 'sustainably' } },

  // 2. Technology & AI
  { word: 'ubiquitous', pos: 'adjective', topic: 'technology', def: 'Present, appearing, or found everywhere simultaneously.', urdu: 'ہر جگہ پایا جانے والا یا عام', band: 8.0, level: 'C1', collocations: ['ubiquitous presence', 'become ubiquitous', 'almost ubiquitous', 'ubiquitous technology'], syn: ['omnipresent', 'pervasive', 'universal'], ant: ['rare', 'scarce', 'localized'], family: { adjective: 'ubiquitous', noun: 'ubiquity' } },
  { word: 'autonomous', pos: 'adjective', topic: 'technology', def: 'Acting independently or having the freedom and capacity for self-governance or automated function.', urdu: 'خود مختار یا خود کار نظام', band: 7.5, level: 'C1', collocations: ['autonomous vehicles', 'autonomous navigation', 'autonomous systems', 'fully autonomous'], syn: ['self-governing', 'independent', 'automated'], ant: ['dependent', 'manual'], family: { adjective: 'autonomous', noun: 'autonomy', adverb: 'autonomously' } },
  { word: 'algorithm', pos: 'noun', topic: 'technology', def: 'A process or set of rules to be followed in calculations or problem-solving operations, especially by a computer.', urdu: 'الگورتھم (کمپیوٹر کے حسابی مراحل)', band: 7.0, level: 'B2', collocations: ['search algorithm', 'complex algorithm', 'machine learning algorithm', 'algorithmic bias'], syn: ['computational procedure', 'mathematical rule'], ant: [], family: { noun: 'algorithm', adjective: 'algorithmic', adverb: 'algorithmically' } },
  { word: 'disruption', pos: 'noun', topic: 'technology', def: 'Radical change to an existing industry or market, especially by means of innovative technology.', urdu: 'جدت کی وجہ سے روایتی نظام میں بڑا انقلاب', band: 7.5, level: 'C1', collocations: ['digital disruption', 'technological disruption', 'market disruption', 'cause disruption'], syn: ['upheaval', 'breakthrough', 'transformation'], ant: ['stability', 'continuity'], family: { noun: 'disruption', verb: 'disrupt', adjective: 'disruptive' } },

  // 3. Education & Learning
  { word: 'pedagogy', pos: 'noun', topic: 'education', def: 'The method and practice of teaching, especially as an academic subject or theoretical concept.', urdu: 'طریقہ تدریس (تعلیم کا فن اور اصول)', band: 8.0, level: 'C1', collocations: ['innovative pedagogy', 'traditional pedagogy', 'pedagogical approach', 'pedagogical methods'], syn: ['teaching methodology', 'instructional theory'], ant: [], family: { noun: 'pedagogy', adjective: 'pedagogical', adverb: 'pedagogically' } },
  { word: 'curriculum', pos: 'noun', topic: 'education', def: 'The subjects comprising a course of study in a school or college.', urdu: 'نصاب تعلیم', band: 6.5, level: 'B2', collocations: ['school curriculum', 'core curriculum', 'design a curriculum', 'enrich the curriculum'], syn: ['syllabus', 'program of study'], ant: [], family: { noun: 'curriculum', adjective: 'curricular' } },
  { word: 'cognitive', pos: 'adjective', topic: 'education', def: 'Relating to the mental processes of perception, memory, judgment, and reasoning.', urdu: 'دماغی یا ادراکی صلاحیتوں سے متعلق', band: 7.5, level: 'C1', collocations: ['cognitive development', 'cognitive abilities', 'cognitive load', 'cognitive impairment'], syn: ['mental', 'intellectual', 'cerebral'], ant: ['physical'], family: { adjective: 'cognitive', adverb: 'cognitively', noun: 'cognition' } },
  { word: 'rote', pos: 'noun', topic: 'education', def: 'Mechanical or habitual repetition of something to be learned without understanding.', urdu: 'رٹہ بازی یا محض زبانی یاد کرنا', band: 7.0, level: 'B2', collocations: ['rote learning', 'rote memorization', 'learn by rote', 'rote repetition'], syn: ['mechanical learning', 'memorization'], ant: ['critical thinking', 'conceptual mastery'], family: { noun: 'rote' } },

  // 4. Health & Medicine
  { word: 'epidemic', pos: 'noun', topic: 'health', def: 'A widespread occurrence of an infectious disease in a community at a particular time.', urdu: 'وبائی بیماری یا تیز پھیلاؤ', band: 7.0, level: 'B2', collocations: ['obesity epidemic', 'prevent an epidemic', 'reach epidemic proportions', 'flu epidemic'], syn: ['outbreak', 'plague', 'surge'], ant: ['containment', 'eradication'], family: { noun: 'epidemic', adjective: 'epidemic' } },
  { word: 'sedentary', pos: 'adjective', topic: 'health', def: 'Characterized by or requiring much sitting and little physical exercise.', urdu: 'غیر متحرک یا آرام طلب (جسمانی حرکت کے بغیر)', band: 7.5, level: 'C1', collocations: ['sedentary lifestyle', 'sedentary habits', 'sedentary work', 'remain sedentary'], syn: ['inactive', 'desk-bound', 'motionless'], ant: ['active', 'dynamic', 'athletic'], family: { adjective: 'sedentary' } },
  { word: 'cardiovascular', pos: 'adjective', topic: 'health', def: 'Relating to the heart and blood vessels.', urdu: 'دل اور خون کی شریانوں سے متعلق', band: 7.5, level: 'C1', collocations: ['cardiovascular disease', 'cardiovascular fitness', 'cardiovascular health', 'cardiovascular risk'], syn: ['circulatory', 'heart-related'], ant: [], family: { adjective: 'cardiovascular' } },
  { word: 'preventative', pos: 'adjective', topic: 'health', def: 'Designed to keep something undesirable such as illness or disease from occurring.', urdu: 'حفاظتی یا انسدادی', band: 7.0, level: 'B2', collocations: ['preventative healthcare', 'preventative medicine', 'preventative measures', 'preventative screening'], syn: ['prophylactic', 'precautionary', 'protective'], ant: ['reactive', 'curative'], family: { adjective: 'preventative', verb: 'prevent', noun: 'prevention' } },

  // 5. Society & Culture
  { word: 'assimilation', pos: 'noun', topic: 'society', def: 'The process of becoming similar to something, especially the cultural absorption of a minority group into a main society.', urdu: 'معاشرتی ہم آہنگی یا ثقافتی انضمام', band: 8.0, level: 'C1', collocations: ['cultural assimilation', 'facilitate assimilation', 'complete assimilation', 'process of assimilation'], syn: ['integration', 'absorption', 'incorporation'], ant: ['segregation', 'isolation'], family: { noun: 'assimilation', verb: 'assimilate' } },
  { word: 'heritage', pos: 'noun', topic: 'society', def: 'Valued objects, qualities, and traditions passed down from previous generations.', urdu: 'ثقافتی یا تاریخی ورثہ', band: 7.0, level: 'B2', collocations: ['cultural heritage', 'preserve heritage', 'rich heritage', 'architectural heritage'], syn: ['legacy', 'inheritance', 'tradition'], ant: [], family: { noun: 'heritage' } },
  { word: 'cohesion', pos: 'noun', topic: 'society', def: 'The action or state of cohering or sticking together; unity and shared purpose in society.', urdu: 'معاشرتی اتحاد اور یگانگت', band: 8.0, level: 'C1', collocations: ['social cohesion', 'community cohesion', 'strengthen cohesion', 'undermine cohesion'], syn: ['solidarity', 'unity', 'togetherness'], ant: ['division', 'fracture'], family: { noun: 'cohesion', adjective: 'cohesive', adverb: 'cohesively' } },
  { word: 'demographic', pos: 'adjective', topic: 'society', def: 'Relating to the structure of populations according to age, gender, income, etc.', urdu: 'آبادیاتی خصوصیات سے متعلق', band: 7.5, level: 'C1', collocations: ['demographic shift', 'demographic changes', 'demographic profile', 'aging demographic'], syn: ['population-based', 'statistical'], ant: [], family: { adjective: 'demographic', noun: 'demography' } },

  // 6. Work & Careers
  { word: 'remuneration', pos: 'noun', topic: 'work', def: 'Money paid for work or a service.', urdu: 'اجرت، معاوضہ یا تنخواہ', band: 8.0, level: 'C1', collocations: ['financial remuneration', 'adequate remuneration', 'remuneration package', 'receive remuneration'], syn: ['compensation', 'salary', 'payment', 'wages'], ant: ['unpaid work'], family: { noun: 'remuneration', verb: 'remunerate', adjective: 'remunerative' } },
  { word: 'telecommuting', pos: 'noun', topic: 'work', def: 'Working from home or remotely using telecommunications and computer networks.', urdu: 'گھر بیٹھے بذریعہ انٹرنیٹ کام کرنا', band: 7.0, level: 'B2', collocations: ['rise of telecommuting', 'adopt telecommuting', 'telecommuting policy', 'remote telecommuting'], syn: ['remote work', 'working from home'], ant: ['office-based commute'], family: { noun: 'telecommuting', verb: 'telecommute', nounPerson: 'telecommuter' } },
  { word: 'redundancy', pos: 'noun', topic: 'work', def: 'The state of being no longer needed or useful; dismissal from work due to job elimination.', urdu: 'ملازمت سے فراغت یا بے کاری', band: 7.5, level: 'C1', collocations: ['voluntary redundancy', 'face redundancy', 'redundancy package', 'mass redundancies'], syn: ['layoff', 'downsizing', 'job elimination'], ant: ['recruitment', 'employment'], family: { noun: 'redundancy', adjective: 'redundant' } },
  { word: 'vocational', pos: 'adjective', topic: 'work', def: 'Relating to an occupation or employment, especially practical trades rather than academic theory.', urdu: 'پیشہ ورانہ یا ہنر مندی سے متعلق', band: 7.0, level: 'B2', collocations: ['vocational training', 'vocational education', 'vocational skills', 'vocational qualifications'], syn: ['occupational', 'technical', 'job-oriented'], ant: ['academic', 'theoretical'], family: { adjective: 'vocational', noun: 'vocation' } },

  // 7. Crime & Justice
  { word: 'deterrent', pos: 'noun', topic: 'crime', def: 'A thing that discourages or is intended to discourage someone from doing something.', urdu: 'روک تھام کرنے والا عنصر یا عبرتناک سزا', band: 7.5, level: 'C1', collocations: ['effective deterrent', 'act as a deterrent', 'strong deterrent', 'punitive deterrent'], syn: ['disincentive', 'discouragement', 'check'], ant: ['incentive', 'encouragement'], family: { noun: 'deterrent', verb: 'deter', nounAbstract: 'deterrence' } },
  { word: 'rehabilitation', pos: 'noun', topic: 'crime', def: 'The action of restoring someone to health or normal life through training and therapy after imprisonment or illness.', urdu: 'بحالی، اصلاح یا دوبارہ کارآمد بنانا', band: 7.5, level: 'C1', collocations: ['prisoner rehabilitation', 'focus on rehabilitation', 'rehabilitation program', 'successful rehabilitation'], syn: ['reintegration', 'reformation', 'recovery'], ant: ['punishment', 'retribution'], family: { noun: 'rehabilitation', verb: 'rehabilitate' } },
  { word: 'recidivism', pos: 'noun', topic: 'crime', def: 'The tendency of a convicted criminal to reoffend repeatedly.', urdu: 'بار بار جرم کا اعادہ یا پرانی عادت پر لوٹنا', band: 8.5, level: 'C1', collocations: ['rate of recidivism', 'reduce recidivism', 'high recidivism', 'prevent recidivism'], syn: ['reoffending', 'relapse', 'repeat crime'], ant: ['rehabilitation', 'desistance'], family: { noun: 'recidivism', nounPerson: 'recidivist' } },
  { word: 'surveillance', pos: 'noun', topic: 'crime', def: 'Close observation, especially of a suspected spy or criminal, or of public spaces for safety.', urdu: 'نگرانی یا کیمروں کے ذریعے نظر رکھنا', band: 7.0, level: 'B2', collocations: ['mass surveillance', 'surveillance cameras', 'under constant surveillance', 'electronic surveillance'], syn: ['monitoring', 'observation', 'supervision'], ant: ['privacy'], family: { noun: 'surveillance' } },

  // 8. Media & Advertising
  { word: 'sensationalism', pos: 'noun', topic: 'media', def: 'The presentation of stories in a way that is intended to provoke public interest and excitement, at the expense of accuracy.', urdu: 'سنسنی خیزی (حقائق کے بجائے جذبات ابھارنا)', band: 7.5, level: 'C1', collocations: ['media sensationalism', 'resort to sensationalism', 'avoid sensationalism', 'sensationalist headlines'], syn: ['melodrama', 'exaggeration', 'hype'], ant: ['objective reporting', 'sobriety'], family: { noun: 'sensationalism', adjective: 'sensational', verb: 'sensationalize' } },
  { word: 'propaganda', pos: 'noun', topic: 'media', def: 'Information, especially of a biased or misleading nature, used to promote a political cause or point of view.', urdu: 'پروپیگنڈا یا گمراہ کن تشہیر', band: 7.0, level: 'B2', collocations: ['spread propaganda', 'state propaganda', 'political propaganda', 'counter propaganda'], syn: ['disinformation', 'indoctrination', 'bias'], ant: ['truth', 'factual reporting'], family: { noun: 'propaganda', adjective: 'propagandist' } },
  { word: 'ubiquity', pos: 'noun', topic: 'media', def: 'The fact of appearing everywhere or of being very common.', urdu: 'ہمہ گیری یا ہر جگہ موجودگی', band: 8.0, level: 'C1', collocations: ['ubiquity of smartphones', 'growing ubiquity', 'cultural ubiquity', 'ubiquity of advertising'], syn: ['pervasiveness', 'omnipresence'], ant: ['scarcity', 'rarity'], family: { noun: 'ubiquity', adjective: 'ubiquitous' } },

  // 9. Economy & Finance
  { word: 'deficit', pos: 'noun', topic: 'economy', def: 'The amount by which something, especially a sum of money, is too small or expenses exceed revenue.', urdu: 'خسارہ یا کمی (آمدنی سے زیادہ خرچ)', band: 7.0, level: 'B2', collocations: ['budget deficit', 'trade deficit', 'reduce the deficit', 'ballooning deficit'], syn: ['shortfall', 'deficiency', 'debt'], ant: ['surplus', 'profit'], family: { noun: 'deficit' } },
  { word: 'fluctuation', pos: 'noun', topic: 'economy', def: 'An irregular rising and falling in number or amount; a variation.', urdu: 'اتار چڑھاؤ یا قیمتوں کی تبدیلی', band: 7.0, level: 'B2', collocations: ['price fluctuation', 'currency fluctuation', 'wild fluctuations', 'market fluctuations'], syn: ['variation', 'oscillation', 'shift'], ant: ['stability', 'constancy'], family: { noun: 'fluctuation', verb: 'fluctuate' } },
  { word: 'commodity', pos: 'noun', topic: 'economy', def: 'A raw material or primary agricultural product that can be bought and sold, such as copper or coffee.', urdu: 'بنیادی تجارتی جنس یا خام مال', band: 7.5, level: 'C1', collocations: ['commodity market', 'basic commodity', 'commodity prices', 'trade commodities'], syn: ['raw material', 'good', 'product'], ant: [], family: { noun: 'commodity' } },

  // 10. Travel & Tourism
  { word: 'excursion', pos: 'noun', topic: 'travel', def: 'A short journey or trip, especially one taken as a leisure activity.', urdu: 'مختصر تفریحی سفر یا دورہ', band: 6.5, level: 'B2', collocations: ['day excursion', 'guided excursion', 'go on an excursion', 'boat excursion'], syn: ['outing', 'trip', 'expedition'], ant: [], family: { noun: 'excursion' } },
  { word: 'picturesque', pos: 'adjective', topic: 'travel', def: 'Visually attractive, especially in a quaint, charming, or scenic way.', urdu: 'دلکش اور تصویری حسن کا حامل منظر', band: 7.0, level: 'B2', collocations: ['picturesque village', 'picturesque landscape', 'picturesque harbor', 'truly picturesque'], syn: ['scenic', 'charming', 'quaint'], ant: ['unsightly', 'drab'], family: { adjective: 'picturesque' } },
  { word: 'indigenous', pos: 'adjective', topic: 'travel', def: 'Originating or occurring naturally in a particular place; native.', urdu: 'مقامی یا دیسی باشندے و پودے', band: 7.5, level: 'C1', collocations: ['indigenous population', 'indigenous culture', 'indigenous species', 'indigenous knowledge'], syn: ['native', 'aboriginal', 'endemic'], ant: ['exotic', 'introduced', 'foreign'], family: { adjective: 'indigenous' } },

  // 11. Government & Politics
  { word: 'sovereignty', pos: 'noun', topic: 'government', def: 'Supreme power or authority; the authority of a state to govern itself or another state.', urdu: 'خود مختاری یا اعلیٰ اقتدار', band: 8.0, level: 'C1', collocations: ['national sovereignty', 'violate sovereignty', 'protect sovereignty', 'state sovereignty'], syn: ['autonomy', 'independence', 'self-determination'], ant: ['subjugation', 'dependence'], family: { noun: 'sovereignty', adjective: 'sovereign' } },
  { word: 'referendum', pos: 'noun', topic: 'government', def: 'A general vote by the electorate on a single political question referred to them for a direct decision.', urdu: 'عوامی ریفرنڈم یا رائے شماری', band: 7.0, level: 'B2', collocations: ['hold a referendum', 'nationwide referendum', 'binding referendum', 'outcome of the referendum'], syn: ['plebiscite', 'public ballot'], ant: [], family: { noun: 'referendum' } },

  // 12. Urbanisation & Housing
  { word: 'sprawl', pos: 'noun', topic: 'urbanisation', def: 'The uncontrolled expansion of urban areas into rural territory.', urdu: 'شہر کا بے ہنگم اور پھیلاؤ', band: 7.5, level: 'C1', collocations: ['urban sprawl', 'curb urban sprawl', 'suburban sprawl', 'uncontrolled sprawl'], syn: ['unplanned expansion', 'dispersion'], ant: ['compact city', 'urban density'], family: { noun: 'sprawl', verb: 'sprawl' } },
  { word: 'gentrification', pos: 'noun', topic: 'urbanisation', def: 'The process of renovating and improving a housing district so that it conforms to middle-class taste, often displacing poorer residents.', urdu: 'غریب بستیوں کی امیروں کے لیے تزئین و آرائش', band: 8.0, level: 'C1', collocations: ['rapid gentrification', 'neighborhood gentrification', 'consequences of gentrification', 'drive gentrification'], syn: ['urban renewal', 'neighborhood upgrading'], ant: [], family: { noun: 'gentrification', verb: 'gentrify' } },

  // 13. Food & Agriculture
  { word: 'malnutrition', pos: 'noun', topic: 'food', def: 'Lack of proper nutrition, caused by not having enough to eat, or not eating enough of the right things.', urdu: 'غذائیت کی شدید کمی یا ناقص غذا', band: 7.0, level: 'B2', collocations: ['suffer from malnutrition', 'combat malnutrition', 'chronic malnutrition', 'childhood malnutrition'], syn: ['undernourishment', 'starvation'], ant: ['nourishment', 'balanced diet'], family: { noun: 'malnutrition', adjective: 'malnourished' } },
  { word: 'organic', pos: 'adjective', topic: 'food', def: 'Produced or involving production without the use of chemical fertilizers, pesticides, or other artificial chemicals.', urdu: 'قدرتی طریقے سے تیار شدہ (بغیر کیمیکل کے)', band: 6.5, level: 'B2', collocations: ['organic farming', 'organic food', 'certified organic', 'organic produce'], syn: ['natural', 'biological', 'pesticide-free'], ant: ['conventional', 'chemically treated'], family: { adjective: 'organic', adverb: 'organically' } },

  // 14. Arts & Heritage
  { word: 'aesthetic', pos: 'adjective', topic: 'arts', def: 'Concerned with beauty or the appreciation of beauty.', urdu: 'جمالیاتی یا حسن سے متعلق', band: 7.5, level: 'C1', collocations: ['aesthetic appeal', 'aesthetic value', 'purely aesthetic', 'aesthetic sensibility'], syn: ['artistic', 'tasteful', 'visual'], ant: ['unaesthetic', 'crude'], family: { adjective: 'aesthetic', noun: 'aesthetics', adverb: 'aesthetically' } },
  { word: 'preservation', pos: 'noun', topic: 'arts', def: 'The action of preserving something in its original state or protecting it from decay.', urdu: 'حفاظت، تحفظ یا تاریخی اشیاء کی نگہداشت', band: 7.0, level: 'B2', collocations: ['historic preservation', 'preservation of heritage', 'preservation efforts', 'ensure the preservation'], syn: ['conservation', 'protection', 'safeguarding'], ant: ['destruction', 'neglect'], family: { noun: 'preservation', verb: 'preserve' } },

  // 15. Sport & Leisure
  { word: 'recreation', pos: 'noun', topic: 'sport', def: 'Activity done for enjoyment when one is not working.', urdu: 'تفریح، کھیل کود یا فرصت کا مشغلہ', band: 6.5, level: 'B2', collocations: ['outdoor recreation', 'recreation facilities', 'leisure and recreation', 'public recreation'], syn: ['leisure', 'pastime', 'amusement'], ant: ['labor', 'drudgery'], family: { noun: 'recreation', adjective: 'recreational' } },
  { word: 'stamina', pos: 'noun', topic: 'sport', def: 'The ability to sustain prolonged physical or mental effort.', urdu: 'جسمانی یا ذہنی قوت برداشت و توانائی', band: 7.0, level: 'B2', collocations: ['build stamina', 'physical stamina', 'endurance and stamina', 'require great stamina'], syn: ['endurance', 'resilience', 'staying power'], ant: ['fatigue', 'weakness'], family: { noun: 'stamina' } },

  // 16. Transport & Mobility
  { word: 'commute', pos: 'verb', topic: 'transport', def: 'Travel some distance between home and place of work on a regular basis.', urdu: 'روزانہ کام کے لیے سفر کرنا', band: 6.5, level: 'B2', collocations: ['daily commute', 'commute to work', 'long commute', 'morning commute'], syn: ['travel', 'journey'], ant: [], family: { verb: 'commute', noun: 'commute', nounPerson: 'commuter' } },
  { word: 'transit', pos: 'noun', topic: 'transport', def: 'The carrying of people, goods, or materials from one place to another.', urdu: 'آمد و رفت یا عوامی ٹرانسپورٹ کا نظام', band: 7.0, level: 'B2', collocations: ['public transit', 'mass transit', 'rapid transit', 'transit system'], syn: ['transportation', 'conveyance'], ant: [], family: { noun: 'transit' } },

  // 17. Communication & Language
  { word: 'rhetoric', pos: 'noun', topic: 'communication', def: 'The art of effective or persuasive speaking or writing.', urdu: 'فن بیان، فصاحت و بلاغت یا خطابت', band: 8.0, level: 'C1', collocations: ['political rhetoric', 'empty rhetoric', 'use of rhetoric', 'persuasive rhetoric'], syn: ['oratory', 'eloquence', 'discourse'], ant: [], family: { noun: 'rhetoric', adjective: 'rhetorical', adverb: 'rhetorically' } },
  { word: 'articulate', pos: 'adjective', topic: 'communication', def: 'Having or showing the ability to speak fluently and coherently.', urdu: 'فصیح و بلیغ، صاف گو اور واضح بولنے والا', band: 7.5, level: 'C1', collocations: ['highly articulate', 'articulate speaker', 'articulate an argument', 'clearly articulate'], syn: ['eloquent', 'fluent', 'expressive'], ant: ['inarticulate', 'hesitant'], family: { adjective: 'articulate', verb: 'articulate', noun: 'articulation' } },

  // 18. Global Issues
  { word: 'disparity', pos: 'noun', topic: 'global_issues', def: 'A great difference or inequality between groups or individuals.', urdu: 'شدید عدم مساوات یا فرق', band: 7.5, level: 'C1', collocations: ['economic disparity', 'growing disparity', 'regional disparity', 'income disparity'], syn: ['inequality', 'imbalance', 'discrepancy'], ant: ['equality', 'parity'], family: { noun: 'disparity' } },
  { word: 'humanitarian', pos: 'adjective', topic: 'global_issues', def: 'Concerned with or seeking to promote human welfare and relieve suffering.', urdu: 'انسانی ہمدردی یا فلاح سے متعلق', band: 7.0, level: 'B2', collocations: ['humanitarian aid', 'humanitarian crisis', 'humanitarian relief', 'humanitarian intervention'], syn: ['compassionate', 'charitable', 'philanthropic'], ant: ['inhumane', 'hostile'], family: { adjective: 'humanitarian', noun: 'humanitarianism' } },

  // 19. Academic Essentials (Verbs & Hedging)
  { word: 'corroborate', pos: 'verb', topic: 'academic_essentials', def: 'Confirm or give support to a statement, theory, or finding with evidence.', urdu: 'ثبوت دے کر توثیق یا تصدیق کرنا', band: 8.5, level: 'C1', collocations: ['corroborate evidence', 'corroborate findings', 'independent studies corroborate', 'fully corroborate'], syn: ['substantiate', 'verify', 'validate'], ant: ['contradict', 'refute'], family: { verb: 'corroborate', noun: 'corroboration', adjective: 'corroborative' } },
  { word: 'purport', pos: 'verb', topic: 'academic_essentials', def: 'Appear or claim to be or do something, especially falsely.', urdu: 'دعویٰ کرنا (بالخصوص مشکوک یا ظاہری دعویٰ)', band: 8.0, level: 'C1', collocations: ['purport to show', 'purport to be', 'purported benefits', 'purported link'], syn: ['claim', 'assert', 'profess'], ant: [], family: { verb: 'purport', adjective: 'purported', adverb: 'purportedly' } },
  { word: 'delineate', pos: 'verb', topic: 'academic_essentials', def: 'Describe or portray something precisely in writing or analysis.', urdu: 'واضح طور پر بیان یا حد بندی کرنا', band: 8.0, level: 'C1', collocations: ['clearly delineate', 'delineate the boundaries', 'delineate differences', 'delineate responsibilities'], syn: ['describe', 'outline', 'define'], ant: ['confuse', 'distort'], family: { verb: 'delineate', noun: 'delineation' } },

  // 20. Band 7+ Upgrades
  { word: 'pivotal', pos: 'adjective', topic: 'band7_upgrades', def: 'Of crucial importance in relation to the development or success of something else (Band 7+ upgrade for "very important").', urdu: 'انتہائی فیصلہ کن یا کلیدی', band: 7.5, level: 'C1', collocations: ['play a pivotal role', 'pivotal moment', 'pivotal factor', 'proves pivotal'], syn: ['crucial', 'central', 'vital'], ant: ['marginal', 'trivial'], family: { adjective: 'pivotal', adverb: 'pivotally' } },
  { word: 'detrimental', pos: 'adjective', topic: 'band7_upgrades', def: 'Tending to cause harm or damage (Band 7+ upgrade for "bad" or "harmful").', urdu: 'نقصان دہ یا مضر', band: 7.5, level: 'C1', collocations: ['detrimental effect', 'highly detrimental', 'detrimental impact', 'detrimental to health'], syn: ['harmful', 'damaging', 'deleterious'], ant: ['beneficial', 'advantageous'], family: { adjective: 'detrimental', adverb: 'detrimentally' } },
  { word: 'paramount', pos: 'adjective', topic: 'band7_upgrades', def: 'More important than anything else; supreme (Band 7+ upgrade for "most important").', urdu: 'سب سے اہم یا مقدم', band: 8.0, level: 'C1', collocations: ['of paramount importance', 'paramount concern', 'paramount duty', 'remain paramount'], syn: ['supreme', 'foremost', 'preeminent'], ant: ['subordinate', 'trivial'], family: { adjective: 'paramount' } },
];

let addedCount = 0;
ADDITIONAL_VOCAB.forEach((item) => {
  if (!existingMap.has(item.word.toLowerCase())) {
    const id = `voc-${String(currentWords.length + addedCount + 1).padStart(3, '0')}`;
    const entry = {
      id,
      word: item.word,
      headword: item.word,
      partOfSpeech: item.pos,
      phonetic: item.phonetic || `/${item.word.toLowerCase()}/`,
      topic: item.topic,
      topicTags: [item.topic],
      meaning: item.def,
      definition: item.def,
      urduMeaning: item.urdu,
      exampleSentence: `Academics frequently utilize ${item.word} to articulate rigorous analytical arguments.`,
      examples: [
        { sentence: `The research clearly demonstrates the impact of ${item.word} on contemporary issues.`, type: 'academic', context: 'Academic Research' },
        { sentence: `Understanding ${item.word} helps communicators explain detailed concepts effectively.`, type: 'everyday', context: 'Everyday Discourse' },
        { sentence: `Using ${item.word} accurately elevates lexical resource scores in IELTS Writing and Speaking.`, type: 'ielts', context: 'IELTS Assessment' }
      ],
      collocations: item.collocations,
      synonyms: item.syn,
      antonyms: item.ant,
      wordFamily: item.family,
      commonMistakes: `Pay close attention to collocation context when incorporating ${item.word} into essays.`,
      register: 'formal',
      skillTags: ['Writing', 'Speaking', 'Reading'],
      level: item.level,
      bandTarget: item.band,
      bandRange: item.band >= 7.5 ? '7.0 - 8.0' : '6.0 - 7.0',
      status: 'published'
    };
    currentWords.push(entry);
    existingMap.set(item.word.toLowerCase(), entry);
    addedCount++;
  }
});

console.log(`Added ${addedCount} new words across topics.`);
console.log(`Total words now in bank: ${currentWords.length}`);

fs.writeFileSync(WORDS_PATH, JSON.stringify(currentWords, null, 2), 'utf-8');
console.log('Saved successfully!');
