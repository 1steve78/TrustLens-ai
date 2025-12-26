export async function analyzeWithAI(input: {
  url: string;
  domainAgeDays: number;
  sslValid: boolean;
  extractedText: string;
}) {
  const prompt = `
You are a cybersecurity assistant.

Analyze the website for scam or phishing risk.

Data:
- URL: ${input.url}
- Domain age: ${input.domainAgeDays} days
- SSL valid: ${input.sslValid}
- Website text: "${input.extractedText}"

Return JSON ONLY in this format:
{
  "riskScore": number (0-100),
  "reasons": string[],
  "educationTip": string
}

Be cautious. Do not make legal claims.
Explain risk in simple language.
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
  return JSON.parse(data.choices[0].message.content);
}
