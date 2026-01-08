"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
type User = {
  id: string;
  name: string | null;
  avatarUrl: string | null;
  bio?: string | null;
};

export default function SettingsClient({ user }: { user: User }) {
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);

    await fetch("/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, bio }),
    });

    setLoading(false);
    router.push("/home/profile");
    router.refresh();
  }

  return (
    <section className="max-w-xl mx-auto p-8 space-y-6">
      <h1 className="text-xl font-semibold text-white">
        Edit Profile
      </h1>

      <div className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent border border-white/10
                     rounded-lg px-4 py-2 text-sm text-white"
          placeholder="Your name"
        />

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full bg-transparent border border-white/10
                     rounded-lg px-4 py-2 text-sm text-white"
          placeholder="Short bio"
          rows={4}
        />

        <button
          onClick={save}
          disabled={loading}
          className="px-4 py-2 rounded-full
                     bg-blue-500/20 text-blue-400
                     hover:bg-blue-500/30 transition"
        >
          {loading ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </section>
  );
}
