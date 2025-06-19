import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface UseLogoutResult {
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}


export const useLogout = (): UseLogoutResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { accessToken, logout: clearAuth } = useAuth();
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.message || 'Logout failed');
      }

      clearAuth();

      navigate('/login', { replace: true });
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [accessToken, clearAuth, navigate]);

  return { logout, loading, error };
};
