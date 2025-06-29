// src/components/learning-path/CourseCard.tsx
import type { CourseProgress } from "@/components/types/courseProgress"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, LockIcon, Play, Star } from "lucide-react"

interface CourseCardProps {
  course: CourseProgress
  icon: string
  isLocked: boolean
  isCompleted: boolean
  onClick: () => void
}

export default function CourseCard({ course, icon, onClick }: CourseCardProps) {
  const isLocked = course.completedLessons == course.totalLessons
  const isCompleted = course.isCompleted
  const number = 6
  // Calculate progress percentage based on lessons
  const progressPercent = course.totalModules > 0 ? Math.round((course.completedLessons / course.totalLessons) * 100) : 0;

  // Get lesson titles from all modules for hints
  const lessonTitles = course.modules
    .flatMap(module => module.lessons)
    .slice(0, number) // Show first 4 lessons as hints
    .map(lesson => lesson.title);

  return (
    <Card className={`mb-6 p-0 relative shadow-md`}>
      
      <CardContent className="flex flex-col gap-2 p-8 relative z-20">
        {/* Top row: icon + content */}
        <div className="flex flex-row items-center gap-6 w-full ">
          <div className="flex-shrink-0 flex flex-col items-center justify-center w-24">
            <img
              src={icon}
              alt={`${course.title} icon`}
              className="w-20 h-20 rounded-xl bg-[#FFFBF3] p-2"
            />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold text-[#2f6879]">{course.title}</CardTitle>
            <CardDescription className="text-sm text-black">{course.description}</CardDescription>
            
            {/* Lesson hints section */}
            {lessonTitles.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-medium mb-2">You'll learn:</p>
                <div className="flex flex-wrap gap-1">
                  {lessonTitles.map((title, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs bg-blue-50 text-[#408297] rounded-md border border-blue-100"
                    >
                      {title}
                    </span>
                  ))}
                  {course.totalLessons > number && (
                    <span className="inline-block px-2 py-1 text-xs bg-blue-50 text-[#408297] rounded-md border border-gray-200">
                      +{course.totalLessons - number} more
                    </span>
                  )}
                </div>
              </div>
            )}
            
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FDBA17] transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {progressPercent}%
            </div>
          </div>
        </div>
        {/* Button row: right aligned */}
        <div className="flex flex-row justify-end w-full mt-2">
          <Button
            onClick={isLocked ? undefined : onClick}
            disabled={isLocked}
            className={`px-5 py-2 rounded-full font-bold transition cursor-pointer ${
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
            {isLocked && <LockIcon className="w-5 h-5" />}
            {!isLocked && !course.isCompleted && <Star className="w-5 h-5" />}
            {!isLocked && course.isCompleted && <Play className="w-5 h-5" />} 
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
