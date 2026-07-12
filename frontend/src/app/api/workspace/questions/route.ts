import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth-utils';
import { db } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = getSession();
  if (!session || session.role !== "CLIENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const questions = await db.question.findMany({
    where: { clientId: session.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ questions });
}

export async function POST(request: Request) {
  const session = getSession();
  if (!session || session.role !== "CLIENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { question, isPublic } = await request.json();
    if (!question || !question.trim()) {
      return NextResponse.json({ error: "Question text is required." }, { status: 400 });
    }

    const client = await db.client.findUnique({ where: { id: session.id } });
    if (!client) {
      return NextResponse.json({ error: "Client not found." }, { status: 404 });
    }

    const newQuestion = await db.question.create({
      data: {
        question,
        isPublic: !!isPublic,
        clientId: session.id,
        dietitianId: client.dietitianId,
      },
    });

    return NextResponse.json({ success: true, question: newQuestion });
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json({ error: "Failed to submit question." }, { status: 500 });
  }
}