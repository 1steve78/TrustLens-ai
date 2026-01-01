import { Scan } from "@prisma/client";

type ScanUser = {
  name: string | null;
  avatarUrl: string | null;
};

type ScanCardProps = {
  scan: Scan;
  user?: ScanUser | null;
};

export default function ScanCard({ scan, user }: ScanCardProps) {
  return (
    <div className="glass rounded-xl p-4 border border-white/10 space-y-3">
      {/* URL + Risk */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium truncate">{scan.url}</p>

        <span
          className={`text-xs px-3 py-1 rounded-full ${
            scan.riskLevel === "Safe"
              ? "bg-green-500/20 text-green-400"
              : scan.riskLevel === "Dangerous"
              ? "bg-red-500/20 text-red-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {scan.riskLevel}
        </span>
      </div>

      {/* Summary */}
      <p className="text-sm text-gray-400">{scan.summary}</p>

      {/* Details */}
      <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
        {scan.details.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>

      {/* User */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/10">
        <img
          src={user?.avatarUrl || "/avatar-placeholder.png"}
          className="w-6 h-6 rounded-full"
          alt="avatar"
        />
        <span className="text-xs text-gray-400">
          {user?.name || "Anonymous"}
        </span>
      </div>
    </div>
  );
}
