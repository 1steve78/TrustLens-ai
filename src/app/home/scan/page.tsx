"use client";

import UrlInput from "@/components/UrlInput";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

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
  "Domain age + registrar check",
  "TLS + certificate anomalies",
  "Content similarity to known scams",
  "Redirect and link analysis",
  "Brand impersonation detection",
  "Payment page fingerprinting",
];

export default function ScanPage() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#05070c] text-white">
      <div className="pointer-events-none absolute -left-36 top-0 h-80 w-80 rounded-full bg-blue-600/20 blur-[150px]" />
      <div className="pointer-events-none absolute right-0 top-10 h-96 w-96 rounded-full bg-sky-500/15 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-[32rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[200px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 space-y-14">
        {/* Header */}
        <header className="space-y-6 text-center">
          <div
            className={`${plexMono.className} inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/70`}
          >
            TrustLens Scan Lab
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          </div>
          <h1
            className={`${spaceGrotesk.className} text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight`}
          >
            Scan a link before you click.
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            Analyze suspicious websites with explainable AI and transparent security checks.
            Get a clear risk summary in seconds.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Scan Card */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/40 via-cyan-500/20 to-blue-600/40 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative rounded-3xl bg-black/80 border border-white/10 p-6 md:p-10 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.3em] text-white/50`}>
                    New Scan
                  </p>
                  <h2 className={`${spaceGrotesk.className} text-2xl font-semibold mt-2`}>
                    Enter a suspicious URL
                  </h2>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                  AI Node Active
                </div>
              </div>

              <UrlInput />

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                  </span>
                  Live risk telemetry
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60">
                  No data stored without consent
                </div>
              </div>
            </div>
          </div>

          {/* Signal Board */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-6">
            <div>
              <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.3em] text-white/50`}>
                Signal Board
              </p>
              <h3 className={`${spaceGrotesk.className} text-2xl font-semibold mt-3`}>
                What TrustLens checks
              </h3>
              <p className="text-sm text-white/70 mt-2">
                We score each site across technical integrity and impersonation signals.
              </p>
            </div>

            <div className="grid gap-3">
              {SIGNALS.map((signal) => (
                <div
                  key={signal}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="text-sm text-white/80">{signal}</span>
                  <span className="text-[11px] uppercase text-blue-300">Scan</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-center">
          <p className="text-xs text-white/60 leading-relaxed">
            TrustLens AI provides risk analysis and education to help users make informed decisions.
            We do not block access to content.
          </p>
        </div>
      </div>
    </section>
  );
}
