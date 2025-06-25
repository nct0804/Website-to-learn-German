import { useState } from "react"
import { CardContent } from "@/components/ui/card"
import { FillInBlankExercise } from "./FillInBlankExercise"
import { MultipleChoiceExercise } from "./MultipleChoiceExercise"
import { VocabCheckExercise } from "./VocabCheckExercise"
import LearningFooter from "./LearningFooter"
import { useLessonExercises } from "@/hooks/useLessonExercises"

export function LearningContent({ lessonId }: { lessonId: number }) {
  const { exercises, loading, error } = useLessonExercises(lessonId)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)

  if (loading) return <div className="p-8 text-center">Loading…</div>
  if (error) return <div className="p-8 text-center text-red-500">{error.message}</div>
  if (!exercises.length) return <div className="p-8 text-center">No exercises found.</div>

  const ex = exercises[currentIdx]

  function handleCheck() {
    // check correctness, move to next, etc.
    setSelected(null)
    setCurrentIdx(idx => idx + 1)
  }

  return (
    <CardContent className="flex-1 flex flex-col items-center px-6 py-8">
      <div className="flex-1 flex flex-col justify-center items-center space-y-8 w-full">
        {ex.type === "FILL_IN_BLANK" && (
          <FillInBlankExercise
            prefix={ex.question.split("_____")[0] || ""}
            suffix={ex.question.split("_____")[1] || ""}
            options={ex.exerciseOptions}
            selected={selected}
            onSelect={setSelected}
          />
        )}
        {ex.type === "MULTIPLE_CHOICE" && (
          <MultipleChoiceExercise
            question={ex.question}
            options={ex.exerciseOptions}
            selected={selected}
            onSelect={setSelected}
          />
        )}
        {ex.type === "VOCABULARY_CHECK" && (
          <VocabCheckExercise
            instruction={ex.instruction}
            items={ex.exerciseOptions}
            selected={selected}
            onSelect={setSelected}
          />
        )}
      </div>
      <LearningFooter handleCheck={handleCheck} selected={!!selected} />
    </CardContent>
  )
}
