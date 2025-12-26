export function normalizeRiskScore(score: number) {
  if (score > 100) return 100;
  if (score < 0) return 0;
  return score;
}

export function riskConfidence(score: number) {
  if (score > 80) return "Very High";
  if (score > 60) return "High";
  if (score > 40) return "Medium";
  return "Low";
}
