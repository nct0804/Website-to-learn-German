import { PrismaClient, ExerciseType } from '@prisma/client';
import { NotFoundError } from '../../utils/errors';

const prisma = new PrismaClient();

interface FindExercisesParams {
  lessonId?: number;
  type?: string;
}

interface CreateExerciseParams {
  lessonId: number;
  type: string; // Should match ExerciseType enum
  question: string;
  instruction?: string;
  order: number;
  xpReward?: number;
  timeLimit?: number;
  correctAnswer?: string; // For text-based answers
  options?: ExerciseOptionInput[];
}

interface ExerciseOptionInput {
  text: string;
  isCorrect: boolean;
  order?: number;
  imageSrc?: string;
  audioSrc?: string;
}

interface UpdateExerciseParams {
  type?: string;
  question?: string;
  instruction?: string | null;
  order?: number;
  xpReward?: number;
  timeLimit?: number | null;
  correctAnswer?: string;
  options?: ExerciseOptionInput[];
}

export const findExercises = async ({ lessonId, type }: FindExercisesParams = {}) => {
  // Build where clause based on provided filters
  const where: any = {};
  
  if (lessonId) {
    where.lessonId = lessonId;
  }
  
  if (type) {
    where.type = type;
  }
  
  return prisma.exercise.findMany({
    where,
    orderBy: { order: 'asc' },
    include: {
      lesson: {
        select: {
          id: true,
          title: true,
          moduleId: true
        }
      },
      exerciseOptions: {
        orderBy: { order: 'asc' },
        // Don't include isCorrect in public queries for security
        select: {
          id: true,
          text: true,
          order: true,
          imageSrc: true,
          audioSrc: true
        }
      }
    }
  });
};

export const findExerciseById = async (id: number) => {
  const exercise = await prisma.exercise.findUnique({
    where: { id },
    include: {
      lesson: {
        select: {
          id: true,
          title: true,
          moduleId: true
        }
      },
      exerciseOptions: {
        orderBy: { order: 'asc' },
        // Don't include isCorrect in public queries
        select: {
          id: true,
          text: true,
          order: true,
          imageSrc: true,
          audioSrc: true
        }
      }
    }
  });

  if (!exercise) {
    throw new NotFoundError(`Exercise with ID ${id} not found`);
  }

  return exercise;
};

export const findExerciseByIdWithAnswers = async (id: number) => {
  const exercise = await prisma.exercise.findUnique({
    where: { id },
    include: {
      lesson: true,
      exerciseOptions: {
        orderBy: { order: 'asc' }
      }
    }
  });

  if (!exercise) {
    throw new NotFoundError(`Exercise with ID ${id} not found`);
  }

  return exercise;
};

export const createExercise = async (data: CreateExerciseParams) => {
  // First verify the lesson exists
  const lesson = await prisma.lesson.findUnique({
    where: { id: data.lessonId }
  });

  if (!lesson) {
    throw new NotFoundError(`Lesson with ID ${data.lessonId} not found`);
  }

  // Create the exercise and its options in a transaction to ensure data consistency
  return prisma.$transaction(async (prismaClient) => {
    // Create the exercise first
    const exercise = await prismaClient.exercise.create({
      data: {
        lessonId: data.lessonId,
        type: data.type as ExerciseType,
        question: data.question,
        instruction: data.instruction,
        order: data.order,
        xpReward: data.xpReward || 1,
        timeLimit: data.timeLimit
      }
    });

    // If options are provided, create them for the exercise
    if (data.options && data.options.length > 0) {
      await Promise.all(
        data.options.map((option, index) =>
          prismaClient.exerciseOption.create({
            data: {
              exerciseId: exercise.id,
              text: option.text,
              isCorrect: option.isCorrect,
              order: option.order || index + 1,
              imageSrc: option.imageSrc,
              audioSrc: option.audioSrc
            }
          })
        )
      );
    }

    // Return the complete exercise with options
    return prismaClient.exercise.findUnique({
      where: { id: exercise.id },
      include: {
        lesson: {
          select: {
            id: true,
            title: true
          }
        },
        exerciseOptions: {
          orderBy: { order: 'asc' }
        }
      }
    });
  });
};

export const updateExercise = async (id: number, data: UpdateExerciseParams) => {
  // Check if the exercise exists
  const existingExercise = await prisma.exercise.findUnique({
    where: { id }
  });

  if (!existingExercise) {
    throw new NotFoundError(`Exercise with ID ${id} not found`);
  }

  // Update the exercise and its options in a transaction
  return prisma.$transaction(async (prismaClient) => {
    // Update the base exercise data
    await prismaClient.exercise.update({
      where: { id },
      data: {
        type: data.type as ExerciseType | undefined,
        question: data.question,
        instruction: data.instruction,
        order: data.order,
        xpReward: data.xpReward,
        timeLimit: data.timeLimit
      }
    });

    // If options are provided, update them
    if (data.options && data.options.length > 0) {
      // First delete existing options
      await prismaClient.exerciseOption.deleteMany({
        where: { exerciseId: id }
      });

      // Then create new options
      await Promise.all(
        data.options.map((option, index) =>
          prismaClient.exerciseOption.create({
            data: {
              exerciseId: id,
              text: option.text,
              isCorrect: option.isCorrect,
              order: option.order || index + 1,
              imageSrc: option.imageSrc,
              audioSrc: option.audioSrc
            }
          })
        )
      );
    }

    // Return the updated exercise with its options
    return prismaClient.exercise.findUnique({
      where: { id },
      include: {
        lesson: {
          select: {
            id: true,
            title: true
          }
        },
        exerciseOptions: {
          orderBy: { order: 'asc' }
        }
      }
    });
  });
};

/**
 * Delete an exercise (this will cascade delete its options too)
 */
export const deleteExercise = async (id: number) => {
  // Check if the exercise exists
  const existingExercise = await prisma.exercise.findUnique({
    where: { id }
  });

  if (!existingExercise) {
    throw new NotFoundError(`Exercise with ID ${id} not found`);
  }

  return prisma.exercise.delete({
    where: { id }
  });
};

export const checkAnswer = async (id: number, answer: string | number | string[], userId: any) => {
  const exercise = await prisma.exercise.findUnique({
    where: { id },
    include: {
      exerciseOptions: true
    }
  });

  if (!exercise) {
    throw new NotFoundError(`Exercise with ID ${id} not found`);
  }

  // Different checking logic based on exercise type
  let isCorrect = false;
  let correctAnswer = '';
  
  switch (exercise.type) {
    case 'MULTIPLE_CHOICE':
      // For multiple choice, answer should be the id of an option
      const selectedOption = exercise.exerciseOptions.find(
        option => option.id === Number(answer)
      );
      isCorrect = !!selectedOption?.isCorrect;
      
      // Find the correct answer for feedback
      const correctOption = exercise.exerciseOptions.find(option => option.isCorrect);
      correctAnswer = correctOption?.text || '';
      break;
      
    case 'FILL_IN_BLANK':
    case 'VOCABULARY_CHECK':
      // For text input exercises, compare with correct option
      const correctTextOption = exercise.exerciseOptions.find(option => option.isCorrect);
      correctAnswer = correctTextOption?.text || '';
      
      // Case insensitive comparison
      if (typeof answer === 'string' && correctAnswer) {
        isCorrect = answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
      }
      break;
      
    case 'SENTENCE_ORDER':
      // For sentence ordering, validate based on correct option
      const correctOrderOption = exercise.exerciseOptions.find(option => option.isCorrect);
      correctAnswer = correctOrderOption?.text || '';
      
      if (Array.isArray(answer) && typeof answer[0] === 'string') {
        // For sentence order, the user submits an array of words/segments
        // We check if the joined result matches the correct answer
        const userAnswer = answer.join(' ').toLowerCase().trim();
        isCorrect = userAnswer === correctAnswer.toLowerCase().trim();
      }
      break;
      
    default:
      isCorrect = false;
  }
  
  // Get XP reward only if correct
  const xpReward = isCorrect ? exercise.xpReward : 0;
  
  const existingProgress = await prisma.exerciseProgress.findFirst({
    where: {
      userId,
      exerciseId: id
    }
  });

  if (existingProgress && existingProgress.completed) {
    return {
      isCorrect,
      xpReward: 0, // No XP for already completed exercises
      correctAnswer,
      alreadyCompleted: true,
      feedback: isCorrect ? 'Correct! (already completed)' : 'Incorrect. Try again.'
    };
  }

  // Store progress in database
  // This could be extended to include userId when implementing user authentication
  if (existingProgress) {
  await prisma.exerciseProgress.update({
    where: { id: existingProgress.id },
    data: {
      completed: isCorrect,
      completedAt: isCorrect ? new Date() : null
    }
  });
  } else {
  await prisma.exerciseProgress.create({
    data: {
      exerciseId: id,
      userId,
      completed: isCorrect,
      completedAt: isCorrect ? new Date() : null
    }
  });
  }
    if (isCorrect) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          xp: { increment: xpReward },
          streak: { increment: 1 }, // Increment streak for correct answers
          updatedAt: new Date()
        }
      });
    } else {
      // Reset streak to 0 for incorrect answers
      await prisma.user.update({
        where: { id: userId },
        data: {
          streak: 0,
          updatedAt: new Date()
        }
      });
    }
    let completionMessage = null;
    if (isCorrect) {
      const exercise = await prisma.exercise.findUnique({
        where: { id },
        include: { lesson: true }
      });
      
      if (exercise) {
        // Count total exercises in this lesson
        const totalExercises = await prisma.exercise.count({
          where: { lessonId: exercise.lessonId }
        });
        
        // Count completed exercises in this lesson
        const completedExercises = await prisma.exerciseProgress.count({
          where: {
            userId,
            completed: true,
            Exercise: {
              lessonId: exercise.lessonId
            }
          }
        });
        
        // If all exercises are completed, add completion message
        if (completedExercises >= totalExercises) {
          completionMessage = `Congratulations! You've completed all exercises in "${exercise.lesson.title}" lesson. You can now move to the next lesson or practice this one again.`;
        }
      }
    }

  return {
    isCorrect,
    xpReward,
    correctAnswer,
    feedback: isCorrect ? 'Correct!' : 'Uh Oh. Try again.',
    completionMessage
  };
};

export const getExercisesWithStatus = async (lessonId: number, userId: string) => {
  // Get all exercises for the lesson
  const exercises = await prisma.exercise.findMany({
    where: { lessonId },
    orderBy: { order: 'asc' },
    include: {
      exerciseOptions: {
        orderBy: { order: 'asc' },
        select: {
          id: true,
          text: true,
          order: true,
          // Don't include isCorrect to avoid revealing answers
        }
      }
    }
  });

  // Get completion status for each exercise
  const exercisesWithStatus = await Promise.all(
    exercises.map(async (exercise) => {
      const progress = await prisma.exerciseProgress.findFirst({
        where: {
          userId,
          exerciseId: exercise.id,
          completed: true
        }
      });

      return {
        ...exercise,
        isCompleted: !!progress,
        completedAt: progress?.completedAt || null
      };
    })
  );

  // Calculate overall lesson completion
  const totalExercises = exercises.length;
  const completedExercises = exercisesWithStatus.filter(e => e.isCompleted).length;
  const progress = totalExercises > 0 ? completedExercises / totalExercises : 0;
  const isLessonCompleted = completedExercises === totalExercises && totalExercises > 0;

  return {
    exercises: exercisesWithStatus,
    progress,
    completedExercises,
    totalExercises,
    isCompleted: isLessonCompleted
  };
};