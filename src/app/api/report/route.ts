import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      type,        // "REPORT" | "COMMENT"
      reason,      // optional (e.g. Phishing, Spam)
      message,     // optional comment text
      scanId,      // optional
      learningId,  // optional
      userId,      // optional (null for anonymous)
    } = await req.json();

    // ---- Basic validation ----
    if (!type || (type !== "REPORT" && type !== "COMMENT")) {
      return NextResponse.json(
        { error: "Invalid report type" },
        { status: 400 }
      );
    }

    // Must target exactly ONE entity
    if (!scanId && !learningId) {
      return NextResponse.json(
        { error: "scanId or learningId is required" },
        { status: 400 }
      );
    }

    if (scanId && learningId) {
      return NextResponse.json(
        { error: "Only one target allowed" },
        { status: 400 }
      );
    }

    // ---- Create report ----
    const report = await prisma.report.create({
      data: {
        type,
        reason,
        message,
        userId: userId ?? null,
        scanId: scanId ?? null,
        learningId: learningId ?? null,
      },
    });

    return NextResponse.json({
      success: true,
      report,
    });

  } catch (error) {
    console.error("REPORT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to submit report" },
      { status: 500 }
    );
  }
}
