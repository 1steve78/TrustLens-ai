type RuleInput = {
  domainAgeDays: number;
  sslValid: boolean;
  text: string;
};

export function calculateRiskRules(input: RuleInput) {
  let score = 0;
  const reasons: string[] = [];

  if (input.domainAgeDays < 14) {
    score += 25;
    reasons.push("Domain was registered recently");
  }

  if (!input.sslValid) {
    score += 30;
    reasons.push("Website does not use a valid SSL certificate");
  }

  const urgencyWords = ["urgent", "verify now", "account locked", "act now"];
  if (urgencyWords.some(w => input.text.toLowerCase().includes(w))) {
    score += 20;
    reasons.push("Uses urgency-based language");
  }

  return {
    ruleScore: score,
    reasons,
  };
}
