import type { Problem } from '@/types';
import { apiClient } from './client';

export interface ProblemListOptions {
  difficulty?: string;
  topic?: string;
  search?: string;
  limit?: number;
}

export async function getProblems(options: ProblemListOptions = {}): Promise<Problem[]> {
  const query = new URLSearchParams();
  if (options.difficulty) query.set('difficulty', options.difficulty);
  if (options.topic) query.set('topic', options.topic);
  if (options.search) query.set('search', options.search);
  if (options.limit) query.set('limit', String(options.limit));

  const response = await apiClient.get<{ problems: Problem[] }>(`/problems?${query.toString()}`);
  return response.data!.problems;
}

export async function getProblem(problemId: string): Promise<Problem> {
  const response = await apiClient.get<{ problem: Problem }>(`/problems/${problemId}`);
  return response.data!.problem;
}

export async function createProblem(input: Omit<Problem, 'id'>): Promise<Problem> {
  const response = await apiClient.post<{ problem: Problem }>('/problems', input);
  return response.data!.problem;
}

export async function updateProblem(problemId: string, input: Partial<Omit<Problem, 'id'>>): Promise<Problem> {
  const response = await apiClient.patch<{ problem: Problem }>(`/problems/${problemId}`, input);
  return response.data!.problem;
}

export async function deleteProblem(problemId: string): Promise<void> {
  await apiClient.delete(`/problems/${problemId}`);
}
