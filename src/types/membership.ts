export interface Membership {
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
