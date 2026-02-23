import { NextResponse } from "next/server";
import { getUserFromJWT } from "@/lib/auth";
import { rateLimit } from "@/lib/rateLimit";
import { headers } from "next/dist/server/request/headers";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;

function stripHtmlToText(html: string) {
  const noScript = html.replace(
    /<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi,
    " "
  );
  const noTags = noScript.replace(/<\/?[^>]+(>|$)/g, " ");
  return noTags.replace(/\s+/g, " ").trim();
}

export async function POST(req: Request) {
  try {
    /* ================= Get client IP ================= */
    const headerList = await headers();
    const ipAddress =
      headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headerList.get("x-real-ip") ||
      "unknown";

    /* ================= Rate limiting ================= */
    const { allowed } = rateLimit(`consent:${ipAddress}`);
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

    const { url, text } = await req.json();

    if (!url && !text) {
      return NextResponse.json(
        { error: "URL or text is required" },
        { status: 400 }
      );
    }

    const currentUser = await getUserFromJWT();
    if (!currentUser || !currentUser.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let inputText = typeof text === "string" ? text : "";

    if (url) {
      const res = await fetch(String(url), {
        method: "GET",
        headers: {
          "User-Agent": "TrustLens Consent Vault",
        },
      });

      if (!res.ok) {
        return NextResponse.json(
          { error: "Unable to fetch the URL" },
          { status: 400 }
        );
      }

      const html = await res.text();
      inputText = stripHtmlToText(html);
    }

    if (!inputText || inputText.length < 20) {
      return NextResponse.json(
        { error: "Not enough text to analyze" },
        { status: 400 }
      );
    }

    const trimmed = inputText.slice(0, 8000);

    const prompt = `
You are a consent and privacy analyst.

Analyze the following policy/terms text and return ONLY valid JSON in this format:
{
  "summary": "1-2 plain-language sentences",
  "dataCollected": ["..."],
  "sharedWith": ["..."],
  "riskFlags": ["..."],
  "riskScore": 0
}

Rules:
- Use plain language for students.
- riskScore must be 0-100 (integer).
- If a field is unknown, return an empty array (not null).

Text:
${trimmed}
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

    if (!content) {
      throw new Error("Empty AI response");
    }

    type Parsed = {
      summary: string;
      dataCollected: string[];
      sharedWith: string[];
      riskFlags: string[];
      riskScore: number;
    };

    function extractJsonBlock(raw: string) {
      const trimmed = raw.trim();
      if (trimmed.startsWith("{") && trimmed.endsWith("}")) return trimmed;
      const match = trimmed.match(/\{[\s\S]*\}/);
      return match ? match[0] : null;
    }

    let parsed: Parsed;

    try {
      const jsonBlock = extractJsonBlock(content);
      parsed = JSON.parse(jsonBlock || content);
    } catch {
      parsed = {
        summary:
          "Unable to confidently analyze this policy. Try a shorter excerpt or a different URL.",
        dataCollected: [],
        sharedWith: [],
        riskFlags: [],
        riskScore: 50,
      };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Consent API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong while processing the policy.",
      },
      { status: 500 }
    );
  }
}
