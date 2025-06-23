import { CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import HeartIcon from "../../assets/heart.png"

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
        <span className="text-xl font-medium flex">{score}
          <img src={HeartIcon} className="w-6 h-6 flex"/>
        </span>
      </div>
    </CardHeader>
  )
}
