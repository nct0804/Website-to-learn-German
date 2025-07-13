import React from 'react';
import '../style/LeaderRanking.css';

interface RankingMedalProps {
  rank: 1 | 2 | 3;
  size?: number;
}

const RankingMedal: React.FC<RankingMedalProps> = ({ rank, size = 40 }) => {
  const getMedalConfig = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          medalColor: '#FFD700',
          ribbonColor: '#FFA500',
          textColor: '#8B6914',
          borderColor: '#B8860B'
        };
      case 2:
        return {
          medalColor: '#C0C0C0',
          ribbonColor: '#A0A0A0',
          textColor: '#555555',
          borderColor: '#808080'
        };
      case 3:
        return {
          medalColor: '#CD7F32',
          ribbonColor: '#A0522D',
          textColor: '#5D4E37',
          borderColor: '#8B4513'
        };
      default:
        return {
          medalColor: '#E0E0E0',
          ribbonColor: '#CCCCCC',
          textColor: '#666666',
          borderColor: '#AAAAAA'
        };
    }
  };

  const config = getMedalConfig(rank);

  return (
    <div 
      className="ranking-medal"
      style={{
        width: size,
        height: size * 1.3,
        position: 'relative',
        display: 'inline-block'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: size * 0.4,
          height: size * 0.6,
          background: `linear-gradient(45deg, ${config.ribbonColor}, ${config.ribbonColor}DD)`,
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 50% 80%, 15% 100%)',
          zIndex: 1
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: size * 0.3,
          left: '50%',
          transform: 'translateX(-50%)',
          width: size * 0.8,
          height: size * 0.8,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${config.medalColor}, ${config.medalColor}CC)`,
          border: `2px solid ${config.borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 8px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3)`,
          zIndex: 2
        }}
      >
        <span
          style={{
            fontSize: size * 0.35,
            fontWeight: 'bold',
            color: config.textColor,
            textShadow: rank <= 3 ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
          }}
        >
          {rank}
        </span>
      </div>

      {rank === 1 && (
        <div
          style={{
            position: 'absolute',
            top: size * 0.35,
            left: '58%',
            transform: 'translateX(-50%)',
            width: size * 0.3,
            height: size * 0.3,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
            zIndex: 3
          }}
        />
      )}
    </div>
  );
};

export default function ranking() {
  const rankingData = [
    { rank: 1, name: "Julia", level: 15, xp: 1450, avatar: "J", bgColor: "from-blue-400 to-purple-500" },
    { rank: 2, name: "Erik", level: 12, xp: 1350, avatar: "E", bgColor: "from-blue-400 to-purple-500" },
    { rank: 3, name: "Aisha", level: 11, xp: 1250, avatar: "A", bgColor: "from-blue-400 to-purple-500" },
    { rank: 4, name: "Thien (You)", level: 1, xp: 0, avatar: "T", bgColor: "from-orange-400 to-orange-500", isCurrentUser: true },
    { rank: 5, name: "Max", level: 8, xp: 850, avatar: "M", bgColor: "from-green-400 to-green-500" },
    { rank: 6, name: "Sophie", level: 7, xp: 720, avatar: "S", bgColor: "from-pink-400 to-pink-500" },
    { rank: 7, name: "Liam", level: 6, xp: 680, avatar: "L", bgColor: "from-cyan-400 to-cyan-500" },
    { rank: 8, name: "Anna", level: 5, xp: 620, avatar: "A", bgColor: "from-purple-400 to-purple-500" },
    { rank: 9, name: "David", level: 4, xp: 580, avatar: "D", bgColor: "from-indigo-400 to-indigo-500" },
    { rank: 10, name: "Sarah", level: 3, xp: 540, avatar: "S", bgColor: "from-red-400 to-red-500" },
    { rank: 11, name: "Mike", level: 3, xp: 510, avatar: "M", bgColor: "from-yellow-400 to-yellow-500" },
    { rank: 12, name: "Emma", level: 2, xp: 480, avatar: "E", bgColor: "from-teal-400 to-teal-500" },
    { rank: 13, name: "John", level: 2, xp: 450, avatar: "J", bgColor: "from-gray-400 to-gray-500" },
    { rank: 14, name: "Lisa", level: 1, xp: 420, avatar: "L", bgColor: "from-rose-400 to-rose-500" },
    { rank: 15, name: "Tom", level: 1, xp: 390, avatar: "T", bgColor: "from-emerald-400 to-emerald-500" }
  ];

  const getRankingItemClass = (rank: number, isCurrentUser?: boolean) => {
    let baseClass = "ranking-item flex items-center p-3 rounded-lg";
    
    if (isCurrentUser) {
      return `${baseClass} current-user-bg`;
    }
    
    switch (rank) {
      case 1: return `${baseClass} rank-1-bg`;
      case 2: return `${baseClass} rank-2-bg`;
      case 3: return `${baseClass} rank-3-bg`;
      default: return `${baseClass} bg-white border border-gray-200`;
    }
  };

  return (
    <div className="flex-1 flex justify-center overflow-auto px-4 max-w-3xl mx-auto leaderboard-container">
      <div className="w-full py-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Leaderboard</h1>
            <p className="text-gray-600 text-sm">Compete with others and climb to the top!</p>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            <button className="tab-button px-5 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full font-medium text-sm shadow-md active">
              This Week
            </button>
            <button className="tab-button px-5 py-2 bg-gray-100 text-gray-600 rounded-full font-medium text-sm hover:bg-gray-200 transition-colors">
              This Month
            </button>
            <button className="tab-button px-5 py-2 bg-gray-100 text-gray-600 rounded-full font-medium text-sm hover:bg-gray-200 transition-colors">
              All Time
            </button>
          </div>

          <div className="ranking-list space-y-3 max-h-[500px] overflow-y-auto">
            {rankingData.map((user) => (
              <div 
                key={user.rank}
                className={getRankingItemClass(user.rank, user.isCurrentUser)}
              >

                <div className="rank-container mr-4">
                  {user.rank <= 3 ? (
                    <RankingMedal rank={user.rank as 1 | 2 | 3} size={50} />
                  ) : (
                    <div className="rank-number-plain">
                      {user.rank}
                    </div>
                  )}
                </div>

                <div className={`user-avatar bg-gradient-to-br ${user.bgColor} mr-5`}>
                  {user.avatar}
                </div>

                <div className="user-info">
                  <div className="user-name">{user.name}</div>
                  <div className="user-level">Level {user.level}</div>
                </div>

                <div className="xp-display">
                  <div className="xp-value">{user.xp.toLocaleString()}</div>
                  <div className="xp-label">XP</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}