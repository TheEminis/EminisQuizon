import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase"; // firebase yolunu proyektinizə uyğun saxlayın
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
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

    if (!name.trim()) {
      setError("Zəhmət olmasa adınızı daxil edin.");
      return;
    }

    setLoading(true);

    try {
  const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
  const user = userCredential.user;

  // Ad-soyadı Firebase Auth profilinə yaz
  await updateProfile(user, { displayName: name.trim() });

  // Qeydiyyat uğurludur - istifadəçini DƏRHAL ana səhifəyə yönləndir.
  // Firestore profil sənədinin yaradılmasını gözləmirik ki, orada
  // hər hansı xəta (məs. Firestore aktiv deyil / qaydalar) yönləndirməni bloklamasın.
  navigate("/");

  // İstifadəçi üçün Firestore-da profil sənədi yarat (test statistikası üçün)
  // Bu, arxa planda, naviqasiyadan sonra baş verir.
  setDoc(doc(db, "users", user.uid), {
    displayName: name.trim(),
    email: user.email,
    testsTaken: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    createdAt: serverTimestamp(),
  }).catch((firestoreErr) => {
    console.error("Firestore profil sənədi yaradılmadı:", firestoreErr);
  });
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
  }

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
            <label htmlFor="name">Ad Soyad</label>
            <input
              id="name"
              type="text"
              placeholder="Adınızı daxil edin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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