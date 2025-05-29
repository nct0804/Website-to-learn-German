import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

export interface CreateUserData {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  username: string;
  firstName?: string | null; // null oder undefined erlauben
  lastName?: string | null; // null oder undefined erlauben
  level: number;
  xp: number;
  streak: number;
  lastLogin?: Date | null; // null oder undefined erlauben
  createdAt: Date;
}

export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}

class UserService {
  async createUser(userData: CreateUserData): Promise<UserResponse> {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: userData.email }, { username: userData.username }],
      },
    });

    if (existingUser) {
      throw new Error("User with this email or username already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        level: true,
        xp: true,
        streak: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    return user;
  }

  async loginUser(loginData: LoginData): Promise<AuthResponse> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: loginData.email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Update last login and streak
    const updatedUser = await this.updateLoginStreak(user.id, user.lastLogin);

    // Generate tokens
    const { accessToken, refreshToken } = await this.generateTokens(user.id);

    const userResponse: UserResponse = {
      id: updatedUser.id,
      email: updatedUser.email,
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      level: updatedUser.level,
      xp: updatedUser.xp,
      streak: updatedUser.streak,
      lastLogin: updatedUser.lastLogin,
      createdAt: updatedUser.createdAt,
    };

    return {
      user: userResponse,
      accessToken,
      refreshToken,
    };
  }

  async getUserById(userId: string): Promise<UserResponse | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        level: true,
        xp: true,
        streak: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    return user;
  }

  async updateUserProgress(
    userId: string,
    xpGained: number
  ): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const newXp = user.xp + xpGained;
    const newLevel = this.calculateLevel(newXp);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: newXp,
        level: newLevel,
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        level: true,
        xp: true,
        streak: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    return updatedUser;
  }

  private async updateLoginStreak(
    userId: string,
    lastLogin: Date | null
  ): Promise<any> {
    const now = new Date();
    let newStreak = 1;

    if (lastLogin) {
      const daysSinceLastLogin = Math.floor(
        (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastLogin === 1) {
        // Consecutive day
        const currentUser = await prisma.user.findUnique({
          where: { id: userId },
        });
        newStreak = (currentUser?.streak || 0) + 1;
      } else if (daysSinceLastLogin > 1) {
        // Streak broken
        newStreak = 1;
      } else {
        // Same day - don't update streak
        const currentUser = await prisma.user.findUnique({
          where: { id: userId },
        });
        newStreak = currentUser?.streak || 1;
      }
    }

    return await prisma.user.update({
      where: { id: userId },
      data: {
        lastLogin: now,
        streak: newStreak,
      },
    });
  }

  private calculateLevel(xp: number): number {
    // Simple level calculation: level = floor(xp / 100) + 1
    return Math.floor(xp / 100) + 1;
  }

  private async generateTokens(
    userId: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const jwtSecret = process.env.JWT_SECRET;
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!jwtSecret || !jwtRefreshSecret) {
      throw new Error("JWT secrets not configured");
    }

    // Generate access token
    const accessToken = jwt.sign({ userId }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    } as SignOptions);

    // Generate refresh token
    const refreshToken = jwt.sign({ userId }, jwtRefreshSecret, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    } as SignOptions);

    // Store refresh token in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId,
        expiresAt,
      },
    });

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(
    refreshToken: string
  ): Promise<{ accessToken: string }> {
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtRefreshSecret || !jwtSecret) {
      throw new Error("JWT secrets not configured");
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, jwtRefreshSecret) as {
      userId: string;
    };

    // Check if refresh token exists in database
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new Error("Invalid or expired refresh token");
    }

    // Generate new access token
    const accessToken = jwt.sign({ userId: decoded.userId }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    } as SignOptions);

    return { accessToken };
  }

  async logout(refreshToken: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
  }
}

export default new UserService();
