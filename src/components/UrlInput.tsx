"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Shield } from "lucide-react";

export default function UrlInput() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    setError("");

    if (!url) {
      setError("Please enter a website URL.");
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

      router.push("/history");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="space-y-1">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="
            w-full rounded-xl
            border border-white/30 dark:border-white/10
            bg-white/60 dark:bg-black/50
            backdrop-blur-md
            px-5 py-4
            text-sm
            outline-none
            focus:ring-2 focus:ring-blue-500/40
          "
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="
          w-full inline-flex items-center justify-center gap-2
          rounded-full
          bg-blue-600 text-white
          py-4
          font-medium
          shadow-lg shadow-blue-500/20
          transition-all
          hover:bg-blue-700 hover:scale-[1.02]
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
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
      </button>
    </div>
  );
}
