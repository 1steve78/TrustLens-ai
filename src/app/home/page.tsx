import ScanCard from "@/components/ScanCard";
import { prisma } from "@/lib/prisma";
import LearningPost from "@/components/LearningPost";
import type { LearningUser } from "@/components/LearningPost";



export default async function HomePage() {
  const scans = await prisma.scan.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
    },
  });

 const learning: {
    id: string;
    title: string;
    category: string;
    user: LearningUser | null;
  }[] = await prisma.learningActivity.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
    },
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
            <ScanCard key={scan.id} scan={scan} user={scan.user} />
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
              user={item.user}
            />
          ))}

        </div>
      </section>

    </div>
  );
}

