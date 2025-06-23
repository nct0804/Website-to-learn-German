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

router.post("/register", registerValidation, userController.register);
router.post("/login", loginValidation, userController.login);
router.post("/refresh-token", userController.refreshToken);

router.get("/me", authenticate, userController.getCurrentUser);
router.post("/logout", userController.logout);

export default router;
