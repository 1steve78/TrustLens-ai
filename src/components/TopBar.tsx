import Link from "next/link";
import UserAvatar from "./UserAvatar";

type Props = {
  user: {
    name?: string;
    avatarUrl?: string;
  } | null;
};

export default function TopBar({ user }: Props) {
  return (
    <header className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5">
      <div>
        <p className="font-semibold text-blue-400">SecureScan</p>
        <p className="text-xs text-gray-400">
          Your gateway for safer digital interaction
        </p>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-300">
        <span>Profile</span>

        <Link href="/home/profile">
          <div className="h-8 w-8 rounded-full bg-white/20 cursor-pointer hover:bg-white/30 transition" >
            <UserAvatar
              name={user?.name}
              avatarUrl={user?.avatarUrl}
            />

          </div>
        </Link>
      </div>
    </header>
  );
}
