import avatar from '../../assets/avatar.png';
import StreakIcon from '../../assets/streak.png';
import HeartIcon from '../../assets/heart.png';
import StarIcon from '../../assets/star.png';
import ProgressBar from './ProgressBar';
import BrezelIcon from '../../assets/brezel.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function ProfileAndStats({ level, streak }: { level: number, streak: number}) {
  const { user } = useAuth();
  
  return (
    <div className="w-[30%] min-w-[250px] max-w-xl rounded-2xl p-5 flex flex-col 
    md:flex-row justify-center items-center gap-4 md:gap-8">
      {/* Stat Chips */}
      <div className="flex flex-col items-center flex-1 gap-2">
        <div className="flex items-center gap-6 mb-1">
          <div className="relative w-20 h-14 flex-shrink-0 flex gap-3 items-center justify-center bg-orange-50 rounded-full shadow hover:scale-105 cursor-pointer group">
            <img src={StreakIcon} alt="streak" className="w-7 h-7" />
            <span className="text-orange-500 font-bold text-sm">{streak}</span>
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 whitespace-nowrap">
              Current streak
            </div>
          </div>
          <div className="relative w-20 h-14 flex-shrink-0 flex gap-3 items-center justify-center bg-red-50 rounded-full shadow hover:scale-105 cursor-pointer group">
            <img src={HeartIcon} alt="heart" className="w-7 h-7" />
            <span className="text-red-500 font-bold text-sm">{user?.hearts || 0}</span>
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 whitespace-nowrap">
              Hearts left
            </div>
          </div>
          <div className="relative w-20 h-14 flex-shrink-0 flex gap-3 items-center justify-center bg-yellow-50 rounded-full shadow hover:scale-105 cursor-pointer group">
            <img src={BrezelIcon} alt="brezel" className="w-7 h-7" />
            <span className="text-yellow-700 font-bold text-sm">5</span>
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 whitespace-nowrap">
              Brezel points
            </div>
          </div>
        </div>
        {/* Progress Bar with XP label */}
        <div className="flex flex-col flex-1 gap-1 w-full">
          <ProgressBar />
        </div>
      </div>
      {/* Avatar with Level Badge */}
      <div className="relative flex max-w-xl flex-shrink-0">
        <Link to="/profile" className="group">
          <img src={avatar} alt="profile" className="h-20 w-20 rounded-full cursor-pointer group-hover:scale-102" />
          <div className="absolute -top-1 left-1/2 translate-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-1 py-1 rounded-full shadow-lg border-2 border-white ">
            Lv. {level}
          </div>
        </Link>
      </div>
    </div>
  )
}