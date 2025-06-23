import { useState, useEffect } from 'react';

interface UserProfile {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  level: number;
  xp: number;
  streak: number;
}

interface UseUserProfileReturn {
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const API = import.meta.env.VITE_API_URL || '';

const useUserProfile = (): UseUserProfileReturn => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);


      const res = await fetch(`${API}/api/users/me`, {
        method: 'GET',
        credentials: 'include',
      });

      if (res.status === 401) {
        throw new Error('Unauthorized – bitte erneut einloggen');
      }
      if (!res.ok) {
        throw new Error(`HTTP-Error ${res.status}`);
      }

      const { data } = await res.json();
      const u = data.user;

      const mapped: UserProfile = {
        id: u.id,
        email: u.email,
        username: u.username,
        firstName: u.firstName,
        lastName: u.lastName,
        level: u.level,
        xp: u.xp,
        streak: u.streak,
      };

      setUserProfile(mapped);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Unbekannter Fehler beim Laden';
      setError(msg);
      console.error('fetchUserProfile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return {
    userProfile,
    isLoading,
    error,
    refetch: fetchUserProfile,
  };
};

export default useUserProfile;
