import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../../utils/errors';

const prisma = new PrismaClient();

interface FindModulesParams {
  courseId?: number;
}

interface CreateModuleParams {
  courseId: number;
  title: string;
  description?: string;
  order: number;
  isLocked?: boolean;
}

interface UpdateModuleParams {
  title?: string;
  description?: string | null;
  order?: number;
  isLocked?: boolean;
}

export const findModules = async ({ courseId }: FindModulesParams = {}) => {
  const where = courseId ? { courseId } : {};
  
  return prisma.module.findMany({
    where,
    orderBy: { order: 'asc' },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          level: true
        }
      },
      _count: {
        select: {
          lessons: true
        }
      }
    }
  });
};

export const findModuleById = async (id: number) => {
  const module = await prisma.module.findUnique({
    where: { id },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          level: true
        }
      },
      lessons: {
        orderBy: { order: 'asc' },
        include: {
          _count: {
            select: {
              exercises: true
            }
          }
        }
      }
    }
  });

  if (!module) {
    throw new NotFoundError(`Module with ID ${id} not found`);
  }

  return module;
};

export const createModule = async (data: CreateModuleParams) => {
  // Verify the course exists
  const course = await prisma.course.findUnique({
    where: { id: data.courseId }
  });

  if (!course) {
    throw new NotFoundError(`Course with ID ${data.courseId} not found`);
  }

  return prisma.module.create({
    data: {
      courseId: data.courseId,
      title: data.title,
      description: data.description,
      order: data.order,
      isLocked: data.isLocked ?? false // Default is unlocked
    },
    include: {
      course: {
        select: {
          id: true,
          title: true
        }
      }
    }
  });
};

export const updateModule = async (id: number, data: UpdateModuleParams) => {
  // Check if the module exists
  const existingModule = await prisma.module.findUnique({
    where: { id }
  });

  if (!existingModule) {
    throw new NotFoundError(`Module with ID ${id} not found`);
  }

  return prisma.module.update({
    where: { id },
    data,
    include: {
      course: {
        select: {
          id: true,
          title: true
        }
      }
    }
  });
};

export const deleteModule = async (id: number) => {
  // Check if the module exists
  const existingModule = await prisma.module.findUnique({
    where: { id }
  });

  if (!existingModule) {
    throw new NotFoundError(`Module with ID ${id} not found`);
  }

  return prisma.module.delete({
    where: { id }
  });
};

export const findModulesByCourseId = async (courseId: number) => {
  // Check if the course exists
  const course = await prisma.course.findUnique({
    where: { id: courseId }
  });

  if (!course) {
    throw new NotFoundError(`Course with ID ${courseId} not found`);
  }

  return prisma.module.findMany({
    where: { courseId },
    orderBy: { order: 'asc' },
    include: {
      lessons: {
        select: {
          id: true,
          title: true,
          order: true,
          _count: {
            select: {
              exercises: true
            }
          }
        },
        orderBy: { order: 'asc' }
      }
    }
  });
};