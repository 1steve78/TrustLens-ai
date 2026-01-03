import { prisma } from "@/lib/prisma";
import SignalsFeed from "@/components/SignalsFeed";
import type { LearningUser } from "@/components/LearningPost";
import { headers } from "next/headers";

/* ---------- SIGNAL TYPE ---------- */
export type Signal =
  | {
      type: "SCAN";
      id: string;
      createdAt: Date;
      scan: any;
      user: {
        id: string;
        name: string | null;
        avatarUrl: string | null;
      } | null;
    }
  | {
      type: "LEARNING";
      id: string;
      createdAt: Date;
      learning: {
        title: string;
        category: string;
      };
      user: LearningUser | null;
    };

export default async function HomePage() {
  const scans = await prisma.scan.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      user: { select: { id: true, name: true, avatarUrl: true } },
    },
  });

  const learning = await prisma.learningActivity.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        user: { select: { id: true, name: true, avatarUrl: true } },
      },
    });
    const searchParams = new URL(
    (await headers()).get("x-url") || "http://localhost"
  ).searchParams;

  const activeTag = searchParams.get("tag");


  const signals: Signal[] = [
    ...scans.map((scan) => ({
      type: "SCAN" as const,
      id: scan.id,
      createdAt: scan.createdAt,
      scan,
      user: scan.user,
    })),
    ...learning.map((item) => ({
      type: "LEARNING" as const,
      id: item.id,
      createdAt: item.createdAt,
      learning: { title: item.title, category: item.category },
      user: item.user,
    })),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10); // ✅ HARD LIMIT

  return <SignalsFeed initialSignals={signals} />;
}
