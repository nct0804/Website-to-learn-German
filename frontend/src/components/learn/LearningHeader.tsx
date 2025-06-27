import { CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import HeartIcon from "../../assets/heart.png"
import React, { useState } from "react";

interface LearningHeaderProps {
  progress: number
  hearts: number
  current: number
  total: number
}

export default function LearningHeader({ progress, hearts, current, total }: LearningHeaderProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleBack = () => {
    setShowConfirm(true);
  };

  const handleContinue = () => {
    setShowConfirm(false);
  };

  const handleBackToHome = () => {
    window.location.href = "/home";
  };

  return (
    <>
      <CardHeader>
        <div className="flex justify-between items-center px-6">
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="text-xl text-muted-foreground hover:text-foreground transition cursor-pointer"
          >
            X
          </button>
          <div className="flex-1 flex flex-col items-center mx-10">
            <Progress value={progress} className="h-2 rounded-full w-full" />
            <span className="text-xs mt-1">{current} / {total} exercises</span>
          </div>
          <span className="text-xl font-medium flex">{hearts}
            <img src={HeartIcon} className="w-6 h-6 flex"/>
          </span>
        </div>
      </CardHeader>
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-xs w-full flex flex-col items-center mx-2">
            <div className="text-lg font-bold text-red-600 mb-2 text-center">Don't go!</div>
            <div className="text-gray-700 text-center mb-4">Your progress will not be counted if you leave now. Are you sure you want to exit?</div>
            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={handleContinue}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg py-2 transition"
              >
                Continue
              </button>
              <button
                onClick={handleBackToHome}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg py-2 transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
