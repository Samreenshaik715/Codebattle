import { z } from 'zod';

export const executeCodeSchema = z.object({
  language: z.enum(['python', 'java', 'cpp', 'javascript']),
  code: z.string().min(1),
  testCases: z
    .array(
      z.object({
        input: z.string().optional().default(''),
        executionInput: z.string().optional(),
        expectedOutput: z.string().default(''),
      }),
    )
    .min(1),
  timeoutMs: z.coerce.number().int().positive().max(15000).default(5000),
});

export type ExecuteCodeInput = z.infer<typeof executeCodeSchema>;
