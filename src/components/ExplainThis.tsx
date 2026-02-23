"use client";

import { useState } from "react";

type ExplainResponse = {
  summary?: string;
  actions: string[];
};

type Props = {
  contextType: "scan" | "deepfake" | "simulation";
  contextData: Record<string, any>;
  title: string;
};

export default function ExplainThis({
  contextType,
  contextData,
  title,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ExplainResponse | null>(null);

  async function fetchExplanation() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contextType, contextData }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Explain request failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function shareExplanation() {
    if (!result) return;
    setSharing(true);
    setError(null);

    try {
      const content = [
        `What to do about: ${title}`,
        "",
        ...result.actions.map((a, i) => `${i + 1}. ${a}`),
      ].join("\n");

      const res = await fetch("/api/learning-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `What to do about: ${title}`,
          category: "explain",
          content,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Share failed");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSharing(false);
    }
  }

  async function copyToClipboard() {
    if (!result) return;
    const text = [
      `What to do about: ${title}`,
      "",
      ...result.actions.map((a, i) => `${i + 1}. ${a}`),
    ].join("\n");
    await navigator.clipboard.writeText(text);
  }

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          fetchExplanation();
        }}
        className="text-xs px-4 py-2 rounded-full border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition"
      >
        Explain This
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10 w-full max-w-xl mx-4 rounded-2xl bg-[#0b0f14] border border-white/10 flex flex-col">
            <div className="p-5 border-b border-white/10">
              <h3 className="text-sm font-medium text-white">
                What should I actually do?
              </h3>
              <p className="text-xs text-gray-500 mt-1">{title}</p>
            </div>

            <div className="p-5 space-y-4">
              {loading && (
                <p className="text-xs text-gray-400">Generating actions...</p>
              )}

              {error && (
                <p className="text-xs text-red-400">{error}</p>
              )}

              {result && (
                <>
                  {result.summary && (
                    <p className="text-sm text-gray-300">{result.summary}</p>
                  )}
                  <ol className="text-sm text-gray-200 list-decimal list-inside space-y-2">
                    {result.actions.map((action, i) => (
                      <li key={`action-${i}`}>{action}</li>
                    ))}
                  </ol>
                </>
              )}
            </div>

            <div className="p-4 border-t border-white/10 flex items-center gap-3 justify-end">
              <button
                onClick={copyToClipboard}
                disabled={!result}
                className="text-xs px-3 py-2 rounded-full border border-white/10 text-gray-300 hover:bg-white/5 transition disabled:opacity-50"
              >
                Copy Explanation
              </button>
              <button
                onClick={shareExplanation}
                disabled={!result || sharing}
                className="text-xs px-3 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition disabled:opacity-50"
              >
                {sharing ? "Sharing..." : "Share Explanation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
