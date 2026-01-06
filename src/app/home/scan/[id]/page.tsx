import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReportsSection from "@/components/ReportsSection";

export default async function ScanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ unwrap params
  const { id } = await params;

  if (!id) return notFound();

  const scan = await prisma.scan.findUnique({
    where: { id },
    include: {
      user: {
        select: {
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
    },
  });

  if (!scan) return notFound();

  return (
    <section className="max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="text-xl font-semibold break-all">{scan.url}</h1>

      <span
        className={`inline-block text-xs px-3 py-1 rounded-full ${
          scan.riskLevel === "Safe"
            ? "bg-green-500/20 text-green-400"
            : scan.riskLevel === "Dangerous"
            ? "bg-red-500/20 text-red-400"
            : "bg-yellow-500/20 text-yellow-400"
        }`}
      >
        {scan.riskLevel}
      </span>

      <ReportsSection
        signalId={scan.id}
        reports={scan.reports.map(r => ({
          ...r,
          createdAt: r.createdAt.toISOString(),
        }))}
      />
    </section>
  );
}
