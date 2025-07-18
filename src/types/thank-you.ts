import type { User } from "./user";

export interface ThankYou {
  id: string;
  message: string;
  giverId: string;
  giver: Pick<User, "id" | "name">;
  receiverId: string;
  receiver: Pick<User, "id" | "name">;
  retrospectiveId: string;
  createdAt: Date;
}

export interface CreateThankYou {
  userId: string;
  message: string;
}
