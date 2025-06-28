import React, { useState, useMemo } from "react";
import LessonHeader from "../learning-path/LessonHeader";
import VerticalStep from "../learning-path/VerticalStep";
import CourseCard from "../learning-path/CourseCard"
import useCoursesWithProgress from "../../hooks/useCoursesWithProgress";
import { useAllModulesLessonProgress } from "../../hooks/useAllModulesLessonProgress";

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
    <div className="flex-1 flex justify-center overflow-auto h-full px-4 max-w-3xl mx-auto">
      <div className="w-full">
        {!current ? (
          <>
            {/* <h1 className="text-2xl font-bold mb-6">Choose your lesson:</h1> */}
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
              <div key={module.id} className="py-6">
                <LessonHeader
                  id={module.id}
                  title={module.title}
                  description={module.description}
                  setSelectedLesson={() => setSelectedCourse(null)}
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