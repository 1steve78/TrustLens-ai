"use client";

import { useState } from "react";

export default function UrlInput() {
  const [url, setUrl] = useState("");

  function handleSubmit() {
    if (!url) return alert("Enter a URL");
    console.log("Scanning:", url);
  }

  return (
    <div className="space-y-4">
      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        Analyze Website
      </button>
    </div>
  );
}
