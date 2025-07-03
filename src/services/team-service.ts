import { instance } from "@/api/api";
import type { BasicTeam } from "@/types/team";

export class TeamService {
  static async getTeams() {
    try {
      const { data } = await instance.get<BasicTeam[]>("/teams");
      return data;
    } catch (error) {
      console.error("createAccount error", error);
      throw new Error("error");
    }
  }
}
