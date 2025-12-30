"use client";

export default function ScamTimeline({ onFound }: { onFound: (data: any) => void }) {
  async function findScam() {
    const res = await fetch("/api/simulate", {
      method: "POST"
    });
    const data = await res.json();
    onFound(data);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">AI Scam Finder</h2>

      <button
        onClick={findScam}
        className="rounded-xl bg-blue-500 px-4 py-2 text-sm text-white"
      >
        Find a Real Scam
      </button>

      <p className="text-xs text-gray-400">
        AI will select a well-known real-world scam and prepare a simulation.
      </p>
    </div>
  );
}
