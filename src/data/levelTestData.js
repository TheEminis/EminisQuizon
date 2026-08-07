// src/data/levelTestData.js
//
// A single, mixed-difficulty placement test in the style of an IELTS
// General/Academic English-proficiency screening: Grammar, Vocabulary and
// Reading Comprehension sections, spanning CEFR levels A1 -> C1 (matching
// the level range already used across the rest of the site). Every
// question carries a `weight` equal to its CEFR difficulty (A1=1 ... C1=5)
// so a correct answer on a harder question counts for more when the
// final level is calculated - the same principle real placement/adaptive
// tests use.

export const CEFR_WEIGHT = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5 };

// ---------------------------------------------------------------------
// GRAMMAR (8 questions)
// ---------------------------------------------------------------------
const grammarQuestions = [
  {
    id: 'g1',
    section: 'Grammar',
    cefr: 'A1',
    text: 'My brother ___ a doctor.',
    options: ['am', 'is', 'are', 'be'],
    correct: 1,
    explanation: "Tək 3-cü şəxs (he/she/it) ilə 'is' işlədilir.",
  },
  {
    id: 'g2',
    section: 'Grammar',
    cefr: 'A2',
    text: 'We ___ to the cinema last Friday.',
    options: ['go', 'goes', 'went', 'gone'],
    correct: 2,
    explanation: "'Last Friday' keçmiş zamanı bildirir, Past Simple: went.",
  },
  {
    id: 'g3',
    section: 'Grammar',
    cefr: 'A2',
    text: "I'm afraid I can't come to the party because I ___ my homework yet.",
    options: ["didn't finish", "haven't finished", "don't finish", "won't finish"],
    correct: 1,
    explanation: "'Yet' ilə mənfi Present Perfect işlədilir: haven't finished.",
  },
  {
    id: 'g4',
    section: 'Grammar',
    cefr: 'B1',
    text: 'By the time the plane landed, the storm ___.',
    options: ['already stopped', 'has already stopped', 'had already stopped', 'was already stopping'],
    correct: 2,
    explanation: 'Keçmişdəki digər hərəkətdən əvvəl bitmiş hərəkət üçün Past Perfect: had already stopped.',
  },
  {
    id: 'g5',
    section: 'Grammar',
    cefr: 'B1',
    text: 'If I ___ more time, I would learn another language.',
    options: ['have', 'had', 'will have', 'would have'],
    correct: 1,
    explanation: "Second Conditional (indiki qeyri-real şərt): If + Past Simple, would + V1.",
  },
  {
    id: 'g6',
    section: 'Grammar',
    cefr: 'B2',
    text: 'The report ___ by the committee before it is published.',
    options: ['reviews', 'is reviewing', 'will be reviewed', 'has reviewed'],
    correct: 2,
    explanation: "Passive Voice + gələcək zaman: will be reviewed.",
  },
  {
    id: 'g7',
    section: 'Grammar',
    cefr: 'B2',
    text: "She insisted that he ___ the contract before signing it.",
    options: ['reads', 'read', 'reading', 'to read'],
    correct: 1,
    explanation: "'Insist that' subjunctive tələb edir: bare infinitive (read), şəxsdən asılı olmayaraq.",
  },
  {
    id: 'g8',
    section: 'Grammar',
    cefr: 'C1',
    text: 'Not until the results were announced ___ how much work had gone into the project.',
    options: ['we realised', 'did we realise', 'we did realise', 'had we realised'],
    correct: 1,
    explanation: "Mənfi zərflə (Not until) cümləyə başlayanda inversion tələb olunur: did we realise.",
  },
];

// ---------------------------------------------------------------------
// VOCABULARY (8 questions)
// ---------------------------------------------------------------------
const vocabularyQuestions = [
  {
    id: 'v1',
    section: 'Vocabulary',
    cefr: 'A1',
    text: "Choose the word that means the opposite of 'expensive'.",
    options: ['cheap', 'large', 'heavy', 'fast'],
    correct: 0,
    explanation: "'Cheap' (ucuz) 'expensive'in (bahalı) antonimidir.",
  },
  {
    id: 'v2',
    section: 'Vocabulary',
    cefr: 'A2',
    text: "'She was absolutely ___ after the long flight.' (very tired)",
    options: ['exhausted', 'delighted', 'curious', 'confident'],
    correct: 0,
    explanation: "'Exhausted' - çox yorğun deməkdir.",
  },
  {
    id: 'v3',
    section: 'Vocabulary',
    cefr: 'A2',
    text: "Which word best completes: 'Please ___ the form and return it by Friday.'",
    options: ['fill in', 'fill up', 'fill on', 'fill for'],
    correct: 0,
    explanation: "'Fill in a form' - formanı doldurmaq mənasında düzgün frazeoloji feildir.",
  },
  {
    id: 'v4',
    section: 'Vocabulary',
    cefr: 'B1',
    text: "'The company had to ___ its plans due to unexpected costs.' (change slightly)",
    options: ['adjust', 'abandon', 'ignore', 'launch'],
    correct: 0,
    explanation: "'Adjust' - kiçik dəyişiklik etmək mənasında ən uyğun sözdür.",
  },
  {
    id: 'v5',
    section: 'Vocabulary',
    cefr: 'B1',
    text: "Choose the closest synonym for 'reluctant'.",
    options: ['unwilling', 'excited', 'certain', 'generous'],
    correct: 0,
    explanation: "'Reluctant' = 'unwilling' - istəməyərək, könülsüz.",
  },
  {
    id: 'v6',
    section: 'Vocabulary',
    cefr: 'B2',
    text: "'Despite the ___ evidence, the jury found him not guilty.' (very convincing)",
    options: ['compelling', 'trivial', 'vague', 'irrelevant'],
    correct: 0,
    explanation: "'Compelling evidence' - inandırıcı, güclü sübut deməkdir.",
  },
  {
    id: 'v7',
    section: 'Vocabulary',
    cefr: 'B2',
    text: "'His argument was so ___ that nobody could find a flaw in it.' (logically sound)",
    options: ['coherent', 'ambiguous', 'redundant', 'obscure'],
    correct: 0,
    explanation: "'Coherent' - məntiqli, ardıcıl və başa düşülən deməkdir.",
  },
  {
    id: 'v8',
    section: 'Vocabulary',
    cefr: 'C1',
    text: "Choose the word closest in meaning to 'ubiquitous'.",
    options: ['omnipresent', 'obsolete', 'ambiguous', 'meticulous'],
    correct: 0,
    explanation: "'Ubiquitous' = 'omnipresent' - hər yerdə mövcud olan.",
  },
];

// ---------------------------------------------------------------------
// READING COMPREHENSION (2 passages x 4 questions = 8 questions)
// ---------------------------------------------------------------------
const passage1 = {
  passageId: 'p1',
  passageTitle: 'Remote Work',
  passageText: `Over the past decade, remote work has shifted from a rare perk to a mainstream way of working. Advances in high-speed internet, video conferencing and cloud-based tools have made it possible for employees to complete most office tasks from home, a café, or anywhere with a stable connection. Supporters argue that remote work increases productivity by cutting out long commutes and office distractions, while also widening the talent pool available to employers, since location is no longer a barrier to hiring. Critics, however, point out that working from home can blur the line between personal and professional life, and that spontaneous face-to-face collaboration - the kind that often sparks new ideas - is harder to replicate on a screen. Many companies have responded by adopting a hybrid model, asking staff to come into the office two or three days a week while allowing flexibility for the remainder. Whether this compromise will become the long-term standard, or simply a transitional phase before something else takes its place, remains an open question.`,
};

const readingQuestions1 = [
  {
    id: 'r1',
    section: 'Reading',
    cefr: 'A2',
    passageId: 'p1',
    text: 'According to the passage, what has made remote work possible?',
    options: [
      'Government subsidies for home offices',
      'High-speed internet, video conferencing and cloud tools',
      'A shortage of office space in cities',
      'New labour laws requiring flexible hours',
    ],
    correct: 1,
    explanation: 'Mətndə göstərilir ki, sürətli internet, video konfrans və bulud alətləri bunu mümkün edib.',
  },
  {
    id: 'r2',
    section: 'Reading',
    cefr: 'B1',
    passageId: 'p1',
    text: 'Why do supporters say remote work widens the talent pool?',
    options: [
      'Because salaries are lower for remote staff',
      'Because location is no longer a barrier to hiring',
      'Because remote workers need less training',
      'Because it reduces office rent costs',
    ],
    correct: 1,
    explanation: "Mətndə deyilir: 'location is no longer a barrier to hiring'.",
  },
  {
    id: 'r3',
    section: 'Reading',
    cefr: 'B2',
    passageId: 'p1',
    text: "What concern do critics raise about remote work, according to the passage?",
    options: [
      'It increases commuting costs',
      'It makes spontaneous collaboration harder to replicate',
      'It reduces employee salaries',
      'It requires more office equipment',
    ],
    correct: 1,
    explanation: "Mətndə tənqidçilər spontan üz-üzə əməkdaşlığın ekranda çətin olduğunu vurğulayır.",
  },
  {
    id: 'r4',
    section: 'Reading',
    cefr: 'B2',
    passageId: 'p1',
    text: 'What does the passage suggest about the hybrid model?',
    options: [
      'It has completely replaced remote work',
      'Its long-term future is still uncertain',
      'It is rejected by most companies',
      'It only applies to new employees',
    ],
    correct: 1,
    explanation: "Son cümlə hibrid modelin daimi standart olub-olmayacağının hələ aydın olmadığını bildirir.",
  },
];

const passage2 = {
  passageId: 'p2',
  passageTitle: 'The Science of Sleep',
  passageText: `Sleep was once thought to be a passive state in which the brain simply shut down, but decades of research have shown the opposite: during sleep, the brain remains remarkably active, performing tasks essential to memory, learning and emotional regulation. During deep sleep, the brain consolidates information gathered during the day, transferring short-term memories into longer-term storage. Meanwhile, the glymphatic system - a network that clears waste from brain tissue - becomes significantly more active, flushing out metabolic by-products that accumulate during waking hours. Chronic sleep deprivation has been linked not only to impaired concentration and mood swings but also, over time, to a higher risk of cardiovascular disease and weakened immune function. Despite this growing body of evidence, sleep is often the first thing sacrificed under the pressure of modern schedules, treated as a flexible variable rather than a biological necessity. Some researchers argue that shifting this cultural attitude may prove just as important for public health as any single medical breakthrough.`,
};

const readingQuestions2 = [
  {
    id: 'r5',
    section: 'Reading',
    cefr: 'B1',
    passageId: 'p2',
    text: 'What happens to memories during deep sleep, according to the passage?',
    options: [
      'They are erased permanently',
      'They are transferred from short-term to long-term storage',
      'They become more emotional',
      'They are shared between hemispheres of the brain',
    ],
    correct: 1,
    explanation: "Mətndə deyilir ki, dərin yuxu zamanı qısamüddətli yaddaş uzunmüddətli yaddaşa keçirilir.",
  },
  {
    id: 'r6',
    section: 'Reading',
    cefr: 'B2',
    passageId: 'p2',
    text: 'What is the function of the glymphatic system, as described in the passage?',
    options: [
      'It regulates body temperature during sleep',
      'It clears waste products from brain tissue',
      'It controls dreaming patterns',
      'It produces melatonin',
    ],
    correct: 1,
    explanation: "Glimfatik sistem beyin toxumasından tullantıları təmizləyən şəbəkə kimi təsvir olunur.",
  },
  {
    id: 'r7',
    section: 'Reading',
    cefr: 'C1',
    passageId: 'p2',
    text: 'What is the writer\'s main point in the final sentence of the passage?',
    options: [
      'Medical breakthroughs are more effective than sleep research',
      'Changing attitudes toward sleep could be as valuable as a medical breakthrough',
      'Public health policy should focus only on sleep',
      'Researchers disagree about the importance of sleep',
    ],
    correct: 1,
    explanation: "Yazar mədəni münasibətin dəyişməsinin tibbi kəşf qədər əhəmiyyətli ola biləcəyini bildirir.",
  },
  {
    id: 'r8',
    section: 'Reading',
    cefr: 'C1',
    passageId: 'p2',
    text: 'Which best describes the overall structure of the passage?',
    options: [
      'A comparison of two opposing scientific theories',
      'A historical timeline of sleep research discoveries',
      'A correction of an outdated view, followed by evidence and a broader implication',
      'A step-by-step guide to improving sleep quality',
    ],
    correct: 2,
    explanation: "Mətn köhnə fikri düzəldir (passiv deyil), sübutlar göstərir və sonda daha geniş nəticəyə keçir.",
  },
];

export const readingPassages = [passage1, passage2];

export const levelTestQuestions = [
  ...grammarQuestions,
  ...vocabularyQuestions,
  ...readingQuestions1,
  ...readingQuestions2,
].map((q) => ({ ...q, weight: CEFR_WEIGHT[q.cefr] }));

export const LEVEL_TEST_TOTAL_WEIGHT = levelTestQuestions.reduce((sum, q) => sum + q.weight, 0);

// Maps a weighted percentage (0-100) to a CEFR band, matching the A1-C1
// range already used across the rest of the site.
export const percentageToCEFR = (percentage) => {
  if (percentage <= 20) return 'A1';
  if (percentage <= 40) return 'A2';
  if (percentage <= 60) return 'B1';
  if (percentage <= 80) return 'B2';
  return 'C1';
};

export const CEFR_LABELS = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper-Intermediate',
  C1: 'Advanced',
};

// Rough, for-reference-only IELTS band equivalent (3.0 - 9.0 in 0.5 steps).
export const percentageToIELTS = (percentage) => {
  const raw = (percentage / 100) * 9;
  const rounded = Math.round(raw * 2) / 2;
  return Math.max(3, Math.min(9, rounded)).toFixed(1);
};
