import { Button } from "@/components/ui/button"
import type { ExerciseOption } from "@/hooks/useLessonExercises"

export interface FillInBlankExerciseProps {
  prefix: string
  suffix: string
  options: ExerciseOption[]
  selected: number | null
  onSelect: (id: number) => void
}

export function FillInBlankExercise({
  prefix,
  suffix,
  options,
  selected,
  onSelect,
}: FillInBlankExerciseProps) {
  return (
    <div className="flex flex-col space-y-8 w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-center">Fill in the blank</h2>
      <div className="flex justify-center items-center text-3xl space-x-2">
        <span>{prefix}</span>
        <span className="inline-block w-32 border-b-2 border-border"></span>
        <span>{suffix}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {options.map((opt) => (
          <Button
            key={opt.id}
            variant={selected === opt.id ? "secondary" : "outline"}
            className="py-3 text-lg"
            onClick={() => onSelect(opt.id)}
          >
            {opt.text}
          </Button>
        ))}
      </div>
    </div>
  )
}