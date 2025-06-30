import { useAuth } from "@/hooks/useAuth";

function getXpForLevel(level: number): number {
    if (level <= 0) return 0;
    if (level === 1) return 50;
    if (level === 2) return 120;
    if (level === 3) return 250;
    if (level === 4) return 370;
    if (level === 5) return 500;
    return 500;
}

export default function ProgressBar() {
    const { user } = useAuth();
    const level = user?.level ?? 1;
    const xp = user?.xp ?? 0;
    const xpForThisLevel = getXpForLevel(level);
    const xpForPrevLevel = getXpForLevel(level - 1);
    const xpInLevel = xp - xpForPrevLevel;
    const xpNeeded = xpForThisLevel - xpForPrevLevel;
    const percent = Math.min((xpInLevel / xpNeeded) * 100, 100);

    return (
        <div className="flex flex-col flex-1 w-full max-w-2xl mx-auto -translate-x-12">
            {/* Bar */}
            <div className="h-4 w-full bg-gray-200 rounded-full mb-1">
                <div className="h-4 bg-yellow-400 rounded-full transition-all duration-300" style={{ width: `${percent}%` }} />
            </div>
            {/* Bottom: XP Text */}
            <div className="flex justify-between mt-0">
                <span></span>
                <span className="text-xs text-gray-600">{xpInLevel}/{xpNeeded} XP</span>
            </div>
        </div>
    )
}