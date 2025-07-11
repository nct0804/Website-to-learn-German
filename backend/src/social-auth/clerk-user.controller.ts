import { Response, NextFunction } from "express";
import { ClerkRequest } from "../middleware/clerk.middleware";
import { ClerkUserService } from "../social-auth/clerk-user.service";

export const syncClerkUser = async (
  req: ClerkRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  //
  try {
    const { clerkUserId, email, firstName, lastName, username } = req.body;

    if (!clerkUserId || !email) {
      res.status(400).json({
        success: false,
        message: "Clerk User ID and email are required",
      });
      return;
    }

    const user = await ClerkUserService.syncUserWithClerk({
      clerkUserId,
      email,
      firstName,
      lastName,
      username,
    });

    const { password, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    next(error);
  }
};
