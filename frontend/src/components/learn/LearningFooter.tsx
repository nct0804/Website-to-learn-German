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
        <div className="w-full flex justify-end items-center px-50 py-10 mt-auto">
            <Button
                className="h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-[1.02] focus:scale-[0.98]"
                onClick={handleCheck}
                disabled={!selected || checking}
            >
                {isVocabCheck ? "Continue" : (checking ? "Checking..." : "Check")}
            </Button>
        </div>
    )
}