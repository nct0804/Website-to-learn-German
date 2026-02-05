import React from 'react';
import { Mail, Trophy, Zap, Flame, Star, Award, Crown, Loader2, AlertCircle } from 'lucide-react';
import useUserProfile from '../hooks/useUserProfile';

// interface UserProfile {
//   id: string;
//   email: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   level: number;
//   xp: number;
//   streak: number;
// }

const ProfilePage: React.FC = () => {
  const { userProfile, isLoading, error, refetch } = useUserProfile();

  const getXpForNextLevel = (currentLevel: number) => {
    return currentLevel * 1000;
  };

  const getLevelProgress = (xp: number, level: number) => {
    const xpForCurrentLevel = (level - 1) * 1000;
    const xpForNextLevel = level * 1000;
    const currentLevelXp = xp - xpForCurrentLevel;
    const xpNeededForLevel = xpForNextLevel - xpForCurrentLevel;
    return Math.max(0, Math.min(100, (currentLevelXp / xpNeededForLevel) * 100));
  };

  const getAvatarInitials = (firstName: string, lastName: string) => {
    const first = firstName || '';
    const last = lastName || '';
    const firstInitial = first.charAt(0) || '';
    const lastInitial = last.charAt(0) || '';
    return `${firstInitial}${lastInitial}`.toUpperCase() || 'U';
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-3xl max-w-3xl 2xl:max-w-4xl 3xl:max-w-6xl mx-auto transition-colors duration-300" data-test="profile-loading">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 text-center transition-colors duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-3xl max-w-xl mx-auto transition-colors duration-300" data-test="profile-error">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 text-center transition-colors duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <p className="text-red-600 dark:text-red-400 mb-4 text-sm transition-colors duration-300">{error}</p>
          <button 
            onClick={refetch}
            data-test="profile-retry"
            className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-full hover:from-orange-500 hover:to-red-600 transition-all duration-300 text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-3xl max-w-xl mx-auto transition-colors duration-300" data-test="profile-empty">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 text-center transition-colors duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">No profile data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex justify-center overflow-auto px-4" data-test="page-profile">
      <div className="w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-4 border border-gray-100 dark:border-gray-700 transition-colors duration-300" data-test="profile-header-card">
          <div className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 h-20 relative">
            <div className="absolute -bottom-8 left-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {getAvatarInitials(userProfile.firstName, userProfile.lastName)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="pt-10 pb-4 px-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-1 transition-colors duration-300">
                  {userProfile.firstName || 'User'} {userProfile.lastName || ''}
                </h1>
                <p className="text-base text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">@{userProfile.username || 'user'}</p>
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3 transition-colors duration-300">
                  <Mail className="w-3 h-3 mr-2" />
                  <span className="text-xs">{userProfile.email || 'No email'}</span>
                </div>
              </div>
              
              <div className="flex items-center bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1.5 rounded-full shadow-md">
                <Crown className="w-4 h-4 mr-1" />
                <span className="text-xs font-bold">Level {userProfile.level || 1}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4" data-test="profile-stats">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-3 border border-gray-100 dark:border-gray-600 hover:shadow-md transition-all duration-300" data-test="profile-stat-xp">
            <div className="flex items-center mb-2">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-1.5 rounded-full mr-2 transition-colors duration-300">
                <Zap className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-800 dark:text-white transition-colors duration-300">Experience</h3>
                <p className="text-lg font-bold text-orange-600 dark:text-orange-400 transition-colors duration-300">{(userProfile.xp || 0).toLocaleString()}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mb-1 transition-colors duration-300">
              <div 
                className="bg-gradient-to-r from-orange-400 to-red-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${getLevelProgress(userProfile.xp || 0, userProfile.level || 1)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
              {getXpForNextLevel(userProfile.level || 1) - (userProfile.xp || 0)} XP to next level
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-3 border border-gray-100 dark:border-gray-600 hover:shadow-md transition-all duration-300" data-test="profile-stat-streak">
            <div className="flex items-center mb-2">
              <div className="bg-red-100 dark:bg-red-900/30 p-1.5 rounded-full mr-2 transition-colors duration-300">
                <Flame className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-800 dark:text-white transition-colors duration-300">Streak</h3>
                <p className="text-lg font-bold text-red-600 dark:text-red-400 transition-colors duration-300">{userProfile.streak || 0}</p>
              </div>
            </div>
            <div className="flex items-center">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i}
                  className={`w-3 h-3 rounded-full mr-1 ${
                    i < (userProfile.streak || 0) % 7 ? 'bg-red-400 dark:bg-red-600' : 'bg-gray-200 dark:bg-gray-600'
                  } transition-colors duration-300`}
                />
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-3 border border-gray-100 dark:border-gray-600 hover:shadow-md transition-all duration-300" data-test="profile-stat-level">
            <div className="flex items-center mb-2">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-1.5 rounded-full mr-2 transition-colors duration-300">
                <Trophy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-800 dark:text-white transition-colors duration-300">Current Level</h3>
                <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400 transition-colors duration-300">{userProfile.level || 1}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-3 h-3 ${
                    i < (userProfile.level || 1) ? 'text-yellow-400 dark:text-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-500'
                  } transition-colors duration-300`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Achievement Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700 transition-colors duration-300" data-test="profile-achievements">
          <div className="flex items-center mb-3">
            <Award className="w-5 h-5 text-orange-500 mr-2" />
            <h2 className="text-lg font-bold text-gray-800 dark:text-white transition-colors duration-300">Achievements</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Sample achievements */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center opacity-50 transition-colors duration-300">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-1 flex items-center justify-center transition-colors duration-300">
                <Trophy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 transition-colors duration-300">First Steps</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center opacity-50 transition-colors duration-300">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-1 flex items-center justify-center transition-colors duration-300">
                <Flame className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 transition-colors duration-300">Hot Streak</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center opacity-50 transition-colors duration-300">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-1 flex items-center justify-center transition-colors duration-300">
                <Zap className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 transition-colors duration-300">Power User</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center opacity-50 transition-colors duration-300">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-1 flex items-center justify-center transition-colors duration-300">
                <Star className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 transition-colors duration-300">Rising Star</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Keep learning to unlock more achievements!</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
