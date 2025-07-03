export interface AuthCreate {
  name: string;
  email: string;
  password: string;
}

export interface AuthLogin extends Pick<AuthCreate, "email" | "password"> {}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
