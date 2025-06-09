import { useState } from "react";
import StartBubble from "./StartBubble";
import DetailBubble from "./DetailBubble";
import LockedBubble from "./LockedBubble";
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
  onClick?: () => void;
  bubbleRef?: (el: HTMLDivElement | null) => void;
  blockedBubbleRef?: (el: HTMLDivElement | null) => void;
  nodeWrapperRef?: (el: HTMLDivElement | null) => void;
}) {
  const [pressed, setPressed] = useState(false);
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/learn");
  };

  const handlePracticeClick = () => {
    navigate("/learn");
  };

  return (
    <div className="flex flex-col items-center relative">
      {active && !selected && <StartBubble />}

      {!first && (
        <div className="w-1 h-5 bg-[#E5E5E5] absolute -top-5 left-1/2 -translate-x-1/2"></div>
      )}

      <div ref={nodeWrapperRef} className="relative flex flex-col items-center">
        <div
          className={`
            absolute w-20 h-19 rounded-full z-0
            bg-[#3b6978a7] left-1/2 -translate-x-1/2
            transition-all duration-100 pointer-events-none
            ${pressed ? "translate-y-4 opacity-0" : "translate-y-3 opacity-80"}
          `}
          style={{ top: 0 }}
        />

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
        active ? (
          <DetailBubble
            ref={bubbleRef}
            title={title}
            subtitle={subtitle || ""}
            buttonLabel="START"
            xp="+10XP"
            style={{
              backgroundColor: "white",
              color: '#fbb124',
            }}
            onClick={handleStartClick}
          />
        ) : learned ? (
          <DetailBubble
            ref={bubbleRef}
            title={title}
            subtitle={subtitle || ""}
            buttonLabel="PRACTICE"
            xp="+5XP"
            style={{
              backgroundColor: "#3B6978",
              color: "white",
            }}
            onClick={handlePracticeClick}
          />
        ) : (
          <LockedBubble ref={blockedBubbleRef} message="You need to complete previous steps first." />
        )
      )}
      {!last && (
        <div className="w-1 h-5 bg-[#E5E5E5] absolute -bottom-5 left-1/2 -translate-x-1/2"></div>
      )}
    </div>
  );
}
