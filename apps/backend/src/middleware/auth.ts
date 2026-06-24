import type { NextFunction, Response } from 'express';
import type { AuthenticatedRequest } from '../types/index.js';
import { AppError } from './errorHandler.js';
import { verifyAccessToken } from '../utils/jwt.js';

export function authenticate(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError('Authentication required', 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new AppError('Authentication required', 401);
    }

    const payload = verifyAccessToken(token);

    if (!payload.sub || typeof payload.sub !== 'string') {
      throw new AppError('Invalid token payload', 401);
    }

    req.user = payload;
    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
}
