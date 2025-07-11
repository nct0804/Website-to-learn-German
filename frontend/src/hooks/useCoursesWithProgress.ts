import { useState, useEffect } from "react";
import type {
  CourseProgressResponse,
  CourseProgress,
} from "../components/types/courseProgress.ts";

export default function useCoursesWithProgress() {
  const [courses, setCourses] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_PROXY_TARGET}/api/courses/progress/all`, {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as CourseProgressResponse;
        if (!json.success) throw new Error("API returned success=false");
        return json.data;
      })
      .then((data) => {
        // sort by order ascending
        data.sort((a, b) => a.order - b.order);
        // also sort each module & lesson inside
        data.forEach((course) => {
          course.modules.sort((m1, m2) => m1.order - m2.order);
          course.modules.forEach((mod) =>
            mod.lessons.sort((l1, l2) => l1.order - l2.order)
          );
        });
        setCourses(data);
      })
      .catch((err) => {
        console.error("useCoursesWithProgress:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => setLoading(false));
  }, []);

  return { courses, loading, error };
}
