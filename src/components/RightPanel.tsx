"use client";

import { useEffect, useState } from "react";

type Tip = {
  title?: string;
  summary: string;
  link?: string;
};

export default function RightPanel() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [index, setIndex] = useState(0);

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

  return (
    <aside className="space-y-4">
      {/* Learning Tips */}
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

      {/* Trending (unchanged) */}
      <div className="bg-white/5 rounded-xl p-4">
        <h3 className="text-sm font-medium mb-2">
          Trending Scans
        </h3>
        <ul className="text-xs text-gray-400 space-y-2">
          <li>#Phishing</li>
          <li>#PublicWiFi</li>
          <li>#FakeLogin</li>
        </ul>
      </div>
    </aside>
  );
}
