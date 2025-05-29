// backend/src/modules/user/user.controller.ts
import { Request, Response } from "express";
import userService from "./user.service";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, username, password, firstName, lastName } = req.body;

      // Validation
      if (!email || !username || !password) {
        res.status(400).json({
          error: "Email, username, and password are required",
          code: "MISSING_FIELDS",
        });
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          error: "Invalid email format",
          code: "INVALID_EMAIL",
        });
        return;
      }

      // Password validation
      if (password.length < 6) {
        res.status(400).json({
          error: "Password must be at least 6 characters long",
          code: "WEAK_PASSWORD",
        });
        return;
      }

      const user = await userService.createUser({
        email,
        username,
        password,
        firstName,
        lastName,
      });

      res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error.message.includes("already exists")) {
        res.status(409).json({
          error: error.message,
          code: "USER_EXISTS",
        });
        return;
      }

      res.status(500).json({
        error: "Registration failed",
        code: "REGISTRATION_ERROR",
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          error: "Email and password are required",
          code: "MISSING_CREDENTIALS",
        });
        return;
      }

      const authResult = await userService.loginUser({ email, password });

      // Set refresh token as httpOnly cookie
      res.cookie("refreshToken", authResult.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({
        message: "Login successful",
        user: authResult.user,
        accessToken: authResult.accessToken,
      });
    } catch (error: any) {
      console.error("Login error:", error);

      if (error.message === "Invalid credentials") {
        res.status(401).json({
          error: "Invalid email or password",
          code: "INVALID_CREDENTIALS",
        });
        return;
      }

      res.status(500).json({
        error: "Login failed",
        code: "LOGIN_ERROR",
      });
    }
  }

  async getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          error: "User not authenticated",
          code: "NOT_AUTHENTICATED",
        });
        return;
      }

      res.json({
        user: req.user,
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({
        error: "Failed to get user information",
        code: "GET_USER_ERROR",
      });
    }
  }

  async updateProgress(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.userId) {
        res.status(401).json({
          error: "User not authenticated",
          code: "NOT_AUTHENTICATED",
        });
        return;
      }

      const { xpGained } = req.body;

      if (typeof xpGained !== "number" || xpGained < 0) {
        res.status(400).json({
          error: "Invalid XP amount",
          code: "INVALID_XP",
        });
        return;
      }

      const updatedUser = await userService.updateUserProgress(
        req.userId,
        xpGained
      );

      res.json({
        message: "Progress updated successfully",
        user: updatedUser,
      });
    } catch (error: any) {
      console.error("Update progress error:", error);

      if (error.message === "User not found") {
        res.status(404).json({
          error: "User not found",
          code: "USER_NOT_FOUND",
        });
        return;
      }

      res.status(500).json({
        error: "Failed to update progress",
        code: "UPDATE_PROGRESS_ERROR",
      });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).json({
          error: "Refresh token missing",
          code: "REFRESH_TOKEN_MISSING",
        });
        return;
      }

      const result = await userService.refreshAccessToken(refreshToken);

      res.json({
        accessToken: result.accessToken,
      });
    } catch (error: any) {
      console.error("Refresh token error:", error);

      res.status(401).json({
        error: "Invalid or expired refresh token",
        code: "INVALID_REFRESH_TOKEN",
      });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (refreshToken) {
        await userService.logout(refreshToken);
      }

      res.clearCookie("refreshToken");
      res.json({
        message: "Logout successful",
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        error: "Logout failed",
        code: "LOGOUT_ERROR",
      });
    }
  }
}

export default new UserController();
