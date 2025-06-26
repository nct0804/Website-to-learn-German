// No imports needed for ExerciseOption
import { useState } from "react"

export interface FillInBlankExerciseProps {
  prefix: string
  suffix: string
  onSelect: (text: string) => void
  instruction?: string
}

export function FillInBlankExercise({
  prefix,
  suffix,
  onSelect,
  instruction,
}: FillInBlankExerciseProps) {
  const [inputValue, setInputValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    onSelect(e.target.value);
  }

  return (
    <div className="flex flex-col space-y-8 w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-center mb-8 block">{instruction}</h2>
      <div className="flex justify-center items-center text-3xl space-x-2 mb-4">
        <div className="text-3xl">{prefix}</div>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="inline-block w-32 border-b-2 border-[#fbb124] text-center text-3xl bg-transparent focus:outline-none focus:border-[#408297]"
        />
        <div className="text-3xl">{suffix}</div>
      </div>
    </div>
  );
}