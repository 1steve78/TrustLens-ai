"use client";

import { useState } from "react";

export default function Like({
  targetType,
  targetId,
  initialCount = 0,
  size = 18,
}: {
  targetType: "scan" | "report" | "learning" | "media";
  targetId: string;
  initialCount?: number;
  size?: number;
}) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  async function handleLike(e: React.MouseEvent) {
    e.preventDefault(); // IMPORTANT (prevents Link navigation)
    e.stopPropagation();

    if (liked || loading) return;

    setLiked(true);
    setCount((c) => c + 1);
    setLoading(true);

    await fetch("/api/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetType,
        targetId,
      }),
    });

    setLoading(false);
  }

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-1 text-xs"
      title="Like"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={liked ? "#3b82f6" : "none"}
        stroke={liked ? "#3b82f6" : "currentColor"}
        strokeWidth="2"
        className={`transition ${
          liked ? "text-blue-500" : "text-gray-400 hover:text-blue-400"
        }`}
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>

      {count > 0 && <span>{count}</span>}
    </button>
  );
}
