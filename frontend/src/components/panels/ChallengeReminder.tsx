import { Trophy } from "lucide-react";

export default function ChallengeReminder() {
  return (
    <div className="flex flex-col mt-5 justify-between bg-gradient-to-tr  rounded-2xl shadow-lg p-5 min-h-[150px]">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-gradient-to-tr from-yellow-100 to-yellow-50 rounded-xl p-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
        <div>
          <span className="block text-xs font-bold uppercase text-yellow-500 tracking-wider mb-0.5">
            Challenge
          </span>
          <h2 className="font-bold text-lg text-[#256996] leading-tight">Daily XP Challenge</h2>
        </div>
      </div>
      <div className="text-gray-600 text-[15px] flex-1 mb-3">
        Complete today’s challenge to earn bonus XP!
      </div>
      <button
        className="w-full mt-auto py-2 bg-gradient-to-r from-[#05315B] via-[#256996] to-[#3B6978] text-white font-bold rounded-xl shadow-md transition active:scale-95"
        onClick={() => alert('Challenge started!')}
      >
        Start Challenge
      </button>
    </div>
  );
}
