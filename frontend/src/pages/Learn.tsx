import { Card } from "@/components/ui/card"
import LearningHeader from "@/components/learn/LearningHeader"
import { LearningContent } from "@/components/learn/LearningContent"
import { motion } from "framer-motion"
import { useLocation } from "react-router-dom"
import { useState } from "react"

export default function Learn() {
  const { state } = useLocation()
  const lessonId: number = state?.lessonId;
  // Track current exercise index and total
  const [currentIdx, setCurrentIdx] = useState(0);
  const [total, setTotal] = useState(0);
  const [isSummary, setIsSummary] = useState(false);

  // Handler to update progress from LearningContent
  const handleProgressChange = (current: number, total: number, summary: boolean = false) => {
    setCurrentIdx(current);
    setTotal(total);
    setIsSummary(summary);
  };

  // Calculate progress percentage
  const progress = total > 0 ? (Math.min(currentIdx, total) / total) * 100 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-center min-h-screen h-screen w-screen px-50 py-10">
        <div className="w-full h-full">
          <Card className="h-full min-h-screen flex flex-col rounded-none border-none">
            {/* Only show header if not summary */}
            {!isSummary && (
              <LearningHeader progress={progress} hearts={5} current={Math.min(currentIdx, total)} total={total} />
            )}
            <div className="flex flex-1 overflow-hidden h-full">
              <LearningContent lessonId={lessonId} onProgressChange={handleProgressChange} />
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
