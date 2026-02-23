import ExplainThis from "@/components/ExplainThis";

export default function ScanResult({
  result,
}: {
  result: {
    riskLevel: "Safe" | "Suspicious" | "Dangerous";
    summary: string;
    details: string[];
    url?: string;
  };
}) {
  const color =
    result.riskLevel === "Safe"
      ? "green"
      : result.riskLevel === "Dangerous"
      ? "red"
      : "yellow";

  const signals =
    result.details && result.details.length > 0
      ? result.details
      : ["No specific signals were returned for this scan."];

  const dnaBars = signals.map((_, i) => {
    const widths = [18, 28, 36, 46, 60, 72];
    return widths[i % widths.length];
  });

  return (
    <div className="mt-10 glass rounded-2xl p-6 space-y-4">

      {/* Risk Badge */}
      <div className="flex items-center gap-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
            ${
              color === "green"
                ? "bg-green-500/20 text-green-400"
                : color === "red"
                ? "bg-red-500/20 text-red-400"
                : "bg-yellow-500/20 text-yellow-400"
            }
          `}
        >
          {result.riskLevel}
        </span>

        <p className="text-sm text-gray-300">
          {result.summary}
        </p>
      </div>

      {/* Threat DNA Card */}
      <div className="rounded-2xl border border-white/10 bg-black/50 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/60">
              Threat DNA
            </p>
            <p className="text-sm text-gray-300">
              Explainable signals behind this verdict
            </p>
          </div>
          <span
            className={`text-[10px] px-2 py-1 rounded-full border ${
              color === "green"
                ? "border-green-500/30 text-green-400"
                : color === "red"
                ? "border-red-500/30 text-red-400"
                : "border-yellow-500/30 text-yellow-400"
            }`}
          >
            {result.riskLevel}
          </span>
        </div>

        {/* Fingerprint-style bars */}
        <div className="space-y-2">
          {dnaBars.map((w, i) => (
            <div
              key={`dna-${i}`}
              className="h-2 rounded-full bg-gradient-to-r from-blue-500/40 via-cyan-400/30 to-transparent"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>

        {/* Signals list */}
        <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
          {signals.map((signal, i) => (
            <li key={`signal-${i}`}>{signal}</li>
          ))}
        </ul>
      </div>

      {/* Explain This */}
      <div className="pt-2">
        <ExplainThis
          contextType="scan"
          title={result.url ? `Scan result for ${result.url}` : "Scan result"}
          contextData={{
            riskLevel: result.riskLevel,
            summary: result.summary,
            details: result.details,
          }}
        />
      </div>

      {/* Details removed: now shown inside Threat DNA */}
    </div>
  );
}
