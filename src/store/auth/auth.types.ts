export interface AuthState {
  token: string | null;
}

export interface LoginResponse {
  token: string;
  user: any;
}
