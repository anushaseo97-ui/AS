import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

/**
 * POST: Validates client credentials and drops a secure client_session cookie
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Core input check
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required fields." },
        { status: 400 }
      );
    }

    // 2. Locate the client in the database
    const client = await db.client.findUnique({
      where: { email },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 3. Verify their password against the database hash
    const isPasswordValid = await bcrypt.compare(password, client.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 4. Drop a completely unique secure session cookie specifically for clients
    cookies().set('client_session', client.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 Week duration
      path: '/',
    });

    return NextResponse.json(
      { 
        message: "Client login successful!", 
        client: { id: client.id, name: client.name, email: client.email } 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Client Login Error:", error);
    return NextResponse.json(
      { error: "Internal server error during client login." },
      { status: 500 }
    );
  }
}