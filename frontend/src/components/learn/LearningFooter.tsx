
import { Button } from "@/components/ui/button"

interface LearningFooterProps {
    handleCheck: () => void
    selected: boolean
}

export default function LearningFooter( { handleCheck, selected }: LearningFooterProps) {
    return (
        <div className="w-full max-w-sm flex justify-between mt-auto">
            <Button variant="ghost" className="text-lg">
                Skip
            </Button>
            <Button
                className="py-3 px-8 text-lg"
                onClick={handleCheck}
                disabled={!selected}
            >
                Check
            </Button>
        </div>
    )
}