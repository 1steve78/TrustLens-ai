import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserFromJWT } from "@/lib/auth";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // 🔑 FIX

  if (!id) {
    return NextResponse.json(
      { error: "Missing scan id" },
      { status: 400 }
    );
  }

  const currentUser = await getUserFromJWT();

  if (!currentUser?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const scan = await prisma.scan.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!scan) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  // 🔐 owned scan → owner-only
  if (scan.userId !== currentUser.id) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  await prisma.scan.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
