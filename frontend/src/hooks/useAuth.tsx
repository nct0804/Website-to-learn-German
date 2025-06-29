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
  loginSocial: (user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("http://localhost:3000/api/users/me", {
          credentials: "include",
        });
        if (r.ok) {
          const { data } = await r.json();
          setUser(data.user);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function login({ email, password }: { email: string; password: string }) {
    setLoading(true);
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
      setLoading(false);
    }
  }

  function loginSocial(user: User) {
    setUser(user);
  }

  async function logout() {
    await fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => { });
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, loginSocial, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}