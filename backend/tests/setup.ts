import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

const prisma = new PrismaClient();

jest.setTimeout(30000);

beforeAll(async () => {
  // Connect to database
  await prisma.$connect();
  
  await clearDatabase();
});

afterAll(async () => {
  // Disconnect from database
  await prisma.$disconnect();
});

async function clearDatabase() {
  // Disable foreign key checks temporarily
  await prisma.$executeRawUnsafe('SET session_replication_role = \'replica\';');
  
  // Delete data from tables in specific order to avoid constraint violations
  const tablesToTruncate = [
    'ExerciseOption',
    'Exercise',
    'Lesson',
    'Module',
    'Course',
    'SoundGroupSound',
    'GermanSound',
    'SoundGroup'
  ];
  
  for (const table of tablesToTruncate) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
  }
  
  // Re-enable foreign key checks
  await prisma.$executeRawUnsafe('SET session_replication_role = \'origin\';');
}

// Export the prisma client for use in tests
export { prisma };