import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function LearningDetailPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  // ✅ unwrap params FIRST
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const learning = await prisma.learningActivity.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, avatarUrl: true } },
      reports: {
        include: {
          user: { select: { name: true, avatarUrl: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!learning) return notFound();

  return (
    <section className="max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="text-xl font-semibold">{learning.title}</h1>

      <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
        {learning.category}
      </span>
    </section>
  );
}
