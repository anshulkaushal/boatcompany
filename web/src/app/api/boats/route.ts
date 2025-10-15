import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const boats = await prisma.boat.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(boats);
}

export async function POST(req: Request) {
  const data = await req.json();
  const boat = await prisma.boat.create({ data });
  return NextResponse.json(boat, { status: 201 });
}


