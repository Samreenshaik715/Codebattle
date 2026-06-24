import { Router } from 'express';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { authenticate } from '../../middleware/auth.js';
import { AppError } from '../../middleware/errorHandler.js';
import { sendSuccess } from '../../utils/apiResponse.js';
import { validate } from '../../middleware/validate.js';
import { executeCodeSchema } from './execution.schema.js';
import * as executionService from './execution.service.js';
import type { SupportedLanguage } from './execution.types.js';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  validate(executeCodeSchema),
  asyncHandler(async (req, res) => {
    console.info('API /execution called by user', {
      user: (req as any).user?.id,
      testCaseCount: (req.body?.testCases || []).length,
    });
    const result = await executionService.executeCode(req.body);
    sendSuccess(res, { result }, 'Code executed successfully');
  }),
);

// Run code against a problem's hidden test cases (server-side only)
router.post(
  '/problem/:problemId',
  asyncHandler(async (req, res) => {
    const problemId = req.params.problemId;
    const { code, language } = req.body as { code?: string; language?: string };

    if (typeof problemId !== 'string' || !problemId) {
      throw new AppError('Invalid problem ID', 400);
    }

    if (!code || !language) {
      throw new AppError('Code and language are required', 400);
    }

    console.info('API /execution/problem called', {
      user: (req as any).user?.id,
      problemId,
      language,
    });
    const result = await executionService.runCodeAgainstProblem(problemId, {
      code,
      language: language as SupportedLanguage,
    });
    sendSuccess(res, { result }, 'Code executed against problem');
  }),
);

export default router;
