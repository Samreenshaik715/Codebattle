import { env } from './env.js';

const allowedOrigins = env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean);

function isLocalhostOrigin(origin: string): boolean {
  return /^(https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?)$/.test(origin);
}

export function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) {
    return true;
  }

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  return isLocalhostOrigin(origin);
}

export function getCorsOrigin(): string[] {
  return allowedOrigins;
}
