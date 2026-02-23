import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import CTAButton from "../components/CtaButton";
import { FeatureSlidingCards } from "../components/FeatureSlidingCard";

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

const FEATURES = [
  {
    title: "Deepfake Detection",
    desc: "Analyze images and videos to detect AI-generated or manipulated content.",
  },
  {
    title: "Private Media Protection",
    desc: "Secure sensitive images before they are misused or leaked.",
  },
  {
    title: "Threat Monitoring",
    desc: "Detect impersonation and identity abuse across platforms.",
  },
  {
    title: "Anonymous Reporting",
    desc: "Share issues safely without revealing your identity.",
  },
];

const HIGHLIGHTS = [
  "Real-time scam and impersonation detection",
  "Secure vault for evidence and case history",
  "AI guidance that stays explainable",
  "Privacy-first architecture",
];

const STEPS = [
  {
    title: "Scan",
    desc: "Drop in suspicious links, images, or profiles to run a full integrity check.",
  },
  {
    title: "Verify",
    desc: "TrustLens highlights anomalies and tells you exactly what triggered the alert.",
  },
  {
    title: "Respond",
    desc: "Generate a clean report, notify stakeholders, and take action fast.",
  },
];

const SIGNALS = [
  "Lookalike domains",
  "Deepfake voice overlays",
  "Urgent payment diversion",
  "Social engineering loops",
  "Credential harvesting",
  "Executive impersonation",
];

const USE_CASES = [
  {
    title: "Executives & Founders",
    desc: "Detect impersonation attempts across email, social, and messaging apps.",
  },
  {
    title: "Security Teams",
    desc: "Create a single source of truth for investigation and response workflows.",
  },
  {
    title: "Creators",
    desc: "Safeguard likeness, assets, and brand reputation from abuse.",
  },
];

export default async function HomePage() {
  const cookieStore = cookies();
  const isLoggedIn = Boolean((await cookieStore).get("auth_token"));

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#05070c] text-white">
      <div className="pointer-events-none absolute -left-36 top-6 h-80 w-80 rounded-full bg-cyan-500/15 blur-[160px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-emerald-500/15 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-[34rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[200px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#0f172a,transparent_55%)] opacity-60" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 space-y-24">
        {/* ================= HERO ================= */}
        <header className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div
              className={`${plexMono.className} inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/70`}
            >
              TrustLens AI
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-4">
              <h1
                className={`${spaceGrotesk.className} text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight`}
              >
                Stop digital impersonation before it spreads.
              </h1>
              <p className="text-base md:text-lg text-white/70 max-w-xl">
                TrustLens AI protects your identity with real-time scans, deepfake detection,
                and secure evidence trails built for fast response.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <CTAButton isLoggedIn={isLoggedIn} />
              <Link
                href="/learn-more"
                className="rounded-full px-6 py-3 text-sm font-semibold text-white/80 border border-white/15 bg-white/5 hover:border-white/30 hover:text-white transition"
              >
                See how it works
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-sm text-white/75">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="absolute -top-6 right-6 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs text-white/70">
                Live risk map
              </div>
              <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-emerald-400/30">
                <Image
                  src="/hero-visual.png"
                  alt="TrustLens preview"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {["Scans", "Alerts", "Cases"].map((label) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4"
                  >
                    <p className={`${plexMono.className} text-[10px] uppercase tracking-[0.3em] text-white/50`}>
                      {label}
                    </p>
                    <p className="text-lg font-semibold text-white mt-2">Live</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {FEATURES.slice(0, 2).map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-4"
                >
                  <p className={`${spaceGrotesk.className} text-lg font-semibold`}>
                    {feature.title}
                  </p>
                  <p className="text-sm text-white/70 mt-2">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ================= SIGNALS ================= */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className={`${plexMono.className} text-xs uppercase tracking-[0.3em] text-white/50`}>
                Threat Signals
              </p>
              <h2 className={`${spaceGrotesk.className} text-3xl font-semibold mt-3`}>
                Signals we flag in real time
              </h2>
            </div>
            <div className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-white/60">
              Updated weekly
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SIGNALS.map((signal) => (
              <div
                key={signal}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <span className="text-sm text-white/80">{signal}</span>
                <span className="text-[11px] uppercase text-emerald-300">Flag</span>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className={`${plexMono.className} text-xs uppercase tracking-[0.3em] text-white/50`}>
                Platform
              </p>
              <h2 className={`${spaceGrotesk.className} text-3xl font-semibold mt-3`}>
                Everything you need to stay trusted
              </h2>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60">
              AI + human review loop
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-white/30"
              >
                <p className={`${spaceGrotesk.className} text-xl font-semibold`}>
                  {feature.title}
                </p>
                <p className="text-sm text-white/70 mt-3">{feature.desc}</p>
              </div>
            ))}
          </div>

          <FeatureSlidingCards />
        </section>

        {/* ================= USE CASES ================= */}
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className={`${plexMono.className} text-xs uppercase tracking-[0.3em] text-white/50`}>
              Use Cases
            </p>
            <h2 className={`${spaceGrotesk.className} text-3xl font-semibold`}>
              Built for leaders, teams, and creators
            </h2>
            <p className="text-sm text-white/70">
              Match each response to the stakes of the incident with clear, repeatable workflows.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {USE_CASES.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <p className={`${spaceGrotesk.className} text-lg font-semibold`}>
                  {item.title}
                </p>
                <p className="text-sm text-white/70 mt-3">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= WORKFLOW ================= */}
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className={`${plexMono.className} text-xs uppercase tracking-[0.3em] text-white/50`}>
              Workflow
            </p>
            <h2 className={`${spaceGrotesk.className} text-3xl font-semibold`}>
              From suspicion to resolution in minutes
            </h2>
            <p className="text-sm text-white/70">
              TrustLens keeps the signal clear so your team can act with confidence.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <p className={`${plexMono.className} text-xs uppercase tracking-[0.3em] text-white/50`}>
                  0{index + 1}
                </p>
                <p className={`${spaceGrotesk.className} text-lg font-semibold mt-4`}>
                  {step.title}
                </p>
                <p className="text-sm text-white/70 mt-3">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-400/10 via-white/5 to-transparent p-10 md:p-12">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-3">
              <h3 className={`${spaceGrotesk.className} text-2xl font-semibold`}>
                Ready to protect your digital presence?
              </h3>
              <p className="text-sm text-white/70">
                Start a scan or explore a deeper trust assessment in minutes.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <CTAButton isLoggedIn={isLoggedIn} />
              <Link
                href="/home/scan"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 hover:text-white"
              >
                Run a quick scan
              </Link>
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer
          className="glass rounded-3xl px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/15 bg-black/40 relative"
        >
          <div
            className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
          />

          <p className="text-sm text-white/60">
            (c) {new Date().getFullYear()} TrustLens AI - Digital Safety Platform
          </p>

          <div className="flex gap-6 text-sm text-white/60">
            <Link href="https://www.instagram.com/trust.lens_/" className="hover:text-white transition">
              Instagram
            </Link>
            <Link href="https://github.com/1steve78/TrustLens-ai" className="hover:text-white transition">
              GitHub
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
}
