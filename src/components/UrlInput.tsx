"use client";

import { useState } from "react";
import { Loader2, Shield, Link2 } from "lucide-react";
import ScanResult from "./ScanResult";

type ScanResponse = {
  url: string;
  riskLevel: "Safe" | "Suspicious" | "Dangerous";
  summary: string;
  details: string[];
};

export default function UrlInput() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResponse | null>(null);

  async function handleSubmit() {
    setError("");
    setResult(null);

    if (!url) {
      setError("Please enter a valid website URL.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        throw new Error("Scan failed");
      }

      const data = await res.json();
      setResult(data);
    } catch {
      setError("Scan failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-white/60">
          Website URL
        </label>

        <div className="relative">
          <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />

          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="
              w-full rounded-xl
              bg-black
              border border-white/15
              px-11 py-4
              text-sm text-white
              placeholder:text-white/40
              outline-none
              transition-all
              focus:border-blue-500/40
              focus:ring-2 focus:ring-blue-500/20
            "
          />
        </div>

        {error && (
          <p className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="
          group
          relative
          w-full
          overflow-hidden
          rounded-full
          bg-blue-600
          py-4
          font-medium text-white
          transition-all
          hover:bg-blue-500
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {/* Glow */}
        <span
          className="
            absolute inset-0
            bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-blue-400/0
            opacity-0
            transition-opacity duration-300
            group-hover:opacity-100
          "
        />

        <span className="relative flex items-center justify-center gap-2">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing…
            </>
          ) : (
            <>
              <Shield className="h-4 w-4" />
              Analyze Website
            </>
          )}
        </span>
      </button>

      {/* Result */}
      {result && (
        <div className="pt-6 border-t border-white/10">
          <ScanResult result={result} />
        </div>
      )}
    </div>
  );
}
