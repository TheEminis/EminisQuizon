import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // firebase yolunu proyektinizə uyğun saxlayın
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const passwordRules = [
  { label: "Ən azı 8 simvol", valid: password.length >= 8 },
  { label: "Kiçik hərf (a-z)", valid: /[a-z]/.test(password) },
  { label: "Rəqəm (0-9)", valid: /[0-9]/.test(password) },
  { label: "Xüsusi simvol (!@#$%^&*)", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
];
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const isPasswordValid = passwordRules.every((rule) => rule.valid);
    if (!isPasswordValid) {
      setError("Zəhmət olmasa bütün şifrə tələblərini ödəyin.");
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      setSuccess("Qeydiyyat uğurla tamamlandı! Giriş səhifəsinə yönləndirilirsiniz...");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Bu email ünvanı ilə artıq qeydiyyatdan keçilib.");
      } else if (err.code === "auth/invalid-email") {
        setError("Düzgün bir email ünvanı daxil edin.");
      } else {
        setError("Qeydiyyat zamanı xəta baş verdi. Yenidən cəhd edin.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Hesab Yaradın</h2>
          <p>Təhlükəsiz qeydiyyatdan keçərək davam edin</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="nümayəndə@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Şifrə</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Gizlə" : "Göstər"}
              </button>
            </div>
          </div>

          <div className="password-rules">
            <span className="rules-title">Şifrə tələbləri:</span>
            <div className="rules-grid">
              {passwordRules.map((rule, index) => (
                <div
                  key={index}
                  className={`rule-item ${rule.valid ? "valid" : ""}`}
                >
                  <span className="rule-icon">{rule.valid ? "✓" : "○"}</span>
                  <span>{rule.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? <span className="spinner"></span> : "Qeydiyyatdan keç"}
          </button>
        </form>

        <div className="auth-footer">
          Artıq hesabınız var? <Link to="/login">Giriş et</Link>
        </div>
      </div>
    </div>
  );
}