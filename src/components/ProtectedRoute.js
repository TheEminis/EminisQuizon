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

  return currentUser ? children : <Navigate to="/login" replace />;
}
