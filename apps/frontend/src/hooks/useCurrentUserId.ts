import { useAuth } from '@/hooks/useAuth';
import { getUserIdFromToken } from '@/lib/auth/jwt';

/**
 * Returns the authenticated user id from the JWT (source of truth for API calls).
 * Falls back to auth context user id when token cannot be decoded.
 */
export function useCurrentUserId(): string | null {
  const { user } = useAuth();
  return getUserIdFromToken() ?? user?.id ?? null;
}
