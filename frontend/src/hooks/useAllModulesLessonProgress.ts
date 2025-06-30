import { useEffect, useState } from "react";
import type { LessonModuleProgress } from "./useLessonModuleProgress";

export function useAllModulesLessonProgress(moduleIds: number[]) {
  const [data, setData] = useState<Record<number, LessonModuleProgress[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    if (!moduleIds.length) return;
    setLoading(true);
    setError(null);

    Promise.all(
      moduleIds.map(moduleId =>
        fetch(`${import.meta.env.VITE_API_PROXY_TARGET}/api/lesson/module/${moduleId}/progress`, {
          credentials: "include",
        })
          .then(async res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            if (!json.success) throw new Error("API returned success=false");
            return { moduleId, lessons: json.data as LessonModuleProgress[] };
          })
      )
    )
      .then(results => {
        const resultMap: Record<number, LessonModuleProgress[]> = {};
        results.forEach(({ moduleId, lessons }) => {
          resultMap[moduleId] = lessons;
        });
        setData(resultMap);
      })
      .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
  }, [moduleIds.join(",")]);

  return { data, loading, error };
} 