import { Request, Response } from 'express';
import * as ModuleService from './modules.service';
import { BadRequestError, NotFoundError } from '../../utils/errors';

// GET /api/modules
export const getAllModules = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.query;
    
    const modules = await ModuleService.findModules({
      courseId: courseId ? Number(courseId) : undefined
    });
    
    return res.status(200).json({
      success: true,
      data: modules
    });
  } catch (error) {
    throw error;
  }
};

// GET /api/modules/:id
export const getModuleById = async (req: Request, res: Response) => {
  try {
    const moduleId = Number(req.params.id);
    
    if (isNaN(moduleId)) {
      throw new BadRequestError('Invalid module ID');
    }
    
    const module = await ModuleService.findModuleById(moduleId);
    
    return res.status(200).json({
      success: true,
      data: module
    });
  } catch (error) {
    throw error;
  }
};

//  POST /api/modules (admin)
export const createModule = async (req: Request, res: Response) => {
  try {
    const { courseId, title, description, order, isLocked } = req.body;
    
    const newModule = await ModuleService.createModule({
      courseId,
      title,
      description,
      order,
      isLocked
    });
    
    return res.status(201).json({
      success: true,
      data: newModule
    });
  } catch (error) {
    throw error;
  }
};

//  PUT /api/modules/:id (admin)
export const updateModule = async (req: Request, res: Response) => {
  try {
    const moduleId = Number(req.params.id);
    
    if (isNaN(moduleId)) {
      throw new BadRequestError('Invalid module ID');
    }
    
    const { title, description, order, isLocked } = req.body;
    
    const updatedModule = await ModuleService.updateModule(moduleId, {
      title,
      description,
      order,
      isLocked
    });
    
    return res.status(200).json({
      success: true,
      data: updatedModule
    });
  } catch (error) {
    throw error;
  }
};

// DELETE /api/modules/:id (admin)
export const deleteModule = async (req: Request, res: Response) => {
  try {
    const moduleId = Number(req.params.id);
    
    if (isNaN(moduleId)) {
      throw new BadRequestError('Invalid module ID');
    }
    
    const deletedModule = await ModuleService.deleteModule(moduleId);
    
    return res.status(200).json({
      success: true,
      message: `Module with ID ${moduleId} successfully deleted`,
      data: deletedModule
    });
  } catch (error) {
    throw error;
  }
};

// GET /api/courses/:courseId/modules
export const getModulesByCourseId = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.courseId);
    
    if (isNaN(courseId)) {
      throw new BadRequestError('Invalid course ID');
    }
    
    const modules = await ModuleService.findModulesByCourseId(courseId);
    
    return res.status(200).json({
      success: true,
      data: modules
    });
  } catch (error) {
    throw error;
  }
};