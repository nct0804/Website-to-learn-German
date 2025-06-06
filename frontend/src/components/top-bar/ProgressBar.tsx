export default function ProgressBar() {
    return (
        <div className="flex flex-col flex-1 w-full max-w-3xl px-4 mx-auto">
            {/* Top: Level */}
            <div className="flex justify-between mb-1">
                <span className="font-bold text-sm text-[#3B6978]">Level 2</span>
                {/* This empty span ensures "Level 2" hugs the left. Remove if not needed */}
                <span></span>
            </div>
            {/* Bar */}
            <div className="h-2 w-full bg-gray-200 rounded-full mb-1">
                <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '20%' }} />
            </div>
            {/* Bottom: XP Text */}
            <div className="flex justify-between mt-0">
                <span></span>
                <span className="text-xs text-gray-600">200/1000 XP</span>
            </div>
        </div>
    )
}