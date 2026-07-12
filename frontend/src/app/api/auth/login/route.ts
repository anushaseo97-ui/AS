import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db'; 
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    let user = null;
    let role: "DIETITIAN" | "CLIENT" = "DIETITIAN";

    // 2. Pehle check karein ke kya yeh Dietitian table mein hai?
    user = await db.dietitian.findUnique({
      where: { email },
    });

    // 3. Agar dietitian nahi mila, toh Client table mein dhoondein!
    if (!user) {
      user = await db.client.findUnique({
        where: { email },
      });
      role = "CLIENT"; // Role badal kar client kar dein
    }

    // 4. Agar dono tables mein user nahi mila
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // 5. Password compare karein
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // 6. 🌟 HTTP-Only Session Cookie (FOR TAB-CLOSE AUTO LOGOUT)
    // Humne 'maxAge' ko bilkul hata diya hai. Ab jab tak browser tab khula hai, session zinda rahega. 
    // Tab band hote hi user auto-logout ho jayega!
    cookies().set('nutrilife_session', JSON.stringify({ id: user.id, role }), {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    // 7. Return everything our Smart Navbar needs!
    return NextResponse.json(
      { 
        success: true,
        message: "Login successful!", 
        user: {
          name: user.name,
          role: role,
          isVerified: user.isVerified // Smart Navbar handles route visibility with this
        }
      },
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