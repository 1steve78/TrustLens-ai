"use client";

import { useEffect, useState } from "react";

export default function LearnPage() {
  const [text, setText] = useState("Loading...");
  const reasons = [
    "Recently registered domain",
    "Urgency-based language",
  ];

  useEffect(() => {
    async function fetchEducation() {
      const res = await fetch("/api/learn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reasons }),
      });

      const data = await res.json();
      setText(data.explanation);
    }

    fetchEducation();
  }, []);

  return (
    <section className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">
        Why This Website Is Risky
      </h2>

      <p className="text-gray-700 whitespace-pre-line">
        {text}
      </p>
    </section>
  );
}
