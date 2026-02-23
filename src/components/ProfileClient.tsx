"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import ScanCard from "@/components/ScanCard";
import LearningPost from "@/components/LearningPost";

const PAGE_SIZE = 5;

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

export default function ProfileClient({
  learnings,
  scans,
}: {
  learnings: any[];
  scans: any[];
}) {
  const [activeTab, setActiveTab] = useState<"learnings" | "scans">("learnings");
  const [visibleLearnings, setVisibleLearnings] = useState(PAGE_SIZE);
  const [visibleScans, setVisibleScans] = useState(PAGE_SIZE);
  const router = useRouter();

  const user = learnings[0]?.user || scans[0]?.user;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#05070c] text-white">
      <div className="pointer-events-none absolute -left-32 top-8 h-80 w-80 rounded-full bg-blue-600/20 blur-[150px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-sky-500/15 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-[32rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[200px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 space-y-10">
        <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <img
              src={user?.avatarUrl || "/avatar-placeholder.png"}
              className="h-20 w-20 rounded-full border border-white/10 object-cover"
              alt="avatar"
            />
            <div className="space-y-2">
              <div
                className={`${plexMono.className} inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/60`}
              >
                Profile
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              </div>
              <h1 className={`${spaceGrotesk.className} text-2xl md:text-3xl font-semibold`}>
                {user?.name || "Your Profile"}
              </h1>
              <p className="text-sm text-white/60">Personal activity and learning history</p>
            </div>
          </div>

          <button
            onClick={() => router.push("/home/profile/settings")}
            className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-200 hover:bg-blue-500/20 transition"
          >
            Edit profile
          </button>
        </header>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab("learnings")}
            className={`rounded-full px-4 py-2 text-sm transition ${
              activeTab === "learnings"
                ? "bg-blue-500/20 text-white border border-blue-500/30"
                : "border border-white/10 text-white/60 hover:text-white"
            }`}
          >
            My learnings
          </button>
          <button
            onClick={() => setActiveTab("scans")}
            className={`rounded-full px-4 py-2 text-sm transition ${
              activeTab === "scans"
                ? "bg-blue-500/20 text-white border border-blue-500/30"
                : "border border-white/10 text-white/60 hover:text-white"
            }`}
          >
            My scans
          </button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          {activeTab === "learnings" && (
            <section className="space-y-4">
              {learnings.length === 0 ? (
                <p className="text-sm text-white/60">You have not posted any learning yet.</p>
              ) : (
                <>
                  {learnings.slice(0, visibleLearnings).map((item) => (
                    <LearningPost key={item.id} learning={item} user={item.user} />
                  ))}

                  {visibleLearnings < learnings.length && (
                    <button
                      onClick={() => setVisibleLearnings((v) => v + PAGE_SIZE)}
                      className="mt-4 text-xs px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
                    >
                      Load more learnings
                    </button>
                  )}
                </>
              )}
            </section>
          )}

          {activeTab === "scans" && (
            <section className="space-y-4">
              {scans.length === 0 ? (
                <p className="text-sm text-white/60">You have not scanned any URLs yet.</p>
              ) : (
                <>
                  {scans.slice(0, visibleScans).map((scan) => (
                    <ScanCard key={scan.id} scan={scan} user={scan.user} />
                  ))}

                  {visibleScans < scans.length && (
                    <button
                      onClick={() => setVisibleScans((v) => v + PAGE_SIZE)}
                      className="mt-4 text-xs px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
                    >
                      Load more scans
                    </button>
                  )}
                </>
              )}
            </section>
          )}
        </div>
      </div>
    </section>
  );
}
