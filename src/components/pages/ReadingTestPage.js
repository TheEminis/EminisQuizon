// src/components/pages/ReadingTestPage.js
import React, { useState } from 'react';
import Footer from '../layout/Footer';
import { readingLevels, readingTests } from '../../data/readingData';

const ReadingTestPage = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanations, setShowExplanations] = useState(false);

  const levels = readingLevels;
  const getTestsForLevel = (level) => readingTests[level] || [];

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

  if (submitted && currentTest) {
    const totalQuestions = currentTest.questions.length;
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

  if (selectedLevel && selectedTest !== null && currentTest) {
    const totalQuestions = currentTest.questions.length;
    
    return (
      <div className="quiz-container">
        <button className="back-btn" onClick={goBackToTests}>← Back to Tests</button>
        <h2>{currentTest.title}</h2>
        <div className="quiz-header">
          <span className="quiz-level-badge">{selectedLevel}</span>
          <span className="quiz-question-count">{totalQuestions} Questions</span>
        </div>
        
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
};

export default ReadingTestPage;