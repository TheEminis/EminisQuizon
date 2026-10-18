import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";

// Yalnız Google loqosu olan dəyirmi düymə (Login və Register üçün ortaq).
// Google ilə ilk giriş avtomatik yeni hesab yaradır.
export default function GoogleButton({ onError }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    if (onError) onError("");
    setLoading(true);
    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
      // Profil sənədi yoxdursa yarat (sayğaclara toxunmuruq)
      setDoc(
        doc(db, "users", user.uid),
        { displayName: user.displayName || user.email, email: user.email },
        { merge: true }
      ).catch((e) => console.error("Profil sənədi yazılmadı:", e));
      navigate("/");
    } catch (err) {
      if (
        err.code !== "auth/popup-closed-by-user" &&
        err.code !== "auth/cancelled-popup-request" &&
        onError
      ) {
        onError("Google ilə giriş alınmadı. Yenidən cəhd edin.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 18 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: 0.7,
          fontSize: 13,
          marginBottom: 14,
        }}
      >
        <span style={{ flex: 1, height: 1, background: "currentColor", opacity: 0.3 }} />
        <span>və ya</span>
        <span style={{ flex: 1, height: 1, background: "currentColor", opacity: 0.3 }} />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          aria-label="Google ilə davam et"
          title="Google ilə davam et"
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            border: "1px solid #dadce0",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: loading ? "wait" : "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,.25)",
            opacity: loading ? 0.6 : 1,
            padding: 0,
          }}
        >
          <svg width="26" height="26" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
        </button>
      </div>
    </div>
  );
}