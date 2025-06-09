import HintTextForNextLesson from "../learning-path/HintTextForNextLesson";
import LessonHeader from "../learning-path/LessonHeader";
import VerticalStep from "../learning-path/VerticalStep";
import steps from "../learning-path/StepData";

export default function MainContent() {
  return (
    <div className="flex-1 relative flex justify-center overflow-auto h-full custom-scroll px-4 mx-auto max-w-3xl">
      <div className="w-full max-w-3xl px-4 mx-auto py-8">

        <LessonHeader title="ä, ö, ü sound" subtitle="Lesson 2, Unit 2" />
        <VerticalStep steps={steps} />
        <HintTextForNextLesson label="compound sound" />
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
