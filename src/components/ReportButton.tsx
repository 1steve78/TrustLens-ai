"use client";

export default function ReportButton({ url }: { url: string }) {
  async function handleReport() {
    const reason = prompt("Why is this site suspicious?");
    if (!reason) return;

    await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, reason }),
    });

    alert("Thanks for helping keep others safe.");
  }

  return (
    <button
      onClick={handleReport}
      className="text-sm text-red-600 underline"
    >
      Report this website
    </button>
  );
}
