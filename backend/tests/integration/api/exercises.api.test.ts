import request from 'supertest';
import { seedTestData, cleanTestData } from '../../utils/test-db';
import { createTestServer } from '../../utils/test-server';

describe('Exercises API', () => {
  const app = createTestServer();
  let testData: any;
  
  beforeAll(async () => {
    testData = await seedTestData();
  });
  
  afterAll(async () => {
    await cleanTestData();
  });
  
  describe('GET /api/exercises', () => {
    it('should return exercises filtered by lessonId', async () => {
      // Act
      const response = await request(app)
        .get(`/api/exercises?lessonId=${testData.lesson.id}`)
        .expect('Content-Type', /json/)
        .expect(200);
      
      // Assert
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(2);
      expect(response.body.data[0].lessonId).toBe(testData.lesson.id);
    });
  });
  
  describe('GET /api/exercises/:id', () => {
    it('should return a specific exercise by ID', async () => {
      // Act
      const response = await request(app)
        .get(`/api/exercises/${testData.exercises.multipleChoice.id}`)
        .expect('Content-Type', /json/)
        .expect(200);
      
      // Assert
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBe(testData.exercises.multipleChoice.id);
      expect(response.body.data.type).toBe('MULTIPLE_CHOICE');
      expect(Array.isArray(response.body.data.options)).toBe(true);
      expect(response.body.data.options.length).toBe(3);
    });
  });
  
  describe('POST /api/exercises/:id/check', () => {
    it('should correctly check multiple choice answer', async () => {
      const correctOption = testData.exercises.multipleChoice.options.find(
        (opt: any) => opt.isCorrect
      );
      
      // Act
      const response = await request(app)
        .post(`/api/exercises/${testData.exercises.multipleChoice.id}/check`)
        .send({ answer: correctOption.id })
        .expect('Content-Type', /json/)
        .expect(200);
      
      // Assert
      expect(response.body.data.isCorrect).toBe(true);
    });
    
    it('should correctly check fill-in-blank answer', async () => {
      // Act
      const response = await request(app)
        .post(`/api/exercises/${testData.exercises.fillInBlank.id}/check`)
        .send({ answer: 'Tag' })
        .expect('Content-Type', /json/)
        .expect(200);
      
      // Assert
      expect(response.body.data.isCorrect).toBe(true);
    });
  });
});