import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth-utils';
import { db } from '@/app/lib/db';

export async function GET() {
  const session = getSession();

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user =
    session.role === "DIETITIAN"
      ? await db.dietitian.findUnique({ where: { id: session.id } })
      : await db.client.findUnique({ where: { id: session.id } });

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      role: session.role,
      isVerified: user.isVerified,
    },
  });
}