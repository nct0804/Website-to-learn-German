import { Card } from "@/components/ui/card"
import { LearningHeader } from "@/components/learn/LearningHeader"
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

  // Handler to update progress from LearningContent
  const handleProgressChange = (current: number, total: number) => {
    setCurrentIdx(current);
    setTotal(total);
  };

  // Calculate progress percentage
  const progress = total > 0 ? (currentIdx / total) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-center min-h-screen bg-[#FFB939]">
        <div className="w-full max-w-4xl">
          <Card className="min-h-[90vh] flex flex-col rounded-3xl">
            <LearningHeader progress={progress} hearts={5} current={currentIdx} total={total} />
            <div className="flex flex-1 overflow-hidden">
              <LearningContent lessonId={lessonId} onProgressChange={handleProgressChange} />
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
