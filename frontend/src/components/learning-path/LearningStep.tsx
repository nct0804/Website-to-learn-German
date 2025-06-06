// src/components/LearningStep.tsx
import React from "react";

interface LearningStepProps {
  icon: React.ReactNode;
  first?: boolean;
  last?: boolean;
  active?: boolean;
}

export default function LearningStep({
  icon,
  first = false,
  last = false,
  active = false,
}: LearningStepProps) {
  return (
    <div className="flex flex-col items-center relative">
      {/* Top line (hidden for first) */}
      {!first && (
        <div className="w-1 h-5 bg-[#E5E5E5] absolute -top-5 left-1/2 -translate-x-1/2"></div>
      )}
      <div
        className={`
          w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10
          ${active ? "bg-[#29547B]" : "bg-[#FFF4E1]"}
        `}
      >
        {icon}
      </div>
      {/* Bottom line (hidden for last) */}
      {!last && (
        <div className="w-1 h-5 bg-[#E5E5E5] absolute -bottom-5 left-1/2 -translate-x-1/2"></div>
      )}
    </div>
  );
}
