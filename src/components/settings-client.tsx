"use client";

import { useState } from "react";
import UserAvatar from "@/components/UserAvatar";

type Props = {
  user: {
    id: string;
    name: string | null;
    avatarUrl: string | null;
  };
};

export default function SettingsClient({ user }: Props) {
  const [name, setName] = useState(user.name ?? "");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user.avatarUrl);
  const [saving, setSaving] = useState(false);

  const generatedAvatar = `https://api.dicebear.com/7.x/identicon/svg?seed=${
    name || "user"
  }`;

  async function saveProfile() {
    setSaving(true);

    await fetch("/api/user/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        avatarUrl,
      }),
    });

    setSaving(false);
  }

  return (
    <div className="max-w-xl mx-auto p-8 space-y-8">
      <h1 className="text-xl font-semibold">Account Settings</h1>

      {/* Avatar */}
      <div className="glass rounded-xl p-6 space-y-4">
        <p className="text-sm font-medium">Profile Picture</p>

        <div className="flex items-center gap-4">
          <UserAvatar name={name} avatarUrl={avatarUrl} />

          <button
            onClick={() => setAvatarUrl(generatedAvatar)}
            className="text-sm px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            Generate New Avatar
          </button>
        </div>
      </div>

      {/* Name */}
      <div className="glass rounded-xl p-6 space-y-3">
        <p className="text-sm font-medium">Display Name</p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-white/20"
        />
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={saveProfile}
          disabled={saving}
          className="px-6 py-2 rounded-lg bg-blue-600 text-sm font-medium hover:bg-blue-500 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
