import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromJWT } from "@/lib/auth";

/* ================= CONFIG ================= */

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.1-8b-instant";

/* ================= HELPERS ================= */

/**
 * Safely extract JSON from LLM output
 */
function extractJson(text: string) {
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");

  if (first === -1 || last === -1) {
    throw new Error("No JSON object found");
  }

  return JSON.parse(text.slice(first, last + 1));
}

/* ================= ROUTE ================= */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mediaUrl, mediaType, thumbnail } = body;

    /* ---------- VALIDATION ---------- */

    if (!mediaUrl || !mediaType) {
      return NextResponse.json(
        { error: "mediaUrl and mediaType are required" },
        { status: 400 }
      );
    }

    // 🔒 IMAGE ONLY (by product decision)
    if (mediaType !== "IMAGE") {
      return NextResponse.json(
        { error: "Video deepfake scanning is not supported yet" },
        { status: 400 }
      );
    }

    const currentUser = await getUserFromJWT();

    /* ---------- GROQ CALL ---------- */

    const groqRes = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "You are a digital forensics analyst. Respond with STRICT JSON only. No markdown. No explanations outside JSON.",
          },
          {
            role: "user",
            content: `
Analyze the following IMAGE for signs of AI generation or deepfake manipulation.

Image URL:
${mediaUrl}

Respond with STRICT JSON ONLY using this schema:

{
  "verdict": "REAL | AI_GENERATED | SUSPICIOUS",
  "confidence": number between 0.0 and 1.0,
  "summary": string,
  "signals": string[]
}

Rules:
- If unsure, verdict = SUSPICIOUS
- Confidence must be a float between 0.0 and 1.0
- signals must be an array
`,
          },
        ],
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      console.error("Groq API error:", err);
      return NextResponse.json(
        { error: "Groq API request failed" },
        { status: 502 }
      );
    }

    const groqData = await groqRes.json();
    const rawOutput = groqData.choices?.[0]?.message?.content;

    if (!rawOutput) {
      return NextResponse.json(
        { error: "Empty AI response" },
        { status: 500 }
      );
    }

    /* ---------- PARSE & SANITIZE ---------- */

    let analysis: {
      verdict: "REAL" | "AI_GENERATED" | "SUSPICIOUS";
      confidence: number;
      summary: string;
      signals: string[];
    };

    try {
      analysis = extractJson(rawOutput);
    } catch (err) {
      console.error("AI RAW OUTPUT:", rawOutput);
      return NextResponse.json(
        { error: "Malformed AI response" },
        { status: 500 }
      );
    }

    // Clamp & sanitize
    analysis.confidence = Math.min(
      1,
      Math.max(0, Number(analysis.confidence))
    );

    analysis.signals = Array.isArray(analysis.signals)
      ? analysis.signals.map(String)
      : [];

    if (!analysis.verdict || !analysis.summary) {
      return NextResponse.json(
        { error: "Incomplete AI response" },
        { status: 500 }
      );
    }

    /* ---------- SAVE TO DB ---------- */

    const scan = await prisma.mediaScan.create({
      data: {
        userId: currentUser?.id || null,

        mediaType: "IMAGE",
        mediaUrl,
        thumbnail: thumbnail || null,

        verdict: analysis.verdict,
        confidence: analysis.confidence,
        summary: analysis.summary,
        signals: analysis.signals,

        modelUsed: "Groq-LLM-Image-v1",
      },
    });

    /* ---------- RESPONSE ---------- */

    return NextResponse.json({
      id: scan.id,
      verdict: scan.verdict,
      confidence: scan.confidence,
      summary: scan.summary,
      signals: scan.signals,
      createdAt: scan.createdAt,
    });
  } catch (err) {
    console.error("DEEPFAKE ROUTE ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
