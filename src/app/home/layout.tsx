import TopBar from "@/components/TopBar";
import { getUserFromJWT } from "@/lib/auth";
import Sidebar from "@/components/SideBar";
import RightPanel from "@/components/RightPanel";
import { prisma } from "@/lib/prisma";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserFromJWT();
  const user = userData?.id
  ? await prisma.user.findUnique({
      where: { id: userData.id },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
      },
    })
  : null;

  return (
    <section className="h-screen w-full bg-black overflow-hidden">
      {/* 🔝 FIXED TOP BAR */}
      <div className="fixed top-0 left-0 right-0 h-16 z-50">
        <TopBar user={user} />
      </div>

      {/* ⬇️ EVERYTHING BELOW TOPBAR */}
      <div className="pt-16 h-full">
        <div className="grid grid-cols-[220px_1fr_260px] h-[calc(100vh-64px)] gap-4 px-4">

          {/* ⬅️ LEFT SIDEBAR (FIXED HEIGHT, NO SCROLL) */}
          <aside className="h-full bg-white/5 backdrop-blur-xl border border-white/10">
            <Sidebar />
          </aside>


          {/* 🧠 MAIN CONTENT (ONLY SCROLLS HERE) */}
          <main className="h-full overflow-y-auto dark-scrollbar rounded-xl bg-black p-8">
            {children}
          </main>

          {/* ➡️ RIGHT PANEL (FIXED HEIGHT, NO SCROLL) */}
          <aside className="h-full bg-white/5 backdrop-blur-xl border border-white/10">
            <RightPanel />
          </aside>

        </div>
      </div>
    </section>
  );
}
