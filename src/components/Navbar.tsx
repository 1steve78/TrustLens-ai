import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <div
        className="
          flex items-center justify-between

          w-[95vw] max-w-7xl   /* ⬅️ wider */
          px-14 py-6          /* ⬅️ taller & thicker */

          rounded-full
          bg-black/60
          backdrop-blur-2xl

          border border-white/15
          shadow-2xl shadow-black/50
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-4 text-white font-semibold text-lg"
        >
          <ShieldCheck className="h-7 w-7" /> {/* ⬅️ bigger icon */}
          <span>React Bits</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="
              px-4 py-2
              rounded-full
              text-base font-medium
              text-gray-300

              transition-all duration-200
              hover:text-white
              hover:bg-white/10
            "
          >
            Home
          </Link>

          <Link
            href="/docs"
            className="
              px-4 py-2
              rounded-full
              text-base font-medium
              text-gray-300

              transition-all duration-200
              hover:text-white
              hover:bg-white/10
            "
          >
            Docs
          </Link>
        </div>

        
      </div>
    </nav>
  );
}
