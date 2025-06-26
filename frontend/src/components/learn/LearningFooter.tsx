import { Button } from "@/components/ui/button"

interface LearningFooterProps {
    handleCheck: () => void
    selected: boolean
    checking?: boolean
    exerciseType?: string
}

export default function LearningFooter( { handleCheck, selected, checking = false, exerciseType }: LearningFooterProps) {
    const isVocabCheck = exerciseType === "VOCABULARY_CHECK";
    return (
        <div className="w-full max-w-sm flex justify-between mt-auto">
            <Button variant="ghost" className="text-lg" disabled={checking}>
                Skip
            </Button>
            <Button
                className="py-3 px-8 text-lg bg-[#FFB939]"
                onClick={handleCheck}
                disabled={!selected || checking}
            >
                {isVocabCheck ? "Continue" : (checking ? "Checking..." : "Check")}
            </Button>
        </div>
    )
}