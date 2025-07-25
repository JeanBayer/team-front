import { instance } from "@/api/api";
import type {
  CreateRetrospective,
  Retrospective,
  UpdateRetrospective,
} from "@/types/retrospective";
import { AxiosError } from "axios";

export class RetrospectiveService {
  static async createRetrospective(
    teamId: string,
    createRetrospective: CreateRetrospective
  ) {
    try {
      const { data } = await instance.post<Retrospective>(
        `/teams/${teamId}/retrospectives`,
        createRetrospective
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async updateRetrospective(
    teamId: string,
    retroId: string,
    updateRetrospective: UpdateRetrospective
  ) {
    try {
      const { data } = await instance.patch<Retrospective>(
        `/teams/${teamId}/retrospectives/${retroId}`,
        updateRetrospective
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async getRetrospectives(teamId: string) {
    try {
      const { data } = await instance.get<Retrospective[]>(
        `/teams/${teamId}/retrospectives`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async getRetrospective(teamId: string, retroId: string) {
    try {
      const { data } = await instance.get<Retrospective>(
        `/teams/${teamId}/retrospectives/${retroId}`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async closeRetrospective(teamId: string, retroId: string) {
    try {
      const { data } = await instance.post<Retrospective>(
        `/teams/${teamId}/retrospectives/${retroId}/close`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }
}
