import { useState, useEffect } from "react"
import { CardContent } from "@/components/ui/card"
import { FillInBlankExercise } from "./FillInBlankExercise"
import { MultipleChoiceExercise } from "./MultipleChoiceExercise"
import { VocabCheckExercise } from "./VocabCheckExercise"
import LearningFooter from "./LearningFooter"
import { useLessonExercises } from "@/hooks/useLessonExercises"
import { useExerciseCheck } from "@/hooks/useExerciseCheck"
import { useNavigate } from "react-router-dom"

export function LearningContent({ lessonId, onProgressChange }: { lessonId: number, onProgressChange?: (current: number, total: number, summary?: boolean) => void }) {
  const { exercises, loading, error } = useLessonExercises(lessonId)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const { checkExercise, checkResult, checking, resetCheck } = useExerciseCheck()
  const navigate = useNavigate()

  useEffect(() => {
    if (onProgressChange) {
      onProgressChange(currentIdx + 1, exercises.length, currentIdx >= exercises.length)
    }
  }, [currentIdx, exercises.length, onProgressChange])

  if (loading) return console.log("Loading exercises for lessonId: ", lessonId)
  if (error) return console.log("Error: ", error)
  if (!exercises.length) return console.log("No exercises found for lessonId: ", lessonId)

  const ex = exercises[currentIdx]

  async function handleCheck() {
    if (selected === null && selectedText === null) return

    if (ex.type === "VOCABULARY_CHECK") {
      setSelected(null)
      setSelectedText(null)
      resetCheck()
      setCurrentIdx(idx => idx + 1)
      return
    }
    
    let answer: number | string
    if (ex.type === "FILL_IN_BLANK") {
      answer = selectedText || ""
    } else {
      answer = selected || 0
    }
    
    const result = await checkExercise(ex.id, answer)
    
    // If correct, move to next exercise after a short delay
    if (result.isCorrect) {
      setTimeout(() => {
        setSelected(null)
        setSelectedText(null)
        resetCheck()
        setCurrentIdx(idx => idx + 1)
      }, 2000) // Show result for 2 seconds
    }
  }

  // If we have a check result, show feedback
  if (checkResult) {
    return (
      <CardContent className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className={`text-center space-y-4 ${checkResult.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
          <h2 className="text-2xl font-bold">
            {checkResult.isCorrect ? 'Correct!' : 'Incorrect'}
          </h2>
          <p className="text-lg">{checkResult.feedback}</p>
          {!checkResult.isCorrect && (
            <p className="text-sm text-gray-600">
              Correct answer: {checkResult.correctAnswer}
            </p>
          )}
          {checkResult.isCorrect && (
            <div className="text-sm text-gray-600">
              <p>XP earned: {checkResult.xpReward}</p>
              <p>Streak: {checkResult.currentStreak}</p>
            </div>
          )}
          <div className="mt-6">
            {checkResult.isCorrect ? (
              <button
                onClick={() => {
                  setSelected(null)
                  setSelectedText(null)
                  resetCheck()
                  setCurrentIdx(idx => idx + 1)
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelected(null)
                  setSelectedText(null)
                  resetCheck()
                }}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </CardContent>
    )
  }

  // Show congratulatory message and summary if all exercises are finished
  if (currentIdx >= exercises.length) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-50">
        {/* Blurred background */}
        <div className="absolute inset-0 bg-opacity-30 backdrop-blur-md" />
        {/* Popup content */}
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full flex flex-col items-center">
          <h2 className="text-3xl font-bold text-green-600 mb-2">🎉 Congratulations! 🎉</h2>
          <p className="text-lg text-gray-800 mb-4">You have completed all exercises for this lesson!</p>
          <div className="w-full space-y-4 mb-6">
            {exercises.map((ex, idx) => (
              <div key={ex.id} className="bg-[#fbb12410] rounded-lg shadow-md p-4">
                <div className="font-semibold text-gray-800 mb-1">{idx + 1}. {ex.question}</div>
                <div className="text-green-700 font-bold">Answer: {ex.exerciseOptions && ex.exerciseOptions.length === 1 ? ex.exerciseOptions[0].text : "-"}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-2 bg-[#fbb124] text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-[#e0a800] transition-colors"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    );
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
            onSelect={(text) => {
              setSelectedText(text)
              // Find the option ID for visual selection
              const option = ex.exerciseOptions.find(opt => opt.text === text)
              setSelected(option?.id || null)
            }}
          />
        )}
        {ex.type === "MULTIPLE_CHOICE" && (
          <MultipleChoiceExercise
            question={ex.question}
            instruction={ex.instruction}
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
      <LearningFooter 
        handleCheck={handleCheck} 
        selected={!!selected || !!selectedText} 
        checking={checking}
        exerciseType={ex.type}
      />
    </CardContent>
  )
}
