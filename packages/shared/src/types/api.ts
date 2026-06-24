export interface JwtPayload {
  sub: string;
  email: string;
  username: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  rating: number;
  wins: number;
  losses: number;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[] | undefined>;
}
