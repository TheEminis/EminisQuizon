import React, { useState, useEffect, Suspense, lazy } from 'react';
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

// Pages (lazy: hər səhifə yalnız lazım olanda yüklənir)
import HomePage from './components/pages/HomePage';
const QuizPage = lazy(() => import('./components/pages/QuizPage'));
const GrammarPage = lazy(() => import('./components/pages/GrammarPage'));
const VocabularyTestPage = lazy(() => import('./components/pages/VocabularyTestPage'));
const ReadingTestPage = lazy(() => import('./components/pages/ReadingTestPage'));
const ListeningTestPage = lazy(() => import('./components/pages/ListeningTestPage'));
const LevelTestPage = lazy(() => import('./components/pages/LevelTestPage'));
const LeaderboardPage = lazy(() => import('./components/pages/LeaderboardPage'));
const Login = lazy(() => import('./components/pages/Login'));
const Register = lazy(() => import('./components/pages/Register'));
const ForgotPassword = lazy(() => import('./components/pages/ForgotPassword'));

const PageLoader = () => (
  <div className="page-loading" role="status" aria-label="Yüklənir">
    <div className="spinner-lg" />
  </div>
);

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
              <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz" element={
                  <ProtectedRoute><QuizPage /></ProtectedRoute>
                } />
                <Route path="/grammar" element={<GrammarPage />} />
                <Route path="/voca" element={
                  <ProtectedRoute><VocabularyTestPage /></ProtectedRoute>
                } />
                <Route path="/reading" element={
                  <ProtectedRoute><ReadingTestPage /></ProtectedRoute>
                } />
                <Route path="/listening" element={
                  <ProtectedRoute><ListeningTestPage /></ProtectedRoute>
                } />
                <Route path="/level-test" element={
                  <ProtectedRoute><LevelTestPage /></ProtectedRoute>
                } />
                <Route path="/leaderboard" element={
                  <ProtectedRoute><LeaderboardPage /></ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeContext.Provider>
  );
};

export default App;