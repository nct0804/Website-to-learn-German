import { useAuth } from "@/hooks/useAuth";

export default function ProgressBar() {
    const { user } = useAuth();
    // Assume each level requires 1000 XP (customize as needed)
    const xpForNextLevel = 1000;
    const level = user?.level ?? 1;
    const xp = user?.xp ?? 0;
    const percent = Math.min((xp / xpForNextLevel) * 100, 100);

    return (
        <div className="flex flex-col flex-1 w-full max-w-3xl px-4 mx-auto">
            {/* Top: Level */}
            <div className="flex justify-between mb-1">
                <span className="font-bold text-sm text-[#3B6978]">Level {level}</span>
                {/* This empty span ensures "Level 2" hugs the left. Remove if not needed */}
                <span></span>
            </div>
            {/* Bar */}
            <div className="h-4 w-full bg-gray-200 rounded-full mb-1">
                <div className="h-4 bg-yellow-400 rounded-full transition-all duration-300" style={{ width: `${percent}%` }} />
            </div>
            {/* Bottom: XP Text */}
            <div className="flex justify-between mt-0">
                <span></span>
                <span className="text-xs text-gray-600">{xp}/{xpForNextLevel} XP</span>
            </div>
        </div>
    )
}