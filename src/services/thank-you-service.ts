import { instance } from "@/api/api";
import type { CreateThankYou, ThankYou } from "@/types/thank-you";
import { AxiosError } from "axios";

export class ThankYouService {
  static async createThankYou(
    teamId: string,
    retroId: string,
    createThankYou: CreateThankYou
  ) {
    try {
      const { data } = await instance.post<ThankYou>(
        `/teams/${teamId}/retrospectives/${retroId}/thank-you`,
        createThankYou
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async getThankYousIntoRetrospective(teamId: string, retroId: string) {
    try {
      const { data } = await instance.get<ThankYou[]>(
        `/teams/${teamId}/retrospectives/${retroId}/thank-you`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }
}
