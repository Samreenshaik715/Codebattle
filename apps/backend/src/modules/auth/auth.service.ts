import { prisma } from '../../config/database.js';
import { env } from '../../config/env.js';
import { AppError } from '../../middleware/errorHandler.js';
import type { JwtPayload } from '../../types/index.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt.js';
import { hashPassword, verifyPassword } from '../../utils/password.js';
import { hashToken } from '../../utils/token.js';
import type { LoginInput, RegisterInput } from './auth.schema.js';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SafeUser {
  id: string;
  username: string;
  email: string;
  rating: number;
  wins: number;
  losses: number;
  isAdmin: boolean;
  createdAt: Date;
}

function toSafeUser(user: {
  id: string;
  username: string;
  email: string;
  rating: number;
  wins: number;
  losses: number;
  isAdmin: boolean;
  createdAt: Date;
}): SafeUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    rating: user.rating,
    wins: user.wins,
    losses: user.losses,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
  };
}

function toJwtPayload(user: { id: string; email: string; username: string; isAdmin?: boolean }): JwtPayload {
  return {
    sub: user.id,
    email: user.email,
    username: user.username,
    isAdmin: user.isAdmin ?? false,
  };
}

function getRefreshTokenExpiry(): Date {
  const expiresIn = env.JWT_REFRESH_EXPIRES_IN;
  const match = expiresIn.match(/^(\d+)([dhms])$/);

  if (!match) {
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  }

  const value = parseInt(match[1]!, 10);
  const unit = match[2];

  const multipliers: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return new Date(Date.now() + value * (multipliers[unit!] ?? multipliers.d!));
}

async function storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
  await prisma.refreshToken.create({
    data: {
      tokenHash: hashToken(refreshToken),
      userId,
      expiresAt: getRefreshTokenExpiry(),
    },
  });
}

async function generateAuthTokens(user: {
  id: string;
  email: string;
  username: string;
  isAdmin?: boolean;
}): Promise<AuthTokens> {
  const payload = toJwtPayload(user);
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await storeRefreshToken(user.id, refreshToken);

  return { accessToken, refreshToken };
}

export async function register(input: RegisterInput): Promise<{ user: SafeUser; tokens: AuthTokens }> {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: input.email }, { username: input.username }],
    },
  });

  if (existingUser) {
    if (existingUser.email === input.email) {
      throw new AppError('Email is already registered', 409);
    }
    throw new AppError('Username is already taken', 409);
  }

  const passwordHash = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      username: input.username,
      email: input.email,
      passwordHash,
    },
  });

  const tokens = await generateAuthTokens(user);

  return { user: toSafeUser(user), tokens };
}

export async function login(input: LoginInput): Promise<{ user: SafeUser; tokens: AuthTokens }> {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isValidPassword = await verifyPassword(input.password, user.passwordHash);

  if (!isValidPassword) {
    throw new AppError('Invalid email or password', 401);
  }

  const tokens = await generateAuthTokens(user);

  return { user: toSafeUser(user), tokens };
}

export async function refreshAuthTokens(refreshToken: string): Promise<AuthTokens> {
  let payload: JwtPayload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new AppError('Invalid or expired refresh token', 401);
  }

  const storedToken = await prisma.refreshToken.findUnique({
    where: { tokenHash: hashToken(refreshToken) },
    include: { user: true },
  });

  if (!storedToken) {
    throw new AppError('Invalid or expired refresh token', 401);
  }

  if (storedToken.expiresAt < new Date()) {
    await prisma.refreshToken.delete({ where: { id: storedToken.id } });
    throw new AppError('Refresh token has expired', 401);
  }

  if (storedToken.userId !== payload.sub) {
    throw new AppError('Invalid refresh token', 401);
  }

  await prisma.refreshToken.delete({ where: { id: storedToken.id } });

  return generateAuthTokens(storedToken.user);
}

export async function logout(refreshToken: string): Promise<void> {
  await prisma.refreshToken.deleteMany({
    where: { tokenHash: hashToken(refreshToken) },
  });
}
