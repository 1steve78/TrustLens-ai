"use client";

import { useState } from "react";
import ScanCard from "@/components/ScanCard";
import LearningPost from "@/components/LearningPost";
import type { Signal } from "@/app/home/page";

export default function SignalsFeed({
  initialSignals,
}: {
  initialSignals: Signal[];
}) {
  const [signals, setSignals] = useState(initialSignals);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    setLoading(true);

    const res = await fetch(`/api/signals?page=${page + 1}`);
    const more = await res.json();

    setSignals((prev) => [...prev, ...more]);
    setPage((p) => p + 1);
    setLoading(false);
  }

  return (
    <div className="p-8">
      <h2 className="text-lg font-semibold mb-6">
        Community Signals
      </h2>

      <div className="space-y-4">
        {signals.map((signal) =>
          signal.type === "SCAN" ? (
            <ScanCard
              key={`scan-${signal.id}`}
              scan={signal.scan}
              user={signal.user}
            />
          ) : (
            <LearningPost
              key={`learning-${signal.id}`}
              title={signal.learning.title}
              category={signal.learning.category}
              user={signal.user}
            />
          )
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={loadMore}
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-white/10 text-sm hover:bg-white/20 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
