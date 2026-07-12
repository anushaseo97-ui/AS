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

  const question = await db.question.findUnique({ where: { id: params.id } });
  if (!question || !question.isPublic) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const { answer } = await request.json();
  if (!answer || !answer.trim()) {
    return NextResponse.json({ error: "Answer text is required." }, { status: 400 });
  }

  const updated = await db.question.update({
    where: { id: params.id },
    data: { answer, answeredAt: new Date() },
  });

  return NextResponse.json({ success: true, question: updated });
}