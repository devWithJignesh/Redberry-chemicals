import { Navigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminProtectedRoute({ children }) {
  const { isAuthenticated, isSuperAdmin, loading } = useAuth();
  const location = useLocation();

  // Show a security verification screen while reading stored session
  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#061e12',
          color: '#ffffff',
          gap: '1rem',
          fontFamily: 'inherit',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShieldCheck size={28} color="#10b981" />
          <span style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.04em' }}>
            REDBERRY SECURE GATEWAY
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
          <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
          <span>Verifying encrypted session credentials...</span>
        </div>
      </div>
    );
  }

  // Not authenticated or lacking SuperAdmin privileges
  if (!isAuthenticated || !isSuperAdmin) {
    return (
      <Navigate
        to="/admin/login"
        state={{
          from: location,
          reason: !isAuthenticated ? 'unauthenticated' : 'unauthorized',
        }}
        replace
      />
    );
  }

  return children;
}
