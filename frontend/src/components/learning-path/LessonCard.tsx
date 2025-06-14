import { type Lesson } from "../../hooks/useLessonData";

interface LessonCardProps {
    lesson: Lesson;
    onClick: () => void;
}

function LessonCard({ lesson, onClick }: LessonCardProps) {
    return (
      <div className="flex items-center gap-4 bg-white rounded-2xl shadow p-10 mb-4"
          id={lesson.id.toString()}
      >
        <img src={lesson.icon} className="w-20 h-20 rounded-xl bg-gray-100 p-2" />
        <div className="flex-1">
          <div className="font-semibold text-lg">{lesson.title}</div>
          <div className="text-sm text-gray-500">{lesson.description}</div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all`}
              style={{
                // TODO: Wait for backend to add isLearned variable
                // TODO: to calculate the progress
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
          //TODO: Wait for backend to add isLearned variable
          //TODO: to know if the lesson is locked or not
              disabled={lesson.status === "locked"} 
        >
          {/* TODO: Wait for backend to add isLearned variable
          to determine the action label PRACTICE or LEARN */}
          {lesson.actionLabel}
        </button>
      </div>
    );
}
  
export default LessonCard;