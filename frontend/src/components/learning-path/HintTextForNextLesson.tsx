export default function HintTextForNextLesson({ label }: { label: string }) {
    return (
      <div className="flex items-center w-full my-8">
        <div className="flex-1 h-1 bg-[#FFFBF3] rounded" />
        <span className="mx-4 text-[#406877] text-base">{label}</span>
        <div className="flex-1 h-1 bg-[#FFFBF3] rounded" />
      </div>
    );
  }
  