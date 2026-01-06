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
      <h2 className="text-lg font-semibold mb-6">
        Community Signals
      </h2>

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

      <div className="space-y-4 mt-6">
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
              learning={signal.learning}   // ✅ FIX
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
