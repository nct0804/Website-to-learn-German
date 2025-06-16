import React, { useState } from "react";
import LessonHeader from "../learning-path/LessonHeader";
import VerticalStep from "../learning-path/VerticalStep";
import CourseCard from "../learning-path/CourseCard";
import { useCoursesData } from "@/hooks/useCoursesData";
import { useModulesWithLessons } from "@/hooks/useModulesWithLessons";

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

const lessonIcons: Record<number, string> = {
  4: GreetingIcon,                // Basic Greeting
  1: IntroductionIcon,            // Introducing Yourself
  2: FormalVsInformalIcon,        // Formal vs Informal Speech
  3: QuestionIcon,                // Asking Simple Questions
  5: EveryDayPhrasesIcon,         // Common Everyday Phrases
  7: NumberIcon,                  // Numbers 1-10
  6: Number1120Icon,              // Number 11-20
  8: OrdinalNumberIcon,           //Ordinal Number
  9: Number100Icon,               // Number 21-100
  10: AgeIcon                     //Talking about age
}

export default function MainContent() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const { courses, error: coursesError } = useCoursesData();
  const { modules, error: modulesError } = useModulesWithLessons(selectedCourse);

  const currentCourse = selectedCourse
    ? courses.find((course) => course.id === selectedCourse)
    : null;

  if (coursesError || modulesError) return <div>Error: {coursesError || modulesError}</div>;

  return (
    <div className="flex-1 relative flex justify-center overflow-auto h-full custom-scroll px-4 mx-auto max-w-3xl">
      <div className="w-full max-w-3xl px-4 mx-auto py-8">
        {!currentCourse ? (
          <>
            <h1 className="text-2xl font-bold mb-6">Choose your lesson:</h1>
            <div>
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => setSelectedCourse(course.id)}
                />
              ))}
            </div>
          </>
        ) : (
          Array.isArray(modules) && modules.length > 0 && modules.map((module) => (
            <div key={module.id} className="mb-12">
              <LessonHeader
                title={module.title}
                lessonId={module.id}
                description={module.description}
                setSelectedLesson={setSelectedCourse}
              />
              <VerticalStep
                steps={
                  Array.isArray(module.lessons)
                    ? module.lessons.map((lesson) => ({
                        title: lesson.title,
                        xpReward: lesson.xpReward,
                        ...lesson,
                        icon: lessonIcons[lesson.id],
                      }))
                    : []
                }
              />
            </div>
          ))
        )}
      </div>
      <style>
        {`
        .custom-scroll::-webkit-scrollbar {
            display: none;
          }
          .custom-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
        `}
      </style>
    </div>
  );
}