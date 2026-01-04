import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReportsSection from "@/components/ReportsSection";

export default async function SignalDetailPage({
  params,
}: {
  params: Promise<{ signalId: string }>;
}) {
  const { signalId } = await params; // 🔑 THIS IS THE FIX

  if (!signalId) return notFound();

  const scan = await prisma.scan.findUnique({
      where: { id: signalId },
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
      {/* Header */}
      <div className="space-y-2">
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
      </div>

      {/* Summary */}
      <div className="glass rounded-xl p-5 border border-white/10">
        <h3 className="text-sm font-medium mb-2">Summary</h3>
        <p className="text-sm text-gray-400">{scan.summary}</p>
      </div>

      {/* Details */}
      <div className="glass rounded-xl p-5 border border-white/10">
        <h3 className="text-sm font-medium mb-3">Why this matters</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-400">
          {scan.details.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>

      {/* User */}
      <div className="flex items-center gap-3 text-sm text-gray-400">
        <img
          src={scan.user?.avatarUrl || "/avatar-placeholder.png"}
          className="w-8 h-8 rounded-full"
          alt="avatar"
        />
        <span>{scan.user?.name || "Anonymous"}</span>
      </div>
      <ReportsSection
        scanId={scan.id}
        reports={scan.reports.map(report => ({
          ...report,
          createdAt: report.createdAt.toISOString(),
        }))}
      />

    </section>
  );
}
