"use client";

import UrlInput from "@/components/UrlInput";

export default function ScanPage() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-4">
      {/* Background Glows */}
      <div className="absolute top-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -top-[10%] left-[15%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute top-[25%] right-[10%] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <section className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="space-y-4 text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Scan a Website
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
            Analyze a website for scam or phishing risks using{" "}
            <span className="text-foreground font-medium">
              explainable AI
            </span>{" "}
            and transparent security checks.
          </p>
        </div>

        {/* SCAN CARD */}
        <div className="relative group">
          {/* Blue hover glow */}
          <div
            className="
              absolute -inset-1 rounded-3xl
              bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-blue-600/30
              blur-2xl opacity-0
              transition-opacity duration-500
              group-hover:opacity-100
            "
          />

          {/* Main black card */}
          <div
            className="
              relative
              rounded-3xl
              bg-black
              border border-white/10
              p-6 md:p-10
              transition-all duration-300
              hover:border-blue-500/30
            "
          >
            <UrlInput />

            {/* Status pill */}
            <div className="mt-8 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 w-fit mx-auto border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-white/70">
                TrustLens AI Security Node Active
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-muted-foreground/60 text-center max-w-md mx-auto leading-loose">
          TrustLens AI provides risk analysis and education to help users
          make informed decisions. We do not block access to content.
        </p>
      </section>
    </div>
  );
}
