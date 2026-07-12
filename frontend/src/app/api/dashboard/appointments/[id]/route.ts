import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth-utils';
import { db } from '@/app/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = getSession();

  if (!session || session.role !== "DIETITIAN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appointment = await db.appointment.findUnique({ where: { id: params.id } });

  if (!appointment || appointment.dietitianId !== session.id) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const body = await request.json();
  const { status } = body;

  if (!["PENDING", "CONFIRMED", "CANCELLED"].includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const updated = await db.appointment.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json({ success: true, appointment: updated });
}