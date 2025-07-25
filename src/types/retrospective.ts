export interface Retrospective {
  id: string;
  retrospectiveName: string;
  retrospectiveNumber: number;
  status: string;
  teamId: string;
  createdAt: Date;
  sprintWinner: SprintWinner | null;
}

export interface SprintWinner {
  id: string;
  name: string;
  sprintWins: number;
}

export interface CreateRetrospective {
  retrospectiveName: string;
}

export interface UpdateRetrospective extends CreateRetrospective {}
