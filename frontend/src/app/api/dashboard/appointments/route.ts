import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth-utils';
import { db } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = getSession();

  if (!session || session.role !== "DIETITIAN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appointments = await db.appointment.findMany({
    where: { dietitianId: session.id },
    include: { client: true },
    orderBy: { dateTime: 'asc' },
  });

  const clients = await db.client.findMany({
    where: { dietitianId: session.id },
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  });

  const formatted = appointments.map((a) => ({
    id: a.id,
    client: a.client.name,
    clientId: a.clientId,
    date: new Date(a.dateTime).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: new Date(a.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: a.status,
  }));

  return NextResponse.json({ appointments: formatted, clients });
}

export async function POST(request: Request) {
  const session = getSession();

  if (!session || session.role !== "DIETITIAN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { clientId, dateTime } = body;

    if (!clientId || !dateTime) {
      return NextResponse.json({ error: "Client and date/time are required." }, { status: 400 });
    }

    const client = await db.client.findUnique({ where: { id: clientId } });
    if (!client || client.dietitianId !== session.id) {
      return NextResponse.json({ error: "Invalid client." }, { status: 400 });
    }

    const appointment = await db.appointment.create({
      data: {
        dietitianId: session.id,
        clientId,
        dateTime: new Date(dateTime),
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ error: "Failed to create appointment." }, { status: 500 });
  }
}