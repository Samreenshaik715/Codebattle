import type { ExecutionResult } from '@/types';
import { apiClient } from './client';

export async function runAgainstExamples(code: string, language: string, testCases: { input: string; expectedOutput: string }[]) {
  const response = await apiClient.post<{ result: ExecutionResult }>('/execution', {
    code,
    language,
    testCases,
  });
  return response.data!.result;
}

export async function runAgainstProblem(problemId: string, code: string, language: string) {
  const response = await apiClient.post<{ result: ExecutionResult }>(`/execution/problem/${problemId}`, {
    code,
    language,
  });
  return response.data!.result;
}
