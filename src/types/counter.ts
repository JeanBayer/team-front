export interface CreateCounter {
  name: string;
  incrementButtonLabel: string;
  resetButtonLabel: string;
}

export interface Counter {
  id: string;
  teamId: string;
  name: string;
  currentCount: number;
  longestStreak: number;
  lastResetDuration: number;
  incrementButtonLabel: string;
  resetButtonLabel: string;
  createdAt: Date;
  updatedAt: Date;
  alreadyModifiedToday: boolean;
}

export interface ResetCounter {
  nameEvent: string;
}
