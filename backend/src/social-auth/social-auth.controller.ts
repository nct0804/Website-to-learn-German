// backend/src/modules/user/social-auth.controller.ts
import { Request, Response, NextFunction } from "express";
import { socialAuthService } from "../social-auth/social-auth.service";
import { AuthRequest } from "../middleware/auth.middleware";
import { BadRequestError } from "../utils/errors";

const ACCESS_COOKIE_MS = 15 * 60 * 1000; // 15 min
const REFRESH_COOKIE_MS = 30 * 24 * 60 * 60 * 1000; // 30 Tage
const prod = process.env.NODE_ENV === "production";

const cookieBase = {
  httpOnly: true,
  secure: prod,
  sameSite: prod ? "none" : "lax",
  path: "/",
} as const;

const setCookies = (res: Response, access: string, refresh?: string) => {
  res.cookie("token", access, { ...cookieBase, maxAge: ACCESS_COOKIE_MS });
  if (refresh)
    res.cookie("refreshToken", refresh, {
      ...cookieBase,
      maxAge: REFRESH_COOKIE_MS,
    });
};

const stripPw = <T extends { password?: unknown }>(u: T) => ({
  ...u,
  password: undefined,
});

export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      throw new BadRequestError("Google ID Token ist erforderlich");
    }

    const socialProfile = await socialAuthService.verifyGoogleToken(idToken);
    const { user, token, refreshToken } =
      await socialAuthService.authenticateWithSocial(socialProfile);

    setCookies(res, token, refreshToken);

    res.json({
      success: true,
      data: {
        user: stripPw(user),
        provider: "google",
      },
    });
  } catch (err) {
    next(err);
  }
};

export const facebookLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      throw new BadRequestError("Facebook Access Token ist erforderlich");
    }

    const socialProfile = await socialAuthService.verifyFacebookToken(
      accessToken
    );

    const { user, token, refreshToken } =
      await socialAuthService.authenticateWithSocial(socialProfile);

    setCookies(res, token, refreshToken);

    res.json({
      success: true,
      data: {
        user: stripPw(user),
        provider: "facebook",
      },
    });
  } catch (err) {
    next(err);
  }
};

export const appleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { identityToken, authorizationCode } = req.body;

    if (!identityToken) {
      throw new BadRequestError("Apple Identity Token ist erforderlich");
    }

    const socialProfile = await socialAuthService.verifyAppleToken(
      identityToken,
      authorizationCode
    );

    const { user, token, refreshToken } =
      await socialAuthService.authenticateWithSocial(socialProfile);

    setCookies(res, token, refreshToken);

    res.json({
      success: true,
      data: {
        user: stripPw(user),
        provider: "apple",
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getSocialAccounts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new BadRequestError("User muss eingeloggt sein");
    }

    const socialAccounts: never[] = [];

    res.json({
      success: true,
      data: { socialAccounts },
    });
  } catch (err) {
    next(err);
  }
};

export const unlinkSocialAccount = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new BadRequestError("User muss eingeloggt sein");
    }

    const { provider } = req.params;

    if (!["google", "facebook", "apple"].includes(provider)) {
      throw new BadRequestError("Ungültiger Provider");
    }

    res.json({
      success: true,
      message: `${provider} Verknüpfung entfernt`,
    });
  } catch (err) {
    next(err);
  }
};
