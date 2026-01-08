import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const take = 10;
  const skip = page * take;
  
  const scans = await prisma.scan.findMany({
    orderBy: { createdAt: "desc" },
    skip,
    take,
    include: {
      user: { select: { id: true, name: true, avatarUrl: true } },
    },
  });

  const learning = await prisma.learningActivity.findMany({
    orderBy: { createdAt: "desc" },
    skip,
    take,
    include: {
      user: { select: { id: true, name: true, avatarUrl: true } },
    },
  });

  const signals = [
    ...scans.map((scan: (typeof scans)[number]) => ({
      type: "SCAN",
      id: scan.id,
      createdAt: scan.createdAt,
      scan,
      user: scan.user,
    })),
    ...learning.map((item: (typeof learning)[number]) => ({
      type: "LEARNING",
      id: item.id,
      createdAt: item.createdAt,
      learning: { title: item.title, category: item.category },
      user: item.user,
    })),
  ].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  return NextResponse.json(signals);
}
