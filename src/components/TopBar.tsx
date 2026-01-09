import Link from "next/link";
import Image from "next/image";

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
    <header
      className="
        h-16
        flex items-center justify-between
        px-6
        bg-black/80 backdrop-blur-xl
        border-b border-white/10
      "
    >
      {/* 🔷 Logo + Brand */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="TrustLens logo"
            width={28}
            height={28}
            priority
          />

          <span className="font-semibold text-blue-400">
            TrustLens
          </span>
        </Link>

        <p className="text-xs text-gray-400 hidden sm:block">
          Your gateway for safer digital interaction
        </p>
      </div>

      {/* 👤 Logged-in User Avatar */}
      <Link
        href="/home/profile"
        className="
          h-9 w-9 rounded-full
          border border-white/10
          bg-black
          hover:border-blue-500/30
          transition
          flex items-center justify-center
          overflow-hidden
        "
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
          <span className="text-xs font-medium text-blue-400">
            {initials}
          </span>
        )}
      </Link>
    </header>
  );
}
