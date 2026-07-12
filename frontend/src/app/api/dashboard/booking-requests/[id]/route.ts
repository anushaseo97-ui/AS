import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth-utils';
import { db } from '@/app/lib/db';
export const dynamic = 'force-dynamic';
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = getSession();
  if (!session || session.role !== "DIETITIAN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await db.bookingRequest.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  if (existing.dietitianId && existing.dietitianId !== session.id) {
    return NextResponse.json({ error: "Already claimed by another dietitian." }, { status: 409 });
  }

  const updated = await db.bookingRequest.update({
    where: { id: params.id },
    data: { status: "APPROVED", dietitianId: session.id },
  });

  const inviteLink = `${new URL(request.url).origin}/signup?invite=true&dietitianId=${session.id}&email=${encodeURIComponent(updated.email)}`;

  return NextResponse.json({ success: true, bookingRequest: updated, inviteLink });
}