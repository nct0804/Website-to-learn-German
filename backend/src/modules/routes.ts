import { Express } from 'express';
import lessonsRoutes from './lessons/lessons.routes';
import coursesRoutes from './courses/courses.routes';
import modulesRoutes from './modules/modules.routes';
import vocabularyRoutes from './vocabulary/vocabulary.routes';
import exercisesRoutes from './exercises/exercises.routes';
import exerciseOptionsRoutes from './exercisesOptions/exercisesOptions.routes';
import userRoutes from './user/user.routes';

/**
 * Configure all API routes for the application
 * @param app Express application instance
 */
export default function configureRoutes(app: Express): void {
  // Configure user routes
  app.use("/api/users", userRoutes);
  
  // Configure content routes
  app.use("/api/lesson", lessonsRoutes);
  app.use("/api/courses", coursesRoutes);
  app.use("/api/modules", modulesRoutes);
  app.use("/api/vocabulary", vocabularyRoutes);
  app.use("/api/exercises", exercisesRoutes);
  app.use("/api/exercise-options", exerciseOptionsRoutes);
}