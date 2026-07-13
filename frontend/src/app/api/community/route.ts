import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth-utils';
import { db } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

// GET: public, no login required — anyone can view public questions
export async function GET() {
  const questions = await db.question.findMany({
    where: { isPublic: true },
    include: { client: true },
    orderBy: { createdAt: 'desc' },
  });

  const formatted = questions.map((q) => ({
    id: q.id,
    question: q.question,
    answer: q.answer,
    author: q.client?.name || q.authorName || "Anonymous",
    createdAt: q.createdAt,
    hasExpertReply: !!q.answer,
  }));

  return NextResponse.json({ questions: formatted });
}

// POST: anyone can submit a public question — logged in or fully anonymous
export async function POST(request: Request) {
  try {
    const { question, authorName } = await request.json();

    if (!question || !question.trim()) {
      return NextResponse.json({ error: "Question text is required." }, { status: 400 });
    }

    const session = getSession();

    // If a logged-in client asks here, link it to their account and their dietitian
    if (session && session.role === "CLIENT") {
      const client = await db.client.findUnique({ where: { id: session.id } });
      const newQuestion = await db.question.create({
        data: {
          question,
          isPublic: true,
          clientId: session.id,
          dietitianId: client?.dietitianId,
        },
      });
      return NextResponse.json({ success: true, question: newQuestion });
    }

    // Otherwise, fully anonymous — just needs a display name
    if (!authorName || !authorName.trim()) {
      return NextResponse.json({ error: "Please include your name." }, { status: 400 });
    }

    const newQuestion = await db.question.create({
      data: {
        question,
        isPublic: true,
        authorName,
      },
    });

    return NextResponse.json({ success: true, question: newQuestion });
  } catch (error) {
    console.error("Error creating public question:", error);
    return NextResponse.json({ error: "Failed to submit question." }, { status: 500 });
  }
}