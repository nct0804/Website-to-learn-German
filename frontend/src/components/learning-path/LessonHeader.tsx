export default function LessonHeader({
    id,
    title,
    description,
    setSelectedLesson
}: {
    id: number,
    title: string, 
    description: string | undefined,
    setSelectedLesson: (lesson: number | null) => void
}) {
    return (
        <> 
            <div className="bg-[#fbb124] 
            text-white font-bold rounded-2xl px-8 py-8 
             w-full flex items-center 
            sticky top-0 z-30 bg-[#fbb124] rounded-2xl shadow-lg">
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

                <div className="flex-1 flex flex-col w-full">
                    <div className="flex w-full justify-between items-center">
                        <h1 className="text-white mb-2 font-bold text-2xl text-left">{`${id}. ${title}`}</h1>
                    </div>
                    <p className="text-white mb-2 font-normal italic text-left">{description}</p>
                </div>
            </div>
        </>
        
    )
}