export default function ScanResult({
  result,
}: {
  result: {
    riskLevel: "Safe" | "Suspicious" | "Dangerous";
    summary: string;
    details: string[];
  };
}) {
  const color =
    result.riskLevel === "Safe"
      ? "green"
      : result.riskLevel === "Dangerous"
      ? "red"
      : "yellow";

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

      {/* Details */}
      <ul className="space-y-2 text-sm text-gray-400 list-disc list-inside">
        {result.details.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </div>
  );
}
