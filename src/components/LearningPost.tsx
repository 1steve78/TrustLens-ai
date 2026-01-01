/* ---------- LEARNING POST ---------- */

export type LearningUser = {
  id: string;
  name: string | null;
  avatarUrl: string | null;
};

export default function LearningPost({
  title,
  category,
  user,
}: {
  title: string;
  category: string;
  user: LearningUser | null;
}) {
  return (
    <div className="glass rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={user?.avatarUrl || "/avatar-placeholder.png"}
          className="w-8 h-8 rounded-full"
        />

        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-gray-400">
            {user?.name || "Anonymous"} · {category}
          </p>
        </div>
      </div>

      <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
        Learning
      </span>
    </div>
  );
}

