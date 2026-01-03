const KEYWORDS = [
  "phishing",
  "login",
  "bank",
  "payment",
  "otp",
  "verify",
  "secure",
  "crypto",
  "wallet",
  "offer",
  "reward",
  "free",
  "short",
  "qr",
  "wifi",
];

function clean(word: string) {
  return word.replace(/[^a-zA-Z]/g, "").toLowerCase();
}

export function generateHashtags({
  url,
  summary,
  riskLevel,
}: {
  url: string;
  summary?: string | null;
  riskLevel: string;
}) {
  const tags = new Set<string>();

  if (riskLevel === "Dangerous") tags.add("#scamAlert");
  if (riskLevel === "Suspicious") tags.add("#beCareful");
  if (riskLevel === "Safe") tags.add("#safeLink");

  url.split(/[./\-?_=&]/).forEach((part) => {
    const word = clean(part);
    if (KEYWORDS.includes(word)) tags.add(`#${word}`);
    if (word.includes("login")) tags.add("#fakeLogin");
    if (word.includes("bit") || word.includes("tiny")) tags.add("#shortUrl");
  });

  summary
    ?.split(" ")
    .map(clean)
    .forEach((word) => {
      if (KEYWORDS.includes(word)) tags.add(`#${word}`);
    });

  return Array.from(tags).slice(0, 6);
}
