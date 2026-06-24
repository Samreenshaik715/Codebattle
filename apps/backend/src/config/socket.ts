import type { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { registerBattleSocketHandlers } from '../modules/battles/battle.socket.js';
import { isAllowedOrigin } from './cors.js';
import { env } from './env.js';
import { redis } from './redis.js';

let io: Server | null = null;

export async function initializeSocket(httpServer: HttpServer, useRedisAdapter: boolean): Promise<Server> {
  io = new Server(httpServer, {
    cors: {
      origin: (origin, callback) => {
        if (isAllowedOrigin(origin)) {
          callback(null, true);
          return;
        }
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      },
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  if (useRedisAdapter && env.REDIS_URL && redis.status === 'ready') {
    try {
      const pubClient = redis.duplicate();
      const subClient = pubClient.duplicate();
      await Promise.all([pubClient.connect(), subClient.connect()]);
      io.adapter(createAdapter(pubClient, subClient));
      console.log('Socket.IO Redis adapter initialized');
    } catch (error) {
      console.warn('Redis unavailable for Socket.IO adapter; using in-memory adapter.', error);
    }
  }

  registerBattleSocketHandlers(io);

  return io;
}

export function getSocketIO(): Server {
  if (!io) {
    throw new Error('Socket.IO has not been initialized');
  }
  return io;
}
