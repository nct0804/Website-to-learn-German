export default function LessonHeader({
    title,
    description,
    setSelectedLesson
}: {
    title: string, 
    description: string | undefined,
    setSelectedLesson: (lesson: number | null) => void
}) {
    return (
        <> 
            <div className="bg-[#fbb124] 
            text-white font-bold rounded-2xl shadow px-8 py-8 
            mb-12 w-full flex items-center 
            sticky top-0 z-30 bg-[#fbb124] rounded-2xl shadow">
                {/* Left arrow icon */}
                <button
                    className="mr-4 transition flex items-center"
                    onClick={() => setSelectedLesson(null)}
                    style={{ cursor: 'pointer' }}
                >
                    <svg width="30" height="30" fill="none" viewBox="0 0 24 24">
                        <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <div className="flex-1">
                    <p className="text-sm text-white mb-2 font-normal">{description}</p>
                    <h1 className="text-2xl font-bold">{title}</h1>
                </div>
            </div>
        </>
        
    )
}