import Link from "next/link";
import Like from "./Like";

type Learning = {
  id: string;
  title: string;
  category: string;
  likesCount: number;
  createdAt: Date;
  userId: string;
};

export type LearningUser = {
  id: string;
  name: string | null;
  avatarUrl: string | null;
};

export default function LearningPost({
  learning,
  user,
}: {
  learning: Learning;
  user?: LearningUser | null;
}) {
  return (
    <Link href={`/home/learning/${learning.id}`} className="group">
      <div className="rounded-2xl p-6 space-y-5
        border border-white/10 hover:border-white/25
        backdrop-blur-md bg-transparent
        transition-all duration-300
        hover:scale-[1.01]">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-gray-400 truncate max-w-[70%]">
            {learning.category}
          </p>

          <span className="shrink-0 text-xs px-3 py-1 rounded-full border bg-blue-500/15 text-blue-400 border-blue-500/20">
            Learning
          </span>
        </div>

        {/* Title */}
        <p className="text-sm text-gray-200 leading-relaxed">
          {learning.title}
        </p>

        {/* Footer (IDENTICAL to ScanCard) */}
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

          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Like
              targetType="learning"
              targetId={learning.id}
              initialCount={learning.likesCount}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
