import { prisma } from '../setup';

/**
 * Seeds the database with test data for courses, modules, lessons, and exercises
 */
export async function seedTestData() {
  // Create test course
  const course = await prisma.course.create({
    data: {
      title: 'Test German Course',
      description: 'A course for testing purposes',
      level: 'A1_1',
      imageSrc: '/assets/images/test-course.jpg',
      order: 1,
      isActive: true
    }
  });

  // Create test module
  const module = await prisma.module.create({
    data: {
      title: 'Test Module',
      description: 'A module for testing purposes',
      courseId: course.id,
      order: 1,
      isLocked: false
    }
  });

  // Create test lesson
  const lesson = await prisma.lesson.create({
    data: {
      title: 'Test Lesson',
      moduleId: module.id,
      order: 1,
      xpReward: 10
    }
  });

  // Create test exercise with multiple choice
  const exercise = await prisma.exercise.create({
    data: {
      lessonId: lesson.id,
      type: 'MULTIPLE_CHOICE',
      question: 'What is "hello" in German?',
      order: 1,
      xpReward: 5,
      exerciseOptions: {
        create: [
          {
            text: 'Hallo',
            isCorrect: true,
            order: 1
          },
          {
            text: 'Tschüss',
            isCorrect: false,
            order: 2
          },
          {
            text: 'Danke',
            isCorrect: false,
            order: 3
          }
        ]
      }
    },
    include: {
      exerciseOptions: true
    }
  });

  return { course, module, lesson, exercise };
}

export async function cleanTestData() {
  await prisma.exerciseOption.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
}