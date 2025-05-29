import { Router } from "express";
import userController from "./user.controller";
import { authenticateToken } from "../../middleware/auth.middleware";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/refresh", userController.refreshToken);
router.post("/logout", userController.logout);

router.get("/me", authenticateToken, userController.getMe);
router.put("/progress", authenticateToken, userController.updateProgress);

export default router;
