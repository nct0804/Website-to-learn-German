import { Link, useLocation } from 'react-router-dom';
import Home from '../../assets/home.png';
import Training from '../../assets/training.png';
import Ranking from '../../assets/ranking-page.png';
import More from '../../assets/more-page.png';
import clsx from 'clsx';

const menuItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/lesson', icon: Training, label: 'Lesson' },
  { to: '/ranking', icon: Ranking, label: 'Ranking' },
];

export default function LeftBar() {
  const location = useLocation();

  return (
    <aside className="h-full flex flex-col justify-center border-r-[3px] border-[#FFF4E1] w-30 transition-all duration-300">
      <div className="flex flex-col justify-between items-center h-full py-4">
        <div className="flex flex-col items-center gap-4 mt-4">
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

        <div className="relative group mt-auto">
          <button
            className="p-1 rounded hover:bg-[#fbb024ae] transition-transform transform hover:scale-110 duration-300"
            tabIndex={0}
            aria-haspopup="true"
          >
            <img src={More} alt="More" className="w-8 h-8" />
          </button>
          <div
            className="absolute left-11 top-1/2 -translate-y-1/2 flex-col gap-1 bg-white shadow-lg rounded-lg py-4 px-6 min-w-[170px] z-20 hidden group-hover:flex"
            onMouseDown={(e) => e.preventDefault()}
          >
            <Link
              to="/profile"
              className="block px-2 py-1 rounded hover:bg-[#fbb12422] text-gray-800"
            >
              Profile
            </Link>
            <Link
              to="/aboutus"
              className="block px-2 py-1 rounded hover:bg-[#fbb12422] text-gray-800"
            >
              About us
            </Link>
            <button
              className="block px-2 py-1 rounded hover:bg-[#fbb12422] text-left w-full text-gray-800"
              onClick={() => {
                // logout logic
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

    </aside>
  );
}
