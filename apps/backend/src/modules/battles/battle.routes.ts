import { Router } from 'express';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { authenticate } from '../../middleware/auth.js';
import { AppError } from '../../middleware/errorHandler.js';
import { validate } from '../../middleware/validate.js';
import type { AuthenticatedRequest } from '../../types/index.js';
import { getAuthUserId } from '../../utils/auth.js';
import { sendSuccess } from '../../utils/apiResponse.js';
import {
  broadcastBattleFinished,
  broadcastBattleStarted,
  broadcastLeaderboardUpdated,
  broadcastPlayerJoined,
  broadcastPlayerLeft,
  broadcastProblemSelected,
  broadcastRoomState,
} from './battle.events.js';
import { joinRoomSchema } from './battle.schema.js';
import * as battleService from './battle.service.js';
import * as executionService from '../execution/execution.service.js';
import type { SupportedLanguage } from '../execution/execution.types.js';

const router = Router();

function getRoomIdParam(params: { roomId?: string | string[] }): string {
  const roomId = params.roomId;
  if (typeof roomId !== 'string' || !roomId) {
    throw new AppError('Invalid room ID', 400);
  }
  return roomId;
}

router.use(authenticate);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const room = await battleService.createRoom(getAuthUserId(user!));
    broadcastRoomState(room.id, room);
    sendSuccess(res, { room }, 'Room created', 201);
  }),
);

router.get(
  '/active',
  asyncHandler(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const room = await battleService.getUserActiveRoom(getAuthUserId(user!));
    sendSuccess(res, { room });
  }),
);

router.post(
  '/join',
  validate(joinRoomSchema),
  asyncHandler(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const userId = getAuthUserId(user!);
    const room = await battleService.joinRoom(userId, req.body);
    broadcastPlayerJoined(room.id, room, userId);
    sendSuccess(res, { room }, 'Joined room');
  }),
);

router.get(
  '/:roomId',
  asyncHandler(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const room = await battleService.getRoom(getRoomIdParam(req.params), getAuthUserId(user!));
    sendSuccess(res, { room });
  }),
);

router.post(
  '/:roomId/leave',
  asyncHandler(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const userId = getAuthUserId(user!);
    const roomId = getRoomIdParam(req.params);
    const room = await battleService.leaveRoom(roomId, userId);
    broadcastPlayerLeft(roomId, userId, room);
    sendSuccess(res, { room }, room ? 'Left room' : 'Room closed');
  }),
);

router.post(
  '/:roomId/start',
  asyncHandler(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const room = await battleService.startBattle(getRoomIdParam(req.params), getAuthUserId(user!));
    const leaderboard = await battleService.getLeaderboard(room.id);
    broadcastBattleStarted(room.id, room);
    broadcastLeaderboardUpdated(room.id, leaderboard);
    if (room.problem) {
      broadcastProblemSelected(room.id, room);
    }
    sendSuccess(res, { room, leaderboard }, 'Battle started');
  }),
);

router.post(
  '/:roomId/finish',
  asyncHandler(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const room = await battleService.finishBattle(getRoomIdParam(req.params), getAuthUserId(user!));
    const leaderboard = await battleService.getLeaderboard(room.id);
    broadcastBattleFinished(room.id, room, leaderboard);
    sendSuccess(res, { room, leaderboard }, 'Battle finished');
  }),
);

router.post(
  '/:roomId/select-problem',
  asyncHandler(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const { difficulty, topic, questionCount, timeLimit } = req.body;

    if (!difficulty || !topic) {
      throw new AppError('Difficulty and topic are required', 400);
    }

    const room = await battleService.selectProblem(
      getRoomIdParam(req.params),
      getAuthUserId(user!),
      difficulty,
      topic,
      questionCount ? parseInt(questionCount) : 1,
      timeLimit ? parseInt(timeLimit) : 300,
    );
    broadcastProblemSelected(room.id, room);
    sendSuccess(res, { room }, 'Problem selected');
  }),
);

router.post(
  '/:roomId/submit',
  asyncHandler(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const userId = getAuthUserId(user!);
    const roomId = getRoomIdParam(req.params);
    const { code, language, solveTime, problemId } = req.body;

    if (!code || !language || solveTime === undefined) {
      throw new AppError('Code, language, and solveTime are required', 400);
    }

    // -----------------------------------------------------------------------
    // 1. Run the code against the problem's hidden test cases first
    // -----------------------------------------------------------------------
    if (!problemId) {
      throw new AppError('problemId is required for submission', 400);
    }

    console.info('Battle submit: running code', { roomId, userId, language, problemId });
    const execResult = await executionService.runCodeAgainstProblem(problemId, {
      code,
      language: language as SupportedLanguage,
    });

    // -----------------------------------------------------------------------
    // 2. If code didn't pass, return the execution result WITHOUT recording
    // -----------------------------------------------------------------------
    if (execResult.verdict !== 'Accepted') {
      console.info('Battle submit: code rejected', { roomId, verdict: execResult.verdict });
      sendSuccess(
        res,
        {
          result: null,
          execResult,
          accepted: false,
        },
        `Submission rejected: ${execResult.verdict}`,
      );
      return;
    }

    // -----------------------------------------------------------------------
    // 3. Code passed — record the submission and update leaderboard
    // -----------------------------------------------------------------------
    const { result, room } = await battleService.submitSolution(roomId, userId, solveTime);
    const leaderboard = await battleService.getLeaderboard(room.id);

    if (room.status === 'FINISHED') {
      broadcastBattleFinished(room.id, room, leaderboard);
    } else {
      broadcastRoomState(room.id, room);
      broadcastLeaderboardUpdated(room.id, leaderboard);
    }

    sendSuccess(
      res,
      {
        result,
        execResult,
        accepted: true,
      },
      'Solution accepted',
    );
  }),
);

router.post(
  '/:roomId/expire',
  asyncHandler(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const room = await battleService.expireBattle(getRoomIdParam(req.params), getAuthUserId(user!));
    sendSuccess(res, { room }, 'Battle expired and finalized');
  }),
);

router.get(
  '/:roomId/result',
  asyncHandler(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const result = await battleService.getBattleResult(
      getRoomIdParam(req.params),
      getAuthUserId(user!),
    );
    sendSuccess(res, { result });
  }),
);

export default router;
