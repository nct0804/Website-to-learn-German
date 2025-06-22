import { type Course } from "../../hooks/useCoursesData";

interface CourseCardProps {
    course: Course;
    icon: string;
    onClick: () => void;
}

function CourseCard({ course, icon, onClick }: CourseCardProps) {
    return (
      <div className="flex items-center gap-4 bg-white rounded-2xl shadow p-10 mb-4"
          id={course.id.toString()}
      >
        <img src={icon} className="w-20 h-20 rounded-xl bg-[#FFFBF3] p-2" />
        <div className="flex-1">
          <div className="font-semibold text-lg">{course.title}</div>
          <div className="text-sm text-gray-500">{course.description}</div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all`}
              style={{
                // TODO: Wait for backend to add isLearned variable
                // TODO: to calculate the progress
                width: `${course.progress * 100}%`,
                background: "#FDBA17",
              }}
            />
          </div>
        </div>
        <button
          onClick={course.status !== "locked" ? onClick : undefined}
          className={`ml-4 px-6 py-2 rounded-full text-white font-semibold transition
            ${course.status === "practice" ? "bg-[#FDBA17] hover:bg-[#ffd66e]"
              : course.status === "continue" ? "bg-[#FDBA17] hover:bg-[#ffd66e]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          //TODO: Wait for backend to add isLearned variable
          //TODO: to know if the lesson is locked or not
              disabled={course.status === "locked"} 
        >
          {/* TODO: Wait for backend to add isLearned variable
          to determine the action label PRACTICE or LEARN */}
          {course.actionLabel}
        </button>
      </div>
    );
}
  
export default CourseCard;