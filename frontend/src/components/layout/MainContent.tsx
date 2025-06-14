import React, { useState } from "react";
import HintTextForNextLesson from "../learning-path/HintTextForNextLesson";
import LessonHeader from "../learning-path/LessonHeader";
import VerticalStep from "../learning-path/VerticalStep";
import steps from "../learning-path/StepData";
import LessonCard from "../learning-path/LessonCard";
import { useLessonData } from "../../hooks/useLessonData";

export default function MainContent() {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const { lessons, isLoading, error } = useLessonData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex-1 relative flex justify-center overflow-auto h-full custom-scroll px-4 mx-auto max-w-3xl">
      <div className="w-full max-w-3xl px-4 mx-auto py-8">
        {!selectedLesson ? (
          <>
            <h1 className="text-2xl font-bold mb-6">Choose your lesson:</h1>
            <div>
              {lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onClick={() => setSelectedLesson(lesson.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Flex row: Back button + LessonHeader */}
            <div className="flex items-center mb-4">
              
              
              <div className="flex-1">
                <LessonHeader title="ä, ö, ü sound" subtitle="Lesson 2, Unit 2" setSelectedLesson={setSelectedLesson} />
              </div>
            </div>
            <VerticalStep steps={steps} />
            <HintTextForNextLesson label="compound sound" />
          </>
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
