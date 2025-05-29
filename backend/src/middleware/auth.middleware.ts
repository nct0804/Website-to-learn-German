import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userService from "../../modules/user/user.service";

export interface AuthenticatedRequest extends Request {
  userId?: string;
  user?: any;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({
        error: "Access token missing",
        code: "TOKEN_MISSING",
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({
        error: "JWT secret not configured",
        code: "SERVER_ERROR",
      });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, jwtSecret) as { userId: string };

    // Get user from database
    const user = await userService.getUserById(decoded.userId);
    if (!user) {
      res.status(401).json({
        error: "User not found",
        code: "USER_NOT_FOUND",
      });
      return;
    }

    // Attach user info to request
    req.userId = decoded.userId;
    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        error: "Invalid token",
        code: "INVALID_TOKEN",
      });
      return;
    }

    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        error: "Token expired",
        code: "TOKEN_EXPIRED",
      });
      return;
    }

    console.error("Auth middleware error:", error);
    res.status(500).json({
      error: "Internal server error",
      code: "SERVER_ERROR",
    });
  }
};

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      next();
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      next();
      return;
    }

    const decoded = jwt.verify(token, jwtSecret) as { userId: string };
    const user = await userService.getUserById(decoded.userId);

    if (user) {
      req.userId = decoded.userId;
      req.user = user;
    }

    next();
  } catch (error) {
    next();
  }
};
