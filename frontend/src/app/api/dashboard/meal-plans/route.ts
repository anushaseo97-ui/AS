import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth-utils';
import { db } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = getSession();

  if (!session || session.role !== "DIETITIAN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const mealPlans = await db.mealPlan.findMany({
    where: { client: { dietitianId: session.id } },
    include: { client: true },
    orderBy: { createdAt: 'desc' },
  });

  const formatted = mealPlans.map((p) => ({
    id: p.id,
    title: p.title,
    client: p.client.name,
    clientId: p.clientId,
    preview: p.content.length > 140 ? p.content.slice(0, 140) + "..." : p.content,
    createdAt: new Date(p.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));

  return NextResponse.json({ mealPlans: formatted });
}
export async function POST(request: Request) {
  const session = getSession();
  if (!session || session.role !== "DIETITIAN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { clientId, title, content } = await request.json();
    if (!clientId || !title || !content) {
      return NextResponse.json({ error: "Client, title, and content are required." }, { status: 400 });
    }

    const client = await db.client.findUnique({ where: { id: clientId } });
    if (!client || client.dietitianId !== session.id) {
      return NextResponse.json({ error: "Invalid client." }, { status: 400 });
    }

    const plan = await db.mealPlan.create({
      data: { title, content, clientId },
    });

    return NextResponse.json({ success: true, plan });
  } catch (error) {
    console.error("Error creating meal plan:", error);
    return NextResponse.json({ error: "Failed to create meal plan." }, { status: 500 });
  }
}