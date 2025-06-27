// src/components/learning-path/CourseCard.tsx
import type { CourseProgress } from "@/components/types/courseProgress"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
    <Card className={`mb-4 p-0`}>
      <CardContent className="flex flex-col gap-2 p-8">
        {/* Top row: icon + content */}
        <div className="flex flex-row items-center gap-6 w-full">
          <div className="flex-shrink-0 flex flex-col items-center justify-center w-24">
            <img
              src={icon}
              alt={`${course.title} icon`}
              className="w-20 h-20 rounded-xl bg-[#FFFBF3] p-2"
            />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">{course.description}</CardDescription>
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
        </div>
        {/* Button row: right aligned */}
        <div className="flex flex-row justify-end w-full mt-2">
          <Button
            onClick={isLocked ? undefined : onClick}
            disabled={isLocked}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              isLocked
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : isCompleted
                ? "bg-[#408297] hover:bg-[#408297] text-white"
                : "bg-[#FDBA17] hover:bg-[#ffd66e] text-white"
            }`}
            variant="default"
            size="lg"
          >
            {isLocked ? "LOCKED" : course.actionLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
