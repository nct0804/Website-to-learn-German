import { useState, useRef, useEffect } from "react";
import LearningStep from "./LearningStep";


export default function VerticalStep({ steps }: { steps: any[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // One ref for each node wrapper
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  // One ref for each bubble (may be undefined)
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Return true if click is in ANY node or ANY bubble
      const clickedInsideNode = nodeRefs.current.some(
        ref => ref && ref.contains(event.target as Node)
      );
      const clickedInsideBubble = bubbleRefs.current.some(
        ref => ref && ref.contains(event.target as Node)
      );
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !clickedInsideNode &&
        !clickedInsideBubble
      ) {
        setSelectedIndex(null);
      }
    }
    if (selectedIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [selectedIndex]);

  function handleNodeClick(i: number) {
    setSelectedIndex((prev) => (prev === i ? null : i));
  }

  return (
    <div
      className="flex flex-col items-center relative gap-10 min-h-[400px] w-0 mx-auto my-45"
      ref={containerRef}
    >
      {steps.map((step, i) => (
        <LearningStep
          key={i}
          title={step.title}
          description={step.description || ""}
          {...step}
          icon={
            step.icon ? (
              <img src={step.icon} alt={step.title} className="w-18 h-18" />
            ) : null
          }
          first={i === 0}
          last={i === steps.length - 1}
          active={i === 0}             
          learned={false} 
          selected={selectedIndex === i}
          onClick={() => handleNodeClick(i)}
          nodeWrapperRef={el => (nodeRefs.current[i] = el)}
          bubbleRef={el => (bubbleRefs.current[i] = el)}
        />
      ))}
    </div>
  );
}
