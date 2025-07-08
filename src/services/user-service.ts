import { instance } from "@/api/api";
import type { User } from "@/types/user";

export class UserService {
  static async getUser() {
    try {
      const { data } = await instance.get<User>("/users");
      return data;
    } catch (error) {
      console.error("getUser error", error);
      throw new Error("error");
    }
  }
}
