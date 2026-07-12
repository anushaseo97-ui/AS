import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try {
    const { name, email, preferredDate, preferredTime, message } = await request.json();

    if (!name || !email || !preferredDate || !preferredTime) {
      return NextResponse.json({ error: "Name, email, date, and time are required." }, { status: 400 });
    }

    const bookingRequest = await db.bookingRequest.create({
      data: { name, email, preferredDate, preferredTime, message },
    });

    return NextResponse.json({ success: true, bookingRequest });
  } catch (error) {
    console.error("Error creating booking request:", error);
    return NextResponse.json({ error: "Failed to submit booking request." }, { status: 500 });
  }
}