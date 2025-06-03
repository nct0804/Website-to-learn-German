import { Router } from "express";
import * as userController from "./user.controller";
import { authenticate } from "../../middleware/auth.middleware";
import {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
  requestPasswordResetValidation,
  resetPasswordValidation,
} from "../../middleware/validation";

const router = Router();

router.post("/auth/register", registerValidation, userController.register);
router.post("/auth/login", loginValidation, userController.login);
router.post("/auth/refresh-token", userController.refreshToken);

router.get("/auth/me", authenticate, userController.getCurrentUser);
router.post("/auth/logout", authenticate, userController.logout);

export default router;
