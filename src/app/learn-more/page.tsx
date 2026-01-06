"use client";

import { useState } from "react";
import TabButton from "@/components/learn-more/TabButton";
import Description from "@/components/learn-more/tabs/Description";
import Features from "@/components/learn-more/tabs/Features";
import FuturePlans from "@/components/learn-more/tabs/FuturePlans";
import Link from "next/link";

type Tab = "description" | "features" | "future";

export default function LearnMorePage() {
  const [activeTab, setActiveTab] = useState<Tab>("description");

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <header className="space-y-3">
        <Link href="/" className="inline-block">
          <h1 className="text-3xl font-semibold tracking-tight">
            TrustLens
          </h1>
        </Link>
        <p className="text-sm text-gray-400 max-w-xl">
          A transparent look into how TrustLens protects users, learns from
          real threats, and evolves for the future.
        </p>
      </header>

      {/* Tabs container */}
      <div className="flex gap-2 rounded-xl bg-white/5 p-1 border border-white/10 w-fit">
        <TabButton
          label="Description"
          active={activeTab === "description"}
          onClick={() => setActiveTab("description")}
        />
        <TabButton
          label="Features"
          active={activeTab === "features"}
          onClick={() => setActiveTab("features")}
        />
        <TabButton
          label="Future Plans"
          active={activeTab === "future"}
          onClick={() => setActiveTab("future")}
        />
      </div>

      {/* Content wrapper */}
      <div className="glass rounded-2xl border border-white/10 p-6 min-h-[240px]">
        {activeTab === "description" && <Description />}
        {activeTab === "features" && <Features />}
        {activeTab === "future" && <FuturePlans />}
      </div>
    </section>
  );
}
