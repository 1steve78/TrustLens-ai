import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDomainMetadata } from "@/lib/metadata";
import { calculateRiskRules } from "@/lib/rules";
import { analyzeWithAI } from "@/lib/ai";
import { normalizeRiskScore, riskConfidence } from "@/lib/ethics";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // TEMP text extraction (AI replaces later)
    const extractedText =
      "Verify your account now to avoid suspension";

    // 1️⃣ Metadata
    const metadata = await getDomainMetadata(url);

    // 2️⃣ Rule-based heuristics
    const ruleResult = calculateRiskRules({
      domainAgeDays: metadata.domainAgeDays,
      sslValid: metadata.sslValid,
      text: extractedText,
    });

    // 3️⃣ AI analysis
    const aiResult = await analyzeWithAI({
      url,
      domainAgeDays: metadata.domainAgeDays,
      sslValid: metadata.sslValid,
      extractedText,
    });

    // 4️⃣ Community intelligence
    const reportCount = await prisma.report.count({
      where: { url },
    });

    let communityBoost = 0;
    if (reportCount >= 3) communityBoost = 10;
    if (reportCount >= 6) communityBoost = 20;

    // 5️⃣ Final ethical score
    const rawScore =
      aiResult.riskScore +
      ruleResult.ruleScore +
      communityBoost;

    const finalScore = normalizeRiskScore(rawScore);

    const riskLevel =
      finalScore > 70
        ? "High"
        : finalScore > 40
        ? "Medium"
        : "Low";

    // 6️⃣ Save scan
    const scan = await prisma.scan.create({
      data: {
        url,
        riskScore: finalScore,
        riskLevel,
        reasons: [
          ...ruleResult.reasons,
          ...aiResult.reasons,
        ],
      },
    });

    // 7️⃣ Response
    return NextResponse.json({
      scanId: scan.id,
      url: scan.url,
      riskScore: finalScore,
      riskLevel,
      confidence: riskConfidence(finalScore),
      reasons: scan.reasons,
      educationTip: aiResult.educationTip,
      communityReports: reportCount,
    });
  } catch (error) {
    console.error("Scan error:", error);
    return NextResponse.json(
      { error: "Scan failed" },
      { status: 500 }
    );
  }
}
