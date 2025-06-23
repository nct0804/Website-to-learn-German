// src/hooks/useAuth.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  level: number;
  xp: number;
  streak: number;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  accessToken: string | null;
  login: (
    creds: { email: string; password: string },
    remember?: boolean
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const tok =
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('accessToken');
    const usr =
      localStorage.getItem('user') ||
      sessionStorage.getItem('user');
    if (tok && usr) {
      setAccessToken(tok);
      setUser(JSON.parse(usr));
    }
    setLoading(false);
  }, []);

  async function login(
    { email, password }: { email: string; password: string },
    remember: boolean = false
  ) {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message ?? 'Invalid credentials');
      }
      const { data } = await res.json() as {
        success: boolean;
        data: {
          user: User;
          accessToken: string;
          refreshToken: string;
        };
      };
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('accessToken', data.accessToken);
      storage.setItem('refreshToken', data.refreshToken);
      storage.setItem('user', JSON.stringify(data.user));
      setAccessToken(data.accessToken);
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.clear();
    sessionStorage.clear();
    setAccessToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
