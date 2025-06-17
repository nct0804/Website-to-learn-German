import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../../utils/errors';
import { Course } from '@prisma/client';

const prisma = new PrismaClient();
interface FindCoursesParams {
  level?: string;
  searchTerm?: string;
}

interface CreateCourseParams {
  title: string;
  description: string;
  level: string;
  imageSrc?: string;
  order: number;
}

interface UpdateCourseParams {
  title?: string;
  description?: string;
  level?: string;
  imageSrc?: string;
  order?: number;
}

export const findCourses = async ({ level, searchTerm }: FindCoursesParams = {}) => {
  // Build where clause based on provided filters
  const where: any = {};
  
  if (level) {
    where.level = level;
  }
  
  if (searchTerm) {
    where.OR = [
      { title: { contains: searchTerm, mode: 'insensitive' } },
      { description: { contains: searchTerm, mode: 'insensitive' } }
    ];
  }
  
  return prisma.course.findMany({
    where,
    orderBy: { order: 'asc' },
    include: {
      modules: {
        select: {
          id: true,
          title: true,
          order: true,
          isLocked: true
        },
        orderBy: {
          order: 'asc'
        }
      }
    }
  });
};


export const findCourseById = async (id: number) => {
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
            select: {
              id: true,
              title: true,
              order: true
            }
          }
        }
      }
    }
  });

  if (!course) {
    throw new NotFoundError(`Course with ID ${id} not found`);
  }

  return course;
};


export const createCourse = async (data: CreateCourseParams): Promise<Course> => {
  return prisma.course.create({
    data: {
      title: data.title,
      description: data.description,
      level: data.level as any, 
      imageSrc: data.imageSrc || '',
      order: data.order
    }
  });
};


export const updateCourse = async (id: number, data: UpdateCourseParams): Promise<Course> => {
  // Check if the course exists
  const existingCourse = await prisma.course.findUnique({
    where: { id }
  });

  if (!existingCourse) {
    throw new NotFoundError(`Course with ID ${id} not found`);
  }

  const updateData = {
    ...data,
    level: data.level ? (data.level as any) : undefined
  };

  return prisma.course.update({
    where: { id },
    data: updateData
  });
};

export const deleteCourse = async (id: number): Promise<Course> => {
  // Check if the course exists
  const existingCourse = await prisma.course.findUnique({
    where: { id }
  });

  if (!existingCourse) {
    throw new NotFoundError(`Course with ID ${id} not found`);
  }

  return prisma.course.delete({
    where: { id }
  });
};

export const getCourseWithProgress = async (id: number, userId: string) => {
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            include: {
              exercises: true
            }
          }
        }
      }
    }
  });

  if (!course) {
    throw new NotFoundError(`Course with id ${id} not found`);
  }

  // Calculate progress metrics
  let totalExercises = 0;
  let completedExercises = 0;

  // Get all completed exercises for this user
  const userProgress = await prisma.exerciseProgress.findMany({
    where: {
      userId,
      completed: true,
      Exercise: {
        lesson: {
          module: {
            courseId: id
          }
        }
      }
    }
  });

  // Create a Set of completed exercise IDs for quick lookups
  const completedExerciseIds = new Set(
    userProgress.map(progress => progress.exerciseId)
  );

  // Process each module, lesson, and exercise
  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      for (const exercise of lesson.exercises) {
        totalExercises++;
        if (completedExerciseIds.has(exercise.id)) {
          completedExercises++;
        }
      }
    }
  }

  // Calculate progress percentage (0 to 1)
  const progress = totalExercises > 0 ? completedExercises / totalExercises : 0;
  
  // Determine course status
  let status = "locked";
  let actionLabel = "LOCKED";
  
  // First course is always unlocked
  if (course.order === 1) {
    status = completedExercises > 0 ? "continue" : "learn";
    actionLabel = completedExercises > 0 ? "CONTINUE" : "START";
  } 
  // Other courses are unlocked if the previous course has progress
  else if (progress > 0) {
    status = progress === 1 ? "practice" : "continue";
    actionLabel = progress === 1 ? "PRACTICE" : "CONTINUE";
  } else {
    // Check if previous course has sufficient progress
    const previousCourse = await prisma.course.findFirst({
      where: {
        order: course.order - 1
      }
    });
    
    if (previousCourse) {
      const previousCourseProgress = await getCourseWithProgress(previousCourse.id, userId);
      if (previousCourseProgress.progress >= 1) { // 100% completion unlocks next course
        status = "learn";
        actionLabel = "START";
      }
    }
  }

  return {
    ...course,
    progress,
    completedExercises,
    totalExercises,
    isCompleted: progress === 1,
    status,
    actionLabel
  };
};

export const getAllCoursesWithProgress = async (userId: string) => {
  const courses = await prisma.course.findMany({
    orderBy: { order: 'asc' }
  });

  // Add progress info to each course
  const coursesWithProgress = await Promise.all(
    courses.map(async (course) => {
      try {
        return await getCourseWithProgress(course.id, userId);
      } catch (error) {
        console.error(`Error getting progress for course ${course.id}:`, error);
        return {
          ...course,
          progress: 0,
          completedExercises: 0, 
          totalExercises: 0,
          isCompleted: false,
          status: course.order === 1 ? "learn" : "locked",
          actionLabel: course.order === 1 ? "START" : "LOCKED"
        };
      }
    })
  );

  return coursesWithProgress;
};