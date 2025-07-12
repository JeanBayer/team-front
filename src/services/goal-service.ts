import { instance } from "@/api/api";
import type { CreateGoal, Goal, UpdateGoal } from "@/types/goal";
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

  static async createGoal(
    teamId: string,
    counterId: string,
    createGoal: CreateGoal
  ) {
    try {
      const { data } = await instance.post<Goal>(
        `/teams/${teamId}/counters/${counterId}/goals`,
        createGoal
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async updateGoal(
    teamId: string,
    counterId: string,
    updateGoal: UpdateGoal
  ) {
    const { id: goalId, ...body } = updateGoal;
    try {
      const { data } = await instance.patch<Goal>(
        `/teams/${teamId}/counters/${counterId}/goals/${goalId}`,
        body
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }
}
