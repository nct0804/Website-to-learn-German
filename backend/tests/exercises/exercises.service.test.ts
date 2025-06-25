import * as exercisesService from '../../src/modules/exercises/exercises.service';
import { PrismaClient, ExerciseType } from '@prisma/client';
import { NotFoundError } from '../../src/utils/errors';

// Mock Prisma
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    exercise: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    exerciseOption: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
      createMany: jest.fn(),
      deleteMany: jest.fn()
    },
    lesson: {
      findUnique: jest.fn()
    },
    userProgress: {
      upsert: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn()
    },
    user: {
      update: jest.fn(),
      findUnique: jest.fn()
    },
    $transaction: jest.fn(callback => callback(mockPrismaClient))
  };
  
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
    ExerciseType: {
      MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
      FILL_IN_BLANK: 'FILL_IN_BLANK',
      SENTENCE_ORDER: 'SENTENCE_ORDER',
      PRONUNCIATION: 'PRONUNCIATION',
      VOCABULARY_CHECK: 'VOCABULARY_CHECK'
    }
  };
});

describe('Exercises Service', () => {
  const mockPrisma = new PrismaClient();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('findExercises', () => {
    it('should return exercises filtered by lessonId', async () => {
      // Arrange
      const lessonId = 1;
      const mockExercises = [
        { 
          id: 1, 
          type: ExerciseType.MULTIPLE_CHOICE, 
          question: 'What is "hello" in German?',
          lessonId 
        },
        { 
          id: 2, 
          type: ExerciseType.FILL_IN_BLANK, 
          question: 'Complete: Guten ___ (day)',
          lessonId 
        }
      ];
      
      (mockPrisma.exercise.findMany as jest.Mock).mockResolvedValue(mockExercises);
      
      // Act
      const result = await exercisesService.findExercises({ lessonId });
      
      // Assert
      expect(mockPrisma.exercise.findMany).toHaveBeenCalledWith({
        where: { lessonId },
        orderBy: { order: 'asc' },
        include: {
          exerciseOptions: {
            where: { isCorrect: false },
            select: {
              id: true,
              text: true,
              isCorrect: false
            }
          }
        }
      });
      
      expect(result).toEqual(mockExercises);
    });
    
    it('should filter exercises by type', async () => {
      // Arrange
      const type = ExerciseType.MULTIPLE_CHOICE;
      const mockExercises = [
        { 
          id: 1, 
          type, 
          question: 'What is "hello" in German?',
          lessonId: 1 
        },
        { 
          id: 3, 
          type, 
          question: 'What is "thank you" in German?',
          lessonId: 2 
        }
      ];
      
      (mockPrisma.exercise.findMany as jest.Mock).mockResolvedValue(mockExercises);
      
      // Act
      const result = await exercisesService.findExercises({ type });
      
      // Assert
      expect(mockPrisma.exercise.findMany).toHaveBeenCalledWith({
        where: { type },
        orderBy: { order: 'asc' },
        include: {
          exerciseOptions: {
            where: { isCorrect: false },
            select: {
              id: true,
              text: true,
              isCorrect: false
            }
          }
        }
      });
      
      expect(result).toEqual(mockExercises);
    });
  });
  
  describe('findExerciseById', () => {
    it('should return an exercise by ID with options', async () => {
      // Arrange
      const exerciseId = 1;
      const mockExercise = { 
        id: exerciseId, 
        type: ExerciseType.MULTIPLE_CHOICE,
        question: 'What is "hello" in German?',
        lessonId: 1,
        options: [
          { id: 1, text: 'Hallo', isCorrect: true },
          { id: 2, text: 'Tschüss', isCorrect: false }
        ]
      };
      
      (mockPrisma.exercise.findUnique as jest.Mock).mockResolvedValue(mockExercise);
      
      // Act
      const result = await exercisesService.findExerciseById(exerciseId);
      
      // Assert
      expect(mockPrisma.exercise.findUnique).toHaveBeenCalledWith({
        where: { id: exerciseId },
        include: {
          exerciseOptions: {
            select: {
              id: true,
              text: true,
              isCorrect: false,
              order: true
            },
            orderBy: {
              order: 'asc'
            }
          }
        }
      });
      
      expect(result).toEqual(mockExercise);
    });
    
    it('should throw NotFoundError if exercise does not exist', async () => {
      // Arrange
      const exerciseId = 999;
      (mockPrisma.exercise.findUnique as jest.Mock).mockResolvedValue(null);
      
      // Act & Assert
      await expect(exercisesService.findExerciseById(exerciseId))
        .rejects
        .toThrow(NotFoundError);
    });
  });
  
  describe('checkAnswer', () => {
    it('should correctly check multiple choice answer and award XP', async () => {
      // Arrange
      const exerciseId = 1;
      const answer = "2"; // ID of the option
      const userId = 'user-123';
      
      const mockExercise = {
        id: exerciseId,
        type: ExerciseType.MULTIPLE_CHOICE,
        xpReward: 5,
        lessonId: 1,
        exerciseOptions: [
          { id: 1, text: 'Wrong option', isCorrect: false },
          { id: 2, text: 'Correct option', isCorrect: true }
        ]
      };
      
      const mockUser = {
        id: userId,
        xp: 100,
        streak: 1
      };
      
      (mockPrisma.exercise.findUnique as jest.Mock).mockResolvedValue(mockExercise);
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (mockPrisma.userProgress.upsert as jest.Mock).mockResolvedValue({});
      (mockPrisma.user.update as jest.Mock).mockResolvedValue({
        ...mockUser,
        xp: 105
      });
      
      // Act
      const result = await exercisesService.checkAnswer(exerciseId, answer, userId);
      
      // Assert
      expect(mockPrisma.exercise.findUnique).toHaveBeenCalledWith({
        where: { id: exerciseId },
        include: {
          exerciseOptions: true
        }
      });
      
      expect(mockPrisma.user.update).toHaveBeenCalled();
      expect(mockPrisma.userProgress.upsert).toHaveBeenCalled();
      
      expect(result).toEqual({
        isCorrect: true,
        correctAnswer: 'Correct option',
        xpGained: 5,
        feedback: expect.any(String)
      });
    });
    
    it('should handle incorrect answers', async () => {
      // Arrange
      const exerciseId = 1;
      const answer = "1"; // Wrong option ID
      const userId = 'user-123';
      
      const mockExercise = {
        id: exerciseId,
        type: ExerciseType.MULTIPLE_CHOICE,
        xpReward: 5,
        lessonId: 1,
        exerciseOptions: [
          { id: 1, text: 'Wrong option', isCorrect: false },
          { id: 2, text: 'Correct option', isCorrect: true }
        ]
      };
      
      const mockUser = {
        id: userId,
        xp: 100,
        streak: 1
      };
      
      (mockPrisma.exercise.findUnique as jest.Mock).mockResolvedValue(mockExercise);
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (mockPrisma.userProgress.upsert as jest.Mock).mockResolvedValue({});
      
      // Act
      const result = await exercisesService.checkAnswer(exerciseId, answer, userId);
      
      // Assert
      expect(result).toEqual({
        isCorrect: false,
        correctAnswer: 'Correct option',
        xpGained: 0,
        feedback: expect.any(String)
      });
    });
  });
  
  describe('createExercise', () => {
    it('should create exercise with options', async () => {
      // Arrange
      const exerciseData = {
        lessonId: 1,
        type: ExerciseType.MULTIPLE_CHOICE,
        question: 'What is "goodbye" in German?',
        instruction: 'Choose the correct translation',
        order: 2,
        xpReward: 5,
        options: [
          { text: 'Hallo', isCorrect: false, order: 1 },
          { text: 'Tschüss', isCorrect: true, order: 2 }
        ]
      };
      
      const mockLesson = { id: 1 };
      
      const mockCreatedExercise = {
        id: 3,
        lessonId: 1,
        type: ExerciseType.MULTIPLE_CHOICE,
        question: 'What is "goodbye" in German?',
        instruction: 'Choose the correct translation',
        order: 2,
        xpReward: 5,
        createdAt: new Date(),
        options: [
          { id: 1, text: 'Hallo', isCorrect: false, order: 1 },
          { id: 2, text: 'Tschüss', isCorrect: true, order: 2 }
        ]
      };
      
      (mockPrisma.lesson.findUnique as jest.Mock).mockResolvedValue(mockLesson);
      (mockPrisma.exercise.create as jest.Mock).mockResolvedValue({
        ...mockCreatedExercise,
        options: undefined
      });
      (mockPrisma.exerciseOption.createMany as jest.Mock).mockResolvedValue({});
      (mockPrisma.exerciseOption.findMany as jest.Mock).mockResolvedValue(mockCreatedExercise.options);
      
      // Act
      const result = await exercisesService.createExercise(exerciseData);
      
      // Assert
      expect(mockPrisma.lesson.findUnique).toHaveBeenCalledWith({
        where: { id: exerciseData.lessonId }
      });
      
      expect(mockPrisma.exercise.create).toHaveBeenCalled();
      expect(mockPrisma.exerciseOption.createMany).toHaveBeenCalled();
      
      expect(result).toEqual(mockCreatedExercise);
    });
    
    it('should throw NotFoundError if lesson does not exist', async () => {
      // Arrange
      const exerciseData = {
        lessonId: 999,
        type: ExerciseType.MULTIPLE_CHOICE,
        question: 'Test question',
        options: []
      };
      
      (mockPrisma.lesson.findUnique as jest.Mock).mockResolvedValue(null);
      
      // Act & Assert
      await expect(exercisesService.createExercise(exerciseData))
        .rejects
        .toThrow(NotFoundError);
    });
  });
  
  describe('getExercisesWithStatus', () => {
    it('should return exercises with completion status', async () => {
      // Arrange
      const lessonId = 1;
      const userId = 'user-123';
      
      const mockExercises = [
        { id: 1, question: 'Question 1' },
        { id: 2, question: 'Question 2' }
      ];
      
      const mockCompletedExercises = [
        { exerciseId: 1, userId, completed: true }
      ];
      
      (mockPrisma.exercise.findMany as jest.Mock).mockResolvedValue(mockExercises);
      (mockPrisma.userProgress.findMany as jest.Mock).mockResolvedValue(mockCompletedExercises);
      (mockPrisma.exercise.count as jest.Mock).mockResolvedValue(2);
      (mockPrisma.userProgress.count as jest.Mock).mockResolvedValue(1);
      
      // Act
      const result = await exercisesService.getExercisesWithStatus(lessonId, userId);
      
      // Assert
      expect(mockPrisma.exercise.findMany).toHaveBeenCalledWith({
        where: { lessonId },
        orderBy: { order: 'asc' },
        include: {
          exerciseOptions: {
            select: {
              id: true,
              text: true,
              isCorrect: false,
              order: true
            },
            orderBy: {
              order: 'asc'
            }
          }
        }
      });
      
      expect(result).toEqual({
        exercises: [
          { id: 1, question: 'Question 1', isCompleted: true },
          { id: 2, question: 'Question 2', isCompleted: false }
        ],
        progress: 50,
        completedExercises: 1,
        totalExercises: 2,
        isCompleted: false
      });
    });
  });
});