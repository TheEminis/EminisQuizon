import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/common/ScrollToTop';
// Context
import { ThemeContext } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Auth
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './components/pages/HomePage';
import QuizPage from './components/pages/QuizPage';
import GrammarPage from './components/pages/GrammarPage';
import VocabularyTestPage from './components/pages/VocabularyTestPage';
import ReadingTestPage from './components/pages/ReadingTestPage';
import ListeningTestPage from './components/pages/ListeningTestPage';
import Login from './components/pages/Login';
import Register from './components/pages/Register';


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
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="page-wrapper">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz" element={
                  <ProtectedRoute><QuizPage /></ProtectedRoute>
                } />
                <Route path="/grammar" element={
                  <ProtectedRoute><GrammarPage /></ProtectedRoute>
                } />
                <Route path="/voca" element={
                  <ProtectedRoute><VocabularyTestPage /></ProtectedRoute>
                } />
                <Route path="/reading" element={
                  <ProtectedRoute><ReadingTestPage /></ProtectedRoute>
                } />
                <Route path="/listening" element={
                  <ProtectedRoute><ListeningTestPage /></ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeContext.Provider>
  );
};

export default App;