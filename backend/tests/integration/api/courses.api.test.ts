import request from 'supertest';
import { seedTestData, cleanTestData } from '../../utils/test-db';
import { createTestServer } from '../../utils/test-server';

describe('Courses API', () => {
  const app = createTestServer();
  let testData: any;
  
  beforeAll(async () => {
    testData = await seedTestData();
  });
  
  afterAll(async () => {
    await cleanTestData();
  });
  
  describe('GET /api/courses', () => {
    it('should return all courses', async () => {
      // Act
      const response = await request(app)
        .get('/api/courses')
        .expect('Content-Type', /json/)
        .expect(200);
      
      // Assert
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].title).toBe('Test German Course');
    });
    
    it('should filter courses by level', async () => {
      // Act
      const response = await request(app)
        .get('/api/courses?level=A1_1')
        .expect('Content-Type', /json/)
        .expect(200);
      
      // Assert
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].level).toBe('A1_1');
    });
  });
  
  describe('GET /api/courses/:id', () => {
    it('should return a specific course by ID', async () => {
      // Act
      const response = await request(app)
        .get(`/api/courses/${testData.course.id}`)
        .expect('Content-Type', /json/)
        .expect(200);
      
      // Assert
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBe(testData.course.id);
      expect(response.body.data.title).toBe('Test German Course');
    });
    
    it('should return 404 for non-existent course', async () => {
      // Act
      await request(app)
        .get('/api/courses/9999')
        .expect(404);
    });
  });
});