import lessons from "./LessonData";

function LessonCard({ lesson, onClick }: { lesson: typeof lessons[0]; onClick: () => void }) {
    return (
      <div className="flex items-center gap-4 bg-white rounded-2xl shadow p-10 mb-4">
        <img src={lesson.icon} className="w-20 h-20 rounded-xl bg-gray-100 p-2" />
        <div className="flex-1">
          <div className="font-semibold text-lg">{lesson.title}</div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all`}
              style={{
                width: `${lesson.progress * 100}%`,
                background: "#FDBA17",
              }}
            />
          </div>
        </div>
        <button
          onClick={lesson.status !== "locked" ? onClick : undefined}
          className={`ml-4 px-6 py-2 rounded-full text-white font-semibold transition
            ${lesson.status === "practice" ? "bg-[#FDBA17] hover:bg-[#ffd66e]"
              : lesson.status === "continue" ? "bg-[#FDBA17] hover:bg-[#ffd66e]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          disabled={lesson.status === "locked"}
        >
          {lesson.actionLabel}
        </button>
      </div>
    );
}
  
export default LessonCard;