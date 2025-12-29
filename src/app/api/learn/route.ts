import { NextResponse } from "next/server";

/**
 * Helper: get current year-week string (e.g. 2025-W38)
 */
function getYearWeek() {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor(
    (now.getTime() - firstDay.getTime()) / 86400000
  );
  const week = Math.ceil((days + firstDay.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;
}

export async function POST() {
  const weekKey = getYearWeek();

  // 🔹 Later: check DB if briefing for weekKey exists
  // 🔹 For now: always generate

  const prompt = `
You are a cybersecurity safety assistant.

Generate a WEEKLY scam briefing.
Rules:
- 3 short scam trends
- Simple language
- No technical jargon
- Each trend: 1 line explanation + 1 safety tip
- Calm, educational tone

Return plain text, no markdown.
`;

  const res = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
      }),
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { explanation: "Unable to load weekly briefing." },
      { status: 500 }
    );
  }

  const data = await res.json();

  return NextResponse.json({
    week: weekKey,
    explanation: data.choices[0].message.content,
  });
}
