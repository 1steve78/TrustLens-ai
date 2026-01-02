import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromJWT } from "@/lib/auth";


const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }
    const currentUser = await getUserFromJWT();
    if (!currentUser || !currentUser.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // -------- AI PROMPT --------
    const prompt = `
You are a cybersecurity assistant.

Analyze the following URL for phishing or scam risk:
${url}

Return ONLY valid JSON in this format:
{
  "riskLevel": "Safe | Suspicious | Dangerous",
  "summary": "one short sentence",
  "details": ["point 1", "point 2", "point 3"]
}
`;

    // -------- OPENROUTER CALL --------
    const aiRes = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "TrustLens AI",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.2,
        }),
      }
    );

    const aiData = await aiRes.json();
    const content = aiData?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Empty AI response");
    }

    // -------- SAFE PARSE --------
    let parsed: {
      riskLevel: "Safe" | "Suspicious" | "Dangerous";
      summary: string;
      details: string[];
    };

    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = {
        riskLevel: "Suspicious",
        summary: "Unable to confidently analyze this URL.",
        details: [content],
      };
    }

    // -------- SAVE TO DB --------
    const scan = await prisma.scan.create({
      data: {
        url,
        riskLevel: parsed.riskLevel,
        summary: parsed.summary,
        details: parsed.details,
       user: {
      connect: { id: currentUser.id },
        },
      },
    });

    // -------- RESPONSE FOR UI --------
    return NextResponse.json({
      id: scan.id,
      url: scan.url,
      riskLevel: scan.riskLevel,
      summary: scan.summary,
      details: scan.details,
      createdAt: scan.createdAt,
    });

  } catch (error) {
    console.error("SCAN ERROR:", error);
    return NextResponse.json(
      { error: "Scan failed" },
      { status: 500 }
    );
  }
}
 