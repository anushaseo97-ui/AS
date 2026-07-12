import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth-utils';
import { db } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = getSession();

  if (!session || session.role !== "CLIENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const mealPlans = await db.mealPlan.findMany({
    where: { clientId: session.id },
    orderBy: { createdAt: 'desc' },
  });

  const formatted = mealPlans.map((p) => ({
    id: p.id,
    title: p.title,
    content: p.content,
    createdAt: new Date(p.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));

  return NextResponse.json({ mealPlans: formatted });
}