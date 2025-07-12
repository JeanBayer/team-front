import { instance } from "@/api/api";
import type { Goal } from "@/types/goal";
import { AxiosError } from "axios";

export class GoalService {
  static async getGoals(teamId: string, counterId: string, typeGoals: string) {
    try {
      const { data } = await instance.get<Goal[]>(
        `/teams/${teamId}/counters/${counterId}/goals?type=${typeGoals}`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }
}
