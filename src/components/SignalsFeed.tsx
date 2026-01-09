"use client";

import { useState } from "react";
import ScanCard from "@/components/ScanCard";
import LearningPost from "@/components/LearningPost";
import type { Signal } from "@/app/home/page";
import AddSignalModal from "@/components/AddSignalModal";

export default function SignalsFeed({
  initialSignals,
}: {
  initialSignals: Signal[];
}) {
  const [signals, setSignals] = useState(initialSignals);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
      {/* Header */}
      <h2 className="text-lg font-semibold mb-6">
        Community Signals
      </h2>

      {/* Add Signal Button */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-full text-sm
                   bg-blue-500/10 text-blue-400
                   border border-blue-500/20
                   hover:bg-blue-500/20 transition"
      >
        + Add Signal
      </button>

      {open && <AddSignalModal onClose={() => setOpen(false)} />}

      {/* Feed */}
      <div className="mt-8">
        {signals.map((signal, index) => {
          const prev = signals[index - 1];
          const isTypeChange = prev && prev.type !== signal.type;

          return (
            <div
              key={`${signal.type}-${signal.id}`}
              className={isTypeChange ? "mt-10" : "mt-6"}
            >
              {signal.type === "SCAN" ? (
                <ScanCard
                  scan={signal.scan}
                  user={signal.user}
                />
              ) : (
                <LearningPost
                  learning={signal.learning}
                  user={signal.user}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-10">
        <button
          onClick={loadMore}
          disabled={loading}
          className="px-6 py-2 rounded-lg
                     bg-white/10 text-sm
                     hover:bg-white/20 transition
                     disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
