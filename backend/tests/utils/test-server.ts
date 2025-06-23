import express, { Express } from 'express';
import cors from 'cors';
import routes from '../../src/modules/routes';

/**
 * Creates a test Express application with all routes configured
 */
export function createTestServer(): Express {
  const app = express();
  
  // Middleware
  app.use(express.json());
  app.use(cors());
  
  // Apply routes
  routes(app);
  
  return app;
}