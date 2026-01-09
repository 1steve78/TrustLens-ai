"use client";

import { useState } from "react";
import Image from "next/image";

type User = {
  id: string;
  name: string | null;
  email?: string | null;
  bio?: string | null;
  avatarUrl: string | null;
};

export default function SettingsClient({ user }: { user: User }) {
  const [avatar, setAvatar] = useState(user.avatarUrl);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  /* ================= Avatar Upload ================= */
  async function handleAvatarChange(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be under 2MB");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload/avatar", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");

      const { url } = await uploadRes.json();

      const updateRes = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatarUrl: url }),
      });

      if (!updateRes.ok) throw new Error("Update failed");

      setAvatar(url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  /* ================= Profile Update ================= */
  async function handleSaveProfile() {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, bio }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-xl mx-auto px-6 py-16 space-y-10">
      <h1 className="text-2xl font-semibold">
        Profile Settings
      </h1>

      {/* ================= Avatar ================= */}
      <div className="rounded-2xl border border-white/10 bg-black p-6 space-y-6">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full border border-white/10 overflow-hidden
                          flex items-center justify-center bg-black">
            {avatar ? (
              <Image
                src={avatar}
                alt="User avatar"
                width={80}
                height={80}
                className="object-cover"
              />
            ) : (
              <span className="text-xl font-medium text-blue-400">
                {initials}
              </span>
            )}
          </div>

          <label
            className="inline-block px-4 py-2 rounded-full
                       border border-blue-500/30 text-blue-400
                       hover:bg-blue-500/10 transition cursor-pointer
                       text-sm"
          >
            Change Avatar
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                e.target.files && handleAvatarChange(e.target.files[0])
              }
            />
          </label>
        </div>
      </div>

      {/* ================= Profile Fields ================= */}
      <div className="rounded-2xl border border-white/10 bg-black p-6 space-y-6">

        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs text-white/60">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-lg
                       px-4 py-2 text-sm outline-none
                       focus:border-blue-500/40"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs text-white/60">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-lg
                       px-4 py-2 text-sm outline-none
                       focus:border-blue-500/40"
          />
        </div>

        <button
          onClick={handleSaveProfile}
          disabled={loading}
          className="px-6 py-2 rounded-full
                     bg-blue-600 text-white
                     hover:bg-blue-500 transition
                     disabled:opacity-50"
        >
          Save Changes
        </button>

        {success && (
          <p className="text-xs text-green-400">
            Profile updated successfully
          </p>
        )}

        {error && (
          <p className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
