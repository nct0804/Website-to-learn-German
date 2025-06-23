import { Card } from "@/components/ui/card"
import { LearningHeader } from "@/components/learn/LearningHeader"
import { LearningContent } from "@/components/learn/LearningContent"
import { motion } from "framer-motion"
import type { Exercise } from "../components/types/courseProgress"
import { useLocation } from "react-router-dom"

export default function Learn() {
  const { state } = useLocation()
  const exercises: Exercise[] = state?.exercises || []

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-center min-h-screen bg-[#FFB939]">
        <div className="w-full max-w-7xl">
          <Card className="min-h-[90vh] flex flex-col">
            <LearningHeader progress={10} score={5} />
            <div className="flex flex-1 overflow-hidden">
              <LearningContent exercises={exercises}/>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
