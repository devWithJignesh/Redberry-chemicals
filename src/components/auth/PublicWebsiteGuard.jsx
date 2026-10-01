import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * PublicWebsiteGuard
 * Ensures that if an administrator is currently authenticated with an active session,
 * they are restricted to the Admin Dashboard and cannot navigate to the public website
 * without explicitly logging out first.
 */
export default function PublicWebsiteGuard() {
  const { isAuthenticated, isSuperAdmin, loading } = useAuth();

  // If auth state is still initializing from storage, wait before evaluating
  if (loading) {
    return null;
  }

  // If user is currently logged in as SuperAdmin, prevent access to public website and lock into admin dashboard
  if (isAuthenticated && isSuperAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Otherwise, allow public website access
  return <Outlet />;
}
