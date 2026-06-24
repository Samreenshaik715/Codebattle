import { prisma } from '../../config/database.js';
import { AppError } from '../../middleware/errorHandler.js';
import type { SafeUser } from '../auth/auth.service.js';

export async function getUserProfile(userId: string): Promise<SafeUser> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      rating: true,
      wins: true,
      losses: true,
      isAdmin: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
}
