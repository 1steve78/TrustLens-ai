"use client";

import { useEffect, useMemo, useState } from "react";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { AiExplanationCard } from "./AiExplanationCard";

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
  "Lookalike domains",
  "Urgency and pressure cues",
  "Payment diversion attempts",
  "Impersonation signals",
  "Off-platform messaging",
  "Credential harvesting",
];

export default function LearnClient({ briefs }: any) {
  const [briefing, setBriefing] = useState("Loading weekly briefing...");
  const slides = briefing.split("\n").filter(Boolean);

  const [aiExplanation, setAiExplanation] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [activeScam, setActiveScam] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const stats = useMemo(() => {
    const totalBriefs = Array.isArray(briefs) ? briefs.length : 0;
    const typeCounts = new Map<string, number>();
    const highRisk = Array.isArray(briefs)
      ? briefs.filter((brief: any) =>
          String(brief?.riskLevel || "")
            .toLowerCase()
            .includes("high")
        ).length
      : 0;

    if (Array.isArray(briefs)) {
      briefs.forEach((brief: any) => {
        const key = String(brief?.scamType || "Unknown");
        typeCounts.set(key, (typeCounts.get(key) || 0) + 1);
      });
    }

    const topTypes = Array.from(typeCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([type]) => type);

    return {
      totalBriefs,
      highRisk,
      uniqueTypes: typeCounts.size,
      topTypes,
    };
  }, [briefs]);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (currentIndex > slides.length - 1) {
      setCurrentIndex(0);
    }
  }, [slides.length, currentIndex]);

  useEffect(() => {
    async function fetchBriefing() {
      const res = await fetch("/api/learn", {
        method: "POST",
      });

      const data = await res.json();
      setBriefing(data.explanation);
    }

    fetchBriefing();
  }, []);

  const hasSlides = slides.length > 0;
  const safeIndex = hasSlides ? currentIndex : 0;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#05070c] text-white">
      <div className="pointer-events-none absolute -left-28 top-8 h-72 w-72 rounded-full bg-blue-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-sky-500/15 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-[30rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[180px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 space-y-12">
        <header className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div
              className={`${plexMono.className} inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/70`}
            >
              Threat Learning Hub
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            </div>

            <div className="space-y-3">
              <h1
                className={`${spaceGrotesk.className} text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight`}
              >
                Learn how scams evolve and train your response.
              </h1>
              <p className="text-sm md:text-base text-white/70 max-w-xl">
                Weekly intelligence briefs, live scam reports, and explainable AI analysis
                to help your team recognize manipulation early.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {stats.topTypes.length > 0 ? (
                stats.topTypes.map((type) => (
                  <span
                    key={type}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70"
                  >
                    {type}
                  </span>
                ))
              ) : (
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
                  Tracking scam categories
                </span>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.3em] text-white/50`}>
                Briefs
              </p>
              <p className="text-2xl font-semibold text-white mt-2">
                {stats.totalBriefs}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.3em] text-white/50`}>
                High Risk
              </p>
              <p className="text-2xl font-semibold text-white mt-2">
                {stats.highRisk}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.3em] text-white/50`}>
                Types
              </p>
              <p className="text-2xl font-semibold text-white mt-2">
                {stats.uniqueTypes}
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className={`${spaceGrotesk.className} text-2xl font-semibold`}>
                  This Week's Scam Briefing
                </h2>
                <p className="text-xs text-white/50 mt-2">
                  Updated weekly - AI-generated intelligence
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentIndex(
                      currentIndex === 0 ? slides.length - 1 : currentIndex - 1
                    )
                  }
                  disabled={!hasSlides}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/70 transition hover:text-white disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setCurrentIndex(
                      currentIndex === slides.length - 1 ? 0 : currentIndex + 1
                    )
                  }
                  disabled={!hasSlides}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/70 transition hover:text-white disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="mt-8 relative overflow-hidden min-h-[220px] flex items-center justify-center">
              <div key={safeIndex} className="absolute w-full px-6 animate-brief-slide">
                <div className="rounded-2xl bg-black/60 border border-white/10 backdrop-blur p-8">
                  <p className="text-lg md:text-xl font-medium text-white leading-relaxed text-center">
                    {slides[safeIndex] || "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-6 rounded-full transition ${
                    i === safeIndex ? "bg-blue-300" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-6">
            <div>
              <p className={`${plexMono.className} text-xs uppercase tracking-[0.3em] text-white/50`}>
                Signal Board
              </p>
              <h3 className={`${spaceGrotesk.className} text-2xl font-semibold mt-3`}>
                Signals we flag every week
              </h3>
              <p className="text-sm text-white/60 mt-2">
                These cues appear across the latest incidents. Train your eye to spot them fast.
              </p>
            </div>

            <div className="space-y-3">
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
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className={`${spaceGrotesk.className} text-2xl font-semibold`}>
                Latest Scam Briefs
              </h2>
              <p className="text-sm text-white/60">
                Fresh incidents, distilled for fast review.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60">
              {briefs?.length || 0} briefs loaded
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {briefs.map((scam: any) => (
              <div
                key={scam.id}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4 transition hover:-translate-y-1 hover:border-white/25"
              >
                <div className="flex items-center justify-between">
                  <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.2em] text-white/50`}>
                    {scam.scamType}
                  </p>
                  <span className="text-[11px] px-2 py-1 rounded-full text-blue-200 bg-blue-500/20 border border-blue-500/30">
                    {scam.riskLevel}
                  </span>
                </div>

                <h3 className={`${spaceGrotesk.className} text-lg font-semibold text-white`}>
                  {scam.title}
                </h3>

                <p className="text-sm text-white/70">{scam.summary}</p>

                <button
                  onClick={async () => {
                    setActiveScam(scam);
                    setAiExplanation("");
                    setLoadingAI(true);

                    const res = await fetch("/api/learn/explain", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        title: scam.title,
                        summary: scam.summary,
                        scamType: scam.scamType,
                      }),
                    });

                    const data = await res.json();
                    setAiExplanation(data.explanation || "No explanation available.");
                    setLoadingAI(false);
                  }}
                  className="text-xs text-blue-300 hover:text-blue-200 transition"
                >
                  Learn from this scam Next
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeScam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setActiveScam(null)}
          />

          <div className="relative z-10 w-full max-w-xl mx-4 rounded-2xl bg-[#0b0f14] border border-white/10 flex flex-col max-h-[80vh]">
            <div className="p-6 border-b border-white/10">
              <h3 className={`${spaceGrotesk.className} text-sm font-semibold text-white`}>
                AI Explanation
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 pr-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <AiExplanationCard explanation={aiExplanation} loading={loadingAI} />
            </div>

            <div className="p-4 border-t border-white/10 text-center text-xs text-white/50">
              End of AI analysis
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
