import { createServer } from 'node:http';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { connectRedis, disconnectRedis } from './config/redis.js';
import { initializeSocket } from './config/socket.js';
import { prisma } from './config/database.js';

async function bootstrap() {
  const app = createApp();
  const httpServer = createServer(app);

  let redisReady = false;
  try {
    await connectRedis();
    redisReady = true;
    console.log('Redis connected');
  } catch (error) {
    await disconnectRedis();
    console.warn('Redis not available — continuing without cache (optional for auth).', error);
  }

  await initializeSocket(httpServer, redisReady);

  httpServer.listen(env.PORT, env.HOST, () => {
    console.log(`Server running at http://${env.HOST}:${env.PORT}`);
    console.log(`Environment: ${env.NODE_ENV}`);
  });

  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);

    httpServer.close(async () => {
      await disconnectRedis();
      await prisma.$disconnect();
      console.log('Server shut down');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
