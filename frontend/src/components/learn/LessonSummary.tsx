import React from "react";
// import { useNavigate } from "react-router-dom";

interface Exercise {
  id: number;
  question: string;
  exerciseOptions?: { id: number; text: string }[];
}

interface LessonSummaryProps {
  exercises: Exercise[];
  onBack: () => void;
}

const LessonSummary: React.FC<LessonSummaryProps> = ({ exercises, onBack }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-opacity-30 backdrop-blur-md" />
      {/* Popup content */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold text-green-600 mb-2">🎉 Congratulations! 🎉</h2>
        <p className="text-lg text-gray-800 mb-4">You have completed all exercises for this lesson!</p>
        <div className="w-full space-y-4 mb-6">
          {exercises.map((ex, idx) => (
            <div key={ex.id} className="bg-[#fbb12410] rounded-lg shadow-md p-4">
              <div className="font-semibold text-gray-800 mb-1">{idx + 1}. {ex.question}</div>
              <div className="text-green-700 font-bold">Answer: {ex.exerciseOptions && ex.exerciseOptions.length === 1 ? ex.exerciseOptions[0].text : "-"}</div>
            </div>
          ))}
        </div>
        <button
          onClick={onBack}
          className="mt-2 bg-[#fbb124] text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-[#e0a800] transition-colors"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default LessonSummary; 