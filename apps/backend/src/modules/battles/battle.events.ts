import { getSocketIO } from '../../config/socket.js';
import { emitRoomState } from './battle.socket.js';
import type { LeaderboardEntry, RoomState } from './battle.types.js';

function getSocketRoom(roomId: string): string {
  return `room:${roomId}`;
}

export function broadcastRoomState(roomId: string, room: RoomState): void {
  const io = getSocketIO();
  emitRoomState(io, roomId, room);
}

export function broadcastPlayerJoined(roomId: string, room: RoomState, userId: string): void {
  const io = getSocketIO();
  const player = room.players.find((p) => p.userId === userId);
  io.to(getSocketRoom(roomId)).emit('player_joined', { player });
  emitRoomState(io, roomId, room);
}

export function broadcastPlayerLeft(roomId: string, userId: string, room: RoomState | null): void {
  const io = getSocketIO();

  if (room) {
    io.to(getSocketRoom(roomId)).emit('player_left', { userId, roomId });
    emitRoomState(io, roomId, room);
  } else {
    io.to(getSocketRoom(roomId)).emit('room_closed', { roomId });
  }
}

export function broadcastBattleStarted(roomId: string, room: RoomState): void {
  const io = getSocketIO();
  io.to(getSocketRoom(roomId)).emit('battle_started', {
    room,
    serverTime: new Date().toISOString(),
  });
  emitRoomState(io, roomId, room);
}

export function broadcastProblemSelected(roomId: string, room: RoomState): void {
  const io = getSocketIO();
  io.to(getSocketRoom(roomId)).emit('problem_selected', { room });
  emitRoomState(io, roomId, room);
}

export function broadcastBattleFinished(
  roomId: string,
  room: RoomState,
  leaderboard: LeaderboardEntry[],
): void {
  const io = getSocketIO();
  io.to(getSocketRoom(roomId)).emit('battle_finished', { room, leaderboard });
  emitRoomState(io, roomId, room);
  broadcastLeaderboardUpdated(roomId, leaderboard);
}

export function broadcastPlayerTyping(
  roomId: string,
  payload: { userId: string; username: string; timestamp: string },
): void {
  const io = getSocketIO();
  io.to(getSocketRoom(roomId)).emit('player_typing', { ...payload, roomId });
}

export function broadcastCodeSubmitted(
  roomId: string,
  payload: { userId: string; username: string; codePreview: string; timestamp: string },
): void {
  const io = getSocketIO();
  io.to(getSocketRoom(roomId)).emit('code_submitted', { ...payload, roomId });
}

export function broadcastLeaderboardUpdated(roomId: string, leaderboard: LeaderboardEntry[]): void {
  const io = getSocketIO();
  io.to(getSocketRoom(roomId)).emit('leaderboard_updated', { roomId, leaderboard });
}
