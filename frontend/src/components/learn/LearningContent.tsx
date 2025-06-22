import { useState } from "react"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import LearningFooter from "./LearningFooter"

export function LearningContent() {
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(5)

  const options = [
    { label: "bin", value: "bin" },
    { label: "bist", value: "bist" },
  ]
  const correct = "bin"

  function handleSelect(val: string) {
    setSelected(val)
  }

  function handleCheck() {
    if (selected !== correct) {
      console.log("Wrong answer!")
    }
    // …next exercise…
  }

  return (
    <CardContent className="flex-1 flex flex-col items-center px-6 py-8">
      {/* Centered block */}
      <div className="flex-1 flex flex-col justify-center items-center space-y-8">
        <h2 className="text-2xl font-semibold">Fill in the blank</h2>
        <div className="text-center text-3xl">
          <span>Ich </span>
          <span className="inline-block w-32 border-b-2 border-border"></span>
          <span> Tom.</span>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {options.map((opt) => (
            <Button
              key={opt.value}
              className="py-3 text-lg"
              variant={selected === opt.value ? "secondary" : "outline"}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      <LearningFooter
        handleCheck={handleCheck}
        selected={!!selected}
      ></LearningFooter>
    </CardContent>
  )
}
