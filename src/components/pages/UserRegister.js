import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: ''
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

    if (formData.password !== formData.confirmPassword) {
      setError('Şifrələr uyğun gəlmir');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Şifrə ən az 6 simvol olmalıdır');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const userData = {
        username: formData.username,
        email: formData.email,
        full_name: formData.full_name || formData.username
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setSuccess('Qeydiyyat uğurludur! Xoş gəldiniz!');
      
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
      
      setLoading(false);
    }, 1000);
  };

  return (
    // ✅ WRAPPER ƏLAVƏ EDİLDİ
    <div className="auth-page-wrapper">
      <div className="page-hero">
        <h2> Qeydiyyat</h2>
        <p>Yeni hesab yaradın və öyrənməyə başlayın</p>
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
              <label htmlFor="username">İstifadəçi Adı</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="istifadeci_adi"
                required
                minLength="3"
                maxLength="30"
                className="auth-input"
              />
              <small>Yalnız hərf, rəqəm və _ istifadə edə bilərsiniz</small>
            </div>

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
              <label htmlFor="full_name">Ad Soyad (İsteğe bağlı)</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Ad Soyad"
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
              <small>Şifrə ən az 6 simvol olmalıdır</small>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Şifrə Təkrar</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
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
              {loading ? 'Gözləyin...' : '📝 Qeydiyyatdan keç'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Hesabınız var? <Link to="/login" className="auth-link">Daxil olun</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserRegister;