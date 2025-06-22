import { useState, useEffect } from "react"
import { useAuth } from "./useAuth.tsx"
import type { CourseProgressResponse, CourseProgress } from "../components/types/courseProgress.ts"

export default function useCoursesWithProgress() {
  const { accessToken } = useAuth()
  const [courses, setCourses] = useState<CourseProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!accessToken) {
      setError(new Error("Not authenticated"))
      setLoading(false)
      return
    }

    setLoading(true)
    fetch(`http://localhost:3000/api/courses/progress/all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = (await res.json()) as CourseProgressResponse
        if (!json.success) throw new Error("API returned success=false")
        return json.data
      })
      .then((data) => {
        // sort by order ascending
        data.sort((a, b) => a.order - b.order)
        // also sort each module & lesson inside
        data.forEach((course) => {
          course.modules.sort((m1, m2) => m1.order - m2.order)
          course.modules.forEach((mod) =>
            mod.lessons.sort((l1, l2) => l1.order - l2.order)
          )
        })
        setCourses(data)
      })
      .catch((err) => {
        console.error("useCoursesWithProgress:", err)
        setError(err instanceof Error ? err : new Error(String(err)))
      })
      .finally(() => setLoading(false))
  }, [accessToken])

  return { courses, loading, error }
}
