import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'redberry_admin_auth_user';

// Mock credentials database
export const MOCK_USERS = [
  {
    id: 'usr-1',
    name: 'Bhumika R (SuperAdmin)',
    email: 'admin@redberryagri.com',
    password: 'password123',
    role: 'SuperAdmin',
    avatar: '🛡️',
  },
  {
    id: 'usr-2',
    name: 'John Demo (Standard User)',
    email: 'user@redberryagri.com',
    password: 'password123',
    role: 'User',
    avatar: '👤',
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authError, setAuthError] = useState('');

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth state', e);
    }
  }, [user]);

  /**
   * Authenticate user credentials
   * Enforces:
   * 1. Email and password non-empty
   * 2. Valid matching credentials
   * 3. Role must be 'SuperAdmin' to access Admin Panel
   */
  const login = (email, password) => {
    setAuthError('');

    const trimmedEmail = (email || '').trim();
    const trimmedPassword = (password || '').trim();

    if (!trimmedEmail && !trimmedPassword) {
      const errorMsg = 'Please enter your email and password.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    if (!trimmedEmail) {
      const errorMsg = 'Email is required. Please enter your email.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    if (!trimmedPassword) {
      const errorMsg = 'Password is required. Please enter your password.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      const errorMsg = 'Please enter a valid email address.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    // Match with registered users
    const matchedUser = MOCK_USERS.find(
      (u) =>
        u.email.toLowerCase() === trimmedEmail.toLowerCase() &&
        u.password === trimmedPassword
    );

    if (!matchedUser) {
      // Also allow any custom email if password is password123 as SuperAdmin for convenience,
      // or strictly validate
      if (trimmedEmail.toLowerCase() === 'admin@redberry.com' && trimmedPassword === 'password123') {
        const adminUser = {
          id: 'usr-admin-direct',
          name: 'Redberry SuperAdmin',
          email: trimmedEmail,
          role: 'SuperAdmin',
          avatar: '🛡️',
        };
        setUser(adminUser);
        return { success: true, user: adminUser };
      }

      const errorMsg = 'Invalid email or password. Please check your credentials.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    // Role verification: Only SuperAdmin is allowed
    if (matchedUser.role !== 'SuperAdmin') {
      const errorMsg =
        'Access Denied: Only accounts with the SuperAdmin role are authorized to access the Admin Panel.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    const authUserData = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
      avatar: matchedUser.avatar,
    };

    setUser(authUserData);
    return { success: true, user: authUserData };
  };

  const logout = () => {
    setUser(null);
    setAuthError('');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const isSuperAdmin = Boolean(user && user.role === 'SuperAdmin');
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isSuperAdmin,
        authError,
        setAuthError,
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
