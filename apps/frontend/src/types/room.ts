export type RoomStatus = 'WAITING' | 'IN_PROGRESS' | 'FINISHED';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface RoomPlayer {
  id: string;
  userId: string;
  username: string;
  rating: number;
  joinedAt: string;
  isOwner: boolean;
  isReady: boolean;
  selectedTopic?: string;
  solvedCount: number;
  totalSolveTime: number;
  finishedAt?: string;
}

export interface ProblemDetail {
  id: string;
  title: string;
  difficulty: string;
  topic: string;
  exampleCount: number;
}

export interface BattleRoom {
  id: string;
  roomCode: string;
  ownerId: string;
  status: RoomStatus;
  difficulty?: Difficulty;
  topic?: string;
  timerDuration?: number; // time limit for the entire battle in seconds
  problemIds?: string[]; // all problem IDs for multi-question battles
  problem?: ProblemDetail;
  startedAt?: string;
  endedAt?: string;
  createdAt: string;
  updatedAt: string;
  players: RoomPlayer[];
}

export interface CodeProblem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  topic: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  boilerplate: Record<string, string>;
}

export interface BattleResult {
  userId: string;
  username: string;
  solvedCount: number;
  totalSolveTime: number;
  creditsEarned: number;
  lastAcceptedSubmissionTime?: string;
  rank: number;
}
