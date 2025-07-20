import { Link, useLocation } from 'react-router-dom';

import MoreIcon from '../../assets/more-2.png';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLogout } from '@/hooks/useLogOut';
import HomeIcon from '../../assets/home-2.png';
import LeftBarIcon2 from '../../assets/leftbar-2.png';
import RankingIcon from '../../assets/ranking-2.png';
import LeftBarIcon5 from '../../assets/leftbar-4.png';
import DarkModeToggle from '../ui/DarkModeToggle';

const menuItems = [
  { to: '/home', icon: HomeIcon, label: 'Home' },
  { to: '/challenge', icon: LeftBarIcon2, label: 'Challenge' },
  { to: '/ranking', icon: RankingIcon, label: 'Ranking' },
  { to: '/pronunciation', icon: LeftBarIcon5, label: 'Pronunciation' }
];

export default function LeftBar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout, loading } = useLogout();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <aside className="h-full flex flex-col justify-between w-25 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 rounded-3xl shadow-lg
    dark:bg-gradient-to-b dark:from-[#05315B] dark:via-[#256996] dark:to-[#3B6978] dark:text-white">
      <div className="flex flex-col items-center gap-3 py-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={clsx(
                'flex items-center justify-center rounded-lg p-3 transition-all duration-200',
                'hover:scale-105 active:scale-95',
                isActive ? 'bg-white/20 scale-105 shadow-md backdrop-blur-sm' : 'hover:bg-white/10'
              )}
              title={item.label}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                {typeof item.icon === 'string' ? (
                  <img
                    src={item.icon}
                    className="w-full h-full object-contain filter brightness-0 invert"
                    alt={item.label}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-[1.75rem] text-white"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-3 mb-4">
        <DarkModeToggle />
        
        <div className="relative flex justify-center" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={clsx(
              'flex items-center justify-center rounded-lg p-3 transition-all duration-200',
              'hover:scale-105 active:scale-95',
              menuOpen ? 'bg-white/20 scale-105 shadow-md backdrop-blur-sm' : 'hover:bg-white/10'
            )}
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <img src={MoreIcon} alt="More options" className="w-full h-full object-contain filter brightness-0 invert" />
            </div>
          </button>

        {menuOpen && (
          <div className="absolute left-full bottom-0 ml-2 flex flex-col bg-white shadow-xl rounded-lg py-2 w-[140px] z-50">
            <Link
              to="/profile"
              className="px-4 py-2 text-gray-800 hover:bg-[#fbb12420] transition-colors active:scale-95"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/aboutus"
              className="px-4 py-2 text-gray-800 hover:bg-[#fbb12420] transition-colors active:scale-95"
              onClick={() => setMenuOpen(false)}
            >
              About us
            </Link>
            <button
              className="px-4 py-2 text-left text-gray-800 hover:bg-[#fbb12420] transition-colors active:scale-95 flex items-center justify-between"
              onClick={async () => {
                await logout();
                setMenuOpen(false);
              }}
              disabled={loading}
            >
              Logout
              {loading && <span className="ml-2 animate-spin">⏳</span>}
            </button>
          </div>
        )}
        </div>
      </div>
    </aside>
  );
}
