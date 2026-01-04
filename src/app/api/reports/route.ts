import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserFromJWT } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { scanId, message } = await req.json();

    if (!scanId || !message?.trim()) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    const scanExists = await prisma.scan.findUnique({
      where: { id: scanId },
      select: { id: true },
    });

    if (!scanExists) {
      return NextResponse.json(
        { error: "Scan not found" },
        { status: 404 }
      );
    }

    const user = await getUserFromJWT().catch(() => null);

    await prisma.report.create({
      data: {
        type: "SCAN",          // ✅ THIS FIXES THE ERROR
        scanId,
        message,
        userId: user?.id ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("REPORT_CREATE_ERROR", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
