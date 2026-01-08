import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getUserFromJWT } from "@/lib/auth";
import Like from "@/components/Like";
import ReportsSection from "@/components/ReportsSection";
import DeleteLearningButton from "@/components/DeleteLearningButton";

export default async function LearningDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) return notFound();

  const currentUser = await getUserFromJWT();

  const learning = await prisma.learningActivity.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
      reports: {
        include: {
          user: {
            select: {
              name: true,
              avatarUrl: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: { likes: true },
      },
    },
  });

  if (!learning) return notFound();

  const isOwner = currentUser?.id === learning.user.id;

  return (
    <section className="max-w-4xl mx-auto p-8 space-y-8">
      {/* ================= Header ================= */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold text-white">
            {learning.title}
          </h1>

          {isOwner && (
            <DeleteLearningButton learningId={learning.id} />
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
            {learning.category}
          </span>

          <span>•</span>

          <div className="flex items-center gap-2">
            <img
              src={learning.user.avatarUrl || "/avatar-placeholder.png"}
              className="w-5 h-5 rounded-full"
              alt="avatar"
            />
            <span>{learning.user.name}</span>
          </div>
        </div>
      </div>

      {/* ================= Meta Card ================= */}
      <div className="glass border border-white/10 rounded-2xl p-6 text-sm text-gray-300">
        <p>
          Community learning resource shared to help users understand scams,
          risks, and digital safety better.
        </p>
      </div>

      {/* ================= Actions ================= */}
      <div className="flex items-center gap-6">
        <Like
          targetType="learning"
          targetId={learning.id}
          initialCount={learning._count.likes}
        />
      </div>

      {/* ================= Reports ================= */}
      <ReportsSection
        targetType="learning"
        targetId={learning.id}
        reports={learning.reports.map((r: (typeof learning.reports)[number]) => ({
          ...r,
          createdAt: r.createdAt.toISOString(),
        }))}
      />
    </section>
  );
}
