import { OAuth2Client } from "google-auth-library";
import AppleAuth from "apple-signin-auth";
import {
  SocialProfile,
  GoogleProfile,
  FacebookProfile,
  AppleProfile,
} from "./social-auth";
import { generateToken, generateRefreshToken } from "../utils/security";
import {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
} from "../utils/errors";
import prisma from "../lib/prisma";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const REFRESH_DAYS = 30;

export class SocialAuthService {
  async verifyGoogleToken(token: string): Promise<SocialProfile> {
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new UnauthorizedError("Invalid Google token");
      }

      const profile: GoogleProfile = {
        id: payload.sub,
        email: payload.email!,
        given_name: payload.given_name,
        family_name: payload.family_name,
        name: payload.name,
        picture: payload.picture,
      };

      return this.mapGoogleProfile(profile);
    } catch (error) {
      console.error("Google token verification failed:", error);
      throw new UnauthorizedError("Google token verification failed");
    }
  }

  async verifyFacebookToken(accessToken: string): Promise<SocialProfile> {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/me?fields=id,email,first_name,last_name,name,picture&access_token=${accessToken}`
      );

      if (!response.ok) {
        throw new UnauthorizedError("Invalid Facebook token");
      }

      const profile: FacebookProfile = await response.json();

      if (!profile.email) {
        throw new BadRequestError(
          "Facebook account muss eine E-Mail-Adresse haben"
        );
      }

      return this.mapFacebookProfile(profile);
    } catch (error) {
      console.error("Facebook token verification failed:", error);
      throw new UnauthorizedError("Facebook token verification failed");
    }
  }

  async verifyAppleToken(
    identityToken: string,
    authorizationCode?: string
  ): Promise<SocialProfile> {
    try {
      const appleData = await AppleAuth.verifyIdToken(identityToken, {
        audience: process.env.APPLE_CLIENT_ID!,
        ignoreExpiration: false,
      });

      const profile: AppleProfile = {
        sub: appleData.sub,
        email: appleData.email,
        given_name: (appleData as any).given_name || undefined,
        family_name: (appleData as any).family_name || undefined,
      };

      return this.mapAppleProfile(profile);
    } catch (error) {
      console.error("Apple token verification failed:", error);
      throw new UnauthorizedError("Apple token verification failed");
    }
  }

  private mapGoogleProfile(profile: GoogleProfile): SocialProfile {
    return {
      provider: "google",
      providerId: profile.id,
      email: profile.email,
      firstName: profile.given_name,
      lastName: profile.family_name,
      displayName: profile.name,
      photoUrl: profile.picture,
    };
  }

  private mapFacebookProfile(profile: FacebookProfile): SocialProfile {
    return {
      provider: "facebook",
      providerId: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      displayName: profile.name,
      photoUrl: profile.picture?.data?.url,
    };
  }

  private mapAppleProfile(profile: AppleProfile): SocialProfile {
    return {
      provider: "apple",
      providerId: profile.sub,
      email: profile.email,
      firstName: profile.given_name,
      lastName: profile.family_name,
      displayName:
        `${profile.given_name || ""} ${profile.family_name || ""}`.trim() ||
        profile.email.split("@")[0],
    };
  }

  async authenticateWithSocial(socialProfile: SocialProfile) {
    try {
      let user = await this.findUserBySocialProvider(
        socialProfile.provider,
        socialProfile.providerId
      );

      if (user) {
        await this.updateLastLogin(user.id);
        const token = generateToken(user.id);
        const refreshToken = await this.storeRefreshToken(user.id);
        return { user, token, refreshToken };
      }

      const existingUser = await this.findUserByEmail(socialProfile.email);

      if (existingUser) {
        await this.linkSocialProvider(existingUser.id, socialProfile);
        await this.updateLastLogin(existingUser.id);
        const token = generateToken(existingUser.id);
        const refreshToken = await this.storeRefreshToken(existingUser.id);
        return { user: existingUser, token, refreshToken };
      }

      const newUser = await this.createUserFromSocialProfile(socialProfile);
      const token = generateToken(newUser.id);
      const refreshToken = await this.storeRefreshToken(newUser.id);
      return { user: newUser, token, refreshToken };
    } catch (error) {
      console.error("Social authentication failed:", error);
      throw error;
    }
  }

  async findUserBySocialProvider(provider: string, providerId: string) {
    try {
      const tempUser = await prisma.user.findFirst({
        where: {
          username: {
            contains: `${provider}_${providerId}`,
          },
        },
      });

      return tempUser;
    } catch (error) {
      console.error("Error finding user by social provider:", error);
      return null;
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error("Error finding user by email:", error);
      return null;
    }
  }

  async linkSocialProvider(userId: string, socialProfile: SocialProfile) {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          username: `${socialProfile.provider}_${
            socialProfile.providerId
          }_${userId.slice(0, 8)}`,
        },
      });

      console.log(`Linked ${socialProfile.provider} to user ${userId}`);
    } catch (error) {
      console.error("Error linking social provider:", error);
      throw new BadRequestError("Fehler beim Verknüpfen des Social Accounts");
    }
  }

  async createUserFromSocialProfile(socialProfile: SocialProfile) {
    try {
      let username = `${socialProfile.provider}_${socialProfile.providerId}`;
      let counter = 1;

      while (await this.usernameExists(username)) {
        username = `${socialProfile.provider}_${socialProfile.providerId}_${counter}`;
        counter++;
      }

      const user = await prisma.user.create({
        data: {
          email: socialProfile.email,
          username: username,
          firstName: socialProfile.firstName || "",
          lastName: socialProfile.lastName || "",
          password: "", // Leerer String für Social Login User
        },
      });

      return user;
    } catch (error) {
      console.error("Error creating user from social profile:", error);
      if (error instanceof ConflictError) {
        throw error;
      }
      throw new BadRequestError("Fehler beim Erstellen des Users");
    }
  }

  async usernameExists(username: string): Promise<boolean> {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });
      return !!user;
    } catch (error) {
      console.error("Error checking username existence:", error);
      return false;
    }
  }

  async updateLastLogin(userId: string) {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { lastLogin: new Date() },
      });
    } catch (error) {
      console.error("Error updating last login:", error);
    }
  }

  private async storeRefreshToken(userId: string) {
    const refreshToken = generateRefreshToken(userId);
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId,
        expiresAt: new Date(Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000),
      },
    });
    return refreshToken;
  }

  async getSocialAccountsForUser(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { username: true },
      });

      const socialAccounts = [];
      if (user?.username.includes("google_")) {
        socialAccounts.push({ provider: "google", createdAt: new Date() });
      }
      if (user?.username.includes("facebook_")) {
        socialAccounts.push({ provider: "facebook", createdAt: new Date() });
      }
      if (user?.username.includes("apple_")) {
        socialAccounts.push({ provider: "apple", createdAt: new Date() });
      }

      return socialAccounts;
    } catch (error) {
      console.error("Error getting social accounts:", error);
      return [];
    }
  }

  async unlinkSocialProvider(userId: string, provider: string) {
    try {
      throw new BadRequestError(
        "Social Account unlinking wird nach der Prisma Migration verfügbar sein"
      );
    } catch (error) {
      console.error("Error unlinking social provider:", error);
      throw error;
    }
  }
}

export const socialAuthService = new SocialAuthService();
