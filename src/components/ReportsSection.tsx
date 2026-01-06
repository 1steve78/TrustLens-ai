"use client";

import { useState } from "react";

type Report = {
  id: string;
  message: string | null;
  createdAt: string;
  user?: {
    name: string | null;
    avatarUrl: string | null;
  } | null;
};

export default function ReportsSection({
  targetType,
  targetId,
  reports = [],
}: {
  targetType: "scan" | "learning";
  targetId: string;
  reports?: Report[];
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitReport() {
    if (!text.trim()) return;

    setLoading(true);
    await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetType, targetId, message: text }),
    });

    setText("");
    setLoading(false);
    location.reload();
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Reports</h3>

      {/* Input */}
      <div className="glass border border-white/10 rounded-xl p-4 space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Report an issue, add context, or warn others..."
          className="w-full bg-transparent text-sm text-gray-300 outline-none resize-none"
          rows={3}
        />

        <button
          onClick={submitReport}
          disabled={loading}
          className="text-xs px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          {loading ? "Submitting…" : "Submit Report"}
        </button>
      </div>

      {/* List */}
      {reports.length === 0 ? (
        <p className="text-xs text-gray-500">
          No reports yet. Be the first to flag something.
        </p>
      ) : (
        <div className="space-y-3">
          {reports.map((r) => (
            <div
              key={r.id}
              className="glass border border-white/10 rounded-xl p-4 text-sm text-gray-300"
            >
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={r.user?.avatarUrl || "/avatar-placeholder.png"}
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-xs text-gray-400">
                  {r.user?.name || "Anonymous"}
                </span>
              </div>

              <p>{r.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
