import avatar from '../../assets/avatar.png';
import StreakIcon from '../../assets/streak.png';
import HeartIcon from '../../assets/heart.png';
import ProgressBar from './ProgressBar';

export default function ProfileAndStats({ level, streak }: { level: number, streak: number}) {
    return (
      <div className="flex flex-col w-[25%] min-w-[250px] p-6 justify-end">
        <div className="flex items-center justify-center">
          {/* Stats */}
          <div className="flex items-center gap-2 border-[#FFF4E1] pr-6">
              <div className="flex items-center gap-2">
                  <img src={StreakIcon} alt="streak" className="w-6 h-6" />
                  <span className="text-orange-500 font-bold">{streak}</span>
              </div>
              <div className="flex items-center gap-2">
                  <img src={HeartIcon} alt="heart" className="w-6 h-6" />
                  <span className="text-red-500 font-bold">5</span>
              </div>
          </div>
          {/* Profile */}
          <div className="flex items-center gap-2">
              <div className="text-right">
                  <div className="font-bold text-[#3B6978]">Thien</div>
                  <div className="text-xs text-yellow-600">Level {level}</div>
              </div>
              <img src={avatar} alt="profile" className="h-10 w-10 h-16 w-16" />
          </div>
        </div>
        {/* <div className="mt-2">
          <ProgressBar />
        </div> */}
      </div>
    )
}