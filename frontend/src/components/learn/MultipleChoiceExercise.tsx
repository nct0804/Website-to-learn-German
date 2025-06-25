import { Button } from "@/components/ui/button"
import type { ExerciseOption } from "@/hooks/useLessonExercises"

export interface MultipleChoiceExerciseProps {
  question: string
  options: ExerciseOption[]
  selected: number | null
  onSelect: (id: number) => void
}

export function MultipleChoiceExercise({
  question,
  options,
  selected,
  onSelect,
}: MultipleChoiceExerciseProps) {
  return (
    <div className="flex flex-col space-y-6 w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-center">{question}</h2>
      <div className="flex flex-col space-y-4">
        {options.map((opt) => (
          <Button
            key={opt.id}
            variant={selected === opt.id ? "secondary" : "outline"}
            className="text-lg"
            onClick={() => onSelect(opt.id)}
          >
            {opt.text}
          </Button>
        ))}
      </div>
    </div>
  )
}