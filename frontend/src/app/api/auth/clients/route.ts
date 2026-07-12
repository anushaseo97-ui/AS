import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/auth-utils';

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

    if (!client || client.dietitianId !== dietitianId) {
      return NextResponse.json({ error: "Client not found or unauthorized access" }, { status: 404 });
    }

    return NextResponse.json({ client }, { status: 200 });
  } catch (error) {
    console.error("Error fetching single client:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PATCH: Update specific client metrics (like tracking weight changes)
 */
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
        const session = getSession();
    if (!session || session.role !== "DIETITIAN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const dietitianId = session.id;

    // 1. Verify the client exists and belongs to this dietitian
    const existingClient = await db.client.findUnique({
      where: { id: params.id },
    });

    if (!existingClient || existingClient.dietitianId !== dietitianId) {
      return NextResponse.json({ error: "Client not found or unauthorized" }, { status: 404 });
    }

    // 2. Parse the update data from the request body
    const body = await request.json();
    const { name, weight, targetWeight } = body;

    // 3. Save updates to the Neon database
    const updatedClient = await db.client.update({
      where: { id: params.id },
      data: {
        name: name || existingClient.name,
        weight: weight !== undefined ? parseFloat(weight) : existingClient.weight,
        targetWeight: targetWeight !== undefined ? parseFloat(targetWeight) : existingClient.targetWeight,
      },
    });

    return NextResponse.json(
      { message: "Client metrics updated successfully", client: updatedClient },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}