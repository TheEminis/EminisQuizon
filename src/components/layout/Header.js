// src/components/layout/Header.js
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { getInitials, getAvatarColor } from '../../utils/avatar';

const TEST_LINKS = [
  { to: '/quiz', label: 'Quiz', icon: '📝' },
  { to: '/grammar', label: 'Grammar', icon: '📚' },
  { to: '/voca', label: 'Vocabulary Test', icon: '📖' },
  { to: '/reading', label: 'Reading', icon: '📕' },
  { to: '/listening', label: 'Listening', icon: '🎧' },
  { to: '/level-test', label: 'Level Test', icon: '🎯' },
];

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [testsOpen, setTestsOpen] = useState(false);
  const [mobileTestsOpen, setMobileTestsOpen] = useState(false);

  const profileRef = useRef(null);
  const testsRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeProfile = () => setProfileOpen(false);
  const toggleProfile = () => setProfileOpen((prev) => !prev);

  const closeTests = () => setTestsOpen(false);
  const toggleTests = () => setTestsOpen((prev) => !prev);

  const handleLogout = async () => {
    closeProfile();
    closeMenu();
    await logout();
    navigate('/');
  };

  // Kənara klikləndikdə açıq panelləri bağla
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (testsRef.current && !testsRef.current.contains(e.target)) {
        setTestsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Route dəyişəndə bütün açıq menyuları bağla
  useEffect(() => {
    closeMenu();
    closeProfile();
    closeTests();
    setMobileTestsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const isTestRoute = TEST_LINKS.some((l) => l.to === location.pathname);
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
          <Link to="/" className={location.pathname === '/' ? 'active-link' : ''}>Home</Link>

          <div className="nav-dropdown" ref={testsRef}>
            <button
              type="button"
              className={`nav-dropdown-trigger ${isTestRoute ? 'active-link' : ''}`}
              onClick={toggleTests}
              aria-expanded={testsOpen}
            >
              Tests <span className={`nav-caret ${testsOpen ? 'open' : ''}`}>▾</span>
            </button>
            {testsOpen && (
              <div className="nav-dropdown-menu">
                {TEST_LINKS.map((link) => (
                  <Link key={link.to} to={link.to} onClick={closeTests}>
                    <span className="nav-dropdown-icon">{link.icon}</span> {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {currentUser && (
            <Link to="/leaderboard" className={location.pathname === '/leaderboard' ? 'active-link' : ''}>
              Leaderboard
            </Link>
          )}

          {!currentUser && (
            <span className="nav-auth-links">
              <Link to="/login">Login</Link>
              <Link to="/register" className="nav-cta">Register</Link>
            </span>
          )}
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

                  <Link to="/leaderboard" className="profile-dropdown-link" onClick={closeProfile}>
                    🏆 Leaderboard
                  </Link>

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

          <button
            type="button"
            className={`mobile-menu-group-toggle ${mobileTestsOpen ? 'open' : ''}`}
            onClick={() => setMobileTestsOpen((prev) => !prev)}
          >
            🧪 Tests <span className={`nav-caret ${mobileTestsOpen ? 'open' : ''}`}>▾</span>
          </button>
          <div className={`mobile-menu-group ${mobileTestsOpen ? 'open' : ''}`}>
            {TEST_LINKS.map((link) => (
              <Link key={link.to} to={link.to} onClick={closeMenu}>
                {link.icon} {link.label}
              </Link>
            ))}
          </div>

          {currentUser && (
            <Link to="/leaderboard" onClick={closeMenu}>🏆 Leaderboard</Link>
          )}

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
