import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-small",
      messages: [
        {
            role: "system",
            content:
            "You must return ONLY valid raw JSON. Do not use markdown. Do not use backticks. Do not explain anything."
        },
        {
            role: "user",
            content:
            "Find one well-known online scam. Return JSON with keys: name, platform, scammerRole, goal, steps, psychology."
        }
    ]

    }),
  });

  const json = await res.json();
  const text = json.choices[0].message.content;
  const cleaned = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();
  
  return NextResponse.json(JSON.parse(cleaned));
}
