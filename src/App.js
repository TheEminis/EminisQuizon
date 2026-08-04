import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/common/ScrollToTop';
// Context
import { ThemeContext } from './context/ThemeContext';

// Layout
import Header from './components/layout/Header';

// Pages
import HomePage from './components/pages/HomePage';
import QuizPage from './components/pages/QuizPage';
import GrammarPage from './components/pages/GrammarPage';
import VocabularyTestPage from './components/pages/VocabularyTestPage';
import ReadingTestPage from './components/pages/ReadingTestPage';
import ListeningTestPage from './components/pages/ListeningTestPage';


const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  
  useEffect(() => { 
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(darkMode ? 'dark' : 'light');
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(darkMode ? 'dark' : 'light');
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
  }, [darkMode]);
  
  const toggleDarkMode = () => setDarkMode(!darkMode);
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/grammar" element={<GrammarPage />} />
          <Route path="/voca" element={<VocabularyTestPage />} />
          <Route path="/reading" element={<ReadingTestPage />} />
          <Route path="/listening" element={<ListeningTestPage />} />
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;