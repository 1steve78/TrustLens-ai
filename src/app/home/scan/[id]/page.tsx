import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getUserFromJWT } from "@/lib/auth";
import ReportsSection from "@/components/ReportsSection";
import DeleteScanButton from "@/components/DeleteButton";

export default async function ScanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) return notFound();

  const currentUser = await getUserFromJWT();

  const scan = await prisma.scan.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, name: true, avatarUrl: true },
      },
      reports: {
        include: {
          user: { select: { name: true, avatarUrl: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!scan || !scan.user) return notFound();

  const isOwner = currentUser?.id === scan.user?.id;

  const riskStyles =
    scan.riskLevel === "Safe"
      ? "bg-green-500/20 text-green-400 border-green-500/20"
      : scan.riskLevel === "Dangerous"
      ? "bg-red-500/20 text-red-400 border-red-500/20"
      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/20";

  return (
    <section className="max-w-4xl mx-auto p-8 space-y-10">
      {/* ================= Header Card ================= */}
      <div className="glass border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-lg font-semibold break-all text-white">
            {scan.url}
          </h1>

          <div className="flex items-center gap-3">
            <span
              className={`text-xs px-3 py-1 rounded-full border ${riskStyles}`}
            >
              {scan.riskLevel}
            </span>

            {isOwner && (
              <DeleteScanButton scanId={scan.id} />
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          <img
            src={scan.user.avatarUrl || "/avatar-placeholder.png"}
            className="w-6 h-6 rounded-full"
            alt="avatar"
          />
          <span>Scanned by {scan.user.name}</span>
        </div>
      </div>

      {/* ================= Context ================= */}
      <div className="glass border border-white/10 rounded-2xl p-6">
        <h3 className="text-sm font-medium mb-2 text-white">
          Why this scan matters
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          {scan.details || "No additional context provided."}
        </p>
      </div>

      {/* ================= Reports ================= */}
      <ReportsSection
        targetType="scan"
        targetId={scan.id}
        reports={scan.reports.map((r: (typeof scan.reports)[number]) => ({
          ...r,
          createdAt: r.createdAt.toISOString(),
        }))}
      />
    </section>
  );
}
