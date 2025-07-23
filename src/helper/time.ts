import { DateTime } from "luxon";

export const minute = (minutes: number) => {
  const seconds = minutes * 60;

  return {
    value: seconds,
    toMS: () => secondsToMs(seconds),
  };
};

export const secondsToMs = (seconds: number) => seconds * 1000;

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export class DateChile {
  private static ZONE = "America/Santiago";

  static convertDateToChile(date: string) {
    return DateTime.fromISO(date, { zone: "UTC" }).setZone(this.ZONE);
  }
}
