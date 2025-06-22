import React, { useState } from "react";
import LessonHeader from "../learning-path/LessonHeader";
import VerticalStep from "../learning-path/VerticalStep";
import CourseCard from "../learning-path/CourseCard"
import useCoursesWithProgress from "../../hooks/useCoursesWithProgress";

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

const lessonIcons = [
  IntroductionIcon,            // Introducing Yourself
  FormalVsInformalIcon,        // Formal vs Informal Speech
  QuestionIcon,                // Asking Simple Questions
  GreetingIcon,                // Basic Greeting
  EveryDayPhrasesIcon,         // Common Everyday Phrases
  Number1120Icon,              // Number 11-20
  NumberIcon,                  // Numbers 1-10
  OrdinalNumberIcon,           //Ordinal Number
  Number100Icon,               // Number 21-100
  AgeIcon                     //Talking about age
]
  

export default function MainContent() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

  const { courses, loading, error } = useCoursesWithProgress()

  if (loading) return <div>Loading courses…</div>
  if (error)   return <div>Error: {error.message}</div>

  const current = selectedCourse
    ? courses.find((c) => c.id === selectedCourse) ?? null
    : null

  return (
    <div className="flex-1 flex justify-center overflow-auto h-full px-4 max-w-3xl mx-auto">
      <div className="w-full">
        {!current ? (
          <>
            <h1 className="text-2xl font-bold">Choose your lesson:</h1>
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
          current.modules.map((mod, mi) => (
            <div key={mod.id} className="py-6">
              <LessonHeader
                title={`Lesson ${mi + 1}`}
                description={mod.description}
                setSelectedLesson={() => setSelectedCourse(null)}
              />
              <VerticalStep
                steps={mod.lessons.map((lesson, li) => ({
                  ...lesson,
                  icon: lessonIcons[li],
                }))}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}