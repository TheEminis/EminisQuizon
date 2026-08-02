import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError('Email və şifrə daxil edin');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      if (formData.email === 'test@test.com' && formData.password === '123456') {
        setSuccess('Daxil olma uğurludur!');
        localStorage.setItem('user', JSON.stringify({ 
          email: formData.email, 
          name: '' 
        }));
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        setError('Email və ya şifrə yanlışdır');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    // ✅ WRAPPER ƏLAVƏ EDİLDİ
    <div className="auth-page-wrapper">
      <div className="page-hero">
        <h2> Daxil Ol</h2>
        <p>Hesabınıza daxil olun və öyrənməyə davam edin</p>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          {error && (
            <div className="auth-error">
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div className="auth-success">
              ✅ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className="auth-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Şifrə</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength="6"
                className="auth-input"
              />
            </div>

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading ? 'Gözləyin...' : '🔑 Daxil Ol'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Hesabınız yoxdur? <Link to="/register" className="auth-link">Qeydiyyatdan keçin</Link>
            </p>
            <div className="test-account-info">
              <strong>Test hesabı:</strong> test@test.com / 123456
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserLogin;