import LearningTopBar from "../components/learn/LearningTopBar";
import LearningContent from "../components/learn/LearningContent";

export default function Learn() {
  return (
    <div className="flex flex-col h-screen">
      <LearningTopBar />
      <div className="flex flex-1 overflow-hidden h-full">
        <LearningContent />
      </div>
    </div>
  );
}