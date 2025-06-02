import { Link, useLocation } from 'react-router-dom';
import { Home, Puzzle, Trophy, Menu, X, MoreHorizontal } from 'lucide-react';
import clsx from 'clsx';
import logoIcon from '../assets/icons/logo.png';

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuItems = [
  { to: '/', icon: <Home size={28} />, label: 'Home' },
  { to: '/lesson', icon: <Puzzle size={24} />, label: 'Lesson' },
  { to: '/ranking', icon: <Trophy size={24} />, label: 'Ranking' },
];

export default function Sidebar({ isExpanded, setIsExpanded }: SidebarProps) {
  const location = useLocation();

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <aside
      className={clsx(
        'h-screen bg-yellow-50 flex flex-col justify-between fixed left-0 top-0 transition-all duration-300 z-20',
        isExpanded ? 'w-1/8 min-w-[200px]' : 'w-16'
      )}
    >
      <div className="flex justify-center mb-8">
        <img src={logoIcon} alt="App Logo" className="size-20 object-contain" />
      </div>

      <div className="flex flex-col flex-grow">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={clsx(
                'flex items-center mb-2 rounded px-4 py-2 transition-colors hover:bg-yellow-100',
                isActive ? 'bg-yellow-200 font-semibold' : ''
              )}
            >
              <div className="flex justify-center w-8">{item.icon}</div>
              {isExpanded && <span className="ml-3">{item.label}</span>}
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={toggleSidebar}
          className="mb-4 p-2 rounded bg-yellow-200 hover:bg-yellow-300 transition-transform transform hover:scale-110 duration-300"
        >
          {isExpanded ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link
          to="/more"
          className="p-1 rounded hover:bg-yellow-200 transition-transform transform hover:scale-110 duration-300"
        >
          <MoreHorizontal size={28} />
        </Link>
      </div>
    </aside>
  );
}
