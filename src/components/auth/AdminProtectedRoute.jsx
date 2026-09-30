import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminProtectedRoute({ children }) {
  const { isAuthenticated, isSuperAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !isSuperAdmin) {
    // Redirect unauthorized users to the admin login page
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
