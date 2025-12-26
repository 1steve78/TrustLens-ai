import { prisma } from "@/lib/prisma";
import { ShieldAlert, ShieldCheck, Info } from "lucide-react";
import Link from "next/link";

export default async function HistoryPage() {
  const scans = await prisma.scan.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-1 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">
          Scan History
        </h2>
        <p className="text-sm text-muted-foreground">
          Recently analyzed websites and their risk levels
        </p>
      </div>

      {/* Empty State */}
      {scans.length === 0 && (
        <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
          No scans yet. Start by scanning a website.
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {scans.map((scan) => {
          const isHighRisk = scan.riskScore > 60;

          return (
            <div
              key={scan.id}
              className="
                rounded-2xl
                border border-white/30 dark:border-white/10
                bg-white/70 dark:bg-black/60
                backdrop-blur-xl
                p-6
                shadow-sm
                transition-all
                hover:shadow-md
              "
            >
              <div className="flex items-start justify-between gap-6">
                {/* URL + Score */}
                <div className="space-y-1">
                  <p className="font-medium break-all">
                    {scan.url}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Risk score: {scan.riskScore}/100
                  </p>
                </div>

                {/* Risk Badge */}
                <div
                  className={`
                    flex items-center gap-2
                    rounded-full px-4 py-1.5
                    text-sm font-medium
                    ${
                      isHighRisk
                        ? "bg-red-500/10 text-red-600"
                        : "bg-green-500/10 text-green-600"
                    }
                  `}
                >
                  {isHighRisk ? (
                    <ShieldAlert className="h-4 w-4" />
                  ) : (
                    <ShieldCheck className="h-4 w-4" />
                  )}
                  {scan.riskLevel}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-4 text-sm">
                <Link
                  href={`/learn?scanId=${scan.id}`}
                  className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <Info className="h-4 w-4" />
                  Learn why this is risky
                </Link>

                <span className="text-muted-foreground">
                  Help improve detection by reporting suspicious sites
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
