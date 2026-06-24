export type SupportedLanguage = 'python' | 'java' | 'cpp' | 'javascript';

export type ExecutionVerdict =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Runtime Error'
  | 'Compilation Error'
  | 'Time Limit Exceeded'
  | 'Memory Limit Exceeded'
  | 'Output Limit Exceeded';

export interface TestCaseInput {
  input: string;
  executionInput?: string;
  expectedOutput: string;
}

export interface TestCaseResult {
  index: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  stderr: string;
  durationMs: number;
  verdict: ExecutionVerdict;
}

export interface ExecutionResult {
  verdict: ExecutionVerdict;
  runtimeMs: number;
  compileOutput?: string;
  testCaseResults: TestCaseResult[];
}
