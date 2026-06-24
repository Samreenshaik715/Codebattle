import type { RoomStatus } from '@prisma/client';

export interface RoomPlayerInfo {
  id: string;
  userId: string;
  username: string;
  rating: number;
  joinedAt: Date;
  isOwner: boolean;
  isReady: boolean;
  selectedTopic?: string;
  solvedCount: number;
  totalSolveTime: number;
  finishedAt?: Date;
}

export interface ProblemDetail {
  id: string;
  title: string;
  difficulty: string;
  topic: string;
  exampleCount: number;
}

export interface RoomState {
  id: string;
  roomCode: string;
  ownerId: string;
  status: RoomStatus;
  difficulty?: string;
  topic?: string;
  timerDuration?: number; // in seconds (battle duration)
  problemIds?: string[]; // all problem IDs for multi-question battles
  problem?: ProblemDetail;
  startedAt?: Date;
  endedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  players: RoomPlayerInfo[];
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  solvedCount: number;
  totalSolveTime: number;
  creditsEarned: number;
  lastAcceptedSubmissionTime?: string;
  rank: number;
}
