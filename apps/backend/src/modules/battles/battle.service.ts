import type { BattleRoom, RoomPlayer, User, Problem } from '@prisma/client';
import { prisma } from '../../config/database.js';
import { AppError } from '../../middleware/errorHandler.js';
import { generateUniqueRoomCode } from '../../utils/roomCode.js';
import type { JoinRoomInput } from './battle.schema.js';
import type { RoomPlayerInfo, RoomState } from './battle.types.js';

type RoomWithDetails = Omit<BattleRoom, 'players'> & {
  players: (RoomPlayer & {
    solvedCount: number;
    totalSolveTime: number;
    finishedAt: Date | null;
    user: Pick<User, 'id' | 'username' | 'rating'>;
  })[];
  problem?: Problem | null;
};

function toRoomState(room: RoomWithDetails): RoomState {
  let exampleCount = 0;
  if (
    room.problem &&
    typeof room.problem.examples === 'object' &&
    Array.isArray(room.problem.examples)
  ) {
    exampleCount = room.problem.examples.length;
  }

  // Parse problemIds embedded in topic field: "topic|PROBLEMS|[...]"
  let cleanTopic = room.topic ?? undefined;
  let problemIds: string[] | undefined;
  if (room.topic && room.topic.includes('|PROBLEMS|')) {
    const parts = room.topic.split('|PROBLEMS|');
    cleanTopic = parts[0];
    try {
      problemIds = JSON.parse(parts[1] ?? '[]');
    } catch {
      problemIds = room.problemId ? [room.problemId] : undefined;
    }
  } else if (room.problemId) {
    problemIds = [room.problemId];
  }

  return {
    id: room.id,
    roomCode: room.roomCode,
    ownerId: room.ownerId,
    status: room.status,
    difficulty: room.difficulty ?? undefined,
    topic: cleanTopic,
    timerDuration: (room as any).timerDuration ?? undefined,
    problemIds,
    startedAt: room.startedAt ?? undefined,
    endedAt: room.endedAt ?? undefined,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
    problem: room.problem
      ? {
          id: room.problem.id,
          title: room.problem.title,
          difficulty: room.problem.difficulty,
          topic: room.problem.topic,
          exampleCount,
        }
      : undefined,
    players: room.players.map((p) => ({
      id: p.id,
      userId: p.userId,
      username: p.user.username,
      rating: p.user.rating,
      joinedAt: p.joinedAt,
      isOwner: p.userId === room.ownerId,
      isReady: p.isReady,
      selectedTopic: p.selectedTopic ?? undefined,
      solvedCount: (p as any).solvedCount ?? 0,
      totalSolveTime: (p as any).totalSolveTime ?? 0,
      finishedAt: (p as any).finishedAt ?? undefined,
    })),
  };
}

function parseRoomProblemIds(room: Pick<BattleRoom, 'topic' | 'problemId'>): string[] {
  if (room.topic?.includes('|PROBLEMS|')) {
    const parts = room.topic.split('|PROBLEMS|');
    try {
      const parsed = JSON.parse(parts[1] ?? '[]');
      return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
    } catch {
      return room.problemId ? [room.problemId] : [];
    }
  }

  return room.problemId ? [room.problemId] : [];
}

function getBattleDurationSeconds(room: Pick<BattleRoom, 'timerDuration'>): number | undefined {
  return room.timerDuration ?? undefined;
}

function getTotalBattleQuestions(room: Pick<BattleRoom, 'topic' | 'problemId'>): number {
  const problemIds = parseRoomProblemIds(room);
  return problemIds.length > 0 ? problemIds.length : room.problemId ? 1 : 1;
}

function buildLeaderboardFromRoom(room: RoomWithDetails): import('./battle.types.js').LeaderboardEntry[] {
  const totalQuestions = getTotalBattleQuestions(room);

  const entries = room.players.map((player) => {
    const p = player as any;
    return {
      userId: player.userId,
      username: player.user.username,
      solvedCount: p.solvedCount ?? 0,
      totalSolveTime: p.totalSolveTime ?? 0,
      creditsEarned: (p.solvedCount ?? 0) * 10,
      lastAcceptedSubmissionTime:
        p.finishedAt && room.startedAt
          ? new Date(p.finishedAt).toISOString()
          : undefined,
      rank: 0,
    };
  });

  const sorted = entries.sort((a, b) => {
    if (a.solvedCount !== b.solvedCount) {
      return b.solvedCount - a.solvedCount;
    }

    if (a.totalSolveTime !== b.totalSolveTime) {
      return a.totalSolveTime - b.totalSolveTime;
    }

    if (a.lastAcceptedSubmissionTime && b.lastAcceptedSubmissionTime) {
      return a.lastAcceptedSubmissionTime.localeCompare(b.lastAcceptedSubmissionTime);
    }

    if (a.lastAcceptedSubmissionTime) return -1;
    if (b.lastAcceptedSubmissionTime) return 1;

    return a.username.localeCompare(b.username);
  });

  return sorted.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));
}

export function calculateTotalBattleDuration(
  questionCount: number,
  timePerQuestion: number,
): number {
  return Math.max(0, Math.floor(questionCount) * Math.floor(timePerQuestion));
}

function isBattleExpired(room: RoomWithDetails): boolean {
  const durationSeconds = getBattleDurationSeconds(room);
  if (!room.startedAt || durationSeconds === undefined) {
    return false;
  }

  return Date.now() > room.startedAt.getTime() + durationSeconds * 1000;
}

function shouldPersistBattleOutcome(result: {
  winnerTime: number;
  loserTime: number | null;
}): boolean {
  return result.winnerTime > 0 || result.loserTime !== null;
}

async function persistBattleOutcome(result: {
  winnerId: string;
  loserId: string;
  winnerTime: number;
  loserTime: number | null;
  creditsAwarded: number;
}): Promise<void> {
  if (!shouldPersistBattleOutcome(result)) {
    return;
  }

  await Promise.all([
    prisma.user.update({
      where: { id: result.winnerId },
      data: {
        rating: { increment: 10 },
        wins: { increment: 1 },
      },
    }),
    prisma.user.update({
      where: { id: result.loserId },
      data: {
        rating: { decrement: 10 },
        losses: { increment: 1 },
      },
    }),
  ]);
}

async function finalizeExpiredBattle(room: RoomWithDetails): Promise<void> {
  if (room.status !== 'IN_PROGRESS' || !isBattleExpired(room)) {
    return;
  }

  await prisma.battleRoom.update({
    where: { id: room.id },
    data: { status: 'FINISHED', endedAt: new Date() },
  });

  const updatedRoom = await getRoomWithPlayers(room.id);
  const roomState = toRoomState(updatedRoom);
  const leaderboard = await getLeaderboard(room.id);

  const { broadcastBattleFinished } = await import('./battle.events.js');
  broadcastBattleFinished(room.id, roomState, leaderboard);
}

async function getRoomWithPlayers(roomId: string): Promise<RoomWithDetails> {
  const room = await prisma.battleRoom.findUnique({
    where: { id: roomId },
    include: {
      players: {
        include: {
          user: { select: { id: true, username: true, rating: true } },
        },
        orderBy: { joinedAt: 'asc' },
      },
      problem: true,
    },
  });

  if (!room) {
    throw new AppError('Room not found', 404);
  }

  if (room.status === 'IN_PROGRESS' && isBattleExpired(room)) {
    await finalizeExpiredBattle(room);
    return getRoomWithPlayers(roomId);
  }

  return room;
}

async function leaveOtherWaitingRooms(userId: string, excludeRoomId?: string): Promise<void> {
  const activeMemberships = await prisma.roomPlayer.findMany({
    where: {
      userId,
      room: { status: 'WAITING' },
      ...(excludeRoomId ? { roomId: { not: excludeRoomId } } : {}),
    },
    select: { roomId: true },
  });

  for (const membership of activeMemberships) {
    await leaveRoom(membership.roomId, userId);
  }
}

export async function createRoom(userId: string): Promise<RoomState> {
  await leaveOtherWaitingRooms(userId);

  const roomCode = await generateUniqueRoomCode();

  const room = await prisma.battleRoom.create({
    data: {
      roomCode,
      ownerId: userId,
      players: {
        create: { userId },
      },
    },
    include: {
      players: {
        include: {
          user: { select: { id: true, username: true, rating: true } },
        },
        orderBy: { joinedAt: 'asc' },
      },
    },
  });

  return toRoomState(room);
}

export async function joinRoom(userId: string, input: JoinRoomInput): Promise<RoomState> {
  const room = await prisma.battleRoom.findUnique({
    where: { roomCode: input.roomCode },
    include: {
      players: {
        include: {
          user: { select: { id: true, username: true, rating: true } },
        },
      },
    },
  });

  if (!room) {
    throw new AppError('Room not found. Check the room code and try again.', 404);
  }

  if (room.status !== 'WAITING') {
    throw new AppError('This room is no longer accepting players', 400);
  }

  const alreadyJoined = room.players.some((p) => p.userId === userId);
  if (alreadyJoined) {
    return toRoomState(room);
  }

  await leaveOtherWaitingRooms(userId, room.id);

  const updatedRoom = await prisma.battleRoom.update({
    where: { id: room.id },
    data: {
      players: {
        create: { userId },
      },
    },
    include: {
      players: {
        include: {
          user: { select: { id: true, username: true, rating: true } },
        },
        orderBy: { joinedAt: 'asc' },
      },
    },
  });

  return toRoomState(updatedRoom);
}

export async function getRoom(roomId: string, userId: string): Promise<RoomState> {
  const room = await getRoomWithPlayers(roomId);
  assertPlayerInRoom(room, userId);
  return toRoomState(room);
}

export async function leaveRoom(roomId: string, userId: string): Promise<RoomState | null> {
  const room = await getRoomWithPlayers(roomId);

  const isPlayer = room.players.some((p) => p.userId === userId);
  if (!isPlayer) {
    throw new AppError('You are not in this room', 403);
  }

  if (room.status !== 'WAITING') {
    throw new AppError('Cannot leave a room that is in progress', 400);
  }

  await prisma.roomPlayer.deleteMany({
    where: { roomId, userId },
  });

  const remainingPlayers = room.players.filter((p) => p.userId !== userId);

  if (remainingPlayers.length === 0) {
    await prisma.battleRoom.delete({ where: { id: roomId } });
    return null;
  }

  if (room.ownerId === userId) {
    const newOwner = remainingPlayers[0]!;
    await prisma.battleRoom.update({
      where: { id: roomId },
      data: { ownerId: newOwner.userId },
    });
  }

  return getRoomState(roomId);
}

export async function getRoomState(roomId: string): Promise<RoomState> {
  const room = await getRoomWithPlayers(roomId);
  return toRoomState(room);
}

export async function startBattle(roomId: string, userId: string): Promise<RoomState> {
  const room = await getRoomWithPlayers(roomId);

  assertPlayerInRoom(room, userId);

  const isOwner = room.ownerId === userId;
  if (!isOwner) {
    throw new AppError(
      'Only the room host can start the battle. The host may have changed — please refresh the room.',
      403,
    );
  }

  if (room.status !== 'WAITING') {
    throw new AppError('Battle has already started or finished', 400);
  }

  if (room.players.length < 2) {
    throw new AppError('At least 2 players are required to start', 400);
  }

  if (!room.problemId) {
    throw new AppError(
      'Problem is not configured. Select a problem before starting the battle.',
      400,
    );
  }

  const updatedRoom = await prisma.battleRoom.update({
    where: { id: roomId },
    data: { status: 'IN_PROGRESS', startedAt: new Date() },
    include: {
      players: {
        include: {
          user: { select: { id: true, username: true, rating: true } },
        },
        orderBy: { joinedAt: 'asc' },
      },
    },
  });

  return toRoomState(updatedRoom);
}

export async function markPlayerReady(
  roomId: string,
  userId: string,
  topic: string,
): Promise<{ room: RoomState; allReady: boolean }> {
  const room = await getRoomWithPlayers(roomId);

  assertPlayerInRoom(room, userId);

  if (room.status !== 'IN_PROGRESS') {
    throw new AppError('Battle has not started yet', 400);
  }

  // Update the player's ready status and selected topic
  const updatedRoom = await prisma.battleRoom.update({
    where: { id: roomId },
    data: {
      players: {
        update: {
          where: { roomId_userId: { roomId, userId } },
          data: { isReady: true, selectedTopic: topic },
        },
      },
    },
    include: {
      players: {
        include: {
          user: { select: { id: true, username: true, rating: true } },
        },
        orderBy: { joinedAt: 'asc' },
      },
    },
  });

  const roomState = toRoomState(updatedRoom);
  const allReady = updatedRoom.players.every((p) => p.isReady);

  return { room: roomState, allReady };
}

export async function finishBattle(roomId: string, userId: string): Promise<RoomState> {
  const room = await getRoomWithPlayers(roomId);

  assertPlayerInRoom(room, userId);

  if (room.status !== 'IN_PROGRESS') {
    throw new AppError('Battle is not in progress', 400);
  }

  await prisma.battleRoom.update({
    where: { id: roomId },
    data: { status: 'FINISHED', endedAt: new Date() },
  });

  return toRoomState(await getRoomWithPlayers(roomId));
}

export async function expireBattle(roomId: string, userId: string): Promise<RoomState> {
  const room = await getRoomWithPlayers(roomId);

  assertPlayerInRoom(room, userId);

  if (room.status !== 'IN_PROGRESS') {
    throw new AppError('Battle is not in progress', 400);
  }

  if (!isBattleExpired(room)) {
    throw new AppError('Battle has not expired yet', 400);
  }

  await finalizeExpiredBattle(room);

  return toRoomState(await getRoomWithPlayers(roomId));
}

export async function getLeaderboard(
  roomId: string,
): Promise<import('./battle.types.js').LeaderboardEntry[]> {
  const room = await getRoomWithPlayers(roomId);
  return buildLeaderboardFromRoom(room);
}

function assertPlayerInRoom(room: RoomWithDetails, userId: string): void {
  const isPlayer = room.players.some((p: { userId: string }) => p.userId === userId);
  if (!isPlayer) {
    throw new AppError('You are not in this room', 403);
  }
}

export function getPlayerInfo(room: RoomState, userId: string): RoomPlayerInfo | undefined {
  return room.players.find((p) => p.userId === userId);
}

export async function selectProblem(
  roomId: string,
  userId: string,
  difficulty: string,
  topic: string,
  questionCount: number = 1,
  timeLimit: number = 300,
): Promise<RoomState> {
  const room = await getRoomWithPlayers(roomId);

  assertPlayerInRoom(room, userId);

  if (room.ownerId !== userId) {
    throw new AppError('Only the room host can select difficulty and topic', 403);
  }

  if (room.status !== 'WAITING') {
    throw new AppError('Can only select problems before the battle starts', 400);
  }

  // Find problems matching difficulty and topic
  const problems = await prisma.problem.findMany({
    where: {
      difficulty: difficulty as any,
      topic: { mode: 'insensitive', equals: topic },
    },
    select: { id: true },
  });

  if (!problems.length) {
    throw new AppError(
      'No problems found for this difficulty and topic. Try a different combination.',
      404,
    );
  }

  const shuffled = problems.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));
  const problemIds = selected.map((p) => p.id);
  const primaryProblemId = problemIds[0]!;

  // Store problemIds as JSON suffix in topic field: "topic|PROBLEMS|[...]"
  const topicWithProblems =
    problemIds.length > 1 ? `${topic}|PROBLEMS|${JSON.stringify(problemIds)}` : topic;

  await prisma.battleRoom.update({
    where: { id: roomId },
    data: {
      problemId: primaryProblemId,
      difficulty: difficulty as any,
      topic: topicWithProblems,
      timerDuration: calculateTotalBattleDuration(questionCount, timeLimit),
    },
    include: {
      players: { include: { user: { select: { id: true, username: true, rating: true } } } },
      problem: true,
    },
  });

  const finalRoom = await getRoomWithPlayers(roomId);
  const state = toRoomState(finalRoom);
  // Always show clean topic to clients
  if (state.topic && state.topic.includes('|PROBLEMS|')) {
    state.topic = topic;
  }
  // Attach problemIds for clients to know count
  (state as any).problemIds = problemIds;
  return state;
}

export async function submitSolution(
  roomId: string,
  userId: string,
  solveTime: number,
): Promise<{ result: { solvedCount: number; totalSolveTime: number; finished: boolean }; room: RoomState }> {
  const room = await getRoomWithPlayers(roomId);

  assertPlayerInRoom(room, userId);

  if (room.status !== 'IN_PROGRESS') {
    throw new AppError('Battle is not in progress', 400);
  }

  if (!room.startedAt) {
    throw new AppError('Battle has not started with a valid start time', 500);
  }

  const totalQuestions = getTotalBattleQuestions(room);
  const player = room.players.find((p) => p.userId === userId);
  if (!player) {
    throw new AppError('Player not found in battle', 404);
  }

  if (player.solvedCount >= totalQuestions) {
    throw new AppError('You have already completed this battle', 400);
  }

  const finished = player.solvedCount + 1 >= totalQuestions;

  const updatedPlayer = await prisma.roomPlayer.update({
    where: { roomId_userId: { roomId, userId } },
    data: {
      solvedCount: { increment: 1 } as any,
      totalSolveTime: solveTime as any,
      finishedAt: finished ? new Date() : undefined,
    } as any,
  });

  const updatedRoom = await getRoomWithPlayers(roomId);
  const allPlayersFinished = updatedRoom.players.every((p) => (p as any).solvedCount >= totalQuestions);

  if (allPlayersFinished) {
    await prisma.battleRoom.update({
      where: { id: roomId },
      data: { status: 'FINISHED', endedAt: new Date() },
    });
  }

  return {
    result: {
      solvedCount: updatedPlayer.solvedCount,
      totalSolveTime: updatedPlayer.totalSolveTime,
      finished,
    },
    room: toRoomState(await getRoomWithPlayers(roomId)),
  };
}

export async function getUserActiveRoom(userId: string): Promise<RoomState | null> {
  const room = await prisma.battleRoom.findFirst({
    where: {
      players: {
        some: { userId },
      },
      status: 'IN_PROGRESS',
    },
    include: {
      players: {
        include: {
          user: { select: { id: true, username: true, rating: true } },
        },
        orderBy: { joinedAt: 'asc' },
      },
      problem: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!room) {
    return null;
  }

  if (isBattleExpired(room)) {
    await finalizeExpiredBattle(room);
    return null;
  }

  return toRoomState(room);
}

export async function getBattleResult(
  roomId: string,
  userId: string,
): Promise<import('./battle.types.js').LeaderboardEntry[]> {
  const room = await getRoomWithPlayers(roomId);

  assertPlayerInRoom(room, userId);

  const leaderboard = await getLeaderboard(roomId);

  if (!leaderboard.length) {
    throw new AppError('Battle result not found', 404);
  }

  return leaderboard;
}
