import { prisma } from "@/lib/prisma";
import SettingsClient from "@/components/settings-client";
import { getUserFromJWT } from "@/lib/auth";
export default async function SettingsPage() {
  const currentUser = await getUserFromJWT();
  if (!currentUser || !currentUser.id) {
    return <div className="p-8">Unauthorized</div>;
  }
  
  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: {
      id: true,
      name: true,
      avatarUrl: true,
    },
  });

  if (!user) {
    return <div className="p-8">User not found</div>;
  }

  return <SettingsClient user={user} />;
}