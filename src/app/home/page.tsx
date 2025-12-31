import ScanCard from "@/components/ScanCard";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const scans = await prisma.scan.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const learning = await prisma.learningActivity.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <div className="p-8 space-y-12">

      {/* SCANS */}
      <section>
        <h2 className="text-lg font-semibold mb-6">
          Global Community Scans
        </h2>

        <div className="space-y-4">
          {scans.map((scan) => (
            <ScanCard key={scan.id} scan={scan} />
          ))}
        </div>
      </section>

      {/* LEARNING */}
      <section>
        <h2 className="text-lg font-semibold mb-6">
          What People Are Learning
        </h2>

        <div className="space-y-4">
          {learning.map((item) => (
            <LearningPost
              key={item.id}
              title={item.title}
              category={item.category}
            />
          ))}
        </div>
      </section>

    </div>
  );
}

/* ---------- LEARNING POST ---------- */

function LearningPost({
  title,
  category,
}: {
  title: string;
  category: string;
}) {
  return (
    <div className="glass rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-xs text-gray-400">{category}</p>
      </div>

      <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
        Learning
      </span>
    </div>
  );
}
