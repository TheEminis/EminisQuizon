import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";

export default function VerifyEmail() {
  const { currentUser, isLoadingAuth } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  if (isLoadingAuth) {
    return (
      <div className="page-loading" role="status" aria-label="Yüklənir">
        <div className="spinner-lg" />
      </div>
    );
  }
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.emailVerified) return <Navigate to="/" replace />;

  const handleCheck = async () => {
    setError("");
    setMessage("");
    setChecking(true);
    try {
      await auth.currentUser.reload();
      // Firestore qaydaları üçün token-i də yenilə (email_verified bayrağı)
      await auth.currentUser.getIdToken(true);
      if (auth.currentUser.emailVerified) {
        navigate("/", { replace: true });
      } else {
        setError("Email hələ təsdiqlənməyib. Gələn qutusuna və spam qovluğuna baxın, linkə kliklədikdən sonra yenidən yoxlayın.");
      }
    } catch (e) {
      setError("Yoxlama zamanı xəta baş verdi. Yenidən cəhd edin.");
    } finally {
      setChecking(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setMessage("");
    try {
      await sendEmailVerification(auth.currentUser);
      setMessage("Təsdiq linki yenidən göndərildi. Spam qovluğuna da baxın.");
      setCooldown(60);
    } catch (e) {
      if (e.code === "auth/too-many-requests") {
        setError("Çox sayda cəhd. Bir az gözləyib yenidən yoxlayın.");
        setCooldown(60);
      } else {
        setError("Email göndərilmədi. Yenidən cəhd edin.");
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Emailinizi təsdiqləyin</h2>
          <p>
            <strong>{currentUser.email}</strong> ünvanına təsdiq linki göndərdik.
            Linkə klikləyin, sonra bu səhifəyə qayıdıb aşağıdakı düyməni basın.
          </p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <div className="auth-form">
          <button type="button" className="btn-primary" onClick={handleCheck} disabled={checking}>
            {checking ? <span className="spinner"></span> : "Təsdiq etdim, yoxla"}
          </button>

          <button
            type="button"
            className="btn-primary"
            style={{ background: "transparent", border: "1px solid currentColor", color: "inherit" }}
            onClick={handleResend}
            disabled={cooldown > 0}
          >
            {cooldown > 0 ? `Yenidən göndər (${cooldown})` : "Linki yenidən göndər"}
          </button>
        </div>

        <div className="auth-footer">
          Yanlış email? <button type="button" onClick={handleLogout} style={{ background: "none", border: "none", color: "inherit", textDecoration: "underline", cursor: "pointer", padding: 0, font: "inherit" }}>Çıxış et</button>
          {" · "}
          <Link to="/">Ana səhifə</Link>
        </div>
      </div>
    </div>
  );
}