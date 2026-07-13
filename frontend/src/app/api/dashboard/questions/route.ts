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
  const clientId = searchParams.get("clientId");

  const questions = await db.question.findMany({
    where: {
      dietitianId: session.id,
      isPublic: false,
      ...(clientId ? { clientId } : {}),
    },
    include: { client: true },
    orderBy: { createdAt: 'desc' },
  });

  const formatted = questions.map((q) => ({
    id: q.id,
    question: q.question,
    answer: q.answer,
    clientName: q.client?.name || q.authorName || "Anonymous",
    clientId: q.clientId,
    createdAt: q.createdAt,
  }));

  return NextResponse.json({ questions: formatted });
}