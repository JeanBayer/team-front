export interface MyMembership {
  userId: string;
  teamId: string;
  isAdmin: boolean;
  joinedAt: Date;
  user: User;
}

export interface User {
  name: string;
  email: string;
}
