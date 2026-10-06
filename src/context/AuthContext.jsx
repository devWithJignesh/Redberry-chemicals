import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginApi } from '../api/authApi';

const AuthContext = createContext(null);

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);

  // Initialize session from sessionStorage on mount & clear localStorage
  useEffect(() => {
    try {
      // Clear legacy localStorage keys to ensure nothing is stored in localStorage
      localStorage.removeItem('redberry_admin_auth_user');
      localStorage.removeItem('redberry_admin_products');
      localStorage.removeItem('redberry_admin_sub_products');
      localStorage.removeItem('redberry_admin_reviews');
      localStorage.removeItem('redberry_admin_inquiries');

      const savedToken = sessionStorage.getItem(TOKEN_KEY);
      const savedUser = sessionStorage.getItem(USER_KEY);

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Session initialization error', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Lockout countdown handler
  useEffect(() => {
    if (!lockoutTime) return;
    const interval = setInterval(() => {
      if (new Date().getTime() >= lockoutTime) {
        setLockoutTime(null);
        setFailedAttempts(0);
        setAuthError('');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutTime]);

  /**
   * Login handler - Store token ONLY in sessionStorage
   */
  const login = useCallback(async (email, password) => {
    setAuthError('');

    // Check lockout
    if (lockoutTime && new Date().getTime() < lockoutTime) {
      const secondsLeft = Math.ceil((lockoutTime - new Date().getTime()) / 1000);
      const msg = `Too many failed attempts. Security lockout active for ${secondsLeft}s.`;
      setAuthError(msg);
      return { success: false, error: msg };
    }

    const trimmedEmail = (email || '').trim().toLowerCase();
    const trimmedPassword = (password || '').trim();

    if (!trimmedEmail || !trimmedPassword) {
      const errorMsg = 'Please enter both your email address and password.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    try {
      // Call backend Axios Login API (http://localhost:5000/api/auth/login)
      const res = await loginApi({ email: trimmedEmail, password: trimmedPassword });

      if (res.success && res.data) {
        const apiUser = res.data;
        const sessionToken = apiUser.token || `token-${Date.now()}`;

        const authUserData = {
          id: apiUser.id || apiUser._id,
          name: apiUser.name || 'Admin User',
          email: apiUser.email,
          role: 'SuperAdmin',
          department: 'Executive Administration',
          avatar: '🛡️',
        };

        // Store ONLY in sessionStorage
        sessionStorage.setItem(TOKEN_KEY, sessionToken);
        sessionStorage.setItem(USER_KEY, JSON.stringify(authUserData));

        // Ensure localStorage is clean
        localStorage.removeItem('redberry_admin_auth_user');

        setUser(authUserData);
        setToken(sessionToken);
        setFailedAttempts(0);
        setLockoutTime(null);
        setAuthError('');

        return { success: true, user: authUserData, token: sessionToken };
      } else {
        throw new Error(res.message || 'Login failed');
      }
    } catch (error) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      let errorMsg = error.message || 'Invalid email or password';

      if (newAttempts >= 5) {
        const lockUntil = new Date().getTime() + 30 * 1000;
        setLockoutTime(lockUntil);
        errorMsg = 'Security Alert: 5 invalid login attempts. Locked for 30 seconds.';
      }

      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, [failedAttempts, lockoutTime]);

  /**
   * Logout - Clear sessionStorage
   */
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setAuthError('');
    try {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(USER_KEY);
      localStorage.clear();
    } catch (e) {
      console.error('Logout cleanup error', e);
    }
  }, []);

  const isAuthenticated = Boolean(user && token);
  const isSuperAdmin = Boolean(user && user.role === 'SuperAdmin');

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated,
        isSuperAdmin,
        authError,
        setAuthError,
        lockoutTime,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
