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