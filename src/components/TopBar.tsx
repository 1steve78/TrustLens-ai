import Link from "next/link";
import Image from "next/image";
import UserAvatar from "./UserAvatar";

type Props = {
  user: {
    id: string;
    name: string | null;
    avatarUrl: string | null;
  } | null;
};

export default function TopBar({ user }: Props) {
  return (
    <header className="
      h-16
      flex items-center justify-between
      px-6
      bg-black/80 backdrop-blur-xl
      border-b border-white/10
    ">
      {/* 🔷 Logo + Brand */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-3 cursor-pointer"
        >
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

        <div>
          
          <p className="text-xs text-gray-400">
            Your gateway for safer digital interaction
          </p>
        </div>
      </div>

      {/* 👤 Profile */}
      <Link
        href="/home/profile"
        className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center"
      >
        <UserAvatar
          name={user?.name}
          avatarUrl={user?.avatarUrl}
        />
      </Link>
    </header>
  );
}
