import Link from "next/link";
import Image from "next/image";
import GlobalSearch from "@/components/GlobalSearch";

type Props = {
  user: {
    id: string;
    name: string | null;
    avatarUrl: string | null;
  } | null;
};

export default function TopBar({ user }: Props) {
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="TrustLens logo"
            width={28}
            height={28}
            priority
          />
          <div>
            <span className="text-sm font-semibold text-blue-400">TrustLens</span>
            <p className="text-[11px] text-white/50">Security Command Center</p>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
          <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          Live monitoring
        </div>
      </div>

      <div className="hidden lg:flex flex-1 justify-center px-6">
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/home/scan"
          className="hidden sm:inline-flex items-center rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-200 hover:bg-blue-500/20 transition"
        >
          New scan
        </Link>
        <Link
          href="/home/profile"
          className="h-9 w-9 rounded-full border border-white/10 bg-black hover:border-blue-500/30 transition flex items-center justify-center overflow-hidden"
        >
          {user?.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.name || "User avatar"}
              width={36}
              height={36}
              className="object-cover"
            />
          ) : (
            <span className="text-xs font-medium text-blue-300">{initials}</span>
          )}
        </Link>
      </div>
    </header>
  );
}
