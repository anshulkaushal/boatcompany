import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { name, email, phone, message, boatId, startTime, endTime } = await req.json();

  // Upsert customer by email
  const customer = await prisma.customer.upsert({
    where: { email },
    update: { name, phone },
    create: { name, email, phone },
  });

  const booking = await prisma.booking.create({
    data: {
      boatId,
      customerId: customer.id,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      status: 'PENDING',
      message,
    },
  });

  return NextResponse.json({ ok: true, bookingId: booking.id }, { status: 201 });
}


