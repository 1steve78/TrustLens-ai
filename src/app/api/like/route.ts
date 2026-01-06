import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserFromJWT } from "@/lib/auth"; // adjust to your auth setup

export async function POST(req: Request) {
  try {
    const session = await getUserFromJWT();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { targetType, targetId } = await req.json();

    if (!targetType || !targetId) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    // 🔒 try creating like (unique constraint protects us)
    try {
      await prisma.like.create({
        data: {
          userId,
          targetType,
          targetId,
        },
      });
    } catch (err: any) {
      // Already liked
      return NextResponse.json(
        { error: "Already liked" },
        { status: 409 }
      );
    }

    // ✅ increment correct counter
    if (targetType === "scan") {
      await prisma.scan.update({
        where: { id: targetId },
        data: { likesCount: { increment: 1 } },
      });
    } else if (targetType === "learning") {
      await prisma.learningActivity.update({
        where: { id: targetId },
        data: { likesCount: { increment: 1 } },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("LIKE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to like" },
      { status: 500 }
    );
  }
}
