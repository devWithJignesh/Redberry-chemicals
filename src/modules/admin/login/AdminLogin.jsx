import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', form: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated, isSuperAdmin, authError, setAuthError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated as SuperAdmin, redirect directly to dashboard
  useEffect(() => {
    if (isAuthenticated && isSuperAdmin) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, isSuperAdmin, navigate]);

  // Clean form errors when user types
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
    if (errors.form) setErrors((prev) => ({ ...prev, form: '' }));
    if (authError) setAuthError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
    if (errors.form) setErrors((prev) => ({ ...prev, form: '' }));
    if (authError) setAuthError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { email: '', password: '', form: '' };
    let hasError = false;

    // Requirement 1: Email and Password fields are required
    // User should not be able to log in if either email or password is empty
    if (!email.trim()) {
      newErrors.email = 'Email field is required and cannot be empty.';
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = 'Password field is required and cannot be empty.';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    const result = login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      // Redirect to Dashboard (or the page they attempted to access if protected)
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    } else {
      setErrors((prev) => ({ ...prev, form: result.error }));
    }
  };

  // Demo helper buttons
  const fillSuperAdmin = () => {
    setEmail('admin@redberryagri.com');
    setPassword('password123');
    setErrors({ email: '', password: '', form: '' });
    setAuthError('');
  };

  const fillNonAdmin = () => {
    setEmail('user@redberryagri.com');
    setPassword('password123');
    setErrors({ email: '', password: '', form: '' });
    setAuthError('');
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        {/* Card Header */}
        <div className="admin-login-header">
          <img
            src="/images/logo/logo-icon.png"
            alt="Redberry Agri Sciences"
            className="admin-login-logo"
          />
          <h1 className="admin-login-title">SUPERADMIN LOGIN</h1>
          <p className="admin-login-subtitle">
            Redberry Agri Sciences Portal
          </p>
        </div>

        {/* Card Body */}
        <div className="admin-login-body">
          {/* General Form Error Alert */}
          {(errors.form || authError) && (
            <div className="admin-alert-banner error" role="alert">
              <span>⚠️</span>
              <div>
                <strong>Authentication Notice:</strong> {errors.form || authError}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <div className="admin-form-group">
              <label htmlFor="login-email" className="admin-form-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                id="login-email"
                type="email"
                className={`admin-form-input ${errors.email ? 'error' : ''}`}
                placeholder="admin@redberryagri.com"
                value={email}
                onChange={handleEmailChange}
                autoComplete="email"
                required
              />
              {errors.email && (
                <span className="admin-form-error-msg">{errors.email}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="admin-form-group">
              <label htmlFor="login-password" className="admin-form-label">
                Password <span className="required">*</span>
              </label>
              <input
                id="login-password"
                type="password"
                className={`admin-form-input ${errors.password ? 'error' : ''}`}
                placeholder="••••••••••••"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                required
              />
              {errors.password && (
                <span className="admin-form-error-msg">{errors.password}</span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-admin-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '1.25rem', padding: '0.85rem' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'AUTHENTICATING...' : 'LOGIN TO DASHBOARD 🔐'}
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="admin-demo-creds-box">
            <div className="admin-demo-creds-title">
              <span>Demo Quick-Fill</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', fontWeight: 600 }}>
                Role Verification
              </span>
            </div>
            <p style={{ margin: '0.2rem 0 0.6rem', color: 'var(--admin-text-muted)', fontSize: '0.78rem' }}>
              Test SuperAdmin access vs role-restricted accounts:
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-fill-demo"
                onClick={fillSuperAdmin}
                title="Loads SuperAdmin demo credentials"
              >
                🛡️ SuperAdmin (Authorized)
              </button>
              <button
                type="button"
                className="btn-fill-demo"
                onClick={fillNonAdmin}
                style={{ background: '#f1f5f9', color: '#475569', borderColor: '#cbd5e1' }}
                title="Loads standard user to test role access rejection"
              >
                👤 Non-Admin (Blocked)
              </button>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link
              to="/"
              style={{
                fontSize: '0.82rem',
                color: 'var(--admin-primary)',
                textDecoration: 'none',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              &larr; Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
