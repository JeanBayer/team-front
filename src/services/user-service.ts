import { instance } from "@/api/api";
import type { User } from "@/types/user";
import { AxiosError } from "axios";

export class UserService {
  static async getUser() {
    try {
      const { data } = await instance.get<User>("/users");
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }
}
