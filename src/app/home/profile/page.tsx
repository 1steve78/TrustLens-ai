import { prisma } from "@/lib/prisma";
import { getUserFromJWT } from "@/lib/auth";
import ProfileClient from "@/components/ProfileClient";

export default async function ProfilePage() {
  const currentUser = await getUserFromJWT();

  if (!currentUser?.id) {
    return <div className="p-8">Unauthorized</div>;
  }

  const learnings = await prisma.learningActivity.findMany({
    where: { userId: currentUser.id },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, avatarUrl: true } },
      _count: { select: { likes: true } },
    },
  });

  const scans = await prisma.scan.findMany({
    where: { userId: currentUser.id },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, avatarUrl: true } },
      _count: { select: { likes: true } },
    },
  });

  return (
    <ProfileClient
      learnings={learnings.map((l: (typeof learnings)[number]) => ({
        ...l,
        likesCount: l._count.likes,
      }))}
      scans={scans.map((s: (typeof scans)[number]) => ({
        ...s,
        likesCount: s._count.likes,
      }))}
    />
  );
}
