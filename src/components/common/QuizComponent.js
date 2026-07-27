// src/components/common/QuizComponent.js
import React, { useState } from 'react';

const QuizComponent = ({ topic, level, onBack, getQuestions }) => {
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showExplanations, setShowExplanations] = useState(false);

  const currentQuestions = getQuestions(topic.name, level.id);

  const handleAnswer = (qIndex, value) => {
    if (!submitted) {
      setAnswers({ ...answers, [qIndex]: value });
    }
  };

  const submitQuiz = () => {
    let newScore = 0;
    currentQuestions.forEach((q, i) => {
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
    const percentage = (score / currentQuestions.length) * 100;
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
            <span className="score-total"> / {currentQuestions.length}</span>
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
            {currentQuestions.map((q, i) => (
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
        <span className="quiz-question-count">{currentQuestions.length} Questions</span>
      </div>
      <p className="quiz-instruction">Choose the correct answer for each question.</p>
      <form>
        {currentQuestions.map((q, qIndex) => (
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

export default QuizComponent;