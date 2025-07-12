export const minute = (minutes: number) => {
  const seconds = minutes * 60;

  return {
    value: seconds,
    toMS: () => secondsToMs(seconds),
  };
};

export const secondsToMs = (seconds: number) => seconds * 1000;
