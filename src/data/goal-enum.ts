export const MODE_GOAL = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  DELETE: "DELETE",
  CLONE: "CLONE",
  EMPTY: "EMPTY",
} as const;

export type ModeGoal = keyof typeof MODE_GOAL;
