import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setDark((d) => !d)}
      className={`w-14 h-8 flex items-center px-1 rounded-full transition-colors duration-300 shadow-inner border-2 border-gray-200 dark:border-gray-700 focus:outline-none ${dark ? 'bg-gray-700' : 'bg-gray-200'}`}
    >
      <div
        className={`w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md transform transition-transform duration-300 ${dark ? 'translate-x-6' : 'translate-x-0'}`}
      >
        {dark ? (
          <span role="img" aria-label="Light mode" className="text-yellow-400 text-lg">🌞</span>
        ) : (
          <span role="img" aria-label="Dark mode" className="text-gray-700 text-lg">🌙</span>
        )}
      </div>
    </button>
  );
} 