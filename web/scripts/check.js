/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('cwd=', process.cwd());
  console.log('DATABASE_URL=', process.env.DATABASE_URL);
  const tables = await prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type='table' ORDER BY name`;
  console.log('tables=', tables);
  try {
    const count = await prisma.boat.count();
    console.log('boat_count=', count);
  } catch (e) {
    console.error('boat_count_error=', e.code || e.message);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


