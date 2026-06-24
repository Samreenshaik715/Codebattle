import type { NextFunction, Response } from 'express';
import type { AuthenticatedRequest } from '../types/index.js';
import { AppError } from './errorHandler.js';

export function authorizeAdmin(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
  const user = req.user;
  if (!user?.isAdmin) {
    next(new AppError('Admin access required', 403));
    return;
  }

  next();
}
