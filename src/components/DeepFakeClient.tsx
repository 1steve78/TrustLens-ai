"use client";

import { useEffect, useState } from "react";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import ExplainThis from "@/components/ExplainThis";

type ScanResult = {
  id: string;
  verdict: "REAL" | "AI_GENERATED" | "SUSPICIOUS";
  confidence: number;
  summary: string;
  signals: string[];
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

const CHECKS = [
  "Texture inconsistencies",
  "Lighting and shadow drift",
  "Facial landmark distortion",
  "Compression anomalies",
  "Edge blending artifacts",
  "Metadata integrity",
];

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

  function resetAll() {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setLoading(false);
  }

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

      if (!uploadRes.ok) throw new Error("Upload failed");

      const { url, thumbnail } = await uploadRes.json();

      const scanRes = await fetch("/api/deepfake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mediaUrl: url,
          mediaType: "IMAGE",
          thumbnail,
        }),
      });

      if (!scanRes.ok) throw new Error("Analysis failed");

      setResult(await scanRes.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#05070c] text-white">
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-blue-600/20 blur-[150px]" />
      <div className="pointer-events-none absolute right-0 top-8 h-96 w-96 rounded-full bg-sky-500/15 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-[32rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[200px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 space-y-12">
        <header className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div
              className={`${plexMono.className} inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/70`}
            >
              Deepfake Detection
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            </div>
            <h1
              className={`${spaceGrotesk.className} text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight`}
            >
              Verify images before they go viral.
            </h1>
            <p className="text-sm md:text-base text-white/70 max-w-xl">
              Upload an image to detect AI manipulation with forensic checks and explainable
              scoring.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-4">
            <div>
              <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.3em] text-white/50`}>
                What we check
              </p>
              <h2 className={`${spaceGrotesk.className} text-2xl font-semibold mt-3`}>
                Forensic signals
              </h2>
              <p className="text-sm text-white/60 mt-2">
                Layered detection across visual and metadata anomalies.
              </p>
            </div>
            <div className="grid gap-3">
              {CHECKS.map((signal) => (
                <div
                  key={signal}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="text-sm text-white/80">{signal}</span>
                  <span className="text-[11px] uppercase text-blue-300">Scan</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Scan Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className={`${spaceGrotesk.className} text-2xl font-semibold`}>
                  New scan
                </h2>
                <p className="text-sm text-white/60 mt-2">
                  Upload a photo under 5MB. We do not store files without consent.
                </p>
              </div>
              <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/60">
                AI Node Active
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              hidden
              id="image-upload"
              onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
            />

            {!file && !result && (
              <label
                htmlFor="image-upload"
                className="mx-auto block w-fit px-6 py-3 rounded-full border border-blue-500/30 text-blue-300 hover:bg-blue-500/10 transition cursor-pointer"
              >
                Select image
              </label>
            )}

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mx-auto max-h-80 rounded-2xl border border-white/10"
              />
            )}

            {file && !loading && !result && (
              <div className="flex justify-center">
                <button
                  onClick={scanImage}
                  className="px-8 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-400 transition"
                >
                  Run scan
                </button>
              </div>
            )}

            {loading && (
              <p className="text-center text-sm text-blue-300 animate-pulse">
                Scanning image...
              </p>
            )}

            {error && <p className="text-center text-sm text-blue-300">{error}</p>}
          </div>

          {/* Result Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="space-y-3">
              <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.3em] text-white/50`}>
                Verdict
              </p>
              <p className="text-sm text-white/60">
                Results appear here once the scan completes.
              </p>
            </div>

            {result && (
              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      result.verdict === "REAL"
                        ? "border-emerald-500/30 text-emerald-300"
                        : result.verdict === "AI_GENERATED"
                        ? "border-blue-500/40 text-blue-300"
                        : "border-yellow-500/30 text-yellow-300"
                    }`}
                  >
                    {result.verdict}
                  </span>
                  <span className="text-sm text-white/60">
                    Confidence {(result.confidence * 100).toFixed(0)}%
                  </span>
                </div>

                <p className="text-sm text-white/70">{result.summary}</p>

                <ul className="text-xs text-white/60 list-disc list-inside space-y-1">
                  {result.signals.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>

                <div className="flex justify-center">
                  <ExplainThis
                    contextType="deepfake"
                    title="Deepfake verdict"
                    contextData={{
                      verdict: result.verdict,
                      confidence: result.confidence,
                      summary: result.summary,
                      signals: result.signals,
                    }}
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={resetAll}
                    className="px-6 py-2 rounded-full border border-blue-500/30 text-blue-300 hover:bg-blue-500/10 transition"
                  >
                    Scan another image
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
