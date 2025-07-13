import FirstIcon from '../../assets/1st.png';
import SecondIcon from '../../assets/2nd.png';
import ThirdIcon from '../../assets/3rd.png';

const users = [
  { rank: 1, name: 'Julia', xp: 1450, icon: FirstIcon },
  { rank: 2, name: 'Erik', xp: 1350, icon: SecondIcon },
  { rank: 3, name: 'Aisha', xp: 1250, icon: ThirdIcon },
];

export default function LeaderboardPanel() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 mt-6 border-none shadow-lg transition-colors duration-300">
      <div className="font-semibold text-xl mb-4 text-gray-800 dark:text-white transition-colors duration-300">Leaderboard</div>
      <div className="flex flex-col gap-3">
        {users.map((user) => (
          <div
            key={user.rank}
            className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-3 shadow-sm transition-colors duration-300"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-600 mr-2 transition-colors duration-300">
              <img src={user.icon} alt={`${user.rank} place`} className="w-14 h-14 object-contain" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800 dark:text-white text-base transition-colors duration-300">{user.name}</div>
              <div className="text-sm text-blue-500 dark:text-blue-400 font-medium transition-colors duration-300">{user.xp.toLocaleString()} XP</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 