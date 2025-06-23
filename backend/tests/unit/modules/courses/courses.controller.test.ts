import { Request, Response } from 'express';
import * as exercisesService from '../../../../src/modules/exercises/exercises.service';
import * as exercisesController from '../../../../src/modules/exercises/exercises.controller';

// Mock exercises service
jest.mock('../../../../src/modules/exercises/exercises.service');

describe('Exercises Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe('getAllExercises', () => {
    it('should return exercises for a lesson', async () => {
      // Arrange
      const mockExercises = [
        { id: 1, question: 'Test question', type: 'MULTIPLE_CHOICE' }
      ];
      mockRequest.query = { lessonId: '1' };
      (exercisesService.findExercises as jest.Mock).mockResolvedValue(mockExercises);

      // Act
      await exercisesController.getAllExercises(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(exercisesService.findExercises).toHaveBeenCalledWith(
        expect.objectContaining({ lessonId: 1 })
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockExercises
      });
    });

    it('should handle errors', async () => {
      // Arrange
      const mockError = new Error('Test error');
      mockRequest.query = { lessonId: '1' };
      (exercisesService.findExercises as jest.Mock).mockRejectedValue(mockError);

      // Act
      await exercisesController.getAllExercises(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'An error occurred while fetching exercises'
      });
    });
  });
});