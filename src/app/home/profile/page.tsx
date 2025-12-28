import TopBar from "@/components/TopBar";
import Sidebar from "@/components/SideBar";
import RightPanel from "@/components/RightPanel";

export default function ProfilePage() {
  return (
    <section className="min-h-screen w-full">

      

      {/* Main dashboard shell */}
      <div className="flex min-h-[calc(100vh-64px)]">


        {/* Center content */}
        <main className="flex-1 p-8 space-y-8 overflow-y-auto">

          {/* Your Activity */}
          <section>
            <h2 className="text-lg font-semibold mb-4">
              Your Activity
            </h2>

            <div className="space-y-4">
              <ActivityItem
                title="Phishing Email Red Flags"
                subtitle="2024.02.27"
                status="Safe"
              />
              <ActivityItem
                title="Secure QR Practices"
                subtitle="Phishing Email Red Flags"
                status="Safe"
              />
            </div>
          </section>

          {/* URL Scans */}
          <section>
            <h2 className="text-lg font-semibold mb-4">
              Your URL Scans
            </h2>

            <div className="space-y-4">
              <UrlItem url="short.url/promo" status="Warning" />
              <UrlItem url="example-login.com" status="Safe" />
            </div>
          </section>

        </main>


      </div>
    </section>
  );
}

/* ================= Page-only components ================= */

function ActivityItem({
  title,
  subtitle,
  status,
}: {
  title: string;
  subtitle: string;
  status: "Safe" | "Warning";
}) {
  return (
    <div className="glass rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>

      <span
        className={`text-xs px-3 py-1 rounded-full ${
          status === "Safe"
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

function UrlItem({
  url,
  status,
}: {
  url: string;
  status: "Safe" | "Warning";
}) {
  return (
    <div className="glass rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="font-medium">{url}</p>
        <p className="text-xs text-gray-400">URL Scan</p>
      </div>

      <span
        className={`text-xs px-3 py-1 rounded-full ${
          status === "Safe"
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        {status}
      </span>
    </div>
  );
}
