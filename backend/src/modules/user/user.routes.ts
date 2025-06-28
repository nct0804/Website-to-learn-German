// backend/src/modules/user/user.routes.ts - Erweitert um Social Auth
import { Router } from "express";
import * as userController from "./user.controller";
import * as socialAuthController from "../../social-auth/social-auth.controller";
import { authenticate } from "../../middleware/auth.middleware";
import {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
  requestPasswordResetValidation,
  resetPasswordValidation,
} from "../../middleware/validation";
import {
  googleLoginValidation,
  facebookLoginValidation,
  appleLoginValidation,
} from "../../middleware/social-auth.validation";

const router = Router();

router.post("/register", registerValidation, userController.register);
router.post("/login", loginValidation, userController.login);
router.post("/refresh-token", userController.refreshToken);
router.post("/logout", userController.logout);

router.post(
  "/auth/google",
  googleLoginValidation,
  socialAuthController.googleLogin
);
router.post(
  "/auth/facebook",
  facebookLoginValidation,
  socialAuthController.facebookLogin
);
router.post(
  "/auth/apple",
  appleLoginValidation,
  socialAuthController.appleLogin
);

router.get("/me", authenticate, userController.getCurrentUser);

router.get(
  "/auth/social-accounts",
  authenticate,
  socialAuthController.getSocialAccounts
);
router.delete(
  "/auth/social-accounts/:provider",
  authenticate,
  socialAuthController.unlinkSocialAccount
);

export default router;
