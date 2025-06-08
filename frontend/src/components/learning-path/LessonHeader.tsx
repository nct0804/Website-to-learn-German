export default function LessonHeader({title, subtitle}: {title: string, subtitle: string}) {
    return (
        <> 
            {/* Lesson Header */}
            <div className="bg-[#fbb124] text-white font-bold rounded-2xl shadow px-8 py-8 mb-12 w-full">
                <div className="text-sm font-medium">{subtitle}</div>
                <div className="text-xl font-bold">{title}</div>
            </div>
        </>
        
    )
}