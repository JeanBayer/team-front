import type { User } from "./user";

export interface Membership {
  userId: string;
  teamId: string;
  isAdmin: boolean;
  joinedAt: Date;
  user: UserMembership;
}

export interface UserMembership extends Pick<User, "email" | "name"> {}
