import express from 'express';
import cors from 'cors';
import lessonsRoutes from './modules/lessons/lessons.routes';
import coursesRoutes from './modules/courses/courses.routes';

const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/lessons', lessonsRoutes);
app.use('/api/courses', coursesRoutes);

//Root
app.get('/', (_, res) => {
  res.send('GermanGains backend is running ');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running successfully on http://localhost:${PORT}`);
});
