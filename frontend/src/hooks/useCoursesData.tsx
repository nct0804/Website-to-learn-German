import { useEffect, useState } from "react";
import NumberIcon from "../assets/numbers.png"
import GreetingIcon from "../assets/greeting.png"

const courseIcons: Record<number, string> = {
  1: GreetingIcon,
  2: NumberIcon,
};

export interface Course {
  id: number;
  title: string;
  description: string;
  imageSrc?: string;
  level: string;
  order: number;
  isActive: boolean;
  modules: Module[];
  status: string;
  actionLabel: string;
}

export interface Module {
  id: number;
  courseId: number;
  title: string;
  order: number;
  isLocked: boolean;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  progress: number;
  status: string;
  description: string;
  icon: string;
  // TODO: isLearned is defined in the backend
  // TODO: status is defined in the backend
}

export function useCoursesData() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      fetch("http://localhost:3000/api/courses")
          .then((res) => res.json())
          .then((data) => {
              console.log("API Returned Data:", data.data);
              const apiCourses = Array.isArray(data.data) ? data.data : [];
              // Attach lessons to each module in each course
              const coursesWithLessons = apiCourses.map((course: Course) => ({
                ...course,
                imageSrc: courseIcons[course.id] || "",
              }));
              setCourses(coursesWithLessons);
              setIsLoading(false);
            })
            .catch(error => {
              setError(error.message || "Failed to fetch courses");
              setIsLoading(false);
            });
  }, []);

  return { courses, isLoading, error };
}