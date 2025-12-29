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
    <section className="min-h-screen w-full">
      {/* Top navigation */}
      <TopBar user={user} />

      {/* App shell */}
      <div className="flex min-h-[calc(100vh-64px)]">

        {/* Left sidebar */}
        <aside className="w-[220px] shrink-0 bg-white/5 backdrop-blur-xl">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>

        {/* Right panel */}
        <aside className="w-[260px] shrink-0 bg-white/5 backdrop-blur-xl">
          <RightPanel />
        </aside>

      </div>
    </section>
  );
}
