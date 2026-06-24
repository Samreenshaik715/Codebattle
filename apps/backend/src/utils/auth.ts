import type { JwtPayload } from '../types/index.js';

export function getAuthUserId(user: JwtPayload): string {
  return user.sub;
}
