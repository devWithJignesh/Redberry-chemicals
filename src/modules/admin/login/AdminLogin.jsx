import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft, 
  ShieldAlert,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({ email: '', password: '', form: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated, isSuperAdmin, authError, setAuthError, lockoutTime } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in with SuperAdmin privileges
  useEffect(() => {
    if (isAuthenticated && isSuperAdmin) {
      const destination = location.state?.from?.pathname || '/admin/dashboard';
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, isSuperAdmin, navigate, location]);

  // Display reason message if redirected from protected route
  useEffect(() => {
    if (location.state?.reason === 'unauthorized') {
      setErrors((prev) => ({
        ...prev,
        form: 'Unauthorized: SuperAdmin credentials required to access that page.',
      }));
    } else if (location.state?.reason === 'unauthenticated' && location.state?.from?.pathname) {
      setErrors((prev) => ({
        ...prev,
        form: 'Session required: Please sign in to access the management console.',
      }));
    }
  }, [location.state]);

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

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    const result = login(email, password, rememberMe);
    setIsSubmitting(false);

    if (result.success) {
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    } else {
      setErrors((prev) => ({ ...prev, form: result.error }));
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-split-card">
        {/* Left Side: Rich Agrochemical Hero Image Panel */}
        <div className="admin-login-agro-panel">
          <div className="admin-agro-overlay"></div>
          
          <div className="admin-agro-top-tag">
            <span className="admin-agro-tag-pill">
              <ShieldCheck size={14} className="tag-icon" />
              <span>Enterprise Admin Portal</span>
            </span>
          </div>

          <div className="admin-agro-content">
            <div className="admin-agro-brand">
              <img
                src="/images/logo/logo-icon.png"
                alt="Redberry Logo"
                className="admin-agro-logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="admin-agro-titles">
                <span className="admin-agro-company-name">REDBERRY AGRI SCIENCES</span>
                <h2 className="admin-agro-headline">
                  Advanced Agrochemicals & Crop Solutions
                </h2>
              </div>
            </div>

            <p className="admin-agro-desc">
              Centralized management gateway for formulation catalogs, grower reviews, and dealer procurement.
            </p>

            <div className="admin-agro-badges">
              <span className="admin-agro-pill">
                <ShieldCheck size={13} />
                <span>ISO 9001:2015</span>
              </span>
              <span className="admin-agro-pill">
                <Sparkles size={13} />
                <span>CIB & RC Certified</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Professional Login Form */}
        <div className="admin-login-form-panel">
          <div className="admin-login-form-header">
            <h1 className="admin-login-heading">SuperAdmin Login</h1>
            <p className="admin-login-subheading">
              Enter your corporate credentials to access the console
            </p>
          </div>

          {/* Security / Error Banner */}
          {(errors.form || authError) && (
            <div className="admin-alert-banner error" role="alert">
              <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>{errors.form || authError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <div className="admin-form-group">
              <label htmlFor="login-email" className="admin-form-label">
                Email Address <span className="required">*</span>
              </label>
              <div className="admin-input-icon-wrap">
                <Mail size={16} className="admin-field-icon" />
                <input
                  id="login-email"
                  type="email"
                  className={`admin-form-input with-icon ${errors.email ? 'error' : ''}`}
                  placeholder="admin@redberryagri.com"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="email"
                  disabled={Boolean(lockoutTime)}
                  required
                />
              </div>
              {errors.email && (
                <span className="admin-form-error-msg">{errors.email}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="admin-form-group">
              <label htmlFor="login-password" className="admin-form-label">
                Password <span className="required">*</span>
              </label>
              <div className="admin-input-icon-wrap">
                <Lock size={16} className="admin-field-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className={`admin-form-input with-icon ${errors.password ? 'error' : ''}`}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                  disabled={Boolean(lockoutTime)}
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <span className="admin-form-error-msg">{errors.password}</span>
              )}
            </div>

            {/* Remember Me */}
            <div className="admin-login-options-row">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember session for 24h</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-admin-login-submit"
              disabled={isSubmitting || Boolean(lockoutTime)}
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Return to Public Site Link */}
          <div className="admin-login-footer-link">
            <Link to="/" className="btn-back-website">
              <ArrowLeft size={14} />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
