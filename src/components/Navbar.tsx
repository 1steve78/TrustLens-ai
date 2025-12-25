import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="text-blue-600" />
          TrustLens AI
        </Link>

        <div className="flex gap-4 text-sm">
          <Link href="/scan" className="hover:text-blue-600">
            Scan
          </Link>
        </div>
      </div>
    </nav>
  );
}
