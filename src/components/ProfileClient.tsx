"use client";

import { useState } from "react";
import ScanCard from "@/components/ScanCard";
import LearningPost from "@/components/LearningPost";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 5;

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

  // user info from first item (profile owner)
  const user = learnings[0]?.user || scans[0]?.user;

  return (
    <section className="max-w-5xl mx-auto p-8 space-y-10">

      {/* ================= PROFILE HEADER ================= */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img
            src={user?.avatarUrl || "/avatar-placeholder.png"}
            className="w-20 h-20 rounded-full"
            alt="avatar"
          />

          <div className="space-y-1">
            <h1 className="text-xl font-semibold text-white">
              {user?.name || "Your Profile"}
            </h1>

            {/* BIO (only render if exists) */}
            {user?.bio && (
              <p className="text-sm text-gray-400 max-w-md">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        {/* EDIT BUTTON */}
        <button
          onClick={() => router.push("/home/profile/settings")}
          className="text-sm px-4 py-2 rounded-full
                     bg-white/10 hover:bg-white/20
                     transition"
        >
          Edit Profile
        </button>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-4 border-b border-white/10">
        <button
          onClick={() => setActiveTab("learnings")}
          className={`pb-3 text-sm transition ${
            activeTab === "learnings"
              ? "text-white border-b-2 border-blue-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          My Learnings
        </button>

        <button
          onClick={() => setActiveTab("scans")}
          className={`pb-3 text-sm transition ${
            activeTab === "scans"
              ? "text-white border-b-2 border-blue-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          My Scans
        </button>
      </div>

      {/* ================= TAB CONTENT ================= */}
      {activeTab === "learnings" && (
        <section className="space-y-4">
          {learnings.length === 0 ? (
            <p className="text-sm text-gray-400">
              You haven’t posted any learning yet.
            </p>
          ) : (
            <>
              {learnings.slice(0, visibleLearnings).map((item) => (
                <LearningPost
                  key={item.id}
                  learning={item}
                  user={item.user}
                />
              ))}

              {visibleLearnings < learnings.length && (
                <button
                  onClick={() => setVisibleLearnings(v => v + PAGE_SIZE)}
                  className="mt-4 text-xs px-4 py-2 rounded-full
                             bg-white/10 hover:bg-white/20 transition"
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
            <p className="text-sm text-gray-400">
              You haven’t scanned any URLs yet.
            </p>
          ) : (
            <>
              {scans.slice(0, visibleScans).map((scan) => (
                <ScanCard
                  key={scan.id}
                  scan={scan}
                  user={scan.user}
                />
              ))}

              {visibleScans < scans.length && (
                <button
                  onClick={() => setVisibleScans(v => v + PAGE_SIZE)}
                  className="mt-4 text-xs px-4 py-2 rounded-full
                             bg-white/10 hover:bg-white/20 transition"
                >
                  Load more scans
                </button>
              )}
            </>
          )}
        </section>
      )}
    </section>
  );
}
