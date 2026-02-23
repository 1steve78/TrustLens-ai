"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const PRIMARY_NAV = [
  { label: "Home", href: "/home" },
  { label: "New Scan", href: "/home/scan" },
  { label: "Consent Vault", href: "/home/consent" },
  { label: "Learning Hub", href: "/home/learning" },
  { label: "Simulate", href: "/home/simulate" },
  { label: "Deepfake Detection", href: "/home/deepfake" },
];

const SECONDARY_NAV = [
  { label: "Settings", href: "/home/profile/settings" },
  { label: "Try Extension", href: "https://github.com/1steve78/TrustLens-extension" },
];

export default function Sidebar() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/auth");
    router.refresh();
  }

  return (
    <aside className="h-full rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">Workspace</p>
        <h2 className="text-sm font-semibold text-white mt-2">TrustLens Ops</h2>
        <p className="text-xs text-white/50 mt-1">Monitoring live risk signals</p>
      </div>

      <div className="mt-6 space-y-2">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Navigation</p>
        <div className="space-y-1">
          {PRIMARY_NAV.map((item) => (
            <NavItem key={item.href} label={item.label} href={item.href} />
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Account</p>
        <div className="space-y-1">
          {SECONDARY_NAV.map((item) => (
            <NavItem key={item.href} label={item.label} href={item.href} />
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">
        <button
          onClick={handleLogout}
          className="w-full rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-left text-sm text-red-200 transition hover:bg-red-500/20"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

function NavItem({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div
        className={`flex items-center justify-between rounded-xl px-4 py-2 text-sm transition ${
          isActive
            ? "bg-blue-500/20 text-white border border-blue-500/30"
            : "text-white/70 border border-transparent hover:bg-white/5 hover:text-white"
        }`}
      >
        <span>{label}</span>
        {isActive && <span className="text-[10px] uppercase text-blue-200">Active</span>}
      </div>
    </Link>
  );
}
