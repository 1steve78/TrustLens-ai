import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { targetType, targetId, message } = await req.json();

    if (!targetType || !targetId || !message?.trim()) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    const data: any = {
      message,
    };

    // 🔑 attach to correct model
    if (targetType === "scan") {
      data.scanId = targetId;
    } else if (targetType === "learning") {
      data.learningId = targetId;
    } else {
      return NextResponse.json(
        { error: "Invalid target type" },
        { status: 400 }
      );
    }

    await prisma.report.create({ data });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("REPORT ERROR:", err);
    return NextResponse.json(
      { error: "Failed to submit report" },
      { status: 500 }
    );
  }
}
