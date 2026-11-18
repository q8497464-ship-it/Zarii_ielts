import fs from 'fs';
import path from 'path';

const cueCardTopics = [
  // 31 to 40
  {
    topic: "A Piece of Technology You Find Invaluable",
    prompt: "Describe a piece of modern technology that you find extremely useful in daily life.",
    bullets: ["What the technology is", "How often and where you use it", "What specific functions it performs for you", "And explain why you consider it so invaluable"],
    collocations: ["indispensable digital tool", "streamlines daily workflow", "exponential leap in productivity", "ubiquitous connectivity", "intuitive user interface"],
    part3: [
      { q: "How has portable digital technology changed human social interactions?", outline: "Discuss how smartphones enhance long-distance connectivity while occasionally causing phubbing and surface-level interactions." },
      { q: "Will artificial intelligence tools replace human technical workers in the near future?", outline: "Analyze how AI automates repetitive analytical coding while human oversight, empathy, and creativity remain essential." },
      { q: "Should schools restrict mobile technology inside classrooms?", outline: "Examine attentional distraction versus the pedagogical value of tablets for interactive visual learning." }
    ]
  },
  {
    topic: "A Time You Overcame a Major Challenge",
    prompt: "Describe a challenging situation or obstacle you faced and successfully resolved.",
    bullets: ["What the challenge was and when it occurred", "Why it was particularly difficult for you", "What specific steps you took to overcome it", "And explain what life lesson you learned from the experience"],
    collocations: ["insurmountable obstacle", "perseverance and tenacity", "systematic problem-solving", "emotional fortitude", "character-defining milestone"],
    part3: [
      { q: "Why are some individuals more resilient in the face of adversity than others?", outline: "Discuss internal locus of control, growth mindset, and the protective buffer of family support." },
      { q: "How can parents cultivate problem-solving independence in children?", outline: "Advocate allowing children to make safe mistakes rather than practicing overprotective helicopter parenting." },
      { q: "Do difficult life experiences make people more compassionate toward others?", outline: "Explain how personal struggle builds genuine emotional empathy and altruistic behavior." }
    ]
  },
  {
    topic: "An Environmental Project You Would Like to Join",
    prompt: "Describe an environmental initiative or conservation project you would like to participate in.",
    bullets: ["What the project is and what environmental issue it targets", "Where it is located and who organizes it", "What activities participants undertake", "And explain why you feel passionate about this project"],
    collocations: ["biodiversity restoration", "grassroots community initiative", "mitigate environmental degradation", "ecological stewardship", "tangible conservation outcome"],
    part3: [
      { q: "Why do some people feel overwhelmed by global climate change?", outline: "Address eco-anxiety and cognitive helplessness when facing planetary-scale environmental crises." },
      { q: "How can municipal councils encourage citizens to participate in local clean-ups?", outline: "Suggest community gamification, school credits, public recognition, and clean neighborhood competitions." },
      { q: "Are international climate summits effective in enforcing pollution reduction?", outline: "Evaluate non-binding diplomatic pledges versus the imperative for legally enforceable trade tariffs." }
    ]
  },
  {
    topic: "A Historic City You Have Visited or Wish to Visit",
    prompt: "Describe a city with rich historical heritage that you have visited or would love to explore.",
    bullets: ["Where the city is located", "What historical landmarks or architecture it is known for", "What you did or would like to do there", "And explain why this city holds historical significance for you"],
    collocations: ["architectural marvel", "steeped in centuries of history", "cultural crossroad", "preserved heritage monuments", "evocative ancient ruins"],
    part3: [
      { q: "Why is it important for a nation to protect its architectural heritage?", outline: "Emphasize cultural identity, ancestral roots, civic pride, and international tourism revenue." },
      { q: "How can historic cities accommodate modern mass transit without damaging ancient sites?", outline: "Highlight underground tunneling techniques, pedestrianized historic centers, and electric trams." },
      { q: "Should entrance to state-owned historic museums be completely free to the public?", outline: "Argue for universal democratic cultural access funded by general taxation versus visitor maintenance fees." }
    ]
  },
  {
    topic: "A Foreign Culture You Admire",
    prompt: "Describe a foreign country or culture that you find particularly fascinating.",
    bullets: ["Which country or culture it is", "How you first learned about it", "What distinctive customs, traditions, or values it possesses", "And explain why you admire this culture so much"],
    collocations: ["rich cultural tapestry", "deep-rooted traditions", "communal harmony", "aesthetic refinement", "mutual respect and hospitality"],
    part3: [
      { q: "How does international travel alter people's cultural worldview?", outline: "Discuss breaking stereotypic biases, fostering cognitive empathy, and broadening philosophical horizons." },
      { q: "Is economic globalization leading to the loss of distinctive cultural identities?", outline: "Contrast the spread of Americanized consumerism with localized cultural revitalization movements." },
      { q: "How can multi-ethnic societies celebrate cultural diversity while maintaining civic unity?", outline: "Suggest multicultural civic festivals, inclusive national holidays, and anti-discrimination legislation." }
    ]
  },
  {
    topic: "A Skill You Learned Outside School or University",
    prompt: "Describe a practical or creative skill you acquired through self-study or community practice.",
    bullets: ["What the skill is", "Why you chose to learn it", "How you practiced and improved over time", "And explain how this skill has benefited your daily life"],
    collocations: ["steep learning curve", "self-directed autodidact", "trial and error", "dexterity and precision", "practical real-world utility"],
    part3: [
      { q: "Why are practical vocational skills often undervalued compared to academic degrees?", outline: "Critique white-collar prestige bias and note the acute economic demand for skilled trades." },
      { q: "How has internet video tutorials changed how people learn crafts and hobbies?", outline: "Explain the democratization of masterclasses through YouTube and interactive forums." },
      { q: "Should basic practical skills like cooking and personal finance be compulsory in schools?", outline: "Argue that essential life skills prevent adult debt and promote nutritional independence." }
    ]
  },
  {
    topic: "An Inspiring Public Figure You Admire",
    prompt: "Describe a well-known person (living or historical) who inspires you deeply.",
    bullets: ["Who the person is and what field they are known for", "What major achievements or contributions they made", "What personal qualities define their character", "And explain why you find their life so inspiring"],
    collocations: ["uncompromising integrity", "visionary leadership", "indomitable courage", "profound societal impact", "selfless dedication to a cause"],
    part3: [
      { q: "What defines a true role model in contemporary celebrity culture?", outline: "Contrast transient social media fame with substance: moral courage, humility, and lasting public service." },
      { q: "Do high-profile figures have an ethical responsibility to speak out on social issues?", outline: "Weigh their influential public platform against the risk of shallow performative activism." },
      { q: "Why are historical leaders often romanticized after their deaths?", outline: "Explain human cognitive tendencies to simplify flawed complex mortals into heroic archetypes." }
    ]
  },
  {
    topic: "A Book That Had a Profound Impact on You",
    prompt: "Describe a book (fiction or non-fiction) that changed your perspective on life.",
    bullets: ["What the book is and who wrote it", "What the central story or thesis explores", "When and why you read it", "And explain why it made such a lasting impression on your mindset"],
    collocations: ["thought-provoking masterpiece", "paradigm-shifting insights", "compelling narrative arc", "eloquent prose style", "resonated deeply on a personal level"],
    part3: [
      { q: "Will physical printed books survive in an increasingly digitized society?", outline: "Highlight tactile aesthetic pleasure, distraction-free reading, and archival permanence of physical books." },
      { q: "Should literature education in secondary schools focus on ancient classics or modern novels?", outline: "Advocate a hybrid curriculum: timeless classical themes balanced with relatable contemporary diversity." },
      { q: "How does reading literary fiction enhance interpersonal empathy?", outline: "Explain theory of mind: living inside diverse characters' psychological consciousness builds real-world empathy." }
    ]
  },
  {
    topic: "A Time You Volunteered to Help Someone",
    prompt: "Describe an occasion when you gave your time or effort to assist someone in need.",
    bullets: ["Who you helped and what the situation was", "What specific tasks you performed", "How the person reacted to your assistance", "And explain how you felt about volunteering your time"],
    collocations: ["altruistic endeavor", "profound sense of fulfillment", "lending a helping hand", "unconditional solidarity", "humbling emotional experience"],
    part3: [
      { q: "Why should corporate businesses encourage employees to volunteer during work hours?", outline: "Discuss corporate social responsibility, team bonding, employee morale, and community goodwill." },
      { q: "Should voluntary community service be mandatory for all high school graduates?", outline: "Weigh cultivating civic duty and social empathy against the paradox of forced volunteerism." },
      { q: "How can charities utilize social media to recruit younger volunteers?", outline: "Suggest authentic visual storytelling, gamified micro-volunteering, and highlighting tangible impacts." }
    ]
  },
  {
    topic: "An Unforgettable Natural Landscape You Visited",
    prompt: "Describe a breathtaking natural landscape or outdoor setting you have experienced.",
    bullets: ["Where the place is located", "What the scenery and geography look like", "Who you went there with and what you did", "And explain why this natural setting left such a vivid impression on you"],
    collocations: ["awe-inspiring panorama", "untouched wilderness", "tranquil serenity", "geological majesty", "reconnecting with the natural world"],
    part3: [
      { q: "Why is spending time in natural green spaces beneficial for mental wellbeing?", outline: "Cite attention restoration theory, reduction in cortisol levels, and relief from urban sensory overload." },
      { q: "How can national parks balance ecotourism revenue with wilderness preservation?", outline: "Examine strict visitor caps, permit lotteries, boardwalk zoning, and banning private motorcars." },
      { q: "Should pristine wilderness areas be protected from all commercial mineral exploration?", outline: "Argue for the intrinsic rights of nature and ecosystem preservation over short-term resource exploitation." }
    ]
  }
];

// Generate 50 more varied topics across all themes to reach 60 total
const additionalThemes = [
  "A Traditional Festival or Cultural Celebration in Your Country",
  "A Goal You Set for Yourself and Achieved Through Discipline",
  "An Important Advice You Received That Influenced Your Decisions",
  "A Quiet Place You Like to Visit to Relax or Concentrate",
  "A Time You Learned Something New About Yourself",
  "A Creative Hobby You Pursue in Your Leisure Time",
  "A Meaningful Gift You Received That Held Sentimental Value",
  "An Interesting Conversation You Had with an Elderly Person",
  "A Film or Documentary That Changed Your View of the World",
  "A Healthy Lifestyle Habit You Recently Adopted",
  "A Long Journey You Undertook by Train, Car, or Boat",
  "A Public Garden or Urban Park You Frequently Enjoy",
  "A Piece of Good News You Received That Made You Very Happy",
  "A Small Business in Your Neighborhood You Like to Support",
  "A Disagreement You Had with a Friend and How You Resolved It",
  "An Object or Souvenir You Collected from a Trip",
  "A Performance (Concert, Theatre, or Dance) You Truly Enjoyed",
  "A Time You Got Lost and How You Found Your Way",
  "A Foreign Language You Would Love to Learn and Why",
  "An Inspiring Teacher Who Had a Major Influence on Your Life",
  "A Traditional Dish from Your Region That You Enjoy Cooking",
  "A Time You Had to Work in a Team Under Pressure",
  "A Science Subject or Concept You Found Fascinating in School",
  "An Architectural Landmark That Dominates Your City Skyline",
  "A Time You Encouraged Someone to Overcome Fear",
  "A Wildlife Encounter in the Wild That Fascinated You",
  "A Skill You Would Like to Teach to Other People",
  "A Time You Received Outstanding Customer Service",
  "An Exhibition or Art Gallery You Visited Recently",
  "A Childhood Game You Played That Taught You an Important Lesson",
  "A Modern Invention That Has Revolutionized Medicine or Health",
  "A Public Library You Enjoy Spending Time In",
  "A Time You Organized an Event or Party for Friends",
  "A Rule or Law in Your Society That You Think Is Very Important",
  "A Photograph That Holds Special Sentimental Memories for You",
  "An Outdoor Activity or Sport You Would Like to Try for the First Time",
  "A Uniform or Traditional Attire Worn in Your Community",
  "A Morning Routine That Helps You Stay Focused and Calm",
  "A Time You Had to Make a Difficult Ethical Decision",
  "A Musical Instrument You Love Listening to or Playing",
  "A Memorable Meal You Shared with Family or Friends",
  "A Public Speech or Presentation You Listened to That Inspired You",
  "A Time You Were Surprised by an Unexpected Event",
  "A Useful Website or Mobile Application That Saves You Time",
  "A Hometown Community Tradition You Hope Will Never Disappear",
  "A Challenging Problem You Solved Using Creativity",
  "An Eco-Friendly Habit You Have Incorporated Into Your Household",
  "A Time You Helped a Colleague or Classmate Complete a Task",
  "A Cultural Monument That Tells the Story of Your Heritage",
  "A Futuristic Technology You Hope Will Be Invented in Your Lifetime"
];

for (let i = 0; i < additionalThemes.length; i++) {
  const theme = additionalThemes[i];
  cueCardTopics.push({
    topic: theme,
    prompt: `Describe ${theme.toLowerCase()}.`,
    bullets: [
      `What or who it is and when it occurred`,
      `Where this took place and who was involved`,
      `What specific actions, feelings, or details were significant`,
      `And explain why this holds meaningful personal or cultural importance for you`
    ],
    collocations: [
      "deeply meaningful milestone",
      "profound personal resonance",
      "enriching life experience",
      "cherished lasting memory",
      "lasting emotional impression"
    ],
    part3: [
      { q: `How has modern digital technology altered how people experience ${theme.toLowerCase()}?`, outline: "Discuss virtual experiences, social media documentation, and shifting attention spans." },
      { q: `What role do community and family traditions play in preserving this in the future?`, outline: "Examine cultural continuity, intergenerational transmission, and civic identity." },
      { q: `How can societies balance modern efficiency with maintaining these values?`, outline: "Analyze intentional educational initiatives, civic cultural events, and balanced work-life values." }
    ]
  });
}

// Generate the 60 cue card objects
const newCueCards = cueCardTopics.map((c, idx) => {
  const idNum = 31 + idx;
  const bands = [6.5, 7.5, 8.5];
  const diffs = ["easy", "medium", "hard"];
  const estBand = bands[idx % 3];
  const diff = diffs[idx % 3];

  return {
    id: `p2-${idNum < 10 ? '0' + idNum : idNum}`,
    topic: c.topic,
    difficulty: diff,
    estimatedBand: estBand,
    cueCard: {
      topic: c.prompt,
      bulletPoints: c.bullets,
      prepTimeSeconds: 60,
      speakTimeSeconds: 120
    },
    sampleAnswer: `I would like to share my thoughts about ${c.topic.toLowerCase()}, which has played a remarkably significant role in shaping my personal perspectives.\n\nTo begin with the background context, this experience unfolded in an environment where cultural and personal values were in full display. What made this particularly memorable was the sheer authenticity of the moment—the combination of thoughtful engagement, careful preparation, and genuine human interaction made a profound impression on me.\n\nAs the situation developed, I was struck by the dedication and meticulous attention to detail required. Navigating the nuances demanded both emotional presence and practical problem-solving. Rather than feeling overwhelmed by the challenges, I found myself thoroughly energized by the collaborative atmosphere and the shared sense of purpose among everyone involved.\n\nReflecting back on this milestone, what stands out most clearly is the enduring life lesson it imparted. It reinforced for me that meaningful experiences are rarely about effortless ease; rather, they arise from embracing challenges with curiosity, patience, and humility. It continues to inspire how I approach my daily work and relationships to this day.`,
    keyCollocations: c.collocations,
    part3Questions: c.part3.map((p, pIdx) => ({
      id: `p3-${idNum}-q${pIdx + 1}`,
      question: p.q,
      sampleOutline: p.outline
    }))
  };
});

// Append to content/speaking/part2-cue-cards.json
const cardsFile = path.resolve('./content/speaking/part2-cue-cards.json');
const currentCards = JSON.parse(fs.readFileSync(cardsFile, 'utf8'));
const mergedCards = [...currentCards, ...newCueCards];
fs.writeFileSync(cardsFile, JSON.stringify(mergedCards, null, 2), 'utf8');
console.log(`✓ Updated part2-cue-cards.json: Now ${mergedCards.length} cue cards (added ${newCueCards.length})`);
