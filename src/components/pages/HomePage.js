// src/components/pages/HomePage.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    </>
  );
};

export default HomePage;