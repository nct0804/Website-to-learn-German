import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

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

const useUserProfile = (): UseUserProfileReturn => {
  const { accessToken, user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch('http://localhost:3000/api/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - Please login again');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      console.log('API Response:', data);
      
      const userData = data.data?.user || data.user || data;
      
      const mappedProfile: UserProfile = {
        id: userData.id,
        email: userData.email,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        level: userData.level,
        xp: userData.xp,
        streak: userData.streak,
      };

      console.log('User Data:', userData);
      console.log('Mapped Profile:', mappedProfile);
      setUserProfile(mappedProfile);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching user profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchUserProfile();
  };

  useEffect(() => {
    if (accessToken) {
      fetchUserProfile();
    } else {
      setIsLoading(false);
      setUserProfile(null);
    }
  }, [accessToken]);

  return {
    userProfile,
    isLoading,
    error,
    refetch,
  };
};

export default useUserProfile;