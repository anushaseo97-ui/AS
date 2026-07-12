import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth-utils';
import { db } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = getSession();
  if (!session || session.role !== "DIETITIAN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requests = await db.bookingRequest.findMany({
    where: {
      OR: [
        { dietitianId: null },
        { dietitianId: session.id },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ requests });
}