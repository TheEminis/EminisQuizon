import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { currentUser, isLoadingAuth } = useAuth();

  if (isLoadingAuth) return <p>Yüklənir...</p>;

  return currentUser ? children : <Navigate to="/login" replace />;
}