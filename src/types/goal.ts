export interface Goal {
  id: string;
  description: string;
  targetDays: number;
  achieved: boolean;
  achievedAt: Date | null;
  counterId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGoal {
  description: string;
  targetDays: number;
}
