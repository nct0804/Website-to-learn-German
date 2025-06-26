import { useState } from "react";
import StartBubble from "./StartBubble";
import DetailBubble from "./DetailBubble";
import { useNavigate } from "react-router-dom";

export default function LearningStep({
  icon,
  first = false,
  last = false,
  active = false,
  learned = false,
  selected = false,
  title = "",
  subtitle = "",
  xpReward = "",
  lessonId,
  onClick,
  bubbleRef,
  blockedBubbleRef,
  nodeWrapperRef,
}: {
  icon: React.ReactNode;
  first?: boolean;
  last?: boolean;
  active?: boolean;
  learned?: boolean;
  selected?: boolean;
  title?: string;
  subtitle?: string;
  xpReward: string;
  lessonId?: number;
  onClick?: () => void;
  bubbleRef?: (el: HTMLDivElement | null) => void;
  blockedBubbleRef?: (el: HTMLDivElement | null) => void;
  nodeWrapperRef?: (el: HTMLDivElement | null) => void;
}) {
  const [pressed, setPressed] = useState(false);
  const navigate = useNavigate();

  const handleStartClick = (lessonId: number) => {
    navigate("/learn", {
      state: {lessonId: lessonId}
    });
  };

  const handlePracticeClick = () => {
    navigate("/learn");
  };

  return (
    <div className="flex flex-col items-center relative">
      {active && !selected && <StartBubble />}

      {/* Connection Path */}
      {!first && (
        <div className="w-2 h-5 bg-[#E5E5E5] absolute -top-5 left-1/2 -translate-x-1/2"></div>
      )}

      <div ref={nodeWrapperRef} className="relative flex flex-col items-center">
        {/* Shadow */}
        <div
          className={`
            absolute w-20 h-19 rounded-full z-0
            bg-[#3b6978a7] left-1/2 -translate-x-1/2
            transition-all duration-100 pointer-events-none
            ${pressed ? "translate-y-4 opacity-0" : "translate-y-3 opacity-80"}
          `}
          style={{ top: 0 }}
        />

        {/* Circle lesson node*/}
        <button
          className={`
            relative z-10 w-20 h-19 rounded-full flex items-center justify-center
            transition-all duration-100
            shadow-md
            cursor-pointer
            ${pressed ? "translate-y-4" : ""}
            ${active || learned ? "bg-[#3B6978] border-[6px] border-[#E5E5E5]" : "bg-[#FFFBF3] border-none"}
          `}
          onClick={onClick}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
        >
          <span className="relative z-20">{icon}</span>
        </button>
      </div>

      {/* BUBBLES */}
      {selected && (
        active ? ( // Wait for backend to isLearned variable
          <DetailBubble
            ref={bubbleRef}
            title={title}
            subtitle={subtitle || ""}
            buttonLabel="START"
            xp={`+` + xpReward + `XP`}
            style={{
              backgroundColor: "white",
              color: '#fbb124',
            }}
            onClick={() => handleStartClick(lessonId || 0)}
          />
        ) : learned ? ( // Wait for backend to isLearned variable
          <DetailBubble
            ref={bubbleRef}
            title={title}
            subtitle={subtitle || ""}
            buttonLabel="PRACTICE"
            xp={`+` + xpReward + `XP`}
            style={{
              backgroundColor: "#3B6978",
              color: "white",
            }}
            onClick={handlePracticeClick}
          />
        ) : (
          <DetailBubble
            ref={blockedBubbleRef}
            title={title}
            subtitle={subtitle || ""}
            buttonLabel="LOCKED"
            style={{
              backgroundColor: "white",
              color: "#E5E5E5",
              cursor: "not-allowed"
            }}
            blockedStyle={{
              backgroundColor: "#E5E5E5",
              color: "black",
            }}
            onClick={() => {}}
          />
        )
      )}
      
      {/* Connection Path */}
      {!last && (
        <div className="w-2 h-5 bg-[#E5E5E5] absolute -bottom-5 left-1/2 -translate-x-1/2"></div>
      )}
    </div>
  );
}
