import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, summary, scamType } = await req.json();

    if (!title || !summary) {
      return NextResponse.json(
        { explanation: "Scam details were not provided." },
        { status: 400 }
      );
    }

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "You are a cybersecurity expert who explains scams clearly and simply for everyday users.",
            },
            {
              role: "user",
              content: `
Scam Title: ${title}
Scam Type: ${scamType ?? "Unknown"}

Summary:
${summary}

Explain:
- What this scam is
- How it works
- Common warning signs
- How to stay safe
- What to do if already affected

Use simple language.
`,
            },
          ],
        }),
      }
    );

    const result = await groqRes.json();

    const explanation =
      result?.choices?.[0]?.message?.content ??
      "Unable to generate explanation at the moment.";

    return NextResponse.json({ explanation });
  } catch (err) {
    console.error("AI explain error:", err);
    return NextResponse.json(
      { explanation: "AI explanation failed." },
      { status: 500 }
    );
  }
}
