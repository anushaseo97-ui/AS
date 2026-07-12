import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth-utils';
import { db } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user =
    session.role === "DIETITIAN"
      ? await db.dietitian.findUnique({ where: { id: session.id } })
      : await db.client.findUnique({ where: { id: session.id } });

  if (!user) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({
    profile: { name: user.name, email: user.email, role: session.role },
  });
}

export async function PATCH(request: Request) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await request.json();
  if (!name || !name.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  const updated =
    session.role === "DIETITIAN"
      ? await db.dietitian.update({ where: { id: session.id }, data: { name } })
      : await db.client.update({ where: { id: session.id }, data: { name } });

  return NextResponse.json({ success: true, profile: { name: updated.name } });
}