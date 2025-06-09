// src/hooks/useAuth.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User { id: string; name: string; }
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (creds: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tạm thời mock: nếu localStorage có token/user thì set
    const token = localStorage.getItem('token');
    const stored = localStorage.getItem('user');
    if (token && stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  async function login({ username, password }: { username: string; password: string }) {
    // Tạm thời giả lập delay & check
    await new Promise(r => setTimeout(r, 500));
    if (username === 'test' && password === 'test123') {
      const mockUser = { id: '1', name: 'Test User' };
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } else {
      throw new Error('Invalid credentials');
    }
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
