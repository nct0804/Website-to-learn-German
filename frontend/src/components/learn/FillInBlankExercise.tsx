// No imports needed for ExerciseOption
import { useState } from "react"

export interface FillInBlankExerciseProps {
  prefix: string
  suffix: string
  onSelect: (text: string) => void
}

export function FillInBlankExercise({
  prefix,
  suffix,
  onSelect,
}: FillInBlankExerciseProps) {
  const [inputValue, setInputValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    onSelect(e.target.value);
  }

  return (
    <div className="flex flex-col space-y-8 w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-center">Fill in the blank</h2>
      <div className="flex justify-center items-center text-3xl space-x-2">
        <span>{prefix}</span>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="inline-block w-32 border-b-2 border-border text-center text-3xl bg-transparent focus:outline-none focus:border-[#fbb124]"
          placeholder="?"
        />
        <span>{suffix}</span>
      </div>
    </div>
  );
}