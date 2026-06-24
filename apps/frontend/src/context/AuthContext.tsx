import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import * as authApi from '@/lib/api/auth';
import { getAccessToken, clearTokens } from '@/lib/auth/tokens';
import type { User } from '@/types';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const profile = await authApi.getProfile();
    setUser(profile);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      if (!getAccessToken()) {
        setIsLoading(false);
        return;
      }

      try {
        await refreshUser();
      } catch {
        clearTokens();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    const syncAuthFromToken = () => {
      if (getAccessToken()) {
        refreshUser().catch(() => {
          clearTokens();
          setUser(null);
        });
      } else {
        setUser(null);
      }
    };

    window.addEventListener('focus', syncAuthFromToken);
    window.addEventListener('storage', syncAuthFromToken);
    window.addEventListener('auth-tokens-updated', syncAuthFromToken);

    return () => {
      window.removeEventListener('focus', syncAuthFromToken);
      window.removeEventListener('storage', syncAuthFromToken);
      window.removeEventListener('auth-tokens-updated', syncAuthFromToken);
    };
  }, [refreshUser]);

  const navigate = useNavigate();

  useEffect(() => {
    const onAuthFailed = () => {
      // Clear in-memory user and navigate to login
      setUser(null);
      try {
        clearTokens();
      } catch {}
      navigate('/login');
    };

    window.addEventListener('auth-failed', onAuthFailed);
    return () => window.removeEventListener('auth-failed', onAuthFailed);
  }, [navigate]);

  const login = useCallback(async (email: string, password: string) => {
    const result = await authApi.login({ email, password });
    sessionStorage.setItem('skipRoomRestore', 'true');
    setUser(result.user);
  }, []);

  const register = useCallback(async (username: string, email: string, password: string) => {
    const result = await authApi.register({ username, email, password });
    sessionStorage.setItem('skipRoomRestore', 'true');
    setUser(result.user);
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, isLoading, login, register, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
