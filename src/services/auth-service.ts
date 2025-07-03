import { instance } from "@/api/api";
import type { AuthCreate, AuthResponse } from "@/types/auth";

export class AuthService {
  static async createAccount(authCreate: AuthCreate) {
    try {
      const { data } = await instance.post<AuthResponse>(
        "/auth/register",
        authCreate
      );
      return data;
    } catch (error) {
      console.error("createAccount error", error);
      throw new Error("error");
    }
  }
}
