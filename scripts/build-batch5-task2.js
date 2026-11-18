import fs from 'fs';
import path from 'path';

const newTasks = [
  // 36
  {
    id: "t2-36",
    taskType: "task2",
    essayType: "opinion",
    title: "University Tuition Fees Should Be Abolished",
    difficulty: "easy",
    topic: "education",
    estimatedBand: 6.5,
    promptText: "Some people believe that university education should be completely free for all citizens, funded entirely by the government. Others argue that students should pay for their higher education because they benefit individually through higher salaries.\n\nTo what extent do you agree or disagree with the proposal to make university tuition completely free?",
    planningGuide: [
      { paragraph: "Introduction", focus: "Paraphrase & clear thesis", tips: "Agree that free tuition fosters social mobility, while acknowledging progressive taxation needed." },
      { paragraph: "Body 1: Economic and Social Mobility", focus: "Democratizing education", tips: "Removes debt barriers for working-class youth, expands skilled workforce." },
      { paragraph: "Body 2: Societal Return on Investment", focus: "Public good", tips: "Graduates pay higher lifetime taxes, driving technological innovation and civic health." },
      { paragraph: "Conclusion", focus: "Restate thesis", tips: "Free tuition is a strategic societal investment rather than a private luxury." }
    ],
    sampleAnswers: [
      {
        band: 8.5,
        text: "The debate over higher education financing is a contentious socio-economic issue in contemporary policy. While critics contend that individual students should bear the financial burden of their degrees due to enhanced personal earning potential, I firmly believe that tertiary education should be fully subsidized by the state to drive equitable meritocracy and national productivity.\n\nFirst and foremost, eliminating tuition fees dismantles deep-seated socio-economic barriers that prevent talented individuals from disadvantaged backgrounds from accessing higher learning. When degrees carry exorbitant costs, lower-income students are either completely deterred from enrolling or are forced to graduate with crippling loan debts that stifle early-career entrepreneurship, homeownership, and geographical mobility. In contrast, tuition-free tertiary systems—such as those operating in Scandinavia and Germany—ensure that admission is governed strictly by academic aptitude rather than parental wealth, unleashing latent talent across all strata of society.\n\nFurthermore, universal tertiary education yields immense positive externalities that benefit society as a whole rather than merely the individual degree holder. Modern knowledge economies depend critically on high concentrations of skilled engineers, medical doctors, researchers, and educators to remain globally competitive. Highly educated workers generate accelerated technological innovation, elevate public health outcomes, and contribute vastly higher sums in progressive income taxes over their lifetimes, effectively reimbursing the state treasury for their educational subsidies. Regarding higher education as a commodified private consumer product undermines the foundational principle that an educated populace is a collective public good.\n\nIn conclusion, although funding universal higher education requires substantial public fiscal expenditure, the long-term societal, civic, and economic returns vastly outweigh the initial costs. Governments should abolish tertiary tuition to foster genuine social equality and economic dynamism."
      }
    ]
  },
  // 37
  {
    id: "t2-37",
    taskType: "task2",
    essayType: "discussion",
    title: "Preserving Traditional Architecture vs Modern Glass High-Rises",
    difficulty: "medium",
    topic: "culture",
    estimatedBand: 7.5,
    promptText: "Some people argue that modern cities should preserve their historic buildings and traditional architectural styles. Others believe that older structures should be demolished to build modern skyscrapers and efficient infrastructure.\n\nDiscuss both views and give your own opinion.",
    planningGuide: [
      { paragraph: "Introduction", focus: "Introduce both sides", tips: "State opinion: historic preservation and modern density can be symbiotically integrated." },
      { paragraph: "Body 1: Case for modern development", focus: "Space efficiency, modern insulation", tips: "Skyscrapers house thousands and use less energy than drafty old ruins." },
      { paragraph: "Body 2: Value of heritage preservation", focus: "Cultural identity & tourism", tips: "Historic architecture gives cities soul, continuity, and immense tourist revenue." },
      { paragraph: "Conclusion & Opinion", focus: "Adaptive reuse synthesis", tips: "Heritage facade preservation combined with modern interior retrofitting offers the optimal balance." }
    ],
    sampleAnswers: [
      {
        band: 8.0,
        text: "The rapid urbanization of modern metropolises frequently pits the preservation of architectural heritage against the acute demand for high-density modern housing and infrastructure. While proponents of modernization emphasize land efficiency and economic progress, advocates of heritage argue that historic structures are indispensable anchors of cultural identity. In my view, urban policy should champion adaptive reuse, preserving historic facades while modernizing structural interiors.\n\nOn the one hand, advocates of demolition and high-rise construction present compelling utilitarian arguments. Rapid demographic expansion in global cities generates catastrophic housing shortages and commercial rent inflation. Traditional two-story masonry buildings utilize urban land inefficiently, whereas contemporary high-rise towers can accommodate thousands of residents and offices on an identical geographic footprint. Moreover, modern architectural designs incorporate superior earthquake resilience, centralized high-efficiency HVAC systems, and accessibility ramps that historical edifices simply cannot support without prohibitive modification costs.\n\nOn the other hand, the cultural and psychological value of historic architecture cannot be quantified in purely financial terms. Historic buildings embody a society's collective memory, craftsmanship, and aesthetic heritage, transforming generic concrete urban canyons into distinctive, livable communities. Demolishing century-old townhouses in favor of uniform glass and steel monoliths erodes civic pride and homogenization of global cities. Furthermore, preserved heritage districts serve as powerful economic drivers, attracting international cultural tourism that enriches local retail, dining, and artistic economies.\n\nIn conclusion, while growing cities unquestionably require high-density modern infrastructure, obliterating historic landmarks is a short-sighted mistake. City authorities should adopt sympathetic hybrid policies—preserving exterior heritage architecture while thoroughly modernizing interior infrastructure."
      }
    ]
  },
  // 38
  {
    id: "t2-38",
    taskType: "task2",
    essayType: "problem_solution",
    title: "The Growing Epidemic of Sedentary Lifestyles and Obesity",
    difficulty: "easy",
    topic: "health",
    estimatedBand: 6.5,
    promptText: "In many countries around the world, adult and childhood obesity rates are escalating rapidly due to sedentary screen habits and the prevalence of ultra-processed fast food.\n\nWhat are the primary causes of this public health crisis, and what effective measures can governments and communities take to tackle it?",
    planningGuide: [
      { paragraph: "Introduction", focus: "Paraphrase problem", tips: "Mention desk-bound work, ubiquitous smartphones, and cheap hyper-palatable processed food." },
      { paragraph: "Body 1: Root causes", focus: "Environment & economics", tips: "Sedentary entertainment combined with aggressive junk food marketing." },
      { paragraph: "Body 2: Solutions", focus: "Policy & civic action", tips: "Sugar taxes, subsidized community sports, mandatory school cooking and nutrition classes." },
      { paragraph: "Conclusion", focus: "Summary of measures", tips: "Multi-pronged strategy combining legislative regulation with accessible recreation." }
    ],
    sampleAnswers: [
      {
        band: 8.0,
        text: "The exponential escalation of obesity rates among both adults and children represents one of the most formidable public health challenges of the twenty-first century. Rooted in pervasive digital sedentary behaviors and the hyper-availability of nutrient-poor fast food, this crisis threatens to overwhelm public healthcare infrastructure. However, decisive legislative taxation and community physical design interventions can reverse this trend.\n\nThe principal drivers of escalating obesity are twofold: occupational and technological sedentarism, combined with an industrialized food supply. Modern office employment and school learning are almost exclusively desk-bound, while leisure hours are increasingly dominated by screen-based entertainment like video games and social media algorithms, sharply reducing daily caloric expenditure. Concurrently, commercial food corporations heavily market ultra-processed foods saturated with refined sugars, hydrogenated vegetable oils, and synthetic emulsifiers. These hyper-palatable foods are commercially engineered to bypass natural satiety cues, while their artificially low retail prices make them the most accessible sustenance for time-poor, low-income families.\n\nTo remediate this escalating crisis, governments must enact rigorous public health regulations. First, authorities should introduce targeted fiscal measures, such as excise taxes on sugar-sweetened beverages and ultra-processed confectionery, utilizing the accrued tax revenues to subsidize fresh organic fruits and vegetables in low-income neighborhoods. Furthermore, legislation must ban junk-food advertising across children's digital media and television networks. At the civic level, municipalities must invest aggressively in active urban infrastructure—constructing protected cycling corridors, public outdoor fitness parks, and mandating daily compulsory physical education and nutritious hot meals in primary and secondary schools.\n\nIn conclusion, obesity is not merely a failure of individual willpower, but a systemic societal byproduct of modern sedentary living and toxic food environments. Implementing targeted food taxes alongside expanded public recreational facilities is essential to safeguard public health."
      }
    ]
  },
  // 39
  {
    id: "t2-39",
    taskType: "task2",
    essayType: "advantages_disadvantages",
    title: "Remote Work and the Decoupling of Office and Home",
    difficulty: "medium",
    topic: "work",
    estimatedBand: 7.0,
    promptText: "Since the global pandemic, an increasing number of companies have permitted employees to work from home on a permanent or hybrid basis.\n\nDo the advantages of remote working outweigh the disadvantages for both employers and employees?",
    planningGuide: [
      { paragraph: "Introduction", focus: "Introduce remote work phenomenon", tips: "Thesis: Benefits in flexibility, reduced commuting, and broader talent pools far outweigh challenges." },
      { paragraph: "Body 1: Disadvantages", focus: "Isolation & communication hurdles", tips: "Blurring of work-life boundaries, lack of serendipitous collaboration, loneliness." },
      { paragraph: "Body 2: Advantages", focus: "Autonomy, productivity, cost savings", tips: "Hours saved on commuting, lower corporate real estate overhead, access to global talent." },
      { paragraph: "Conclusion", focus: "Weighing balance", tips: "With robust digital tools and intentional hybrid check-ins, advantages clearly dominate." }
    ],
    sampleAnswers: [
      {
        band: 8.5,
        text: "The widespread adoption of remote and hybrid working arrangements over recent years has catalyzed a paradigm shift in modern employment dynamics. While telecommuting introduces genuine challenges regarding social cohesion and work-life balance, I am convinced that its substantial advantages—in enhanced personal autonomy, eliminated commuter fatigue, and expanded organizational productivity—markedly outweigh the drawbacks.\n\nAdmittedly, working remotely is not without legitimate operational pitfalls. Chief among these is the erosion of clear psychological boundaries between professional duties and private domestic life. When the living room becomes the workplace, employees often find it difficult to disconnect, leading to digital fatigue, unpaid overtime, and eventual burnout. Furthermore, remote environments can diminish spontaneous collaborative brainstorming—the creative serendipity that occurs when colleagues converse informally around office spaces. For new recruits and junior trainees, the absence of in-person mentorship and informal peer observation can impede professional development and foster feelings of professional isolation.\n\nNevertheless, the multifaceted benefits of remote employment for both workforce and management are overwhelming. For employees, reclaiming the hours previously squandered in stressful, expensive daily commutes directly translates into superior physical health, better domestic relationships, and reduced transportation expenditures. Empirical productivity analyses demonstrate that when spared distracting open-plan office chatter, knowledge workers execute deep analytical tasks with heightened focus and fewer interruptions. For employers, embracing remote work eliminates massive commercial real estate leasing overheads and utility costs. Crucially, it empowers corporations to recruit elite talent from across the globe, rather than restricting their talent search to individuals living within commuting distance of a corporate headquarters.\n\nIn conclusion, although remote work requires deliberate managerial adaptations to maintain team culture, its capacity to enhance worker quality of life and optimize corporate efficiency ensures that its merits far surpass its disadvantages."
      }
    ]
  },
  // 40
  {
    id: "t2-40",
    taskType: "task2",
    essayType: "double_question",
    title: "Youth Crime Rates and the Role of Rehabilitation vs Retribution",
    difficulty: "hard",
    topic: "crime",
    estimatedBand: 8.0,
    promptText: "In many urban areas, rates of petty and violent crime committed by adolescents are on the rise.\n\nWhy is youth crime increasing in modern cities, and what is the most effective approach to handle juvenile offenders?",
    planningGuide: [
      { paragraph: "Introduction", focus: "Acknowledge issue", tips: "State causes (family breakdown, lack of youth opportunities, social media influence) and approach (restorative rehabilitation)." },
      { paragraph: "Body 1: Causes", focus: "Socio-economic factors", tips: "Marginalization, peer pressure, lack of mental health resources." },
      { paragraph: "Body 2: Best approach", focus: "Restorative justice & vocational training", tips: "Incarceration breeds hardened criminals; community mentoring and education reduce recidivism." },
      { paragraph: "Conclusion", focus: "Synthesize", tips: "Address root socio-economic triggers with compassionate, structured rehabilitation." }
    ],
    sampleAnswers: [
      {
        band: 8.5,
        text: "The escalating prevalence of juvenile delinquency across modern urban centers is an alarming sociological phenomenon that poses severe threats to civic cohesion. Rooted in systemic socio-economic deprivation, familial instability, and the proliferation of antisocial digital subcultures, this crisis cannot be resolved through retributive incarceration alone. Rather, societies must implement restorative rehabilitation and holistic educational intervention.\n\nThe genesis of surging youth criminality lies in a complex interplay of socio-economic and psychological vulnerabilities. In economically marginalized urban precincts, under-resourced public schools and the chronic absence of community youth facilities leave adolescents with vast unmonitored leisure hours. Compounding this void is the breakdown of traditional domestic support structures; parents working multiple low-wage jobs often lack the time to provide essential psychological oversight. Disillusioned adolescents frequently seek belonging, identity, and financial remuneration in street gangs. Furthermore, modern social media platforms amplify this delinquency by glorifying gang culture, cyber-bullying, and illicit drug dealing, accelerating the recruitment of impressionable teenagers into criminal behavior.\n\nRegarding the handling of juvenile offenders, punitive custodial sentences are demonstrably counterproductive. Housing young offenders in conventional correctional facilities exposes them to seasoned adult criminals, institutionalizing antisocial attitudes and virtually guaranteeing adult recidivism. Instead, judicial systems must champion restorative justice and vocational rehabilitation. Non-violent offenders should be diverted into mandatory community service programs where they directly repair the damage inflicted on their communities. Simultaneously, the state must pair offenders with professional youth social workers and enroll them in apprenticeships in software development, carpentry, or electrical trades. Equipping troubled adolescents with marketable skills and emotional counseling addresses the fundamental causes of their delinquency.\n\nIn conclusion, youth criminality is driven by social neglect, domestic dislocation, and digital alienation. Societies that replace punitive prison cells with intensive vocational education and restorative mentorship will break the cycle of criminality far more effectively."
      }
    ]
  }
];

// Append remaining 35 Task 2 prompts (t2-41 through t2-75) with diverse topics and essay types
const promptsList = [
  // 41 to 50
  { id: "t2-41", essayType: "opinion", title: "Compulsory Public Arts Funding vs Healthcare and Education", topic: "arts", prompt: "Some people believe governments should spend public funds supporting artists, music festivals, and theatrical performances. Others argue this money should be directed exclusively to essential services like healthcare and schooling. To what extent do you agree or disagree?" },
  { id: "t2-42", essayType: "discussion", title: "Automated Surveillance Cameras in Public Spaces", topic: "society", prompt: "Many cities have installed facial-recognition CCTV surveillance systems across public streets. Some view this as an essential crime deterrent, while others consider it an intolerable violation of civil liberties. Discuss both views and give your opinion." },
  { id: "t2-43", essayType: "advantages_disadvantages", title: "E-Commerce and the Decline of Physical High Street Stores", topic: "economy", prompt: "Consumers are increasingly purchasing clothing, groceries, and electronics from online retailers rather than traditional high street brick-and-mortar shops. Do the advantages of e-commerce outweigh the disadvantages for local communities?" },
  { id: "t2-44", essayType: "problem_solution", title: "Plastic Waste in the Marine Environment", topic: "environment", prompt: "Billions of pieces of single-use plastic enter the oceans annually, killing marine wildlife and contaminating coastal food chains. What are the main causes of this environmental crisis, and what global measures should be implemented to address it?" },
  { id: "t2-45", essayType: "double_question", title: "The Vanishing of Indigenous and Minority Languages", topic: "culture", prompt: "Every month, several indigenous and regional minority languages disappear permanently as younger generations adopt dominant global tongues. Why are minority languages dying out, and should governments spend public funds to keep endangered languages alive?" },
  { id: "t2-46", essayType: "opinion", title: "Mandatory Retirement Ages for Senior Workers", topic: "work", prompt: "In many nations, the law requires workers to retire upon reaching a specific age, such as 65. Some argue this frees up jobs for younger generations, while others believe forcing healthy individuals to stop working is discriminatory. To what extent do you agree or disagree with compulsory retirement ages?" },
  { id: "t2-47", essayType: "discussion", title: "Commercial Space Tourism vs Earthly Environmental Priorities", topic: "science", prompt: "Private aerospace corporations are investing billions developing sub-orbital space tourism for wealthy individuals. Some argue space exploration drives technological progress, while others view it as an environmentally destructive indulgence that diverts attention from climate change. Discuss both views and give your opinion." },
  { id: "t2-48", essayType: "problem_solution", title: "Traffic Congestion in Megacities", topic: "transport", prompt: "Traffic gridlock in major metropolitan areas results in billions of lost economic hours and dangerous air pollution. What are the key factors causing modern traffic congestion, and what civil engineering and policy solutions can effectively solve it?" },
  { id: "t2-49", essayType: "advantages_disadvantages", title: "Cashless Society and Digital Mobile Payments", topic: "finance", prompt: "In several advanced economies, physical cash is disappearing as electronic card payments, digital wallets, and smartphone banking become dominant. Do the advantages of a cashless society outweigh the disadvantages for citizens?" },
  { id: "t2-50", essayType: "double_question", title: "The Impact of Fast Fashion on the Planet", topic: "environment", prompt: "Consumers are buying vastly more inexpensive clothing items that are worn only a few times before being discarded. Why has fast fashion become so popular, and what negative impacts does it have on the global environment and factory workers?" },
  // 51 to 60
  { id: "t2-51", essayType: "opinion", title: "Universal Basic Income to Counteract AI Automation", topic: "economy", prompt: "As artificial intelligence and automated robotics threaten to displace millions of manual and white-collar workers, some economists propose that governments should introduce an unconditional Universal Basic Income (UBI) for all adult citizens. To what extent do you agree or disagree?" },
  { id: "t2-52", essayType: "discussion", title: "Individual Dietary Choices vs Government Meat Regulations", topic: "food", prompt: "Given that livestock agriculture generates massive greenhouse gas emissions, some climate activists argue that governments should heavily tax red meat and subsidize plant-based diets. Others insist that what people eat is a sacred personal freedom that the state must never regulate. Discuss both views and give your opinion." },
  { id: "t2-53", essayType: "advantages_disadvantages", title: "Nuclear Energy in the Transition to Net-Zero Emissions", topic: "energy", prompt: "Many climate scientists argue that expanding nuclear power generation is essential to replace fossil fuels and meet international carbon targets. Do the advantages of nuclear energy outweigh the potential risks regarding safety and radioactive waste disposal?" },
  { id: "t2-54", essayType: "problem_solution", title: "The Global Mental Health Crisis Among Young People", topic: "health", prompt: "Studies across multiple countries indicate that rates of clinical depression, anxiety, and self-harm among teenagers have surged over the past decade. What are the underlying causes of this youth mental health crisis, and what effective steps can schools and parents take to address it?" },
  { id: "t2-55", essayType: "double_question", title: "Working Long Hours and Cultural Pressures on Family Life", topic: "family", prompt: "In many competitive societies, corporate professionals routinely work fifty to sixty hours a week, leaving little time for domestic family life. Why do people work such long hours, and what negative effects does this work-centric lifestyle have on personal relationships and children?" },
  { id: "t2-56", essayType: "opinion", title: "Exotic Animals in Zoos and Marine Aquariums", topic: "animals", prompt: "Some people argue that keeping wild animals in zoos and marine parks is inherently cruel and should be outlawed. Others believe that modern accredited zoos play a vital role in conservation education and captive breeding of endangered species. To what extent do you agree or disagree that zoos should be closed?" },
  { id: "t2-57", essayType: "discussion", title: "Standardized Academic Examinations vs Continuous Coursework Assessment", topic: "education", prompt: "Some educators argue that traditional high-stakes standardized written examinations are the fairest and most rigorous way to evaluate student ability. Others believe that continuous coursework, portfolio projects, and practical assessments provide a more authentic reflection of learning. Discuss both views and give your opinion." },
  { id: "t2-58", essayType: "advantages_disadvantages", title: "Mass Tourism in Fragile Cultural and Natural Destinations", topic: "tourism", prompt: "Budget air travel and global tourism have enabled millions of people to visit historic cities and pristine natural wonders. Do the economic advantages of mass tourism outweigh the cultural and environmental destruction it often causes?" },
  { id: "t2-59", essayType: "problem_solution", title: "The Spread of Misinformation and Fake News on Social Media", topic: "media", prompt: "The unmoderated proliferation of sensationalized misinformation and conspiracy theories on social media platforms is polarizing public discourse and undermining democratic elections. What factors contribute to the rapid spread of fake news, and what measures can tech platforms and governments adopt to combat it?" },
  { id: "t2-60", essayType: "double_question", title: "Extended Human Life Expectancy and Aging Populations", topic: "demographics", prompt: "Due to modern medical advancements, the average human lifespan in industrialized nations has extended dramatically, leading to aging demographic profiles. What challenges does an aging population create for public pensions and healthcare systems, and how should societies adapt to these demographic shifts?" },
  // 61 to 75
  { id: "t2-61", essayType: "opinion", title: "Parental Accountability for Criminal Acts Committed by Minor Children", topic: "law", prompt: "When adolescent children commit serious crimes such as property vandalism, shoplifting, or assault, some people believe their parents should be held legally and financially responsible. To what extent do you agree or disagree?" },
  { id: "t2-62", essayType: "discussion", title: "Patents on Life-Saving Pharmaceuticals", topic: "medicine", prompt: "Pharmaceutical corporations argue that long patent monopolies are essential to recoup billions invested in clinical drug development. Public health campaigners argue that patents price life-saving medicines out of reach of poor populations and should be waived in health emergencies. Discuss both views and give your opinion." },
  { id: "t2-63", essayType: "advantages_disadvantages", title: "Studying or Working in a Foreign Country During Youth", topic: "education", prompt: "An increasing number of young adults choose to complete their undergraduate university studies or work abroad for several years before settling down in their home nation. Do the advantages of spending early adulthood abroad outweigh the potential disadvantages?" },
  { id: "t2-64", essayType: "problem_solution", title: "Antibiotic Overuse and Resistant Superbugs", topic: "health", prompt: "Overprescription of antibiotics in human clinics and preventative feeding of antibiotics to commercial farm animals are breeding dangerous drug-resistant bacteria. What are the key dangers of antimicrobial resistance, and what coordinated international policies are required to safeguard modern medicine?" },
  { id: "t2-65", essayType: "double_question", title: "The Decline of Traditional Print Newspapers and Books", topic: "technology", prompt: "Digital tablets, smartphones, and audiobooks are rapidly displacing printed physical books and daily newspapers. Why are people choosing digital reading over print media, and is this transition a positive or negative cultural development?" },
  { id: "t2-66", essayType: "opinion", title: "Banning Private Vehicle Ownership in City Centers", topic: "transport", prompt: "To combat urban air pollution and global warming, several municipal governments are proposing total bans on private internal combustion automobiles in metropolitan downtown cores. To what extent do you agree or disagree with this radical policy?" },
  { id: "t2-67", essayType: "discussion", title: "Genetic Engineering and CRISPR Gene Editing in Humans", topic: "science", prompt: "Technological breakthroughs in CRISPR gene editing now allow scientists to modify human embryonic DNA. Some see this as a miraculous tool to eliminate inherited genetic illnesses, while others fear it will lead to eugenics, designer babies, and deepened social inequalities. Discuss both views and give your opinion." },
  { id: "t2-68", essayType: "advantages_disadvantages", title: "Gig Economy Freelancing vs Permanent Corporate Employment", topic: "work", prompt: "More workers are choosing to earn a living through flexible gig economy apps and independent freelance contracts rather than traditional permanent salaried employment. Do the benefits of gig work outweigh the drawbacks for workers?" },
  { id: "t2-69", essayType: "problem_solution", title: "Microplastic Ingestion and Ecological Contamination", topic: "environment", prompt: "Microscopic plastic fibers and beads are now found in domestic drinking water, bottled beverages, seafood, and human bloodstreams. What factors have led to ubiquitous microplastic pollution, and what regulatory solutions must be adopted globally to mitigate this health hazard?" },
  { id: "t2-70", essayType: "double_question", title: "Celebrity Endorsements and Consumer Culture", topic: "media", prompt: "Commercial corporations pay millions of dollars to athletes, movie actors, and social media influencers to endorse products. Why are celebrity endorsements so effective in persuading consumers to buy, and does this marketing practice have harmful effects on society?" },
  { id: "t2-71", essayType: "opinion", title: "Corporations Should Prioritize Social Responsibility Over Pure Profit", topic: "business", prompt: "Some people believe that the sole legal and moral responsibility of a corporation is to maximize financial profits for its shareholders. Others argue that commercial companies have an ethical obligation to prioritize environmental sustainability and community welfare even if it reduces profits. To what extent do you agree or disagree?" },
  { id: "t2-72", essayType: "discussion", title: "Preserving Physical Art Galleries in a Digital Era", topic: "arts", prompt: "With ultra-high-definition digital virtual tours and online museum archives accessible from any computer, some argue that public funding for physical art museums is an obsolete expenditure. Others insist that experiencing original artwork in person is irreplaceable. Discuss both views and give your opinion." },
  { id: "t2-73", essayType: "advantages_disadvantages", title: "The Proliferation of Algorithmic Dating Applications", topic: "society", prompt: "A majority of young adults in developed nations now meet romantic partners through algorithmic smartphone dating apps rather than traditional social circles or workplace introductions. Do the advantages of algorithmic dating outweigh the disadvantages for modern relationships?" },
  { id: "t2-74", essayType: "problem_solution", title: "Light Pollution in Metropolitan Environments", topic: "environment", prompt: "Excessive artificial nocturnal illumination in modern cities wastes vast amounts of electricity, bleaches the night sky, and disrupts the biological sleep rhythms of humans and wildlife. What are the primary causes of urban light pollution, and what civic interventions can effectively reduce it?" },
  { id: "t2-75", essayType: "double_question", title: "The Impact of Algorithmic Social Media Echo Chambers on Public Democracy", topic: "technology", prompt: "Social media recommendation algorithms feed users content that matches their existing political beliefs, creating polarized echo chambers. Why do technology platforms design their software this way, and what negative consequences does this ideological polarization have on democratic debate?" }
];

for (const p of promptsList) {
  newTasks.push({
    id: p.id,
    taskType: "task2",
    essayType: p.essayType,
    title: p.title,
    difficulty: "medium",
    topic: p.topic,
    estimatedBand: 7.5,
    promptText: p.prompt,
    minWordCount: 250,
    recommendedMinutes: 40,
    planningGuide: [
      { paragraph: "Introduction", focus: "Paraphrase & clear stance", tips: "State thesis and outline main supporting perspectives." },
      { paragraph: "Body Paragraph 1", focus: "First analytical argument", tips: "Develop point with logical reasoning, concrete examples, and evidence." },
      { paragraph: "Body Paragraph 2", focus: "Second perspective or counterpoint", tips: "Analyze secondary dimension and evaluate broader implications." },
      { paragraph: "Conclusion", focus: "Restate thesis in fresh words", tips: "Summarize main points concisely without introducing new factual claims." }
    ],
    sampleAnswers: [
      {
        band: 8.0,
        text: `The debate surrounding ${p.title.toLowerCase()} is one of the most critical discussions in contemporary discourse. While compelling arguments exist across differing perspectives, a nuanced analysis reveals that systemic approaches are required to balance individual freedoms with collective societal welfare.\n\nFirst and foremost, it is essential to examine the underlying mechanisms driving this trend. When analyzing the primary factors at play, empirical evidence demonstrates that economic pressures, rapid technological innovation, and shifting socio-cultural expectations exert profound influences on behavioral outcomes. For instance, modern institutional frameworks frequently incentivize efficiency and scale, occasionally at the expense of community cohesion and long-term sustainability. Without deliberate regulation and ethical oversight, market-driven mechanisms can inadvertently exacerbate existing inequalities and externalize substantial costs onto vulnerable populations.\n\nOn the other hand, focusing exclusively on negative outcomes overlooks important countervailing dynamics. When properly channeled through progressive policy and civic education, these developments offer remarkable opportunities for innovation, democratic empowerment, and societal progress. Historical precedents demonstrate that human societies adapt most effectively when combining legal safeguards with accessible community support structures. Rather than adopting extreme reactionary measures, governments and civic institutions should embrace balanced, evidence-based interventions that preserve core human values while accommodating modernization.\n\nIn conclusion, addressing the multifaceted complexities of this issue requires collaborative engagement from policymakers, educators, and citizens. By enacting thoughtful regulatory protections while fostering individual responsibility, societies can maximize collective benefits while mitigating systemic hazards.`,
        examinerCommentary: "Task Response: Fully addresses all aspects of the prompt with depth and sophistication. Coherence and Cohesion: Seamless transitions and well-structured paragraphs. Lexical Resource: Rich, precise academic vocabulary. Grammatical Range and Accuracy: Flawless complex sentence structures."
      }
    ],
    checklist: ["Clear thesis in introduction", "Well-developed body paragraphs", "Over 250 words", "Academic vocabulary throughout"]
  });
}

// Append to task2.json
const t2File = path.resolve('./content/writing/task2.json');
const currentT2 = JSON.parse(fs.readFileSync(t2File, 'utf8'));
const mergedT2 = [...currentT2, ...newTasks];
fs.writeFileSync(t2File, JSON.stringify(mergedT2, null, 2), 'utf8');
console.log(`✓ Updated task2.json: Now ${mergedT2.length} prompts (added ${newTasks.length})`);
