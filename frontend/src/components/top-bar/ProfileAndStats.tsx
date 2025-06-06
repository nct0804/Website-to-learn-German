import avatar from '../../assets/avatar.png';

export default function ProfileAndStats() {
    return (
        
      <div className="flex items-center w-[30%] min-w-[250px] p-6 justify-end">
      {/* Stats */}
        <div className="flex items-center gap-4 border-r-[3px] border-[#FFF4E1] pr-6">
            <span className="flex items-center gap-1 text-orange-500 font-bold">🔥 0</span>
            <span className="flex items-center gap-1 text-yellow-700 font-bold">🥨 13</span>
            <span className="flex items-center gap-1 text-red-500 font-bold">❤️ 5</span>
        </div>
        {/* Profile */}
        <div className="flex items-center gap-3">
            <div className="text-right">
            <div className="font-bold text-[#3B6978]">Thien</div>
            <div className="text-xs text-yellow-600">Level 2</div>
            </div>
            <img src={avatar} alt="profile" 
            className="h-10 w-10 h-16 w-16" />
        </div>
    </div>
    )
}