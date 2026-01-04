"use client";

import { useState } from "react";

export default function AddSignalModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    await fetch("/api/learning-activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, content }),
    });

    setLoading(false);
    onClose();
    location.reload(); // simple + safe
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md
                      rounded-2xl bg-[#0b0f14]
                      border border-white/10 p-6 space-y-4">

        <h3 className="text-sm font-medium text-white">
          Add Learning Signal
        </h3>

        <input
          placeholder="Title"
          className="w-full bg-white/5 rounded-lg px-3 py-2 text-sm"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Category (phishing, malware...)"
          className="w-full bg-white/5 rounded-lg px-3 py-2 text-sm"
          onChange={(e) => setCategory(e.target.value)}
        />

        <textarea
          placeholder="What should others learn from this?"
          className="w-full bg-white/5 rounded-lg px-3 py-2 text-sm h-24"
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="w-full rounded-lg py-2 text-sm
                     bg-blue-500 text-black
                     hover:bg-blue-400 transition"
        >
          {loading ? "Posting…" : "Publish Signal"}
        </button>
      </div>
    </div>
  );
}
