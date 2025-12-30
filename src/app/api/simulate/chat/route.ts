import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages, scam } = await req.json();

  if (!messages || !scam) {
    return NextResponse.json(
      { error: "Missing messages or scam context" },
      { status: 400 }
    );
  }

  const systemPrompt = `
You are simulating a REAL scammer.

Scam details:
- Scam name: ${scam.name}
- Platform: ${scam.platform}
- Goal: ${scam.goal}
- Techniques: ${Array.isArray(scam.psychology) ? scam.psychology.join(", ") : scam.psychology}

Rules:
- NEVER say this is a scam
- NEVER warn the user
- Act like a real scammer
- Progress naturally toward your goal
- If user resists, increase urgency or reassurance
- Keep replies short and realistic
`;

  const mistralMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    })),
  ];

  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-small",
      messages: mistralMessages,
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content;

  if (!reply) {
    return NextResponse.json(
      { error: "No response from model" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    role: "scammer",
    text: reply,
  });
}
