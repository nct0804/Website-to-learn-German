import { useEffect, useState } from "react";

interface Lesson {
  id: number;
  moduleId: number;
  title: string;
  description: string;
  order: number;
  xpReward: number;
  estimatedTime: number;
  createdAt: string;
  _count: { exercises: number };
}

interface Module {
  id: number;
  courseId: number;
  title: string;
  description?: string;
  order: number;
  requiredXP: number;
  xpReward: number;
  estimatedTime?: number;
  isLocked: boolean;
  lessons?: Lesson[]; // Will be added after fetching
}

export function useModulesWithLessons(courseId: number | null) {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setModules([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    // Fetch all modules for this course
    fetch("http://localhost:3000/api/modules")
      .then((res) => res.json())
      .then(async (data) => {
        const courseModules: Module[] = data.data.filter((m: Module) => m.courseId === courseId);
        // For each module, fetch lessons
        const modulesWithLessons = await Promise.all(
          courseModules.map(async (module) => {
            const res = await fetch(`http://localhost:3000/api/modules/${module.id}`);
            const moduleData = await res.json();
            return { ...module, lessons: moduleData.data.lessons || [] };
          })
        );
        setModules(modulesWithLessons);
      })
      .catch((error) => setError(error.message || "Failed to fetch modules"))
      .finally(() => setIsLoading(false));
  }, [courseId]);

  return { modules, isLoading, error };
}
