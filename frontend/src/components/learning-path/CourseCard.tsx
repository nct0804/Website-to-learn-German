// src/components/learning-path/CourseCard.tsx
import type { CourseProgress } from "@/components/types/courseProgress"

interface CourseCardProps {
  course: CourseProgress
  icon: string
  isLocked: boolean
  isCompleted: boolean
  onClick: () => void
}

export default function CourseCard({ course, icon, onClick }: CourseCardProps) {
  const isLocked = course.status === "locked"
  const isCompleted = course.isCompleted

  return (
    <div
      className={`flex items-center gap-6 bg-white rounded-2xl shadow p-8 mb-4
        ${isLocked ? "opacity-60" : ""}`
      }
    >
      <img src={icon}
        alt={`${course.title} icon`}
        className="w-20 h-20 rounded-xl bg-[#FFFBF3] p-2"
      />

      <div className="flex-1">
        <h2 className="text-lg font-semibold">{course.title}</h2>
        <p className="text-sm text-gray-500">{course.description}</p>

        <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FDBA17] transition-all"
            style={{ width: `${course.progress * 10}%` }}
          />
        </div>
        <div className="text-xs text-gray-600 mt-1">
          {course.progress * 10}%
        </div>
      </div>

      <button
        onClick={isLocked ? undefined : onClick}
        disabled={isLocked}
        className={`
          ml-4 px-5 py-2 rounded-full font-semibold transition
          ${ isLocked
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : isCompleted
              ? "bg-[#408297] hover:bg-[#408297] text-white"
              : "bg-[#FDBA17] hover:bg-[#ffd66e] text-white"}`
          }
      >
        {isLocked ? "LOCKED" : course.actionLabel}
      </button>
    </div>
  )
}
