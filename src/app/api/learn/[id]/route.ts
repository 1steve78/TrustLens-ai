import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserFromJWT } from "@/lib/auth";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // 🔑 MUST unwrap params
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { error: "Missing learning id" },
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

  const learning = await prisma.learningActivity.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!learning) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  if (learning.userId !== currentUser.id) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  await prisma.learningActivity.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
