export interface BasicTeam {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTeam {
  name: string;
  joinPassword: string;
}

export interface JoinTeam {
  id: string;
  joinPassword: string;
}

export interface RankingUser {
  id: string;
  name: string;
  totalSprintWinner: number;
  teamSprintWinner: number;
}
