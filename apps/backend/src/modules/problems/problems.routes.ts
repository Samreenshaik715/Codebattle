import { Router } from 'express';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { authenticate } from '../../middleware/auth.js';
import { authorizeAdmin } from '../../middleware/authorize.js';
import { AppError, ValidationError } from '../../middleware/errorHandler.js';
import type { AuthenticatedRequest } from '../../types/index.js';
import { validate } from '../../middleware/validate.js';
import { sendSuccess } from '../../utils/apiResponse.js';
import * as problemsService from './problems.service.js';
import {
  createProblemSchema,
  createTestCaseSchema,
  searchProblemsSchema,
  updateProblemSchema,
  updateTestCaseSchema,
} from './problems.schema.js';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const parsed = searchProblemsSchema.safeParse({
      difficulty: req.query.difficulty,
      topic: req.query.topic,
      search: req.query.search,
      limit: req.query.limit,
    });

    if (!parsed.success) {
      throw new ValidationError(parsed.error.flatten().fieldErrors);
    }

    const limit = parsed.data.limit ? parseInt(parsed.data.limit, 10) : 10;
    const problems = await problemsService.getProblems(
      parsed.data.difficulty,
      parsed.data.topic,
      parsed.data.search,
      limit,
    );
    sendSuccess(res, { problems });
  }),
);

router.get(
  '/:problemId',
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const problemId = req.params.problemId;
    if (typeof problemId !== 'string') {
      throw new AppError('Invalid problem ID', 400);
    }
    const problem = await problemsService.getProblem(problemId, req.user?.isAdmin ?? false);
    sendSuccess(res, { problem });
  }),
);

router.post(
  '/',
  validate(createProblemSchema),
  authorizeAdmin,
  asyncHandler(async (req, res) => {
    const problem = await problemsService.createProblem(req.body);
    sendSuccess(res, { problem }, 'Problem created', 201);
  }),
);

router.patch(
  '/:problemId',
  validate(updateProblemSchema),
  authorizeAdmin,
  asyncHandler(async (req, res) => {
    const problemId = req.params.problemId;
    if (typeof problemId !== 'string') {
      throw new AppError('Invalid problem ID', 400);
    }
    const problem = await problemsService.updateProblem(problemId, req.body);
    sendSuccess(res, { problem }, 'Problem updated');
  }),
);

router.delete(
  '/:problemId',
  authorizeAdmin,
  asyncHandler(async (req, res) => {
    const problemId = req.params.problemId;
    if (typeof problemId !== 'string') {
      throw new AppError('Invalid problem ID', 400);
    }
    const result = await problemsService.deleteProblem(problemId);
    sendSuccess(res, { result }, 'Problem deleted');
  }),
);

router.post(
  '/:problemId/testcases',
  validate(createTestCaseSchema),
  authorizeAdmin,
  asyncHandler(async (req, res) => {
    const problemId = req.params.problemId;
    if (typeof problemId !== 'string') {
      throw new AppError('Invalid problem ID', 400);
    }
    const testCase = await problemsService.createTestCase(problemId, req.body);
    sendSuccess(res, { testCase }, 'Test case created', 201);
  }),
);

router.patch(
  '/:problemId/testcases/:testCaseId',
  validate(updateTestCaseSchema),
  authorizeAdmin,
  asyncHandler(async (req, res) => {
    const testCaseId = req.params.testCaseId;
    if (typeof testCaseId !== 'string') {
      throw new AppError('Invalid test case ID', 400);
    }
    const testCase = await problemsService.updateTestCase(testCaseId, req.body);
    sendSuccess(res, { testCase }, 'Test case updated');
  }),
);

router.delete(
  '/:problemId/testcases/:testCaseId',
  authorizeAdmin,
  asyncHandler(async (req, res) => {
    const testCaseId = req.params.testCaseId;
    if (typeof testCaseId !== 'string') {
      throw new AppError('Invalid test case ID', 400);
    }
    const result = await problemsService.deleteTestCase(testCaseId);
    sendSuccess(res, { result }, 'Test case deleted');
  }),
);

export default router;
