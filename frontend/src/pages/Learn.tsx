import { Card } from "@/components/ui/card"
import LearningHeader from "@/components/learn/LearningHeader"
import LearningContent from "@/components/learn/LearningContent"
import { motion } from "framer-motion"
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import LoadingScreen from "@/components/learn/LoadingScreen"
import { useAuth } from "@/hooks/useAuth"

export default function Learn() {
  const { state } = useLocation()
  const lessonId: number = state?.lessonId;
  // Track current exercise index and total
  const [currentIdx, setCurrentIdx] = useState(0);
  const [total, setTotal] = useState(0);
  const [isSummary, setIsSummary] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const { user, loading } = useAuth();

  useEffect(() => {
    setShowLoading(true);
    const timer = setTimeout(() => setShowLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []); // Only run on first mount

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
      data-test="page-learn"
    >
      <div className="flex items-center justify-center min-h-screen h-screen w-screen px-50 py-10" data-test="learn-container">
        <div className="w-full h-full">
          <Card className="h-full min-h-screen flex flex-col rounded-none border-none" data-test="learn-card">
            {/* Only show header if not summary */}
            {!isSummary && !showLoading && (
            <div data-test="learn-header">
              <LearningHeader progress={progress} hearts={user?.hearts ?? 0} />
            </div>
            )}
            <div className="flex flex-1 overflow-hidden h-full" data-test="learn-content">
              {!user || loading || showLoading ? (
                <div data-test="learn-loading">
                  <LoadingScreen message="Get ready to learn!" />
                </div>
              ) : (
              <div data-test="learn-lesson">
                <LearningContent lessonId={lessonId} onProgressChange={handleProgressChange} />
              </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
