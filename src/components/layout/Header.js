// src/components/layout/Header.js
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { getInitials, getAvatarColor } from '../../utils/avatar';

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { currentUser, stats, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleProfile = () => setProfileOpen((prev) => !prev);
  const closeProfile = () => setProfileOpen(false);

  const handleLogout = async () => {
    closeProfile();
    closeMenu();
    await logout();
    navigate('/');
  };

  // Kənara klikləndikdə profil panelini bağla
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = currentUser?.displayName || currentUser?.email || 'İstifadəçi';
  const initials = getInitials(currentUser?.displayName, currentUser?.email);
  const avatarColor = getAvatarColor(currentUser?.uid);

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
  {!currentUser && <Link to="/login">Login</Link>}
  {!currentUser && <Link to="/register">Register</Link>}
</nav>

        <div className="header-right">
          <div className="toggle" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </div>

          {currentUser && (
            <div className="profile-widget" ref={profileRef}>
              <button
                className="profile-avatar-btn"
                onClick={toggleProfile}
                aria-label="Profil"
              >
                <span className="profile-avatar" style={{ background: avatarColor }}>
                  {initials}
                </span>
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <span className="profile-avatar profile-avatar-lg" style={{ background: avatarColor }}>
                      {initials}
                    </span>
                    <div className="profile-info">
                      <span className="profile-name">{displayName}</span>
                      {currentUser?.email && (
                        <span className="profile-email">{currentUser.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="profile-stats">
                    <div className="profile-stat">
                      <span className="profile-stat-number">{stats.testsTaken}</span>
                      <span className="profile-stat-label">İşlənən test</span>
                    </div>
                    <div className="profile-stat">
                      <span className="profile-stat-number profile-stat-correct">{stats.correctAnswers}</span>
                      <span className="profile-stat-label">Düz cavab</span>
                    </div>
                    <div className="profile-stat">
                      <span className="profile-stat-number profile-stat-wrong">{stats.wrongAnswers}</span>
                      <span className="profile-stat-label">Səhv cavab</span>
                    </div>
                  </div>

                  <button className="profile-logout-btn" onClick={handleLogout}>
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}

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

          {!currentUser && (
            <>
              <Link to="/login" onClick={closeMenu}>👤 Login</Link>
              <Link to="/register" onClick={closeMenu}>✍️ Register</Link>
            </>
          )}

          {currentUser && (
            <div className="mobile-profile-section">
              <div className="mobile-profile-header">
                <span className="profile-avatar" style={{ background: avatarColor }}>
                  {initials}
                </span>
                <div className="profile-info">
                  <span className="profile-name">{displayName}</span>
                  {currentUser?.email && (
                    <span className="profile-email">{currentUser.email}</span>
                  )}
                </div>
              </div>
              <div className="profile-stats">
                <div className="profile-stat">
                  <span className="profile-stat-number">{stats.testsTaken}</span>
                  <span className="profile-stat-label">İşlənən test</span>
                </div>
                <div className="profile-stat">
                  <span className="profile-stat-number profile-stat-correct">{stats.correctAnswers}</span>
                  <span className="profile-stat-label">Düz cavab</span>
                </div>
                <div className="profile-stat">
                  <span className="profile-stat-number profile-stat-wrong">{stats.wrongAnswers}</span>
                  <span className="profile-stat-label">Səhv cavab</span>
                </div>
              </div>
              <button className="profile-logout-btn" onClick={handleLogout}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;