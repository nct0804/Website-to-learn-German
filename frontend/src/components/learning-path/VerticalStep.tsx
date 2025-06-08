import LearningStep from "./LearningStep";

interface StepProps {
    icon: React.ReactNode;
    active?: boolean;
}

export default function VerticalStep({steps}: {steps: StepProps[]}) {
    return (
        <>
            <div className="flex flex-col items-center relative gap-10 min-h-[400px]">
                {steps.map((step, i) => (
                    <LearningStep
                    key={i}
                    {...step}
                    first={i === 0}
                    last={i === steps.length - 1}
                    />
                ))}
            </div>
        </>
    )
}