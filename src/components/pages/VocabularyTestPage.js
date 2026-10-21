// src/components/pages/VocabularyTestPage.js
import React, { useEffect, useMemo } from 'react';
import { vocabularyLevels, getVocabTest, VOCAB_TESTS_PER_LEVEL, VOCAB_TEST_SIZE } from '../../data/vocabularyData';
import { useAuth } from '../../hooks/useAuth';
import { usePersistedState } from '../../hooks/usePersistedState';

// Fisher-Yates: düzgün (qərəzsiz) təsadüfi qarışdırma
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const VocabularyTestPage = () => {
  const { recordResult } = useAuth();
  const [selectedLevel, setSelectedLevel] = usePersistedState('emq_voca_selectedLevel', null);
  const [selectedTest, setSelectedTest] = usePersistedState('emq_voca_selectedTest', null);
  const hasTest = selectedLevel && selectedTest !== null;
  // Combined per-level+test progress: answers, submitted state, score, and the
  // randomized answer options themselves. Persisting the options too means
  // the choices shown (and the "wrong answer" review) stay identical after
  // a refresh or a login/logout instead of re-shuffling and losing state.
  const progressKey = `emq_voca_progress_${selectedLevel}_${selectedTest}`;
  const [progress, setProgress] = usePersistedState(progressKey, {
    answers: {},
    submitted: false,
    score: 0,
    questionOptions: [],
  });
  const { answers, submitted, score, questionOptions } = progress;

  const levels = vocabularyLevels;
  const questions = useMemo(
    () => (hasTest ? getVocabTest(selectedLevel, selectedTest) : []),
    [hasTest, selectedLevel, selectedTest]
  );

  const generateOptions = () => questions.map((q, index) => {
    const otherMeanings = shuffle(
      questions.filter((_, idx) => idx !== index).map(q => q.meaning)
    ).slice(0, 3);
    return shuffle([q.meaning, ...otherMeanings]);
  });

  useEffect(() => {
    // Only shuffle new options the first time this level is opened - if
    // progress was already restored from localStorage (options + answers),
    // leave it alone so a refresh/login-logout doesn't wipe it out.
    if (hasTest && questions.length > 0 && questionOptions.length === 0) {
      setProgress(prev => ({ ...prev, questionOptions: generateOptions() }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasTest, selectedLevel, selectedTest, questions, questionOptions.length]);

  const handleBack = () => {
    setSelectedTest(null);
  };

  const handleBackToLevels = () => {
    setSelectedTest(null);
    setSelectedLevel(null);
  };

  const handleAnswer = (qIndex, value) => {
    if (!submitted) {
      setProgress({ ...progress, answers: { ...answers, [qIndex]: value } });
    }
  };

  const handleSubmit = () => {
    let s = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.meaning) s++;
    });
    setProgress({ ...progress, score: s, submitted: true });
    recordResult(s, questions.length, {
      type: 'voca',
      label: `Vocabulary · ${selectedLevel} · Test ${selectedTest + 1}`,
    });
  };

  const handleTryAgain = () => {
    if (hasTest && questions.length > 0) {
      setProgress({
        answers: {},
        submitted: false,
        score: 0,
        questionOptions: generateOptions(),
      });
    }
  };

  if (submitted && hasTest) {
    return (
      <div className="quiz-container result-container">
        <button className="back-btn" onClick={handleBack}> Back to Tests</button>
        <h2>Vocabulary Results - {selectedLevel} · Test {selectedTest + 1}</h2>
        <div className="result-card">
          <div className="result-score">
            <span className="score-number">{score}</span>
            <span className="score-total"> / {questions.length}</span>
          </div>
          <div className="result-percentage">{Math.round((score/questions.length)*100)}%</div>
        </div>
        <div className="result-actions">
          <button className="submit-btn" onClick={handleTryAgain}>Try Again</button>
          <button className="submit-btn" onClick={handleBack}>Choose Different Test</button>
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

  if (hasTest && questionOptions.length > 0) {
    return (
      <div className="quiz-container">
        <button className="back-btn" onClick={handleBack}> Back to Tests</button>
        <h2>Vocabulary Test - {selectedLevel} · Test {selectedTest + 1}</h2>
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

  if (selectedLevel) {
    const lvl = levels.find((l) => l.id === selectedLevel);
    return (
      <>
        <div className="page-hero">
          <button className="back-btn" onClick={handleBackToLevels}> Back to Levels</button>
          <h2>{lvl ? lvl.name : selectedLevel} - Choose a Test</h2>
          <p>{VOCAB_TESTS_PER_LEVEL} tests, {VOCAB_TEST_SIZE} words each. Every test has different words.</p>
        </div>
        <div className="level-selection-container">
          {Array.from({ length: VOCAB_TESTS_PER_LEVEL }, (_, i) => (
            <div key={i} className="level-card" onClick={() => { setSelectedTest(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <div className="level-header"><span className="level-badge">{selectedLevel}</span></div>
              <h3>Test {i + 1}</h3>
              <p>Words {i * VOCAB_TEST_SIZE + 1}-{(i + 1) * VOCAB_TEST_SIZE}</p>
              <div className="level-stats"><span>{VOCAB_TEST_SIZE} words</span><span>Multiple Choice</span></div>
              <button className="level-start-btn">Start Test</button>
            </div>
          ))}
        </div>
      </>
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
          <div key={level.id} className="level-card" onClick={() => { setSelectedLevel(level.id); setSelectedTest(null); }}>
            <div className="level-header"><span className="level-badge">{level.id}</span></div>
            <h3>{level.name}</h3>
            <p>{level.description}</p>
            <div className="level-stats"><span>{level.wordCount}</span><span>Multiple Choice</span></div>
            <button className="level-start-btn">Start Test</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default VocabularyTestPage;