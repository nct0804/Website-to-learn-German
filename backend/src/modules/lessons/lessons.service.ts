import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../../utils/errors';

const prisma = new PrismaClient();

interface FindLessonsParams {
  moduleId?: number;
}

interface CreateLessonParams {
  moduleId: number;
  title: string;
  description?: string;
  order: number;
  xpReward?: number;
  estimatedTime?: number;
}

interface UpdateLessonParams {
  title?: string;
  description?: string | null;
  order?: number;
  xpReward?: number;
  estimatedTime?: number | null;
}


//Find lessons with optional filtering

export const findLessons = async ({ moduleId }: FindLessonsParams = {}) => {
  const where = moduleId ? { moduleId } : {};
  
  return prisma.lesson.findMany({
    where,
    orderBy: { order: 'asc' },
    include: {
      module: {
        select: {
          id: true,
          title: true,
          courseId: true
        }
      }
    }
  });
};

//Find a lesson by ID with its exercises
export const findLessonById = async (id: number) => {
  return prisma.lesson.findUnique({
    where: { id },
    include: {
      module: {
        select: {
          id: true,
          title: true,
          courseId: true
        }
      },
      exercises: {
        orderBy: { order: 'asc' },
        include: {
          exerciseOptions: {
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  });
};

//Create a new lesson
export const createLesson = async (data: CreateLessonParams) => {
  // Verify the module exists
  const module = await prisma.module.findUnique({
    where: { id: data.moduleId }
  });

  if (!module) {
    throw new NotFoundError(`Module with ID ${data.moduleId} not found`);
  }

  return prisma.lesson.create({
    data: {
      moduleId: data.moduleId,
      title: data.title,
      description: data.description,
      order: data.order,
      xpReward: data.xpReward || 5, // Default xp reward (Change as needed)
      estimatedTime: data.estimatedTime
    },
    include: {
      module: {
        select: {
          id: true,
          title: true
        }
      }
    }
  });
};

//Update an existing lesson
export const updateLesson = async (id: number, data: UpdateLessonParams) => {
  // Check if the lesson exists
  const existingLesson = await prisma.lesson.findUnique({
    where: { id }
  });

  if (!existingLesson) {
    return null;
  }

  return prisma.lesson.update({
    where: { id },
    data,
    include: {
      module: {
        select: {
          id: true,
          title: true
        }
      }
    }
  });
};

//Delete a lesson
export const deleteLesson = async (id: number) => {
  // Check if the lesson exists
  const existingLesson = await prisma.lesson.findUnique({
    where: { id }
  });

  if (!existingLesson) {
    return null;
  }

  return prisma.lesson.delete({
    where: { id }
  });
};