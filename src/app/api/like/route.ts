import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromJWT } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getUserFromJWT();

    if (!user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { scanId, learningId } = await req.json();

    // 🔒 Exactly one must be provided
    if ((!scanId && !learningId) || (scanId && learningId)) {
      return NextResponse.json(
        { error: "Provide either scanId or learningId" },
        { status: 400 }
      );
    }

    /* ================= CREATE LIKE ================= */

    const like = await prisma.like.create({
      data: {
        userId: user.id,
        scanId: scanId || null,
        learningId: learningId || null,
      },
    });

    /* ================= UPDATE COUNTS ================= */

    if (scanId) {
      await prisma.scan.update({
        where: { id: scanId },
        data: { likesCount: { increment: 1 } },
      });
    }

    if (learningId) {
      await prisma.learningActivity.update({
        where: { id: learningId },
        data: { likesCount: { increment: 1 } },
      });
    }

    return NextResponse.json({ success: true, like });
  } catch (err: any) {
    // 🧠 Handle unique constraint violation (duplicate like)
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Already liked" },
        { status: 409 }
      );
    }

    console.error("LIKE ROUTE ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
