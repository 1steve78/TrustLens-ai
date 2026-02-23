"use client";

import { useMemo, useState } from "react";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

type ConsentResult = {
  summary: string;
  dataCollected: string[];
  sharedWith: string[];
  riskFlags: string[];
  riskScore: number;
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SIGNALS = [
  "Data retention length",
  "Third-party sharing",
  "Ad personalization",
  "Cross-device tracking",
  "Biometric collection",
  "Location usage",
];

export default function ConsentClient() {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ConsentResult | null>(null);

  async function analyzeConsent() {
    setError(null);
    setResult(null);

    if (!url.trim() && !text.trim()) {
      setError("Paste text or provide a URL.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim() || undefined,
          text: text.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Consent analysis failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const scoreColor = useMemo(() => {
    if (result?.riskScore === undefined) return "text-white/60 border-white/20";
    if (result.riskScore <= 25) return "text-emerald-300 border-emerald-500/30";
    if (result.riskScore <= 60) return "text-yellow-300 border-yellow-500/30";
    return "text-blue-300 border-blue-500/30";
  }, [result?.riskScore]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#05070c] text-white">
      <div className="pointer-events-none absolute -left-32 top-6 h-80 w-80 rounded-full bg-blue-600/20 blur-[150px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-sky-500/15 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-[32rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[200px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 space-y-12">
        <header className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div
              className={`${plexMono.className} inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/70`}
            >
              Consent Vault
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            </div>
            <h1
              className={`${spaceGrotesk.className} text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight`}
            >
              Decode privacy policies without the legal noise.
            </h1>
            <p className="text-sm md:text-base text-white/70 max-w-xl">
              Paste a policy or drop in a URL and get a clear, human summary of what data
              is collected, shared, and risky.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-4">
            <div>
              <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.3em] text-white/50`}>
                Signal Board
              </p>
              <h2 className={`${spaceGrotesk.className} text-2xl font-semibold mt-3`}>
                What we surface
              </h2>
              <p className="text-sm text-white/60 mt-2">
                High-risk consent clauses highlighted in seconds.
              </p>
            </div>
            <div className="grid gap-3">
              {SIGNALS.map((signal) => (
                <div
                  key={signal}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="text-sm text-white/80">{signal}</span>
                  <span className="text-[11px] uppercase text-blue-300">Flag</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Input Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className={`${spaceGrotesk.className} text-2xl font-semibold`}>
                  Analyze consent text
                </h2>
                <p className="text-sm text-white/60 mt-2">
                  Drop a URL or paste the full policy to scan for risk.
                </p>
              </div>
              <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/60">
                AI Node Active
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-white/60">Policy URL (optional)</label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/privacy"
                className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-2 text-sm outline-none focus:border-blue-500/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-white/60">Paste policy text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste the policy, terms, or permission request here..."
                rows={9}
                className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-2 text-sm outline-none resize-none focus:border-blue-500/40"
              />
            </div>

            {error && <p className="text-xs text-blue-300">{error}</p>}

            <button
              onClick={analyzeConsent}
              disabled={loading}
              className="px-6 py-2 rounded-full bg-blue-500 text-white text-sm font-semibold hover:bg-blue-400 transition disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze consent"}
            </button>
          </div>

          {/* Result Preview */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="space-y-3">
              <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.3em] text-white/50`}>
                Risk score
              </p>
              <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${scoreColor}`}>
                {result?.riskScore !== undefined
                  ? `Risk Score ${result.riskScore}/100`
                  : "Awaiting analysis"}
              </div>
              <p className="text-sm text-white/60">
                We summarize the key clauses and highlight high-risk sharing behaviors.
              </p>
            </div>

            {result && (
              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50">Summary</p>
                  <p className="text-sm text-white/80 mt-2">{result.summary}</p>
                </div>

                <div className="grid gap-4">
                  <Section title="Data Collected" items={result.dataCollected} />
                  <Section title="Shared With" items={result.sharedWith} />
                  <Section title="Risk Flags" items={result.riskFlags} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3">
      <h3 className="text-sm font-medium text-white">{title}</h3>
      {items && items.length > 0 ? (
        <ul className="text-xs text-white/70 list-disc list-inside space-y-1">
          {items.map((item, i) => (
            <li key={`${title}-${i}`}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-white/50">No items detected.</p>
      )}
    </div>
  );
}
