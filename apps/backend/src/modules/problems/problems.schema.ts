import { z } from 'zod';
import { isLikelyHumanReadableFormat } from './testCaseValidation.js';

export const difficultySchema = z.enum(['EASY', 'MEDIUM', 'HARD']);

export const createProblemSchema = z.object({
  title: z.string().min(5, 'Title is required'),
  description: z.string().min(20, 'Description is required'),
  difficulty: difficultySchema,
  topic: z.string().min(2, 'Topic is required'),
  examples: z
    .array(
      z.object({
        input: z.string().min(1, 'Example input is required'),
        output: z.string().min(1, 'Example output is required'),
        explanation: z.string().optional(),
      }),
    )
    .min(1, 'At least one example is required'),
  constraints: z.array(z.string()).optional(),
  sampleInput: z.string().optional(),
  sampleOutput: z.string().optional(),
  boilerplate: z.record(z.string()).optional(),
});

export const updateProblemSchema = createProblemSchema.partial();

export const searchProblemsSchema = z.object({
  difficulty: difficultySchema.optional(),
  topic: z.string().optional(),
  search: z.string().optional(),
  limit: z.string().optional(),
});

export const createTestCaseSchema = z
  .object({
    input: z.string().min(1, 'Input is required'),
    executionInput: z.string().min(1, 'Execution input cannot be empty').optional(),
    expectedOutput: z.string().min(1, 'Expected output is required'),
    isHidden: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.executionInput && isLikelyHumanReadableFormat(data.executionInput)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['executionInput'],
        message:
          'Execution input must be raw stdin-friendly input, not human-readable assignment syntax.',
      });
    }

    if (!data.executionInput && isLikelyHumanReadableFormat(data.input)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['executionInput'],
        message:
          'Execution input is required when display input is human-readable. Provide raw stdin input instead.',
      });
    }
  });

export const updateTestCaseSchema = z
  .object({
    input: z.string().optional(),
    executionInput: z.string().min(1, 'Execution input cannot be empty').optional(),
    expectedOutput: z.string().optional(),
    isHidden: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.executionInput && isLikelyHumanReadableFormat(data.executionInput)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['executionInput'],
        message:
          'Execution input must be raw stdin-friendly input, not human-readable assignment syntax.',
      });
    }

    if (
      data.input !== undefined &&
      data.executionInput === undefined &&
      isLikelyHumanReadableFormat(data.input)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['executionInput'],
        message:
          'Execution input is required when display input is human-readable. Provide raw stdin input instead.',
      });
    }
  });
