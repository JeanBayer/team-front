export interface User {
  id: string;
  name: string;
  email: string;
  sprintWins: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUser extends Partial<Pick<User, "name">> {
  password?: string;
}
