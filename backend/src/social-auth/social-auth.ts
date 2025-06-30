export interface SocialProfile {
  provider: "google" | "facebook" | "apple";
  providerId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  photoUrl?: string;
}

export interface GoogleProfile {
  id: string;
  email: string;
  given_name?: string;
  family_name?: string;
  name?: string;
  picture?: string;
}

export interface FacebookProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  picture?: {
    data: {
      url: string;
    };
  };
}

export interface AppleProfile {
  sub: string;
  email: string;
  given_name?: string;
  family_name?: string;
}

export interface UserSocialAuth {
  userId: string;
  provider: "google" | "facebook" | "apple";
  providerId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
