import { instance } from "@/api/api";
import type { BasicTeam, CreateTeam, RankingUser } from "@/types/team";

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

  static async getTeam(teamId: string) {
    try {
      const { data } = await instance.get<BasicTeam>(`/teams/${teamId}`);
      return data;
    } catch (error) {
      console.error("getTeam error", error);
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

  static async getTeamRanking(teamId: string) {
    try {
      const { data } = await instance.get<RankingUser[]>(
        `/teams/${teamId}/ranking`
      );
      return data;
    } catch (error) {
      console.error("getTeamRanking error", error);
      throw new Error("error");
    }
  }
}
