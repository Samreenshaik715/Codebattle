import { getAccessToken } from './tokens';

interface TokenPayload {
  sub?: string;
  email?: string;
  username?: string;
}

export function getUserIdFromToken(): string | null {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const payloadPart = token.split('.')[1];
    if (!payloadPart) return null;

    const payload = JSON.parse(atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/'))) as TokenPayload;
    return payload.sub ?? null;
  } catch {
    return null;
  }
}
