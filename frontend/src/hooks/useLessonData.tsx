import { useEffect, useState } from "react";
import NumberIcon from "../assets/numbers.png"
import GreetingIcon from "../assets/greeting.png"
import IntroduceYourselfIcon from "../assets/introduce-yourself.png"
import Number12Icon from "../assets/number12.png"
import Number100Icon from "../assets/number100.png"
import SpeechIcon from "../assets/speech.png"
import QuestionIcon from "../assets/question.png"
import OrdinalNumberIcon from "../assets/ordinalnumber.png"
import EverydayPhrasesIcon from "../assets/everydayphrases.png"
import AgeIcon from "../assets/age.png"

const lessonIcons: Record<number, string> = {
    7: NumberIcon,
    4: GreetingIcon,
    1: IntroduceYourselfIcon,
    6: Number12Icon,
    9: Number100Icon,
    2: SpeechIcon,
    3: QuestionIcon,
    8: OrdinalNumberIcon,
    5: EverydayPhrasesIcon,
    10: AgeIcon,
};

export interface Lesson {
    id: number;
    title: string;
    progress: number;
    status: string;
    actionLabel: string;
    description: string;
    icon: string;
    // TODO: isLearned is defined in the backend
    // TODO: status is defined in the backend
  }

export function useLessonData() {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/lesson")
            .then((res) => res.json())
            .then((data) => {
                console.log("API Returned Data:", data.data);
                const apiLessons = Array.isArray(data.data) ? data.data : [];
                const lessonsWithIcons = apiLessons.map((lesson: Lesson) => ({
                    ...lesson,
                    icon: lessonIcons[lesson.id]
                }));
                setLessons(lessonsWithIcons);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message || "Failed to fetch lessons");
                setIsLoading(false);
            });
    }, []);

    return { lessons, isLoading, error };
}