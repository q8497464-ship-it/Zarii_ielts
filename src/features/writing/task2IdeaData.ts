import type { Task2IdeaItem } from '../../types';

export const TASK2_IDEA_BANK: Task2IdeaItem[] = [
  {
    id: 'idea-tech-ai',
    topic: 'Artificial Intelligence and Automation in the Modern Workplace',
    theme: 'Technology & Work',
    argumentsFor: [
      {
        point: 'Exponential boost in workplace efficiency and mundane task automation',
        explanation: 'AI systems can analyze vast datasets and execute repetitive administrative workflows without cognitive fatigue.',
        example: 'Automated diagnostics in healthcare detect radiographic anomalies with superior speed and reduced human error.',
      },
      {
        point: 'Emergence of high-skilled strategic and creative employment niches',
        explanation: 'Historical technological revolutions consistently created more specialized vocations than they rendered obsolete.',
        example: 'Demand for prompt engineers, cybersecurity ethicists, and machine learning architects has surged worldwide.',
      },
    ],
    argumentsAgainst: [
      {
        point: 'Widespread labor displacement and socioeconomic inequality',
        explanation: 'Low-skilled and entry-level clerical workers face sudden redundancy with limited retraining opportunities.',
        example: 'Automated call centers and autonomous delivery fleets threaten millions of working-class livelihoods.',
      },
      {
        point: 'Algorithmic bias and accountability deficits',
        explanation: 'Machine learning algorithms can inadvertently perpetuate societal biases present in historical training corpora.',
        example: 'Flawed algorithmic screening tools rejecting qualified job applicants based on demographic proxies.',
      },
    ],
    topicVocabulary: [
      { phrase: 'disruptive technology', meaning: 'innovation that radically alters an industry', collocation: 'usher in disruptive technology' },
      { phrase: 'cognitive automation', meaning: 'digital machines performing complex knowledge tasks', collocation: 'accelerate cognitive automation' },
      { phrase: 'labor displacement', meaning: 'loss of employment due to technical progress', collocation: 'mitigate widespread labor displacement' },
      { phrase: 'unprecedented paradigm shift', meaning: 'revolutionary fundamental change', collocation: 'trigger an unprecedented paradigm shift' },
    ],
    sampleThesis:
      'While artificial intelligence inevitably induces transitional friction and labor displacement in traditional sectors, its capacity to optimize productivity and stimulate cutting-edge technological industries renders it an indispensable driver of economic advancement.',
  },
  {
    id: 'idea-env-climate',
    topic: 'Individual Responsibility vs. State Regulation in Environmental Protection',
    theme: 'Environment',
    argumentsFor: [
      {
        point: 'Governments wield regulatory authority and macroscopic fiscal capacity',
        explanation: 'Only sovereign states can enforce emissions quotas, subsidize renewable infrastructure, and penalize transnational polluters.',
        example: 'The European Union Emissions Trading System legally compels industrial conglomerates to pay for carbon emissions.',
      },
      {
        point: 'Infrastructure transformations require centralized national investment',
        explanation: 'Private citizens cannot independently construct wind farms, electric rail corridors, or recycling processing plants.',
        example: 'National high-speed rail networks in East Asia have substantially reduced domestic aviation fuel combustion.',
      },
    ],
    argumentsAgainst: [
      {
        point: 'Grassroots consumer demand dictates corporate behavior',
        explanation: 'When citizens deliberately choose sustainable diets, public transport, and eco-friendly products, markets pivot naturally.',
        example: 'The worldwide expansion of plant-based food sectors and electric vehicle sales is largely driven by individual ethical consumerism.',
      },
      {
        point: 'Personal conservation habits reduce localized environmental degradation',
        explanation: 'Civic mindfulness regarding waste generation, water stewardship, and energy efficiency directly curtails municipal resource stress.',
        example: 'Widespread community composting and zero-plastic campaigns in urban municipalities.',
      },
    ],
    topicVocabulary: [
      { phrase: 'stringent environmental legislation', meaning: 'strict government laws to protect nature', collocation: 'enact stringent environmental legislation' },
      { phrase: 'carbon footprint reduction', meaning: 'lowering greenhouse gas output', collocation: 'prioritise carbon footprint reduction' },
      { phrase: 'renewable energy infrastructure', meaning: 'solar, wind and hydro power networks', collocation: 'subsidise renewable energy infrastructure' },
      { phrase: 'grassroots civic mobilization', meaning: 'actions initiated by ordinary citizens', collocation: 'foster grassroots civic mobilization' },
    ],
    sampleThesis:
      'Although grassroots lifestyle modifications among citizens are commendable, substantive environmental preservation hinges fundamentally upon aggressive state intervention and legislative mandates directed at corporate polluters.',
  },
  {
    id: 'idea-edu-higher',
    topic: 'Universally Free Higher Education vs. Student-Funded Tuition',
    theme: 'Education',
    argumentsFor: [
      {
        point: 'Eradication of socioeconomic barriers and promotion of social mobility',
        explanation: 'Meritocratic access to universities allows gifted students from underprivileged backgrounds to attain high-earning professions.',
        example: 'Nordic countries offer tuition-free tertiary education, contributing to exceptionally low levels of intergenerational poverty.',
      },
      {
        point: 'National economic return on human capital investment',
        explanation: 'A highly educated workforce fuels intellectual patents, biomedical research, and fiscal revenue via progressive taxation.',
        example: 'High-tech startup clusters frequently emerge around research universities funded generously through public grants.',
      },
    ],
    argumentsAgainst: [
      {
        point: 'Excessive fiscal burden on general taxpayers',
        explanation: 'Underwriting university expenses strains public treasuries, diverting revenue from primary healthcare and early childhood education.',
        example: 'Nations facing budgetary deficits often compromise facility maintenance and lecturer salaries under universal funding.',
      },
      {
        point: 'Degree devaluation and graduate underemployment',
        explanation: 'Flooding the job market with academic credentials disconnected from vocational demands leads to qualification inflation.',
        example: 'Graduates in saturated humanities disciplines working in non-graduate hospitality or retail occupations.',
      },
    ],
    topicVocabulary: [
      { phrase: 'socioeconomic mobility', meaning: 'movement of individuals to higher wealth classes', collocation: 'catalyze socioeconomic mobility' },
      { phrase: 'tertiary education subsidisation', meaning: 'government paying for university studies', collocation: 'advocate for tertiary education subsidisation' },
      { phrase: 'human capital enhancement', meaning: 'improving the skills and knowledge of citizens', collocation: 'invest in human capital enhancement' },
      { phrase: 'meritocratic admission', meaning: 'acceptance based purely on academic talent', collocation: 'adhere to meritocratic admission policies' },
    ],
    sampleThesis:
      'Notwithstanding concerns regarding fiscal sustainability, universally accessible tertiary education remains a paramount societal investment that unlocks individual potential and fosters enduring macroeconomic prosperity.',
  },
  {
    id: 'idea-work-remote',
    topic: 'Remote Working and Telecommuting vs. Traditional Office Environments',
    theme: 'Work & Lifestyle',
    argumentsFor: [
      {
        point: 'Substantial elimination of commuting times and improved work-life balance',
        explanation: 'Employees reclaim valuable hours daily, enabling healthier lifestyle choices, home cooking, and childcare flexibility.',
        example: 'Average metropolitan workers save between 60 to 90 minutes each day by avoiding peak-hour vehicular congestion.',
      },
      {
        point: 'Reduced overhead expenses and geographical hiring flexibility for employers',
        explanation: 'Enterprises can downsize expensive prime real estate leases while accessing global specialist talent pools.',
        example: 'Tech enterprises hiring software developers across Latin America, South Asia, and Eastern Europe at competitive compensation.',
      },
    ],
    argumentsAgainst: [
      {
        point: 'Impaired collaborative spontaneity and professional isolation',
        explanation: 'Informal brainstorming, mentorship of junior staff, and corporate cohesion are difficult to replicate via video conferences.',
        example: 'Graduate trainees struggling to assimilate workplace etiquette and domain expertise without physical proximity to senior colleagues.',
      },
      {
        point: 'Blurring of occupational boundaries and chronic burnout',
        explanation: 'When the home doubles as the workplace, workers often struggle to disconnect psychologically from work emails and messaging apps.',
        example: 'Remote workers logging evening hours, resulting in sustained sleep disturbances and workplace fatigue.',
      },
    ],
    topicVocabulary: [
      { phrase: 'telecommuting flexibility', meaning: 'working remotely using telecommunications', collocation: 'embrace telecommuting flexibility' },
      { phrase: 'work-life equilibrium', meaning: 'healthy balance between work and personal life', collocation: 'attain a sustainable work-life equilibrium' },
      { phrase: 'professional alienation', meaning: 'feeling disconnected from colleagues and work', collocation: 'alleviate psychological professional alienation' },
      { phrase: 'spontaneous collaboration', meaning: 'impromptu creative teamwork in person', collocation: 'foster spontaneous collaboration' },
    ],
    sampleThesis:
      'Although telecommuting requires vigilant measures to prevent employee burnout and maintain organizational culture, its profound advantages for worker autonomy and overhead rationalization render hybrid work arrangements the optimal future model.',
  },
  {
    id: 'idea-health-obesity',
    topic: 'Government Sugar Taxes vs. Personal Dietary Freedom',
    theme: 'Health & Society',
    argumentsFor: [
      {
        point: 'Curtailing macroscopic public healthcare expenditures on chronic diseases',
        explanation: 'Obesity and type 2 diabetes place enormous fiscal strains on public healthcare services, which are funded by collective taxpayers.',
        example: 'National healthcare systems spend billions annually managing diabetes-related cardiovascular complications.',
      },
      {
        point: 'Incentivizing multinational food corporations to reformulate recipes',
        explanation: 'Fiscal penalties encourage manufacturers to reduce sugar content to avoid retail price inflation and consumer loss.',
        example: 'The UK Soft Drinks Industry Levy prompted beverage companies to remove thousands of tonnes of sugar from soda formulations.',
      },
    ],
    argumentsAgainst: [
      {
        point: 'Regressive economic impact on lower-income households',
        explanation: 'Consumption taxes consume a disproportionate percentage of disposable income among working-class demographics.',
        example: 'Low-income families spending a greater share of their weekly grocery budget on basic convenience foodstuffs.',
      },
      {
        point: 'Infringement on consumer autonomy and the paternalistic "nanny state"',
        explanation: 'Adult citizens possess the sovereign right to make nutritional selections without punitive governmental interference.',
        example: 'Public backlash against intrusive legislation dictating portion sizes or fast-food advertising curfews.',
      },
    ],
    topicVocabulary: [
      { phrase: 'fiscal disincentive', meaning: 'tax or financial barrier designed to discourage action', collocation: 'impose a fiscal disincentive' },
      { phrase: 'chronic lifestyle illnesses', meaning: 'long-term diseases caused by poor habits', collocation: 'combat chronic lifestyle illnesses' },
      { phrase: 'paternalistic intervention', meaning: 'government restricting freedom for citizens’ supposed good', collocation: 'criticize paternalistic intervention' },
      { phrase: 'regressive taxation', meaning: 'tax that affects low earners more than high earners', collocation: 'exhibit characteristics of regressive taxation' },
    ],
    sampleThesis:
      'In view of the escalating crisis of lifestyle-related morbidity and the staggering toll on public hospitals, targeted fiscal levies on hyper-processed sugary commodities represent a justified and effective public health intervention.',
  },
  {
    id: 'idea-global-culture',
    topic: 'Globalisation and Cultural Homogenisation vs. Preserving Local Heritage',
    theme: 'Culture & Globalization',
    argumentsFor: [
      {
        point: 'Erosion of indigenous linguistic traditions, folklore, and customs',
        explanation: 'The dominance of Western mass media, fast food, and English language adoption marginalizes regional cultural identities.',
        example: 'Hundreds of endangered indigenous languages facing extinction as younger generations assimilate into digital global culture.',
      },
      {
        point: 'Commercialisation and loss of authentic historical heritage',
        explanation: 'Local artisans and traditional architecture are displaced by standardized multinational retail chains and tourist spectacles.',
        example: 'Historic urban quarters transformed into homogenous shopping avenues featuring the same international franchises.',
      },
    ],
    argumentsAgainst: [
      {
        point: 'Cross-cultural understanding and mitigation of xenophobia',
        explanation: 'Global interconnectedness fosters mutual tolerance, cosmopolitan outlooks, and intercultural creative collaborations.',
        example: 'International film festivals, culinary fusion, and multicultural arts initiatives bridging historical geopolitical divides.',
      },
      {
        point: 'Universal democratization of knowledge, technology, and human rights',
        explanation: 'Global discourse spreads awareness of gender equality, universal education, and modern medical standards.',
        example: 'Worldwide human rights campaigns advocating against localized discriminatory practices.',
      },
    ],
    topicVocabulary: [
      { phrase: 'cultural homogenisation', meaning: 'reduction in cultural diversity through global spread', collocation: 'accelerate cultural homogenisation' },
      { phrase: 'indigenous heritage preservation', meaning: 'protecting native traditions and language', collocation: 'prioritise indigenous heritage preservation' },
      { phrase: 'cosmopolitan outlook', meaning: 'worldview that embraces diverse global cultures', collocation: 'nurture a cosmopolitan outlook' },
      { phrase: 'cultural hybridization', meaning: 'blending of local and foreign cultural elements', collocation: 'result in rich cultural hybridization' },
    ],
    sampleThesis:
      'While globalization undoubtedly enriches international collaboration and expands economic frontiers, deliberate governmental safeguards are vital to protect linguistic diversity and shield fragile local heritages from complete homogenization.',
  },
];
