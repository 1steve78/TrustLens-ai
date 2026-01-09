import { prisma } from "@/lib/prisma";
import { getUserFromJWT } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const user = await getUserFromJWT();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { avatarUrl } = await req.json();

  await prisma.user.update({
    where: { id: user.id },
    data: { avatarUrl },
  });

  return NextResponse.json({ success: true });
}
