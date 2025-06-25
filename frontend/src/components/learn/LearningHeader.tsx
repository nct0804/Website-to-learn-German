import { CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import HeartIcon from "../../assets/heart.png"

interface LearningHeaderProps {
  progress: number
  hearts: number
  current: number
  total: number
}

export function LearningHeader({ progress, hearts, current, total }: LearningHeaderProps) {
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
        <div className="flex-1 flex flex-col items-center mx-10">
          <Progress value={progress} className="h-2 rounded-full w-full" />
          <span className="text-xs mt-1">{current} / {total} exercises</span>
        </div>
        <span className="text-xl font-medium flex">{hearts}
          <img src={HeartIcon} className="w-6 h-6 flex"/>
        </span>
      </div>
    </CardHeader>
  )
}
