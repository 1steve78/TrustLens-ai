import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { url, reason } = await req.json();

    if (!url || !reason) {
      return NextResponse.json(
        { error: "URL and reason are required" },
        { status: 400 }
      );
    }

    const report = await prisma.report.create({
      data: {
        url,
        reason,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Report error:", error);
    return NextResponse.json(
      { error: "Failed to submit report" },
      { status: 500 }
    );
  }
}
