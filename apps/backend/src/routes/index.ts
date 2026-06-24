import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import battleRoutes from '../modules/battles/battle.routes.js';
import executionRoutes from '../modules/execution/execution.routes.js';
import userRoutes from '../modules/users/user.routes.js';
import problemsRoutes from '../modules/problems/problems.routes.js';
import { sendSuccess } from '../utils/apiResponse.js';

const router = Router();

router.get('/health', (_req, res) => {
  sendSuccess(res, {
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'codebattle-api',
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/rooms', battleRoutes);
router.use('/execution', executionRoutes);
router.use('/problems', problemsRoutes);

export default router;
