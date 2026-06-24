import { prisma } from '../config/database.js';

async function migrate() {
  const problems = await prisma.problem.findMany();
  console.log(`Found ${problems.length} problems`);
  for (const p of problems) {
    const boilerplate = (p.boilerplate as any) || {};
    const examples = (p.examples as any) || [];

    const starterCode = boilerplate || {};
    // Default function signature - best-effort. Set name to 'solve'.
    const functionSignature = 'solve';
    const parameterTypes: any[] = [];
    const returnType = 'any';

    await prisma.problem.update({
      where: { id: p.id },
      data: {
        starterCode: starterCode as any,
        functionSignature,
        parameterTypes: parameterTypes as any,
        returnType,
      },
    });
    console.log(`Migrated problem ${p.id} ${p.title}`);
  }
  console.log('Migration complete');
  process.exit(0);
}

migrate().catch((e) => {
  console.error(e);
  process.exit(1);
});
