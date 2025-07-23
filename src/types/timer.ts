export interface Timer {
  id: string;
  teamId: string;
  duration: number;
  endsAt: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTimer {
  minutes: number;
}
