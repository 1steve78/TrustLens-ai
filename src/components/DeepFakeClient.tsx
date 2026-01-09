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
    <section className="h-screen overflow-hidden bg-black text-white flex items-center justify-center">

      <div className="w-full max-w-3xl px-6 space-y-10">


        {/* HEADER */}
        <header className="text-center space-y-4">
          <span className="inline-flex px-3 py-1 rounded-full text-xs
                           border border-blue-500/20 text-blue-400">
            TrustLens • Deepfake Detection
          </span>

          <h1 className="text-3xl font-semibold tracking-tight">
            Deepfake Image Scanner
          </h1>

          <p className="text-white/60 max-w-xl mx-auto">
            Verify whether an image is real or AI-generated using forensic analysis.
          </p>
        </header>

        {/* CARD */}
        <div className="relative group rounded-2xl border border-white/10
                        bg-black p-8 space-y-8">

          {/* subtle hover glow */}
          <div
            className="absolute -inset-1 rounded-2xl bg-blue-500/10 blur-2xl
                       opacity-0 group-hover:opacity-100 transition-opacity
                       pointer-events-none"
          />

          <input
            type="file"
            accept="image/*"
            hidden
            id="image-upload"
            onChange={(e) =>
              e.target.files && handleFileChange(e.target.files[0])
            }
          />

          {/* IMAGE PREVIEW / SELECT */}
          {!file && !result && (
            <label
              htmlFor="image-upload"
              className="mx-auto block w-fit px-6 py-3 rounded-full
                         border border-blue-500/30 text-blue-400
                         hover:bg-blue-500/10 transition cursor-pointer"
            >
              Select Image
            </label>
          )}

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mx-auto max-h-80 rounded-xl
                         border border-white/10"
            />
          )}

          {/* ACTION BUTTONS */}
          {file && !loading && !result && (
            <div className="flex justify-center">
              <button
                onClick={scanImage}
                className="px-8 py-3 rounded-full
                           bg-blue-600 text-white
                           hover:bg-blue-500 transition"
              >
                Run Scan
              </button>
            </div>
          )}

          {loading && (
            <p className="text-center text-sm text-blue-400 animate-pulse">
              Scanning image…
            </p>
          )}

          {/* ERROR */}
          {error && (
            <p className="text-center text-sm text-red-400">
              {error}
            </p>
          )}

          {/* RESULT */}
          {result && (
            <div className="space-y-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    result.verdict === "REAL"
                      ? "border border-green-500/30 text-green-400"
                      : result.verdict === "AI_GENERATED"
                      ? "border border-red-500/30 text-red-400"
                      : "border border-yellow-500/30 text-yellow-400"
                  }`}
                >
                  {result.verdict}
                </span>

                <span className="text-sm text-white/60">
                  Confidence {(result.confidence * 100).toFixed(0)}%
                </span>
              </div>

              <p className="text-sm text-white/70 text-center">
                {result.summary}
              </p>

              <ul className="text-xs text-white/50 list-disc max-w-xl mx-auto space-y-1">
                {result.signals.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              {/* SCAN AGAIN */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={resetAll}
                  className="px-6 py-2 rounded-full
                             border border-blue-500/30 text-blue-400
                             hover:bg-blue-500/10 transition"
                >
                  Scan Another Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
