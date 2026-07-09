import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db'; // Make sure this matches where you put your lib folder!
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Validate that the user actually sent data
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // 2. Look up the dietitian in the Neon database
    const dietitian = await db.dietitian.findUnique({
      where: { email },
    });

    if (!dietitian) {
      // We use a generic error message so hackers don't know if the email exists or not
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // 3. Authentically compare the typed password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, dietitian.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // 4. Create a secure, HTTP-only cookie to keep the user logged in
    cookies().set('dietitian_session', dietitian.id, {
      httpOnly: true, // Prevents malicious JavaScript from stealing the cookie
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // Expires in 1 week
      path: '/',
    });

    return NextResponse.json(
      { message: "Login successful!", id: dietitian.id },
      { status: 200 }
    );

  } catch (error) {
    console.error("Login Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error during login." },
      { status: 500 }
    );
  }
}