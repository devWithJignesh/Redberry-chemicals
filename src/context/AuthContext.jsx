import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'redberry_admin_auth_user';
const SESSION_EXPIRY_HOURS = 24;

// Registered system credentials
export const MOCK_USERS = [
  {
    id: 'usr-superadmin',
    name: 'Jignesh lakum (SuperAdmin)',
    email: 'Jigneshlakum@gmail.com',
    password: 'Admin@123*',
    role: 'SuperAdmin',
    department: 'Executive Administration',
    avatar: '🛡️',
  },
  {
    id: 'usr-standard',
    name: 'Demo Field Officer',
    email: 'user@redberryagri.com',
    password: 'password123',
    role: 'User',
    department: 'Agronomy Support',
    avatar: '👤',
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);
  // Initialize session from storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Verify session expiration
        if (parsed.expiresAt && new Date().getTime() < parsed.expiresAt) {
          setUser(parsed.user);
          setToken(parsed.token);
        } else {
          // Session expired
          localStorage.removeItem(STORAGE_KEY);
          sessionStorage.removeItem(STORAGE_KEY);
        }
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
   * Secure Login handler
   */
  const login = useCallback((email, password, rememberMe = true) => {
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

    // 1. Mandatory field validations
    if (!trimmedEmail && !trimmedPassword) {
      const errorMsg = 'Please enter both your email address and password.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    if (!trimmedEmail) {
      const errorMsg = 'Email address is required.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    if (!trimmedPassword) {
      const errorMsg = 'Password is required.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      const errorMsg = 'Please provide a valid email format (e.g. admin@redberryagri.com).';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    // 3. User verification against mock store
    let matchedUser = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === trimmedEmail && u.password === trimmedPassword
    );

    // Also support convenience alias: admin@redberry.com
    if (!matchedUser && trimmedEmail === 'admin@redberry.com' && trimmedPassword === 'password123') {
      matchedUser = {
        id: 'usr-admin-alias',
        name: 'Redberry SuperAdmin',
        email: 'admin@redberry.com',
        password: 'password123',
        role: 'SuperAdmin',
        department: 'Executive Administration',
        avatar: '🛡️',
      };
    }

    if (!matchedUser) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 5) {
        const lockUntil = new Date().getTime() + 30 * 1000; // 30s lockout
        setLockoutTime(lockUntil);
        const lockMsg = 'Security Alert: 5 invalid login attempts. Locked for 30 seconds.';
        setAuthError(lockMsg);
        return { success: false, error: lockMsg };
      }

      const attemptsLeft = 5 - newAttempts;
      const errorMsg = `Invalid credentials. Please verify your email and password. (${attemptsLeft} attempts remaining)`;
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    // 4. Role Authorization check (SuperAdmin only)
    if (matchedUser.role !== 'SuperAdmin') {
      const errorMsg = `Access Restricted: Account "${matchedUser.name}" has role "${matchedUser.role}". Only SuperAdmin accounts are authorized to access this administration console.`;
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    // 5. Successful authentication
    const sessionToken = `rb-sec-token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const expiresAt = new Date().getTime() + SESSION_EXPIRY_HOURS * 60 * 60 * 1000;

    const authUserData = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
      department: matchedUser.department || 'Executive Administration',
      avatar: matchedUser.avatar,
    };

    const sessionData = {
      user: authUserData,
      token: sessionToken,
      expiresAt,
    };

    try {
      if (rememberMe) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      }
    } catch (e) {
      console.warn('Storage sync issue', e);
    }

    setUser(authUserData);
    setToken(sessionToken);
    setFailedAttempts(0);
    setLockoutTime(null);
    setAuthError('');

    return { success: true, user: authUserData, token: sessionToken };
  }, [failedAttempts, lockoutTime]);

  /**
   * Secure Logout
   */
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setAuthError('');
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
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
