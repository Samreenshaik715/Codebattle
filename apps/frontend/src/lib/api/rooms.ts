import type {
  BattleRoom,
  CodeProblem,
  BattleResult,
  ProgrammingLanguage,
  Difficulty,
  ExecutionResult,
} from '@/types';
import { apiClient } from './client';

export async function createRoom(): Promise<BattleRoom> {
  const response = await apiClient.post<{ room: BattleRoom }>('/rooms');
  return response.data!.room;
}

export async function getActiveRoom(): Promise<BattleRoom | null> {
  const response = await apiClient.get<{ room: BattleRoom | null }>('/rooms/active');
  return response.data!.room;
}

export async function joinRoom(roomCode: string): Promise<BattleRoom> {
  const response = await apiClient.post<{ room: BattleRoom }>('/rooms/join', { roomCode });
  return response.data!.room;
}

export async function getRoom(roomId: string): Promise<BattleRoom> {
  const response = await apiClient.get<{ room: BattleRoom }>(`/rooms/${roomId}`);
  return response.data!.room;
}

export async function leaveRoom(roomId: string): Promise<BattleRoom | null> {
  const response = await apiClient.post<{ room: BattleRoom | null }>(`/rooms/${roomId}/leave`);
  return response.data!.room;
}

export async function startBattle(roomId: string): Promise<BattleRoom> {
  const response = await apiClient.post<{ room: BattleRoom }>(`/rooms/${roomId}/start`);
  return response.data!.room;
}

export async function selectProblem(
  roomId: string,
  input: { difficulty: Difficulty; topic: string; questionCount?: number; timeLimit?: number },
): Promise<BattleRoom> {
  const response = await apiClient.post<{ room: BattleRoom }>(
    `/rooms/${roomId}/select-problem`,
    input,
  );
  return response.data!.room;
}

export async function getProblem(problemId: string): Promise<CodeProblem> {
  const response = await apiClient.get<{ problem: CodeProblem }>(`/problems/${problemId}`);
  return response.data!.problem;
}

export interface SubmitSolutionResult {
  solvedCount: number;
  totalSolveTime: number;
  finished: boolean;
}

export async function submitSolution(
  roomId: string,
  input: { code: string; language: ProgrammingLanguage; solveTime: number; problemId: string },
): Promise<{ result: SubmitSolutionResult | null; room: BattleRoom | null; execResult: ExecutionResult; accepted: boolean }> {
  const response = await apiClient.post<{
    result: SubmitSolutionResult | null;
    room: BattleRoom | null;
    execResult: ExecutionResult;
    accepted: boolean;
  }>(`/rooms/${roomId}/submit`, input);
  return response.data!;
}

export async function expireBattle(roomId: string): Promise<BattleRoom> {
  const response = await apiClient.post<{ room: BattleRoom }>(`/rooms/${roomId}/expire`, {});
  return response.data!.room;
}

export async function finishBattle(roomId: string): Promise<BattleRoom> {
  const response = await apiClient.post<{ room: BattleRoom }>(`/rooms/${roomId}/finish`, {});
  return response.data!.room;
}

export async function getBattleResult(roomId: string): Promise<BattleResult[]> {
  const response = await apiClient.get<{ result: BattleResult[] }>(`/rooms/${roomId}/result`);
  return response.data!.result;
}
