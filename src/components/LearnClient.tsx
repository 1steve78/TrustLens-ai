"use client";

import { useEffect, useState } from "react";
import {AiExplanationCard} from "./AiExplanationCard";
export default function LearnClient({ briefs }: any) {
    const [briefing, setBriefing] = useState("Loading weekly briefing…");
    const slides = briefing
    .split("\n")
    .filter(Boolean);

    const [aiExplanation, setAiExplanation] = useState("");
    const [loadingAI, setLoadingAI] = useState(false);

    const reasons = [
        "Recently registered domain",
        "Urgency-based language",
    ];
    const [activeScam, setActiveScam] = useState<any | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (slides.length === 0) return;

        const interval = setInterval(() => {
                setCurrentIndex((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
                );
            }, 5000);

            return () => clearInterval(interval);
        }, [slides.length]);

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

  return (
    <section className="w-full px-6 py-6 space-y-12">
      {/* Weekly Briefing */}
      <div className="rounded-2xl bg-black/60 backdrop-blur border border-white/10 p-6">
        <h1 className="text-2xl font-semibold text-white">
          This Week’s Scam Briefing
        </h1>
        <p className="text-xs text-gray-500 mt-1">
            Updated weekly • AI-generated
        </p>

        <p className="text-sm text-gray-400 mt-1">
          AI-generated overview of current scam trends
        </p>

        <div className="mt-5 flex items-center gap-4">
            {/* Prev */}
            <button
                onClick={() =>
                setCurrentIndex(
                    currentIndex === 0 ? slides.length - 1 : currentIndex - 1
                )
                }
                className="text-gray-400 hover:text-white text-xl"
            >
                ‹
            </button>

            {/* Slide */}
            <div className="flex-1">
                <div className="relative overflow-hidden min-h-[160px] flex items-center justify-center">
                    <div
                        key={currentIndex}
                        className="
                        absolute w-full px-6
                        animate-brief-slide
                        text-center
                        "
                    >
                        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-8">
                            <p className="text-lg font-medium text-white leading-relaxed">
                                {slides[currentIndex] || "Loading…"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-2 mt-4">
                    {slides.map((_, i) => (
                        <span
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full transition ${
                            i === currentIndex ? "bg-white" : "bg-white/20"
                        }`}
                        />
                    ))}
                </div>

            </div>
            <br />
            


            {/* Next */}
            <button
                onClick={() =>
                setCurrentIndex(
                    currentIndex === slides.length - 1 ? 0 : currentIndex + 1
                )
                }
                className="text-gray-400 hover:text-white text-xl"
            >
                ›
            </button>
        </div>



      </div>

      {/* Latest Scam Briefs */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-white">
          Latest Scam Briefs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {briefs.map((scam: any) => (
            <div
              key={scam.id}
              className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-3"
            >
                <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                    {scam.scamType}
                    </p>
                    <span className="text-xs px-2 py-1 rounded text-red-400 bg-red-500/10">
                    ⚠ {scam.riskLevel}
                    </span>
                </div>

                <h3 className="text-white font-medium">
                    {scam.title}
                </h3>

                <p className="text-sm text-gray-300">
                    {scam.summary}
                </p>

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

                className="text-xs text-blue-400 hover:underline"
                >
                    Learn from this scam →
                </button>

            </div>
          ))}
        </div>
      </div>
      
      {activeScam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setActiveScam(null)}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-xl mx-4 rounded-2xl bg-[#0b0f14] border border-white/10 flex flex-col max-h-[80vh]">

            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <h3 className="text-sm font-medium text-white">
                AI Explanation
                </h3>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 pr-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <AiExplanationCard
                explanation={aiExplanation}
                loading={loadingAI}
                />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 text-center text-xs text-gray-500">
                End of AI analysis
            </div>

            </div>
        </div>
        )}


    </section>
  );
}
