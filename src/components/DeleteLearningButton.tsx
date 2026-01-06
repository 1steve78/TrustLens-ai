"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteLearningButton({
  learningId,
}: {
  learningId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const ok = confirm(
      "Are you sure you want to delete this learning? This cannot be undone."
    );

    if (!ok) return;

    setLoading(true);

    const res = await fetch(`/api/learn/${learningId}`, {
      method: "DELETE",
    });

    setLoading(false);

    if (res.ok) {
      router.push("/home");
      router.refresh();
    } else {
      alert("Failed to delete learning.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs px-3 py-1 rounded-full
                 border border-red-500/30
                 text-red-400 hover:bg-red-500/10
                 transition disabled:opacity-50"
    >
      {loading ? "Deleting…" : "Delete"}
    </button>
  );
}
