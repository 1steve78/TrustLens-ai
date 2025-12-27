"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setError("");

    const endpoint =
      mode === "login" ? "/api/auth/login" : "/api/auth/signup";

    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      return;
    }

    if (mode === "login") {
      router.push("/home")
    } else {
      setMode("login");
    }
  }

  return (
    <section className="w-full max-w-6xl">
      <div className="glass glow-blue rounded-3xl p-12 md:p-14">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold mb-2">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-gray-400 text-sm">
            SecureScan • Your gateway for safer digital interaction
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="glass rounded-full p-1 flex gap-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`px-6 py-2 rounded-full text-sm transition ${
                mode === "login"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`px-6 py-2 rounded-full text-sm transition ${
                mode === "signup"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Signup
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-md mx-auto">
          <div className="space-y-4">
            <input
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-4 rounded-full bg-blue-500 py-3 font-medium hover:bg-blue-600 transition disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Continue"
                : "Create Account"}
            </button>
          </div>

          {/* OAuth placeholder */}
          <div className="mt-6 text-center text-xs text-gray-400">
            Or continue with
            <div className="flex justify-center gap-4 mt-3">
              <span className="opacity-50">G</span>
              <span className="opacity-50"></span>
              <span className="opacity-50">f</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-14 flex justify-center gap-6 text-xs text-gray-400">
          <span className="text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full">
            About Us
          </span>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </section>
  );
}
