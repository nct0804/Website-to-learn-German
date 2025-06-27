import { useState, useEffect, useRef } from "react"
import { CardContent } from "@/components/ui/card"
import { FillInBlankExercise } from "./FillInBlankExercise"
import { MultipleChoiceExercise } from "./MultipleChoiceExercise"
import { VocabCheckExercise } from "./VocabCheckExercise"
import LearningFooter from "./LearningFooter"
import { useLessonExercises } from "@/hooks/useLessonExercises"
import { useExerciseCheck } from "@/hooks/useExerciseCheck"
import { useNavigate } from "react-router-dom"
import LessonSummary from "./LessonSummary"
import { Button } from "@/components/ui/button"

export function LearningContent({ 
  lessonId, 
  onProgressChange 
}: { lessonId: number, onProgressChange?: (current: number, total: number, summary?: boolean) => void }) {
  const { exercises, loading, error } = useLessonExercises(lessonId)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const { checkExercise, checkResult, checking, resetCheck } = useExerciseCheck()
  const navigate = useNavigate()
  const feedbackRef = useRef<HTMLDivElement>(null)
  const [showTick, setShowTick] = useState(false)

  useEffect(() => {
    if (onProgressChange) {
      onProgressChange(currentIdx + 1, exercises.length, currentIdx >= exercises.length)
    }
  }, [currentIdx, exercises.length, onProgressChange])

  // Animated feedback for correct/incorrect answers
  useEffect(() => {
    if (!checkResult) return;
    if (checkResult.isCorrect) {
      setShowTick(true);
      setTimeout(() => setShowTick(false), 2000); // 2 seconds
    } else if (feedbackRef.current) {
      feedbackRef.current.classList.remove("animate-shake");
      void feedbackRef.current.offsetWidth;
      feedbackRef.current.classList.add("animate-shake");
    }
  }, [checkResult]);

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
      }, 2500) // Show result for 2.5 seconds
    }
  }

  // If we have a check result, show feedback
  if (checkResult) {
    return (
      <CardContent className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div
          ref={feedbackRef}
          className={`relative text-center space-y-4 ${checkResult.isCorrect ? 'text-green-600' : 'text-red-600'}`}
        >
          {showTick && (
            <svg
              className="absolute left-1/2 -translate-x-1/2 -top-20 w-28 h-28 text-green-500 animate-tick"
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="4" fill="white" />
              <path d="M16 27L24 35L38 19" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <p className="text-lg">{checkResult.feedback}</p>
          {checkResult.isCorrect && (
            <div className="text-sm text-gray-600 mt-10">
              <p>XP earned: {checkResult.xpReward}</p>
              <p>Streak: {checkResult.currentStreak}</p>
            </div>
          )}
          <div className="mt-6">
            {!checkResult.isCorrect && (
              <Button
              onClick={() => {
                setSelected(null)
                setSelectedText(null)
                resetCheck()
              }}
              className="h-10 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-[1.02] focus:scale-[0.98]"
            >
              Try Again
            </Button>
            )}
          </div>
        </div>
      </CardContent>
    )
  }

  // Show congratulatory message and summary if all exercises are finished
  if (currentIdx >= exercises.length) {
    return (
      <LessonSummary exercises={exercises} onBack={() => navigate(-1)} />
    );
  }

  return (
    <CardContent className="flex-1 flex flex-col items-center px-6 py-8">
      <div className="flex-1 flex flex-col justify-center items-center space-y-8 w-full">
        {ex.type === "FILL_IN_BLANK" && (() => {
          // Extract the part after the colon (if present)
          const fillText = ex.question.includes(":") ? ex.question.split(":").slice(1).join(":").trim() : ex.question;
          const [prefix, suffix] = fillText.split("_____");
          return (
            <FillInBlankExercise
              prefix={prefix || ""}
              suffix={suffix || ""}
              instruction={ex.instruction}
              onSelect={(text) => {
                setSelectedText(text)
              }}
            />
          );
        })()}
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
