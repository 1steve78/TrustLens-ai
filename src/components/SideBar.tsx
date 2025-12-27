import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="bg-white/5 rounded-xl p-4 space-y-4">
      <NavItem label="Home" href="/home" />
      <NavItem label="New Scan" href="/home/scan" active />
      <NavItem label="Learning Hub" href="/home/learn" />
      <NavItem label="Profile" href="/home/profile" />
    </aside>
  );
}

function NavItem({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link href={href}>
      <div
        className={`px-4 py-2 rounded-lg text-sm cursor-pointer transition ${
          active
            ? "bg-blue-500 text-white"
            : "text-gray-300 hover:bg-white/10"
        }`}
      >
        {label}
      </div>
    </Link>
  );
}
