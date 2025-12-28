"use client";

import { useEffect, useState } from "react";

export default function LearnPage() {
  const [briefing, setBriefing] = useState("Loading weekly briefing…");

  const reasons = [
    "Recently registered domain",
    "Urgency-based language",
  ];

  useEffect(() => {
    async function fetchBriefing() {
      const res = await fetch("/api/learn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reasons }),
      });

      const data = await res.json();
      setBriefing(data.explanation);
    }

    fetchBriefing();
  }, []);

  return (
    <section className="w-full px-6 py-6 space-y-12">
      {/* ================= Weekly AI Briefing ================= */}
      <div className="rounded-2xl bg-black/60 backdrop-blur border border-white/10 p-6">
        <h1 className="text-2xl font-semibold text-white">
          This Week’s Scam Briefing
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          AI-generated overview of current scam trends
        </p>

        <p className="text-gray-300 mt-4 whitespace-pre-line leading-relaxed">
          {briefing}
        </p>
      </div>

      {/* ================= Latest Scam Briefs ================= */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-white">
          Latest Scam Briefs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <ScamCard
            title="Fake Crypto Wallet Approval"
            description="Attackers trick users into signing malicious transactions through lookalike wallet sites."
            risk="High"
          />

          <ScamCard
            title="Fake Courier Delivery SMS"
            description="Urgent delivery messages redirect users to phishing tracking pages."
            risk="Medium"
          />
        </div>
      </div>

      {/* ================= Learn From This Scam ================= */}
      <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
        <h2 className="text-lg font-medium text-white">
          Learn From This Scam
        </h2>

        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <InfoBox title="Psychological Trick">
            Urgency & fear to force quick decisions
          </InfoBox>

          <InfoBox title="Technical Signal">
            Newly registered or spoofed domain
          </InfoBox>

          <InfoBox title="Defense Checklist">
            • Don’t click links<br />
            • Open official apps<br />
            • Verify sender
          </InfoBox>
        </div>
      </div>

      {/* ================= Patterns & Guides ================= */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-white font-medium">Related Patterns</h3>
          <ul className="text-sm text-blue-400 space-y-1">
            <li>Urgency Language Trap</li>
            <li>Authority Impersonation</li>
            <li>Fake Reward Loop</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-white font-medium">How-to Guides</h3>
          <ul className="text-sm text-blue-400 space-y-1">
            <li>How to identify phishing messages</li>
            <li>Securing your digital accounts</li>
            <li>Verifying links before clicking</li>
          </ul>
        </div>
      </div>

      {/* ================= AI Safety Coach ================= */}
      <div className="rounded-xl bg-white/5 border border-white/10 p-5 flex items-center justify-between">
        <div>
          <h3 className="text-white font-medium">
            AI Safety Coach
          </h3>
          <p className="text-sm text-gray-400">
            Get quick advice on what scams to avoid this week
          </p>
        </div>

        <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm">
          Get Advice
        </button>
      </div>
    </section>
  );
}

/* ================= Small Components ================= */

function ScamCard({ title, description, risk }: any) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
      <h3 className="font-medium text-white">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
      <span className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded">
        ⚠ {risk} Risk
      </span>
    </div>
  );
}

function InfoBox({ title, children }: any) {
  return (
    <div className="rounded-lg bg-black/40 border border-white/10 p-3">
      <p className="text-xs text-gray-400 mb-1">{title}</p>
      <p className="text-gray-200">{children}</p>
    </div>
  );
}
