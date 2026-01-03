import { prisma } from "@/lib/prisma";
import { getUserFromJWT } from "@/lib/auth";
import ScanCard from "@/components/ScanCard";
import LearningPost from "@/components/LearningPost";

export default async function ProfilePage() {
  const currentUser = await getUserFromJWT();

  if (!currentUser || !currentUser.id) {
    return <div className="p-8">Unauthorized</div>;
  }

  /* ---------- FETCH USER LEARNINGS ---------- */
  const learnings = await prisma.learningActivity.findMany({
    where: { userId: currentUser.id },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { id: true, name: true, avatarUrl: true },
      },
    },
  });

  /* ---------- FETCH USER SCANS ---------- */
  const scans = await prisma.scan.findMany({
    where: { userId: currentUser.id },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { id: true, name: true, avatarUrl: true },
      },
    },
  });

  return (
    <section className="min-h-screen w-full">
      <div className="flex min-h-[calc(100vh-64px)]">
        <main className="flex-1 p-8 space-y-10 overflow-y-auto">

          {/* LEARNINGS */}
          <section>
            <h2 className="text-lg font-semibold mb-4">
              Your Learnings
            </h2>

            {learnings.length === 0 ? (
              <p className="text-sm text-gray-400">
                You haven’t posted any learning yet.
              </p>
            ) : (
              <div className="space-y-4">
                {learnings.map((item) => (
                  <LearningPost
                    key={item.id}
                    title={item.title}
                    category={item.category}
                    user={item.user}
                  />
                ))}
              </div>
            )}
          </section>

          {/* SCANS */}
          <section>
            <h2 className="text-lg font-semibold mb-4">
              Your URL Scans
            </h2>

            {scans.length === 0 ? (
              <p className="text-sm text-gray-400">
                You haven’t scanned any URLs yet.
              </p>
            ) : (
              <div className="space-y-4">
                {scans.map((scan) => (
                  <ScanCard
                    key={scan.id}
                    scan={scan}
                    user={scan.user}
                  />
                ))}
              </div>
            )}
          </section>

        </main>
      </div>
    </section>
  );
}
