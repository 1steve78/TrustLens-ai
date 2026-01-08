import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { userId, avatarUrl } = await req.json();

  if (!userId || !avatarUrl) {
    return NextResponse.json(
      { error: "Missing userId or avatarUrl" },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: { id: userId },
    data: { avatarUrl },
  });

  return NextResponse.json({ success: true });
}
