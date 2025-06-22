import { CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface LearningHeaderProps {
  progress: number
  score: number
}

export function LearningHeader({ progress, score }: LearningHeaderProps) {
    
  return (
    <CardHeader>
      <div className="flex justify-between items-center px-6">
        <button
          onClick={() => window.history.back()}
          aria-label="Go back"
          className="text-xl text-muted-foreground hover:text-foreground transition cursor-pointer"
        >
          X
        </button>
        <Progress value={progress} className="flex-1 h-2 rounded-full mx-10" />
        <span className="text-sm font-medium">{score} ❤️</span>
      </div>
    </CardHeader>
  )
}
