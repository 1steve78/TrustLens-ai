"use client";

import { useEffect, useState } from "react";

type ScanResult = {
  id: string;
  verdict: "REAL" | "AI_GENERATED" | "SUSPICIOUS";
  confidence: number;
  summary: string;
  signals: string[];
};

export default function DeepfakeClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFileChange(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are supported.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }
    setError(null);
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  }

  async function scanImage() {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Upload failed.");

      const { url, thumbnail } = await uploadRes.json();

      const scanRes = await fetch("/api/deepfake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaUrl: url, mediaType: "IMAGE", thumbnail }),
      });

      if (!scanRes.ok) throw new Error("Analysis failed.");

      setResult(await scanRes.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#05070E] via-[#0B1220] to-black text-white">
      <div className="max-w-5xl mx-auto px-8 py-16 space-y-12">

        {/* HEADER */}
        <header className="space-y-4">
          <span className="inline-flex px-3 py-1 rounded-full text-xs
                           bg-blue-500/10 text-blue-400 border border-blue-500/20">
            TrustLens • Secure Scan
          </span>

          <h1 className="text-3xl font-semibold">
            Deepfake Image Scanner
          </h1>

          <p className="text-slate-400 max-w-2xl">
            Verify image authenticity using TrustLens AI-powered forensic analysis.
          </p>
        </header>

        {/* UPLOAD PANEL */}
        <div className="relative rounded-3xl border border-blue-500/20
                        bg-white/5 backdrop-blur-xl p-10 space-y-6">

          <div className="absolute inset-0 rounded-3xl
                          bg-gradient-to-br from-blue-500/10 to-transparent
                          pointer-events-none" />

          <input
            type="file"
            accept="image/*"
            hidden
            id="image-upload"
            onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
          />

          <label
            htmlFor="image-upload"
            className="inline-block cursor-pointer px-6 py-2 rounded-full
                       bg-blue-500/20 text-blue-300
                       hover:bg-blue-500/30 transition"
          >
            Select Image
          </label>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="max-h-72 rounded-2xl border border-white/10"
            />
          )}

          {file && (
            <button
              onClick={scanImage}
              disabled={loading}
              className="px-6 py-2 rounded-full
                         bg-gradient-to-r from-blue-500 to-cyan-400
                         text-black font-medium
                         hover:opacity-90 transition
                         disabled:opacity-50"
            >
              {loading ? "Scanning…" : "Run Secure Scan"}
            </button>
          )}

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
        </div>

        {/* RESULT */}
        {result && (
          <div className="rounded-2xl border border-white/10
                          bg-white/5 backdrop-blur p-6 space-y-4">
            <h3 className="text-sm font-medium">
              Scan Result
            </h3>

            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  result.verdict === "REAL"
                    ? "bg-green-500/20 text-green-400"
                    : result.verdict === "AI_GENERATED"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {result.verdict}
              </span>

              <span className="text-sm text-slate-400">
                Confidence: {(result.confidence * 100).toFixed(0)}%
              </span>
            </div>

            <p className="text-sm text-slate-300">
              {result.summary}
            </p>

            <ul className="text-xs text-slate-400 list-disc ml-5 space-y-1">
              {result.signals.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
