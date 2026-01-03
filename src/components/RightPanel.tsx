"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Tip = {
  title?: string;
  summary: string;
  link?: string;
};

const TRENDING_TAGS = [
  "phishing",
  "publicwifi",
  "fakelogin",
];

export default function RightPanel() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [index, setIndex] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();

  /* ---------- Learning tips fetch ---------- */
  useEffect(() => {
    fetch("/api/learning-tips")
      .then((res) => res.json())
      .then(setTips);
  }, []);

  /* ---------- Auto slide tips ---------- */
  useEffect(() => {
    if (tips.length === 0) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [tips]);

  const tip = tips[index];

  /* ---------- Trending tag click ---------- */
  function handleTagClick(tag: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tag", tag.toLowerCase());
    router.push(`/home?${params.toString()}`);
  }

  return (
    <aside className="space-y-4">

      {/* ================= Learning Tips ================= */}
      <div className="bg-white/5 rounded-xl p-4 min-h-[130px]">
        <h3 className="text-sm font-medium mb-2">
          Cybersecurity Tips
        </h3>

        {tip ? (
          <>
            <p className="text-xs font-medium text-gray-300">
              {tip.title || "Security Insight"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {tip.summary}
            </p>

            {tip.link && (
              <a
                href={tip.link}
                target="_blank"
                className="text-xs text-blue-400 mt-2 inline-block"
              >
                Read more →
              </a>
            )}
          </>
        ) : (
          <p className="text-xs text-gray-500">
            Loading fresh tips…
          </p>
        )}
      </div>

      {/* ================= Trending Tags ================= */}
      <div className="bg-white/5 rounded-xl p-4">
        <h3 className="text-sm font-medium mb-2">
          Trending Tags
        </h3>

        <div className="flex flex-wrap gap-2">
          {TRENDING_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="text-xs px-3 py-1 rounded-full
                         bg-white/5 text-blue-400
                         border border-white/10
                         hover:bg-white/10 transition"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
}
