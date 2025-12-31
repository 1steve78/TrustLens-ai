import TopBar from "@/components/TopBar";
import { getUserFromJWT } from "@/lib/auth";
import Sidebar from "@/components/SideBar";
import RightPanel from "@/components/RightPanel";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromJWT();

  return (
    <section className="min-h-screen w-full bg-black">

      {/* 🔝 FIXED TOP BAR */}
      <div className="fixed top-0 left-0 right-0 h-16 z-50">
        <TopBar user={user} />
      </div>

      {/* ⬇️ CONTENT STARTS AFTER TOPBAR + GAP */}
      <div className="pt-[88px] px-4">
        {/* 64px topbar + 24px space */}

        <div className="grid grid-cols-[220px_1fr_260px] gap-4 min-h-[calc(100vh-88px)]">

          {/* Left sidebar */}
          <aside className="rounded-xl bg-white/5 backdrop-blur-xl">
            <Sidebar />
          </aside>

          {/* Main content (ONLY SCROLL HERE) */}
          <main className="rounded-xl bg-black overflow-y-auto p-8">
            {children}
          </main>

          {/* Right panel */}
          <aside className="rounded-xl bg-white/5 backdrop-blur-xl">
            <RightPanel />
          </aside>

        </div>
      </div>
    </section>
  );
}
