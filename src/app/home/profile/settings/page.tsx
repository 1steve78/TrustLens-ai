import { prisma } from "@/lib/prisma";
import SettingsClient from "@/components/settings-client";

export default async function SettingsPage() {
  // TODO: replace with real auth
  const userId = "CURRENT_USER_ID";

  const user = await prisma.user.findUnique({
    where: { id: userId },
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
