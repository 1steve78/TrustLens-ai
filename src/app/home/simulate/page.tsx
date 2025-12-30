"use client";

import { useState } from "react";

type Message = {
  role: "scammer" | "user";
  text: string;
};

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
          "Dear customer, your account has been suspended due to suspicious activity.",
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
            setMessages((prev) => [
            ...prev,
            { role: "scammer", text: data.text },
            ]);
        }
    }


  return (
    <div className="grid grid-cols-2 gap-8 h-full">
      {/* LEFT PANEL */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <h2 className="text-lg font-semibold mb-6">Scam Discovery</h2>

        <button
          onClick={findScam}
          className="rounded-xl bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-500/90 transition"
        >
          Find a Real Scam
        </button>

        {scam && (
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">{scam.name}</h3>

            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm text-gray-300">
              Platform: {scam.platform}
            </span>

            <p className="text-sm text-gray-300">
              <span className="text-gray-400">Goal:</span> {scam.goal}
            </p>

            <div className="flex flex-wrap gap-2">
              {Array.isArray(scam.psychology) &&
                scam.psychology.map((p: string) => (
                  <span
                    key={p}
                    className="px-3 py-1 rounded-full text-xs bg-red-500/20 text-red-300 border border-red-500/30"
                  >
                    {p}
                  </span>
                ))}
            </div>

            <button
              onClick={startSimulation}
              className="mt-6 rounded-xl bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-500/90 transition"
            >
              Start Simulation
            </button>
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Scam Simulator</h2>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            High Risk
          </div>
        </div>

        {/* CHAT WINDOW */}
        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
          {!scam && (
            <p className="text-sm text-gray-400">
              Find a real scam to begin.
            </p>
          )}

          {scam && !simulationStarted && (
            <p className="text-sm text-gray-400">
              Click <span className="text-white">Start Simulation</span> to
              experience how this scam works.
            </p>
          )}

          {simulationStarted &&
            messages.map((m, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] rounded-xl p-3 text-sm ${
                  m.role === "scammer"
                    ? "bg-white/10 text-gray-200"
                    : "ml-auto bg-blue-500/20 text-white"
                }`}
              >
                {m.text}
              </div>
            ))}
        </div>

        {/* INPUT */}
        <div className="mt-4 flex items-center gap-2">
          <input
            disabled={!simulationStarted}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              simulationStarted
                ? "Type your response..."
                : "Start simulation to reply"
            }
            className="flex-1 rounded-xl bg-white/10 px-4 py-2 text-sm text-white placeholder-gray-400 outline-none border border-white/10 disabled:opacity-40"
          />

          <button
            disabled={!simulationStarted}
            onClick={sendMessage}
            className="rounded-xl bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-500/90 transition disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
