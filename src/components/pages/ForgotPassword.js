import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setError("Düzgün bir email ünvanı daxil edin.");
        setLoading(false);
        return;
      }
      if (err.code === "auth/too-many-requests") {
        setError("Çox sayda cəhd. Bir az sonra yenidən yoxlayın.");
        setLoading(false);
        return;
      }
      // Digər xətalarda (məs. istifadəçi tapılmadı) hesabın mövcud olub-olmadığını
      // açıqlamırıq - eyni mesajı göstəririk.
    }
    setSuccess("Əgər bu email ilə hesab varsa, şifrəni sıfırlamaq üçün link göndərildi. Spam qovluğuna da baxın.");
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Şifrəni unutmusunuz?</h2>
          <p>Email ünvanınızı yazın, sıfırlama linki göndərək</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="reset-email">Email</label>
            <input
              id="reset-email"
              type="email"
              placeholder="nümayəndə@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? <span className="spinner"></span> : "Link göndər"}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/login">← Girişə qayıt</Link>
        </div>
      </div>
    </div>
  );
}
