import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/");
    } catch (err) {
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setError("Email və ya şifrə yanlışdır.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Çox sayda uğursuz cəhd. Zəhmət olmasa gözləyin.");
      } else {
        setError("Giriş zamanı xəta baş verdi.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-header">
          <h2>Xoş Gəlmisiniz</h2>
          <p>Hesabınıza daxil olun</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="nümayəndə@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Şifrə</label>

            <div className="password-input-wrapper">
              <input
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

          <button className="btn-primary">
            Giriş et
          </button>

        </form>

        <div className="auth-footer">
          Hesabınız yoxdur? <Link to="/register">Qeydiyyatdan keç</Link>
        </div>

      </div>
    </div>
  );
}