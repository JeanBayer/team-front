import { instance } from "@/api/api";
import type { AuthCreate, AuthLogin, AuthResponse } from "@/types/auth";
import { AxiosError } from "axios";

export class AuthService {
  static async createAccount(authCreate: AuthCreate) {
    try {
      const { data } = await instance.post<AuthResponse>(
        "/auth/register",
        authCreate
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async login(authLogin: AuthLogin) {
    try {
      const { data } = await instance.post<AuthResponse>(
        "/auth/login",
        authLogin
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async verify() {
    try {
      const { data } = await instance.get<AuthResponse>("/auth/verify");
      return data;
    } catch (error) {
      console.error("login error", error);
      throw new Error("error");
    }
  }
}
