import React, { useState } from 'react';

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: any) => any;
        };
      };
    };
    FB?: {
      init: (config: any) => void;
      login: (callback: (response: any) => void, options?: any) => void;
    };
    AppleID?: {
      auth: {
        signIn: () => Promise<any>;
      };
    };
  }
}

export default function SocialLoginButtons() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setLoading('google');
      setError(null);
      
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId || clientId === 'your-google-client-id') {
        setError('Google Client ID not configured. Please check your .env file.');
        return;
      }
      
      // For now, just show a message
      setError('Google login clicked! Please configure your Google Client ID.');
    } catch (error: any) {
      console.error('Google login error:', error);
      setError(error.message || 'Google login failed');
    } finally {
      setLoading(null);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading('facebook');
      setError(null);
      
      const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
      if (!appId || appId === 'your-facebook-app-id') {
        setError('Facebook App ID not configured. Please check your .env file.');
        return;
      }
      
      // For now, just show a message
      setError('Facebook login clicked! Please configure your Facebook App ID.');
    } catch (error: any) {
      console.error('Facebook login error:', error);
      setError(error.message || 'Facebook login failed');
    } finally {
      setLoading(null);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setLoading('apple');
      setError(null);
      
      const clientId = import.meta.env.VITE_APPLE_CLIENT_ID;
      if (!clientId || clientId === 'your-apple-client-id') {
        setError('Apple Client ID not configured. Please check your .env file.');
        return;
      }
      
      setError('Apple login clicked! Please configure your Apple Client ID.');
    } catch (error: any) {
      console.error('Apple login error:', error);
      setError(error.message || 'Apple login failed');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="mt-4">
      {error && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          {error}
        </div>
      )}
      
      <div className="text-center text-gray-500 text-sm mb-2">Or continue with</div>
      <div className="flex flex-row items-center justify-center gap-4">
        <button 
          type="button"
          onClick={handleGoogleLogin}
          disabled={!!loading}
          className={`p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition ${
            loading === 'google' ? 'opacity-60 cursor-not-allowed' : ''
          }`}
          aria-label="Sign in with Google"
        >
          <img 
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" 
            alt="Google" 
            className="w-6 h-6" 
          />
        </button>
        
        <button 
          type="button" 
          onClick={handleFacebookLogin}
          disabled={!!loading}
          className={`p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition ${
            loading === 'facebook' ? 'opacity-60 cursor-not-allowed' : ''
          }`}
          aria-label="Sign in with Facebook"
        >
          <img 
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" 
            alt="Facebook" 
            className="w-6 h-6" 
          />
        </button>
        
        <button 
          type="button" 
          onClick={handleAppleLogin}
          disabled={!!loading}
          className={`p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition ${
            loading === 'apple' ? 'opacity-60 cursor-not-allowed' : ''
          }`}
          aria-label="Sign in with Apple"
        >
          <img 
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" 
            alt="Apple" 
            className="w-6 h-6" 
          />
        </button>
      </div>
    </div>
  );
} 