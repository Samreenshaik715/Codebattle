import type { Server, Socket } from 'socket.io';
import { verifyAccessToken } from '../../utils/jwt.js';
import type { JwtPayload } from '../../types/index.js';
import * as battleService from './battle.service.js';
import type { LeaderboardEntry, RoomPlayerInfo, RoomState } from './battle.types.js';

interface ServerToClientEvents {
  player_joined: (payload: { player: RoomPlayerInfo }) => void;
  player_left: (payload: { userId: string; roomId: string }) => void;
  battle_started: (payload: { room: RoomState; serverTime: string }) => void;
  problem_selected: (payload: { room: RoomState }) => void;
  player_ready: (payload: {
    userId: string;
    username: string;
    roomId: string;
    topic: string;
  }) => void;
  room_status_updated: (payload: { room: RoomState }) => void;
  all_players_ready: (payload: { room: RoomState }) => void;
  battle_finished: (payload: { room: RoomState; leaderboard: LeaderboardEntry[] }) => void;
  player_typing: (payload: {
    userId: string;
    username: string;
    roomId: string;
    timestamp: string;
  }) => void;
  code_submitted: (payload: {
    userId: string;
    username: string;
    roomId: string;
    codePreview: string;
    timestamp: string;
  }) => void;
  leaderboard_updated: (payload: { roomId: string; leaderboard: LeaderboardEntry[] }) => void;
  room_state: (payload: { room: RoomState; serverTime: string }) => void;
  room_closed: (payload: { roomId: string }) => void;
}

interface ClientToServerEvents {
  subscribe: (payload: { roomId: string }, callback: (response: SubscribeResult) => void) => void;
  unsubscribe: (payload: { roomId: string }) => void;
  player_typing: (payload: { roomId: string }, callback?: (result: ActionResult) => void) => void;
  code_submitted: (
    payload: { roomId: string; code: string },
    callback?: (result: ActionResult) => void,
  ) => void;
  finish_battle: (payload: { roomId: string }, callback?: (result: ActionResult) => void) => void;
}

interface SubscribeResult {
  success: boolean;
  error?: string;
  room?: RoomState;
  serverTime?: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
}

interface SocketData {
  roomId?: string;
  user?: JwtPayload;
}

type BattleSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  Record<string, never>,
  SocketData
>;

function getSocketRoom(roomId: string): string {
  return `room:${roomId}`;
}

export function emitRoomState(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  roomId: string,
  room: RoomState,
): void {
  io.to(getSocketRoom(roomId)).emit('room_state', {
    room,
    serverTime: new Date().toISOString(),
  });
}

export function registerBattleSocketHandlers(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
): void {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token as string | undefined;
      if (!token) {
        next(new Error('Authentication required'));
        return;
      }
      const payload = verifyAccessToken(token);
      (socket as BattleSocket).data.user = payload;
      next();
    } catch {
      next(new Error('Invalid or expired token'));
    }
  });

  io.on('connection', (socket: BattleSocket) => {
    const user = socket.data.user as JwtPayload;
    const userId = user.sub;

    const getRoomName = (roomId: string) => getSocketRoom(roomId);

    socket.on('subscribe', async (data, callback) => {
      try {
        const room = await battleService.getRoom(data.roomId, userId);
        await socket.join(getRoomName(data.roomId));
        socket.data.roomId = data.roomId;
        callback({
          success: true,
          room,
          serverTime: new Date().toISOString(),
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to subscribe to room';
        callback({ success: false, error: message });
      }
    });

    socket.on('unsubscribe', async (data) => {
      await socket.leave(getRoomName(data.roomId));
      if (socket.data.roomId === data.roomId) {
        socket.data.roomId = undefined;
      }
    });

    socket.on('player_typing', async (data, callback) => {
      try {
        const room = await battleService.getRoom(data.roomId, userId);
        if (room.status !== 'IN_PROGRESS') {
          throw new Error('Battle is not in progress');
        }

        const timestamp = new Date().toISOString();
        socket.to(getRoomName(data.roomId)).emit('player_typing', {
          userId,
          username: user.username,
          roomId: data.roomId,
          timestamp,
        });
        callback?.({ success: true });
      } catch (error) {
        callback?.({
          success: false,
          error: error instanceof Error ? error.message : 'Unable to emit typing event',
        });
      }
    });

    socket.on('code_submitted', async (data, callback) => {
      try {
        const room = await battleService.getRoom(data.roomId, userId);
        if (room.status !== 'IN_PROGRESS') {
          throw new Error('Battle is not in progress');
        }

        const timestamp = new Date().toISOString();
        const codePreview = data.code.slice(0, 180);
        socket.to(getRoomName(data.roomId)).emit('code_submitted', {
          userId,
          username: user.username,
          roomId: data.roomId,
          codePreview,
          timestamp,
        });

        const leaderboard = await battleService.getLeaderboard(data.roomId);
        socket.to(getRoomName(data.roomId)).emit('leaderboard_updated', {
          roomId: data.roomId,
          leaderboard,
        });

        callback?.({ success: true });
      } catch (error) {
        callback?.({
          success: false,
          error: error instanceof Error ? error.message : 'Unable to submit code',
        });
      }
    });

    socket.on('finish_battle', async (data, callback) => {
      try {
        const room = await battleService.finishBattle(data.roomId, userId);
        const leaderboard = await battleService.getLeaderboard(data.roomId);

        io.to(getRoomName(data.roomId)).emit('battle_finished', {
          room,
          leaderboard,
        });

        io.to(getRoomName(data.roomId)).emit('leaderboard_updated', {
          roomId: data.roomId,
          leaderboard,
        });

        callback?.({ success: true });
      } catch (error) {
        callback?.({
          success: false,
          error: error instanceof Error ? error.message : 'Unable to finish battle',
        });
      }
    });

    socket.on('disconnect', async () => {
      if (!socket.data.roomId) {
        return;
      }

      const currentRoomId = socket.data.roomId;
      socket.data.roomId = undefined;
      socket.leave(getRoomName(currentRoomId));

      try {
        const room = await battleService.getRoom(currentRoomId, userId);
        if (room.status === 'WAITING') {
          const updatedRoom = await battleService.leaveRoom(currentRoomId, userId);
          if (updatedRoom) {
            io.to(getSocketRoom(currentRoomId)).emit('player_left', {
              userId,
              roomId: currentRoomId,
            });
            emitRoomState(io, currentRoomId, updatedRoom);
          } else {
            io.to(getSocketRoom(currentRoomId)).emit('room_closed', { roomId: currentRoomId });
          }
        }
      } catch {
        // Ignore disconnect cleanup failures; room may already be gone or in-progress.
      }
    });
  });
}
