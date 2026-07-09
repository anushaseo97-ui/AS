import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // 1. Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Name, email, and password are required fields." },
        { status: 400 }
      );
    }

    // 2. Check if the Dietitian already exists
    const existingDietitian = await db.dietitian.findUnique({
      where: { email },
    });

    if (existingDietitian) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // 3. Authentically hash the password (12 salt rounds is industry standard)
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Save the new Dietitian to your live Neon Database
    const newDietitian = await db.dietitian.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      // Do not return the hashed password string back to the client side
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { message: "Dietitian account created successfully!", user: newDietitian },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error during registration." },
      { status: 500 }
    );
  }
}