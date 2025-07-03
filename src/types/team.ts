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
