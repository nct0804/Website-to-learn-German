import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { BadRequestError } from '../utils/errors';

// Todo : to check if a user has hearts before allowing them to attempt an exercise
// Todo : write automation test