import { instance } from "@/api/api";
import type { BasicTeam, CreateTeam, JoinTeam } from "@/types/team";

export class TeamService {
  static async getTeams() {
    try {
      const { data } = await instance.get<BasicTeam[]>("/teams");
      return data;
    } catch (error) {
      console.error("getTeams error", error);
      throw new Error("error");
    }
  }

  static async createTeam(createTeam: CreateTeam) {
    try {
      const { data } = await instance.post<BasicTeam>("/teams", createTeam);
      return data;
    } catch (error) {
      console.error("createTeam error", error);
      throw new Error("error");
    }
  }

  static async joinTeam(joinTeam: JoinTeam) {
    const { id, ...rest } = joinTeam;
    try {
      const { data } = await instance.post<BasicTeam>(
        `teams/${id}/users`,
        rest
      );
      return data;
    } catch (error) {
      console.error("createTeam error", error);
      throw new Error("error");
    }
  }
}
