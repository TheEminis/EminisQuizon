// src/components/pages/VocabularyTestPage.js
import React, { useEffect, useMemo } from 'react';
import { vocabularyLevels, vocabularyData } from '../../data/vocabularyData';
import { useAuth } from '../../hooks/useAuth';
import { usePersistedState } from '../../hooks/usePersistedState';

const VocabularyTestPage = () => {
  const { recordResult } = useAuth();
  const [selectedLevel, setSelectedLevel] = usePersistedState('emq_voca_selectedLevel', null);
  // Combined per-level progress: answers, submitted state, score, and the
  // randomized answer options themselves. Persisting the options too means
  // the choices shown (and the "wrong answer" review) stay identical after
  // a refresh or a login/logout instead of re-shuffling and losing state.
  const progressKey = `emq_voca_progress_${selectedLevel}`;
  const [progress, setProgress] = usePersistedState(progressKey, {
    answers: {},
    submitted: false,
    score: 0,
    questionOptions: [],
  });
  const { answers, submitted, score, questionOptions } = progress;

  const levels = vocabularyLevels;
  const getVocabData = (level) => vocabularyData[level] || [];

  const questions = useMemo(
  () => (selectedLevel ? getVocabData(selectedLevel) : []),
  [selectedLevel]
);

  const generateOptions = () => questions.map((q, index) => {
    const otherMeanings = questions
      .filter((_, idx) => idx !== index)
      .map(q => q.meaning)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const options = [q.meaning, ...otherMeanings];
    return options.sort(() => 0.5 - Math.random());
  });

  useEffect(() => {
    // Only shuffle new options the first time this level is opened - if
    // progress was already restored from localStorage (options + answers),
    // leave it alone so a refresh/login-logout doesn't wipe it out.
    if (selectedLevel && questions.length > 0 && questionOptions.length === 0) {
      setProgress(prev => ({ ...prev, questionOptions: generateOptions() }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLevel, questions, questionOptions.length]);

  const handleBack = () => {
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
    recordResult(s, questions.length);
  };

  const handleTryAgain = () => {
    if (selectedLevel && questions.length > 0) {
      setProgress({
        answers: {},
        submitted: false,
        score: 0,
        questionOptions: generateOptions(),
      });
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
    </>
  );
};

export default VocabularyTestPage;