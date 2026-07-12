import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/auth-utils';
export const dynamic = 'force-dynamic';
interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET: Fetch a single client's details by their ID
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
        const session = getSession();
    if (!session || session.role !== "DIETITIAN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const dietitianId = session.id;

    const client = await db.client.findUnique({
      where: { id: params.id },
    });

    // Security check: Ensure this client actually belongs to the logged-in dietitian
    if (!client || client.dietitianId !== dietitianId) {
      return NextResponse.json({ error: "Client not found or unauthorized access" }, { status: 404 });
    }

    return NextResponse.json({ client }, { status: 200 });
  } catch (error) {
    console.error("Error fetching single client:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}