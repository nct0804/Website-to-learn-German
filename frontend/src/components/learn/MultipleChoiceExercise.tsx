import { Button } from "@/components/ui/button"
import type { ExerciseOption } from "@/hooks/useLessonExercises"

export interface MultipleChoiceExerciseProps {
  question: string
  instruction?: string
  options: ExerciseOption[]
  selected: number | null
  onSelect: (id: number) => void
}

export function MultipleChoiceExercise({
  question,
  instruction,
  options,
  selected,
  onSelect,
}: MultipleChoiceExerciseProps) {
  return (
    <div className="flex flex-col space-y-6 w-full max-w-lg">
      <h2 className="text-3xl font-bold text-center">{question}</h2>
      {instruction && <p className="text-center text-sm text-gray-600">{instruction}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {options.map((opt) => (
          <Button
            key={opt.id}
            variant={selected === opt.id ? "secondary" : "outline"}
            className="text-lg font-semibold p-10 m-2 min-h-[64px] whitespace-normal break-words w-full"
            onClick={() => onSelect(opt.id)}
          >
            {opt.text}
          </Button>
        ))}
      </div>
    </div>
  )
}