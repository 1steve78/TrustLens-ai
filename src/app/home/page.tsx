import TopBar from "@/components/TopBar";
import Sidebar from "@/components/SideBar";
import RightPanel from "@/components/RightPanel";
import ScanCard from "@/components/ScanCard";

export default function HomePage() {
  return (
    <section className="min-h-screen w-full">

      {/* Top navigation */}
      <TopBar />

      {/* Main layout */}
      <div className="flex min-h-[calc(100vh-64px)]">

        {/* Left sidebar */}
        <aside className="w-[220px] shrink-0 bg-white/5 backdrop-blur-xl">
          <Sidebar />
        </aside>

        {/* Center content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-6">
            Global Community Scans
          </h2>

          <ScanCard />
        </main>

        {/* Right panel */}
        <aside className="w-[260px] shrink-0 bg-white/5 backdrop-blur-xl">
          <RightPanel />
        </aside>

      </div>
    </section>
  );
}
