import { PrismaClient } from '@prisma/client';
import { isLikelyHumanReadableFormat } from '../modules/problems/testCaseValidation.js';

const prisma = new PrismaClient();

function normalizeText(value: string | null | undefined): string | null | undefined {
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

async function main() {
  console.log('Scanning test cases for migration...');
  const problems = await prisma.problem.findMany({ include: { testCases: true } });
  let updatedCount = 0;
  let unresolvedCount = 0;

  for (const problem of problems) {
    for (const testCase of problem.testCases) {
      const inputValue = normalizeText(testCase.input) ?? testCase.input;
      const storedExecution = normalizeText(testCase.executionInput) ?? testCase.executionInput;

      if (testCase.executionInput === null || testCase.executionInput === undefined) {
        if (isLikelyHumanReadableFormat(inputValue)) {
          console.warn(
            `Unresolved TestCase ${testCase.id}: input appears human-readable and requires a raw executionInput.`,
          );
          unresolvedCount += 1;
          continue;
        }

        await prisma.testCase.update({
          where: { id: testCase.id },
          data: { executionInput: inputValue },
        });
        console.log(`Updated TestCase ${testCase.id}: copied raw input into executionInput.`);
        updatedCount += 1;
        continue;
      }

      if (isLikelyHumanReadableFormat(storedExecution ?? '')) {
        console.warn(
          `TestCase ${testCase.id} executionInput appears human-readable; please supply a raw stdin executionInput.`,
        );
        unresolvedCount += 1;
        continue;
      }

      const normalizedExecution = normalizeText(testCase.executionInput) ?? testCase.executionInput;
      if (normalizedExecution !== testCase.executionInput) {
        await prisma.testCase.update({
          where: { id: testCase.id },
          data: { executionInput: normalizedExecution },
        });
        console.log(`Normalized executionInput for TestCase ${testCase.id}.`);
        updatedCount += 1;
      }
    }
  }

  console.log(`Migration complete: updated ${updatedCount} test case(s).`);
  if (unresolvedCount > 0) {
    console.log(
      `Warning: ${unresolvedCount} test case(s) still require manual executionInput review.`,
    );
  }
}

main()
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
