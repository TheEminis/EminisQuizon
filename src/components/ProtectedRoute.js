import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { currentUser, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="page-loading" role="status" aria-label="Yüklənir">
        <div className="spinner-lg" />
      </div>
    );
  }

  if (!currentUser) return <Navigate to="/login" replace />;

  // Email təsdiqlənməyibsə təsdiq səhifəsinə yönləndir (Google hesabları avtomatik təsdiqlidir)
  if (!currentUser.emailVerified) return <Navigate to="/verify-email" replace />;

  return children;
}