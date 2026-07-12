import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth-utils';
import { db } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const session = getSession();

  if (!session || session.role !== "DIETITIAN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";

  const clients = await db.client.findMany({
    where: {
      dietitianId: session.id,
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: { createdAt: 'desc' },
    include: {
      appointments: {
        orderBy: { dateTime: 'desc' },
        take: 1,
      },
    },
  });

  const formatted = clients.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    status: c.isVerified ? "Active" : "Pending",
    lastVisit: c.appointments[0]
      ? new Date(c.appointments[0].dateTime).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "No visits yet",
  }));

  return NextResponse.json({ clients: formatted });
}