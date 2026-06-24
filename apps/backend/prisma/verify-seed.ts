import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const total = await prisma.problem.count();
  const counts = await prisma.problem.groupBy({
    by: ['topic', 'difficulty'],
    _count: { _all: true },
    orderBy: [{ topic: 'asc' }, { difficulty: 'asc' }],
  });

  console.log(`total=${total}`);
  for (const row of counts) {
    console.log(`${row.topic} ${row.difficulty} ${row._count._all}`);
  }
}

main()
  .catch((error) => {
    console.error('Verify failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
