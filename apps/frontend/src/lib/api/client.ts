import { env } from '@/lib/env';
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from '@/lib/auth/tokens';
import type { AuthTokens } from '@/types';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[] | undefined>;
}

export class ApiError extends Error {
  public type: 'network' | 'auth' | 'validation' | 'server' | 'unknown';
  constructor(
    message: string,
    public statusCode: number,
    public errors?: Record<string, string[] | undefined>,
    type: 'network' | 'auth' | 'validation' | 'server' | 'unknown' = 'unknown',
  ) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
  }
}

class ApiClient {
  private baseUrl: string;
  private refreshPromise: Promise<boolean> | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = getAccessToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private async refreshTokens(): Promise<boolean> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performRefresh();

    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performRefresh(): Promise<boolean> {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ refreshToken }),
      });

      const data = (await response.json()) as ApiResponse<{ tokens: AuthTokens }>;

      if (!response.ok || !data.success || !data.data?.tokens) {
        clearTokens();
        return false;
      }

      setTokens(data.data.tokens);
      return true;
    } catch {
      clearTokens();
      return false;
    }
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    retry = true,
  ): Promise<ApiResponse<T>> {
    let response: Response;

    try {
      response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: this.getHeaders(),
        credentials: 'include',
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (error) {
      // Network-level error (DNS, ECONNREFUSED, CORS preflight blocked, etc.)
      throw new ApiError(
        'Unable to reach the backend server. Please ensure it is running and accessible.',
        0,
        undefined,
        'network',
      );
    }

    if (response.status === 401) {
      // Authentication failure: clear tokens and notify app
      try {
        // best-effort clear local tokens
        const { clearTokens } = await import('@/lib/auth/tokens');
        clearTokens();
      } catch {}
      // let the app react to auth failures
      window.dispatchEvent(new CustomEvent('auth-failed'));

      // Attempt refresh only if we were provided with a refresh token and haven't retried
      if (retry && getRefreshToken()) {
        const refreshed = await this.refreshTokens();
        if (refreshed) {
          return this.request<T>(method, endpoint, body, false);
        }
      }
      throw new ApiError('Authentication failed', 401, undefined, 'auth');
    }

    let data: ApiResponse<T>;
    try {
      data = (await response.json()) as ApiResponse<T>;
    } catch {
      throw new ApiError(
        'Received an invalid response from the server. Please try again later.',
        response.status,
      );
    }

    if (!response.ok || !data.success) {
      const status = response.status;
      const msg = data.error ?? 'Request failed';
      const errType = status >= 500 ? 'server' : status >= 400 && status < 500 ? 'validation' : 'unknown';
      throw new ApiError(msg, status, data.errors, errType as any);
    }

    return data;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint);
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, body);
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, body);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint);
  }
}

export const apiClient = new ApiClient(env.apiUrl);
