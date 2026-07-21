import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

// ==================== THEME CONTEXT ====================
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="main-header">
      <div className="header-inner">
        <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>EminisQuizon</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/grammar">Grammar</Link>
          <Link to="/voca">Vocabulary Test</Link>
          <Link to="/reading">Reading</Link>
          <Link to="/listening">Listening</Link> {/* YENİ */}
        </nav>
        <div className="header-right">
          <div className="toggle" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </div>
        </div>
      </div>
    </header>
  );
};
// ==================== FOOTER ====================
const Footer = () => (
  <footer>
    <p>2026 EminisQuizon — Learn English Smarter</p>
  </footer>
);

// ==================== HOMEPAGE ====================
const HomePage = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      });
    }, { threshold: 0.2 });
    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="hero">
        <h2>Learn Smarter. Grow Faster.</h2>
        <p>EminisQuizon is a modern educational platform focused on clarity, motivation, and intelligent learning design. Master English grammar, expand your vocabulary, and test your knowledge with interactive quizzes.</p>
        <div className="hero-buttons">
          <Link to="/quiz" className="hero-btn primary">Start Quiz</Link>
          <Link to="/grammar" className="hero-btn secondary">Learn Grammar</Link>
        </div>
      </div>
      <section className="home-sections">
        <div className="card"><h3>Modern Learning Experience</h3><p>Designed with simplicity and focus in mind, EminisQuizon removes distractions and helps students stay productive.</p></div>
        <div className="card"><h3>Why EminisQuizon?</h3><ul><li>Professional glassmorphism UI design</li><li>Smooth animations and transitions</li><li>Dark / Light mode support</li><li>Fully responsive on all devices</li><li>11 comprehensive grammar topics</li><li>5 difficulty levels from A1 to C1</li><li>15 unique questions per level per topic</li><li>Detailed explanations for each answer</li></ul></div>
        <div className="card"><h3>Our Vision</h3><p>To build a clean, motivating digital space where learning feels premium, modern, and enjoyable.</p></div>
      </section>
      <Footer />
    </>
  );
};

// ==================== QUIZ PAGE ====================
const QuizPage = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const quizTopics = [
    { id: 1, name: 'English Tenses', description: 'Master all English tenses including present, past, future, and their continuous and perfect forms' },
    { id: 2, name: 'Grammar Rules', description: 'Test your knowledge of English grammar including parts of speech, sentence structure, and more' },
    { id: 3, name: 'Vocabulary', description: 'Expand your word knowledge with common English vocabulary and their proper usage' },
    { id: 4, name: 'Phrasal Verbs', description: 'Learn and practice common phrasal verbs used in everyday English conversations' },
    { id: 5, name: 'Conditionals', description: 'Master zero, first, second, and third conditionals with realistic examples' },
    { id: 6, name: 'Passive Voice', description: 'Understand how to transform active sentences into passive voice correctly' },
    { id: 7, name: 'Reported Speech', description: 'Practice converting direct speech into reported speech with proper tense changes' },
    { id: 8, name: 'Prepositions', description: 'Learn the correct usage of prepositions of time, place, and movement' },
    { id: 9, name: 'Articles', description: 'Master the use of definite and indefinite articles A/An/The in English' },
    { id: 10, name: 'Comparatives Superlatives', description: 'Learn how to compare objects, people, and ideas correctly' },
    { id: 11, name: 'Synonyms Antonyms', description: 'Expand your vocabulary with words that have similar or opposite meanings' }
  ];

  const levels = [
    { id: 'A1', name: 'Beginner A1', description: 'Basic vocabulary and simple sentence structures', difficulty: 'Easy' },
    { id: 'A2', name: 'Elementary A2', description: 'Simple conversations and everyday topics', difficulty: 'Easy' },
    { id: 'B1', name: 'Intermediate B1', description: 'Independent user - can handle most situations', difficulty: 'Medium' },
    { id: 'B2', name: 'Upper Intermediate B2', description: 'Advanced conversations and complex topics', difficulty: 'Medium' },
    { id: 'C1', name: 'Advanced C1', description: 'Fluent and spontaneous communication', difficulty: 'Hard' }
  ];

  if (selectedTopic && selectedLevel) {
    return <QuizComponent topic={selectedTopic} level={selectedLevel} onBack={() => { setSelectedTopic(null); setSelectedLevel(null); }} />;
  }

  if (selectedTopic) {
    return (
      <>
        <div className="page-hero">
          <button className="back-btn" onClick={() => setSelectedTopic(null)}> Back to Topics</button>
          <h2>Select Your Level - {selectedTopic.name}</h2>
          <p>Choose the difficulty level that matches your knowledge. Each level has 15 unique questions.</p>
        </div>
        <div className="level-selection-container">
          {levels.map((level) => (
            <div key={level.id} className="level-card" onClick={() => setSelectedLevel(level)}>
              <div className="level-header">
                <span className="level-badge">{level.id}</span>
                <span className="level-difficulty">{level.difficulty}</span>
              </div>
              <h3>{level.name}</h3>
              <p>{level.description}</p>
              <div className="level-stats">
                <span>15 Questions</span>
                <span>No Time Limit</span>
              </div>
              <button className="level-start-btn">Start Test</button>
            </div>
          ))}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="page-hero">
        <h2>Choose Your Quiz Topic</h2>
        <p>Select a grammar topic to test your knowledge. Each topic has 5 difficulty levels with 15 unique questions each.</p>
      </div>
      <div className="topic-selection-container">
        {quizTopics.map((topic) => (
          <div key={topic.id} className="topic-card" onClick={() => setSelectedTopic(topic)}>
            <h3>{topic.name}</h3>
            <p>{topic.description}</p>
            <div className="topic-footer">
              <span className="topic-levels">5 Levels Available</span>
              <span className="topic-arrow">→</span>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

// ==================== QUIZ COMPONENT ====================
const QuizComponent = ({ topic, level, onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showExplanations, setShowExplanations] = useState(false);

  const getQuestions = (topicName, levelId) => {
    const allQuizzes = {
      'English Tenses': {
        A1: [
          { text: "I ___ to school every day.", options: ["go", "goes", "going", "went"], correct: 0, explanation: "I/You/We/They ilə 'go' istifadə olunur." },
          { text: "She ___ very well.", options: ["sing", "sings", "singing", "sang"], correct: 1, explanation: "He/She/It üçün feilə -s əlavə edilir." },
          { text: "They ___ playing football now.", options: ["is", "am", "are", "be"], correct: 2, explanation: "They ilə 'are' istifadə olunur." },
          { text: "He ___ to work every morning.", options: ["drive", "drives", "driving", "drove"], correct: 1, explanation: "He ilə feilə -s əlavə olunur." },
          { text: "We ___ breakfast at 8 AM.", options: ["have", "has", "having", "had"], correct: 0, explanation: "We ilə 'have' istifadə olunur." },
          { text: "The sun ___ in the east.", options: ["rise", "rises", "rising", "rose"], correct: 1, explanation: "Ümumi həqiqətlər Present Simple-də olur." },
          { text: "My sister ___ in a hospital.", options: ["work", "works", "working", "worked"], correct: 1, explanation: "My sister = She, buna görə -s əlavə olunur." },
          { text: "___ you like coffee?", options: ["Do", "Does", "Is", "Are"], correct: 0, explanation: "You ilə 'do' istifadə olunur." },
          { text: "He ___ television every evening.", options: ["watch", "watches", "watching", "watched"], correct: 1, explanation: "He ilə feilə -es əlavə olunur." },
          { text: "They ___ to the cinema on Fridays.", options: ["go", "goes", "going", "went"], correct: 0, explanation: "They ilə 'go' istifadə olunur." },
          { text: "She ___ English very well.", options: ["speak", "speaks", "speaking", "spoke"], correct: 1, explanation: "She ilə feilə -s əlavə olunur." },
          { text: "My parents ___ in Istanbul.", options: ["live", "lives", "living", "lived"], correct: 0, explanation: "My parents = They, buna görə 'live' işlədilir." },
          { text: "___ he play tennis?", options: ["Do", "Does", "Is", "Are"], correct: 1, explanation: "He ilə 'does' istifadə olunur." },
          { text: "The Earth ___ around the Sun.", options: ["move", "moves", "moving", "moved"], correct: 1, explanation: "Ümumi həqiqətlər Present Simple-də olur." },
          { text: "We ___ happy.", options: ["is", "am", "are", "be"], correct: 2, explanation: "We ilə 'are' istifadə olunur." }
        ],
        A2: [
          { text: "I ___ dinner when you called.", options: ["have", "was having", "had", "were having"], correct: 1, explanation: "Keçmişdə davam edən hərəkət üçün Past Continuous." },
          { text: "She ___ to Paris last summer.", options: ["go", "goes", "went", "gone"], correct: 2, explanation: "Last summer keçmiş zamandır, Past Simple." },
          { text: "They ___ the project by tomorrow.", options: ["finish", "finished", "will finish", "have finished"], correct: 2, explanation: "By tomorrow gələcək zamandır, Future Simple." },
          { text: "How long ___ you been waiting?", options: ["have", "has", "had", "will"], correct: 0, explanation: "You ilə 'have been' istifadə olunur." },
          { text: "She ___ her homework already.", options: ["do", "did", "has done", "will do"], correct: 2, explanation: "Already ilə Present Perfect işlədilir." },
          { text: "I ___ never seen such a beautiful place.", options: ["have", "has", "had", "will"], correct: 0, explanation: "I ilə 'have' istifadə olunur." },
          { text: "When I arrived, they ___ dinner.", options: ["have", "had", "were having", "are having"], correct: 2, explanation: "Keçmişdə iki hərəkət - biri davam edir." },
          { text: "She ___ be a doctor when she grows up.", options: ["want", "wants", "want to", "wants to"], correct: 3, explanation: "Want to + feil - arzu etmək." },
          { text: "They ___ playing football at 5 PM yesterday.", options: ["are", "were", "was", "is"], correct: 1, explanation: "They ilə 'were' istifadə olunur." },
          { text: "I think it ___ rain tomorrow.", options: ["is", "will", "was", "has"], correct: 1, explanation: "Təxmin bildirərkən 'will' istifadə olunur." },
          { text: "She ___ a letter when I saw her.", options: ["write", "wrote", "was writing", "is writing"], correct: 2, explanation: "Keçmişdə davam edən hərəkət - Past Continuous." },
          { text: "We ___ to the museum last week.", options: ["go", "went", "gone", "going"], correct: 1, explanation: "Last week keçmiş zamandır." },
          { text: "He ___ in London since 2015.", options: ["live", "lives", "has lived", "is living"], correct: 2, explanation: "Since ilə Present Perfect işlədilir." },
          { text: "They ___ a new car next month.", options: ["buy", "bought", "will buy", "have bought"], correct: 2, explanation: "Next month gələcək zamandır." },
          { text: "I ___ my key. I can't find it anywhere.", options: ["lose", "lost", "have lost", "am losing"], correct: 2, explanation: "Hazırda təsiri hiss olunan keçmiş hərəkət." }
        ],
        B1: [
          { text: "By the time we arrived, the movie ___ already started.", options: ["has", "had", "have", "was"], correct: 1, explanation: "Keçmişdə digər hərəkətdən əvvəl baş verən hərəkət üçün Past Perfect." },
          { text: "I ___ to call you, but I forgot.", options: ["going", "was going", "went", "have gone"], correct: 1, explanation: "Planlaşdırılmış, amma baş verməmiş keçmiş hərəkət." },
          { text: "She ___ English for five years before she moved to London.", options: ["learned", "has learned", "had learned", "was learning"], correct: 2, explanation: "Keçmişdə müəyyən müddət davam edən və sonra bitən hərəkət." },
          { text: "By next year, I ___ here for a decade.", options: ["work", "will work", "will have worked", "have worked"], correct: 2, explanation: "Gələcəkdə müəyyən vaxta kimi davam edəcək hərəkət - Future Perfect." },
          { text: "She ___ asleep while she was reading.", options: ["fall", "fell", "has fallen", "was falling"], correct: 1, explanation: "Birdən baş verən keçmiş hərəkət - Past Simple." },
          { text: "I ___ to the party if I had known about it.", options: ["would go", "would have gone", "went", "have gone"], correct: 1, explanation: "Keçmişdə dəyişməyən şərt - Third Conditional." },
          { text: "She ___ be a famous singer one day.", options: ["may", "must", "can", "will"], correct: 0, explanation: "Ehtimal bildirərkən 'may' istifadə olunur." },
          { text: "You ___ have told me about the meeting earlier.", options: ["should", "would", "could", "might"], correct: 0, explanation: "Məsləhət və peşmançılıq bildirərkən 'should have' işlədilir." },
          { text: "They ___ to the concert when I saw them.", options: ["go", "were going", "went", "have gone"], correct: 1, explanation: "Keçmişdə bir istiqamətə gedən hərəkət - Past Continuous." },
          { text: "By 2025, scientists ___ a cure for the disease.", options: ["find", "will find", "will have found", "have found"], correct: 2, explanation: "Gələcəkdə müəyyən vaxta kimi bitəcək iş." },
          { text: "I wish I ___ more time to travel.", options: ["have", "had", "will have", "have had"], correct: 1, explanation: "Arzu bildirərkən 'wish' + Past Simple işlədilir." },
          { text: "She ___ her homework before she went out.", options: ["finish", "finished", "had finished", "was finishing"], correct: 2, explanation: "Keçmişdə əvvəl baş verən hərəkət - Past Perfect." },
          { text: "They ___ for three hours when the storm started.", options: ["drive", "drove", "had been driving", "were driving"], correct: 2, explanation: "Keçmişdə müddətli davam edən hərəkət - Past Perfect Continuous." },
          { text: "I ___ to London five times so far.", options: ["go", "went", "have been", "had been"], correct: 2, explanation: "Həyat təcrübəsi - Present Perfect." },
          { text: "He ___ his leg while he was playing football.", options: ["break", "broke", "has broken", "was breaking"], correct: 1, explanation: "Birdən baş verən keçmiş hərəkət - Past Simple." }
        ],
        B2: [
          { text: "Had I known about the traffic, I ___ a different route.", options: ["would take", "would have taken", "took", "have taken"], correct: 1, explanation: "Inversion ilə Third Conditional." },
          { text: "She ___ a wonderful speech when the lights went out.", options: ["gave", "was giving", "had given", "has given"], correct: 1, explanation: "Davam edən hərəkət zamanı kəsildi - Past Continuous." },
          { text: "By the end of this year, I ___ this book.", options: ["finish", "will finish", "will have finished", "have finished"], correct: 2, explanation: "Gələcəkdə müəyyən vaxta kimi bitəcək iş." },
          { text: "Never ___ I seen such a beautiful sunset.", options: ["have", "has", "had", "did"], correct: 0, explanation: "Inversion ilə təkid: Never have I seen = I have never seen." },
          { text: "She ___ in New York for ten years by the time she retires.", options: ["lives", "will live", "will have lived", "has lived"], correct: 2, explanation: "Gələcəkdə müəyyən müddət - Future Perfect." },
          { text: "I ___ to call you, but I got caught up in a meeting.", options: ["mean", "meant", "have meant", "was meaning"], correct: 1, explanation: "Planlaşdırılmış, amma baş verməmiş keçmiş hərəkət." },
          { text: "She ___ a lot of progress since she started the course.", options: ["make", "made", "has made", "had made"], correct: 2, explanation: "Keçmişdə başlayıb indiyə kimi davam edən nəticə." },
          { text: "By the time we get there, they ___ the meeting.", options: ["start", "will start", "will have started", "have started"], correct: 2, explanation: "Gələcəkdə bir hərəkət digərindən əvvəl baş verəcək." },
          { text: "I ___ a strange noise when I was walking home.", options: ["hear", "heard", "have heard", "was hearing"], correct: 1, explanation: "Birdən baş verən keçmiş hərəkət." },
          { text: "She ___ TV for two hours before she started studying.", options: ["watches", "watched", "had been watching", "was watching"], correct: 2, explanation: "Keçmişdə müddətli davam edən hərəkət." },
          { text: "Had we left earlier, we ___ the train.", options: ["catch", "would catch", "would have caught", "caught"], correct: 2, explanation: "Inversion ilə Third Conditional." },
          { text: "I'm tired because I ___ all day.", options: ["work", "worked", "have been working", "had worked"], correct: 2, explanation: "İndiyə kimi davam edən və nəticəsi hiss olunan hərəkət." },
          { text: "She ___ a famous writer by the time she turns 30.", options: ["becomes", "will become", "will have become", "has become"], correct: 2, explanation: "Gələcəkdə müəyyən vaxta kimi nailiyyət." },
          { text: "I ___ my mind about quitting my job.", options: ["change", "changed", "have changed", "had changed"], correct: 2, explanation: "İndiki zamanda təsiri olan keçmiş qərar." },
          { text: "She ___ to the gym regularly for months now.", options: ["goes", "went", "has been going", "had gone"], correct: 2, explanation: "Keçmişdə başlayıb indiyə kimi davam edən hərəkət." }
        ],
        C1: [
          { text: "Were she more experienced, she ___ the job.", options: ["would get", "will get", "gets", "got"], correct: 0, explanation: "Inversion ilə Second Conditional." },
          { text: "Never before ___ such a compelling argument.", options: ["have I heard", "I have heard", "did I hear", "I heard"], correct: 0, explanation: "Never before ilə inversion." },
          { text: "She ___ a book for three hours before her friend arrived.", options: ["read", "had read", "had been reading", "was reading"], correct: 2, explanation: "Keçmişdə müddətli davam edən və sonra kəsilən hərəkət." },
          { text: "Not only ___ she talented, but she is also hardworking.", options: ["is", "was", "has", "does"], correct: 0, explanation: "Not only ilə inversion." },
          { text: "I'd rather you ___ smoking.", options: ["stop", "stopped", "have stopped", "will stop"], correct: 1, explanation: "I'd rather + Past Simple - başqasının hərəkəti üçün arzu." },
          { text: "She acts as if she ___ everything.", options: ["know", "knows", "knew", "has known"], correct: 2, explanation: "As if ilə unreal situation - Past Simple." },
          { text: "Had it not been for his help, I ___ failed.", options: ["would", "would have", "will have", "have"], correct: 1, explanation: "Inversion ilə Third Conditional - mənfi forma." },
          { text: "It's high time we ___ a decision.", options: ["make", "made", "have made", "will make"], correct: 1, explanation: "It's high time + Past Simple - indi vaxtıdır." },
          { text: "Little ___ they know about the surprise.", options: ["do", "does", "did", "have"], correct: 0, explanation: "Little ilə inversion - heç bilmirlər." },
          { text: "I ___ to call you, but I've been extremely busy.", options: ["mean", "meant", "have meant", "had meant"], correct: 1, explanation: "Keçmişdə planlaşdırılmış, amma baş verməmiş hərəkət." },
          { text: "She would rather ___ alone than go with them.", options: ["to stay", "staying", "stay", "stayed"], correct: 2, explanation: "Would rather + V1 - özünün üstünlüyü." },
          { text: "No sooner ___ I arrived than the phone rang.", options: ["have", "had", "did", "was"], correct: 1, explanation: "No sooner ilə inversion - gələn kimi." },
          { text: "I wish I ___ to take that job offer.", options: ["agree", "agreed", "have agreed", "had agreed"], correct: 3, explanation: "Keçmişdə dəyişməyən hadisə üçün peşmançılıq." },
          { text: "She talked about him as if she ___ him for years.", options: ["knows", "knew", "has known", "had known"], correct: 3, explanation: "Keçmişdəki unreal situation üçün Past Perfect." },
          { text: "Only after the exam ___ I realize my mistake.", options: ["do", "did", "have", "had"], correct: 1, explanation: "Only after ilə inversion - yalnız sonra anladım." }
        ]
      },
      'Grammar Rules': {
        A1: [
          { text: "___ apple a day keeps the doctor away.", options: ["A", "An", "The", "None"], correct: 1, explanation: "Apple sait səsi ilə başladığı üçün an işlədilir." },
          { text: "She is ___ engineer.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Engineer sait səsi ilə başlayır." },
          { text: "This is ___ interesting book.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Interesting sait səsi ilə başlayır." },
          { text: "He is ___ best student in class.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Ən üstün dərəcədə the işlədilir." },
          { text: "___ sun rises in the east.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Unikal şeylərdə the işlədilir." },
          { text: "I have ___ umbrella in my bag.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Umbrella sait səsi ilə başlayır." },
          { text: "She is ___ honest person.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Honest-də h səslənmir, sait səsi ilə başlayır." },
          { text: "___ Earth is our home.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Unikal planet adında the işlədilir." },
          { text: "I want ___ cup of coffee.", options: ["a", "an", "the", "none"], correct: 0, explanation: "Cup samit səsi ilə başlayır." },
          { text: "He is ___ university student.", options: ["a", "an", "the", "none"], correct: 0, explanation: "University ju səsi ilə başlayır samit kimi." },
          { text: "___ moon is shining tonight.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Unikal səma cisimlərində the işlədilir." },
          { text: "She is ___ best singer.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Superlative degree ilə the işlədilir." },
          { text: "I saw ___ eagle in the sky.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Eagle sait səsi ilə başlayır." },
          { text: "___ Amazon is a long river.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Çay adlarında the işlədilir." },
          { text: "She is ___ doctor.", options: ["a", "an", "the", "none"], correct: 0, explanation: "Peşə adlarından əvvəl a işlədilir." }
        ],
        A2: [
          { text: "She ___ to school yesterday.", options: ["go", "goes", "went", "gone"], correct: 2, explanation: "Yesterday keçmiş zamandır, went işlədilir." },
          { text: "They ___ playing football now.", options: ["is", "am", "are", "be"], correct: 2, explanation: "They ilə are istifadə olunur." },
          { text: "I ___ TV when you called.", options: ["watch", "watched", "was watching", "have watched"], correct: 2, explanation: "Davam edən keçmiş hərəkət - Past Continuous." },
          { text: "She ___ already eaten lunch.", options: ["have", "has", "is", "are"], correct: 1, explanation: "Already ilə Present Perfect, she ilə has." },
          { text: "We ___ to Paris last summer.", options: ["go", "went", "gone", "going"], correct: 1, explanation: "Last summer keçmiş zamandır." },
          { text: "He ___ never been to London.", options: ["have", "has", "is", "are"], correct: 1, explanation: "Never ilə Present Perfect." },
          { text: "They ___ dinner when I arrived.", options: ["have", "had", "were having", "are having"], correct: 2, explanation: "Davam edən keçmiş hərəkət." },
          { text: "She ___ be a doctor.", options: ["want", "wants", "want to", "wants to"], correct: 3, explanation: "Want to + feil - arzu etmək." },
          { text: "I think it ___ rain.", options: ["is", "will", "was", "has"], correct: 1, explanation: "Təxmin bildirərkən will." },
          { text: "She ___ a letter when I saw her.", options: ["write", "wrote", "was writing", "is writing"], correct: 2, explanation: "Keçmişdə davam edən hərəkət." },
          { text: "We ___ to the museum last week.", options: ["go", "went", "gone", "going"], correct: 1, explanation: "Last week keçmiş zamandır." },
          { text: "He ___ in London since 2015.", options: ["live", "lives", "has lived", "is living"], correct: 2, explanation: "Since ilə Present Perfect." },
          { text: "They ___ a new car next month.", options: ["buy", "bought", "will buy", "have bought"], correct: 2, explanation: "Next month gələcək zamandır." },
          { text: "I ___ my keys. I can't find them.", options: ["lose", "lost", "have lost", "am losing"], correct: 2, explanation: "Hazırda təsiri hiss olunan keçmiş hərəkət." },
          { text: "She ___ to the party last night.", options: ["go", "goes", "went", "gone"], correct: 2, explanation: "Last night keçmiş zamandır." }
        ],
        B1: [
          { text: "If I ___ you, I would study harder.", options: ["am", "was", "were", "is"], correct: 2, explanation: "Second Conditional-də were istifadə olunur." },
          { text: "She suggested that he ___ earlier.", options: ["arrive", "arrives", "arrived", "has arrived"], correct: 0, explanation: "Subjunctive mood-da that he arrive işlədilir." },
          { text: "It's time we ___ home.", options: ["go", "went", "have gone", "going"], correct: 1, explanation: "It's time + Past Simple - indi vaxtıdır." },
          { text: "I'd rather you ___ quiet.", options: ["keep", "kept", "have kept", "keeping"], correct: 1, explanation: "I'd rather + Past Simple - başqasının hərəkəti üçün." },
          { text: "She acts as if she ___ the boss.", options: ["is", "are", "were", "be"], correct: 2, explanation: "As if ilə unreal situation - were işlədilir." },
          { text: "He insisted that she ___ with us.", options: ["come", "comes", "came", "has come"], correct: 0, explanation: "Insist + that + subjunctive - that she come." },
          { text: "It is essential that he ___ there on time.", options: ["is", "are", "be", "were"], correct: 2, explanation: "Essential + that + subjunctive - that he be." },
          { text: "I wish I ___ taller.", options: ["am", "was", "were", "is"], correct: 2, explanation: "Wish ilə unreal situation - were işlədilir." },
          { text: "She recommended that he ___ a doctor.", options: ["see", "sees", "saw", "has seen"], correct: 0, explanation: "Recommend + that + subjunctive - that he see." },
          { text: "If only I ___ more time.", options: ["have", "has", "had", "have had"], correct: 2, explanation: "If only + Past Simple - arzu." },
          { text: "It's high time we ___ something.", options: ["do", "did", "have done", "doing"], correct: 1, explanation: "It's high time + Past Simple." },
          { text: "She demanded that he ___ immediately.", options: ["leave", "leaves", "left", "has left"], correct: 0, explanation: "Demand + that + subjunctive - that he leave." },
          { text: "I'd sooner you ___ alone.", options: ["go", "went", "have gone", "going"], correct: 1, explanation: "I'd sooner + Past Simple - üstünlük." },
          { text: "He proposed that they ___ the meeting.", options: ["postpone", "postpones", "postponed", "have postponed"], correct: 0, explanation: "Propose + that + subjunctive - that they postpone." },
          { text: "It is important that she ___ the truth.", options: ["tell", "tells", "told", "has told"], correct: 0, explanation: "Important + that + subjunctive - that she tell." }
        ],
        B2: [
          { text: "Had I known, I ___ differently.", options: ["would act", "would have acted", "acted", "have acted"], correct: 1, explanation: "Inversion ilə Third Conditional." },
          { text: "Not only ___ he late, but he also forgot the documents.", options: ["was", "is", "were", "has"], correct: 0, explanation: "Not only ilə inversion." },
          { text: "Under no circumstances ___ you leave the room.", options: ["should", "shall", "will", "would"], correct: 0, explanation: "Under no circumstances ilə inversion." },
          { text: "Rarely ___ I seen such talent.", options: ["have", "has", "had", "did"], correct: 0, explanation: "Rarely ilə inversion - nadir hallarda." },
          { text: "Only then ___ I understand the problem.", options: ["did", "do", "have", "had"], correct: 0, explanation: "Only then ilə inversion - yalnız o zaman." },
          { text: "No sooner ___ he arrived than he left.", options: ["have", "had", "did", "was"], correct: 1, explanation: "No sooner ilə inversion - gələn kimi." },
          { text: "Little ___ they know what awaits them.", options: ["do", "does", "did", "have"], correct: 0, explanation: "Little ilə inversion - heç bilmirlər." },
          { text: "Seldom ___ we have such weather.", options: ["do", "does", "did", "have"], correct: 0, explanation: "Seldom ilə inversion - nadir hallarda." },
          { text: "Nowhere ___ I find peace like in nature.", options: ["can", "could", "will", "would"], correct: 0, explanation: "Nowhere ilə inversion - heç yerdə." },
          { text: "In no way ___ this be considered acceptable.", options: ["should", "shall", "will", "would"], correct: 0, explanation: "In no way ilə inversion - heç bir şəkildə." },
          { text: "Only by working hard ___ you succeed.", options: ["will", "would", "can", "could"], correct: 0, explanation: "Only by ilə inversion - yalnız bununla." },
          { text: "So beautiful ___ the view that I couldn't look away.", options: ["was", "is", "were", "has"], correct: 0, explanation: "So + adjective ilə inversion." },
          { text: "Such ___ his anger that no one spoke.", options: ["was", "is", "were", "has"], correct: 0, explanation: "Such ilə inversion - elə idi ki." },
          { text: "Never ___ I met such a kind person.", options: ["have", "has", "had", "did"], correct: 0, explanation: "Never ilə inversion - heç vaxt." },
          { text: "Only when it ended ___ I realize the truth.", options: ["did", "do", "have", "had"], correct: 0, explanation: "Only when ilə inversion - yalnız o zaman." }
        ],
        C1: [
          { text: "Were it not for your help, I ___ failed.", options: ["would have", "would", "will have", "have"], correct: 0, explanation: "Inversion ilə Third Conditional - mənfi forma." },
          { text: "Had it not been for the rain, we ___ the game.", options: ["would win", "would have won", "won", "have won"], correct: 1, explanation: "Inversion ilə Third Conditional." },
          { text: "So quickly ___ he run that no one could catch him.", options: ["did", "do", "has", "had"], correct: 0, explanation: "So + adverb ilə inversion." },
          { text: "Such was his influence ___ he changed the law.", options: ["that", "so", "as", "like"], correct: 0, explanation: "Such... that strukturunda inversion." },
          { text: "No matter how hard ___ tried, he couldn't succeed.", options: ["he", "did he", "has he", "had he"], correct: 1, explanation: "No matter how ilə inversion." },
          { text: "Be it rain or shine, we ___ go.", options: ["will", "would", "shall", "must"], correct: 0, explanation: "Be it... ilə inversion - yağsa da, yağmasa da." },
          { text: "Come what ___, I will stand by you.", options: ["may", "might", "will", "would"], correct: 0, explanation: "Come what may - nə olursa olsun." },
          { text: "Should you need anything, please ___ me know.", options: ["let", "letting", "lets", "to let"], correct: 0, explanation: "Should ilə inversion - əgər lazım olsa." },
          { text: "Had I the money, I ___ buy a house.", options: ["would", "will", "can", "could"], correct: 0, explanation: "Inversion ilə Second Conditional." },
          { text: "Were they to arrive early, we ___ start immediately.", options: ["would", "will", "can", "could"], correct: 0, explanation: "Were they to + inversion - əgər gəlsələr." },
          { text: "Long ___ he live and prosper!", options: ["may", "might", "will", "would"], correct: 0, explanation: "Long may he live - yaşasın." },
          { text: "So sudden ___ the attack that we had no time to react.", options: ["was", "is", "were", "has"], correct: 0, explanation: "So + adjective ilə inversion." },
          { text: "Never in my life ___ I witnessed such a scene.", options: ["have", "has", "had", "did"], correct: 0, explanation: "Never ilə inversion." },
          { text: "Only rarely ___ we see such dedication.", options: ["do", "does", "did", "have"], correct: 0, explanation: "Only rarely ilə inversion." },
          { text: "Had we but world enough and time...", options: ["this", "that", "these", "those"], correct: 0, explanation: "Had we but - kaş ki." }
        ]
      },
      'Vocabulary': {
        A1: [
          { text: "Big means ___", options: ["small", "large", "thin", "short"], correct: 1, explanation: "Big = large - böyük mənasında." },
          { text: "Fast means ___", options: ["quick", "slow", "late", "early"], correct: 0, explanation: "Fast = quick - sürətli." },
          { text: "Happy means ___", options: ["sad", "angry", "joyful", "tired"], correct: 2, explanation: "Happy = joyful - xoşbəxt." },
          { text: "Begin means ___", options: ["end", "start", "close", "finish"], correct: 1, explanation: "Begin = start - başlamaq." },
          { text: "Cold is opposite of ___", options: ["hot", "cool", "warm", "chilly"], correct: 0, explanation: "Cold-un əksi hot - isti." },
          { text: "Rich means ___", options: ["poor", "wealthy", "cheap", "needy"], correct: 1, explanation: "Rich = wealthy - varlı." },
          { text: "Easy means ___", options: ["hard", "simple", "heavy", "difficult"], correct: 1, explanation: "Easy = simple - asan." },
          { text: "Dangerous means ___", options: ["safe", "risky", "easy", "calm"], correct: 1, explanation: "Dangerous = risky - təhlükəli." },
          { text: "Buy means ___", options: ["sell", "purchase", "give", "take"], correct: 1, explanation: "Buy = purchase - almaq." },
          { text: "Old means ___", options: ["young", "ancient", "new", "modern"], correct: 1, explanation: "Old = ancient - köhnə." },
          { text: "Strong means ___", options: ["weak", "powerful", "soft", "gentle"], correct: 1, explanation: "Strong = powerful - güclü." },
          { text: "Clean means ___", options: ["dirty", "clear", "messy", "dusty"], correct: 1, explanation: "Clean = clear - təmiz." },
          { text: "Early means ___", options: ["late", "soon", "fast", "quick"], correct: 1, explanation: "Early = soon - tez." },
          { text: "Noisy means ___", options: ["quiet", "loud", "soft", "silent"], correct: 1, explanation: "Noisy = loud - səsli." },
          { text: "Correct means ___", options: ["wrong", "right", "false", "incorrect"], correct: 1, explanation: "Correct = right - düzgün." }
        ],
        A2: [
          { text: "Travel means ___", options: ["stay", "journey", "rest", "sleep"], correct: 1, explanation: "Travel = journey - səyahət etmək." },
          { text: "Friend means ___", options: ["enemy", "companion", "stranger", "foe"], correct: 1, explanation: "Friend = companion - dost." },
          { text: "Hotel is a place to ___", options: ["eat", "sleep", "work", "study"], correct: 1, explanation: "Hotel - yuxu yeri." },
          { text: "Airport is for ___", options: ["trains", "planes", "buses", "ships"], correct: 1, explanation: "Airport - təyyarə üçün." },
          { text: "Teacher is a person who ___", options: ["learns", "teaches", "studies", "reads"], correct: 1, explanation: "Teacher - müəllim." },
          { text: "Library is a place with ___", options: ["food", "books", "clothes", "cars"], correct: 1, explanation: "Library - kitabxana." },
          { text: "Restaurant is for ___", options: ["sleeping", "eating", "studying", "working"], correct: 1, explanation: "Restaurant - yemək üçün." },
          { text: "Hospital is for ___ people", options: ["healthy", "sick", "happy", "rich"], correct: 1, explanation: "Hospital - xəstəxana." },
          { text: "Museum has ___", options: ["art", "food", "cars", "clothes"], correct: 0, explanation: "Museum - muzey." },
          { text: "Zoo has ___", options: ["plants", "animals", "books", "cars"], correct: 1, explanation: "Zoo - heyvanat bağı." },
          { text: "Beach is near the ___", options: ["mountains", "sea", "forest", "desert"], correct: 1, explanation: "Beach - çimərlik." },
          { text: "Stadium is for ___", options: ["sports", "movies", "music", "art"], correct: 0, explanation: "Stadium - stadion." },
          { text: "Mosque is a place of ___", options: ["prayer", "eating", "sleeping", "working"], correct: 0, explanation: "Mosque - məscid." },
          { text: "Radio is for ___", options: ["listening", "watching", "reading", "writing"], correct: 0, explanation: "Radio - radio." },
          { text: "Newspaper is for ___", options: ["reading", "listening", "watching", "writing"], correct: 0, explanation: "Newspaper - qəzet." }
        ],
        B1: [
          { text: "Environment means ___", options: ["nature", "building", "city", "house"], correct: 0, explanation: "Environment - ətraf mühit." },
          { text: "Culture means ___", options: ["customs", "buildings", "food", "clothes"], correct: 0, explanation: "Culture - mədəniyyət." },
          { text: "Education means ___", options: ["learning", "working", "sleeping", "eating"], correct: 0, explanation: "Education - təhsil." },
          { text: "Communication means ___", options: ["talking", "sleeping", "eating", "walking"], correct: 0, explanation: "Communication - ünsiyyət." },
          { text: "Technology means ___", options: ["machines", "books", "food", "clothes"], correct: 0, explanation: "Technology - texnologiya." },
          { text: "Leadership means ___", options: ["leading", "following", "sleeping", "eating"], correct: 0, explanation: "Leadership - rəhbərlik." },
          { text: "Management means ___", options: ["control", "chaos", "confusion", "disorder"], correct: 0, explanation: "Management - idarəetmə." },
          { text: "Innovation means ___", options: ["newness", "oldness", "sameness", "similarity"], correct: 0, explanation: "Innovation - innovasiya." },
          { text: "Strategy means ___", options: ["plan", "random", "chaos", "confusion"], correct: 0, explanation: "Strategy - strategiya." },
          { text: "Development means ___", options: ["growth", "decline", "decrease", "reduction"], correct: 0, explanation: "Development - inkişaf." },
          { text: "Skill means ___", options: ["ability", "disability", "weakness", "inability"], correct: 0, explanation: "Skill - bacarıq." },
          { text: "Finance means ___", options: ["money", "health", "happiness", "sadness"], correct: 0, explanation: "Finance - maliyyə." },
          { text: "Project means ___", options: ["plan", "chaos", "confusion", "disorder"], correct: 0, explanation: "Project - layihə." },
          { text: "Support means ___", options: ["help", "hinder", "block", "stop"], correct: 0, explanation: "Support - dəstək." },
          { text: "Progress means ___", options: ["advancement", "decline", "decrease", "reduction"], correct: 0, explanation: "Progress - irəliləyiş." }
        ],
        B2: [
          { text: "Negotiate means ___", options: ["discuss", "ignore", "avoid", "refuse"], correct: 0, explanation: "Negotiate - danışıq aparmaq." },
          { text: "Evaluate means ___", options: ["assess", "ignore", "avoid", "refuse"], correct: 0, explanation: "Evaluate - qiymətləndirmək." },
          { text: "Collaborate means ___", options: ["work together", "work alone", "fight", "argue"], correct: 0, explanation: "Collaborate - əməkdaşlıq etmək." },
          { text: "Implement means ___", options: ["execute", "cancel", "stop", "pause"], correct: 0, explanation: "Implement - həyata keçirmək." },
          { text: "Optimize means ___", options: ["improve", "worsen", "destroy", "break"], correct: 0, explanation: "Optimize - optimallaşdırmaq." },
          { text: "Analyze means ___", options: ["examine", "ignore", "avoid", "refuse"], correct: 0, explanation: "Analyze - analiz etmək." },
          { text: "Coordinate means ___", options: ["organize", "confuse", "destroy", "break"], correct: 0, explanation: "Coordinate - koordinasiya etmək." },
          { text: "Delegate means ___", options: ["assign", "keep", "hold", "retain"], correct: 0, explanation: "Delegate - vəzifə vermək." },
          { text: "Facilitate means ___", options: ["make easier", "make harder", "stop", "block"], correct: 0, explanation: "Facilitate - asanlaşdırmaq." },
          { text: "Innovate means ___", options: ["create new", "copy", "imitate", "repeat"], correct: 0, explanation: "Innovate - innovasiya etmək." },
          { text: "Motivate means ___", options: ["inspire", "discourage", "stop", "block"], correct: 0, explanation: "Motivate - motivasiya etmək." },
          { text: "Prioritize means ___", options: ["rank", "ignore", "avoid", "refuse"], correct: 0, explanation: "Prioritize - prioritet təyin etmək." },
          { text: "Articulate means ___", options: ["express clearly", "mumble", "whisper", "shout"], correct: 0, explanation: "Articulate - aydın ifadə etmək." },
          { text: "Comprehend means ___", options: ["understand", "ignore", "avoid", "refuse"], correct: 0, explanation: "Comprehend - anlamaq." },
          { text: "Convey means ___", options: ["communicate", "hide", "conceal", "cover"], correct: 0, explanation: "Convey - çatdırmaq." }
        ],
        C1: [
          { text: "Ubiquitous means ___", options: ["everywhere", "nowhere", "rare", "scarce"], correct: 0, explanation: "Ubiquitous - hər yerdə olan." },
          { text: "Meticulous means ___", options: ["careful", "careless", "sloppy", "messy"], correct: 0, explanation: "Meticulous - çox diqqətli." },
          { text: "Exacerbate means ___", options: ["worsen", "improve", "help", "fix"], correct: 0, explanation: "Exacerbate - pisləşdirmək." },
          { text: "Ephemeral means ___", options: ["temporary", "permanent", "eternal", "forever"], correct: 0, explanation: "Ephemeral - müvəqqəti." },
          { text: "Gregarious means ___", options: ["social", "lonely", "alone", "isolated"], correct: 0, explanation: "Gregarious - ünsiyyətcil." },
          { text: "Ineffable means ___", options: ["indescribable", "simple", "easy", "clear"], correct: 0, explanation: "Ineffable - izah olunmaz." },
          { text: "Sagacious means ___", options: ["wise", "foolish", "stupid", "ignorant"], correct: 0, explanation: "Sagacious - müdrik." },
          { text: "Taciturn means ___", options: ["quiet", "talkative", "loud", "noisy"], correct: 0, explanation: "Taciturn - az danışan." },
          { text: "Voracious means ___", options: ["insatiable", "satisfied", "full", "content"], correct: 0, explanation: "Voracious - doymaz." },
          { text: "Magnanimous means ___", options: ["generous", "selfish", "greedy", "mean"], correct: 0, explanation: "Magnanimous - ali mərtəbəli." },
          { text: "Cacophony means ___", options: ["noise", "silence", "quiet", "peace"], correct: 0, explanation: "Cacophony - kakofoniya." },
          { text: "Circumspect means ___", options: ["cautious", "reckless", "careless", "rash"], correct: 0, explanation: "Circumspect - ehtiyatlı." },
          { text: "Insidious means ___", options: ["harmful", "helpful", "kind", "gentle"], correct: 0, explanation: "Insidious - gizli zərərli." },
          { text: "Mellifluous means ___", options: ["sweet sounding", "harsh", "rough", "grating"], correct: 0, explanation: "Mellifluous - xoş səsli." },
          { text: "Serendipitous means ___", options: ["fortunate", "unlucky", "unfortunate", "planned"], correct: 0, explanation: "Serendipitous - təsadüfi xoşbəxtlik." }
        ]
      },
      'Phrasal Verbs': {
        A1: [
          { text: "Get up means ___", options: ["wake up", "sleep", "rest", "lie down"], correct: 0, explanation: "Get up - oyanmaq, durmaq." },
          { text: "Sit down means ___", options: ["take a seat", "stand up", "jump", "run"], correct: 0, explanation: "Sit down - oturmaq." },
          { text: "Stand up means ___", options: ["rise", "sit", "lie", "sleep"], correct: 0, explanation: "Stand up - ayağa qalxmaq." },
          { text: "Put on means ___", options: ["wear", "remove", "take off", "throw"], correct: 0, explanation: "Put on - geyinmək." },
          { text: "Take off means ___", options: ["remove", "wear", "put on", "hold"], correct: 0, explanation: "Take off - çıxarmaq." },
          { text: "Turn on means ___", options: ["start", "stop", "end", "finish"], correct: 0, explanation: "Turn on - işə salmaq." },
          { text: "Turn off means ___", options: ["stop", "start", "begin", "open"], correct: 0, explanation: "Turn off - söndürmək." },
          { text: "Come in means ___", options: ["enter", "exit", "leave", "go out"], correct: 0, explanation: "Come in - daxil olmaq." },
          { text: "Go out means ___", options: ["leave", "enter", "come in", "stay"], correct: 0, explanation: "Go out - çıxmaq." },
          { text: "Wake up means ___", options: ["stop sleeping", "sleep", "rest", "lie"], correct: 0, explanation: "Wake up - oyanmaq." },
          { text: "Look at means ___", options: ["watch", "ignore", "avoid", "miss"], correct: 0, explanation: "Look at - baxmaq." },
          { text: "Listen to means ___", options: ["hear", "ignore", "avoid", "miss"], correct: 0, explanation: "Listen to - dinləmək." },
          { text: "Wait for means ___", options: ["await", "leave", "go", "come"], correct: 0, explanation: "Wait for - gözləmək." },
          { text: "Ask for means ___", options: ["request", "give", "take", "offer"], correct: 0, explanation: "Ask for - xahiş etmək." },
          { text: "Look for means ___", options: ["search", "ignore", "avoid", "miss"], correct: 0, explanation: "Look for - axtarmaq." }
        ],
        A2: [
          { text: "Give up means ___", options: ["quit", "continue", "start", "begin"], correct: 0, explanation: "Give up - təslim olmaq, buraxmaq." },
          { text: "Look after means ___", options: ["take care", "ignore", "avoid", "miss"], correct: 0, explanation: "Look after - qayğı göstərmək." },
          { text: "Run out of means ___", options: ["exhaust", "have", "get", "find"], correct: 0, explanation: "Run out of - tükənmək." },
          { text: "Pick up means ___", options: ["lift", "drop", "fall", "leave"], correct: 0, explanation: "Pick up - götürmək." },
          { text: "Find out means ___", options: ["discover", "hide", "conceal", "cover"], correct: 0, explanation: "Find out - öyrənmək." },
          { text: "Get on means ___", options: ["board", "leave", "exit", "depart"], correct: 0, explanation: "Get on - minmək." },
          { text: "Get off means ___", options: ["alight", "board", "enter", "get on"], correct: 0, explanation: "Get off - düşmək." },
          { text: "Put away means ___", options: ["store", "take out", "use", "wear"], correct: 0, explanation: "Put away - yığışdırmaq." },
          { text: "Throw away means ___", options: ["discard", "keep", "save", "hold"], correct: 0, explanation: "Throw away - atmaq." },
          { text: "Turn around means ___", options: ["rotate", "stop", "start", "go"], correct: 0, explanation: "Turn around - dönmək." },
          { text: "Slow down means ___", options: ["decelerate", "speed up", "accelerate", "race"], correct: 0, explanation: "Slow down - yavaşlamaq." },
          { text: "Speed up means ___", options: ["accelerate", "slow down", "stop", "wait"], correct: 0, explanation: "Speed up - sürətləndirmək." },
          { text: "Calm down means ___", options: ["relax", "agitate", "excite", "anger"], correct: 0, explanation: "Calm down - sakitləşmək." },
          { text: "Show up means ___", options: ["appear", "disappear", "leave", "go"], correct: 0, explanation: "Show up - gəlmək, görünmək." },
          { text: "Work out means ___", options: ["exercise", "rest", "sleep", "eat"], correct: 0, explanation: "Work out - idman etmək." }
        ],
        B1: [
          { text: "Break down means ___", options: ["stop working", "work", "function", "operate"], correct: 0, explanation: "Break down - sıradan çıxmaq." },
          { text: "Carry on means ___", options: ["continue", "stop", "end", "finish"], correct: 0, explanation: "Carry on - davam etmək." },
          { text: "Set up means ___", options: ["establish", "destroy", "break", "ruin"], correct: 0, explanation: "Set up - qurmaq." },
          { text: "Give in means ___", options: ["surrender", "fight", "resist", "oppose"], correct: 0, explanation: "Give in - təslim olmaq." },
          { text: "Come across means ___", options: ["find by chance", "lose", "miss", "ignore"], correct: 0, explanation: "Come across - təsadüfən rast gəlmək." },
          { text: "Get along means ___", options: ["have good relations", "fight", "argue", "disagree"], correct: 0, explanation: "Get along - yaxşı münasibətdə olmaq." },
          { text: "Look forward to means ___", options: ["anticipate", "dread", "fear", "hate"], correct: 0, explanation: "Look forward to - səbirsizliklə gözləmək." },
          { text: "Put off means ___", options: ["postpone", "do now", "complete", "finish"], correct: 0, explanation: "Put off - təxirə salmaq." },
          { text: "Take after means ___", options: ["resemble", "dislike", "hate", "ignore"], correct: 0, explanation: "Take after - oxşamaq." },
          { text: "Turn down means ___", options: ["reject", "accept", "agree", "allow"], correct: 0, explanation: "Turn down - rədd etmək." },
          { text: "Bring up means ___", options: ["raise", "lower", "drop", "fall"], correct: 0, explanation: "Bring up - böyütmək, tərbiyə etmək." },
          { text: "Call off means ___", options: ["cancel", "continue", "start", "begin"], correct: 0, explanation: "Call off - ləğv etmək." },
          { text: "Do without means ___", options: ["manage without", "need", "require", "demand"], correct: 0, explanation: "Do without - əldə olmadan etmək." },
          { text: "Fall through means ___", options: ["fail", "succeed", "complete", "finish"], correct: 0, explanation: "Fall through - baş tutmamaq." },
          { text: "Go through means ___", options: ["experience", "avoid", "ignore", "skip"], correct: 0, explanation: "Go through - yaşamaq, keçmək." }
        ],
        B2: [
          { text: "Account for means ___", options: ["explain", "ignore", "avoid", "miss"], correct: 0, explanation: "Account for - izah etmək." },
          { text: "Bring about means ___", options: ["cause", "prevent", "stop", "block"], correct: 0, explanation: "Bring about - səbəb olmaq." },
          { text: "Come up with means ___", options: ["produce", "lose", "miss", "ignore"], correct: 0, explanation: "Come up with - tapmaq, icad etmək." },
          { text: "Cut down on means ___", options: ["reduce", "increase", "expand", "grow"], correct: 0, explanation: "Cut down on - azaltmaq." },
          { text: "Drop out of means ___", options: ["quit", "join", "enter", "start"], correct: 0, explanation: "Drop out of - yarımçıq buraxmaq." },
          { text: "Get over means ___", options: ["recover from", "fall into", "get into", "fall from"], correct: 0, explanation: "Get over - öhdəsindən gəlmək." },
          { text: "Go over means ___", options: ["review", "ignore", "avoid", "miss"], correct: 0, explanation: "Go over - təkrarlamaq, nəzərdən keçirmək." },
          { text: "Hold on means ___", options: ["wait", "leave", "go", "depart"], correct: 0, explanation: "Hold on - gözləmək." },
          { text: "Keep up with means ___", options: ["stay on track", "fall behind", "slow down", "stop"], correct: 0, explanation: "Keep up with - ayaqlaşmaq." },
          { text: "Live up to means ___", options: ["satisfy", "disappoint", "fail", "miss"], correct: 0, explanation: "Live up to - gözləntiləri qarşılamaq." },
          { text: "Look up to means ___", options: ["admire", "dislike", "hate", "ignore"], correct: 0, explanation: "Look up to - hörmət etmək." },
          { text: "Make up for means ___", options: ["compensate", "ignore", "avoid", "miss"], correct: 0, explanation: "Make up for - əvəzini vermək." },
          { text: "Put up with means ___", options: ["tolerate", "fight", "resist", "oppose"], correct: 0, explanation: "Put up with - dözmək." },
          { text: "Run into means ___", options: ["meet unexpectedly", "avoid", "miss", "ignore"], correct: 0, explanation: "Run into - təsadüfən rast gəlmək." },
          { text: "Stand for means ___", options: ["represent", "oppose", "fight", "resist"], correct: 0, explanation: "Stand for - təmsil etmək." }
        ],
        C1: [
          { text: "Abide by means ___", options: ["follow", "break", "ignore", "avoid"], correct: 0, explanation: "Abide by - riayət etmək." },
          { text: "Balk at means ___", options: ["resist", "accept", "agree", "allow"], correct: 0, explanation: "Balk at - qarşı durmaq." },
          { text: "Conjure up means ___", options: ["imagine", "destroy", "break", "ruin"], correct: 0, explanation: "Conjure up - təsəvvür etmək." },
          { text: "Dispense with means ___", options: ["eliminate", "keep", "hold", "maintain"], correct: 0, explanation: "Dispense with - qurtarmaq." },
          { text: "Enlarge upon means ___", options: ["elaborate", "simplify", "shorten", "abbreviate"], correct: 0, explanation: "Enlarge upon - ətraflı danışmaq." },
          { text: "Frown upon means ___", options: ["disapprove", "approve", "like", "love"], correct: 0, explanation: "Frown upon - təqdir etməmək." },
          { text: "Gear up for means ___", options: ["prepare", "ignore", "avoid", "miss"], correct: 0, explanation: "Gear up for - hazırlaşmaq." },
          { text: "Hinge on means ___", options: ["depend on", "ignore", "avoid", "miss"], correct: 0, explanation: "Hinge on - asılı olmaq." },
          { text: "Insinuate into means ___", options: ["maneuver", "direct", "push", "pull"], correct: 0, explanation: "Insinuate into - gizlicə daxil olmaq." },
          { text: "Jockey for means ___", options: ["compete for", "ignore", "avoid", "miss"], correct: 0, explanation: "Jockey for - yarışmaq." },
          { text: "Latch onto means ___", options: ["attach", "detach", "remove", "take"], correct: 0, explanation: "Latch onto - bağlanmaq." },
          { text: "Mull over means ___", options: ["consider", "ignore", "avoid", "miss"], correct: 0, explanation: "Mull over - düşünmək." },
          { text: "Narrow down means ___", options: ["reduce", "increase", "expand", "grow"], correct: 0, explanation: "Narrow down - daraltmaq." },
          { text: "Pore over means ___", options: ["study carefully", "ignore", "avoid", "skip"], correct: 0, explanation: "Pore over - diqqətlə öyrənmək." },
          { text: "Shrug off means ___", options: ["dismiss", "accept", "agree", "allow"], correct: 0, explanation: "Shrug off - laqeyd qalmaq." }
        ]
      },
      'Conditionals': {
        A1: [
          { text: "If it rains, I ___ home.", options: ["stay", "stayed", "will stay", "would stay"], correct: 2, explanation: "First Conditional - mümkün şərt." },
          { text: "If you heat ice, it ___", options: ["melts", "melted", "will melt", "would melt"], correct: 0, explanation: "Zero Conditional - ümumi həqiqət." },
          { text: "If she studies, she ___ pass.", options: ["will", "would", "could", "might"], correct: 0, explanation: "First Conditional - will pass." },
          { text: "If he comes, we ___ start.", options: ["will", "would", "could", "might"], correct: 0, explanation: "First Conditional - will start." },
          { text: "If you mix red and blue, you ___ purple.", options: ["get", "got", "will get", "would get"], correct: 0, explanation: "Zero Conditional - get." },
          { text: "If she calls, I ___ answer.", options: ["will", "would", "could", "might"], correct: 0, explanation: "First Conditional - will answer." },
          { text: "If you don't hurry, you ___ late.", options: ["will be", "would be", "are", "were"], correct: 0, explanation: "First Conditional - will be." },
          { text: "If I see him, I ___ tell him.", options: ["will", "would", "could", "might"], correct: 0, explanation: "First Conditional - will tell." },
          { text: "If you freeze water, it ___ into ice.", options: ["turns", "turned", "will turn", "would turn"], correct: 0, explanation: "Zero Conditional - turns." },
          { text: "If she needs help, she ___ ask.", options: ["will", "would", "could", "might"], correct: 0, explanation: "First Conditional - will ask." },
          { text: "If they invite us, we ___ go.", options: ["will", "would", "could", "might"], correct: 0, explanation: "First Conditional - will go." },
          { text: "If you boil water, it ___", options: ["evaporates", "evaporated", "will evaporate", "would evaporate"], correct: 0, explanation: "Zero Conditional - evaporates." },
          { text: "If he works hard, he ___ succeed.", options: ["will", "would", "could", "might"], correct: 0, explanation: "First Conditional - will succeed." },
          { text: "If you touch fire, you ___ burned.", options: ["get", "got", "will get", "would get"], correct: 0, explanation: "Zero Conditional - get." },
          { text: "If we leave now, we ___ catch the bus.", options: ["will", "would", "could", "might"], correct: 0, explanation: "First Conditional - will catch." }
        ],
        A2: [
          { text: "If I were rich, I ___ a car.", options: ["buy", "bought", "would buy", "will buy"], correct: 2, explanation: "Second Conditional - qeyri-mümkün indiki vəziyyət." },
          { text: "If I had money, I ___ travel.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would travel." },
          { text: "If I were you, I ___ go.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would go." },
          { text: "If she knew the answer, she ___ tell us.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would tell." },
          { text: "If I had a million dollars, I ___ buy a house.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would buy." },
          { text: "If he studied harder, he ___ pass the exam.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would pass." },
          { text: "If we lived in Paris, we ___ speak French.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would speak." },
          { text: "If she were here, she ___ help us.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would help." },
          { text: "If I had more time, I ___ exercise more.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would exercise." },
          { text: "If he spoke English, he ___ get a better job.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would get." },
          { text: "If she were taller, she ___ be a model.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would be." },
          { text: "If I knew his number, I ___ call him.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would call." },
          { text: "If we had a garden, we ___ grow vegetables.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would grow." },
          { text: "If he were younger, he ___ travel more.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would travel." },
          { text: "If I were the president, I ___ change many things.", options: ["will", "would", "could", "might"], correct: 1, explanation: "Second Conditional - would change." }
        ],
        B1: [
          { text: "If I had known, I ___ you.", options: ["tell", "told", "would have told", "will tell"], correct: 2, explanation: "Third Conditional - keçmişdə dəyişməyən hadisə." },
          { text: "If she had studied, she ___ passed.", options: ["would have", "will have", "would", "will"], correct: 0, explanation: "Third Conditional - would have passed." },
          { text: "If they had left earlier, they ___ missed the train.", options: ["wouldn't have", "would have", "will have", "won't have"], correct: 0, explanation: "Third Conditional - wouldn't have missed." },
          { text: "If he had apologized, I ___ forgiven him.", options: ["would have", "will have", "would", "will"], correct: 0, explanation: "Third Conditional - would have forgiven." },
          { text: "If we had taken a taxi, we ___ on time.", options: ["would have arrived", "will have arrived", "would arrive", "will arrive"], correct: 0, explanation: "Third Conditional - would have arrived." },
          { text: "If she had worn a coat, she ___ cold.", options: ["wouldn't have caught", "would have caught", "will catch", "would catch"], correct: 0, explanation: "Third Conditional - wouldn't have caught." },
          { text: "If they had invited me, I ___ gone.", options: ["would have", "will have", "would", "will"], correct: 0, explanation: "Third Conditional - would have gone." },
          { text: "If he had saved money, he ___ afford it.", options: ["could have", "will have", "would", "will"], correct: 0, explanation: "Third Conditional - could have afforded." },
          { text: "If we had known about the party, we ___ attended.", options: ["would have", "will have", "would", "will"], correct: 0, explanation: "Third Conditional - would have attended." },
          { text: "If she had taken the medicine, she ___ better.", options: ["would have felt", "will have felt", "would feel", "will feel"], correct: 0, explanation: "Third Conditional - would have felt." },
          { text: "If they had practiced more, they ___ won.", options: ["could have", "will have", "would", "will"], correct: 0, explanation: "Third Conditional - could have won." },
          { text: "If I had seen the sign, I ___ stopped.", options: ["would have", "will have", "would", "will"], correct: 0, explanation: "Third Conditional - would have stopped." },
          { text: "If she had listened carefully, she ___ understood.", options: ["would have", "will have", "would", "will"], correct: 0, explanation: "Third Conditional - would have understood." },
          { text: "If they had booked early, they ___ a better price.", options: ["would have gotten", "will have gotten", "would get", "will get"], correct: 0, explanation: "Third Conditional - would have gotten." },
          { text: "If he had trained harder, he ___ the race.", options: ["could have won", "will have won", "would win", "will win"], correct: 0, explanation: "Third Conditional - could have won." }
        ],
        B2: [
          { text: "Had I known, I ___ differently.", options: ["would have acted", "would act", "will act", "act"], correct: 0, explanation: "Inversion ilə Third Conditional." },
          { text: "Were she here, she ___ help.", options: ["would", "will", "can", "may"], correct: 0, explanation: "Inversion ilə Second Conditional." },
          { text: "Should you need anything, ___ me know.", options: ["let", "lets", "letting", "to let"], correct: 0, explanation: "Inversion ilə First Conditional." },
          { text: "Had it not been for you, I ___ failed.", options: ["would have", "would", "will have", "have"], correct: 0, explanation: "Inversion ilə Third Conditional - mənfi." },
          { text: "Were they to arrive, we ___ ready.", options: ["would be", "will be", "are", "were"], correct: 0, explanation: "Inversion ilə Second Conditional." },
          { text: "Had she apologized, I ___ forgiven her.", options: ["would have", "would", "will have", "have"], correct: 0, explanation: "Inversion ilə Third Conditional." },
          { text: "Should he call, ___ him I'm busy.", options: ["tell", "tells", "telling", "to tell"], correct: 0, explanation: "Inversion ilə First Conditional." },
          { text: "Were I rich, I ___ travel the world.", options: ["would", "will", "can", "may"], correct: 0, explanation: "Inversion ilə Second Conditional." },
          { text: "Had we left earlier, we ___ late.", options: ["wouldn't be", "won't be", "aren't", "weren't"], correct: 0, explanation: "Inversion ilə Third Conditional." },
          { text: "Were it not for his help, we ___ lost.", options: ["would have gotten", "would get", "will get", "get"], correct: 0, explanation: "Inversion ilə Third Conditional." },
          { text: "Should she arrive, ___ her to wait.", options: ["ask", "asks", "asking", "to ask"], correct: 0, explanation: "Inversion ilə First Conditional." },
          { text: "Had they seen the sign, they ___ stopped.", options: ["would have", "would", "will have", "have"], correct: 0, explanation: "Inversion ilə Third Conditional." },
          { text: "Were he the manager, he ___ change things.", options: ["would", "will", "can", "may"], correct: 0, explanation: "Inversion ilə Second Conditional." },
          { text: "Had she studied, she ___ passed.", options: ["would have", "would", "will have", "have"], correct: 0, explanation: "Inversion ilə Third Conditional." },
          { text: "Should it rain, we ___ cancel.", options: ["will", "would", "could", "might"], correct: 0, explanation: "Inversion ilə First Conditional." }
        ],
        C1: [
          { text: "If only I ___ more time.", options: ["had", "have", "has", "having"], correct: 0, explanation: "If only + Past Simple - arzu." },
          { text: "I wish I ___ taller.", options: ["were", "was", "is", "are"], correct: 0, explanation: "Wish + Past Subjunctive - were." },
          { text: "She wishes she ___ harder.", options: ["had studied", "studied", "studies", "study"], correct: 0, explanation: "Keçmiş üçün peşmançılıq - Past Perfect." },
          { text: "If only they ___ on time.", options: ["had arrived", "arrived", "arrive", "arrives"], correct: 0, explanation: "Keçmiş peşmançılıq - Past Perfect." },
          { text: "I'd rather you ___ quiet.", options: ["kept", "keep", "keeps", "keeping"], correct: 0, explanation: "I'd rather + Past Simple - başqasının hərəkəti." },
          { text: "Suppose she ___ late, what would we do?", options: ["were", "was", "is", "are"], correct: 0, explanation: "Suppose + Past Subjunctive - were." },
          { text: "Imagine we ___ unlimited resources.", options: ["had", "have", "has", "having"], correct: 0, explanation: "Imagine + Past Simple - xəyali vəziyyət." },
          { text: "It's time we ___ home.", options: ["went", "go", "goes", "going"], correct: 0, explanation: "It's time + Past Simple - indi vaxtıdır." },
          { text: "I'd sooner he ___ alone.", options: ["went", "go", "goes", "going"], correct: 0, explanation: "I'd sooner + Past Simple - üstünlük." },
          { text: "If only she ___ the truth.", options: ["had told", "told", "tells", "tell"], correct: 0, explanation: "Keçmiş peşmançılıq - Past Perfect." },
          { text: "I wish they ___ quieter.", options: ["were", "was", "is", "are"], correct: 0, explanation: "Wish + Past Subjunctive - were." },
          { text: "She'd rather I ___ smoking.", options: ["stopped", "stop", "stops", "stopping"], correct: 0, explanation: "Would rather + Past Simple." },
          { text: "Suppose he ___ , what would you say?", options: ["came", "come", "comes", "coming"], correct: 0, explanation: "Suppose + Past Simple - xəyali vəziyyət." },
          { text: "It's high time we ___ action.", options: ["took", "take", "takes", "taking"], correct: 0, explanation: "It's high time + Past Simple." },
          { text: "If only I ___ that mistake.", options: ["hadn't made", "didn't make", "haven't made", "wasn't made"], correct: 0, explanation: "Keçmiş peşmançılıq - Past Perfect mənfi." }
        ]
      },
      'Passive Voice': {
        A1: [
          { text: "The book ___ by him.", options: ["writes", "was written", "wrote", "is written"], correct: 1, explanation: "Keçmiş zaman passiv - was written." },
          { text: "The room ___ cleaned yesterday.", options: ["is", "was", "has", "were"], correct: 1, explanation: "Yesterday keçmiş zaman - was cleaned." },
          { text: "The cake ___ by my mom.", options: ["made", "was made", "is making", "makes"], correct: 1, explanation: "Passive voice - was made." },
          { text: "English ___ worldwide.", options: ["speaks", "is spoken", "spoke", "spoken"], correct: 1, explanation: "Present Simple passive - is spoken." },
          { text: "The car ___ repaired.", options: ["was", "has", "had", "is"], correct: 0, explanation: "The car was repaired - passiv." },
          { text: "The window ___ broken.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Keçmiş zaman passiv - was broken." },
          { text: "The song ___ sung well.", options: ["is", "was", "were", "has"], correct: 1, explanation: "The song was sung - passiv." },
          { text: "The house ___ built in 1990.", options: ["is", "was", "has", "were"], correct: 1, explanation: "1990 keçmiş zaman - was built." },
          { text: "The food ___ served hot.", options: ["is", "was", "has", "were"], correct: 0, explanation: "Present Simple passive - is served." },
          { text: "The phone ___ stolen.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Passive voice - was stolen." },
          { text: "The letter ___ written by John.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Keçmiş zaman passiv - was written." },
          { text: "The movie ___ directed by Spielberg.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Passive - was directed." },
          { text: "The car ___ driven by my father.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Keçmiş zaman passiv." },
          { text: "The lesson ___ taught by Ms. Smith.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Passive voice." },
          { text: "The dog ___ fed every morning.", options: ["is", "was", "were", "has"], correct: 0, explanation: "Present Simple passive - is fed." }
        ],
        A2: [
          { text: "The letter ___ sent already.", options: ["is", "was", "has been", "will be"], correct: 2, explanation: "Already ilə Present Perfect passive - has been sent." },
          { text: "A new bridge ___ built.", options: ["is being", "was being", "has been", "will be"], correct: 0, explanation: "Present Continuous passive - is being built." },
          { text: "The work ___ finished by 5 PM.", options: ["will be", "is being", "was being", "has been"], correct: 0, explanation: "Future Simple passive - will be finished." },
          { text: "The cookies ___ eaten by the children.", options: ["were", "was", "is", "are"], correct: 0, explanation: "Past Simple passive - were eaten." },
          { text: "The problem ___ solved yet.", options: ["hasn't been", "isn't", "wasn't", "won't be"], correct: 0, explanation: "Yet ilə Present Perfect passive - hasn't been solved." },
          { text: "The package ___ delivered tomorrow.", options: ["will be", "is", "was", "has been"], correct: 0, explanation: "Tomorrow gələcək zaman - will be delivered." },
          { text: "The report ___ written by the assistant.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive - was written." },
          { text: "The house ___ painted right now.", options: ["is being", "was being", "has been", "will be"], correct: 0, explanation: "Hazırda davam edir - is being painted." },
          { text: "The documents ___ signed by the manager.", options: ["were", "was", "is", "are"], correct: 0, explanation: "Past Simple passive - were signed." },
          { text: "The meeting ___ held next Monday.", options: ["will be", "is", "was", "has been"], correct: 0, explanation: "Future Simple passive - will be held." },
          { text: "The flowers ___ watered every day.", options: ["are", "is", "was", "were"], correct: 0, explanation: "Present Simple passive - are watered." },
          { text: "The answer ___ known by everyone.", options: ["is", "was", "were", "are"], correct: 0, explanation: "Present Simple passive - is known." },
          { text: "The game ___ cancelled due to rain.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive - was cancelled." },
          { text: "The money ___ stolen from the bank.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Passive voice - was stolen." },
          { text: "The cake ___ made by my grandmother.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive." }
        ],
        B1: [
          { text: "The project ___ finished by the time you arrive.", options: ["will have been", "will be", "is", "was"], correct: 0, explanation: "Future Perfect passive - will have been finished." },
          { text: "The car ___ repaired when I saw it.", options: ["was being", "is being", "has been", "will be"], correct: 0, explanation: "Past Continuous passive - was being repaired." },
          { text: "The letter ___ sent before you called.", options: ["had been", "has been", "was", "is"], correct: 0, explanation: "Past Perfect passive - had been sent." },
          { text: "The house ___ built for two years now.", options: ["has been being", "is being", "was being", "will be"], correct: 0, explanation: "Present Perfect Continuous passive." },
          { text: "The decision ___ made by the committee.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive." },
          { text: "The problem ___ discussed at the meeting.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Passive voice." },
          { text: "The tickets ___ sold out already.", options: ["have been", "has been", "was", "were"], correct: 0, explanation: "Present Perfect passive - have been sold." },
          { text: "The book ___ translated into 20 languages.", options: ["has been", "have been", "was", "were"], correct: 0, explanation: "Present Perfect passive - has been translated." },
          { text: "The patient ___ taken to the hospital.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive." },
          { text: "The event ___ organized by the students.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Passive voice." },
          { text: "The truth ___ revealed eventually.", options: ["will be", "is", "was", "has been"], correct: 0, explanation: "Future Simple passive." },
          { text: "The product ___ launched last month.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive." },
          { text: "The documents ___ prepared by the lawyer.", options: ["were", "was", "is", "are"], correct: 0, explanation: "Passive voice - were prepared." },
          { text: "The song ___ recorded in London.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive." },
          { text: "The contract ___ signed yesterday.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Yesterday keçmiş zaman - was signed." }
        ],
        B2: [
          { text: "The matter ___ taken care of by the time you return.", options: ["will have been", "will be", "has been", "had been"], correct: 0, explanation: "Future Perfect passive." },
          { text: "The building ___ renovated when the earthquake struck.", options: ["was being", "is being", "has been", "had been"], correct: 0, explanation: "Past Continuous passive." },
          { text: "The package ___ delivered before you called.", options: ["had been", "has been", "was", "is"], correct: 0, explanation: "Past Perfect passive." },
          { text: "The matter ___ discussed at the moment.", options: ["is being", "was being", "has been", "will be"], correct: 0, explanation: "Present Continuous passive." },
          { text: "The results ___ announced by next week.", options: ["will have been", "will be", "have been", "had been"], correct: 0, explanation: "Future Perfect passive." },
          { text: "The suspect ___ questioned for hours.", options: ["has been being", "is being", "was being", "had been"], correct: 0, explanation: "Present Perfect Continuous passive." },
          { text: "The offer ___ considered by the board.", options: ["is being", "was being", "has been", "will be"], correct: 0, explanation: "Present Continuous passive." },
          { text: "The message ___ sent before you arrived.", options: ["had been", "has been", "was", "is"], correct: 0, explanation: "Past Perfect passive." },
          { text: "The plan ___ approved by the committee.", options: ["has been", "have been", "was", "were"], correct: 0, explanation: "Present Perfect passive." },
          { text: "The issue ___ resolved by the end of the day.", options: ["will have been", "will be", "has been", "had been"], correct: 0, explanation: "Future Perfect passive." },
          { text: "The project ___ completed before the deadline.", options: ["had been", "has been", "was", "is"], correct: 0, explanation: "Past Perfect passive." },
          { text: "The painting ___ stolen from the museum.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive." },
          { text: "The decision ___ made by the CEO.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Passive voice." },
          { text: "The new policy ___ implemented next month.", options: ["will be", "is", "was", "has been"], correct: 0, explanation: "Future Simple passive." },
          { text: "The homework ___ done by the students.", options: ["was", "is", "are", "were"], correct: 0, explanation: "Past Simple passive." }
        ],
        C1: [
          { text: "It ___ believed that the company will go bankrupt.", options: ["is", "was", "has", "had"], correct: 0, explanation: "Impersonal passive - It is believed that..." },
          { text: "The suspect ___ to be armed and dangerous.", options: ["is believed", "was believed", "has believed", "had believed"], correct: 0, explanation: "Passive with infinitive - is believed to be." },
          { text: "The meeting ___ to have been cancelled.", options: ["is said", "was said", "has said", "had said"], correct: 0, explanation: "Passive with infinitive - is said to have been." },
          { text: "The building ___ to be haunted.", options: ["is thought", "was thought", "has thought", "had thought"], correct: 0, explanation: "Passive with infinitive - is thought to be." },
          { text: "The accident ___ to have been caused by negligence.", options: ["is reported", "was reported", "has reported", "had reported"], correct: 0, explanation: "Passive with infinitive." },
          { text: "The painting ___ to be a fake.", options: ["is considered", "was considered", "has considered", "had considered"], correct: 0, explanation: "Passive with infinitive." },
          { text: "The company ___ to be losing money.", options: ["is known", "was known", "has known", "had known"], correct: 0, explanation: "Passive with infinitive." },
          { text: "The prisoners ___ to have escaped.", options: ["are believed", "were believed", "have believed", "had believed"], correct: 0, explanation: "Present passive with infinitive." },
          { text: "The treasure ___ to be hidden in the cave.", options: ["is said", "was said", "has said", "had said"], correct: 0, explanation: "Passive with infinitive." },
          { text: "She ___ to have written the novel.", options: ["is alleged", "was alleged", "has alleged", "had alleged"], correct: 0, explanation: "Allege + passive with infinitive." },
          { text: "The suspect ___ to have left the country.", options: ["is thought", "was thought", "has thought", "had thought"], correct: 0, explanation: "Passive with infinitive." },
          { text: "The event ___ to have been a success.", options: ["is considered", "was considered", "has considered", "had considered"], correct: 0, explanation: "Passive with infinitive." },
          { text: "The manuscript ___ to be authentic.", options: ["is believed", "was believed", "has believed", "had believed"], correct: 0, explanation: "Passive with infinitive." },
          { text: "The prisoners ___ to be released tomorrow.", options: ["are expected", "were expected", "have expected", "had expected"], correct: 0, explanation: "Passive with infinitive - are expected to be." },
          { text: "The deal ___ to have fallen through.", options: ["is reported", "was reported", "has reported", "had reported"], correct: 0, explanation: "Passive with infinitive." }
        ]
      },
      'Reported Speech': {
        A1: [
          { text: "She said she ___ tired.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Present Simple → Past Simple: is → was." },
          { text: "He said he ___ coming.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Present Continuous → Past Continuous: is coming → was coming." },
          { text: "They said they ___ finished.", options: ["have", "had", "has", "will"], correct: 1, explanation: "Present Perfect → Past Perfect: have finished → had finished." },
          { text: "She said she ___ help.", options: ["will", "would", "can", "may"], correct: 1, explanation: "Future Simple → would: will help → would help." },
          { text: "He said he ___ seen it.", options: ["has", "had", "have", "will"], correct: 1, explanation: "Present Perfect → Past Perfect: has seen → had seen." },
          { text: "She said she ___ busy.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Present Simple → Past Simple: is → was." },
          { text: "They said they ___ late.", options: ["are", "were", "will", "would"], correct: 1, explanation: "Present Simple → Past Simple: are → were." },
          { text: "He said he ___ go.", options: ["will", "would", "can", "may"], correct: 1, explanation: "Future → would." },
          { text: "She said she ___ happy.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Present → Past." },
          { text: "They said they ___ try.", options: ["will", "would", "can", "may"], correct: 1, explanation: "Will → would." },
          { text: "He said he ___ know.", options: ["does", "did", "will", "would"], correct: 1, explanation: "Present → Past: does → did." },
          { text: "She said she ___ seen him.", options: ["has", "had", "have", "will"], correct: 1, explanation: "Has seen → had seen." },
          { text: "They said they ___ finished.", options: ["are", "had", "were", "have"], correct: 1, explanation: "Present Perfect → Past Perfect." },
          { text: "He said he ___ ready.", options: ["is", "was", "were", "has"], correct: 1, explanation: "Is → was." },
          { text: "She said she ___ call.", options: ["will", "would", "can", "may"], correct: 1, explanation: "Will → would." }
        ],
        A2: [
          { text: "He asked me where ___ going.", options: ["I was", "was I", "I am", "am I"], correct: 0, explanation: "Reported question: where I was going." },
          { text: "She asked if ___ coffee.", options: ["I liked", "did I like", "I like", "do I like"], correct: 0, explanation: "Yes/No question: if I liked." },
          { text: "He told me ___ quiet.", options: ["to be", "be", "being", "been"], correct: 0, explanation: "Imperative: told me to be quiet." },
          { text: "She said that she ___ to Paris.", options: ["had never been", "has never been", "never went", "never goes"], correct: 0, explanation: "Present Perfect → Past Perfect." },
          { text: "He asked me what ___ doing.", options: ["I was", "was I", "I am", "am I"], correct: 0, explanation: "Reported question: what I was doing." },
          { text: "She asked if ___ the answer.", options: ["I knew", "did I know", "I know", "do I know"], correct: 0, explanation: "If I knew the answer." },
          { text: "He told us ___ wait.", options: ["to", "for", "at", "in"], correct: 0, explanation: "Told us to wait." },
          { text: "She said that she ___ her keys.", options: ["had lost", "has lost", "lost", "loses"], correct: 0, explanation: "Has lost → had lost." },
          { text: "He asked where ___ parked.", options: ["I had", "had I", "I have", "have I"], correct: 0, explanation: "Where I had parked." },
          { text: "She asked if ___ hungry.", options: ["I was", "was I", "I am", "am I"], correct: 0, explanation: "If I was hungry." },
          { text: "He told me ___ the door.", options: ["to close", "close", "closing", "closed"], correct: 0, explanation: "Told me to close the door." },
          { text: "She said that she ___ come.", options: ["would", "will", "can", "may"], correct: 0, explanation: "Will → would." },
          { text: "He asked me what ___ wanted.", options: ["I", "me", "my", "mine"], correct: 0, explanation: "What I wanted." },
          { text: "She asked if ___ to the party.", options: ["I was going", "was I going", "I go", "do I go"], correct: 0, explanation: "If I was going." },
          { text: "He told her ___ smoking.", options: ["to stop", "stop", "stopping", "stopped"], correct: 0, explanation: "Told her to stop smoking." }
        ],
        B1: [
          { text: "She said, 'I will call you tomorrow.' Reported: She said ___ call me the next day.", options: ["she would", "she will", "I would", "I will"], correct: 0, explanation: "Pronoun and tense change: I → she, will → would." },
          { text: "He asked, 'Do you like pizza?' Reported: He asked if ___ pizza.", options: ["I liked", "did I like", "I like", "do I like"], correct: 0, explanation: "Question in past tense: if I liked." },
          { text: "She told me, 'Don't be late.' Reported: She told me ___ late.", options: ["not to be", "to not be", "don't be", "not be"], correct: 0, explanation: "Negative imperative: not to be late." },
          { text: "He said, 'I am leaving now.' Reported: He said ___ leaving then.", options: ["he was", "he is", "I was", "I am"], correct: 0, explanation: "Present Continuous → Past Continuous, now → then." },
          { text: "She asked, 'Where do you live?' Reported: She asked where ___ live.", options: ["I lived", "did I live", "I live", "do I live"], correct: 0, explanation: "Where I lived." },
          { text: "He said, 'I have finished my work.' Reported: He said that he ___ his work.", options: ["had finished", "has finished", "finished", "finishes"], correct: 0, explanation: "Present Perfect → Past Perfect." },
          { text: "She said, 'I can swim.' Reported: She said that she ___ swim.", options: ["could", "can", "might", "should"], correct: 0, explanation: "Can → could." },
          { text: "He asked, 'Will you help me?' Reported: He asked if ___ help him.", options: ["I would", "would I", "I will", "will I"], correct: 0, explanation: "If I would help him." },
          { text: "She said, 'I may be late.' Reported: She said that she ___ be late.", options: ["might", "may", "could", "would"], correct: 0, explanation: "May → might." },
          { text: "He told her, 'Open the window.' Reported: He told her ___ the window.", options: ["to open", "open", "opening", "opened"], correct: 0, explanation: "Told her to open." },
          { text: "She asked, 'What time is it?' Reported: She asked what time ___ .", options: ["it was", "was it", "it is", "is it"], correct: 0, explanation: "What time it was." },
          { text: "He said, 'I must go now.' Reported: He said that he ___ go then.", options: ["had to", "must", "should", "could"], correct: 0, explanation: "Must → had to." },
          { text: "She said, 'I was sleeping.' Reported: She said that she ___ sleeping.", options: ["had been", "was", "has been", "is"], correct: 0, explanation: "Past Continuous → Past Perfect Continuous." },
          { text: "He asked, 'Have you seen the movie?' Reported: He asked if ___ seen the movie.", options: ["I had", "had I", "I have", "have I"], correct: 0, explanation: "If I had seen." },
          { text: "She said, 'I'll be there.' Reported: She said that she ___ there.", options: ["would be", "will be", "is", "was"], correct: 0, explanation: "Will → would." }
        ],
        B2: [
          { text: "He said, 'I would help if I could.' Reported: He said that he ___ help if he could.", options: ["would", "will", "can", "may"], correct: 0, explanation: "Would remains would in reported speech." },
          { text: "She said, 'I might come later.' Reported: She said that she ___ come later.", options: ["might", "may", "could", "would"], correct: 0, explanation: "Might remains might." },
          { text: "He asked, 'What were you doing?' Reported: He asked what ___ doing.", options: ["I had been", "was I", "I was", "had I been"], correct: 0, explanation: "Past Continuous → Past Perfect Continuous." },
          { text: "She said, 'I wish I knew.' Reported: She said that she ___ she knew.", options: ["wished", "wishes", "wish", "wishing"], correct: 0, explanation: "Wish remains wish with tense backshift." },
          { text: "He said, 'I had already eaten.' Reported: He said that he ___ already eaten.", options: ["had", "has", "have", "was"], correct: 0, explanation: "Past Perfect remains Past Perfect." },
          { text: "She asked, 'Would you like some tea?' Reported: She asked if ___ some tea.", options: ["I would like", "would I like", "I like", "do I like"], correct: 0, explanation: "If I would like." },
          { text: "He said, 'Let's go to the cinema.' Reported: He suggested ___ to the cinema.", options: ["going", "to go", "go", "went"], correct: 0, explanation: "Suggest + gerund: going." },
          { text: "She said, 'Congratulations!' Reported: She ___ me.", options: ["congratulated", "said", "told", "asked"], correct: 0, explanation: "Reporting verb: congratulated." },
          { text: "He said, 'I must have left it at home.' Reported: He said that he ___ have left it at home.", options: ["must", "had to", "should", "could"], correct: 0, explanation: "Must for deduction remains must." },
          { text: "She said, 'You should see a doctor.' Reported: She said that I ___ see a doctor.", options: ["should", "would", "could", "might"], correct: 0, explanation: "Should remains should." },
          { text: "He asked, 'Where shall we meet?' Reported: He asked where ___ meet.", options: ["they should", "should they", "they would", "would they"], correct: 0, explanation: "Where they should meet." },
          { text: "She said, 'I used to live in London.' Reported: She said that she ___ to live in London.", options: ["used", "use", "was using", "had used"], correct: 0, explanation: "Used to remains used to." },
          { text: "He said, 'I would rather stay home.' Reported: He said that he ___ rather stay home.", options: ["would", "will", "could", "might"], correct: 0, explanation: "Would rather remains." },
          { text: "She asked, 'How long have you been waiting?' Reported: She asked how long ___ been waiting.", options: ["I had", "had I", "I have", "have I"], correct: 0, explanation: "How long I had been waiting." },
          { text: "He said, 'I don't like it.' Reported: He said that he ___ like it.", options: ["didn't", "doesn't", "don't", "hadn't"], correct: 0, explanation: "Present → Past: don't → didn't." }
        ],
        C1: [
          { text: "She said, 'Had I known, I would have acted differently.' Reported: She said that if she ___ known, she would have acted differently.", options: ["had", "have", "has", "having"], correct: 0, explanation: "Conditional inversion remains." },
          { text: "He said, 'Were I rich, I would travel.' Reported: He said that if he ___ rich, he would travel.", options: ["were", "was", "is", "are"], correct: 0, explanation: "Were remains were." },
          { text: "She said, 'Should you need anything, call me.' Reported: She said that if I ___ anything, to call her.", options: ["should need", "needed", "need", "have needed"], correct: 0, explanation: "Should remains in reported speech." },
          { text: "He said, 'It's high time we left.' Reported: He said that it was high time they ___ .", options: ["left", "leave", "leaving", "to leave"], correct: 0, explanation: "Past subjunctive remains." },
          { text: "She said, 'I'd rather you didn't smoke.' Reported: She said that she'd rather I ___ smoke.", options: ["didn't", "don't", "wouldn't", "couldn't"], correct: 0, explanation: "Would rather + past remains." },
          { text: "He asked, 'What if it rained?' Reported: He asked what would happen if it ___ .", options: ["rained", "rains", "rain", "raining"], correct: 0, explanation: "Past subjunctive remains." },
          { text: "She said, 'So be it.' Reported: She said that so ___ it.", options: ["be", "is", "was", "were"], correct: 0, explanation: "Subjunctive remains be." },
          { text: "He said, 'Come what may, I'll be there.' Reported: He said that come what ___, he would be there.", options: ["may", "might", "could", "would"], correct: 0, explanation: "Come what may remains." },
          { text: "She said, 'Be that as it may...' Reported: She said that be that as it ___ .", options: ["may", "might", "could", "would"], correct: 0, explanation: "Fixed expression remains." },
          { text: "He said, 'If only I had listened.' Reported: He said that if only he ___ listened.", options: ["had", "have", "has", "having"], correct: 0, explanation: "If only + past perfect remains." },
          { text: "She said, 'I wish I were younger.' Reported: She said that she wished she ___ younger.", options: ["were", "was", "is", "are"], correct: 0, explanation: "Were remains were." },
          { text: "He said, 'It's time we went home.' Reported: He said that it was time they ___ home.", options: ["went", "go", "gone", "going"], correct: 0, explanation: "It's time + past remains." },
          { text: "She said, 'I would sooner die than surrender.' Reported: She said that she would sooner die than ___ .", options: ["surrender", "surrendered", "surrendering", "to surrender"], correct: 0, explanation: "Would sooner + infinitive remains." },
          { text: "He said, 'Suppose he were to find out.' Reported: He asked what would happen if he ___ to find out.", options: ["were", "was", "is", "are"], correct: 0, explanation: "Were to remains." },
          { text: "She said, 'Long may he reign.' Reported: She said that long ___ he reign.", options: ["may", "might", "could", "would"], correct: 0, explanation: "May remains in fixed expression." }
        ]
      },
      'Prepositions': {
        A1: [
          { text: "He is good ___ math.", options: ["in", "at", "on", "for"], correct: 1, explanation: "Good at - bir şeydə yaxşı olmaq." },
          { text: "She arrived ___ Monday.", options: ["in", "on", "at", "for"], correct: 1, explanation: "On + day - günlərdə on işlənir." },
          { text: "The book is ___ the table.", options: ["in", "on", "at", "under"], correct: 1, explanation: "On the table - masanın üstündə." },
          { text: "We live ___ Baku.", options: ["at", "in", "on", "to"], correct: 1, explanation: "In + city - şəhər adında in işlənir." },
          { text: "He is afraid ___ dogs.", options: ["of", "from", "with", "at"], correct: 0, explanation: "Afraid of - qorxmaq." },
          { text: "She is interested ___ art.", options: ["in", "on", "at", "for"], correct: 0, explanation: "Interested in - maraqlanmaq." },
          { text: "He depends ___ me.", options: ["on", "in", "at", "for"], correct: 0, explanation: "Depend on - asılı olmaq." },
          { text: "The cat is ___ the box.", options: ["in", "on", "at", "under"], correct: 0, explanation: "In the box - qutunun içində." },
          { text: "She was born ___ 2005.", options: ["in", "on", "at", "for"], correct: 0, explanation: "In + year - illərdə in işlənir." },
          { text: "We met ___ night.", options: ["at", "on", "in", "for"], correct: 0, explanation: "At night - gecə vaxtı." },
          { text: "He is married ___ her.", options: ["to", "with", "at", "for"], correct: 0, explanation: "Married to - evli olmaq." },
          { text: "The shop is ___ the corner.", options: ["on", "in", "at", "to"], correct: 0, explanation: "On the corner - küncdə." },
          { text: "She laughed ___ the joke.", options: ["at", "on", "in", "for"], correct: 0, explanation: "Laugh at - gülmək." },
          { text: "I'm tired ___ work.", options: ["of", "from", "with", "at"], correct: 0, explanation: "Tired of - bezmək, cansıxıcı olmaq." },
          { text: "He apologized ___ me.", options: ["to", "for", "with", "at"], correct: 0, explanation: "Apologize to - üzr istəmək." }
        ],
        A2: [
          { text: "She is waiting ___ the bus stop.", options: ["at", "in", "on", "for"], correct: 0, explanation: "At the bus stop - dayanacaqda." },
          { text: "He is going ___ school.", options: ["to", "at", "in", "on"], correct: 0, explanation: "Go to school - məktəbə getmək." },
          { text: "The picture is ___ the wall.", options: ["on", "in", "at", "to"], correct: 0, explanation: "On the wall - divarda." },
          { text: "She is sitting ___ the chair.", options: ["on", "in", "at", "to"], correct: 0, explanation: "On the chair - stulda." },
          { text: "He is ___ home.", options: ["at", "in", "on", "to"], correct: 0, explanation: "At home - evdə." },
          { text: "She is ___ the phone.", options: ["on", "in", "at", "to"], correct: 0, explanation: "On the phone - telefonda." },
          { text: "He is ___ vacation.", options: ["on", "in", "at", "to"], correct: 0, explanation: "On vacation - tətildə." },
          { text: "She is good ___ English.", options: ["at", "in", "on", "for"], correct: 0, explanation: "Good at - yaxşı olmaq." },
          { text: "He is interested ___ learning.", options: ["in", "on", "at", "for"], correct: 0, explanation: "Interested in - maraqlanmaq." },
          { text: "She is afraid ___ spiders.", options: ["of", "from", "with", "at"], correct: 0, explanation: "Afraid of - qorxmaq." },
          { text: "He is responsible ___ the team.", options: ["for", "of", "with", "at"], correct: 0, explanation: "Responsible for - məsul olmaq." },
          { text: "She is married ___ a doctor.", options: ["to", "with", "at", "for"], correct: 0, explanation: "Married to - evli olmaq." },
          { text: "He apologized ___ being late.", options: ["for", "to", "with", "at"], correct: 0, explanation: "Apologize for - görə üzr istəmək." },
          { text: "She is looking ___ her keys.", options: ["for", "at", "to", "in"], correct: 0, explanation: "Look for - axtarmaq." },
          { text: "He is listening ___ music.", options: ["to", "at", "in", "on"], correct: 0, explanation: "Listen to - dinləmək." }
        ],
        B1: [
          { text: "She is accustomed ___ waking up early.", options: ["to", "with", "at", "for"], correct: 0, explanation: "Accustomed to - öyrəşmiş." },
          { text: "He is capable ___ doing the job.", options: ["of", "to", "with", "at"], correct: 0, explanation: "Capable of - bacarıqlı." },
          { text: "She is concerned ___ her health.", options: ["about", "with", "at", "for"], correct: 0, explanation: "Concerned about - narahat olmaq." },
          { text: "He is famous ___ his work.", options: ["for", "of", "with", "at"], correct: 0, explanation: "Famous for - məşhur." },
          { text: "She is proud ___ her son.", options: ["of", "with", "at", "for"], correct: 0, explanation: "Proud of - qürur duymaq." },
          { text: "He is responsible ___ the project.", options: ["for", "of", "with", "at"], correct: 0, explanation: "Responsible for - məsul." },
          { text: "She is satisfied ___ the results.", options: ["with", "of", "at", "for"], correct: 0, explanation: "Satisfied with - razı olmaq." },
          { text: "He is similar ___ his father.", options: ["to", "with", "at", "for"], correct: 0, explanation: "Similar to - oxşar." },
          { text: "She is tired ___ waiting.", options: ["of", "from", "with", "at"], correct: 0, explanation: "Tired of - bezmiş." },
          { text: "He is worried ___ the exam.", options: ["about", "of", "with", "at"], correct: 0, explanation: "Worried about - narahat olmaq." },
          { text: "She apologized ___ coming late.", options: ["for", "to", "with", "at"], correct: 0, explanation: "Apologize for - görə üzr istəmək." },
          { text: "He is looking forward ___ the trip.", options: ["to", "for", "at", "in"], correct: 0, explanation: "Look forward to - səbirsizliklə gözləmək." },
          { text: "She is thinking ___ changing her job.", options: ["about", "of", "with", "at"], correct: 0, explanation: "Think about - düşünmək." },
          { text: "He succeeded ___ passing the exam.", options: ["in", "at", "to", "with"], correct: 0, explanation: "Succeed in - uğur qazanmaq." },
          { text: "She is suffering ___ a cold.", options: ["from", "of", "with", "at"], correct: 0, explanation: "Suffer from - əziyyət çəkmək." }
        ],
        B2: [
          { text: "He is abstaining ___ voting.", options: ["from", "to", "with", "at"], correct: 0, explanation: "Abstain from - çəkinmək." },
          { text: "She is accused ___ theft.", options: ["of", "for", "with", "at"], correct: 0, explanation: "Accused of - ittiham olunmaq." },
          { text: "He is addicted ___ smoking.", options: ["to", "with", "at", "for"], correct: 0, explanation: "Addicted to - asılı olmaq." },
          { text: "She is admired ___ her courage.", options: ["for", "of", "with", "at"], correct: 0, explanation: "Admired for - heyran olunmaq." },
          { text: "He is anxious ___ the results.", options: ["about", "of", "with", "at"], correct: 0, explanation: "Anxious about - narahat olmaq." },
          { text: "She is aware ___ the problem.", options: ["of", "about", "with", "at"], correct: 0, explanation: "Aware of - xəbərdar olmaq." },
          { text: "He is blamed ___ the accident.", options: ["for", "of", "with", "at"], correct: 0, explanation: "Blamed for - günahlandırılmaq." },
          { text: "She is committed ___ her work.", options: ["to", "with", "at", "for"], correct: 0, explanation: "Committed to - bağlı olmaq." },
          { text: "He is composed ___ many parts.", options: ["of", "from", "with", "at"], correct: 0, explanation: "Composed of - ibarət olmaq." },
          { text: "She is concerned ___ the environment.", options: ["about", "of", "with", "at"], correct: 0, explanation: "Concerned about - narahat." },
          { text: "He is connected ___ the internet.", options: ["to", "with", "at", "for"], correct: 0, explanation: "Connected to - qoşulmuş." },
          { text: "She is covered ___ dust.", options: ["with", "of", "by", "in"], correct: 0, explanation: "Covered with - örtülmüş." },
          { text: "He is deprived ___ sleep.", options: ["of", "from", "with", "at"], correct: 0, explanation: "Deprived of - məhrum olmaq." },
          { text: "She is derived ___ a Latin word.", options: ["from", "of", "with", "at"], correct: 0, explanation: "Derived from - alınmaq." },
          { text: "He is different ___ his brother.", options: ["from", "to", "than", "with"], correct: 0, explanation: "Different from - fərqli olmaq." }
        ],
        C1: [
          { text: "He is synonymous ___ excellence.", options: ["with", "to", "for", "of"], correct: 0, explanation: "Synonymous with - sinonim olmaq." },
          { text: "She is tantamount ___ a confession.", options: ["to", "with", "as", "for"], correct: 0, explanation: "Tantamount to - bərabər olmaq." },
          { text: "He is vested ___ authority.", options: ["with", "in", "by", "of"], correct: 0, explanation: "Vested with - səlahiyyət verilmiş." },
          { text: "She is wanting ___ common sense.", options: ["in", "of", "for", "with"], correct: 0, explanation: "Wanting in - çatışmayan." },
          { text: "He is worthy ___ praise.", options: ["of", "for", "to", "with"], correct: 0, explanation: "Worthy of - layiq." },
          { text: "She is zealous ___ her cause.", options: ["for", "of", "in", "with"], correct: 0, explanation: "Zealous for - həvəsli." },
          { text: "He is bereft ___ hope.", options: ["of", "from", "with", "at"], correct: 0, explanation: "Bereft of - məhrum." },
          { text: "She is cognizant ___ the facts.", options: ["of", "about", "with", "to"], correct: 0, explanation: "Cognizant of - məlumatlı." },
          { text: "He is conducive ___ learning.", options: ["to", "for", "with", "at"], correct: 0, explanation: "Conducive to - əlverişli." },
          { text: "She is conversant ___ the rules.", options: ["with", "in", "of", "about"], correct: 0, explanation: "Conversant with - bələd." },
          { text: "He is devoid ___ meaning.", options: ["of", "from", "with", "at"], correct: 0, explanation: "Devoid of - məhrum." },
          { text: "She is discerning ___ quality.", options: ["of", "in", "about", "with"], correct: 0, explanation: "Discerning of - fərq edən." },
          { text: "He is endowed ___ talent.", options: ["with", "by", "of", "from"], correct: 0, explanation: "Endowed with - bəxş edilmiş." },
          { text: "She is engrossed ___ her book.", options: ["in", "with", "by", "at"], correct: 0, explanation: "Engrossed in - dalmaq." },
          { text: "He is fraught ___ danger.", options: ["with", "of", "by", "from"], correct: 0, explanation: "Fraught with - dolu olmaq." }
        ]
      },
      'Articles': {
        A1: [
          { text: "She is ___ doctor.", options: ["a", "an", "the", "none"], correct: 0, explanation: "Peşə adından əvvəl a işlənir." },
          { text: "I saw ___ elephant.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Elephant sait səsi ilə başlayır - an." },
          { text: "___ sun is bright.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Unikal şey - the sun." },
          { text: "He bought ___ car.", options: ["a", "an", "the", "none"], correct: 0, explanation: "İlk dəfə qeyd olunur - a car." },
          { text: "She has ___ umbrella.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Umbrella sait səsi ilə başlayır - an." },
          { text: "___ Earth is round.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Planet adı - the Earth." },
          { text: "I need ___ pen.", options: ["a", "an", "the", "none"], correct: 0, explanation: "Tək sayda isim - a pen." },
          { text: "She is ___ honest woman.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Honest-də h səslənmir - an honest." },
          { text: "___ moon is full.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Unikal səma cismi - the moon." },
          { text: "He found ___ job.", options: ["a", "an", "the", "none"], correct: 0, explanation: "İlk dəfə qeyd olunur - a job." },
          { text: "She adopted ___ cat.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A cat - bir pişik." },
          { text: "___ water is cold.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Xüsusi su - the water." },
          { text: "He is ___ engineer.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Engineer sait səsi - an." },
          { text: "She read ___ book.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A book - bir kitab." },
          { text: "___ sky is blue.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Unikal şey - the sky." }
        ],
        A2: [
          { text: "I saw ___ movie last night.", options: ["a", "an", "the", "none"], correct: 0, explanation: "İlk dəfə qeyd olunur - a movie." },
          { text: "___ movie was great.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Təkrar qeyd olunur - the movie." },
          { text: "She is ___ best student.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Superlative degree - the best." },
          { text: "He is ___ tallest in class.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Superlative - the tallest." },
          { text: "I live in ___ United States.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Ölkə adı - the United States." },
          { text: "She plays ___ piano.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Musiqi aləti - the piano." },
          { text: "He went to ___ hospital.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Xəstəxana - the hospital." },
          { text: "She is ___ only child.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Only - the only." },
          { text: "___ rich should help ___ poor.", options: ["The", "A", "An", "None"], correct: 0, explanation: "The + adjective = qrup." },
          { text: "___ Amazon is a river.", options: ["A", "An", "The", "None"], correct: 2, explanation: "Çay adı - the Amazon." },
          { text: "She is ___ first to arrive.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Sıra sayı - the first." },
          { text: "He is ___ same age as me.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Same - the same." },
          { text: "___ sun rises in ___ east.", options: ["The", "A", "An", "None"], correct: 0, explanation: "The sun, the east." },
          { text: "She has ___ flu.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Xəstəlik - the flu." },
          { text: "He is ___ president of ___ company.", options: ["the", "a", "an", "none"], correct: 0, explanation: "Vəzifə - the president." }
        ],
        B1: [
          { text: "___ French are known for their cuisine.", options: ["The", "A", "An", "None"], correct: 0, explanation: "Millət - the French." },
          { text: "She is ___ university professor.", options: ["a", "an", "the", "none"], correct: 0, explanation: "University ju səsi - a." },
          { text: "He is ___ honest man.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Honest - an honest." },
          { text: "___ honor is important to him.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstrakt isim - no article." },
          { text: "She is ___ European.", options: ["a", "an", "the", "none"], correct: 0, explanation: "European ju səsi - a." },
          { text: "He has ___ one-way ticket.", options: ["a", "an", "the", "none"], correct: 0, explanation: "One w səsi - a." },
          { text: "___ history is interesting.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstrakt - no article." },
          { text: "She is ___ heir to the throne.", options: ["a", "an", "the", "none"], correct: 1, explanation: "Heir - an heir." },
          { text: "He is ___ unique person.", options: ["a", "an", "the", "none"], correct: 0, explanation: "Unique ju səsi - a." },
          { text: "___ honest is the best policy.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstrakt - no article." },
          { text: "She is ___ best teacher I know.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Superlative - the best." },
          { text: "He is ___ man of ___ hour.", options: ["a, the", "the, a", "an, the", "none"], correct: 0, explanation: "A man of the hour." },
          { text: "___ life is beautiful.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstrakt - no article." },
          { text: "She is ___ most talented singer.", options: ["a", "an", "the", "none"], correct: 2, explanation: "Most ilə - the most." },
          { text: "He is ___ man of his word.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A man of his word." }
        ],
        B2: [
          { text: "___ justice was served.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstrakt isim - no article." },
          { text: "She has ___ good understanding of ___ matter.", options: ["a, the", "the, a", "an, the", "none"], correct: 0, explanation: "A good understanding of the matter." },
          { text: "He is ___ authority on ___ subject.", options: ["an, the", "a, the", "the, a", "none"], correct: 1, explanation: "An authority - sait səsi." },
          { text: "___ patience is ___ virtue.", options: ["A, a", "The, the", "None, a", "None, none"], correct: 2, explanation: "Patience - no article, a virtue." },
          { text: "She is ___ woman of ___ integrity.", options: ["a, no", "the, no", "a, the", "the, a"], correct: 0, explanation: "A woman of integrity." },
          { text: "He has ___ eye for detail.", options: ["a", "an", "the", "none"], correct: 1, explanation: "An eye for detail." },
          { text: "___ knowledge is power.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstrakt - no article." },
          { text: "She is ___ embodiment of ___ grace.", options: ["the, no", "a, the", "an, no", "the, the"], correct: 0, explanation: "The embodiment of grace." },
          { text: "He is ___ master of ___ art.", options: ["a, the", "the, a", "an, the", "the, no"], correct: 0, explanation: "A master of the art." },
          { text: "___ courage is admirable.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstrakt - no article." },
          { text: "She has ___ knack for ___ languages.", options: ["a, no", "the, the", "an, no", "a, the"], correct: 0, explanation: "A knack for languages." },
          { text: "He is ___ victim of circumstances.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A victim of circumstances." },
          { text: "___ freedom is priceless.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstrakt - no article." },
          { text: "She is ___ inspiration to many.", options: ["a", "an", "the", "none"], correct: 1, explanation: "An inspiration." },
          { text: "He is ___ product of his environment.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A product of his environment." }
        ],
        C1: [
          { text: "___ time heals all wounds.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstract general - no article." },
          { text: "She is ___ force to be reckoned with.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A force to be reckoned with." },
          { text: "He has ___ understanding of ___ human condition.", options: ["a, the", "an, the", "the, a", "none, the"], correct: 0, explanation: "A understanding - a, the human condition." },
          { text: "___ art of ___ negotiation is difficult.", options: ["The, no", "A, the", "The, the", "No, no"], correct: 0, explanation: "The art of negotiation." },
          { text: "She is ___ shadow of her former self.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A shadow of her former self." },
          { text: "He is ___ product of ___ society.", options: ["a, no", "the, the", "a, the", "the, no"], correct: 0, explanation: "A product of society." },
          { text: "___ truth shall set you free.", options: ["A", "An", "The", "None"], correct: 2, explanation: "The truth - xüsusi həqiqət." },
          { text: "She is ___ symbol of hope.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A symbol of hope." },
          { text: "He is ___ master of his own destiny.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A master of his own destiny." },
          { text: "___ love conquers all.", options: ["A", "An", "The", "None"], correct: 3, explanation: "Abstract - no article." },
          { text: "She is ___ epitome of elegance.", options: ["a", "an", "the", "none"], correct: 2, explanation: "The epitome of elegance." },
          { text: "He is ___ man of ___ people.", options: ["a, the", "the, a", "an, the", "the, no"], correct: 0, explanation: "A man of the people." },
          { text: "___ beauty is in the eye of ___ beholder.", options: ["A, the", "The, a", "No, the", "The, the"], correct: 2, explanation: "Beauty no article, the beholder." },
          { text: "She is ___ woman of her word.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A woman of her word." },
          { text: "He is ___ living legend.", options: ["a", "an", "the", "none"], correct: 0, explanation: "A living legend." }
        ]
      },
      'Comparatives Superlatives': {
        A1: [
          { text: "This is ___ than that.", options: ["fast", "faster", "fastest", "more fast"], correct: 1, explanation: "Qısa sözdə -er əlavə olunur." },
          { text: "She is ___ student.", options: ["good", "better", "best", "more good"], correct: 2, explanation: "Superlative - the best." },
          { text: "This book is ___ than mine.", options: ["interesting", "more interesting", "most interesting", "interestinger"], correct: 1, explanation: "Uzun sözdə more interesting." },
          { text: "He is ___ than me.", options: ["tall", "taller", "tallest", "more tall"], correct: 1, explanation: "Comparative - taller." },
          { text: "This is ___ day.", options: ["bad", "worse", "worst", "more bad"], correct: 2, explanation: "Superlative - the worst." },
          { text: "She runs ___ than him.", options: ["fast", "faster", "fastest", "more fast"], correct: 1, explanation: "Comparative - faster." },
          { text: "This test is ___ than last.", options: ["easy", "easier", "easiest", "more easy"], correct: 1, explanation: "Comparative - easier." },
          { text: "He is ___ player.", options: ["good", "better", "best", "more good"], correct: 2, explanation: "Superlative - the best." },
          { text: "Today is ___ than yesterday.", options: ["hot", "hotter", "hottest", "more hot"], correct: 1, explanation: "CVC - double t + er: hotter." },
          { text: "This is ___ movie.", options: ["interesting", "more interesting", "most interesting", "interestinger"], correct: 2, explanation: "Superlative - most interesting." },
          { text: "She is ___ than her sister.", options: ["young", "younger", "youngest", "more young"], correct: 1, explanation: "Comparative - younger." },
          { text: "This car is ___ expensive.", options: ["more", "most", "much", "very"], correct: 1, explanation: "Superlative - the most expensive." },
          { text: "My house is ___ than yours.", options: ["big", "bigger", "biggest", "more big"], correct: 1, explanation: "Comparative - bigger." },
          { text: "That was ___ experience.", options: ["bad", "worse", "worst", "more bad"], correct: 2, explanation: "Superlative - the worst." },
          { text: "This task is ___ simple.", options: ["more", "most", "much", "very"], correct: 1, explanation: "Superlative - the most simple." }
        ],
        A2: [
          { text: "He is ___ than his brother.", options: ["taller", "tall", "tallest", "more tall"], correct: 0, explanation: "Comparative - taller than." },
          { text: "This is ___ book I've ever read.", options: ["good", "better", "the best", "more good"], correct: 2, explanation: "Superlative - the best." },
          { text: "She is ___ than me.", options: ["intelligent", "more intelligent", "most intelligent", "intelligenter"], correct: 1, explanation: "Uzun söz - more intelligent." },
          { text: "This is ___ day of my life.", options: ["happy", "happier", "the happiest", "more happy"], correct: 2, explanation: "Superlative - the happiest." },
          { text: "He drives ___ than me.", options: ["careful", "more careful", "most careful", "carefuller"], correct: 1, explanation: "Comparative - more careful." },
          { text: "This is ___ expensive watch.", options: ["less", "least", "the least", "lesser"], correct: 2, explanation: "The least expensive - ən az bahalı." },
          { text: "She is ___ than her mother.", options: ["beautiful", "more beautiful", "most beautiful", "beautifuller"], correct: 1, explanation: "More beautiful than." },
          { text: "This is ___ difficult test.", options: ["the most", "more", "much", "very"], correct: 0, explanation: "The most difficult - ən çətin." },
          { text: "He is ___ person I know.", options: ["kind", "kinder", "the kindest", "more kind"], correct: 2, explanation: "Superlative - the kindest." },
          { text: "This car is ___ than that one.", options: ["cheap", "cheaper", "cheapest", "more cheap"], correct: 1, explanation: "Comparative - cheaper." },
          { text: "She speaks ___ than him.", options: ["clear", "clearer", "clearest", "more clear"], correct: 1, explanation: "Comparative - clearer." },
          { text: "This is ___ comfortable chair.", options: ["more", "most", "the most", "much"], correct: 2, explanation: "The most comfortable." },
          { text: "He is ___ than his father.", options: ["strong", "stronger", "strongest", "more strong"], correct: 1, explanation: "Comparative - stronger." },
          { text: "This is ___ important rule.", options: ["more", "the most", "much", "very"], correct: 1, explanation: "The most important." },
          { text: "She is ___ than her sister.", options: ["friendly", "friendlier", "friendliest", "more friendly"], correct: 1, explanation: "Friendlier or more friendly both ok." }
        ],
        B1: [
          { text: "The more you study, ___ you learn.", options: ["the more", "more", "most", "the most"], correct: 0, explanation: "The more... the more - nə qədər çox... o qədər çox." },
          { text: "She is ___ than anyone else.", options: ["more talented", "talented", "most talented", "the most talented"], correct: 0, explanation: "Comparative - more talented than." },
          { text: "This is ___ of all.", options: ["better", "best", "the best", "more good"], correct: 2, explanation: "Superlative - the best of all." },
          { text: "He is ___ than his reputation.", options: ["better", "best", "good", "more good"], correct: 0, explanation: "Comparative - better than." },
          { text: "The weather is getting ___ and ___ .", options: ["hot, hot", "hotter, hotter", "hottest, hottest", "more hot, more hot"], correct: 1, explanation: "Double comparative - hotter and hotter." },
          { text: "She is ___ student in the class.", options: ["more intelligent", "the most intelligent", "intelligenter", "most intelligent"], correct: 1, explanation: "Superlative - the most intelligent." },
          { text: "This is ___ book I own.", options: ["less interesting", "the least interesting", "least interesting", "more less interesting"], correct: 1, explanation: "The least interesting - ən az maraqlı." },
          { text: "He is ___ than his brother.", options: ["less tall", "shorter", "more short", "shortest"], correct: 1, explanation: "Comparative - shorter." },
          { text: "This is ___ problem we face.", options: ["more serious", "the most serious", "seriouser", "most serious"], correct: 1, explanation: "The most serious - ən ciddi." },
          { text: "She is ___ person I've met.", options: ["more kind", "the kindest", "kinder", "most kind"], correct: 1, explanation: "Superlative - the kindest." },
          { text: "The faster you run, ___ you'll get tired.", options: ["the sooner", "sooner", "more soon", "the more soon"], correct: 0, explanation: "The faster... the sooner." },
          { text: "This is ___ option.", options: ["less bad", "the least bad", "least bad", "more less bad"], correct: 1, explanation: "The least bad - ən az pis." },
          { text: "He is ___ than he looks.", options: ["stronger", "strong", "strongest", "more strong"], correct: 0, explanation: "Comparative - stronger than." },
          { text: "This is ___ movie ever made.", options: ["more expensive", "the most expensive", "expensivest", "most expensive"], correct: 1, explanation: "The most expensive - ən bahalı." },
          { text: "She is ___ than she appears.", options: ["more wise", "wiser", "wisest", "most wise"], correct: 1, explanation: "Comparative - wiser." }
        ],
        B2: [
          { text: "The ___ you have, the ___ you want.", options: ["more, more", "most, most", "much, much", "many, many"], correct: 0, explanation: "The more... the more - nə qədər çox... o qədər çox." },
          { text: "She is ___ candidate for the job.", options: ["by far the best", "more better", "the more best", "bestest"], correct: 0, explanation: "By far the best - ən yaxşı." },
          { text: "This is ___ movie I've seen.", options: ["far the best", "the best by far", "by far the best", "best by far"], correct: 2, explanation: "By far the best - mükəmməl." },
          { text: "He is ___ intelligent of the two.", options: ["the more", "more", "most", "the most"], correct: 0, explanation: "İki arasında müqayisə - the more intelligent." },
          { text: "This is ___ expensive option.", options: ["slightly less", "more less", "much less", "less more"], correct: 0, explanation: "Slightly less expensive - bir az az bahalı." },
          { text: "She is ___ beautiful as her sister.", options: ["as", "more", "most", "so"], correct: 0, explanation: "As... as - bərabərlik dərəcəsi." },
          { text: "He is not ___ tall as his father.", options: ["as", "more", "most", "so"], correct: 0, explanation: "Not as tall as - o qədər hündür deyil." },
          { text: "This is ___ interesting book I've read.", options: ["by far the most", "more most", "most by far", "the more most"], correct: 0, explanation: "By far the most interesting - ən maraqlısı." },
          { text: "The ___ you sleep, the ___ you feel.", options: ["more, better", "much, good", "many, best", "most, well"], correct: 0, explanation: "The more you sleep, the better you feel." },
          { text: "She is ___ the two.", options: ["the smarter of", "smarter of", "the smartest of", "smartest of"], correct: 0, explanation: "The smarter of the two - ikisinin daha ağıllısı." },
          { text: "This is ___ hardest test I've taken.", options: ["by far the", "more the", "the more", "far the"], correct: 0, explanation: "By far the hardest - ən çətini." },
          { text: "He is ___ better than his rival.", options: ["far", "more", "much", "very"], correct: 0, explanation: "Far better - daha yaxşı." },
          { text: "The weather is getting ___ worse.", options: ["even", "more", "much", "very"], correct: 0, explanation: "Even worse - daha da pis." },
          { text: "She is ___ the most talented singer.", options: ["arguably", "more", "much", "very"], correct: 0, explanation: "Arguably the most - bəlkə də ən." },
          { text: "This is ___ the worst decision.", options: ["by far", "more", "much", "very"], correct: 0, explanation: "By far the worst - ən pisi." }
        ],
        C1: [
          { text: "The ___ you know, the ___ you realize you don't know.", options: ["more, more", "most, most", "much, much", "many, many"], correct: 0, explanation: "The more... the more - nə qədər çox bilsən, o qədər çox bilmədiyini anlayırsan." },
          { text: "She is ___ the most accomplished artist.", options: ["quite possibly", "more", "much", "very"], correct: 0, explanation: "Quite possibly the most - ola bilsin ən." },
          { text: "This is ___ the best performance I've witnessed.", options: ["without a doubt", "more", "much", "very"], correct: 0, explanation: "Without a doubt the best - şübhəsiz ən yaxşı." },
          { text: "He is ___ the least qualified candidate.", options: ["arguably", "more", "much", "very"], correct: 0, explanation: "Arguably the least - bəlkə də ən az." },
          { text: "The ___ you practice, the ___ you become.", options: ["more, more proficient", "most, most proficient", "much, much proficient", "many, many proficient"], correct: 0, explanation: "The more you practice, the more proficient you become." },
          { text: "She is ___ the most dedicated teacher I know.", options: ["hands down", "more", "much", "very"], correct: 0, explanation: "Hands down the most - ən." },
          { text: "This is ___ the hardest decision of my life.", options: ["easily", "more", "much", "very"], correct: 0, explanation: "Easily the hardest - asanlıqla ən çətin." },
          { text: "He is ___ the worst candidate for the job.", options: ["by a long shot", "more", "much", "very"], correct: 0, explanation: "By a long shot the worst - ən pis." },
          { text: "The ___ you explain, the ___ I get confused.", options: ["more, more", "most, most", "much, much", "many, many"], correct: 0, explanation: "The more you explain, the more I get confused." },
          { text: "She is ___ the most influential person I've met.", options: ["undoubtedly", "more", "much", "very"], correct: 0, explanation: "Undoubtedly the most - şübhəsiz ən." },
          { text: "This is ___ the most significant discovery.", options: ["arguably", "more", "much", "very"], correct: 0, explanation: "Arguably the most - iddia edilə bilər ki ən." },
          { text: "He is ___ the least experienced member.", options: ["clearly", "more", "much", "very"], correct: 0, explanation: "Clearly the least - aydın ən az." },
          { text: "The ___ you read, the ___ you'll understand.", options: ["more, better", "most, best", "much, good", "many, well"], correct: 0, explanation: "The more you read, the better you'll understand." },
          { text: "She is ___ the most qualified person for this role.", options: ["without question", "more", "much", "very"], correct: 0, explanation: "Without question the most - sualsız ən." },
          { text: "This is ___ the greatest achievement of all.", options: ["quite simply", "more", "much", "very"], correct: 0, explanation: "Quite simply the greatest - sadəcə ən böyük." }
        ]
      },
      'Synonyms Antonyms': {
        A1: [
          { text: "Happy means ___", options: ["sad", "joyful", "angry", "tired"], correct: 1, explanation: "Happy = joyful - xoşbəxt." },
          { text: "Fast means ___", options: ["slow", "quick", "late", "early"], correct: 1, explanation: "Fast = quick - sürətli." },
          { text: "Big means ___", options: ["small", "large", "tiny", "short"], correct: 1, explanation: "Big = large - böyük." },
          { text: "Cold means ___", options: ["hot", "warm", "chilly", "cool"], correct: 2, explanation: "Cold = chilly - soyuq." },
          { text: "Easy means ___", options: ["hard", "simple", "difficult", "tough"], correct: 1, explanation: "Easy = simple - asan." },
          { text: "Angry means ___", options: ["calm", "mad", "peaceful", "happy"], correct: 1, explanation: "Angry = mad - qəzəbli." },
          { text: "Begin means ___", options: ["end", "start", "finish", "stop"], correct: 1, explanation: "Begin = start - başlamaq." },
          { text: "Old means ___", options: ["young", "ancient", "new", "modern"], correct: 1, explanation: "Old = ancient - köhnə." },
          { text: "Smart means ___", options: ["dumb", "clever", "stupid", "slow"], correct: 1, explanation: "Smart = clever - ağıllı." },
          { text: "Rich means ___", options: ["poor", "wealthy", "needy", "broke"], correct: 1, explanation: "Rich = wealthy - varlı." },
          { text: "Clean means ___", options: ["dirty", "neat", "messy", "dusty"], correct: 1, explanation: "Clean = neat - təmiz." },
          { text: "Strong means ___", options: ["weak", "powerful", "feeble", "fragile"], correct: 1, explanation: "Strong = powerful - güclü." },
          { text: "Quick means ___", options: ["slow", "fast", "late", "leisurely"], correct: 1, explanation: "Quick = fast - tez." },
          { text: "Hard means ___", options: ["easy", "difficult", "simple", "soft"], correct: 1, explanation: "Hard = difficult - çətin." },
          { text: "Correct means ___", options: ["wrong", "right", "false", "incorrect"], correct: 1, explanation: "Correct = right - düzgün." }
        ],
        A2: [
          { text: "Happy antonym is ___", options: ["joyful", "sad", "cheerful", "glad"], correct: 1, explanation: "Happy əksi = sad - kədərli." },
          { text: "Fast antonym is ___", options: ["quick", "rapid", "slow", "speedy"], correct: 2, explanation: "Fast əksi = slow - yavaş." },
          { text: "Big antonym is ___", options: ["large", "huge", "small", "enormous"], correct: 2, explanation: "Big əksi = small - kiçik." },
          { text: "Hot antonym is ___", options: ["warm", "cold", "boiling", "scorching"], correct: 1, explanation: "Hot əksi = cold - soyuq." },
          { text: "Rich antonym is ___", options: ["wealthy", "poor", "affluent", "prosperous"], correct: 1, explanation: "Rich əksi = poor - kasıb." },
          { text: "Strong antonym is ___", options: ["powerful", "weak", "mighty", "sturdy"], correct: 1, explanation: "Strong əksi = weak - zəif." },
          { text: "Clean antonym is ___", options: ["neat", "dirty", "tidy", "spotless"], correct: 1, explanation: "Clean əksi = dirty - çirkli." },
          { text: "Early antonym is ___", options: ["soon", "late", "prompt", "punctual"], correct: 1, explanation: "Early əksi = late - gec." },
          { text: "Noisy antonym is ___", options: ["loud", "quiet", "boisterous", "clamorous"], correct: 1, explanation: "Noisy əksi = quiet - sakit." },
          { text: "Light antonym is ___", options: ["bright", "dark", "luminous", "radiant"], correct: 1, explanation: "Light əksi = dark - qaranlıq." },
          { text: "Wet antonym is ___", options: ["moist", "dry", "damp", "soaked"], correct: 1, explanation: "Wet əksi = dry - quru." },
          { text: "Full antonym is ___", options: ["complete", "empty", "entire", "total"], correct: 1, explanation: "Full əksi = empty - boş." },
          { text: "Open antonym is ___", options: ["ajar", "closed", "unlocked", "accessible"], correct: 1, explanation: "Open əksi = closed - qapalı." },
          { text: "Young antonym is ___", options: ["youthful", "old", "juvenile", "immature"], correct: 1, explanation: "Young əksi = old - qoca." },
          { text: "High antonym is ___", options: ["tall", "low", "lofty", "elevated"], correct: 1, explanation: "High əksi = low - aşağı." }
        ],
        B1: [
          { text: "Begin synonym is ___", options: ["end", "start", "finish", "complete"], correct: 1, explanation: "Begin synonym = start - başlamaq." },
          { text: "Purchase synonym is ___", options: ["sell", "buy", "trade", "exchange"], correct: 1, explanation: "Purchase = buy - almaq." },
          { text: "Assist synonym is ___", options: ["hinder", "help", "block", "obstruct"], correct: 1, explanation: "Assist = help - kömək etmək." },
          { text: "Brave synonym is ___", options: ["cowardly", "courageous", "fearful", "timid"], correct: 1, explanation: "Brave = courageous - cəsur." },
          { text: "Calm synonym is ___", options: ["agitated", "peaceful", "upset", "disturbed"], correct: 1, explanation: "Calm = peaceful - sakit." },
          { text: "Create synonym is ___", options: ["destroy", "make", "ruin", "break"], correct: 1, explanation: "Create = make - yaratmaq." },
          { text: "Destroy synonym is ___", options: ["build", "ruin", "create", "construct"], correct: 1, explanation: "Destroy = ruin - məhv etmək." },
          { text: "Famous synonym is ___", options: ["unknown", "renowned", "obscure", "nameless"], correct: 1, explanation: "Famous = renowned - məşhur." },
          { text: "Gather synonym is ___", options: ["scatter", "collect", "spread", "disperse"], correct: 1, explanation: "Gather = collect - toplamaq." },
          { text: "Help synonym is ___", options: ["hinder", "aid", "obstruct", "block"], correct: 1, explanation: "Help = aid - yardım." },
          { text: "Increase synonym is ___", options: ["decrease", "grow", "reduce", "lessen"], correct: 1, explanation: "Increase = grow - artmaq." },
          { text: "Join synonym is ___", options: ["separate", "connect", "divide", "split"], correct: 1, explanation: "Join = connect - birləşmək." },
          { text: "Keep synonym is ___", options: ["lose", "retain", "drop", "release"], correct: 1, explanation: "Keep = retain - saxlamaq." },
          { text: "Love synonym is ___", options: ["hate", "adore", "despise", "detest"], correct: 1, explanation: "Love = adore - sevmək." },
          { text: "Make synonym is ___", options: ["break", "create", "destroy", "ruin"], correct: 1, explanation: "Make = create - etmək." }
        ],
        B2: [
          { text: "Abundant antonym is ___", options: ["plentiful", "scarce", "ample", "copious"], correct: 1, explanation: "Abundant əksi = scarce - az." },
          { text: "Benevolent antonym is ___", options: ["kind", "malevolent", "charitable", "altruistic"], correct: 1, explanation: "Benevolent əksi = malevolent - pisniyyətli." },
          { text: "Cautious antonym is ___", options: ["careful", "reckless", "prudent", "vigilant"], correct: 1, explanation: "Cautious əksi = reckless - ehtiyatsız." },
          { text: "Diligent antonym is ___", options: ["hardworking", "lazy", "industrious", "assiduous"], correct: 1, explanation: "Diligent əksi = lazy - tənbəl." },
          { text: "Eloquent antonym is ___", options: ["fluent", "inarticulate", "articulate", "expressive"], correct: 1, explanation: "Eloquent əksi = inarticulate - söz tapa bilməyən." },
          { text: "Frugal antonym is ___", options: ["thrifty", "extravagant", "economical", "sparing"], correct: 1, explanation: "Frugal əksi = extravagant - israfçı." },
          { text: "Generous antonym is ___", options: ["charitable", "stingy", "benevolent", "altruistic"], correct: 1, explanation: "Generous əksi = stingy - xəsis." },
          { text: "Humble antonym is ___", options: ["modest", "arrogant", "meek", "unassuming"], correct: 1, explanation: "Humble əksi = arrogant - təkəbbürlü." },
          { text: "Innovative synonym is ___", options: ["traditional", "original", "conventional", "old-fashioned"], correct: 1, explanation: "Innovative = original - yenilikçi." },
          { text: "Judicious synonym is ___", options: ["unwise", "wise", "foolish", "reckless"], correct: 1, explanation: "Judicious = wise - müdrik." },
          { text: "Keen synonym is ___", options: ["dull", "sharp", "blunt", "obtuse"], correct: 1, explanation: "Keen = sharp - kəskin." },
          { text: "Lucid synonym is ___", options: ["confusing", "clear", "obscure", "vague"], correct: 1, explanation: "Lucid = clear - aydın." },
          { text: "Meticulous synonym is ___", options: ["careless", "thorough", "sloppy", "negligent"], correct: 1, explanation: "Meticulous = thorough - vasvası." },
          { text: "Novel synonym is ___", options: ["common", "new", "ordinary", "usual"], correct: 1, explanation: "Novel = new - yeni." },
          { text: "Optimistic antonym is ___", options: ["hopeful", "pessimistic", "positive", "cheerful"], correct: 1, explanation: "Optimistic əksi = pessimistic - bədbin." }
        ],
        C1: [
          { text: "Ephemeral synonym is ___", options: ["permanent", "temporary", "eternal", "everlasting"], correct: 1, explanation: "Ephemeral = temporary - müvəqqəti." },
          { text: "Gregarious synonym is ___", options: ["solitary", "sociable", "lonely", "reserved"], correct: 1, explanation: "Gregarious = sociable - ünsiyyətcil." },
          { text: "Ineffable synonym is ___", options: ["indescribable", "expressible", "definable", "utterable"], correct: 0, explanation: "Ineffable = indescribable - izah olunmaz." },
          { text: "Loquacious synonym is ___", options: ["taciturn", "talkative", "silent", "reserved"], correct: 1, explanation: "Loquacious = talkative - danışqan." },
          { text: "Magnanimous synonym is ___", options: ["petty", "generous", "selfish", "mean"], correct: 1, explanation: "Magnanimous = generous - ali mərtəbəli." },
          { text: "Nefarious synonym is ___", options: ["virtuous", "wicked", "righteous", "honorable"], correct: 1, explanation: "Nefarious = wicked - şərli." },
          { text: "Obfuscate synonym is ___", options: ["clarify", "confuse", "explain", "illuminate"], correct: 1, explanation: "Obfuscate = confuse - qarışdırmaq." },
          { text: "Pragmatic synonym is ___", options: ["idealistic", "practical", "unrealistic", "visionary"], correct: 1, explanation: "Pragmatic = practical - praktik." },
          { text: "Quixotic synonym is ___", options: ["realistic", "idealistic", "pragmatic", "practical"], correct: 1, explanation: "Quixotic = idealistic - xəyali." },
          { text: "Recalcitrant synonym is ___", options: ["obedient", "stubborn", "compliant", "docile"], correct: 1, explanation: "Recalcitrant = stubborn - inadcıl." },
          { text: "Sagacious synonym is ___", options: ["foolish", "wise", "stupid", "ignorant"], correct: 1, explanation: "Sagacious = wise - müdrik." },
          { text: "Taciturn synonym is ___", options: ["talkative", "reserved", "loquacious", "garrulous"], correct: 1, explanation: "Taciturn = reserved - az danışan." },
          { text: "Ubiquitous synonym is ___", options: ["rare", "omnipresent", "scarce", "uncommon"], correct: 1, explanation: "Ubiquitous = omnipresent - hər yerdə olan." },
          { text: "Voracious synonym is ___", options: ["insatiable", "satisfied", "full", "content"], correct: 0, explanation: "Voracious = insatiable - doymaz." },
          { text: "Zealous synonym is ___", options: ["apathetic", "enthusiastic", "indifferent", "uninterested"], correct: 1, explanation: "Zealous = enthusiastic - həvəsli." }
        ]
      }
    };

    if (allQuizzes[topicName] && allQuizzes[topicName][levelId]) {
      return allQuizzes[topicName][levelId];
    }
    return [
      { text: "Question 1 for " + topicName + " at " + levelId + " level.", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Sample explanation." },
      { text: "Question 2 for " + topicName + " at " + levelId + " level.", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Sample explanation." },
      { text: "Question 3 for " + topicName + " at " + levelId + " level.", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Sample explanation." },
      { text: "Question 4 for " + topicName + " at " + levelId + " level.", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Sample explanation." },
      { text: "Question 5 for " + topicName + " at " + levelId + " level.", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Sample explanation." }
    ];
  };

  const currentQuestions = getQuestions(topic.name, level.id);
  const [localQuestions] = useState(currentQuestions);

  const handleAnswer = (qIndex, value) => {
    if (!submitted) {
      setAnswers({ ...answers, [qIndex]: value });
    }
  };

  const submitQuiz = () => {
    let newScore = 0;
    localQuestions.forEach((q, i) => {
      if (answers[i] === q.correct) newScore++;
    });
    setScore(newScore);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetQuiz = () => {
    setSubmitted(false);
    setAnswers({});
    setScore(0);
    setShowExplanations(false);
  };

  if (submitted) {
    const percentage = (score / localQuestions.length) * 100;
    let grade = '';
    if (percentage >= 90) grade = 'Excellent';
    else if (percentage >= 75) grade = 'Very Good';
    else if (percentage >= 60) grade = 'Good';
    else if (percentage >= 45) grade = 'Need Practice';
    else grade = 'Need More Practice';

    return (
      <div className="quiz-container result-container">
        <button className="back-btn" onClick={onBack}> Back to Levels</button>
        <h2>Quiz Results</h2>
        <div className="result-card">
          <div className="result-topic">{topic.name} - {level.name}</div>
          <div className="result-score">
            <span className="score-number">{score}</span>
            <span className="score-total"> / {localQuestions.length}</span>
          </div>
          <div className="result-percentage">{Math.round(percentage)}%</div>
          <div className="result-grade">{grade}</div>
        </div>
        <div className="result-actions">
          <button className="submit-btn" onClick={() => setShowExplanations(!showExplanations)}>
            {showExplanations ? 'Hide Explanations' : 'Show Explanations'}
          </button>
          <button className="submit-btn" onClick={resetQuiz}>Try Again</button>
          <button className="submit-btn" onClick={onBack}>Choose Different Level</button>
        </div>
        {showExplanations && (
          <div className="explanations-section">
            <h3>Detailed Explanations</h3>
            {localQuestions.map((q, i) => (
              <div key={i} className={`explanation-item ${answers[i] === q.correct ? 'correct-exp' : 'wrong-exp'}`}>
                <p><strong>Q{i+1}:</strong> {q.text}</p>
                <p><strong>Your answer:</strong> {q.options[answers[i]] || 'Not answered'}</p>
                <p><strong>Correct answer:</strong> {q.options[q.correct]}</p>
                <p><strong>Explanation:</strong> {q.explanation}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <button className="back-btn" onClick={() => onBack()}> Back to Levels</button>
      <h2>{topic.name} Quiz</h2>
      <div className="quiz-header">
        <span className="quiz-level-badge">{level.id}</span>
        <span className="quiz-level-name">{level.name}</span>
        <span className="quiz-question-count">{localQuestions.length} Questions</span>
      </div>
      <p className="quiz-instruction">Choose the correct answer for each question.</p>
      <form>
        {localQuestions.map((q, qIndex) => (
          <div key={qIndex} className="question">
            <h3>{qIndex + 1}. {q.text}</h3>
            <div className="options">
              {q.options.map((opt, optIndex) => (
                <label key={optIndex} className={answers[qIndex] === optIndex ? 'selected' : ''}>
                  <input
                    type="radio"
                    name={`q${qIndex}`}
                    value={optIndex}
                    checked={answers[qIndex] === optIndex}
                    onChange={() => handleAnswer(qIndex, optIndex)}
                  />
                  <span className="option-text">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </form>
      <button className="submit-btn" onClick={submitQuiz}>Submit Answers</button>
    </div>
  );
};
const GrammarPage = () => {
  const grammarTopics = [
    { 
      id: 1, 
      title: "Present Simple Tense", 
      level: "A1", 
      description: "İndiki zamanda adətən edilən hərəkətlər, vərdişlər, ümumi həqiqətlər və cədvəl üzrə olan hadisələr.",
      rules: `
        📌 FORMU:
        • Müsbət: Subject + V1 (he/she/it -> V1+s/es)
        • Mənfi: Subject + do/does + not + V1
        • Sual: Do/Does + Subject + V1?
        
        📌 İSTİFADƏ HALLARI:
        1. Daimi vərdişlər: "I drink coffee every morning."
        2. Ümumi həqiqətlər: "Water boils at 100°C."
        3. Cədvəl üzrə hadisələr: "The train leaves at 6 PM."
        4. Hiss və duyğular: "I feel happy."
        5. Təkrarlanan hərəkətlər: "She always arrives on time."
        
        📌 VURĞULU SÖZLƏR:
        always, usually, often, sometimes, rarely, never, every day, on Mondays, etc.
        
        📌 XÜSUSİ QAYDALAR:
        • 3-cü şəxs tək (he/she/it) fellərə -s və ya -es əlavə olunur
        • -s, -sh, -ch, -x, -o ilə bitən fellərə -es əlavə olunur (goes, watches)
        • Səsli hərflə bitən fellərə -s əlavə olunur (plays, says)
      `
    },
    { 
      id: 2, 
      title: "Present Continuous Tense", 
      level: "A1", 
      description: "Hazırda, danışıq anında davam edən hərəkətləri, müvəqqəti vəziyyətləri və yaxın gələcək planlarını ifadə edən zaman forması.",
      rules: `
        📌 FORMU:
        • Müsbət: Subject + am/is/are + V-ing
        • Mənfi: Subject + am/is/are + not + V-ing
        • Sual: Am/Is/Are + Subject + V-ing?
        
        📌 İSTİFADƏ HALLARI:
        1. Danışıq anında davam edən: "She is reading a book now."
        2. Müvəqqəti vəziyyətlər: "I am living in London this year."
        3. Yaxın gələcək planları: "We are meeting tomorrow."
        4. Dəyişən tendensiyalar: "The population is increasing."
        5. Təkrarlanan hərəkətlər (annoying habits): "He is always losing his keys."
        
        📌 VURĞULU SÖZLƏR:
        now, at the moment, currently, today, this week, these days, still, etc.
        
        📌 XÜSUSİ QAYDALAR:
        • Səssiz -e ilə bitən fellər: -e çıxarılır (write -> writing)
        • Bir samit + qısa sait + samit: son samit təkrarlanır (sit -> sitting)
        • -ie ilə bitən: -ie → -y (lie -> lying)
        • State verbs (stative verbs) continuous işlənmir: know, believe, love, hate, etc.
      `
    },
    { 
      id: 3, 
      title: "Past Simple Tense", 
      level: "A2", 
      description: "Keçmiş zamanda tamamlanmış, bitmiş hərəkətləri ifadə edən zaman forması.",
      rules: `
        📌 FORMU:
        • Müsbət: Subject + V2 (keçmiş zaman forması)
        • Mənfi: Subject + did + not + V1
        • Sual: Did + Subject + V1?
        
        📌 İSTİFADƏ HALLARI:
        1. Keçmişdə bitmiş hərəkətlər: "I visited Paris last year."
        2. Keçmişdə ardıcıl hərəkətlər: "She woke up, brushed her teeth, and went to work."
        3. Keçmişdəki vərdişlər: "I played football when I was young."
        4. Keçmişdə baş vermiş hadisələr: "The concert started at 8 PM."
        
        📌 VURĞULU SÖZLƏR:
        yesterday, last week/month/year, in 2020, two days ago, when I was young, etc.
        
        📌 XÜSUSİ QAYDALAR:
        • Düzenli fellər: -ed əlavə olunur (walk -> walked)
        • Düzensiz fellər: xüsusi formada olur (go -> went, eat -> ate)
        • -y ilə bitən və samitdən əvvəl: -y → -ied (study -> studied)
        • Bir samit + qısa sait + samit: son samit təkrarlanır (stop -> stopped)
      `
    },
    { 
      id: 4, 
      title: "Present Perfect Tense", 
      level: "B1", 
      description: "Keçmişdə başlamış və indiyə qədər davam edən və ya indiki zamanda təsiri hiss olunan hadisələri ifadə edən zaman.",
      rules: `
        📌 FORMU:
        • Müsbət: Subject + have/has + V3 (past participle)
        • Mənfi: Subject + have/has + not + V3
        • Sual: Have/Has + Subject + V3?
        
        📌 İSTİFADƏ HALLARI:
        1. Keçmişdə başlayıb davam edən: "I have lived here for 5 years."
        2. İndiki zamanda təsiri olan: "She has lost her keys." (She can't find them now)
        3. Həyat təcrübələri: "I have never been to Japan."
        4. Bitməmiş zaman dövrü: "I have read two books this week."
        5. Son vaxtlar baş verən: "They have just arrived."
        
        📌 VURĞULU SÖZLƏR:
        ever, never, just, already, yet, since, for, recently, lately, so far, etc.
        
        📌 XÜSUSİ QAYDALAR:
        • Since + başlanğıc nöqtəsi: since Monday, since 2010
        • For + müddət: for 3 years, for a long time
        • Gone vs Been: gone = getdi və qayıtmadı, been = getdi və qayıtdı
        • Just = yeni, already = artıq (müsbət cümlələrdə), yet = hələ (sual və mənfi)
      `
    },
    { 
      id: 5, 
      title: "Future Simple (Will)", 
      level: "A2", 
      description: "Gələcəkdə baş verəcək hadisələri, proqnozları, ani qərarları, vədləri, təklifləri və xahişləri ifadə edən zaman forması.",
      rules: `
        📌 FORMU:
        • Müsbət: Subject + will + V1
        • Mənfi: Subject + will + not (won't) + V1
        • Sual: Will + Subject + V1?
        
        📌 İSTİFADƏ HALLARI:
        1. Proqnozlar: "It will rain tomorrow."
        2. Ani qərarlar: "I'll have the pasta." (restoranda)
        3. Vədlər: "I will always love you."
        4. Təkliflər: "I'll help you with that."
        5. Xahişlər: "Will you close the door?"
        6. Faktlar və inanclar: "The sun will rise at 6 AM."
        
        📌 VURĞULU SÖZLƏR:
        tomorrow, next week/year, in the future, soon, one day, probably, definitely, etc.
        
        📌 XÜSUSİ QAYDALAR:
        • Shall = I/we ilə istifadə olunur (təklif və suallarda)
        • 'll = qısa forması (I'll, you'll)
        • Won't = will not (mənfi)
        • Going to vs Will: Going to = plan, Will = ani qərar/proqnoz
        • Be + about + to = çox yaxın gələcək: "The movie is about to start."
      `
    },
    { 
      id: 6, 
      title: "Conditional Sentences", 
      level: "B1", 
      description: "Bir şərtin yerinə yetirilib-yetirilməməsindən asılı olan vəziyyətləri ifadə edən cümlə quruluşu.",
      rules: `
        📌 4 NÖV ŞƏRT CÜMLƏLƏRİ:
        
        🔹 ZERO CONDITIONAL (Həmişə doğru olanlar):
        • If + Present Simple, Present Simple
        • "If you heat water, it boils."
        • İstifadə: Ümumi həqiqətlər, elmi faktlar
        
        🔹 FIRST CONDITIONAL (Real, mümkün):
        • If + Present Simple, will + V1
        • "If it rains, I will stay home."
        • İstifadə: Gələcəkdə mümkün olan real şərtlər
        
        🔹 SECOND CONDITIONAL (Unreal, xəyali):
        • If + Past Simple, would + V1
        • "If I had money, I would travel."
        • İstifadə: İndiki zamanda qeyri-mümkün/xəyali şərtlər
        
        🔹 THIRD CONDITIONAL (Keçmişdəki xəyali):
        • If + Past Perfect, would have + V3
        • "If I had studied, I would have passed."
        • İstifadə: Keçmişdə dəyişə bilməyəcək şərtlər
        
        📌 XÜSUSİ QAYDALAR:
        • Unless = if not: "I won't go unless you come."
        • Provided/Providing that = if şərti ilə
        • As long as = şərti ilə
        • In case = ehtimala görə
        • Mixed conditionals: müxtəlif zamanların qarışığı
      `
    },
    { 
      id: 7, 
      title: "Passive Voice", 
      level: "B1", 
      description: "Hərəkətin kim tərəfindən edildiyindən daha çox hərəkətin özünün vacib olduğu hallarda işlənən quruluş.",
      rules: `
        📌 FORMU:
        • Müsbət: Subject + to be + V3 (past participle)
        • Mənfi: Subject + to be + not + V3
        • Sual: To be + Subject + V3?
        
        📌 ZAMANLARA GÖRƏ PASSIVE:
        • Present Simple: am/is/are + V3
          "The letter is written by John."
        
        • Past Simple: was/were + V3
          "The letter was written by John."
        
        • Present Continuous: am/is/are + being + V3
          "The letter is being written."
        
        • Past Continuous: was/were + being + V3
          "The letter was being written."
        
        • Present Perfect: have/has + been + V3
          "The letter has been written."
        
        • Future (will): will + be + V3
          "The letter will be written."
        
        • Modal verbs: modal + be + V3
          "The letter must be written."
        
        📌 İSTİFADƏ HALLARI:
        1. Kimin etdiyi bilinməyəndə: "My car was stolen."
        2. Hərəkət vacib olduqda: "The hospital was built in 1990."
        3. Rəsmi və elmi mətnlərdə: "The experiment was conducted."
        4. Kimi vurğulamaq istədikdə: "The play was written by Shakespeare."
        
        📌 XÜSUSİ QAYDALAR:
        • By + agent (kim tərəfindən) - lazım olmadıqda çıxarılır
        • Get + V3 (informal passive): "I got fired."
        • Have/Get something done: "I had my hair cut."
        • Verbs with two objects: give, send, show, etc. (iki object ola bilər)
      `
    },
    { 
      id: 8, 
      title: "Reported Speech", 
      level: "B1", 
      description: "Başqasının dediyi sözləri olduğu kimi təkrar etmədən öz sözlərimizlə çatdırmaq üsulu.",
      rules: `
        📌 QAYDALAR:
        • Direct Speech: "I am happy," she said.
        • Reported Speech: She said (that) she was happy.
        
        📌 ZAMAN DƏYİŞİKLİKLƏRİ:
        • Present Simple → Past Simple
          "I work" → She said she worked.
        
        • Present Continuous → Past Continuous
          "I am working" → She said she was working.
        
        • Past Simple → Past Perfect
          "I worked" → She said she had worked.
        
        • Present Perfect → Past Perfect
          "I have worked" → She said she had worked.
        
        • will → would
          "I will work" → She said she would work.
        
        • can → could
          "I can work" → She said she could work.
        
        • must → had to
          "I must work" → She said she had to work.
        
        📌 KÖMƏKÇİ FEL DƏYİŞİKLİKLƏRİ:
        • this → that
        • these → those
        • here → there
        • now → then
        • today → that day
        • yesterday → the day before / the previous day
        • tomorrow → the next day / the following day
        • ago → before
        
        📌 SUALLARIN REPORTED SPEECH:
        • Yes/No sualları: ask + if/whether
          "Do you like it?" → She asked if I liked it.
        
        • WH-suaları: ask + wh-word
          "Where do you live?" → She asked where I lived.
        
        📌 İSTİFADƏ HALLARI:
        • Say vs Tell: say + (that), tell + object
          "He said (that)..." vs "He told me..."
        • Order və request-lər: tell/ask + object + to + V1
          "Please sit down" → She asked me to sit down.
        • Advice: advise + object + to + V1
      `
    },
    { 
      id: 9, 
      title: "Prepositions", 
      level: "A2", 
      description: "İsimlər, əvəzliklər və ya noun phrase-lərdən əvvəl gələrək onların cümlədəki digər sözlərlə münasibətini göstərən sözlər.",
      rules: `
        📌 ZAMAN PREPOZİSİYALARI:
        • at: at 5 o'clock, at midnight, at Christmas
        • in: in July, in 2020, in the morning
        • on: on Monday, on 5 July, on my birthday
        
        📌 YER PREPOZİSİYALARI:
        • at: at the bus stop, at home, at work
        • in: in London, in the room, in the water
        • on: on the table, on the wall, on the bus
        
        📌 İSTİQAMƏT PREPOZİSİYALARI:
        • to: go to school, fly to Paris
        • into: walk into the room
        • onto: jump onto the table
        • towards: walk towards the door
        
        📌 SƏBƏB VƏ MƏQSƏD:
        • for: I bought it for you
        • because of: The game was cancelled because of rain
        • due to: Due to the weather, we stayed home
        
        📌 ÜMUMİ PREPOZİSİYALAR:
        • with: with a knife, with my friends
        • by: by car, by Shakespeare, by the lake
        • of: the color of the house, a cup of tea
        • for: for two hours, a gift for you
        
        📌 FELLƏR + PREPOZİSİYALAR (Phrasal Verbs):
        • look at, look for, look after
        • listen to, speak to, talk about
        • wait for, ask for, pay for
        • depend on, rely on, insist on
        • apologize for, apply for, care about
        
        📌 SİFƏTLƏR + PREPOZİSİYALAR:
        • afraid of, angry with, interested in
        • good at, bad at, surprised at
        • married to, similar to, different from
        • famous for, responsible for, proud of
      `
    },
    { 
      id: 10, 
      title: "Modal Verbs", 
      level: "B1", 
      description: "Əsas felin mənasını tamamlayan, ehtimal, bacarıq, icazə, məcburiyyət, təklif, məsləhət mənaları verən köməkçi fellər.",
      rules: `
        📌 MODAL FELLƏR VƏ MƏNALARI:
        
        🔹 CAN / COULD (bacarıq, icazə, ehtimal):
        • Ability: "I can swim."
        • Permission: "Can I come in?"
        • Possibility: "It could rain later."
        • Request: "Could you help me?"
        
        🔹 MAY / MIGHT (ehtimal, icazə):
        • Possibility: "It may rain."
        • Permission: "May I use the phone?"
        • Might = daha az ehtimal: "He might be late."
        
        🔹 MUST (məcburiyyət, yüksək ehtimal):
        • Obligation: "You must wear a seatbelt."
        • Certainty: "She must be at home."
        • Mustn't = qadağan: "You mustn't smoke here."
        
        🔹 SHOULD / OUGHT TO (məsləhət, tövsiyə):
        • Advice: "You should see a doctor."
        • Expectation: "The train should arrive soon."
        
        🔹 WILL / WOULD (vəd, təklif, istək):
        • Promise: "I will help you."
        • Offer: "I'll carry that for you."
        • Request: "Would you mind closing the door?"
        • Habit (past): "When I was young, I would play outside."
        
        🔹 SHALL (təklif, sual):
        • Offer/Suggestion: "Shall I open the window?"
        
        🔹 HAVE TO / NEED TO (xarici məcburiyyət):
        • External obligation: "I have to work today."
        • Necessity: "You need to fill this form."
        
        📌 XÜSUSİ QAYDALAR:
        • Modal fellərdən sonra V1 (bare infinitive) gəlir
        • Modal felin 3-cü şəxs təkdə -s əlavəsi yoxdur
        • Modal fellərin past forması: must → had to, can → could
        • Perfect modals: must have + V3, should have + V3
        • Modal verbs of deduction: "He must be tired." (present)
        • Modal verbs of past deduction: "He must have been tired." (past)
      `
    },
    { 
      id: 11, 
      title: "Comparatives & Superlatives", 
      level: "A2", 
      description: "Sifətlərin iki və ya daha çox şeyi müqayisə etmək üçün dəyişdirilmiş formaları.",
      rules: `
        📌 COMPARATIVE FORM (iki şeyin müqayisəsi):
        
        🔹 Qısa sifətlər (1 hecalı):
        • -er + than əlavə olunur
        • tall → taller than
        • "John is taller than Mark."
        
        🔹 Uzun sifətlər (3+ hecalı):
        • more + sifət + than
        • expensive → more expensive than
        • "This car is more expensive than that one."
        
        🔹 2 hecalı sifətlər:
        • -y ilə bitən: -y → -ier (happy → happier)
        • Digərləri: more + sifət (modern → more modern)
        
        📌 SUPERLATIVE FORM (3+ şeyin ən üstünü):
        
        🔹 Qısa sifətlər:
        • the + -est
        • tall → the tallest
        • "Mount Everest is the tallest mountain."
        
        🔹 Uzun sifətlər:
        • the most + sifət
        • expensive → the most expensive
        • "This is the most expensive car."
        
        📌 DÜZENSİZ MÜQAYİSƏLƏR:
        • good → better → the best
        • bad → worse → the worst
        • far → further/farther → the furthest/farthest
        • little → less → the least
        • many/much → more → the most
        
        📌 BƏRABƏRLİK MÜQAYİSƏSİ:
        • as + sifət + as: "She is as tall as her brother."
        • not as + sifət + as: "It's not as expensive as I thought."
        
        📌 GRADUAL CHANGE (tədricən dəyişmə):
        • "It's getting colder and colder."
        • "She is becoming more and more beautiful."
        
        📌 DOUBLE COMPARATIVE (ikiqat müqayisə):
        • "The harder you study, the better your results."
        • "The more I read, the more I learn."
        
        📌 XÜSUSİ QAYDALAR:
        • Than = müqayisədə istifadə olunur
        • The + superlative + in/of: "He is the best student in the class."
        • By far = ən çox: "This is by far the best option."
        • Slightly/much/a lot + comparative: "It's much better now."
      `
    }
  ];

  const [expandedTopic, setExpandedTopic] = useState(null);

  if (expandedTopic) {
    const topic = grammarTopics.find(t => t.id === expandedTopic);
    return (
      <>
        <div className="page-hero">
          <button className="back-btn" onClick={() => setExpandedTopic(null)}>← Back to Topics</button>
          <h2>{topic.title}</h2>
          <p className="topic-level-badge">Level: {topic.level}</p>
          <p>{topic.description}</p>
        </div>
        
        {/* ƏTRAFLI QAYDALAR BÖLMƏSİ */}
        <div className="topic-rules-container">
          <div className="rules-content">
            <pre className="rules-text">{topic.rules}</pre>
          </div>
        </div>
        
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="page-hero">
        <h2>📚 English Grammar Guide</h2>
        <p>Complete reference for English grammar topics from A1 to C1 levels</p>
      </div>
      <div className="grammar-topics-grid">
        {grammarTopics.map((topic) => (
          <div key={topic.id} className="grammar-topic-card" onClick={() => setExpandedTopic(topic.id)}>
            <div className="topic-header">
              <h3>{topic.title}</h3>
              <span className="topic-level-tag">{topic.level}</span>
            </div>
            <p className="topic-description">{topic.description}</p>
            <div className="topic-footer">
              <span>Read more →</span>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};
// ==================== VOCABULARY TEST PAGE ====================
const VocabularyTestPage = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [questionOptions, setQuestionOptions] = useState([]);
  
  const levels = [
    { id: 'A1', name: 'Beginner A1', description: 'Basic vocabulary and simple words', wordCount: '15 words' },
    { id: 'A2', name: 'Elementary A2', description: 'Common words for everyday situations', wordCount: '15 words' },
    { id: 'B1', name: 'Intermediate B1', description: 'Academic and professional vocabulary', wordCount: '15 words' },
    { id: 'B2', name: 'Upper Intermediate B2', description: 'Advanced vocabulary for complex topics', wordCount: '15 words' },
    { id: 'C1', name: 'Advanced C1', description: 'High-level academic and literary vocabulary', wordCount: '15 words' }
  ];

  const vocabData = {
    A1: [
      { word: "House", meaning: "Ev" }, { word: "Apple", meaning: "Alma" }, { word: "Dog", meaning: "İt" }, { word: "Book", meaning: "Kitab" }, { word: "School", meaning: "Məktəb" },
      { word: "Water", meaning: "Su" }, { word: "Chair", meaning: "Stul" }, { word: "Car", meaning: "Maşın" }, { word: "Sun", meaning: "Günəş" }, { word: "Kitchen", meaning: "Mətbəx" },
      { word: "Hat", meaning: "Şapka" }, { word: "Pen", meaning: "Qələm" }, { word: "Forest", meaning: "Meşə" }, { word: "Bed", meaning: "Yataq" }, { word: "Clock", meaning: "Saat" }
    ],
    A2: [
      { word: "Travel", meaning: "Səyahət" }, { word: "Friend", meaning: "Dost" }, { word: "Hotel", meaning: "Otel" }, { word: "Airport", meaning: "Hava limanı" }, { word: "Teacher", meaning: "Müəllim" },
      { word: "Library", meaning: "Kitabxana" }, { word: "Restaurant", meaning: "Restoran" }, { word: "Hospital", meaning: "Xəstəxana" }, { word: "Museum", meaning: "Muzey" }, { word: "Beach", meaning: "Çimərlik" },
      { word: "Stadium", meaning: "Stadion" }, { word: "Mosque", meaning: "Məscid" }, { word: "Radio", meaning: "Radio" }, { word: "Newspaper", meaning: "Qəzet" }, { word: "Cinema", meaning: "Kino" }
    ],
    B1: [
      { word: "Environment", meaning: "Ətraf mühit" }, { word: "Culture", meaning: "Mədəniyyət" }, { word: "Education", meaning: "Təhsil" }, { word: "Communication", meaning: "Ünsiyyət" }, { word: "Technology", meaning: "Texnologiya" },
      { word: "Leadership", meaning: "Rəhbərlik" }, { word: "Management", meaning: "İdarəetmə" }, { word: "Innovation", meaning: "İnnovasiya" }, { word: "Strategy", meaning: "Strategiya" }, { word: "Development", meaning: "İnkişaf" },
      { word: "Skill", meaning: "Bacarıq" }, { word: "Finance", meaning: "Maliyyə" }, { word: "Project", meaning: "Layihə" }, { word: "Support", meaning: "Dəstək" }, { word: "Progress", meaning: "İrəliləyiş" }
    ],
    B2: [
      { word: "Negotiate", meaning: "Danışıq aparmaq" }, { word: "Evaluate", meaning: "Qiymətləndirmək" }, { word: "Collaborate", meaning: "Əməkdaşlıq etmək" }, { word: "Implement", meaning: "Həyata keçirmək" }, { word: "Optimize", meaning: "Optimallaşdırmaq" },
      { word: "Analyze", meaning: "Analiz etmək" }, { word: "Coordinate", meaning: "Koordinasiya etmək" }, { word: "Delegate", meaning: "Vəzifə vermək" }, { word: "Facilitate", meaning: "Asanlaşdırmaq" }, { word: "Innovate", meaning: "İnnovasiya etmək" },
      { word: "Motivate", meaning: "Motivasiya etmək" }, { word: "Prioritize", meaning: "Prioritet təyin etmək" }, { word: "Articulate", meaning: "Aydın ifadə etmək" }, { word: "Comprehend", meaning: "Anlamaq" }, { word: "Convey", meaning: "Çatdırmaq" }
    ],
    C1: [
      { word: "Ubiquitous", meaning: "Hər yerdə olan" }, { word: "Meticulous", meaning: "Çox diqqətli" }, { word: "Exacerbate", meaning: "Pisləşdirmək" }, { word: "Ephemeral", meaning: "Müvəqqəti" }, { word: "Gregarious", meaning: "Ünsiyyətcil" },
      { word: "Ineffable", meaning: "İzah olunmaz" }, { word: "Sagacious", meaning: "Müdrik" }, { word: "Taciturn", meaning: "Az danışan" }, { word: "Voracious", meaning: "Doyumsuz" }, { word: "Magnanimous", meaning: "Ali mərtəbəli" },
      { word: "Cacophony", meaning: "Kakofoniya" }, { word: "Circumspect", meaning: "Ehtiyatlı" }, { word: "Insidious", meaning: "Gizli zərərli" }, { word: "Mellifluous", meaning: "Xoş səsli" }, { word: "Serendipitous", meaning: "Təsadüfi xoşbəxtlik" }
    ]
  };

  const questions = selectedLevel ? vocabData[selectedLevel] : [];

  useEffect(() => {
    if (selectedLevel && questions.length > 0) {
      const allOptions = questions.map((q, index) => {
        const otherMeanings = questions
          .filter((_, idx) => idx !== index)
          .map(q => q.meaning)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        const options = [q.meaning, ...otherMeanings];
        return options.sort(() => 0.5 - Math.random());
      });
      setQuestionOptions(allOptions);
      setAnswers({});
      setSubmitted(false);
      setScore(0);
    }
  }, [selectedLevel]);

  const handleBack = () => {
    setSelectedLevel(null);
    setQuestionOptions([]);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const handleAnswer = (qIndex, value) => {
    if (!submitted) {
      setAnswers({ ...answers, [qIndex]: value });
    }
  };

  const handleSubmit = () => {
    let s = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.meaning) s++;
    });
    setScore(s);
    setSubmitted(true);
  };

  const handleTryAgain = () => {
    if (selectedLevel && questions.length > 0) {
      const allOptions = questions.map((q, index) => {
        const otherMeanings = questions
          .filter((_, idx) => idx !== index)
          .map(q => q.meaning)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        const options = [q.meaning, ...otherMeanings];
        return options.sort(() => 0.5 - Math.random());
      });
      setQuestionOptions(allOptions);
      setAnswers({});
      setSubmitted(false);
      setScore(0);
    }
  };

  if (submitted && selectedLevel) {
    return (
      <div className="quiz-container result-container">
        <button className="back-btn" onClick={handleBack}> Back to Levels</button>
        <h2>Vocabulary Test Results - Level {selectedLevel}</h2>
        <div className="result-card">
          <div className="result-score">
            <span className="score-number">{score}</span>
            <span className="score-total"> / {questions.length}</span>
          </div>
          <div className="result-percentage">{Math.round((score/questions.length)*100)}%</div>
        </div>
        <div className="result-actions">
          <button className="submit-btn" onClick={handleTryAgain}>Try Again</button>
          <button className="submit-btn" onClick={handleBack}>Choose Different Level</button>
        </div>
        <div className="explanations-section">
          <h3>Word List</h3>
          {questions.map((q, i) => (
            <div key={i} className={`explanation-item ${answers[i] === q.meaning ? 'correct-exp' : 'wrong-exp'}`}>
              <p><strong>{q.word}</strong> → {q.meaning}</p>
              <p>Your answer: {answers[i] || 'Not answered'}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selectedLevel && questionOptions.length > 0) {
    return (
      <div className="quiz-container">
        <button className="back-btn" onClick={handleBack}> Back to Levels</button>
        <h2>Vocabulary Test - Level {selectedLevel}</h2>
        <p className="quiz-instruction">What is the meaning of each word?</p>
        <form>
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="question">
              <h3>{qIndex + 1}. {q.word}</h3>
              <div className="options">
                {questionOptions[qIndex] && questionOptions[qIndex].map((opt, optIndex) => (
                  <label key={optIndex} className={answers[qIndex] === opt ? 'selected' : ''}>
                    <input
                      type="radio"
                      name={`q${qIndex}`}
                      value={opt}
                      checked={answers[qIndex] === opt}
                      onChange={() => handleAnswer(qIndex, opt)}
                    />
                    <span className="option-text">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </form>
        <button className="submit-btn" onClick={handleSubmit}>Submit Answers</button>
      </div>
    );
  }

  if (selectedLevel && questionOptions.length === 0) {
    return (
      <div className="quiz-container">
        <button className="back-btn" onClick={handleBack}> Back to Levels</button>
        <h2>Vocabulary Test - Level {selectedLevel}</h2>
        <p>Loading questions...</p>
      </div>
    );
  }

  return (
    <>
      <div className="page-hero">
        <h2>Vocabulary Level Test</h2>
        <p>Choose your level to test your vocabulary knowledge</p>
      </div>
      <div className="level-selection-container">
        {levels.map((level) => (
          <div key={level.id} className="level-card" onClick={() => setSelectedLevel(level.id)}>
            <div className="level-header"><span className="level-badge">{level.id}</span></div>
            <h3>{level.name}</h3>
            <p>{level.description}</p>
            <div className="level-stats"><span>{level.wordCount}</span><span>Multiple Choice</span></div>
            <button className="level-start-btn">Start Test</button>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};


// ==================== READING TEST PAGE ====================
const ReadingTestPage = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanations, setShowExplanations] = useState(false);

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];

  // Complete reading test data
  const readingTests = {
    A1: [
      {
        id: 1,
        title: "My Daily Routine",
        text: "My name is Tom. I am 20 years old and I am a student. Every day, I wake up at 7:00 AM. I brush my teeth and wash my face. Then, I eat breakfast with my family. I usually drink tea and eat eggs with bread. At 8:30 AM, I go to university by bus. My classes start at 9:00 AM and finish at 2:00 PM. After class, I go home and eat lunch. In the evening, I do my homework and play video games. I go to bed at 10:30 PM.",
        questions: [
          { text: "How old is Tom?", options: ["18", "20", "22", "25"], correct: 1, explanation: "Text: 'My name is Tom. I am 20 years old...'" },
          { text: "What time does Tom wake up?", options: ["6:00 AM", "7:00 AM", "8:30 AM", "9:00 AM"], correct: 1, explanation: "Text: '...I wake up at 7:00 AM.'" },
          { text: "How does Tom go to university?", options: ["By car", "On foot", "By bus", "By train"], correct: 2, explanation: "Text: '...I go to university by bus.'" },
          { text: "What does Tom eat for breakfast?", options: ["Pizza and coffee", "Fruit and milk", "Eggs with bread", "Soup and rice"], correct: 2, explanation: "Text: 'I usually drink tea and eat eggs with bread.'" },
          { text: "What time do his classes finish?", options: ["1:00 PM", "2:00 PM", "3:00 PM", "10:30 PM"], correct: 1, explanation: "Text: 'My classes start at 9:00 AM and finish at 2:00 PM.'" },
          { text: "What does Tom do in the evening?", options: ["He goes to university", "He plays football", "He does homework and plays video games", "He cleans the house"], correct: 2, explanation: "Text: 'In the evening, I do my homework and play video games.'" }
        ]
      },
      {
        id: 2,
        title: "My Favorite Pet",
        text: "Sarah has a pet dog. His name is Max. Max is small, white, and very friendly. Sarah's father brought Max home two years ago on Sarah's birthday. Max loves to run in the park and play with a red ball. Every morning, Sarah takes Max for a walk before school. Max eats dog food twice a day and drinks a lot of water. When Sarah comes home from school, Max wags his tail and barks happily. Sarah loves her dog very much.",
        questions: [
          { text: "What kind of animal is Max?", options: ["A cat", "A parrot", "A dog", "A rabbit"], correct: 2, explanation: "Text: 'Sarah has a pet dog. His name is Max.'" },
          { text: "What color is Max?", options: ["Black", "White", "Brown", "Grey"], correct: 1, explanation: "Text: 'Max is small, white, and very friendly.'" },
          { text: "When did Sarah get Max?", options: ["On her birthday", "At Christmas", "Last summer", "Yesterday"], correct: 0, explanation: "Text: 'Sarah's father brought Max home two years ago on Sarah's birthday.'" },
          { text: "What is Max's favorite toy?", options: ["A blue shoe", "A red ball", "A small bone", "A yellow stick"], correct: 1, explanation: "Text: 'Max loves to run in the park and play with a red ball.'" },
          { text: "How many times a day does Max eat?", options: ["Once", "Twice", "Three times", "Four times"], correct: 1, explanation: "Text: 'Max eats dog food twice a day...'" },
          { text: "How does Max react when Sarah comes home?", options: ["He sleeps", "He runs away", "He wags his tail and barks happily", "He eats his food"], correct: 2, explanation: "Text: 'When Sarah comes home from school, Max wags his tail and barks happily.'" }
        ]
      },
      {
        id: 3,
        title: "A Visit to the Supermarket",
        text: "Today is Saturday. Anna and her mother are at the supermarket. They need to buy food for the week. First, they go to the fruit section. Anna chooses six apples and three bananas. Next, her mother buys milk, cheese, and butter in the dairy department. Anna also wants some chocolate, but her mother says, Only one small bar. Finally, they pay for the food at the checkout with a credit card and carry the bags to their car.",
        questions: [
          { text: "What day is it today?", options: ["Friday", "Saturday", "Sunday", "Monday"], correct: 1, explanation: "Text: 'Today is Saturday.'" },
          { text: "Who is Anna with?", options: ["Her father", "Her friend", "Her mother", "Her brother"], correct: 2, explanation: "Text: 'Anna and her mother are at the supermarket.'" },
          { text: "How many apples does Anna choose?", options: ["Three", "Four", "Six", "Ten"], correct: 2, explanation: "Text: 'Anna chooses six apples...'" },
          { text: "Which department has milk and cheese?", options: ["Bakery", "Fruit section", "Dairy department", "Meat section"], correct: 2, explanation: "Text: '...buys milk, cheese, and butter in the dairy department.'" },
          { text: "What does Anna's mother allow her to buy?", options: ["Big ice cream", "Two cakes", "One small bar of chocolate", "Potato chips"], correct: 2, explanation: "Text: 'Anna also wants some chocolate, but her mother says, Only one small bar.'" },
          { text: "How do they pay for the items?", options: ["With cash", "With a credit card", "With a phone app", "They don't pay"], correct: 1, explanation: "Text: '...they pay for the food at the checkout with a credit card...'" }
        ]
      },
      {
        id: 4,
        title: "A Sunny Day at the Beach",
        text: "It is summer and the weather is very hot. Mark and his family are at the beach. The sky is blue and the sun is shining. Mark's sister, Lily, is building a big sandcastle. Mark is swimming in the cool sea water. Their parents are sitting under a large umbrella and reading books. At 1:00 PM, they all sit together to eat sandwiches and drink fresh orange juice. It is a wonderful and relaxing day.",
        questions: [
          { text: "What season is it in the story?", options: ["Winter", "Spring", "Summer", "Autumn"], correct: 2, explanation: "Text: 'It is summer and the weather is very hot.'" },
          { text: "What is Lily doing?", options: ["Swimming in the sea", "Building a sandcastle", "Reading a book", "Drinking orange juice"], correct: 1, explanation: "Text: 'Mark's sister, Lily, is building a big sandcastle.'" },
          { text: "What is Mark doing?", options: ["Sleeping", "Cooking food", "Swimming in the sea", "Flying a kite"], correct: 2, explanation: "Text: 'Mark is swimming in the cool sea water.'" },
          { text: "Where are the parents sitting?", options: ["In a restaurant", "Under a large umbrella", "In the car", "On a boat"], correct: 1, explanation: "Text: 'Their parents are sitting under a large umbrella...'" },
          { text: "What do they eat at 1:00 PM?", options: ["Pizza", "Ice cream", "Sandwiches", "Salads"], correct: 2, explanation: "Text: '...they all sit together to eat sandwiches...'" },
          { text: "What do they drink?", options: ["Cold water", "Fresh orange juice", "Tea", "Lemonade"], correct: 1, explanation: "Text: '...and drink fresh orange juice.'" }
        ]
      }
    ],
    A2: [
      {
        id: 1,
        title: "The New City Library",
        text: "The town of Greenfield opened a new public library last month. The building is modern, bright, and has three floors. On the first floor, visitors can find newspapers, popular magazines, and a small cafe that sells coffee and snacks. The second floor contains thousands of books, including novels, history books, and science textbooks. The third floor is a silent study area equipped with computers and free Wi-Fi for students. Anyone living in the town can get a free library card to borrow up to five books for three weeks.",
        questions: [
          { text: "When did the new library open?", options: ["Last week", "Last month", "Last year", "Two months ago"], correct: 1, explanation: "Text: 'The town of Greenfield opened a new public library last month.'" },
          { text: "What can visitors find on the first floor?", options: ["A silent study area", "Computers and Wi-Fi", "Newspapers, magazines, and a cafe", "Science textbooks"], correct: 2, explanation: "Text: 'On the first floor, visitors can find newspapers, popular magazines, and a small cafe...'" },
          { text: "Where are the computers located?", options: ["On the first floor", "On the second floor", "On the third floor", "In the cafe"], correct: 2, explanation: "Text: 'The third floor is a silent study area equipped with computers...'" },
          { text: "Who can get a free library card?", options: ["Only university students", "Anyone living in the town", "Teachers only", "Children under 10 years old"], correct: 1, explanation: "Text: 'Anyone living in the town can get a free library card...'" },
          { text: "How many books can a member borrow at one time?", options: ["Three", "Four", "Five", "Ten"], correct: 2, explanation: "Text: '...to borrow up to five books...'" },
          { text: "How long can you keep the borrowed books?", options: ["One week", "Two weeks", "Three weeks", "One month"], correct: 2, explanation: "Text: '...for three weeks.'" }
        ]
      },
      {
        id: 2,
        title: "Preparing for a Trip",
        text: "Next weekend, David is going on a camping trip to the mountains with three of his close friends. They plan to leave early on Saturday morning and stay until Sunday evening. David spent all Tuesday night packing his equipment. He packed a tent, a warm sleeping bag, a flashlight, and comfortable hiking boots. His friend Jack is responsible for bringing the food, while Emma is bringing cooking equipment and a first-aid kit. They are excited because the weather forecast predicts clear skies and warm weather.",
        questions: [
          { text: "Where is David going next weekend?", options: ["To the beach", "To another city", "To the mountains", "To a hotel"], correct: 2, explanation: "Text: 'David is going on a camping trip to the mountains...'" },
          { text: "How many people are going on the trip in total?", options: ["Three", "Four", "Five", "Two"], correct: 1, explanation: "Text: '...with three of his close friends.' (David + 3 friends = 4 total)" },
          { text: "When do they plan to leave?", options: ["Friday night", "Saturday morning", "Saturday evening", "Sunday morning"], correct: 1, explanation: "Text: 'They plan to leave early on Saturday morning...'" },
          { text: "What item did David pack?", options: ["Cooking equipment", "Food", "A first-aid kit", "A flashlight"], correct: 3, explanation: "Text: 'He packed a tent, a warm sleeping bag, a flashlight...'" },
          { text: "Who is bringing the food for the trip?", options: ["David", "Jack", "Emma", "David's brother"], correct: 1, explanation: "Text: 'His friend Jack is responsible for bringing the food...'" },
          { text: "What is the weather forecast for the weekend?", options: ["Rainy and cold", "Clear skies and warm", "Windy and stormy", "Snowy"], correct: 1, explanation: "Text: '...the weather forecast predicts clear skies and warm weather.'" }
        ]
      },
      {
        id: 3,
        title: "Learning a New Language",
        text: "Learning a foreign language can be a challenging but rewarding experience. Many people choose to learn English because it is widely spoken around the world. Experts suggest that practicing for 15 to 20 minutes every day is much better than studying for three hours once a week. Listening to English podcasts, watching movies with subtitles, and speaking with native speakers are effective ways to improve quickly. The most important thing is not to be afraid of making mistakes, because mistakes are a natural part of learning.",
        questions: [
          { text: "Why do many people choose to learn English?", options: ["Because it is easy", "Because it is widely spoken around the world", "Because it has no grammar rules", "Because it is mandatory everywhere"], correct: 1, explanation: "Text: 'Many people choose to learn English because it is widely spoken around the world.'" },
          { text: "What daily practice time do experts recommend?", options: ["5 minutes", "15 to 20 minutes", "One hour", "Three hours"], correct: 1, explanation: "Text: 'Experts suggest that practicing for 15 to 20 minutes every day...'" },
          { text: "Why is studying 15 minutes daily better than 3 hours once a week?", options: ["It saves money", "It helps keep learning consistent", "It is less boring", "The text does not say"], correct: 1, explanation: "The text implies consistency is better." },
          { text: "Which is NOT mentioned as a helpful learning method?", options: ["Listening to podcasts", "Watching movies with subtitles", "Memorizing the entire dictionary", "Speaking with native speakers"], correct: 2, explanation: "Memorizing the entire dictionary is not mentioned in the text." },
          { text: "What is considered a natural part of learning a language?", options: ["Making mistakes", "Taking expensive exams", "Traveling to England", "Writing long books"], correct: 0, explanation: "Text: '...mistakes are a natural part of learning.'" },
          { text: "According to the text, what should learners NOT be afraid of?", options: ["Speaking aloud", "Making mistakes", "Listening to native speakers", "Reading long articles"], correct: 1, explanation: "Text: 'The most important thing is not to be afraid of making mistakes...'" }
        ]
      },
      {
        id: 4,
        title: "An Unforgettable Weekend",
        text: "Last month, Lisa won a photography competition organized by a local magazine. Her prize was a two-day trip to a coastal town famous for its picturesque landscapes. On the first day, she woke up early to capture the sunrise over the ocean. The light was golden and soft, creating perfect conditions for her photos. Later that afternoon, she explored the historic city center and took pictures of old wooden houses and narrow cobblestone streets. She returned home with over five hundred photographs and many great memories.",
        questions: [
          { text: "How did Lisa get the chance to go on the trip?", options: ["She bought a ticket", "She won a photography competition", "Her school organized it", "Her family gifted it to her"], correct: 1, explanation: "Text: 'Lisa won a photography competition organized by a local magazine.'" },
          { text: "Where was the trip located?", options: ["In a mountainous village", "In a coastal town", "In a large capital city", "Near a desert"], correct: 1, explanation: "Text: '...a two-day trip to a coastal town...'" },
          { text: "Why did Lisa wake up early on the first day?", options: ["To catch a train", "To capture the sunrise", "To buy local food", "To meet a friend"], correct: 1, explanation: "Text: '...she woke up early to capture the sunrise over the ocean.'" },
          { text: "What did she photograph in the afternoon?", options: ["Sea animals", "Modern skyscrapers", "Old wooden houses and cobblestone streets", "A local festival"], correct: 2, explanation: "Text: '...she explored the historic city center and took pictures of old wooden houses and narrow cobblestone streets.'" },
          { text: "How many photographs did she take during the trip?", options: ["Exactly one hundred", "Around two hundred", "Over five hundred", "More than a thousand"], correct: 2, explanation: "Text: 'She returned home with over five hundred photographs...'" },
          { text: "What made the sunrise good for photography?", options: ["The weather was cloudy", "The light was golden and soft", "The sun was extremely bright", "There were many birds"], correct: 1, explanation: "Text: 'The light was golden and soft, creating perfect conditions for her photos.'" }
        ]
      }
    ],
    B1: [
      {
        id: 1,
        title: "The Evolution of Remote Work",
        text: "In recent years, remote work has transformed from an occasional benefit into a standard working model for millions of professionals worldwide. Advances in telecommunication technology and cloud computing have enabled employees to perform complex tasks from almost anywhere. Proponents of remote work highlight increased flexibility, eliminated commute times, and improved work-life balance as major benefits. However, challenges remain, including feelings of isolation, difficulty in separating professional and personal life, and reduced face-to-face collaboration. Companies are increasingly adopting hybrid models to combine the advantages of both remote and in-office setups.",
        questions: [
          { text: "What has enabled the rapid growth of remote work?", options: ["Decreased internet prices", "Advances in telecommunication technology and cloud computing", "New government laws", "Higher corporate profits"], correct: 1, explanation: "Text: 'Advances in telecommunication technology and cloud computing have enabled employees to perform complex tasks from almost anywhere.'" },
          { text: "Which is NOT mentioned as a benefit of remote work?", options: ["Increased flexibility", "No commute time", "Free equipment from employers", "Better work-life balance"], correct: 2, explanation: "Free equipment is not mentioned as a benefit." },
          { text: "What major challenge do remote workers face regarding social connection?", options: ["High phone bills", "Feelings of isolation", "Too many meetings", "Lack of training"], correct: 1, explanation: "Text: '...challenges remain, including feelings of isolation...'" },
          { text: "What is a hybrid work model?", options: ["Working entirely from home", "Working only on weekends", "Combining remote and in-office work", "Working for two companies simultaneously"], correct: 2, explanation: "Text: 'Companies are increasingly adopting hybrid models to combine the advantages of both remote and in-office setups.'" },
          { text: "Why do companies adopt hybrid models?", options: ["To reduce office rent to zero", "To combine the advantages of remote and office work", "Because employees dislike working from home", "To monitor workers constantly"], correct: 1, explanation: "Text: '...to combine the advantages of both remote and in-office setups.'" },
          { text: "The word 'Proponents' in the passage is closest in meaning to:", options: ["Opponents", "Supporters", "Managers", "Researchers"], correct: 1, explanation: "Proponents means supporters or advocates of something." }
        ]
      },
      {
        id: 2,
        title: "The Importance of Biodiversity",
        text: "Biodiversity refers to the variety of living organisms, including plants, animals, and microorganisms, that inhabit our planet. Healthy ecosystems depend on biodiversity to function properly and provide essential resources such as clean water, oxygen, and fertile soil. Unfortunately, human activities such as deforestation, pollution, and climate change are accelerating the extinction rate of species worldwide. Protecting biodiversity requires international cooperation, habitat preservation, and sustainable agricultural practices. Preserving ecological balance is vital not only for wildlife but also for the long-term survival of human civilization.",
        questions: [
          { text: "What is the main definition of biodiversity according to the text?", options: ["The total weight of animals on Earth", "The variety of living organisms on the planet", "The study of rainforest plants", "The rate of ocean pollution"], correct: 1, explanation: "Text: 'Biodiversity refers to the variety of living organisms...'" },
          { text: "What essential resource provided by ecosystems is mentioned?", options: ["Electricity", "Fertile soil", "Plastic materials", "Renewable energy"], correct: 1, explanation: "Text: '...provide essential resources such as clean water, oxygen, and fertile soil.'" },
          { text: "Which human activity is listed as a threat to biodiversity?", options: ["Solar power generation", "Organic farming", "Deforestation", "Wildlife monitoring"], correct: 2, explanation: "Text: '...human activities such as deforestation, pollution, and climate change...'" },
          { text: "What is necessary to protect biodiversity on a global level?", options: ["Building more cities", "International cooperation", "Increasing industrial output", "Stopping all farming"], correct: 1, explanation: "Text: 'Protecting biodiversity requires international cooperation...'" },
          { text: "Why is ecological balance important for humans?", options: ["It ensures lower food prices", "It guarantees political stability", "It is vital for human survival", "It creates tourism jobs"], correct: 2, explanation: "Text: '...vital not only for wildlife but also for the long-term survival of human civilization.'" },
          { text: "What is the author's primary purpose in writing this passage?", options: ["To promote a specific holiday destination", "To raise awareness about preserving biodiversity", "To criticize agricultural techniques", "To explain the process of photosynthesis"], correct: 1, explanation: "The author aims to inform and raise awareness about biodiversity protection." }
        ]
      },
      {
        id: 3,
        title: "The History of Coffee Culture",
        text: "Coffee is one of the most consumed beverages globally, but its journey began centuries ago in the ancient coffee forests of the Ethiopian plateau. Legend says a goat herder named Kaldi discovered coffee after noticing his goats became energetic after eating berries from a specific tree. From Ethiopia, coffee spread to the Arabian Peninsula, where public coffee houses first emerged as vibrant centers of intellectual discussion and news exchange. By the 17th century, coffee had reached Europe, quickly establishing itself as a favorite drink among thinkers and merchants alike.",
        questions: [
          { text: "Where did coffee originate according to the text?", options: ["Brazil", "Italy", "The Ethiopian plateau", "Arabia"], correct: 2, explanation: "Text: '...began centuries ago in the ancient coffee forests of the Ethiopian plateau.'" },
          { text: "How was coffee discovered according to the legend?", options: ["A farmer cooked coffee beans", "A goat herder noticed energetic goats", "A king drank a new herbal tea", "Travelers found dried beans on the road"], correct: 1, explanation: "Text: 'Legend says a goat herder named Kaldi discovered coffee after noticing his goats became energetic...'" },
          { text: "What role did early coffee houses play in the Arabian Peninsula?", options: ["They were places to buy cheap food", "They served as centers of intellectual discussion", "They were exclusively for royal families", "They operated as hotels for traders"], correct: 1, explanation: "Text: '...where public coffee houses first emerged as vibrant centers of intellectual discussion...'" },
          { text: "When did coffee reach Europe?", options: ["In the 12th century", "In the 15th century", "In the 17th century", "In the 20th century"], correct: 2, explanation: "Text: 'By the 17th century, coffee had reached Europe...'" },
          { text: "Who particularly favored coffee when it arrived in Europe?", options: ["Soldiers and sailors", "Thinkers and merchants", "Farmers and children", "Monarchs only"], correct: 1, explanation: "Text: '...establishing itself as a favorite drink among thinkers and merchants alike.'" },
          { text: "The word 'vibrant' in the paragraph closest means:", options: ["Quiet and calm", "Lively and energetic", "Dark and mysterious", "Expensive and luxury"], correct: 1, explanation: "Vibrant means full of energy and enthusiasm; lively." }
        ]
      },
      {
        id: 4,
        title: "Urban Green Spaces",
        text: "As cities continue to expand rapidly, the integration of green spaces such as parks, rooftop gardens, and urban forests has become a priority for city planners. These natural zones offer numerous psychological and physical health benefits to residents, including reduced stress levels and cleaner air quality. Furthermore, urban greenery acts as a natural sponge, absorbing excess stormwater and mitigating the urban heat island effect. Investing in green infrastructure not only enhances city aesthetics but also builds resilient, sustainable communities.",
        questions: [
          { text: "What issue do city planners address by adding green spaces?", options: ["High traffic congestion", "Rapid urban expansion", "Lack of public transport", "Building height limits"], correct: 1, explanation: "Text: 'As cities continue to expand rapidly, the integration of green spaces...has become a priority...'" },
          { text: "Which health benefit for residents is mentioned in the text?", options: ["Improved vision", "Reduced stress levels", "Lower risk of bone fracture", "Weight loss"], correct: 1, explanation: "Text: '...including reduced stress levels and cleaner air quality.'" },
          { text: "How do urban green spaces help during heavy rainfall?", options: ["By diverting rain into rivers", "By absorbing excess stormwater like a sponge", "By freezing rainwater", "By storing water in underground tanks"], correct: 1, explanation: "Text: '...absorbs excess stormwater...'" },
          { text: "What is the urban heat island effect reduced by?", options: ["Tall concrete buildings", "Urban greenery", "Air conditioning systems", "Underground subways"], correct: 1, explanation: "Text: '...mitigating the urban heat island effect.' (through green spaces)" },
          { text: "What is one aesthetic benefit of green infrastructure?", options: ["It increases building prices", "It enhances city appearance", "It makes roads wider", "It removes street lights"], correct: 1, explanation: "Text: 'Investing in green infrastructure not only enhances city aesthetics...'" },
          { text: "The word 'mitigating' in the text means:", options: ["Increasing", "Moderating or reducing", "Ignoring", "Measuring"], correct: 1, explanation: "Mitigating means making something less severe or serious." }
        ]
      }
    ],
    B2: [
      {
        id: 1,
        title: "Artificial Intelligence in Modern Healthcare",
        text: "The integration of Artificial Intelligence (AI) into modern healthcare systems represents a pivotal shift in medical diagnostics and personalized treatment protocols. Machine learning algorithms, trained on vast datasets of radiological images and patient records, are demonstrating remarkable precision in detecting early-stage pathologies often exceeding the accuracy rates of human specialists. Moreover, AI-driven predictive modeling enables clinicians to anticipate patient deterioration hours before clinical symptoms manifest. However, this technological leap is accompanied by significant ethical dilemmas. Issues regarding patient data privacy, algorithmic bias, and the erosion of the physician-patient relationship necessitate robust regulatory frameworks to ensure AI is deployed safely and ethically without replacing human clinical judgment.",
        questions: [
          { text: "What is the primary advantage of AI in diagnostics mentioned in the text?", options: ["It reduces medical treatment costs to zero", "It detects early-stage pathologies with high precision", "It completely replaces the need for medical doctors", "It speeds up hospital admission processes"], correct: 1, explanation: "Text: '...demonstrating remarkable precision in detecting early-stage pathologies...'" },
          { text: "How does predictive modeling assist clinicians in patient care?", options: ["By prescribing automatic dosages", "By anticipating patient deterioration before symptoms appear", "By scheduling surgery dates automatically", "By communicating directly with patient relatives"], correct: 1, explanation: "Text: '...enables clinicians to anticipate patient deterioration hours before clinical symptoms manifest.'" },
          { text: "Which ethical dilemma associated with AI is explicitly stated?", options: ["High cost of purchasing AI hardware", "Algorithmic bias and data privacy concerns", "Lack of interest from medical students", "Overreliance on physical textbooks"], correct: 1, explanation: "Text: 'Issues regarding patient data privacy, algorithmic bias...'" },
          { text: "What is required to ensure the safe deployment of medical AI?", options: ["Eliminating human doctors entirely", "Robust regulatory frameworks", "Restricting AI to research institutions only", "Free software licenses for all hospitals"], correct: 1, explanation: "Text: '...necessitate robust regulatory frameworks to ensure AI is deployed safely...'" },
          { text: "What position does the author take regarding the role of AI in medicine?", options: ["AI should fully replace human doctors immediately", "AI is useless and dangerous in clinical settings", "AI should complement, not replace, human clinical judgment", "AI is only applicable in basic administrative tasks"], correct: 2, explanation: "Text: '...without replacing human clinical judgment.'" },
          { text: "The word 'pivotal' in the first sentence is closest in meaning to:", options: ["Minor and trivial", "Crucial and transformative", "Slow and gradual", "Temporary and uncertain"], correct: 1, explanation: "Pivotal means of crucial importance; central and transformative." }
        ]
      },
      {
        id: 2,
        title: "The Psychology of Consumer Behavior",
        text: "Understanding consumer behavior requires delving into complex cognitive and emotional processes that dictate purchasing decisions. Marketers frequently employ psychological triggers, such as cognitive scarcity and social proof, to influence buyer actions. The perception that a product is in limited supply triggers a psychological sense of urgency, compelling consumers to purchase impulsively to avoid potential regret. Similarly, consumer decisions are heavily anchored by social validation; potential buyers consistently rely on ratings, reviews, and influencer endorsements to validate their choices. Recognizing these subconscious drivers enables corporations to craft subtle yet potent marketing strategies that subtly guide consumer choices.",
        questions: [
          { text: "What drives consumer purchasing decisions according to the passage?", options: ["Purely mathematical financial calculations", "Complex cognitive and emotional processes", "Direct instruction from retail store staff", "Government recommendations"], correct: 1, explanation: "Text: 'Understanding consumer behavior requires delving into complex cognitive and emotional processes...'" },
          { text: "How does the principle of cognitive scarcity influence buyers?", options: ["It offers them discount coupons", "It triggers a sense of urgency to purchase impulsively", "It guarantees product durability", "It reduces shipping times"], correct: 1, explanation: "Text: '...triggers a psychological sense of urgency, compelling consumers to purchase impulsively...'" },
          { text: "What role do online reviews and ratings play in consumer behavior?", options: ["They serve as social proof to validate purchasing choices", "They lower the production costs of goods", "They inform manufacturers about raw materials", "They prevent competitors from advertising"], correct: 0, explanation: "Text: '...potential buyers consistently rely on ratings, reviews, and influencer endorsements to validate their choices.'" },
          { text: "What does the term 'anchored' imply in the context of consumer decisions?", options: ["Decisions are fixed and immovable", "Decisions are strongly influenced or grounded by specific reference points", "Decisions are made slowly over several years", "Decisions are completely random"], correct: 1, explanation: "Anchored means strongly influenced or grounded by specific reference points." },
          { text: "Why do corporations study subconscious consumer drivers?", options: ["To redesign their legal contracts", "To craft effective strategies that subtly guide choices", "To reduce tax obligations", "To hire fewer marketing specialists"], correct: 1, explanation: "Text: '...enables corporations to craft subtle yet potent marketing strategies that subtly guide consumer choices.'" },
          { text: "The word 'compelling' in the text is closest in meaning to:", options: ["Forcing or strongly persuading", "Discouraging", "Confusing", "Delaying"], correct: 0, explanation: "Compelling means forcing or strongly persuading someone to do something." }
        ]
      },
      {
        id: 3,
        title: "Sustainable Architecture and Urban Resilience",
        text: "As climate change accelerates urbanization challenges, sustainable architecture has shifted from an eco-conscious trend into an architectural necessity. Modern sustainable design focuses on minimizing a structure's environmental footprint through energy-efficient insulation, passive solar heating, and integrated rainwater harvesting systems. Furthermore, architects increasingly utilize cross-laminated timber and recycled industrial materials to diminish embodied carbon emissions generated during construction. Beyond environmental benefits, resilient architecture incorporates modular structures capable of withstanding extreme weather events, thereby safeguarding urban populations against climate instability.",
        questions: [
          { text: "How has sustainable architecture evolved according to the passage?", options: ["From a core principle into a forgotten theory", "From an eco-conscious trend into an architectural necessity", "From a costly experiment into an illegal practice", "From commercial building into residential housing only"], correct: 1, explanation: "Text: '...sustainable architecture has shifted from an eco-conscious trend into an architectural necessity.'" },
          { text: "Which design feature is mentioned as a way to minimize environmental impact?", options: ["Marble flooring", "Passive solar heating", "High-voltage air conditioning", "Deep underground basements"], correct: 1, explanation: "Text: '...focuses on minimizing...through energy-efficient insulation, passive solar heating...'" },
          { text: "Why is cross-laminated timber utilized in modern construction?", options: ["To lower construction noise levels", "To diminish embodied carbon emissions", "To reduce building security costs", "To simplify plumbing installations"], correct: 1, explanation: "Text: '...utilize cross-laminated timber and recycled industrial materials to diminish embodied carbon emissions...'" },
          { text: "What feature allows resilient structures to survive extreme weather?", options: ["Glass curtain walls", "Modular construction designs", "High-speed elevators", "Synthetic roofing paint"], correct: 1, explanation: "Text: '...resilient architecture incorporates modular structures capable of withstanding extreme weather events...'" },
          { text: "What is the overall goal of resilient architecture described in the text?", options: ["To increase property taxation value", "To safeguard urban populations against climate instability", "To make all buildings look visually identical", "To shorten construction times to a few days"], correct: 1, explanation: "Text: '...safeguarding urban populations against climate instability.'" },
          { text: "What does 'embodied carbon emissions' refer to in this context?", options: ["Carbon produced by residents during daily living", "Carbon generated during the manufacturing and transport of building materials", "Carbon absorbed by urban trees around the building", "Carbon emitted by appliances inside offices"], correct: 1, explanation: "Embodied carbon refers to the carbon emitted during the production and transportation of building materials." }
        ]
      },
      {
        id: 4,
        title: "The Impact of Globalization on Cultural Identity",
        text: "Globalization has undeniably interconnected international markets and facilitated seamless cross-cultural communication. However, this profound global integration has ignited an intense academic debate concerning its impact on local cultural identity. Critics argue that the global dominance of Western media conglomerates promotes cultural homogenization, gradually eroding unique indigenous traditions, dialects, and social customs. Conversely, proponents contend that globalization fosters cultural hybridization, a dynamic process where global influences are absorbed and reinterpreted within local contexts, giving rise to novel, vibrant cultural expressions rather than complete assimilation.",
        questions: [
          { text: "What major concern do critics raise regarding globalization?", options: ["Decline in international trade volume", "Cultural homogenization and loss of local traditions", "Excessive translation of literature", "Reduced speed of internet communications"], correct: 1, explanation: "Text: 'Critics argue that the global dominance of Western media conglomerates promotes cultural homogenization...'" },
          { text: "What entity is accused of pushing cultural homogenization?", options: ["Local agricultural unions", "Western media conglomerates", "Non-profit environmental NGOs", "Academic research institutions"], correct: 1, explanation: "Text: '...the global dominance of Western media conglomerates promotes cultural homogenization...'" },
          { text: "How do proponents view the process of 'cultural hybridization'?", options: ["As a destructive force erasing all native history", "As a dynamic process creating novel cultural expressions", "As a temporary economic trend without cultural value", "As an artificial policy enforced by international laws"], correct: 1, explanation: "Text: '...fosters cultural hybridization...giving rise to novel, vibrant cultural expressions...'" },
          { text: "What happens during cultural hybridization according to the text?", options: ["Local populations abandon their native languages completely", "Global influences are reinterpreted within local contexts", "Foreign media is strictly banned by governments", "Ancient traditions remain completely unchanged"], correct: 1, explanation: "Text: '...where global influences are absorbed and reinterpreted within local contexts...'" },
          { text: "The primary purpose of the text is to:", options: ["Encourage governments to block foreign media", "Present contrasting viewpoints on globalization's cultural impact", "Prove that Western culture is superior to local cultures", "Propose new international trade tariffs"], correct: 1, explanation: "The text presents both critical and positive perspectives." },
          { text: "The word 'erosion' (eroding) in the context means:", options: ["Gradual destruction or loss", "Sudden expansion", "Intentional preservation", "Complete isolation"], correct: 0, explanation: "Erosion means the gradual destruction or weakening of something." }
        ]
      }
    ],
    C1: [
      {
        id: 1,
        title: "Epistemological Foundations of Scientific Paradigms",
        text: "Thomas Kuhn's seminal work on scientific revolutions fundamentally disrupted the conventional, linear conception of scientific progress. Kuhn posited that science does not advance through a steady accumulation of objective knowledge, but rather operates within dominant operational frameworks termed 'paradigms.' During periods of 'normal science,' researchers work within the established paradigm, resolving anomalies without challenging core assumptions. However, as unresolvable empirical anomalies accumulate, the paradigm experiences a crisis, eventually culminating in a revolutionary 'paradigm shift.' This new framework redefines fundamental terminology and methodological standards, rendering the pre- and post-revolution scientific theories largely incommensurable.",
        questions: [
          { text: "What traditional view of scientific progress did Thomas Kuhn challenge?", options: ["That science is purely theoretical and lacks practical application", "That scientific knowledge accumulates in a steady, linear progression", "That scientific experiments are inherently unrepeatable", "That scientific research is driven by political agendas"], correct: 1, explanation: "Text: '...disrupted the conventional, linear conception of scientific progress.'" },
          { text: "According to Kuhn, how do scientists act during periods of 'normal science'?", options: ["They constantly attempt to overthrow the prevailing theories", "They resolve anomalies while remaining inside the established paradigm", "They reject empirical data in favor of philosophical dogma", "They work independently without adopting standard methodologies"], correct: 1, explanation: "Text: '...researchers work within the established paradigm, resolving anomalies without challenging core assumptions.'" },
          { text: "What directly precipitates a crisis within a scientific paradigm?", options: ["A lack of funding for university laboratories", "The accumulation of unresolvable empirical anomalies", "Public opposition to technological innovation", "Disagreements between theoretical and applied physicists"], correct: 1, explanation: "Text: '...as unresolvable empirical anomalies accumulate, the paradigm experiences a crisis...'" },
          { text: "What does the term 'incommensurable' imply in the context of paradigm shifts?", options: ["The two paradigms can be easily compared using identical criteria", "The paradigms are so fundamentally different that direct comparison using shared standards is impossible", "The new paradigm is mathematically smaller than the old one", "Both paradigms can coexist without any intellectual conflict"], correct: 1, explanation: "Incommensurable means lacking a common standard of measurement." },
          { text: "Which best captures the main theme of the text?", options: ["The historical development of physics laboratories", "The mechanism and philosophical implications of scientific paradigm shifts", "A biographical critique of Thomas Kuhn's scientific career", "The necessity of increasing empirical data collection"], correct: 1, explanation: "The text focuses on Kuhn's theory of scientific paradigms." },
          { text: "The word 'seminal' in the first sentence is closest in meaning to:", options: ["Outdated and forgotten", "Highly influential and groundbreaking", "Highly controversial and rejected", "Simple and elementary"], correct: 1, explanation: "Seminal means highly influential and groundbreaking." }
        ]
      },
      {
        id: 2,
        title: "The Socioeconomic Impact of Algorithmic Automation",
        text: "The burgeoning reliance on advanced algorithmic automation and generative machine intelligence has triggered a seismic re-evaluation of labor economics. Unlike prior industrial revolutions that primarily displaced manual labor while simultaneously creating higher-tier managerial and technical positions, contemporary cognitive automation imperils cognitive and creative roles previously thought immune to technological disruption. While technocrats argue that capital reallocation into automated systems inevitably maximizes aggregate economic productivity, labor economists highlight the widening wealth polarization and severe structural unemployment facing mid-skill knowledge workers. Mitigating this profound socioeconomic rift will require radical institutional interventions, such as universal basic income schemes, proactive retraining programs, and revised capital taxation models.",
        questions: [
          { text: "How does current cognitive automation differ from past industrial revolutions?", options: ["It only affects agricultural workers in developing nations", "It threatens high-level cognitive and creative positions rather than solely manual labor", "It reduces overall corporate productivity across all sectors", "It relies entirely on human physical labor for execution"], correct: 1, explanation: "Text: '...contemporary cognitive automation imperils cognitive and creative roles previously thought immune...'" },
          { text: "What argument is put forward by technocrats regarding automation?", options: ["It will lead to immediate national bankruptcy", "It maximizes aggregate economic productivity through capital reallocation", "It should be outlawed by international treaties", "It benefits only non-profit research organizations"], correct: 1, explanation: "Text: '...technocrats argue that capital reallocation into automated systems inevitably maximizes aggregate economic productivity...'" },
          { text: "Which demographic group is identified as particularly vulnerable to structural unemployment?", options: ["Unskilled manual laborers", "High-level government executives", "Mid-skill knowledge workers", "Agricultural land owners"], correct: 2, explanation: "Text: '...structural unemployment facing mid-skill knowledge workers.'" },
          { text: "Which intervention is NOT proposed to address the socioeconomic gap caused by automation?", options: ["Universal basic income schemes", "Proactive worker retraining programs", "Revised capital taxation models", "Complete prohibition of all corporate software"], correct: 3, explanation: "The text suggests UBI, retraining, and tax reform, not software prohibition." },
          { text: "The tone of the author regarding algorithmic automation can best be described as:", options: ["Overwhelmingly optimistic and dismissive of risks", "Analytical, highlighting both economic arguments and critical risks", "Nostalgic for pre-industrial manufacturing processes", "Indifferent to the financial consequences"], correct: 1, explanation: "The author presents both perspectives objectively." },
          { text: "The word 'burgeoning' in the first sentence means:", options: ["Declining rapidly", "Growing or expanding rapidly", "Stagnating completely", "Ceasing to exist"], correct: 1, explanation: "Burgeoning means growing or developing rapidly." }
        ]
      },
      {
        id: 3,
        title: "Cognitive Dissonance and Political Polarization",
        text: "In contemporary political discourse, the phenomenon of cognitive dissonance, the psychological discomfort experienced when holding contradictory beliefs or encountering evidence that invalidates one's worldview, plays a defining role in deepening partisan entrenchment. When individuals are presented with empirical evidence that contradicts their ideological convictions, they rarely abandon their stance. Instead, psychological defense mechanisms such as confirmation bias and hyper-partisan rationalization are deployed to neutralize the dissonance. Modern algorithmic echo chambers on social media platforms exacerbate this tendency by curating hyper-customized content streams that insulate users from disconfirming facts, thereby solidifying tribal polarization and eroding democratic consensus.",
        questions: [
          { text: "What defines 'cognitive dissonance' according to the passage?", options: ["The inability to process complex mathematical calculations", "Psychological discomfort arising from conflicting beliefs or disconfirming evidence", "A neurological condition affecting short-term memory", "The feeling of fatigue after long political debates"], correct: 1, explanation: "Text: '...the psychological discomfort experienced when holding contradictory beliefs...'" },
          { text: "How do individuals typically respond when confronted with facts that contradict their political beliefs?", options: ["They immediately adjust their beliefs to match empirical reality", "They deploy defense mechanisms like confirmation bias to defend their stance", "They consult neutral scientific panels for advice", "They permanently stop using social media platforms"], correct: 1, explanation: "Text: '...they rarely abandon their stance. Instead, psychological defense mechanisms...are deployed.'" },
          { text: "How do social media algorithms contribute to political polarization?", options: ["By forcing users to read opposing political viewpoints", "By curating echo chambers that insulate users from disconfirming facts", "By charging fees for posting political commentary", "By banning all political content from public feeds"], correct: 1, explanation: "Text: '...curating hyper-customized content streams that insulate users from disconfirming facts...'" },
          { text: "What is a long-term consequence of algorithmic echo chambers mentioned in the text?", options: ["The complete elimination of political news outlets", "The erosion of democratic consensus and solidifying of tribal polarization", "Accelerated technological innovation in voting software", "Decreased internet usage among political scientists"], correct: 1, explanation: "Text: '...thereby solidifying tribal polarization and eroding democratic consensus.'" },
          { text: "The word 'exacerbate' in the final sentence is synonymous with:", options: ["Alleviate or lessen", "Aggravate or worsen", "Explain or clarify", "Measure or quantify"], correct: 1, explanation: "Exacerbate means to make a problem worse." },
          { text: "What is the central thesis of the passage?", options: ["Social media should be shut down by federal regulators", "Psychological mechanisms combined with algorithms intensify political division", "Cognitive dissonance is a rare medical condition found in politicians", "Political polarization is caused entirely by educational deficiencies"], correct: 1, explanation: "The passage focuses on how cognitive dissonance and algorithms together deepen polarization." }
        ]
      },
      {
        id: 4,
        title: "Neuroplasticity and Cognitive Reserve",
        text: "For decades, neuroscientific orthodoxy maintained that the structural architecture of the adult human brain was largely fixed after early developmental stages. Modern neuroimaging and longitudinal studies have thoroughly dismantled this dogma, establishing the principle of neuroplasticity, the brain's intrinsic capacity to structurally reorganize itself in response to environmental stimuli, cognitive training, and neurological injury. Neuroplastic adaptations occur through synaptic pruning, neurogenesis, and functional remapping. Crucially, engaging in lifelong intellectually demanding endeavors builds 'cognitive reserve,' a compensatory buffer that enables individuals to sustain normal neurocognitive functioning despite significant physical neuropathology, such as the accumulation of amyloid plaques associated with Alzheimer's disease.",
        questions: [
          { text: "What former neuroscientific belief was disproved by modern studies?", options: ["That the brain uses electrical signals for communication", "That the adult brain's structural architecture remains fixed after childhood", "That Alzheimer's disease affects cognitive functions", "That memory storage requires synaptic connections"], correct: 1, explanation: "Text: '...maintained that the structural architecture of the adult human brain was largely fixed...Modern...studies have thoroughly dismantled this dogma...'" },
          { text: "What is 'neuroplasticity' as defined in the text?", options: ["The artificial replacement of damaged brain tissue with synthetic materials", "The brain's capacity to structurally reorganize itself in response to experience", "The gradual decrease of brain weight during adulthood", "The inability of neurons to recover from physical trauma"], correct: 1, explanation: "Text: '...the brain's intrinsic capacity to structurally reorganize itself...'" },
          { text: "Which mechanism is explicitly listed as a component of neuroplastic adaptation?", options: ["Synaptic pruning", "Cellular calcification", "Vascular constriction", "Spinal alignment"], correct: 0, explanation: "Text: 'Neuroplastic adaptations occur through synaptic pruning...'" },
          { text: "How does 'cognitive reserve' benefit an individual?", options: ["It completely prevents the physical onset of brain diseases", "It acts as a buffer allowing normal mental functioning despite physical brain pathology", "It eliminates the need for sleep in adults", "It increases physical muscle strength in old age"], correct: 1, explanation: "Text: '...a compensatory buffer that enables individuals to sustain normal neurocognitive functioning despite significant physical neuropathology...'" },
          { text: "What activity contributes to building cognitive reserve?", options: ["Avoiding complex mental challenges", "Engaging in lifelong intellectually demanding endeavors", "Relying solely on automated memory tools", "Taking long periods of physical inactivity"], correct: 1, explanation: "Text: '...engaging in lifelong intellectually demanding endeavors builds cognitive reserve...'" },
          { text: "The word 'dismantled' in the passage closest means:", options: ["Confirmed and validated", "Refuted and torn down", "Published and distributed", "Ignored and overlooked"], correct: 1, explanation: "Dismantled means taken apart or refuted; shown to be false." }
        ]
      }
    ]
  };

  const getTestsForLevel = (level) => {
    return readingTests[level] || [];
  };

  const currentTests = selectedLevel ? getTestsForLevel(selectedLevel) : [];
  const currentTest = selectedTest !== null && currentTests[selectedTest] ? currentTests[selectedTest] : null;

  const startTest = (level, testIndex) => {
    setSelectedLevel(level);
    setSelectedTest(testIndex);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setShowExplanations(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBackToLevels = () => {
    setSelectedLevel(null);
    setSelectedTest(null);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setShowExplanations(false);
  };

  const goBackToTests = () => {
    setSelectedTest(null);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setShowExplanations(false);
  };

  const handleAnswer = (qIndex, value) => {
    if (!submitted) {
      setAnswers({ ...answers, [qIndex]: value });
    }
  };

  const submitQuiz = () => {
    let newScore = 0;
    if (currentTest) {
      currentTest.questions.forEach((q, i) => {
        if (answers[i] === q.correct) newScore++;
      });
    }
    setScore(newScore);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetQuiz = () => {
    setSubmitted(false);
    setAnswers({});
    setScore(0);
    setShowExplanations(false);
  };

  // Level Selection Screen
  if (!selectedLevel) {
    return (
      <>
        <div className="page-hero">
          <h2>📖 Reading Comprehension Tests</h2>
          <p>Choose your level to start reading practice. Each level has 4 reading passages with 6 questions each.</p>
        </div>
        <div className="level-selection-container">
          {levels.map((level) => {
            const testCount = getTestsForLevel(level).length;
            return (
              <div key={level} className="level-card" onClick={() => setSelectedLevel(level)}>
                <div className="level-header">
                  <span className="level-badge">{level}</span>
                </div>
                <h3>Level {level}</h3>
                <p>{testCount} Reading Passages</p>
                <div className="level-stats">
                  <span>{testCount * 6} Questions</span>
                  <span>Multiple Choice</span>
                </div>
                <button className="level-start-btn">View Tests</button>
              </div>
            );
          })}
        </div>
        <Footer />
      </>
    );
  }

  // Test Selection Screen
  if (selectedLevel && selectedTest === null) {
    return (
      <>
        <div className="page-hero">
          <button className="back-btn" onClick={goBackToLevels}>← Back to Levels</button>
          <h2>Level {selectedLevel} - Reading Tests</h2>
          <p>Select a passage to read and answer questions.</p>
        </div>
        <div className="topic-selection-container">
          {currentTests.map((test, index) => (
            <div key={test.id} className="topic-card" onClick={() => startTest(selectedLevel, index)}>
              <h3>{test.title}</h3>
              <p>{test.text.substring(0, 150)}...</p>
              <div className="topic-footer">
                <span className="topic-levels">{test.questions.length} Questions</span>
                <span className="topic-arrow">→</span>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </>
    );
  }

  // Quiz/Results Screen
  if (selectedLevel && selectedTest !== null && currentTest) {
    const totalQuestions = currentTest.questions.length;

    // Results Screen
    if (submitted) {
      const percentage = (score / totalQuestions) * 100;
      let grade = '';
      if (percentage >= 90) grade = 'Excellent 🌟';
      else if (percentage >= 75) grade = 'Very Good ✅';
      else if (percentage >= 60) grade = 'Good 📖';
      else if (percentage >= 45) grade = 'Need Practice 📝';
      else grade = 'Need More Practice 🔄';

      return (
        <div className="quiz-container result-container">
          <button className="back-btn" onClick={goBackToTests}>← Back to Tests</button>
          <h2>{currentTest.title} - Results</h2>
          <div className="result-card">
            <div className="result-topic">Level {selectedLevel}</div>
            <div className="result-score">
              <span className="score-number">{score}</span>
              <span className="score-total"> / {totalQuestions}</span>
            </div>
            <div className="result-percentage">{Math.round(percentage)}%</div>
            <div className="result-grade">{grade}</div>
          </div>
          <div className="result-actions">
            <button className="submit-btn" onClick={() => setShowExplanations(!showExplanations)}>
              {showExplanations ? 'Hide Explanations' : 'Show Explanations'}
            </button>
            <button className="submit-btn" onClick={resetQuiz}>Try Again</button>
            <button className="submit-btn" onClick={goBackToTests}>Choose Different Test</button>
          </div>
          {showExplanations && (
            <div className="explanations-section">
              <h3>Detailed Explanations</h3>
              {currentTest.questions.map((q, i) => (
                <div key={i} className={`explanation-item ${answers[i] === q.correct ? 'correct-exp' : 'wrong-exp'}`}>
                  <p><strong>Q{i+1}:</strong> {q.text}</p>
                  <p><strong>Your answer:</strong> {q.options[answers[i]] || 'Not answered'}</p>
                  <p><strong>Correct answer:</strong> {q.options[q.correct]}</p>
                  <p><strong>Explanation:</strong> {q.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Questions Screen
    return (
      <div className="quiz-container">
        <button className="back-btn" onClick={goBackToTests}>← Back to Tests</button>
        <h2>{currentTest.title}</h2>
        <div className="quiz-header">
          <span className="quiz-level-badge">{selectedLevel}</span>
          <span className="quiz-question-count">{totalQuestions} Questions</span>
        </div>
        
        {/* Reading Passage */}
        <div className="reading-passage">
          <h3>📖 Read the passage carefully:</h3>
          <div className="passage-text">
            {currentTest.text.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        <p className="quiz-instruction">Choose the correct answer for each question based on the passage.</p>
        <form>
          {currentTest.questions.map((q, qIndex) => (
            <div key={qIndex} className="question">
              <h3>{qIndex + 1}. {q.text}</h3>
              <div className="options">
                {q.options.map((opt, optIndex) => (
                  <label key={optIndex} className={answers[qIndex] === optIndex ? 'selected' : ''}>
                    <input
                      type="radio"
                      name={`q${qIndex}`}
                      value={optIndex}
                      checked={answers[qIndex] === optIndex}
                      onChange={() => handleAnswer(qIndex, optIndex)}
                    />
                    <span className="option-text">{String.fromCharCode(97 + optIndex)}) {opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </form>
        <button className="submit-btn" onClick={submitQuiz}>Submit Answers</button>
      </div>
    );
  }

  return (
    <>
      <div className="page-hero">
        <h2>📖 Reading Comprehension Tests</h2>
        <p>Loading...</p>
      </div>
      <Footer />
    </>
  );
};


// ==================== LISTENING TEST PAGE ====================
const ListeningTestPage = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanations, setShowExplanations] = useState(false);
  const [showTranscript, setShowTranscript] = useState({});

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];

  // ==================== LISTENING TEST DATA ====================
  // 📌 AUDIO FAYLLARINIZI BURAYA YERLƏŞDİRİN
  // public/audio/ klasörüne audio fayllarınızı yerləşdirin
  // Nümunə: public/audio/A1/listening1.mp3

  const toggleTranscript = (testId) => {
    setShowTranscript(prev => ({
      ...prev,
      [testId]: !prev[testId]
    }));
  };

  const listeningTests = {
    A1: [
      {
        id: 'A1-1',
        title: "Alex and His Busy Week",
        audioSrc: "/audio/A1/listening1.mp3",
        text: `Hello everyone! My name is Alex. I am twenty-two years old and I live in a big, beautiful city with my family. My house is not very big, but it is warm and comfortable. Today, I want to tell you about my daily routine and my week. Every day from Monday to Friday, my alarm clock rings at 7 o'clock in the morning. I do not like waking up early, but I need to go to university. First, I go to the bathroom, wash my face, and brush my teeth. Then, I go to the kitchen. My mother is usually there. She cooks breakfast for us. I usually eat two eggs, some cheese, and bread. I also drink a cup of black coffee with milk. I love coffee in the morning! At 8 o'clock, I put on my shoes, take my blue backpack, and leave the house. I go to the bus stop. The bus comes at 8:15. There are always many people on the bus. I arrive at the university at 8:45. My lessons start at 9:00. I study English and history. I like my history teacher because he is very kind and funny. At 1:00 p.m., I have lunch with my friend, Mark. We eat sandwiches and drink apple juice at a small café near the university. After lunch, I have two more lessons. I finish university at 4 o'clock in the afternoon. When I come home, I feel a little tired. I rest on the sofa for thirty minutes. Then, I do my homework. In the evening, at 7 o'clock, my family eats dinner together. We talk about our day. After dinner, I usually watch TV or play video games in my room. On Saturdays and Sundays, I do not go to university. I usually sleep until 10 o'clock. On Saturday afternoons, I go to the park with my dog, Max, or I meet my friends at a cinema. On Sunday, I clean my bedroom and read books. This is my simple life, and I am very happy.`,
        questions: [
          { text: "How old is Alex?", options: ["20", "21", "22", "23"], correct: 2, explanation: "Alex 22 yaşındadır: 'I am twenty-two years old.'" },
          { text: "What time does Alex's alarm clock ring?", options: ["6:00", "6:30", "7:00", "7:30"], correct: 2, explanation: "Saat 7:00-da zəng çalır: '...my alarm clock rings at 7 o'clock.'" },
          { text: "What does Alex drink in the morning?", options: ["Tea", "Coffee with milk", "Orange juice", "Hot chocolate"], correct: 1, explanation: "Südlü qəhvə içir: 'I also drink a cup of black coffee with milk.'" },
          { text: "What time does the bus come?", options: ["8:00", "8:15", "8:30", "8:45"], correct: 1, explanation: "Avtobus 8:15-də gəlir: 'The bus comes at 8:15.'" },
          { text: "What does Alex do after dinner?", options: ["Reads books", "Watches TV or plays video games", "Goes to sleep", "Studies English"], correct: 1, explanation: "Axşam yeməyindən sonra TV izləyir və ya oyun oynayır." },
          { text: "What does Alex do on Sundays?", options: ["Goes to the park", "Meets friends", "Cleans his room and reads books", "Goes to university"], correct: 2, explanation: "Bazar günü otağını təmizləyir və kitab oxuyur." }
        ]
      },
      {
        id: 'A1-2',
        title: "My Favorite Season and My Family's House",
        audioSrc: "/audio/A1/listening2.mp3",
        text: `Hello! My name is Emma, and today I want to speak about my house and my favorite season. My favorite season is summer. I love summer because the sun shines every day, the sky is blue, and the weather is very warm. In summer, I do not go to school because we have a long holiday. My family has a small white house near the sea. Every year in July, we go to this house for three weeks. The house has two floors. On the first floor, there is a large living room, a big kitchen, and a bathroom. In the living room, there is a comfortable brown sofa, a green carpet, and a large television. We like sitting there in the evening to watch movies. On the second floor, there are three bedrooms. My bedroom is small, but it has a very nice view. When I look out the window, I can see the sea and green trees. In my room, there is a bed, a desk, a lamp, and a white wardrobe for my clothes. Every morning in July, I wake up at 8:00 a.m. I put on my clothes and go outside to the garden. My father reads the newspaper in the garden, and my mother makes fresh orange juice. After breakfast, my younger brother and I walk to the beach. The beach is very close to our house, only five minutes on foot. The water is warm and clean. We swim, play with a red ball, and build castles in the sand. At 1:00 p.m., we go back to the house to eat lunch. My mother usually cooks fish and fresh salad. In the afternoon, when the sun is very hot, we stay inside the house, read books, or sleep. In the evening, the air is cooler. We walk near the sea and buy ice cream. Chocolate ice cream is my favorite. Summer is the best time of the year for me because I can relax with my family.`,
        questions: [
          { text: "What is Emma's favorite season?", options: ["Spring", "Summer", "Autumn", "Winter"], correct: 1, explanation: "Emma'nın sevimli fəsli yaydır: 'My favorite season is summer.'" },
          { text: "Where is Emma's family house?", options: ["In the mountains", "Near the sea", "In the city center", "In the forest"], correct: 1, explanation: "Ev dəniz yaxınlığındadır: 'a small white house near the sea.'" },
          { text: "How many floors does the house have?", options: ["One", "Two", "Three", "Four"], correct: 1, explanation: "Ev iki mərtəbəlidir: 'The house has two floors.'" },
          { text: "What color is the sofa in the living room?", options: ["Blue", "Green", "Brown", "White"], correct: 2, explanation: "Divan qəhvəyi rəngdədir: 'a comfortable brown sofa.'" },
          { text: "How far is the beach from the house?", options: ["2 minutes", "5 minutes", "10 minutes", "15 minutes"], correct: 1, explanation: "Çimərlik evdən 5 dəqiqəlik yoldadır: 'only five minutes on foot.'" },
          { text: "What is Emma's favorite ice cream flavor?", options: ["Vanilla", "Strawberry", "Chocolate", "Mint"], correct: 2, explanation: "Şokoladlı dondurma sevir: 'Chocolate ice cream is my favorite.'" }
        ]
      },
      {
        id: 'A1-3',
        title: "A Day at the Supermarket",
        audioSrc: "/audio/A1/listening3.mp3",
        text: `Hi! I am David. Today is Saturday, and Saturday is my shopping day. Today, I am going to the big supermarket with my mother. The supermarket is near our house, so we do not take the bus; we walk there. It takes ten minutes. The supermarket is very large, and it has everything you need. When we go inside, my mother takes a large shopping cart, and I take a small shopping basket. First, we go to the fruit and vegetable section. There are many colorful fruits here. We buy six red apples, four bananas, two big oranges, and one yellow lemon. My mother also picks up tomatoes, cucumbers, and a bag of potatoes. She says vegetables are very good for our health. Next, we walk to the dairy section. We need milk and butter for breakfast. I find a big bottle of milk and put it in the cart. We also buy some cheese and two packs of strawberry yogurt. Strawberry yogurt is my favorite snack! After that, we go to the bakery section. The smell of fresh bread is wonderful! We buy one brown bread and four small chocolate croissants. My mother says we can eat the croissants on Sunday morning. Then, we look at the meat and fish section. We buy some chicken for dinner tonight. Finally, we go to the drink aisle. My father asked us to buy some mineral water and tea. We get two bottles of water and a box of green tea. Now, our cart is full! We walk to the cashier to pay for our food. There is a short line of people. When it is our turn, the cashier scans all the items. The total price is sixty dollars. My mother pays with her credit card. We put all the food into four big bags and carry them home together. Shopping takes time, but it is fun!`,
        questions: [
          { text: "What day is it in the story?", options: ["Friday", "Saturday", "Sunday", "Monday"], correct: 1, explanation: "Hekayə şənbə günü baş verir: 'Today is Saturday.'" },
          { text: "How do David and his mother go to the supermarket?", options: ["By bus", "By car", "On foot", "By train"], correct: 2, explanation: "Piyada gedirlər: 'we walk there.'" },
          { text: "How many apples do they buy?", options: ["Four", "Five", "Six", "Seven"], correct: 2, explanation: "6 alma alırlar: 'We buy six red apples.'" },
          { text: "What is David's favorite snack?", options: ["Chocolate", "Chips", "Strawberry yogurt", "Ice cream"], correct: 2, explanation: "Çiyələkli yoqurt sevir: 'Strawberry yogurt is my favorite snack!'" },
          { text: "What do they buy from the bakery?", options: ["Cake and cookies", "Brown bread and chocolate croissants", "White bread and pizza", "Bagels and donuts"], correct: 1, explanation: "Çörək və kruvasan alırlar." },
          { text: "How much is the total price?", options: ["$40", "$50", "$60", "$70"], correct: 2, explanation: "Ümumi məbləğ 60 dollardır: 'The total price is sixty dollars.'" }
        ]
      },
      {
        id: 'A1-4',
        title: "Meet My Pets and Our Local Park",
        audioSrc: "/audio/A1/listening4.mp3",
        text: `Hello, my friends! Today, I want to talk about my pets and our local park. My name is Anna, and I live in a quiet neighborhood. I love animals very much. In my house, I have two pets: a dog named Max and a cat named Bella. Max is a big brown dog. He is four years old. He has long ears, a short tail, and very friendly eyes. Max is very active. He loves running, jumping, and playing with a red ball. Bella is a small white cat with green eyes. She is two years old. Bella is very quiet and lazy. She sleeps for many hours every day on the soft yellow sofa in the living room. Max and Bella are good friends, but sometimes Max wants to play when Bella wants to sleep! Every afternoon at 4:00 p.m., I take Max to the local park near my home. The park is big, green, and beautiful. There are many high trees, colorful flowers, and a small lake in the middle of the park. Many people come to this park to walk, run, or sit on the wooden benches. When we arrive at the park, I take off Max's leash, and he runs on the green grass. He meets other dogs, and they play together. I like walking around the lake. In the lake, there are white ducks. Children like to give small pieces of bread to the ducks. Sometimes, I sit on a bench, drink cold tea, and listen to the birds singing in the trees. It is very peaceful. After one hour, I call Max, put his leash back on, and we walk home together. When we enter the house, Bella is waiting near the door. We give food to Max and Bella, and then we rest. Having pets makes my life very happy.`,
        questions: [
          { text: "What are the names of Anna's pets?", options: ["Tom and Jerry", "Max and Bella", "Buddy and Lily", "Rocky and Mia"], correct: 1, explanation: "Heyvanların adları Max və Belladır." },
          { text: "How old is Max?", options: ["2 years", "3 years", "4 years", "5 years"], correct: 2, explanation: "Max 4 yaşındadır: 'He is four years old.'" },
          { text: "What color is Bella?", options: ["Brown", "Black", "White", "Grey"], correct: 2, explanation: "Bella ağ rəngdədir: 'Bella is a small white cat.'" },
          { text: "What time does Anna take Max to the park?", options: ["3:00 p.m.", "4:00 p.m.", "5:00 p.m.", "6:00 p.m."], correct: 1, explanation: "Saat 16:00-da parka gedir: 'Every afternoon at 4:00 p.m.'" },
          { text: "What is in the middle of the park?", options: ["A fountain", "A small lake", "A playground", "A restaurant"], correct: 1, explanation: "Parkın ortasında göl var: 'a small lake in the middle of the park.'" },
          { text: "How long do they stay at the park?", options: ["30 minutes", "45 minutes", "1 hour", "2 hours"], correct: 2, explanation: "1 saat qalırlar: 'After one hour, I call Max...'" }
        ]
      }
    ],
    A2: [
      {
        id: 'A2-1',
        title: "Planning an Unexpected Weekend Trip",
        audioSrc: "/audio/A2/listening1.mp3",
        text: `Last Thursday evening, my friends and I were sitting at a local cafe, talking about how tired we were from our busy work week. Suddenly, my friend Mark suggested something exciting: 'Why don't we go on a road trip this weekend?' At first, we thought he was joking because we didn't have any plans or hotel reservations. However, after discussing it for ten minutes, we all agreed it was a fantastic idea. Early on Saturday morning, around 6:00 a.m., Mark picked us up in his blue car. The weather was fresh and a little foggy, but the forecast promised a sunny weekend. Our destination was a charming little village located in the mountains, about three hours away from our city. During the drive, we listened to our favorite music, sang loudly, and watched the scenery change from tall city buildings to green hills and forests. When we arrived at the village, the air was cold and fresh. We checked into a small, cozy guest house run by an elderly couple who welcomed us with hot tea and homemade biscuits. After resting for a short while, we put on our hiking boots and went to explore the nearby mountain trails. We walked for nearly three hours along a narrow path next to a clear river. The views from the top of the hill were absolutely breathtaking. We took dozens of pictures to remember the moment. In the evening, we had dinner at a traditional local restaurant. We ate delicious vegetable soup, grilled meat, and fresh bread. We spent the night talking, playing board games, and laughing. On Sunday afternoon, we drove back home. Although the trip was short and spontaneous, it gave us a great energy boost for the upcoming week.`,
        questions: [
          { text: "Where were the friends sitting when they planned the trip?", options: ["At a restaurant", "At a local cafe", "At Mark's house", "At the office"], correct: 1, explanation: "Kafedə oturmuşdular: 'sitting at a local cafe.'" },
          { text: "What time did they leave on Saturday morning?", options: ["5:00 a.m.", "6:00 a.m.", "7:00 a.m.", "8:00 a.m."], correct: 1, explanation: "Saat 6:00-da yola düşdülər: 'around 6:00 a.m.'" },
          { text: "How far was the village from their city?", options: ["1 hour", "2 hours", "3 hours", "4 hours"], correct: 2, explanation: "Kənd şəhərdən 3 saat aralıdır: 'about three hours away.'" },
          { text: "Who welcomed them at the guest house?", options: ["A young couple", "An elderly couple", "The hotel manager", "Their friends"], correct: 1, explanation: "Yaşlı cütlük qarşıladı: 'run by an elderly couple.'" },
          { text: "What did they eat for dinner?", options: ["Pizza and pasta", "Vegetable soup, grilled meat, and bread", "Fish and chips", "Salad and sandwiches"], correct: 1, explanation: "Şorba, ət və çörək yedilər." },
          { text: "When did they drive back home?", options: ["Saturday evening", "Sunday morning", "Sunday afternoon", "Monday morning"], correct: 2, explanation: "Bazar günü günorta qayıtdılar: 'On Sunday afternoon, we drove back home.'" }
        ]
      },
      {
        id: 'A2-2',
        title: "A New Hobby: Cooking at Home",
        audioSrc: "/audio/A2/listening2.mp3",
        text: `Until a few months ago, I rarely cooked my own meals. Because of my long working hours, I used to rely heavily on fast food, frozen meals, or delivery services. However, during a routine health check-up, my doctor advised me to change my eating habits and incorporate more fresh ingredients into my diet. That was the moment I decided to learn how to cook properly. At first, it was quite challenging. I bought a basic cookbook for beginners and watched simple instructional videos online. My very first attempt was making a basic pasta with tomato sauce. Unfortunately, I overcooked the pasta, and the sauce was a bit too salty. But I didn't give up. I practiced every weekend, experimenting with different ingredients, spices, and cooking techniques. Slowly, my skills began to improve. Now, cooking has transformed from a daily chore into a relaxing and enjoyable hobby. Every Saturday morning, I visit the local farmers' market to buy fresh vegetables, herbs, and meat. I enjoy selecting colorful bell peppers, fresh tomatoes, and garlic. Cooking at home has not only improved my physical health and energy levels, but it has also helped me save a significant amount of money each month. Last night, I invited two of my close friends over for dinner. I prepared a mushroom risotto and a fresh garden salad. They were both very impressed and told me it tasted as good as a meal from a restaurant! Sharing food that I prepared myself brought me a great sense of satisfaction. If you haven't tried cooking at home yet, I strongly encourage you to give it a chance.`,
        questions: [
          { text: "What did the doctor advise the speaker to do?", options: ["Eat more fast food", "Change eating habits and use fresh ingredients", "Skip breakfast", "Drink more coffee"], correct: 1, explanation: "Həkim təzə qidalardan istifadə etməyi tövsiyə etdi." },
          { text: "What was the speaker's first cooking attempt?", options: ["Soup", "Pasta with tomato sauce", "Omelette", "Grilled fish"], correct: 1, explanation: "İlk cəhd makaron idi: 'making a basic pasta with tomato sauce.'" },
          { text: "What was wrong with the first attempt?", options: ["Too spicy", "Overcooked pasta and too salty", "Burned the food", "Not enough ingredients"], correct: 1, explanation: "Makaron həddindən artıq bişmiş və duzlu olmuşdu." },
          { text: "When does the speaker visit the farmers' market?", options: ["Sunday morning", "Saturday morning", "Friday evening", "Monday afternoon"], correct: 1, explanation: "Şənbə səhəri bazarı ziyarət edir: 'Every Saturday morning.'" },
          { text: "What did the speaker cook for their friends?", options: ["Pizza and salad", "Mushroom risotto and garden salad", "Pasta and soup", "Steak and potatoes"], correct: 1, explanation: "Göbələkli risotto və salat hazırladı." },
          { text: "How did cooking at home help the speaker?", options: ["Improved health and saved money", "Made them more popular", "Helped them travel more", "Reduced working hours"], correct: 0, explanation: "Sağlamlığı yaxşılaşdı və pul qənaət etdi." }
        ]
      },
      {
        id: 'A2-3',
        title: "Moving to a New City",
        audioSrc: "/audio/A2/listening3.mp3",
        text: `Moving to a new city is always a major life event, filled with both excitement and uncertainty. Six months ago, I received a job offer from a technology company based in the capital city, which meant I had to leave my small hometown. Packing my entire life into a few cardboard boxes was an emotional process. I was leaving behind my family, close friends, and the familiar streets where I grew up. When I first arrived in the capital, everything felt overwhelming. The streets were crowded, the traffic was fast, and the pace of life was completely different from what I was used to. Finding a suitable apartment was my first major challenge. After searching online and visiting several places with a real estate agent, I finally found a small, bright apartment near a metro station. During the first few weeks, I felt quite lonely. I missed my home and my old routines. However, I knew I had to make an effort to adapt to my new environment. I started exploring my neighborhood on foot, finding a quiet coffee shop where I could read, and visiting local parks on weekends. I also joined a local running club, which allowed me to meet new people who shared similar interests. Gradually, the big city began to feel more familiar and welcoming. My colleagues at work were supportive and helped me learn the ropes. Looking back now, moving here was one of the best decisions I have ever made. It pushed me out of my comfort zone and helped me grow as an independent person.`,
        questions: [
          { text: "Why did the speaker move to the capital city?", options: ["For education", "For a job offer", "For family reasons", "For a vacation"], correct: 1, explanation: "İş təklifi aldı: 'I received a job offer from a technology company.'" },
          { text: "How long ago did the speaker move?", options: ["Three months", "Six months", "One year", "Two years"], correct: 1, explanation: "6 ay əvvəl köçüb: 'Six months ago.'" },
          { text: "What was the speaker's first major challenge?", options: ["Making friends", "Finding an apartment", "Learning the language", "Finding a job"], correct: 1, explanation: "Mənzil tapmaq əsas çətinlik idi: 'Finding a suitable apartment was my first major challenge.'" },
          { text: "What did the speaker join to meet new people?", options: ["A book club", "A running club", "A cooking class", "A language course"], correct: 1, explanation: "Qaçış klubuna qoşuldu: 'I also joined a local running club.'" },
          { text: "What does the speaker think about the move now?", options: ["It was a mistake", "It was one of the best decisions", "It was too difficult", "They want to move back"], correct: 1, explanation: "Ən yaxşı qərarlardan biri idi: 'one of the best decisions I have ever made.'" },
          { text: "What did the speaker miss during the first weeks?", options: ["The weather", "Home and old routines", "The food", "The language"], correct: 1, explanation: "Evini və köhnə vərdişlərini darıxdı: 'I missed my home and my old routines.'" }
        ]
      },
      {
        id: 'A2-4',
        title: "The History and Future of Shopping",
        audioSrc: "/audio/A2/listening4.mp3",
        text: `The way people buy goods has changed dramatically over the last few decades. In the past, shopping was an activity that required spending hours walking from store to store in physical markets or shopping malls. People enjoyed the tactile experience of touching products, trying on clothes, and chatting with sales assistants. Shopping was not just a practical necessity; it was also a social activity where friends met on weekends to walk around and spend time together. However, with the rapid development of the internet and digital technology, online shopping has completely transformed our daily habits. Today, with just a few clicks on a smartphone or computer, consumers can order almost anything—from fresh groceries and clothing to complex electronic devices—and have it delivered directly to their doorstep within a day or two. The main advantage of online shopping is undoubtedly convenience. It saves time, allows easy price comparisons between different sellers, and offers access to global products that might not be available in local stores. On the other hand, traditional physical stores still hold value. Many consumers still prefer visiting physical shops when buying items like furniture or high-end clothing, as they want to verify the quality before spending money. Moreover, physical stores offer immediate gratification—you can take your item home right away without waiting for shipping. In the future, experts believe that physical and digital shopping will become even more integrated, creating a seamless experience for customers worldwide.`,
        questions: [
          { text: "What was shopping like in the past according to the text?", options: ["Fast and efficient", "Time-consuming and social", "Only done online", "Very expensive"], correct: 1, explanation: "Keçmişdə alış-veriş çox vaxt aparan və sosial idi." },
          { text: "What is the main advantage of online shopping?", options: ["Better quality", "Convenience", "Lower prices always", "More variety"], correct: 1, explanation: "Online alış-verişin əsas üstünlüyü rahatlıqdır: 'The main advantage... is convenience.'" },
          { text: "What items do people still prefer to buy in physical stores?", options: ["Books", "Furniture and high-end clothing", "Groceries", "Electronics"], correct: 1, explanation: "Mebel və bahalı geyimlər: 'items like furniture or high-end clothing.'" },
          { text: "What does 'immediate gratification' mean in the text?", options: ["Getting the item right away", "Getting a discount", "Free delivery", "Better quality"], correct: 0, explanation: "Dərhal əldə etmək mənasındadır." },
          { text: "What do experts predict about the future of shopping?", options: ["Physical stores will disappear", "Only online shopping will exist", "Physical and digital shopping will integrate", "Prices will increase"], correct: 2, explanation: "Fiziki və rəqəmsal alış-veriş inteqrasiya olunacaq." },
          { text: "What does online shopping allow consumers to do easily?", options: ["Return items for free", "Compare prices between sellers", "Get personal service", "Meet the sellers"], correct: 1, explanation: "Qiymətləri müqayisə etməyə imkan verir: 'allows easy price comparisons.'" }
        ]
      }
    ],
    B1: [
      {
        id: 'B1-1',
        title: "The Challenge of Digital Detox",
        audioSrc: "/audio/B1/listening1.mp3",
        text: `In today's hyper-connected world, most of us spend an extraordinary amount of time staring at screens. Whether it is for professional purposes, academic research, or entertainment, our smartphones, tablets, and computers have become indispensable tools. However, this constant connection comes at a cost. Many individuals experience digital fatigue, decreased attention spans, and heightened stress levels due to the non-stop influx of notifications, emails, and social media updates. Recognizing these negative impacts, the concept of a 'digital detox' has gained significant popularity in recent years. A digital detox refers to a period during which a person intentionally refrains from using electronic devices. Last month, I decided to challenge myself to a full weekend digital detox. I turned off my smartphone on Friday evening and placed it in a drawer, promising not to check it until Monday morning. The first few hours were surprisingly difficult; I caught myself unconsciously reaching into my pocket every few minutes to check for messages that weren't there. However, as Saturday progressed, a profound sense of calm set in. Without the constant distractions, I spent the afternoon reading a novel I had bought months ago, went for a long walk in a nearby nature reserve, and had an uninterrupted three-hour conversation with a family member. By Sunday evening, I noticed a clear improvement in my concentration and sleep quality. While completely disconnecting from technology is unrealistic in modern life, setting clear boundaries—such as keeping phones away from the dinner table or establishing screen-free hours before bedtime—can dramatically improve our mental well-being.`,
        questions: [
          { text: "What is one negative effect of constant screen use mentioned in the text?", options: ["Improved sleep quality", "Increased productivity", "Heightened stress levels", "Better communication"], correct: 2, explanation: "Stress səviyyəsinin artması: 'heightened stress levels.'" },
          { text: "What is a 'digital detox'?", options: ["Using more technology", "Intentionally avoiding electronic devices for a period", "Deleting all social media apps", "Buying new phones"], correct: 1, explanation: "Digital detox - elektron cihazlardan qəsdən uzaq durmaqdır." },
          { text: "When did the speaker start their digital detox?", options: ["Saturday morning", "Friday evening", "Sunday afternoon", "Monday morning"], correct: 1, explanation: "Cümə axşamı başladı: 'turned off my smartphone on Friday evening.'" },
          { text: "What did the speaker do during the detox?", options: ["Watched movies", "Read a novel, walked in nature, talked to family", "Worked on a project", "Slept all day"], correct: 1, explanation: "Kitab oxudu, təbiətdə gəzdi, ailəsi ilə söhbət etdi." },
          { text: "What improvement did the speaker notice by Sunday evening?", options: ["Better concentration and sleep quality", "More friends", "More money", "Better job"], correct: 0, explanation: "Diqqət və yuxu keyfiyyəti yaxşılaşdı." },
          { text: "What does the speaker suggest for managing technology use?", options: ["Stop using phones completely", "Set clear boundaries like screen-free hours", "Use more apps", "Only use phones at work"], correct: 1, explanation: "Aydın sərhədlər qoymağı təklif edir." }
        ]
      },
      {
        id: 'B1-2',
        title: "The Power of Habit Formation",
        audioSrc: "/audio/B1/listening2.mp3",
        text: `We often attribute success in personal and professional life to willpower or extraordinary talent. However, behavioral psychologists argue that our daily habits play a far more critical role in shaping our long-term outcomes than brief moments of intense motivation. Habits are the small decisions and actions we perform every day without thinking consciously about them. From the way we brush our teeth to how we respond to stressful situations at work, our lives are essentially a collection of deeply ingrained routines. The process of building a new positive habit—or breaking an unhelpful one—requires an understanding of how the brain operates. According to research, every habit follows a three-step loop: a cue, a routine, and a reward. The cue triggers your brain to initiate a behavior, the routine is the action itself, and the reward is the benefit you gain from completing it, which reinforces the loop. For example, if your goal is to read more books, placing a novel on your pillow every morning serves as a visible cue. When you go to bed, reading one chapter becomes the routine, and the feeling of accomplishment or entertainment is the reward. The secret to lasting change is starting small. Expecting to radically alter your entire lifestyle overnight usually leads to frustration and failure. By making incremental adjustments—such as exercising for just ten minutes a day or writing one paragraph—you build momentum over time, allowing small actions to compound into remarkable results.`,
        questions: [
          { text: "What do behavioral psychologists say is more important than willpower?", options: ["Talent", "Daily habits", "Motivation", "Education"], correct: 1, explanation: "Gündəlik vərdişlər iradədən daha vacibdir: 'daily habits play a far more critical role.'" },
          { text: "What are the three steps of a habit loop?", options: ["Cue, Routine, Reward", "Start, Middle, End", "Plan, Action, Result", "Thought, Word, Deed"], correct: 0, explanation: "Hər vərdiş üç addımdan ibarətdir: cue, routine, reward." },
          { text: "What is an example of a cue for reading more?", options: ["Buying a book", "Placing a novel on your pillow", "Going to a library", "Using a Kindle"], correct: 1, explanation: "Yastığın üstünə kitab qoymaq işarədir: 'placing a novel on your pillow.'" },
          { text: "What happens when we complete a habit routine?", options: ["We feel tired", "We get a reward", "We forget it", "We stop the habit"], correct: 1, explanation: "Mükafat alırıq: 'the reward is the benefit you gain.'" },
          { text: "What is the secret to lasting change according to the text?", options: ["Changing everything at once", "Starting with small adjustments", "Using special apps", "Working with a coach"], correct: 1, explanation: "Kiçik dəyişikliklərlə başlamaq: 'starting small.'" },
          { text: "What is an example of a small adjustment mentioned?", options: ["Running a marathon", "Exercising for ten minutes a day", "Changing your job", "Moving to another city"], correct: 1, explanation: "Gündə 10 dəqiqə idman etmək: 'exercising for just ten minutes a day.'" }
        ]
      },
      {
        id: 'B1-3',
        title: "Public Transportation vs. Private Cars",
        audioSrc: "/audio/B1/listening3.mp3",
        text: `As urban populations continue to grow rapidly across the globe, city planners and citizens face a persistent dilemma: how to create efficient, sustainable, and accessible transportation systems. For decades, the private automobile was viewed as the ultimate symbol of personal freedom and convenience. Driving your own vehicle allows you to travel according to your own schedule, choose your route, and enjoy a private space. However, the overwhelming number of private cars in major metropolitan areas has led to severe consequences, including chronic traffic congestion, severe air pollution, and limited parking spaces. In response to these growing urban challenges, many cities are investing heavily in modernizing their public transportation infrastructure. High-speed buses, extensive metro networks, and dedicated bicycle lanes offer viable alternatives to car ownership. Utilizing public transport offers several distinct advantages. It is generally far more cost-effective when you consider expenses such as fuel, vehicle maintenance, insurance, and parking fees. Furthermore, taking a train or bus allows commuters to use their travel time productively—whether reading, working on a laptop, or simply relaxing—rather than experiencing the stress of navigating heavy traffic. From an environmental standpoint, public transit significantly reduces carbon emissions per capita. Nevertheless, to convince more drivers to leave their cars at home, municipalities must ensure that public transportation is reliable, safe, clean, and affordable. Achieving a balanced transportation network is crucial for the future livability of our cities.`,
        questions: [
          { text: "What was the private automobile viewed as for decades?", options: ["A necessity", "A symbol of personal freedom", "An expensive luxury", "A problem"], correct: 1, explanation: "Şəxsi avtomobil şəxsi azadlıq rəmzi kimi görülürdü." },
          { text: "What is one consequence of too many private cars?", options: ["Better air quality", "Less traffic", "Chronic traffic congestion", "More parking spaces"], correct: 2, explanation: "Xroniki trafik sıxlığı: 'chronic traffic congestion.'" },
          { text: "What does public transportation allow commuters to do?", options: ["Drive faster", "Use travel time productively", "Pay more money", "Create more pollution"], correct: 1, explanation: "Səyahət vaxtını məhsuldar istifadə etməyə imkan verir." },
          { text: "What is an environmental benefit of public transit?", options: ["Uses more fuel", "Reduces carbon emissions per capita", "Creates more pollution", "Uses more space"], correct: 1, explanation: "Karbon emissiyasını azaldır: 'significantly reduces carbon emissions per capita.'" },
          { text: "What must municipalities ensure about public transportation?", options: ["It is expensive", "It is unreliable", "It is reliable, safe, clean, and affordable", "It is only for tourists"], correct: 2, explanation: "İctimai nəqliyyat etibarlı, təhlükəsiz, təmiz və əlverişli olmalıdır." },
          { text: "What is crucial for the future livability of cities?", options: ["More private cars", "A balanced transportation network", "Less public transport", "More highways"], correct: 1, explanation: "Balanslaşdırılmış nəqliyyat şəbəkəsi: 'Achieving a balanced transportation network.'" }
        ]
      },
      {
        id: 'B1-4',
        title: "The Value of Learning from Failure",
        audioSrc: "/audio/B1/listening4.mp3",
        text: `In a culture that constantly celebrates success, perfection, and visible achievements, failure is often perceived as an embarrassing setback that should be avoided at all costs. From an early age, we are taught to fear making mistakes in school, sports, and social interactions. However, an increasing body of research in psychology and education suggests that failure is not the opposite of success; rather, it is an essential component of the learning process. When everything goes smoothly according to plan, we rarely stop to analyze our actions or question our assumptions. Success can sometimes breed complacency. In contrast, when a project fails or a goal is not met, we are forced to pause, critically evaluate our approach, and identify blind spots that we previously overlooked. History is filled with examples of renowned innovators, scientists, and entrepreneurs who suffered numerous defeats before achieving groundbreaking discoveries. Thomas Edison famously tested thousands of materials before successfully developing a commercial electric light bulb. Similarly, many successful business founders experienced bankruptcies before launching prosperous ventures. The key distinction lies in adopting what psychologists call a 'growth mindset.' Individuals with a growth mindset view intelligence and skills as abilities that can be developed through dedication and hard work. They perceive mistakes not as a reflection of their personal worth, but as valuable feedback. Embracing failure as an opportunity for personal growth requires resilience, self-compassion, and a willingness to step outside one's comfort zone.`,
        questions: [
          { text: "How is failure often perceived in our culture?", options: ["As a learning opportunity", "As an embarrassing setback", "As a necessary step", "As a sign of intelligence"], correct: 1, explanation: "Uğursuzluq rüsvayedici geriləmə kimi qəbul edilir: 'as an embarrassing setback.'" },
          { text: "What does research suggest about failure?", options: ["It should be avoided", "It is essential for learning", "It shows weakness", "It is rare in successful people"], correct: 1, explanation: "Uğursuzluq öyrənmə prosesinin vacib hissəsidir: 'essential component of the learning process.'" },
          { text: "What does success sometimes breed according to the text?", options: ["Humility", "Complacency", "More success", "Happiness"], correct: 1, explanation: "Uğur bəzən rahatlıq yaradır: 'Success can sometimes breed complacency.'" },
          { text: "What did Thomas Edison famously test thousands of?", options: ["Light bulbs", "Materials", "Inventions", "Ideas"], correct: 1, explanation: "Edison minlərlə material sınayıb: 'tested thousands of materials.'" },
          { text: "What is a 'growth mindset' according to the text?", options: ["Thinking intelligence is fixed", "Viewing intelligence as developable through effort", "Avoiding challenges", "Giving up easily"], correct: 1, explanation: "Bacarıqları inkişaf etdirilə bilən kimi görmək: 'abilities that can be developed.'" },
          { text: "What does embracing failure require?", options: ["Giving up", "Resilience, self-compassion, and stepping out of comfort zone", "Blame others", "Ignoring mistakes"], correct: 1, explanation: "Dözümlülük, özünə şəfqət və komfort zonasından çıxmaq." }
        ]
      }
    ],
    B2: [
      {
        id: 'B2-1',
        title: "The Changing Dynamics of Global Workplaces",
        audioSrc: "/audio/B2/listening1.mp3",
        text: `The contemporary corporate landscape is undergoing a fundamental transformation, driven by rapid technological integration, shifting demographic expectations, and changing economic pressures. For decades, the traditional office model—characterized by fixed eight-hour workdays, dedicated cubicles, and physical presence—was considered the unquestioned standard for professional productivity. However, recent global shifts have demonstrated that remote and hybrid work models are not merely temporary adaptations, but viable long-term strategies. Advancements in cloud computing, project management software, and high-speed video conferencing have decoupled productivity from geographic location. Proponents of flexible work arrangements highlight numerous advantages, including eliminated commute times, expanded talent pools for employers, and an improved work-life balance for employees. Nevertheless, this shift presents complex organizational challenges. Company leaders struggle to maintain corporate culture, foster spontaneous innovation, and ensure equitable performance evaluations when teams are geographically dispersed. Furthermore, the blurring boundaries between professional responsibilities and personal life have led to increased reports of burnout among remote workers. Consequently, progressive organizations are moving away from rigid mandates and adopting nuanced hybrid frameworks that balance remote flexibility with deliberate, high-value in-person collaboration.`,
        questions: [
          { text: "What factors are driving changes in the corporate landscape?", options: ["Economic crisis only", "Technological integration, demographic expectations, and economic pressures", "Government regulations only", "Employee laziness"], correct: 1, explanation: "Texnoloji inteqrasiya, demoqrafik gözləntilər və iqtisadi təzyiqlər." },
          { text: "What was the traditional office model characterized by?", options: ["Flexible hours", "Fixed eight-hour workdays and cubicles", "Working from anywhere", "Short workweeks"], correct: 1, explanation: "Ənənəvi ofis modeli səkkiz saatlıq iş günü ilə xarakterizə olunurdu." },
          { text: "What has decoupled productivity from geographic location?", options: ["Globalization", "Advancements in cloud computing and video conferencing", "Lower salaries", "Longer work hours"], correct: 1, explanation: "Bulud texnologiyaları və video konfranslar: 'cloud computing...high-speed video conferencing.'" },
          { text: "What is one challenge of remote work mentioned?", options: ["More commuting time", "Difficulties maintaining corporate culture", "Lower salaries", "Less innovation"], correct: 1, explanation: "Korporativ mədəniyyəti qorumaq çətinliyi: 'struggle to maintain corporate culture.'" },
          { text: "What has led to increased burnout among remote workers?", options: ["Longer meetings", "Blurring boundaries between work and personal life", "More vacation time", "Flexible schedules"], correct: 1, explanation: "İş və şəxsi həyat arasında sərhədlərin bulanması." },
          { text: "What are progressive organizations adopting?", options: ["Rigid mandates", "Nuanced hybrid frameworks", "Only in-person work", "Only remote work"], correct: 1, explanation: "Nüanslı hibrid modellər: 'adopting nuanced hybrid frameworks.'" }
        ]
      },
      {
        id: 'B2-2',
        title: "The Science and Impact of Sleep Deprivation",
        audioSrc: "/audio/B2/listening2.mp3",
        text: `In fast-paced modern societies, sleep is frequently treated as a negotiable luxury rather than a biological necessity. The cultural glorification of overwork often portrays reduced sleep as a badge of honor and dedication. However, scientific research in neuroscience and medicine paints a dramatically different picture, warning that chronic sleep deprivation carries severe cognitive and physiological consequences. During sleep, particularly deep and REM stages, the brain performs vital maintenance functions, including memory consolidation, toxin clearance, and metabolic regulation. When individuals consistently fail to obtain seven to eight hours of quality sleep, cognitive functions such as attention, decision-making, and emotional regulation deteriorate significantly. Short-term effects include impaired reaction times—comparable to alcohol intoxication—and reduced problem-solving capacity. Over the long term, persistent sleep deficiency has been linked to heightened risks of cardiovascular diseases, weakened immune responses, metabolic disorders, and neurodegenerative conditions. Experts emphasize that sleep hygiene involves establishing consistent sleep schedules, optimizing the bedroom environment by reducing light and noise pollution, and minimizing exposure to blue-light-emitting electronic screens prior to bedtime. Prioritizing adequate rest is fundamental to sustained intellectual performance and overall longevity.`,
        questions: [
          { text: "How is sleep often treated in modern societies?", options: ["As a top priority", "As a negotiable luxury", "As unnecessary", "As a medical treatment"], correct: 1, explanation: "Yuxu müzakirə olunan lüks kimi qəbul edilir: 'treated as a negotiable luxury.'" },
          { text: "What functions does the brain perform during sleep?", options: ["Watching dreams only", "Memory consolidation, toxin clearance, metabolic regulation", "Growing taller", "Learning new languages"], correct: 1, explanation: "Yuxuda beyin yaddaş, toksin təmizlənməsi və metabolik tənzimləmə həyata keçirir." },
          { text: "How many hours of quality sleep are recommended?", options: ["Five to six", "Seven to eight", "Nine to ten", "Three to four"], correct: 1, explanation: "7-8 saat yuxu tövsiyə olunur: 'seven to eight hours.'" },
          { text: "What are short-term effects of sleep deprivation?", options: ["Better focus", "Impaired reaction times and reduced problem-solving", "More energy", "Improved health"], correct: 1, explanation: "Reaksiya müddəti zəifləyir və problem həll etmə qabiliyyəti azalır." },
          { text: "What has persistent sleep deficiency been linked to?", options: ["Increased life expectancy", "Cardiovascular diseases, weakened immune responses, metabolic disorders", "Better job performance", "More creativity"], correct: 1, explanation: "Ürək-damar xəstəlikləri, zəifləmiş immunitet və metabolik pozğunluqlar." },
          { text: "What does sleep hygiene involve according to the text?", options: ["Using phones in bed", "Establishing consistent schedules and reducing blue light", "Sleeping anywhere", "Taking sleeping pills"], correct: 1, explanation: "Daimi yuxu cədvəli və mavi işığa məruz qalmanı azaltmaq." }
        ]
      },
      {
        id: 'B2-3',
        title: "Sustainable Tourism: Balancing Economy and Preservation",
        audioSrc: "/audio/B2/listening3.mp3",
        text: `Tourism represents one of the world's largest economic sectors, driving infrastructure development, generating millions of jobs, and fostering intercultural exchange. However, the uncontrolled expansion of global travel—often referred to as 'overtourism'—has generated severe ecological, social, and economic strains on popular destinations worldwide. Historic cities, delicate coastal ecosystems, and remote mountain communities frequently find themselves overwhelmed by tourist volumes that exceed their structural and environmental carrying capacity. The consequences are multifaceted: skyrocketing housing costs that displace local residents, intense pressure on local waste management systems, and the gradual erosion of authentic cultural heritage in favor of commercialized tourist traps. In response to these critical issues, the concept of sustainable tourism has emerged as an imperative framework. Sustainable tourism seeks to minimize environmental impact and cultural degradation while ensuring that local communities derive tangible, long-term economic benefits. Implementing this requires strategic urban management, such as establishing daily visitor caps at vulnerable historic sites, imposing targeted eco-taxes to fund conservation initiatives, and encouraging tourists to explore lesser-known regions during off-peak seasons. Ultimately, preserving the world's cultural and natural treasures demands a shared responsibility between proactive policymakers and conscientious travelers.`,
        questions: [
          { text: "What is 'overtourism' according to the text?", options: ["Tourism in winter", "Uncontrolled expansion of global travel causing strains", "Tourism only for the rich", "Eco-friendly tourism"], correct: 1, explanation: "Overtourism - qlobal səyahətin nəzarətsiz genişlənməsidir." },
          { text: "What are consequences of overtourism mentioned?", options: ["Lower housing costs", "Skyrocketing housing costs and erosion of cultural heritage", "Better waste management", "More authentic culture"], correct: 1, explanation: "Ev qiymətlərinin artması və mədəni irsin aşınması." },
          { text: "What does sustainable tourism seek to achieve?", options: ["More tourists", "Minimize environmental impact and benefit local communities", "Stop all tourism", "Build more hotels"], correct: 1, explanation: "Ətraf mühitə təsiri azaltmaq və yerli icmalara fayda vermək." },
          { text: "What is one strategy for implementing sustainable tourism?", options: ["Encouraging tourists to visit during peak season", "Setting daily visitor caps at historic sites", "Removing all tourist attractions", "Increasing hotel construction"], correct: 1, explanation: "Tarixi yerlərdə gündəlik ziyarətçi limiti təyin etmək." },
          { text: "What are 'eco-taxes' used for according to the text?", options: ["Paying for hotel construction", "Funding conservation initiatives", "Reducing tourism", "Increasing profits"], correct: 1, explanation: "Ekoloji vergilər təbiətin qorunmasına xərclənir: 'to fund conservation initiatives.'" },
          { text: "Who does the text say shares responsibility for preserving cultural treasures?", options: ["Only tourists", "Only governments", "Policymakers and conscientious travelers", "Hotel owners only"], correct: 2, explanation: "Siyasətçilər və vicdanlı səyahətçilər: 'shared responsibility between proactive policymakers and conscientious travelers.'" }
        ]
      },
      {
        id: 'B2-4',
        title: "The Influence of Architecture on Human Psychology",
        audioSrc: "/audio/B2/listening4.mp3",
        text: `While architecture is primarily evaluated through the lenses of engineering efficiency, aesthetic beauty, and historical style, its profound psychological impact on human behavior and emotional well-being is increasingly gaining recognition. Environmental psychology demonstrates that the physical structures we inhabit exert a continuous, subtle influence on our cognitive performance, stress levels, and social interactions. High ceilings, for instance, have been shown to stimulate creative and conceptual thinking, whereas lower ceilings tend to foster focus and detail-oriented tasks. Similarly, exposure to natural light and views of green landscapes within architectural designs significantly reduces cortisol levels and enhances overall mood. Conversely, windowless, overly sterile, or chaotic urban environments can induce chronic psychological fatigue and feelings of alienation. This intersection of architecture and human biology has given rise to 'biophilic design'—an architectural approach that deliberately incorporates natural elements, such as vegetation, natural ventilation, organic materials, and water features, into constructed spaces. As urbanization accelerates globally, architects and urban planners bear a growing responsibility to design environments that do not merely shelter human bodies, but actively nurture psychological health, social cohesion, and intellectual vitality.`,
        questions: [
          { text: "What is the psychological impact of high ceilings?", options: ["They cause anxiety", "They stimulate creative and conceptual thinking", "They induce sleep", "They reduce focus"], correct: 1, explanation: "Hündür tavanlar yaradıcı düşüncəni stimullaşdırır: 'stimulate creative and conceptual thinking.'" },
          { text: "What do lower ceilings tend to foster?", options: ["Creative thinking", "Focus and detail-oriented tasks", "Relaxation", "Social interaction"], correct: 1, explanation: "Aşağı tavanlar diqqət və detallı işləri təşviq edir." },
          { text: "How does exposure to natural light affect people?", options: ["Increases stress", "Reduces cortisol levels and enhances mood", "Causes fatigue", "Reduces productivity"], correct: 1, explanation: "Təbii işıq kortizol səviyyəsini azaldır və əhval-ruhiyyəni yaxşılaşdırır." },
          { text: "What is 'biophilic design'?", options: ["Design without windows", "Design incorporating natural elements", "Modern architecture", "Traditional architecture"], correct: 1, explanation: "Biophilic dizayn təbii elementləri birləşdirir." },
          { text: "What can windowless or chaotic urban environments induce?", options: ["Happiness", "Chronic psychological fatigue and alienation", "More creativity", "Better health"], correct: 1, explanation: "Pəncərəsiz mühitlər psixoloji yorğunluq və yadlaşma yaradır." },
          { text: "What responsibility do architects and urban planners have?", options: ["Only build shelters", "Design for psychological health, social cohesion, and vitality", "Focus only on cost", "Ignore environmental impact"], correct: 1, explanation: "Psixoloji sağlamlıq, sosial birlik və canlılıq üçün dizayn etmək." }
        ]
      }
    ],
    C1: [
      {
        id: 'C1-1',
        title: "The Paradox of Choice in Consumer Culture",
        audioSrc: "/audio/C1/listening1.mp3",
        text: `In contemporary capitalistic societies, the proliferation of choice is widely celebrated as the ultimate manifestation of individual freedom and autonomy. Consumer markets continuously expand their inventories, offering an overwhelming variety of options across every conceivable domain—from banal retail commodities to complex financial instruments and career trajectories. However, theoretical insights from behavioral economics and social psychology suggest that this surplus of options frequently yields a paradoxical outcome: rather than maximizing subjective well-being, hyper-choice often induces acute cognitive friction, decision paralysis, and pervasive post-decision regret. When individuals are confronted with an excessively vast array of alternatives, the cognitive burden of evaluating trade-offs increases exponentially. Consequently, the probability of making an optimal selection diminishes, while the anticipation of potential opportunity costs rises. Furthermore, when the eventual outcome of a decision inevitably falls short of absolute perfection, consumers tend to internalize the blame, attributing the dissatisfaction to their own inadequate evaluation process rather than the market's structural overload. Mitigating this psychological strain requires cultivating deliberate heuristics, embracing 'satisficing' strategies rather than radical optimization, and recognizing that systemic abundance does not inherently correlate with individual contentment.`,
        questions: [
          { text: "What is the 'paradox of choice' as described in the text?", options: ["More choices always make people happier", "More choices can lead to less satisfaction and decision paralysis", "People prefer fewer choices", "Choice is irrelevant to happiness"], correct: 1, explanation: "Daha çox seçim qərar iflicinə və məmnuniyyətin azalmasına səbəb ola bilər." },
          { text: "What does behavioral economics say about surplus of options?", options: ["It maximizes happiness", "It induces cognitive friction and regret", "It simplifies decisions", "It has no effect"], correct: 1, explanation: "Seçimlərin çoxluğu koqnitiv gərginlik və peşmançılıq yaradır." },
          { text: "What happens when individuals face too many alternatives?", options: ["Easier decisions", "Cognitive burden increases exponentially", "Better choices", "Less anxiety"], correct: 1, explanation: "Koqnitiv yük eksponensial olaraq artır." },
          { text: "What do consumers tend to do when decisions don't meet expectations?", options: ["Blame the market", "Internalize blame and attribute dissatisfaction to themselves", "Make better choices", "Avoid decisions"], correct: 1, explanation: "İstehlakçılar günahı özlərində axtarırlar: 'internalize the blame.'" },
          { text: "What does the text suggest as a strategy to mitigate psychological strain?", options: ["Avoid all choices", "Embrace 'satisficing' strategies", "Always choose the cheapest option", "Only buy luxury items"], correct: 1, explanation: "Satisficing strategiyalarını qəbul etmək tövsiyə olunur." },
          { text: "What does 'satisficing' refer to in this context?", options: ["Perfect optimization", "Accepting a satisfactory option rather than searching for the best", "Avoiding decisions", "Buying everything"], correct: 1, explanation: "Ən yaxşını deyil, qənaətbəxş olanı seçmək." }
        ]
      },
      {
        id: 'C1-2',
        title: "The Algorithmic Commons and Epistemic Echo Chambers",
        audioSrc: "/audio/C1/listening2.mp3",
        text: `The democratization of information through digital media platforms was initially envisioned as an egalitarian force that would dismantle traditional knowledge gatekeepers and foster informed public discourse. Paradoxically, the underlying architectural mechanisms of modern digital platforms have significantly fragmented the public sphere. Modern information ecosystems are driven by sophisticated engagement-maximizing algorithms that meticulously analyze user behavior to curate hyper-personalized content streams. While computationally efficient for retaining user attention, these algorithmic filters systematically prioritize emotionally provocative and ideologically polarizing material over nuanced analysis. Consequently, users are inadvertently encapsulated within epistemic echo chambers—digital environments that continuously validate pre-existing biases while systematically filtering out disconfirming evidence or alternative viewpoints. This algorithmic segregation severely undermines public discourse by eroding shared factual baselines and exacerbating societal polarization. Addressing this cognitive vulnerability demands not only enhanced algorithmic transparency and regulatory oversight of platform architectures, but also the cultivation of rigorous digital literacy skills, enabling citizens to critically evaluate source credibility and navigate deliberate misinformation campaigns within complex information networks.`,
        questions: [
          { text: "What was the initial vision for digital media platforms?", options: ["To increase corporate profits", "To democratize information and foster public discourse", "To create echo chambers", "To limit access to information"], correct: 1, explanation: "Rəqəmsal platformalar informasiyanı demokratikləşdirmək üçün nəzərdə tutulmuşdu." },
          { text: "What drives modern digital information ecosystems?", options: ["User surveys", "Engagement-maximizing algorithms", "Government regulations", "Human editors"], correct: 1, explanation: "Müasir məlumat ekosistemləri alqoritmlər tərəfindən idarə olunur." },
          { text: "What do algorithmic filters prioritize?", options: ["Balanced reporting", "Emotionally provocative and polarizing material", "Scientific research", "Educational content"], correct: 1, explanation: "Alqoritmlər emosional olaraq qıcıqlandırıcı və qütbləşdirici materiallara üstünlük verir." },
          { text: "What is an 'epistemic echo chamber'?", options: ["A balanced discussion forum", "A digital environment that validates pre-existing biases", "An educational platform", "A news organization"], correct: 1, explanation: "Epistemik əks-səda kamerası mövcud qərəzləri təsdiqləyən rəqəmsal mühitdir." },
          { text: "How does algorithmic segregation affect public discourse?", options: ["Improves it", "Erodes shared factual baselines and exacerbates polarization", "Has no effect", "Unites people"], correct: 1, explanation: "Ortaq faktiki əsasları aşındırır və qütbləşməni gücləndirir." },
          { text: "What is needed to address this cognitive vulnerability?", options: ["Only algorithmic transparency", "Only regulation", "Algorithmic transparency, regulation, and digital literacy", "Limiting internet access"], correct: 2, explanation: "Alqoritmik şəffaflıq, tənzimləmə və rəqəmsal savadlılıq lazımdır." }
        ]
      },
      {
        id: 'C1-3',
        title: "Geoengineering and the Moral Hazards of Climate Mitigation",
        audioSrc: "/audio/C1/listening3.mp3",
        text: `As global greenhouse gas emissions continue to exceed targets outlined in international climate agreements, the scientific community is increasingly assessing solar radiation management and geoengineering techniques as potential interventions to avert catastrophic planetary warming. These proposed technological interventions—ranging from stratospheric aerosol injection to marine cloud brightening—aim to intentionally manipulate earth systems to reduce global temperatures. Proponents argue that given the inertia of international political negotiations and the accelerating pace of climate feedback loops, geoengineering may ultimately serve as a necessary stopgap measure to prevent severe ecological collapse. However, these theoretical technological solutions introduce profound ethical dilemmas and systemic risks. Critics emphasize the governance vacuum surrounding solar radiation management, noting that unilateral deployment by a single nation could irreversibly alter regional hydrological cycles, agricultural yields, and weather patterns, potentially sparking geopolitical conflict. Furthermore, reliance on speculative technological fixes risks creating a severe 'moral hazard' by diminishing the political urgency required to execute deep decarbonization and structural transitions away from fossil fuel consumption. Evaluating geoengineering requires navigating intricate interdisciplinary terrain where atmospheric science, international law, and ethical philosophy inevitably converge.`,
        questions: [
          { text: "What are geoengineering techniques proposed for?", options: ["Increasing pollution", "Reducing global temperatures and preventing climate collapse", "Producing more energy", "Creating new weather patterns"], correct: 1, explanation: "Geoengineering planetar istiləşməni azaltmaq üçün təklif olunur." },
          { text: "What is one example of geoengineering mentioned?", options: ["Planting trees", "Stratospheric aerosol injection", "Reducing emissions", "Recycling waste"], correct: 1, explanation: "Stratosferik aerosol enjeksiyonu qeyd olunur." },
          { text: "What risk does unilateral deployment of geoengineering pose?", options: ["It would save money", "It could alter regional hydrological cycles and cause geopolitical conflict", "It would reduce pollution", "It would solve climate change"], correct: 1, explanation: "Birtərəfli tətbiq regional hidroloji dövrləri dəyişə və geosiyasi münaqişəyə səbəb ola bilər." },
          { text: "What is the 'moral hazard' associated with geoengineering?", options: ["It guarantees success", "It may reduce urgency for deep decarbonization", "It is cheap", "It has no risks"], correct: 1, explanation: "Moral hazard - dərin karbonsuzlaşdırma üçün təcili ehtiyacı azalda bilər." },
          { text: "What does evaluating geoengineering require?", options: ["Only scientific knowledge", "Understanding of atmospheric science, international law, and ethics", "Only political support", "Only economic analysis"], correct: 1, explanation: "Qiymətləndirmə atmosfer elmi, beynəlxalq hüquq və etika tələb edir." },
          { text: "What do critics emphasize about governance of solar radiation management?", options: ["It is well-established", "There is a governance vacuum", "It is too strict", "It is unnecessary"], correct: 1, explanation: "Tənzimləmə boşluğu var: 'governance vacuum.'" }
        ]
      },
      {
        id: 'C1-4',
        title: "The Linguistic Construction of Reality and Cognitive Diversity",
        audioSrc: "/audio/C1/listening4.mp3",
        text: `The relationship between language, thought, and perception has long been a central debate within cognitive science, anthropology, and philosophy of language. The principle of linguistic relativity—often conceptualized as the Sapir-Whorf hypothesis—posits that the structural nuances of a particular language exert a profound influence on how its speakers categorize, perceive, and conceptualize the world around them. While radical linguistic determinism, which claims that language rigidly boundaries thought, has been largely dismissed by modern cognitive research, empirical evidence for softer versions of linguistic relativity has expanded significantly. Cross-linguistic studies reveal that variations in grammatical gender, spatial orientation frameworks, color terminology, and temporal metaphors measurably alter cognitive processing speeds, memory recall, and attentional focus. For instance, languages that utilize absolute cardinal directions rather than relative terms like 'left' or 'right' cultivate extraordinary spatial awareness in their speakers. As global linguistic diversity rapidly declines due to socioeconomic pressures and cultural homogenization, humanity faces the irreversible loss not merely of linguistic codes, but of unique, highly specialized conceptual systems. Preserving endangered languages is therefore imperative not only for historical conservation, but for maintaining the full spectrum of human cognitive diversity.`,
        questions: [
          { text: "What does the Sapir-Whorf hypothesis propose?", options: ["Language has no effect on thought", "Structural nuances of language influence perception and cognition", "All languages are the same", "Thought determines language"], correct: 1, explanation: "Sapir-Whorf hipotezi dilin qavrayışa təsir etdiyini irəli sürür." },
          { text: "What has modern cognitive research largely dismissed?", options: ["Linguistic relativity", "The existence of language", "Radical linguistic determinism", "All language theories"], correct: 2, explanation: "Radikal linqvistik determinizm rədd edilmişdir." },
          { text: "What do cross-linguistic studies reveal about language differences?", options: ["They don't affect cognition", "They measurably alter cognitive processing, memory, and attention", "They only affect pronunciation", "They are irrelevant"], correct: 1, explanation: "Dillər arası fərqlər koqnitiv emal, yaddaş və diqqəti dəyişir." },
          { text: "What is an example of a language feature that affects spatial awareness?", options: ["Verb tenses", "Absolute cardinal directions instead of relative terms", "Article usage", "Plural forms"], correct: 1, explanation: "Mütləq istiqamət bildirən dillər fəzavi məlumatlılığı artırır." },
          { text: "Why is preserving endangered languages important?", options: ["Only for history", "To maintain cognitive diversity and unique conceptual systems", "To make more speakers", "For tourism"], correct: 1, explanation: "Koqnitiv müxtəlifliyi qorumaq üçün vacibdir: 'maintaining the full spectrum of human cognitive diversity.'" },
          { text: "What is 'linguistic diversity' declining due to?", options: ["More languages being created", "Socioeconomic pressures and cultural homogenization", "Better education", "More travel"], correct: 1, explanation: "Sosio-iqtisadi təzyiqlər və mədəni homogenləşmə səbəbindən azalır." }
        ]
      }
    ]
  };

  const getTestsForLevel = (level) => {
    return listeningTests[level] || [];
  };

  const currentTests = selectedLevel ? getTestsForLevel(selectedLevel) : [];
  const currentTest = selectedTest !== null && currentTests[selectedTest] ? currentTests[selectedTest] : null;

  const startTest = (level, testIndex) => {
    setSelectedLevel(level);
    setSelectedTest(testIndex);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setShowExplanations(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBackToLevels = () => {
    setSelectedLevel(null);
    setSelectedTest(null);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setShowExplanations(false);
  };

  const goBackToTests = () => {
    setSelectedTest(null);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setShowExplanations(false);
  };

  const handleAnswer = (qIndex, value) => {
    if (!submitted) {
      setAnswers({ ...answers, [qIndex]: value });
    }
  };

  const submitQuiz = () => {
    let newScore = 0;
    if (currentTest) {
      currentTest.questions.forEach((q, i) => {
        if (answers[i] === q.correct) newScore++;
      });
    }
    setScore(newScore);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetQuiz = () => {
    setSubmitted(false);
    setAnswers({});
    setScore(0);
    setShowExplanations(false);
  };

  // ==================== RENDER LEVEL SELECTION ====================
  if (!selectedLevel) {
    return (
      <>
        <div className="page-hero">
          <h2>🎧 Listening Comprehension Tests</h2>
          <p>Choose your level to start listening practice. Each level has 4 listening passages with 6 questions each.</p>
        </div>
        <div className="level-selection-container">
          {levels.map((level) => {
            const testCount = getTestsForLevel(level).length;
            return (
              <div key={level} className="level-card" onClick={() => setSelectedLevel(level)}>
                <div className="level-header">
                  <span className="level-badge">{level}</span>
                </div>
                <h3>Level {level}</h3>
                <p>{testCount} Listening Passages</p>
                <div className="level-stats">
                  <span>{testCount * 6} Questions</span>
                  <span>Multiple Choice</span>
                </div>
                <button className="level-start-btn">View Tests</button>
              </div>
            );
          })}
        </div>
        <Footer />
      </>
    );
  }

  // ==================== RENDER TEST SELECTION ====================
  if (selectedLevel && selectedTest === null) {
    return (
      <>
        <div className="page-hero">
          <button className="back-btn" onClick={goBackToLevels}>← Back to Levels</button>
          <h2>Level {selectedLevel} - Listening Tests</h2>
          <p>Select a passage to listen and answer questions.</p>
        </div>
        <div className="topic-selection-container">
          {currentTests.map((test, index) => (
            <div key={test.id} className="topic-card" onClick={() => startTest(selectedLevel, index)}>
              <h3>🎵 {test.title}</h3>
              <p>Click to start the listening test with audio</p>
              <div className="topic-footer">
                <span className="topic-levels">{test.questions.length} Questions</span>
                <span className="topic-arrow">▶</span>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </>
    );
  }

  // ==================== RENDER QUIZ / RESULTS ====================
  if (selectedLevel && selectedTest !== null && currentTest) {
    const totalQuestions = currentTest.questions.length;

    // ==================== RESULTS SCREEN ====================
    if (submitted) {
      const percentage = (score / totalQuestions) * 100;
      let grade = '';
      if (percentage >= 90) grade = 'Excellent 🌟';
      else if (percentage >= 75) grade = 'Very Good ✅';
      else if (percentage >= 60) grade = 'Good 📖';
      else if (percentage >= 45) grade = 'Need Practice 📝';
      else grade = 'Need More Practice 🔄';

      return (
        <div className="quiz-container result-container">
          <button className="back-btn" onClick={goBackToTests}>← Back to Tests</button>
          <h2>{currentTest.title} - Results</h2>
          <div className="result-card">
            <div className="result-topic">Level {selectedLevel}</div>
            <div className="result-score">
              <span className="score-number">{score}</span>
              <span className="score-total"> / {totalQuestions}</span>
            </div>
            <div className="result-percentage">{Math.round(percentage)}%</div>
            <div className="result-grade">{grade}</div>
          </div>
          <div className="result-actions">
            <button className="submit-btn" onClick={() => setShowExplanations(!showExplanations)}>
              {showExplanations ? 'Hide Explanations' : 'Show Explanations'}
            </button>
            <button className="submit-btn" onClick={resetQuiz}>Try Again</button>
            <button className="submit-btn" onClick={goBackToTests}>Choose Different Test</button>
          </div>
          {showExplanations && (
            <div className="explanations-section">
              <h3>Detailed Explanations</h3>
              {currentTest.questions.map((q, i) => (
                <div key={i} className={`explanation-item ${answers[i] === q.correct ? 'correct-exp' : 'wrong-exp'}`}>
                  <p><strong>Q{i+1}:</strong> {q.text}</p>
                  <p><strong>Your answer:</strong> {q.options[answers[i]] || 'Not answered'}</p>
                  <p><strong>Correct answer:</strong> {q.options[q.correct]}</p>
                  <p><strong>Explanation:</strong> {q.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // ==================== QUESTIONS SCREEN ====================
    const showTranscript = (testId) => {
      const transElement = document.getElementById(`transcript-${testId}`);
      if (transElement) {
        if (transElement.style.display === 'none' || !transElement.style.display) {
          transElement.style.display = 'block';
        } else {
          transElement.style.display = 'none';
        }
      }
    };

    return (
      <div className="quiz-container">
        <button className="back-btn" onClick={goBackToTests}>← Back to Tests</button>
        <h2>🎧 {currentTest.title}</h2>
        <div className="quiz-header">
          <span className="quiz-level-badge">{selectedLevel}</span>
          <span className="quiz-question-count">{totalQuestions} Questions</span>
        </div>
        
        {/* ==================== AUDIO PLAYER ==================== */}
        <div className="audio-player-container">
          <h3>🎵 Listen to the audio carefully:</h3>
          <audio controls className="audio-player" src={currentTest.audioSrc}>
            Your browser does not support the audio element.
          </audio>
          
          {/* ==================== SHOW TRANSCRIPT BUTTON ==================== */}
          <button 
            className="transcript-toggle-btn" 
            onClick={() => {
              const transElement = document.getElementById(`transcript-${currentTest.id}`);
              if (transElement) {
                transElement.style.display = transElement.style.display === 'block' ? 'none' : 'block';
              }
            }}
          >
            📝 {showTranscript[currentTest.id] ? 'Hide Transcript' : 'Show Transcript'}
          </button>
          
          {/* ==================== TRANSCRIPT ==================== */}
          <div 
            id={`transcript-${currentTest.id}`} 
            className="transcript-container" 
            style={{ display: 'none' }}
          >
            <h4>📖 Transcript</h4>
            <div className="transcript-text">
              {currentTest.text.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <p className="quiz-instruction">Choose the correct answer for each question based on what you heard.</p>
        <form>
          {currentTest.questions.map((q, qIndex) => (
            <div key={qIndex} className="question">
              <h3>{qIndex + 1}. {q.text}</h3>
              <div className="options">
                {q.options.map((opt, optIndex) => (
                  <label key={optIndex} className={answers[qIndex] === optIndex ? 'selected' : ''}>
                    <input
                      type="radio"
                      name={`q${qIndex}`}
                      value={optIndex}
                      checked={answers[qIndex] === optIndex}
                      onChange={() => handleAnswer(qIndex, optIndex)}
                    />
                    <span className="option-text">{String.fromCharCode(97 + optIndex)}) {opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </form>
        <button className="submit-btn" onClick={submitQuiz}>Submit Answers</button>
      </div>
    );
  }

  return (
    <>
      <div className="page-hero">
        <h2>🎧 Listening Comprehension Tests</h2>
        <p>Loading...</p>
      </div>
      <Footer />
    </>
  );
};

// ==================== APP (YENİ ROUTE ƏLAVƏ EDİN) ====================
const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  
  useEffect(() => { 
    document.body.className = darkMode ? 'dark' : 'light'; 
  }, [darkMode]);
  
  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/grammar" element={<GrammarPage />} />
          <Route path="/voca" element={<VocabularyTestPage />} />
          <Route path="/reading" element={<ReadingTestPage />} />
          <Route path="/listening" element={<ListeningTestPage />} /> {/* YENİ */}
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
};
export default App;