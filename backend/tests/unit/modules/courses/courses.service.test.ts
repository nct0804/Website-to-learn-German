import { PrismaClient } from '@prisma/client';
import { mockDeep, MockProxy } from 'jest-mock-extended';

// Mock prisma
jest.mock('../../../../src/lib/prisma', () => {
  return {
    __esModule: true,
    default: mockDeep<PrismaClient>(),
  };
});

// Import after mocking
import prisma from '../../../../src/lib/prisma';
import * as coursesService from '../../../../src/modules/courses/courses.service';

// Type cast prisma as mock
const mockPrisma = prisma as unknown as MockProxy<PrismaClient>;

describe('Courses Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findCourses', () => {
    it('should return all courses when no filters are provided', async () => {
      // Arrange
      const mockCourses = [
        { id: 1, title: 'Course 1', level: 'A1_1' },
        { id: 2, title: 'Course 2', level: 'A1_2' }
      ];
      mockPrisma.course.findMany = jest.fn().mockResolvedValue(mockCourses as any);
      
      // Act
      const result = await coursesService.findCourses();
      
      // Assert
      expect(mockPrisma.course.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {},
          orderBy: { order: 'asc' }
        })
      );
      expect(result).toEqual(mockCourses);
    });

    it('should filter courses by level when provided', async () => {
      // Arrange
      const mockCourses = [{ id: 1, title: 'Course 1', level: 'A1_1' }];
      mockPrisma.course.findMany = jest.fn().mockResolvedValue(mockCourses as any);
      
      // Act
      const result = await coursesService.findCourses({ level: 'A1_1' });
      
      // Assert
      expect(mockPrisma.course.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ level: 'A1_1' })
        })
      );
      expect(result).toEqual(mockCourses);
    });
  });
});