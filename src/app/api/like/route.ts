import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type LikeTarget = "report" | "scan" | "learning" | "media";

export async function POST(req: Request) {
  try {
    const { targetType, targetId } = await req.json();

    if (!targetType || !targetId) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    switch (targetType as LikeTarget) {
      case "report":
        await prisma.report.update({
          where: { id: targetId },
          data: { likesCount: { increment: 1 } },
        });
        break;

      case "scan":
        await prisma.scan.update({
          where: { id: targetId },
          data: { likesCount: { increment: 1 } },
        });
        break;

      case "learning":
        await prisma.learningActivity.update({
          where: { id: targetId },
          data: { likesCount: { increment: 1 } },
        });
        break;

      case "media":
        await prisma.mediaScan.update({
          where: { id: targetId },
          data: { likesCount: { increment: 1 } },
        });
        break;

      default:
        return NextResponse.json(
          { error: "Unknown target type" },
          { status: 400 }
        );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("LIKE_ERROR", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
