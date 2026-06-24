import { clearTokens, getRefreshToken, setTokens } from '@/lib/auth/tokens';
import type { AuthResponse, AuthTokens, User } from '@/types';
import { apiClient } from './client';

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/register', payload);
  if (response.data?.tokens) {
    setTokens(response.data.tokens);
  }
  return response.data!;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/login', payload);
  if (response.data?.tokens) {
    setTokens(response.data.tokens);
  }
  return response.data!;
}

export async function logout(): Promise<void> {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    try {
      await apiClient.post('/auth/logout', { refreshToken });
    } catch {
      // Clear local session even if server logout fails
    }
  }
  clearTokens();
}

export async function getProfile(): Promise<User> {
  const response = await apiClient.get<{ user: User }>('/users/me');
  return response.data!.user;
}

export async function refreshTokens(): Promise<AuthTokens> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  const response = await apiClient.post<{ tokens: AuthTokens }>('/auth/refresh', {
    refreshToken,
  });
  setTokens(response.data!.tokens);
  return response.data!.tokens;
}
