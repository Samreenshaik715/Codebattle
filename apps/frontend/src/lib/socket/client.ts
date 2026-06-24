import { io, type Socket } from 'socket.io-client';
import { getAccessToken } from '@/lib/auth/tokens';
import { env } from '@/lib/env';
import type {
  ActionResult,
  ClientToServerEvents,
  ServerToClientEvents,
  SubscribeResult,
} from '@/types/socket';

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export function getSocket(): Socket<ServerToClientEvents, ClientToServerEvents> {
  if (!socket) {
    socket = io(env.socketUrl, {
      autoConnect: false,
      transports: ['websocket', 'polling'],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 500,
      reconnectionDelayMax: 2000,
    });
  }
  return socket;
}

export function connectSocket(): Socket<ServerToClientEvents, ClientToServerEvents> {
  const instance = getSocket();
  instance.auth = { token: getAccessToken() };
  if (!instance.connected) {
    instance.connect();
  }
  return instance;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
}

export function subscribeToRoom(roomId: string, callback: (result: SubscribeResult) => void): void {
  connectSocket().emit('subscribe', { roomId }, callback);
}

export function unsubscribeFromRoom(roomId: string): void {
  connectSocket().emit('unsubscribe', { roomId });
}

export function emitPlayerTyping(roomId: string, callback?: (result: ActionResult) => void): void {
  connectSocket().emit('player_typing', { roomId }, callback);
}

export function emitCodeSubmitted(roomId: string, code: string, callback?: (result: ActionResult) => void): void {
  connectSocket().emit('code_submitted', { roomId, code }, callback);
}

export function emitFinishBattle(roomId: string, callback?: (result: ActionResult) => void): void {
  connectSocket().emit('finish_battle', { roomId }, callback);
}
