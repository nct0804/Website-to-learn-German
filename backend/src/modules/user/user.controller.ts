import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import { AuthRequest } from "../../middleware/auth.middleware";
import { BadRequestError } from "../../utils/errors";

const ACCESS_COOKIE_MS = 15 * 60 * 1000;
const REFRESH_COOKIE_MS = 30 * 24 * 60 * 60 * 1000;

const setCookies = (res: Response, token: string, refresh?: string) => {
  const common = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none" as const,
    path: "/",
  };
  res.cookie("token", token, { ...common, maxAge: ACCESS_COOKIE_MS });
  if (refresh)
    res.cookie("refreshToken", refresh, {
      ...common,
      maxAge: REFRESH_COOKIE_MS,
    });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, token, refreshToken } = await userService.registerUser(
      req.body
    );
    setCookies(res, token, refreshToken);
    res.status(201).json({
      success: true,
      data: {
        user: stripPw(user),
        accessToken: token,
        refreshToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new BadRequestError("Email + password required");
    const { user, token, refreshToken } = await userService.loginUser(
      email,
      password
    );
    setCookies(res, token, refreshToken);
    res.json({
      success: true,
      data: { user: stripPw(user), accessToken: token, refreshToken },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.logoutUser(req.cookies.refreshToken);
    clearCookies(res);
    res.json({ success: true, message: "Logged out" });
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ success: true, data: { user: stripPw(req.user!) } });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new BadRequestError("No refresh token");
    const { token } = await userService.refreshAccessToken(refreshToken);
    setCookies(res, token);
    res.json({ success: true, message: "Token refreshed", accessToken: token });
  } catch (err) {
    next(err);
  }
};

const stripPw = <T extends { password?: unknown }>(u: T) => ({
  ...u,
  password: undefined,
});
const clearCookies = (res: Response) => {
  ["token", "refreshToken"].forEach((c) => res.clearCookie(c, { path: "/" }));
};
