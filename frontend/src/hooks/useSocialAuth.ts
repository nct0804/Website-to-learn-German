import { useCallback } from 'react';
import { useAuth } from './useAuth';

export type SocialProvider = 'google' | 'facebook' | 'apple';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function useSocialAuth() {
  const { loginSocial } = useAuth();

  const loginWithGoogle = useCallback(async (idToken: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Google login failed');
      }

      const data = await response.json();
      
      // Update auth context with user data
      if (data.success && data.data.user) {
        loginSocial(data.data.user);
      }

      return data;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }, [loginSocial]);

  const loginWithFacebook = useCallback(async (accessToken: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/auth/facebook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken }),
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Facebook login failed');
      }

      const data = await response.json();
      
      // Update auth context with user data
      if (data.success && data.data.user) {
        loginSocial(data.data.user);
      }

      return data;
    } catch (error) {
      console.error('Facebook login error:', error);
      throw error;
    }
  }, [loginSocial]);

  const loginWithApple = useCallback(async (identityToken: string, authorizationCode?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/auth/apple`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identityToken, authorizationCode }),
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Apple login failed');
      }

      const data = await response.json();
      
      // Update auth context with user data
      if (data.success && data.data.user) {
        loginSocial(data.data.user);
      }

      return data;
    } catch (error) {
      console.error('Apple login error:', error);
      throw error;
    }
  }, [loginSocial]);

  return { 
    loginWithGoogle, 
    loginWithFacebook, 
    loginWithApple 
  };
} 