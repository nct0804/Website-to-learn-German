import { useCallback } from 'react';

export type SocialProvider = 'google' | 'facebook' | 'apple' | 'github';

const OAUTH_URLS: Record<SocialProvider, string> = {
  google: 'http://localhost:3000/api/auth/google',
  facebook: 'http://localhost:3000/api/auth/facebook',
  apple: 'http://localhost:3000/api/auth/apple',
  github: 'http://localhost:3000/api/auth/github',
};

export function useSocialAuth() {
  const loginWithProvider = useCallback((provider: SocialProvider) => {
    const url = OAUTH_URLS[provider];
    window.location.href = url;
  }, []);

  return { loginWithProvider };
} 