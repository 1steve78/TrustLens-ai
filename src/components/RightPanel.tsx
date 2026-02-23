"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Tip = {
  title?: string;
  summary: string;
  link?: string;
};

const TRENDING_TAGS = ["phishing", "publicwifi", "fakelogin", "brandspoof"];

const QUICK_ACTIONS = [
  { label: "Run a scan", href: "/home/scan" },
  { label: "Start simulation", href: "/home/simulate" },
  { label: "Open learning", href: "/home/learning" },
];

export default function RightPanel() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [index, setIndex] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetch("/api/learning-tips")
      .then((res) => res.json())
      .then(setTips);
  }, []);

  useEffect(() => {
    if (tips.length === 0) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [tips]);

  const tip = tips[index];

  function handleTagClick(tag: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tag", tag.toLowerCase());
    router.push(`/home?${params.toString()}`);
  }

  return (
    <aside className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">Insight feed</p>
        <h3 className="text-sm font-semibold text-white">Cybersecurity tips</h3>

        {tip ? (
          <>
            <p className="text-xs font-medium text-white/80">{tip.title || "Security insight"}</p>
            <p className="text-xs text-white/60 mt-1">{tip.summary}</p>

            {tip.link && (
              <a
                href={tip.link}
                target="_blank"
                className="text-xs text-blue-300 mt-2 inline-block hover:text-blue-200 transition"
              >
                Read more
              </a>
            )}
          </>
        ) : (
          <p className="text-xs text-white/50">Loading fresh tips...</p>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">Quick actions</p>
        <div className="space-y-2">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.href}
              onClick={() => router.push(action.href)}
              className="w-full rounded-xl border border-blue-500/20 bg-black/40 px-3 py-2 text-left text-xs text-blue-200 hover:bg-blue-500/10 transition"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">Trending tags</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {TRENDING_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="text-xs px-3 py-1 rounded-full bg-black text-blue-300 border border-blue-500/20 hover:bg-blue-500/10 transition"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
