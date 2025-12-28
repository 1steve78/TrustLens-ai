import TopBar from "@/components/TopBar";
import Sidebar from "@/components/SideBar";
import RightPanel from "@/components/RightPanel";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen w-full">
      {/* Top navigation */}
      <TopBar />

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
