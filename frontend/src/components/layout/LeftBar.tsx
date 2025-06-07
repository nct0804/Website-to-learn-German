import { Link, useLocation } from 'react-router-dom';
import Home from '../../assets/home.png';
import Training from '../../assets/training.png';
import Ranking from '../../assets/ranking-page.png';
import More from '../../assets/more-page.png';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

const menuItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/lesson', icon: Training, label: 'Lesson' },
  { to: '/ranking', icon: Ranking, label: 'Ranking' },
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
    <aside className="h-full flex flex-col justify-center border-r-[3px] border-[#FFF4E1] w-30 transition-all duration-300">
      <div className="flex flex-col justify-between items-center h-full py-4">
        <div className="flex flex-col items-center gap-3 mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={clsx(
                  'flex items-center rounded p-3 transition-colors duration-100 hover:bg-[#fbb024ae]',
                  isActive ? 'bg-[#fbb124] font-semibold' : ''
                )}
              >
                <div className="flex justify-center w-8">
                  <img src={item.icon} className="w-8 h-8" alt={item.label} />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="relative mt-auto flex items-center" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded hover:bg-[#fbb024ae] transition-transform transform hover:scale-110 duration-300"
            aria-haspopup="true"
          >
            <img src={More} alt="More" className="w-8 h-8" />
          </button>

          {menuOpen && (
            <div className="absolute left-full top-1/2 -translate-y-[70%] ml-1 flex flex-col gap-1 bg-white shadow-xl rounded-lg py-4 px-4 min-w-[170px] z-50">
              <Link
                to="/profile"
                className="block px-2 py-1 rounded text-gray-800 hover:text-[#fbb124] transition-colors"
              >
                Profile
              </Link>
              <Link
                to="/aboutus"
                className="block px-2 py-1 rounded text-gray-800 hover:text-[#fbb124] transition-colors"
              >
                About us
              </Link>
              <button
                className="block px-2 py-1 rounded text-left w-full text-gray-800 hover:text-[#fbb124] transition-colors"
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


      </div>
    </aside>
  );
}
