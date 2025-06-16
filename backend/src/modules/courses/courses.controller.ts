import { Request, Response } from 'express';
import * as CourseService from './courses.service';
import { BadRequestError, NotFoundError } from '../../utils/errors';

// GET /api/courses
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const { level, search } = req.query;
    
    const courses = await CourseService.findCourses({
      level: level ? String(level) : undefined,
      searchTerm: search ? String(search) : undefined
    });
    
    return res.status(200).json({
      success: true,
      data: courses
    });
  } catch (error) {
    throw error;
  }
};

// GET /api/courses/:id
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.id);
    
    if (isNaN(courseId)) {
      throw new BadRequestError('Invalid course ID');
    }
    
    const course = await CourseService.findCourseById(courseId);
    
    return res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    throw error;
  }
};

// post /api/courses -- admin
export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, level, imageSrc, order } = req.body;
    
    const newCourse = await CourseService.createCourse({
      title,
      description,
      level,
      imageSrc,
      order
    });
    
    return res.status(201).json({
      success: true,
      data: newCourse
    });
  } catch (error) {
    throw error;
  }
};

//  PUT /api/courses/:id -- admin
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.id);
    
    if (isNaN(courseId)) {
      throw new BadRequestError('Invalid course ID');
    }
    
    const { title, description, level, imageSrc, order } = req.body;
    
    const updatedCourse = await CourseService.updateCourse(courseId, {
      title,
      description,
      level,
      imageSrc,
      order
    });
    
    return res.status(200).json({
      success: true,
      data: updatedCourse
    });
  } catch (error) {
    throw error;
  }
};

// DELETE /api/courses/:id -- admin
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.id);
    
    if (isNaN(courseId)) {
      throw new BadRequestError('Invalid course ID');
    }
    
    const deletedCourse = await CourseService.deleteCourse(courseId);
    
    return res.status(200).json({
      success: true,
      message: `Course with ID ${courseId} successfully deleted`,
      data: deletedCourse
    });
  } catch (error) {
    throw error;
  }
};

export const getCourseWithProgress = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.id);
    
    if (isNaN(courseId)) {
      throw new BadRequestError('Invalid course ID');
    }
    
    // Get user ID from the authenticated request
    const userId = (req as any).user?.id;
    
    if (!userId) {
      throw new BadRequestError('User must be authenticated');
    }
    
    const course = await CourseService.getCourseWithProgress(courseId, userId);
    
    return res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    throw error;
  }
};

export const getAllCoursesWithProgress = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        throw new BadRequestError('User must be authenticated');
      }
      const courses = await CourseService.getAllCoursesWithProgress(userId);

      return res.status(200).json({
        success: true,
        data: courses
      });
    } catch (error) {
      throw error;
    }
};