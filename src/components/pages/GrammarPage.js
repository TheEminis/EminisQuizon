// src/components/pages/GrammarPage.js
import React, { useState, useEffect } from 'react';
import Footer from '../layout/Footer';
import { grammarTopics } from '../../data/grammarData';

const GrammarPage = () => {
  const [expandedTopic, setExpandedTopic] = useState(null);
    useEffect(() => {
  window.scrollTo(0, 0);
}, [expandedTopic]);

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

export default GrammarPage;