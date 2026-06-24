import { Router } from 'express';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { authenticate } from '../../middleware/auth.js';
import type { AuthenticatedRequest } from '../../types/index.js';
import { sendSuccess } from '../../utils/apiResponse.js';
import * as userService from './user.service.js';

const router = Router();

router.get(
  '/me',
  authenticate,
  asyncHandler(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const profile = await userService.getUserProfile(user!.sub);
    sendSuccess(res, { user: profile });
  }),
);

export default router;
