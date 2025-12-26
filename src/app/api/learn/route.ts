import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { reasons } = await req.json();

    const prompt = `
You are teaching a non-technical user about online scams.

Given these risk reasons:
${reasons.join(", ")}

Explain in simple language:
1. What these signs mean
2. How scammers use them
3. One practical safety tip

Keep it calm, friendly, and educational.
`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await res.json();

    return NextResponse.json({
      explanation: data.choices[0].message.content,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Education generation failed" },
      { status: 500 }
    );
  }
}
