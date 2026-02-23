"use client";

import { useMemo, useState } from "react";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import ExplainThis from "@/components/ExplainThis";

type Message = {
  role: "scammer" | "user";
  text: string;
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

const TRAINING_STEPS = [
  {
    title: "Pick a real scam",
    desc: "Pull a live scenario from recent threat feeds.",
  },
  {
    title: "Respond under pressure",
    desc: "Practice safe responses to real prompts.",
  },
  {
    title: "Review what triggered",
    desc: "See why the scam worked and how to stop it.",
  },
];

export default function SimulatePage() {
  const [scam, setScam] = useState<any>(null);
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  async function findScam() {
    const res = await fetch("/api/simulate", { method: "POST" });
    const data = await res.json();

    // normalize psychology
    data.psychology =
      typeof data.psychology === "string"
        ? data.psychology.split(",").map((s: string) => s.trim())
        : data.psychology;

    setScam(data);
    setSimulationStarted(false);
    setMessages([]);
    setInput("");
  }

  function startSimulation() {
    if (!scam) return;

    setSimulationStarted(true);
    setMessages([
      {
        role: "scammer",
        text:
          "Hi there - we noticed unusual activity on your account. Can you confirm your login details to avoid suspension?",
      },
    ]);
  }

  async function sendMessage() {
    if (!input.trim() || !simulationStarted) return;

    const userMessage: Message = { role: "user", text: input };

    // Optimistic UI update
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    // Call chat API
    const res = await fetch("/api/simulate/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: updatedMessages,
        scam,
      }),
    });

    const data = await res.json();

    if (data?.text) {
      setMessages((prev) => [...prev, { role: "scammer", text: data.text }]);
    }
  }

  const lastMessage = messages[messages.length - 1]?.text || "";
  const riskLabel = useMemo(() => {
    if (!scam?.psychology) return "Monitoring";
    return Array.isArray(scam.psychology) && scam.psychology.length > 2
      ? "High Risk"
      : "Moderate Risk";
  }, [scam]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#05070c] text-white">
      <div className="pointer-events-none absolute -left-28 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-12 h-80 w-80 rounded-full bg-sky-500/15 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-[30rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[180px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 space-y-10">
        <header className="space-y-4">
          <div
            className={`${plexMono.className} inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/70`}
          >
            Threat Simulation Lab
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          </div>
          <h1
            className={`${spaceGrotesk.className} text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight`}
          >
            Practice high-risk scenarios without the real-world fallout.
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
            Run realistic scam simulations, learn how attackers escalate, and train your team
            on safer responses.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-3">
          {TRAINING_STEPS.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.3em] text-white/50`}>
                0{index + 1}
              </p>
              <p className={`${spaceGrotesk.className} text-lg font-semibold mt-3`}>
                {step.title}
              </p>
              <p className="text-sm text-white/70 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          {/* LEFT PANEL */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className={`${spaceGrotesk.className} text-2xl font-semibold`}>
                  Scam discovery
                </h2>
                <p className="text-sm text-white/60 mt-2">
                  Pull a real-world scam scenario and inspect the tactics used.
                </p>
              </div>
              <div className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-white/60">
                Live feed
              </div>
            </div>

            <button
              onClick={findScam}
              className="rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 hover:bg-blue-400"
            >
              Find a real scam
            </button>

            {!scam && (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-white/60">
                Pull a scenario to see the platform, goal, and psychological hooks.
              </div>
            )}

            {scam && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.3em] text-white/50`}>
                    Scenario
                  </p>
                  <h3 className={`${spaceGrotesk.className} text-xl font-semibold mt-2`}>
                    {scam.name}
                  </h3>
                  <p className="text-sm text-white/70 mt-2">
                    Platform: <span className="text-white/90">{scam.platform}</span>
                  </p>
                  <p className="text-sm text-white/70 mt-1">
                    Goal: <span className="text-white/90">{scam.goal}</span>
                  </p>
                </div>

                <div>
                  <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.3em] text-white/50`}>
                    Psychological cues
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Array.isArray(scam.psychology) &&
                      scam.psychology.map((p: string) => (
                        <span
                          key={p}
                          className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-100 border border-blue-500/30"
                        >
                          {p}
                        </span>
                      ))}
                  </div>
                </div>

                <button
                  onClick={startSimulation}
                  className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#05070c] hover:bg-blue-50 transition"
                >
                  Start simulation
                </button>
              </div>
            )}
          </div>

          {/* RIGHT PANEL */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className={`${spaceGrotesk.className} text-2xl font-semibold`}>
                  Scam simulator
                </h2>
                <p className="text-sm text-white/60 mt-2">
                  Practice your responses in a safe sandbox.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/70">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                {riskLabel}
              </div>
            </div>

            {/* CHAT WINDOW */}
            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
              {!scam && (
                <p className="text-sm text-white/60">Find a real scam to begin.</p>
              )}

              {scam && !simulationStarted && (
                <p className="text-sm text-white/60">
                  Click <span className="text-white">Start simulation</span> to
                  experience how this scam works.
                </p>
              )}

              {simulationStarted &&
                messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex items-end gap-3 ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {m.role === "scammer" && (
                      <div className="h-9 w-9 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xs text-blue-200">
                        TL
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        m.role === "scammer"
                          ? "bg-white/10 text-white/80 border border-white/10"
                          : "bg-blue-500/20 text-white border border-blue-500/30"
                      }`}
                    >
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-1">
                        {m.role === "scammer" ? "TrustLens Coach" : "You"}
                      </p>
                      {m.text}
                    </div>
                    {m.role === "user" && (
                      <div className="h-9 w-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                        You
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {scam && simulationStarted && (
              <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                Training coach is active
              </div>
            )}

            {scam && (
              <div className="mt-6">
                <ExplainThis
                  contextType="simulation"
                  title={`Scam simulation: ${scam.name}`}
                  contextData={{
                    name: scam.name,
                    platform: scam.platform,
                    goal: scam.goal,
                    psychology: scam.psychology,
                    lastMessage,
                  }}
                />
              </div>
            )}

            {/* INPUT */}
            <div className="mt-6 flex items-center gap-2">
              <input
                disabled={!simulationStarted}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  simulationStarted
                    ? "Type your response..."
                    : "Start simulation to reply"
                }
                className="flex-1 rounded-full bg-white/10 px-4 py-2 text-sm text-white placeholder-white/40 outline-none border border-white/10 disabled:opacity-40"
              />

              <button
                disabled={!simulationStarted}
                onClick={sendMessage}
                className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400 transition disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
