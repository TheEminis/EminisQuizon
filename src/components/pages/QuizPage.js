// src/components/pages/QuizPage.js
import React from 'react';
import QuizComponent from '../common/QuizComponent';
import { quizTopics, levels, getAllQuestions } from '../../data/quizQuestions';
import { usePersistedState } from '../../hooks/usePersistedState';

const QuizPage = () => {
  // Persisted by id (not the whole object) so a page refresh restores the
  // same topic/level without ever going stale relative to quizQuestions.js.
  const [selectedTopicId, setSelectedTopicId] = usePersistedState('emq_quiz_selectedTopicId', null);
  const [selectedLevelId, setSelectedLevelId] = usePersistedState('emq_quiz_selectedLevelId', null);

  const selectedTopic = quizTopics.find(t => t.id === selectedTopicId) || null;
  const selectedLevel = levels.find(l => l.id === selectedLevelId) || null;

  const setSelectedTopic = (topic) => setSelectedTopicId(topic ? topic.id : null);
  const setSelectedLevel = (level) => setSelectedLevelId(level ? level.id : null);

  const getQuestions = getAllQuestions;

  if (selectedTopic && selectedLevel) {
    return (
      <QuizComponent 
        topic={selectedTopic} 
        level={selectedLevel} 
        onBack={() => { setSelectedTopic(null); setSelectedLevel(null); }}
        getQuestions={getQuestions}
      />
    );
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
    </>
  );
};

export default QuizPage;