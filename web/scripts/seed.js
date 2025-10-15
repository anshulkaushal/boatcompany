/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.boat.count();
  if (count > 0) {
    console.log('Boats already exist, skipping seed');
    return;
  }

  await prisma.boat.createMany({
    data: [
      {
        name: 'Sunset Cruiser',
        type: 'Pontoon',
        capacity: 8,
        hourlyRate: 120.0,
        description: 'Perfect for evening cruises with family.',
      },
      {
        name: 'Wave Runner',
        type: 'Speedboat',
        capacity: 4,
        hourlyRate: 160.0,
        description: 'Fast and fun for thrill seekers.',
      },
      {
        name: 'Harbor Explorer',
        type: 'Sailboat',
        capacity: 6,
        hourlyRate: 140.0,
        description: 'Relaxed sailing around the bay.',
      },
    ],
  });

  console.log('Seeded boats');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


