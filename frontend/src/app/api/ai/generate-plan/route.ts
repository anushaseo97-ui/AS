import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import { getDietitianSession } from '@/app/lib/auth-utils';

export async function POST(request: Request) {
  try {
    // 1. Enforce Dietitian Authentication
    const dietitianId = getDietitianSession();
    if (!dietitianId) {
      return NextResponse.json({ error: "Unauthorized. Professional access required." }, { status: 401 });
    }

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

    // 5. Connect Directly to the Fireworks AI API (AMD Architecture Endpoint)
    const apiKey = process.env.FIREWORKS_API_KEY;
    const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "accounts/fireworks/models/llama-v3p1-8b-instruct", // High-efficiency model
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
      console.error("Fireworks API Error Return:", errorText);
      return NextResponse.json({ error: "Upstream intelligence processing failed." }, { status: 502 });
    }

    const aiData = await response.json();
    const generatedPlanText = aiData.choices[0].message.content;

    // 6. Return the Generated Strategy Document Cleanly to Frontend
    return NextResponse.json({
      success: true,
      provider: "Fireworks AI via AMD Compute Infrastructure",
      mealPlan: generatedPlanText
    }, { status: 200 });

  } catch (error) {
    console.error("AI Generation Exception Route:", error);
    return NextResponse.json({ error: "Internal server processing failure." }, { status: 500 });
  }
}