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
  login: (c: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType & { refreshUser: () => Promise<void> }>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setL] = useState(true);

  async function refreshUser() {
    setL(true);
    try {
      const r = await fetch("http://localhost:3000/api/users/me", {
        credentials: "include",
      });
      if (r.ok) {
        const { data } = await r.json();
        setUser(data.user);
      }
    } finally {
      setL(false);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  async function login({ email, password }: { email: string; password: string }) {
    setL(true);
    try {
      const r = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!r.ok) throw new Error("Invalid credentials");
      const { data } = await r.json();
      setUser(data.user);
    } finally {
      setL(false);
    }
  }

  async function logout() {
    await fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => { });
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}