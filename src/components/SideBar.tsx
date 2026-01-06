"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
    <aside className="bg-white/5 rounded-xl p-4 flex flex-col h-full">
      {/* Top navigation */}
      <div className="space-y-4">
        <NavItem label="Home" href="/home" />
        <NavItem label="New Scan" href="/home/scan" />
        <NavItem label="Learning Hub" href="/home/learning" />
        <NavItem label="Simulate" href="/home/simulate" />
      </div>

      {/* Bottom actions */}
      <div className="mt-auto pt-4 border-t border-white/10 space-y-2">
        <NavItem label="Settings" href="/home/profile/settings" />

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition"
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
        className={`px-4 py-2 rounded-lg text-sm cursor-pointer transition
          ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-gray-300 hover:bg-white/10"
          }
        `}
      >
        {label}
      </div>
    </Link>
  );
}
