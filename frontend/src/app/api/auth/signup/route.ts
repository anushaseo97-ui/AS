import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import bcrypt from 'bcryptjs'; // Password secure rakhne ke liye
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, role, secretCode, dietitianId } = body;

    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Password ko hash (secure) karein
    const hashedPassword = await bcrypt.hash(password, 10);

    // ==========================================
    // CASE 1: DIETITIAN REGISTRATION
    // ==========================================
    if (role === "DIETITIAN") {
      // 🤫 DEMO HACKATHON SECRET CODE CHECK
      // Agar unhone secret code sahi likha, toh isVerified true hoga, warna false!
      const isVerified = secretCode === "NUTRILIFE-DEMO-2026";

      const newDietitian = await db.dietitian.create({
        data: {
          email,
          password: hashedPassword,
          name,
          isVerified: isVerified, // Toggled dynamically
        },
      });

      return NextResponse.json({
        success: true,
        message: isVerified 
          ? "Dietitian registered and verified successfully!" 
          : "Registered. Awaiting admin portfolio review.",
        user: { name: newDietitian.name, role: "DIETITIAN", isVerified }
      });
    }

    // ==========================================
    // CASE 2: CLIENT REGISTRATION (Via Invite Link)
    // ==========================================
    if (role === "CLIENT") {
      if (!dietitianId) {
        return NextResponse.json({ error: "Clients must register via a Dietitian's invite link." }, { status: 400 });
      }

      // Check karein ke jis dietitian ka link hai, kya woh khud verified hai?
      const targetDietitian = await db.dietitian.findUnique({
        where: { id: dietitianId }
      });

      if (!targetDietitian || !targetDietitian.isVerified) {
        return NextResponse.json({ error: "Invalid or unverified Dietitian reference link." }, { status: 400 });
      }

      // Client create karein aur automatically isVerified: true kardein
      const newClient = await db.client.create({
        data: {
          email,
          password: hashedPassword,
          name,
          dietitianId: dietitianId,
          isVerified: true, // Auto-verified because they used a verified link!
        },
      });

      return NextResponse.json({
        success: true,
        message: "Client registered and linked successfully!",
        user: { name: newClient.name, role: "CLIENT", isVerified: true }
      });
    }

    return NextResponse.json({ error: "Invalid account type role." }, { status: 400 });

  } catch (error: any) {
    console.error("Registration Error:", error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
    }
    return NextResponse.json({ error: "Registration processing failed." }, { status: 500 });
  }
}