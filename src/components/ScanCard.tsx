import { generateHashtags } from "@/lib/hashtag";
import Link from "next/link";
import Like from "./Like";

type ScanUser = {
  id: string;
  name: string | null;
  avatarUrl: string | null;
};

type ScanForCard = {
  id: string;
  url: string;
  riskLevel: string;
  summary: string;
  details: string[];
  likesCount: number;
};

type ScanCardProps = {
  scan: ScanForCard;
  user?: ScanUser | null;
};

export default function ScanCard({ scan, user }: ScanCardProps) {
  const hashtags = generateHashtags({
    url: scan.url,
    summary: scan.summary,
    riskLevel: scan.riskLevel,
  });

  const riskStyles =
    scan.riskLevel === "Safe"
      ? "bg-green-500/15 text-green-400 border-green-500/20"
      : scan.riskLevel === "Dangerous"
      ? "bg-red-500/15 text-red-400 border-red-500/20"
      : "bg-yellow-500/15 text-yellow-400 border-yellow-500/20";

  return (
    <Link href={`/home/scan/${scan.id}`} className="group">
      <div className="rounded-2xl p-6 space-y-5
        border border-white/10 hover:border-white/25
        backdrop-blur-md bg-transparent
        transition-all duration-300
        hover:scale-[1.01]">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-gray-400 truncate max-w-[70%]">
            {scan.url}
          </p>

          <span
            className={`shrink-0 text-xs px-3 py-1 rounded-full border ${riskStyles}`}
          >
            {scan.riskLevel}
          </span>
        </div>

        {/* Summary */}
        <p className="text-sm text-gray-200 leading-relaxed">
          {scan.summary}
        </p>

        {/* Hashtags */}
        {hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-blue-400 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Details (subtle) */}
        {scan.details.length > 0 && (
          <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
            {scan.details.slice(0, 3).map((d, i) => (
              <li key={i}>{d}</li>
            ))}
            {scan.details.length > 3 && (
              <li className="list-none text-blue-400">
                + {scan.details.length - 3} more details
              </li>
            )}
          </ul>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <img
              src={user?.avatarUrl || "/avatar-placeholder.png"}
              className="w-7 h-7 rounded-full"
              alt="avatar"
            />
            <span className="text-xs text-gray-400">
              {user?.name || "Anonymous"}
            </span>
          </div>

          {/* Like button (prevent link navigation inside component) */}
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Like
              targetType="scan"
              targetId={scan.id}
              initialCount={scan.likesCount}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
