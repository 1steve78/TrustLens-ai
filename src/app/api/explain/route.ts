import { NextResponse } from "next/server";
import { getUserFromJWT } from "@/lib/auth";
import { rateLimit } from "@/lib/rateLimit";
import { headers } from "next/dist/server/request/headers";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;

type ExplainResponse = {
  summary?: string;
  actions: string[];
};

function extractJsonBlock(raw: string) {
  const trimmed = raw.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) return trimmed;
  const match = trimmed.match(/\{[\s\S]*\}/);
  return match ? match[0] : null;
}

export async function POST(req: Request) {
  try {
    const headerList = await headers();
    const ipAddress =
      headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headerList.get("x-real-ip") ||
      "unknown";

    const { allowed } = rateLimit(`explain:${ipAddress}`);
    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "RATE_LIMIT_EXCEEDED",
          message: "Please wait before trying again.",
        },
        { status: 429 }
      );
    }

    const user = await getUserFromJWT();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { contextType, contextData } = await req.json();
    if (!contextType || !contextData) {
      return NextResponse.json(
        { error: "Missing context" },
        { status: 400 }
      );
    }

    const prompt = `
You are a safety assistant. A user asked: "What should I actually do about this?"

Context type: ${String(contextType)}
Context data: ${JSON.stringify(contextData)}

Return ONLY valid JSON in this format:
{
  "summary": "optional 1 sentence in plain language",
  "actions": ["action 1", "action 2", "action 3"]
}

Rules:
- Exactly 3 actions.
- Plain language for students.
- No technical jargon.
`;

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
    if (!content) throw new Error("Empty AI response");

    let parsed: ExplainResponse;
    try {
      const jsonBlock = extractJsonBlock(content);
      parsed = JSON.parse(jsonBlock || content);
    } catch {
      parsed = {
        summary: "Unable to confidently generate guidance.",
        actions: [
          "Pause before clicking or sharing anything.",
          "Verify the source using a trusted official site.",
          "Ask a friend or mentor if you are unsure.",
        ],
      };
    }

    const actions =
      Array.isArray(parsed.actions) && parsed.actions.length > 0
        ? parsed.actions.slice(0, 3)
        : [
            "Pause before clicking or sharing anything.",
            "Verify the source using a trusted official site.",
            "Ask a friend or mentor if you are unsure.",
          ];

    while (actions.length < 3) {
      actions.push("Use caution and avoid sharing sensitive details.");
    }

    return NextResponse.json({
      summary: parsed.summary,
      actions,
    });
  } catch (error) {
    console.error("Explain API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong while generating guidance.",
      },
      { status: 500 }
    );
  }
}
