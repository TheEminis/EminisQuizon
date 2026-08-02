// src/components/layout/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="main-header">
      <div className="header-inner">
        <h1 onClick={() => { navigate('/'); closeMenu(); }} style={{ cursor: 'pointer' }}>
          EminisQuizon
        </h1>
        
        {/* Desktop Nav */}
<nav>
  <Link to="/">Home</Link>
  <Link to="/quiz">Quiz</Link>
  <Link to="/grammar">Grammar</Link>
  <Link to="/voca">Vocabulary Test</Link>
  <Link to="/reading">Reading</Link>
  <Link to="/listening">Listening</Link>
  <Link to="/login"> Login</Link>
  <Link to="/register"> Register</Link>
</nav>

<div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
  <Link to="/" onClick={closeMenu}>🏠 Home</Link>
  <Link to="/quiz" onClick={closeMenu}>📝 Quiz</Link>
  <Link to="/grammar" onClick={closeMenu}>📚 Grammar</Link>
  <Link to="/voca" onClick={closeMenu}>📖 Vocabulary Test</Link>
  <Link to="/reading" onClick={closeMenu}>📕 Reading</Link>
  <Link to="/listening" onClick={closeMenu}>🎧 Listening</Link>
  <Link to="/login" onClick={closeMenu}>🔐 Login</Link>
  <Link to="/register" onClick={closeMenu}>📝 Register</Link>
</div>

        <div className="header-right">
          <div className="toggle" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </div>
          
          {/* Hamburger Button */}
          <button 
            className={`hamburger-btn ${menuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={closeMenu}>🏠 Home</Link>
          <Link to="/quiz" onClick={closeMenu}>📝 Quiz</Link>
          <Link to="/grammar" onClick={closeMenu}>📚 Grammar</Link>
          <Link to="/voca" onClick={closeMenu}>📖 Vocabulary Test</Link>
          <Link to="/reading" onClick={closeMenu}>📕 Reading</Link>
          <Link to="/listening" onClick={closeMenu}>🎧 Listening</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;