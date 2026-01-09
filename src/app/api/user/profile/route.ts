import { prisma } from "@/lib/prisma";
import { getUserFromJWT } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const authUser = await getUserFromJWT();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const name =
    typeof body.name === "string" && body.name.trim()
      ? body.name.trim()
      : undefined;

  const email =
    typeof body.email === "string" && body.email.trim()
      ? body.email.trim()
      : undefined;

  const avatarUrl =
    typeof body.avatarUrl === "string" && body.avatarUrl.trim()
      ? body.avatarUrl.trim()
      : undefined;

  await prisma.user.update({
    where: { id: authUser.id },
    data: {
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
      ...(avatarUrl !== undefined && { avatarUrl }),
    },
  });

  return NextResponse.json({ success: true });
}
