import { PrismaClient } from '@prisma/client';
import { isLikelyHumanReadableFormat } from '../modules/problems/testCaseValidation.js';

const prisma = new PrismaClient();

function reportWarning(message: string) {
  console.warn(message);
}

function checkField(label: string, value: string | null | undefined, context: string) {
  if (typeof value !== 'string' || !value.trim()) {
    return false;
  }

  if (isLikelyHumanReadableFormat(value)) {
    reportWarning(
      `Invalid human-readable format detected for ${label} in ${context}: ${JSON.stringify(value)}`,
    );
    return true;
  }

  return false;
}

async function main() {
  let hasInvalid = false;

  const problems = await prisma.problem.findMany({
    include: {
      testCases: true,
    },
  });

  console.log(`Scanning ${problems.length} problems for non-stdin test case data...`);

  for (const problem of problems) {
    const problemContext = `Problem ${problem.id}`;

    for (const testCase of problem.testCases) {
      const testCaseContext = `${problemContext} / TestCase ${testCase.id}`;
      if (checkField('executionInput', testCase.executionInput, testCaseContext)) {
        hasInvalid = true;
      }

      if (!testCase.executionInput && isLikelyHumanReadableFormat(testCase.input)) {
        reportWarning(
          `Missing executionInput for human-readable display input in ${testCaseContext}: ${JSON.stringify(
            testCase.input,
          )}`,
        );
        hasInvalid = true;
      }

      if (checkField('expectedOutput', testCase.expectedOutput, testCaseContext)) {
        hasInvalid = true;
      }
    }
  }

  if (hasInvalid) {
    console.error(
      'Validation complete: one or more invalid test case fields were found. Fix them before relying on stdin/stdout execution.',
    );
    process.exit(1);
  }

  console.log('Validation complete: no invalid human-readable test case formats found.');
  process.exit(0);
}

main()
  .catch((error) => {
    console.error('Validation failed with error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
