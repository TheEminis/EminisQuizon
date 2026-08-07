// src/components/pages/LevelTestPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePersistedState } from '../../hooks/usePersistedState';
import {
  levelTestQuestions,
  readingPassages,
  LEVEL_TEST_TOTAL_WEIGHT,
  percentageToCEFR,
  percentageToIELTS,
  CEFR_LABELS,
} from '../../data/levelTestData';

const SECTION_ORDER = ['Grammar', 'Vocabulary', 'Reading'];
const SECTION_LABELS = {
  Grammar: 'Grammar',
  Vocabulary: 'Vocabulary',
  Reading: 'Reading Comprehension',
};

const LevelTestPage = () => {
  const { currentUser, recordResult, recordLevelTestResult } = useAuth();

  const [testState, setTestState] = usePersistedState('emq_level_test_progress', {
    started: false,
    submitted: false,
    answers: {},
    result: null,
  });
  const { started, submitted, answers, result } = testState;

  const startTest = () => {
    setTestState({ started: true, submitted: false, answers: {}, result: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswer = (qId, optIndex) => {
    if (submitted) return;
    setTestState({ ...testState, answers: { ...answers, [qId]: optIndex } });
  };

  const answeredCount = Object.keys(answers).length;

  const submitTest = () => {
    let earnedWeight = 0;
    let correctCount = 0;
    levelTestQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        earnedWeight += q.weight;
        correctCount += 1;
      }
    });
    const percentage = Math.round((earnedWeight / LEVEL_TEST_TOTAL_WEIGHT) * 100);
    const band = percentageToCEFR(percentage);
    const ieltsBand = percentageToIELTS(percentage);

    const newResult = {
      score: correctCount,
      total: levelTestQuestions.length,
      percentage,
      band,
      ieltsBand,
      completedAt: Date.now(),
    };

    setTestState({ ...testState, submitted: true, result: newResult });
    recordResult(correctCount, levelTestQuestions.length);
    recordLevelTestResult(newResult);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const retakeTest = () => {
    setTestState({ started: true, submitted: false, answers: {}, result: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---------------------------------------------------------------
  // INTRO SCREEN
  // ---------------------------------------------------------------
  if (!started) {
    return (
      <div className="quiz-container level-test-intro">
        <h2>English Level Test</h2>
        <p className="quiz-instruction">
          A single, mixed-difficulty placement test in an IELTS-style format - Grammar,
          Vocabulary and Reading Comprehension - spanning CEFR levels A1 to C1. Your result
          determines your English level and, if you're signed in, your best score is saved to
          the Leaderboard.
        </p>
        <div className="level-test-info-grid">
          <div className="level-test-info-card">
            <span className="level-test-info-number">{levelTestQuestions.length}</span>
            <span className="level-test-info-label">Questions</span>
          </div>
          <div className="level-test-info-card">
            <span className="level-test-info-number">3</span>
            <span className="level-test-info-label">Sections</span>
          </div>
          <div className="level-test-info-card">
            <span className="level-test-info-number">~20</span>
            <span className="level-test-info-label">Minutes</span>
          </div>
          <div className="level-test-info-card">
            <span className="level-test-info-number">A1-C1</span>
            <span className="level-test-info-label">CEFR Range</span>
          </div>
        </div>
        {!currentUser && (
          <div className="alert alert-error" style={{ marginTop: 18 }}>
            You're not signed in. You can still take the test, but your result will only be
            saved on this device and won't appear on the Leaderboard. <Link to="/login">Log in</Link> or{' '}
            <Link to="/register">register</Link> first to save your rank.
          </div>
        )}
        <button className="submit-btn" style={{ marginTop: 24 }} onClick={startTest}>
          Start Level Test
        </button>
      </div>
    );
  }

  // ---------------------------------------------------------------
  // RESULT SCREEN
  // ---------------------------------------------------------------
  if (submitted && result) {
    return (
      <div className="quiz-container result-container">
        <h2>Your Level Test Result</h2>
        <div className="result-card level-result-card">
          <div className="level-badge-big">{result.band}</div>
          <div className="result-topic">{CEFR_LABELS[result.band]}</div>
          <div className="result-score">
            <span className="score-number">{result.score}</span>
            <span className="score-total"> / {result.total}</span>
          </div>
          <div className="result-percentage">{result.percentage}%</div>
          <div className="ielts-estimate">Estimated IELTS band: {result.ieltsBand}</div>
        </div>

        {currentUser ? (
          <p className="quiz-instruction" style={{ textAlign: 'center' }}>
            Your best score has been saved. Check where you rank on the{' '}
            <Link to="/leaderboard">Leaderboard</Link>.
          </p>
        ) : (
          <div className="alert alert-error" style={{ textAlign: 'center' }}>
            This result was saved on this device only. <Link to="/login">Log in</Link> or{' '}
            <Link to="/register">register</Link> to appear on the Leaderboard next time.
          </div>
        )}

        <div className="result-actions">
          <button className="submit-btn" onClick={retakeTest}>Retake Test</button>
          <Link to="/leaderboard" className="submit-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>
            View Leaderboard
          </Link>
        </div>

        <div className="explanations-section">
          <h3>Review Your Answers</h3>
          {levelTestQuestions.map((q, i) => (
            <div
              key={q.id}
              className={`explanation-item ${answers[q.id] === q.correct ? 'correct-exp' : 'wrong-exp'}`}
            >
              <p><strong>Q{i + 1} ({q.section} - {q.cefr}):</strong> {q.text}</p>
              <p><strong>Your answer:</strong> {q.options[answers[q.id]] ?? 'Not answered'}</p>
              <p><strong>Correct answer:</strong> {q.options[q.correct]}</p>
              <p><strong>Explanation:</strong> {q.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------
  // TEST SCREEN
  // ---------------------------------------------------------------
  let renderedPassageIds = [];

  return (
    <div className="quiz-container">
      <h2>English Level Test</h2>
      <div className="quiz-header">
        <span className="quiz-level-badge">A1-C1</span>
        <span className="quiz-level-name">Mixed Placement Test</span>
        <span className="quiz-question-count">
          {answeredCount} / {levelTestQuestions.length} answered
        </span>
      </div>
      <p className="quiz-instruction">Choose the best answer for each question.</p>

      {SECTION_ORDER.map((sectionName) => {
        const sectionQuestions = levelTestQuestions.filter((q) => q.section === sectionName);
        return (
          <div key={sectionName} className="level-test-section">
            <h3 className="level-test-section-title">{SECTION_LABELS[sectionName]}</h3>
            <form>
              {sectionQuestions.map((q) => {
                const passage =
                  q.passageId && !renderedPassageIds.includes(q.passageId)
                    ? readingPassages.find((p) => p.passageId === q.passageId)
                    : null;
                if (passage) renderedPassageIds.push(passage.passageId);

                const globalIndex = levelTestQuestions.findIndex((qq) => qq.id === q.id);

                return (
                  <React.Fragment key={q.id}>
                    {passage && (
                      <div className="reading-passage">
                        <h4>{passage.passageTitle}</h4>
                        <p>{passage.passageText}</p>
                      </div>
                    )}
                    <div className="question">
                      <h3>{globalIndex + 1}. {q.text}</h3>
                      <div className="options">
                        {q.options.map((opt, optIndex) => (
                          <label key={optIndex} className={answers[q.id] === optIndex ? 'selected' : ''}>
                            <input
                              type="radio"
                              name={q.id}
                              value={optIndex}
                              checked={answers[q.id] === optIndex}
                              onChange={() => handleAnswer(q.id, optIndex)}
                            />
                            <span className="option-text">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </form>
          </div>
        );
      })}

      <button className="submit-btn" onClick={submitTest}>
        Submit Test ({answeredCount}/{levelTestQuestions.length} answered)
      </button>
    </div>
  );
};

export default LevelTestPage;
