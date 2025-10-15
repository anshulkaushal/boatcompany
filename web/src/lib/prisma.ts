import { PrismaClient } from '@prisma/client';

// Ensure a single PrismaClient instance in dev to avoid hot-reload leaks
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? new PrismaClient({ log: ['warn', 'error'] });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}


