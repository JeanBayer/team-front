import type { User } from "./user";

export interface AuthCreate {
  name: string;
  email: string;
  password: string;
}

export interface AuthLogin extends Pick<AuthCreate, "email" | "password"> {}

export interface AuthResponse {
  user: UserAuth;
  token: string;
}

export interface UserAuth extends Pick<User, "id" | "email" | "name"> {}
