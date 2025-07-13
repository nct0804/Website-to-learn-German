import { useState, useMemo } from "react";
import LessonHeader from "../learning-path/LessonHeader";
import VerticalStep from "../learning-path/VerticalStep";
import CourseCard from "../learning-path/CourseCard"
import useCoursesWithProgress from "../../hooks/useCoursesWithProgress";
import { useAllModulesLessonProgress } from "../../hooks/useLessonModuleProgress";

import GreetingIcon from "../../assets/greeting.png";
import NumberIcon from "../../assets/numbers.png";
import EveryDayPhrasesIcon from "../../assets/everydayphrases.png"
import OrdinalNumberIcon from "../../assets/ordinalnumber.png"
import QuestionIcon from "../../assets/question.png"
import IntroductionIcon from "../../assets/introduce-yourself.png"
import FormalVsInformalIcon from "../../assets/speech.png"
import Number1120Icon from "../../assets/Number12.png"
import Number100Icon from "../../assets/number100.png"
import AgeIcon from "../../assets/age.png"
import A11 from "../../assets/course_19.png"
import A12 from "../../assets/course_5.png"
import A21 from "../../assets/course_17.png"
import A22 from "../../assets/course_21.png"

const moduleIcons = [
  A11,  // German A1.1
  A12,  // German A1.2
  A21,  // German A2.1
  A22   // German A2.2
]

const lessonIconMap: Record<number, string> = {
  1: IntroductionIcon,          // Introducing Yourself
  2: EveryDayPhrasesIcon,       // Common Everyday Phrases
  3: GreetingIcon,              // Basic Greeting
  4: FormalVsInformalIcon,      // Formal vs Informal Speech
  5: QuestionIcon,              // Asking Simple Questions
  6: Number1120Icon,            // Number 11-20
  7: OrdinalNumberIcon,         // Ordinal Number
  8: NumberIcon,                // Numbers 1-10
  9: AgeIcon,                   // Talking about age
  10: Number100Icon             // Number 21-100
};

export default function MainContent() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
  const { courses, loading, error } = useCoursesWithProgress()

  if (loading) console.log("Loading courses…")
  if (error)   console.log(error.message)

  const current = selectedCourse
    ? courses.find((c) => c.id === selectedCourse) ?? null
    : null

  // Memoize module IDs to avoid unnecessary renders
  const moduleIds = useMemo(() => current ? current.modules.map(m => m.id) : [], [current]);

  // Fetch lessons for all modules in the selected course
  const { data: lessonsByModule, loading: lessonsLoading, error: lessonsError } = useAllModulesLessonProgress(moduleIds);

  return (
    <div className="flex-1 flex justify-center overflow-auto max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl px-8 py-5 shadow-lg transition-colors duration-300">
      <div className="w-full">
        {!current ? (
          <>
            <div className="mb-8 flex flex-col items-center">
              <h1 className="text-3xl font-bold text-black dark:text-white mb-2 transition-colors duration-300">Explore Your German Learning Path</h1>
              <p className="text-lg text-black dark:text-gray-300 max-w-3xl transition-colors duration-300">
                Choose from our expertly designed courses to master German step by step. Each course is crafted just to help you as a beginner to learn German with confidence and fun!
              </p>
            </div>
            <div className="space-y-6">
              {courses.map((course, idx) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  icon={moduleIcons[idx]}
                  onClick={() => setSelectedCourse(course.id)}
                  isLocked={course.status !== "learn"}
                  isCompleted={course.isCompleted}
                />
              ))}
            </div>
          </>
        ) : (
          current.modules.map((module) => {
            const lessons = lessonsByModule[module.id] || [];
            return (
              <div key={module.id} className="">
                {/* {module.isLocked ? (
                  // Show a hint for the next lesson (first lesson in the module)
                  lessons.length > 0 && lessons[0].title ? (
                    <div className="flex items-center w-full my-8">
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="mx-4 text-gray-500 italic whitespace-nowrap">Next up: {lessons[0].title}</span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                  ) : null
                ) : ( */}
                  <LessonHeader
                    id={module.id}
                    title={module.title}
                    description={module.description}
                    setSelectedLesson={() => setSelectedCourse(null)}
                    isLocked={module.isLocked}
                    order={module.order}
                  />
                {lessonsLoading ? (
                  (console.log('Loading lessons...'), null)
                ) : lessonsError ? (  
                  (console.log('Error loading lessons: ', lessonsError.message), null)
                ) : (
                  <VerticalStep
                    steps={lessons.map((lesson) => ({
                      ...lesson,
                      icon: lessonIconMap[lesson.id],
                      order: lesson.order,
                      isLocked: module.isLocked,
                      lessonId: lesson.id,
                      onClick: () => {},
                      bubbleRef: null,
                      nodeWrapperRef: null,
                      blockedBubbleRef: null,
                      xpReward: lesson.xpReward.toString(),
                    }))}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  )
}