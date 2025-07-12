export const MODE_GOAL = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  DELETE: "DELETE",
  CLONE: "CLONE",
  EMPTY: "EMPTY",
} as const;

export const TYPE_GOALS = {
  AVAILABLE: "disponibles",
  ACHIEVED: "achieved",
} as const;

export type ModeGoal = keyof typeof MODE_GOAL;
export type TypeGoals = (typeof TYPE_GOALS)[keyof typeof TYPE_GOALS];
