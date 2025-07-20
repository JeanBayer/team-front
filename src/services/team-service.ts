import { instance } from "@/api/api";
import type {
  BasicTeam,
  CreateTeam,
  RankingUser,
  UpdateTeam,
} from "@/types/team";
import { AxiosError } from "axios";

export class TeamService {
  static async getTeams() {
    try {
      const { data } = await instance.get<BasicTeam[]>("/teams");
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async getTeam(teamId: string) {
    try {
      const { data } = await instance.get<BasicTeam>(`/teams/${teamId}`);
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async createTeam(createTeam: CreateTeam) {
    try {
      const { data } = await instance.post<BasicTeam>("/teams", createTeam);
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async updateTeam(teamId: string, updateTeam: UpdateTeam) {
    try {
      const { data } = await instance.patch<BasicTeam>(
        `/teams/${teamId}`,
        updateTeam
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async getTeamRanking(teamId: string) {
    try {
      const { data } = await instance.get<RankingUser[]>(
        `/teams/${teamId}/ranking`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }
}
