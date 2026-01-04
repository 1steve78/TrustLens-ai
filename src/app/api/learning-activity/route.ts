import { prisma } from "@/lib/prisma";
import { getUserFromJWT } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await getUserFromJWT();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, category, content } = await req.json();

  if (!title || !category || !content) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  const activity = await prisma.learningActivity.create({
    data: {
      title,
      category,
      // Replace 'content' with the correct field name from your LearningActivity model
      userId: user.id,
    },
  });

  return NextResponse.json(activity);
}
