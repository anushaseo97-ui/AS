import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth-utils';
import { db } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const questions = await db.question.findMany({
    where: { isPublic: true },
    include: { client: true },
    orderBy: { createdAt: 'desc' },
  });

  const formatted = questions.map((q) => ({
    id: q.id,
    question: q.question,
    answer: q.answer,
    author: q.client.name,
    createdAt: q.createdAt,
    hasExpertReply: !!q.answer,
  }));

  return NextResponse.json({ questions: formatted });
}