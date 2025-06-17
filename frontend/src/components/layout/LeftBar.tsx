import { Link, useLocation } from 'react-router-dom';
import Home from '../../assets/home.png';
import Training from '../../assets/training.png';
import Ranking from '../../assets/ranking-page.png';
import More from '../../assets/more-page.png';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { faHeadphonesSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const menuItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/lesson', icon: Training, label: 'Lesson' },
  { to: '/ranking', icon: Ranking, label: 'Ranking' },
  { to: '/pronunciation', icon: faHeadphonesSimple, label: 'Pronunciation' }
];

export default function LeftBar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    <aside className="h-full flex flex-col justify-between border-r-[3px] border-[#FFF4E1] w-30">
      <div className="flex flex-col items-center gap-3 py-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={clsx(
                'flex items-center justify-center rounded-lg p-3 transition-all duration-200',
                'hover:bg-[#fbb024ae] hover:scale-105 active:scale-95',
                isActive ? 'bg-[#fbb124] scale-105 shadow-md' : ''
              )}
              title={item.label}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                {typeof item.icon === 'string' ? (
                  <img 
                    src={item.icon} 
                    className="w-full h-full object-contain" 
                    alt={item.label} 
                  />
                ) : (
                  <FontAwesomeIcon 
                    icon={item.icon} 
                    className="text-[1.75rem] text-gray-800" 
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="relative mb-4 flex justify-center" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={clsx(
            'flex items-center justify-center rounded-lg p-3 transition-all duration-200',
            'hover:bg-[#fbb024ae] hover:scale-105 active:scale-95',
            menuOpen ? 'bg-[#fbb124] scale-105 shadow-md' : ''
          )}
          aria-haspopup="true"
          aria-expanded={menuOpen}
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <img src={More} alt="More options" className="w-full h-full object-contain" />
          </div>
        </button>

        {menuOpen && (
          <div className="absolute left-full bottom-0 ml-2 flex flex-col bg-white shadow-xl rounded-lg py-2 w-[180px] z-50">
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
              className="px-4 py-2 text-left text-gray-800 hover:bg-[#fbb12420] transition-colors active:scale-95"
              onClick={() => {
                // logout logic
                setMenuOpen(false);
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}