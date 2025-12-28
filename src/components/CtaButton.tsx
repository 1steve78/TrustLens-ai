"use client";

import { useRouter } from "next/navigation";

export default function CTAButton({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(isLoggedIn ? "/home" : "/auth")}
      className="rounded-full bg-blue-500 px-8 py-3 text-sm font-medium hover:bg-blue-600 transition"
    >
      {isLoggedIn ? "Go to Dashboard" : "Login / Signup"}
    </button>
  );
}
