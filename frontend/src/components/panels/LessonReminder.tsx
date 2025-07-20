import { useNavigate } from "react-router-dom";
import { ClipboardList } from "lucide-react";

export default function LessonReminder({ lesson }: { lesson: { id: number, title: string, description?: string } | null }) {
  const navigate = useNavigate();
  if (!lesson) return null;
  return (
    <div className="relative bg-white dark:bg-gradient-to-br dark:from-[#174a6a] dark:via-[#256996] dark:to-[#3B6978] rounded-3xl shadow-lg flex flex-col items-center justify-center px-5 py-5">
      <div className="flex flex-col items-center justify-center w-full mb-2">
        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-orange-100 to-yellow-100 mb-2">
          <ClipboardList className="w-10 h-10 text-[#256996] dark:text-white" />
        </div>
        <span className="text-xs uppercase font-bold text-orange-500 tracking-wider mb-1">Next Lesson</span>
        <div className="font-semibold text-lg text-[#256996] dark:text-white text-center mb-1">{lesson.title}</div>
        {lesson.description && (
          <div className="text-gray-600 dark:text-gray-200 text-sm text-center mb-2">{lesson.description}</div>
        )}
      </div>
      <button
        onClick={() => navigate('/learn', { state: { lessonId: lesson.id } })}
        className="mt-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold rounded-xl shadow-lg transition active:scale-95 w-max mx-auto"
      >
        Learn
      </button>
    </div>
  );
}
