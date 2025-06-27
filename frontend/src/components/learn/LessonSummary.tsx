import React, { useEffect } from "react";
import confetti from "canvas-confetti";
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
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      zIndex: 9999,
    });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-opacity-30 backdrop-blur-md" />
      {/* Popup content */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-4 sm:p-8 max-w-3xl w-full flex flex-col items-center mx-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-2 text-center">🎉 Congratulations! 🎉</h2>
        <p className="text-base sm:text-lg text-gray-800 mb-4 text-center">You have completed all exercises for this lesson!</p>
        <div className="w-full space-y-4 mb-6">
          {exercises.map((ex, idx) => (
            <div key={ex.id} className="bg-[#fbb12410] rounded-lg shadow-md p-3 sm:p-4">
              <div className="font-semibold text-gray-800 mb-1">{idx + 1}. {ex.question}</div>
              <div className="text-green-700 font-bold">Answer: {ex.exerciseOptions && ex.exerciseOptions.length === 1 ? ex.exerciseOptions[0].text : "-"}</div>
            </div>
          ))}
        </div>
        <button
          onClick={onBack}
          className="w-full sm:w-auto mt-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-[1.02] focus:scale-[0.98] px-8 py-3 text-lg"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default LessonSummary; 