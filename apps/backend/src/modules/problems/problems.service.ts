import { prisma } from '../../config/database.js';
import { AppError } from '../../middleware/errorHandler.js';
import type { Difficulty } from '@prisma/client';

function normalizeText(value: string | undefined): string | undefined {
  if (typeof value !== 'string') {
    return value;
  }

  return value
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.replace(/\s+$/u, ''))
    .join('\n')
    .trim();
}

export async function getProblem(problemId: string, includeTestCases = false): Promise<any> {
  const problem = await prisma.problem.findUnique({
    where: { id: problemId },
    include: {
      testCases: includeTestCases
        ? {
            orderBy: { createdAt: 'desc' },
          }
        : false,
    },
  });

  if (!problem) {
    throw new AppError('Problem not found', 404);
  }

  return problem;
}

export async function getProblems(
  difficulty?: string,
  topic?: string,
  search?: string,
  limit = 10,
): Promise<any[]> {
  const where: Record<string, unknown> = {
    ...(difficulty ? { difficulty: difficulty as Difficulty } : {}),
    ...(topic
      ? {
          topic: {
            mode: 'insensitive',
            equals: topic,
          },
        }
      : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { topic: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {}),
  };

  return await prisma.problem.findMany({
    where,
    take: limit,
    orderBy: [{ createdAt: 'desc' }],
  });
}

export async function createProblem(input: {
  title: string;
  description: string;
  difficulty: Difficulty;
  topic: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints?: string[];
  sampleInput?: string;
  sampleOutput?: string;
  boilerplate?: Record<string, string>;
}): Promise<any> {
  return await prisma.problem.create({
    data: {
      title: input.title,
      description: input.description,
      difficulty: input.difficulty,
      topic: input.topic,
      examples: input.examples.map((example) => ({
        input: normalizeText(example.input) ?? example.input,
        output: normalizeText(example.output) ?? example.output,
        explanation: example.explanation,
      })),
      constraints: input.constraints ?? [],
      sampleInput: normalizeText(input.sampleInput) ?? undefined,
      sampleOutput: normalizeText(input.sampleOutput) ?? undefined,
      boilerplate: input.boilerplate ?? {},
    },
  });
}

export async function updateProblem(
  problemId: string,
  input: {
    title?: string;
    description?: string;
    difficulty?: Difficulty;
    topic?: string;
    examples?: { input: string; output: string; explanation?: string }[];
    constraints?: string[];
    sampleInput?: string;
    sampleOutput?: string;
    boilerplate?: Record<string, string>;
  },
): Promise<any> {
  const problem = await prisma.problem.findUnique({ where: { id: problemId } });
  if (!problem) {
    throw new AppError('Problem not found', 404);
  }

  return await prisma.problem.update({
    where: { id: problemId },
    data: {
      title: input.title,
      description: input.description,
      difficulty: input.difficulty,
      topic: input.topic,
      examples: input.examples?.map((example) => ({
        input: normalizeText(example.input) ?? example.input,
        output: normalizeText(example.output) ?? example.output,
        explanation: example.explanation,
      })),
      constraints: input.constraints,
      sampleInput: normalizeText(input.sampleInput) ?? input.sampleInput,
      sampleOutput: normalizeText(input.sampleOutput) ?? input.sampleOutput,
      boilerplate: input.boilerplate,
    },
  });
}

export async function deleteProblem(problemId: string): Promise<{ id: string }> {
  const problem = await prisma.problem.findUnique({ where: { id: problemId } });
  if (!problem) {
    throw new AppError('Problem not found', 404);
  }

  await prisma.problem.delete({ where: { id: problemId } });
  return { id: problemId };
}

export async function createTestCase(
  problemId: string,
  input: {
    input: string;
    executionInput?: string;
    expectedOutput: string;
    isHidden?: boolean;
  },
): Promise<any> {
  const problem = await prisma.problem.findUnique({ where: { id: problemId } });
  if (!problem) {
    throw new AppError('Problem not found', 404);
  }

  return await prisma.testCase.create({
    data: {
      questionId: problemId,
      input: normalizeText(input.input) ?? input.input,
      executionInput:
        normalizeText(input.executionInput ?? input.input) ?? input.executionInput ?? input.input,
      expectedOutput: normalizeText(input.expectedOutput) ?? input.expectedOutput,
      isHidden: input.isHidden ?? false,
    },
  });
}

export async function updateTestCase(
  testCaseId: string,
  input: {
    input?: string;
    executionInput?: string;
    expectedOutput?: string;
    isHidden?: boolean;
  },
): Promise<any> {
  const testCase = await prisma.testCase.findUnique({ where: { id: testCaseId } });
  if (!testCase) {
    throw new AppError('Test case not found', 404);
  }

  return await prisma.testCase.update({
    where: { id: testCaseId },
    data: {
      input: input.input ? normalizeText(input.input) : undefined,
      executionInput: input.executionInput
        ? normalizeText(input.executionInput)
        : input.input
          ? normalizeText(input.input)
          : undefined,
      expectedOutput: input.expectedOutput ? normalizeText(input.expectedOutput) : undefined,
      isHidden: input.isHidden,
    },
  });
}

export async function deleteTestCase(testCaseId: string): Promise<{ id: string }> {
  const testCase = await prisma.testCase.findUnique({ where: { id: testCaseId } });
  if (!testCase) {
    throw new AppError('Test case not found', 404);
  }

  await prisma.testCase.delete({ where: { id: testCaseId } });
  return { id: testCaseId };
}
