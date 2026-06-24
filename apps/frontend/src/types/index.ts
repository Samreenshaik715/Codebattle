export interface User {
  id: string;
  email: string;
  username: string;
  rating: number;
  wins: number;
  losses: number;
  isAdmin: boolean;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export type { BattleRoom, RoomPlayer, RoomStatus, Difficulty, CodeProblem, BattleResult } from './room';

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface ValidationErrors {
  [field: string]: string[] | undefined;
}

export type ProgrammingLanguage = 'java' | 'python' | 'cpp' | 'javascript';

export interface TestCaseResult {
  index: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  stderr: string;
  durationMs: number;
  verdict: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Compilation Error' | 'Time Limit Exceeded';
}

export interface ExecutionResult {
  verdict: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Compilation Error' | 'Time Limit Exceeded';
  runtimeMs: number;
  compileOutput?: string;
  testCaseResults: TestCaseResult[];
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  sampleInput?: string;
  sampleOutput?: string;
  boilerplate: Record<ProgrammingLanguage, string>;
}
