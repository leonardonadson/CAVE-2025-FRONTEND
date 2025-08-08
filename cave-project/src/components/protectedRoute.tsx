import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean | null;
  children: React.ReactNode;
}

export function ProtectedRoute({
  isAuthenticated,
  children,
}: ProtectedRouteProps) {
  if (isAuthenticated === null) {
    return <p>Carregando...</p>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
