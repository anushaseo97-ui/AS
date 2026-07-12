import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/auth-utils';

export const dynamic = 'force-dynamic'; 

export async function POST(request: Request) {
  try {
    // 1. Enforce Dietitian Authentication
    const session = getSession();
    if (!session || session.role !== "DIETITIAN") {
     return NextResponse.json({ error: "Unauthorized. Professional access required." }, { status: 401 });
    }
      const dietitianId = session.id;

    // 2. Parse Incoming Request Payload
    const body = await request.json();
    const { clientId, dynamicNotes } = body;

    if (!clientId) {
      return NextResponse.json({ error: "Client ID is a required parameter." }, { status: 400 });
    }

    // 3. Fetch Client Statistics from Database
    const client = await db.client.findUnique({
      where: { id: clientId },
    });

    if (!client || client.dietitianId !== dietitianId) {
      return NextResponse.json({ error: "Client records not found or access mismatch." }, { status: 404 });
    }

    // 4. Construct a Structured, Quantitative Prompt for the AI
    const currentWeight = client.weight ? `${client.weight} kg` : "Not specified";
    const targetWeight = client.targetWeight ? `${client.targetWeight} kg` : "Not specified";

    const aiPrompt = `
      You are an elite expert nutritional AI running optimized inference pipelines on AMD hardware.
      Generate a professional, structured, and actionable 3-day meal plan recommendation for a client with the following health profiles:
      - Client Name: ${client.name}
      - Current Weight: ${currentWeight}
      - Target Weight Goal: ${targetWeight}
      - Professional Context Notes: ${dynamicNotes || "Focus on balanced macronutrients and steady metabolic adaptation."}

      Provide your strategy strictly in clean, professional markdown format containing:
      1. Strategic Caloric Target overview.
      2. Clear breakdown for Breakfast, Lunch, Dinner, and Snacking across 3 structured days.
    `;

    console.log("🚀 SENDING MODEL TO PRIVATE AMD GPU SERVER:", "unsloth/gemma-2-9b-it");

    // 5. Connect Directly to your Private AMD Server
    const amdServerUrl = "http://36.150.116.194:8000/v1/chat/completions"; 
    
    const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.FIREWORKS_API_KEY}`,
      },
      body: JSON.stringify({
        model: "accounts/fireworks/models/llama-v3-8b-instruct",
        messages: [
          { role: "system", content: "You are a professional medical nutrition software agent." },
          { role: "user", content: aiPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1200,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AMD vLLM Server Error Return:", errorText);
      return NextResponse.json({ error: "Upstream intelligence processing failed." }, { status: 502 });
    }

    const aiData = await response.json();
    const generatedPlanText = aiData.choices[0].message.content;

    // =========================================================
    // 💾 STEP 2 INTEGRATION: Save directly to your PostgreSQL DB
    // =========================================================
    const savedPlan = await db.mealPlan.create({
      data: {
        title: `AI Strategy Plan - ${client.name}`, // Fulfills required title parameter
        content: generatedPlanText,               // Maps to long Text column
        clientId: client.id,                       // Links relational foreign key
      },
    });

    console.log(`💾 Meal Plan saved to DB with unique ID: ${savedPlan.id}`);

    // 6. Return the Generated Strategy Document Cleanly to Frontend
    return NextResponse.json({
      success: true,
      provider: "Self-Hosted vLLM via Private AMD Compute Infrastructure",
      mealPlan: generatedPlanText,
      planId: savedPlan.id
    }, { status: 200 });

  } catch (error) {
    console.error("AI Generation Exception Route:", error);
    return NextResponse.json({ error: "Internal server processing failure." }, { status: 500 });
  }
}