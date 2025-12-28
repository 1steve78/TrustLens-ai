import { Scan } from "@prisma/client";

type ScanCardProps = {
  scan: Scan;
};

export default function ScanCard({ scan }: ScanCardProps) {
  return (
    <div className="glass rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium truncate">
          {scan.url}
        </p>

        <span
          className={`text-xs px-3 py-1 rounded-full ${
            scan.riskLevel === "Safe"
              ? "bg-green-500/20 text-green-400"
              : scan.riskLevel === "Dangerous"
              ? "bg-red-500/20 text-red-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {scan.riskLevel}
        </span>
      </div>

      <p className="text-sm text-gray-400">
        {scan.summary}
      </p>

      <ul className="mt-3 list-disc list-inside text-xs text-gray-400 space-y-1">
        {scan.details.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </div>
  );
}
