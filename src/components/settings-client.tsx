"use client";

import { useState } from "react";
import Image from "next/image";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

type User = {
  id: string;
  name: string | null;
  email?: string | null;
  bio?: string | null;
  avatarUrl: string | null;
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
    <section className="relative min-h-screen w-full overflow-hidden bg-[#05070c] text-white">
      <div className="pointer-events-none absolute -left-32 top-6 h-80 w-80 rounded-full bg-blue-600/20 blur-[150px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-sky-500/15 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-[32rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[200px]" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-16 space-y-10">
        <header className="space-y-3">
          <div
            className={`${plexMono.className} inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/70`}
          >
            Profile Settings
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          </div>
          <h1 className={`${spaceGrotesk.className} text-3xl md:text-4xl font-semibold`}>
            Manage your TrustLens identity
          </h1>
          <p className="text-sm text-white/70 max-w-2xl">
            Update your profile details and keep your account secure.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-6">
            <div>
              <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.3em] text-white/50`}>
                Identity
              </p>
              <h2 className={`${spaceGrotesk.className} text-2xl font-semibold mt-3`}>
                Profile image
              </h2>
              <p className="text-sm text-white/60 mt-2">
                This image appears across your TrustLens workspace.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-full border border-white/10 overflow-hidden flex items-center justify-center bg-black/60">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt="User avatar"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-xl font-medium text-blue-300">{initials}</span>
                )}
              </div>

              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 text-blue-300 hover:bg-blue-500/10 transition cursor-pointer text-sm">
                Change avatar
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => e.target.files && handleAvatarChange(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-6">
            <div>
              <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.3em] text-white/50`}>
                Profile
              </p>
              <h2 className={`${spaceGrotesk.className} text-2xl font-semibold mt-3`}>
                Personal details
              </h2>
              <p className="text-sm text-white/60 mt-2">
                Keep your contact details up to date.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-white/60">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-2 text-sm outline-none focus:border-blue-500/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/60">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-2 text-sm outline-none focus:border-blue-500/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/60">Bio (optional)</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-2 text-sm outline-none resize-none focus:border-blue-500/40"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="px-6 py-2 rounded-full bg-blue-500 text-white text-sm font-semibold hover:bg-blue-400 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save changes"}
              </button>

              {success && <p className="text-xs text-emerald-300">Profile updated</p>}
              {error && <p className="text-xs text-blue-300">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
