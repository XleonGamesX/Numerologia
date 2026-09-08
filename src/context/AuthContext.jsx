import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Al montar la app, recuperamos la sesión guardada (si existe).
  useEffect(() => {
    const savedToken = localStorage.getItem('numeria_token');
    const savedUser = localStorage.getItem('numeria_user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  function login(newUser, newToken) {
    localStorage.setItem('numeria_token', newToken);
    localStorage.setItem('numeria_user', JSON.stringify(newUser));
    setUser(newUser);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem('numeria_token');
    localStorage.removeItem('numeria_user');
    setUser(null);
    setToken(null);
  }

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: Boolean(token),
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
